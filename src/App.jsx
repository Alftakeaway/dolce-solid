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
      repeatDelay: 1.5
    });

    // FIX CRUCIALE PER CLOUDFLARE OVERLAP
    window.addEventListener('load', () => {
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
          }
        });
      }, 800); // Aumentato a 800ms per sicurezza su connessioni lente
    });
  });

  const [formSubmitted, setFormSubmitted] = createSignal(false);
  // ... resto del codice
  const [isSending, setIsSending] = createSignal(false);

  // --- HERO DATA (passed to HeroSection component) ---
  const heroImages = [
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/hero_bg.jpg",
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/margherita.jpg", 
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gelato.jpg",
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/interior%202.webp",
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/interior3.webp"
  ];
  

  // --- ARRAY DI TUTTI I PIATTI DAL MENU REALE ---

  



  return (
    <>
      

      {/* NAVBAR */}
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#home">
            <img src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/dolce_vita_logo_no_bg1.png" alt="Dolce Vita" class="navbar-logo" />
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item"><a class="nav-link" href="#home">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="#about">Our Story</a></li>
              <li class="nav-item"><a class="nav-link" href="#menu">Menu</a></li>
              <li class="nav-item"><a class="nav-link" href="#gallery">Atmosphere</a></li>
              <li class="nav-item"><a class="nav-link" href="#reviews">Reviews</a></li>
              <li class="nav-item"><a class="nav-link" href="#reservation">Book a Table</a></li>
              <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
       
      {/* HERO SECTION - EXTRACTED COMPONENT */}
      <HeroSection 
        heroImages={heroImages} 
        menuLink="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/menu.pdf"
      />

     {/* ABOUT SECTION - EXTRACTED COMPONENT */}
      <AboutSection />

      {/* MENU SECTION - EXTRACTED COMPONENT - DORMIENTE FINCHÉ NON ARRIVANO LE FOTO */}
      {false && <MenuSection menuItems={menuItems} />}

      {/* PARALLAX BAND 1 */}
      <div class="parallax-band parallax-band-1">
        <div class="parallax-overlay"></div>
      </div>

      {/* ATMOSPHERE GALLERY */}
      <section class="section-padding" id="gallery">
        <div class="container-custom">
          <h2 class="section-title" data-aos="fade-down" style={{ color: "#ffffff", "text-shadow": "1px 1px 10px rgba(0,0,0,0.5)" }}>Our Atmosphere</h2>
          <div class="gallery-grid animate-fade-up">
          <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery1.webp" loading="lazy" /><div class="gallery-overlay"><p class="gallery-text">Pasta al Pomodoro</p></div></div>
          <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery2.webp" loading="lazy" /><div class="gallery-overlay"><p class="gallery-text">Spaghetti al Basilico</p></div></div>
          <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery3.webp" loading="lazy" /><div class="gallery-overlay"><p class="gallery-text">Lasagna Casalinga</p></div></div>
          <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery4.webp" loading="lazy" /><div class="gallery-overlay"><p class="gallery-text">Antipasto Italiano</p></div></div>
          <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery5.webp" loading="lazy" /><div class="gallery-overlay"><p class="gallery-text">Pasta Fresca</p></div></div>
          <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery6.webp" loading="lazy" /><div class="gallery-overlay"><p class="gallery-text">Fresh Ingredients</p></div></div>
          <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery7.webp" loading="lazy" /><div class="gallery-overlay"><p class="gallery-text">Pizza Margherita</p></div></div>
          <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery8.webp" loading="lazy" /><div class="gallery-overlay"><p class="gallery-text">Dining Experience</p></div></div>
          <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery9.webp" loading="lazy" /><div class="gallery-overlay"><p class="gallery-text">Risotto alla Milanese</p></div></div>
</div>
        </div>
      </section>

      {/* PARALLAX BAND 2 */}

      <div style={{ position: "relative", "z-index": 1 }}>
        <CateringPackages />
      </div>

      <div class="parallax-band parallax-band-2">
        <div class="parallax-overlay"></div>
      </div>

      <SpecialDish />

      {/* REVIEWS */}
      <section class="section-padding" id="reviews">
        <div class="container-custom">
          <div class="content-card-panel" data-aos="fade-up">
            <h2 class="section-title">What Our Guests Say</h2>
            <div class="review-item">
              <div class="stars">★★★★★</div>
              <div class="review-author">James Thompson</div>
              <p class="review-text">"Absolutely authentic Italian cooking. The pasta is hand-made fresh daily and the flavours are exactly as I remember from my time in Rome. Simply outstanding."</p>
            </div>
            <div class="review-item">
              <div class="stars">★★★★★</div>
              <div class="review-author">Sarah Mitchell</div>
              <p class="review-text">"Beautiful atmosphere, exceptional service, and the risotto was absolutely divine. We'll definitely be returning for special occasions. Highly recommended!"</p>
            </div>
            <div class="review-item">
              <div class="stars">★★★★★</div>
              <div class="review-author">Emma & David Williams</div>
              <p class="review-text">"Family dinner was wonderful. The children loved their meals and the staff were incredibly accommodating. A real gem in Wooburn! We can't wait to come back."</p>
            </div>
            <div class="review-item">
            <div class="stars">★★★★★</div>
              <div class="review-author">Marco Bianchi</div>
              <p class="review-text">"As an Italian living abroad, I'm very picky about authentic cuisine. Dolce Vita exceeded all my expectations – the ingredients, the recipes, the warmth... it truly feels like home. Bravi!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* RESERVATION FORM - EXTRACTED COMPONENT */}
      <ReservationForm />

      {/* OUR GROUP VENUES */}
      <section class="section-padding" id="our-group">
        <div class="container-custom">
          <div class="content-card-panel" data-aos="fade-up">
            <h2 class="section-title">The Dolce Vita Family</h2>
            <p class="section-subtitle-custom">Discover our other premium venues in Wooburn Green</p>
            
            <div class="venues-grid">
              {/* THE CORK WINE BAR */}
              <div class="venue-card" data-aos="fade-up" data-aos-delay="100">
                <div class="venue-image-wrapper">
                  <img src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/the-cork.webp" class="venue-image" alt="The Cork Wine Bar" />
                  <span class="venue-badge">Wine & Cocktails</span>
                </div>
                <div class="venue-info">
                  <div>
                    <h3 class="venue-title">The Cork Wine Bar</h3>
                    <p class="venue-tagline">Elegant & Intimate</p>
                    <p class="venue-desc">
                      Located just steps away, The Cork is the perfect spot for a pre-dinner aperitivo or a sophisticated evening out. Explore a curated selection of fine wines, artisanal cocktails, and premium spirits in a warm, welcoming atmosphere.
                    </p>
                  </div>
                  <div>
                    <a href="https://www.instagram.com" target="_blank" class="btn-action email" style="margin-top: 0;">
                      <i class="fab fa-instagram"></i> Follow on Instagram
                    </a>
                  </div>
                </div>
              </div>

              {/* GREEN DELIGHT */}
              <div class="venue-card" data-aos="fade-up" data-aos-delay="200">
                <div class="venue-image-wrapper">
                  <img src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/green.jpg" class="venue-image" alt="Green Delight" />
                  <span class="venue-badge">Breakfast & Healthy Bar</span>
                </div>
                <div class="venue-info">
                  <div>
                    <h3 class="venue-title">Green Delight</h3>
                    <p class="venue-tagline">Fresh & Vibrant</p>
                    <p class="venue-desc">
                      Your daily destination for wellness on The Green. From rich barista coffee and freshly baked morning pastries to vibrant healthy juices, premium salads, and artisanal light bites, everything is prepared fresh daily.
                    </p>
                  </div>
                  <div>
                    <a href="https://www.instagram.com" target="_blank" class="btn-action email" style="margin-top: 0;">
                      <i class="fab fa-instagram"></i> Follow on Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - EXTRACTED COMPONENT */}
      <ContactSection />

      {/* FOOTER */}
      <footer>
        <div class="container-custom">
          <div class="social-links">
            <a href="https://www.facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/dolcevita_wooburn_green/" target="_blank"><i class="fab fa-instagram instagram-anim" style={{ display: "inline-block" }}></i></a>
          </div>
          <p>© 2026 <strong>Dolce Vita by Alfredo Forte</strong> - Authentic Italian Cuisine</p>
        </div>
      </footer>
    </>
  );
}

export default App;
