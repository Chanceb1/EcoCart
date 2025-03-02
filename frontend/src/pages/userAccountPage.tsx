import { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';

interface User {
    id: string;
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
}

const UserAccountPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Simulate fetching user data from an API
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                // Replace with your actual API endpoint
                const response = await fetch('http://localhost:5000/user/1');
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data: User = await response.json();
                setUser(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleSaveClick = () => {
        // Implement save logic here (e.g., send updated data to API)
        setIsEditing(false);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-4">User Account</h1>
                <p>Loading user data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-4">User Account</h1>
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">User Account</h1>

            {isEditing ? (
                // Edit Mode
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            value={user?.name || ''}
                        // onChange={(e) => setUser({ ...user, name: e.target.value })} // Implement onChange handlers
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            value={user?.email || ''}
                        // onChange={(e) => setUser({ ...user, email: e.target.value })} // Implement onChange handlers
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Address
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address"
                            type="text"
                            value={user?.address || ''}
                        // onChange={(e) => setUser({ ...user, address: e.target.value })} // Implement onChange handlers
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                            City
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="city"
                            type="text"
                            value={user?.city || ''}
                        // onChange={(e) => setUser({ ...user, city: e.target.value })} // Implement onChange handlers
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postalCode">
                            Postal Code
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="postalCode"
                            type="text"
                            value={user?.postalCode || ''}
                        // onChange={(e) => setUser({ ...user, postalCode: e.target.value })} // Implement onChange handlers
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={handleCancelClick} variant="secondary">Cancel</Button>
                        <Button onClick={handleSaveClick} className="ml-2">Save</Button>
                    </div>
                </div>
            ) : (
                // View Mode
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <p>{user?.name}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <p>{user?.email}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
                        <p>{user?.address}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
                        <p>{user?.city}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Postal Code:</label>
                        <p>{user?.postalCode}</p>
                    </div>

                    <Button onClick={handleEditClick}>Edit</Button>
                </div>
            )}
        </div>
    );
};

export default UserAccountPage;