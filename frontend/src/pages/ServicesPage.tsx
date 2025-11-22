import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { RiRestaurantLine, RiRestTimeLine, RiCarLine } from 'react-icons/ri';
import { getServices } from "../api";
import type { Service } from "../types";

// Textes par défaut (fallback) pour chaque service
const defaultDescriptions: Record<string, string> = {
"restaurant & bar": "Savourez une cuisine raffinée et des cocktails exquis dans notre restaurant ouvert tous les jours. Ambiance chaleureuse, ingrédients locaux et service attentionné pour une expérience culinaire mémorable.",
"piscine & spa": "Plongez dans notre piscine à débordement offrant une vue panoramique, puis laissez-vous choyer au spa avec massages traditionnels et soins personnalisés. Ouvert de 8h à 20h pour votre détente totale.",
"transport & navette": "Profitez de notre service de navette gratuit vers l’aéroport, le centre-ville ou les sites touristiques. Véhicules modernes et climatisés, chauffeurs professionnels et réservation rapide pour votre confort.",
};

export default function ServicesPage() {
const [services, setServices] = useState<Service[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchAllServices = async () => {
try {
const data = await getServices();
const enrichedServices = data.map((service: { description: string; name: string; }) => ({
...service,
description: service.description.trim()
? service.description
: defaultDescriptions[service.name.toLowerCase().trim()] || "Découvrez ce service pensé pour votre confort et votre plaisir.",
}));
setServices(enrichedServices);
} catch (err) {
console.error("Erreur récupération services:", err);
} finally {
setLoading(false);
}
};
fetchAllServices();
}, []);

const getIcon = (title: string) => {
switch (title.toLowerCase().trim()) {
case "restaurant & bar": return RiRestaurantLine;
case "piscine & spa": return RiRestTimeLine;
case "transport & navette": return RiCarLine;
default: return RiRestaurantLine;
}
};

if (loading) {
return ( <div className="min-h-screen flex items-center justify-center bg-gray-50"> <p className="text-gray-600 text-lg">Chargement de nos services…</p> </div>
);
}

return ( <div className="min-h-screen bg-gray-50"> <Header />

```
  <div className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">  
    <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Nos Services</h1>  
    <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">  
      Conçus pour sublimer votre séjour, nos services allient confort, élégance et attention aux détails afin de rendre votre expérience inoubliable.  
    </p>  

    <div className="grid md:grid-cols-3 gap-8">  
      {services.map((s, i) => {  
        const IconComponent = getIcon(s.name);  
        return (  
          <div  
            key={i}  
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-7 border border-gray-100 transform hover:-translate-y-1"  
          >  
            <div className="flex items-start mb-4">  
              <div className="shrink-0 w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mr-4">  
                <IconComponent className="text-2xl text-amber-600" />  
              </div>  
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">{s.name}</h2>  
            </div>  
            <p className="text-gray-600 leading-relaxed">{s.description}</p>  
          </div>  
        );  
      })}  
    </div>  
  </div>  

  <Footer />  
</div>  


);
}
