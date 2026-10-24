import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
/**
 * My Challenge
 * 1. Set up an array of three posts with dummy post data (id, title, body, published)
 * 2. Set up a "posts" query and receiver that rertuns all the posts
 * 3. Test the query out
 * 4. Add a query argument that only return posts that contains that query string in the title or body
 * 5. Run a few sample queries searching for posts with a specific title
 */
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

const posts = [
    {
        id: "1",
        title: "Bivio Release",
        body: "Released on June 2026!",
        published: true,
    },
    {
        id: "2",
        title: "Respad 6",
        body: "6 Months to go! Stay Alert!!",
        published: false,
    },
    {
        id: "3",
        title: "Spear Modifications",
        body: "Coming Soon!! Stay tuned!",
        published: true,
    },
];
const typeDefs = /* GraphQL */ `
type Query{
users(query: String): [User!]!
posts(qry: String): [Post!]!
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
        posts(parent, args, ctx, info){
            let result = posts.filter((post)=> post.published === true);

            if(!args.qry){
            return posts;
            }
            // return posts.filter((post) =>{
            //     return post.title.toLowerCase().includes(args.qry.toLowerCase());
            // });
            result = result.filter((post) =>
                post.title.toLowerCase().includes(args.qry.toLowerCase()))
            return result;

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
