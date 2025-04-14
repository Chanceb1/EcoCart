import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ErrorPage from './pages/ErrorPage';
import ContactPage from './pages/ContactPage';
import UserAccountPage from './pages/userAccountPage';
import SellerDashboard from './pages/SellerDashboard';
import PrivacyPolicy from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';

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
                path: 'product/:id',
                element: <ProductPage />
            },
            {
                path: 'about',
                element: <AboutPage />
            },
            {
                path: 'privacy',
                element: <PrivacyPolicy />
            },
            {
                path: 'terms',
                element: <TermsPage />
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
                element: <CheckoutPage />
            },
            {
                path: 'contact',
                element: <ContactPage />
            },
            {
                path: 'seller-dashboard',
                element: <SellerDashboard />
            },
            {
                path: 'admin-dashboard',
                element: <AdminDashboard />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'signup',
                element: <SignupPage />
            }
        ]
    }
]);
