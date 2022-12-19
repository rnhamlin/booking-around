// Add the query GET_ME, to execute the `me` query set up using Apollo Server.
import { gql } from "@apollo/client";

export const GET_ME = gql`
me($username_string: String) {
    _id
    username
    email
    bookCount
    savedBooks
}
`;
