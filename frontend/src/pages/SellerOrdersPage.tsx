import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: number;
    userId: number;
    userEmail: string;
    orderDate: Date;
    status: 'pending' | 'completed' | 'cancelled';
    shippingAddress: string;
    items: Product[];
    totalPrice: number;
}

const SellerOrdersPage = () => {
    const { user: authUser, token } = useAuth();
    const [orderData, setOrderData] = useState<Order[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reloadFlag, setReloadFlag] = useState<boolean>(false);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!token) {
                setError('Authorization token missing');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `${apiBaseUrl}/api/orders/seller/${authUser?.id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data: Order[] = await response.json();
                setOrderData(data);
                setError(null);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to fetch orders'
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [authUser, token, reloadFlag]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
                <p className="ml-4 text-lg text-gray-500">Loading Orders...</p>
            </div>
        );
    }

    if (error || !orderData) {
        return (
            <div className="text-center p-4">
                <p className="text-gray-500">{error || 'No orders found.'}</p>
            </div>
        );
    }

    const cancelOrder = async (id: number) => {
        await fetch(`${apiBaseUrl}/api/orders/order/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'cancelled' })
        });

        setReloadFlag(!reloadFlag);
    };

    const completeOrder = async (id: number) => {
        await fetch(`${apiBaseUrl}/api/orders/order/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'completed' })
        });

        setReloadFlag(!reloadFlag);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl font-extrabold text-green-600 text-center mb-10">
                {authUser?.role === 'admin' ? 'All' : 'Your'} Orders
            </h1>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                <table className="min-w-full text-left text-sm text-gray-700">
                    <thead className="bg-gray-50 border-b border-gray-200 dark:text-black dark:bg-gray-300 dark:border-gray-300">
                        <tr>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">
                                User ID
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">
                                Shipping Address
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">
                                Items
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orderData.map(order => (
                            <tr
                                key={order.id}
                                className="hover:bg-gray-50 transition-colors dark:hover:bg-gray-600"
                            >
                                <td className="px-6 py-4">{order.userId}</td>
                                <td className="px-6 py-4">
                                    {order.shippingAddress}
                                </td>
                                <td className="px-6 py-4">
                                    {order.items.map(
                                        (product, productIndex) => (
                                            <div
                                                key={`${order.id}-${productIndex}`}
                                            >
                                                {product.quantity}x -{' '}
                                                {product.name}
                                            </div>
                                        )
                                    )}
                                </td>
                                <td className="px-6 py-4 capitalize">
                                    <span
                                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                            order.status === 'completed'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-400 dark:text-green-900'
                                                : order.status === 'cancelled'
                                                ? 'bg-red-100 text-red-700 dark:bg-red-300 dark:text-white'
                                                : 'bg-gray-100 text-gray-700 dark:bg-gray-300 dark:text-black'
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="ml-4 text-green-400 bg-green-800"
                                        onClick={() => completeOrder(order.id)}
                                    >
                                        ✔
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        className="ml-4"
                                        onClick={() => cancelOrder(order.id)}
                                    >
                                        ❌
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerOrdersPage;
