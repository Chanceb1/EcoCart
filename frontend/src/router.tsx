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
import ListingPage from './pages/ListingsPage';
import UserManagementPage from './pages/UserManagementPage';
import SellerOrdersPage from './pages/SellerOrdersPage';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import InventoryPage from './pages/InventoryPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        errorElement: <ErrorPage />,
        children: [
            // Public routes
            {
                index: true, // declares route will be shown at the root URL
                element: <HomePage />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'signup',
                element: <SignupPage />
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
                path: 'contact',
                element: <ContactPage />
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
                path: 'cart',
                element: <CartPage />
            },
            {
                path: 'listing-form',
                element: <ListingPage />
            },
            {
                path: 'manage-users',
                element: (
                    <ProtectedRoute requiredRole="admin">
                        {' '}
                        <UserManagementPage />
                    </ProtectedRoute>
                )
            },
            {
                path: 'seller-orders',
                element: (
                    <ProtectedRoute requiredRole={['seller', 'admin']}>
                        <SellerOrdersPage />
                    </ProtectedRoute>
                )
            },
            // Protected routes
            {
                path: 'account',
                element: (
                    <ProtectedRoute>
                        <UserAccountPage />
                    </ProtectedRoute>
                )
            },
            {
                path: 'admin-dashboard',
                element: (
                    <ProtectedRoute requiredRole="admin">
                        <AdminDashboard />
                    </ProtectedRoute>
                )
            },
            {
                path: 'seller-dashboard',
                element: (
                    <ProtectedRoute requiredRole={['seller', 'admin']}>
                        <SellerDashboard />
                    </ProtectedRoute>
                )
            },
            {
                path: 'inventory',
                element: (
                    <ProtectedRoute requiredRole={['seller', 'admin']}>
                        <InventoryPage />
                    </ProtectedRoute>
                )
            },
            {
                path: 'checkout',
                element: (
                    <ProtectedRoute>
                        <CheckoutPage />
                    </ProtectedRoute>
                )
            }
        ]
    }
]);
