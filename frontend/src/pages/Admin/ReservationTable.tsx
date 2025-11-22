import { useState, type ChangeEvent } from "react";
import type { Room } from "../../types";

interface Props {
  rooms: Room[];
  onAddRoom: (formData: FormData) => void;
  onEditRoom: (room: Room) => void;
  onDeleteRoom: (id: number) => void;
}

export default function RoomTable({ rooms, onAddRoom, onEditRoom, onDeleteRoom }: Props) {
  const [newRoom, setNewRoom] = useState({ name: "", price: "", description: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", newRoom.name);
    formData.append("price", newRoom.price);
    formData.append("description", newRoom.description);
    if (imageFile) formData.append("image", imageFile);

    onAddRoom(formData);

    setNewRoom({ name: "", price: "", description: "" });
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight">
        Gestion des Chambres
      </h2>

      {/* Formulaire ajout */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200 mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Ajouter une chambre</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Nom *</label>
            <input
              type="text"
              value={newRoom.name}
              onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
              className="w-full border rounded-lg p-3 bg-white shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Ex: Chambre Deluxe"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Prix (CFA) *</label>
            <input
              type="number"
              value={newRoom.price}
              onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
              className="w-full border rounded-lg p-3 bg-white shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Ex: 45000"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
          <textarea
            value={newRoom.description}
            onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
            className="w-full border rounded-lg p-3 bg-white shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Décrivez la chambre..."
            rows={3}
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 mb-1 block">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded-lg bg-white shadow-sm"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              className="h-28 w-40 object-cover rounded-lg mt-3 border shadow"
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!newRoom.name || !newRoom.price}
          className="mt-6 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition disabled:opacity-50"
        >
          Ajouter la chambre
        </button>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-amber-600 text-white">
            <tr>
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Prix</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr
                key={room.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium text-gray-800">{room.name}</td>
                <td className="p-3 text-gray-700">
                  {room.price.toLocaleString()} CFA
                </td>
                <td className="p-3">
                  {room.images?.[0] ? (
                    <img
                      src={room.images[0]}
                      className="h-16 w-24 object-cover rounded-lg shadow"
                    />
                  ) : (
                    <span className="text-gray-400">Aucune image</span>
                  )}
                </td>
                <td className="p-3 text-gray-700">{room.description}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => onEditRoom(room)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm shadow"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => onDeleteRoom(room.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm shadow"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
