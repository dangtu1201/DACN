import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';
// import { rateLimit } from '../utils';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;
