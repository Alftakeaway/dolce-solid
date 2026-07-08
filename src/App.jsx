import { createSignal, createMemo, onMount, For } from "solid-js";
import { Router, Route, Routes } from "@solidjs/router";
import AOS from "aos";
import emailjs from "@emailjs/browser";
import SpecialDish from "./components/SpecialDish";
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
import Legal from "./Legal";

function MainContent() {
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

  const heroImages = [
    "assets/hero_bg.jpg",
    "assets/margherita.jpg",
    "assets/gelato.jpg",
    "assets/interior%202.webp",
    "assets/interior3.webp",
  ];

  return (
    <>
      <Navbar />
      <HeroSection heroImages={heroImages} menuLink="/assets/menu.pdf" />
      <AboutSection />
      <MenuSection menuItems={menuItems} />
      
      <div class="parallax-band parallax-band-1">
        <div class="parallax-overlay"></div>
      </div>
      
      <GallerySection />
      
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
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" component={MainContent} />
        <Route path="/legal" component={Legal} />
      </Routes>
    </Router>
  );
}

export default App;