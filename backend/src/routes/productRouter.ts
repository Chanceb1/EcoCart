import express, { Request, Response } from 'express';
import { ProductSchema, Product } from '../models/productModel';

const productRouter = express.Router();


// Route to get products
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Returns all products
 *     tags: [Products] 
 *     responses:
 *       200:
 *         description: List of products
 *       404:
 *         description: Products not found
 */
productRouter.get('/products', async (req: Request, res: Response): Promise<any> => {
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
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to retrieve product
 */
productRouter.get('/products/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
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
productRouter.post('/products', async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, description, price, imageUrl } = req.body;

        if (!name || !description || !price || !imageUrl) {
            return res.status(400).json({ message: 'Missing required fields' });
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
productRouter.put('/products/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const productId = req.params.id;
        const { name, description, price, imageUrl } = req.body;

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.update({
            name,
            description,
            price,
            imageUrl,
        });

        res.status(200).json({ message: 'Product updated successfully', product });
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
productRouter.delete('/products/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Failed to delete product' });
    }
});


export default productRouter;