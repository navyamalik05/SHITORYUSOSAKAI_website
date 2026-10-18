import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ContactModal from './components/ContactModal.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import TechnicalStaff from './pages/TechnicalStaff.jsx'
import Programs from './pages/Programs.jsx'
import Contact from './pages/Contact.jsx'
import Events from './pages/Events.jsx'
import Members from './pages/Members.jsx'
import TrainingProgram from './pages/TrainingProgram.jsx'
import AffiliatedDojos from './pages/AffiliatedDojos.jsx'
import History from './pages/History.jsx'
import HallOfFame from './pages/HallOfFame.jsx'

function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    window.requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [hash, pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Header />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/technical-staff" element={<TechnicalStaff />} />
          <Route path="/history" element={<History />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/hall-of-fame" element={<HallOfFame />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/training-program" element={<TrainingProgram />} />
          <Route path="/affiliated-dojos" element={<AffiliatedDojos />} />
        </Routes>
      </main>
      <Footer />
      <ContactModal />
    </BrowserRouter>
  )
}
