import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';

// Arrays
// Type definitions (Schema)
const typeDefs = /* GraphQL */ `
type Query{
add(numbers: [Float!]!): Float!
greeting(name: String): String!
grades: [Int!]!
me: User!
post: Post!
}

type Post{
    id: ID!
    title: String!
    body: String!
    published: Boolean!
}

type User{
    id: ID!
    name: String!
    email: String!
    age: Int
}`;

//Resolve API
const resolvers = {
    Query: {
        add(parent, args, ctx, info) {
            if(args.numbers.length === 0){
                return 0;
            }
            return args.numbers.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0,
            );
        },
        greeting(parent, args, ctx, info){
            if(args.name){
                return `Hello ${args.name}!`;
            }else{
                return `Hello!`;
            }
        },
        grades(parent, args, ctx, info){
            return [99, 80, 93];
        }, 
        me(){
            return{
                id: '123-abc',
                name: 'Bryson Mmari',
                email: 'bryson.s.mmari@gmail.com',
                age: 25,
            };
        },
        post(){
            return{
                id: '678-asd',
                title: 'GraphQL Importance of Usage',
                body: 'We will solve the issue of round trips to go and return to database, compare to usage of REST-API.',
                published: true,
            };
        }
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
