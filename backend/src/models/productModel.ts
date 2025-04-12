import { DataTypes, Model } from 'sequelize';


export interface ProductSchema {
    id?: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}


// Define the Product model
export class Product extends Model<ProductSchema> implements ProductSchema {
    public id!: number; // Note the definite assignment assertion (!)
    public name!: string;
    public description!: string;
    public price!: number;
    public imageUrl!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}