import { FormEvent, useContext } from 'react';
import { Button } from '../components/ui/Button';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../Utils/formatting';
import UserProgressContext from '../store/UserProgressContext';
import useHttp from '../Hooks/useHttp';
import Error from './ErrorPage';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

export default function CheckoutPage() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const navigate = useNavigate();
    const { user, token } = useAuth();

    const requestConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

            Authorization: 'Bearer ' + token
        }
    };

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest
    } = useHttp(apiBaseUrl + '/api/orders', requestConfig);

    const cartTotal = cartCtx.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
    );

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        await sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    shippingAddress: ''
                }
            })
        );

        cartCtx.clearCart();
    }

    let actions = (
        <>
            <div className="mt-6 flex justify-end gap-4">
                <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </button>
                <Button className="bg-green-600 dark:bg-gray-900">
                    Submit Order
                </Button>
            </div>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>;
    }

    if (data && !error) {
        return (
            <div className="text-center">
                <h2>Order submitted successfully!</h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            {error && <Error title="Could not submit order!" message={error} />}
            <form
                className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
            >
                <h1 className="text-xl mb-6">Confirm Order</h1>
                <div className="ml-4">
                {cartCtx.items.map(item => (
                    <div className=" grid grid-cols-3 gap-4 border-b-2 mb-6 border-dashed">
                    <p className="col-span-2">
                        {item.name} x{item.quantity}
                    </p>
                    <p className="text-right">
                    {currencyFormatter.format(item.price * item.quantity)}
                    </p>
                </div>
                ))}
                </div>
                    <h2 className="text-right text-xl block text-gray-700 font-bold mb-2">
                        Total Amount: {currencyFormatter.format(cartTotal)}
                    </h2>
                
                {actions}
            </form>
        </div>
    );
}
