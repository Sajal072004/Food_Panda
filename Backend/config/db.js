// import mongoose from 'mongoose'

// export const connectDB=async()=>{
//     await mongoose.connect('mongodb+srv://pratham2022ug4019:3v8cEHRf2HdhScvF@cluster0.qklopzn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/food-panda').then(()=>console.log('DB connected'));

// }

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB connected');
    } catch (error) {
        console.error('DB connection error:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

