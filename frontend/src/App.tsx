import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Header from './components/Header';
import { ThemeProvider } from './components/theme-provider';
import { CartContextProvider } from './store/CartContext';
import { UserProgressContextProvider } from './store/UserProgressContext';

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <UserProgressContextProvider>
                <CartContextProvider>
                    <Header />
                    <Cart />
                    <Checkout />
                </CartContextProvider>
            </UserProgressContextProvider>
        </ThemeProvider>
    );
}
