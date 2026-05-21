import { createSignal, createMemo, onMount, For } from "solid-js";
import AOS from "aos";
import emailjs from "@emailjs/browser"; 
import SpecialDish from "./components/SpecialDish";

function App() {
  onMount(() => {
    AOS.init({ duration: 800, once: true });
  });

  const [selectedCategory, setSelectedCategory] = createSignal("all");
  const [formSubmitted, setFormSubmitted] = createSignal(false);
  const [isSending, setIsSending] = createSignal(false);

  // --- HERO CAROUSEL ---
  const heroImages = [
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/hero_bg.jpg",
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/margherita.jpg", 
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/interior.jpg"    
  ];
  const [currentHeroIndex, setCurrentHeroIndex] = createSignal(0);
  onMount(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  });

  // --- LOGICA PRENOTAZIONI ---
  const [bookingDate, setBookingDate] = createSignal("");
  const [bookingTime, setBookingTime] = createSignal("");

  const handleDateChange = (e) => {
    const dateVal = e.target.value;
    if (!dateVal) return;
    
    const day = new Date(dateVal).getDay();
    if (day === 1) { 
      alert("Dolce Vita is closed on Mondays. Please select another day.");
      setBookingDate("");
      return;
    }
    setBookingDate(dateVal);
  };

  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // --- ARRAY DI TUTTI I PIATTI DAL MENU REALE ---
  // Nota: ho rimosso lo special hardcoded (id:99) e mantenuto solo il menu statico
  const menuItems = [

    // SPECIALS  

    { id: 100, title: "Tortellini Panna Prosciutto e Piselli", category: "specials", price: "£28.00", desc: "Delicate meat-filled tortellini tossed in a rich, velvety heavy cream sauce with savory diced ham and sweet spring peas, finished with aged Parmigiano Reggiano.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/tortellinip.jpg", isVegetarian: false, isVegan: false },

    // NIBBLES
    { id: 1, title: "Bread and Nduja", category: "nibbles", price: "£6.00", desc: "Traditional Italian artisan bread paired with spicy, spreadable Calabrian nduja.", img: "", isVegetarian: false, isVegan: false },
    { id: 2, title: "Mixed Olives", category: "nibbles", price: "£6.00", desc: "A selection of fine marinated Italian olives with herbs and olive oil.", img: "", isVegetarian: true, isVegan: true },
    { id: 3, title: "Bread and Olive Oil", category: "nibbles", price: "£6.00", desc: "Freshly baked bread served with premium extra virgin olive oil and balsamic vinegar.", img: "", isVegetarian: true, isVegan: true },

    // STARTERS
    { id: 4, title: "Focaccia all'aglio", category: "starters", price: "£7.00", desc: "Homemade pizza bread with garlic butter, oregano and rosemary.", img: "", isVegetarian: true, isVegan: true },
    { id: 5, title: "Bruschetta", category: "starters", price: "£8.50", desc: "Toasted bread topped with fresh chopped tomatoes, oregano, garlic, basil, balsamic glaze and extra virgin olive oil.", img: "", isVegetarian: true, isVegan: true },
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
    { id: 31, title: "Penne Arrabbiata", category: "pasta", price: "£16.00", desc: "Penne in a spicy tomato sauce with chilli, basil, onion and garlic.", img: "", isVegetarian: true, isVegan: true },
    { id: 32, title: "Linguine Bolognese", category: "pasta", price: "£18.00", desc: "Linguine with a traditional homemade beef Bolognese sauce.", img: "", isVegetarian: false, isVegan: false },
    { id: 33, title: "Penne alla Boscaiola", category: "pasta", price: "£20.00", desc: "Penne in a rich creamy tomato sauce with crumbled Italian pork sausage, mushrooms and Calabrian nduja.", img: "", isVegetarian: false, isVegan: false },
    { id: 34, title: "Spaghetti Carbonara", category: "pasta", price: "£18.00", desc: "Spaghetti with Italian guanciale, Parmesan, black pepper and egg.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/carbonara.jpg", isVegetarian: false, isVegan: false },
    { id: 35, title: "Linguine al Granchio", category: "pasta", price: "£22.00", desc: "Linguine with crab meat, cherry tomato sauce, chilli, garlic, parsley, white wine and extra virgin olive oil.", img: "", isVegetarian: false, isVegan: false },
    { id: 36, title: "Spaghetti Gamberi & Acciughe", category: "pasta", price: "£20.00", desc: "Spaghetti with prawns and anchovies in a garlic, cherry tomato and white wine sauce.", img: "", isVegetarian: false, isVegan: false },
    { id: 37, title: "Linguine Salmone", category: "pasta", price: "£17.50", desc: "Linguine with smoked salmon, onion, cherry tomatoes, cream, parsley and a touch of tomato sauce.", img: "", isVegetarian: false, isVegan: false },
    { id: 38, title: "Spaghetti Pescatore", category: "pasta", price: "£21.00", desc: "Spaghetti with mixed seafood, prawns, squid, mussels and octopus in a garlic, white wine and tomato sauce.", img: "", isVegetarian: false, isVegan: false },
    { id: 39, title: "Linguine ai Gamberi & Pesto", category: "pasta", price: "£19.00", desc: "Linguine with homemade basil pesto, tiger prawns, cherry tomatoes and a touch of cream.", img: "", isVegetarian: false, isVegan: false },
    { id: 40, title: "Penne al Forno", category: "pasta", price: "£19.00", desc: "Penne with mushrooms, crispy guanciale, spinach, garlic and parsley, baked with breadcrumbs and Parmigiano Reggiano.", img: "", isVegetarian: false, isVegan: false },

    // RISOTTI
    { id: 41, title: "Risotto Gorgonzola & Salsiccia", category: "risotto", price: "£19.00", desc: "Carnaroli rice with crumbled Italian pork sausage and spinach, creamed with gorgonzola and Parmigiano Reggiano.", img: "", isVegetarian: false, isVegan: false },
    { id: 42, title: "Risotto Asparagi & Funghi", category: "risotto", price: "£18.00", desc: "Carnaroli rice with mushrooms, asparagus, onion and parsley, creamed with Parmigiano Reggiano.", img: "", isVegetarian: true, isVegan: false },
    { id: 43, title: "Risotto Frutti di Mare", category: "risotto", price: "£21.00", desc: "Carnaroli rice with mixed seafood, prawns, squid, mussels and octopus cooked in a white wine, garlic and tomato sauce.", img: "", isVegetarian: false, isVegan: false },

    // RAVIOLI
    { id: 44, title: "Ravioli ai Porcini", category: "ravioli", price: "£23.00", desc: "Porcini mushroom-filled ravioli, sautéed in a fragrant butter and sage sauce, finished with Parmigiano Reggiano.", img: "", isVegetarian: true, isVegan: false },
    { id: 45, title: "Ravioli Astice & Granchio", category: "ravioli", price: "£26.00", desc: "Lobster filled-ravioli toasted in a rich velvety crab sauce, with cherry tomatoes, citrus hints and aromatic herbs.", img: "", isVegetarian: false, isVegan: false },
    { id: 46, title: "Ravioli Ricotta & Spinaci", category: "ravioli", price: "£20.00", desc: "Spinach and ricotta-filled ravioli cooked with crumbled Italian pork sausage and finished with shaved Parmigiano Reggiano.", img: "", isVegetarian: false, isVegan: false },

    // MAINS (SECONDI)
    { id: 47, title: "Pollo Sambuca", category: "mains", price: "£25.00", desc: "Chicken breast cooked in a creamy sambuca sauce with red onions. Served with Tuscan potatoes and garlic spinach.", img: "", isVegetarian: false, isVegan: false },
    { id: 48, title: "Pollo Cacciatore", category: "mains", price: "£25.00", desc: "Chicken breast cooked in a spicy tomato sauce with onions, mixed peppers, mushrooms, black olives and white wine. Served with Tuscan potatoes and garlic spinach.", img: "", isVegetarian: false, isVegan: false },
    { id: 49, title: "Vitello ai Funghi", category: "mains", price: "£30.00", desc: "Thinly sliced veal cooked with onions and wild mushrooms in a rich white wine, parsley and cream sauce. Served with Tuscan potatoes and garlic spinach.", img: "", isVegetarian: false, isVegan: false },
    { id: 50, title: "Spigola al Limone", category: "mains", price: "£26.00", desc: "Pan-fried sea bass fillets cooked in a rich lemon butter and white wine sauce. Served with Tuscan potatoes and garlic spinach.", img: "", isVegetarian: false, isVegan: false },
    { id: 51, title: "Zuppa di Pesce", category: "mains", price: "£28.00", desc: "Seafood selection, including prawns, squid, octopus and mussels, cooked in a spicy tomato sauce with white wine, garlic and parsley. Served with toasted bread.", img: "", isVegetarian: false, isVegan: false },
    { id: 52, title: "Baccalà in Umido", category: "mains", price: "£29.00", desc: "Cod loin cooked in a Mediterranean tomato sauce with red onions, black olives, capers, garlic and parsley. Served with Tuscan potatoes and garlic spinach.", img: "", isVegetarian: false, isVegan: false },
    { id: 53, title: "Bistecca", category: "mains", price: "£34.00", desc: "28 days ribeye, freshly cut and cooked to your preference. Served with Tuscan potatoes, side salad and homemade peppercorn sauce.", img: "", isVegetarian: false, isVegan: false },
    { id: 54, title: "Tagliata di Manzo", category: "mains", price: "£32.00", desc: "28 days aged sliced ribeye served on a bed of rocket, topped with shaved Parmigiano Reggiano and a drizzle of balsamic glaze, extra virgin olive oil and Maldon sea salt.", img: "", isVegetarian: false, isVegan: false },

    // SALADS
    { id: 55, title: "Classic Salad", category: "salads", price: "£14.00", desc: "Baby leaf and rocket salad with avocado, mixed peppers, red onion, cucumber, cherry tomatoes and olives, dressed with balsamic vinegar and extra virgin olive oil.", img: "", isVegetarian: true, isVegan: true },

    // SIDES
    { id: 56, title: "Dolce Vita Sides", category: "sides", price: "£5.00", desc: "French fries, Tuscan potatoes, Rocket and Parmesan, Garlic spinach, Sautéed mushrooms, Mixed vegetables, Side salad, or Tomatoes & red onions. (Side bread £4.00)", img: "", isVegetarian: true, isVegan: false }
  ];

  const filteredMenu = createMemo(() => {
    if (selectedCategory() === "all") return menuItems;
    if (selectedCategory() === "vegetarian") return menuItems.filter(item => item.isVegetarian);
    if (selectedCategory() === "vegan") return menuItems.filter(item => item.isVegan);
    return menuItems.filter(item => item.category === selectedCategory());
  });

  // Conta piatti special - bottone scompare se 0
  const specials = createMemo(() => {
    return menuItems.filter(item => item.category === "specials");
  });

  const getCategoryIcon = (category) => {
    switch(category) {
      case "nibbles": return "fas fa-cookie-bite";
      case "starters": return "fas fa-utensils";
      case "pizza": return "fas fa-pizza-slice";
      case "pasta": return "fas fa-utensils";
      case "risotto": case "ravioli": return "fas fa-utensils";
      case "mains": return "fas fa-drumstick-bite";
      case "salads": return "fas fa-seedling";
      case "sides": return "fas fa-bread-slice";
      case "specials": return "fas fa-star";
      default: return "fas fa-utensils";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const restaurantMail = await emailjs.sendForm("service_4mzmr8s", "template_5sf632c", e.target, "zRfkntw9T_O_C4S43");
      const customerMail = await emailjs.sendForm("service_4mzmr8s", "template_lec527l", e.target, "zRfkntw9T_O_C4S43");

      if (restaurantMail.text === "OK" && customerMail.text === "OK") {
        setFormSubmitted(true);
        setBookingDate("");
        setBookingTime("");
        e.target.reset();
      } else {
        alert("Ops! Something went wrong. Please try again or call us directly.");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Connection error. Please try again or call us directly.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <style>{`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  :root {
      --primary: #8B0000;
      --secondary: #C9A961;
      --dark: #2a2a2a;
      --border-radius: 4px;
      --border-color: #e0d9ce;
      --transition: all 0.3s ease;
  }
  body { 
      font-family: 'Lato', sans-serif; 
      background: linear-gradient(135deg, #4a3b32 0%, #8c7a6b 50%, #cfc3b3 100%) !important;
      background-attachment: fixed !important;
      color: #333; 
      overflow-x: hidden; 
      line-height: 1.6;
      display: block !important;
      text-align: left !important;
      width: 100% !important;
      min-width: 100% !important;
      font-size: 16px !important;
  }
  
  /* ===== NAVBAR - FONT HANDWRITING E MENU GRANDE ===== */
  /* ===== NAVBAR CORRETTA: Logo Handwriting + Menu Serif Elegante ===== */
.navbar {
      background: rgba(42, 42, 42, 0.98) !important;
      backdrop-filter: blur(15px);
      border-bottom: 2px solid var(--secondary);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

 /* ===== NAVBAR CON ORO SATINATO ELEGANTE ===== */

/* LOGO "Dolce Vita" - Rimane invariato (Handwriting Parisienne) */
.navbar-brand { 
    font-family: 'Parisienne', cursive !important; 
    font-size: 3.2rem !important; 
    font-weight: 400 !important; 
    color: #ffffff !important; 
    letter-spacing: 2px !important;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
    transition: var(--transition);
}
.navbar-brand span { 
    color: #C9A961; 
    font-style: normal;
}

/* CONNETTORI (Home, Menu, etc.) - ORO ANTICO/BRONZO ELEGANTE */
.nav-link { 
    font-family: 'Bodoni Moda', serif !important; /* Font elegante */
    font-size: 1.4rem !important; 
    font-weight: 600 !important; 
    margin: 0 20px !important; 
    padding: 10px 15px !important;
    transition: all 0.3s ease !important;
    position: relative;
    letter-spacing: 1.5px;
    text-transform: none;
    
    /* COLORE ESATTO DELL'IMMAGINE: Oro Antico/Bronzo */
    color: #C5A059 !important; 
    
    /* OMBRA MORBIDA PER DARE PROFONDITÀ (come nell'immagine) */
    text-shadow: 
        0px 1px 2px rgba(0, 0, 0, 0.8),   /* Ombra nera vicina */
        0px 0px 5px rgba(197, 160, 89, 0.3); /* Leggero alone ambrato */
}

.nav-link:hover { 
    transform: translateY(-2px);
    /* All'hover diventa leggermente più chiaro (Oro Chiaro) */
    color: #E6C885 !important; 
    text-shadow: 
        0px 2px 4px rgba(0, 0, 0, 0.9),
        0px 0px 8px rgba(230, 200, 133, 0.5);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: #C5A059; /* Stesso colore del testo */
    transition: all 0.3s ease;
    transform: translateX(-50%);
}
.nav-link:hover::after {
    width: 70%;
}
/* ========================================== */
  
  .hero {
      min-height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: #000000;
  }
  .hero-bg-image {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-size: cover;
      background-position: center;
      opacity: 0;
      transition: opacity 1.5s ease-in-out;
      z-index: 1;
  }
  .hero-bg-image.active {
      opacity: 0.3;
      animation: subtle-zoom 20s ease-in-out infinite;
  }
  @keyframes subtle-zoom { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  
  .hero-content { position: relative; z-index: 10; text-align: center; color: white; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 8vw, 5.5rem); font-weight: 700; letter-spacing: 2px; text-shadow: 2px 2px 15px rgba(0,0,0,0.6); }
  .hero-subtitle { font-size: 1.2rem; color: var(--secondary); margin-bottom: 2.5rem; font-style: italic; text-shadow: 1px 1px 5px rgba(0,0,0,0.6); }
  .btn-primary-custom { display: inline-block; text-decoration: none; background: var(--primary); color: white; padding: 14px 38px; border-radius: var(--border-radius); font-weight: 600; cursor: pointer; transition: var(--transition); border: none; }
  .btn-secondary-custom { display: inline-block; text-decoration: none; background: transparent; color: white; padding: 14px 38px; border: 2px solid white; border-radius: var(--border-radius); font-weight: 600; cursor: pointer; margin-left: 1rem; transition: var(--transition); }
  .btn-primary-custom:hover:not(:disabled) { background: #6b0000; transform: translateY(-2px); color: white; box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
  .btn-primary-custom:disabled { background: #cccccc; cursor: not-allowed; }
  .btn-secondary-custom:hover { border-color: var(--secondary); color: var(--secondary); background: rgba(255,255,255,0.05); }
  .section-padding { padding: 100px 0; }
  .container-custom { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
  .content-card-panel {
      background: rgba(255, 255, 255, 0.95);
      padding: 3.5rem;
      border-radius: var(--border-radius);
      box-shadow: 0 15px 40px rgba(0,0,0,0.15);
      border: 1px solid rgba(255,255,255,0.2);
  }
  .section-title { font-family: 'Playfair Display', serif; font-size: 2.8rem; text-align: center; color: var(--primary); font-weight: 700; margin-bottom: 0.5rem; letter-spacing: 0.5px; }
  .section-title::after { content: ''; display: block; width: 60px; height: 2px; background: var(--secondary); margin: 1rem auto 0; }
  .section-subtitle-custom { text-align: center; font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--primary); font-style: italic; margin-bottom: 3rem; font-weight: 600; }
  
  .btn-filter {
      background: #ffffff; color: var(--dark); border: 1px solid var(--border-color); padding: 8px 22px; font-size: 0.95rem; font-weight: 600; border-radius: 30px; transition: var(--transition); cursor: pointer;
  }
  .btn-filter:hover, .btn-filter.active { background: var(--primary); color: #ffffff; border-color: var(--primary); box-shadow: 0 4px 12px rgba(139, 0, 0, 0.2); }
  
  .btn-filter.dietary-filter { border-color: #2e7d32; color: #2e7d32; }
  .btn-filter.dietary-filter:hover, .btn-filter.dietary-filter.active { background: #2e7d32; color: #ffffff; border-color: #2e7d32; box-shadow: 0 4px 12px rgba(46, 125, 50, 0.2); }

  .btn-filter.specials { 
    background: #FFD700; 
    color: #333; 
    border: 2px solid #FF8C00;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(255, 140, 0, 0.25);
  }
  .btn-filter.specials:hover, .btn-filter.specials.active { 
    background: #FFC700; 
    border-color: #FF6B00;
    color: #333;
    box-shadow: 0 4px 15px rgba(255, 140, 0, 0.4);
  }

  .about-content { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .about-text h2 { font-family: 'Playfair Display', serif; font-size: 2.5rem; color: var(--primary); margin-bottom: 1.5rem; font-weight: 700; }
  .about-text p { font-size: 1.05rem; line-height: 1.9; margin-bottom: 1.3rem; font-weight: 400; color: #444; }
  .about-image { height: 420px; border-radius: var(--border-radius); overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
  .about-image img { width: 100%; height: 100%; object-fit: cover; }
  
  .menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 3rem; }
  .menu-card { background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--border-radius); overflow: hidden; transition: var(--transition); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); display: flex; flex-direction: column; position: relative; }
  .menu-card:hover { transform: translateY(-5px); border-color: var(--secondary); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12); }
  
  .menu-card-icon-placeholder { 
      width: 100%; 
      height: 220px; 
      background: #f7f4ee; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      color: var(--secondary);
      font-size: 3.5rem;
      border-bottom: 1px solid var(--border-color);
  }
  .menu-card-image { width: 100%; height: 220px; object-fit: cover; display: block; border-bottom: 1px solid var(--border-color); }
  
  .menu-card-content { padding: 1.5rem; text-align: center; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between; }
  .menu-card-top { margin-bottom: 0.8rem; }
  .menu-card-title { font-family: 'Playfair Display', serif; font-size: 1.35rem; color: var(--primary); font-weight: 700; margin-bottom: 0.5rem; }
  .menu-card-price { color: var(--secondary); font-family: 'Lato', sans-serif; font-size: 1.1rem; font-weight: 700; }
  .menu-card-description { color: #666666; font-family: 'Lato', sans-serif; font-size: 0.95rem; line-height: 1.6; text-align: center; margin: 0 auto; max-width: 95%; }
  
  .special-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: linear-gradient(135deg, #FFD700 0%, #FFC700 100%);
    border: 2px solid #FF8C00;
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    color: #333;
    display: flex;
    align-items: center;
    gap: 5px;
    z-index: 15;
    box-shadow: 0 2px 8px rgba(255, 140, 0, 0.3);
  }
  
  .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .gallery-item { position: relative; width: 100%; aspect-ratio: 1; overflow: hidden; border-radius: var(--border-radius); cursor: pointer; }
  .gallery-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
  .gallery-item:hover .gallery-image { transform: scale(1.08); }
  .gallery-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0, 0, 0, 0.7)); padding: 2rem 1.5rem; opacity: 0; transition: opacity 0.3s ease; }
  .gallery-item:hover .gallery-overlay { opacity: 1; }
  .gallery-text { color: white; font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; }
  
  .review-item { margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #eee; }
  .review-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
  .stars { color: #FFB81C; font-size: 1.1rem; margin-bottom: 0.4rem; }
  .review-author { font-weight: 700; color: var(--primary); margin-bottom: 0.4rem; font-size: 1.1rem; }
  .review-text { color: #555; font-size: 1rem; line-height: 1.7; font-style: italic; }

  .reservation-box { max-width: 800px; margin: 0 auto; padding: 3.5rem 2.5rem; border: 1px solid rgba(201, 169, 97, 0.2); border-radius: var(--border-radius); box-shadow: 0 15px 40px rgba(0,0,0,0.1); background: #ffffff; text-align: center; }
  .reservation-box h3 { font-family: 'Playfair Display', serif; font-size: 2.4rem; color: var(--primary); margin-bottom: 0.8rem; font-weight: 700; }
  .reservation-box p { font-size: 1.05rem; margin-bottom: 2.5rem; color: #555; line-height: 1.7; }
  
  .booking-form { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; text-align: left; }
  .form-group-full { grid-column: span 2; }
  .booking-form label { display: block; font-weight: 600; color: var(--dark); margin-bottom: 0.5rem; font-size: 0.95rem; }
  .booking-form input, .booking-form select, .booking-form textarea { width: 100%; padding: 12px 15px; border: 1px solid var(--border-color); border-radius: var(--border-radius); font-family: 'Lato', sans-serif; font-size: 1rem; transition: var(--transition); background-color: #faf8f5; color: #333; }
  .booking-form input:focus, .booking-form select:focus, .booking-form textarea:focus { outline: none; border-color: var(--primary); background-color: #ffffff; box-shadow: 0 0 0 3px rgba(139, 0, 0, 0.1); }
  .success-message { padding: 3rem 1rem; text-align: center; }
  .success-icon { font-size: 4rem; color: #34A853; margin-bottom: 1.5rem; }
  
  .contact-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2.5rem; text-align: center; align-items: start; }
  .contact-icon { font-size: 2.5rem; color: var(--primary); margin-bottom: 1rem; }
  .contact-info h3 { font-family: 'Playfair Display', serif; font-weight: 700; color: var(--primary); margin-bottom: 0.8rem; }
  .contact-info p { color: #444; font-weight: 400; }
  
  .btn-action {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: var(--primary); color: white; border: 2px solid var(--primary); padding: 9px 18px; font-size: 0.9rem; font-weight: 600; border-radius: 6px; text-decoration: none; margin-top: 15px; transition: all 0.3s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }
  .btn-action:hover { background: var(--dark); color: #ffffff; border-color: var(--dark); transform: translateY(-2px); }
  .btn-action.maps i { color: #4285F4; }
  .btn-action.phone i { color: #34A853; }
  .btn-action.email i { color: #EA4335; }
  .btn-action:hover i { color: #ffffff !important; }

  footer { background: var(--dark); color: white; padding: 3rem 0; text-align: center; border-top: 3px solid var(--secondary); }
  .social-links { display: flex; justify-content: center; gap: 1.8rem; margin-bottom: 2rem; }
  .social-links a { color: var(--secondary); font-size: 1.4rem; transition: var(--transition); }
  .social-links a:hover { color: white; transform: translateY(-3px); }
  
  @media (max-width: 768px) { 
      .about-content { grid-template-columns: 1fr; gap: 30px; } 
      .content-card-panel { padding: 2rem 1.5rem; }
      .hero-buttons { display: flex; flex-direction: column; gap: 10px; } 
      .btn-secondary-custom { margin-left: 0; } 
      .hero-title { font-size: 3rem; } 
      .gallery-grid { grid-template-columns: repeat(2, 1fr); }
      .booking-form { grid-template-columns: 1fr; }
      .form-group-full { grid-column: span 1; }
      .navbar-brand { font-size: 2.2rem !important; }
      .nav-link { font-size: 1.1rem !important; margin: 0 10px !important; }
  }
`}</style>

      {/* NAVBAR */}
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#home">Dolce <span>Vita</span></a>
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
      <section class="hero" id="home">
        <For each={heroImages}>{(img, index) => (
          <div 
            class={`hero-bg-image ${index() === currentHeroIndex() ? 'active' : ''}`}
            style={{ "background-image": `url('${img}')`, "z-index": index() === currentHeroIndex() ? 2 : 1 }}
          />
        )}</For>

        <div class="hero-content" data-aos="fade-up" style={{ "z-index": 10 }}>
          <h1 class="hero-title">DOLCE VITA</h1>
          <p class="hero-subtitle">Authentic Italian dining in the heart of Wooburn Green</p>
          <div class="hero-buttons">
            <a href="#reservation" class="btn-primary-custom">Book Now</a>
            <a href="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/menu.pdf" target="_blank" class="btn-secondary-custom">Full Menu</a>
          </div>
        </div>
      </section>

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

      {/* MENU HIGHLIGHTS */}
      <section class="section-padding" id="menu">
        <div class="container-custom">
          <h2 class="section-title" data-aos="fade-down">The Food Menu</h2>
          <p class="section-subtitle-custom" data-aos="fade-down">Explore our extensive and authentic Italian selections</p>
          
          <div class="filter-container d-flex justify-content-center flex-wrap gap-2 mb-5" data-aos="fade-down">
            <button class={`btn-filter ${selectedCategory() === 'all' ? 'active' : ''}`} onClick={() => setSelectedCategory('all')}>All Menu</button>
            
            {specials().length > 0 && (
              <button class={`btn-filter specials ${selectedCategory() === 'specials' ? 'active' : ''}`} onClick={() => setSelectedCategory('specials')}>
                <i class="fas fa-star" style="margin-right: 6px;"></i> Specials
              </button>
            )}
            
            <button class={`btn-filter ${selectedCategory() === 'nibbles' ? 'active' : ''}`} onClick={() => setSelectedCategory('nibbles')}>Nibbles</button>
            <button class={`btn-filter ${selectedCategory() === 'starters' ? 'active' : ''}`} onClick={() => setSelectedCategory('starters')}>Starters</button>
            <button class={`btn-filter ${selectedCategory() === 'pizza' ? 'active' : ''}`} onClick={() => setSelectedCategory('pizza')}>Pizze & Calzoni</button>
            <button class={`btn-filter ${selectedCategory() === 'pasta' ? 'active' : ''}`} onClick={() => setSelectedCategory('pasta')}>Pasta</button>
            <button class={`btn-filter ${selectedCategory() === 'risotto' ? 'active' : ''}`} onClick={() => setSelectedCategory('risotto')}>Risotti</button>
            <button class={`btn-filter ${selectedCategory() === 'ravioli' ? 'active' : ''}`} onClick={() => setSelectedCategory('ravioli')}>Ravioli</button>
            <button class={`btn-filter ${selectedCategory() === 'mains' ? 'active' : ''}`} onClick={() => setSelectedCategory('mains')}>Mains</button>
            <button class={`btn-filter ${selectedCategory() === 'salads' ? 'active' : ''}`} onClick={() => setSelectedCategory('salads')}>Salads</button>
            <button class={`btn-filter ${selectedCategory() === 'sides' ? 'active' : ''}`} onClick={() => setSelectedCategory('sides')}>Sides</button>
            
            <button class={`btn-filter dietary-filter ${selectedCategory() === 'vegetarian' ? 'active' : ''}`} onClick={() => setSelectedCategory('vegetarian')}><i class="fas fa-leaf me-1"></i> Vegetarian</button>
            <button class={`btn-filter dietary-filter ${selectedCategory() === 'vegan' ? 'active' : ''}`} onClick={() => setSelectedCategory('vegan')}><i class="fas fa-seedling me-1"></i> Vegan</button>
          </div>

          <div class="menu-grid">
            <For each={filteredMenu()}>{(item) => (
              <div class="menu-card" data-aos="fade-up">
                {item.category === 'specials' && (
                  <div class="special-badge">
                    <i class="fas fa-star"></i> Specials
                  </div>
                )}
                {item.img !== "" ? (
                  <img src={item.img} class="menu-card-image" alt={item.title} />
                ) : (
                  <div class="menu-card-icon-placeholder">
                    <i class={getCategoryIcon(item.category)}></i>
                  </div>
                )}
                <div class="menu-card-content">
                  <div class="menu-card-top">
                    <h3 class="menu-card-title">{item.title}</h3>
                    <div class="menu-card-price">{item.price}</div>
                  </div>
                  <p class="menu-card-description">{item.desc}</p>
                </div>
              </div>
            )}</For>
          </div>
        </div>
      </section>

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

      {/* RESERVATION SYSTEM */}
      <section class="section-padding" id="reservation">
        <div class="container-custom">
          <div class="reservation-box" data-aos="zoom-in">
            {!formSubmitted() ? (
              <>
                <h3>Book a Table</h3>
                <p>Please select your preferred date and time slot. Please note we are closed on Mondays.</p>
                
                <form onSubmit={handleSubmit} class="booking-form">
                  <div>
                    <label for="name">Full Name *</label>
                    <input type="text" id="name" name="name" required placeholder="e.g. John Doe" />
                  </div>
                  <div>
                    <label for="phone">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" required placeholder="e.g. 07123 456789" />
                  </div>
                  <div>
                    <label for="guests">Number of Guests *</label>
                    <select id="guests" name="guests" required>
                      <option value="1">1 Person</option>
                      <option value="2" selected>2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                      <option value="5">5 People</option>
                      <option value="6">6 People</option>
                      <option value="7">7 People</option>
                      <option value="8+">8+ People (Large Party)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label for="date">Date *</label>
                    <input 
                      type="date" 
                      id="date" 
                      name="date" 
                      required 
                      min={getTodayDateString()} 
                      value={bookingDate()} 
                      onChange={handleDateChange} 
                    />
                  </div>

                  <div class="form-group-full">
                    <label for="time">Preferred Time Slot *</label>
                    <select 
                      id="time" 
                      name="time" 
                      required 
                      value={bookingTime()} 
                      onChange={(e) => setBookingTime(e.target.value)}
                    >
                      <option value="" disabled selected>-- Select an available slot --</option>
                      
                      <optgroup label="Lunch Service">
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                        <option value="14:30">14:30</option>
                      </optgroup>

                      <optgroup label="Dinner Service">
                        <option value="19:00">19:00</option>
                        <option value="19:30">19:30</option>
                        <option value="20:00">20:00</option>
                        <option value="20:30">20:30</option>
                        <option value="21:00">21:00</option>
                        <option value="21:30">21:30</option>
                        <option value="22:00">22:00</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" name="email" required placeholder="name@example.com" />
                  </div>
                  
                  <div class="form-group-full">
                    <label for="notes">Special Requests / Allergies</label>
                    <textarea id="notes" name="notes" rows="3" placeholder="Let us know if you have any food allergies or seating preferences..."></textarea>
                  </div>

                  <div class="form-group-full text-center mt-3">
                    <button type="submit" disabled={isSending()} class="btn-primary-custom" style="width: 100%; padding: 16px 0; font-size: 1.1rem;">
                      {isSending() ? "Sending Request..." : "Submit Reservation Request"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div class="success-message" data-aos="fade-up">
                <i class="fas fa-check-circle success-icon"></i>
                <h3>Thank You!</h3>
                <p style="font-size: 1.2rem; color: #333; margin-bottom: 1rem;">Your booking request has been sent successfully.</p>
                <button class="btn-secondary-custom" onClick={() => setFormSubmitted(false)} style={{ color: "var(--primary)", "border-color": "var(--primary)", "margin-left": "0" }}>
                  Book Another Table
                </button>
              </div>
            )}
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
            <a href="https://www.instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
          </div>
          <p>© 2026 <strong>Dolce Vita by Alfredo Forte</strong> - Authentic Italian Cuisine</p>
        </div>
      </footer>
    </>
  );
}

export default App;