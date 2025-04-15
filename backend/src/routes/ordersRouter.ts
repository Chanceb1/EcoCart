import express, { Request, Response } from 'express';
import { promises as fs } from 'fs';
import Order from '../models/orderModel';

const orderRouter = express.Router();

interface OrderRequest {
    userId: number;
    shippingAddress: string;
    items: {
        id: string;
        quantity: number;
    }[];
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
        const orderRequest: OrderRequest = req.body.order;

        if (
            !orderRequest ||
            !orderRequest.items ||
            orderRequest.items.length === 0
        ) {
            res.status(400).json({ message: 'Invalid order data received.' });
            return;
        }

        await Order.create({
            userId: orderRequest.userId,
            status: 'pending',
            orderDate: new Date(),
            shippingAddress: orderRequest.shippingAddress,
            products: orderRequest.items
                .map(({ id, quantity }) => `${id}:${quantity}`)
                .join(',')
        });

        res.status(201).json({ message: 'Order created!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order.' });
    }
});

export default orderRouter;
