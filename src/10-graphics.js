/* ═══════════════════════════════════════════════════════════
   ГРАФИКА ТАЙМЛАЙНА
   Одна ось на все двенадцать времён. Цвет = когда, форма = как.
   ═══════════════════════════════════════════════════════════ */
/* Строгие горизонтальные полосы, чтобы подписи не наезжали друг на друга:
   24 — засечки · 36 — подписи дуг · 52 — подписи над осью
   92 — ось · 126 — подписи под осью · 152 — прошлое/сейчас/будущее      */
const AX = { y: 92, x0: 26, x1: 474, now: 250, W: 500, H: 172,
             rTick: 24, rArc: 36, rUp: 52, rDown: 126, rCap: 152 };

function wavePath(x1, x2, y, amp = 8, per = 24) {
  let d = `M ${x1} ${y}`;
  for (let x = x1; x < x2; x += per) d += ` q ${per/4} ${-amp} ${per/2} 0 q ${per/4} ${amp} ${per/2} 0`;
  return d;
}

const txt = (x, y, s, cls, style) =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="middle"${style ? ` style="${style}"` : ''}>${s}</text>`;
const zfill = 'fill:var(--zone)';

const G = {
  axis() {
    return `
      <line class="ax" x1="${AX.x0}" y1="${AX.y}" x2="${AX.x1}" y2="${AX.y}"/>
      <path class="ax" d="M ${AX.x1-8} ${AX.y-4} L ${AX.x1} ${AX.y} L ${AX.x1-8} ${AX.y+4}" fill="none"/>
      <text class="ax-cap" x="${AX.x0}" y="${AX.rCap}">ПРОШЛОЕ</text>
      <text class="ax-cap" x="${AX.x1}" y="${AX.rCap}" text-anchor="end">БУДУЩЕЕ</text>`;
  },
  now(cap = 'СЕЙЧАС') {
    return `
      <line class="now-ln" x1="${AX.now}" y1="${AX.y-34}" x2="${AX.now}" y2="${AX.y+14}"/>
      ${txt(AX.now, AX.rCap, cap, 'now-cap')}`;
  },
  dot(x, o = {}) {
    return `<circle class="m-dot" cx="${x}" cy="${AX.y}" r="${o.r || 7.5}" style="${zfill}"/>` +
      (o.label ? txt(x, AX.rUp, o.label, 'tl-lbl') : '');
  },
  ghost(x, o = {}) {
    return `<circle class="m-ghost" cx="${x}" cy="${AX.y}" r="7" style="stroke:var(--zone)"/>` +
      (o.label ? txt(x, AX.rDown, o.label, 'tl-lbl') : '');
  },
  wave(id, x1, x2, o = {}) {
    const clip = `cl-${id}`;
    return `
      <defs><clipPath id="${clip}"><rect x="${x1}" y="${AX.y-16}" width="${x2-x1}" height="32"/></clipPath></defs>
      <g clip-path="url(#${clip})">
        <path class="m-wave flow" style="stroke:var(--zone)" d="${wavePath(x1-26, x2+26, AX.y)}"/>
      </g>` +
      (o.label ? txt(o.at || (x1+x2)/2, o.below ? AX.rDown : AX.rUp, o.label, 'tl-lbl') : '');
  },
  arc(x1, x2, o = {}) {
    const top = AX.y - (o.h || 44);
    return `
      <path class="m-arc" style="stroke:var(--zone)" d="M ${x1} ${AX.y-13} Q ${(x1+x2)/2} ${top} ${x2} ${AX.y-19}"/>
      <polygon class="m-head" style="${zfill}" points="${x2-4.5},${AX.y-21} ${x2+4.5},${AX.y-21} ${x2},${AX.y-11}"/>` +
      (o.label ? txt((x1+x2)/2, AX.rArc, o.label, 'tl-lbl-z', zfill) : '');
  },
  span(x1, x2, label) {
    return `
      <path class="m-span" style="stroke:var(--zone)" d="M ${x1} ${AX.y+12} v 7 H ${x2} v -7"/>
      ${txt((x1+x2)/2, AX.rDown, label, 'tl-lbl-z', zfill)}`;
  },
  tick(x, label) {
    return `
      <line class="m-tick" style="stroke:var(--zone)" x1="${x}" y1="${AX.y-32}" x2="${x}" y2="${AX.y+10}"/>
      ${txt(x, AX.rTick, label, 'tl-lbl-z', zfill)}`;
  },
  glow(x) {
    return `<circle class="m-glow" cx="${x}" cy="${AX.y}" r="26" style="${zfill}"/>`;
  },
  flash(x, label) {
    return `
      <circle cx="${x}" cy="${AX.y}" r="10" style="fill:var(--bg-2)"/>
      <path style="${zfill}" d="M ${x} ${AX.y-11} L ${x+3.2} ${AX.y-3.2} L ${x+11} ${AX.y} L ${x+3.2} ${AX.y+3.2} L ${x} ${AX.y+11} L ${x-3.2} ${AX.y+3.2} L ${x-11} ${AX.y} L ${x-3.2} ${AX.y-3.2} Z"/>
      ${txt(x, AX.rArc, label, 'tl-lbl')}`;
  }
};

/* Рисунки для каждого времени: форма кодирует аспект */
const DRAW = {
  'present-simple': id => G.axis() + G.now() +
    [60,110,160,210,290,340,390,440].map(x => `<circle class="m-dot" cx="${x}" cy="${AX.y}" r="5" style="${zfill}"/>`).join('') +
    txt(250, AX.rDown, 'верно всегда — и вчера, и завтра', 'tl-lbl'),

  'past-simple': id => G.axis() + G.now() + G.tick(120, 'ВЧЕРА В 7') + G.dot(120) +
    txt(120, AX.rDown, 'адрес во времени назван', 'tl-lbl'),

  'future-simple': id => G.axis() + G.now() + G.tick(392, 'ЗАВТРА') + G.dot(392) +
    G.arc(256, 386, { h: 50, label: 'решил прямо сейчас' }),

  'present-continuous': id => G.axis() + G.now() + G.glow(250) +
    G.wave(id, 178, 322, { label: 'идёт прямо в этот момент' }),

  'past-continuous': id => G.axis() + G.now() + G.wave(id, 60, 210, { label: 'фон: длилось', below: true }) +
    G.flash(152, 'и тут — раз!'),

  'future-continuous': id => G.axis() + G.now() + G.tick(386, 'В 19:00 ЗАВТРА') +
    G.wave(id, 316, 456, { label: 'будет в процессе', below: true }),

  'present-perfect': id => G.axis() + G.now('РЕЗУЛЬТАТ ЗДЕСЬ') + G.glow(250) +
    G.ghost(120, { label: 'когда — неизвестно и неважно' }) + G.arc(120, 250, { h: 50 }) + G.dot(250, { r: 8 }),

  'past-perfect': id => G.axis() + G.now() + G.tick(184, 'ТОЧКА ОТСЧЁТА') + G.ghost(70) + G.dot(184) +
    G.arc(70, 184, { h: 50, label: 'сначала это' }) + txt(70, AX.rDown, 'раньше', 'tl-lbl'),

  'future-perfect': id => G.axis() + G.now() + G.tick(444, 'BY FRIDAY') + G.ghost(316) + G.dot(396) +
    G.arc(316, 396, { h: 50, label: 'успеть до' }),

  'present-perfect-continuous': id => G.axis() + G.now() + G.glow(250) +
    G.wave(id, 96, 252, { label: 'началось и всё ещё идёт', at: 174 }) + G.span(96, 250, 'FOR 5 YEARS'),

  'past-perfect-continuous': id => G.axis() + G.now() + G.tick(200, 'ПОКА НЕ ПРИШЛА') +
    G.wave(id, 60, 200, { label: 'шло и шло', at: 130 }) + G.dot(200) + G.span(60, 200, 'FOR AN HOUR'),

  'future-perfect-continuous': id => G.axis() + G.now() + G.tick(414, 'К ИЮНЮ') +
    G.wave(id, 262, 414, { label: 'будет идти', at: 338 }) + G.dot(414) + G.span(262, 414, 'FOR 10 YEARS')
};

function timeline(id, uid) {
  return `<svg viewBox="0 0 ${AX.W} ${AX.H}" role="img" aria-label="Схема ${id} на оси времени">${DRAW[id](uid || id)}</svg>`;
}
