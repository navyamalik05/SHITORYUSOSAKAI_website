import AboutSectionNav from '../components/AboutSectionNav.jsx'

const HistoryImage = ({ src, alt, caption, className = '' }) => (
  <figure className={`history-figure ${className}`.trim()}>
    <img src={`/images/history/${src}`} alt={alt} loading="lazy" />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
)

export default function History() {
  return (
    <main className="history-page">
      <AboutSectionNav />

      <section className="history-hero">
        <div className="container history-container">
          <p className="history-kicker">WORLD UNION BUDŌ SOSA-KAI</p>
          <h1>History and Legacy</h1>
          <p>A journey through our origins, evolution, teachings, and commitment to Budō.</p>
        </div>
      </section>

      <div className="container history-container history-document">
        <section className="history-section" id="beginnings">
          <p className="history-section-number">I</p>
          <h2>The Beginnings of the Master</h2>
          <p>The foundation of our organization is rooted in the spirit, dedication, and vision of our Master, <strong>Daishi Jorge Sosa Sr.</strong>, who, at the age of 17, began his Path in the martial arts. On <strong>April 4, 1943</strong>, he began his training in Jujitsu or Jūjutsu under the guidance of Sensei Silvestre Méndez, in his hometown of Quetzaltenango, Guatemala. He maintained a consistent practice for approximately three years and later moved to Guatemala City, where he continued his martial arts training.</p>
          <p>After six years of practicing Jujitsu, around 1949, he traveled to San Antonio, Texas, where he received training in Kodokan Judō. Upon returning to Guatemala, he established his first Dōjō in the Barrio Moderno neighborhood of Guatemala City. He later established his headquarters at 12 Avenida 3-01 and 3rd Street, Zone 1, where he founded the Dōjō Jigoro Kano. Several months later, he participated in the founding of the first Judō Federation in Guatemala.</p>
          <p>His dedication, discipline, and perseverance led him to attain the rank of Black Belt on December 22, 1962, after being examined by Sensei Eli Cabeiro, a 4th Dan in Kodokan Judō of Cuban origin. He also trained under distinguished instructors including Sensei Peter Zpats of Germany, and Yasuo Nakayama and Hironori Seki of Japan.</p>
          <div className="history-gallery history-gallery-two">
            <HistoryImage src="01-canada-judo-article.jpg" alt="Historic Canadian Judo article and Jigoro Kano Dōjō photographs" caption="Historic records from the early Judō years, April 1961." />
            <HistoryImage src="02-judo-certificate.jpg" alt="Judō black belt certificate awarded to Jorge Sosa" caption="Judō certificate awarded to Jorge Sosa, Black Belt, 1st Dan." />
          </div>
        </section>

        <section className="history-section" id="shito-ryu">
          <h2>The Encounter with Shitō-Ryū KarateDō</h2>
          <p>In 1961, through the introduction of Master Yasuo Nakayama of Judō, our Master was introduced to Master Nobuyoshi Murata, a distinguished exponent of Shitō-Ryū KarateDō and leader of the Mexican KarateDō Association. This encounter marked the beginning of a new stage in his martial arts journey: his training in KarateDō.</p>
          <HistoryImage src="03-mexican-karatedo-association.jpg" alt="Members of the Mexican KarateDō Association in 1964" caption="The Mexican KarateDō Association. Among those pictured are Alejandro Frías, Juan Jorge Farias, Sensei Héctor Aguirre, Manuel Mondragón, Carlos Vila, Saikō-Shihan Nobuyoshi Murata, Daishi Jorge Sosa Sr., Mrs. Ana María Sosa, and Yukiko Murata. September 1964." className="history-figure-wide" />
          <p>From that moment forward, he embarked on a demanding process of learning, practice, and assimilation of the Shitō-Ryū style under the guidance of Saikō-Shihan Nobuyoshi Murata and, subsequently, Nidaime Kenei Mabuni, the eldest son of Shitō-Ryū founder Kenwa Mabuni.</p>
          <div className="history-gallery history-gallery-two">
            <HistoryImage src="04-mabuni-sosa-training.jpg" alt="Jorge Sosa Sr. training with Kenei Mabuni in Mexico in 1962" caption="Daishi Jorge Sosa Sr.'s early KarateDō training with Nidaime Kenei Mabuni, Mexico, 1962." />
            <HistoryImage src="05-murata-mabuni-sosa.jpg" alt="Nobuyoshi Murata, Kenei Mabuni, and Jorge Sosa Sr." caption="Left to right: Saikō-Shihan Nobuyoshi Murata, Nidaime Kenei Mabuni, and Daishi Jorge Sosa Sr. December 27, 1965." />
          </div>
          <HistoryImage src="06-japanese-masters.jpg" alt="Masatoshi Nakayama, Kenei Mabuni, Teruyuki Okazaki, Jorge Sosa Sr., and others" caption="First row, left to right: Hanshi Masatoshi Nakayama, Nidaime Kenei Mabuni, Hanshi Teruyuki Okazaki, and Daishi Jorge Sosa Sr. First Pan American Championship, Los Angeles, U.S.A., November 28, 1965." className="history-figure-wide" />
        </section>

        <section className="history-section" id="training-development">
          <p className="history-section-number">II</p>
          <h2>Martial Arts Training and Development</h2>
          <p>Our Master began his Path of Dō under the supervision, guidance, and direction of these two great masters, initially through KarateDō and subsequently through other traditional Japanese martial arts. During that period, a Sensei transmitted certain techniques and Kata only to students who demonstrated the aptitude, attitude, discipline, and commitment necessary to follow the true Path of Budō.</p>
          <p>Within this context, Nidaime Kenei Mabuni chose our Master to receive a broader and deeper education in KarateDō, Ryū-Kyū Kobudō, Iaidō, Ninpō, and Tai-Jutsu. Master Kenei Mabuni made several trips to Guatemala and, on three occasions, remained for an entire year, allowing our Master and his sons to receive a significant part of his teachings directly.</p>
          <div className="history-gallery history-gallery-two">
            <HistoryImage src="07-kendo.jpg" alt="Kenei Mabuni and Jorge Sosa Sr. practicing Kendō" caption="Kendō: Nidaime Mabuni and Daishi Sosa Sr., Guatemala, 1966." />
            <HistoryImage src="08-ryukyu-kobudo.jpg" alt="Nidaime Kenei Mabuni and Daishi Jorge Sosa Sr. demonstrating Ryū Kyū Kobudō" caption="Nidaime Kenei Mabuni & Daishi Jorge Sosa Sr., Guatemala, 1967." />
          </div>
        </section>

        <section className="history-section" id="birth-organization">
          <p className="history-section-number">III</p>
          <h2>The Birth of Our Organization</h2>
          <p>Over the years, as our Master received, studied, and assimilated this knowledge, the five Martial Arts that are currently part of our organization's teaching gradually became established. Each represents an important part of the legacy transmitted throughout this Path of Budō.</p>
          <p>The opportunity to receive this tradition directly through the lineage of Kenwa Mabuni, particularly through Nidaime Kenei Mabuni, was fundamental to our Master's training and the development of our organization. The knowledge received was practiced, studied, developed, and transmitted to subsequent generations, giving rise to the martial identity and legacy that World Budō Sosa-Kai represents today.</p>
          <div className="history-gallery history-gallery-two">
            <HistoryImage src="09-japan-1970.jpg" alt="Jorge Sosa Sr. refereeing a Kumite match in Tokyo in 1970" caption="Daishi Jorge Sosa Sr. refereeing a team Kumite match in Tokyo, Japan, 1970." />
            <HistoryImage src="10-world-referee.jpg" alt="International referee certificate awarded to Jorge Sosa Sr." caption="Daishi Jorge Sosa Sr., the first internationally recognized referee in the Americas, Japan, 1970." />
          </div>
          <HistoryImage src="11-wuko-founders.jpg" alt="Founders of the World Union KarateDō Organizations in Japan in 1970" caption="Founders of the World Union KarateDō Organizations (W.U.K.O.), Japan, 1970. Daishi Jorge Sosa Sr., second row - Guatemala." className="history-figure-wide" />
          <HistoryImage src="12-france-1972.jpg" alt="Members of the referee examination committee in Paris in 1972" caption="Referee Examination Committee, Paris, 1972: Jorge Sosa Sr., Manzo Iwata, Masatoshi Nakayama, Ryoichi Sasakawa, and Hidetaka Nishiyama." className="history-figure-wide" />
        </section>

        <section className="history-section" id="evolution">
          <p className="history-section-number">IV</p>
          <h2>Evolution of Practice and Teaching</h2>
          <p>As our Master deepened his knowledge, he incorporated the Martial Arts into his training, demonstrations, and teaching activities in Guatemala. KarateDō was new to the country and, through his continuous work, he eventually had approximately 21 Dōjōs under his supervision. His demonstrations also introduced Ryū-Kyū Kobudō, Kendō, Iaidō, and Tai-Jutsu to the public.</p>
          <p>In 1990, KarateDō, Ryū-Kyū Kobudō, Iaidō, Tai-Jutsu, and Ninpō were introduced in Lethbridge, Alberta, Canada. In 2001, teaching expanded to Newark, Fontana, Beaumont, and Moreno Valley, California. This growth represented both a geographical expansion and the continuation of a Path of Life transmitted to new generations.</p>
          <div className="history-gallery history-gallery-four">
            <HistoryImage src="13-karatedo.jpg" alt="Daishi Jorge Sosa Sr. practicing KarateDō" caption="KarateDō" />
            <HistoryImage src="14-kobudo.jpg" alt="Daishi Jorge Sosa Sr. practicing Ryū-Kyū Kobudō" caption="Ryū-Kyū Kobudō" />
            <HistoryImage src="15-iaido.jpg" alt="Daishi Jorge Sosa Sr. practicing Iaidō" caption="Iaidō" />
            <HistoryImage src="16-ninpo.jpg" alt="Daishi Jorge Sosa Sr. practicing Ninpō" caption="Ninpō" />
          </div>
        </section>

        <section className="history-section" id="formation">
          <p className="history-section-number">V</p>
          <h2>The Formation of Sosa-Kai</h2>
          <p>Formally, Sosa-Kai was established in 2001 during a meeting held by Daishi Jorge Sosa Sr. and his sons, Hugo Yasuo Sosa and Jorge Sosa Jr. This marked the beginning of a new era in the continuation of our Master's legacy. Sosa-Kai entered a new stage of development and expansion in Mexico, Argentina, and Guatemala, alongside established groups in Canada and the United States.</p>
        </section>

        <section className="history-section" id="international-expansion">
          <p className="history-section-number">VI</p>
          <h2>International Expansion and Development</h2>
          <p>Sosa-Kai continued its international expansion, establishing connections with practitioners and groups who share our vision of Budō. Its presence grew throughout the Americas, Asia, and other regions, progressively incorporating Costa Rica, India, Sri Lanka, Nepal, Brazil, Colombia, Nicaragua, and Chile. The work begun by our Master continues to transcend borders and strengthen the international presence of Sosa-Kai.</p>
        </section>

        <section className="history-section" id="history-philosophy">
          <p className="history-section-number">VII</p>
          <h2>Our Philosophy and Principles</h2>
          <h3>Philosophy</h3>
          <p>At World Budō Sosa-Kai, we believe that Budō is much more than a system of self-defense, a sport discipline, or a merely physical activity. Budō is a Path of Life that invites us to pursue personal growth, continuous self-improvement, and the harmonious development of the body, mind, and spirit. Through constant practice, Budō teaches us to transform difficulties into opportunities, mistakes into experiences for growth, and challenges into means of strengthening our character.</p>
          <h3>Principles</h3>
          <p>We promote respect for oneself and others, courtesy, humility, honesty, discipline, perseverance, and a sense of responsibility. These values should be reflected in our daily conduct: within the family, at work, at school, in the community, and in all human relationships. The Path of Dō becomes a way of living, learning, and serving others.</p>
        </section>

        <section className="history-section" id="legacy">
          <p className="history-section-number">VIII</p>
          <h2>Legacy and the New Generations</h2>
          <p>We have the responsibility and commitment to preserve, develop, and transmit to future generations the knowledge and teachings received through the legacy of the great Master Kenwa Mabuni and the tradition passed down to our Master. This legacy is not only martial technique and knowledge; it is the continuation of a Path of Life seeking the integral development of the human being through physical, mental, spiritual, and intellectual study and practice.</p>
        </section>

        <section className="history-section" id="future-vision">
          <p className="history-section-number">IX</p>
          <h2>Our Vision for the Future</h2>
          <p>One of the principal goals of World Budō Sosa-Kai is to train Martial Arts professionals capable of responsibly and ethically transmitting Budō to future generations. Every practitioner who attains Black Belt should possess not only technical proficiency, but also the knowledge, discipline, maturity, and preparation necessary to lead and educate professionally, responsibly, and humanely.</p>
          <p>World Budō Sosa-Kai aspires to develop education and training that goes beyond technical instruction, preparing future instructors and leaders for a profession dedicated to the integral development of the human being. Our vision is to develop Budō professionals who transmit knowledge, cultivate values, develop character, contribute to a better society, and keep the true spirit of the Path of Dō alive for present and future generations.</p>
        </section>

        <div className="history-download-wrap">
          <a className="document-download" href="/documents/history-and-legacy-world-sosa-kai.pdf" target="_blank" rel="noreferrer">View or download the original History PDF</a>
        </div>
      </div>
    </main>
  )
}
