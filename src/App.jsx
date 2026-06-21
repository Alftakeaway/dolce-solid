import { createSignal, onMount } from "solid-js";
import { Router, Route, Routes } from "@solidjs/router";
import AOS from "aos";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Componenti
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MenuSection from "./components/MenuSection";
import SpecialDish from "./components/SpecialDish";
import CateringPackages from "./components/CateringPackages";
import GallerySection from "./components/GallerySection";
import ReviewsSection from "./components/ReviewsSection";
import ReservationForm from "./components/ReservationForm";
import VenuesSection from "./components/VenuesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Legal from "./Legal";

// Data & Styles
import { menuItems } from "./menuData";
import "./App.css";

// --- COMPONENTE HOME (Tutto il contenuto originale) ---
const HomeView = () => {
  return (
    <>
      <Navbar />
      <HeroSection heroImages={[
        "assets/hero_bg.jpg",
        "assets/margherita.jpg",
        "assets/gelato.jpg",
        "assets/interior%202.webp",
        "assets/interior3.webp",
      ]} menuLink="/assets/menu.pdf" />
      <AboutSection />
      <MenuSection menuItems={menuItems} />
      
      <div class="parallax-band parallax-band-1">
        <div class="parallax-overlay"></div>
      </div>

      <GallerySection />
      <CateringPackages />
      
      <div class="parallax-band parallax-band-2">
        <div class="parallax-overlay"></div>
      </div>

      <SpecialDish />
      <ReviewsSection />
      <ReservationForm />
      <VenuesSection />
      <ContactSection />
      <Footer />
    </>
  );
};

function App() {
  onMount(() => {
    AOS.init({ duration: 800, once: true });
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".instagram-anim", {
      rotation: 360,
      duration: 2,
      ease: "bounce.out",
      repeat: -1,
      repeatDelay: 1.5,
    });

    window.addEventListener("load", () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
        // Controllo esistenza footer prima di animare
        if (document.querySelector("footer")) {
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
        }
      }, 800);
    });
  });

  return (
    <Router>
      <Routes>
        <Route path="/" component={HomeView} />
        <Route path="/legal" component={Legal} />
      </Routes>
    </Router>
  );
}

export default App;