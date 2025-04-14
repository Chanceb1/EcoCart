import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container mx-auto text-center py-6">
        <div className="mt-2 space-x-4">
          <Link
            to="/privacy" 
            className="text-muted-foreground hover:text-green-400 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            className="text-muted-foreground hover:text-green-400 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to="/contact" 
            className="text-muted-foreground hover:text-green-400 transition-colors"
          >
            Contact Us
          </Link>
        </div>
        <br />
        <p className="text-foreground/80">&copy; {new Date().getFullYear()} EcoCart. All rights reserved.</p> 
      </div>
    </footer>
  );
};

export default Footer