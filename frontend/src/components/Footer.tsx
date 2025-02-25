const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} EcoCart. All rights reserved.</p>
        <div className="mt-2">
          <a href="/privacy" className="hover:text-green-400 mx-2">Privacy Policy</a>
          <a href="/terms" className="hover:text-green-400 mx-2">Terms of Service</a>
          <a href="/contact" className="hover:text-green-400 mx-2">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;