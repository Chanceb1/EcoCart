import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { Order } from './orderModel';
import { User } from './userModel';


// Add enums for categories and recycle methods
export type ProductCategory = 'electronics' | 'storage' | 'consumables';

export type RecycleMethod = 'paper' | 'metal' | 'compostable' | 'glass';


// Update the ProductSchema interface
export interface ProductSchema {
    id?: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    recycle_method: string;
    rating: number;
}

// Define the Product model
// This class extends the Sequelize Model class and implements the ProductSchema interface
export class Product extends Model<ProductSchema> implements ProductSchema {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public imageUrl!: string;
    public category!: ProductCategory;
    public recycle_method!: RecycleMethod;
    public rating!: number;
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
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM('electronics', 'storage', 'consumables'),
            allowNull: false,
        },
        recycle_method: {
            type: DataTypes.ENUM('paper', 'metal', 'compostable', 'glass'),
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 5,
            validate: {
                min: 1,
                max: 5,
            },
        }
    },
    {
        sequelize,
        tableName: 'products',
        modelName: 'Product'
    }
);

// define associations
Product.belongsToMany(Order, {
    through: 'OrderProducts',
    as: 'productOrders',
    foreignKey: 'productId'
});


export default Product;