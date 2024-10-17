import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  
import authRoutes from './routes/auth.js';

dotenv.config();  
connectDB();

const app = express();
app.use(cors());
app.use(express.json());  

// Use the routes
app.use('/auth', authRoutes);  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
