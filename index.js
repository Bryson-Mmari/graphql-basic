import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
/**
 * Challenge part 2
 * 1. Set up a comment type with id and text fields. Both non-nullable.
 * 2. Set up a comment array with 4 comments
 * 3. Set up a comment query with a resolver that returns all comments
 * 4. Run a query to get all 4 comments with both id and text fields.
 * 5. Create a relationship between comments and users. Each comment should have an owner field that is a user type. 
 * 6. Run a query to get all comments with the id, text, and owner fields. The owner field should return the id and name of the user.
 * 7. Run a query to get all users with the id, name, and comments fields. The comments field should return the id and text of each comment.
 * 
 * */
 
const comments = [
    {
        id: "101",
        text: "Congratulations on the Bivio release!.",
        owner: "1"
    },
    {
        id: "102",
        text: "Looking forward to the next update.",
        owner: "2"
    },
    {
        id: "103",
        text: "These modifications look promising!",
        owner: "1"
    },
    {
        id: "104",
        text: "This is the fourth comment.",
        owner: "3"
    },
];

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
        id: "11",
        title: "Bivio Release",
        body: "Released on June 2026!",
        published: true,
        author: "1",
    },
    {
        id: "12",
        title: "Respad 6",
        body: "6 Months to go! Stay Alert!!",
        published: false,
        author: "2",
    },
    {
        id: "3",
        title: "Spear Modifications",
        body: "Coming Soon!! Stay tuned!",
        published: true,
        author: "1",
    },
];
const typeDefs = /* GraphQL */ `
type Query{
users(query: String): [User!]!
posts(qry: String): [Post!]!
comments: [Comment!]!
me: User!
post: Post!
}

type Post{
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
}

type User{
    id: ID!
    name: String!
    email: String!
    age: Int,
    posts: [Post!]!
    comments: [Comment!]!
}

type Comment{
    id: ID!
    text: String!
    owner: User!
}
`;

//Resolve API
const resolvers = {
    Query: {
        comments(parent, args, ctx, info){
            return comments;
        },

        users(parent, args, ctx, info){
            if(!args.query){
            return users;
            }
            return users.filter((user) =>{
                return user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase());
            });
        }, 
       
        posts(parent, args, ctx, info) {
            // Step 1: Return only published posts.
            let result = posts.filter((post) => post.published === true);

            // Step 2: If no search query is provided, return all published posts.
            if (!args.qry) {
                return result;
            }

            // Previous approach: Search only by title.
            // return result.filter((post) => {
            //     return post.title.toLowerCase().includes(args.qry.toLowerCase());
            // });

            // Step 3: Search both title and body.
            const qry = args.qry.toLowerCase();

            result = result.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(qry);
                const isBodyMatch = post.body.toLowerCase().includes(qry);

                return isTitleMatch || isBodyMatch;
            });

            // Alternative: Perform the title and body search in one expression.
            // result = result.filter((post) =>
            //     post.title.toLowerCase().includes(qry) ||
            //     post.body.toLowerCase().includes(qry)
            // );

            // Step 4: Return the final filtered results.
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
                author: "1"
            };
        },
    },
    Post:{
           author(parent, args, ctx, info){
            return users.find((user) => {
                return user.id === parent.author
            })
           }
    },
    
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id;
            });
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.owner === parent.id;
            });
        }
    },
    Comment: {
        owner(parent, args, ctx, info) {
            return users.find((user) => user.id === parent.owner);
        },
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
