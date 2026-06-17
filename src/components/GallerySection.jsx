function GallerySection() {
  return (
    <section class="section-padding" id="gallery">
      <div class="container-custom">
        <h2 class="section-title" data-aos="fade-down" style={{ color: "#ffffff", "text-shadow": "1px 1px 10px rgba(0,0,0,0.5)" }}>Our Atmosphere</h2>
        <div class="gallery-grid">
          {/* Nessun "loading=lazy", caricano tutte insieme all'avvio del sito */}
          <div class="gallery-item"><img class="gallery-image" src="assets/gallery1.webp" /><div class="gallery-overlay"><p class="gallery-text">Pasta al Pomodoro</p></div></div>
          <div class="gallery-item"><img class="gallery-image" src="assets/gallery2.webp" /><div class="gallery-overlay"><p class="gallery-text">Spaghetti al Basilico</p></div></div>
          <div class="gallery-item"><img class="gallery-image" src="assets/gallery3.webp" /><div class="gallery-overlay"><p class="gallery-text">Lasagna Casalinga</p></div></div>
          <div class="gallery-item"><img class="gallery-image" src="assets/gallery4.webp" /><div class="gallery-overlay"><p class="gallery-text">Antipasto Italiano</p></div></div>
          <div class="gallery-item"><img class="gallery-image" src="assets/gallery5.webp" /><div class="gallery-overlay"><p class="gallery-text">Pasta Fresca</p></div></div>
          <div class="gallery-item"><img class="gallery-image" src="assets/gallery6.webp" /><div class="gallery-overlay"><p class="gallery-text">Fresh Ingredients</p></div></div>
          <div class="gallery-item"><img class="gallery-image" src="assets/gallery7.webp" /><div class="gallery-overlay"><p class="gallery-text">Pizza Margherita</p></div></div>
          <div class="gallery-item"><img class="gallery-image" src="assets/gallery8.webp" /><div class="gallery-overlay"><p class="gallery-text">Dining Experience</p></div></div>
          <div class="gallery-item"><img class="gallery-image" src="assets/gallery9.webp" /><div class="gallery-overlay"><p class="gallery-text">Risotto alla Milanese</p></div></div>
        </div>
      </div>
    </section>
  );
}

export default GallerySection;