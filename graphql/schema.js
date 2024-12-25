import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type Query {
        message: String
        users: [User]
    }

    type Mutation {
        addUser(name: String!, email: String!): User
    }

    type User {
        id: ID
        name: String
        email: String
    }
`);
