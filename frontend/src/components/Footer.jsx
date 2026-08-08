export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>World Budō Sosa-Kai</h3>
          <p>Preserving and promoting traditional Japanese martial arts through the principles of Budō.</p>
        </div>

        <div className="footer-section">
          <h4>Hours</h4>
          <p>Tue &amp; Thu:</p>
          <p>4:00 PM–5:00 PM</p>
          <p>5:00 PM–6:00 PM</p>
          <p>6:00 PM–7:00 PM</p>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p><a href="tel:+19095507670">📞 (909) 550-76-70</a></p>
          <p><a href="mailto:hanshi18@gmail.com">✉️ hanshi18@gmail.com</a></p>
          <address>📍 Jessie Turner Health &amp; Fitness Community Center<br />15556 Summit Avenue<br />Fontana, CA. U.S.A.</address>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://www.facebook.com/sosakai54/" target="_blank" rel="noreferrer" className="social-icon">Facebook: Sosa-Kai 54</a>
            <a href="https://www.facebook.com/budososakai/" target="_blank" rel="noreferrer" className="social-icon">Facebook: Budō Sosa-Kai</a>
            <a href="https://www.instagram.com/budososakai/" target="_blank" rel="noreferrer" className="social-icon">Instagram: Budō Sosa-Kai</a>
            <a href="https://www.instagram.com/sr.jorgesosa/" target="_blank" rel="noreferrer" className="social-icon">Instagram: Sr. Jorge Sosa</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} World Budō Sosa-Kai. All rights reserved.</p>
      </div>
    </footer>
  )
}
