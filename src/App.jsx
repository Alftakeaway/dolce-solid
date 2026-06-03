import { createSignal, createMemo, onMount, For } from "solid-js";
import AOS from "aos";
import emailjs from "@emailjs/browser"; 
import SpecialDish from "./components/SpecialDish";
import CateringPackages from "./components/CateringPackages";
import HeroSection from "./components/HeroSection";
import ReservationForm from "./components/ReservationForm";
import MenuSection from "./components/MenuSection";
import "./App.css";


function App() {
  onMount(() => {
    AOS.init({ duration: 800, once: true });
  });

  
  const [formSubmitted, setFormSubmitted] = createSignal(false);
  const [isSending, setIsSending] = createSignal(false);

  // --- HERO DATA (passed to HeroSection component) ---
  const heroImages = [
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/hero_bg.jpg",
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/margherita.jpg", 
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/interior.jpg",
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/interior%202.webp",
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/interior3.webp"
  ];
  

  // --- ARRAY DI TUTTI I PIATTI DAL MENU REALE ---
  const menuItems = [
    // SPECIALS  
    { id: 100, title: "Tortellini Panna Prosciutto e Piselli", category: "specials", price: "£28.00", desc: "Delicate meat-filled tortellini tossed in a rich, velvety heavy cream sauce with savory diced ham and sweet spring peas, finished with aged Parmigiano Reggiano.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/tortellinip.jpg", isVegetarian: false, isVegan: false },

    // NIBBLES
    { id: 1, title: "Bread and Nduja", category: "nibbles", price: "£6.00", desc: "Traditional Italian artisan bread paired with spicy, spreadable Calabrian nduja.", img: "", isVegetarian: false, isVegan: false },
    { id: 2, title: "Mixed Olives", category: "nibbles", price: "£6.00", desc: "A selection of fine marinated Italian olives with herbs and olive oil.", img: "", isVegetarian: true, isVegan: true },
    { id: 3, title: "Bread and Olive Oil", category: "nibbles", price: "£6.00", desc: "Freshly baked bread served with premium extra virgin olive oil and balsamic vinegar.", img: "", isVegetarian: true, isVegan: true },

    // STARTERS
    { id: 4, title: "Focaccia all'aglio", category: "starters", price: "£7.00", desc: "Homemade pizza bread with garlic butter, oregano and rosemary.", img: "", isVegetarian: true, isVegan: true },
    { id: 5, title: "Bruschetta", category: "starters", price: "£8.50", desc: "Toasted bread topped with fresh chopped tomatoes, oregano, garlic, basil, balsamic glaze and extra virgin olive oil.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/bruschetta.webp", isVegetarian: true, isVegan: true },
    { id: 6, title: "Arancini", category: "starters", price: "£10.00", desc: "Crispy rice balls filled with peas, tomato sauce and mozzarella. Served with tomato sauce.", img: "", isVegetarian: true, isVegan: false },
    { id: 7, title: "Calamari", category: "starters", price: "£10.00", desc: "Deep-fried squid rings, served with tartare sauce.", img: "", isVegetarian: false, isVegan: false },
    { id: 8, title: "Bianchetti", category: "starters", price: "£11.00", desc: "Deep-fried whitebait, served with tartare sauce.", img: "", isVegetarian: false, isVegan: false },
    { id: 9, title: "Polpette dello chef", category: "starters", price: "£12.00", desc: "Homemade meatballs in a rich, spicy tomato sauce with mixed peppers. Served with toasted bread.", img: "", isVegetarian: false, isVegan: false },
    { id: 10, title: "Parma Ham & Burrata", category: "starters", price: "£14.00", desc: "Fresh burrata from Puglia served with Parma ham, cherry tomato concassé and basil.", img: "", isVegetarian: false, isVegan: false },
    { id: 11, title: "Gamberoni Dolce Vita", category: "starters", price: "£12.00", desc: "King prawns cooked in a cherry tomato, white wine, garlic and parsley sauce, topped with rocket and served with toasted bread.", img: "", isVegetarian: false, isVegan: false },
    { id: 12, title: "Funghi al Bosco", category: "starters", price: "£11.00", desc: "Baked Portobello mushrooms stuffed with gorgonzola and mozzarella, dressed with garlic, parsley, balsamic glaze and extra virgin olive oil.", img: "", isVegetarian: true, isVegan: false },
    { id: 13, title: "Antipasto Italiano", category: "starters", price: "£30.00", desc: "Selection of Parma ham, Milano salami, spicy salami, arancini, fresh mozzarella, cherry tomatoes, mixed olives, roasted peppers, Italian cheeses and artichokes. Served with toasted bread.", img: "", isVegetarian: false, isVegan: false },

    // PIZZE & CALZONI & RUSTICHE
    { id: 14, title: "Margherita", category: "pizza", price: "£12.00", desc: "Tomato, mozzarella and fresh basil.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/margherita.jpg", isVegetarian: true, isVegan: false },
    { id: 15, title: "Diavola", category: "pizza", price: "£15.00", desc: "Tomato, mozzarella, pepperoni and fresh chilli.", img: "", isVegetarian: false, isVegan: false },
    { id: 16, title: "Roma", category: "pizza", price: "£18.00", desc: "Tomato, mozzarella, spicy pepperoni, mushrooms and red onion.", img: "", isVegetarian: false, isVegan: false },
    { id: 17, title: "Napoli", category: "pizza", price: "£16.50", desc: "Tomato, mozzarella, anchovies, capers, black olives, oregano, parsley and garlic oil.", img: "", isVegetarian: false, isVegan: false },
    { id: 18, title: "Quattro Gusti", category: "pizza", price: "£18.50", desc: "Tomato, mozzarella, chicken, cotto ham and pepperoni.", img: "", isVegetarian: false, isVegan: false },
    { id: 19, title: "Capricciosa", category: "pizza", price: "£18.50", desc: "Tomato, mozzarella, artichokes, cotto ham, black olives and mushrooms.", img: "", isVegetarian: false, isVegan: false },
    { id: 20, title: "Funghi & Salsiccia", category: "pizza", price: "£18.00", desc: "Tomato, mozzarella, mushrooms and crumbled Italian pork sausage.", img: "", isVegetarian: false, isVegan: false },
    { id: 21, title: "Prosciutto & Funghi", category: "pizza", price: "£17.00", desc: "Tomato, mozzarella, cotto ham and mushrooms.", img: "", isVegetarian: false, isVegan: false },
    { id: 22, title: "Vulcano", category: "pizza", price: "£18.00", desc: "Tomato, mozzarella, pepperoni, red onions, egg, nduja.", img: "", isVegetarian: false, isVegan: false },
    { id: 23, title: "Vegetariana", category: "pizza", price: "£17.00", desc: "Tomato, mozzarella, mixed peppers, mushrooms, black olives and red onion.", img: "", isVegetarian: true, isVegan: false },
    { id: 24, title: "Primavera", category: "pizza", price: "£18.50", desc: "Tomato, mozzarella, topped with rocket, cherry tomatoes, Parma ham and Parmesan.", img: "", isVegetarian: false, isVegan: false },
    { id: 25, title: "Sant'Elia", category: "pizza", price: "£18.00", desc: "Tomato, mozzarella, salami chorizo, gorgonzola, mushrooms and red onion.", img: "", isVegetarian: false, isVegan: false },
    { id: 26, title: "Ferrandina", category: "pizza", price: "£18.50", desc: "Tomato, mozzarella, crumbled Italian pork sausage, cherry tomatoes, black olives and basil pesto.", img: "", isVegetarian: false, isVegan: false },
    { id: 27, title: "Calzone di Carne", category: "pizza", price: "£19.00", desc: "Folded pizza brushed with garlic butter, filled with tomato, mozzarella, pepperoni, crumbled Italian pork sausage and chicken. Served with a pot of tomato sauce.", img: "", isVegetarian: false, isVegan: false },
    { id: 28, title: "Calzone Piccante", category: "pizza", price: "£18.00", desc: "Folded pizza brushed with garlic butter, filled with tomato, mozzarella, chicken, chilli, nduja and mushrooms. Served with a pot of tomato sauce.", img: "", isVegetarian: false, isVegan: false },
    { id: 29, title: "Rustica Dolce Vita", category: "pizza", price: "£18.50", desc: "Long-shaped pizza served on a board with tomato, mozzarella, salami chorizo, roasted peppers, black olives and rocket.", img: "", isVegetarian: false, isVegan: false },
    { id: 30, title: "Rustica Assassina", category: "pizza", price: "£18.50", desc: "Long-shaped pizza served on a board with tomato, mozzarella, spicy chicken, fresh chilli, nduja and salame piccante.", img: "", isVegetarian: false, isVegan: false },

    // PASTA
    { id: 31, title: "Penne Arrabbiata", category: "pasta", price: "£16.00", desc: "Penne in a spicy tomato sauce with chilli, fresh basil, onion and garlic, full of authentic southern flavours.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/penne%20arrabbiata.webp", isVegetarian: true, isVegan: true },
    { id: 32, title: "Linguine Bolognese", category: "pasta", price: "£18.00", desc: "Linguine with a traditional homemade beef Bolognese sauce.", img: "", isVegetarian: false, isVegan: false },
    { id: 33, title: "Penne alla Boscaiola", category: "pasta", price: "£20.00", desc: "Penne in a rich creamy tomato sauce with crumbled Italian pork sausage, mushrooms and Calabrian nduja.", img: "", isVegetarian: false, isVegan: false },
    { id: 34, title: "Spaghetti Carbonara", category: "pasta", price: "£18.00", desc: "Spaghetti with Italian guanciale, Parmesan, black pepper and egg.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/carbonara.jpg", isVegetarian: false, isVegan: false },
    { id: 35, title: "Linguine al Granchio", category: "pasta", price: "£22.00", desc: "Linguine with crab meat, cherry tomato sauce, chilli, garlic, parsley, white wine and extra virgin olive oil.", img: "", isVegetarian: false, isVegan: false },
    { id: 36, title: "Spaghetti Gamberi & Acciughe", category: "pasta", price: "£20.00", desc: "Spaghetti with prawns and anchovies in a garlic, cherry tomato and white wine sauce.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/spaghetti%20gamberi%20e%20acciughe.webp", isVegetarian: false, isVegan: false },
    { id: 37, title: "Linguine Salmone", category: "pasta", price: "£17.50", desc: "Linguine with smoked salmon, onion, cherry tomatoes, cream, parsley and a touch of tomato sauce.", img: "", isVegetarian: false, isVegan: false },
    { id: 38, title: "Spaghetti Pescatore", category: "pasta", price: "£21.00", desc: "Spaghetti with mixed seafood, prawns, squid, mussels and octopus in a garlic, white wine and tomato sauce.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/spaghetti pescatore.webp", isVegetarian: false, isVegan: false },
    { id: 39, title: "Linguine ai Gamberi & Pesto", category: "pasta", price: "£19.00", desc: "Linguine with homemade basil pesto, tiger prawns, cherry tomatoes and a touch of cream.", img: "", isVegetarian: false, isVegan: false },
    { id: 40, title: "Penne al Forno", category: "pasta", price: "£19.00", desc: "Penne with mushrooms, crispy guanciale, spinach, garlic and parsley, baked with breadcrumbs and Parmigiano Reggiano.", img: "", isVegetarian: false, isVegan: false },

    // RISOTTI
    { id: 41, title: "Risotto Gorgonzola & Salsiccia", category: "risotto", price: "£19.00", desc: "Carnaroli rice with crumbled Italian pork sausage and spinach, creamed with gorgonzola and Parmigiano Reggiano.", img: "", isVegetarian: false, isVegan: false },
    { id: 42, title: "Risotto Asparagi & Funghi", category: "risotto", price: "£18.00", desc: "Carnaroli rice with mushrooms, asparagus, onion and parsley, creamed with Parmigiano Reggiano.", img: "", isVegetarian: true, isVegan: false },
    { id: 43, title: "Risotto Frutti di Mare", category: "risotto", price: "£21.00", desc: "Carnaroli rice with mixed seafood, prawns, squid, mussels and octopus cooked in a white wine, garlic and tomato sauce.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/Risotto%20Frutti%20Di%20Mare.webp", isVegetarian: false, isVegan: false },

    // RAVIOLI
    { id: 44, title: "Ravioli ai Porcini", category: "ravioli", price: "£23.00", desc: "Porcini mushroom-filled ravioli, sautéed in a fragrant butter and sage sauce, finished with Parmigiano Reggiano.", img: "", isVegetarian: true, isVegan: false },
    { id: 45, title: "Ravioli Astice & Granchio", category: "ravioli", price: "£26.00", desc: "Lobster filled-ravioli toasted in a rich velvety crab sauce, with cherry tomatoes, citrus hints and aromatic herbs.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/ravioli astice granchio.webp", isVegetarian: false, isVegan: false },
    { id: 46, title: "Ravioli Ricotta & Spinaci", category: "ravioli", price: "£20.00", desc: "Spinach and ricotta-filled ravioli cooked with crumbled Italian pork sausage and finished with shaved Parmigiano Reggiano.", img: "", isVegetarian: false, isVegan: false },

    // MAINS (SECONDI)
    { id: 47, title: "Pollo Sambuca", category: "mains", price: "£25.00", desc: "Chicken breast cooked in a creamy sambuca sauce with red onions. Served with Tuscan potatoes and garlic spinach.", img: "", isVegetarian: false, isVegan: false },
    { id: 48, title: "Pollo Cacciatore", category: "mains", price: "£25.00", desc: "Chicken breast cooked in a spicy tomato sauce with onions, mixed peppers, mushrooms, black olives and white wine. Served with Tuscan potatoes and garlic spinach.", img: "", isVegetarian: false, isVegan: false },
    { id: 49, title: "Vitello ai Funghi", category: "mains", price: "£30.00", desc: "Thinly sliced veal cooked with onions and wild mushrooms in a rich white wine, parsley and cream sauce. Served with Tuscan potatoes and garlic spinach.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/vitello%20ai%20funghi.webp", isVegetarian: false, isVegan: false },
    { id: 50, title: "Spigola al Limone", category: "mains", price: "£26.00", desc: "Pan-fried sea bass fillets cooked in a rich lemon butter and white wine sauce. Served with Tuscan potatoes and garlic spinach.", img: "", isVegetarian: false, isVegan: false },
    { id: 51, title: "Zuppa di Pesce", category: "mains", price: "£28.00", desc: "Seafood selection, including prawns, squid, octopus and mussels, cooked in a spicy tomato sauce with white wine, garlic and parsley. Served with toasted bread.", img: "", isVegetarian: false, isVegan: false },
    { id: 52, title: "Baccalà in Umido", category: "mains", price: "£29.00", desc: "Cod loin cooked in a Mediterranean tomato sauce with red onions, black olives, capers, garlic and parsley. Served with Tuscan potatoes and garlic spinach.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/baccala.webp", isVegetarian: false, isVegan: false },
    { id: 53, title: "Bistecca", category: "mains", price: "£34.00", desc: "28 days ribeye, freshly cut and cooked to your preference. Served with Tuscan potatoes, side salad and homemade peppercorn sauce.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/bistecca.webp", isVegetarian: false, isVegan: false },
    { id: 54, title: "Tagliata di Manzo", category: "mains", price: "£32.00", desc: "28 days aged sliced ribeye served on a bed of rocket, topped with shaved Parmigiano Reggiano and a drizzle of balsamic glaze, extra virgin olive oil and Maldon sea salt.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/tagliata.webp", isVegetarian: false, isVegan: false },

    // SALADS
    { id: 55, title: "Classic Salad", category: "salads", price: "£14.00", desc: "Baby leaf and rocket salad with avocado, mixed peppers, red onion, cucumber, cherry tomatoes and olives, dressed with balsamic vinegar and extra virgin olive oil.", img: "", isVegetarian: true, isVegan: true },

    // SIDES
    { id: 56, title: "Dolce Vita Sides", category: "sides", price: "£5.00", desc: "French fries, Tuscan potatoes, Rocket and Parmesan, Garlic spinach, Sautéed mushrooms, Mixed vegetables, Side salad, or Tomatoes & red onions. (Side bread £4.00)", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/side1.webp", isVegetarian: true, isVegan: false }
  ];

  



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

      {/* OUR STORY */}
      <section class="section-padding" id="about">
        <div class="container-custom">
          <div class="content-card-panel" data-aos="fade-up">
            <div class="about-content">
              <div class="about-text">
                <h2>Our Story</h2>
                <p><strong>Dolce Vita</strong> is more than just a restaurant; it is a true journey through traditional Italian flavours. Since 2019, we have been bringing the most genuine spirit of the peninsula to Wooburn Green.</p>
                <p>Every dish is crafted with hand-picked ingredients, recipes passed down through generations, and the distinctive passion of real Italian cooking. Our head chef brings twenty years of experience from Italy's finest kitchens.</p>
                <p><strong>Our commitment:</strong> Outstanding quality, a warm atmosphere, and impeccable service. We invite you to discover why we are the preferred choice for those who cherish authentic Italian cuisine.</p>
              </div>
              <div class="about-image">
                <img src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/capi.jpeg" alt="Dolce Vita Story Image" />
              </div>
            </div>
          </div>
        </div>
      </section>

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
          <div class="gallery-grid" data-aos="fade-up">
            <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery1.jpg" /><div class="gallery-overlay"><p class="gallery-text">Pasta al Pomodoro</p></div></div>
            <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery2.jpg" /><div class="gallery-overlay"><p class="gallery-text">Spaghetti al Basilico</p></div></div>
            <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery3.jpg" /><div class="gallery-overlay"><p class="gallery-text">Lasagna Casalinga</p></div></div>
            <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery4.jpg" /><div class="gallery-overlay"><p class="gallery-text">Antipasto Italiano</p></div></div>
            <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery5.jpg" /><div class="gallery-overlay"><p class="gallery-text">Pasta Fresca</p></div></div>
            <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery6.jpg" /><div class="gallery-overlay"><p class="gallery-text">Fresh Ingredients</p></div></div>
            <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery7.jpg" /><div class="gallery-overlay"><p class="gallery-text">Pizza Margherita</p></div></div>
            <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery8.jpg" /><div class="gallery-overlay"><p class="gallery-text">Dining Experience</p></div></div>
            <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery9.jpg" /><div class="gallery-overlay"><p class="gallery-text">Risotto alla Milanese</p></div></div>
          </div>
        </div>
      </section>

      {/* PARALLAX BAND 2 */}
      <div class="parallax-band parallax-band-2">
        <div class="parallax-overlay"></div>
      </div>

      <CateringPackages />

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

      {/* CONTACTS */}
      <section class="section-padding" id="contact">
        <div class="container-custom">
          <div class="content-card-panel" data-aos="fade-up">
            <h2 class="section-title">Contact Us</h2>
            <div class="contact-info">
              <div>
                <i class="fas fa-map-marker-alt contact-icon"></i>
                <h3>Address</h3>
                <p>53 The Green<br />Wooburn Green, HP10 0EU</p>
                <a href="https://maps.google.com/?q=Dolce+Vita+Wooburn+Green" target="_blank" class="btn-action maps">
                  <i class="fas fa-map-marked-alt"></i> Get Directions
                </a>
              </div>
              <div>
                <i class="fas fa-phone-alt contact-icon"></i>
                <h3>Phone</h3>
                <p>01628 527942<br />Tue-Sun: Lunch & Dinner</p>
                <a href="tel:01628527942" class="btn-action phone">
                  <i class="fas fa-phone"></i> Call Us
                </a>
              </div>
              <div>
                <i class="fas fa-envelope contact-icon"></i>
                <h3>Email</h3>
                <p>info@dolcevitawooburn.co.uk</p>
                <a href="mailto:info@dolcevitawooburn.co.uk?subject=Inquiry%20from%20Website" class="btn-action email">
                  <i class="fas fa-paper-plane"></i> Write Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div class="container-custom">
          <div class="social-links">
            <a href="https://www.facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/dolcevita_wooburn_green/" target="_blank"><i class="fab fa-instagram"></i></a>
          </div>
          <p>© 2026 <strong>Dolce Vita by Alfredo Forte</strong> - Authentic Italian Cuisine</p>
        </div>
      </footer>
    </>
  );
}

export default App;
