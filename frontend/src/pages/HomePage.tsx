import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import EcoIcon from '@/assets/eco-friendly-icon.svg';
import { motion } from 'framer-motion';

const HomePage = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white dark:from-green-100 dark:to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="sm:text-center lg:text-left"
                            >
                                <h1 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 dark:text-green-700 sm:text-5xl sm:leading-none md:text-6xl">
                                    Sustainable Shopping
                                    <br />
                                    <span className="text-green-600 dark:text-gray-900">For a Better World</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-600 dark:text-gray-900 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Join the eco-revolution with EcoCart. Discover carefully curated sustainable products 
                                    that make a real difference for our planet's future.
                                </p>
                                <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                                    <Button variant="default" className="rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                                        <Link to="/products">Shop Now</Link>
                                    </Button>
                                    <Button variant="outline" className="ml-4 rounded-full px-8 py-6 text-lg font-semibold hover:bg-green-50 transition-all duration-300">
                                        <Link to="/about">Learn More</Link>
                                    </Button>
                                </div>
                            </motion.div>
                        </main>
                    </div>
                </div>
                <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:absolute lg:inset-y-1/10 lg:left-6/10 w-1/2"
                >
                    <div className="flex place-content-center text-center size-100">
                    <img
                        className="object-contain text-center"
                        src={EcoIcon}
                        alt="Eco-friendly products"
                    />
                    </div>
                </motion.div>
            </div>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Why Choose EcoCart?
                        </h2>
                        <p className="mt-4 text-xl text-gray-900">
                            Making sustainable choices has never been easier
                        </p>
                    </div>

                    <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative p-6 bg-green-400 rounded-xl hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="text-green-600 mb-4 text-2xl">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-black">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const features = [
    {
        title: "Eco-Friendly Products",
        description: "Every product in our store is carefully selected for its sustainable qualities and environmental impact.",
        icon: "🌱"
    },
    {
        title: "Carbon Neutral Shipping",
        description: "We offset the carbon footprint of every delivery to ensure a clean and green shopping experience.",
        icon: "🌍"
    },
    {
        title: "Recycling Programs",
        description: "Join our recycling initiatives and help create a circular economy for a sustainable future.",
        icon: "♻️"
    }
];

export default HomePage;