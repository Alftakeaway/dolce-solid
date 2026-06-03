import { createSignal, onMount, For } from "solid-js";

function HeroSection(props) {
  const [currentHeroIndex, setCurrentHeroIndex] = createSignal(0);
  
  // Auto-rotate carousel ogni 5 secondi
  onMount(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % props.heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  });

  return (
    <section class="hero" id="home">
      <For each={props.heroImages}>
        {(img, index) => (
          <div 
            class={`hero-bg-image ${index() === currentHeroIndex() ? 'active' : ''}`}
            style={{ "background-image": `url('${img}')`, "z-index": index() === currentHeroIndex() ? 2 : 1 }}
          />
        )}
      </For>
     
      <div class="hero-content" data-aos="fade-up" style={{ "z-index": 10 }}>
        <h1 class="hero-title">DOLCE VITA</h1>
        <p class="hero-subtitle">Authentic Italian dining in the heart of Wooburn Green</p>
        <div class="hero-buttons">
          <a href="#reservation" class="btn-primary-custom">Book Now</a>
          <a href={props.menuLink} target="_blank" class="btn-secondary-custom">Full Menu</a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
