import EcoIcon from '@/assets/eco-friendly-icon.svg';
import { Button } from '@/components/ui/Button';

export default function ProductPage() {
    return (
        <div className="container w-8/10 mx-auto pt-6 py-8 align-start text-center">
            {/* Product Listing */}
            <div className="grid grid-cols-3 gap-1 justify-start place-content-start">
                {/* Product */}
                <div className="col-span-2 grid grid-cols-2 gap-1 justify-center">
                    {/* Image */}
                    <div className="flex justify-end pr-4">
                        <div className="flex border-2 rounded-md border-solid size-100">
                            <img
                                    src={EcoIcon}
                                    alt="image"
                                    className="object-contain"
                                />
                        </div>
                    </div>
                    {/* Details */}
                    <article className="text-left border-2 bg-white rounded-lg overflow-hidden min-h-full">
                        <div className="p-3">
                            <h1 className="text-2xl font-bold mb-1">
                                Full Product Title
                            </h1>
                            <p className="text-sm indent-8 text-gray-500">
                                [Category Tags]
                            </p>
                            <div className="flex pt-2 place-content-between items-center border-b-2">
                                <p className="text-sm font-bold text-gray-700">
                                    Seller Name
                                </p>
                                <p className="text-xl text-green-600 font-bold">
                                    Rating
                                </p>
                            </div>
                            <div className="mt-2 align-text-center p-4 pt-2 text-left bg-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl">
                                Description
                                

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed enim id lorem aliquet malesuada ut eu sem. Duis laoreet nibh quis convallis dictum. Integer hendrerit sed nulla in suscipit. Praesent lacus metus, suscipit eget convallis eget, laoreet id erat. Mauris et libero ac est rutrum convallis. Vestibulum risus massa, feugiat et mi ut, rutrum pharetra eros. Duis efficitur tellus sit amet sagittis volutpat. Nullam et libero in tortor dapibus dictum at quis tellus. Sed vitae porta ante, sit amet tempor nunc. Praesent orci augue, sodales vitae consectetur vitae, placerat eu leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Vivamus nec tincidunt turpis, eu porttitor mi. Nunc pulvinar ante orci, a condimentum orci aliquam at. Suspendisse vehicula ligula euismod tincidunt finibus. Donec laoreet diam non massa ultrices imperdiet nec vitae urna. Duis dignissim id libero ut pellentesque. Curabitur pulvinar orci in sollicitudin pellentesque. Proin viverra dui non nibh varius malesuada. In odio erat, finibus non ultrices et, tristique molestie quam. Aenean nec mi sed metus faucibus fringilla. Mauris at bibendum nunc.

Praesent ac rhoncus velit, non feugiat turpis. Morbi urna erat, auctor vitae arcu id, sodales maximus arcu. Proin rutrum efficitur elit quis pharetra. Vivamus eu mi vitae felis commodo blandit. Nulla in libero mattis, interdum neque ac, pellentesque diam. Nam dapibus metus justo, in porttitor velit laoreet in. In ultrices auctor nisl nec accumsan.

Nunc posuere lacus in velit porttitor, nec lacinia dui maximus. Nulla euismod orci nunc, eu cursus ex interdum eu. Vestibulum auctor tincidunt tortor ac lobortis. Praesent sed ultricies lorem, sed imperdiet erat. Praesent gravida vitae quam in hendrerit. Nam accumsan lacus eu massa cursus eleifend. Curabitur in interdum metus, bibendum rhoncus nunc. Morbi efficitur dictum ante quis porta. Donec non auctor libero.

Duis ac sollicitudin nulla, vitae egestas lorem. Fusce pulvinar molestie risus, non varius mi finibus a. Maecenas condimentum dui a turpis sodales dapibus. Vivamus lacus neque, laoreet non pellentesque nec, suscipit in est. Donec vehicula orci quis quam aliquet venenatis. Pellentesque sagittis sed nisl sed pretium. Nam tincidunt tincidunt diam vitae suscipit. Fusce faucibus, risus non dignissim imperdiet, neque sapien posuere diam, et rhoncus quam lorem at justo. 
                            </div>
                        </div>
                    </article>
                </div>
                {/* Order Bar */}
                <div className="col-span-1 border-2 rounded-sm h-100 w-6/10 justify-self-center">
                    <h3 className='text-3xl col-span-1 text-green-600 font-bold pb-2 m-4 border-b-2'>
                        Price
                    </h3>
                    <div className="flex flex-col justify-center">
                        <div className="mt-1 m-2 h-48 overflow-hidden align-text-top p-2 text-left bg-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl">
                            Seller Shipping Info Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                            Seller Shipping Info
                        </div>
                    <Button className="text-wrap m-2 w-4/5 place-self-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                        Add to Cart
                    </Button>
                    <Button className="text-wrap m-2 mb-6 w-4/5 place-self-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Add and Checkout
                    </Button>
                    </div>
                    
                </div>
            </div>
            
        </div>
    );
}