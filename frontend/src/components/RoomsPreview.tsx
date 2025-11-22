// src/components/RoomsPreview.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRooms } from "../api";

// ✅ CORRIGÉ : features est une chaîne (car stocké comme TEXT en base)
interface Room {
  id: number;
  name: string;
  price: number;
  image?: string;
  features?: string; // ✅ string au lieu de string[]
}

// ✅ Fonction utilitaire pour parser les équipements
const parseFeatures = (features: string | undefined): string[] => {
  if (!features) return [];
  return features
    .split(',')
    .map(item => item.trim())
    .filter(item => item.length > 0);
};

export default function RoomsPreview() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        const data = await getRooms();
        setRooms(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("Erreur chargement chambres:", err);
        setError(err.message || "Impossible de charger les chambres.");
      } finally {
        setLoading(false);
      }
    };
    loadRooms();
  }, []);

  if (loading) return <p className="text-center py-20">Chargement des chambres...</p>;
  if (error) return <p className="text-center py-20 text-red-600">{error}</p>;

  const getImageUrl = (path?: string) => {
    if (!path) return "https://via.placeholder.com/800x600?text=Pas+d'image";
    if (path.startsWith("http")) return path;
    return `http://localhost:5001${path}`;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Chambres
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choisissez parmi nos chambres soigneusement aménagées pour un confort optimal
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url('${getImageUrl(room.image)}')` }}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {room.name}
                </h3>
                <p className="text-2xl font-bold text-amber-600 mb-4">
                  {room.price.toLocaleString('fr-FR')} CFA / nuit
                </p>
                {/* ✅ Utilise parseFeatures */}
                <ul className="text-sm text-gray-600 mb-6 space-y-1">
                  {parseFeatures(room.features).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/chambres/${room.id}`}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap text-center block"
                >
                  Voir détails
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/chambres"
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
          >
            Voir toutes les chambres
          </Link>
        </div>
      </div>
    </section>
  );
}