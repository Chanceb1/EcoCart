import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800">
      <div className="container mx-auto text-center py-6">
        <div className="mt-2 space-x-4">
          <Link
            to="/privacy" 
            className="text-gray-300 hover:text-green-400 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            className="text-gray-300 hover:text-green-400 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to="/contact" 
            className="text-gray-300 hover:text-green-400 transition-colors"
          >
            Contact Us
          </Link>
        </div>
        <br />
        <p className="text-gray-300">&copy; {new Date().getFullYear()} EcoCart. All rights reserved.</p> 
      </div>
    </footer>
  );
};

export default Footer;