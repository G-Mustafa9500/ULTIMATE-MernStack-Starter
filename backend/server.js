import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import connectDB from './src/config/db.js';

await connectDB();

console.log('MongoDB Connected');

export default app;
