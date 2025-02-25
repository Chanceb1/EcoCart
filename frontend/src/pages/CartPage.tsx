import { Link } from "react-router-dom";

export default function CartPage() {
    return (
        <div className="container mx-auto py-8 align-middle text-center">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            {/* Cart items will go here */}

            {/* Checkout Link*/}
            <Link to="/checkout" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Checkout
            </Link>
        </div>
    );
}