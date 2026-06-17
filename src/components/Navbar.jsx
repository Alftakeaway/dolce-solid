import { createSignal } from "solid-js";

function Navbar() {
  //  Interruttore true/false
  const [isOpen, setIsOpen] = createSignal(true);

  return (
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#home">
          <img src="assets/dolce_vita_logo_no_bg1.png" alt="Dolce Vita" class="navbar-logo" />
        </a>
        
        {/* Al click invertiamo il valore dell'interruttore */}
        <button 
          class="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen())}
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        {/* Se isOpen è true, Solid aggiunge la classe 'show' che apre il menu */}
        <div class={`collapse navbar-collapse ${isOpen() ? 'show' : ''}`} id="navbarNav">
          <ul class="navbar-nav ms-auto">
            {/* Aggiungendo onClick={() => setIsOpen(false)} il menu si chiude appena clicchi la voce! */}
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