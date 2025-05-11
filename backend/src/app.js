
import express from 'express'
import mongoose from 'mongoose';
import customerRoutes from './routes/customerRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import segmentRoutes from './routes/segmentRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import connectDB from './dbConnect.js'
import dotenv from 'dotenv'
import cors from "cors";
import vendorRoutes from './routes/vendorRoutes.js'
import campaignRoutes from './routes/campaignRoutes.js'
import { verifyGoogleToken } from './middlewares/auth.js';



dotenv.config();


const app = express();
app.use(cors());

connectDB(); 

app.use(express.json());



app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/segments',verifyGoogleToken, segmentRoutes);
app.use("/api/ai", verifyGoogleToken,aiRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/campaigns",verifyGoogleToken,campaignRoutes);

export default app;

