import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ThemeProvider } from './components/Theme/ThemeProvider';
import { CartContextProvider } from './store/CartContext';
import { AuthProvider } from './contexts/AuthContext';
// import { UserProgressContextProvider } from './store/UserProgressContext';
// import Cart from './components/Cart';
// import Checkout from './components/Checkout';
// import Header from './components/Header';

export default function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <AuthProvider>
                <CartContextProvider>
                    <RouterProvider router={router} />
                </CartContextProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}
