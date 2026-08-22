/*  LEVKIVSKY — interaction & motion layer
    No frameworks. Respects prefers-reduced-motion.
*/

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Page load: reveal hero ---------- */
  requestAnimationFrame(() => {
    document.body.classList.add('is-loaded');
    // Slide the initial wipe away
    requestAnimationFrame(() => {
      document.body.classList.remove('page-entering');
      document.body.classList.add('page-entered');
    });
  });

  /* ---------- Page transitions between routes ---------- */
  (function initPageTransitions() {
    const wipe = document.querySelector('.page-transition');
    if (!wipe) return;

    document.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href) return;
      // Only intercept same-origin internal navigations to .html pages
      if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
      if (!href.endsWith('.html') && href !== '/' && href !== '') return;
      if (a.target === '_blank') return;
      // Skip hash-only links on the same page
      if (href.startsWith('#')) return;
      if (a.hasAttribute('download')) return;

      a.addEventListener('click', (e) => {
        const dest = new URL(href, window.location.href);
        if (dest.origin !== window.location.origin) return;
        if (dest.pathname === window.location.pathname) return;
        e.preventDefault();
        wipe.classList.add('is-leaving');
        setTimeout(() => { window.location.href = href; }, 560);
      });
    });
  })();

  /* ---------- Cephalometric SVG draw-on ---------- */
  (function initCephalometricDraw() {
    const lines = document.querySelectorAll('.ceph-line');
    const points = document.querySelectorAll('.ceph-point');
    if (!lines.length) return;

    if (prefersReduced) {
      lines.forEach((l) => (l.style.strokeDashoffset = '0'));
      points.forEach((p) => (p.style.opacity = '1'));
      return;
    }

    // pathLength=100 normalizes every path to 100 units
    const drawDuration = 3400;
    const lineStagger = 260;
    const pointDelay = 700;

    lines.forEach((line, i) => {
      line.style.transition = `stroke-dashoffset ${drawDuration}ms cubic-bezier(0.65,0,0.35,1) ${i * lineStagger}ms`;
      // force reflow then animate
      void line.getBoundingClientRect();
      line.style.strokeDashoffset = '0';
    });

    // Points appear as their connecting lines complete
    points.forEach((point, i) => {
      const delay = pointDelay + i * (lineStagger + 380);
      point.style.transition = `opacity 500ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
      requestAnimationFrame(() => { point.style.opacity = '1'; });
    });
  })();

  /* ---------- Scroll reveal ---------- */
  (function initReveal() {
    const items = document.querySelectorAll('.reveal, .reveal-item');
    if (!items.length) return;

    if (prefersReduced) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    // Slight easing variation per section depth via data attribute
    items.forEach((el) => {
      const depth = el.closest('section')?.getAttribute('data-depth');
      if (depth) el.style.setProperty('--reveal-delay', (parseFloat(depth) * 0.08) + 's');
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach((el) => io.observe(el));
  })();

  /* ---------- Header theme switching ---------- */
  (function initHeaderTheme() {
    const header = document.querySelector('header');
    const darkSections = document.querySelectorAll('[data-theme="dark"]');
    if (!header || !darkSections.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          header.classList.add('on-dark');
          document.body.classList.add('on-dark-section');
        } else if (entry.boundingClientRect.top > 0) {
          // section has scrolled below viewport top — leaving upward
          header.classList.remove('on-dark');
          document.body.classList.remove('on-dark-section');
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    darkSections.forEach((s) => io.observe(s));
  })();

  /* ---------- Back to top ---------- */
  (function initBackToTop() {
    const btn = document.querySelector('.to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) btn.classList.add('is-visible');
      else btn.classList.remove('is-visible');
    }, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  })();

  /* ---------- Contact form polish ---------- */
  (function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const note = document.getElementById('formNote');
    const submit = form.querySelector('.form-submit');
    let noteTimer = null;

    function showNote(msg, type) {
      if (!note) return;
      clearTimeout(noteTimer);
      note.textContent = msg;
      note.className = 'form-note mono is-visible is-' + type;
    }
    function clearNote() {
      if (!note) return;
      note.classList.remove('is-visible');
      noteTimer = setTimeout(() => { note.textContent = ''; note.className = 'form-note mono'; }, 400);
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearNote();
      submit.classList.add('is-sending');

      // honeypot
      const hp = form.querySelector('#company');
      if (hp && hp.value) { showNote('Message not sent.', 'error'); submit.classList.remove('is-sending'); return; }

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form),
        });
        if (res.ok) {
          showNote('Thank you — we\'ll be in touch shortly.', 'success');
          form.reset();
        } else {
          showNote('Something went wrong. Please try again.', 'error');
        }
      } catch (err) {
        showNote('Network error. Please email us directly.', 'error');
      } finally {
        submit.classList.remove('is-sending');
      }
    });
  })();

})();
