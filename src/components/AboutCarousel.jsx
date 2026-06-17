import { createSignal, onMount, For } from "solid-js";

function AboutCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = createSignal(0);

  const aboutImages = [
    "assets/capi.jpeg",
    "assets/vespa.webp",
    "assets/pizzaa.webp"
  ];

  onMount(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length);
    }, 5000);
    return () => clearInterval(timer);
  });

  return (
    <div class="about-image">
      <For each={aboutImages}>
        {(img, index) => (
          <img 
            src={img} 
            alt="Dolce Vita Story Image" 
            loading="lazy"
            style={{
              opacity: index() === currentImageIndex() ? 1 : 0,
              transition: "opacity 0.8s ease-in-out",
        
              top: 0,
              left: 0
            }}
          />
        )}
      </For>
    </div>
  );
}

export default AboutCarousel;