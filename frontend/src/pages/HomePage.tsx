import React from 'react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import EcoIcon from '@/assets/eco-friendly-icon.svg';

const HomePage = () => {
    return (
        <div className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                                Sustainable Shopping
                                <br />
                                <span className="text-green-600">For a Better World</span>
                            </h2>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                EcoCart is your destination for eco-friendly and sustainable products.
                                Shop consciously and make a positive impact on the planet.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                              <div className="mt-3 sm:mt-0 sm:ml-3 flex items-center">
                                <Button variant="default">
                                  <Link 
                                  to="/products"
                                  className=""
                                  >
                                        Shop Now
                                  </Link>
                                </Button>
                                    <Button variant="outline" className="ml-4">
                                        <Link
                                            to="/about"                                      
                                        >
                                            Learn More
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img
                    className="h-24 w-full object-contain sm:h-32 md:h-40 lg:w-full lg:h-1/2"
                    src={EcoIcon}
                    alt="Eco-friendly products"
                />
            </div>
        </div>
    );
};

export default HomePage;

// import { Button } from '@/components/UI/Button';
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//   return (
//     <div className="container mx-auto py-8 align-middle text-center">
//       <h1 className="text-4xl font-bold mb-6">Welcome to EcoCart</h1>
//       <p className="text-lg">Your sustainable shopping destination</p>

//       <Button variant="default" className="mt-6">
//         <Link to="/products">
//           Shop Now
//         </Link>
//       </Button>
//     </div>
//   );
// };

// export default HomePage;