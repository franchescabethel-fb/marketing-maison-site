/* Marketing Maison — UI Kit · Chrome components (Nav, Footer, DispatchCTA) */

const NAV_LINKS = [
  { id: 'home',      label: 'Home' },
  { id: 'services',  label: 'Services' },
  { id: 'pricing',   label: 'Pricing' },
  { id: 'dispatch',  label: 'The Dispatch' },
  { id: 'diagnosis', label: 'Book a Diagnosis' },
];

function Nav({ route, go }) {
  return (
    <nav className="mm-nav">
      <div className="mm-container row">
        <a href="#home" onClick={(e)=>{e.preventDefault();go('home');}} aria-label="Marketing Maison home">
          <img className="mm-nav-logo" src="../../assets/logos/wordmark-horizontal-black.png" alt="Marketing Maison" />
        </a>
        <div className="mm-nav-links">
          {NAV_LINKS.slice(0, 4).map(l => (
            <a key={l.id}
               href={`#${l.id}`}
               className={route === l.id ? 'active' : ''}
               onClick={(e)=>{e.preventDefault();go(l.id);}}>
              {l.label}
            </a>
          ))}
          <button className="mm-btn mm-btn-primary" onClick={()=>go('diagnosis')}>
            Book a Diagnosis
          </button>
        </div>
      </div>
    </nav>
  );
}

function DispatchCTA({ go }) {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);
  return (
    <section className="mm-dispatch">
      <div className="mm-container grid">
        <div>
          <span className="mm-eyebrow on-dark">The Dispatch</span>
          <h2>A short field guide for owners who'd rather build than rent.</h2>
        </div>
        <div>
          {subscribed ? (
            <div>
              <p style={{color:'var(--paper-cream)', fontFamily:'var(--font-editorial)', fontStyle:'italic', fontSize:24, lineHeight:1.3, margin:0}}>
                Welcome. Issue No. 05 lands in your inbox Thursday.
              </p>
              <p className="fine" style={{marginTop:14}}>You'll get one email per month. No drip, no upsell.</p>
            </div>
          ) : (
            <form onSubmit={(e)=>{e.preventDefault(); if(email) setSubscribed(true);}}>
              <label htmlFor="dispatch-email">Subscribe — Free · Monthly</label>
              <div className="field">
                <input id="dispatch-email" type="email" required placeholder="you@yourcompany.com"
                       value={email} onChange={e=>setEmail(e.target.value)} />
                <button type="submit">Subscribe ↗</button>
              </div>
              <span className="fine">§ One email per month. Unsubscribe in one click. No drip sequences, ever.</span>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer({ go }) {
  return (
    <footer className="mm-footer">
      <div className="mm-container">
        <div className="top">
          <div className="brand">
            <img className="mono" src="../../assets/logos/monogram-tan.png" alt="" />
            <p>Built in Jacksonville. Designed to outlast the algorithm.</p>
          </div>
          <div>
            <h4>The Firm</h4>
            <ul>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go('home');}}>Philosophy</a></li>
              <li><a href="#">Founders</a></li>
              <li><a href="#">Case studies</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4>Service Lines</h4>
            <ul>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go('services');}}>Email &amp; SMS</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go('services');}}>Website Strategy</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go('services');}}>SEO</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go('services');}}>Referral &amp; Direct</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go('services');}}>Social Strategy</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go('services');}}>AI &amp; Analytics</a></li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go('diagnosis');}}>Book a diagnosis ↗</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go('dispatch');}}>The Dispatch ↗</a></li>
              <li><a href="#">hello@themarketingmaison.co</a></li>
              <li><a href="#">LinkedIn ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <span>© 2026 The Marketing Maison · Jacksonville, FL</span>
          <span>Own It · Build It · Scale It</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Footer, DispatchCTA, NAV_LINKS });
