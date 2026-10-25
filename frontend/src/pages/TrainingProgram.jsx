import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const disciplines = [
  {
    id: 'karatedo',
    name: 'KarateDō',
    logo: '/images/logo-karatedo.jpg',
    ranks: ['Jū-Kyū (10) to Kyū-Kyū (9)', 'Kyū-Kyū (9) to Hachi-Kyū (8)', 'Hachi-Kyū (8) to Nana-Kyū (7)', 'Nana-Kyū (7) to Roku-Kyū (6)', 'Roku-Kyū (6) to Go-Kyū (5)', 'Go-Kyū (5) to Yon-Kyū (4)', 'Yon-Kyū (4) to San-Kyū (3)', 'San-Kyū (3) to Ni-Kyū (2)', 'Ni-Kyū (2) to Ik-Kyū (1)', 'Ik-Kyū (1) to Shodan', 'Shodan to Nidan', 'Nidan to Sandan', 'Sandan to Yondan', 'Yondan to Godan'],
  },
  {
    id: 'kobudo',
    name: 'Ryū Kyū Kobudō',
    logo: '/images/logo-kobudo.jpg',
    ranks: ['Shoshinsha (8) to Nana-Kyū (7)', 'Nana-Kyū (7) to Roku-Kyū (6)', 'Roku-Kyū (6) to Go-Kyū (5)', 'Go-Kyū (5) to Yon-Kyū (4)', 'Yon-Kyū (4) to San-Kyū (3)', 'San-Kyū (3) to Ni-Kyū (2)', 'Ni-Kyū (2) to Ik-Kyū (1)', 'Ik-Kyū (1) to Shodan', 'Shodan to Nidan', 'Nidan to Sandan', 'Sandan to Yondan', 'Yondan to Godan'],
  },
  {
    id: 'iaido',
    name: 'Iaidō',
    logo: '/images/logo-iaido.jpg',
    ranks: ['Shoshinsha (6) to Go-Kyū (5)', 'Go-Kyū (5) to Yon-Kyū (4)', 'Yon-Kyū (4) to San-Kyū (3)', 'San-Kyū (3) to Ni-Kyū (2)', 'Ni-Kyū (2) to Ik-Kyū (1)', 'Ik-Kyū (1) to Shodan', 'Shodan to Nidan', 'Nidan to Sandan', 'Sandan to Yondan', 'Yondan to Godan'],
  },
  {
    id: 'taijutsu',
    name: 'Taijutsu',
    logo: '/images/logo-taijutsu.png',
    ranks: ['Shoshinsha (8) to Nana-Kyū (7)', 'Nana-Kyū (7) to Roku-Kyū (6)', 'Roku-Kyū (6) to Go-Kyū (5)', 'Go-Kyū (5) to Yon-Kyū (4)', 'Yon-Kyū (4) to San-Kyū (3)', 'San-Kyū (3) to Ni-Kyū (2)', 'Ni-Kyū (2) to Ik-Kyū (1)', 'Ik-Kyū (1) to Shodan', 'Shodan to Nidan', 'Nidan to Sandan', 'Sandan to Yondan', 'Yondan to Godan'],
  },
  {
    id: 'ninpo',
    name: 'Ninpō',
    logo: '/images/logo-ninpo.jpg',
    ranks: ['Karima (Beginner) to Shima Ik-Kai', 'Shima Ik-Kai to Shima Ni-Kai', 'Shima Ni-Kai to Genin Ik-Kai', 'Genin Ik-Kai to Genin Ni-Kai', 'Genin Ni-Kai to Chunin Ik-Kai', 'Chunin Ik-Kai to Chunin Ni-Kai', 'Chunin Ni-Kai to Chunin San-Kai', 'Chunin San-Kai to Yonin Shodan', 'Yonin Shodan to Yonin Nidan', 'Yonin Nidan to Yonin Sandan', 'Yonin Sandan to Yonin Yondan', 'Yonin Yondan to Yonin Godan'],
  },
]

const curriculumTopics = [
  'Sosa-Kai Budō Terminology',
  'Budō Sosa-Kai Principles and Standards',
  'Sosa-Kai Philosophical Mission',
  'Sosa-Kai Way of Life Standards',
]

const programTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'training', label: 'Training Focus' },
  { id: 'heritage', label: 'Heritage' },
  { id: 'curriculum', label: 'Curriculum' },
]

const demoContent = {
  overview: {
    title: 'About this martial art',
    text: 'Demo text: This program introduces the history, purpose, etiquette, and core methods of the discipline. Students develop confidence, awareness, coordination, and respect through consistent practice.',
  },
  training: {
    title: 'What students practice',
    text: 'Demo text: Classes combine foundational movement, technical exercises, partner practice, and progressive skill development. Training is adapted to the student’s experience while preserving traditional standards.',
  },
  heritage: {
    title: 'Tradition and lineage',
    text: 'Demo text: This discipline is taught as part of the World Budō Sosa-Kai tradition. Future content will explain its masters, lineage, cultural background, and continuing role within the organization.',
  },
}

export default function TrainingProgram() {
  const [session, setSession] = useState({ loading: true, authenticated: false, programs: [] })
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [programPasswords, setProgramPasswords] = useState({})
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [activeTabs, setActiveTabs] = useState(() => Object.fromEntries(disciplines.map(({ id }) => [id, 'overview'])))

  useEffect(() => {
    fetch('/api/training/session')
      .then((response) => response.json())
      .then((data) => setSession({ loading: false, ...data }))
      .catch(() => setSession({ loading: false, authenticated: false, programs: [] }))
  }, [])

  async function login(event) {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    try {
      const response = await fetch('/api/training/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Login failed')
      setSession({ loading: false, ...data })
      setCredentials({ username: '', password: '' })
    } catch (error) {
      setMessage(error.message)
    } finally {
      setBusy(false)
    }
  }

  async function unlockProgram(event, program) {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    try {
      const response = await fetch('/api/training/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ program, password: programPasswords[program] || '' }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Access could not be granted')
      setSession((current) => ({ ...current, programs: data.programs }))
      setProgramPasswords((current) => ({ ...current, [program]: '' }))
    } catch (error) {
      setMessage(error.message)
    } finally {
      setBusy(false)
    }
  }

  async function logout() {
    await fetch('/api/training/logout', { method: 'POST' })
    setSession({ loading: false, authenticated: false, programs: [] })
    setMessage('')
  }

  if (session.loading) {
    return <section className="training-access-page"><div className="training-loading">Checking member access…</div></section>
  }

  if (!session.authenticated) {
    return (
      <section className="training-access-page">
        <div className="training-login-shell">
          <div className="training-login-header">
            <p className="chart-section-label">AUTHORIZED MEMBERS ONLY</p>
            <h1>SOSA-KAI MEMBERS TRAINING PROGRAM</h1>
            <p>This section contains confidential training materials and technical programs exclusively for authorized World Budō Sosa-Kai members.</p>
          </div>

          <div className="training-brand-panel" aria-hidden="true">
            <img src="/images/red_logo.png" alt="" />
            <div className="training-discipline-logos">
              {disciplines.map((discipline) => <img src={discipline.logo} alt="" key={discipline.id} />)}
            </div>
          </div>

          <form className="training-login-form" onSubmit={login}>
            <h2>Members Access</h2>
            <label htmlFor="member-username">Member ID / Username</label>
            <input id="member-username" autoComplete="username" value={credentials.username} onChange={(event) => setCredentials({ ...credentials, username: event.target.value })} required />
            <label htmlFor="member-password">Password</label>
            <input id="member-password" type="password" autoComplete="current-password" value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} required />
            {message && <p className="training-form-message" role="alert">{message}</p>}
            <button type="submit" disabled={busy}>{busy ? 'Checking Access…' : 'Access Training Program'}</button>
          </form>

          <p className="training-access-help">If you are an authorized Sosa-Kai member and do not have your access information, please <Link to="/contact">contact the Sosa-Kai administration</Link>.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="training-curriculum-page">
      <div className="container training-curriculum-container">
        <div className="curriculum-account-bar">
          <span>Signed in as <strong>{session.username}</strong></span>
          <button type="button" onClick={logout}>Sign Out</button>
        </div>

        <header className="curriculum-hero">
          <img src="/images/red_logo.png" alt="World Budō Sosa-Kai emblem" />
          <p className="chart-section-label">DŌJŌ OF KNOWLEDGE</p>
          <h1>SOSA-KAI BUDŌ CURRICULUM</h1>
          <p className="curriculum-welcome">Welcome to the Dōjō of Knowledge, the home of our World Budō Sosa-Kai family.</p>
          <p>True Budō learning goes far beyond a single discipline. This curriculum is dedicated to the study, practice, and understanding of the five Martial Arts that form part of our tradition: KarateDō, Ryū Kyū Kobudō, Iaidō, Taijutsu, and Ninpō.</p>
          <p><strong>Five Arts. One Path. A Life Dedicated to Budō.</strong></p>
        </header>

        <div className="curriculum-topic-grid" aria-label="General curriculum topics">
          {curriculumTopics.map((topic) => <div className="curriculum-topic" key={topic}>{topic}<span>Materials coming soon</span></div>)}
        </div>

        <div className="training-chart-heading">
          <p className="chart-section-label">WORLD BUDŌ SOSA-KAI CHART</p>
          <h2>Martial Arts Training Programs</h2>
          <p>Each discipline is protected separately so members see only the programs they are authorized to practice.</p>
        </div>

        {message && <p className="training-form-message curriculum-message" role="alert">{message}</p>}

        <nav className="training-program-jump-nav" aria-label="Martial arts programs">
          {disciplines.map((discipline) => <a href={`#${discipline.id}`} key={discipline.id}>{discipline.name}</a>)}
        </nav>

        <div className="training-program-pages">
          {disciplines.map((discipline) => {
            const unlocked = session.programs?.includes(discipline.id)
            const activeTab = activeTabs[discipline.id] || 'overview'
            return (
              <article id={discipline.id} className={`training-program-card training-program-page ${unlocked ? 'is-unlocked' : 'is-locked'}`} key={discipline.id}>
                <div className="training-program-title">
                  <img src={discipline.logo} alt="" />
                  <div><span>{unlocked ? 'Access Granted' : 'Protected Program'}</span><h3>{discipline.name}</h3></div>
                </div>

                <div className="training-program-tabs" role="tablist" aria-label={`${discipline.name} information`}>
                  {programTabs.map((tab) => (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      className={activeTab === tab.id ? 'is-active' : ''}
                      onClick={() => setActiveTabs((current) => ({ ...current, [discipline.id]: tab.id }))}
                      key={tab.id}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {activeTab !== 'curriculum' ? (
                  <div className="training-program-tab-panel" role="tabpanel">
                    <p className="chart-section-label">{discipline.name}</p>
                    <h4>{demoContent[activeTab].title}</h4>
                    <p>{demoContent[activeTab].text}</p>
                    <button type="button" className="program-curriculum-cta" onClick={() => setActiveTabs((current) => ({ ...current, [discipline.id]: 'curriculum' }))}>View protected curriculum</button>
                  </div>
                ) : unlocked ? (
                  <div className="protected-curriculum-viewer">
                    <div className="protected-curriculum-actions">
                      <strong>{discipline.name} Curriculum</strong>
                      <a href={`/api/training/curriculum/${discipline.id}`} target="_blank" rel="noreferrer">Open full size ↗</a>
                    </div>
                    <img src={`/api/training/curriculum/${discipline.id}/preview`} alt={`${discipline.name} protected curriculum`} />
                    <details>
                      <summary>View Ranking Requirements</summary>
                      <ol>{discipline.ranks.map((rank) => <li key={rank}>{rank}</li>)}</ol>
                    </details>
                  </div>
                ) : (
                  <form className="program-unlock-panel" onSubmit={(event) => unlockProgram(event, discipline.id)}>
                    <h4>Unlock the {discipline.name} curriculum</h4>
                    <p>This curriculum is available only to authorized students of this discipline.</p>
                    <label htmlFor={`${discipline.id}-password`}>{discipline.name} program password</label>
                    <div className="program-password-row">
                      <input id={`${discipline.id}-password`} type="password" autoComplete="off" value={programPasswords[discipline.id] || ''} onChange={(event) => setProgramPasswords({ ...programPasswords, [discipline.id]: event.target.value })} required />
                      <button type="submit" disabled={busy}>Unlock</button>
                    </div>
                  </form>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
