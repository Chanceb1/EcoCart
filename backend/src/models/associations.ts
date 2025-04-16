import { User } from './userModel';
import { Order } from './orderModel';
import { Product } from './productModel';
import { setDefaultResultOrder } from 'dns';

export const setupAssociations = () => {
    // Order associations
    Order.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'cascade'
    });

    Product.belongsTo(User, {
        foreignKey: 'sellerId',
        as: 'user',
        onDelete: 'cascade'
    });
};
