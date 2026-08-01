import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

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
          <Link
            to="/members#training-program"
            className={`member-tab ${activeTab === 'training-program' ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === 'training-program'}
          >
            Training Program
          </Link>
          <Link
            to="/members#chart"
            className={`member-tab ${activeTab === 'chart' ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === 'chart'}
          >
            Chart
          </Link>
        </div>

        {activeTab === 'training-program' ? (
          <div className="member-tab-panel" id="training-program" role="tabpanel" tabIndex="-1">
            <h2>Training Program</h2>
            <p>Member training program information and resources will be available here.</p>
          </div>
        ) : (
          <div className="member-tab-panel" id="chart" role="tabpanel" tabIndex="-1">
            <h2>Chart</h2>
            <p>The members chart will be available here.</p>
          </div>
        )}
      </div>
    </section>
  )
}
