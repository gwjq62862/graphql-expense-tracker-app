import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query GetTransactions($userId: ID!) {
    transactions(userId: $userId) {
      _id
      description
      amount
      location
      category
      date
      paymentType
      userId
    }
  }
`;
