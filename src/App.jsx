import { createSignal, createMemo, onMount, For } from "solid-js";
import AOS from "aos";
import emailjs from "@emailjs/browser"; 
import SpecialDish from "./components/SpecialDish";
import CateringPackages from "./components/CateringPackages";
import HeroSection from "./components/HeroSection";

import "./App.css";


function App() {
  onMount(() => {
    AOS.init({ duration: 800, once: true });
  });

  // --- HERO CAROUSEL DATA (passed to HeroSection component) ---
  const heroImages = [
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/hero_bg.jpg",
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/margherita.jpg", 
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/interior.jpg",
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/interior%202.webp",
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/interior3.webp"
  ];
  const menuLink = "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/menu.pdf";

  const [selectedCategory, setSelectedCategory] = createSignal("starters");
  const [formSubmitted, setFormSubmitted] = createSignal(false);
  const [isSending, setIsSending] = createSignal(false);

  // --- LOGICA PRENOTAZIONI ---
  const [bookingDate, setBookingDate] = createSignal("");
  const [bookingTime, setBookingTime] = createSignal("");
  const [bookingService, setBookingService] = createSignal("");

  // Gestione cambio data con validazione e reset orario
  const handleDateChange = (e) => {
    const dateVal = e.target.value;
    if (!dateVal) {
      setBookingDate("");
      setBookingTime("");
      return;
    }
    
    const day = new Date(dateVal).getDay();
    if (day === 1) { // 1 = Lunedì
      alert("Dolce Vita is closed on Mondays. Please select another day.");
      setBookingDate("");
      setBookingTime("");
      return;
    }
    
    setBookingDate(dateVal);
    setBookingTime(""); // Resetta l'orario se l'utente cambia giorno
  };

  // Calcolo dinamico degli orari in base al giorno della settimana scelto
  const availableTimeSlots = createMemo(() => {
    const date = bookingDate();
    if (!date) return { lunch: [], dinner: [], allDay: [] };

    const day = new Date(date).getDay();

    // DOMENICA (Day 0): Orario speciale domenicale continuato
    if (day === 0) {
      return {
        lunch: [],
        dinner: [],
        allDay: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30"]
      };
    }
    // MARTEDÌ - SABATO: Orari standard spezzati
    return {
      lunch: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30"],
      dinner: ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],
      allDay: []
    };
  });

  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

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
    { id: 28, title: "Calzone Vegetariano", category: "pizza", price: "£16.00", desc: "Folded pizza brushed with garlic butter, filled with tomato, mozzarella, mushrooms, mixed peppers and black olives. Served with a pot of tomato sauce.", img: "", isVegetarian: true, isVegan: false },
    { id: 29, title: "Pissaladière Dolce Vita", category: "pizza", price: "£14.50", desc: "Thin, crispy bread topped with caramelized red onions, black olives, anchovies and a light drizzle of extra virgin olive oil.", img: "", isVegetarian: false, isVegan: false },

    // PASTA E RISOTTO
    { id: 30, title: "Spaghetti Carbonara", category: "pasta", price: "£15.50", desc: "Spaghetti tossed with a creamy sauce made from egg yolks, Pecorino Romano cheese, guanciale pancetta and cracked black pepper.", img: "", isVegetarian: false, isVegan: false },
    { id: 31, title: "Tagliatelle Bolognese", category: "pasta", price: "£15.00", desc: "Wide ribbon pasta covered in a slow-cooked ragù of ground beef, vegetables and tomatoes.", img: "", isVegetarian: false, isVegan: false },
    { id: 32, title: "Fettuccine Alfredo", category: "pasta", price: "£14.00", desc: "Fettuccine in a rich, creamy sauce made with butter and Parmigiano Reggiano.", img: "", isVegetarian: true, isVegan: false },
    { id: 33, title: "Penne all'Arrabbiata", category: "pasta", price: "£13.00", desc: "Penne coated in a spicy sauce of tomatoes, garlic and red chilli peppers.", img: "", isVegetarian: true, isVegan: true },
    { id: 34, title: "Lasagna della Nonna", category: "pasta", price: "£16.00", desc: "Layers of pasta sheets, rich Bolognese ragù, béchamel sauce and melted mozzarella, baked until golden.", img: "", isVegetarian: false, isVegan: false },
    { id: 35, title: "Ravioli Ricotta e Spinaci", category: "pasta", price: "£16.50", desc: "Handmade ravioli filled with creamy ricotta and fresh spinach, served with butter and sage.", img: "", isVegetarian: true, isVegan: false },
    { id: 36, title: "Tortellini Panna e Prosciutto", category: "pasta", price: "£16.00", desc: "Delicate meat-filled tortellini tossed in a rich, velvety heavy cream sauce with diced ham and fresh parsley.", img: "", isVegetarian: false, isVegan: false },
    { id: 37, title: "Spaghetti Amatriciana", category: "pasta", price: "£14.50", desc: "Spaghetti in a tomato-based sauce with guanciale, pecorino romano and a hint of chilli.", img: "", isVegetarian: false, isVegan: false },
    { id: 38, title: "Pappardelle al Ragù di Cinghiale", category: "pasta", price: "£18.00", desc: "Wide ribbon pasta tossed with a slow-cooked wild boar ragù.", img: "", isVegetarian: false, isVegan: false },
    { id: 39, title: "Fusilli Pesto Genovese", category: "pasta", price: "£15.00", desc: "Fusilli pasta coated with a vibrant basil pesto, pine nuts, garlic and Pecorino Romano.", img: "", isVegetarian: true, isVegan: true },
    { id: 40, title: "Risotto ai Funghi Porcini", category: "pasta", price: "£16.50", desc: "Creamy Arborio rice cooked with porcini mushrooms, white wine, broth and finished with butter and Parmigiano Reggiano.", img: "", isVegetarian: true, isVegan: false },
    { id: 41, title: "Risotto al Tartufo", category: "pasta", price: "£22.00", desc: "Creamy Arborio rice infused with black truffle, white wine, broth and finished with butter and Parmigiano Reggiano.", img: "", isVegetarian: true, isVegan: false },

    // CARNE
    { id: 42, title: "Osso Buco alla Milanese", category: "carne", price: "£28.00", desc: "Braised veal shank with vegetables, white wine and broth, topped with gremolata and served with saffron risotto.", img: "", isVegetarian: false, isVegan: false },
    { id: 43, title: "Saltimbocca alla Romana", category: "carne", price: "£24.00", desc: "Thin slices of veal topped with fresh sage and Parma ham, pan-fried and finished with white wine sauce.", img: "", isVegetarian: false, isVegan: false },
    { id: 44, title: "Piccata al Limone", category: "carne", price: "£20.00", desc: "Tender veal cutlets pan-fried and served in a light lemon and white wine sauce.", img: "", isVegetarian: false, isVegan: false },
    { id: 45, title: "Cotoletta alla Milanese", category: "carne", price: "£19.00", desc: "Breadcrumbed veal cutlet, fried until golden and crispy, served with fresh lemon.", img: "", isVegetarian: false, isVegan: false },
    { id: 46, title: "Vitello Tonnato", category: "carne", price: "£18.00", desc: "Sliced veal served cold with a creamy tuna and caper sauce.", img: "", isVegetarian: false, isVegan: false },
    { id: 47, title: "Chicken Parmigiana", category: "carne", price: "£18.00", desc: "Breaded chicken breasts layered with tomato sauce and melted mozzarella, baked until bubbly.", img: "", isVegetarian: false, isVegan: false },
    { id: 48, title: "Chicken Marsala", category: "carne", price: "£18.00", desc: "Tender chicken breasts cooked in a rich Marsala wine sauce with mushrooms.", img: "", isVegetarian: false, isVegan: false },
    { id: 49, title: "Chicken Piccata", category: "carne", price: "£17.00", desc: "Pan-fried chicken breast in a light lemon and white wine sauce.", img: "", isVegetarian: false, isVegan: false },
    { id: 50, title: "Lamb Chops Grilled", category: "carne", price: "£26.00", desc: "Tender lamb chops marinated in herbs, grilled to perfection and served with roasted vegetables.", img: "", isVegetarian: false, isVegan: false },
    { id: 51, title: "Beef Ragu (Tagliatelle)", category: "carne", price: "£16.00", desc: "Rich, slow-cooked beef ragù served over fresh tagliatelle pasta.", img: "", isVegetarian: false, isVegan: false },
    { id: 52, title: "Ribeye Steak", category: "carne", price: "£34.00", desc: "Succulent 10oz ribeye steak, grilled to your liking and finished with butter, garlic and rosemary.", img: "", isVegetarian: false, isVegan: false },
    { id: 53, title: "Fiorentina", category: "carne", price: "£38.00", desc: "Thick-cut T-bone steak, grilled rare and served with fresh lemon and Tuscan olive oil.", img: "", isVegetarian: false, isVegan: false },
    { id: 54, title: "Pork Chop Milanese", category: "carne", price: "£18.00", desc: "Breadcrumbed pork chop, fried until golden and crispy.", img: "", isVegetarian: false, isVegan: false },
    { id: 55, title: "Sausage and Broccoli", category: "carne", price: "£15.00", desc: "Italian sausage served with sautéed broccoli and a light garlic sauce.", img: "", isVegetarian: false, isVegan: false },

    // PESCE
    { id: 56, title: "Branzino al Forno", category: "pesce", price: "£26.00", desc: "Whole sea bass baked in the oven with lemon, herbs and extra virgin olive oil.", img: "", isVegetarian: false, isVegan: false },
    { id: 57, title: "Salmon Piccata", category: "pesce", price: "£24.00", desc: "Pan-fried salmon fillet served in a light lemon and white wine sauce.", img: "", isVegetarian: false, isVegan: false },
    { id: 58, title: "Swordfish Grilled", category: "pesce", price: "£26.00", desc: "Grilled swordfish steak served with fresh lemon and roasted vegetables.", img: "", isVegetarian: false, isVegan: false },
    { id: 59, title: "Calamari Fritti", category: "pesce", price: "£16.00", desc: "Deep-fried squid rings served with tartare sauce and fresh lemon.", img: "", isVegetarian: false, isVegan: false },
    { id: 60, title: "Shrimp Scampi", category: "pesce", price: "£20.00", desc: "Succulent shrimp sautéed in garlic, white wine, parsley and a touch of chilli, served with crusty bread.", img: "", isVegetarian: false, isVegan: false },
    { id: 61, title: "Mussels Marinara", category: "pesce", price: "£17.00", desc: "Fresh mussels in a tomato-based sauce with garlic and white wine, served with crusty bread.", img: "", isVegetarian: false, isVegan: false },
    { id: 62, title: "Mixed Seafood Pasta", category: "pesce", price: "£19.00", desc: "A medley of shrimp, mussels, calamari and clams tossed with spaghetti in a light tomato sauce.", img: "", isVegetarian: false, isVegan: false },
    { id: 63, title: "Clams Linguine", category: "pesce", price: "£17.50", desc: "Fresh linguine pasta with littleneck clams in a white wine and garlic sauce.", img: "", isVegetarian: false, isVegan: false },

    // VEGETARIAN
    { id: 64, title: "Eggplant Parmigiana", category: "vegetarian", price: "£13.50", desc: "Sliced eggplant layered with tomato sauce, mozzarella and Parmesan, baked until golden.", img: "", isVegetarian: true, isVegan: false },
    { id: 65, title: "Risotto ai Funghi Porcini", category: "vegetarian", price: "£16.50", desc: "Creamy Arborio rice with porcini mushrooms, white wine and Parmigiano Reggiano.", img: "", isVegetarian: true, isVegan: false },
    { id: 66, title: "Risotto al Tartufo", category: "vegetarian", price: "£22.00", desc: "Creamy Arborio rice infused with black truffle, white wine and Parmigiano Reggiano.", img: "", isVegetarian: true, isVegan: false },
    { id: 67, title: "Vegetable Lasagna", category: "vegetarian", price: "£15.00", desc: "Layers of pasta sheets, seasonal vegetables, béchamel sauce and melted mozzarella.", img: "", isVegetarian: true, isVegan: false },
    { id: 68, title: "Ravioli Ricotta e Spinaci", category: "vegetarian", price: "£16.50", desc: "Handmade ravioli filled with creamy ricotta and fresh spinach, served with butter and sage.", img: "", isVegetarian: true, isVegan: false },
    { id: 69, title: "Penne all'Arrabbiata", category: "vegetarian", price: "£13.00", desc: "Penne in a spicy sauce of tomatoes, garlic and red chilli peppers.", img: "", isVegetarian: true, isVegan: true },
    { id: 70, title: "Fusilli Pesto Genovese", category: "vegetarian", price: "£15.00", desc: "Fusilli pasta coated with basil pesto, pine nuts, garlic and Pecorino Romano.", img: "", isVegetarian: true, isVegan: true },
    { id: 71, title: "Fettuccine Alfredo", category: "vegetarian", price: "£14.00", desc: "Fettuccine in a rich, creamy sauce made with butter and Parmigiano Reggiano.", img: "", isVegetarian: true, isVegan: false },
    { id: 72, title: "Vegetable Soup", category: "vegetarian", price: "£8.00", desc: "Hearty soup with seasonal vegetables in a light broth.", img: "", isVegetarian: true, isVegan: true },
    { id: 73, title: "Caprese Salad", category: "vegetarian", price: "£11.00", desc: "Fresh mozzarella, ripe tomatoes and basil dressed with extra virgin olive oil and balsamic glaze.", img: "", isVegetarian: true, isVegan: false },

    // SIDES / CONTORNI
    { id: 74, title: "Roasted Vegetables", category: "sides", price: "£6.50", desc: "Mixed roasted seasonal vegetables with garlic and herbs.", img: "", isVegetarian: true, isVegan: true },
    { id: 75, title: "Sautéed Spinach", category: "sides", price: "£5.50", desc: "Fresh spinach sautéed with garlic and a touch of extra virgin olive oil.", img: "", isVegetarian: true, isVegan: true },
    { id: 76, title: "Truffle Fries", category: "sides", price: "£7.00", desc: "Crispy hand-cut fries tossed with truffle oil and Parmesan.", img: "", isVegetarian: true, isVegan: false },
    { id: 77, title: "Garlic Bread", category: "sides", price: "£5.00", desc: "Crispy bread brushed with garlic, butter and parsley.", img: "", isVegetarian: true, isVegan: false },
    { id: 78, title: "Mashed Potatoes", category: "sides", price: "£5.50", desc: "Creamy mashed potatoes made with butter and a hint of garlic.", img: "", isVegetarian: true, isVegan: false },

    // SALADS / ENSALADAS
    { id: 79, title: "Caesar Salad", category: "salads", price: "£12.00", desc: "Crisp romaine lettuce, homemade Caesar dressing, croutons and Parmesan shavings.", img: "", isVegetarian: false, isVegan: false },
    { id: 80, title: "Caprese Salad", category: "salads", price: "£11.00", desc: "Fresh mozzarella, ripe tomatoes and basil dressed with extra virgin olive oil and balsamic glaze.", img: "", isVegetarian: true, isVegan: false },
    { id: 81, title: "Greek Salad", category: "salads", price: "£11.50", desc: "Mixed greens, feta cheese, tomatoes, cucumbers, red onion, olives and a zesty vinaigrette.", img: "", isVegetarian: true, isVegan: false },
    { id: 82, title: "Arugula Salad", category: "salads", price: "£13.00", desc: "Peppery arugula, shaved Parmesan, cherry tomatoes, croutons and a light lemon vinaigrette.", img: "", isVegetarian: true, isVegan: false },

    // DESSERTS
    { id: 83, title: "Tiramisu", category: "desserts", price: "£7.00", desc: "Classic Italian dessert made with espresso-soaked ladyfingers, mascarpone cream and cocoa powder.", img: "", isVegetarian: true, isVegan: false },
    { id: 84, title: "Panna Cotta", category: "desserts", price: "£6.50", desc: "Silky-smooth Italian cream dessert served with fresh berry coulis.", img: "", isVegetarian: true, isVegan: false },
    { id: 85, title: "Zabaglione", category: "desserts", price: "£6.00", desc: "Light, fluffy Italian custard dessert made with egg yolks, sugar and Marsala wine.", img: "", isVegetarian: true, isVegan: false },
    { id: 86, title: "Gelato", category: "desserts", price: "£5.00", desc: "Authentic Italian gelato in a choice of flavors: vanilla, chocolate, pistachio, hazelnut or strawberry.", img: "", isVegetarian: true, isVegan: false },
    { id: 87, title: "Panna Cotta al Pistacchio", category: "desserts", price: "£7.00", desc: "Creamy panna cotta infused with pistachio, topped with crushed pistachios.", img: "", isVegetarian: true, isVegan: false },
    { id: 88, title: "Spumoni", category: "desserts", price: "£5.50", desc: "Traditional Italian three-flavor gelato with layers of pistachio, chocolate and cherry.", img: "", isVegetarian: true, isVegan: false },
  ];

  // Categorizzazione
  const categories = [
    { id: "specials", label: "Specials", icon: "fas fa-star" },
    { id: "nibbles", label: "Nibbles", icon: "fas fa-gem" },
    { id: "starters", label: "Starters", icon: "fas fa-apple-alt" },
    { id: "pizza", label: "Pizze", icon: "fas fa-pizza-slice" },
    { id: "pasta", label: "Pasta & Risotto", icon: "fas fa-bowl-food" },
    { id: "carne", label: "Carne", icon: "fas fa-drumstick-bite" },
    { id: "pesce", label: "Pesce", icon: "fas fa-fish" },
    { id: "vegetarian", label: "Vegetarian", icon: "fas fa-leaf" },
    { id: "sides", label: "Contorni", icon: "fas fa-french-fries" },
    { id: "salads", label: "Salads", icon: "fas fa-salad" },
    { id: "desserts", label: "Desserts", icon: "fas fa-cake-slice" }
  ];

  // --- GALLERIA ---
  const galleryImages = [
    {
      src: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery1.jpg",
      alt: "Dolce Vita Dining Experience",
      text: "Elegant Dining"
    },
    {
      src: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery2.jpg",
      alt: "Italian Cuisine",
      text: "Authentic Italian"
    },
    {
      src: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery3.jpg",
      alt: "Wine Selection",
      text: "Fine Wines"
    }
  ];

  // --- VENUES ---
  const venues = [
    {
      id: 1,
      title: "The Cork Wine Bar",
      tagline: "Elegant & Intimate",
      badge: "Wine & Cocktails",
      image: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/the-cork.webp",
      description: "Located just steps away, The Cork is the perfect spot for a pre-dinner aperitivo or a sophisticated evening out. Explore a curated selection of fine wines, artisanal cocktails, and premium spirits in a warm, welcoming atmosphere.",
      instagramLink: "https://www.instagram.com"
    },
    {
      id: 2,
      title: "Green Delight",
      tagline: "Fresh & Vibrant",
      badge: "Breakfast & Healthy Bar",
      image: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/green.jpg",
      description: "Your daily destination for wellness on The Green. From rich barista coffee and freshly baked morning pastries to vibrant healthy juices, premium salads, and artisanal light bites, everything is prepared fresh daily.",
      instagramLink: "https://www.instagram.com"
    }
  ];

  // --- REVIEWS ---
  const reviews = [
    {
      stars: "★★★★★",
      author: "Sarah M.",
      text: "Absolutely stunning food and impeccable service. The ambiance is perfect for a special evening. Highly recommend!"
    },
    {
      stars: "★★★★★",
      author: "James K.",
      text: "The pasta is divine. Every dish feels like a journey through Italy. Will definitely be back!"
    },
    {
      stars: "★★★★★",
      author: "Emma L.",
      text: "Best Italian restaurant in the area. Fresh ingredients, authentic recipes, and wonderful staff."
    }
  ];

  // --- LOGICA MENU FILTER ---
  const filteredMenu = createMemo(() => {
    if (selectedCategory() === "all") return menuItems;
    if (selectedCategory() === "vegan") return menuItems.filter(item => item.isVegan);
    return menuItems.filter(item => item.category === selectedCategory());
  });

  // --- EMAIL JS FORM HANDLER ---
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
        setBookingService("");
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

  // --- HELPER FUNCTION ---
  const getCategoryIcon = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.icon : "fas fa-utensils";
  };

  return (
    <>
      {/* ====================================
          NAVBAR
          ==================================== */}
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

      {/* ====================================
          HERO SECTION - EXTRACTED COMPONENT
          ==================================== */}
      <HeroSection heroImages={heroImages} menuLink={menuLink} />

      {/* ====================================
          OUR STORY SECTION
          ==================================== */}
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
                <img src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/capi.jpeg" alt="Dolce Vita Story Image" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          MENU SECTION
          ==================================== */}
      <section class="section-padding" id="menu">
        <div class="container-custom">
          <h2 class="section-title" data-aos="fade-down">The Food Menu</h2>
          <p class="section-subtitle-custom" data-aos="fade-down">Explore our extensive and authentic Italian selections</p>
          
          {/* Filter buttons */}
          <div class="filter-container d-flex justify-content-center flex-wrap gap-2 mb-5" data-aos="fade-down">
            <button 
              class={`btn-filter ${selectedCategory() === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Menu
            </button>
            
            <For each={categories}>
              {(cat) => (
                <button
                  class={`btn-filter ${selectedCategory() === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <i class={cat.icon}></i> {cat.label}
                </button>
              )}
            </For>

            <button 
              class={`btn-filter ${selectedCategory() === 'vegan' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('vegan')}
            >
              <i class="fas fa-sprout"></i> Vegan
            </button>
          </div>

          {/* Menu grid */}
          <div class="menu-grid">
            <For each={filteredMenu()}>
              {(item) => (
                <div class="menu-card" data-aos="fade-up">
                  {item.img ? (
                    <img src={item.img} alt={item.title} loading="lazy" class="menu-card-image" />
                  ) : (
                    <div class="menu-card-placeholder">
                      <i class={getCategoryIcon(item.category)}></i>
                    </div>
                  )}
                  
                  <div class="menu-card-content">
                    <h3 class="menu-title">{item.title}</h3>
                    <p class="menu-desc">{item.desc}</p>
                    
                    <div class="menu-footer">
                      <p class="menu-price">{item.price}</p>
                      <div class="dietary-badges">
                        {item.isVegan && <span class="badge-vegan">Vegan</span>}
                        {item.isVegetarian && !item.isVegan && <span class="badge-veg">Vegetarian</span>}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* ====================================
          SPECIAL DISH (optional)
          ==================================== */}
      <SpecialDish />

      {/* ====================================
          ATMOSPHERE / GALLERY
          ==================================== */}
      <section class="section-padding parallax-band parallax-band-2" id="gallery">
        <div class="parallax-overlay"></div>
        <div class="container-custom" style={{ position: "relative", "z-index": 10 }}>
          <h2 class="section-title" style={{ color: "white" }} data-aos="fade-down">
            Our Atmosphere
          </h2>
          <p class="section-subtitle-custom" style={{ color: "var(--secondary)" }} data-aos="fade-down">
            Experience the warmth and elegance of Dolce Vita
          </p>
          
          <div class="gallery-grid">
            <For each={galleryImages}>
              {(img, idx) => (
                <div class="gallery-item" data-aos="fade-up" data-aos-delay={`${(idx() + 1) * 100}`}>
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* ====================================
          CUSTOMER REVIEWS
          ==================================== */}
      <section class="section-padding" id="reviews">
        <div class="container-custom">
          <div class="content-card-panel" data-aos="fade-up">
            <h2 class="section-title">What Our Guests Say</h2>
            <p class="section-subtitle-custom">Hear from those who have experienced Dolce Vita</p>
            
            <div class="reviews-grid">
              <For each={reviews}>
                {(review, idx) => (
                  <div class="review-card" data-aos="fade-up" data-aos-delay={`${(idx() + 1) * 100}`}>
                    <p class="stars">{review.stars}</p>
                    <p class="review-author">{review.author}</p>
                    <p class="review-text">{review.text}</p>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          CATERING PACKAGES
          ==================================== */}
      <section class="section-padding" id="catering">
        <div class="container-custom">
          <div class="content-card-panel" data-aos="fade-up">
            <h2 class="section-title">Catering Packages</h2>
            <p class="section-subtitle-custom">Bring Dolce Vita to your special event</p>
            <CateringPackages />
          </div>
        </div>
      </section>

      {/* ====================================
          RESERVATION FORM
          ==================================== */}
      <section class="section-padding" id="reservation">
        <div class="container-custom">
          <div class="reservation-box">
            <h3>Reserve Your Table</h3>
            <p>Book a table at Dolce Vita and enjoy authentic Italian cuisine in an elegant atmosphere.</p>
            
            {!formSubmitted() ? (
              <>
                <form onSubmit={handleSubmit} class="booking-form">
                  <div class="form-group">
                    <label for="name">Full Name *</label>
                    <input id="name" type="text" name="user_name" required />
                  </div>

                  <div class="form-group">
                    <label for="email">Email *</label>
                    <input id="email" type="email" name="user_email" required />
                  </div>

                  <div class="form-group">
                    <label for="phone">Phone Number *</label>
                    <input id="phone" type="tel" name="user_phone" required />
                  </div>

                  <div class="form-group">
                    <label for="guests">Number of Guests *</label>
                    <select id="guests" name="guests" required>
                      <option value="">Select number of guests</option>
                      {[...Array(12)].map((_, i) => (
                        <option value={i + 1}>{i + 1} Guest{i !== 0 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="date">Preferred Date *</label>
                    <input id="date" type="date" name="booking_date" min={getTodayDateString()} required onChange={handleDateChange} />
                  </div>

                  <div class="form-group">
                    <label for="time">Preferred Time *</label>
                    <select id="time" name="booking_time" required disabled={!bookingDate()} onChange={(e) => setBookingTime(e.target.value)}>
                      <option value="">Select time</option>
                      {availableTimeSlots().allDay.length > 0 && (
                        <>
                          {availableTimeSlots().allDay.map((time) => (
                            <option value={time}>{time}</option>
                          ))}
                        </>
                      )}
                      {availableTimeSlots().lunch.length > 0 && (
                        <>
                          <optgroup label="Lunch">
                            {availableTimeSlots().lunch.map((time) => (
                              <option value={time}>{time}</option>
                            ))}
                          </optgroup>
                        </>
                      )}
                      {availableTimeSlots().dinner.length > 0 && (
                        <>
                          <optgroup label="Dinner">
                            {availableTimeSlots().dinner.map((time) => (
                              <option value={time}>{time}</option>
                            ))}
                          </optgroup>
                        </>
                      )}
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="service">Service Type *</label>
                    <select id="service" name="booking_service" required onChange={(e) => setBookingService(e.target.value)}>
                      <option value="">Select service type</option>
                      <option value="dine-in">Dine In</option>
                      <option value="takeaway">Takeaway</option>
                    </select>
                  </div>

                  <div class="form-group-full">
                    <label for="requests">Special Requests (Optional)</label>
                    <textarea id="requests" name="special_requests" rows="4" placeholder="Any special requests, allergies, or dietary requirements?"></textarea>
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

      {/* ====================================
          OUR GROUP VENUES
          ==================================== */}
      <section class="section-padding" id="our-group">
        <div class="container-custom">
          <div class="content-card-panel" data-aos="fade-up">
            <h2 class="section-title">The Dolce Vita Family</h2>
            <p class="section-subtitle-custom">Discover our other premium venues in Wooburn Green</p>
            
            <div class="venues-grid">
              <For each={venues}>
                {(venue, idx) => (
                  <div class="venue-card" data-aos="fade-up" data-aos-delay={`${(idx() + 1) * 100}`}>
                    <div class="venue-image-wrapper">
                      <img src={venue.image} class="venue-image" alt={venue.title} loading="lazy" />
                      <span class="venue-badge">{venue.badge}</span>
                    </div>
                    <div class="venue-info">
                      <div>
                        <h3 class="venue-title">{venue.title}</h3>
                        <p class="venue-tagline">{venue.tagline}</p>
                        <p class="venue-desc">{venue.description}</p>
                      </div>
                      <div>
                        <a href={venue.instagramLink} target="_blank" class="btn-action email" style="margin-top: 0;">
                          <i class="fab fa-instagram"></i> Follow on Instagram
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          CONTACT SECTION
          ==================================== */}
      <section class="section-padding" id="contact">
        <div class="container-custom">
          <div class="content-card-panel" data-aos="fade-up">
            <h2 class="section-title">Contact Us</h2>
            <div class="contact-info">
              <div>
                <i class="fas fa-map-marker-alt contact-icon"></i>
                <h3>Address</h3>
                <p>53 The Green, Wooburn Green, HP10 0EU</p>
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

      {/* ====================================
          FOOTER
          ==================================== */}
      <footer>
        <div class="container-custom">
          <div class="social-links">
            <a href="https://www.facebook.com" target="_blank">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/dolcevita_wooburn_green/" target="_blank">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
          <p>© 2026 <strong>Dolce Vita by Alfredo Forte</strong> - Authentic Italian Cuisine</p>
        </div>
      </footer>
    </>
  );
}

export default App;
