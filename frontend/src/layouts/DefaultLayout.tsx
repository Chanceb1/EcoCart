import { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </header>

      {/* Main Content */}
      <main className="flex-grow mt-16 px-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default DefaultLayout;