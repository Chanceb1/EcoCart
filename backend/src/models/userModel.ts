import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Define the User schema
export interface UserSchema {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address?: string;
    role: 'user' | 'admin';
}

// Define the User model
export class User extends Model<UserSchema> implements UserSchema {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public address!: string;
    public role!: 'user' | 'admin';

    // Instance method to generate JWT token
    public generateToken(): string {
        return jwt.sign(
            { id: this.id, email: this.email, role: this.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );
    }

    // Instance method to compare password
    public async comparePassword(candidatePassword: string): Promise<boolean> {
        return await bcrypt.compare(candidatePassword, this.password);
    }
}

// Initialize the User model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            allowNull: false,
            defaultValue: 'user'
        }
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'User',
        hooks: {
            // Hash password before saving
            beforeSave: async (user: User) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    }
);

export default User;
