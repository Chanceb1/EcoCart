import { FormEvent, useContext } from 'react';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../Utils/formatting';
import UserProgressContext from '../store/UserProgressContext';
import useHttp from '../Hooks/useHttp';
import Error from './Error';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp('http://localhost:5000/orders', requestConfig);

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
            <div></div>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>;
    }

    if (data && !error) {
        return <div></div>;
    }

    return <div></div>;
}
