import { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhoWeServe from "./components/WhoWeServe";
import HowItWorks from "./components/HowItWorks";
import WhyMTS from "./components/WhyMTS";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import { ContactContext } from "./contact-context";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const openContact = useCallback(() => setModalOpen(true), []);
  const closeContact = useCallback(() => setModalOpen(false), []);

  return (
    <ContactContext.Provider value={{ openContact }}>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhoWeServe />
        <HowItWorks />
        <WhyMTS />
        <Contact />
      </main>
      <Footer />
      <ContactModal isOpen={modalOpen} onClose={closeContact} />
    </ContactContext.Provider>
  );
}
