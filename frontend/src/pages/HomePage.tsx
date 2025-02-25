import { Button } from '@/components/UI/Button';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto py-8 align-middle text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to EcoCart</h1>
      <p className="text-lg">Your sustainable shopping destination</p>

      <Button variant="default" className="mt-6">
        <Link to="/products">
          Shop Now
        </Link>
      </Button>
    </div>
  );
};

export default HomePage;