import { useState } from 'react';
import { Button } from '@/components/UI/Button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([
        { id: 1, name: 'Product A', price: 20, quantity: 1 },
        { id: 2, name: 'Product B', price: 35, quantity: 9 },
        { id: 3, name: 'Product C', price: 50, quantity: 4 }
    ]);

    const removeFromCart = (id: CartItem['id']) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const updateQuantity = (id: CartItem['id'], delta: number) => {
        setCart(prevCart =>
            prevCart
                .map(item =>
                    item.id === id
                        ? {
                              ...item,
                              quantity: Math.max(1, item.quantity + delta)
                          }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mt-6 p-4 border rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">
                    Cart <ShoppingCart className="inline-block w-5 h-5" />
                </h1>
                <hr />
                {cart.length === 0 ? (
                    <p className="text-gray-500 mt-6">Your cart is empty.</p>
                ) : (
                    <ul className="mt-6">
                        {cart.map(item => (
                            <li
                                key={item.id}
                                className="flex justify-between items-center mt-3"
                            >
                                <span>
                                    {item.name}{' '}
                                    <Badge className="ml-2">
                                        ${item.price}
                                    </Badge>
                                </span>
                                <div className="flex items-center gap-2">
                                    <Button
                                        disabled={item.quantity < 2}
                                        size="icon"
                                        variant="outline"
                                        onClick={() =>
                                            updateQuantity(item.id, -1)
                                        }
                                    >
                                        ➖
                                    </Button>
                                    <span className="font-semibold">
                                        {item.quantity}
                                    </span>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() =>
                                            updateQuantity(item.id, 1)
                                        }
                                    >
                                        ➕
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        className="ml-4"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        ❌
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <hr className="mt-6 mb-2" />
                <div className="flex justify-between items-center">
                    <Button disabled={!cart.length} className="mt-4 px-8">
                        Proceed to Checkout
                    </Button>
                    <p className="mt-4 font-bold">Total: ${totalPrice}</p>
                </div>
            </div>
        </div>
    );
}
