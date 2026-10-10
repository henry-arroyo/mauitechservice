#!/usr/bin/env bash
# Build and deploy mauitechservice.com to S3 + CloudFront.
# Usage: AWS_PROFILE=mauitechservice ./deploy.sh
set -euo pipefail

BUCKET="mauitechservice.com"
DISTRIBUTION_ID="${DISTRIBUTION_ID:-E34OU7YIQD2P2B}"

cd "$(dirname "$0")"

echo "==> Checking CloudFront Free plan"
# The Free flat-rate plan is a Pricing Plan Manager subscription that requires a
# WAF web ACL on the distribution. This script never edits the distribution, but
# fail loudly if someone else removed the web ACL or the subscription.
WEB_ACL=$(aws cloudfront get-distribution-config --id "$DISTRIBUTION_ID" --query 'DistributionConfig.WebACLId' --output text)
if [ -z "$WEB_ACL" ] || [ "$WEB_ACL" = "None" ]; then
  echo "ERROR: distribution $DISTRIBUTION_ID has no WAF web ACL, so it cannot be on the Free plan."
  echo "       Run: python infra/ensure_free_plan.py"
  exit 1
fi
if python3 -c "import boto3; boto3.Session().client('pricing-plan-manager', region_name='us-east-1')" >/dev/null 2>&1; then
  python3 infra/ensure_free_plan.py --check || { echo "ERROR: not on the Free plan. Run: python infra/ensure_free_plan.py"; exit 1; }
else
  echo "    web ACL attached; skipping subscription check (needs a recent boto3: pip install --upgrade boto3)"
fi

echo "==> Building"
npm run build

echo "==> Syncing hashed assets (long cache)"
aws s3 sync dist/ "s3://$BUCKET" \
  --delete \
  --exclude "index.html" \
  --exclude "robots.txt" \
  --exclude "sitemap.xml" \
  --cache-control "public, max-age=31536000, immutable"

echo "==> Uploading index.html and crawl files (no cache)"
for f in index.html robots.txt sitemap.xml; do
  aws s3 cp "dist/$f" "s3://$BUCKET/$f" --cache-control "public, max-age=0, must-revalidate"
done

echo "==> Invalidating CloudFront"
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*" --query 'Invalidation.Id' --output text

echo "==> Done: https://mauitechservice.com"
