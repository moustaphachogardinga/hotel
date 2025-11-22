

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReservationForm from '../pages/reservation/ReservationForm';
import RoomSelection from '../pages/reservation/RoomSelection';

export default function ReservationPage() {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-8 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Réservation
            </h1>
            <p className="text-xl text-gray-600">
              Réservez votre séjour à l'Hôtel la votre en quelques clics
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <RoomSelection 
                selectedRoom={selectedRoom} 
                onRoomSelect={setSelectedRoom} 
              />
            </div>
            
            <div>
              <ReservationForm selectedRoom={selectedRoom} />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
