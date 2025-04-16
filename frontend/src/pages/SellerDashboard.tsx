import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

const SellerDashboardPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold text-center text-green-600 dark:text-green-400 mb-8">
                Welcome, Seller!
            </h1>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                <div className="bg-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl shadow-md p-6 flex">
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold">
                            Create Listing
                        </h2>
                        <Button
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            onClick={() => navigate('/listing-form')}
                        >
                            Create
                        </Button>
                    </div>
                    <div className="w-px bg-gray-300 dark:bg-gray-600 mx-4"></div>
                    <div className="flex-1 text-right">
                        <p className="text-lg font-semibold">Total Listings</p>
                        <p className="text-2xl font-bold">123</p>
                    </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl shadow-md p-6 flex">
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold">View Orders</h2>
                        <Button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                            View
                        </Button>
                    </div>
                    <div className="w-px bg-gray-300 dark:bg-gray-600 mx-4"></div>
                    <div className="flex-1 text-right">
                        <p className="text-lg font-semibold">Total Orders</p>
                        <p className="text-2xl font-bold">56</p>
                    </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl shadow-md p-6 flex">
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold">
                            Manage Inventory
                        </h2>
                        <Button
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            onClick={() => navigate('/inventory')}
                        >
                            Manage
                        </Button>
                    </div>
                    <div className="w-px bg-gray-300 dark:bg-gray-600 mx-4"></div>
                    <div className="flex-1 text-right">
                        <p className="text-lg font-semibold">Total Items</p>
                        <p className="text-2xl font-bold">350</p>
                    </div>
                </div>
                <div className="bg-gray-200 dark:bg-gray-800 dark:text-white rounded-2xl shadow-md p-6 flex">
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold">
                            Manage Profile
                        </h2>
                        <Button
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            onClick={() => navigate('/account')}
                        >
                            Manage
                        </Button>
                    </div>
                    <div className="w-px bg-gray-300 dark:bg-gray-600 mx-4"></div>
                    <div className="flex-1 text-right">
                        <p className="text-lg font-semibold">Profile Info</p>
                        <p className="text-sm">
                            Name: {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm">Email: {user?.email}</p>
                        <p className="text-sm">Address: {user?.address}</p>
                        <p className="text-sm">Account ID: {user?.id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboardPage;
