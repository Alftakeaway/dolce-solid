import { createSignal, createMemo, For } from "solid-js";

function MenuSection(props) {
  const [selectedCategory, setSelectedCategory] = createSignal("starters");

  // Dati menu passati come props
  const menuItems = props.menuItems;

  const filteredMenu = createMemo(() => {
    if (selectedCategory() === "all") return menuItems;
    if (selectedCategory() === "vegetarian") return menuItems.filter(item => item.isVegetarian);
    if (selectedCategory() === "vegan") return menuItems.filter(item => item.isVegan);
    return menuItems.filter(item => item.category === selectedCategory());
  });

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

  return (
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

        <div class="menu-grid" style={{ display: "flex", "justify-content": "center", "flex-wrap": "wrap" }}>
          <For each={filteredMenu()}>{(item) => (
            <div class="menu-card single-center" data-aos="fade-up">
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
  );
}

export default MenuSection;
