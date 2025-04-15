import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Save auth data and redirect
            login(data.token, data.user);
            navigate('/'); // Redirect to home page
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-green-600 dark:text-green-400">
                    Login to Your Account
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        type="email" 
                        id="email" 
                        required 
                        placeholder="johndoe@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />

                    <Label htmlFor="password">Password</Label>
                    <Input 
                        type="password" 
                        id="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button 
                        type="submit" 
                        className="w-full mt-4 bg-green-600 hover:bg-green-700"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>

                <p className="text-sm text-center mt-4 text-gray-700 dark:text-gray-300">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-green-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};


export default LoginPage;