import { useState } from 'react';
import {
  RiMapPinLine, RiPhoneLine, RiMailLine, RiTimeLine, RiArrowDownSLine, RiCheckLine,
  RiFacebookFill, RiTwitterFill, RiInstagramFill, RiWhatsappFill
} from 'react-icons/ri';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const contactInfo = [
    { icon: RiMapPinLine, title: 'Adresse', content: '123 Avenue Principale\nMoundoun, Tchad' },
    { icon: RiPhoneLine, title: 'Téléphone', content: '+235 99 74 65 16\n+235 66 74 65 16' },
    { icon: RiMailLine, title: 'Email', content: 'contact@hotellavotre.com' },
    { icon: RiTimeLine, title: 'Horaires', content: 'Réception : 24h/24\nService client : 8h – 22h' },
  ];

  const bgContact = 'src/assets/contact.png';

  return (
    <div className="min-h-screen font-sans relative">
      <Header />

      {/* Hero */}
      <div
        className="relative h-96 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.7)), url(${bgContact})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">Contactez-nous</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white">
            Notre équipe est à votre écoute pour répondre à toutes vos questions rapidement et efficacement.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 mb-20">

          {/* Infos */}
          <div className="space-y-6 lg:space-y-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="flex items-start p-5 md:p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                >
                  <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 bg-amber-50 rounded-full flex items-center justify-center mr-4">
                    <Icon className="text-2xl text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg md:text-xl">{info.title}</h3>
                    <p className="text-gray-600 mt-1 whitespace-pre-line leading-relaxed">{info.content}</p>
                  </div>
                </div>
              );
            })}

            {/* Réseaux */}
            <div className="bg-white rounded-xl p-5 md:p-6 shadow-md flex flex-col space-y-3 md:space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg">Suivez-nous</h3>
              <div className="flex space-x-3">
                {[RiFacebookFill, RiTwitterFill, RiInstagramFill, RiWhatsappFill].map((SocialIcon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 md:w-12 md:h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 hover:bg-amber-100 transition-all duration-300 transform hover:scale-110"
                  >
                    <SocialIcon className="text-xl md:text-2xl" />
                  </a>
                ))}
              </div>
            </div>

            {/* Carte */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.123456789!2d11.123456!3d3.123456"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Carte"
              />
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-5">
                  <RiCheckLine className="text-4xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Message envoyé !</h3>
                <p className="text-gray-600">Merci ! Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nom complet" required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500" />

                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500" />

                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Téléphone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500" />

                <div className="relative">
                  <select name="subject" value={formData.subject} onChange={handleChange} required
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 appearance-none bg-white">
                    <option value="">Sélectionnez un sujet</option>
                    <option value="reservation">Réservation</option>
                    <option value="information">Information générale</option>
                    <option value="service">Service client</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="event">Événement</option>
                    <option value="other">Autre</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                    <RiArrowDownSLine className="text-gray-500" />
                  </div>
                </div>

                <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} maxLength={500}
                  placeholder="Décrivez votre demande…"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 resize-none" />

                <p className="text-xs text-gray-500 text-right">{formData.message.length}/500 caractères</p>

                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-medium py-3 rounded-lg transition-all">
                  {isSubmitting ? 'Envoi en cours…' : 'Envoyer le message'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
