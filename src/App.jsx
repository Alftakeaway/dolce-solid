import { createSignal, createMemo, onMount, For } from "solid-js";
import { Router, Route, Routes } from "@solidjs/router"; // Importa il router
import AOS from "aos";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Componenti
import SpecialDish from "./components/SpecialDish";
import CateringPackages from "./components/CateringPackages";
import HeroSection from "./components/HeroSection";
import ReservationForm from "./components/ReservationForm";
import MenuSection from "./components/MenuSection";
import ContactSection from "./components/ContactSection";
import AboutSection from "./components/AboutSection";
import VenuesSection from "./components/VenuesSection";
import Navbar from "./components/Navbar";
import GallerySection from "./components/GallerySection";
import ReviewsSection from "./components/ReviewsSection";
import Footer from "./components/Footer";
import Legal from "./Legal"; // Importa la tua nuova pagina legale

// Data & Styles
import { menuItems } from "./menuData";
import "./App.css";

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

    // FIX CRUCIALE PER VERCEL OVERLAP
    window.addEventListener("load", () => {
      setTimeout(() => {
        ScrollTrigger.refresh();

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
      }, 800);
    });
  });

  // Logica Form
  const [formSubmitted, setFormSubmitted] = createSignal(false);
  const [isSending, setIsSending] = createSignal(false);

  const heroImages = [
    "assets/hero_bg.jpg",
    "assets/margherita.jpg",
    "assets/gelato.jpg",
    "assets/interior%202.webp",
    "assets/interior3.webp",
  ];

  // Componente per raggruppare la Home
  const HomeView = () => (
    <>
      <Navbar />
      <HeroSection heroImages={heroImages} menuLink="/assets/menu.pdf" />
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