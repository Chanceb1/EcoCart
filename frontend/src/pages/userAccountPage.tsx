import { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { currencyFormatter } from '@/Utils/formatting';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/';

interface OrderProduct {
    id: string;
    quantity: number;
}

interface Order {
    id: number;
    orderDate: string;
    status: 'pending' | 'completed' | 'cancelled';
    products: string; // Format: "id:quantity,id:quantity"
    shippingAddress: string;
}

const UserAccountPage = () => {
    const { user: authUser, token, login } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: authUser?.firstName || '',
        lastName: authUser?.lastName || '',
        email: authUser?.email || '',
        address: authUser?.address || ''
    });
    const [error, setError] = useState<string | null>(null);
    // for user orders
    const [orders, setOrders] = useState<Order[]>([]);
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderError, setOrderError] = useState<string | null>(null);


    // fetch orders when component mounts
    useEffect(() => {
        const fetchOrders = async () => {
            if (authUser && authUser.role === 'user') {
                setOrderLoading(true);
                try {
                    const response = await fetch(
                        `${apiBaseUrl}api/orders/user/${authUser.id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );

                    if (!response.ok) {
                        throw new Error('Failed to fetch orders');
                    }

                    const data = await response.json();
                    setOrders(data);
                } catch (err) {
                    setOrderError(
                        err instanceof Error ? err.message : 'Failed to fetch orders'
                    );
                } finally {
                    setOrderLoading(false);
                }
            }
        };

        fetchOrders();
    }, [authUser, token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setFormData({
            firstName: authUser?.firstName || '',
            lastName: authUser?.lastName || '',
            email: authUser?.email || '',
            address: authUser?.address || ''
        });
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setError(null);
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(
                `${apiBaseUrl}api/users/${authUser?.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const updatedUser = await response.json();

            // Update the auth context with new user data
            if (token) {
                login(token, updatedUser);
            } else {
                setError('Authentication token is missing.');
            }
            setIsEditing(false);
            setError(null);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to update profile'
            );
        }
    };

    if (!authUser) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="container mx-auto py-8 max-w-2xl">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6">User Profile</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {isEditing ? (
                    // Edit Mode
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                            <Button
                                variant="outline"
                                onClick={handleCancelClick}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleSaveClick}>
                                Save Changes
                            </Button>
                        </div>
                    </div>
                ) : (
                    // View Mode
                    <div className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <p className="mt-1">
                                {authUser.firstName} {authUser.lastName}
                            </p>
                        </div>
                        <div>
                            <Label>Email</Label>
                            <p className="mt-1">{authUser.email}</p>
                        </div>
                        <div>
                            <Label>Address</Label>
                            <p className="mt-1">
                                {authUser.address || 'No address provided'}
                            </p>
                        </div>
                        <div className="pt-4">
                            <Button onClick={handleEditClick}>
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                <h2 className="text-2xl font-bold mb-6">Order History</h2>

                {orderError && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {orderError}
                    </div>
                )}

                {orderLoading ? (
                    <div className="text-center">Loading orders...</div>
                ) : orders.length === 0 ? (
                    <div className="text-center text-gray-500">No orders found</div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="border rounded-lg p-4 hover:bg-gray-50"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold">
                                            Order #{order.id}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-sm ${order.status === 'completed'
                                            ? 'bg-green-100 text-green-800'
                                            : order.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </div>
                                <div className="text-sm">
                                    <p><span className="font-medium">Shipping Address:</span> {order.shippingAddress}</p>
                                    <p className="mt-2 font-medium">Products:</p>
                                    <ul className="list-disc list-inside ml-2">
                                        {order.products.split(',').map((product) => {
                                            const [id, quantity] = product.split(':');
                                            return (
                                                <li key={id} className="text-gray-600">
                                                    Product ID: {id} - Quantity: {quantity}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserAccountPage;
