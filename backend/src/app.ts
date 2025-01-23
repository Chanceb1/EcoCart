import express, { Request, Response } from 'express';
import { promises as fs } from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';

interface Order {
    items: {
        id: string;
        quantity: number;
    }[];
    customer: {
        name: string;
        email: string;
        street: string;
        'postal-code': string;
        city: string;
    };
}

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Route to get meals
app.get('/meals', async (req, res) => {
    try {
        const meals = await fs.readFile('./data/available-meals.json', 'utf8');
        res.json(JSON.parse(meals));
    } catch (error) {
        res.status(500).json({ message: 'Failed to load meals.' });
    }
});

// Route to get orders
app.post('/orders', async (req, res) => {
    try {
        const orderData: Order = req.body.order;

        if (!orderData || !orderData.items || orderData.items.length === 0) {
            res.status(400).json({ message: 'Invalid order data received.' });
            return;
        }

        if (
            orderData.customer.email === null ||
            !orderData.customer.email.includes('@') ||
            orderData.customer.name === null ||
            orderData.customer.name.trim() === '' ||
            orderData.customer.street === null ||
            orderData.customer.street.trim() === '' ||
            orderData.customer['postal-code'] === null ||
            orderData.customer['postal-code'].trim() === '' ||
            orderData.customer.city === null ||
            orderData.customer.city.trim() === ''
        ) {
            return void res.status(400).json({
                message:
                    'Missing data: Email, name, street, postal code or city is missing.'
            });
        }

        const newOrder = {
            ...orderData,
            id: (Math.random() * 1000).toString()
        };

        const orders = await fs.readFile('./data/orders.json', 'utf8');
        const allOrders = JSON.parse(orders);
        allOrders.push(newOrder);

        await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
        res.status(201).json({ message: 'Order created!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order.' });
    }
});

// Handle unknown routes
app.use((req, res) => {
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }

    res.status(404).json({ message: 'Not found' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
