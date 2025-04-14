import { User } from './userModel';
import { Order } from './orderModel';
import { Product } from './productModel';

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

    Product.belongsToMany(Order, {
        through: 'OrderProducts',
        as: 'productOrders',
        foreignKey: 'productId'
    });
};
