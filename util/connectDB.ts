import mongoose from "mongoose";

async function connectToDatabase() {
    try {
      if (mongoose.connection.readyState === 1) {
        console.log('Already connected to MongoDB!');
        return;
      }
  
      const dbLink = process.env.DB_LINK;
  
      if (!dbLink) {
        throw new Error('DB_LINK environment variable is not set.');
      }
      await mongoose.connect(dbLink, {});
  
      console.log('Connected to MongoDB!');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }

export default connectToDatabase