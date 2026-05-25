// --- MENU ITEMS COMPLETO (FINO ALLA FINE DELLA PASTA) ---
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
  { id: 40, title: "Penne al Forno", category: "pasta", price: "£19.00", desc: "Penne with mushrooms, crispy guanciale, spinach, garlic and parsley, baked with breadcrumbs and Parmigiano Reggiano.", img: "", isVegetarian: false, isVegan: false }
];
  // RISOTTI

  { id: 41, title: "Risotto Gorgonzola & Salsiccia", category: "risotto", price: "£19.00", desc: "Carnaroli rice with crumbled Italian pork sausage and spinach, creamed with gorgonzola and Parmigiano Reggiano.", img: "", isVegetarian: false, isVegan: false },
  { id: 42, title: "Risotto Asparagi & Funghi", category: "risotto", price: "£18.00", desc: "Carnaroli rice with mushrooms, asparagus, onion and parsley, creamed with Parmigiano Reggiano.", img: "", isVegetarian: true, isVegan: false },
  { id: 43, title: "Risotto Frutti di Mare", category: "risotto", price: "£21.00", desc: "Carnaroli rice with mixed seafood, prawns, squid, mussels and octopus cooked in a white wine, garlic and tomato sauce.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/Risotto%20Frutti%20Di%20Mare.webp", isVegetarian: false, isVegan: false },

  // RAVIOLI
  { id: 44, title: "Ravioli ai Porcini", category: "ravioli", price: "£23.00", desc: "Porcini mushroom-filled ravioli, sautéed in a fragrant butter and sage sauce, finished with Parmigiano Reggiano.", img: "", isVegetarian: true, isVegan: false },
  { id: 45, title: "Ravioli Astice & Granchio", category: "ravioli", price: "£26.00", desc: "Lobster filled-ravioli toasted in a rich velvety crab sauce, with cherry tomatoes, citrus hints and aromatic herbs.", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/ravioli%20astice%20granchio.webp", isVegetarian: false, isVegan: false },
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
  { id: 56, title: "Dolce Vita Sides", category: "sides", price: "£5.00", desc: "French fries, Tuscan potatoes, Rocket and Parmesan, Garlic spinach, Sautéed mushrooms, Mixed vegetables, Side salad, or Tomatoes & red onions. (Side bread £4.00)", img: "https://cdn.jsdelivr.net/gh/Alftakeaway/DolceVita@main/assets/side1.webp", isVegetarian: true, isVegan: false },

    // --- FINE MENU ITEMS ---
];

function App() {

  // --- AOS INIT ---
  onMount(() => {
    AOS.init({ duration: 800, once: true });
  });

  // --- SIGNALS ---
  const [selectedCategory, setSelectedCategory] = createSignal("all");
  const [bookingDate, setBookingDate] = createSignal("");
  const [bookingService, setBookingService] = createSignal("");
  const [bookingTime, setBookingTime] = createSignal("");
  const [isSending, setIsSending] = createSignal(false);
  const [formSubmitted, setFormSubmitted] = createSignal(false);

  // --- DATE UTILITY ---
  const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // --- TIME SLOTS ---
  const timeSlots = {
    lunch: ["12:00", "12:30", "13:00", "13:30", "14:00"],
    dinner: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"],
    sunday: ["12:00", "12:30", "13:00", "13:30", "14:00", "18:00", "18:30", "19:00"]
  };

  const availableTimeSlots = createMemo(() => {
    if (!bookingDate()) return { allDay: [], lunch: [], dinner: [] };

    const date = new Date(bookingDate());
    const isSunday = date.getDay() === 0;

    return isSunday
      ? { allDay: timeSlots.sunday, lunch: [], dinner: [] }
      : { allDay: [], lunch: timeSlots.lunch, dinner: timeSlots.dinner };
  });

  const timeSlotsForUI = createMemo(() => {
    if (!bookingDate()) return { type: "no-date", slots: [] };

    if (availableTimeSlots().allDay.length > 0)
      return { type: "allDay", slots: availableTimeSlots().allDay };

    if (!bookingService()) return { type: "no-service", slots: [] };

    return {
      type: bookingService(),
      slots: availableTimeSlots()[bookingService()]
    };
  });

  // --- FILTER MENU ---
  const filteredMenu = createMemo(() => {
    if (selectedCategory() === "all") return menuItems;
    if (selectedCategory() === "vegetarian") return menuItems.filter(i => i.isVegetarian);
    if (selectedCategory() === "vegan") return menuItems.filter(i => i.isVegan);
    return menuItems.filter(i => i.category === selectedCategory());
  });
  return (
    <div class="app-container">

      {/* HERO SECTION */}
      <section id="hero" class="hero-section" data-aos="fade-in">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1 class="hero-title">Dolce Vita</h1>
          <p class="hero-subtitle">Authentic Italian Cuisine in Wooburn Green</p>
          <a href="#reservation" class="hero-btn">Book a Table</a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" class="about-section" data-aos="fade-up">
        <div class="about-content">
          <h2>About Us</h2>
          <p>
            At Dolce Vita, we bring the true flavours of Italy to your table.
            Fresh ingredients, traditional recipes, and a warm atmosphere
            inspired by the Italian way of life.
          </p>
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" class="menu-section" data-aos="fade-up">
        <h2 class="section-title">Our Menu</h2>

        {/* FILTER BUTTONS */}
        <div class="menu-filters">
          <button class={`btn-filter ${selectedCategory()==='all'?'active':''}`} onClick={() => setSelectedCategory('all')}>
            All
          </button>

          <button class={`btn-filter ${selectedCategory()==='nibbles'?'active':''}`} onClick={() => setSelectedCategory('nibbles')}>
            Nibbles
          </button>

          <button class={`btn-filter ${selectedCategory()==='starters'?'active':''}`} onClick={() => setSelectedCategory('starters')}>
            Starters
          </button>

          <button class={`btn-filter ${selectedCategory()==='pizza'?'active':''}`} onClick={() => setSelectedCategory('pizza')}>
            Pizza
          </button>

          <button class={`btn-filter ${selectedCategory()==='pasta'?'active':''}`} onClick={() => setSelectedCategory('pasta')}>
            Pasta
          </button>

          <button class={`btn-filter ${selectedCategory()==='risotto'?'active':''}`} onClick={() => setSelectedCategory('risotto')}>
            Risotti
          </button>

          <button class={`btn-filter ${selectedCategory()==='ravioli'?'active':''}`} onClick={() => setSelectedCategory('ravioli')}>
            Ravioli
          </button>

          <button class={`btn-filter ${selectedCategory()==='mains'?'active':''}`} onClick={() => setSelectedCategory('mains')}>
            Mains
          </button>

          <button class={`btn-filter ${selectedCategory()==='salads'?'active':''}`} onClick={() => setSelectedCategory('salads')}>
            Salads
          </button>

          <button class={`btn-filter ${selectedCategory()==='sides'?'active':''}`} onClick={() => setSelectedCategory('sides')}>
            Sides
          </button>

          <button class={`btn-filter dietary-filter ${selectedCategory()==='vegetarian'?'active':''}`} onClick={() => setSelectedCategory('vegetarian')}>
            Vegetarian
          </button>

          <button class={`btn-filter dietary-filter ${selectedCategory()==='vegan'?'active':''}`} onClick={() => setSelectedCategory('vegan')}>
            Vegan
          </button>
        </div>

        {/* MENU GRID */}
        <div class="menu-grid">
          <For each={filteredMenu()}>
            {(item) => (
              <div class="menu-card" data-aos="fade-up">
                <img src={item.img || "https://via.placeholder.com/400"} alt={item.title} class="menu-img" />
                <div class="menu-info">
                  <h3>{item.title}</h3>
                  <p class="menu-desc">{item.desc}</p>
                  <p class="menu-price">{item.price}</p>
                </div>
              </div>
            )}
          </For>
        </div>
      </section>

            {/* GALLERY SECTION */}
      <section id="gallery" class="gallery-section" data-aos="fade-up">
        <h2 class="section-title">Gallery</h2>

        <div class="gallery-grid">
          <For each={galleryItems}>
            {(item) => (
              <div class="gallery-item" data-aos="zoom-in">
                <img src={item.img} alt={item.text} />
                <p class="gallery-text">{item.text}</p>
              </div>
            )}
          </For>
        </div>
      </section>

      {/* SPECIAL DISH SECTION */}
      <section id="special" class="special-section" data-aos="fade-up">
        <SpecialDish />
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" class="reviews-section" data-aos="fade-up">
        <h2 class="section-title">What Our Guests Say</h2>

        <div class="reviews-container">
          <For each={reviews}>
            {(review) => (
              <div class="review-card" data-aos="fade-up">
                <p class="review-text">{review.text}</p>
                <p class="review-author">— {review.author}</p>
              </div>
            )}
          </For>
        </div>
      </section>

            {/* RESERVATION SECTION */}
      <section id="reservation" class="reservation-section" data-aos="fade-up">
        <h2 class="section-title">Book a Table</h2>

        <form
          class="reservation-form"
          onSubmit={(e) => {
            e.preventDefault();
            setIsSending(true);

            const templateParams = {
              date: bookingDate(),
              service: bookingService(),
              time: bookingTime(),
            };

            emailjs
              .send(
                "service_4q7xj0o",
                "template_4q7xj0o",
                templateParams,
                "p8JH8p8JH8p8JH8"
              )
              .then(() => {
                setIsSending(false);
                setFormSubmitted(true);
              })
              .catch(() => {
                setIsSending(false);
                alert("There was an error sending your booking. Please try again.");
              });
          }}
        >
          {/* DATE */}
          <div class="form-group">
            <label>Select a Date</label>
            <input
              type="date"
              min={getTodayDateString()}
              value={bookingDate()}
              onInput={(e) => {
                setBookingDate(e.target.value);
                setBookingService("");
                setBookingTime("");
              }}
            />
          </div>

          {/* SERVICE */}
          <Show when={bookingDate()}>
            <div class="form-group">
              <label>Choose Service</label>

              <Switch>
                <Match when={availableTimeSlots().allDay.length > 0}>
                  <select
                    value="allDay"
                    onInput={(e) => {
                      setBookingService("allDay");
                      setBookingTime("");
                    }}
                  >
                    <option value="allDay">All Day (Sunday)</option>
                  </select>
                </Match>

                <Match when={true}>
                  <select
                    value={bookingService()}
                    onInput={(e) => {
                      setBookingService(e.target.value);
                      setBookingTime("");
                    }}
                  >
                    <option value="">Select Service</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </Match>
              </Switch>
            </div>
          </Show>

          {/* TIME */}
          <Show when={bookingService()}>
            <div class="form-group">
              <label>Select Time</label>

              <Switch>
                <Match when={timeSlotsForUI().type === "allDay"}>
                  <select
                    value={bookingTime()}
                    onInput={(e) => setBookingTime(e.target.value)}
                  >
                    <option value="">Select Time</option>
                    <For each={timeSlotsForUI().slots}>
                      {(slot) => <option value={slot}>{slot}</option>}
                    </For>
                  </select>
                </Match>

                <Match when={timeSlotsForUI().type !== "allDay"}>
                  <select
                    value={bookingTime()}
                    onInput={(e) => setBookingTime(e.target.value)}
                  >
                    <option value="">Select Time</option>
                    <For each={timeSlotsForUI().slots}>
                      {(slot) => <option value={slot}>{slot}</option>}
                    </For>
                  </select>
                </Match>
              </Switch>
            </div>
          </Show>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            class="reservation-btn"
            disabled={isSending() || !bookingDate() || !bookingService() || !bookingTime()}
          >
            <Show when={!isSending()} fallback={"Sending..."}>
              Book Now
            </Show>
          </button>

          {/* SUCCESS MESSAGE */}
          <Show when={formSubmitted()}>
            <p class="success-message">Your booking request has been sent!</p>
          </Show>
        </form>
      </section>

           {/* CONTACT SECTION */}
      <section id="contact" class="contact-section" data-aos="fade-up">
        <h2 class="section-title">Contact Us</h2>

        <div class="contact-info">
          <p><strong>Address:</strong> 4 The Green, Wooburn Green, HP10 0EJ</p>
          <p><strong>Phone:</strong> 01628 521 277</p>
          <p><strong>Email:</strong> info@dolcevitawooburn.co.uk</p>
        </div>

        <div class="map-container" data-aos="zoom-in">
          <iframe
            title="Dolce Vita Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2441.640907425002!2d-0.706!3d51.588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48766f3b6e0e0e0f%3A0x123456789abcdef!2sDolce%20Vita%20Restaurant!5e0!3m2!1sen!2suk!4v1234567890"
            width="100%"
            height="350"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* FOOTER */}
      <footer class="footer">
        <p>© {new Date().getFullYear()} Dolce Vita — Authentic Italian Cuisine</p>
      </footer>

    </div>
  );
}

export default App;







