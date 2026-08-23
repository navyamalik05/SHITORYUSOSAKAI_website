import { useState } from 'react'

const emptyForm = { name: '', email: '', phone: '', message: '' }

export default function ContactForm({ compact = false, idPrefix = 'contact', onSuccess }) {
  const [formData, setFormData] = useState(emptyForm)
  const [status, setStatus] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSending(true)
    setStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) throw new Error(result.error || 'We could not send your message. Please try again.')

      setStatus('success')
      setStatusMessage('Thank you! Your message has been emailed to Hanshi Hugo.')
      setFormData(emptyForm)
      onSuccess?.()
    } catch (error) {
      setStatus('error')
      setStatusMessage(error.message)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <form className={compact ? 'contact-form compact' : 'contact-form'} onSubmit={handleSubmit}>
      {status && <div className={`form-message ${status}`}>{statusMessage}</div>}
      <div className="form-group"><label htmlFor={`${idPrefix}-name`}>Full Name *</label><input type="text" id={`${idPrefix}-name`} name="name" value={formData.name} onChange={handleChange} maxLength="100" required /></div>
      <div className="form-group"><label htmlFor={`${idPrefix}-email`}>Email *</label><input type="email" id={`${idPrefix}-email`} name="email" value={formData.email} onChange={handleChange} maxLength="120" required /></div>
      <div className="form-group"><label htmlFor={`${idPrefix}-phone`}>Phone</label><input type="tel" id={`${idPrefix}-phone`} name="phone" value={formData.phone} onChange={handleChange} maxLength="30" /></div>
      <div className="form-group"><label htmlFor={`${idPrefix}-message`}>Message *</label><textarea id={`${idPrefix}-message`} name="message" value={formData.message} onChange={handleChange} maxLength="5000" required></textarea></div>
      <button type="submit" className="btn btn-primary btn-large" disabled={isSending}>{isSending ? 'SENDING…' : 'SEND MESSAGE'}</button>
    </form>
  )
}
