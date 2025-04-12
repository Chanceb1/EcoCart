import express, { Request, Response } from 'express';
import { promises as fs } from 'fs';


const orderRouter = express.Router();

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

// Route to get orders
/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: object
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid order data
 *       500:
 *         description: Server error
 */
orderRouter.post('/orders', async (req, res): Promise<any> => {
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


export default orderRouter;