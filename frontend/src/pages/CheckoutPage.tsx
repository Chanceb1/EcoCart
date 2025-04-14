import { FormEvent, useContext } from 'react';
import { Button } from '../components/ui/Button';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../Utils/formatting';
import UserProgressContext from '../store/UserProgressContext';
import useHttp from '../Hooks/useHttp';
import Error from './ErrorPage';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

export default function CheckoutPage() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp(apiBaseUrl + '/api/orders/orders', requestConfig);

    const cartTotal = cartCtx.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
    );

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const fd = new FormData(event.currentTarget);
        const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com}

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        );
    }

    let actions = (
        <>
            <div className="mt-6 flex justify-end gap-4">
                <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={handleClose}
                >
                    Cancel
                </button>
                <Button>Submit Order</Button>
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
                <button onClick={handleFinish}>Okay</button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            {error && (
                <Error
                    title="Could not submit order!"
                    message={error}
                />
            )}
            <form
                className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="street"
                    >
                        Street
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="street"
                        name="street"
                        type="text"
                        placeholder="Your Street"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="postal-code"
                    >
                        Postal Code
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="postal-code"
                        name="postal-code"
                        type="text"
                        placeholder="Your Postal Code"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="city"
                    >
                        City
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Your City"
                        required
                    />
                </div>
                <div className="mb-6">
                    <h2
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Total Amount: {currencyFormatter.format(cartTotal)}
                    </h2>
                </div>
                {actions}
            </form>
        </div>
    );
}