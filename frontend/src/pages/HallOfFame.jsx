export default function HallOfFame() {
  return (
    <section className="hall-of-fame-page">
      <div className="container hall-of-fame-container">
        <header className="hall-of-fame-header">
          <p className="chart-section-label">WORLD BUDŌ SOSA-KAI</p>
          <h1 className="section-title">HALL OF FAME</h1>
          <p className="section-subtitle">
            The official Hall of Fame nomination process will begin soon. This temporary announcement will remain here until the first honorees are selected.
          </p>
        </header>

        <figure className="hall-of-fame-poster">
          <img src="/images/hall-of-fame/hall-of-fame-coming-soon.jpg" alt="World Budō Sosa-Kai Hall of Fame coming soon announcement" />
        </figure>

        <a className="document-download" href="/documents/hall-of-fame/hall-of-fame-coming-soon.pdf" target="_blank" rel="noreferrer">
          View the Hall of Fame PDF
        </a>
      </div>
    </section>
  )
}
