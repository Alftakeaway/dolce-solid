import { For } from "solid-js";

export default function CateringPackages() {
  const cateringPackages = [
    {
      id: 1,
      title: "Buffet Compleanno",
      price: "£349",
      description: "Celebra con stile con il nostro buffet completo, perfetto per feste indimenticabili",
      image: "https://static.wixstatic.com/media/11062b_cc718cb2696e41cc8e76a4715c50cf7f~mv2.jpg/v1/fill/w_670,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_cc718cb2696e41cc8e76a4715c50cf7f~mv2.jpg",
      includes: [
        "Antipasti assortiti",
        "Piatti caldi selezionati",
        "Dolci e torte",
        "Bevande incluse",
        "Decorazioni tavoli",
        "Tavoli e sedie"
      ],
      serves: "20-40 persone",
      popular: false
    },
    {
      id: 2,
      title: "Pacchetto Matrimonio",
      price: "£699",
      description: "Il giorno più importante merita il nostro servizio catering gourmet esclusivo",
      image: "https://prontocateringsd.com/wp-content/uploads/DISPLAY-1-768x512.jpg",
      includes: [
        "Antipasti gourmet",
        "Piatti principali premium",
        "Contorni raffinati",
        "Vini selezionati",
        "Torta nuziale personalizzata",
        "Servizio camerieri completo"
      ],
      serves: "50-100 persone",
      popular: false
    },
    {
      id: 3,
      title: "Buffet Serata",
      price: "£499",
      description: "Serate eleganti e conviviali con il nostro buffet raffinato e servizio professionale",
      image: "https://www.culinaryproductionsbr.com/wp-content/uploads/2020/08/Catering-Display-for-Birthday-Party-Baton-Rouge.jpg",
      includes: [
        "Antipasti e stuzzichini",
        "Piatti caldi premium",
        "Selezione formaggi e salumi",
        "Vini e bevande",
        "Dolci assortiti",
        "Camerieri dedicati"
      ],
      serves: "30-60 persone",
      popular: true
    }
  ];

  return (
    <section class="section-padding" id="catering">
      <div class="container-custom">
        <h2 class="section-title" data-aos="fade-down">Servizi Catering</h2>
        <p class="section-subtitle-custom" data-aos="fade-down">Rendi memorabile il tuo evento con i nostri pacchetti catering esclusivi</p>
        
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
                  <div class="catering-price">{pkg.price}</div>
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
                    Seleziona Pacchetto
                  </button>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
