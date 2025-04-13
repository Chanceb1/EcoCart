import { User } from '../models/userModel';
import { Order } from '../models/orderModel';
import { Product } from '../models/productModel';

export const setupAssociations = () => {
    // Order associations
    Order.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
    });

    User.hasMany(Order, {
        foreignKey: 'userId',
        as: 'orders'
    });

    // Add any other associations here
};