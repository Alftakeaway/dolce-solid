function Footer() {
  return (
    <footer>
      <div class="container-custom">
        <div class="social-links">
          <a href="https://www.facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/dolcevita_wooburn_green/" target="_blank">
            <i class="fab fa-instagram instagram-anim" style={{ display: "inline-block" }}></i>
          </a>
        </div>

        {/* Nuovi link legali */}
        <div class="footer-legal" style={{ "margin-top": "15px", "font-size": "0.8em" }}>
          <a href="/legal" target="_blank" rel="noopener noreferrer" style={{ "margin-right": "15px" }}>Privacy Policy</a>
          <a href="/legal" target="_blank" rel="noopener noreferrer" style={{ "margin-right": "15px" }}>Terms & Conditions</a>
          <a href="/legal" target="_blank" rel="noopener noreferrer">Cookie Policy</a>
        </div>

        <p>© 2026 <strong>Dolce Vita by Alfredo Forte</strong> - Authentic Italian Cuisine</p>
      </div>
    </footer>
  );
}

export default Footer;