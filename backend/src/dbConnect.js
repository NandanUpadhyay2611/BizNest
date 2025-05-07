import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


// Set strictQuery to false to avoid deprecation warnings
mongoose.set('strictQuery', false);

// Use environment variable or default to local MongoDB
const mongoDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/xeno_crm';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

