export default function Legal() {
  // Stili in linea per mantenere il file autosufficiente
  const styles = {
    page: {
      "background-color": "#F4EADE", // Crema Avorio
      color: "#0D3B2E",             // Verde Bosco
      padding: "60px 20px",
      "font-family": "'Playfair Display', serif", // Ideale per lo stile elegante
      "line-height": "1.6"
    },
    container: {
      "max-width": "800px",
      margin: "0 auto"
    },
    heading: {
      color: "#C69B3C",             // Oro Brunito
      "border-bottom": "2px solid #C69B3C",
      "padding-bottom": "10px",
      "margin-bottom": "30px",
      "text-transform": "uppercase",
      "letter-spacing": "2px"
    },
    subHeading: {
      color: "#0D3B2E",
      "margin-top": "30px",
      "margin-bottom": "15px"
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Legal Information</h1>
        
        <section>
          <h2 style={styles.subHeading}>Privacy Policy</h2>
          <p>
            At Dolce Vita, we respect your privacy and are committed to protecting your personal data. 
            This policy outlines how we collect, use, and safeguard information provided through our 
            website and reservation services. We process data in compliance with UK GDPR regulations.
          </p>
        </section>

        <section>
          <h2 style={styles.subHeading}>Terms & Conditions</h2>
          <p>
            By accessing our website and placing reservations, you agree to comply with these terms. 
            Reservations are subject to availability. Please notify us of any cancellations at least 
            24 hours in advance to avoid potential charges.
          </p>
        </section>

        <section>
          <h2 style={styles.subHeading}>Cookie Policy</h2>
          <p>
            We use essential cookies to ensure our website functions correctly. By continuing to 
            browse our site, you agree to the use of these cookies to enhance your user experience 
            and track site performance.
          </p>
        </section>

        <div style={{ "margin-top": "50px", "text-align": "center" }}>
          <p>
            <strong>Dolce Vita by Alfredo Forte</strong><br />
            Authentic Italian Cuisine
          </p>
        </div>
      </div>
    </div>
  );
}