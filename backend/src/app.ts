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

// Route to get products
app.get('/products', async (req, res) => {
    try {
        const products = await fs.readFile(
            './data/available-products.json',
            'utf8'
        );
        res.json(JSON.parse(products));
    } catch (error) {
        res.status(500).json({ message: 'Failed to load Products.' });
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

// Route to get a specific user by ID
app.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const users = await fs.readFile('./data/users.json', 'utf8');
        const allUsers = JSON.parse(users);

        const user = allUsers.find(
            (user: { id: string }) => user.id === userId
        );

        if (!user) {
            return void res.status(404).json({ message: 'User not found.' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Failed to load user data.' });
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
const HOST = process.env.HOST || 'localhost';
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
