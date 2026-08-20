import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function ProgramAccordion({ id, title, isOpen, onToggle, children }) {
  const itemRef = useRef(null)

  useEffect(() => {
    if (isOpen && window.location.hash === `#${id}`) {
      window.requestAnimationFrame(() => {
        itemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [id, isOpen])

  return (
    <article className={`program-accordion ${isOpen ? 'is-open' : ''}`} id={id} ref={itemRef}>
      <h2 className="program-accordion-heading">
        <button
          type="button"
          className="program-accordion-trigger"
          aria-expanded={isOpen}
          aria-controls={`${id}-content`}
          onClick={() => onToggle(id)}
        >
          <span>{title}</span>
          <span className="program-accordion-icon" aria-hidden="true">+</span>
        </button>
      </h2>
      <div
        className="program-accordion-content"
        id={`${id}-content`}
        hidden={!isOpen}
      >
        {children}
      </div>
    </article>
  )
}

const programIds = ['karatedo', 'kobudo', 'taijutsu', 'iaido', 'ninpo', 'virtual-classes']

export default function Programs() {
  const location = useLocation()
  const requestedProgram = location.hash.slice(1)
  const [openProgram, setOpenProgram] = useState(
    programIds.includes(requestedProgram) ? requestedProgram : null
  )

  useEffect(() => {
    const id = location.hash.slice(1)
    if (programIds.includes(id)) setOpenProgram(id)
  }, [location.hash])

  const toggleProgram = (id) => {
    setOpenProgram((current) => current === id ? null : id)
    window.history.replaceState(null, '', `/programs#${id}`)
  }

  return (
    <section className="programs-page">
      <div className="container">
        <h1 className="section-title">OUR MARTIAL ART PROGRAMS</h1>
        <p className="section-subtitle">Five traditional Japanese martial arts, plus virtual training with Hanshi Hugo</p>

        {/* KARATEDŌ SHITŌ-RYŪ */}
        <ProgramAccordion id="karatedo" title="KarateDō Shitō-Ryū Sosa-Kai" isOpen={openProgram === 'karatedo'} onToggle={toggleProgram}>
        <div className="program-full-card">
          <div className="program-logo-col">
            <img src="/images/logo-karatedo.jpg" alt="KarateDō Shitō-Ryū Sosa-Kai logo" />
            <img className="program-demo-img" src="/images/demo-karatedo.jpg" alt="KarateDō demonstration" />
          </div>
          <div>
            <h2>KarateDō Shitō-Ryū Sosa-Kai</h2>
            <p>KarateDō is a martial art that originated on the island of Okinawa, formerly the Ryūkyū Kingdom (now part of Japan), about 400 years ago. Its development was influenced by restrictions on the use of weapons, leading the people of Okinawa to create an effective system of unarmed self-defense.</p>
            <p>Drawing from local traditions and influenced by Chinese martial arts, Okinawans refined offensive and defensive techniques that evolved into the unique discipline known today as KarateDō.</p>
            <p className="maxim">「空手道に先手なし」 (KarateDō ni Sente Nashi) — "There is no first attack in KarateDō."</p>
            <p>This teaches that a KarateDō practitioner never initiates violence and uses their training only for self-defense or to protect others when necessary.</p>
            <p><strong>Shitō-Ryū:</strong> Sōke Kenwa Mabuni (1889–1952), regarded as one of the great masters of modern KarateDō, began his martial arts training at age 10 under Ankō Itosu, master of Shuri-te, and later studied with Kanryō Higaonna, the leading exponent of Naha-te, as well as Gō Kenki, an expert in the Chinese martial art Hakutsuru Kenpō (White Crane Fist). By combining the teachings of these masters, Kenwa Mabuni founded the Shitō-Ryū style — its name honoring "Shi" from Itosu and "Tō" from Higaonna, followed by Ryū (流), meaning "school" or "style."</p>
            <p><strong>Sosa-Kai:</strong> The primary objective of Sosa-Kai is to preserve the teachings of Sōke Kenwa Mabuni by promoting the correct transmission of Shitō-Ryū, including both its techniques and its traditional Kata. Our technical and philosophical foundation is based on the teachings received from Nidaime Sōke Kenei Mabuni, the founder's son, and Saikō Shihan Nobuyoshi Murata, both of whom devoted their lives to faithfully preserving the legacy of Shitō-Ryū.</p>
          </div>
        </div>
        </ProgramAccordion>

        {/* RYŪKYŪ KOBUDŌ */}
        <ProgramAccordion id="kobudo" title="Ryūkyū Kobudō Tora-Ryū" isOpen={openProgram === 'kobudo'} onToggle={toggleProgram}>
        <div className="program-full-card">
          <div className="program-logo-col">
            <img src="/images/logo-kobudo.jpg" alt="Ryūkyū Kobudō Tora-Ryū logo" />
            <img className="program-demo-img" src="/images/demo-kobudo.jpg" alt="Ryūkyū Kobudō demonstration" />
          </div>
          <div>
            <h2>Ryūkyū Kobudō Tora-Ryū</h2>
            <p>Ryūkyū Kobudō Tora-Ryū is the traditional Okinawan art of self-defense through the use of ancient farming implements adapted as weapons. This discipline teaches practitioners to use each weapon as a natural extension of the body, developing precision, coordination, control, technique, and concentration.</p>
            <p>To earn the rank of Black Belt in this art, practitioners must demonstrate proficiency in the use of five fundamental weapons: Bō, Sai, Tonfa, Kama, and Nunchaku.</p>
            <p>Daishi Jorge Sosa Sr. learned Ryūkyū Kobudō directly from Nidaime Sōke Kenei Mabuni, the eldest son of Sōke Kenwa Mabuni. Kenei Mabuni was recognized as one of the foremost Kobudō masters of his generation and received instruction from distinguished teachers such as Shinken Taira, Moden Yabiku, Sanda Chinen, Jinō Sueyoshi, and Shimbuku Tawada. Daishi Jorge Sosa Sr. later continued to refine his skills under other distinguished instructors, including Misakazu Konishi in Himeji, Japan.</p>
            <p>Among the greatest achievements of Sosa-Kai was the Ryūkyū Kobudō demonstration performed by Daishi Jorge Sosa Sr. and Hanshi Jorge Sosa Jr. at the Coca-Cola Stadium in Pretoria, South Africa in 1973, before an audience of approximately 20,000 spectators.</p>
          </div>
        </div>
        </ProgramAccordion>

        {/* TAI-JŪTSU GODAI-RYŪ */}
        <ProgramAccordion id="taijutsu" title="Tai-Jūtsu Godai-Ryū" isOpen={openProgram === 'taijutsu'} onToggle={toggleProgram}>
        <div className="program-full-card">
          <div className="program-logo-col">
            <img src="/images/logo-taijutsu.png" alt="Tai-Jūtsu Godai-Ryū emblem" />
            <img className="program-demo-img" src="/images/demo-taijutsu.jpg" alt="Tai-Jūtsu demonstration" />
          </div>
          <div>
            <h2>Tai-Jūtsu Godai-Ryū</h2>
            <p>Tai-Jūtsu Godai-Ryū is a traditional system of intelligent self-defense applied to real-life street situations. This martial art focuses on preparing practitioners to face self-defense situations that may occur in everyday life. Its practice develops reaction ability, body control, and decision-making under pressure. Training is structured to improve movement, escapes, control techniques, and counterattacks against one or multiple attackers.</p>
            <p>This system also includes self-defense methods against attacks involving different types of weapons or objects, such as sticks, knives, swords, machetes, and other similar items (Kon-dori and Tanto-dori).</p>
            <p>Tai-Jūtsu Godai-Ryū was developed from the knowledge accumulated by Daishi Jorge Sosa Sr. throughout his lifetime dedicated to the study and practice of martial arts. His training began at the age of 17 with the study of Jūjutsu under the guidance of Sensei Silvestre Méndez, marking the beginning of a lifelong journey of martial arts research and development.</p>
            <p>Tai-Jūtsu Godai-Ryū is described by Daishi Jorge Sosa Sr. as <em>"the grandson of Jūjutsu,"</em> as it represents the integration of the principles of Jūjutsu, Jūdō, and KarateDō, combining their teachings to create a more practical and adaptable system for real-life defense situations.</p>
          </div>
        </div>
        </ProgramAccordion>

        {/* IAIDŌ TORA-RYŪ */}
        <ProgramAccordion id="iaido" title="Iaidō Tora-Ryū" isOpen={openProgram === 'iaido'} onToggle={toggleProgram}>
        <div className="program-full-card">
          <div className="program-logo-col">
            <img src="/images/logo-iaido.jpg" alt="Iaidō Tora-Ryū logo" />
            <img className="program-demo-img" src="/images/demo-iaido.jpg" alt="Iaidō demonstration" />
          </div>
          <div>
            <h2>Iaidō Tora-Ryū</h2>
            <p>Iaidō Tora-Ryū is the traditional art of the living sword, focused on mastering the techniques of drawing, cutting, cleaning, and returning the sword to its scabbard.</p>
            <p>This martial discipline seeks to develop the harmonious integration of mind and body through the conscious practice of sword movements, including the draw (Nukitsuke), cutting techniques (Kiritsuke), the symbolic cleaning of the sword (Chiburi), and the returning of the sword to the scabbard (Nōtō).</p>
            <p>Iaidō is an ancient, classical, philosophical, and traditional art that is deeply connected to Japanese culture. Since the periods of clan warfare in Japan, the Katana or Daitō was regarded as a symbol of the warrior and an essential element of the samurai tradition.</p>
            <p className="maxim">"The art of perfecting the individual through the correct practice of Japanese swordsmanship, seeking to achieve harmony, discipline, and inner enlightenment."</p>
          </div>
        </div>
        </ProgramAccordion>

        {/* NINPŌ / NINJŪTSU */}
        <ProgramAccordion id="ninpo" title="Ninpō / Ninjūtsu" isOpen={openProgram === 'ninpo'} onToggle={toggleProgram}>
        <div className="program-full-card">
          <div className="program-logo-col">
            <img src="/images/logo-ninpo.jpg" alt="Ninpō Ninjūtsu logo" />
            <img className="program-demo-img" src="/images/demo-ninpo.jpg" alt="Ninpō demonstration" />
          </div>
          <div>
            <h2>Ninpō / Ninjūtsu</h2>
            <p><strong>The traditional art of the strategic warrior.</strong></p>
            <p>Ninpō or Ninjūtsu is a traditional martial art that requires disciplined training to develop speed, endurance, self-control, and the ability to respond effectively under pressure. Its practice includes movement, jumping, rolling and breakfalls, evasive maneuvers, defensive and counterattacking techniques, as well as survival skills, preparing practitioners to act with precision and composure in adverse situations.</p>
            <p>The terms Ninjūtsu and Ninpō are closely related and often used interchangeably, although they have distinct meanings. Ninjūtsu (忍術) refers to the technical skills and strategies of infiltration, survival, intelligence gathering, and unconventional warfare. Ninpō (忍法) means "the Way of Perseverance" and represents the philosophical, ethical, and strategic principles that guide the practice of those techniques.</p>
            <p>Ninjūtsu is one of Japan's oldest martial traditions, tracing back to the Asuka and Heian periods, reaching its greatest development during the Kamakura and Sengoku periods, when the need for intelligence gathering, reconnaissance, and special operations gave rise to the warriors known as Ninja or Shinobi. Beyond their popular image, authentic Ninjūtsu emphasizes intelligence, discipline, patience, and the ability to resolve conflict through strategy before resorting to force.</p>
          </div>
        </div>
        </ProgramAccordion>

        <ProgramAccordion id="virtual-classes" title="Virtual Martial Arts Classes with Hanshi Hugo" isOpen={openProgram === 'virtual-classes'} onToggle={toggleProgram}>
          <div className="program-full-card virtual-program-card">
            <div className="program-logo-col">
              <img src="/images/technical-staff/p1-7-Image22.jpg" alt="Hanshi Hugo Sosa" />
            </div>
            <div>
              <h2>Virtual Martial Arts Classes with Hanshi Hugo</h2>
              <p>Train remotely with Hanshi Hugo Sosa through guided virtual Martial Arts classes grounded in the traditional teachings and values of World Budō Sosa-Kai.</p>
              <p>Contact World Budō Sosa-Kai for current class availability, scheduling, and enrollment information.</p>
              <Link to="/contact" className="btn btn-primary">Ask About Virtual Classes</Link>
            </div>
          </div>
        </ProgramAccordion>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/contact" className="btn btn-primary btn-large">CONTACT US TO GET STARTED</Link>
        </div>
      </div>
    </section>
  )
}
