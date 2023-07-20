import { gql } from 'apollo-server-express';

const scalars = gql`
    scalar Date
    scalar DateTime
    scalar ObjectID
`;

export default scalars;
