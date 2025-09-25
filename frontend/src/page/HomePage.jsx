import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Cards from "../component/Cards";
import TransactionForm from "../component/TransactionForm";
import { MdLogout } from "react-icons/md";
import { useQuery } from "@apollo/client/react";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const { data, loading, error } = useQuery(GET_TRANSACTIONS, {
    variables: { userId },
  });


  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10 text-xl">Loading transactions...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 mt-10 text-xl">
        Error fetching transactions: {error.message}
      </p>
    );

  const transactions = data?.transactions || [];


  const totals = transactions.reduce(
    (acc, t) => {
      if (t.category === "saving") acc.saving += t.amount;
      else if (t.category === "expense") acc.expense += t.amount;
      else if (t.category === "investment") acc.investment += t.amount;
      return acc;
    },
    { saving: 0, expense: 0, investment: 0 }
  );

  const chartData = {
    labels: ["Saving", "Expense", "Investment"],
    datasets: [
      {
        label: "%",
        data: [totals.saving, totals.expense, totals.investment],
        backgroundColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  };

  return (
    <div className="flex w-screen flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
      <div className="flex items-center">
        <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
          Spend wisely, track wisely
        </p>
        <img
          src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
          className="w-11 h-11 rounded-full border cursor-pointer"
          alt="Avatar"
        />
        <MdLogout className="mx-2 w-5 h-5 cursor-pointer" />
      </div>

      <div className="flex flex-wrap w-full justify-center items-center gap-6">
        <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]">
          <Doughnut data={chartData} />
        </div>

        <TransactionForm />
      </div>

      <Cards transactions={transactions} />
    </div>
  );
};

export default HomePage;
