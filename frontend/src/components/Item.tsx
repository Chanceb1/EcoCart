import { JSX, useContext } from "react";
import { currencyFormatter } from "../Utils/formatting";
import { Button } from "./UI/Button";
import { CartContext } from "../store/CartContext";

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

export default function Item({ item }: ItemProps): JSX.Element {
    const cartCtx = useContext(CartContext);

    function handleAddItemToCart() {
        cartCtx.addItem({ ...item, quantity: 1 });
    }

    return (
        <li className="bg-white rounded-lg shadow-lg overflow-hidden">
            <article className="bg-white rounded-lg overflow-hidden min-h-full">
                <img src={`http://localhost:5000/${item.image}`} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-3">
                    <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                    <div className="grid grid-cols-6 gap-1 justify-center items-center">
                        <p className="text-sm col-span-4 text-gray-700 text-right max-h-20 text-ellipsis overflow-clip">{item.description}</p>
                        <p className="text-2xl col-span-2 text-green-600 font-bold mb-2">
                            {currencyFormatter.format(item.price)}
                        </p>
                    </div>
                    <div className="p-4 text-center">
                    <Button onClick={handleAddItemToCart} textOnly={true} className="add-to-cart-button">Add to Cart</Button>
                    </div>
                </div>
            </article>
        </li>
    );
}