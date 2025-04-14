import express, { Request, Response } from 'express';
import cors from 'cors';
import {sequelize} from './database';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger';
import userRouter from './routes/userRouter';
import productRouter from './routes/productRouter';
import orderRouter from './routes/ordersRouter';

// use : Promise<void> to avoid type errors with async/await

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Swagger documentation route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// API routes
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);


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

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
