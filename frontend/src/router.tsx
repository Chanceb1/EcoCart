import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Error from './pages/ErrorPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true, // declares route will be shown at the root URL
                element: <HomePage />
            },
            {
                path: 'products',
                element: <ProductsPage />
            },
            {
                path: 'cart',
                element: <CartPage />
            },
            {
                path: 'checkout',
                element: <CheckoutPage />
            }
        ]
    }
]);