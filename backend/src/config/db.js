import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ MongoDB connected:', conn.connection.host);
    console.log('📦 Connected database:', conn.connection.name);
  } catch (error) {
    console.error('Failed to connect to DB:', error.message);
    process.exit(1);
  }
};

export default connectDB;