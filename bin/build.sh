npm install . && npm run clean && tsc && cp -rf build/ www/ && cp -R .elasticbeanstalk www/.elasticbeanstalk && cp .npmrc www/.npmrc && cp package.json www/package.json && cp -rf prisma/ www/ && cd www && zip -r Archive.zip . && cd ..