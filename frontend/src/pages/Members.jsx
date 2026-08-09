import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const chartPages = Array.from({ length: 9 }, (_, index) => index + 1)

export default function Members() {
  const location = useLocation()
  const activeTab = location.hash === '#chart' ? 'chart' : 'training-program'

  useEffect(() => {
    document.getElementById(activeTab)?.focus({ preventScroll: true })
  }, [activeTab])

  return (
    <section className="members-page">
      <div className="container">
        <h1 className="section-title">MEMBERS</h1>
        <p className="section-subtitle">Member resources for training and progression</p>

        <div className="member-tabs" role="tablist" aria-label="Member resources">
          <Link to="/members#training-program" className={`member-tab ${activeTab === 'training-program' ? 'active' : ''}`} role="tab" aria-selected={activeTab === 'training-program'}>
            Training Program
          </Link>
          <Link to="/members#chart" className={`member-tab ${activeTab === 'chart' ? 'active' : ''}`} role="tab" aria-selected={activeTab === 'chart'}>
            Chart
          </Link>
        </div>

        {activeTab === 'training-program' ? (
          <div className="member-tab-panel" id="training-program" role="tabpanel" tabIndex="-1">
            <h2>Training Program</h2>
            <p>Member training program information and resources will be available here.</p>
          </div>
        ) : (
          <div className="member-chart-panel" id="chart" role="tabpanel" tabIndex="-1">
            <div className="chart-introduction">
              <p className="chart-kicker">WORLD UNION BUDŌ SOSA-KAI</p>
              <h2>Official Organization and Member Chart</h2>
              <p>International KarateDō Shito-Ryu Sosa-Kai · Nafudahio · 空手道組織図</p>
              <a className="document-download" href="/documents/official-member-chart.pdf" target="_blank" rel="noreferrer">View or download the original chart PDF</a>
            </div>

            <div className="chart-page-list">
              {chartPages.map((page) => (
                <figure className="chart-page" key={page}>
                  <img src={`/images/member-chart/page-${page}.png`} alt={`Official World Budō Sosa-Kai member chart, page ${page} of 9`} loading={page > 2 ? 'lazy' : 'eager'} />
                  <figcaption>Official member chart · Page {page} of 9</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
