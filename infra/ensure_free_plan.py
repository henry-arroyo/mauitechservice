#!/usr/bin/env python3
"""Keep the mauitechservice.com CloudFront distribution on the Free flat-rate plan.

A flat-rate plan is not a distribution setting. It is a subscription in the
Pricing Plan Manager service that ties exactly one CloudFront distribution to
exactly one WAF web ACL. A plain `aws cloudfront create-distribution` call (how
this distribution was first created) never creates either, so the distribution
falls back to pay-as-you-go pricing.

This script is idempotent and never recreates the distribution:
  1. Confirms the caller can use Pricing Plan Manager (before changing anything).
  2. Reuses the web ACL already attached to the distribution, or creates one from
     infra/waf-web-acl.json and attaches it (only WebACLId changes).
  3. Creates a FREE subscription for the distribution + web ACL if none exists.

Usage:
  pip install --upgrade boto3        # needs a boto3 release with pricing-plan-manager
  python infra/ensure_free_plan.py --check    # read-only; exit 1 if not on Free
  python infra/ensure_free_plan.py            # fix it
Profile defaults to $AWS_PROFILE or "mauitechservice".
"""
import argparse
import json
import os
import sys
import time
import uuid
from pathlib import Path

import boto3
from botocore.exceptions import ClientError

DISTRIBUTION_ID = "E34OU7YIQD2P2B"
PLAN_FAMILY = "CloudFront"
PLAN_TIER = "FREE"
ACL_SPEC = Path(__file__).with_name("waf-web-acl.json")


def log(msg):
    print(f"[free-plan] {msg}", flush=True)


def find_subscription(ppm, dist_arn):
    kwargs = {}
    while True:
        page = ppm.list_subscriptions(**kwargs)
        for sub in page.get("subscriptionSummaries", []):
            if dist_arn in sub.get("resourceArns", []):
                return sub
        if not page.get("nextToken"):
            return None
        kwargs = {"nextToken": page["nextToken"]}


def acl_name_id(arn):
    # arn:aws:wafv2:us-east-1:ACCOUNT:global/webacl/NAME/ID
    parts = arn.split("/")
    return parts[-2], parts[-1]


def ensure_web_acl(waf, spec):
    for acl in waf.list_web_acls(Scope="CLOUDFRONT", Limit=100)["WebACLs"]:
        if acl["Name"] == spec["Name"]:
            log(f"web ACL {spec['Name']} already exists")
            return acl["ARN"]
    params = {k: v for k, v in spec.items() if not k.startswith("_")}
    params["Scope"] = "CLOUDFRONT"
    arn = waf.create_web_acl(**params)["Summary"]["ARN"]
    log(f"created web ACL {arn}")
    return arn


def attach_web_acl(cf, acl_arn):
    resp = cf.get_distribution_config(Id=DISTRIBUTION_ID)
    cfg, etag = resp["DistributionConfig"], resp["ETag"]
    if cfg.get("WebACLId") == acl_arn:
        return False
    cfg["WebACLId"] = acl_arn  # the only field changed; no other config is touched
    cf.update_distribution(Id=DISTRIBUTION_ID, IfMatch=etag, DistributionConfig=cfg)
    log("attached web ACL to distribution; waiting for CloudFront to deploy...")
    cf.get_waiter("distribution_deployed").wait(Id=DISTRIBUTION_ID, WaiterConfig={"Delay": 20, "MaxAttempts": 45})
    log("distribution deployed")
    return True


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--check", action="store_true", help="read-only; exit 1 unless on an ACTIVE Free subscription")
    ap.add_argument("--profile", default=os.environ.get("AWS_PROFILE", "mauitechservice"))
    args = ap.parse_args()

    sess = boto3.Session(profile_name=args.profile)
    cf = sess.client("cloudfront")
    waf = sess.client("wafv2", region_name="us-east-1")
    try:
        ppm = sess.client("pricing-plan-manager", region_name="us-east-1")
    except Exception:
        sys.exit("boto3 is too old to know pricing-plan-manager. Run: pip install --upgrade boto3")

    dist = cf.get_distribution(Id=DISTRIBUTION_ID)["Distribution"]
    dist_arn = dist["ARN"]
    attached_acl = dist["DistributionConfig"].get("WebACLId") or None
    log(f"distribution {DISTRIBUTION_ID}, web ACL: {attached_acl or 'none'}")

    # Step 1: permission/plan check first, so nothing is created if we cannot subscribe.
    try:
        sub = find_subscription(ppm, dist_arn)
    except ClientError as e:
        if e.response["Error"]["Code"] == "AccessDeniedException":
            sys.exit("ERROR: this profile cannot call pricingplanmanager:ListSubscriptions. "
                     "Grant pricingplanmanager:ListSubscriptions, GetSubscription and CreateSubscription to the deploy role.")
        raise

    if sub:
        log(f"subscription {sub['arn']}: tier={sub['planTier']} status={sub['status']}"
            + (f" reason={sub['statusReason']}" if sub.get("statusReason") else ""))
        ok = sub["planTier"] == PLAN_TIER and sub["status"] == "ACTIVE" and attached_acl in sub["resourceArns"]
        if ok:
            log("OK: distribution is on the Free plan")
            return 0
        if args.check:
            log("NOT OK: subscription exists but is not an ACTIVE Free plan covering the attached web ACL")
            return 1
        sys.exit("ERROR: a subscription exists but is not ACTIVE/FREE. Inspect it before changing anything.")

    if args.check:
        log("NOT OK: no flat-rate subscription covers this distribution (pay-as-you-go)")
        return 1

    # Step 2: web ACL. Reuse whatever is attached; otherwise create ours and attach it.
    if attached_acl:
        acl_arn = attached_acl
        log("reusing the web ACL already attached to the distribution")
    else:
        acl_arn = ensure_web_acl(waf, json.loads(ACL_SPEC.read_text()))
        attach_web_acl(cf, acl_arn)

    # Step 3: subscribe.
    resp = ppm.create_subscription(
        planFamily=PLAN_FAMILY,
        planTier=PLAN_TIER,
        resourceArns=[dist_arn, acl_arn],
        clientToken=str(uuid.uuid4()),
    )
    sub = resp["subscription"]
    log(f"created subscription {sub['arn']}: tier={sub['planTier']} status={sub['status']}")
    for _ in range(30):
        if sub["status"] != "SYNC_IN_PROGRESS":
            break
        time.sleep(10)
        sub = ppm.get_subscription(arn=sub["arn"])["subscription"]
        log(f"status={sub['status']}")
    if sub["status"] != "ACTIVE":
        sys.exit(f"ERROR: subscription status {sub['status']}: {sub.get('statusReason', '')}")
    log("OK: distribution is on the Free plan")
    return 0


if __name__ == "__main__":
    sys.exit(main())
