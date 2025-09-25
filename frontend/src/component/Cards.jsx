import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import Card from "./Card";

const Cards = () => {
 const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const { data, loading, error } = useQuery(GET_TRANSACTIONS, {
    variables: { userId },
    skip: !userId,
  });

  if (!user) return <p className="text-center text-gray-500">Please log in to see your transactions.</p>;
  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error.message}</p>;

  const transactions = data?.transactions || [];

  return (
    <div className='w-full px-10 min-h-[40vh]'>
      <p className='text-5xl font-bold text-center my-10'>History</p>
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
          {transactions.map((transaction) => (
            <Card key={transaction._id} transaction={transaction} userId={userId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;
