import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  // menuOpen controls the mobile hamburger menu.
  // This replaces the old script.js code that toggled a CSS class by hand.
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`} id="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeMenu}>HOME</Link>
          </li>

          <li className="nav-item dropdown">
            <Link to="/about" className="nav-link" onClick={closeMenu}>
              ABOUT US
              <span className="dropdown-arrow"></span>
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/about#history" onClick={closeMenu}>History</Link></li>
              <li><Link to="/about#mission" onClick={closeMenu}>Mission</Link></li>
              <li><Link to="/about#founder" onClick={closeMenu}>Founder</Link></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link to="/programs" className="nav-link" onClick={closeMenu}>
              PROGRAMS
              <span className="dropdown-arrow"></span>
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/programs#karatedo" onClick={closeMenu}>KarateDō</Link></li>
              <li><Link to="/programs#kobudo" onClick={closeMenu}>Kōbudō</Link></li>
              <li><Link to="/programs#taijutsu" onClick={closeMenu}>Tai-Jūtsu</Link></li>
              <li><Link to="/programs#iaido" onClick={closeMenu}>Iaidō</Link></li>
              <li><Link to="/programs#ninpo" onClick={closeMenu}>Ninpō</Link></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
              AFFILIATED DŌJŌS
              <span className="dropdown-arrow"></span>
            </a>
            <ul className="dropdown-menu">
              <li><a href="#" onClick={(e) => e.preventDefault()}>Members Chart</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Dōjōs</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>News & Events</a></li>
            </ul>
          </li>

          <li className="nav-item">
            <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>HALL OF FAME</a>
          </li>

          <li className="nav-item dropdown">
            <Link to="/members" className="nav-link" onClick={closeMenu}>
              MEMBERS
              <span className="dropdown-arrow"></span>
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/members#training-program" onClick={closeMenu}>Training Program</Link></li>
              <li><Link to="/members#chart" onClick={closeMenu}>Chart</Link></li>
            </ul>
          </li>

          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={closeMenu}>CONTACT US</Link>
          </li>
        </ul>

        <div className="hamburger" id="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}
