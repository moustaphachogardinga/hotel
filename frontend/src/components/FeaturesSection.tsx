import { 
  RiHotelLine, 
  RiRestaurantLine, 
  RiCarLine, 
  RiWifiLine, 
  RiCustomerServiceLine, 
  RiDropLine 
} from "react-icons/ri";

export default function FeaturesSection() {
  const features = [
    {
      icon: RiHotelLine,
      title: "Chambres de luxe",
      description: "Chambres spacieuses et élégamment décorées avec tout le confort moderne pour un séjour exceptionnel."
    },
    {
      icon: RiRestaurantLine,
      title: "Restaurant gastronomique",
      description: "Savourez une cuisine raffinée mêlant saveurs locales et internationales dans notre restaurant."
    },
    {
      icon: RiCarLine,
      title: "Service de navette",
      description: "Transport gratuit depuis et vers l'aéroport pour votre confort et tranquillité d'esprit."
    },
    {
      icon: RiWifiLine,
      title: "WiFi gratuit",
      description: "Connexion internet haut débit gratuite dans tout l'établissement pour rester connecté."
    },
    {
      icon: RiDropLine,
      title: "Piscine",
      description: "Détendez-vous dans notre magnifique piscine avec vue panoramique sur la ville."
    },
    {
      icon: RiCustomerServiceLine,
      title: "Service 24h/24",
      description: "Notre équipe dévouée est à votre disposition 24h/24 pour répondre à tous vos besoins."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez tous les services qui font de l'Hôtel Moundoun une destination d'exception
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                  <Icon className="text-2xl text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
