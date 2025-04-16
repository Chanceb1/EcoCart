import express, { Request, Response } from 'express';
import { promises as fs } from 'fs';
import Order from '../models/orderModel';
import Product from '../models/productModel';
import { authenticate } from '../middleware/auth';

const orderRouter = express.Router();

interface OrderRequest {
    userId: number;
    shippingAddress: string;
    items: {
        id: string;
        quantity: number;
    }[];
}

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: number
 *                     description: ID of the user creating the order
 *                   shippingAddress:
 *                     type: string
 *                     description: Shipping address for the order
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         quantity:
 *                           type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid order data
 *       500:
 *         description: Server error
 */
orderRouter.post('/', authenticate, async (req, res): Promise<any> => {
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
            userId: req.user!.id,
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

interface OrderProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface OrderResponse {
    id: string;
    orderDate: Date;
    status: string;
    shippingAddress: string;
    items: OrderProduct[];
    totalPrice: number;
}

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: Get order history for a user
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Order history retrieved successfully
 *       404:
 *         description: No orders found
 *       500:
 *         description: Server error
 */
orderRouter.get(
    '/user/:userId',
    async (req: Request, res: Response): Promise<any> => {
        try {
            const userId = parseInt(req.params.userId);

            // Find all orders for the user
            const orders = await Order.findAll({
                where: { userId },
                order: [['orderDate', 'DESC']]
            });

            if (!orders || orders.length === 0) {
                return res
                    .status(404)
                    .json({ message: 'No orders found for this user' });
            }

            // Process each order to include product details
            const orderHistory: OrderResponse[] = await Promise.all(
                orders.map(async order => {
                    const productEntries = order.products.split(',');
                    const items: OrderProduct[] = [];
                    let totalPrice = 0;

                    // Process each product in the order
                    for (const entry of productEntries) {
                        const [productId, quantity] = entry.split(':');
                        const product = await Product.findByPk(productId);

                        if (product) {
                            const itemTotal =
                                product.price * parseInt(quantity);
                            totalPrice += itemTotal;

                            items.push({
                                id: product.id.toString(), // Convert to string explicitly
                                name: product.name,
                                price: product.price,
                                quantity: parseInt(quantity)
                            });
                        }
                    }

                    return {
                        id: order.id.toString(), // Convert to string explicitly
                        orderDate: order.orderDate,
                        status: order.status,
                        shippingAddress: order.shippingAddress,
                        items,
                        totalPrice
                    };
                })
            );

            res.status(200).json(orderHistory);
        } catch (error) {
            console.error('Error fetching order history:', error);
            res.status(500).json({ message: 'Failed to fetch order history' });
        }
    }
);

export default orderRouter;
