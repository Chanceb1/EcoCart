import { JSX, useContext, useEffect, useState } from 'react';
import { currencyFormatter } from '../Utils/formatting';
import { Button } from '@/components/ui/Button';
import { CartContext } from '../store/CartContext';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    recycle_method: string;
    rating: number;
    sellerId: number;
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

export default function InventoryPage(): JSX.Element {
    const { token } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [productsLoading, setProductsLoading] = useState(true); // Set initial loading state to true
    const [productsError, setProductsError] = useState<string | null>(null);
    const [reloadFlag, setReloadFlag] = useState<boolean>(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setProductsLoading(true);
                const response = await fetch(`${apiBaseUrl}/api/products`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.status === 404) {
                    setProducts([]);
                    setProductsError(null);
                } else if (!response.ok) {
                    throw new Error('Failed to fetch products');
                } else {
                    setProducts(Array.isArray(data) ? data : []);
                    setProductsError(null);
                }
            } catch (err) {
                setProductsError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to fetch products'
                );
                setProducts([]);
            } finally {
                setProductsLoading(false);
            }
        };

        fetchOrders();
    }, [token, reloadFlag]);

    const deleteProduct = async (id: number) => {
        await fetch(`${apiBaseUrl}/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setReloadFlag(!reloadFlag);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-bold mb-6">Your Inventory</h2>

            {productsError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {productsError}
                </div>
            )}

            {productsLoading ? (
                <div className="text-center">Loading inventory...</div>
            ) : products.length === 0 ? (
                <div className="text-center text-gray-500">
                    No products found
                </div>
            ) : (
                <div className="space-y-4">
                    {products.map(product => (
                        <div key={product.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h1 className="font-semibold">
                                        {product.name}
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        {product.category} •{' '}
                                        {product.recycle_method}
                                    </p>
                                    <h2 className="text-sm text-gray-200 mt-4">
                                        {product.description}
                                    </h2>
                                </div>
                                <div>
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm bg-green-400`}
                                    >
                                        ${product.price}
                                    </span>
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        className="ml-4"
                                        onClick={() =>
                                            deleteProduct(product.id)
                                        }
                                    >
                                        ❌
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
