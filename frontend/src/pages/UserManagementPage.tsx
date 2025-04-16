import { JSX, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

export interface UserItem {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address?: string;
    role: 'user' | 'admin' | 'seller';
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

export default function UsersPage(): JSX.Element {
    const { token } = useAuth();
    const [users, setUsers] = useState<UserItem[]>([]);
    const [usersLoading, setUsersLoading] = useState(true); // Set initial loading state to true
    const [reloadFlag, setReloadFlag] = useState<boolean>(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setUsersLoading(true);

            try {
                const response = await fetch(`${apiBaseUrl}/api/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.status === 404) {
                    setUsers([]);
                } else if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                } else {
                    setUsers(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                setUsers([]);
            } finally {
                setUsersLoading(false);
            }
        };

        fetchOrders();
    }, [token, reloadFlag]);

    if (usersLoading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
                <p className="ml-4 text-lg text-gray-500">Loading Users...</p>
            </div>
        );
    }

    if (!users || users.length === 0) {
        return (
            <div className="text-center p-4">
                <p className="text-gray-500">No users found.</p>
            </div>
        );
    }

    const deleteUser = async (id: number) => {
        await fetch(`${apiBaseUrl}/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setReloadFlag(!reloadFlag);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl font-extrabold text-green-600 text-center mb-10">
                Registered Users
            </h1>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                <table className="min-w-full text-left text-sm text-gray-700">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">
                                First Name
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">
                                Last Name
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map(user => (
                            <tr
                                key={user.id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-6 py-4">{user.firstName}</td>
                                <td className="px-6 py-4">{user.lastName}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4 capitalize">
                                    <span
                                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                            user.role === 'admin'
                                                ? 'bg-green-100 text-green-700'
                                                : user.role === 'seller'
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        className="ml-4"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        ❌
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
