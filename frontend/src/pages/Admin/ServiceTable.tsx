import { useState, type ChangeEvent } from "react";

interface Service {
  id: number;
  name: string;
  description?: string;
}

interface Props {
  services: Service[];
  onAddService: (service: { name: string; description?: string }) => Promise<void>;
  onEditService: (service: Service) => void;
  onDeleteService: (id: number) => void;
}

export default function ServiceTable({ services, onAddService, onEditService, onDeleteService }: Props) {
  const [newService, setNewService] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!newService.name) return alert("Le nom du service est requis.");

    try {
      setLoading(true);
      await onAddService(newService);
      setNewService({ name: "", description: "" });
    } catch (err) {
      console.error("Erreur ajout service :", err);
      alert("Impossible d'ajouter le service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Formulaire ajout */}
      <div className="bg-gray-800 p-4 rounded-lg space-y-3">
        <h2 className="text-white font-bold text-lg">Ajouter un service</h2>
        <input
          type="text"
          value={newService.name}
          onChange={e => setNewService({ ...newService, name: e.target.value })}
          placeholder="Nom"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
          required
        />
        <input
          type="text"
          value={newService.description}
          onChange={e => setNewService({ ...newService, description: e.target.value })}
          placeholder="Description"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <button
          onClick={handleSubmit}
          disabled={!newService.name || loading}
          className={`px-4 py-2 rounded ${
            newService.name && !loading ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-500 cursor-not-allowed"
          } text-white`}
        >
          {loading ? "Ajout..." : "Ajouter"}
        </button>
      </div>

      {/* Table services */}
      <table className="w-full table-auto bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-left text-white">Nom</th>
            <th className="px-4 py-2 text-left text-white">Description</th>
            <th className="px-4 py-2 text-left text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(s => (
            <tr key={s.id} className="border-b border-gray-600">
              <td className="px-4 py-2 text-white">{s.name}</td>
              <td className="px-4 py-2 text-gray-300">{s.description}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEditService(s)}
                  className="px-2 py-1 bg-yellow-600 hover:bg-yellow-500 text-white rounded"
                >
                  Modifier
                </button>
                <button
                  onClick={() => onDeleteService(s.id)}
                  className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded"
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
