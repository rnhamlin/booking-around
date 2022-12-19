const express = require("express");

// Import ApolloServer
const { ApolloServer } = require("apollo-server-express");
// Import the typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;

//Now, create a new Apollo server and pass it into the schema data.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//const path = require('path');
//const routes = require('./routes');

const app = express();

// `extended` below is true in the original, but in the example in BCS, it's false.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  //integrate Apollo server with Express application as middleware.
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      //log where we can go to test our GQL API
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};
// Calls the async function to start the server:
startApolloServer(typeDefs, resolvers);

// if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
// }

//app.use(routes);
