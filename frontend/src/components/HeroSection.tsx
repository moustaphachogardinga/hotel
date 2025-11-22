import { Link } from "react-router-dom";
import bgImage from "../assets/hotel1.png";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-[slowzoom_15s_ease-in-out_infinite]"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6 animate-fadeIn">
        
        {/* TITRE animé */}
        <h1
          className="
            text-5xl md:text-7xl font-extrabold leading-tight transition-all duration-300
            hover:text-amber-400 hover:scale-105 hover:-translate-y-1
            hover:drop-shadow-[0_0_20px_rgba(255,200,50,0.5)]
          "
        >
          Bienvenue à l'Hôtel <span className="text-amber-400">La Votre</span>
        </h1>

        {/* SOUS-TITRE animé */}
        <p
          className="
            text-xl md:text-2xl mt-6 mb-10 opacity-90 font-light transition-all duration-300
            hover:scale-105 hover:-translate-y-1 hover:opacity-100
          "
        >
          Élégance, confort et hospitalité authentique au cœur de Moundoun.
          Vivez une expérience exceptionnelle dans un cadre moderne et chaleureux.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/reservation"
            className="
              bg-amber-500 hover:bg-amber-600 text-black font-semibold px-10 py-4 rounded-full text-lg shadow-xl 
              transition transform hover:scale-110
            "
          >
            Réserver maintenant
          </Link>

          <Link
            to="/chambres"
            className="
              border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 rounded-full text-lg font-semibold 
              transition transform hover:scale-110
            "
          >
            Découvrir nos chambres
          </Link>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-out forwards;
        }

        @keyframes slowzoom {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}
