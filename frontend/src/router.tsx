import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ErrorPage from './pages/ErrorPage';
import ContactPage from './pages/ContactPage';
import UserAccountPage from './pages/userAccountPage';
import SellerDashboard from './pages/SellerDashboard';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        errorElement: <ErrorPage />,
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
                path: 'about',
                element: <AboutPage />
            },
            {
                path: 'account',
                element: <UserAccountPage />
            },
            {
                path: 'cart',
                element: <CartPage />
            },
            {
                path: 'checkout',
                element: <CheckoutPage />,
            },
            {
                path: 'contact',
                element: <ContactPage />
            },
            {
                path: 'seller-dashboard',
                element: <SellerDashboard />
            }
            
        ]
    }
]);