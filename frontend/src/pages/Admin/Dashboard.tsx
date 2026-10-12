import { useEffect, useState } from "react";
import {
  FaBed,
  FaConciergeBell,
  FaUtensils,
  FaEnvelope,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";
import { API_BASE } from "../../api";

export default function Dashboard() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [menu, setMenu] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "rooms" | "services" | "menu" | "reservations" | "messages"
  >("dashboard");

  const token = localStorage.getItem("adminToken") || "";

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/login";
      throw new Error("Session expirée. Veuillez vous reconnecter.");
    }

    return res;
  };

  const fetchAll = async () => {
    try {
      const [roomsData, servicesData, menuData, messagesData, reservationsData] = await Promise.all([
        fetchWithAuth(`${API_BASE}/rooms`).then(res => res.json()),
        fetchWithAuth(`${API_BASE}/services`).then(res => res.json()),
        fetchWithAuth(`${API_BASE}/menu`).then(res => res.json()),
        fetchWithAuth(`${API_BASE}/contact`).then(res => res.json()),
        fetchWithAuth(`${API_BASE}/reservations`).then(res => res.json()),
      ]);
      setRooms(Array.isArray(roomsData.data) ? roomsData.data : []);
      setServices(Array.isArray(servicesData.data) ? servicesData.data : []);
      setMenu(Array.isArray(menuData.data) ? menuData.data : []);
      setMessages(Array.isArray(messagesData.data) ? messagesData.data : []);
      setReservations(Array.isArray(reservationsData.data) ? reservationsData.data : []);
    } catch (err: any) {
      console.error("Erreur chargement:", err.message);
      alert(`Erreur : ${err.message}`);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // ======================= CRUD Rooms =======================
  const addRoom = async (formData: FormData) => {
    await fetchWithAuth(`${API_BASE}/rooms`, {
      method: "POST",
      body: formData,
    });
    fetchAll();
  };

  const editRoom = async (id: number, formData: FormData) => {
    await fetchWithAuth(`${API_BASE}/rooms/${id}`, {
      method: "PUT",
      body: formData,
    });
    fetchAll();
  };

  const deleteRoom = async (id: number) => {
    if (!confirm("Supprimer cette chambre ?")) return;
    await fetchWithAuth(`${API_BASE}/rooms/${id}`, { method: "DELETE" });
    fetchAll();
  };

  // ======================= Services =======================
  const addService = async (data: any) => {
    await fetchWithAuth(`${API_BASE}/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.name, description: data.description }),
    });
    fetchAll();
  };

  const editService = async (data: any) => {
    await fetchWithAuth(`${API_BASE}/services/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.name, description: data.description }),
    });
    fetchAll();
  };

  const deleteService = async (id: number) => {
    if (!confirm("Supprimer ce service ?")) return;
    await fetchWithAuth(`${API_BASE}/services/${id}`, { method: "DELETE" });
    fetchAll();
  };

  // ======================= Menu =======================
  const addMenuItem = async (data: any) => {
    await fetchWithAuth(`${API_BASE}/menu`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchAll();
  };

  const editMenuItem = async (data: any) => {
    await fetchWithAuth(`${API_BASE}/menu/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchAll();
  };

  const deleteMenuItem = async (id: number) => {
    if (!confirm("Supprimer cet élément du menu ?")) return;
    await fetchWithAuth(`${API_BASE}/menu/${id}`, { method: "DELETE" });
    fetchAll();
  };

  // ======================= Messages & Réservations =======================
  const deleteMessage = async (id: number) => {
    if (!confirm("Supprimer ce message ?")) return;
    await fetchWithAuth(`${API_BASE}/contact/${id}`, { method: "DELETE" });
    fetchAll();
  };

  const deleteReservation = async (id: number) => {
    if (!confirm("Supprimer cette réservation ?")) return;
    await fetchWithAuth(`${API_BASE}/reservations/${id}`, { method: "DELETE" });
    fetchAll();
  };

  //  CONFIRMATION DE RÉSERVATION
  const confirmReservation = async (id: number) => {
    const response = await fetchWithAuth(`${API_BASE}/reservations/${id}/confirm`, {
      method: "PATCH",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Échec de la confirmation");
    }

    return response.json();
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      {/* Header */}
      <header className="bg-linear-to-r from-[#F57C00] to-[#FF9800] text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Tableau de bord administrateur</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-[#F57C00] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition shadow"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-[#2d2d2d] border-b border-[#444] px-4 sticky top-16 z-40">
        <div className="container mx-auto flex flex-nowrap overflow-x-auto py-3 space-x-6">
          {[
            { id: "dashboard", label: "Tableau de bord" },
            { id: "rooms", label: "Gestion Chambres" },
            { id: "services", label: "Gestion Services" },
            { id: "menu", label: "Gestion Menu" },
            { id: "reservations", label: "Gestion Réservations" },
            { id: "messages", label: "Messages Clients" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`whitespace-nowrap px-4 py-2 rounded-t-lg font-medium transition ${
                activeTab === tab.id
                  ? "text-white border-b-2 border-[#F57C00]"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="container mx-auto p-4 md:p-6 pt-8">
        {/* Tableau de bord */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Chambres", count: rooms.length, color: "bg-[#F57C00]", to: "rooms", icon: <FaBed /> },
              { title: "Services", count: services.length, color: "bg-green-600", to: "services", icon: <FaConciergeBell /> },
              { title: "Réservations", count: reservations.length, color: "bg-purple-600", to: "reservations", icon: <FaCalendarAlt /> },
              { title: "Messages", count: messages.length, color: "bg-amber-600", to: "messages", icon: <FaEnvelope /> },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-[#2d2d2d] rounded-xl shadow-lg overflow-hidden border border-[#444]"
              >
                <div className={`${card.color} p-4 flex items-center`}>
                  <span className="text-white text-2xl mr-3">{card.icon}</span>
                  <h3 className="text-white font-semibold text-lg">{card.title}</h3>
                </div>
                <div className="p-5 text-center">
                  <p className="text-3xl font-bold text-white">{card.count}</p>
                  <button
                    onClick={() => setActiveTab(card.to as any)}
                    className="mt-3 text-[#FF9800] hover:text-orange-300 font-medium text-sm"
                  >
                    Voir tout →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gestion Chambres */}
        {activeTab === "rooms" && (
          <div className="bg-[#2d2d2d] rounded-xl shadow-lg p-6 border border-[#444]">
            <div className="mb-8 p-6 bg-[#333] rounded-lg border border-[#555]">
              <h2 className="text-xl font-bold mb-4">Ajouter une chambre</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  addRoom(formData);
                }}
                className="space-y-4"
                encType="multipart/form-data"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nom de la chambre"
                    required
                    className="w-full px-4 py-2 bg-[#3a3a3a] border border-[#555] text-white rounded-lg focus:ring-2 focus:ring-[#FF9800] focus:border-[#F57C00] placeholder:text-gray-400"
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Prix (CFA)"
                    required
                    min="0"
                    className="w-full px-4 py-2 bg-[#3a3a3a] border border-[#555] text-white rounded-lg focus:ring-2 focus:ring-[#FF9800] focus:border-[#F57C00] placeholder:text-gray-400"
                  />
                </div>

                <textarea
                  name="description"
                  placeholder="Description"
                  rows={2}
                  className="w-full px-4 py-2 bg-[#3a3a3a] border border-[#555] text-white rounded-lg focus:ring-2 focus:ring-[#FF9800] focus:border-[#F57C00] placeholder:text-gray-400"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* ✅ NOM CORRIGÉ : "size" au lieu de "surface" */}
                  <input
                    type="text"
                    name="size"
                    placeholder="Superficie (ex: 25 m²)"
                    className="w-full px-4 py-2 bg-[#3a3a3a] border border-[#555] text-white rounded-lg focus:ring-2 focus:ring-[#FF9800] focus:border-[#F57C00] placeholder:text-gray-400"
                  />
                  <input
                    type="text"
                    name="capacity"
                    placeholder="Capacité (ex: 2 personnes)"
                    className="w-full px-4 py-2 bg-[#3a3a3a] border border-[#555] text-white rounded-lg focus:ring-2 focus:ring-[#FF9800] focus:border-[#F57C00] placeholder:text-gray-400"
                  />
                </div>

                {/* ✅ NOM CORRIGÉ : "features" au lieu de "equipment" */}
                <textarea
                  name="features"
                  placeholder="Équipements (séparés par des virgules, ex: TV, Climatisation, WiFi)"
                  rows={2}
                  className="w-full px-4 py-2 bg-[#3a3a3a] border border-[#555] text-white rounded-lg focus:ring-2 focus:ring-[#FF9800] focus:border-[#F57C00] placeholder:text-gray-400"
                />

                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="flex-1 px-4 py-2 bg-[#3a3a3a] border border-[#555] text-white rounded-lg focus:ring-2 focus:ring-[#FF9800] focus:border-[#F57C00]"
                  />
                  <label className="flex items-center text-sm text-gray-300">
                    <input
                      type="checkbox"
                      name="available"
                      defaultChecked
                      className="mr-2 h-4 w-4 text-[#F57C00] border-[#555] rounded focus:ring-2 focus:ring-[#FF9800]"
                    />
                    Disponible
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#F57C00] hover:bg-[#FF9800] text-white py-2 rounded-lg font-medium transition"
                >
                  Ajouter la chambre
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className={`relative overflow-hidden rounded-xl shadow-lg border border-[#555] ${
                    room.available ? "opacity-100" : "opacity-60"
                  }`}
                >
                  {room.image ? (
                    <img
                      src={room.image.startsWith('http') ? room.image : `http://localhost:5001${room.image}`}
                      alt={room.name}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div
                      className={`h-40 flex items-center justify-center text-white font-bold text-xl ${
                        room.id % 2 === 0 ? "bg-[#F57C00]" : "bg-[#FF9800]"
                      }`}
                    >
                      {room.name}
                    </div>
                  )}

                  <div className="p-4 bg-[#333]">
                    <h3 className="font-bold text-lg">{room.name}</h3>
                    <p className="text-gray-300 mt-1">{room.description || "Pas de description"}</p>

                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      {room.size && (
                        <div className="bg-[#3a3a3a] p-2 rounded">
                          <p className="font-semibold text-[#F57C00]">Superficie</p>
                          <p>{room.size}</p>
                        </div>
                      )}
                      {room.capacity && (
                        <div className="bg-[#3a3a3a] p-2 rounded">
                          <p className="font-semibold text-[#F57C00]">Capacité</p>
                          <p>{room.capacity}</p>
                        </div>
                      )}
                    </div>

                    {room.features && (
                      <div className="mt-3">
                        <p className="font-semibold text-[#F57C00] text-xs">Équipements</p>
                        <div className="grid grid-cols-2 gap-1 text-xs mt-1">
                          {room.features.split(",").map((eq: string, i: number) => (
                            <span key={i} className="text-gray-300">
                              • {eq.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-[#FF9800] font-bold mt-2">{room.price.toLocaleString()} CFA</p>

                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => {
                          const newName = prompt("Nom :", room.name) ?? "";
                          const newPriceStr = prompt("Prix :", room.price.toString()) ?? "";
                          const newDesc = prompt("Description :", room.description || "") ?? "";
                          const newSize = prompt("Superficie :", room.size || "") ?? "";
                          const newCapacity = prompt("Capacité :", room.capacity || "") ?? "";
                          const newFeatures = prompt("Équipements :", room.features || "") ?? "";
                          const newAvailable = confirm("Disponible ?");

                          if (newName && !isNaN(parseFloat(newPriceStr))) {
                            const formData = new FormData();
                            formData.append("name", newName);
                            formData.append("price", newPriceStr);
                            formData.append("description", newDesc);
                            formData.append("size", newSize);           // ✅
                            formData.append("capacity", newCapacity);   // ✅
                            formData.append("features", newFeatures);   // ✅
                            formData.append("available", newAvailable ? "true" : "false");
                            editRoom(room.id, formData);
                          }
                        }}
                        className="text-[#4FC3F7] hover:text-cyan-300 text-sm"
                      >
                        <FaEdit className="inline mr-1" /> Modifier
                      </button>
                      <button
                        onClick={() => deleteRoom(room.id)}
                        className="text-[#FF5252] hover:text-red-300 text-sm"
                      >
                        <FaTrash className="inline mr-1" /> Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gestion Services */}
        {activeTab === "services" && (
          <div className="bg-[#2d2d2d] rounded-xl shadow-lg p-6 border border-[#444]">
            <div className="mb-8 p-6 bg-[#333] rounded-lg border border-[#555]">
              <h2 className="text-xl font-bold mb-4">Ajouter un service</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  addService({
                    name: formData.get("name"),
                    description: formData.get("description"),
                  });
                  e.currentTarget.reset();
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Nom du service"
                  required
                  className="w-full px-4 py-2 bg-[#3a3a3a] border border-[#555] text-white rounded-lg focus:ring-2 focus:ring-[#FF9800] focus:border-[#F57C00] placeholder:text-gray-400"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  rows={3}
                  className="w-full px-4 py-2 bg-[#3a3a3a] border border-[#555] text-white rounded-lg focus:ring-2 focus:ring-[#FF9800] focus:border-[#F57C00] placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="w-full bg-[#F57C00] hover:bg-[#FF9800] text-white py-2 rounded-lg font-medium transition"
                >
                  Ajouter service
                </button>
              </form>
            </div>

            <div className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-start justify-between p-4 bg-[#333] border border-[#555] rounded-lg hover:shadow-lg transition"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-16 h-16 bg-green-900/30 rounded-lg flex items-center justify-center">
                      <FaConciergeBell className="text-green-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{service.name}</h3>
                      <p className="text-gray-300 text-sm">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => {
                        const newName = prompt("Modifier le nom :", service.name);
                        const newDesc = prompt("Modifier la description :", service.description);
                        if (newName !== null && newDesc !== null) {
                          editService({
                            ...service,
                            name: newName,
                            description: newDesc,
                          });
                        }
                      }}
                      className="text-[#4FC3F7] hover:text-cyan-300"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteService(service.id)}
                      className="text-[#FF5252] hover:text-red-300"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gestion Menu */}
        {activeTab === "menu" && (
          <div className="bg-[#2d2d2d] rounded-xl shadow-lg p-6 border border-[#444]">
            <div className="mb-8 p-6 bg-[#333] rounded-lg border border-[#555]">
              <h2 className="text-xl font-bold mb-4">Ajouter un plat au menu</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  addMenuItem({
                    name: formData.get("name"),
                    price: parseFloat(formData.get("price") as string),
                    description: formData.get("description"),
                    category: formData.get("category"),
                  });
                  e.currentTarget.reset();
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Nom du plat"
                  required
                  className="w-full px-4 py-2 bg-[#3a3a3a] border border-[#555] text-white rounded-lg focus:ring-2 focus:ring-[#FF9800] focus:border-[#F57C00] placeholder:text-gray-400"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Prix (CFA)"
                  required
                  min="0"
                  className="w-full px-4 py-2 bg-[#3a3a3a] border border-[#555] text-white rounded-lg focus:ring-2 focus:ring-[#FF9800] focus:border-[#F57C00] placeholder:text-gray-400"
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Catégorie (ex: Entrée, Plat principal)"
                  className="w-full px-4 py-2 bg-[#3a3a3a] border border-[#555] text-white rounded-lg focus:ring-2 focus:ring-[#FF9800] focus:border-[#F57C00] placeholder:text-gray-400"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  rows={3}
                  className="w-full px-4 py-2 bg-[#3a3a3a] border border-[#555] text-white rounded-lg focus:ring-2 focus:ring-[#FF9800] focus:border-[#F57C00] placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="w-full bg-[#F57C00] hover:bg-[#FF9800] text-white py-2 rounded-lg font-medium transition"
                >
                  Ajouter le plat
                </button>
              </form>
            </div>

            <div className="space-y-4">
              {menu.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between p-4 bg-[#333] border border-[#555] rounded-lg hover:shadow-lg transition"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-16 h-16 bg-amber-900/30 rounded-lg flex items-center justify-center">
                      <FaUtensils className="text-amber-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-[#FF9800] font-bold">{item.price.toLocaleString()} CFA</p>
                      {item.category && (
                        <span className="inline-block bg-amber-900/30 text-amber-300 text-xs px-2 py-1 rounded mt-1">
                          {item.category}
                        </span>
                      )}
                      {item.description && <p className="text-gray-300 text-sm mt-1">{item.description}</p>}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => {
                        const newName = prompt("Nom :", item.name);
                        const newPrice = prompt("Prix :", item.price);
                        const newCategory = prompt("Catégorie :", item.category);
                        const newDescription = prompt("Description :", item.description);
                        if (newName !== null && newPrice !== null) {
                          editMenuItem({
                            ...item,
                            name: newName,
                            price: parseFloat(newPrice),
                            category: newCategory,
                            description: newDescription,
                          });
                        }
                      }}
                      className="text-[#4FC3F7] hover:text-cyan-300"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteMenuItem(item.id)}
                      className="text-[#FF5252] hover:text-red-300"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Réservations */}
        {activeTab === "reservations" && (
          <div className="bg-[#2d2d2d] p-5 rounded-xl shadow-lg border border-[#444]">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaCalendarAlt className="mr-2 text-purple-400" /> Gestion des réservations
            </h2>
            <div className="space-y-4">
              {reservations.map((res) => (
                <div key={res.id} className="p-4 bg-[#333] border border-[#555] rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{res.name}</div>
                      <div className="text-sm text-gray-300">
                        {res.email} • {res.phone || "N/A"}
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        <span className="font-medium">Arrivée :</span> {res.checkin ? new Date(res.checkin).toLocaleDateString() : "N/A"} &nbsp;
                        <span className="font-medium">Départ :</span> {res.checkout ? new Date(res.checkout).toLocaleDateString() : "N/A"} &nbsp;
                        <span className="font-medium">Chambre :</span> {res.room_name || "N/A"} &nbsp;
                        <span className="font-medium">Capacité :</span> {res.guests || "N/A"} personnes
                      </div>
                      <div className="mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          res.status === 'confirmed' ? 'bg-green-900 text-green-200' :
                          res.status === 'cancelled' ? 'bg-red-900 text-red-200' :
                          'bg-yellow-900 text-yellow-200'
                        }`}>
                          {res.status === 'confirmed' ? 'Confirmée' :
                           res.status === 'cancelled' ? 'Annulée' : 'En attente'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      {res.status === 'pending' && (
                        <button
                          onClick={async () => {
                            if (!confirm("Confirmer cette réservation ?")) return;
                            try {
                              await confirmReservation(res.id);
                              fetchAll();
                            } catch (err: any) {
                              alert("Erreur : " + err.message);
                            }
                          }}
                          className="text-green-400 hover:text-green-300"
                        >
                          <FaCheckCircle />
                        </button>
                      )}
                      <button
                        onClick={() => deleteReservation(res.id)}
                        className="text-[#FF5252] hover:text-red-300"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {activeTab === "messages" && (
          <div className="bg-[#2d2d2d] p-5 rounded-xl shadow-lg border border-[#444]">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaEnvelope className="mr-2 text-amber-400" /> Messages des clients
            </h2>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="p-4 bg-[#333] border border-[#555] rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <p><span className="font-medium">Nom :</span> {msg.name}</p>
                      <p><span className="font-medium">Email :</span> {msg.email}</p>
                      {msg.phone && <p><span className="font-medium">Téléphone :</span> {msg.phone}</p>}
                      <p className="mt-2 text-gray-200">{msg.message}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        {new Date(msg.created_at).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="text-[#FF5252] hover:text-red-300"
                    >
                      <FaTrash />
                    </button>
                  </div>  
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}