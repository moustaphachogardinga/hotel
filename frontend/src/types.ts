// src/types.ts

// src/types.ts

// -------------------- CHAMBRES --------------------
export type Room = {
  image(image: any): unknown;
  id: number;
  name: string;
  price: number;
  description?: string;
  images?: string[];   // ajouté
  features?: string[];
  details?: string[];  //  ajouté
  size: string;
  capacity: string;
};


export type NewRoom = Omit<Room, "id">;
// -------------------- RÉSERVATIONS --------------------
export type Reservation = {
  id: number;
  room_id: number;
  name: string;
  email: string;
  phone?: string;
  checkin: string;  // ISO string
  checkout: string; // ISO string
  guests: number;
  message?: string;
  created_at: string;
};

// Pour créer une nouvelle réservation (frontend form)
export type NewReservation = Omit<Reservation, "id" | "created_at">;

// -------------------- MESSAGES CONTACT --------------------
export type Message = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at: string;
};

// Pour créer un nouveau message via le formulaire
export type NewMessage = Omit<Message, "id" | "created_at">;

// -------------------- ADMIN --------------------
export type Admin = {
  id: number;
  username: string;
  created_at: string;
};

export type AdminLoginResponse = {
  token: string;
  admin: Pick<Admin, "username">;
};
export type Service = {
  id: number;
  name: string;
  description?: string;
};

// Pour créer un nouveau service (frontend form)
export type NewService = Omit<Service, "id">;

// -------------------- MENU --------------------
export type MenuItem = {
  id: number;
  name: string;
  category: "appetizers" | "mains" | "desserts" | "beverages";
  price: number;
  description?: string;
};

// Pour créer un nouvel élément de menu (frontend form)
export type NewMenuItem = Omit<MenuItem, "id">;
