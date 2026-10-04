/* ==========================================================================
   Ehroz — дизайн под ключ. Скрипты (без зависимостей)
   ========================================================================== */
(() => {
  'use strict';

  /* ─── Контакты: поменяйте здесь — ссылки обновятся по всему сайту ─── */
  const CONFIG = {
    telegram: 'hhrrzz1',        // ник в Telegram без @
    whatsapp: '77775971798',    // номер только цифрами (пусто — кнопки WhatsApp скрыты)
    instagram: 'Ehroz1',        // ник в Instagram без @
    phone: '+77775971798',      // номер для звонка
    portfolio: '',              // ссылка на портфолио: Behance, Google Drive и т. п. (пусто — кнопка скрыта)
    message: 'Дизайн',          // текст, который подставится в сообщение
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Ссылки на контакты ─── */
  const contactUrl = {
    telegram: CONFIG.telegram && `https://t.me/${CONFIG.telegram.replace(/^@/, '')}`,
    whatsapp: CONFIG.whatsapp && `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(CONFIG.message)}`,
    instagram: CONFIG.instagram && `https://instagram.com/${CONFIG.instagram.replace(/^@/, '')}`,
    phone: CONFIG.phone && `tel:${CONFIG.phone.replace(/[^\d+]/g, '')}`,
    portfolio: CONFIG.portfolio,
  };
  $$('[data-contact]').forEach((el) => {
    const url = contactUrl[el.dataset.contact];
    if (!url) { el.hidden = true; return; }
    el.href = url;
    if (el.dataset.contact === 'phone') return;
    el.target = '_blank';
    el.rel = 'noopener';
  });

  /* ─── Прелоадер ─── */
  const started = performance.now();
  const minShow = reduceMotion ? 0 : 1300;
  const markLoaded = () => {
    if (root.classList.contains('is-loaded')) return;
    root.classList.add('is-loaded');
    // после выезда заголовка снимаем обрезку строк, чтобы свечение текста не резалось
    setTimeout(() => root.classList.add('hero-done'), reduceMotion ? 0 : 1700);
  };
  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  fontsReady.then(() => {
    setTimeout(markLoaded, Math.max(0, minShow - (performance.now() - started)));
  });
  setTimeout(markLoaded, 3000);

  /* ─── Общий цикл прокрутки ─── */
  const scrollTasks = [];
  const resizeTasks = [];
  let ticking = false;
  const runScroll = () => {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    for (const task of scrollTasks) task(y, vh);
  };
  const requestScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(runScroll); }
  };
  window.addEventListener('scroll', requestScroll, { passive: true });
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resizeTasks.forEach((t) => t()); requestScroll(); }, 120);
  });

  /* ─── Шапка ─── */
  const header = $('[data-header]');
  const hero = $('[data-hero]');
  let heroH = hero ? hero.offsetHeight : 0;
  resizeTasks.push(() => { heroH = hero ? hero.offsetHeight : 0; });
  let lastY = window.scrollY;
  let menuOpen = false;

  scrollTasks.push((y) => {
    header.classList.toggle('is-solid', y > heroH - 70);
    const delta = y - lastY;
    if (!menuOpen) {
      if (delta > 6 && y > 260) header.classList.add('is-hidden');
      else if (delta < -6 || y < 260) header.classList.remove('is-hidden');
    }
    lastY = y;
  });

  /* ─── Меню ─── */
  const burger = $('.burger');
  const menu = $('#menu');
  const setMenu = (open) => {
    menuOpen = open;
    root.classList.toggle('menu-open', open);
    document.body.classList.toggle('is-locked', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    if (open) header.classList.remove('is-hidden');
  };
  if (burger && menu) {
    burger.addEventListener('click', () => setMenu(!menuOpen));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menuOpen) setMenu(false); });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches && menuOpen) setMenu(false); });
  }

  /* ─── Появление при прокрутке ─── */
  $$('[data-stagger]').forEach((group) => {
    const step = parseFloat(group.dataset.stagger) || 0.08;
    $$('[data-reveal]', group).forEach((el, i) => el.style.setProperty('--d', `${(i * step).toFixed(2)}s`));
  });
  const revealTargets = $$('[data-reveal], [data-inview]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-in'));
  }

  /* ─── Обложка: параллакс и лепестки ─── */
  const heroMedia = $('.hero__media');
  const heroContent = $('.hero__content');
  if (hero && !reduceMotion) {
    scrollTasks.push((y, vh) => {
      if (y > vh * 1.3) return;
      heroMedia.style.transform = `translate3d(0, ${(y * 0.3).toFixed(1)}px, 0)`;
      const p = clamp(y / (vh * 0.75), 0, 1);
      heroContent.style.opacity = String(1 - p);
      heroContent.style.transform = `translate3d(0, ${(y * -0.1).toFixed(1)}px, 0)`;
    });
  }

  const canvas = $('.hero__petals');
  if (canvas && canvas.getContext && !reduceMotion) startPetals(canvas, hero);

  function startPetals(cv, host) {
    const ctx = cv.getContext('2d');
    const palette = [
      ['#FFE1EE', '#F48FBF'],
      ['#FFF3F8', '#F7B6D2'],
      ['#F1E8FF', '#B69CEB'],
      ['#FFE7EC', '#EE7FA8'],
      ['#FFFFFF', '#FBD3E5'],
    ];
    let w = 0, h = 0, petals = [], raf = 0, running = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 768 ? 16 : 30;
      while (petals.length < count) petals.push(makePetal(true));
      petals.length = count;
    };

    function makePetal(anywhere) {
      const s = 7 + Math.random() * 11;
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : -30 - Math.random() * 80,
        s,
        vy: 0.35 + Math.random() * 0.55 + s * 0.02,
        vx: -0.25 + Math.random() * 0.5,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.03,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.008 + Math.random() * 0.016,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: 0.02 + Math.random() * 0.03,
        c: palette[(Math.random() * palette.length) | 0],
        a: 0.55 + Math.random() * 0.4,
      };
    }

    function draw(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(1, 0.35 + Math.abs(Math.cos(p.flip)) * 0.65);
      const g = ctx.createLinearGradient(0, -p.s, 0, p.s);
      g.addColorStop(0, p.c[0]);
      g.addColorStop(1, p.c[1]);
      ctx.globalAlpha = p.a;
      ctx.fillStyle = g;
      const s = p.s;
      ctx.beginPath();
      ctx.moveTo(0, s);
      ctx.bezierCurveTo(-s * 0.95, s * 0.35, -s * 0.75, -s * 0.9, -s * 0.12, -s);
      ctx.quadraticCurveTo(0, -s * 0.78, s * 0.12, -s);
      ctx.bezierCurveTo(s * 0.75, -s * 0.9, s * 0.95, s * 0.35, 0, s);
      ctx.fill();
      ctx.restore();
    }

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.sway += p.swaySpeed;
        p.flip += p.flipSpeed;
        p.rot += p.vr;
        p.x += p.vx + Math.sin(p.sway) * 0.6;
        p.y += p.vy;
        if (p.y > h + 30 || p.x < -40 || p.x > w + 40) petals[i] = makePetal(false);
        draw(petals[i]);
      }
      raf = requestAnimationFrame(frame);
    };

    const play = () => { if (!running) { running = true; raf = requestAnimationFrame(frame); } };
    const pause = () => { running = false; cancelAnimationFrame(raf); };

    resize();
    resizeTasks.push(resize);
    let visible = true;
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      visible && !document.hidden ? play() : pause();
    }).observe(host);
    document.addEventListener('visibilitychange', () => {
      document.hidden || !visible ? pause() : play();
    });
    play();
  }

  /* ─── Текст, который «проявляется» при прокрутке ─── */
  const splitWords = (el) => {
    const words = [];
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/([ \t\n]+)/).forEach((part) => {
            if (!part) return;
            if (/^[ \t\n]+$/.test(part)) { frag.append(part); return; }
            const span = document.createElement('span');
            span.className = 'w';
            span.textContent = part;
            frag.append(span);
            words.push(span);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          walk(child);
        }
      });
    };
    walk(el);
    return words;
  };

  $$('[data-words]').forEach((el) => {
    const words = splitWords(el);
    if (reduceMotion) { words.forEach((w) => w.classList.add('on')); return; }
    let shown = -1;
    scrollTasks.push((y, vh) => {
      const r = el.getBoundingClientRect();
      const start = vh * 0.88;
      const end = vh * 0.38;
      const p = clamp((start - r.top) / (start - end + r.height * 0.6), 0, 1);
      const n = Math.round(p * words.length);
      if (n === shown) return;
      shown = n;
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    });
  });

  /* ─── Карточки «Знакомо?»: стопка ─── */
  const pains = $$('.pain');
  if (pains.length > 1 && !reduceMotion) {
    scrollTasks.push(() => {
      for (let i = 0; i < pains.length - 1; i++) {
        const a = pains[i];
        const top = a.getBoundingClientRect().top;
        const nextTop = pains[i + 1].getBoundingClientRect().top;
        const p = clamp((top + a.offsetHeight - nextTop) / a.offsetHeight, 0, 1);
        a.style.transform = p > 0 ? `scale(${(1 - p * 0.07).toFixed(4)})` : '';
        a.style.setProperty('--dim', p.toFixed(3));
      }
    });
  }

  /* ─── Параллакс декоративных элементов ─── */
  const parallaxEls = $$('[data-parallax]').map((el) => ({ el, host: el.parentElement, k: parseFloat(el.dataset.parallax) }));
  if (parallaxEls.length && !reduceMotion) {
    scrollTasks.push((y, vh) => {
      parallaxEls.forEach(({ el, host, k }) => {
        if (!el.isConnected) return;
        const box = host.getBoundingClientRect();
        if (box.bottom < -200 || box.top > vh + 200) return;
        const offset = (box.top + box.height / 2 - vh / 2) * -k;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    });
  }

  /* ─── Услуги: аккордеон ─── */
  $$('.svc__head').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.svc');
      const open = !item.classList.contains('is-open');
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ─── Конструктор постов: живое демо ─── */
  const builder = $('[data-builder]');
  if (builder) initBuilder(builder);

  function initBuilder(section) {
    const TEMPLATES = {
      sale:   { layout: 'photo', theme: 'pink',  img: 'img/post-1.jpg', tag: 'Акция',    title: '−20% на всё',             sub: 'только до воскресенья' },
      new:    { layout: 'photo', theme: 'lilac', img: 'img/post-2.jpg', tag: 'Новинка',  title: 'Новая коллекция',         sub: 'уже в продаже' },
      review: { layout: 'quote', theme: 'cream', img: 'img/post-3.jpg', tag: 'Отзыв',    title: '«Лучший сервис в городе!»', sub: 'Айгерим, постоянный клиент' },
      event:  { layout: 'solid', theme: 'night', img: 'img/post-2.jpg', tag: 'Анонс',    title: 'Открытие 12 октября',     sub: 'ждём вас в 18:00' },
      job:    { layout: 'solid', theme: 'blush', img: 'img/post-3.jpg', tag: 'Вакансия', title: 'Ищем бариста в команду',  sub: 'пишите в директ' },
      story:  { layout: 'story', theme: 'pink',  img: 'img/post-1.jpg', tag: 'Сторис',   title: 'Новинки недели',          sub: 'смотрите в профиле' },
    };
    const order = Object.keys(TEMPLATES);
    const post = $('.post', section);
    const photo = $('.post__photo img', section);
    const tagEl = $('[data-p-tag]', section);
    const titleEl = $('[data-p-title]', section);
    const subEl = $('[data-p-sub]', section);
    const fieldTitle = $('[data-field-title]', section);
    const fieldPhoto = $('[data-field-photo]', section);
    const chipsRow = $('.app__tpls', section);
    const chips = $$('.chip', section);
    const download = $('[data-download]', section);
    const burst = $('.app__burst', section);
    const phone = $('.phone', section);

    let current = 'sale';
    let swapTimer, typeTimer, autoTimer, resumeTimer, doneTimer, tapTimer;
    let auto = true;
    let visible = false;

    const typeText = (text) => {
      clearInterval(typeTimer);
      if (reduceMotion) { fieldTitle.textContent = text; return; }
      let i = 0;
      fieldTitle.textContent = '';
      typeTimer = setInterval(() => {
        i += 1;
        fieldTitle.textContent = text.slice(0, i);
        if (i >= text.length) clearInterval(typeTimer);
      }, 34);
    };

    const setChip = (key) => {
      chips.forEach((c) => {
        const on = c.dataset.tpl === key;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', String(on));
        if (on) {
          const left = c.offsetLeft - (chipsRow.clientWidth - c.offsetWidth) / 2;
          chipsRow.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      });
    };

    const apply = (key) => {
      if (key === current) return;
      current = key;
      const t = TEMPLATES[key];
      setChip(key);
      post.classList.add('is-swapping');
      clearTimeout(swapTimer);
      swapTimer = setTimeout(() => {
        post.dataset.layout = t.layout;
        post.dataset.theme = t.theme;
        if (!photo.src.endsWith(t.img)) photo.src = t.img;
        if (!fieldPhoto.src.endsWith(t.img)) fieldPhoto.src = t.img;
        tagEl.textContent = t.tag;
        titleEl.textContent = t.title;
        subEl.textContent = t.sub;
        requestAnimationFrame(() => post.classList.remove('is-swapping'));
      }, reduceMotion ? 0 : 260);
      typeText(t.title);
    };

    const celebrate = () => {
      download.classList.add('is-done');
      if (!reduceMotion) {
        burst.innerHTML = '';
        for (let i = 0; i < 9; i++) {
          const s = document.createElement('i');
          const angle = (Math.PI * 2 * i) / 9 + Math.random() * 0.4;
          const dist = 40 + Math.random() * 34;
          s.style.setProperty('--x', `${Math.cos(angle) * dist * 1.6}px`);
          s.style.setProperty('--y', `${Math.sin(angle) * dist}px`);
          s.style.background = i % 2 ? '#B69CEB' : '#EE5FA0';
          burst.append(s);
        }
      }
      clearTimeout(doneTimer);
      doneTimer = setTimeout(() => download.classList.remove('is-done'), 1500);
    };

    const step = () => {
      const next = order[(order.indexOf(current) + 1) % order.length];
      apply(next);
      clearTimeout(tapTimer);
      tapTimer = setTimeout(celebrate, 1700);
    };
    const stopAuto = () => clearInterval(autoTimer);
    const startAuto = () => {
      stopAuto();
      if (auto && visible && !reduceMotion) autoTimer = setInterval(step, 3600);
    };

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        auto = false;
        stopAuto();
        clearTimeout(tapTimer);
        apply(chip.dataset.tpl);
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => { auto = true; startAuto(); }, 12000);
      });
    });
    download.addEventListener('click', celebrate);

    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      visible ? startAuto() : stopAuto();
    }, { threshold: 0.4 }).observe(phone);
  }

  /* ─── Пакеты: слайдер на мобильных ─── */
  const slider = $('[data-slider]');
  if (slider) {
    const track = $('.pk-track', slider);
    const cards = $$('.pk', track);
    const bar = $('.pk-progress i', slider);
    const count = $('.pk-count b', slider);
    const prev = $('[data-prev]', slider);
    const next = $('[data-next]', slider);
    const n = cards.length;
    bar.style.width = `${100 / n}%`;

    const index = () => {
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 0) return 0;
      return Math.round((track.scrollLeft / max) * (n - 1));
    };
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? clamp(track.scrollLeft / max, 0, 1) : 0;
      bar.style.transform = `translateX(${(p * (n - 1) * 100).toFixed(1)}%)`;
      const i = index();
      count.textContent = String(i + 1).padStart(2, '0');
      prev.disabled = p < 0.02;
      next.disabled = p > 0.98;
    };
    const go = (i) => {
      const card = cards[clamp(i, 0, n - 1)];
      const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      track.scrollTo({ left: card.offsetLeft - pad, behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    let raf = 0;
    track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
    prev.addEventListener('click', () => go(index() - 1));
    next.addEventListener('click', () => go(index() + 1));
    resizeTasks.push(update);
    update();
  }

  /* ─── Этапы: линия прогресса ─── */
  const timeline = $('[data-timeline]');
  if (timeline) {
    const line = $('.timeline__line i', timeline);
    const steps = $$('.step', timeline).map((el) => ({ el, star: $('.step__star', el) }));
    scrollTasks.push((y, vh) => {
      const r = line.parentElement.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return;
      const mark = vh * 0.62;
      const p = clamp((mark - r.top) / r.height, 0, 1);
      line.style.transform = `scaleY(${p.toFixed(4)})`;
      steps.forEach(({ el, star }) => {
        const s = star.getBoundingClientRect();
        el.classList.toggle('is-active', s.top + s.height / 2 < mark);
      });
    });
  }

  /* ─── Таймер до конца месяца ─── */
  const countdown = $('[data-countdown]');
  if (countdown) {
    const forms = {
      d: ['день', 'дня', 'дней'],
      h: ['час', 'часа', 'часов'],
      m: ['минута', 'минуты', 'минут'],
      s: ['секунда', 'секунды', 'секунд'],
    };
    const plural = (n, f) => {
      const a = n % 10, b = n % 100;
      if (a === 1 && b !== 11) return f[0];
      if (a >= 2 && a <= 4 && (b < 10 || b >= 20)) return f[1];
      return f[2];
    };
    const nodes = {};
    ['d', 'h', 'm', 's'].forEach((k) => {
      nodes[k] = { v: $(`[data-cd="${k}"]`, countdown), l: $(`[data-cd-l="${k}"]`, countdown) };
    });
    const now0 = new Date();
    const lastDay = new Date(now0.getFullYear(), now0.getMonth() + 1, 0);
    const until = $('[data-cd-until]');
    if (until) until.textContent = lastDay.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });

    const tick = () => {
      const now = new Date();
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      let s = Math.max(0, Math.floor((end - now) / 1000));
      const vals = { d: Math.floor(s / 86400), h: 0, m: 0, s: 0 };
      s %= 86400;
      vals.h = Math.floor(s / 3600);
      s %= 3600;
      vals.m = Math.floor(s / 60);
      vals.s = s % 60;
      Object.keys(vals).forEach((k) => {
        const txt = String(vals[k]).padStart(2, '0');
        if (nodes[k].v.textContent !== txt) nodes[k].v.textContent = txt;
        nodes[k].l.textContent = plural(vals[k], forms[k]);
      });
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ─── Плавающая кнопка на мобильных ─── */
  const dock = $('[data-dock]');
  const offer = $('#contact');
  if (dock && offer) {
    scrollTasks.push((y, vh) => {
      const pastHero = y > heroH * 0.85;
      const nearEnd = offer.getBoundingClientRect().top < vh * 0.9;
      dock.classList.toggle('is-visible', pastHero && !nearEnd && !menuOpen);
    });
  }

  /* ─── Год в подвале ─── */
  $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  runScroll();
})();
