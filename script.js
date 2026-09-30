(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* Preloader → trigger hero entrance */
  const finishLoading = () => {
    document.body.classList.remove('is-loading');
    document.body.classList.add('loaded');
  };
  window.addEventListener('load', () => setTimeout(finishLoading, 1500));
  setTimeout(finishLoading, 4000); // safety net if a resource stalls

  /* Header: shrink on scroll, hide when scrolling down, show when scrolling up */
  const header = $('.header');
  const toTop = $('.to-top');
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    header.classList.toggle('is-hidden', y > 400 && y > lastY && !header.classList.contains('menu-open'));
    toTop.classList.toggle('is-shown', y > 700);
    lastY = y;
    updateRail();
    updateActiveNav();
  };

  /* Mobile menu */
  const burger = $('.burger');
  const nav = $('.nav');
  const setMenu = (open) => {
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    header.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a', nav).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* Scroll reveal */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

  /* Animated counters */
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      const duration = 1800;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(el => countObs.observe(el));

  /* Service cards: hover fill spreads out from the cursor */
  $$('.service:not(.service--cta)').forEach(card => {
    card.addEventListener('pointerenter', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  /* Process rail fills as you scroll through the section */
  const process = $('.process-wrap');
  const rail = $('.process__rail');
  function updateRail() {
    const r = process.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.min(Math.max((vh * 0.8 - r.top) / (r.height + vh * 0.3), 0), 1);
    rail.style.setProperty('--progress', p.toFixed(3));
  }

  /* Highlight nav link for the section in view */
  const sections = $$('main section[id]');
  const links = $$('.nav a:not(.btn)');
  function updateActiveNav() {
    const y = window.scrollY + window.innerHeight * 0.35;
    let current = '';
    sections.forEach(s => { if (s.offsetTop <= y) current = s.id; });
    links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${current}`));
  }

  /* Subtle parallax on the hero visual */
  const blueprint = $('.blueprint');
  const hero = $('.hero');
  if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      blueprint.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
    hero.addEventListener('pointerleave', () => { blueprint.style.transform = ''; });
    blueprint.style.transition = 'transform .6s cubic-bezier(.22,.9,.28,1)';
  }

  /* Quote form: client-side validation + success animation */
  const form = $('.form');
  const validators = {
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    phone: v => v.replace(/\D/g, '').length >= 8,
  };
  const checkField = (input) => {
    const v = input.value.trim();
    const ok = v !== '' && (!validators[input.name] || validators[input.name](v));
    input.closest('.field').classList.toggle('is-invalid', !ok);
    return ok;
  };
  $$('.field input, .field textarea', form).forEach(input => {
    input.addEventListener('blur', () => { if (input.value) checkField(input); });
    input.addEventListener('input', () => input.closest('.field').classList.remove('is-invalid'));
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = $$('[required]', form);
    fields.forEach(f => f.closest('.field').classList.remove('is-invalid'));
    void form.offsetWidth; // restart shake animation
    const invalid = fields.filter(f => !checkField(f));
    if (invalid.length) { invalid[0].focus(); return; }

    form.classList.add('is-sending');
    // No backend is connected yet; simulate a request. Replace with a fetch() to your form endpoint.
    setTimeout(() => {
      form.classList.remove('is-sending');
      form.classList.add('is-sent');
    }, 1200);
  });
  $('.form__reset', form).addEventListener('click', () => {
    form.reset();
    form.classList.remove('is-sent');
  });

  $('#year').textContent = new Date().getFullYear();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
