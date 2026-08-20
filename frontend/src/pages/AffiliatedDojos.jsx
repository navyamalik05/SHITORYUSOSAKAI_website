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

        <section className="resource-panel anchor-section" id="kobudo-chart"><h2>RyūKyū Kobudō Chart</h2><p>The official RyūKyū Kobudō chart will be published here.</p></section>
        <section className="resource-panel anchor-section" id="iaido-chart"><h2>Iaidō Chart</h2><p>The official Iaidō chart will be published here.</p></section>
        <section className="resource-panel anchor-section" id="ninpo-chart"><h2>Ninpō Chart</h2><p>The official Ninpō chart will be published here.</p></section>
        <section className="resource-panel anchor-section" id="taijutsu-chart"><h2>Tai-Jutsu Chart</h2><p>The official Tai-Jutsu chart will be published here.</p></section>

        <section className="resource-panel anchor-section" id="dojos-chart">
          <h2>Dōjōs Chart</h2>
          <p>The directory of affiliated World Budō Sosa-Kai Dōjōs will be published here.</p>
        </section>
      </div>
    </section>
  )
}
