import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

const Listing = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [recycleMethod, setRecycleMethod] = useState('');
    const { token } = useAuth();

    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const handleListSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch(apiBaseUrl + '/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify({
                    name,
                    price: parseFloat(price),
                    description,
                    category,
                    recycle_method: recycleMethod,
                    imageUrl,
                    rating: 0
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create listing');
            }

            setSuccessMessage('Listing submitted successfully!');
            setName('');
            setPrice('');
            setDescription('');
            setCategory('');
            setRecycleMethod('');
            setImageUrl('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Submission failed');
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Create a New Listing
            </h2>
            <form onSubmit={handleListSubmit} className="w-full space-y-4">
                <div>
                    <Label className="pb-2" htmlFor="name">Product Name</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label className="pb-2" htmlFor="price">Price ($)</Label>
                    <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label className="pb-2" htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label className="pb-2" htmlFor="category">Category</Label>
                    <Input
                        id="category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label className="pb-2" htmlFor="recycleMethod">Recycle Method</Label>
                    <Input
                        id="recycleMethod"
                        value={recycleMethod}
                        onChange={e => setRecycleMethod(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label className="pb-2" htmlFor="imageUrl">Image URL</Label>
                    <Input
                        id="imageUrl"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                    Submit Listing
                </Button>
                {successMessage && (
                    <p className="text-green-600 font-semibold">
                        {successMessage}
                    </p>
                )}
                {error && <p className="text-red-600 font-semibold">{error}</p>}
            </form>
        </div>
    );
};

export default Listing;
