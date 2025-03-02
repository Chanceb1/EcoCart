import ItemList from '../components/ItemList';
import { CartContextProvider } from '../store/CartContext';
import {UserProgressContextProvider} from '../store/UserProgressContext';

export default function ProductsPage() {
    return (
        <div className="container mx-auto py-8 align-middle text-center">
            <h1 className="text-2xl font-bold mb-6">Our Products</h1>
            <ItemList />
        </div>
    );
}