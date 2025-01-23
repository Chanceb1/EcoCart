import { useContext } from 'react';
import { currencyFormatter } from '../Utils/formatting';
import Button from './UI/Button';
import { CartContext } from '../store/CartContext';

export interface Meal {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

interface MealItemProps {
    meal: Meal;
}

export default function MealItem({ meal }: MealItemProps): JSX.Element {
    const cartCtx = useContext(CartContext);

    function handleAddMealToCart() {
        cartCtx.addItem({ ...meal, quantity: 1 });
    }

    return (
        <li className="meal-item">
            <article>
                <img
                    src={`http://localhost:5000/${meal.image}`}
                    alt={meal.name}
                />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">
                        {currencyFormatter.format(meal.price)}
                    </p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="male-item-actions">
                    <Button
                        onClick={handleAddMealToCart}
                        textOnly={true}
                        className="add-to-cart-button"
                    >
                        Add to Cart
                    </Button>
                </p>
            </article>
        </li>
    );
}
