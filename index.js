import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';

// Custom types definition.

/**1. Create a Post type
 * 2. Add id, title, body, and publicashed to the Post type (all non-nullable)
 * 3. Define a "post" query that returns a single post
 * 4. Set up the resolver method to return some post data
 * 5. Test out the query
 */

// Type definitions (Schema)
const typeDefs = /* GraphQL */ `
type Query{
greeting(name: String): String!
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
    Query:{
        greeting(parent, args, ctx, info){
            if(args.name){
                return `Hello ${args.name}!`;
            }else{
                return `Hello!`;
            }
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