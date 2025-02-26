import { Link } from 'react-router-dom';
import CarbonNeutral from '../assets/Carbon_neutral_badge.webp';

const AboutPage = () => {
    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold text-center text-green-600 mb-8">About EcoCart</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Mission and Values */}
                <div>
                    <h2 className="text-2xl font-semibold text-green-500 mb-4">Our Mission</h2>
                    <p className="text-gray-700 mb-6">
                        At EcoCart, our mission is to make sustainable living accessible to everyone. We believe that
                        small changes can make a big impact, and we're committed to providing a curated selection
                        of eco-friendly products that are good for you and the planet.
                    </p>

                    <h2 className="text-2xl font-semibold text-green-500 mb-4">Our Values</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Sustainability: We prioritize products that minimize environmental impact.</li>
                        <li>Quality: We carefully select products that are durable and effective.</li>
                        <li>Transparency: We are open about our sourcing and business practices.</li>
                        <li>Community: We support ethical and sustainable businesses.</li>
                    </ul>
                </div>

                {/* Right Column: Our Story and Image */}
                <div>
                    <h2 className="text-2xl font-semibold text-green-500 mb-4">Our Story</h2>
                    <p className="text-gray-700 mb-6">
                        EcoCart was founded in 2025 by a group of environmental enthusiasts who wanted to create a
                        one-stop shop for sustainable products. We started with a small selection of items and have
                        grown to offer a wide range of eco-friendly alternatives for everyday use.
                    </p>
                    <img
                        src={CarbonNeutral}
                        alt="Eco-friendly products"
                        className="rounded-lg shadow-md size-50 mx-auto"
                    />
                </div>
            </div>

            {/* Footer: Call to Action */}
            <div className="text-center mt-12">
                <p className="text-gray-700">
                    Join us in our mission to create a more sustainable future.
                </p>
                <Link
                    to="/products"
                    className="inline-block mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Shop Now
                </Link>
            </div>
        </div>
    );
};

export default AboutPage;