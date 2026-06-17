import { createSignal } from "solid-js";

function Navbar() {
  // Ecco il tuo famoso interruttore true/false ripristinato!
  const [showMenu, setShowMenu] = createSignal(true);

  return (
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#home">
          <img src="assets/dolce_vita_logo_no_bg1.png" alt="Dolce Vita" class="navbar-logo" />
        </a>
        
        {/* Al click sul pulsante mobile, invertiamo lo stato dell'interruttore */}
        <button 
          class="navbar-toggler" 
          type="button" 
          onClick={() => setShowMenu(!showMenu())}
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        {/* IL TRUCCO: Se showMenu() è true, forziamo il display su "block" tramite style.
          Questo scavalca qualsiasi blocco o oscuramento precedente.
        */}
        <div 
          class="collapse navbar-collapse" 
          id="navbarNav"
          style={{ display: showMenu() ? "block" : "" }}
        >
          <ul class="navbar-nav ms-auto">
            {/* Quando il cliente clicca su una voce, l'interruttore torna su false e il menu si chiude */}
            <li class="nav-item"><a class="nav-link" href="#home" onClick={() => setShowMenu(false)}>Home</a></li>
            <li class="nav-item"><a class="nav-link" href="#about" onClick={() => setShowMenu(false)}>Our Story</a></li>
            <li class="nav-item"><a class="nav-link" href="#menu" onClick={() => setShowMenu(false)}>Menu</a></li>
            <li class="nav-item"><a class="nav-link" href="#gallery" onClick={() => setShowMenu(false)}>Atmosphere</a></li>
            <li class="nav-item"><a class="nav-link" href="#reviews" onClick={() => setShowMenu(false)}>Reviews</a></li>
            <li class="nav-item"><a class="nav-link" href="#reservation" onClick={() => setShowMenu(false)}>Book a Table</a></li>
            <li class="nav-item"><a class="nav-link" href="#contact" onClick={() => setShowMenu(false)}>Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;