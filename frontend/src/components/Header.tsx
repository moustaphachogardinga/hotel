// src/components/Header.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLinkClick = (path: string) => {
    closeMenu();
    navigate(path);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-amber-600" style={{ fontFamily: 'var(--font-pacifico)' }}>
              Hôtel la votre
            </h1>
          </div>

          {/* Menu Desktop (caché sur mobile) */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-amber-600 transition-colors font-medium whitespace-nowrap">
              Accueil
            </Link>
            <Link to="/chambres" className="text-gray-700 hover:text-amber-600 transition-colors font-medium whitespace-nowrap">
              Chambres
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-amber-600 transition-colors font-medium whitespace-nowrap">
              Services
            </Link>
            <Link to="/restaurant" className="text-gray-700 hover:text-amber-600 transition-colors font-medium whitespace-nowrap">
              Restaurant
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-amber-600 transition-colors font-medium whitespace-nowrap">
              Contact
            </Link>
          </nav>

          {/* Bouton Réserver + Hamburger Mobile */}
          <div className="flex items-center space-x-4">
            <Link
              to="/reservation"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap"
            >
              Réserver
            </Link>

            {/* Hamburger Menu (visible uniquement sur mobile) */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <span
                className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ease-in-out ${
                  isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-gray-700 my-1.5 transition-opacity duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ease-in-out ${
                  isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile (Slide-in) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-amber-600" style={{ fontFamily: 'var(--font-pacifico)' }}>
              Menu
            </h2>
            <button
              onClick={closeMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Fermer le menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-4">
            <button
              onClick={() => handleLinkClick('/')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              Accueil
            </button>
            <button
              onClick={() => handleLinkClick('/chambres')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              Chambres
            </button>
            <button
              onClick={() => handleLinkClick('/services')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              Services
            </button>
            <button
              onClick={() => handleLinkClick('/restaurant')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              Restaurant
            </button>
            <button
              onClick={() => handleLinkClick('/contact')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              Contact
            </button>
          </nav>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={() => handleLinkClick('/reservation')}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              Réserver
            </button>
          </div>
        </div>
      </div>

      {/* Overlay semi-transparent pour fermer le menu en cliquant dessus */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}
    </header>
  );
}