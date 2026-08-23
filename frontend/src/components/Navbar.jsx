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
              <li><Link to="/history" onClick={closeMenu}>History</Link></li>
              <li><Link to="/about#philosophy-principles" onClick={closeMenu}>Philosophy &amp; Principles</Link></li>
              <li><Link to="/about/technical-staff" onClick={closeMenu}>Technical Staff</Link></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link to="/programs" className="nav-link" onClick={closeMenu}>
              PROGRAMS
              <span className="dropdown-arrow"></span>
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/programs#karatedo" onClick={closeMenu}>KarateDō</Link></li>
              <li><Link to="/programs#kobudo" onClick={closeMenu}>Ryū Kyū Kobudō</Link></li>
              <li><Link to="/programs#iaido" onClick={closeMenu}>Iaidō</Link></li>
              <li><Link to="/programs#taijutsu" onClick={closeMenu}>Taijutsu</Link></li>
              <li><Link to="/programs#ninpo" onClick={closeMenu}>Ninpō</Link></li>
              <li><Link to="/programs#virtual-classes" onClick={closeMenu}>Virtual Martial Arts Classes with Hanshi Hugo</Link></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link to="/affiliated-dojos" className="nav-link" onClick={closeMenu}>
              AFFILIATED DŌJŌS
              <span className="dropdown-arrow"></span>
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/affiliated-dojos#karatedo-black-belt-chart" onClick={closeMenu}>KarateDō Black Belt Chart</Link></li>
              <li><Link to="/affiliated-dojos#kobudo-chart" onClick={closeMenu}>RyūKyū Kobudō Chart</Link></li>
              <li><Link to="/affiliated-dojos#iaido-chart" onClick={closeMenu}>Iaidō Chart</Link></li>
              <li><Link to="/affiliated-dojos#ninpo-chart" onClick={closeMenu}>Ninpō Chart</Link></li>
              <li><Link to="/affiliated-dojos#taijutsu-chart" onClick={closeMenu}>Tai-Jutsu Chart</Link></li>
              <li><Link to="/affiliated-dojos#dojos-chart" onClick={closeMenu}>Dōjōs Chart</Link></li>
              <li><Link to="/events" onClick={closeMenu}>News &amp; Events</Link></li>
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
              <li><Link to="/members#classes" onClick={closeMenu}>Classes</Link></li>
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
