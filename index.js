import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';

// Scalar Types in GraphQL are 
// String, Boolean, Int, Float and ID

// Type definitions (Schema)
const typeDefs = /* GraphQL */ `
type Query{
id: ID!
name: String!
age: Int!
employed: Boolean!
gpa: Float
}`;

// Type definitions (Schema)
// const typeDefs = /* GraphQL */ `
// type Query{
// hello: String!
// name: String!
// location: String!
// bio: String
// }`;

// Resolve API
// const resolvers = {
//     Query: {
//         hello: () => 'Hello World, this is my first query',
//         name: () => 'My name is Bryson Mmari',
//         location: () => 'I am based in Arusha - Tanzania',
//         bio: () => 'I am a software developer'
//     }
// };

// Resolve API
const resolvers = {
    Query:{
        id: () => 'abc-123',
        name: () => 'Bryson Mmari',
        age: () => 25,
        employed: () => true,
        gpa: () => 3.5,
    }
};

const yoga = createYoga({
    schema: createSchema({ typeDefs, resolvers })
});

const server = createServer(yoga);

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/graphql`);
});