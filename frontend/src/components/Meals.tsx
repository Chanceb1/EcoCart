import React, {JSX,  Component }  from 'react';
import MealItem from "./MealItem";
import useHttp from "../Hooks/useHttp";
import Error from "./Error";

interface Meal {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

const requestConfig = {};

export default function Meals(): JSX.element {
    const {
        data: loadedMeals,
        isLoading,
        error,
    } = useHttp<Meal[]>('http://localhost:5000/meals', requestConfig, []);

    if (isLoading) {
        return <p className='center'>Loading meals...</p>
    }

    if (error) {
        return <Error title='failed to fetch meals' message={error} />
    }

    return (
        <ul id="meals">
            {loadedMeals?.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}