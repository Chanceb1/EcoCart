import { JSX } from 'react';
import Item from './Item';
import useHttp from '../Hooks/useHttp';
import Error from './Error';

interface Item {
    id: number;  // Changed from string to number
    name: string;
    price: number;
    description: string;
    imageUrl: string;  // Changed from image to imageUrl to match backend
    createdAt?: string;
    updatedAt?: string;
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

const requestConfig = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function ItemList(): JSX.Element {
    const {
        data: loadedItems,
        isLoading,
        error
    } = useHttp<Item[]>(apiBaseUrl + '/api/products', requestConfig, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
                <p className="ml-4 text-lg text-gray-500">
                    Loading Products...
                </p>
            </div>
        );
    }

    // Add check for empty products array
    if (!loadedItems || loadedItems.length === 0) {
        return (
            <div className="text-center p-4">
                <p className="text-gray-500">No products available.</p>
            </div>
        );
    }

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loadedItems.map(item => (
                <Item 
                    key={item.id} 
                    item={{
                        ...item,
                        image: item.imageUrl // Map imageUrl to image for Item component
                    }} 
                />
            ))}
        </ul>
    );
}
