import express, { Request, Response } from 'express';
import Product from '../models/productModel';

const productRouter = express.Router();



/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Returns all products
 *     tags: [Products] 
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   imageUrl:
 *                     type: string
 *       500:
 *         description: Failed to retrieve products
 */
productRouter.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to retrieve products' });
    }
});


// Route to get a product by ID
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Returns a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 imageUrl:
 *                   type: string
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to retrieve product
 */
productRouter.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Failed to retrieve product' });
    }
});



// Route to create a new product
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Creates a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product's name
 *               description:
 *                 type: string
 *                 description: Product's description
 *               price:
 *                 type: number
 *                 description: Product's price
 *               imageUrl:
 *                 type: string
 *                 description: Product's image URL
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Failed to create product
 */
productRouter.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, price, imageUrl } = req.body;

        if (!name || !description || !price || !imageUrl) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            imageUrl,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Failed to create product' });
    }
});


// Route to update a product by ID
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Updates a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product's name
 *               description:
 *                 type: string
 *                 description: Product's description
 *               price:
 *                 type: number
 *                 description: Product's price
 *               imageUrl:
 *                 type: string
 *                 description: Product's image URL
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to update product
 */
productRouter.put('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.id;
        const { name, description, price, imageUrl } = req.body;

        // Validate input
        if (!name || !description || !price || !imageUrl) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        const product = await Product.findByPk(productId);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        // Update the product
        await product.update({
            name,
            description,
            price,
            imageUrl,
        });

        res.status(200).json({ 
            message: 'Product updated successfully', 
            product 
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Failed to update product' });
    }
});

// Route to delete a product by ID
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deletes a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to delete product
 */
productRouter.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        await product.destroy();
        res.status(200).json({ 
            message: 'Product deleted successfully',
            deletedProductId: productId 
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Failed to delete product' });
    }
});


export default productRouter;