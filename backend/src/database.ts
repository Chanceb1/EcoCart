import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';
import { Product } from './models/productModel';
// import { User } from './models/userModel';
// import { Order } from './models/orderModel';


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: false,
});


// Seed data function
const seedDatabase = async () => {
    try {
        console.log('Starting to seed database...');
        const sampleProducts = [
            {
                name: 'Eco-Friendly Water Bottle',
                description: 'Reusable stainless steel water bottle',
                price: 24.99,
                imageUrl: '/images/water-bottle.jpg'
            },
            {
                name: 'Bamboo Utensil Set',
                description: 'Sustainable bamboo cutlery set',
                price: 15.99,
                imageUrl: '/images/bamboo-utensils.jpg'
            },
            {
                name: 'Organic Cotton Tote',
                description: 'Reusable shopping bag made from organic cotton',
                price: 12.99,
                imageUrl: '/images/tote-bag.jpg'
            }
        ];

        await Product.bulkCreate(sampleProducts);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

// Initialize database
const initDatabase = async () => {
    try {
        // Test the connection
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Sync all models
        await sequelize.sync({ force: true });
        console.log('Database synced successfully');

        // Check if products table is empty
        const count = await Product.count();
        if (count === 0) {
            // Seed the database
            await seedDatabase();
        } else {
            console.log(`Database already contains ${count} products`);
        }
    } catch (error) {
        console.error('Unable to initialize database:', error);
        process.exit(1); // Exit if database initialization fails
    }
};

// Run initialization
initDatabase();

export { sequelize };