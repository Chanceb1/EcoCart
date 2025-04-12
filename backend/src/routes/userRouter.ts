import express from 'express';
import type { Request, Response } from 'express';
import { promises as fs } from 'fs';


const userRouter = express.Router();

// Interface for User type
interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns all users
 *     tags: [Users]  # Add the tag here
 *     responses:
 *       200:
 *         description: List of users
 */
userRouter.get('/users', async (req, res) => {
  try {
    const users = await fs.readFile('./data/users.json', 'utf8');
    res.json(JSON.parse(users));
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
 *     tags: [Users]  # Add the tag here
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
userRouter.get('/user/:id', async (req, res): Promise<any> => {
  try {
    const userId = req.params.id;
    const users = await fs.readFile('./data/users.json', 'utf8');
    const allUsers = JSON.parse(users);
    
    const user = allUsers.find((user: User) => user.id === userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
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
 *               name:
 *                 type: string
 *                 description: User's name
 *               email:
 *                 type: string
 *                 description: User's email address
 *               address:
 *                 type: string
 *                 description: User's address
 *               city:
 *                 type: string
 *                 description: User's city
 *               postalCode:
 *                 type: string
 *                 description: User's postal code
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Failed to create user
 */
userRouter.post('/user', async (req: Request, res: Response) => {
  try {
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      ...req.body
    };

    const users = await fs.readFile('./data/users.json', 'utf8');
    const allUsers = JSON.parse(users);
    allUsers.push(newUser);

    await fs.writeFile('./data/users.json', JSON.stringify(allUsers, null, 2));
    res.status(201).json(newUser);
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
 *     tags: [Users]  # Add the tag here
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to update user
 */
userRouter.put('/:id', async (req, res): Promise<any> => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;
    
    const users = await fs.readFile('./data/users.json', 'utf8');
    const allUsers = JSON.parse(users);
    
    const userIndex = allUsers.findIndex((user: User) => user.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    allUsers[userIndex] = { ...allUsers[userIndex], ...updatedUserData };
    await fs.writeFile('./data/users.json', JSON.stringify(allUsers, null, 2));
    
    res.json(allUsers[userIndex]);
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
 *     tags: [Users]  # Add the tag here
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to delete user
 */
userRouter.delete('/user/:id', async (req, res): Promise<any> => {
  try {
    const userId = req.params.id;
    const users = await fs.readFile('./data/users.json', 'utf8');
    const allUsers = JSON.parse(users);
    
    const userIndex = allUsers.findIndex((user: User) => user.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    allUsers.splice(userIndex, 1);
    await fs.writeFile('./data/users.json', JSON.stringify(allUsers, null, 2));
    
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user.' });
  }
});


export default userRouter;