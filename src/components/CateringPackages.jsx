import { For } from "solid-js";

export default function CateringPackages() {
  const cateringPackages = [
    {
      id: 1,
      title: "Birthday Buffet",
      price: "349",
      currency: "£",
      description: "Celebrate in style with our complete buffet selection",
      image: "https://static.wixstatic.com/media/11062b_cc718cb2696e41cc8e76a4715c50cf7f~mv2.jpg/v1/fill/w_670,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_cc718cb2696e41cc8e76a4715c50cf7f~mv2.jpg",
      includes: [
        "Assorted antipasti platters",
        "Selection of 3 signature pizzas",
        "Baked penne and lasagna",
        "Sauteed vegetables with almonds",
        "Mixed garden salad",
        "Chicken piccata or beef meatballs",
        "Fresh fruit display",
        "Pastry selection from our in-house bakery",
        "Soft drinks and water",
        "Tables and chairs",
        "Optional: Live acoustic music - add £150"
      ],
      serves: "20-40 people",
      popular: false
    },
    {
      id: 2,
      title: "Wedding Package",
      price: "699",
      currency: "£",
      description: "Your special day deserves our exclusive gourmet service",
      image: "https://prontocateringsd.com/wp-content/uploads/DISPLAY-1-768x512.jpg",
      includes: [
        "Premium gourmet antipasti selection",
        "Selection of 5 premium pizzas",
        "Creamy sun dried tomato pasta",
        "Penne with Italian sausage and peppers",
        "Risotto with mushrooms and truffle",
        "Chicken marsala with white wine sauce",
        "Pan-seared fish with lemon butter",
        "Roasted seasonal vegetables",
        "Caprese salad with fresh mozzarella",
        "Assorted Italian cheeses and cured meats",
        "Custom wedding cake from our bakery",
        "Macarons and petit fours",
        "Selected Italian wines",
        "Prosecco for toasts",
        "Full service waiting staff",
        "Tables, chairs and linens",
        "Add live music ensemble - from £200",
        "Add premium cocktail bar - from £250"
      ],
      serves: "50-100 people",
      popular: false
    },
    {
      id: 3,
      title: "Evening Buffet",
      price: "499",
      currency: "£",
      description: "Elegant evenings with our refined buffet and professional service",
      image: "https://www.culinaryproductionsbr.com/wp-content/uploads/2020/08/Catering-Display-for-Birthday-Party-Baton-Rouge.jpg",
      includes: [
        "Antipasti and starters selection",
        "Selection of 4 artisan pizzas",
        "Spaghetti bolognese or penne arrabbiata",
        "Creamy mushroom and herb pasta",
        "Premium hot dishes (beef or chicken)",
        "Sauteed fish fillets",
        "Italian cheese and cured meat board",
        "Mediterranean vegetable selection",
        "Mixed salad with balsamic dressing",
        "Bruschetta and crostini",
        "Assorted desserts from our bakery",
        "Tiramisu and panna cotta",
        "Italian wines (red and white)",
        "Sparkling water and soft drinks",
        "Dedicated waiting staff",
        "Professional setup and service",
        "Tables, chairs and elegant linens",
        "Optional: Live acoustic guitarist - add £180",
        "Optional: Signature cocktail bar - add £280"
      ],
      serves: "30-60 people",
      popular: true
    }
  ];

  return (
    <section class="section-padding" id="catering">
      <div class="container-custom">
        <h2 class="section-title" data-aos="fade-down">Catering Services</h2>
        <p class="section-subtitle-custom" data-aos="fade-down">Make your event memorable with our exclusive catering packages featuring artisan pizzas, fresh pasta and pastries from our in-house bakery</p>
        
        <div class="catering-grid" data-aos="fade-up">
          <For each={cateringPackages}>
            {(pkg) => (
              <div class="catering-card">
                {pkg.popular && <div class="catering-badge">Most Popular</div>}
                
                <div class="catering-image">
                  <img src={pkg.image} alt={pkg.title} />
                </div>
                
                <div class="catering-content">
                  <h3 class="catering-title">{pkg.title}</h3>
                  <div class="catering-price">{pkg.currency}{pkg.price}</div>
                  <p class="catering-description">{pkg.description}</p>
                  
                  <div class="catering-includes">
                    <ul>
                      <For each={pkg.includes}>
                        {(item) => <li>{item}</li>}
                      </For>
                    </ul>
                  </div>
                  
                  <div class="catering-serves">{pkg.serves}</div>
                  
                  <button class="btn-primary-custom" style="width: 100%; margin-top: 1.5rem;">
                    Request Quote
                  </button>
                </div>
              </div>
            )}
          </For>
        </div>

        <div class="catering-info" data-aos="fade-up" style="margin-top: 3rem; text-align: center;">
          <p style="font-size: 1.05rem; color: #555; line-height: 1.8; max-width: 700px; margin: 0 auto;">
            All packages include setup and professional service. Custom menus available upon request. 
            <strong>24 hours advance notice required.</strong> Live music and cocktail bar options available for all packages.
          </p>
        </div>
      </div>
    </section>
  );
}
