import ContactForm from '../components/ContactForm.jsx'

export default function Contact() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h1 className="section-title">CONTACT US</h1>
        <p className="section-subtitle">Get in touch with us today</p>

        <ContactForm />

        <div className="contact-info" style={{ marginTop: '3rem', textAlign: 'center' }}>
          <h3>Other Ways to Reach Us</h3>
          <p><a href="tel:+19095507670">📞 (909) 550-76-70</a></p>
          <p><a href="mailto:hanshi18@gmail.com">✉️ hanshi18@gmail.com</a></p>
          <address>📍 Jessie Turner Health &amp; Fitness Community Center<br />15556 Summit Avenue<br />Fontana, CA. U.S.A.</address>
          <p className="contact-hours"><strong>Class Hours:</strong><br />Tue &amp; Thu:<br />4:00 PM–5:00 PM<br />5:00 PM–6:00 PM<br />6:00 PM–7:00 PM</p>
          <div className="contact-social-links">
            <a href="https://www.facebook.com/sosakai54/" target="_blank" rel="noreferrer">Facebook: Sosa-Kai 54</a>
            <a href="https://www.facebook.com/budososakai/" target="_blank" rel="noreferrer">Facebook: Budō Sosa-Kai</a>
            <a href="https://www.instagram.com/budososakai/" target="_blank" rel="noreferrer">Instagram: Budō Sosa-Kai</a>
            <a href="https://www.instagram.com/sr.jorgesosa/" target="_blank" rel="noreferrer">Instagram: Sr. Jorge Sosa</a>
          </div>
        </div>
      </div>
    </section>
  )
}
