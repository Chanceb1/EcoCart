import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { Product } from './productModel';

// Define the Order schema
export interface OrderSchema {
    id?: number;
    userId: number;
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled';
    orderDate: Date;
    shippingAddress: string;
    products?: Array<{
        productId: number;
        quantity: number;
        price: number;
    }>;
}

// Define the Order model
export class Order extends Model<OrderSchema> implements OrderSchema {
    public id!: number;
    public userId!: number;
    public totalAmount!: number;
    public status!: 'pending' | 'completed' | 'cancelled';
    public orderDate!: Date;
    public shippingAddress!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the Order model
Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
            allowNull: false,
            defaultValue: 'pending',
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        shippingAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'orders',
        modelName: 'Order'
    }
);

// Define associations
Order.belongsToMany(Product, {
    through: 'OrderProducts',
    as: 'products',
    foreignKey: 'orderId'
});

Product.belongsToMany(Order, {
    through: 'OrderProducts',
    as: 'orders',
    foreignKey: 'productId'
});


export default Order;