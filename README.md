# Maui Tech Service - mauitechservice.com

Single-page marketing site for Maui Tech Service: field IT, network engineering,
structured cabling, business IT support, and cloud engineering on Maui.

## Tech stack

- React 18 + TypeScript, Vite, Tailwind CSS
- Contact form: Cloudflare Turnstile + AWS Lambda Function URL + SES (`backend/`)
- Hosting: private S3 bucket behind CloudFront (origin access control), DNS on Cloudflare

## Development

```bash
npm install
cp .env.example .env   # set VITE_TURNSTILE_SITE_KEY
npm run dev
```

Site-wide contact details, the booking link, and the Google listing URL live in
`src/config.ts`. The logo is `src/components/Logo.tsx` (also `public/logo.svg`
and `public/favicon.svg`).

## Build and deploy

```bash
AWS_PROFILE=mauitechservice ./deploy.sh
```

`deploy.sh` runs `npm run build`, syncs `dist/` to the `mauitechservice.com`
bucket (hashed assets with a one-year cache, `index.html` uncached), and
invalidates the CloudFront distribution.

## Infrastructure (us-west-2 unless noted)

| Resource | Value |
| --- | --- |
| S3 bucket | `mauitechservice.com` (private, BucketOwnerEnforced) |
| CloudFront distribution | `E34OU7YIQD2P2B`, Free flat-rate plan (see below) |
| ACM certificate (us-east-1) | `mauitechservice.com` + `www.mauitechservice.com`, DNS validated |
| SES identity | `mauitechservice.com` domain, MAIL FROM `mail.mauitechservice.com` |
| Turnstile secret | SSM SecureString `/mauitechservice/turnstile-secret` |
| Contact Lambda | CloudFormation stack `mauitechservice-contactform` (SAM), role `mauitechservice-contact-lambda` |

CloudFront routes `/api/*` to the Lambda Function URL with caching disabled;
everything else is served from S3 with 403/404 mapped to `/index.html`.

### Contact form backend

```bash
cd backend
AWS_PROFILE=mauitechservice sam build && sam deploy
```

The Lambda reads the Turnstile secret from SSM and re-reads it every 5 minutes. To rotate it, replace REAL_SECRET with the secret from the Cloudflare dashboard:

```bash
aws ssm put-parameter --name /mauitechservice/turnstile-secret --type SecureString --overwrite --value 'REAL_SECRET'
```

then update `VITE_TURNSTILE_SITE_KEY` in `.env` and redeploy the site.

## CloudFront pricing plan (Free flat-rate)

The distribution is on the CloudFront **Free** flat-rate plan, like
hookelesystems.com and henryarroyo.com. A flat-rate plan is not a field in the
distribution config. It is a subscription in the Pricing Plan Manager service
that ties exactly one distribution to exactly one WAF web ACL
(`infra/waf-web-acl.json`, the same rules the console uses). A plain
`aws cloudfront create-distribution` call creates neither, which is why this
distribution started out on pay-as-you-go.

```bash
pip install --upgrade boto3
python infra/ensure_free_plan.py --check   # read-only status
python infra/ensure_free_plan.py           # attach web ACL + subscribe, idempotent
```

Rules for future changes:

- `deploy.sh` only syncs S3 and invalidates the cache, so it cannot change the
  plan. It refuses to deploy if the web ACL is missing, and also checks the
  subscription when a recent boto3 is installed.
- Never remove `WebACLId` when editing the distribution config. Always start
  from `get-distribution-config` and change only the fields you need.
- If the distribution is ever recreated, run `infra/ensure_free_plan.py`
  afterwards.
- The deploy role needs `pricingplanmanager:ListSubscriptions`,
  `GetSubscription` and `CreateSubscription`.

## DNS (Cloudflare, DNS-only / grey cloud)

| Type | Name | Target |
| --- | --- | --- |
| CNAME | `@` | CloudFront distribution domain |
| CNAME | `www` | CloudFront distribution domain |
| CNAME | ACM validation records | from ACM console |
| CNAME | `<token>._domainkey` x3 | SES DKIM |
| MX | `mail` | `10 feedback-smtp.us-west-2.amazonses.com` |
| TXT | `mail` | `v=spf1 include:amazonses.com ~all` |
