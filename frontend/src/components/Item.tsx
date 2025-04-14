import { JSX, useContext } from 'react';
import { currencyFormatter } from '../Utils/formatting';
import { Button } from './ui/Button';
import { CartContext } from '../store/CartContext';
import { Link } from 'react-router-dom';

export interface Item {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

interface ItemProps {
    item: Item;
}
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

export default function Item({ item }: ItemProps): JSX.Element {
    const cartCtx = useContext(CartContext);

    function handleAddItemToCart() {
        cartCtx.addItem({ ...item, quantity: 1 });
    }

    return (
        <li className="bg-white rounded-lg shadow-lg overflow-hidden">
            <article className="bg-white rounded-lg overflow-hidden min-h-full">
                <Link to={`/product/${item.id}`}>
                    <img
                        src={`${apiBaseUrl}/${item.image}`}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                    />
                </Link>
                <div className="p-3">
                    <Link to={`/product/${item.id}`}>
                        <h3 className="text-lg font-semibold mb-2 hover:text-green-600 hover:underline">
                            {item.name}
                        </h3>
                    </Link>
                    <div className="grid grid-cols-2 gap-1 justify-center items-center">
                        <p className="text-sm col-span-1 text-gray-700 text-right max-h-20 text-ellipsis overflow-clip">
                            {item.description}
                        </p>
                        <p className="text-2xl col-span-1 text-green-600 font-bold mb-2">
                            {currencyFormatter.format(item.price)}
                        </p>
                    </div>
                    <div className="p-4 text-center">
                        <Button
                            onClick={handleAddItemToCart}
                            className="add-to-cart-button"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </article>
        </li>
    );
}
