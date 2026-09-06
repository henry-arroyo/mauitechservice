#!/usr/bin/env bash
# Build and deploy mauitechservice.com to S3 + CloudFront.
# Usage: AWS_PROFILE=mauitechservice ./deploy.sh
set -euo pipefail

BUCKET="mauitechservice.com"
DISTRIBUTION_ID="${DISTRIBUTION_ID:-E34OU7YIQD2P2B}"

cd "$(dirname "$0")"

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
