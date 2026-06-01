/* Marketing Maison — Main JS
   Progressive enhancement: no JS = site still fully usable */

(function () {
  'use strict';

  /* -------------------------------------------------- */
  /* MOBILE NAV TOGGLE                                   */
  /* -------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('is-open', !expanded);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.mm-nav') && navLinks.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
      }
    });
  }

  /* -------------------------------------------------- */
  /* ACCORDION                                           */
  /* -------------------------------------------------- */
  const accordionBtns = document.querySelectorAll('.mm-accordion-btn');

  accordionBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      const panelId  = this.getAttribute('aria-controls');
      const panel    = document.getElementById(panelId);

      // Collapse all others in same accordion
      const parent = this.closest('.mm-accordion');
      if (parent) {
        parent.querySelectorAll('.mm-accordion-btn').forEach(function (other) {
          if (other !== btn) {
            other.setAttribute('aria-expanded', 'false');
            const otherId = other.getAttribute('aria-controls');
            const otherPanel = document.getElementById(otherId);
            if (otherPanel) otherPanel.classList.remove('open');
          }
        });
      }

      this.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.classList.toggle('open', !expanded);
    });

    // Keyboard: Space / Enter already triggers click on button
  });

  /* -------------------------------------------------- */
  /* NEWSLETTER FORM                                     */
  /* -------------------------------------------------- */
  const dispatchForms = document.querySelectorAll('.js-dispatch-form');

  dispatchForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const successEl  = form.parentElement.querySelector('.js-dispatch-success');
      if (emailInput && emailInput.validity.valid && successEl) {
        form.hidden = true;
        successEl.hidden = false;
        successEl.focus();
        // Announce to screen readers
        successEl.setAttribute('tabindex', '-1');
      }
    });
  });

  /* -------------------------------------------------- */
  /* DIAGNOSIS FORM — validation + submit                */
  /* -------------------------------------------------- */
  const diagnosisForm = document.getElementById('diagnosis-form');

  if (diagnosisForm) {
    diagnosisForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      diagnosisForm.querySelectorAll('.field-error').forEach(function (el) {
        el.classList.remove('visible');
      });
      diagnosisForm.querySelectorAll('[aria-invalid]').forEach(function (el) {
        el.removeAttribute('aria-invalid');
      });

      // Validate required fields
      diagnosisForm.querySelectorAll('[required]').forEach(function (input) {
        if (!input.value.trim()) {
          valid = false;
          input.setAttribute('aria-invalid', 'true');
          const errorEl = document.getElementById(input.id + '-error');
          if (errorEl) errorEl.classList.add('visible');
        }
      });

      // Email format
      const emailInput = diagnosisForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value && !emailInput.validity.valid) {
        valid = false;
        emailInput.setAttribute('aria-invalid', 'true');
        const errorEl = document.getElementById(emailInput.id + '-error');
        if (errorEl) errorEl.classList.add('visible');
      }

      if (!valid) {
        // Focus first invalid field
        const firstInvalid = diagnosisForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Success
      const formWrapper  = document.getElementById('diagnosis-form-wrapper');
      const successBlock = document.getElementById('diagnosis-success');
      if (formWrapper && successBlock) {
        formWrapper.hidden = true;
        successBlock.hidden = false;
        successBlock.focus();
        successBlock.setAttribute('tabindex', '-1');
      }
    });
  }

  /* -------------------------------------------------- */
  /* ACTIVE NAV LINK                                     */
  /* -------------------------------------------------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.mm-nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* -------------------------------------------------- */
  /* SMOOTH SCROLL for same-page anchors                 */
  /* -------------------------------------------------- */
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

})();
