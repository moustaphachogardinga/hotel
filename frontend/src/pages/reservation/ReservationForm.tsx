import { useState, type ChangeEvent, type FormEvent } from "react";
import { createReservation } from "../../api";
import type { Room, NewReservation } from "../../types";

type ReservationFormProps = {
selectedRoom?: Room;
};

export default function ReservationForm({ selectedRoom }: ReservationFormProps) {
const [formData, setFormData] = useState({
firstName: "",
lastName: "",
email: "",
phone: "",
checkIn: "",
checkOut: "",
guests: 1,
specialRequests: "",
});

const [isSubmitting, setIsSubmitting] = useState(false);
const [submitted, setSubmitted] = useState(false);

const handleChange = (
e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e: FormEvent) => {
e.preventDefault();

if (!selectedRoom) {
  alert("Veuillez sélectionner une chambre valide.");
  return;
}

setIsSubmitting(true);

const newReservation: NewReservation = {
  room_id: selectedRoom.id,
  name: formData.firstName + " " + formData.lastName,
  email: formData.email,
  phone: formData.phone,
  checkin: formData.checkIn,
  checkout: formData.checkOut,
  guests: Number(formData.guests),
  message: formData.specialRequests,
};

try {
  await createReservation(newReservation);
  setSubmitted(true);

  setFormData({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    specialRequests: "",
  });

} catch (err: unknown) {
  console.error(err);
  if (err instanceof Error) {
    alert(`Erreur : ${err.message}`);
  } else {
    alert("Une erreur inconnue est survenue lors de la réservation.");
  }
} finally {
  setIsSubmitting(false);
}

};

if (submitted) {
return ( <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center"> <i className="ri-check-circle-line text-6xl text-green-500 mb-4"></i> <h3 className="text-2xl font-bold text-green-800 mb-2">Réservation confirmée !</h3> <p className="text-green-600">
Nous vous contacterons bientôt pour confirmer votre réservation. </p> </div>
);
}

return ( <div className="bg-white rounded-lg shadow-sm p-8"> <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de réservation</h2> <form onSubmit={handleSubmit} className="space-y-6">
{/* Prénom et Nom */} <div className="grid md:grid-cols-2 gap-6"> <div> <label className="block text-sm font-medium mb-2">Prénom *</label> <input
           type="text"
           name="firstName"
           value={formData.firstName}
           onChange={handleChange}
           required
           className="w-full px-4 py-3 border rounded-lg"
         /> </div> <div> <label className="block text-sm font-medium mb-2">Nom *</label> <input
           type="text"
           name="lastName"
           value={formData.lastName}
           onChange={handleChange}
           required
           className="w-full px-4 py-3 border rounded-lg"
         /> </div> </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium mb-2">Email *</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border rounded-lg"
      />
    </div>

    {/* Téléphone */}
    <div>
      <label className="block text-sm font-medium mb-2">Téléphone *</label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border rounded-lg"
      />
    </div>

    {/* Dates */}
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-2">Date d'arrivée *</label>
        <input
          type="date"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Date de départ *</label>
        <input
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>
    </div>

    {/* Nombre d'invités */}
    <div>
      <label className="block text-sm font-medium mb-2">Nombre d'invités</label>
      <select
        name="guests"
        value={formData.guests}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-lg"
      >
        {[1,2,3,4].map(n => (
          <option key={n} value={n}>{n} personne{n>1?'s':''}</option>
        ))}
      </select>
    </div>

    {/* Demandes spéciales */}
    <div>
      <label className="block text-sm font-medium mb-2">Demandes spéciales</label>
      <textarea
        name="specialRequests"
        value={formData.specialRequests}
        onChange={handleChange}
        rows={4}
        maxLength={500}
        className="w-full px-4 py-3 border rounded-lg"
        placeholder="Écrivez vos demandes..."
      />
    </div>

    {/* Chambre sélectionnée */}
    {selectedRoom && (
      <div className="bg-amber-50 border rounded-lg p-4">
        <h3 className="font-semibold">Chambre sélectionnée : {selectedRoom.name}</h3>
        <p>Prix : {selectedRoom.price.toLocaleString()} CFA / nuit</p>
      </div>
    )}

    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold"
    >
      {isSubmitting ? "Réservation en cours..." : "Confirmer la réservation"}
    </button>
  </form>
</div>


);
}
