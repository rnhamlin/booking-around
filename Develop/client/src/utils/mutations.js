// functions needed: LOGIN_USER, ADD_USER, SAVE_BOOK, REMOVE_BOOK
import { gql } from "@apollo/client";

// Mutation for user login
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        bookCount
        savedBooks {
          bookId
          title
          description
          authors
          link
          image
        }
      }
    }
  }
`;

// Mutation for adding user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation for saving a book
export const SAVE_BOOK = gql`
  mutation saveBook($input: bookInput!) {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      authors
      image
      description
      title
      link
    }
  }
`;

// Mutation for removing a book
export const REMOVE_BOOK = gql`
  mutation removeBook(bookId: $id) {
    _id
    username
    email
    bookCount
    savedBooks {
        bookId
        authors
        image
        description
        title
        link
    }
  }
`;
