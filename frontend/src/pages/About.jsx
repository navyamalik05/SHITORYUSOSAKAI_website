import AboutSectionNav from '../components/AboutSectionNav.jsx'

const philosophyImages = [
  'p1-2-Image17.jpg',
  'p1-3-Image18.jpg',
  'p1-4-Image19.jpg',
  'p1-5-Image20.jpg',
  'p1-6-Image21.jpg',
]

export default function About() {
  return (
    <main className="about-page">
      <AboutSectionNav />

      <section className="about-document anchor-section" id="philosophy-principles">
        <div className="container document-container">
          <img className="document-emblem" src="/images/philosophy/p1-1-Image16.jpg" alt="World Budō Sosa-Kai emblem" />
          <h1 className="document-title">PHILOSOPHY AND PRINCIPLES OF WORLD<br />BUDŌ SOSA-KAI</h1>

          <div className="philosophy-gallery" aria-label="World Budō Sosa-Kai martial arts disciplines">
            {philosophyImages.map((image, index) => (
              <img key={image} src={`/images/philosophy/${image}`} alt={`Traditional Budō practice ${index + 1}`} />
            ))}
          </div>

          <article className="document-copy">
            <h2>Philosophy and Principles</h2>
            <p>The essence of World Budō Sosa-Kai is founded upon the traditional values of Budō, understood as a path of holistic development that strengthens the body, mind, and spirit. Our organization is dedicated to developing individuals of strong character, discipline, respect, humility, and perseverance, preparing them to face life&apos;s challenges with honor, responsibility, and a spirit of continuous self-improvement.</p>

            <h2>Our Philosophy</h2>
            <p>At World Budō Sosa-Kai, we believe that Budō is far more than a system of self-defense or a form of physical training. It is a way of life that promotes personal growth, lifelong learning, and the harmonious development of the body, mind, and spirit.</p>
            <p>Consistent practice enables each individual to discover their true potential, build self-confidence, develop self-control, and recognize both their strengths and their limitations. Every training session is an opportunity to cultivate character, strengthen determination, and strive for personal excellence.</p>
            <p>Budō teaches us that learning is a lifelong journey and that true victory lies in overcoming ourselves each day.</p>

            <h2>Our Principles</h2>
            <p>The principles of World Union Budō Sosa-Kai serve as the foundation of our conduct both inside and outside the Dōjō.</p>
            <p>We promote respect for oneself and for others, courtesy, humility, honesty, discipline, perseverance, and a strong sense of responsibility. These values should be reflected not only during training, but also within our families, workplaces, schools, and every aspect of daily life.</p>
            <p>Our organization welcomes all individuals with equality and respect, regardless of nationality, ethnicity, race, religion, gender, age, or physical condition. We believe that the Martial Arts are a universal means of bringing people together through shared values that encourage peace, cooperation, and mutual understanding.</p>

            <h2>The Spirit of Budō</h2>
            <p>The spirit of Budō extends far beyond technical practice. It is reflected in the attitude with which we face every challenge, in our determination to improve continuously, and in our commitment to live according to the values we learn in the Dōjō.</p>
            <p>World Budō Sosa-Kai promotes an international community founded on brotherhood, friendship, and mutual respect among practitioners, instructors, and Martial Arts organizations. We believe that the exchange of knowledge, experience, and tradition strengthens the global Martial Arts community and helps preserve the true spirit of Budō for future generations.</p>
            <p>We welcome all individuals and organizations who share these ideals to walk this path with us in an environment of cooperation, learning, and mutual respect. Through a positive attitude, an open mind, and an unwavering commitment to excellence, we strive to contribute to the development of better human beings and to the creation of a more just, compassionate, and peaceful society.</p>
            <p>At World Union Budō Sosa-Kai, we believe that the true purpose of Budō is not to defeat others, but to overcome our own weaknesses, serve with humility, and leave a legacy of honor, integrity, and respect for present and future generations.</p>
          </article>

          <a className="document-download" href="/documents/philosophy-principles-sosakai.pdf" target="_blank" rel="noreferrer">View the original philosophy PDF</a>
        </div>
      </section>
    </main>
  )
}
