import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './controller/routes/userRoute.js';
import authRoute from './controller/routes/authRoute.js';
import { permissions } from './graphql/middlewares/permission.js';
import expressSession from 'express-session';
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from "@graphql-tools/schema";
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import methodOverride from 'method-override';
const app = express();
// const PORT = process.env.PORT || 3000;
process.env.TZ = 'Asia/Ho_Chi_Minh'; 

import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import consola from'consola';
import {typeDefs} from './graphql/typeDefs/index.js';
import {resolvers} from './graphql/resolvers/index.js';
// import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'

dotenv.config();

const { API_PORT } = process.env;
const { API_HOST } = process.env;
const PORT = process.env.PORT || API_PORT;
const HOST = process.env.HOST || API_HOST;

app.use(methodOverride('_method'))
//app.use(cors({ credentials: 'include' }));
app.use(cors({origin: true, credentials: true}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'assets')));
// app.use(graphqlUploadExpress());
//{ maxFileSize: 10000, maxFiles: 10 }

app.get('/', (req, res) => {
    res.send(`Listening on ${ PORT }`);
})

const session = {
    secret: process.env.SESSION_SECRET, //sign the session ID cookie
    cookie: {},                         //session ID cookie object
    resave: false,                      //forces the session to be saved back to the session store
    saveUninitialized: false            //forces an uninitialized session to be saved to the store
};

app.set('trust proxy', process.env.NODE_ENV !== 'production')

if (app.get("env") === "production") {
    session.cookie.secure = true; 
  }

app.use(expressSession(session));

app.use('/user', userRoute);
app.use('/auth', authRoute);


// app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const startApp = async () => {
    try {   
        const schema = makeExecutableSchema({typeDefs, resolvers});
        const schemaWithPermissions = applyMiddleware(schema, permissions.generate(schema));
        const server = new ApolloServer ({
            typeDefs, 
            resolvers,
            schema: schemaWithPermissions,
            csrfPrevention: true,
            cache: 'bounded',
            introspection: true,
            playground: true,
            //uploads: false,
            context: ({ req, res }) => {
                // Note: This example uses the `req` argument to access headers,
                // but the arguments received by `context` vary by integration.
                // This means they vary for Express, Koa, Lambda, etc.
                //
                // To find out the correct arguments for a specific integration,
                // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields
             
                // Get the user token from the headers.
                const token = req.header('Authorization') || '';
                
                // if (token === 'EMPTY_TOKEN') 
                //     throw new Error('AUTH_ERROR');
             
                // // Try to retrieve a user with the token
                //const user = getUser(token);
             
                // // Add the user to the context
                return {res, token};
              },
              formatError: (err) => {
                // Don't give the specific errors to the client.
                // if (err.message.startsWith('Not Authorised!')) {
                //   return new AuthenticationError('Who are you ?');
                // }
            
                // Otherwise return the original error. The error can also
                // be manipulated in other ways, as long as it's returned.
                return err;
              },
        });

        await mongoose.connect(
            process.env.DB_CONNECT,
            { useUnifiedTopology: true, useNewUrlParser: true }
        );
        
        consola.success({
            message: "Successfully connected to database! 🙌",
            badge: true,
        });

        await server.start();
        server.applyMiddleware({ app: app});

        const apolloserver = app.listen(PORT, '0.0.0.0',() => {
            // console.log(`Listening on ${ PORT }`)
            consola.success({
                // message: `Listening on ${ apolloserver.address().address }:${ apolloserver.address().port }🙌`,
                // message: `Successfully started server on http://localhost:${ PORT }${ server.graphqlPath } 🙌`,
                message: `Successfully started server on http://${ apolloserver.address().address }:${ apolloserver.address().port }`,
                badge: true,
            })
        });

    }
    catch (err) {
        consola.error({
            message: `Failed to started server: ${err.message}`,
            badge: true,
        })
    }
}
startApp()