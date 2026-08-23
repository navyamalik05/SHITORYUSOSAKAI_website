import { useEffect, useState } from 'react'
import ContactForm from './ContactForm.jsx'

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!window.sessionStorage.getItem('contactPopupDismissed')) setIsOpen(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined
    const handleEscape = (event) => { if (event.key === 'Escape') closeModal() }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  function closeModal() {
    window.sessionStorage.setItem('contactPopupDismissed', 'true')
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="contact-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal() }}>
      <section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <button className="contact-modal-close" type="button" aria-label="Close contact form" onClick={closeModal}>×</button>
        <p className="contact-modal-kicker">WORLD BUDŌ SOSA-KAI</p>
        <h2 id="contact-modal-title">Contact Us</h2>
        <p>Interested in classes or membership? Send Hanshi Hugo a message.</p>
        <ContactForm compact idPrefix="contact-popup" />
      </section>
    </div>
  )
}
