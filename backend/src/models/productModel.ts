import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../database'; // Import the Sequelize instance

export interface ProductSchema {
    id?: number; // Changed to number for Sequelize auto-increment
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}


// Define the Product model
class Product extends Model<ProductSchema> implements ProductSchema {
    public id!: number; // Note the definite assignment assertion (!)
    public name!: string;
    public description!: string;
    public price!: number;
    public imageUrl!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the Product model
Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT, // Use FLOAT or DECIMAL for prices
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize, // Pass the Sequelize instance
        tableName: 'products', // Choose a table name
    }
);

export { Product };