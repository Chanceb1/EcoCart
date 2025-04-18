import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { User } from './userModel';

// Define the Order schema
export interface OrderSchema {
    id?: number;
    userId: number;
    status: 'pending' | 'completed' | 'cancelled';
    orderDate: Date;
    shippingAddress: string;
    products: string; // `${id}:${quantity},...`
}

// Define the Order model
export class Order extends Model<OrderSchema> implements OrderSchema {
    public id!: number;
    public userId!: number;
    public status!: 'pending' | 'completed' | 'cancelled';
    public orderDate!: Date;
    public shippingAddress!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public products!: string;
}

// Initialize the Order model
Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            },
            onDelete: 'cascade'
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
            allowNull: false,
            defaultValue: 'pending'
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        shippingAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        products: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'orders',
        modelName: 'Order'
    }
);

export default Order;
