import { JSX, useContext } from 'react';
import { currencyFormatter } from '@/Utils/formatting';
import { CartContext } from '../store/CartContext';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import useHttp from '../Hooks/useHttp';

interface Item {
    id: number; // Changed from string to number
    name: string;
    price: number;
    description: string;
    imageUrl: string; // Changed from image to imageUrl to match backend
    createdAt?: string;
    updatedAt?: string;
    category: string;
    recycle_method: string;
    rating: number;
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

const requestConfig = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function ProductPage(): JSX.Element {
    const { id } = useParams();
    const {
        data: product,
        isLoading,
        error
    } = useHttp<Item>(apiBaseUrl + `/api/products/${id}`, requestConfig);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
                <p className="ml-4 text-lg text-gray-500">Loading Product...</p>
            </div>
        );
    }

    // Add check for empty products array
    if (!product || !product.name) {
        return (
            <div className="text-center p-4">
                <p className="text-gray-500">Product ID:{id} doesn't exist.</p>
            </div>
        );
    }

    const cartCtx = useContext(CartContext);
    function addItemToCart() {
        cartCtx.addItem({
            id: product!.id,
            name: product!.name,
            price: product!.price,
            quantity: 1
        });
    }

    return (
        <div className="container w-8/10 mx-auto pt-6 py-8 align-start text-center">
            {/* Product Listing */}
            <div className="grid grid-cols-3 gap-1 justify-start place-content-start">
                {/* Product */}
                <div className="col-span-2 grid grid-cols-2 gap-1 justify-center">
                    {/* Image */}
                    <div className="flex justify-end pr-4">
                        <div className="flex place-content-center text-center border-2 rounded-md border-solid size-100">
                            <img
                                src={`${apiBaseUrl}/${product.imageUrl}`}
                                alt={`Image of ${product.name}`}
                                className="object-contain text-center"
                            />
                        </div>
                    </div>
                    {/* Details */}
                    <article className="text-left border-2 bg-white rounded-lg overflow-hidden min-h-full">
                        <div className="p-3">
                            <h1 className="text-2xl font-bold mb-1">
                                {product.name}
                            </h1>
                            <p className="text-sm indent-8 text-gray-500">
                                {`[Category: ${product.category}, Recycle Method: ${product.recycle_method}]`}
                            </p>
                            <div className="flex pt-2 place-content-between items-center border-b-2">
                                <p className="text-sm font-bold text-gray-700">
                                    Seller Name
                                </p>
                                <p className="text-xl text-green-600 font-bold">
                                    {`Rating: ${product.rating}/5`}
                                </p>
                            </div>
                            <div className="mt-2 align-text-center p-4 pt-2 text-left bg-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl">
                                {product.description}
                            </div>
                        </div>
                    </article>
                </div>
                {/* Order Bar */}
                <div className="col-span-1 border-2 rounded-sm h-100 w-6/10 justify-self-center">
                    <h3 className="text-3xl col-span-1 text-green-600 font-bold pb-2 m-4 border-b-2">
                        {currencyFormatter.format(product.price)}
                    </h3>
                    <div className="flex flex-col justify-center">
                        <div className="mt-1 m-2 h-48 overflow-hidden align-text-top p-2 text-left bg-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl">
                            Seller Shipping Info
                        </div>
                        <Button
                            className="text-wrap m-2 w-4/5 place-self-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            onClick={addItemToCart}
                        >
                            Add to Cart
                        </Button>
                        <Button className="text-wrap m-2 mb-6 w-4/5 place-self-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                            Add and Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
