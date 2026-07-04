import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";
import FeatureCards from "../components/FeatureCards.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import CtaSection from "../components/CtaSection.jsx";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeatureCards />
        <HowItWorks />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
