import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { UPDATE_TRANSACTION } from "../graphql/mutation/transaction.mutaion";
import toast from "react-hot-toast";

const TransactionPage = () => {
  const { id } = useParams(); // transaction ID from URL
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  // Fetch user's transactions
  const { data, loading, error } = useQuery(GET_TRANSACTIONS, { variables: { userId } });
  
  // Find the transaction to edit
  const transaction = data?.transactions.find(t => t._id === id);

  const [formData, setFormData] = useState({
    description: "",
    paymentType: "card",
    category: "expense",
    amount: "",
    location: "",
    date: "",
  });

  // Pre-fill form when transaction loads
  useEffect(() => {
    if (transaction) {
      setFormData({
        description: transaction.description,
        paymentType: transaction.paymentType,
        category: transaction.category,
        amount: transaction.amount,
        location: transaction.location || "",
        date: transaction.date ? transaction.date.split("T")[0] : "",
      });
    }
  }, [transaction]);

  // Mutation
  const [updateTransaction, { loading: updating }] = useMutation(UPDATE_TRANSACTION, {
    onCompleted: () => navigate("/transaction"),
    onError: (err) => console.error(err),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!transaction) return;

  const payload = {
    transactionId: id,               
    description: formData.description,
    paymentType: formData.paymentType,
    category: formData.category,
    amount: parseFloat(formData.amount), 
    location: formData.location,
    date: formData.date,                
  };

  try {
    await updateTransaction({
      variables: { input: payload }, 
    });
    navigate("/");
	toast.success('your transaction has been updated successfully')
  } catch (err) {
    console.error("Update failed:", err);
  }
};
  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (!transaction) return <p className="text-center mt-10 text-gray-500">Transaction not found.</p>;

  return (
    <div className='h-screen max-w-4xl mx-auto flex flex-col items-center'>
      <h1 className='md:text-4xl text-2xl lg:text-4xl font-bold text-center my-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400'>
        Update Transaction
      </h1>
      <form className='w-full max-w-lg flex flex-col gap-5 px-3' onSubmit={handleSubmit}>
        <input
          name='description'
          value={formData.description}
          onChange={handleInputChange}
          placeholder='Description'
          className='p-2 rounded bg-gray-900 text-white border'
          required
        />
        <select
          name='paymentType'
          value={formData.paymentType}
          onChange={handleInputChange}
          className='p-2 bg-gray-900 text-white rounded border'
          required
        >
          <option value="card">Card</option>
          <option value="cash">Cash</option>
        </select>
        <select
          name='category'
          value={formData.category}
          onChange={handleInputChange}
          className='p-2 bg-gray-900 text-white rounded border'
          required
        >
          <option value="saving">Saving</option>
          <option value="expense">Expense</option>
          <option value="investment">Investment</option>
        </select>
        <input
          name='amount'
          type='number'
          value={formData.amount}
          onChange={handleInputChange}
          placeholder='Amount'
          className='p-2 rounded bg-gray-900 text-white border'
          required
        />
        <input
          name='location'
          value={formData.location}
          onChange={handleInputChange}
          placeholder='Location'
          className='p-2 rounded bg-gray-900 text-white border'
        />
        <input
          name='date'
          type='date'
          value={formData.date}
          onChange={handleInputChange}
          className='p-2 rounded bg-gray-900 text-white border'
        />
        <button
          type='submit'
          disabled={updating}
          className='bg-pink-500 text-white font-bold p-2 rounded hover:bg-pink-600'
        >
          {updating ? "Updating..." : "Update Transaction"}
        </button>
      </form>
    </div>
  );
};

export default TransactionPage;
