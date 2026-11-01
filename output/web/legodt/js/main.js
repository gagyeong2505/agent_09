/* LEGODT unofficial brand intro — vanilla JS, no globals */
(() => {
  'use strict';

  document.documentElement.classList.add('js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Colors (approximate screen colors, not official values) ---------- */
  const PART_COLORS = [
    { name: '블랙', hex: '#141414' },
    { name: '아이보리', hex: '#F7F1E3' },
    { name: '민트', hex: '#A8E3CF' },
    { name: '라벤더', hex: '#C9B8F2' },
    { name: '코랄', hex: '#F59C8B' },
    { name: '레몬 소다', hex: '#F7E77D' },
    { name: '라이트 블루', hex: '#AFD3F4' },
    { name: '베리 핑크', hex: '#F07DB2' },
    { name: '레드', hex: '#E2443A' },
    { name: '네이비', hex: '#24345F' }
  ];

  const TILES = [
    { en: 'Mint', ko: '민트', hex: '#A8E3CF' },
    { en: 'Lavender', ko: '라벤더', hex: '#C9B8F2' },
    { en: 'Coral', ko: '코랄', hex: '#F59C8B' },
    { en: 'Lemon Soda', ko: '레몬 소다', hex: '#F7E77D' },
    { en: 'Light Blue', ko: '라이트 블루', hex: '#AFD3F4' },
    { en: 'Berry Pink', ko: '베리 핑크', hex: '#F07DB2' },
    { en: 'Ivory', ko: '아이보리', hex: '#F7F1E3' },
    { en: 'Lime', ko: '라임', hex: '#CDE77F' },
    { en: 'Tangerine Yellow', ko: '탠저린 옐로우', hex: '#FFC24B' },
    { en: 'Light Gray', ko: '라이트 그레이', hex: '#D9D9D6' },
    { en: 'Navy', ko: '네이비', hex: '#24345F', light: true },
    { en: 'Gradient Pink', ko: '그라데이션 핑크', hex: 'GRAD', gradient: 'linear-gradient(180deg, #FFE3EF 0%, #F07DB2 100%)', fill: 'url(#grad-pink)' }
  ];

  const maker = { live: null, parts: {} };

  const ready = (fn) => {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  };


  /* ---------- Nav ---------- */
  function initNav() {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.getElementById('nav-menu');
    if (!header || !toggle || !menu) return;

    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.sr-only').textContent = open ? '메뉴 닫기' : '메뉴 열기';
      menu.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
  }

  /* ---------- Count-up numbers ---------- */
  function initCounters() {
    const counters = document.querySelectorAll('.counter[data-count]');
    if (reduceMotion.matches || !('IntersectionObserver' in window)) return; // static text already correct
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const dur = 1200;
      const step = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (target * eased).toFixed(decimals) + (t === 1 ? suffix : '');
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => io.observe(el));
  }

  /* ---------- Floating cards parallax (Brand Story) ---------- */
  function initParallax() {
    const cards = document.querySelectorAll('[data-parallax]');
    const section = document.getElementById('story');
    if (!cards.length || !section || reduceMotion.matches) return;
    let ticking = false;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      cards.forEach((card) => {
        const speed = parseFloat(card.dataset.parallax);
        card.style.transform = `translateY(${(-offset * speed).toFixed(1)}px)`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Draggable sticker tags (pointer + keyboard) ---------- */
  function initStickers() {
    document.querySelectorAll('.sticker').forEach((el) => {
      const box = el.closest('.hero__card, .maker__stage');
      let dx = 0; let dy = 0; let startX = 0; let startY = 0; let baseX = 0; let baseY = 0;
      let dragging = false;

      el.setAttribute('aria-label', `${el.textContent.trim()} 스티커 — 방향키로 이동`);

      const clamp = (nx, ny) => {
        if (!box) return [nx, ny];
        const b = box.getBoundingClientRect();
        // position without current offset
        const r = el.getBoundingClientRect();
        const left0 = r.left - dx; const top0 = r.top - dy;
        const minX = b.left - left0 - 12; const maxX = b.right - (left0 + r.width) + 12;
        const minY = b.top - top0 - 12; const maxY = b.bottom - (top0 + r.height) + 12;
        return [Math.max(minX, Math.min(maxX, nx)), Math.max(minY, Math.min(maxY, ny))];
      };
      const apply = () => {
        el.style.setProperty('--dx', `${dx}px`);
        el.style.setProperty('--dy', `${dy}px`);
      };

      el.addEventListener('pointerdown', (e) => {
        dragging = true;
        el.setPointerCapture(e.pointerId);
        el.classList.add('is-dragging', 'was-moved');
        startX = e.clientX; startY = e.clientY; baseX = dx; baseY = dy;
      });
      el.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        [dx, dy] = clamp(baseX + e.clientX - startX, baseY + e.clientY - startY);
        apply();
      });
      const end = () => { dragging = false; el.classList.remove('is-dragging'); };
      el.addEventListener('pointerup', end);
      el.addEventListener('pointercancel', end);

      el.addEventListener('keydown', (e) => {
        const step = e.shiftKey ? 30 : 10;
        const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
        if (!moves[e.key]) return;
        e.preventDefault();
        el.classList.add('was-moved');
        [dx, dy] = clamp(dx + moves[e.key][0], dy + moves[e.key][1]);
        apply();
      });
    });
  }

  /* ---------- Make Your Own configurator ---------- */

  function announce(msg) {
    if (maker.live) maker.live.textContent = msg;
  }

  function setPart(part, color, name, { silent = false } = {}) {
    const el = maker.parts[part];
    if (!el) return;
    if (part === 'loop') el.setAttribute('stroke', color);
    else el.setAttribute('fill', color);

    const row = document.querySelector(`.swatch-row[data-part="${part}"]`);
    if (row) {
      row.querySelectorAll('.swatch').forEach((b) => {
        b.setAttribute('aria-pressed', String(b.dataset.hex === color));
      });
    }
    if (!silent) {
      const labels = { loop: '루프 핸들', lid: '뚜껑', body: '바디', sleeve: '슬리브' };
      announce(`${labels[part]}: ${name}`);
    }
  }

  function initMaker() {
    maker.live = document.getElementById('maker-live');
    ['loop', 'lid', 'body', 'sleeve'].forEach((p) => { maker.parts[p] = document.getElementById(`part-${p}`); });
    const svg = document.querySelector('.maker__svg');

    const initial = { loop: '#F07DB2', lid: '#F7F1E3', body: '#A8E3CF', sleeve: '#C9B8F2' };

    document.querySelectorAll('.swatch-row').forEach((row) => {
      const part = row.dataset.part;
      const wrap = row.querySelector('.swatches');
      PART_COLORS.forEach((c) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'swatch';
        b.style.setProperty('--sw', c.hex);
        b.dataset.hex = c.hex;
        b.setAttribute('aria-label', `${row.querySelector('legend').textContent} ${c.name}`);
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', () => {
          setPart(part, c.hex, c.name);
          bump(svg);
          clearTilePressed();
        });
        wrap.appendChild(b);
      });
      setPart(part, initial[part], '', { silent: true });
    });

    const random = document.getElementById('maker-random');
    if (random) {
      random.addEventListener('click', () => {
        const pick = () => PART_COLORS[Math.floor(Math.random() * PART_COLORS.length)];
        const chosen = {};
        ['loop', 'lid', 'body', 'sleeve'].forEach((p) => {
          let c = pick();
          // avoid body and sleeve being identical for visible contrast
          if (p === 'sleeve') { while (c.hex === chosen.body.hex) c = pick(); }
          chosen[p] = c;
          setPart(p, c.hex, c.name, { silent: true });
        });
        announce(`랜덤 믹스: 루프 ${chosen.loop.name}, 뚜껑 ${chosen.lid.name}, 바디 ${chosen.body.name}, 슬리브 ${chosen.sleeve.name}`);
        bump(svg);
        clearTilePressed();
      });
    }
  }

  function bump(el) {
    if (!el || reduceMotion.matches) return;
    el.classList.remove('pop');
    void el.getBoundingClientRect();
    el.classList.add('pop');
  }

  /* ---------- Color tiles ---------- */
  function clearTilePressed() {
    document.querySelectorAll('.tile').forEach((t) => t.setAttribute('aria-pressed', 'false'));
  }

  function initTiles() {
    const list = document.getElementById('color-tiles');
    if (!list) return;
    TILES.forEach((t) => {
      const li = document.createElement('li');
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'tile';
      b.style.setProperty('--sw', t.gradient || t.hex);
      if (t.light) b.style.setProperty('--ink', '#FFFFFF');
      b.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-label', `${t.ko} (${t.en}) — 텀블러 바디에 적용`);
      b.innerHTML = `<span class="tile__hex" aria-hidden="true">${t.gradient ? 'GRAD' : t.hex}</span>` +
        `<span class="tile__ko">${t.ko}</span><span class="tile__en">${t.en}</span>`;
      b.addEventListener('click', () => {
        setPart('body', t.fill || t.hex, t.ko, { silent: true });
        clearTilePressed();
        b.setAttribute('aria-pressed', 'true');
        announce(`바디: ${t.ko} 적용됨`);
        bump(document.querySelector('.maker__svg'));
      });
      li.appendChild(b);
      list.appendChild(li);
    });
  }

  /* ---------- Lineup carousel buttons ---------- */
  function initLineup() {
    const track = document.querySelector('.lineup__track');
    if (!track) return;
    document.querySelectorAll('[data-scroll]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const card = track.querySelector('.capsule');
        const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
        const w = card ? card.getBoundingClientRect().width + gap : 300;
        track.scrollBy({ left: w * parseInt(btn.dataset.scroll, 10), behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      });
    });
    track.addEventListener('keydown', (e) => {
      if (e.target !== track) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        track.scrollBy({ left: e.key === 'ArrowRight' ? 300 : -300, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      }
    });
  }

  /* ---------- Timeline: sticky year follows the card in view ---------- */
  function initTimeline() {
    const yearEl = document.getElementById('tl-year');
    const cards = document.querySelectorAll('.tl-card[data-year]');
    if (!yearEl || !cards.length || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) yearEl.textContent = entry.target.dataset.year;
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    cards.forEach((c) => io.observe(c));
  }
  ready(() => {
    initNav();
    initReveal();
    initCounters();
    initParallax();
    initStickers();
    initMaker();
    initTiles();
    initLineup();
    initTimeline();
  });
})();
