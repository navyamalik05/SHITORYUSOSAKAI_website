import AboutSectionNav from '../components/AboutSectionNav.jsx'

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

export default function TechnicalStaff() {
  return (
    <main className="about-page technical-staff-page">
      <AboutSectionNav />

      <section className="technical-staff-section">
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
