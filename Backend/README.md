## Daily Groceries

---

### Tech & libs

-   Microserices with ExpressJs framework combines GraphQL query `apollo-server-express`
-   Manage packages with: `yarn`
-   Work with database with: `mongoose`
-   Validate with: `joi`
-   JavaScript utility: `lodash`
-   DateTime utility: `moment`
-   JavaScript compiler: `babel`
-   Cursor pagination: `honey-pager` / `mongoose-paginate-v2` / `mongoose-aggregate-paginate-v2`

---

### Setup

Make sure that you've installed yarn on your machine. Please visit https://yarnpkg.com/getting-started/install for more details.

-   Run `yarn install` to install dependencies
-   Run `yarn start` to start server
-   Run `yarn test` to run test cases

---

### Errors and how to fix

> 404 package not found

some packages required authorized npm account to pull, please contact your leader to get token to access.

> Could not connect to mongodb

Make sure you've install mongodb on your machine if using local db or mongodb connection string if using Atlas is correct.
Please visit https://www.mongodb.com/try/download/community or https://www.mongodb.com/try to download or get your free Atlas account.
In dev environment, we use local db, please use `localhost` for `DB_HOST` in `.env`

> Could not connect to redis

Make sure you've installed redis on your device. Go to https://redis.io/docs/getting-started/installation/ for installation details and how to use.
