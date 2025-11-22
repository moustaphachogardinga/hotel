// src/pages/Admin/RoomTable.tsx
import { useState } from "react";
import type { Room, NewRoom } from "../../types";

interface Props {
  rooms: Room[];
  onAddRoom: (formData: FormData) => void;   // ✅ FormData attendu
  onEditRoom: (id: number, formData: FormData) => void; // ✅ FormData attendu
  onDeleteRoom: (id: number) => void;
}

export default function RoomTable({ rooms, onAddRoom, onEditRoom, onDeleteRoom }: Props) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [newRoom, setNewRoom] = useState<Omit<NewRoom, "images">>({
    name: "",
    price: 0,
    description: "",
    size: "",
    capacity: "",
    features: [],
    details: [],
  });

  // 🔹 Convertir NewRoom en FormData
  const buildFormData = (room: Omit<NewRoom, "images">, imageUrl?: string) => {
    const formData = new FormData();
    formData.append("name", room.name);
    formData.append("price", room.price.toString());
    formData.append("description", room.description || "");
    formData.append("size", room.size);
    formData.append("capacity", room.capacity);

    room.features?.forEach((f, i) => formData.append(`features[${i}]`, f));
    room.details?.forEach((d, i) => formData.append(`details[${i}]`, d));

    if (imageUrl) {
      formData.append("image", imageUrl); // 🔹 Si tu upload une URL (ou un File si input file)
    }

    return formData;
  };

  const handleAddRoom = () => {
    const formData = buildFormData(newRoom, imageUrl);
    onAddRoom(formData);

    // Reset
    setNewRoom({
      name: "",
      price: 0,
      description: "",
      size: "",
      capacity: "",
      features: [],
      details: [],
    });
    setImageUrl("");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Chambres</h2>

      {/* Formulaire ajout */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Nom"
          value={newRoom.name}
          onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
          className="border p-2 rounded flex-1"
        />
        <input
          type="number"
          placeholder="Prix"
          value={newRoom.price || ""}
          onChange={(e) => setNewRoom({ ...newRoom, price: parseInt(e.target.value) || 0 })}
          className="border p-2 rounded w-32"
        />
        <input
          type="text"
          placeholder="URL de l'image"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Description"
          value={newRoom.description || ""}
          onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleAddRoom}
          className="bg-amber-600 text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </div>

      {/* Liste chambres */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Nom</th>
            <th className="p-2">Prix</th>
            <th className="p-2">Image</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id} className="border-b">
              <td className="p-2">{room.name}</td>
              <td className="p-2">{room.price} CFA</td>
              <td className="p-2">
                {room.images && room.images[0] && (
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="h-16 w-24 object-cover rounded"
                  />
                )}
              </td>
              <td className="p-2">{room.description}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => {
                    const formData = buildFormData(room as Omit<NewRoom, "images">, room.images?.[0]);
                    onEditRoom(room.id, formData);
                  }}
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Modifier
                </button>
                <button
                  onClick={() => onDeleteRoom(room.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
