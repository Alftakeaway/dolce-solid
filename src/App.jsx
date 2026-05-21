import { createSignal, createMemo, onMount, For } from "solid-js";
import AOS from "aos";
import emailjs from "@emailjs/browser"; 
import SpecialDish from "./components/SpecialDish";

function App() {
  onMount(() => {
    AOS.init({ duration: 800, once: true });
  });

  const [selectedCategory, setSelectedCategory] = createSignal("all"); // Di default mostra tutto il menu
  const [formSubmitted, setFormSubmitted] = createSignal(false);
  const [isSending, setIsSending] = createSignal(false);

  // --- STATO ADMIN ---
  const [isAdminOpen, setIsAdminOpen] = createSignal(false);
  const [adminPassword, setAdminPassword] = createSignal("");
  const [isLoggedIn, setIsLoggedIn] = createSignal(false);

  // --- STATI PER IL NUOVO PIATTO SPECIALE (FORM ADMIN) ---
  const [newSpecialTitle, setNewSpecialTitle] = createSignal("");
  const [newSpecialCategory, setNewSpecialCategory] = createSignal("pasta");
  const [newSpecialPrice, setNewSpecialPrice] = createSignal("");
  const [newSpecialDesc, setNewSpecialDesc] = createSignal("");

  // --- ARRAY DEI PIATTI SPECIALI AGGIUNTI DALL'ADMIN ---
  const [dynamicSpecials, setDynamicSpecials] = createSignal([
    { 
      id: "special-1", 
      title: "Tortellini panna prosciutto e piselli", 
      category: "pasta", 
      price: "£16.50", 
      desc: "Tortellini served in a rich cream sauce with cotto ham, peas, Parmigiano Reggiano and a touch of butter.", 
      img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/tortellinip.jpg", // Foto caricata nella cartella assets
      isSpecialMenu: true 
    }
  ]);

  // --- MENU STATICO REALE ---
  const baseMenuItems = [
    // NIBBLES
    { id: 1, title: "Bread and Nduja", category: "nibbles", price: "£6.00", desc: "Traditional Italian artisan bread paired with spicy, spreadable Calabrian nduja.", img: "", isSpecialMenu: false },
    { id: 2, title: "Mixed Olives", category: "nibbles", price: "£6.00", desc: "A selection of fine marinated Italian olives with herbs and olive oil.", img: "", isSpecialMenu: false },
    { id: 3, title: "Bread and Olive Oil", category: "nibbles", price: "£6.00", desc: "Freshly baked bread served with premium extra virgin olive oil and balsamic vinegar.", img: "", isSpecialMenu: false },

    // STARTERS
    { id: 4, title: "Focaccia all'aglio", category: "starters", price: "£7.00", desc: "Homemade pizza bread with garlic butter, oregano and rosemary.", img: "", isSpecialMenu: false },
    { id: 5, title: "Bruschetta", category: "starters", price: "£8.50", desc: "Toasted bread topped with fresh chopped tomatoes, oregano, garlic, basil, balsamic glaze and extra virgin olive oil.", img: "", isSpecialMenu: false },
    { id: 6, title: "Arancini", category: "starters", price: "£10.00", desc: "Crispy rice balls filled with peas, tomato sauce and mozzarella. Served with tomato sauce.", img: "", isSpecialMenu: false },
    { id: 7, title: "Calamari", category: "starters", price: "£10.00", desc: "Deep-fried squid rings, served with tartare sauce.", img: "", isSpecialMenu: false },
    { id: 8, title: "Bianchetti", category: "starters", price: "£11.00", desc: "Deep-fried whitebait, served with tartare sauce.", img: "", isSpecialMenu: false },
    { id: 9, title: "Polpette dello chef", category: "starters", price: "£12.00", desc: "Homemade meatballs in a rich, spicy tomato sauce with mixed peppers. Served with toasted bread.", img: "", isSpecialMenu: false },
    { id: 10, title: "Parma Ham & Burrata", category: "starters", price: "£14.00", desc: "Fresh burrata from Puglia served with Parma ham, cherry tomato concassé and basil.", img: "", isSpecialMenu: false },
    { id: 11, title: "Gamberoni Dolce Vita", category: "starters", price: "£12.00", desc: "King prawns cooked in a cherry tomato, white wine, garlic and parsley sauce, topped with rocket and served with toasted bread.", img: "", isSpecialMenu: false },
    { id: 12, title: "Funghi al Bosco", category: "starters", price: "£11.00", desc: "Baked Portobello mushrooms stuffed with gorgonzola and mozzarella, dressed with garlic, parsley, balsamic glaze and extra virgin olive oil.", img: "", isSpecialMenu: false },
    { id: 13, title: "Antipasto Italiano", category: "starters", price: "£30.00", desc: "Selection of Parma ham, Milano salami, spicy salami, arancini, fresh mozzarella, cherry tomatoes, mixed olives, roasted peppers, Italian cheeses and artichokes. Served with toasted bread.", img: "", isSpecialMenu: false },

    // PIZZE & CALZONI
    { id: 14, title: "Margherita", category: "pizza", price: "£12.00", desc: "Tomato, mozzarella and fresh basil.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/margherita.jpg", isSpecialMenu: false },
    { id: 15, title: "Diavola", category: "pizza", price: "£15.00", desc: "Tomato, mozzarella, pepperoni and fresh chilli.", img: "", isSpecialMenu: false },
    { id: 16, title: "Roma", category: "pizza", price: "£18.00", desc: "Tomato, mozzarella, spicy pepperoni, mushrooms and red onion.", img: "", isSpecialMenu: false },
    { id: 17, title: "Napoli", category: "pizza", price: "£16.50", desc: "Tomato, mozzarella, anchovies, capers, black olives, oregano, parsley and garlic oil.", img: "", isSpecialMenu: false },
    { id: 18, title: "Quattro Gusti", category: "pizza", price: "£18.50", desc: "Tomato, mozzarella, chicken, cotto ham and pepperoni.", img: "", isSpecialMenu: false },
    { id: 19, title: "Capricciosa", category: "pizza", price: "£18.50", desc: "Tomato, mozzarella, artichokes, cotto ham, black olives and mushrooms.", img: "", isSpecialMenu: false },
    { id: 20, title: "Funghi & Salsiccia", category: "pizza", price: "£18.00", desc: "Tomato, mozzarella, mushrooms and crumbled Italian pork sausage.", img: "", isSpecialMenu: false },
    { id: 21, title: "Prosciutto & Funghi", category: "pizza", price: "£17.00", desc: "Tomato, mozzarella, cotto ham and mushrooms.", img: "", isSpecialMenu: false },
    { id: 22, title: "Vulcano", category: "pizza", price: "£18.00", desc: "Tomato, mozzarella, pepperoni, red onions, egg, nduja.", img: "", isSpecialMenu: false },
    { id: 23, title: "Vegetariana", category: "pizza", price: "£17.00", desc: "Tomato, mozzarella, mixed peppers, mushrooms, black olives and red onion.", img: "", isSpecialMenu: false },
    { id: 24, title: "Primavera", category: "pizza", price: "£18.50", desc: "Tomato, mozzarella, topped with rocket, cherry tomatoes, Parma ham and Parmesan.", img: "", isSpecialMenu: false },
    { id: 25, title: "Sant'Elia", category: "pizza", price: "£18.00", desc: "Tomato, mozzarella, salami chorizo, gorgonzola, mushrooms and red onion.", img: "", isSpecialMenu: false },
    { id: 26, title: "Ferrandina", category: "pizza", price: "£18.50", desc: "Tomato, mozzarella, crumbled Italian pork sausage, cherry tomatoes, black olives and basil pesto.", img: "", isSpecialMenu: false },
    { id: 27, title: "Calzone di Carne", category: "pizza", price: "£19.00", desc: "Folded pizza brushed with garlic butter, filled with tomato, mozzarella, pepperoni, crumbled Italian pork sausage and chicken. Served with a pot of tomato sauce.", img: "", isSpecialMenu: false },
    { id: 28, title: "Calzone Piccante", category: "pizza", price: "£18.00", desc: "Folded pizza brushed with garlic butter, filled with tomato, mozzarella, chicken, chilli, nduja and mushrooms. Served with a pot of tomato sauce.", img: "", isSpecialMenu: false },
    { id: 29, title: "Rustica Dolce Vita", category: "pizza", price: "£18.50", desc: "Long-shaped pizza served on a board with tomato, mozzarella, salami chorizo, roasted peppers, black olives and rocket.", img: "", isSpecialMenu: false },
    { id: 30, title: "Rustica Assassina", category: "pizza", price: "£18.50", desc: "Long-shaped pizza served on a board with tomato, mozzarella, spicy chicken, fresh chilli, nduja and salame piccante.", img: "", isSpecialMenu: false },

    // PASTA
    { id: 31, title: "Penne Arrabbiata", category: "pasta", price: "£16.00", desc: "Penne in a spicy tomato sauce with chilli, basil, onion and garlic.", img: "", isSpecialMenu: false },
    { id: 32, title: "Linguine Bolognese", category: "pasta", price: "£18.00", desc: "Linguine with a traditional homemade beef Bolognese sauce.", img: "", isSpecialMenu: false },
    { id: 33, title: "Penne alla Boscaiola", category: "pasta", price: "£20.00", desc: "Penne in a rich creamy tomato sauce with crumbled Italian pork sausage, mushrooms and Calabrian nduja.", img: "", isSpecialMenu: false },
    { id: 34, title: "Spaghetti Carbonara", category: "pasta", price: "£18.00", desc: "Spaghetti with Italian guanciale, Parmesan, black pepper and egg.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/carbonara.jpg", isSpecialMenu: false },
    { id: 35, title: "Linguine al Granchio", category: "pasta", price: "£22.00", desc: "Linguine with crab meat, cherry tomato sauce, chilli, garlic, parsley, white wine and extra virgin olive oil.", img: "", isSpecialMenu: false },
    { id: 36, title: "Spaghetti Gamberi & Acciughe", category: "pasta", price: "£20.00", desc: "Spaghetti with prawns and anchovies in a garlic, cherry tomato and white wine sauce.", img: "", isSpecialMenu: false },
    { id: 37, title: "Linguine Salmone", category: "pasta", price: "£17.50", desc: "Linguine with smoked salmon, onion, cherry tomatoes, cream, parsley and a touch of tomato sauce.", img: "", isSpecialMenu: false },
    { id: 38, title: "Spaghetti Pescatore", category: "pasta", price: "£21.00", desc: "Spaghetti with mixed seafood, prawns, squid, mussels and octopus in a garlic, white wine and tomato sauce.", img: "", isSpecialMenu: false },
    { id: 39, title: "Linguine ai Gamberi & Pesto", category: "pasta", price: "£19.00", desc: "Linguine with homemade basil pesto, tiger prawns, cherry tomatoes and a touch of cream.", img: "", isSpecialMenu: false },
    { id: 40, title: "Penne al Forno", category: "pasta", price: "£19.00", desc: "Penne with mushrooms, crispy guanciale, spinach, garlic and parsley, baked with breadcrumbs and Parmigiano Reggiano.", img: "", isSpecialMenu: false },

    // RISOTTI
    { id: 41, title: "Risotto Gorgonzola & Salsiccia", category: "risotto", price: "£19.00", desc: "Carnaroli rice with crumbled Italian pork sausage and spinach, creamed with gorgonzola and Parmigiano Reggiano.", img: "", isSpecialMenu: false },
    { id: 42, title: "Risotto Asparagi & Funghi", category: "risotto", price: "£18.00", desc: "Carnaroli rice with mushrooms, asparagus, onion and parsley, creamed with Parmigiano Reggiano.", img: "", isSpecialMenu: false },
    { id: 43, title: "Risotto Frutti di Mare", category: "risotto", price: "£21.00", desc: "Carnaroli rice with mixed seafood, prawns, squid, mussels and octopus cooked in a white wine, garlic and tomato sauce.", img: "", isSpecialMenu: false },

    // RAVIOLI
    { id: 44, title: "Ravioli ai Porcini", category: "ravioli", price: "£23.00", desc: "Porcini mushroom-filled ravioli, sautéed in a fragrant butter and sage sauce, finished with Parmigiano Reggiano.", img: "", isSpecialMenu: false },
    { id: 45, title: "Ravioli Astice & Granchio", category: "ravioli", price: "£26.00", desc: "Lobster filled-ravioli toasted in a rich velvety crab sauce, with cherry tomatoes, citrus hints and aromatic herbs.", img: "", isSpecialMenu: false },
    { id: 46, title: "Ravioli Ricotta & Spinaci", category: "ravioli", price: "£20.00", desc: "Spinach and ricotta-filled ravioli cooked with crumbled Italian pork sausage and finished with shaved Parmigiano Reggiano.", img: "", isSpecialMenu: false },

    // MAINS
    { id: 47, title: "Pollo Sambuca", category: "mains", price: "£25.00", desc: "Chicken breast cooked in a creamy sambuca sauce with red onions. Served with Tuscan potatoes and garlic spinach.", img: "", isSpecialMenu: false },
    { id: 48, title: "Pollo Cacciatore", category: "mains", price: "£25.00", desc: "Chicken breast cooked in a spicy tomato sauce with onions, mixed peppers, mushrooms, black olives and white wine. Served with Tuscan potatoes and garlic spinach.", img: "", isSpecialMenu: false },
    { id: 49, title: "Vitello ai Funghi", category: "mains", price: "£30.00", desc: "Thinly sliced veal cooked with onions and wild mushrooms in a rich white wine, parsley and cream sauce. Served with Tuscan potatoes and garlic spinach.", img: "", isSpecialMenu: false },
    { id: 50, title: "Spigola al Limone", category: "mains", price: "£26.00", desc: "Pan-fried sea bass fillets cooked in a rich lemon butter and white wine sauce. Served with Tuscan potatoes and garlic spinach.", img: "", isSpecialMenu: false },
    { id: 51, title: "Zuppa di Pesce", category: "mains", price: "£28.00", desc: "Seafood selection, including prawns, squid, octopus and mussels, cooked in a spicy tomato sauce with white wine, garlic and parsley. Served with toasted bread.", img: "", isSpecialMenu: false },
    { id: 52, title: "Baccalà in Umido", category: "mains", price: "£29.00", desc: "Cod loin cooked in a Mediterranean tomato sauce with red onions, black olives, capers, garlic and parsley. Served with Tuscan potatoes and garlic spinach.", img: "", isSpecialMenu: false },
    { id: 53, title: "Bistecca", category: "mains", price: "£34.00", desc: "28 days ribeye, freshly cut and cooked to your preference. Served with Tuscan potatoes, side salad and homemade peppercorn sauce.", img: "", isSpecialMenu: false },
    { id: 54, title: "Tagliata di Manzo", category: "mains", price: "£32.00", desc: "28 days aged sliced ribeye served on a bed of rocket, topped with shaved Parmigiano Reggiano and a drizzle of balsamic glaze, extra virgin olive oil and Maldon sea salt.", img: "", isSpecialMenu: false },

    // SALADS
    { id: 55, title: "Classic Salad", category: "salads", price: "£14.00", desc: "Baby leaf and rocket salad with avocado, mixed peppers, red onion, cucumber, cherry tomatoes and olives, dressed with balsamic vinegar and extra virgin olive oil.", img: "", isSpecialMenu: false },

    // SIDES
    { id: 56, title: "Rocket and Parmesan", category: "sides", price: "£5.00", desc: "Fresh rocket salad topped with shavings of Parmigiano Reggiano.", img: "", isSpecialMenu: false },
    { id: 57, title: "Dolce Vita Sides", category: "sides", price: "£5.00", desc: "French fries, Tuscan potatoes, Garlic spinach, Sautéed mushrooms, Mixed vegetables, Side salad, or Tomatoes & red onions.", img: "", isSpecialMenu: false }
  ];

  // --- UNIONE DEI PIATTI BASE CON QUELLI SPECIALI CREATI DINAMICAMENTE ---
  const allMenuItems = createMemo(() => {
    return [...baseMenuItems, ...dynamicSpecials()];
  });

  // --- FILTRO CATEGORIE COMPRESA LA CATEGORIA "SPECIAL" ---
  const filteredMenu = createMemo(() => {
    if (selectedCategory() === "all") return allMenuItems();
    if (selectedCategory() === "special") return allMenuItems().filter(item => item.isSpecialMenu);
    return allMenuItems().filter(item => item.category === selectedCategory());
  });

  // --- LOGICA DI AGGIUNTA DI UN NUOVO PIATTO DA PARTE DELL'ADMIN ---
  const handleAddSpecialItem = (e) => {
    e.preventDefault();
    if (!newSpecialTitle() || !newSpecialPrice()) return;

    const formattedPrice = newSpecialPrice().startsWith("£") ? newSpecialPrice() : `£${newSpecialPrice()}`;
    
    const newItem = {
      id: `special-${Date.now()}`,
      title: newSpecialTitle(),
      category: newSpecialCategory(),
      price: formattedPrice,
      desc: newSpecialDesc(),
      img: "", // Placeholder standard
      isSpecialMenu: true 
    };

    setDynamicSpecials(prev => [newItem, ...prev]);
    
    setNewSpecialTitle("");
    setNewSpecialPrice("");
    setNewSpecialDesc("");
    alert("Special dish successfully added to the menu!");
  };

  const handleRemoveSpecialItem = (id) => {
    setDynamicSpecials(prev => prev.filter(item => item.id !== id));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminPassword() === "DolceVita2026") { 
      setIsLoggedIn(true);
    } else {
      alert("Incorrect Password!");
    }
  };

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
      default: return "fas fa-utensils";
    }
  };

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
    }, 3000);
    return () => clearInterval(timer);
  });

  const [bookingDate, setBookingDate] = createSignal("");
  const [bookingTime, setBookingTime] = createSignal("");

  const handleDateChange = (e) => {
    const dateVal = e.target.value;
    if (!dateVal) return;
    if (new Date(dateVal).getDay() === 1) { 
      alert("Dolce Vita is closed on Mondays. Please select another day.");
      setBookingDate("");
      return;
    }
    setBookingDate(dateVal);
  };

  const getTodayDateString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
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
        alert("Ops! Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Connection error. Please try again.");
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
            width: 100% !important;
            font-size: 16px !important;
        }
        .navbar {
            background: rgba(42, 42, 42, 0.95) !important;
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--secondary);
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        .navbar-brand { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 700; color: #ffffff !important; letter-spacing: 1px; }
        .navbar-brand span { color: var(--secondary); }
        .nav-link { color: #ffffff !important; font-weight: 500; margin: 0 12px; }
        .nav-link:hover { color: var(--secondary) !important; }
        
        .hero { min-height: 100vh; position: relative; display: flex; align-items: center; justify-content: center; background: #000000; }
        .hero-bg-image { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-size: cover; background-position: center; opacity: 0; transition: opacity 1.5s ease-in-out; }
        .hero-bg-image.active { opacity: 0.3; }
        .hero-content { position: relative; z-index: 10; text-align: center; color: white; }
        .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 8vw, 5.5rem); font-weight: 700; letter-spacing: 2px; }
        .hero-subtitle { font-size: 1.2rem; color: var(--secondary); margin-bottom: 2.5rem; font-style: italic; }
        
        .btn-primary-custom { display: inline-block; background: var(--primary); color: white; padding: 14px 38px; border-radius: var(--border-radius); font-weight: 600; cursor: pointer; transition: var(--transition); border: none; text-decoration: none; }
        .btn-secondary-custom { display: inline-block; background: transparent; color: white; padding: 14px 38px; border: 2px solid white; border-radius: var(--border-radius); font-weight: 600; cursor: pointer; margin-left: 1rem; text-decoration: none; }
        .btn-primary-custom:hover { background: #6b0000; transform: translateY(-2px); color: white; }
        
        .section-padding { padding: 100px 0; }
        .container-custom { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .content-card-panel { background: rgba(255, 255, 255, 0.95); padding: 3.5rem; border-radius: var(--border-radius); box-shadow: 0 15px 40px rgba(0,0,0,0.15); }
        .section-title { font-family: 'Playfair Display', serif; font-size: 2.8rem; text-align: center; color: var(--primary); font-weight: 700; margin-bottom: 0.5rem; }
        .section-title::after { content: ''; display: block; width: 60px; height: 2px; background: var(--secondary); margin: 1rem auto 0; }
        .section-subtitle-custom { text-align: center; font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--primary); font-style: italic; margin-bottom: 3rem; }
        
        .btn-filter { background: #ffffff; color: var(--dark); border: 1px solid var(--border-color); padding: 8px 22px; font-size: 0.95rem; font-weight: 600; border-radius: 30px; transition: var(--transition); cursor: pointer; }
        .btn-filter:hover, .btn-filter.active { background: var(--primary); color: #ffffff; border-color: var(--primary); }
        
        /* PULSANTE "SPECIALS" CON BORDO COMET */
        .btn-comet {
            position: relative;
            background: #111111;
            color: #ffffff;
            border: none;
            padding: 8px 24px;
            font-size: 0.95rem;
            font-weight: 700;
            border-radius: 30px;
            cursor: pointer;
            overflow: hidden;
            z-index: 1;
            box-shadow: 0 0 10px rgba(201, 169, 97, 0.3);
            transition: var(--transition);
        }
        .btn-comet::before {
            content: '';
            position: absolute;
            top: -50%; left: -50%; width: 200%; height: 200%;
            background: conic-gradient(transparent, var(--secondary), transparent 30%);
            animation: comet-rotate 2.5s linear infinite;
            z-index: -2;
        }
        .btn-comet::after {
            content: '';
            position: absolute;
            top: 2px; left: 2px; right: 2px; bottom: 2px;
            background: #111111;
            border-radius: 30px;
            z-index: -1;
            transition: var(--transition);
        }
        .btn-comet:hover::after, .btn-comet.active::after { background: var(--primary); }
        .btn-comet:hover, .btn-comet.active { color: white; box-shadow: 0 0 15px rgba(139, 0, 0, 0.6); }
        @keyframes comet-rotate { 100% { transform: rotate(360deg); } }

        .menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 3rem; }
        .menu-card { background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--border-radius); overflow: hidden; transition: var(--transition); display: flex; flex-direction: column; position: relative; }
        .menu-card:hover { transform: translateY(-5px); border-color: var(--secondary); box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); }
        
        /* BORDO E DETTAGLIO PER I PIATTI SPECIALI NELLE ALTRE CATEGORIE */
        .menu-card.special-highlight {
            border: 2px solid #b30000;
            box-shadow: 0 0 18px rgba(179, 0, 0, 0.25);
            background: #fffbfb;
        }
        .special-tag-badge {
            position: absolute;
            top: 12px;
            right: 12px;
            background: linear-gradient(135deg, #b30000 0%, #8b0000 100%);
            color: #ffffff;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            padding: 5px 12px;
            border-radius: 4px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.15);
            z-index: 10;
            letter-spacing: 0.8px;
            border: 1px solid rgba(255,255,255,0.2);
        }

        .menu-card-icon-placeholder { width: 100%; height: 220px; background: #f7f4ee; display: flex; align-items: center; justify-content: center; color: var(--secondary); font-size: 3.5rem; border-bottom: 1px solid var(--border-color); }
        .menu-card-image { width: 100%; height: 220px; object-fit: cover; display: block; border-bottom: 1px solid var(--border-color); }
        .menu-card-content { padding: 1.5rem; text-align: center; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between; }
        .menu-card-title { font-family: 'Playfair Display', serif; font-size: 1.35rem; color: var(--primary); font-weight: 700; margin-bottom: 0.5rem; }
        .menu-card-price { color: var(--secondary); font-size: 1.1rem; font-weight: 700; }
        .menu-card-description { color: #666666; font-size: 0.95rem; line-height: 1.6; }
        
        /* ADMIN PANELS */
        .admin-toggle-btn { position: fixed; bottom: 20px; right: 20px; background: var(--dark); color: white; border: 1px solid var(--secondary); padding: 10px 15px; border-radius: 30px; font-weight: 600; z-index: 2000; cursor: pointer; font-size: 0.85rem; }
        .admin-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.85); z-index: 2100; display: flex; align-items: center; justify-content: center; padding: 20px; overflow-y: auto; backdrop-filter: blur(5px); }
        .admin-modal { background: #ffffff; border-radius: var(--border-radius); max-width: 650px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 2.5rem; border-top: 4px solid var(--primary); }
        .current-specials-list { background: #f9f9f9; border: 1px solid var(--border-color); border-radius: 4px; max-height: 180px; overflow-y: auto; padding: 10px; }
        
        .about-content { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .about-text h2 { font-family: 'Playfair Display', serif; font-size: 2.5rem; color: var(--primary); margin-bottom: 1.5rem; font-weight: 700; }
        .about-text p { font-size: 1.05rem; line-height: 1.9; color: #444; }
        .about-image { height: 420px; border-radius: var(--border-radius); overflow: hidden; }
        .about-image img { width: 100%; height: 100%; object-fit: cover; }
        
        .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .gallery-item { position: relative; width: 100%; aspect-ratio: 1; overflow: hidden; border-radius: var(--border-radius); }
        .gallery-image { width: 100%; height: 100%; object-fit: cover; }
        .reservation-box { max-width: 800px; margin: 0 auto; padding: 3.5rem 2.5rem; border: 1px solid rgba(201, 169, 97, 0.2); background: #ffffff; text-align: center; }
        .booking-form { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; text-align: left; }
        .form-group-full { grid-column: span 2; }
        .booking-form input, .booking-form select, .booking-form textarea { width: 100%; padding: 12px 15px; border: 1px solid var(--border-color); border-radius: var(--border-radius); background-color: #faf8f5; }
        .contact-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2.5rem; text-align: center; }
        .contact-icon { font-size: 2.5rem; color: var(--primary); }
        
        footer { background: var(--dark); color: white; padding: 3rem 0; text-align: center; border-top: 3px solid var(--secondary); }
        @media (max-width: 768px) { .about-content { grid-template-columns: 1fr; } .gallery-grid { grid-template-columns: repeat(2, 1fr); } .booking-form { grid-template-columns: 1fr; .form-group-full { grid-column: span 1; } }
      `}</style>

      {/* BOTTONE ACCESSO ADMIN */}
      <button class="admin-toggle-btn" onClick={() => setIsAdminOpen(true)}>
        <i class="fas fa-lock me-1"></i> Admin Login
      </button>

      {/* MODALE AMMINISTRATORE */}
      {isAdminOpen() && (
        <div class="admin-overlay">
          <div class="admin-modal">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h4 class="m-0 font-serif" style={{ color: "var(--primary)", "font-weight": "700" }}>Dolce Vita Control Panel</h4>
              <button class="btn-close" onClick={() => setIsAdminOpen(false)}></button>
            </div>

            {!isLoggedIn() ? (
              <form onSubmit={handleLogin}>
                <div class="mb-3">
                  <label class="form-label font-weight-bold">Enter Administrator Password</label>
                  <input type="password" class="form-control" placeholder="••••••••" value={adminPassword()} onInput={(e) => setAdminPassword(e.target.value)} required />
                </div>
                <button type="submit" class="btn-primary-custom w-100 py-2">Login</button>
              </form>
            ) : (
              <div>
                {/* BANNER INIZIALE CON TORTELLINI */}
                <div class="p-3 mb-4 rounded" style={{ background: "#fcf8f2", border: "1px solid var(--border-color)" }}>
                  <h5 class="font-serif mb-2" style={{ color: "var(--primary)", "font-weight": "700" }}><i class="fas fa-tv me-2"></i>1. Today's Special Banner</h5>
                  <div class="mb-2">
                    <label class="form-label small font-weight-bold mb-1">Banner Title</label>
                    <input type="text" class="form-control form-control-sm" value="Tortellini panna prosciutto e piselli" />
                  </div>
                  <div>
                    <label class="form-label small font-weight-bold mb-1">Banner Description</label>
                    <textarea class="form-control form-control-sm" rows="2">Tortellini served in a rich cream sauce with cotto ham, peas, Parmigiano Reggiano and a touch of butter.</textarea>
                  </div>
                </div>

                {/* MODULO CREAZIONE NUOVI PIATTI SPECIALI */}
                <div class="p-3 rounded" style={{ background: "#f4f6f8", border: "1px solid #dcdfe6" }}>
                  <h5 class="font-serif mb-2" style={{ color: "var(--primary)", "font-weight": "700" }}><i class="fas fa-plus-circle me-2"></i>2. Create New Special Menu Items</h5>
                  <p class="text-muted small mb-3">Add completely new dishes that aren't on the standard menu. They will appear under <strong>Specials</strong> and highlighted inside their native categories.</p>
                  
                  <form onSubmit={handleAddSpecialItem} class="row g-2 mb-4">
                    <div class="col-md-7">
                      <label class="small font-weight-bold mb-1">Dish Name *</label>
                      <input type="text" class="form-control form-control-sm" placeholder="e.g. Tortellini panna prosciutto e piselli" value={newSpecialTitle()} onInput={(e) => setNewSpecialTitle(e.target.value)} required />
                    </div>
                    <div class="col-md-5">
                      <label class="small font-weight-bold mb-1">Price *</label>
                      <input type="text" class="form-control form-control-sm" placeholder="e.g. 16.50" value={newSpecialPrice()} onInput={(e) => setNewSpecialPrice(e.target.value)} required />
                    </div>
                    <div class="col-md-12">
                      <label class="small font-weight-bold mb-1">Menu Category Appurtenance *</label>
                      <select class="form-select form-select-sm" value={newSpecialCategory()} onChange={(e) => setNewSpecialCategory(e.target.value)}>
                        <option value="nibbles">Nibbles</option>
                        <option value="starters">Starters</option>
                        <option value="pizza">Pizze & Calzoni</option>
                        <option value="pasta">Pasta</option>
                        <option value="risotto">Risotti</option>
                        <option value="ravioli">Ravioli</option>
                        <option value="mains">Mains</option>
                        <option value="salads">Salads</option>
                        <option value="sides">Sides</option>
                      </select>
                    </div>
                    <div class="col-12">
                      <label class="small font-weight-bold mb-1">English Description *</label>
                      <textarea class="form-control form-control-sm" rows="2" placeholder="Describe the ingredients and preparation clearly..." value={newSpecialDesc()} onInput={(e) => setNewSpecialDesc(e.target.value)} required></textarea>
                    </div>
                    <div class="col-12 mt-2">
                      <button type="submit" class="btn btn-sm btn-success w-100 font-weight-bold"><i class="fas fa-check me-1"></i> Add to Specials</button>
                    </div>
                  </form>

                  {/* LISTA DEI PIATTI SPECIALI ATTUALMENTE INSERITI */}
                  <h6 class="small font-weight-bold mb-1">Active Dynamic Specials ({dynamicSpecials().length})</h6>
                  <div class="current-specials-list">
                    <button class="btn btn-sm btn-secondary w-100 mb-2 py-1" style={{ "font-size": "0.75rem" }} type="button" disabled>Static Real Menu Items (57 Dishes Loaded)</button>
                    <For each={dynamicSpecials()}>{(item) => (
                      <div class="d-flex justify-content-between align-items-center p-2 mb-1 rounded bg-white border" style={{ "font-size": "0.85rem" }}>
                        <div>
                          <span class="badge bg-danger me-1 text-uppercase" style={{ "font-size": "0.65rem" }}>Special {item.category}</span>
                          <strong>{item.title}</strong> — <span class="text-success font-weight-bold">{item.price}</span>
                        </div>
                        <button class="btn btn-sm btn-outline-danger p-0 px-2" style={{ "font-size": "0.75rem" }} onClick={() => handleRemoveSpecialItem(item.id)}>
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    )}</For>
                  </div>
                </div>

                <button class="btn btn-secondary w-100 mt-4" onClick={() => { setIsLoggedIn(false); setAdminPassword(""); }}>Logout Session</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#home">Dolce <span>Vita</span></a>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item"><a class="nav-link" href="#home">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="#about">Our Story</a></li>
              <li class="nav-item"><a class="nav-link" href="#menu">Menu</a></li>
              <li class="nav-item"><a class="nav-link" href="#reservation">Book a Table</a></li>
              <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section class="hero" id="home">
        <For each={heroImages}>{(img, index) => (
          <div class={`hero-bg-image ${index() === currentHeroIndex() ? 'active' : ''}`} style={{ "background-image": `url('${img}')`, "z-index": index() === currentHeroIndex() ? 2 : 1 }} />
        )}</For>
        <div class="hero-content" data-aos="fade-up" style={{ "z-index": 10 }}>
          <h1 class="hero-title">DOLCE VITA</h1>
          <p class="hero-subtitle">Authentic Italian dining in the heart of Wooburn Green</p>
          <a href="#reservation" class="btn-primary-custom">Book Now</a>
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
              </div>
              <div class="about-image">
                <img src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/capi.jpeg" alt="Story Image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOD MENU SECTION */}
      <section class="section-padding" id="menu">
        <div class="container-custom">
          <h2 class="section-title" data-aos="fade-down">The Food Menu</h2>
          <p class="section-subtitle-custom" data-aos="fade-down">Explore our extensive and authentic Italian selections</p>
          
          <div class="filter-container d-flex justify-content-center flex-wrap gap-2 mb-5 align-items-center" data-aos="fade-down">
            {/* RIPRISTINATO FISICAMENTE IL BOTTONE ALL MENU QUI SOTTO */}
            <button class={`btn-filter ${selectedCategory() === 'all' ? 'active' : ''}`} onClick={() => setSelectedCategory('all')}>All Menu</button>
            
            {/* BOTTONE SPECIALS CON EFFETTO COMET BORDER */}
            <button class={`btn-comet ${selectedCategory() === 'special' ? 'active' : ''}`} onClick={() => setSelectedCategory('special')}>
              <i class="fas fa-star me-1 text-warning"></i> Specials
            </button>

            <button class={`btn-filter ${selectedCategory() === 'nibbles' ? 'active' : ''}`} onClick={() => setSelectedCategory('nibbles')}>Nibbles</button>
            <button class={`btn-filter ${selectedCategory() === 'starters' ? 'active' : ''}`} onClick={() => setSelectedCategory('starters')}>Starters</button>
            <button class={`btn-filter ${selectedCategory() === 'pizza' ? 'active' : ''}`} onClick={() => setSelectedCategory('pizza')}>Pizze & Calzoni</button>
            <button class={`btn-filter ${selectedCategory() === 'pasta' ? 'active' : ''}`} onClick={() => setSelectedCategory('pasta')}>Pasta</button>
            <button class={`btn-filter ${selectedCategory() === 'risotto' ? 'active' : ''}`} onClick={() => setSelectedCategory('risotto')}>Risotti</button>
            <button class={`btn-filter ${selectedCategory() === 'ravioli' ? 'active' : ''}`} onClick={() => setSelectedCategory('ravioli')}>Ravioli</button>
            <button class={`btn-filter ${selectedCategory() === 'mains' ? 'active' : ''}`} onClick={() => setSelectedCategory('mains')}>Mains</button>
            <button class={`btn-filter ${selectedCategory() === 'salads' ? 'active' : ''}`} onClick={() => setSelectedCategory('salads')}>Salads</button>
            <button class={`btn-filter ${selectedCategory() === 'sides' ? 'active' : ''}`} onClick={() => setSelectedCategory('sides')}>Sides</button>
          </div>

          <div class="menu-grid">
            <For each={filteredMenu()}>{(item) => (
              <div class={`menu-card ${item.isSpecialMenu ? 'special-highlight' : ''}`} data-aos="fade-up">
                
                {/* BADGE SULLE CARD SE IL PIATTO È UNO SPECIALE */}
                {item.isSpecialMenu && (
                  <div class="special-tag-badge"><i class="fas fa-star me-1 text-warning"></i> Special Item</div>
                )}
                
                {item.img !== "" ? (
                  <img src={item.img} class="menu-card-image" alt={item.title} />
                ) : (
                  <div class="menu-card-icon-placeholder">
                    <i class={getCategoryIcon(item.category)}></i>
                  </div>
                )}
                <div class="menu-card-content">
                  <div>
                    <h3 class="menu-card-title">{item.title}</h3>
                    <div class="menu-card-price mb-3">{item.price}</div>
                  </div>
                  <p class="menu-card-description">{item.desc}</p>
                </div>
              </div>
            )}</For>
          </div>
        </div>
      </section>

      <SpecialDish />

      {/* RESERVATION SYSTEM */}
      <section class="section-padding" id="reservation">
        <div class="container-custom">
          <div class="reservation-box" data-aos="zoom-in">
            {!formSubmitted() ? (
              <>
                <h3>Book a Table</h3>
                <form onSubmit={handleSubmit} class="booking-form">
                  <div><label>Full Name *</label><input type="text" name="name" required /></div>
                  <div><label>Phone Number *</label><input type="tel" name="phone" required /></div>
                  <div><label>Guests *</label><select name="guests"><option value="2">2 People</option></select></div>
                  <div><label>Date *</label><input type="date" min={getTodayDateString()} value={bookingDate()} onChange={handleDateChange} required /></div>
                  <div class="form-group-full"><button type="submit" class="btn-primary-custom" style="width:100%">{isSending() ? "Sending..." : "Submit"}</button></div>
                </form>
              </>
            ) : (
              <div class="success-message"><h3>Thank You!</h3></div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 <strong>Dolce Vita by Alfredo Forte</strong> - Authentic Italian Cuisine</p>
      </footer>
    </>
  );
}

export default App;