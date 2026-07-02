/* Marketing Maison — Main JS
   Progressive enhancement: no JS = site still fully usable
   Features: nav, accordion, forms, smooth scroll,
             custom cursor, scroll animations, count-up,
             trust marquee, 3D card tilt, exit-intent popup */

(function () {
  'use strict';

  /* ============================================================
     MOBILE NAV TOGGLE
     ============================================================ */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('is-open', !expanded);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
        navToggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.mm-nav') && navLinks.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
      }
    });
  }

  /* NAV — compact on scroll */
  const nav = document.querySelector('.mm-nav');
  if (nav) {
    const onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     ACCORDION — with aria-hidden fix
     ============================================================ */
  const accordionBtns = document.querySelectorAll('.mm-accordion-btn');

  accordionBtns.forEach(function (btn) {
    const panelId = btn.getAttribute('aria-controls');
    const panel   = document.getElementById(panelId);

    /* Set initial aria-hidden on panels */
    if (panel) panel.setAttribute('aria-hidden', 'true');

    btn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';

      /* Collapse all others */
      const parent = this.closest('.mm-accordion');
      if (parent) {
        parent.querySelectorAll('.mm-accordion-btn').forEach(function (other) {
          if (other !== btn) {
            other.setAttribute('aria-expanded', 'false');
            const otherId    = other.getAttribute('aria-controls');
            const otherPanel = document.getElementById(otherId);
            if (otherPanel) {
              otherPanel.classList.remove('open');
              otherPanel.setAttribute('aria-hidden', 'true');
            }
          }
        });
      }

      this.setAttribute('aria-expanded', String(!expanded));
      if (panel) {
        panel.classList.toggle('open', !expanded);
        panel.setAttribute('aria-hidden', String(expanded));
      }
    });
  });

  /* ============================================================
     NEWSLETTER FORM
     ============================================================ */
  const dispatchForms = document.querySelectorAll('.js-dispatch-form');

  dispatchForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const successEl  = form.parentElement.querySelector('.js-dispatch-success');
      if (emailInput && emailInput.validity.valid && successEl) {
        form.hidden = true;
        successEl.hidden  = false;
        successEl.style.display = 'block';
        successEl.setAttribute('tabindex', '-1');
        successEl.focus();
      }
    });
  });

  /* ============================================================
     DIAGNOSIS FORM — validation + submit
     ============================================================ */
  const diagnosisForm = document.getElementById('diagnosis-form');

  if (diagnosisForm) {
    diagnosisForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      diagnosisForm.querySelectorAll('.field-error').forEach(function (el) {
        el.classList.remove('visible');
      });
      diagnosisForm.querySelectorAll('[aria-invalid]').forEach(function (el) {
        el.removeAttribute('aria-invalid');
      });

      diagnosisForm.querySelectorAll('[required]').forEach(function (input) {
        if (!input.value.trim()) {
          valid = false;
          input.setAttribute('aria-invalid', 'true');
          const errorEl = document.getElementById(input.id + '-error');
          if (errorEl) errorEl.classList.add('visible');
        }
      });

      const emailInput = diagnosisForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value && !emailInput.validity.valid) {
        valid = false;
        emailInput.setAttribute('aria-invalid', 'true');
        const errorEl = document.getElementById(emailInput.id + '-error');
        if (errorEl) errorEl.classList.add('visible');
      }

      if (!valid) {
        const firstInvalid = diagnosisForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const formWrapper  = document.getElementById('diagnosis-form-wrapper');
      const successBlock = document.getElementById('diagnosis-success');
      if (formWrapper && successBlock) {
        formWrapper.hidden = true;
        successBlock.hidden = false;
        successBlock.setAttribute('tabindex', '-1');
        successBlock.focus();
      }
    });
  }

  /* ============================================================
     ACTIVE NAV LINK
     ============================================================ */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.mm-nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ============================================================
     SMOOTH SCROLL
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.focus({ preventScroll: true });
      }
    });
  });

  /* ============================================================
     CUSTOM CURSOR
     Only on non-touch, non-reduced-motion devices
     ============================================================ */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch        = window.matchMedia('(pointer: coarse)').matches ||
                         window.matchMedia('(hover: none)').matches;

  if (!prefersReduced && !isTouch) {
    const cursorDot  = document.querySelector('.mm-cursor-dot');
    const cursorRing = document.querySelector('.mm-cursor-ring');

    if (cursorDot && cursorRing) {
      let mouseX = -100, mouseY = -100;
      let ringX  = -100, ringY  = -100;
      let rafId;

      /* Dot follows instantly */
      document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px) translate(-50%, -50%)';
      });

      /* Ring follows with lerp */
      function lerpCursor() {
        const ease = 0.12;
        ringX += (mouseX - ringX) * ease;
        ringY += (mouseY - ringY) * ease;
        cursorRing.style.transform = 'translate(' + ringX + 'px, ' + ringY + 'px) translate(-50%, -50%)';
        rafId = requestAnimationFrame(lerpCursor);
      }
      lerpCursor();

      /* Cursor state changes */
      const hoverTargets = 'a, button, [role="button"], label, .mm-accordion-btn';
      const textTargets  = 'input, textarea';

      document.addEventListener('mouseover', function (e) {
        if (e.target.closest(hoverTargets)) {
          document.body.classList.add('cursor-hover');
        } else if (e.target.closest(textTargets)) {
          document.body.classList.add('cursor-text');
        }
      });

      document.addEventListener('mouseout', function (e) {
        if (e.target.closest(hoverTargets)) {
          document.body.classList.remove('cursor-hover');
        } else if (e.target.closest(textTargets)) {
          document.body.classList.remove('cursor-text');
        }
      });

      document.addEventListener('mouseleave', function () {
        document.body.classList.add('cursor-hidden');
      });
      document.addEventListener('mouseenter', function () {
        document.body.classList.remove('cursor-hidden');
      });
    }
  }

  /* ============================================================
     SCROLL ANIMATIONS — IntersectionObserver
     Elements with [data-animate] fade in when entering viewport
     Elements with [data-stagger] animate their children in sequence
     ============================================================ */
  if ('IntersectionObserver' in window && !prefersReduced) {
    const animateObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          animateObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px'
    });

    /* Observe individual elements */
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      animateObserver.observe(el);
    });

    /* Observe stagger parents */
    document.querySelectorAll('[data-stagger]').forEach(function (el) {
      animateObserver.observe(el);
    });

    /* Reveal lines */
    document.querySelectorAll('.mm-reveal-line').forEach(function (el) {
      animateObserver.observe(el);
    });
  } else {
    /* No observer support or reduced motion — show everything */
    document.querySelectorAll('[data-animate], [data-stagger], .mm-reveal-line').forEach(function (el) {
      el.classList.add('is-visible');
      el.style.opacity = '1';
    });
  }

  /* Hero text — trigger on load */
  const hero = document.querySelector('.mm-hero');
  if (hero) {
    requestAnimationFrame(function () {
      setTimeout(function () {
        hero.classList.add('is-loaded');
      }, 100);
    });
  }

  /* ============================================================
     COUNT-UP ANIMATION — hero proof stats
     ============================================================ */
  function animateCountUp(el) {
    const raw    = el.getAttribute('data-countup');
    const parts  = raw.match(/^([^0-9]*)([0-9.]+)([^0-9]*)$/);
    if (!parts) return;

    const prefix = parts[1] || '';
    const target = parseFloat(parts[2]);
    const suffix = parts[3] || '';
    const isFloat = parts[2].includes('.');
    const duration = 1200;
    const start    = performance.now();

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      /* Ease out cubic */
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = target * eased;

      el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;

      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + (isFloat ? target.toFixed(1) : Math.round(target)) + suffix;
    }

    requestAnimationFrame(tick);
  }

  if (!prefersReduced && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-countup]').forEach(animateCountUp);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const proofSection = document.querySelector('.mm-hero-proof');
    if (proofSection) statsObserver.observe(proofSection);
  }

  /* ============================================================
     TRUST BAR MARQUEE — duplicate items for seamless loop
     ============================================================ */
  const logosList = document.querySelector('.mm-trust-bar .logos');
  if (logosList && !prefersReduced) {
    /* Clone the list items for seamless infinite scroll */
    const items = Array.from(logosList.children);
    items.forEach(function (item) {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      logosList.appendChild(clone);
    });
  }

  /* ============================================================
     3D CARD TILT — service grid items
     ============================================================ */
  if (!prefersReduced && !isTouch) {
    document.querySelectorAll('.mm-services .item').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        const rect    = card.getBoundingClientRect();
        const x       = e.clientX - rect.left;
        const y       = e.clientY - rect.top;
        const centerX = rect.width  / 2;
        const centerY = rect.height / 2;
        const rotateY =  ((x - centerX) / centerX) * 8;
        const rotateX = -((y - centerY) / centerY) * 8;

        card.classList.add('is-tilting');
        card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
      });

      card.addEventListener('mouseleave', function () {
        card.classList.remove('is-tilting');
        card.style.transform = '';
      });
    });
  }

  /* ============================================================
     EXIT-INTENT POPUP
     Triggers on mouse leaving top of viewport.
     Shows once per session. Fully accessible (focus trap + Escape).
     ============================================================ */
  const popupOverlay = document.getElementById('mm-popup-overlay');
  const popupClose   = document.getElementById('mm-popup-close');
  const popupDismiss = document.getElementById('mm-popup-dismiss');

  if (popupOverlay && !sessionStorage.getItem('mm_popup_seen')) {
    let popupShown = false;

    function openPopup() {
      if (popupShown) return;
      popupShown = true;
      sessionStorage.setItem('mm_popup_seen', '1');

      popupOverlay.classList.add('is-open');
      popupOverlay.removeAttribute('hidden');

      /* Move focus into popup */
      const firstFocusable = popupOverlay.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
        setTimeout(function () { firstFocusable.focus(); }, 50);
      }
    }

    function closePopup() {
      popupOverlay.classList.remove('is-open');
      setTimeout(function () {
        popupOverlay.setAttribute('hidden', '');
      }, 400);
    }

    /* Focus trap */
    popupOverlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closePopup();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = Array.from(popupOverlay.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )).filter(function (el) { return !el.disabled; });

      if (!focusable.length) { e.preventDefault(); return; }

      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    /* Close buttons */
    if (popupClose)   popupClose.addEventListener('click', closePopup);
    if (popupDismiss) popupDismiss.addEventListener('click', closePopup);

    /* Close on overlay backdrop click */
    popupOverlay.addEventListener('click', function (e) {
      if (e.target === popupOverlay) closePopup();
    });

    /* Trigger: mouse leaves top of viewport (exit intent) */
    if (!prefersReduced) {
      document.addEventListener('mouseleave', function (e) {
        if (e.clientY <= 0) openPopup();
      });

      /* Fallback: show after 30 seconds if no exit intent */
      setTimeout(function () {
        if (!popupShown) openPopup();
      }, 30000);
    }
  }

  /* ============================================================
     BUILD 5 — HERO STRIP REVEAL
     Fires on DOMContentLoaded (already inside it via IIFE).
     Adds 'reveal-open' which transitions clip-path from a
     3px-tall strip to full viewport in 1.3s.
     ============================================================ */
  var heroEl = document.querySelector('.mm-hero');
  if (heroEl) {
    /* Small delay so the browser has painted the initial state */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        heroEl.classList.add('reveal-open');
      });
    });
  }

  /* ============================================================
     BUILD 3 — SERVICE BREAK HEADING REVEAL
     IntersectionObserver on the Cinzel heading + rule line.
     ============================================================ */
  var serviceBreakText = document.querySelector('.mm-service-break-text');
  var serviceBreakRule = document.querySelector('.mm-service-break-rule');

  if (serviceBreakText && 'IntersectionObserver' in window) {
    var breakObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          serviceBreakText.classList.add('is-visible');
          if (serviceBreakRule) serviceBreakRule.classList.add('is-visible');
          breakObserver.disconnect();
        }
      });
    }, { threshold: 0.2 });

    breakObserver.observe(serviceBreakText);
  } else if (serviceBreakText) {
    /* No observer — show immediately */
    serviceBreakText.classList.add('is-visible');
    if (serviceBreakRule) serviceBreakRule.classList.add('is-visible');
  }

  /* ============================================================
     BUILD 4 — EDITORIAL SERVICE ROW REVEALS
     Each split row fades up as it scrolls into view.
     ============================================================ */
  var svcRows = document.querySelectorAll('[data-reveal-row]');

  if (svcRows.length && 'IntersectionObserver' in window && !prefersReduced) {
    var rowObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          rowObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    svcRows.forEach(function (row) {
      rowObserver.observe(row);
    });
  } else {
    /* Reduced motion or no observer — show all immediately */
    svcRows.forEach(function (row) {
      row.classList.add('is-visible');
    });
  }

})();
