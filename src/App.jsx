import { createSignal, createMemo, onMount, For } from "solid-js";
import AOS from "aos";
import emailjs from "@emailjs/browser";
import SpecialDish from "./components/SpecialDish";
import CateringPackages from "./components/CateringPackages";
import HeroSection from "./components/HeroSection";
import ReservationForm from "./components/ReservationForm";
import MenuSection from "./components/MenuSection";
import ContactSection from "./components/ContactSection";
import { menuItems } from "./menuData";
import AboutSection from "./components/AboutSection";
import "./App.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VenuesSection from "./components/VenuesSection";
import Navbar from "./components/Navbar";
import GallerySection from "./components/GallerySection";
import ReviewsSection from "./components/ReviewsSection";
import Footer from "./components/Footer";

function App() {
  onMount(() => {
    AOS.init({ duration: 800, once: true });
    gsap.registerPlugin(ScrollTrigger);

    // Rotazione Instagram
    gsap.to(".instagram-anim", {
      rotation: 360,
      duration: 2,
      ease: "bounce.out",
      repeat: -1,
      repeatDelay: 1.5,
    });

    // FIX CRUCIALE PER CLOUDFLARE OVERLAP
    window.addEventListener("load", () => {
      setTimeout(() => {
        // Ricalcola TUTTE le altezze reali dopo che le immagini sono arrivate
        ScrollTrigger.refresh();

        // Animazione Footer (mantenuta dal tuo codice originale)
        gsap.from("footer", {
          y: 60,
          scaleY: 0.8,
          opacity: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: "footer",
            start: "top 95%",
          },
        });
      }, 800); // Aumentato a 800ms per sicurezza su connessioni lente
    });
  });

  const [formSubmitted, setFormSubmitted] = createSignal(false);
  // ... resto del codice
  const [isSending, setIsSending] = createSignal(false);

  // --- HERO DATA (passed to HeroSection component) ---
  const heroImages = [
    "assets/hero_bg.jpg",
    "assets/margherita.jpg",
    "assets/gelato.jpg",
    "assets/interior%202.webp",
    "assets/interior3.webp",
  ];

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}

      {/* HERO SECTION - EXTRACTED COMPONENT */}
      <HeroSection heroImages={heroImages} menuLink="/assets/menu.pdf" />

      {/* ABOUT SECTION - EXTRACTED COMPONENT */}
      <AboutSection />

      {/* MENU SECTION - EXTRACTED COMPONENT - DORMIENTE FINCHÉ NON ARRIVANO LE FOTO */}
      <MenuSection menuItems={menuItems} />

      {/* PARALLAX BAND 1 */}
      <div class="parallax-band parallax-band-1">
        <div class="parallax-overlay"></div>
      </div>

      {/* ATMOSPHERE GALLERY */}
      <GallerySection />

      {/* PARALLAX BAND 2 */}
      <div class="parallax-band parallax-band-2">
        <div class="parallax-overlay"></div>
      </div>

      <CateringPackages />

      <SpecialDish />

      {/* REVIEWS */}
      <ReviewsSection />

      {/* RESERVATION FORM - EXTRACTED COMPONENT */}
      <ReservationForm />

      {/* OUR GROUP VENUES */}
      <VenuesSection />

      {/* CONTACT SECTION - EXTRACTED COMPONENT */}
      <ContactSection />

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default App;
