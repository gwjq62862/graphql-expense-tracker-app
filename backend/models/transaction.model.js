import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
        enum: ["cash", "card"],

    },
    category: {
        type: String,
        required: true,
        enum: ["saving", "expense", "invest"],
    },
    amount: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        default: "unknown"
    },
    date: {
        type: Date,
        required: true,
    }
})

const Transaction=mongoose.model("Transaction",transactionSchema)
export default Transaction