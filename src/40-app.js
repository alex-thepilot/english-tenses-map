/* ═══════════════════════════════════════════════════════════
   ТРЕНАЖЁР · один компонент на все 21 блок заданий
   Показывает по одному вопросу. После ответа — разбор:
   почему верный вариант верный и чем плох выбранный.
   ═══════════════════════════════════════════════════════════ */
function makeQuiz(root, questions, opts) {
  opts = opts || {};
  const title = opts.title || 'Проверь себя';
  let i = 0, score = 0, answered = false;

  root.innerHTML = `
    <div class="drill__top">
      <span class="eyebrow" data-r="num"></span>
      <div class="drill__bar"><i data-r="bar"></i></div>
      <span class="drill__score" data-r="score"></span>
    </div>
    <div class="drill__body">
      <div class="qz__q" data-r="q"></div>
      <div class="qz__opts" data-r="opts"></div>
      <div class="qz__fb" data-r="fb"></div>
      <div class="qz__nav">
        <button class="btn" data-r="next" hidden>Дальше →</button>
        <button class="btn ghost" data-r="again" hidden>Пройти заново</button>
        <span class="qz__done" data-r="done"></span>
      </div>
    </div>`;

  const el = {};
  root.querySelectorAll('[data-r]').forEach(n => el[n.dataset.r] = n);

  function render() {
    const q = questions[i];
    answered = false;
    el.num.textContent = `${title} · ${i + 1} / ${questions.length}`;
    el.bar.style.width = (i / questions.length * 100) + '%';
    el.score.textContent = `${score} верно`;
    el.q.innerHTML = q.s.split('___').join('<u></u>');
    el.opts.innerHTML = q.o.map((o, k) => `<button data-k="${k}">${o.t}</button>`).join('');
    el.fb.innerHTML = '';
    el.next.hidden = true;
    el.again.hidden = true;
    el.done.textContent = '';
  }

  el.opts.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b || answered) return;
    answered = true;

    const q = questions[i], pick = +b.dataset.k;
    const right = q.o.findIndex(o => o.ok);
    [...el.opts.children].forEach((btn, k) => {
      btn.disabled = true;
      if (k === right) btn.classList.add('right');
      else if (k === pick) btn.classList.add('wrong');
    });

    const rows = [];
    if (pick !== right) {
      rows.push(`<div class="qz__row bad"><b>✗ ${q.o[pick].t}</b><span>${q.o[pick].w}</span></div>`);
    } else {
      score++;
    }
    rows.push(`<div class="qz__row good"><b>✓ ${q.o[right].t}</b><span>${q.o[right].w}</span></div>`);
    el.fb.innerHTML = rows.join('');

    el.score.textContent = `${score} верно`;
    el.bar.style.width = ((i + 1) / questions.length * 100) + '%';

    if (i < questions.length - 1) {
      el.next.hidden = false;
    } else {
      el.again.hidden = false;
      const pct = score / questions.length;
      el.done.innerHTML = `<b>Итог: ${score} из ${questions.length}.</b> ` + (
        pct >= 0.9 ? 'Тема закрыта — можно идти дальше.' :
        pct >= 0.7 ? 'База крепкая, слабые места видно по разборам выше.' :
                     'Стоит перечитать блок и вернуться к заданиям.');
    }
  });

  el.next.addEventListener('click', () => { i++; render(); root.scrollIntoView({ block: 'nearest' }); });
  el.again.addEventListener('click', () => { i = 0; score = 0; render(); });
  render();
}

/* ═══════════════════════════════════════════════════════════
   СТАНЦИЯ · общая для времён и условных
   ═══════════════════════════════════════════════════════════ */
function stationHTML(it, cfg) {
  const blocks = it.blocks.map(b => `
    <div class="blk callout ${b.kind === 'trap' ? 'trap' : b.kind === 'key' ? 'key' : ''}"
         ${b.kind === 'plain' ? 'style="border-left-color:var(--line)"' : ''}>
      <h4>${b.h}</h4><p>${b.p}</p>
    </div>`).join('');

  const ex = it.ex.map(e => `
    <li><span class="en">${e.en}</span><span class="ru">${e.ru}</span>${e.nb ? `<span class="nb">${e.nb}</span>` : ''}</li>`).join('');

  return `
  <article class="station z-${it.zone}" id="${it.id}">
    <div class="st__top">
      <div>
        <div class="eyebrow"><span class="st__idx">${String(it.idx).padStart(2, '0')}</span> · ${cfg.kindLabel(it)}</div>
        <h3>${it.name}</h3>
        <div class="mono" style="color:var(--text-mute);font-size:.85rem;margin-top:8px">${it.core}</div>
      </div>
      <button class="mark-btn" data-mark="${it.id}">изучено</button>
    </div>

    <p class="st__thesis">«${it.thesis}»</p>

    ${cfg.figure(it)}

    <div class="st__grid">
      <div class="prose">
        <p class="lead">${it.lead}</p>
        ${blocks}
        <div class="blk">
          <h4>Как это звучит</h4>
          <ul class="ex-list">${ex}</ul>
        </div>
      </div>
      <aside class="side">
        <div class="forms">
          <div class="p"><i>+</i><code>${it.forms.p}</code></div>
          <div class="n"><i>−</i><code>${it.forms.n}</code></div>
          <div class="q"><i>?</i><code>${it.forms.q}</code></div>
        </div>
        <div class="chips">
          <h4 class="eyebrow">Слова-маркеры</h4>
          <ul>${it.markers.map(m => `<li>${m}</li>`).join('')}</ul>
        </div>
      </aside>
    </div>

    <div class="drill" id="drill-${it.id}"></div>
  </article>`;
}

function renderRoadmap(rootId, levels, items, cfg) {
  const rm = document.getElementById(rootId);
  rm.innerHTML = levels.map(L => `
    <section class="level" id="${cfg.pid}-lvl${L.n}">
      <div class="level__n">Уровень ${L.n} · ${L.ru}</div>
      <h2>${L.title} <code>${L.code}</code></h2>
      <p>${L.txt}</p>
    </section>
    ${items.filter(x => x.level === L.n).map(x => stationHTML(x, cfg)).join('')}
  `).join('');

  items.forEach(x => {
    const host = document.getElementById('drill-' + x.id);
    const qs = cfg.drills[x.id];
    if (host && qs) makeQuiz(host, qs, { title: 'Задание' });
    else if (host) host.remove();
  });
}

/* ═══════════════════════════════════════════════════════════
   ВКЛАДКА «ВРЕМЕНА»
   ═══════════════════════════════════════════════════════════ */
document.getElementById('legend').innerHTML = LEG.map((l, i) => `
  <div class="legend__c z-${l.z}">
    <svg viewBox="0 0 160 62" role="img" aria-label="Графический знак аспекта ${l.t}">${l.d(i)}</svg>
    <h4>${l.t}</h4>
    <span class="mono">${l.c}</span>
    <p>${l.p}</p>
  </div>`).join('');

const byCell = (z, a) => T.find(t => t.zone === z && t.aspect === a);
const mx = document.getElementById('matrix');
let mxHTML = '<div></div>' + ZONES.map(z => `<div class="mx-h z-${z.key}">${z.label}</div>`).join('');
ASPECTS.forEach(a => {
  mxHTML += `<div class="mx-r"><b>${a.name}</b><span>${a.core}</span></div>`;
  ZONES.forEach(z => {
    const t = byCell(z.key, a.key);
    mxHTML += `<button class="mx-c z-${z.key}" data-id="${t.id}" aria-pressed="false">
      <b>${t.name}</b><i>${t.core}</i><em>${t.thesis}</em></button>`;
  });
});
mx.innerHTML = mxHTML;

function parts(t) {
  const aux = { past: { simple: 'did', continuous: 'was / were', perfect: 'had', perfectcont: 'had been' },
                present: { simple: 'do / does', continuous: 'am / is / are', perfect: 'have / has', perfectcont: 'have / has been' },
                future: { simple: 'will', continuous: 'will be', perfect: 'will have', perfectcont: 'will have been' } };
  const form = { simple: 'V', continuous: 'V-ing', perfect: 'V3', perfectcont: 'V-ing' };
  return [aux[t.zone][t.aspect], form[t.aspect]];
}

const mxout = document.getElementById('mxout');
function showCell(id) {
  const t = T.find(x => x.id === id);
  const [aux, form] = parts(t);
  mxout.className = 'mxout z-' + t.zone;
  mxout.innerHTML = `
    <div class="mxout__l">
      <div class="eyebrow">${ZONES.find(z => z.key === t.zone).label.split(' · ')[1]} × ${ASPECTS.find(a => a.key === t.aspect).short}</div>
      <h3>${t.name}</h3>
      <p>${t.thesis}. ${t.lead.replace(/<\/?b>/g, '')}</p>
      <div class="ex">${t.ex[0].en}<i>${t.ex[0].ru}</i></div>
    </div>
    <div class="build">
      <span class="aux">${aux}</span><span class="plus">+</span><span>${form}</span>
      <a href="#${t.id}">Разобрать →</a>
    </div>`;
  mx.querySelectorAll('.mx-c').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.id === id)));
}
mx.addEventListener('click', e => {
  const b = e.target.closest('.mx-c');
  if (b) showCell(b.dataset.id);
});
showCell('present-perfect');

renderRoadmap('t-road', LEVELS, T, {
  pid: 't',
  drills: DRILLS,
  kindLabel: it => ASPECTS.find(a => a.key === it.aspect).name.toUpperCase(),
  figure: it => `<figure class="tl"><div class="tl__in">${timeline(it.id)}</div><figcaption>${it.tlCap}</figcaption></figure>`
});

function renderDuels(hostId, list, figFn) {
  document.getElementById(hostId).innerHTML = list.map((d, i) => `
    <div class="duel">
      <div class="duel__q">${d.q}</div>
      <div class="duel__b">
        ${[d.a, d.b].map((s, k) => `
          <div class="duel__s z-${s.z}">
            <div class="eyebrow">${s.n}</div>
            ${s.tl ? `<div class="tlbox">${figFn(s.tl, 'd' + hostId + i + k)}</div>` : ''}
            <p class="en">${s.en}</p>
            <p class="ru">${s.ru}</p>
            <p class="why">${s.why}</p>
          </div>`).join('')}
      </div>
      <div class="duel__r"><b>Признак</b><span>${d.r}</span></div>
    </div>`).join('');
}
renderDuels('duels', DUELS, (id, uid) => timeline(id, uid));

makeQuiz(document.getElementById('tQuiz'), QUIZ_T, { title: 'Вопрос' });

document.getElementById('sheetBody').innerHTML = T.map(t => `
  <tr class="z-${t.zone}">
    <td class="nm"><b>${t.name}</b></td>
    <td class="fm"><code>${t.core}</code></td>
    <td class="mk">${t.markers.slice(0, 4).join(' · ')}</td>
    <td class="ex">${t.ex[0].en.replace(/<\/?i[^>]*>/g, '')}</td>
  </tr>`).join('');

/* ═══════════════════════════════════════════════════════════
   ВКЛАДКА «УСЛОВНЫЕ»
   ═══════════════════════════════════════════════════════════ */
renderRoadmap('c-road', CLEVELS, C, {
  pid: 'c',
  drills: CDRILLS,
  kindLabel: it => it.short.toUpperCase(),
  figure: it => `<figure class="cf"><div class="cf__in">${CDRAW[it.id]()}</div><figcaption>${it.figCap}</figcaption></figure>`
});

renderDuels('cDuels', CDUELS, () => '');
makeQuiz(document.getElementById('cQuiz'), QUIZ_C, { title: 'Вопрос' });

document.getElementById('cSheetBody').innerHTML = C.map(c => `
  <tr class="z-${c.zone}">
    <td class="nm"><b>${c.name}</b></td>
    <td class="fm"><code>${c.core}</code></td>
    <td class="mk">${c.markers.slice(0, 3).join(' · ')}</td>
    <td class="ex">${c.mxEx}</td>
  </tr>`).join('');

/* ── определитель типа ───────────────────────────────────── */
const DET = {
  start: {
    q: 'Сколько «бы» в русском переводе?',
    opts: [
      { t: 'Ни одного', i: '«Если пойдёт дождь, я останусь дома»', go: 'real' },
      { t: 'Два — «если бы… то… бы»', i: '«Если бы пошёл дождь, я бы остался дома»', go: 'unreal' }
    ]
  },
  real: {
    q: 'Это работает всегда — или речь про один случай в будущем?',
    opts: [
      { t: 'Работает всегда', i: 'закон природы, инструкция, привычка', res: 'zero' },
      { t: 'Один случай в будущем', i: 'может произойти, а может и нет', res: 'first' }
    ]
  },
  unreal: {
    q: 'Про какое время речь?',
    opts: [
      { t: 'Про сейчас', i: '«если бы у меня были деньги» — сейчас их нет', res: 'second' },
      { t: 'Про тогда, в прошлом', i: '«если бы я знал» — тогда не знал, поезд ушёл', res: 'third' },
      { t: 'Условие тогда, а результат сейчас', i: '«если бы выучился, был бы врачом сейчас»', res: 'mixed' }
    ]
  }
};

const detQ = document.getElementById('detQ');
const detOpts = document.getElementById('detOpts');
const detOut = document.getElementById('detOut');
const detCrumbs = document.getElementById('detCrumbs');
let detPath = [];

function detStep(key) {
  const node = DET[key];
  detQ.textContent = node.q;
  detOpts.innerHTML = node.opts.map((o, k) =>
    `<button data-k="${k}" data-node="${key}">${o.t}<i>${o.i}</i></button>`).join('');
  detCrumbs.innerHTML = detPath.map(p => `<span>${p}</span>`).join('') +
    (detPath.length ? '<span data-reset style="cursor:pointer">↺ заново</span>' : '');
}

function detResult(id) {
  const c = C.find(x => x.id === id);
  detOut.parentElement.parentElement.className = 'det z-' + c.zone;
  detQ.textContent = 'Готово — вот ваш тип.';
  detOpts.innerHTML = '<button data-reset>Определить ещё раз<i>вернуться к первому вопросу</i></button>';
  detOut.innerHTML = `
    <div class="eyebrow">${c.short} тип</div>
    <h4>${c.name}</h4>
    <code>${c.core}</code>
    <p>${c.thesis}.</p>
    <p style="font-family:var(--f-mono);font-size:.82rem;color:var(--text-dim)">${c.mxEx}</p>
    <a href="#${c.id}">Разобрать подробно →</a>`;
  detCrumbs.innerHTML = detPath.map(p => `<span>${p}</span>`).join('') +
    '<span data-reset style="cursor:pointer">↺ заново</span>';
}

function detReset() {
  detPath = [];
  detOut.parentElement.parentElement.className = 'det z-present';
  detOut.innerHTML = `<div class="eyebrow">Результат</div>
    <h4 style="color:var(--text-mute)">Ответьте на вопрос слева</h4>
    <p>Определитель повторяет ту же логику, что и три шага выше: сначала «бы», потом время.</p>`;
  detStep('start');
}

document.getElementById('detector').addEventListener('click', e => {
  const b = e.target.closest('button, [data-reset]');
  if (!b) return;
  if (b.hasAttribute('data-reset')) { detReset(); return; }
  const node = DET[b.dataset.node];
  if (!node) return;
  const o = node.opts[+b.dataset.k];
  detPath.push(o.t);
  if (o.res) detResult(o.res); else detStep(o.go);
});
detReset();

/* ═══════════════════════════════════════════════════════════
   НАВИГАЦИЯ: вкладки, оглавление, меню, точки, прогресс
   ═══════════════════════════════════════════════════════════ */
const TABDEF = {
  tenses: {
    panel: 'tab-tenses', toc: 'tToc', items: T, total: 12,
    nav: [
      { id: 't-algo', n: 'Что спрашивать у себя', s: 'Три вопроса вместо двенадцати правил', e: 'Старт' },
      { id: 't-system', n: 'Как это устроено', s: 'Время собирается из двух деталей', e: 'Уровень 0' },
      { id: 't-lvl1', n: 'Simple', s: 'Факты: было, есть, будет', e: 'Уровень 1' },
      { id: 't-lvl2', n: 'Continuous', s: 'Процессы в моменте', e: 'Уровень 2' },
      { id: 't-lvl3', n: 'Perfect', s: 'Результат к какому-то моменту', e: 'Уровень 3' },
      { id: 't-lvl4', n: 'Perfect Continuous', s: 'Процесс и его счётчик', e: 'Уровень 4' },
      { id: 't-duels', n: 'Сравнение времён', s: 'Пять пар, в которых путаются все', e: 'Разбор' },
      { id: 't-quiz', n: 'Общая проверка', s: '24 предложения вперемешку', e: 'Тренажёр' },
      { id: 't-sheet', n: 'Шпаргалка', s: 'Все двенадцать одной таблицей', e: 'Итог' }
    ]
  },
  cond: {
    panel: 'tab-cond', toc: 'cToc', items: C, total: 7,
    nav: [
      { id: 'c-algo', n: 'Что спрашивать у себя', s: 'Два вопроса и определитель типа', e: 'Старт' },
      { id: 'c-system', n: 'Механика шага назад', s: 'Часть с if всегда на время раньше', e: 'Основа' },
      { id: 'c-lvl1', n: 'Реальность', s: 'Zero и First — без «бы»', e: 'Уровень 1' },
      { id: 'c-lvl2', n: 'Воображение', s: 'Second и Third — два «бы»', e: 'Уровень 2' },
      { id: 'c-lvl3', n: 'Гибриды', s: 'Mixed, инверсия, I wish', e: 'Уровень 3' },
      { id: 'c-duels', n: 'Сравнение типов', s: 'Пять пар, в которых путаются все', e: 'Разбор' },
      { id: 'c-quiz', n: 'Общая проверка', s: '14 предложений на все типы', e: 'Тренажёр' },
      { id: 'c-sheet', n: 'Шпаргалка', s: 'Все типы одной таблицей', e: 'Итог' }
    ]
  }
};

let tab = 'tenses';

/* оглавление в начале вкладки */
Object.keys(TABDEF).forEach(k => {
  const d = TABDEF[k];
  document.getElementById(d.toc).innerHTML = d.nav.map(s =>
    `<a href="#${s.id}"><i>${s.e}</i><b>${s.n}</b><span>${s.s}</span></a>`).join('');
});

/* выпадающее меню разделов */
const menuBtn = document.getElementById('menuBtn');
const menuPop = document.getElementById('menuPop');
function fillMenu() {
  menuPop.innerHTML = TABDEF[tab].nav
    .map(s => `<a href="#${s.id}" role="menuitem"><i>${s.e}</i><span>${s.n}</span></a>`)
    .join('<div class="menu__sep" hidden></div>');
}
menuBtn.addEventListener('click', e => {
  e.stopPropagation();
  const open = menuPop.hidden;
  menuPop.hidden = !open;
  menuBtn.setAttribute('aria-expanded', String(open));
});
menuPop.addEventListener('click', e => {
  if (e.target.closest('a')) { menuPop.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); }
});
document.addEventListener('click', () => {
  if (!menuPop.hidden) { menuPop.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !menuPop.hidden) { menuPop.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.focus(); }
});

/* точки-станции в панели */
function fillDots() {
  const d = TABDEF[tab];
  const groups = {};
  d.items.forEach(x => { (groups[x.level] = groups[x.level] || []).push(x); });
  document.getElementById('dots').innerHTML = Object.keys(groups).map(lv =>
    `<span class="dots__grp">${groups[lv].map(x =>
      `<a class="z-${x.zone}" href="#${x.id}" data-dot="${x.id}" title="${x.name}" aria-label="${x.name}"></a>`).join('')}</span>`).join('');
}

/* переключение вкладок */
const tabsInk = document.getElementById('tabsInk');
const tabBtns = [...document.querySelectorAll('.tabs button')];
function moveInk() {
  const active = tabBtns.find(b => b.getAttribute('aria-selected') === 'true');
  if (!active) return;
  tabsInk.style.width = active.offsetWidth + 'px';
  tabsInk.style.transform = `translateX(${active.offsetLeft - 3}px)`;
}
function setTab(name, scroll) {
  tab = name;
  tabBtns.forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === name)));
  Object.keys(TABDEF).forEach(k => {
    document.getElementById(TABDEF[k].panel).hidden = (k !== name);
  });
  moveInk(); fillDots(); fillMenu(); paint();
  if (scroll !== false) window.scrollTo({ top: 0, behavior: motionOK() ? 'smooth' : 'auto' });
}
tabBtns.forEach(b => b.addEventListener('click', () => setTab(b.dataset.tab)));
window.addEventListener('resize', moveInk);

function motionOK() { return !window.matchMedia('(prefers-reduced-motion: reduce)').matches; }

/* прогресс «изучено» — свой для каждой вкладки */
const KEY = 'eng-rules-done-v2';
let done = new Set();
try { done = new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch (e) { done = new Set(); }

function paint() {
  const all = T.concat(C);
  all.forEach(x => {
    const on = done.has(x.id);
    const st = document.getElementById(x.id);
    if (st) {
      st.classList.toggle('done', on);
      const btn = st.querySelector('.mark-btn');
      if (btn) { btn.textContent = on ? 'изучено' : 'отметить'; btn.setAttribute('aria-pressed', String(on)); }
    }
    const dot = document.querySelector(`[data-dot="${x.id}"]`);
    if (dot) dot.classList.toggle('on', on);
  });
  document.querySelectorAll('.mx-c').forEach(c => c.classList.toggle('done', done.has(c.dataset.id)));

  const d = TABDEF[tab];
  const n = d.items.filter(x => done.has(x.id)).length;
  document.getElementById('progFill').style.width = (n / d.total * 100) + '%';
  document.getElementById('progN').textContent = `${n}/${d.total}`;
}

document.addEventListener('click', e => {
  const b = e.target.closest('[data-mark]');
  if (!b) return;
  const id = b.dataset.mark;
  done.has(id) ? done.delete(id) : done.add(id);
  try { localStorage.setItem(KEY, JSON.stringify([...done])); } catch (err) {}
  paint();
});

/* кнопка «вернуться в начало» */
const toTop = document.getElementById('totop');
let ticking = false;
function syncToTop() { toTop.classList.toggle('on', window.scrollY > 520); }
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { syncToTop(); ticking = false; });
}, { passive: true });
syncToTop();   // страница могла открыться уже прокрученной — по ссылке с якорем
toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: motionOK() ? 'smooth' : 'auto' });
});

/* тема */
const TKEY = 'eng-rules-theme';
try {
  const saved = localStorage.getItem(TKEY);
  if (saved) document.documentElement.setAttribute('data-theme', saved);
} catch (e) {}
document.getElementById('tgl').addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const isDark = cur ? cur === 'dark' : !window.matchMedia('(prefers-color-scheme: light)').matches;
  const next = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem(TKEY, next); } catch (err) {}
});

/* ссылка вида #third должна открыть нужную вкладку */
function tabForHash(h) {
  const id = h.replace('#', '');
  if (!id) return null;
  if (C.some(c => c.id === id) || id.indexOf('c-') === 0) return 'cond';
  if (T.some(t => t.id === id) || id.indexOf('t-') === 0) return 'tenses';
  return null;
}
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const want = tabForHash(a.getAttribute('href'));
  if (want && want !== tab) setTab(want, false);
});

setTab(tabForHash(location.hash) || 'tenses', false);
requestAnimationFrame(moveInk);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInk);
if (location.hash) {
  const target = document.getElementById(location.hash.slice(1));
  if (target) requestAnimationFrame(() => { target.scrollIntoView(); syncToTop(); });
}
