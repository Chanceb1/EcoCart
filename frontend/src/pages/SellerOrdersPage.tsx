import { JSX, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttp from '../Hooks/useHttp';
import { useAuth } from '@/contexts/AuthContext';
import { currencyFormatter } from '@/Utils/formatting';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

export interface OrderItem {
    id: string;
    quantity: number;
}

export interface OrderResponse {
    order: {
        userId: number;
        shippingAddress: string;
        items: OrderItem[];
    };
}


const SellerOrdersPage = () => {
    
    const { user: authUser, token } = useAuth();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState<OrderResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!token) {
                setError('Authorization token missing');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`${apiBaseUrl}/api/orders`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data: OrderResponse = await response.json();
                setOrderData(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch orders');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [authUser, token]);

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

    const { userId, shippingAddress, items } = orderData.order;

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl font-extrabold text-green-600 text-center mb-10">
                Orders
            </h1>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                <table className="min-w-full text-left text-sm text-gray-700">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">User ID</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Shipping Address</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Item ID</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Quantity</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {items.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">{userId}</td>
                                <td className="px-6 py-4">{shippingAddress}</td>
                                <td className="px-6 py-4">{item.id}</td>
                                <td className="px-6 py-4">{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SellerOrdersPage;