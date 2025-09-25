import mongoose from "mongoose";

export async function connectDb(){
    try {
        const con= await mongoose.connect(process.env.DB_URL)
        console.log(`mongodb connected successfully ${con.connection.host}`)
    } catch (error) {
        console.log('erorr in conecting database ',error)
        process.exit(1)
    }
   
}