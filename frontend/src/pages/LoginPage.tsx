import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-green-600 dark:text-green-400">
              Login to Your Account
            </h2>
    
            <form className="space-y-4">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" required placeholder = "johndoe@gmail.com" />
    
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" required />
    
              <Button type="submit" className="w-full mt-4 bg-green-600 hover:bg-green-700">
                Login
              </Button>
            </form>
    
            <p className="text-sm text-center mt-4 text-gray-700 dark:text-gray-300">
              Don’t have an account?{" "}
              <a href="/signup" className="text-green-600 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      );
    };
    
    export default LoginPage;