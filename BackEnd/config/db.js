import dotenv from 'dotenv';
import mongoose from 'mongoose'; 

dotenv.config();
// MongoDB connection URI
const mongoURI = process.env.MONGO_URI // Replace with your MongoDB URI

// Function to connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB sucessfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the app if the database connection fails
  }
};