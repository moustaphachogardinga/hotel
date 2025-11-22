import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import RoomsPreview from "../components/RoomsPreview";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <RoomsPreview />
      <Footer />
    </div>
  );
}
