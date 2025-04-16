const ContactPage = () => {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-semibold text-center mb-8">
                Contact Us
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <form
                        action="mailto:support@ecocart.com"
                        method="post"
                        encType="text/plain"
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    >
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Your Email"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="message"
                            >
                                Message
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="message"
                                rows={5}
                                name="message"
                                placeholder="Your Message"
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

                {/* Contact Information */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Contact Information
                    </h2>
                    <p className="text-gray-700 mb-2">
                        <strong>Address:</strong> 123 Eco Street, Sustainable
                        City, USA
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>Email:</strong>{' '}
                        <a href="mailto:info@ecocart.com">info@ecocart.com</a>
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>Phone:</strong> (123) 456-7890
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>Hours:</strong> Monday - Friday, 9am - 5pm
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
