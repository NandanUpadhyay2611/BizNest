// app.js


import express from 'express'
import mongoose from 'mongoose';
import customerRoutes from './routes/customerRoutes.js'
const orderRoutes = require('./routes/orderRoutes').default;
const authMiddleware = require('./middlewares/auth');
const connectDB = require('./dbConnect'); 
require('dotenv').config();


const app = express();
connectDB(); 

app.use(express.json());

// Use Google OAuth middleware for protected routes
app.use(authMiddleware);


app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);

export default app;

