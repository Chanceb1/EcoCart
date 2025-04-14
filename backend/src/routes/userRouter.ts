import express, { Request, Response } from 'express';
import User from '../models/userModel';


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
userRouter.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } // Don't send passwords
        });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to load users.' });
    }
});


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
userRouter.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.id);
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
});

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
userRouter.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
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
});


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
userRouter.put('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.id);
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
            res.status(500).json({ message: 'Error retrieving updated user.' });
            return;
        }

        // Send the response with status code
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user.' });
    }
});


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
userRouter.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.id);
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
});

export default userRouter;