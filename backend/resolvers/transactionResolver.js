import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
 
 transactions: async (_, { userId }) => {
  try {
    if (!userId) {
      throw new Error("User ID is required to fetch transactions");
    }
    return await Transaction.find({ userId });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error(error.message);
  }
},
    transaction: async (_, { transactionId }) => {
      try {
        return await Transaction.findById(transactionId);
      } catch (error) {
        console.error("Error fetching transaction:", error);
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
   
    createdTransaction: async (_, { input }) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          date: new Date(input.date), 
        });

        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.error("Error creating transaction:", error);
        throw new Error(error.message);
      }
    },


    updateTransaction: async (_, { input }) => {
      try {
        const { transactionId, ...updates } = input;
        return await Transaction.findByIdAndUpdate(transactionId, updates, { new: true });
      } catch (error) {
        console.error("Error updating transaction:", error);
        throw new Error(error.message);
      }
    },

  
    deleteTransaction: async (_, { transactionId }) => {
      try {
        return await Transaction.findByIdAndDelete(transactionId);
      } catch (error) {
        console.error("Error deleting transaction:", error);
        throw new Error(error.message);
      }
    },
  },
};

export default transactionResolver;
