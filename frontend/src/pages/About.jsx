const philosophyImages = [
  'p1-2-Image17.jpg',
  'p1-3-Image18.jpg',
  'p1-4-Image19.jpg',
  'p1-5-Image20.jpg',
  'p1-6-Image21.jpg',
]

const staff = [
  {
    id: 'hugo-sosa',
    name: 'SŌKE HUGO YASUO SOSA',
    years: '62 Years of Martial Arts Training',
    images: ['p1-6-Image21.jpg', 'p1-7-Image22.jpg', 'p1-8-Image23.jpg', 'p1-9-Image24.jpg'],
    paragraphs: [
      'Hanshi Hugo Sosa was born in Guatemala on April 22, 1961. He is the fifth of the six children of Daishi Jorge Sosa Sr., Founder of the World Budō Sosa-Kai. He began his KarateDō training at the age of three under the direct guidance of his father.',
      'In addition to training in KarateDō, Ryū-Kyū Kobudō, Ninpō, Taijutsu, and Iaidō, Hanshi Hugo also studied Kendō and Judō, broadening his education in the traditional Japanese martial arts. In 1975, while still a teenager, he received instruction from Daishi Nobuyoshi Murata in Mexico. During those years, he frequently accompanied his father on numerous teaching and training trips, participating in KarateDō and other martial arts demonstrations.',
      'Throughout his youth, Hanshi Hugo had the privilege of training under several distinguished Japanese masters, including Nidaime Kenei Mabuni, Daishi Nobuyoshi Murata, Hanshi Shoko Sato, and Hanshi Fumio Demura, all of whom made significant contributions to his technical and philosophical development in Budō.',
    ],
  },
  {
    id: 'jorge-sosa-jr',
    name: 'SŌKE JORGE SOSA JR.',
    years: '65 Years of Martial Arts Training',
    images: ['p2-1-Image27.jpg', 'p2-2-Image28.jpg', 'p2-3-Image29.jpg', 'p2-4-Image30.jpg'],
    paragraphs: [
      'Hanshi Jorge Sosa was born in Guatemala on March 7, 1958. He is the third of the six children of Daishi Jorge Sosa Sr., Founder of the World Budō Sosa-Kai. He began his Judō training at the age of three and started practicing KarateDō at the age of five, both under the direct guidance of his father.',
      'In addition to his training in Judō and KarateDō, he received comprehensive instruction in Ryū-Kyū Kobudō, Ninpō, Taijutsu, Kendō, and Iaidō, developing a solid foundation in a wide range of traditional Japanese martial arts.',
      'Throughout his martial arts career, Hanshi Jorge had the privilege of training under several distinguished Japanese masters, including Nidaime Kenei Mabuni, Daishi Nobuyoshi Murata, Hanshi Misakazu Konishi, and Hanshi Fumio Demura.',
      'During his youth, he frequently accompanied his father on numerous teaching and training trips, participating in demonstrations of KarateDō, Ryū-Kyū Kobudō, Taijutsu, Iaidō, Kendō, Judō, and Ninpō. These experiences played a significant role in strengthening both his technical skills and his understanding of the philosophy and traditional values of Budō.',
    ],
  },
]

export default function About() {
  return (
    <main className="about-page">
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

      <section className="technical-staff-section anchor-section" id="technical-staff">
        <div className="container document-container">
          <h1 className="document-title">SOSA-KAI TECHNICAL STAFF</h1>
          <div className="discipline-logos" aria-label="World Budō Sosa-Kai disciplines">
            {[11, 12, 13, 14, 15].map((number) => (
              <img key={number} src={`/images/technical-staff/p1-${number - 10}-Image${number}.jpg`} alt="Sosa-Kai discipline emblem" />
            ))}
          </div>

          {staff.map((member) => (
            <article className="staff-profile" id={member.id} key={member.name}>
              <h2>{member.name}</h2>
              <p className="staff-years">{member.years}</p>
              <div className="staff-gallery">
                {member.images.map((image, index) => (
                  <img key={image} src={`/images/technical-staff/${image}`} alt={`${member.name} martial arts photograph ${index + 1}`} />
                ))}
              </div>
              <div className="document-copy">
                {member.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
          ))}

          <a className="document-download" href="/documents/technical-staff-sosa-kai-english.pdf" target="_blank" rel="noreferrer">View the original technical staff PDF</a>
        </div>
      </section>
    </main>
  )
}
