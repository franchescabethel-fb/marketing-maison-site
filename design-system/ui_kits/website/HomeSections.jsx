/* Marketing Maison — UI Kit · Home page sections (Hero, Philosophy, ServiceGrid, PricingStrip) */

const SERVICES = [
  { num: '01', name: 'Email & SMS',                  blurb: 'The capture, the lifecycle, the revenue reporting. Hand-built on platforms you own outright.' },
  { num: '02', name: 'Website Strategy & Creation',  blurb: 'The foundation everything else points at. Built to convert and to outlast a redesign cycle.' },
  { num: '03', name: 'SEO',                          blurb: 'Durable organic discovery. We treat search as compounding real estate, not a monthly retainer.' },
  { num: '04', name: 'Referral & Direct Marketing',  blurb: 'Turn relationships into measurable pipeline. Track every introduction the way you track revenue.' },
  { num: '05', name: 'Social Media Strategy',        blurb: 'Treated as a rented channel — built to feed the owned ones, never to depend on them.' },
  { num: '06', name: 'AI Tools, Dashboards & Analytics', blurb: 'The operating system underneath. One dashboard, one source of truth, no spreadsheet sprawl.' },
];

const TIERS = [
  {
    name: 'Foundation', price: '$2,500', cadence: '/mo',
    eyebrow: 'Tier One',
    bullets: ['The diagnosis report', 'First owned channel built & launched', 'Monthly reporting dashboard', 'Quarterly strategy review'],
    featured: false,
  },
  {
    name: 'Full Infrastructure', price: '$5,000', cadence: '/mo',
    eyebrow: 'Tier Two · Most Common',
    bullets: ['All core owned channels operating', 'Lifecycle automation across email + SMS', 'SEO + content engine running', 'Referral tracking installed', 'Bi-weekly working sessions'],
    featured: true,
  },
  {
    name: 'Full System Build', price: '$8,500', cadence: '/mo',
    eyebrow: 'Tier Three',
    bullets: ['Everything in Full Infrastructure', 'AI tooling + custom dashboards', 'Direct mail + referral programs', 'Fractional CMO availability', 'Quarterly board-ready reports'],
    featured: false,
  },
];

function Hero({ go }) {
  return (
    <section className="mm-hero">
      <div className="mm-container">
        <div className="stack">
          <span className="mm-eyebrow">A Marketing Maison · Jacksonville, FL</span>
          <h1>
            The channels you don't own can disappear tomorrow.<br />
            <span className="accent"><em>We build the ones that don't.</em></span>
          </h1>
          <p className="lead">
            We diagnose where your marketing infrastructure is leaking, then install the owned channels — email, SMS, website, SEO, referral — that compound while everyone else is chasing the algorithm.
          </p>
          <div className="ctas">
            <button className="mm-btn mm-btn-primary" onClick={()=>go('diagnosis')}>Book a Diagnosis ↗</button>
            <button className="mm-btn mm-btn-ghost" onClick={()=>go('services')}>See the six service lines</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section className="mm-philosophy">
      <div className="mm-container">
        <div className="head">
          <span className="mm-eyebrow">The Philosophy</span>
          <h2>Owned channels compound. Rented channels evict you.</h2>
        </div>
        <div className="diptych">
          <div className="col">
            <h3>Own It</h3>
            <p className="big">Email · SMS · Website · SEO · Referral</p>
            <ul>
              <li>You control the audience, the data, and the cadence.</li>
              <li>Compounds month over month with no platform tax.</li>
              <li>Survives algorithm changes, ad cost spikes, and bans.</li>
              <li>Becomes a transferable asset on your balance sheet.</li>
            </ul>
          </div>
          <div className="col">
            <h3>Rent It</h3>
            <p className="big">Instagram · TikTok · Paid Social · Influencer</p>
            <ul>
              <li>You're a tenant. Rent goes up. Eviction is a policy change.</li>
              <li>Reach is metered, capped, and re-priced quarterly.</li>
              <li>Audience access can be revoked overnight.</li>
              <li>Useful — but only as a feeder for what you own.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceGrid({ go }) {
  return (
    <section className="mm-services">
      <div className="mm-container">
        <div className="head">
          <h2>Six Service Lines</h2>
          <button className="mm-btn mm-btn-outline" onClick={()=>go('services')}>See all in detail ↗</button>
        </div>
        <div className="grid">
          {SERVICES.map(s => (
            <div className="item" key={s.num}>
              <span className="num">— {s.num} / 06</span>
              <h3>{s.name}</h3>
              <p>{s.blurb}</p>
              <span className="more">Read the approach ↗</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingStrip({ go }) {
  return (
    <section className="mm-pricing">
      <div className="mm-container">
        <div className="head">
          <span className="mm-eyebrow">Engagement Tiers</span>
          <h2>Three ways to work together. Each one starts with a diagnosis.</h2>
        </div>
        <div className="tiers">
          {TIERS.map(t => (
            <div key={t.name} className={`tier ${t.featured ? 'featured' : ''}`}>
              <span className="tier-eyebrow">— {t.eyebrow}</span>
              <h3>{t.name}</h3>
              <div className="price">{t.price}<small>{t.cadence}</small></div>
              <ul>{t.bullets.map(b => <li key={b}>{b}</li>)}</ul>
              <button className={`mm-btn ${t.featured ? 'mm-btn-alt' : 'mm-btn-primary'}`} onClick={()=>go('diagnosis')}>
                Start with a diagnosis
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, PhilosophySection, ServiceGrid, PricingStrip, SERVICES, TIERS });
