import { Link, useLocation } from 'react-router-dom'

const aboutSections = [
  { label: 'HISTORY', to: '/history', section: 'history' },
  {
    label: 'PHILOSOPHY AND PRINCIPLES OF WORLD BUDŌ SOSA-KAI',
    to: '/about#philosophy-principles',
    section: 'philosophy',
  },
  {
    label: 'SOSA-KAI TECHNICAL STAFF',
    to: '/about#technical-staff',
    section: 'staff',
  },
]

export default function AboutSectionNav() {
  const { pathname, hash } = useLocation()

  const activeSection = pathname === '/history'
    ? 'history'
    : hash === '#technical-staff'
      ? 'staff'
      : 'philosophy'

  return (
    <nav className="about-section-nav" aria-label="About Us sections">
      <div className="container about-section-tabs">
        {aboutSections.map(({ label, to, section }) => {
          const isActive = activeSection === section

          return (
            <Link
              className={`about-section-tab ${isActive ? 'active' : ''}`}
              to={to}
              aria-current={isActive ? 'page' : undefined}
              key={section}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
