// ---------- Scroll reveal ----------
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');

if (prefersReduced) {
  revealEls.forEach(el => el.classList.add('in-view'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
}

// ---------- Header contrast (on-dark vs on-light) ----------
const header = document.querySelector('header');
const darkSections = document.querySelectorAll('[data-theme="dark"]');

if (header && darkSections.length) {
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        header.classList.add('on-dark');
        header.classList.remove('on-light');
      } else {
        header.classList.remove('on-dark');
        header.classList.add('on-light');
      }
    });
  }, { rootMargin: '-90% 0px -0% 0px' });

  darkSections.forEach(sec => headerObserver.observe(sec));
}

window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---------- Back to top ----------
const toTop = document.querySelector('.to-top');
if (toTop) {
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });
}

// ---------- Contact form ----------
const form = document.getElementById('contactForm');

if (form) {
  const note = document.getElementById('formNote');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // honeypot spam check — bots fill every field, humans never see this one
    if (form.querySelector('.hp-field input').value) return;

    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        form.reset();
        note.textContent = "Message sent — we'll reply to your email shortly.";
      } else {
        note.textContent = 'Something went wrong. Please email hello@levkivsky.com directly.';
      }
    } catch (err) {
      note.textContent = 'Something went wrong. Please email hello@levkivsky.com directly.';
    }

    note.classList.add('visible');
    btn.textContent = 'Send message';
    btn.disabled = false;
  });
}
