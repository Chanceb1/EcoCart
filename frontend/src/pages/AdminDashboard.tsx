import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import Users from '@/assets/usersicon.png';
import Listings from '@/assets/listings.png';
import Analytics from '@/assets/analytics.png';

const AdminDashboardPage = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold text-green-600 dark:text-green-500 text-left mb-8">
                Administrator Dashboard
            </h1>

            <div className="space-y-6">
                <div className="bg-gray-100 dark:bg-gray-600 dark:text-white rounded-2xl shadow-md p-6 flex items-center">
                    <img
                        src={Users}
                        alt="Manage Users"
                        className="w-24 h-24 rounded-lg mr-6 object-cover dark:invert"
                    />

                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-green-700 dark:text-green-500">
                            Manage Users
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            View, edit, or deactivate existing EcoCart Seller
                            accounts.
                        </p>
                        <Button
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            onClick={() => navigate('/manage-users')}
                        >
                            Manage
                        </Button>
                    </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-600 dark:text-white rounded-2xl shadow-md p-6 flex items-center">
                    <img
                        src={Listings}
                        alt="Review Products"
                        className="w-24 h-24 rounded-lg mr-6 object-cover dark:invert"
                    />
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-green-700 dark:text-green-500">
                            Review Products
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Review incoming listings from EcoCart Sellers.
                        </p>
                        <Button
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            onClick={() => navigate('/inventory')}
                        >
                            Review
                        </Button>
                    </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-600 dark:text-white rounded-2xl shadow-md p-6 flex items-center">
                    <img
                        src={Analytics}
                        alt="View Orders"
                        className="w-24 h-24 rounded-lg mr-6 object-cover dark:invert"
                    />
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-green-700 dark:text-green-500">
                            View Orders
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            View orders made between Seller and Consumers.
                        </p>
                        <Button
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            onClick={() => navigate('/seller-orders')}
                        >
                            View
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
