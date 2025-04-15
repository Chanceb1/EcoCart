import { JSX, useContext } from 'react';
import Item, { ProductItem } from './Item';
import useHttp from '../Hooks/useHttp';
import ProductsFilterContext from '@/store/ProductsFilterContext';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

const requestConfig = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function ItemList(): JSX.Element {
    const { search, categories, recyclingMethods } = useContext(
        ProductsFilterContext
    );

    const { data: loadedItems, isLoading } = useHttp<ProductItem[]>(
        apiBaseUrl + '/api/products',
        requestConfig,
        []
    );

    console.log({ search });
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
    else if (!loadedItems || loadedItems.length === 0) {
        return (
            <div className="text-center p-4">
                <p className="text-gray-500">No products available.</p>
            </div>
        );
    } else {
        return (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {loadedItems
                    .filter(item => {
                        if (
                            categories?.length &&
                            !categories.includes(item.category)
                        )
                            return false;

                        if (
                            recyclingMethods?.length &&
                            !recyclingMethods.includes(item.recycle_method)
                        )
                            return false;

                        return item.name
                            .toLowerCase()
                            .includes(search.toLowerCase());
                    })
                    .map(item => (
                        <Item key={item.id} item={item} />
                    ))}
            </ul>
        );
    }
}
