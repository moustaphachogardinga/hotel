export const API_BASE = "http://localhost:5001/api";

// ================== CHAMBRES ==================
export const getRooms = async () => {
  const res = await fetch(`${API_BASE}/rooms`, {
    cache: "no-store", // 🔥 Empêche le navigateur de réutiliser l’ancienne réponse
  });
  const data = await res.json();
  
  if (data.success) {
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.rooms)) return data.rooms;
  }
  
  throw new Error(data.message || "Erreur récupération chambres");
};

export const getRoomById = async (id: number) => {
  const res = await fetch(`${API_BASE}/rooms/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  
  if (data.success) {
    return data.data || data.room;
  }
  
  throw new Error(data.message || "Chambre introuvable");
};

export const addRoom = async (formData: FormData, token: string) => {
  const res = await fetch(`${API_BASE}/rooms`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Erreur ajout chambre");
  return data;
};

export const updateRoom = async (id: number, formData: FormData, token: string) => {
  const res = await fetch(`${API_BASE}/rooms/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Erreur mise à jour chambre");
  return data;
};

export const deleteRoom = async (id: number, token: string) => {
  const res = await fetch(`${API_BASE}/rooms/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store", // Important aussi ici
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Erreur suppression chambre");
  return data;
};

// ================== SERVICES ==================
export const getServices = async (token?: string) => {
  const res = await fetch(`${API_BASE}/services`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Erreur récupération services");
  return data.data;
};

export const addService = async (service: { name: string; price: number }, token: string) => {
  const res = await fetch(`${API_BASE}/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(service),
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Erreur ajout service");
  return data;
};

export const updateService = async (id: number, service: { name?: string; price?: number }, token: string) => {
  const res = await fetch(`${API_BASE}/services/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(service),
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Erreur mise à jour service");
  return data;
};

// ================== RÉSERVATIONS ==================
export const createReservation = async (reservation: {
  room_id: number;
  name: string;
  email: string;
  phone?: string;
  checkin: string;
  checkout: string;
  guests: number;
  message?: string;
}) => {
  const res = await fetch(`${API_BASE}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservation),
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Erreur création réservation");
  return data;
};

export const getReservations = async (token: string) => {
  const res = await fetch(`${API_BASE}/reservations`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Erreur récupération réservations");
  return data.data;
};

export const deleteReservation = async (id: number, token: string) => {
  const res = await fetch(`${API_BASE}/reservations/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Erreur suppression réservation");
  return data;
};

// ================== ADMIN LOGIN ==================
export const loginAdmin = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Login échoué");
  return data;
};

// ================== CONTACT ==================
export const sendContactMessage = async (contact: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) => {
  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Erreur envoi message");
  return data;
};

export const getMessages = async (token: string) => {
  const res = await fetch(`${API_BASE}/contact`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Erreur récupération messages");
  return data.data;
};

export const deleteMessage = async (id: number, token: string) => {
  const res = await fetch(`${API_BASE}/contact/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Erreur suppression message");
  return data;
};

// ================== MENU ==================
export const getMenu = async () => {
  const res = await fetch(`${API_BASE}/menu`, {
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Erreur récupération menu");
  return data.data;
};

export const addMenuItem = async (formData: FormData, token: string) => {
  const res = await fetch(`${API_BASE}/menu`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Erreur ajout plat");
  return data;
};

export const updateMenuItem = async (id: number, formData: FormData, token: string) => {
  const res = await fetch(`${API_BASE}/menu/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Erreur mise à jour plat");
  return data;
};

export const deleteMenuItem = async (id: number, token: string) => {
  const res = await fetch(`${API_BASE}/menu/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Erreur suppression plat");
  return data;
};
