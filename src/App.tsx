import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollProgress from "./components/ui/ScrollProgress";
import MobileCTA from "./components/ui/MobileCTA";
import Hero from "./components/sections/Hero";
import StatsBar from "./components/sections/StatsBar";
import Brands from "./components/sections/Brands";
import Services from "./components/sections/Services";
import HowItWorks from "./components/sections/HowItWorks";
import PricingCallout from "./components/sections/PricingCallout";
import Testimonials from "./components/sections/Testimonials";
import WhyUs from "./components/sections/WhyUs";
import ServiceAreas from "./components/sections/ServiceAreas";
import FAQ from "./components/sections/FAQ";
import Contact from "./components/sections/Contact";
import FinalCTA from "./components/sections/FinalCTA";
import { useNetworkConfig } from "./hooks/useNetworkConfig";

export default function App() {
  const { config } = useNetworkConfig();

  return (
    <>
      <ScrollProgress />
      <Navbar config={config} />
      <main>
        <Hero config={config} />
        <StatsBar config={config} />
        <Brands />
        <Services />
        <HowItWorks />
        <PricingCallout />
        <Testimonials config={config} />
        <WhyUs />
        <ServiceAreas config={config} />
        <FAQ />
        <Contact config={config} />
        <FinalCTA config={config} />
      </main>
      <Footer config={config} />
      <MobileCTA config={config} />
    </>
  );
}
