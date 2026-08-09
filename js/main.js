/* ============================================================
   MARKETING MAISON — Main JS
   ============================================================ */

'use strict';

/* ── Nav scroll state ─────────────────────────────────────── */
(function initNav() {
  const nav = document.querySelector('.mm-nav');
  if (!nav) return;

  const toggle = nav.querySelector('.nav-toggle');
  const overlay = document.querySelector('.nav-overlay');

  // Scroll: add scrolled class + switch color scheme
  const heroEl = document.querySelector('.hero');
  const heroIsDark = heroEl !== null;

  function onScroll() {
    const scrolled = window.scrollY > 60;
    nav.classList.toggle('scrolled', scrolled);
    if (!heroIsDark) return;
    // If we scroll past the hero, nav already dark from .scrolled
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  if (toggle && overlay) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      overlay.classList.toggle('open', !expanded);
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
})();

/* ── Hero headline line reveal ────────────────────────────── */
(function initHeroReveal() {
  const headline = document.querySelector('.hero-headline');
  if (!headline) return;
  // Brief rAF delay so paint settles
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      headline.classList.add('revealed');
    });
  });
})();

/* ── IntersectionObserver — scroll reveals ────────────────── */
(function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything
    document.querySelectorAll('[data-fade], [data-reveal], .draw-line').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const opts = { threshold: 0.12, rootMargin: '0px 0px -60px 0px' };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, opts);

  document.querySelectorAll('[data-fade], [data-reveal], .draw-line').forEach(el => {
    observer.observe(el);
  });

  // Stagger siblings with [data-fade] inside a parent
  document.querySelectorAll('[data-fade-group]').forEach(group => {
    const children = group.querySelectorAll('[data-fade]');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.1}s`;
    });
  });
})();

/* ── Animated stat counters ───────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const ease = t => 1 - Math.pow(1 - t, 3); // ease-out-cubic

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const decimals = (String(target).split('.')[1] || '').length;
    const duration = 1400;
    const start = performance.now();

    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = ease(progress) * target;
      el.textContent = prefix + value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => obs.observe(el));
})();

/* ── Testimonial slider ───────────────────────────────────── */
(function initTestimonials() {
  const slides = document.querySelectorAll('.t-slide');
  const dots = document.querySelectorAll('.t-dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function go(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function next() { go(current + 1); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  // Init
  go(0);
  startTimer();

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { go(i); startTimer(); });
  });
})();

/* ── Accordion / FAQ ──────────────────────────────────────── */
(function initAccordion() {
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const panel = document.getElementById(btn.getAttribute('aria-controls'));

      // Close all others
      document.querySelectorAll('.accordion-btn[aria-expanded="true"]').forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          const otherPanel = document.getElementById(other.getAttribute('aria-controls'));
          if (otherPanel) otherPanel.classList.remove('open');
        }
      });

      btn.setAttribute('aria-expanded', !expanded);
      if (panel) panel.classList.toggle('open', !expanded);
    });
  });
})();

/* ── Ticker pause on hover ────────────────────────────────── */
(function initTicker() {
  const track = document.querySelector('.ticker-track');
  if (!track) return;
  const ticker = track.closest('.ticker');
  ticker?.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  ticker?.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
})();

/* ── Service row keyboard a11y ────────────────────────────── */
(function initServiceRows() {
  document.querySelectorAll('.svc-row').forEach(row => {
    row.setAttribute('tabindex', '0');
    row.addEventListener('keydown', e => {
      if (e.key === 'Enter') row.click();
    });
  });
})();

/* ── Smooth scroll for anchor links ─────────────────────────*/
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 78;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── Newsletter form ──────────────────────────────────────── */
(function initNewsletter() {
  const form = document.querySelector('.nl-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    btn.textContent = 'Subscribed ✓';
    btn.disabled = true;
    form.querySelector('input[type="email"]').value = '';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.disabled = false;
    }, 4000);
  });
})();

/* ── Contact form ─────────────────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    const original = btn.textContent;
    btn.textContent = 'Message sent ✓';
    btn.disabled = true;
    form.reset();
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
    }, 5000);
  });
})();

/* ── Dispatch / The Dispatch newsletter form ──────────────── */
(function initDispatchForm() {
  const form = document.getElementById('dispatch-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    btn.textContent = "You're on the list ✓";
    btn.disabled = true;
    form.querySelector('input[type="email"]').value = '';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.disabled = false;
    }, 5000);
  });
})();
