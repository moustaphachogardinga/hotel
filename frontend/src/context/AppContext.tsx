import { createContext, useContext, useState, type ReactNode } from 'react';

export interface Room {
  id: number;
  number: string;
  type: string;
  price: number;
  available: boolean;
}

export interface Reservation {
  id: number;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}


interface AppContextType {
  rooms: Room[];
  reservations: Reservation[];
  addRoom: (room: Room) => void;
  editRoom: (room: Room) => void;
  deleteRoom: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [reservations] = useState<Reservation[]>([]);

  const addRoom = (room: Room) => setRooms(prev => [...prev, room]);
  const editRoom = (room: Room) =>
    setRooms(prev => prev.map(r => (r.id === room.id ? room : r)));
  const deleteRoom = (id: number) =>
    setRooms(prev => prev.filter(r => r.id !== id));

  return (
    <AppContext.Provider value={{ rooms, reservations, addRoom, editRoom, deleteRoom }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};