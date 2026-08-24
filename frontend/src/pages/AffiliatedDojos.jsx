import { Link, useLocation } from 'react-router-dom'

const charts = [
  {
    id: 'kobudo-chart',
    shortTitle: 'RyūKyū Kobudō',
    title: 'RyūKyū Kobudō Chart',
    description: 'Official Ryū Kyū Kobudō lineage and international organization chart.',
    slug: 'ryukyu-kobudo',
    pdf: 'ryukyu-kobudo-chart.pdf',
    pages: 3,
  },
  {
    id: 'iaido-chart',
    shortTitle: 'Iaidō Tora-Ryū',
    title: 'Iaidō Tora-Ryū Chart',
    description: 'Official Iaidō Tora-Ryū lineage and international organization chart.',
    slug: 'iaido',
    pdf: 'iaido-tora-ryu-chart.pdf',
    pages: 3,
  },
  {
    id: 'ninpo-chart',
    shortTitle: 'Ninpō',
    title: 'Ninpō Chart',
    description: 'Official Yukirenshi Ninpō-Kai lineage and international organization chart.',
    slug: 'ninpo',
    pdf: 'ninpo-chart.pdf',
    pages: 2,
  },
  {
    id: 'taijutsu-chart',
    shortTitle: 'Tai-Jutsu',
    title: 'Tai-Jutsu Chart',
    description: 'Official Tai-Jutsu Gōdai-Ryū lineage and international organization chart.',
    slug: 'taijutsu',
    pdf: 'taijutsu-chart.pdf',
    pages: 3,
  },
]

const navigationItems = [
  { id: 'karatedo-black-belt-chart', label: 'KarateDō Black Belt' },
  ...charts.map((chart) => ({ id: chart.id, label: chart.shortTitle })),
  { id: 'dojos-chart', label: 'Affiliated Dōjōs' },
]

function ChartPanel({ chart }) {
  return (
    <div className="affiliated-chart-content">
      <div className="chart-content-heading">
        <div>
          <p className="chart-section-label">WORLD BUDŌ SOSA-KAI · OFFICIAL CHART</p>
          <h2>{chart.title}</h2>
          <p>{chart.description}</p>
        </div>
        <a className="chart-pdf-link" href={`/documents/charts/${chart.pdf}`} target="_blank" rel="noreferrer">
          Open original PDF <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="affiliated-chart-pages">
        {Array.from({ length: chart.pages }, (_, index) => index + 1).map((page) => (
          <article className="website-chart-sheet" key={page}>
            <div className="chart-sheet-header">
              <span>{chart.shortTitle}</span>
              <span>Page {page} of {chart.pages}</span>
            </div>
            <img
              src={`/images/affiliated-charts/${chart.slug}/page-${page}.jpg`}
              alt={`${chart.title}, page ${page} of ${chart.pages}`}
              loading={page === 1 ? 'eager' : 'lazy'}
            />
          </article>
        ))}
      </div>
    </div>
  )
}

export default function AffiliatedDojos() {
  const location = useLocation()
  const requestedId = location.hash.replace('#', '')
  const activeId = navigationItems.some((item) => item.id === requestedId)
    ? requestedId
    : 'karatedo-black-belt-chart'
  const activeChart = charts.find((chart) => chart.id === activeId)

  return (
    <section className="affiliated-dojos-page">
      <div className="container">
        <div className="affiliated-page-intro">
          <p className="chart-section-label">WORLD BUDŌ SOSA-KAI</p>
          <h1 className="section-title">AFFILIATED DŌJŌS</h1>
          <p className="section-subtitle">Explore official organization charts and affiliated Dōjō information.</p>
        </div>

        <div className="affiliated-tabs-layout">
          <aside className="chart-side-navigation" aria-label="Affiliated Dōjō chart sections">
            <h2>Charts</h2>
            <span className="side-nav-accent" aria-hidden="true"></span>
            <nav>
              {navigationItems.map((item) => (
                <Link
                  className={`chart-side-link ${activeId === item.id ? 'active' : ''}`}
                  to={`/affiliated-dojos#${item.id}`}
                  aria-current={activeId === item.id ? 'page' : undefined}
                  key={item.id}
                >
                  {item.label}
                  <span aria-hidden="true">›</span>
                </Link>
              ))}
            </nav>
          </aside>

          <section className="affiliated-tab-panel anchor-section" id={activeId} tabIndex="-1" aria-live="polite">
            {activeChart ? (
              <ChartPanel chart={activeChart} />
            ) : activeId === 'karatedo-black-belt-chart' ? (
              <div className="affiliated-empty-state">
                <p className="chart-section-label">MEMBER RESOURCE</p>
                <h2>KarateDō Black Belt Chart</h2>
                <p>The World Budō Sosa-Kai KarateDō black belt chart and member record are maintained in the Members section.</p>
                <Link className="link-button" to="/members#chart">View the KarateDō Black Belt Chart →</Link>
              </div>
            ) : (
              <div className="affiliated-empty-state">
                <p className="chart-section-label">WORLDWIDE DIRECTORY</p>
                <h2>Affiliated Dōjōs</h2>
                <p>The directory of affiliated World Budō Sosa-Kai Dōjōs will be published here.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  )
}
