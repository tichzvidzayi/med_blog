// Import necessary modules
import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan'; // For HTTP request logging
import cors from 'cors'; // For Cross-Origin Resource Sharing
import dotenv from 'dotenv'; // For loading environment variables
import { db } from './utils/database'; // Database connection
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import authRoutes from './routes/authRoutes';

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app: Application = express();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(morgan('dev')); // HTTP request logger
app.use(cors()); // Enable CORS

// Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/posts', postRoutes); // Post routes
app.use('/api/auth', authRoutes); // Authentication routes

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 3000;

// Initialize database connection
db.query('SELECT 1') // Replace 'SELECT 1' with your actual SQL query
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });