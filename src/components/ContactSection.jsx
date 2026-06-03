function ContactSection() {
  return (
    <section class="section-padding" id="contact">
      <div class="container-custom">
        <div class="content-card-panel" data-aos="fade-up">
          <h2 class="section-title">Contact Us</h2>
          <div class="contact-info">
            <div>
              <i class="fas fa-map-marker-alt contact-icon"></i>
              <h3>Address</h3>
              <p>53 The Green<br />Wooburn Green, HP10 0EU</p>
              <a href="https://maps.google.com/?q=Dolce+Vita+Wooburn+Green" target="_blank" class="btn-action maps">
                <i class="fas fa-map-marked-alt"></i> Get Directions
              </a>
            </div>
            <div>
              <i class="fas fa-phone-alt contact-icon"></i>
              <h3>Phone</h3>
              <p>01628 527942<br />Tue-Sun: Lunch & Dinner</p>
              <a href="tel:01628527942" class="btn-action phone">
                <i class="fas fa-phone"></i> Call Us
              </a>
            </div>
            <div>
              <i class="fas fa-envelope contact-icon"></i>
              <h3>Email</h3>
              <p>info@dolcevitawooburn.co.uk</p>
              <a href="mailto:info@dolcevitawooburn.co.uk?subject=Inquiry%20from%20Website" class="btn-action email">
                <i class="fas fa-paper-plane"></i> Write Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
