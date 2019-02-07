REM aws s3api create-bucket --bucket jimzy-s3-skimable --acl public-read --region us-west-2 --create-bucket-configuration LocationConstraint=us-west-2

REM aws s3 website s3://jimzy-s3-skimable/ --index-document index.html --error-document index.html

aws s3 sync . s3://jimzy-s3-skimable --delete --acl public-read --exclude '.git*' --exclude 'refreshAWS.bat'
