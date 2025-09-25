const transactionTypeDef=`#graphql 
 type Transaction{
    _id:ID!
    userId:ID!
    description:String!
    amount:Float!
    location:String
    category:String!
    date:String!
    paymentType:String!

 }
type Query{
      transactions(userId: ID!): [Transaction!]
    transaction(transactionId:ID!):Transaction
}

type Mutation{
    createdTransaction(input:CreateTransactionInput!) :Transaction!
    updateTransaction(input:UpdateTransactionInput!):Transaction!
    deleteTransaction(transactionId:ID!):Transaction!
}
input CreateTransactionInput{
    userId: ID!
    description:String!
    amount:Float!
    location:String
    category:String!
    date:String!
    paymentType:String!
}

input UpdateTransactionInput{
    transactionId:ID!
     description:String
    amount:Float
    location:String
    category:String
    date:String
    paymentType:String
}
`
export default transactionTypeDef