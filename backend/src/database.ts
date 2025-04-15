import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH || path.join(__dirname, 'ecocart.sqlite'),
    logging: false
});

// Import models
import { User } from './models/userModel';
import { Product, ProductCategory, RecycleMethod } from './models/productModel';
import { setupAssociations } from './models/associations';

// Initialize database
export const initDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Setup associations before syncing
        setupAssociations();

        // Sync all models
        await sequelize.sync({ alter: true });
        console.log('Database synced successfully');

        const userCount = await User.count();
        const productCount = await Product.count();

        if (userCount === 0 && productCount === 0) {
            await seedDatabase();
        } else {
            console.log(
                `Database already contains ${userCount} users and ${productCount} products`
            );
        }
    } catch (error) {
        console.error('Unable to initialize database:', error);
        process.exit(1);
    }
};

// Seed data function
const seedDatabase = async () => {
    try {
        console.log('Starting to seed database...');

        // Sample users
        const sampleUsers = [
            {
                firstName: 'chance',
                lastName: 'b',
                email: 'cb@email.com',
                password: '1234',
                address: '123 Main St, City, State 12345',
                role: 'user' as const
            },
            {
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@example.com',
                password: '1234',
                address: '456 Admin St, City, State 12345',
                role: 'admin' as const
            }
        ];

        // sample products
        const sampleProducts = [
            {
                name: 'Eco-Friendly Water Bottle',
                description: 'Reusable stainless steel water bottle',
                price: 24.99,
                imageUrl: '/images/water-bottle.jpg',
                category: 'consumables',
                recycle_method: 'metal',
                rating: 4
            },
            {
                name: 'Bamboo Utensil Set',
                description: 'Sustainable bamboo cutlery set',
                price: 15.99,
                imageUrl: '/images/bamboo-utensils.jpg',
                category: 'consumables',
                recycle_method: 'compostable',
                rating: 3
            },
            {
                name: 'Organic Cotton Tote',
                description: 'Reusable shopping bag made from organic cotton',
                price: 12.99,
                imageUrl: '/images/tote-bag.jpg',
                category: 'storage',
                recycle_method: 'compostable',
                rating: 4
            },
            {
                name: 'Biodegradable Phone Case',
                description: 'Eco-friendly phone case made from biodegradable materials',
                price: 19.99,
                imageUrl: '/images/phone-case.jpg',
                category: 'electronics',
                recycle_method: 'compostable',
                rating: 5
            },
            {
                name: 'Solar-Powered Charger',
                description: 'Portable solar charger for devices',
                price: 39.99,
                imageUrl: '/images/solar-charger.jpg',
                category: 'electronics',
                recycle_method: 'metal',
                rating: 2
            },
            {
                name: 'Recycled Paper Notebook',
                description: 'Notebook made from recycled paper',
                price: 9.99,
                imageUrl: '/images/notebook.jpg',
                category: 'consumables',
                recycle_method: 'paper',
                rating: 3
            },
            {
                name: "Smart Phone",
                description: "Eco-conscious smartphone. High performance, planet friendly.",
                price: 699.99,
                imageUrl: "/images/smartphone.jpg",
                category: 'electronics',
                recycle_method: 'metal',
                rating: 4
            }
        ];

        // Create users first
        await User.bulkCreate(sampleUsers);
        console.log('Sample users created successfully');

        // Create products
        await Product.bulkCreate(sampleProducts);
        console.log('Sample products created successfully');

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

export { sequelize };
