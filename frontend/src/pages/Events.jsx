export default function Events() {
  return (
    <section style={{ padding: '4rem 2rem' }}>
      <div className="container">
        <h1 className="section-title">UPCOMING EVENTS</h1>
        <p className="section-subtitle">Join us for tournaments, belt testings, and special events</p>

        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center', color: '#666' }}>
            <p>No events scheduled at this time.</p>
            <p style={{ marginTop: '1rem' }}>Check back soon for upcoming events!</p>
          </div>
        </div>
      </div>
    </section>
  )
}
