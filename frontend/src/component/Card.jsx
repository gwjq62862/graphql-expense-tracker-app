import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar, FaTrash } from "react-icons/fa6";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { DELETE_TRANSACTION } from "../graphql/mutation/transaction.mutaion";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
};

const Card = ({ transaction, userId }) => {
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: [{ query: GET_TRANSACTIONS, variables: { userId } }],
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction({ variables: { transactionId: transaction._id } });
    }
  };

  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const cardClass = categoryColorMap[transaction.category] || "from-gray-600 to-gray-400";

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-row items-center justify-between'>
          <h2 className='text-lg font-bold text-white capitalize'>{transaction.category}</h2>
          <div className='flex items-center gap-2'>
            <FaTrash onClick={handleDelete} className='cursor-pointer text-white hover:text-red-300 transition' />
            <Link to={`/transaction/${transaction._id}`}>
              <HiPencilAlt className='cursor-pointer text-white hover:text-yellow-300 transition' size={20} />
            </Link>
          </div>
        </div>
        <p className='text-white flex items-center gap-1'><BsCardText /> Description: {transaction.description}</p>
        <p className='text-white flex items-center gap-1'><MdOutlinePayments /> Payment Type: {transaction.paymentType}</p>
        <p className='text-white flex items-center gap-1'><FaSackDollar /> Amount: ${transaction.amount}</p>
        <p className='text-white flex items-center gap-1'><FaLocationDot /> Location: {transaction.location || "Unknown"}</p>
        <div className='flex justify-between items-center'>
          <p className='text-xs text-black font-bold'>{formattedDate}</p>
          <img src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"} className='h-8 w-8 border rounded-full' alt='user avatar' />
        </div>
      </div>
    </div>
  );
};

export default Card;
