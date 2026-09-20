import { useState } from 'react'

function DocumentPageList({ pages, basePath, title }) {
  return (
    <div className="document-page-list">
      {Array.from({ length: pages }, (_, index) => index + 1).map((page) => (
        <article className="website-chart-sheet document-page-sheet" key={page}>
          <div className="chart-sheet-header">
            <span>{title}</span>
            <span>Page {page} of {pages}</span>
          </div>
          <img
            src={`${basePath}/page-${page}.jpg`}
            alt={`${title}, page ${page} of ${pages}`}
            loading={page === 1 ? 'eager' : 'lazy'}
          />
        </article>
      ))}
    </div>
  )
}

function ImagePanel({ item }) {
  return (
    <figure className="document-image-panel">
      <img src={item.image} alt={item.alt || item.label} loading="lazy" />
      {item.caption && <figcaption>{item.caption}</figcaption>}
    </figure>
  )
}

export default function DocumentTabs({ title, intro, items }) {
  const [activeId, setActiveId] = useState(items[0]?.id)
  const activeItem = items.find((item) => item.id === activeId) || items[0]

  if (!activeItem) return null

  return (
    <section className="document-tabs-card">
      {(title || intro) && (
        <div className="document-tabs-heading">
          {title && <h3>{title}</h3>}
          {intro && <p>{intro}</p>}
        </div>
      )}

      <div className="document-tab-buttons" role="tablist" aria-label={title || 'Document tabs'}>
        {items.map((item) => (
          <button
            type="button"
            role="tab"
            className={`document-tab-button ${activeItem.id === item.id ? 'active' : ''}`}
            aria-selected={activeItem.id === item.id}
            aria-controls={`${item.id}-panel`}
            id={`${item.id}-tab`}
            onClick={() => setActiveId(item.id)}
            key={item.id}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        className="document-tab-panel"
        id={`${activeItem.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${activeItem.id}-tab`}
      >
        <div className="document-tab-panel-heading">
          <div>
            <p className="chart-section-label">{activeItem.kicker || 'WORLD BUDŌ SOSA-KAI'}</p>
            <h4>{activeItem.title || activeItem.label}</h4>
            {activeItem.description && <p>{activeItem.description}</p>}
          </div>
          {activeItem.pdf && (
            <a className="chart-pdf-link" href={activeItem.pdf} target="_blank" rel="noreferrer">
              Open original PDF <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>

        {activeItem.type === 'image' ? (
          <ImagePanel item={activeItem} />
        ) : (
          <DocumentPageList pages={activeItem.pages} basePath={activeItem.basePath} title={activeItem.title || activeItem.label} />
        )}
      </div>
    </section>
  )
}
