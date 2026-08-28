function scrollToPrograms() {
  document.getElementById('programs-section')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">TRADITION.<br />DISCIPLINE.<br />MASTERY.</h1>
          <p className="hero-subtitle">
            Traditional martial arts training building skillsets in self-defense, discipline,
            leadership, respect, and fitness to help students in all they do.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={scrollToPrograms}>START YOUR JOURNEY</button>
            <button className="btn btn-secondary">LEARN MORE</button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-container">
          <div className="welcome-image">
            <img src="/images/founder-sosa-sr.jpg" alt="Martial Arts Training" className="welcome-img" />
          </div>
          <div className="welcome-text">
            <h2>WELCOME</h2>
            <p>
              We are an organization dedicated to preserving and promoting traditional Japanese martial
              arts through the principles of Budō. Our mission is to faithfully carry forward the legacy
              of Sōke Kenwa Mabuni, cultivating practitioners who embody discipline, respect, excellence,
              and the true martial spirit.
            </p>
            <p>Our programs focus on:</p>
            <ul className="welcome-list">
              <li><strong>KarateDō</strong> - A mystical art that originated on the Japanese island of Okinawa (Ryūkyū). It is the traditional art of empty-hand self-defense, guided by its own philosophy.</li>
              <li><strong>Ryū Kyū Kobudō</strong> - The traditional art of self-defense using farming tools from the island of Okinawa. This martial art emphasizes the use of a tool as an extension of the body to develop greater focus, coordination, precision, and technique.</li>
              <li><strong>Tai-Jutsu</strong> - The traditional art of streetwise self-defense. This martial art focuses on real-life situations that people may encounter on the street, developing movement, escape, and counterattack techniques for defending against one or more attackers.</li>
              <li><strong>Iaidō</strong> - An ancient, classical, mystical, philosophical, and traditional Japanese martial art, going hand in hand with Japanese culture, as the Katana (also known as the Daitō) played an essential role in the lives of the samurai. Iaidō emphasizes the disciplined practice of drawing, cutting, and sheathing the sword, cultivating precision, awareness, and self-discipline.</li>
              <li><strong>Ninpō</strong> - The traditional art of the strategic warrior. This martial art requires disciplined training to develop vitality, agility, and effective counterattack techniques, including jumping, movement, Ukemi (falling and rolling), and offensive techniques.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="programs-preview" id="programs-section">
        <div className="container">
          <h2 className="section-title">OUR PROGRAMS</h2>
          <p className="section-subtitle">Five traditional Japanese martial arts</p>

          <div className="programs-grid">
            <div className="program-card">
              <div className="program-logo-wrap">
                <img src="/images/logo-karatedo.jpg" alt="KarateDō Shitō-Ryū Sosa-Kai" />
              </div>
              <div className="program-card-content">
                <h3 className="program-name">KarateDō Shitō-Ryū</h3>
                <p className="program-description">
                  The traditional art of empty-hand self-defense from Okinawa, guided by the principle
                  "KarateDō ni Sente Nashi" — there is no first attack in KarateDō.
                </p>
              </div>
            </div>

            <div className="program-card">
              <div className="program-logo-wrap">
                <img src="/images/logo-kobudo.jpg" alt="Ryūkyū Kobudō Tora-Ryū" />
              </div>
              <div className="program-card-content">
                <h3 className="program-name">Ryūkyū Kobudō Tora-Ryū</h3>
                <p className="program-description">
                  The traditional Okinawan art of self-defense using ancient farming implements as
                  weapons, developing precision, coordination, and technique.
                </p>
              </div>
            </div>

            <div className="program-card">
              <div className="program-logo-wrap">
                <img src="/images/logo-taijutsu.png" alt="Tai-Jūtsu Godai-Ryū" />
              </div>
              <div className="program-card-content">
                <h3 className="program-name">Tai-Jūtsu Godai-Ryū</h3>
                <p className="program-description">
                  A traditional system of intelligent, streetwise self-defense, developing reaction
                  ability, body control, and decision-making against one or multiple attackers.
                </p>
              </div>
            </div>

            <div className="program-card">
              <div className="program-logo-wrap">
                <img src="/images/logo-iaido.jpg" alt="Iaidō Tora-Ryū" />
              </div>
              <div className="program-card-content">
                <h3 className="program-name">Iaidō Tora-Ryū</h3>
                <p className="program-description">
                  The traditional art of the living sword, mastering the draw, cut, and return of the
                  Katana to cultivate harmony, discipline, and inner enlightenment.
                </p>
              </div>
            </div>

            <div className="program-card">
              <div className="program-logo-wrap">
                <img src="/images/logo-ninpo.jpg" alt="Ninpō / Ninjūtsu" />
              </div>
              <div className="program-card-content">
                <h3 className="program-name">Ninpō / Ninjūtsu</h3>
                <p className="program-description">
                  The traditional art of the strategic warrior, developing speed, endurance, and
                  self-control through movement, evasion, and counterattack training.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="founder-section">
        <div className="founder-container">
          <h2 className="section-title">FOUNDER</h2>
          <div className="founder-content">
            <div className="founder-image">
              <img src="/images/founder-jorge-sosa-sr.png" alt="Sōke - Daishi Jorge Sosa Sr." className="founder-img" />
            </div>
            <div className="founder-info">
              <h3>Sōke – Daishi Jorge Sosa Sr.</h3>
              <p className="founder-title">Founder of Budō Sosa-Kai</p>
              <p>Budō Sosa-Kai traces its origins to Quetzaltenango, Guatemala, on April 4, 1943, when our founder, Sōke Jorge Sosa Sr., began his training in jujutsu. He later earned his black belt in Kōdōkan Judō in 1955.</p>
              <p>Sōke Sosa Sr. continued his martial arts education by studying KarateDō, Ryūkyū Kobudō, Jujutsu, Iaidō, Ninpō, and other traditional Japanese martial arts under the guidance of Masters Nobuyoshi Murata and Kenei Mabuni, the son of Shitō-Ryū founder Kenwa Mabuni.</p>
              <p>From 1961 to 1984, Sōke Sosa Sr. promoted traditional Japanese martial arts throughout several Latin American countries, establishing approximately 21 Dōjōs in Guatemala during what became a golden era for KarateDō in the region. He later moved to the United States and Canada, where he introduced and promoted the five martial arts that remain the foundation of our organization today.</p>
              <p>In 1970, Sōke Sosa Sr. traveled to Japan for advanced training under Nidaime Kenei Mabuni and other distinguished Japanese masters, and participated in the First World KarateDō Championship as one of the founding members of the World Union of KarateDō Organizations (W.U.K.O.), established in October 1970. He was also recognized as the first World KarateDō Referee from Latin America.</p>
              <p>Today, his sons continue his legacy, sharing these centuries-old traditions with students around the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container">
          <h2 className="section-title">WHY CHOOSE World Budō Sosa-Kai?</h2>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-instructor-row">
                <img src="/images/instructor-daishi.jpg" alt="Daishi" />
                <img src="/images/instructor-hanshi.jpg" alt="Hanshi" />
                <img src="/images/instructor-haori.jpg" alt="Instructor" />
              </div>
              <h3>Qualified Instructors</h3>
              <p>Train with a certified and experienced Senseis committed to your personal growth and martial arts development.</p>
            </div>

            <div className="benefit-card">
              <img className="benefit-image" src="/images/why-heritage.jpg" alt="Heritage and Tradition" />
              <h3>Heritage and Tradition</h3>
              <p>Experience authentic Budō training based on traditional methods that honor the legacy of Japanese martial arts.</p>
            </div>

            <div className="benefit-card">
              <img className="benefit-image" src="/images/why-family.jpg" alt="Family-Focused Martial Arts Training" />
              <h3>Family-Focused Martial Arts Training</h3>
              <p>Our programs are designed to accommodate students of all ages and experience levels, offering flexible training that supports each individual's journey.</p>
            </div>

            <div className="benefit-card">
              <img className="benefit-image" src="/images/why-belt.jpg" alt="Structured Belt Progression" />
              <h3>Structured Belt Progression</h3>
              <p>Advance from white belt to black belt through a comprehensive curriculum, consistent training, and regularly scheduled promotion evaluations.</p>
            </div>

            <div className="benefit-card">
              <img className="benefit-image" src="/images/why-foundations.jpg" alt="Building Strong Foundations" />
              <h3>Building Strong Foundations</h3>
              <p>We help students develop confidence, resilience, discipline, and effective self-defense skills for life.</p>
            </div>

            <div className="benefit-card">
              <img className="benefit-image" src="/images/why-community.jpg" alt="Supportive Community" />
              <h3>Supportive Community</h3>
              <p>Join a respectful and welcoming Dōjō where students encourage one another and grow together through shared dedication, discipline, and continuous learning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Begin Your Martial Arts Journey?</h2>
          <p>Try a FREE trial class with no commitment. Contact us today!</p>
          <a href="/contact" className="btn btn-primary btn-large">CONTACT US</a>
        </div>
      </section>
    </>
  )
}
