// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Query {
    me: String
  }
  type Mutation {
    login: String
  }
  type: Mutation {
    addUser: String,
  }
`;

// export the typeDefs
module.exports = typeDefs;
