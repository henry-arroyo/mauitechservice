#!/usr/bin/env bash
# One-time setup: create the Lambda execution role for the contact form.
# Run this with an IAM-admin profile (the mauitechservice deploy role is
# deliberately not allowed to create roles).
#
#   AWS_PROFILE=<admin-profile> bash backend/iam/create-role.sh
set -euo pipefail
cd "$(dirname "$0")"

ROLE_NAME="mauitechservice-contact-lambda"

if aws iam get-role --role-name "$ROLE_NAME" >/dev/null 2>&1; then
  echo "Role $ROLE_NAME already exists."
else
  aws iam create-role \
    --role-name "$ROLE_NAME" \
    --description "Execution role for the mauitechservice.com contact form Lambda" \
    --assume-role-policy-document file://trust-policy.json \
    --query 'Role.Arn' --output text
fi

aws iam attach-role-policy \
  --role-name "$ROLE_NAME" \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

aws iam put-role-policy \
  --role-name "$ROLE_NAME" \
  --policy-name contact-form-ses-ssm \
  --policy-document file://permissions-policy.json

echo "Done. Role ARN: arn:aws:iam::196691452297:role/$ROLE_NAME"
