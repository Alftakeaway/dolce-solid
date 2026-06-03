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
      {/* Hero background images - carousel */}
      <For each={props.heroImages}>
        {(img, index) => (
          <div 
            class={`hero-bg-image ${index() === currentHeroIndex() ? 'active' : ''}`}
            style={{ "background-image": `url(${img})` }}
          ></div>
        )}
      </For>

      {/* Hero content - overlay text e buttons */}
      <div class="hero-content">
        <h1 class="hero-title">DOLCE VITA</h1>
        <p class="hero-subtitle">Authentic Italian dining in the heart of Wooburn Green</p>
        <div class="hero-buttons">
          <a href="#reservation" class="btn-primary-custom">Book a Table</a>
          <a href={props.menuLink} class="btn-secondary-custom">View Menu</a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
