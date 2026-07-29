import { useState } from 'react'

export default function Contact() {
  // formData holds what's currently typed into each field
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  // status holds the result of the last submit attempt, so we know
  // what message (if any) to show the user
  const [status, setStatus] = useState(null) // null | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('')

  function handleChange(e) {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      setStatusMessage('Please fill in all required fields')
      return
    }

    if (!isValidEmail(formData.email)) {
      setStatus('error')
      setStatusMessage('Please enter a valid email address')
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('success')
        setStatusMessage('Thank you! We will get back to you soon.')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
        setStatusMessage('An error occurred. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setStatusMessage('Error submitting form: ' + error.message)
    }
  }

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h1 className="section-title">CONTACT US</h1>
        <p className="section-subtitle">Get in touch with us today</p>

        {status && (
          <div className={`form-message ${status}`} style={{ display: 'block' }}>
            {statusMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea id="message" value={formData.message} onChange={handleChange} required></textarea>
          </div>

          <button type="submit" className="btn btn-primary btn-large">SEND MESSAGE</button>
        </form>

        <div className="contact-info" style={{ marginTop: '3rem', textAlign: 'center' }}>
          <h3>Other Ways to Reach Us</h3>
          <p>📞 (555) 123-4567</p>
          <p>✉️ info@worldbudososakai.com</p>
          <p>📍 123 Dojo Street, Your City, State 12345</p>
        </div>
      </div>
    </section>
  )
}
