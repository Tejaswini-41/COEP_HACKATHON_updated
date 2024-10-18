import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  
import authRoutes from './routes/auth.js';
import repoRoutes from './routes/Repo.js';

dotenv.config();  
connectDB();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // Adjust this to match your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials if needed
};

app.use(cors(corsOptions));
app.use(express.json());  

// Use the routes
app.use('/auth', authRoutes); 
app.use('/repo', repoRoutes);
app.post('/process', (req, res) => {
    // Your processing logic here
    res.send('Request received');
});
  
app.post('/ask', (req, res) => {
    res.send('Request received for question');
});
  


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

