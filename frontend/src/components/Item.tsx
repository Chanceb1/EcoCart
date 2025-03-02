import { JSX, useContext } from "react";
import { currencyFormatter } from "../Utils/formatting";
import { Button } from "./ui/Button";
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
        <li className="bg-white rounded-lg shadow-md overflow-hidden">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={`http://localhost:5000/${item.image}`} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                    <p className="text-green-600 font-bold mb-2">
                        {currencyFormatter.format(item.price)}
                    </p>
                    <p className="text-gray-700">{item.description}</p>
                </div>
                <div className="p-4 text-center">
                    <Button onClick={handleAddItemToCart} textOnly={true} className="add-to-cart-button">Add to Cart</Button>
                </div>
            </article>
        </li>
    );
}