import mongoose from "mongoose";

const connectDB = async () =>{
    try {
         mongoose.connection.on('connected',() => console.log('databse connected')
         );
         await mongoose.connect(`${process.env.MONGODB_URI}/green-basket`)
    } catch (error) {
        console.error(error.message)
        
    }
}

export default connectDB;