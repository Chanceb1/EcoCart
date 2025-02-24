import { useContext } from 'react';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../Utils/formatting';
import UserProgressContext from '../store/UserProgressContext';

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }

    return <div></div>;
}
