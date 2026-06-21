import { onMount } from "solid-js";
import { Router, Route, Routes } from "@solidjs/router";
import AOS from "aos";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

import { menuItems } from "./menuData";
import "./App.css";

const Home = () => {
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
  return (
    <Router>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/legal" component={Legal} />
      </Routes>
    </Router>
  );
}

export default App;