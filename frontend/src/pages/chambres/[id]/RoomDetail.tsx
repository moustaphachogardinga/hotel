import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { getRoomById } from '../../../api';

// 🔸 Utilitaire pour générer l'URL complète de l'image
const getImageUrl = (path?: string) => {
if (!path) return "[https://via.placeholder.com/800x600?text=Pas+d'image](https://via.placeholder.com/800x600?text=Pas+d'image)";
if (path.startsWith("http")) return path; // URL complète
return `http://localhost:5001${path}`;   // backend
};

// 🔸 Type Room
interface Room {
id: number;
name: string;
price: number;
image: string;        // chemin stocké dans backend
description: string;
surface: string;
capacity: string;
equipment: string;
}

export default function RoomDetail() {
const { id } = useParams<{ id: string }>();
const [room, setRoom] = useState<Room | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [currentImageIndex, setCurrentImageIndex] = useState(0);

useEffect(() => {
if (!id) {
setError("ID de chambre manquant");
setLoading(false);
return;
}

const loadRoom = async () => {
  try {
    setLoading(true);
    const data = await getRoomById(Number(id));
    setRoom(data);
  } catch (err: any) {
    console.error("Erreur chargement chambre:", err);
    setError(err.message || "Chambre introuvable.");
  } finally {
    setLoading(false);
  }
};

loadRoom();

}, [id]);

// 🔸 Images et équipements
const images = room?.image ? [room.image] : [];
const features = room?.equipment
? room.equipment.split(',').map(f => f.trim()).filter(Boolean)
: [];

const details = room
? [
`Lit confortable avec literie premium`,
`Superficie : ${room.surface}`,
`Capacité : ${room.capacity}`,
`Équipements : ${features.length} éléments`
]
: [];

if (loading) {
return ( <div className="min-h-screen bg-gray-50 flex items-center justify-center"> <div className="text-xl text-gray-700">Chargement de la chambre...</div> </div>
);
}

if (error || !room) {
return ( <div className="min-h-screen bg-gray-50 flex items-center justify-center"> <div className="text-xl text-red-600">{error || "Chambre introuvable."}</div> </div>
);
}

return ( <div className="min-h-screen bg-gray-50"> <Header />

```
  <div className="pt-8 pb-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link to="/chambres" className="text-amber-600 hover:text-amber-700 font-medium">
          ← Retour aux chambres
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Galerie */}
          <div className="p-8">
            <div className="mb-6">
              <div 
                className="relative h-80 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url('${getImageUrl(images[currentImageIndex])}')` }}
              >
                <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`h-20 bg-cover bg-center rounded cursor-pointer transition-opacity ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-60'
                  }`}
                  style={{ backgroundImage: `url('${getImageUrl(image)}')` }}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Détails */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {room.name}
              </h1>
              <div className="text-right">
                <p className="text-4xl font-bold text-amber-600">
                  {room.price.toLocaleString()} CFA
                </p>
                <p className="text-gray-500">par nuit</p>
              </div>
            </div>

            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              {room.description}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="font-semibold text-gray-700 mb-2">Superficie</p>
                <p className="text-gray-600">{room.surface || 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-2">Capacité</p>
                <p className="text-gray-600">{room.capacity || 'N/A'}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Équipements</h3>
              <div className="grid grid-cols-2 gap-3">
                {features.length > 0 ? (
                  features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <i className="ri-check-line text-green-500 mr-3"></i>
                      {feature}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-2">Aucun équipement.</p>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Détails</h3>
              <ul className="space-y-2">
                {details.map((detail, index) => (
                  <li key={index} className="flex items-start text-gray-600">
                    <i className="ri-arrow-right-s-line text-amber-600 mr-2 mt-1"></i>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <Link 
              to="/reservation" 
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 px-6 rounded-lg font-semibold text-lg text-center block"
            >
              Réserver cette chambre
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</div>

);
}
