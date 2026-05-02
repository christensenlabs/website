# Load secrets as env vars for all recipes
export CLABS_AWS_ACCOUNT_ID := `source scripts/env.sh && echo $CLABS_AWS_ACCOUNT_ID`
export CLABS_WEBSITE_BUCKET := `source scripts/env.sh && echo $CLABS_WEBSITE_BUCKET`
export CLABS_WEBSITE_CLOUDFRONT_DISTRIBUTION_ID := `source scripts/env.sh && echo $CLABS_WEBSITE_CLOUDFRONT_DISTRIBUTION_ID`

# Build the site
build:
    npm run build

# Deploy: build, sync to S3, invalidate CloudFront cache
deploy: build
    aws s3 sync dist s3://$CLABS_WEBSITE_BUCKET --delete
    aws cloudfront create-invalidation --distribution-id $CLABS_WEBSITE_CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

# Show resolved config (for debugging)
show-config:
    @echo "AWS Account:    $CLABS_AWS_ACCOUNT_ID"
    @echo "S3 Bucket:      $CLABS_WEBSITE_BUCKET"
    @echo "CloudFront Dist: $CLABS_WEBSITE_CLOUDFRONT_DISTRIBUTION_ID"
