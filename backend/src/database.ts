// this file sets up the postgress database connection

import { PrismaClient } from '@prisma/client';
import { env } from './env';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('Connected to the database successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

const disconnectDB = async () => {
    try {
        await prisma.$disconnect();
        console.log('Disconnected from the database successfully');
    } catch (error) {
        console.error('Error disconnecting from the database:', error);
    }
};

const main = async () => {
    await connectDB();
    // Add your database operations here
};
    await disconnectDB();

