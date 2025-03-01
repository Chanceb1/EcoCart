import Cart from '../components/Cart';
import Checkout from '../components/Checkout';
import Header from '../components/Header';
import Meals from '../components/Meals';
import { CartContextProvider } from '../store/CartContext';
import {UserProgressContextProvider} from '../store/UserProgressContext';

export default function ProductsPage() {
    return (
        <div className="container mx-auto py-8 align-middle text-center">
            <h1 className="text-2xl font-bold mb-6">Our Products</h1>
            <UserProgressContextProvider>
                <CartContextProvider>
                    <Header />
                    <Meals />
                    <Cart />
                    <Checkout />
                </CartContextProvider>
            </UserProgressContextProvider>
        </div>
    );
}