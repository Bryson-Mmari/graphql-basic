import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';

// Scalar Types in GraphQL are 
// String, Boolean, Int, Float and ID

// Type definitions (Schema)
// const typeDefs = /* GraphQL */ `
// type Query{
// id: ID!
// name: String!
// age: Int!
// employed: Boolean!
// gpa: Float
// }`;

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
// const resolvers = {
//     Query:{
//         id: () => 'abc-123',
//         name: () => 'Bryson Mmari',
//         age: () => 25,
//         employed: () => true,
//         gpa: () => 3.5,
//     }
// };

/*Create Query definition and resolver for each
    title - String - product name
    price - number as float
    releaseYear - number as integer (optional)
    rating - number as float (optional)
    isStock - boolean
*/

// Type definitions (Schema)
const typeDefs = /* GraphQL */ `
type Query{
title: String!
price: Float!
releaseYear: Int
rating: Float
isStock: Boolean!
}`;

//Resolve API
const resolvers = {
    Query:{
        title: () => 'Microsoft Surface 18 Pro',
        price: () => '1550.5',
        releaseYear: () => 2024,
        rating: () => '4.8',
        isStock: () => true,
    },
};

const yoga = createYoga({
    schema: createSchema({ typeDefs, resolvers })
});

const server = createServer(yoga);

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/graphql`);
});