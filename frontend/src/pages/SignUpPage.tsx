import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    address: formData.address
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Log user in automatically after successful registration
            login(data.token, data.user);
            navigate('/'); // Redirect to home page
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-green-600 dark:text-green-400">
                    Create an Account
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                type="text"
                                id="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                type="text"
                                id="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        required
                        placeholder="johndoe@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <Label htmlFor="confirmPassword">Verify Password</Label>
                    <Input
                        type="password"
                        id="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                    <Label htmlFor="address">Address</Label>
                    <Input
                        type="text"
                        id="address"
                        required
                        placeholder="123 EcoCart St"
                        value={formData.address}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        className="w-full mt-4 bg-green-600 text-white hover:bg-green-700"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </Button>
                </form>

                <p className="text-sm text-center mt-4 text-gray-700 dark:text-gray-300">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;