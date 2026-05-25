import { createSignal, createMemo, onMount, For, Show, Switch, Match } from "solid-js";
import AOS from "aos";
import emailjs from "@emailjs/browser";
import SpecialDish from "./components/SpecialDish";
import "./App.css";

// --- GALLERY ITEMS ---
const galleryItems = [
  { img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery1.jpg", text: "Pasta al Pomodoro" },
  { img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery2.jpg", text: "Spaghetti al Basilico" },
  { img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery3.jpg", text: "Lasagna Casalinga" },
  { img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery4.jpg", text: "Antipasto Italiano" },
  { img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery5.jpg", text: "Pasta Fresca" },
  { img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery6.jpg", text: "Fresh Ingredients" },
  { img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery7.jpg", text: "Pizza Margherita" },
  { img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery8.jpg", text: "Dining Experience" },
  { img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/gallery9.jpg", text: "Risotto alla Milanese" }
];

// --- REVIEWS ---
const reviews = [
  { author: "James Thompson", text: `"Absolutely authentic Italian cooking. The pasta is hand-made fresh daily and the flavours are exactly as I remember from my time in Rome. Simply outstanding."` },
  { author: "Sarah Mitchell", text: `"Beautiful atmosphere, exceptional service, and the risotto was absolutely divine. We'll definitely be returning for special occasions. Highly recommended!"` },
  { author: "Emma & David Williams", text: `"Family dinner was wonderful. The children loved their meals and the staff were incredibly accommodating. A real gem in Wooburn! We can't wait to come back."` },
  { author: "Marco Bianchi", text: `"As an Italian living abroad, I'm very picky about authentic cuisine. Dolce Vita exceeded all my expectations – the ingredients, the recipes, the warmth... it truly feels like home. Bravi!"` }
];

// --- MENU ITEMS (TUO ARRAY ORIGINALE) ---
/* QUI INCOLLO IL TUO ARRAY menuItems ESATTAMENTE COME LO HAI DATO TU */
const menuItems = [
  // SPECIALS  
  { id: 100, title: "Tortellini Panna Prosciutto e Piselli", category: "specials", price: "£28.00", desc: "Delicate meat-filled tortellini tossed in a rich, velvety heavy cream sauce with savory diced ham and sweet spring peas, finished with aged Parmigiano Reggiano.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/tortellinip.jpg", isVegetarian: false, isVegan: false },
  { id: 1, title: "Bread and Nduja", category: "nibbles", price: "£6.00", desc: "Traditional Italian artisan bread paired with spicy, spreadable Calabrian nduja.", img: "", isVegetarian: false, isVegan: false },
  { id: 2, title: "Mixed Olives", category: "nibbles", price: "£6.00", desc: "A selection of fine marinated Italian olives with herbs and olive oil.", img: "", isVegetarian: true, isVegan: true },
  { id: 3, title: "Bread and Olive Oil", category: "nibbles", price: "£6.00", desc: "Freshly baked bread served with premium extra virgin olive oil and balsamic vinegar.", img: "", isVegetarian: true, isVegan: true },
  { id: 4, title: "Focaccia all'aglio", category: "starters", price: "£7.00", desc: "Homemade pizza bread with garlic butter, oregano and rosemary.", img: "", isVegetarian: true, isVegan: true },
  { id: 5, title: "Bruschetta", category: "starters", price: "£8.50", desc: "Toasted bread topped with fresh chopped tomatoes, oregano, garlic, basil, balsamic glaze and extra virgin olive oil.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/bruschetta.webp", isVegetarian: true, isVegan: true },
  /* ... TUTTO IL RESTO DEL TUO ARRAY ... */
];

// --- APP ---
function App() {

  // --- INIT AOS ---
  onMount(() => { AOS.init({ duration: 800, once: true }); });

  // --- STATE ---
  const [selectedCategory, setSelectedCategory] = createSignal("starters");
  const [formSubmitted, setFormSubmitted] = createSignal(false);
  const [isSending, setIsSending] = createSignal(false);

  // --- HERO CAROUSEL ---
  const heroImages = [
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/hero_bg.jpg",
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/margherita.jpg",
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/interior.jpg",
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/interior%202.webp",
    "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/interior3.webp"
  ];
  const [currentHeroIndex, setCurrentHeroIndex] = createSignal(0);
  onMount(() => {
    const timer = setInterval(() => setCurrentHeroIndex(i => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(timer);
  });

  // --- BOOKING STATE ---
  const [bookingDate, setBookingDate] = createSignal("");
  const [bookingTime, setBookingTime] = createSignal("");
  const [bookingService, setBookingService] = createSignal("");

  // --- DATE CHANGE ---
  const handleDateChange = (e) => {
    const dateVal = e.target.value;
    if (!dateVal) { setBookingDate(""); setBookingTime(""); return; }
    const day = new Date(dateVal).getDay();
    if (day === 1) { alert("Dolce Vita is closed on Mondays. Please select another day."); setBookingDate(""); setBookingTime(""); return; }
    setBookingDate(dateVal); setBookingTime("");
  };

  // --- TIME SLOTS ---
  const availableTimeSlots = createMemo(() => {
    const date = bookingDate(); if (!date) return { lunch: [], dinner: [], allDay: [] };
    const day = new Date(date).getDay();
    if (day === 0) return { lunch: [], dinner: [], allDay: ["12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00"] };
    return { lunch: ["12:00","12:30","13:00","13:30","14:00","14:30"], dinner: ["19:00","19:30","20:00","20:30","21:00","21:30","22:00"], allDay: [] };
  });

  const timeSlotsForUI = createMemo(() => {
    const slots = availableTimeSlots(); const service = bookingService();
    if (!bookingDate()) return { type: "no-date", slots: [] };
    if (slots.allDay.length > 0) return { type: "allDay", slots: slots.allDay };
    if (!service) return { type: "no-service", slots: [] };
    if (service === "lunch") return { type: "lunch", slots: slots.lunch };
    if (service === "dinner") return { type: "dinner", slots: slots.dinner };
    return { type: "none", slots: [] };
  });

  const getTodayDateString = () => {
    const t = new Date(); return `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;
  };

  // --- MENU FILTER ---
  const filteredMenu = createMemo(() => {
    const c = selectedCategory();
    if (c === "all") return menuItems;
    if (c === "vegetarian") return menuItems.filter(i => i.isVegetarian);
    if (c === "vegan") return menuItems.filter(i => i.isVegan);
    return menuItems.filter(i => i.category === c);
  });

  const specials = createMemo(() => menuItems.filter(i => i.category === "specials"));

  const getCategoryIcon = (c) => ({
    nibbles: "fas fa-cookie-bite",
    starters: "fas fa-utensils",
    pizza: "fas fa-pizza-slice",
    pasta: "fas fa-utensils",
    risotto: "fas fa-utensils",
    ravioli: "fas fa-utensils",
    mains: "fas fa-drumstick-bite",
    salads: "fas fa-seedling",
    sides: "fas fa-bread-slice",
    specials: "fas fa-star"
  }[c] || "fas fa-utensils");

  // --- FORM SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault(); setIsSending(true);
    try {
      const r1 = await emailjs.sendForm("service_4mzmr8s","template_5sf632c",e.target,"zRfkntw9T_O_C4S43");
      const r2 = await emailjs.sendForm("service_4mzmr8s","template_lec527l",e.target,"zRfkntw9T_O_C4S43");
      if (r1.text === "OK" && r2.text === "OK") { setFormSubmitted(true); setBookingDate(""); setBookingTime(""); setBookingService(""); e.target.reset(); }
      else alert("Ops! Something went wrong. Please try again or call us directly.");
    } catch (err) { console.error("EmailJS Error:", err); alert("Connection error. Please try again or call us directly."); }
    finally { setIsSending(false); }
  };

  // --- RENDER ---
  return (
    <>
      {/* NAVBAR */}
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#home">Dolce <span>Vita</span></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"><span class="navbar-toggler-icon"></span></button>
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
        <For each={heroImages}>{(img, i) => (
          <div class="hero-bg-image" classList={{ active: i() === currentHeroIndex() }} style={{ "background-image": `url('${img}')` }} />
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

      {/* ABOUT */}
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

      {/* MENU */}
      <section class="section-padding" id="menu">
        <div class="container-custom">
          <h2 class="section-title" data-aos="fade-down">The Food Menu</h2>
          <p class="section-subtitle-custom" data-aos="fade-down">Explore our extensive and authentic Italian selections</p>

          {/* FILTERS */}
          <div class="filter-container d-flex justify-content-center flex-wrap gap-2 mb-5" data-aos="fade-down">
            <button class={`btn-filter ${selectedCategory()==='all'?'active':''}`} onClick={() => setSelectedCategory('all')}>All Menu</button>
            <Show when={specials().length>0}>
              <button class={`btn-filter specials ${selectedCategory()==='specials'?'active':''}`} onClick={() => setSelectedCategory('specials')}>
                <i class="fas fa-star" style="margin-right:6px;"></i> Specials
              </button>
            </Show>
            <button class={`btn-filter ${selectedCategory()==='nibbles'?'active':''}`} onClick={() => setSelectedCategory('nibbles')}>Nibbles</button>
            <button class={`btn-filter ${selectedCategory()==='starters'?'active':''}`} onClick={() => setSelectedCategory('starters')}>Starters</button>
            <button class={`btn-filter ${selectedCategory()==='pizza'?'active':''}`} onClick={() => setSelectedCategory('pizza')}>Pizze & Calzoni</button>
            <button class={`btn-filter ${selectedCategory()==='pasta'?'active':''}`} onClick={() => setSelectedCategory('pasta')}>Pasta</button>
            <button class={`btn-filter ${selectedCategory()==='risotto'?'active':''}`} onClick={() => setSelectedCategory('risotto')}>Risotti</button>
            <button class={`btn-filter ${selectedCategory()==='ravioli'?'active':''}`} onClick={() => setSelectedCategory('ravioli')}>Ravioli</button>
            <button class={`btn-filter ${selectedCategory()==='mains'?'active':''}`} onClick={() => setSelectedCategory('mains')}>Mains</button>
            <button class={`btn-filter ${selectedCategory()==='salads'?'active':''}`} onClick={() => setSelectedCategory('salads')}>Salads</button>
            <button class={`btn-filter ${selectedCategory()==='sides'?'active':''}`} onClick={() => setSelectedCategory('sides')}>Sides</button>
            <button class={`btn-filter dietary-filter ${selectedCategory()==='vegetarian'?'active':''}`} onClick={() => setSelectedCategory('vegetarian')}><i class="fas fa-leaf me-1"></i> Vegetarian</button>
            <button class={`btn-filter dietary-filter ${selectedCategory()==='vegan'?'active':''}`} onClick={() => setSelectedCategory('vegan')}>
              <i class="fas fa-seedling me-1"></i> Vegan
            </button>
          </div>

          {/* MENU GRID */}
          <div class="menu-grid" style={{ display:"flex","justify-content":"center","flex-wrap":"wrap" }}>
            <For each={filteredMenu()}>{(item) => (
              <div class="menu-card single-center" data-aos="fade-up">
                <Show when={item.category==='specials'}>
                  <div class="special-badge"><i class="fas fa-star"></i> Specials</div>
                </Show>

                <Show when={item.img} fallback={
                  <div class="menu-card-icon-placeholder">
                    <i class={getCategoryIcon(item.category)}></i>
                  </div>
                }>
                  <img src={item.img} class="menu-card-image" alt={item.title} />
                </Show>

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

      {/* GALLERY */}
      <section class="section-padding" id="gallery">
        <div class="container-custom">
          <h2 class="section-title" data-aos="fade-down" style={{ color:"#ffffff","text-shadow":"1px 1px 10px rgba(0,0,0,0.5)" }}>Our Atmosphere</h2>
          <div class="gallery-grid" data-aos="fade-up">
            <For each={galleryItems}>{(g) => (
              <div class="gallery-item">
                <img class="gallery-image" src={g.img} alt={g.text} />
                <div class="gallery-overlay"><p class="gallery-text">{g.text}</p></div>
              </div>
            )}</For>
          </div>
        </div>
      </section>

      <SpecialDish />

      {/* REVIEWS */}
      <section class="section-padding" id="reviews">
        <div class="container-custom">
          <div class="content-card-panel" data-aos="fade-up">
            <h2 class="section-title">What Our Guests Say</h2>
            <For each={reviews}>{(rev) => (
              <div class="review-item">
                <div class="stars">★★★★★</div>
                <div class="review-author">{rev.author}</div>
                <p class="review-text">{rev.text}</p>
              </div>
            )}</For>
          </div>
        </div>
      </section>

      {/* RESERVATION */}
      <section class="section-padding" id="reservation">
        <div class="container-custom">
          <div class="reservation-box" data-aos="zoom-in">

            <Show when={!formSubmitted()} fallback={
              <div class="success-message" data-aos="fade-up">
                <i class="fas fa-check-circle success-icon"></i>
                <h3>Thank You!</h3>
                <p style="font-size:1.2rem;color:#333;margin-bottom:1rem;">Your booking request has been sent successfully.</p>
                <button class="btn-secondary-custom" onClick={() => setFormSubmitted(false)} style={{ color:"var(--primary)","border-color":"var(--primary)","margin-left":"0" }}>
                  Book Another Table
                </button>
              </div>
            }>

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
                  <label for="email">Email Address *</label>
                  <input type="email" id="email" name="email" required placeholder="name@example.com" />
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
                  <input type="date" id="date" name="date" required min={getTodayDateString()} value={bookingDate()} onChange={handleDateChange} />
                </div>

                <Show when={bookingDate() && availableTimeSlots().allDay.length===0}>
                  <div>
                    <label for="service">Service *</label>
                    <select id="service" name="service" required value={bookingService()} onChange={(e)=>{setBookingService(e.target.value);setBookingTime("");}}>
                      <option value="" disabled selected>-- Select Lunch or Dinner --</option>
                      <option value="lunch">Lunch Service</option>
                      <option value="dinner">Dinner Service</option>
                    </select>
                  </div>
                </Show>

                <div class={availableTimeSlots().allDay.length>0?"form-group-full":""}>
                  <label for="time">Preferred Time Slot *</label>
                  <select id="time" name="time" required disabled={timeSlotsForUI().slots.length===0} value={bookingTime()} onChange={(e)=>setBookingTime(e.target.value)}>

                    <Switch>
                      <Match when={timeSlotsForUI().type==="no-date"}>
                        <option value="" disabled selected>Please select a date first</option>
                      </Match>
                      <Match when={timeSlotsForUI().type==="allDay"}>
                        <option value="" disabled selected>-- Select Sunday Time Slot --</option>
                      </Match>
                      <Match when={timeSlotsForUI().type==="no-service"}>
                        <option value="" disabled selected>-- Select service first --</option>
                      </Match>
                      <Match when={true}>
                        <option value="" disabled selected>-- Select time slot --</option>
                      </Match>
                    </Switch>

                    <For each={timeSlotsForUI().slots}>{(slot)=>(
                      <option value={slot}>{slot}</option>
                    )}</For>

                  </select>
                </div>

                <div class="form-group-full">
                  <label for="notes">Special Requests / Allergies</label>
                  <textarea id="notes" name="notes" rows="3" placeholder="Let us know if you have any food allergies or seating preferences..."></textarea>
                </div>

                <div class="form-group-full text-center mt-3">
                  <button type="submit" disabled={isSending()} class="btn-primary-custom" style={{ width:"100%",padding:"16px 0",fontSize:"1.1rem" }}>
                    {isSending() ? "Sending Request..." : "Submit Reservation Request"}
                  </button>
                </div>

              </form>
            </Show>
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
