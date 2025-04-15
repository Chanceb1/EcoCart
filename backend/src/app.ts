import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger';
import { initDatabase } from './database';
import userRouter from './routes/userRouter';
import productRouter from './routes/productRouter';
import orderRouter from './routes/ordersRouter';
import authRouter from './routes/authRouter';
import { authenticate, authorizeAdmin } from './middleware/auth';

// use : Promise<void/any> to avoid type errors with async/await

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Swagger documentation middleware
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// API routes
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/auth', authRouter);


// // Public routes
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
// app.use('/api/auth', authRouter);
// app.use('/api/products', productRouter); // if you want product listing to be public

// // Protected routes
// app.use('/api/users', authenticate, userRouter);
// app.use('/api/orders', authenticate, orderRouter);

// // Admin only routes (if needed)
// app.use('/api/admin', authenticate, authorizeAdmin, adminRouter);


 // error handling middleware
app.use((req, res) => {
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }

    res.status(404).json({ message: 'Not found' });
});

// Start server
const HOST = process.env.HOST || 'localhost';
const PORT = Number(process.env.PORT) || 5000;

// Initialize database before starting server
initDatabase().then(() => {
    app.listen(PORT, HOST, () => {
        console.log(`Server is running on http://${HOST}:${PORT}`);
    });
}).catch(error => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
});
