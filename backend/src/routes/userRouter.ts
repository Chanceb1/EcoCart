import express, { Request, Response } from 'express';
import User from '../models/userModel';
import { authenticate } from '../middleware/auth';
import Product from '../models/productModel';
import Order from '../models/orderModel';

const userRouter = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
userRouter.get(
    '/',
    authenticate,
    async (req: Request, res: Response): Promise<void> => {
        try {
            if (req.user!.role !== 'admin') {
                return void res.status(401).json({
                    message: 'You do not have permission to list all users'
                });
            }

            const users = await User.findAll({
                attributes: { exclude: ['password'] } // Don't send passwords
            });
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Failed to load users.' });
        }
    }
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Returns a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
userRouter.get(
    '/user/:id',
    authenticate,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.id);

            if (req.user!.role !== 'admin' && req.user!.id !== userId) {
                return void res.status(401).json({
                    message:
                        'You do not have permission to look at that account'
                });
            }

            const user = await User.findByPk(userId, {
                attributes: { exclude: ['password'] }
            });

            if (!user) {
                res.status(404).json({ message: 'User not found.' });
                return;
            }

            res.json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Failed to load user data.' });
        }
    }
);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Creates a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
userRouter.post(
    '/',
    authenticate,
    async (req: Request, res: Response): Promise<void> => {
        try {
            if (req.user!.role !== 'admin') {
                return void res.status(401).json({
                    message: 'You do not have permission to create an account'
                });
            }

            const { firstName, lastName, email, password, address } = req.body;

            if (!firstName || !lastName || !email || !password) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }

            const user = await User.create({
                firstName,
                lastName,
                email,
                password,
                address,
                role: 'user'
            });

            // Don't send the password back
            const { password: _, ...userWithoutPassword } = user.toJSON();
            res.status(201).json(userWithoutPassword);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Failed to create user.' });
        }
    }
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Updates a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
userRouter.put(
    '/:id',
    authenticate,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.id);

            if (req.user!.role !== 'admin' && req.user!.id !== userId) {
                return void res.status(401).json({
                    message:
                        'You do not have permission to look at that account'
                });
            }

            const { firstName, lastName, email, address } = req.body;

            const user = await User.findByPk(userId);

            if (!user) {
                res.status(404).json({ message: 'User not found.' });
                return;
            }

            // Update the user
            await user.update({
                firstName,
                lastName,
                email,
                address
            });

            // Fetch the updated user to ensure we have the latest data
            const updatedUser = await User.findByPk(userId, {
                attributes: { exclude: ['password'] }
            });

            if (!updatedUser) {
                res.status(500).json({
                    message: 'Error retrieving updated user.'
                });
                return;
            }

            // Send the response with status code
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Failed to update user.' });
        }
    }
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deletes a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
userRouter.delete(
    '/:id',
    authenticate,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.id);

            if (req.user!.role !== 'admin' && req.user!.id !== userId) {
                return void res.status(401).json({
                    message: 'You do not have permission to delete that account'
                });
            }

            const user = await User.findByPk(userId);

            if (!user) {
                res.status(404).json({ message: 'User not found.' });
                return;
            }

            await user.destroy();
            res.status(200).json({
                message: 'User deleted successfully',
                deletedUserId: userId
            });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Failed to delete user.' });
        }
    }
);

interface SellerStats {
    totalListings: number;
    totalOrders: number;
    totalItems: number;
}

userRouter.get(
    '/sellerstats',
    authenticate,
    async (req: Request, res: Response): Promise<void> => {
        try {
            if (!['seller', 'admin'].includes(req.user?.role ?? '')) {
                return void res.status(401).json({
                    message: 'You are not a seller'
                });
            }

            const totalListings = await Product.count({
                where: { sellerId: req.user?.id }
            });

            const totalOrders = await (
                await Promise.all(
                    (
                        await Order.findAll()
                    ).filter(
                        async order =>
                            await Promise.all(
                                order.products.split(',').map(order =>
                                    order
                                        .split(':')
                                        .map(async ([productId, quantity]) => {
                                            const product =
                                                await Product.findByPk(
                                                    productId
                                                );
                                            return (
                                                product?.sellerId ===
                                                req.user?.id
                                            );
                                        })
                                )
                            )
                    )
                )
            ).length;

            res.status(200).json({
                totalListings,
                totalOrders,
                totalItems: totalListings
            } as SellerStats);
        } catch (error) {
            console.error('Error getting seller stats:', error);
            res.status(500).json({ message: 'Failed to get seller stats.' });
        }
    }
);

export default userRouter;
