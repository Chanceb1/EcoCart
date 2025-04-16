import { useContext, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import CartContext, { CartItem } from '@/store/CartContext';
import { currencyFormatter } from '@/Utils/formatting';

export default function CartPage() {
    const cartCtx = useContext(CartContext);

    const cartTotal = cartCtx.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mt-6 p-4 border rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">
                    Cart <ShoppingCart className="inline-block w-5 h-5" />
                </h1>
                <hr />
                {cartCtx.items.length === 0 ? (
                    <p className="text-gray-500 mt-6">Your cart is empty.</p>
                ) : (
                    <ul className="mt-6">
                        {cartCtx.items.map(item => (
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
                                            cartCtx.updateQuantity(item.id, -1)
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
                                            cartCtx.updateQuantity(item.id, 1)
                                        }
                                    >
                                        ➕
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        className="ml-4"
                                        onClick={() =>
                                            cartCtx.removeItem(item.id)
                                        }
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
                    <Button
                        disabled={!cartCtx.items.length}
                        className="mt-4 px-8"
                    >
                        <Link to="/checkout">Proceed to Checkout</Link>
                    </Button>
                    <p className="mt-4 font-bold">
                        Total: {currencyFormatter.format(cartTotal)}
                    </p>
                </div>
            </div>
        </div>
    );
}
