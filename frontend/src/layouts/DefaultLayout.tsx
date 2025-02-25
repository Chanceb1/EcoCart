import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DefaultLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </header>

      {/* Main Content */}
      <main className="flex-grow mt-16 px-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default DefaultLayout;