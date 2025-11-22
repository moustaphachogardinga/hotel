// src/pages/Admin/MenuTable.tsx
import { useState } from "react";

interface MenuItem {
  id: number;
  name: string;
  category: "appetizers" | "mains" | "desserts" | "beverages";
  price: number;
  description?: string;
}

interface Props {
  menu: MenuItem[];
  onAddMenuItem: (item: Omit<MenuItem, "id">) => void;
  onEditMenuItem: (item: MenuItem) => void;
  onDeleteMenuItem: (id: number) => void;
}

export default function MenuTable({ menu, onAddMenuItem, onEditMenuItem, onDeleteMenuItem }: Props) {
  const [newItem, setNewItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    category: "appetizers",
    price: 0,
    description: ""
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>

      {/* Formulaire ajout */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Nom"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border p-2 rounded flex-1"
        />
        <select
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
          className="border p-2 rounded"
        >
          <option value="appetizers">Entrées</option>
          <option value="mains">Plats</option>
          <option value="desserts">Desserts</option>
          <option value="beverages">Boissons</option>
        </select>
        <input
          type="number"
          placeholder="Prix"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: parseInt(e.target.value) })}
          className="border p-2 rounded w-32"
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={() => { onAddMenuItem(newItem); setNewItem({ name: "", category: "appetizers", price: 0, description: "" }); }}
          className="bg-amber-600 text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </div>

      {/* Liste menu */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Nom</th>
            <th className="p-2">Catégorie</th>
            <th className="p-2">Prix</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.category}</td>
              <td className="p-2">{item.price} CFA</td>
              <td className="p-2">{item.description}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => onEditMenuItem(item)} className="bg-blue-600 text-white px-2 py-1 rounded">Modifier</button>
                <button onClick={() => onDeleteMenuItem(item.id)} className="bg-red-600 text-white px-2 py-1 rounded">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
