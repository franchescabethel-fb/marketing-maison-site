/* Marketing Maison — UI Kit · Inner pages (Services, Pricing, Diagnosis, Dispatch) */

const SERVICE_DETAILS = [
  {
    num: '01', name: 'Email & SMS',
    pitch: 'Your list is the only audience an algorithm can\'t take from you. We design the capture, the lifecycle, and the revenue reporting — then hand you a system you actually own.',
    deliverables: ['Capture audit + form rebuild', 'Welcome + nurture sequences', 'Win-back + lapsed flows', 'SMS compliance + cadence plan', 'Revenue dashboard', 'Quarterly list-health review'],
  },
  {
    num: '02', name: 'Website Strategy & Creation',
    pitch: 'The foundation everything else points at. We build sites that convert today and survive a five-year strategic horizon — not Webflow gymnastics that age in eighteen months.',
    deliverables: ['Architecture + IA', 'Conversion-led redesign', 'CMS handoff training', 'Page-speed + Core Web Vitals', 'A/B test scaffolding', 'Accessibility audit'],
  },
  {
    num: '03', name: 'SEO',
    pitch: 'Durable organic discovery. We treat search as compounding real estate — keyword equity, technical hygiene, and content that earns its place over years, not weeks.',
    deliverables: ['Technical SEO audit', 'Keyword + intent map', 'Editorial calendar', 'Internal-linking strategy', 'Schema + metadata system', 'Quarterly SERP reporting'],
  },
  {
    num: '04', name: 'Referral & Direct Marketing',
    pitch: 'Turn relationships into measurable pipeline. We instrument the most ignored channel in B2B and B2C — word-of-mouth — so it\'s as trackable as paid.',
    deliverables: ['Referral program design', 'Tracking + attribution build', 'Direct mail campaigns', 'Partner co-marketing playbook', 'Incentive structure', 'Cohort revenue reporting'],
  },
  {
    num: '05', name: 'Social Media Strategy',
    pitch: 'We treat social as a rented channel — built to feed the owned ones, never to depend on them. The goal is not virality; it is conversion into list, into appointment, into revenue.',
    deliverables: ['Platform-fit assessment', 'Content pillars + cadence', 'List-capture funnels', 'Repurposing engine', 'Creator-asset library', 'Monthly performance review'],
  },
  {
    num: '06', name: 'AI Tools, Dashboards & Analytics',
    pitch: 'The operating system underneath. One dashboard, one source of truth, no spreadsheet sprawl. AI does the rote work; humans do the judgment.',
    deliverables: ['Single-source dashboard build', 'Pipeline + attribution model', 'AI assistant configuration', 'SOP automation', 'Monthly insight memos', 'Tool stack rationalization'],
  },
];

function PageHome({ go }) {
  return (
    <main>
      <Hero go={go} />
      <PhilosophySection />
      <ServiceGrid go={go} />
      <PricingStrip go={go} />
      <DispatchCTA go={go} />
    </main>
  );
}

function PageServices({ go }) {
  return (
    <main>
      <section className="mm-pagehead">
        <div className="mm-container">
          <span className="mm-eyebrow">Six Service Lines</span>
          <h1>Each service is an owned-channel asset. Together they're a system.</h1>
          <p className="lead">We don't sell standalone deliverables. The lines below compound — email feeds referral, SEO feeds email, dashboards make all of it visible. Read each one, then pick the right engagement tier.</p>
        </div>
      </section>
      <section className="mm-svc-rows">
        <div className="mm-container">
          {SERVICE_DETAILS.map(s => (
            <div className="row" key={s.num}>
              <div>
                <div className="num">— {s.num} / 06</div>
                <h3>{s.name}</h3>
                <button className="mm-btn mm-btn-outline" onClick={()=>go('diagnosis')}>Discuss this line ↗</button>
              </div>
              <div className="body">
                <p>{s.pitch}</p>
                <ul className="deliverables">
                  {s.deliverables.map(d => <li key={d}>{d}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
      <DispatchCTA go={go} />
    </main>
  );
}

function PagePricing({ go }) {
  return (
    <main>
      <section className="mm-pagehead">
        <div className="mm-container">
          <span className="mm-eyebrow">Engagement Tiers</span>
          <h1>Three monthly retainers. One starting point — the diagnosis.</h1>
          <p className="lead">Every engagement begins with a paid two-week diagnosis. From there, we recommend the tier that matches the gap. No setup fees, no annual contracts, month-to-month after the first 90 days.</p>
        </div>
      </section>
      <PricingStrip go={go} />
      <section style={{padding:'64px 0 112px',background:'var(--paper-cream)'}}>
        <div className="mm-container" style={{maxWidth:760}}>
          <hr className="mm-rule-heavy" style={{maxWidth:48,margin:'0 0 24px'}}/>
          <h3 style={{fontFamily:'var(--font-editorial)',fontWeight:400,fontSize:28,lineHeight:1.2,margin:'0 0 18px'}}>Footnotes &amp; fine print.</h3>
          <p style={{fontFamily:'var(--font-body)',fontSize:15,lineHeight:1.7,color:'var(--charcoal-500)',margin:'0 0 14px'}}>§ All tiers include the diagnosis report, written transparently, with our actual recommendation — not a sales document.</p>
          <p style={{fontFamily:'var(--font-body)',fontSize:15,lineHeight:1.7,color:'var(--charcoal-500)',margin:'0 0 14px'}}>§ Tools (ESP, dashboarding, CRM) are billed at cost and passed through. We hold no platform partnerships.</p>
          <p style={{fontFamily:'var(--font-body)',fontSize:15,lineHeight:1.7,color:'var(--charcoal-500)',margin:0}}>§ One-time builds (e.g. a website only) are quoted as fixed-fee projects outside these tiers.</p>
        </div>
      </section>
      <DispatchCTA go={go} />
    </main>
  );
}

function PageDiagnosis({ go }) {
  const [sent, setSent] = React.useState(false);
  return (
    <main>
      <section className="mm-pagehead">
        <div className="mm-container">
          <span className="mm-eyebrow">Book a Diagnosis</span>
          <h1>Tell us what's broken. We'll tell you what to build.</h1>
          <p className="lead">Two weeks. One report. A direct recommendation on which owned channel to install first — whether you hire us or not.</p>
        </div>
      </section>
      <section className="mm-form-page">
        <div className="mm-container">
          <div className="grid">
            <aside className="side">
              <h3>What you'll get</h3>
              <p>A written diagnosis of where your marketing infrastructure is leaking — and a prioritized fix order.</p>
              <h3>What it costs</h3>
              <p>$1,500, applied to the first month of any ongoing engagement. Refunded if we're not the right fit.</p>
              <h3>How long</h3>
              <p>Two weeks from kickoff to delivered report, plus a 60-minute working session.</p>
              <h3>Who runs it</h3>
              <p>Both founders. Every diagnosis. No junior account managers; no offshoring.</p>
            </aside>
            <div>
              {sent ? (
                <div style={{padding:'48px 40px',border:'1px solid var(--rule-hairline)',background:'var(--paper-bone)'}}>
                  <span className="mm-eyebrow">Received</span>
                  <p style={{fontFamily:'var(--font-editorial)',fontStyle:'italic',fontWeight:300,fontSize:36,lineHeight:1.1,margin:'14px 0 18px',color:'var(--charcoal-smoke)'}}>We'll be in touch within one business day.</p>
                  <p style={{fontFamily:'var(--font-body)',fontSize:15,lineHeight:1.6,color:'var(--charcoal-500)',margin:0}}>If you don't see a reply by then, check your spam folder for a note from <strong>hello@themarketingmaison.co</strong>.</p>
                </div>
              ) : (
                <form onSubmit={(e)=>{e.preventDefault();setSent(true);}}>
                  <div className="field"><label>First Name</label><input type="text" required /></div>
                  <div className="field"><label>Last Name</label><input type="text" required /></div>
                  <div className="field"><label>Email</label><input type="email" required /></div>
                  <div className="field"><label>Company</label><input type="text" required /></div>
                  <div className="field"><label>Monthly Revenue</label>
                    <select defaultValue=""><option value="" disabled>Select a range</option><option>Under $50k</option><option>$50k – $250k</option><option>$250k – $1M</option><option>$1M – $5M</option><option>$5M+</option></select>
                  </div>
                  <div className="field"><label>Current Channels</label>
                    <select defaultValue=""><option value="" disabled>What runs today?</option><option>Social only</option><option>Social + email</option><option>Email + website + SEO</option><option>Mostly paid ads</option><option>Nothing systematic</option></select>
                  </div>
                  <div className="field full"><label>What's broken?</label><textarea rows="4" required placeholder="Tell us what you've tried and where it's leaking. The more specific, the better the diagnosis." /></div>
                  <div className="submit">
                    <span className="fine">§ One business day reply. We read everything.</span>
                    <button type="submit" className="mm-btn mm-btn-primary">Book the diagnosis ↗</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const POSTS = [
  { n:'04', date:'May · 2026', tag:'Field Guide', title:'Three signs your email list is doing 90% of the work.', blurb:'A short field guide to spotting which channel is actually compounding — and which one is just loud.' },
  { n:'03', date:'Apr · 2026', tag:'Diagnostic',  title:'The seven leaks every Shopify store has at $1M ARR.', blurb:'A walk-through of the recurring infrastructure gaps we find in mid-stage DTC brands.' },
  { n:'02', date:'Mar · 2026', tag:'Philosophy',  title:'Why "social media manager" is the wrong first hire.', blurb:'And what to hire instead if you want a marketing function that compounds.' },
  { n:'01', date:'Feb · 2026', tag:'Maison Memo', title:'Why we named the firm Marketing Maison.', blurb:'On houses, ateliers, the long view — and the word marketing has been doing too much work alone.' },
  { n:'00', date:'Jan · 2026', tag:'Inaugural',  title:'Own It. Build It. Scale It. — a manifesto.', blurb:'The thesis the firm is built on, in plain language, for the people we built it for.' },
  { n:'',   date:'Coming',     tag:'Next Issue',  title:'The referral program almost no service business runs.', blurb:'Issue No. 05 — instrumented introductions, with the tracking sheet template.' },
];

function PageDispatch({ go }) {
  return (
    <main>
      <section className="mm-pagehead">
        <div className="mm-container">
          <span className="mm-eyebrow">The Dispatch</span>
          <h1>One field-guide per month. Built for owners, not marketers.</h1>
          <p className="lead">Short, diagnostic essays on how owned-channel marketing actually compounds — and a working template at the bottom of every issue. No drip. No upsell.</p>
        </div>
      </section>
      <section className="mm-dispatch-list">
        <div className="mm-container">
          <article className="featured">
            <div>
              <div className="meta">§ Featured · Issue No. 04 · May 2026</div>
              <h2>Three signs your email list is doing 90% of the work.</h2>
              <p>You hired a social agency. Your last $40,000 in revenue came from one nurture flow you set up in 2023. We diagnose the moment that pattern becomes a problem — and the next three channels to install.</p>
              <button className="mm-btn mm-btn-primary">Read the issue ↗</button>
            </div>
            <div className="sidefig">
              <img src="../../assets/logos/monogram-tan.png" alt="" />
            </div>
          </article>
          <div className="grid">
            {POSTS.map(p => (
              <article className="post" key={p.title}>
                <div className="meta">{p.n ? `No. ${p.n} · ` : ''}{p.tag} · {p.date}</div>
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                <div className="more">{p.n ? 'Read the issue ↗' : 'Subscribe to receive ↗'}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <DispatchCTA go={go} />
    </main>
  );
}

Object.assign(window, { PageHome, PageServices, PagePricing, PageDiagnosis, PageDispatch, SERVICE_DETAILS, POSTS });
