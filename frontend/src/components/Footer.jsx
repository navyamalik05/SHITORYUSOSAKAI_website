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
          <p>Mon-Fri: 4:00 PM - 8:00 PM</p>
          <p>Sat-Sun: 10:00 AM - 4:00 PM</p>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>📞 (555) 123-4567</p>
          <p>✉️ info@worldbudososakai.com</p>
          <p>📍 123 Dojo Street, Your City</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#" className="social-icon">Facebook</a>
            <a href="#" className="social-icon">Instagram</a>
            <a href="#" className="social-icon">YouTube</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} World Budō Sosa-Kai. All rights reserved.</p>
      </div>
    </footer>
  )
}
