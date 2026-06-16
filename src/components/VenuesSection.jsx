import { createSignal, onMount, For } from "solid-js";

function VenueCarousel(props) {
  const [index, setIndex] = createSignal(0);
  const images = props.images;

  onMount(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  });

  return (
    <div class="venue-image-wrapper" style="position: relative; overflow: hidden;">
      <For each={images}>{(src, i) => (
        <img 
          src={src} 
          class="venue-image" 
          style={{ 
            display: i() === index() ? "block" : "none", 
            width: "100%", 
            height: "300px", 
            "object-fit": "cover"
          }} 
          alt={props.alt} 
        />
      )}</For>
      <span class="venue-badge">{props.badge}</span>
    </div>
  );
}

function VenuesSection() {
  const corkImages = [
    "https://raw.githubusercontent.com/Alftakeaway/DolceVita/main/assets/c1.webp",
    "https://raw.githubusercontent.com/Alftakeaway/DolceVita/main/assets/c3.webp",
    "https://raw.githubusercontent.com/Alftakeaway/DolceVita/main/assets/c7.webp",
    "https://raw.githubusercontent.com/Alftakeaway/DolceVita/main/assets/c10.webp"
  ];

  return (
    <section class="section-padding" id="our-group">
      <div class="container-custom">
        <div class="content-card-panel" data-aos="fade-up">
          <h2 class="section-title">The Dolce Vita Family</h2>
          <p class="section-subtitle-custom">Discover our other premium venues in Wooburn Green</p>
          
          <div class="venues-grid">
            {/* THE CORK WINE BAR - CAROUSEL DINGHAM */}
            <div class="venue-card" data-aos="fade-up" data-aos-delay="100">
              <VenueCarousel images={corkImages} badge="Wine & Cocktails" alt="The Cork Wine Bar" />
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
                <img src="https://raw.githubusercontent.com/Alftakeaway/DolceVita/main/assets/green.jpg" class="venue-image" alt="Green Delight" />
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
  );
}

export default VenuesSection;