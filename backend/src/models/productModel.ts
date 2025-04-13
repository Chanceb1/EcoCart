import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { Order } from './orderModel';
import { User } from './userModel';

// Define the Product schema
// This interface defines the structure of the Product model
// for json serialization and deserialization
// and is used to define the model attributes in Sequelize
export interface ProductSchema {
    id?: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

// Define the Product model
// This class extends the Sequelize Model class and implements the ProductSchema interface
export class Product extends Model<ProductSchema> implements ProductSchema {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public imageUrl!: string;
}

// Initialize the Product model
Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'products',
        modelName: 'Product'
    }
);

export default Product;
