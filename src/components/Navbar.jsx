import { createSignal } from "solid-js";

function Navbar() {
  // Il tuo interruttore true/false per il menu mobile.
  // Cambialo temporaneamente in 'true' se vuoi vederlo sempre aperto durante i test!
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#home">
          <img src="assets/dolce_vita_logo_no_bg1.png" alt="Dolce Vita" class="navbar-logo" />
        </a>
        
        {/* Tasto Hamburger: al click inverte lo stato del Signal */}
        <button 
          class="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen())}
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        {/* Se isOpen() è true, Solid inietta la classe 'show' di Bootstrap che apre il menu */}
        <div class={`collapse navbar-collapse ${isOpen() ? 'show' : ''}`} id="navbarNav">
          <ul class="navbar-nav ms-auto">
            {/* Cliccando su qualsiasi voce, l'interruttore torna su 'false' e il menu si chiude da solo */}
            <li class="nav-item"><a class="nav-link" href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
            <li class="nav-item"><a class="nav-link" href="#about" onClick={() => setIsOpen(false)}>Our Story</a></li>
            <li class="nav-item"><a class="nav-link" href="#menu" onClick={() => setIsOpen(false)}>Menu</a></li>
            <li class="nav-item"><a class="nav-link" href="#gallery" onClick={() => setIsOpen(false)}>Atmosphere</a></li>
            <li class="nav-item"><a class="nav-link" href="#reviews" onClick={() => setIsOpen(false)}>Reviews</a></li>
            <li class="nav-item"><a class="nav-link" href="#reservation" onClick={() => setIsOpen(false)}>Book a Table</a></li>
            <li class="nav-item"><a class="nav-link" href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;