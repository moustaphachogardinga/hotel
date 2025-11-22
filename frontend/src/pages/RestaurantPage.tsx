import { RiTimeLine, RiUserLine, RiAwardLine } from 'react-icons/ri';
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuSection from "../components/MenuSection";

const restaurantFeatures = [
{
icon: RiTimeLine,
title: 'Horaires',
description: 'Petit-déjeuner: 6h30 - 10h30\nDéjeuner: 12h00 - 15h00\nDîner: 19h00 - 23h00\nProfitez de chaque moment de la journée avec nos plats frais et délicieux.'
},
{
icon: RiUserLine,
title: 'Capacité',
description: '120 places assises\nTerrasse: 40 places\nSalons privés disponibles\nIdéal pour dîners intimes, événements et réunions familiales.'
},
{
icon: RiAwardLine,
title: 'Spécialités',
description: 'Cuisine africaine authentique\nPlats internationaux\nCocktails signatures\nChaque plat est préparé avec soin et des ingrédients locaux de qualité.'
}
];

export default function RestaurantPage() {
return ( <div className="min-h-screen bg-gray-50"> <Header />

```
  {/* Hero */}  
  <div  
    className="relative h-96 bg-cover bg-center"  
    style={{ backgroundImage: "url('src/assets/reste1.png')" }}  
  >  
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">  
      <div className="text-center text-white px-4">  
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Restaurant Le Moundoun</h1>  
        <p className="text-lg md:text-xl">Une expérience culinaire inoubliable</p>  
      </div>  
    </div>  
  </div>  

  <div className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">  
    {/* Présentation */}  
    <div className="text-center mb-16">  
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Savourez l'Excellence</h2>  
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">  
        Notre restaurant vous propose une cuisine raffinée mêlant saveurs locales et internationales,  
        dans un cadre élégant offrant une vue panoramique sur la ville de Moundoun.  
      </p>  
    </div>  

    {/* Fonctionnalités */}  
    <div className="grid md:grid-cols-3 gap-8 mb-16">  
      {restaurantFeatures.map((feature, index) => {  
        const Icon = feature.icon;  
        return (  
          <div key={index} className="bg-white rounded-lg p-8 shadow-sm text-center hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">  
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">  
              <Icon className="text-2xl text-amber-600" />  
            </div>  
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>  
            <p className="text-gray-600 whitespace-pre-line">{feature.description}</p>  
          </div>  
        );  
      })}  
    </div>  

    {/* Menu */}  
    <MenuSection />  

    {/* Réservation */}  
    <div className="bg-amber-50 rounded-lg p-8 text-center mt-16">  
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Réservez votre table</h3>  
      <p className="text-gray-600 mb-6">  
        Pour une expérience culinaire optimale, nous recommandons la réservation.  
      </p>  
      <div className="flex flex-col sm:flex-row gap-4 justify-center">  
        <a href="tel:+235678901234" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer">  
          Appeler : +235 678 901 234  
        </a>  
        <a href="mailto:restaurant@hotellavotre.com" className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer">  
          Email : restaurant@hotellavotre.com  
        </a>  
      </div>  
    </div>  
  </div>  

  <Footer />  
</div>  

);
}
