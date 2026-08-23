const charts = [
  {
    id: 'kobudo-chart',
    title: 'RyūKyū Kobudō Chart',
    description: 'Official Ryū Kyū Kobudō lineage and international organization chart.',
    slug: 'ryukyu-kobudo',
    pdf: 'ryukyu-kobudo-chart.pdf',
    pages: 4,
  },
  {
    id: 'iaido-chart',
    title: 'Iaidō Tora-Ryū Chart',
    description: 'Official Iaidō Tora-Ryū lineage and international organization chart.',
    slug: 'iaido',
    pdf: 'iaido-tora-ryu-chart.pdf',
    pages: 4,
  },
  {
    id: 'ninpo-chart',
    title: 'Ninpō Chart',
    description: 'Official Yukirenshi Ninpō-Kai lineage and international organization chart.',
    slug: 'ninpo',
    pdf: 'ninpo-chart.pdf',
    pages: 2,
  },
  {
    id: 'taijutsu-chart',
    title: 'Tai-Jutsu Chart',
    description: 'Official Tai-Jutsu Gōdai-Ryū lineage and international organization chart.',
    slug: 'taijutsu',
    pdf: 'taijutsu-chart.pdf',
    pages: 3,
  },
]

function ChartSection({ chart }) {
  return (
    <section className="resource-panel chart-resource-panel anchor-section" id={chart.id}>
      <h2>{chart.title}</h2>
      <p>{chart.description}</p>
      <a className="document-download" href={`/documents/charts/${chart.pdf}`} target="_blank" rel="noreferrer">
        View or download the original chart PDF
      </a>
      <div className="chart-page-list affiliated-chart-pages">
        {Array.from({ length: chart.pages }, (_, index) => index + 1).map((page) => (
          <figure className="chart-page" key={page}>
            <img
              src={`/images/affiliated-charts/${chart.slug}/page-${page}.jpg`}
              alt={`${chart.title}, page ${page} of ${chart.pages}`}
              loading={page === 1 ? 'eager' : 'lazy'}
            />
            <figcaption>{chart.title} · Page {page} of {chart.pages}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default function AffiliatedDojos() {
  return (
    <section className="affiliated-dojos-page">
      <div className="container">
        <h1 className="section-title">AFFILIATED DŌJŌS</h1>
        <p className="section-subtitle">Organization charts and affiliated Dōjō information</p>

        <section className="resource-panel anchor-section" id="karatedo-black-belt-chart">
          <h2>KarateDō Black Belt Chart</h2>
          <p>The World Budō Sosa-Kai KarateDō black belt chart and member record are available in the Members section.</p>
          <a className="link-button" href="/members#chart">View the KarateDō Black Belt Chart →</a>
        </section>

        {charts.map((chart) => <ChartSection chart={chart} key={chart.id} />)}

        <section className="resource-panel anchor-section" id="dojos-chart">
          <h2>Dōjōs Chart</h2>
          <p>The directory of affiliated World Budō Sosa-Kai Dōjōs will be published here.</p>
        </section>
      </div>
    </section>
  )
}
