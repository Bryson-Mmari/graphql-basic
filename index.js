import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';

// Demo users Data
const users = [
    {
        id: "1",
        name: "Bryson Mmari",
        email: "bry@mmari.com",
        age: 25,
    },
    {
        id: "2",
        name: "Rodgers Aroon",
        email: "rodgers@aroon.com",
        age: 45,
    },
    {
        id: "3",
        name: "Paschal Ephraim",
        email: "paschal@ephraim.com",
        age: 26,
    },
];
const typeDefs = /* GraphQL */ `
type Query{
users(query: String): [User!]!
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
        users(parent, args, ctx, info){
            if(!args.query){
            return users;
            }
            return users.filter((user) =>{
                return user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase());
            });
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
