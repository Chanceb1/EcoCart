import { JSX, useRef } from 'react';
import Item, { ProductItem } from './Item';
import useHttp from '../Hooks/useHttp';
import { useSearchParams } from 'react-router-dom';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

const requestConfig = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function ItemList(): JSX.Element {
    const [searchParams] = useSearchParams();
    const hasSearchParams = searchParams.toString() !== '';
    const searchString = searchParams.get('search');
    const filterCategories = useRef<String[]>([]);
    const filterMethods = useRef<String[]>([]);

    const { data: loadedItems, isLoading } = useHttp<ProductItem[]>(
        apiBaseUrl + '/api/products',
        requestConfig,
        []
    );

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
        if (!hasSearchParams) {
            return (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {loadedItems.map(item => (
                        <Item key={item.id} item={item} />
                    ))}
                </ul>
            );
        } else {
            // make lists of category filters
            filterCategories.current = searchParams.getAll('Category');
            filterMethods.current = searchParams.getAll('Recycle Method');

            // if no category params
            if (
                filterCategories.current.length === 0 &&
                filterMethods.current.length === 0
            ) {
                // no search string
                if (!searchString || searchString == '') {
                    return (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {loadedItems.map(item => (
                                <Item key={item.id} item={item} />
                            ))}
                        </ul>
                    );
                } else {
                    return (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {loadedItems.map(item => {
                                if (
                                    item.name
                                        .toLowerCase()
                                        .includes(searchString.toLowerCase())
                                ) {
                                    return <Item key={item.id} item={item} />;
                                }
                            })}
                        </ul>
                    );
                }
                // at least one category param
            } else {
                // no search string, use category params
                if (!searchString || searchString == '') {
                    return (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {loadedItems.map(item => {
                                if (
                                    (filterCategories.current &&
                                        filterCategories.current.includes(
                                            item.category
                                        )) ||
                                    (filterMethods.current &&
                                        filterMethods.current.includes(
                                            item.recycle_method
                                        ))
                                ) {
                                    return <Item key={item.id} item={item} />;
                                }
                            })}
                        </ul>
                    );
                } else {
                    // use search string and category params
                    console.log(searchString);
                    return (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {loadedItems.map(item => {
                                if (
                                    item.name
                                        .toLowerCase()
                                        .includes(searchString.toLowerCase()) ||
                                    (filterCategories.current &&
                                        filterCategories.current.includes(
                                            item.category
                                        )) ||
                                    (filterMethods.current &&
                                        filterMethods.current.includes(
                                            item.recycle_method
                                        ))
                                ) {
                                    return <Item key={item.id} item={item} />;
                                }
                            })}
                        </ul>
                    );
                }
            }
        }
    }
}
