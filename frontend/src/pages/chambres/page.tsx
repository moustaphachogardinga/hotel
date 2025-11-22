// src/pages/chambres/ChambresPage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getRooms } from '../../api';

const getImageUrl = (path: string): string => {
  if (!path) return "https://via.placeholder.com/800x600?text=Pas+d'image";
  return path.startsWith('http') ? path : `http://localhost:5001${path}`;
};

interface Room {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  size: string;
  capacity: string;
  features: string;
}

export default function ChambresPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await getRooms();
        setRooms(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || "Impossible de charger les chambres.");
      } finally {
        setLoading(false);
      }
    };
    loadRooms();
  }, []);

  const parseFeatures = (features: string): string[] => {
    return features ? features.split(',').map(s => s.trim()).filter(Boolean) : [];
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-8 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos Chambres</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos chambres élégantes pour un séjour parfait.
            </p>
          </div>

          <div className="grid gap-8">
            {rooms.length === 0 ? (
              <p className="text-center text-gray-600 text-lg">Aucune chambre disponible.</p>
            ) : (
              rooms.map((room) => (
                <div key={room.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500">

                  <div className="md:flex">

                    {/* IMAGE ANIMÉE */}
                    <div className="md:w-1/2 relative overflow-hidden group">
                      <div
                        className="
                          h-64 md:h-full 
                          bg-cover bg-center 
                          animate-slow-zoom 
                          transform transition-transform duration-[2500ms] ease-out 
                          group-hover:scale-110 group-hover:translate-x-3
                        "
                        style={{ backgroundImage: `url('${getImageUrl(room.image)}')` }}
                      />
                    </div>

                    <div className="md:w-1/2 p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">{room.name}</h2>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-amber-600">
                            {room.price.toLocaleString('fr-FR')} CFA
                          </p>
                          <p className="text-sm text-gray-500">par nuit</p>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{room.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Superficie</p>
                          <p className="text-gray-600">{room.size || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Capacité</p>
                          <p className="text-gray-600">{room.capacity || 'N/A'}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Équipements</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {parseFeatures(room.features).length > 0 ? (
                            parseFeatures(room.features).map((feature, index) => (
                              <div key={index} className="flex items-center text-sm text-gray-600">
                                <i className="ri-check-line text-green-500 mr-2" />
                                {feature}
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 col-span-2">Aucun équipement.</p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Link
                          to={`/chambres/${room.id}`}
                          className="flex-1 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium text-center transition"
                        >
                          Voir détails
                        </Link>

                        <Link
                          to="/reservation"
                          className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium text-center transition"
                        >
                          Réserver
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
