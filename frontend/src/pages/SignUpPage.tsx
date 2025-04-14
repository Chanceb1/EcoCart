import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignupPage = () => {
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600 dark:text-green-400">
          Create an Account
        </h2>

        <form className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input type="text" id="firstName" required />
            </div>
            <div className="flex-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input type="text" id="lastName" required />
            </div>
          </div>

          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" required placeholder = "johndoe@gmail.com" />

          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" required />

          <Label htmlFor="confirmPassword">Verify Password</Label>
          <Input type="password" id="confirmPassword" required />

          <Label htmlFor="address">Address</Label>
          <Input type="text" id="address" required placeholder="123 EcoCart St" />

          <Button
            type="submit"
            className="w-full mt-4 bg-green-600 text-white hover:bg-green-700"
          >
            Sign Up
          </Button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
