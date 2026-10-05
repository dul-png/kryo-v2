(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const TRADES = window.TRADES || [];
  const ICONS = window.TRADE_ICONS || {};

  // "Trades under one roof" stat follows the trade list
  const tradeCount = $('[data-trade-count]');
  if (tradeCount && TRADES.length) tradeCount.dataset.count = TRADES.filter(t => !t.other).length;

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

  /* Trade Explorer */
  const explorer = $('.explorer');
  const tradeSelect = $('#trade');
  if (explorer && TRADES.length) {
    const list = $('.explorer__list', explorer);
    const filters = $('.explorer__filters', explorer);
    const search = $('.explorer__search input', explorer);
    const empty = $('.explorer__empty', explorer);
    const inner = $('.explorer__inner', explorer);
    const iconBox = $('.explorer__icon', explorer);
    const cta = $('.explorer__cta', explorer);
    let category = 'All';
    let query = '';
    let current = 0;
    let visible = [];
    let swapTimer;

    const esc = (str) => str.replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
    const highlight = (name) => {
      if (!query) return esc(name);
      const i = name.toLowerCase().indexOf(query);
      if (i < 0) return esc(name);
      return esc(name.slice(0, i)) + '<mark>' + esc(name.slice(i, i + query.length)) + '</mark>' + esc(name.slice(i + query.length));
    };
    const matches = (t) => (category === 'All' || t.cat === category) &&
      (!query || [t.name, t.cat, t.summary, ...t.covers].join(' ').toLowerCase().includes(query));

    window.TRADE_CATEGORIES.forEach(cat => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = cat;
      b.setAttribute('aria-pressed', cat === category);
      b.addEventListener('click', () => {
        category = cat;
        $$('button', filters).forEach(x => x.setAttribute('aria-pressed', x === b));
        renderList(true);
      });
      filters.appendChild(b);
    });

    function renderList(autoSelect) {
      visible = TRADES.map((t, i) => i).filter(i => matches(TRADES[i]));
      empty.hidden = visible.length > 0;
      if (autoSelect && visible.length && !visible.includes(current)) show(visible[0]);
      list.innerHTML = '';
      visible.forEach((i, n) => {
        const t = TRADES[i];
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'trade-tab';
        b.id = `trade-tab-${i}`;
        b.dataset.index = i;
        b.style.setProperty('--i', n);
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-controls', 'trade-panel');
        b.innerHTML = `<svg viewBox="0 0 48 48" aria-hidden="true">${ICONS[t.icon] || ''}</svg><span>${highlight(t.name)}</span><span class="trade-tab__arrow" aria-hidden="true">→</span>`;
        b.addEventListener('click', () => show(i));
        list.appendChild(b);
      });
      syncTabs();
    }

    function syncTabs() {
      const tabs = $$('.trade-tab', list);
      tabs.forEach(tab => {
        const on = +tab.dataset.index === current;
        tab.setAttribute('aria-selected', on);
        tab.tabIndex = on ? 0 : -1;
      });
      if (tabs.length && !tabs.some(t => t.tabIndex === 0)) tabs[0].tabIndex = 0;
      const active = $(`#trade-tab-${current}`, list);
      if (active) {
        $('#trade-panel').setAttribute('aria-labelledby', active.id);
        list.scrollTo({
          left: active.offsetLeft - (list.clientWidth - active.offsetWidth) / 2,
          top: active.offsetTop - (list.clientHeight - active.offsetHeight) / 2,
          behavior: 'smooth'
        });
      }
    }

    function fill(t) {
      $('svg', iconBox).innerHTML = ICONS[t.icon] || '';
      iconBox.style.animation = 'none';
      void iconBox.offsetWidth;
      iconBox.style.animation = '';
      $('.explorer__cat', explorer).textContent = t.cat;
      $('.explorer__title', explorer).textContent = t.name;
      $('.explorer__summary', explorer).textContent = t.summary;
      $('.explorer__covers', explorer).innerHTML = t.covers.map((c, i) => `<li style="--i:${i}">${esc(c)}</li>`).join('');
      $('.explorer__standard', explorer).innerHTML = t.standard
        .map(([title, text], i) => `<li style="--i:${i}"><strong>${esc(title)}</strong><span>${esc(text)}</span></li>`).join('');
      cta.firstChild.textContent = t.other ? 'Ask about your trade ' : `Get a quote for ${t.name.split(' & ')[0]} `;
    }

    function show(i, instant) {
      if (i === current && !instant) return;
      current = i;
      syncTabs();
      clearTimeout(swapTimer);
      if (instant) { fill(TRADES[i]); return; }
      inner.classList.add('is-out');
      swapTimer = setTimeout(() => {
        fill(TRADES[i]);
        inner.classList.remove('is-out');
      }, 260);
    }

    list.addEventListener('keydown', (e) => {
      const tabs = $$('.trade-tab', list);
      const pos = tabs.indexOf(document.activeElement);
      if (pos < 0) return;
      const moves = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1, Home: -Infinity, End: Infinity };
      if (!(e.key in moves)) return;
      e.preventDefault();
      const step = moves[e.key];
      const next = step === -Infinity ? 0 : step === Infinity ? tabs.length - 1 : (pos + step + tabs.length) % tabs.length;
      tabs[next].focus();
      show(+tabs[next].dataset.index);
    });

    $('.explorer__next', explorer).addEventListener('click', () => {
      const pool = visible.length ? visible : TRADES.map((t, i) => i);
      const pos = pool.indexOf(current);
      show(pool[(pos + 1) % pool.length]);
    });

    let searchTimer;
    search.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        query = search.value.trim().toLowerCase();
        renderList(true);
      }, 120);
    });

    cta.addEventListener('click', () => {
      if (!tradeSelect) return;
      const t = TRADES[current];
      tradeSelect.value = t.other ? 'Other specialist / niche trade' : t.name;
      const field = tradeSelect.closest('.field');
      field.classList.remove('is-invalid', 'flash');
      void field.offsetWidth;
      field.classList.add('flash');
    });

    renderList();
    show(0, true);
  }

  /* Populate the quote form's trade dropdown, grouped by category */
  if (tradeSelect && TRADES.length) {
    window.TRADE_CATEGORIES.slice(1).forEach(cat => {
      const group = document.createElement('optgroup');
      group.label = cat;
      TRADES.filter(t => t.cat === cat).forEach(t => {
        const o = document.createElement('option');
        o.value = o.textContent = t.other ? 'Other specialist / niche trade' : t.name;
        group.appendChild(o);
      });
      tradeSelect.appendChild(group);
    });
    const unsure = document.createElement('option');
    unsure.value = unsure.textContent = 'Not sure / multiple trades';
    tradeSelect.appendChild(unsure);
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
  $$('.field input, .field textarea, .field select', form).forEach(input => {
    input.addEventListener('blur', () => { if (input.value) checkField(input); });
    input.addEventListener('input', () => input.closest('.field').classList.remove('is-invalid'));
    input.addEventListener('change', () => input.closest('.field').classList.remove('is-invalid'));
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
