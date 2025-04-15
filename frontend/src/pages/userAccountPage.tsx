import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

const UserAccountPage = () => {
    const { user: authUser, token, login } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: authUser?.firstName || '',
        lastName: authUser?.lastName || '',
        email: authUser?.email || '',
        address: authUser?.address || ''
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setFormData({
            firstName: authUser?.firstName || '',
            lastName: authUser?.lastName || '',
            email: authUser?.email || '',
            address: authUser?.address || ''
        });
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setError(null);
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(
                `${apiBaseUrl}api/users/${authUser?.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const updatedUser = await response.json();

            // Update the auth context with new user data
            if (token) {
                login(token, updatedUser);
            } else {
                setError('Authentication token is missing.');
            }
            setIsEditing(false);
            setError(null);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to update profile'
            );
        }
    };

    if (!authUser) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="container mx-auto py-8 max-w-2xl">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6">User Profile</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {isEditing ? (
                    // Edit Mode
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                            <Button
                                variant="outline"
                                onClick={handleCancelClick}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleSaveClick}>
                                Save Changes
                            </Button>
                        </div>
                    </div>
                ) : (
                    // View Mode
                    <div className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <p className="mt-1">
                                {authUser.firstName} {authUser.lastName}
                            </p>
                        </div>
                        <div>
                            <Label>Email</Label>
                            <p className="mt-1">{authUser.email}</p>
                        </div>
                        <div>
                            <Label>Address</Label>
                            <p className="mt-1">
                                {authUser.address || 'No address provided'}
                            </p>
                        </div>
                        <div className="pt-4">
                            <Button onClick={handleEditClick}>
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserAccountPage;
