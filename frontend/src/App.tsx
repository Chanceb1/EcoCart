import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ThemeProvider } from './components/Theme/ThemeProvider';
import { CartContextProvider } from './store/CartContext';
import { UserProgressContextProvider } from './store/UserProgressContext';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Header from './components/Header';

export default function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <CartContextProvider>
                    <RouterProvider router={router} />
                </CartContextProvider>
        </ThemeProvider>
    );
}
