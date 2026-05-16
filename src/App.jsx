import { createSignal, createMemo, onMount } from "solid-js";
import AOS from "aos";

function App() {
  onMount(() => {
    AOS.init({ duration: 800, once: true });
  });

  const [selectedCategory, setSelectedCategory] = createSignal("all");

  const menuItems = [
    { id: 1, title: "Margherita", category: "pizza", price: "£10.50", desc: "Tomato, mozzarella, and fresh basil. A classic Italian pizza done properly.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/margherita.jpg" },
    { id: 2, title: "Carbonara", category: "pasta", price: "£12.00", desc: "Fresh pasta with guanciale, egg, and pecorino cheese. An authentic Roman recipe.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/carbonara.jpg" },
    { id: 3, title: "Spaghetti Gamberi", category: "pasta", price: "£14.50", desc: "Fresh prawns, garlic, white wine, and cherry tomatoes. A delicate taste of the sea.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gamberi.jpg" },
    { id: 4, title: "Tagliatelle Funghi", category: "pasta", price: "£11.50", desc: "Porcini mushrooms, cream, and truffle. A rich and comforting flavour.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/funghi.jpg" },
    { id: 5, title: "Branzino al Forno", category: "main", price: "£16.00", desc: "Whole sea bass, lemon, and aromatic herbs. Perfectly oven-baked.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/branzino.jpg" },
    { id: 6, title: "Vino della Casa", category: "drinks", price: "£5.50", desc: "Selected Italian red wine. The perfect pairing for all our dishes.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/vino.jpg" },
    { id: 7, title: "Tiramisù", category: "dessert", price: "£6.00", desc: "Traditional recipe with mascarpone, espresso, and cocoa. Pure indulgence.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/tiramisu.jpg" },
    { id: 8, title: "Gelato Artigianale", category: "dessert", price: "£4.50", desc: "Pistachio, hazelnut, or chocolate. Freshly prepared with love every day.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gelato.jpg" },
    { id: 9, title: "Espresso & Caffè", category: "drinks", price: "£2.00", desc: "Double espresso, lungo, or macchiato. The perfect way to finish your meal.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/espresso.jpg" }
  ];

  const filteredMenu = createMemo(() => {
    if (selectedCategory() === "all") return menuItems;
    return menuItems.filter(item => item.category === selectedCategory());
  });

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
        .nav-link { color: #ffffff !important; font-weight: 500; margin: 0 12px; transition: color 0.3s ease; }
        .nav-link:hover { color: var(--secondary) !important; }
        .hero {
            min-height: 100vh;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            background: rgba(0,0,0,0.2);
        }
        .hero::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: url('https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/hero_bg.jpg');
            background-size: cover;
            background-position: center;
            opacity: 0.3;
            animation: subtle-zoom 20s ease-in-out infinite;
        }
        @keyframes subtle-zoom { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .hero-content { position: relative; z-index: 10; text-align: center; color: white; }
        .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 8vw, 5.5rem); font-weight: 700; letter-spacing: 2px; text-shadow: 2px 2px 15px rgba(0,0,0,0.6); }
        .hero-subtitle { font-size: 1.2rem; color: var(--secondary); margin-bottom: 2.5rem; font-style: italic; text-shadow: 1px 1px 5px rgba(0,0,0,0.6); }
        .btn-primary-custom { display: inline-block; text-decoration: none; background: var(--primary); color: white; padding: 14px 38px; border-radius: var(--border-radius); font-weight: 600; cursor: pointer; transition: var(--transition); border: none; }
        .btn-secondary-custom { display: inline-block; text-decoration: none; background: transparent; color: white; padding: 14px 38px; border: 2px solid white; border-radius: var(--border-radius); font-weight: 600; cursor: pointer; margin-left: 1rem; transition: var(--transition); }
        .btn-primary-custom:hover { background: #6b0000; transform: translateY(-2px); color: white; box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
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
            background: #ffffff;
            color: var(--dark);
            border: 1px solid var(--border-color);
            padding: 8px 22px;
            font-size: 0.95rem;
            font-weight: 600;
            border-radius: 30px;
            transition: var(--transition);
            cursor: pointer;
        }
        .btn-filter:hover, .btn-filter.active {
            background: var(--primary);
            color: #ffffff;
            border-color: var(--primary);
            box-shadow: 0 4px 12px rgba(139, 0, 0, 0.2);
        }

        .about-content { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .about-text h2 { font-family: 'Playfair Display', serif; font-size: 2.5rem; color: var(--primary); margin-bottom: 1.5rem; font-weight: 700; }
        .about-text p { font-size: 1.05rem; line-height: 1.9; margin-bottom: 1.3rem; font-weight: 400; color: #444; }
        .about-image { height: 420px; border-radius: var(--border-radius); overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
        .about-image img { width: 100%; height: 100%; object-fit: cover; }
        .menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 3rem; }
        .menu-card { 
            background: #ffffff; 
            border: 1px solid var(--border-color); 
            border-radius: var(--border-radius); 
            overflow: hidden; 
            transition: var(--transition); 
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); 
            display: flex;
            flex-direction: column;
        }
        .menu-card:hover { transform: translateY(-5px); border-color: var(--secondary); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12); }
        .menu-card-image { width: 100%; height: 220px; object-fit: cover; display: block; }
        .menu-card-content { padding: 1.5rem; text-align: center; flex-grow: 1; }
        .menu-card-title { font-family: 'Playfair Display', serif; font-size: 1.35rem; color: var(--primary); font-weight: 700; margin-bottom: 0.5rem; }
        .menu-card-price { color: var(--secondary); font-family: 'Lato', sans-serif; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.8rem; }
        .menu-card-description { color: #666666; font-family: 'Lato', sans-serif; font-size: 0.95rem; line-height: 1.6; text-align: center; margin: 0 auto; max-width: 90%; }
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
        .custom-testimonials { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2.5rem; }
        .testimonial { background: #fdfcf9; padding: 2rem; border-radius: var(--border-radius); border-left: 4px solid var(--secondary); box-shadow: 0 3px 10px rgba(0,0,0,0.02); }
        .testimonial-author { font-weight: 700; color: var(--primary); margin-top: 1rem; margin-bottom: 0.2rem; }
        .testimonial-rating { color: #FFB81C; font-size: 0.9rem; }
        .reservation-box { max-width: 700px; margin: 0 auto; padding: 3.5rem 2rem; border: 1px solid rgba(201, 169, 97, 0.2); border-radius: var(--border-radius); box-shadow: 0 10px 35px rgba(0,0,0,0.08); background: #ffffff; text-align: center; }
        .reservation-box h3 { font-family: 'Playfair Display', serif; font-size: 2.2rem; color: var(--primary); margin-bottom: 1.2rem; font-weight: 700; }
        .reservation-box p { font-size: 1.05rem; margin-bottom: 2rem; color: #444; line-height: 1.7; }
        
        .contact-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2.5rem; text-align: center; align-items: start; }
        .contact-icon { font-size: 2.5rem; color: var(--primary); margin-bottom: 1rem; }
        .contact-info h3 { font-family: 'Playfair Display', serif; font-weight: 700; color: var(--primary); margin-bottom: 0.8rem; }
        .contact-info p { color: #444; font-weight: 400; }
        
        /* PULSANTI DEL TUO PROGETTO ORIGINALE RIPRISTINATI CORRETTAMENTE */
        .btn-action {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: #ffffff;
            color: #2a2a2a;
            border: 1px solid #ced4da;
            padding: 9px 18px;
            font-size: 0.9rem;
            font-weight: 600;
            border-radius: 6px;
            text-decoration: none;
            margin-top: 15px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .btn-action:hover {
            background: var(--dark);
            color: #ffffff;
            border-color: var(--dark);
            transform: translateY(-2px);
        }
        .btn-action.maps i { color: #4285F4; }
        .btn-action.phone i { color: #34A853; }
        .btn-action.email i { color: #EA4335; }
        .btn-action:hover i { color: #ffffff; }

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
            .custom-testimonials { grid-template-columns: 1fr; }
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

      {/* HERO */}
      <section class="hero" id="home">
        <div class="hero-content" data-aos="fade-up">
          <h1 class="hero-title">DOLCE VITA</h1>
          <p class="hero-subtitle">Authentic Italian dining in the heart of Wooburn Green</p>
          <div class="hero-buttons">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfjK-hwMDBoQNIr92nkHziV2qp-UF5DaURpQcUbPx8pQcL_qA/viewform?usp=dialog&hl=en_GB" target="_blank" class="btn-primary-custom">Book Now</a>
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
                <img src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/interior.jpg" alt="Dolce Vita Interior" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU HIGHLIGHTS */}
      <section class="section-padding" id="menu">
        <div class="container-custom">
          <h2 class="section-title" data-aos="fade-down">Menu Highlights</h2>
          <p class="section-subtitle-custom" data-aos="fade-down">A selection of our most beloved dishes</p>
          
          <div class="filter-container d-flex justify-content-center flex-wrap gap-2 mb-5" data-aos="fade-down">
            <button class={`btn-filter ${selectedCategory() === 'all' ? 'active' : ''}`} onClick={() => setSelectedCategory('all')}>All Items</button>
            <button class={`btn-filter ${selectedCategory() === 'pizza' ? 'active' : ''}`} onClick={() => setSelectedCategory('pizza')}>Pizze</button>
            <button class={`btn-filter ${selectedCategory() === 'pasta' ? 'active' : ''}`} onClick={() => setSelectedCategory('pasta')}>Primi (Pasta)</button>
            <button class={`btn-filter ${selectedCategory() === 'main' ? 'active' : ''}`} onClick={() => setSelectedCategory('main')}>Secondi (Mains)</button>
            <button class={`btn-filter ${selectedCategory() === 'dessert' ? 'active' : ''}`} onClick={() => setSelectedCategory('dessert')}>Desserts</button>
            <button class={`btn-filter ${selectedCategory() === 'drinks' ? 'active' : ''}`} onClick={() => setSelectedCategory('drinks')}>Drinks</button>
          </div>

          <div class="menu-grid">
            {filteredMenu().map((item) => (
              <div class="menu-card" data-aos="fade-up" key={item.id}>
                <img src={item.img} class="menu-card-image" alt={item.title} />
                <div class="menu-card-content">
                  <h3 class="menu-card-title">{item.title}</h3>
                  <div class="menu-card-price">{item.price}</div>
                  <p class="menu-card-description">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
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
            <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery8.jpg" /><div class="gallery-overlay"><p class="gallery-text">Italian Wine</p></div></div>
            <div class="gallery-item"><img class="gallery-image" src="https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery9.jpg" /><div class="gallery-overlay"><p class="gallery-text">Risotto Milanese</p></div></div>
          </div>
        </div>
      </section>

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
              <div class="review-author">Marco Rossi</div>
              <p class="review-text">"Finally found authentic Italian food in the UK! The attention to detail is impressive and you can taste the quality of every ingredient. Bravo!"</p>
            </div>
            <div class="custom-testimonials">
              <div class="testimonial">
                <p class="review-text">"The ambiance is perfect for celebrating special moments. Every plate is a work of art."</p>
                <div class="testimonial-author">Victoria Chen</div>
                <div class="testimonial-rating">★★★★★</div>
              </div>
              <div class="testimonial">
                <p class="review-text">"Best Italian restaurant in the area by far. The service is impeccable and the food is incredible."</p>
                <div class="testimonial-author">Robert Fletcher</div>
                <div class="testimonial-rating">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESERVATION */}
      <section class="section-padding" id="reservation">
        <div class="container-custom">
          <div class="reservation-box" data-aos="zoom-in">
            <h3>Online Bookings</h3>
            <p>To secure your table at Dolce Vita, please fill out our digital booking request. It takes less than a minute and helps us prepare your perfect dining experience.</p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfjK-hwMDBoQNIr92nkHziV2qp-UF5DaURpQcUbPx8pQcL_qA/viewform?usp=dialog&hl=en_GB" target="_blank" class="btn-primary-custom" style="padding: 16px 45px; font-size: 1.1rem;">Book a Table Online</a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section class="section-padding" id="contact">
        <div class="container-custom">
          <div class="content-card-panel" data-aos="fade-up">
            <h2 class="section-title">Contact Us</h2>
            <div class="contact-info">
              <div>
                <i class="fas fa-map-marker-alt contact-icon"></i>
                <h3>Address</h3>
                <p>53 The Green<br />Wooburn Green, HP10 0EU</p>
                <a href="https://www.google.com/maps/place/Dolce+Vita/@51.5996025,-0.6953931,17z/data=!3m1!4b1!4m6!3m5!1s0x487663e64d9a6275:0x77f3cf0c57ba8ccd!8m2!3d51.5995992!4d-0.6928182!16s%2Fg%2F11fzbz9z9v" target="_blank" class="btn-action maps">
                  <i class="fab fa-google"></i> Get Directions
                </a>
              </div>
              <div>
                <i class="fas fa-phone-alt contact-icon"></i>
                <h3>Phone</h3>
                <p>01628 527942<br />Mon-Sun: 11:30-23:00</p>
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

      <footer>
        <div class="container-custom">
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
          <p>© 2026 <strong>Dolce Vita by Alfredo Forte</strong> - Authentic Italian Cuisine</p>
        </div>
      </footer>
    </>
  );
}

export default App;