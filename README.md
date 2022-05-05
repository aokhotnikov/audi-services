# Audi Services

#### FIREBASE COMMANDS:

1. deploy firebase functions & firestore rules

    `firebase deploy`

2. deploy only your firestore rules

    `firebase deploy --only firestore:rules`

3. deploy only functions

    `firebase deploy --only functions`

4. deploy only some functions

    `firebase deploy --only functions:cronDay,functions:pubsubState`

5. logs in console for firebase

    `firebase functions:logs`


#### APP ENGINE:

Server: [NestJS](https://github.com/nestjs/nest)
Database: Firebase
Create service account and put it to 'appengine/service_accounts' directory to have possibility to run project locally

1. deploy production

    `gcloud app deploy app.yaml cron.yaml --project audi-production`

    or

    `cd appengine && `npm run deploy:production`

3. deploy staging

    `gcloud app deploy app.yaml cron.yaml --project audi-staging`

    or

    `cd appengine && npm run deploy:staging`
