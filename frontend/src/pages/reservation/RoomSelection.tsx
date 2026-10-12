import { useState, useEffect } from "react";
import type { Room } from "../../types";
import { getRooms } from "../../api";

interface RoomSelectionProps {
  selectedRoom: Room | null;
  onRoomSelect: (room: Room) => void;
}

export default function RoomSelection({ selectedRoom, onRoomSelect }: RoomSelectionProps) {
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

  // Construit l'URL complète pour le navigateur
  const getImageUrl = (path?: string) => {
    if (!path) return "[https://via.placeholder.com/150?text=Pas+d'image](https://via.placeholder.com/150?text=Pas+d'image)";
    if (path.startsWith("http")) return path;
    return `http://localhost:5001${path}`;
  };

  if (loading) return <p className="text-center py-10">Chargement des chambres...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;
  if (rooms.length === 0) return <p className="text-center py-10">Aucune chambre disponible.</p>;

  return (<div className="bg-white rounded-lg shadow-sm p-8"> <h2 className="text-2xl font-bold text-gray-900 mb-6">Choisissez votre chambre</h2> <div className="space-y-6">
    {rooms.map((room) => {
      const images = Array.isArray(room.images) ? room.images : room.images ? [room.images] : [];
      const features = Array.isArray(room.features) ? room.features : [];


      return (
        <div
          key={room.id}
          className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${selectedRoom?.id === room.id
              ? "border-amber-500 bg-amber-50"
              : "border-gray-200 hover:border-amber-300"
            }`}
          onClick={() => onRoomSelect(room)}
        >
          <div className="flex gap-4">s
            {/* Première image principale */}
            <div
              className="w-24 h-24 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url('${getImageUrl(rooms.images)}')` }}
            />

            {/* Texte et détails */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                <p className="text-xl font-bold text-amber-600">{room.price.toLocaleString()} CFA</p>
              </div>
              <p className="text-gray-600 mb-3">{room.description || "Pas de description disponible."}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-2">
                {features.map((feature, i) => (
                  <span key={i} className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>

              {/* Toutes les images supplémentaires */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {images.slice(1).map((img, idx) => (
                    <div
                      key={idx}
                      className="w-16 h-16 bg-cover bg-center rounded"
                      style={{ backgroundImage: `url('${getImageUrl(img)}')` }}
                    />
                  ))}
                </div>
              )}

              {/* Details optionnels */}
              {Array.isArray(room.details) && room.details.length > 0 && (
                <ul className="mt-2 text-gray-600 text-sm list-disc list-inside">
                  {room.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {selectedRoom?.id === room.id && (
            <div className="mt-4 flex items-center text-amber-600">
              <i className="ri-check-circle-line mr-2"></i>
              <span className="font-medium">Chambre sélectionnée</span>
            </div>
          )}
        </div>
      );
    })}
  </div>
  </div>


  );
}
