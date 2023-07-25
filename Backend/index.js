// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import morgan from 'morgan';
import schema from './graphql/index.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import Auth from './middlewares/auth.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from './rules/index.js';
import { basicAuthenticationMiddleware } from './middlewares/basicAuthentication.js';

// import { permissions } from './middlewares/permission.js';
import * as Redis from 'ioredis';
import { createClient } from 'redis';
// const client = createClient();

// const PORT = process.env.PORT || 3000;
process.env.TZ = 'Asia/Ho_Chi_Minh'; 
// import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'


(async () => {
    global.redis = createClient();
    global.pubsub = new RedisPubSub({
        publisher: createClient(),
        subscriber: global.redis,
    });

    const servicePath = process.env.SERVICE_PATH || 'dailygroceries';

    const cp = cookieParser();
    const addCookies = (req, res) =>
        new Promise((resolve) => {
            cp(req, res, resolve);
        });

    const app = express();

    app.use(express.json({limit: '100mb'}));

    app.use(
        cors(),
        bodyParser.json(),
        morgan('dev'),
        basicAuthenticationMiddleware,
    );
    // tnccAuthSdk.initializeApp({
    //     credentialPath: './src/credentials/credentials.json',
    // });

    app.get('/', (req, res) => res.status(200).send('OK'));
    const httpServer = http.createServer(app);
    const schemaWithPermissions = applyMiddleware(schema, permissions.generate(schema));
    const apolloServer = new ApolloServer({
        schema: schemaWithPermissions,
        // introspection: false,
        // playground: false,
        installSubscriptionHandlers: true,
        plugins: [
            // Proper shutdown for the HTTP server.
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
            {
            async serverWillStart() {
                return {
                async drainServer() {
                    await serverCleanup.dispose();
                },
                };
            },
            },
        ],
        subscriptions: {
            path: `/${servicePath}/graphql/subscriptions`,
            onConnect: async (connectionParams) => {
                if (connectionParams.authToken) {
                    // return tnccAuthSdk
                    //     .verifyToken(connectionParams.authToken)
                    //     .then((user) => {
                    //         return {
                    //             currentUser: user,
                    //         };
                    //     });
                }
                throw new Error('Missing auth token!');
            },
        },
        context: async ({ req, res, connection }) => {
            if (connection) {
                return connection.context;
            }

            const token = req.header('Authorization') || '';

            const auth = new Auth({ req, res });
            await addCookies(req, res);
            await auth.authenticate();
            return {
                res,
                token,
                t: req.t,
            };
        },
        tracing: false,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        path: `/${servicePath}/graphql`,
    });
    // const httpServer = http.createServer(app);
    apolloServer.installSubscriptionHandlers(httpServer);

    const PORT = process.env.PORT || 1338;
    httpServer.listen(PORT, '0.0.0.0', async () => {
        console.log(`Server listen on port ${PORT}`);
        console.log(
            `🚀 Subscriptions ready at http://localhost:${PORT}${apolloServer.subscriptionsPath}`,
        );
        // console.log(process.env.DB_CONNECT);
        mongoose.connect(
            process.env.DB_CONNECT,
            { useUnifiedTopology: true, useNewUrlParser: true}
        );
    });
})();
