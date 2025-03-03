import { JSX } from 'react';
import Item from './Item';
import useHttp from '../Hooks/useHttp';
import Error from './Error';

interface Item {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

const requestConfig = {};

export default function ItemList(): JSX.Element {
    const {
        data: loadedItems,
        isLoading,
        error
    } = useHttp<Item[]>(apiBaseUrl + '/products', requestConfig, []);

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

    if (error) {
        return <Error title="failed to fetch Products" message={error} />;
    }

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loadedItems?.map(item => (
                <Item key={item.id} item={item} />
            ))}
        </ul>
    );
}
