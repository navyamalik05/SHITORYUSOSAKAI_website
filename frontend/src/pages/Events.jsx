import { useEffect, useState } from 'react'
import DocumentTabs from '../components/DocumentTabs.jsx'

const emptyEvent = {
  title: '',
  subtitle: '',
  date: '',
  location: '',
  description: '',
  youtube_url: '',
  external_url: '',
  media: [],
}

function toDateTimeInput(value) {
  if (!value) return ''
  return value.replace(' ', 'T').slice(0, 16)
}

function getYouTubeEmbedUrl(value) {
  if (!value) return null
  try {
    const url = new URL(value)
    let videoId = url.hostname.includes('youtu.be') ? url.pathname.slice(1) : url.searchParams.get('v')
    if (!videoId && url.pathname.includes('/shorts/')) videoId = url.pathname.split('/shorts/')[1]
    if (!videoId && url.pathname.includes('/embed/')) videoId = url.pathname.split('/embed/')[1]
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId.split('/')[0]}` : null
  } catch {
    return null
  }
}

function EventCard({ event, isAdmin, onEdit, onDelete }) {
  const images = event.media?.filter((item) => item.media_type === 'image') || []
  const pdfs = event.media?.filter((item) => item.media_type === 'pdf') || []
  const videos = event.media?.filter((item) => item.media_type === 'video') || []
  const embedUrl = getYouTubeEmbedUrl(event.youtube_url)
  const date = new Date(event.date.replace(' ', 'T'))

  return (
    <article className={`event-feature ${images.length ? '' : 'event-feature-no-image'}`}>
      {images.length > 0 && (
        <div className="event-media-column">
          <img className="event-feature-image" src={images[0].url} alt={`${event.title} featured`} />
          {images.length > 1 && (
            <div className="event-image-thumbnails">
              {images.slice(1, 5).map((image) => <img src={image.url} alt={`${event.title} gallery`} key={image.id} />)}
            </div>
          )}
        </div>
      )}

      <div className="event-feature-content">
        <p className="event-date-label">
          <time dateTime={event.date}>{date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</time>
          <span> · {date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}</span>
        </p>
        <h2>{event.title}</h2>
        <span className="event-heading-accent" aria-hidden="true"></span>
        {event.subtitle && <p className="event-subtitle">{event.subtitle}</p>}
        {event.location && <p className="event-location"><span aria-hidden="true">●</span> {event.location}</p>}
        {event.description && <p className="event-description">{event.description}</p>}

        <div className="event-resource-links">
          {event.external_url && <a className="event-action-button" href={event.external_url} target="_blank" rel="noreferrer">Event Details ↗</a>}
          {pdfs.map((pdf) => <a className="event-document-link" href={`${pdf.url}?download=1`} key={pdf.id}>Download {pdf.filename}</a>)}
        </div>

        {videos.length > 0 && (
          <div className="event-video-grid">
            {videos.map((video) => <video controls preload="metadata" key={video.id}><source src={video.url} type={video.mime_type} /></video>)}
          </div>
        )}

        {embedUrl && (
          <div className="event-youtube-frame">
            <iframe src={embedUrl} title={`${event.title} video`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        )}

        {isAdmin && (
          <div className="event-admin-actions">
            <button type="button" onClick={() => onEdit(event)}>Edit Event</button>
            <button className="danger" type="button" onClick={() => onDelete(event)}>Delete</button>
          </div>
        )}
      </div>
    </article>
  )
}

function LoginModal({ onClose, onLoggedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setSending(true)
    setError('')
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'Login failed')
      onLoggedIn(result)
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="admin-modal admin-login-modal" role="dialog" aria-modal="true" aria-labelledby="admin-login-title">
        <button className="admin-modal-close" type="button" aria-label="Close admin login" onClick={onClose}>×</button>
        <p className="chart-section-label">AUTHORIZED USERS ONLY</p>
        <h2 id="admin-login-title">News &amp; Events Admin</h2>
        <p>Sign in with an approved email address to manage announcements.</p>
        {error && <div className="form-message error">{error}</div>}
        <form onSubmit={submit}>
          <div className="form-group"><label htmlFor="admin-email">Email</label><input id="admin-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
          <div className="form-group"><label htmlFor="admin-password">Password</label><input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
          <button className="btn btn-primary" type="submit" disabled={sending}>{sending ? 'SIGNING IN…' : 'SIGN IN'}</button>
        </form>
      </section>
    </div>
  )
}

function EventEditor({ event, onClose, onSaved, onMediaDeleted }) {
  const [form, setForm] = useState({ ...emptyEvent, ...event, date: toDateTimeInput(event?.date) })
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  function update(eventChange) {
    setForm((previous) => ({ ...previous, [eventChange.target.name]: eventChange.target.value }))
  }

  async function submit(eventSubmit) {
    eventSubmit.preventDefault()
    setSaving(true)
    setError('')
    const payload = new FormData()
    Object.entries(form).forEach(([key, value]) => { if (key !== 'media' && value != null) payload.append(key, value) })
    files.forEach((file) => payload.append('media', file))

    try {
      const response = await fetch(event?.id ? `/api/admin/events/${event.id}` : '/api/admin/events', {
        method: event?.id ? 'PUT' : 'POST',
        body: payload,
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'The event could not be saved')
      onSaved(result)
    } catch (saveError) {
      setError(saveError.message)
    } finally {
      setSaving(false)
    }
  }

  async function removeMedia(media) {
    if (!window.confirm(`Remove ${media.filename}?`)) return
    const response = await fetch(`/api/admin/event-media/${media.id}`, { method: 'DELETE' })
    if (!response.ok) {
      setError('The file could not be removed')
      return
    }
    setForm((previous) => ({ ...previous, media: previous.media.filter((item) => item.id !== media.id) }))
    onMediaDeleted()
  }

  return (
    <div className="admin-modal-backdrop" role="presentation">
      <section className="admin-modal event-editor-modal" role="dialog" aria-modal="true" aria-labelledby="event-editor-title">
        <button className="admin-modal-close" type="button" aria-label="Close event editor" onClick={onClose}>×</button>
        <p className="chart-section-label">NEWS &amp; EVENTS EDITOR</p>
        <h2 id="event-editor-title">{event?.id ? 'Update Event' : 'Create an Event'}</h2>
        {error && <div className="form-message error">{error}</div>}
        <form className="event-editor-form" onSubmit={submit}>
          <div className="form-group"><label htmlFor="event-title">Title *</label><input id="event-title" name="title" value={form.title} onChange={update} maxLength="200" required /></div>
          <div className="form-group"><label htmlFor="event-subtitle">Subtitle</label><input id="event-subtitle" name="subtitle" value={form.subtitle} onChange={update} maxLength="300" /></div>
          <div className="event-form-row">
            <div className="form-group"><label htmlFor="event-date">Date &amp; Time *</label><input id="event-date" name="date" type="datetime-local" value={form.date} onChange={update} required /></div>
            <div className="form-group"><label htmlFor="event-location">Location</label><input id="event-location" name="location" value={form.location} onChange={update} maxLength="200" /></div>
          </div>
          <div className="form-group"><label htmlFor="event-description">Description</label><textarea id="event-description" name="description" value={form.description} onChange={update} maxLength="10000"></textarea></div>
          <div className="event-form-row">
            <div className="form-group"><label htmlFor="event-youtube">YouTube Link</label><input id="event-youtube" name="youtube_url" type="url" value={form.youtube_url} onChange={update} placeholder="https://youtube.com/watch?v=…" /></div>
            <div className="form-group"><label htmlFor="event-link">Event or Registration Link</label><input id="event-link" name="external_url" type="url" value={form.external_url} onChange={update} placeholder="https://…" /></div>
          </div>
          <div className="form-group event-file-input">
            <label htmlFor="event-media">Add Images, PDFs, or Videos</label>
            <input id="event-media" type="file" accept="image/jpeg,image/png,image/webp,image/gif,application/pdf,video/mp4,video/webm,video/quicktime" multiple onChange={(eventFiles) => setFiles([...eventFiles.target.files])} />
            <small>Images and PDFs: up to 15 MB each. Videos: up to 50 MB each.</small>
          </div>
          {form.media?.length > 0 && (
            <div className="existing-event-media">
              <strong>Current files</strong>
              {form.media.map((media) => <button type="button" onClick={() => removeMedia(media)} key={media.id}>{media.filename} <span>Remove</span></button>)}
            </div>
          )}
          <div className="event-editor-actions">
            <button className="btn" type="button" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? 'SAVING…' : 'SAVE EVENT'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [admin, setAdmin] = useState({ authenticated: false, email: null })
  const [showLogin, setShowLogin] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [showEditor, setShowEditor] = useState(false)

  async function loadEvents() {
    try {
      const response = await fetch('/api/events')
      if (!response.ok) throw new Error('News and events could not be loaded')
      setEvents(await response.json())
      setError('')
    } catch (loadError) {
      setError(loadError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
    fetch('/api/admin/session').then((response) => response.json()).then(setAdmin).catch(() => {})
  }, [])

  function openEditor(event = null) {
    setEditingEvent(event)
    setShowEditor(true)
  }

  async function deleteEvent(event) {
    if (!window.confirm(`Delete “${event.title}”? This cannot be undone.`)) return
    const response = await fetch(`/api/admin/events/${event.id}`, { method: 'DELETE' })
    if (response.ok) loadEvents()
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    setAdmin({ authenticated: false, email: null })
  }

  return (
    <section className="events-page">
      <button className="admin-side-button" type="button" onClick={() => admin.authenticated ? openEditor() : setShowLogin(true)}>
        <span aria-hidden="true">⚙</span> {admin.authenticated ? 'Add Event' : 'Admin Login'}
      </button>

      <div className="container events-container">
        <header className="events-page-header">
          <p className="chart-section-label">WORLD BUDŌ SOSA-KAI</p>
          <h1 className="section-title">NEWS &amp; EVENTS</h1>
          <p className="section-subtitle">Announcements, seminars, tournaments, promotions, and special events from our worldwide martial arts community.</p>
          {admin.authenticated && <div className="admin-session-bar"><span>Signed in as {admin.email}</span><button type="button" onClick={logout}>Log Out</button></div>}
        </header>

        <DocumentTabs
          title="News & Events Archive"
          intro="Current World Budō Sosa-Kai news and events held to date."
          items={[
            {
              id: 'news-events-2026-2027',
              label: '2026-2027',
              title: 'News & Events 2026-2027',
              description: 'Official News & Events archive supplied for the Affiliated Dōjōs News & Events section.',
              pdf: '/documents/news-events/news-events-2026-2027.pdf',
              basePath: '/images/news-events',
              pages: 8,
              accordion: 'pages',
            },
          ]}
        />

        {loading ? (
          <div className="events-empty-state"><p>Loading news and events…</p></div>
        ) : error ? (
          <div className="events-empty-state error"><p>{error}</p></div>
        ) : events.length ? (
          <div className="event-feature-list">
            {events.map((event) => <EventCard event={event} isAdmin={admin.authenticated} onEdit={openEditor} onDelete={deleteEvent} key={event.id} />)}
          </div>
        ) : (
          <div className="events-empty-state">
            <p className="chart-section-label">MORE TO COME</p>
            <h2>No events are scheduled right now.</h2>
            <p>Check back soon for upcoming seminars, tournaments, belt promotions, and community news.</p>
            {admin.authenticated && <button className="event-action-button" type="button" onClick={() => openEditor()}>Create the First Event</button>}
          </div>
        )}
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLoggedIn={(result) => { setAdmin(result); setShowLogin(false); openEditor() }} />}
      {showEditor && <EventEditor event={editingEvent} onClose={() => setShowEditor(false)} onMediaDeleted={loadEvents} onSaved={() => { setShowEditor(false); loadEvents() }} />}
    </section>
  )
}
