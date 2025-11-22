import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-amber-400" style={{ fontFamily: 'var(--font-pacifico)' }}>
              Hôtel la votre
            </h3>
            <p className="text-gray-400 mb-4">
              Votre destination de choix pour un séjour inoubliable au cœur de Moundoun.
            </p>
            <div className="flex space-x-4">
              <i className="ri-facebook-fill text-2xl text-amber-400 hover:text-amber-300 cursor-pointer transition-colors"></i>
              <i className="ri-twitter-fill text-2xl text-amber-400 hover:text-amber-300 cursor-pointer transition-colors"></i>
              <i className="ri-instagram-fill text-2xl text-amber-400 hover:text-amber-300 cursor-pointer transition-colors"></i>
              <i className="ri-whatsapp-fill text-2xl text-amber-400 hover:text-amber-300 cursor-pointer transition-colors"></i>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Accueil</Link></li>
              <li><Link to="/chambres" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Chambres</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Services</Link></li>
              <li><Link to="/restaurant" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Restaurant</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Réception 24h/24</span></li>
              <li><span className="text-gray-400">Service de navette</span></li>
              <li><span className="text-gray-400">Blanchisserie</span></li>
              <li><span className="text-gray-400">Conciergerie</span></li>
              <li><span className="text-gray-400">Parking gratuit</span></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center">
                <i className="ri-map-pin-line mr-2"></i>
                123 Avenue Principale, Moundoun
              </p>
              <p className="flex items-center">
                <i className="ri-phone-line mr-2"></i>
                +237 678 901 234
              </p>
              <p className="flex items-center">
                <i className="ri-mail-line mr-2"></i>
                contact@hotellavotre.com
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Hôtel la votre . Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
