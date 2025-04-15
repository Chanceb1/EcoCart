import { Navigate } from 'react-router-dom';
import { useAuth, User } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: string | string[];
}

export const ProtectedRoute = ({ children, requiredRole}: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requiredRole) {
        const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        if (!user?.role || !allowedRoles.includes(user.role)) {
            return <Navigate to="/" />;
        }
    }

    return <>{children}</>;
};
