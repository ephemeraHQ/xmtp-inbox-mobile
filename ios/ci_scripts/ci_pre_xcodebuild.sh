#!/bin/sh

echo "Stage: PRE-Xcode Build is activated .... "

echo "XMTP_ENV=${XMTP_ENV}" > "../../.env"
echo "THRID_WEB_CLIENT_ID=${THRID_WEB_CLIENT_ID}" > "../../.env"
echo "AWS_S3_REGION=${AWS_S3_REGION}" > "../../.env"
echo "AWS_S3_BUCKET=${AWS_S3_BUCKET}" > "../../.env"
echo "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}" > "../../.env"
echo "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}" > "../../.env"

echo "###===== Run Yarn Install"
yarn install

exit 0
