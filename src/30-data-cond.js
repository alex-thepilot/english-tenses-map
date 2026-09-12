/* ═══════════════════════════════════════════════════════════
   УСЛОВНЫЕ ПРЕДЛОЖЕНИЯ · графика
   Цвет кодирует реальность: бирюза — реально, перивинкл —
   воображаемое настоящее, охра — воображаемое прошлое.
   ═══════════════════════════════════════════════════════════ */
const CF = { W: 500, H: 168 };

/* одна строка «если → то» с пилюлей «о чём речь» и шагом назад */
function condFig(o) {
  const pillW = Math.max(150, o.about.length * 7.4 + 34);
  const step = o.step
    ? `<path class="ln-z" style="stroke:var(--zone)" d="M 46 40 V 56" marker-end="url(#cah)"/>
       <text class="cf-step" x="58" y="53">${o.step}</text>`
    : `<text class="cf-step" x="22" y="53">${o.nostep || ''}</text>`;
  return `<svg viewBox="0 0 ${CF.W} ${CF.H}" role="img" aria-label="Схема: ${o.about}, если ${o.ifPart}, то ${o.mainPart}">
    <rect x="20" y="10" width="${pillW}" height="26" rx="13" style="fill:var(--zone-soft);stroke:var(--zone);stroke-width:1.4"/>
    <text class="cf-pill" x="${20 + pillW / 2}" y="27" text-anchor="middle">${o.about}</text>
    ${step}
    <rect class="cf-box" x="20" y="58" width="206" height="54" rx="12"/>
    <text class="cf-lbl" x="32" y="76">IF</text>
    <text class="cf-form" x="123" y="97" text-anchor="middle">${o.ifPart}</text>
    <path class="ln-z" style="stroke:var(--zone)" d="M 228 85 H 262" marker-end="url(#cah)"/>
    <text class="cf-step" x="245" y="77" text-anchor="middle">то</text>
    <rect class="cf-box" x="274" y="58" width="206" height="54" rx="12"/>
    <text class="cf-lbl" x="286" y="76">ГЛАВНАЯ ЧАСТЬ</text>
    <text class="cf-form" x="377" y="97" text-anchor="middle">${o.mainPart}</text>
    <text class="cf-ex" x="250" y="140" text-anchor="middle">${o.ex}</text>
    <defs><marker id="cah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  </svg>`;
}

/* смешанный тип: две половины из разных времён */
function mixedFig() {
  return `<svg viewBox="0 0 500 196" role="img" aria-label="Смешанный тип: условие в прошлом, результат в настоящем, и обратный вариант">
    <text class="cf-lbl" x="20" y="18">ВАРИАНТ 1 · ПРОШЛОЕ ⟶ НАСТОЯЩЕЕ</text>
    <rect class="cf-box" x="20" y="26" width="206" height="44" rx="11"/>
    <text class="cf-form" x="123" y="54" text-anchor="middle">if + had + V3</text>
    <path class="ln-z" style="stroke:var(--zone)" d="M 228 48 H 262" marker-end="url(#cah2)"/>
    <rect class="cf-box" x="274" y="26" width="206" height="44" rx="11"/>
    <text class="cf-form" x="377" y="54" text-anchor="middle">would + V</text>
    <text class="cf-ex" x="20" y="88">If I had studied medicine, I would be a doctor now.</text>

    <line x1="20" y1="104" x2="480" y2="104" style="stroke:var(--line)"/>

    <text class="cf-lbl" x="20" y="126">ВАРИАНТ 2 · НАСТОЯЩЕЕ ⟶ ПРОШЛОЕ</text>
    <rect class="cf-box" x="20" y="134" width="206" height="44" rx="11"/>
    <text class="cf-form" x="123" y="162" text-anchor="middle">if + V2</text>
    <path class="ln-z" style="stroke:var(--zone)" d="M 228 156 H 262" marker-end="url(#cah2)"/>
    <rect class="cf-box" x="274" y="134" width="206" height="44" rx="11"/>
    <text class="cf-form" x="377" y="162" text-anchor="middle">would have + V3</text>
    <defs><marker id="cah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  </svg>`;
}

const CDRAW = {
  'zero': () => condFig({ about: 'ВСЕГДА, БЕЗ ИСКЛЮЧЕНИЙ', nostep: 'шага назад нет — обе части в настоящем',
    ifPart: 'if + Present Simple', mainPart: 'Present Simple', ex: 'If you heat water, it boils.' }),
  'first': () => condFig({ about: 'ГОВОРИМ ПРО БУДУЩЕЕ', step: 'шаг назад → настоящее',
    ifPart: 'if + Present Simple', mainPart: 'will + V', ex: 'If it rains, I will stay at home.' }),
  'second': () => condFig({ about: 'ГОВОРИМ ПРО НАСТОЯЩЕЕ', step: 'шаг назад → прошедшее',
    ifPart: 'if + Past Simple', mainPart: 'would + V', ex: 'If I had money, I would buy a house.' }),
  'third': () => condFig({ about: 'ГОВОРИМ ПРО ПРОШЕДШЕЕ', step: 'шаг назад → предпрошедшее',
    ifPart: 'if + had + V3', mainPart: 'would have + V3', ex: 'If I had known, I would have come.' }),
  'mixed': () => mixedFig(),
  'inversion': () => condFig({ about: 'IF УБИРАЕМ СОВСЕМ', nostep: 'вперёд выходит were / had / should',
    ifPart: 'Had + подлежащее + V3', mainPart: 'would have + V3', ex: 'Had I known, I would have helped.' }),
  'wish': () => condFig({ about: 'ЖАЛЬ, ЧТО…', step: 'тот же шаг назад',
    ifPart: 'wish + V2 / had + V3', mainPart: '— главной части нет', ex: 'I wish I had studied more.' })
};

/* ═══════════════════════════════════════════════════════════
   УСЛОВНЫЕ ПРЕДЛОЖЕНИЯ · станции
   ═══════════════════════════════════════════════════════════ */
const CLEVELS = [
  { n: 1, title: 'Реальность', code: 'без «бы»', ru: 'Это может случиться',
    txt: 'Первый этаж — условия, которые могут сработать по-настоящему. В русском переводе тут <b>ни одного «бы»</b>: «если пойдёт дождь», «если нагреть воду». Два типа, и они закрывают большую часть бытовой речи.' },
  { n: 2, title: 'Воображение', code: '«если бы … то … бы»', ru: 'Этого не было и не будет',
    txt: 'Второй этаж — то, чего нет. В русском появляются <b>два «бы»</b>, и это самый надёжный сигнал. Остаётся один вопрос: мы фантазируем про сейчас или жалеем о том, что было тогда.' },
  { n: 3, title: 'Гибриды', code: 'половинки из разных типов', ru: 'Когда времена не совпадают',
    txt: 'Верхний этаж. Ничего нового учить не нужно — здесь те же детали, просто собранные крест-накрест. Плюс два родственника условных: инверсия без <span class="mono">if</span> и конструкция <span class="mono">I wish</span>.' }
];

const C = [
{
  id: 'zero', zone: 'real', level: 1, idx: 1,
  name: 'Zero Conditional', core: 'if + Present, Present',
  thesis: 'Не условие, а закон',
  short: 'Нулевой',
  mxEx: 'If you heat water, it boils.',
  figCap: 'Единственный тип без шага назад: обе половины стоят в настоящем, потому что речь не про случай, а про правило.',
  lead: 'Единственный тип, где нет и намёка на «если бы». Здесь <b>if можно заменить на when</b>, и смысл не изменится. Речь про то, что срабатывает каждый раз.',
  blocks: [
    { kind: 'key', h: 'Проверка одной подстановкой',
      p: 'Подставьте «когда» вместо «если». Если фраза не испортилась — это Zero.<br><span class="mono">If you heat ice, it melts.</span> = <span class="mono">When you heat ice, it melts.</span><br>А вот «Если пойдёт дождь, я останусь дома» с «когда» уже звучит странно — значит, это не Zero.' },
    { kind: 'plain', h: 'Где живёт',
      p: 'Законы природы, инструкции, правила, личные закономерности. <span class="mono">If you press this button, the machine stops.</span> · <span class="mono">If I drink coffee at night, I don\'t sleep.</span>' },
    { kind: 'trap', h: 'Ловушка: will сюда не ставят вообще',
      p: 'Ни в одну из частей. Результат не «случится однажды» — он случается всегда.<br><span class="mono no">If you heat water, it will boil</span> (в значении закона) → <span class="mono yes">If you heat water, it boils</span>' }
  ],
  forms: { p: 'If you heat water, it <b>boils</b>.', n: 'If you don\'t water plants, they <b>die</b>.', q: 'What <b>happens</b> if you mix them?' },
  markers: ['always', 'every time', 'when (= if)', 'usually', 'normally'],
  ex: [
    { en: 'If you <i class="v">heat</i> water to 100 °C, it <i class="v">boils</i>.', ru: 'Если нагреть воду до ста градусов, она кипит.', nb: 'закон природы — ни одного «бы»' },
    { en: 'If I <i class="v">don\'t sleep</i> enough, I <i class="v">get</i> headaches.', ru: 'Если я не высыпаюсь, у меня болит голова.', nb: 'личная закономерность' },
    { en: 'If you <i class="v">press</i> this button, the machine <i class="v">stops</i>.', ru: 'Если нажать эту кнопку, машина остановится.', nb: 'инструкция' }
  ]
},
{
  id: 'first', zone: 'real', level: 1, idx: 2,
  name: 'First Conditional', core: 'if + Present, will + V',
  thesis: 'Реально — и это про будущее',
  short: 'Первый',
  mxEx: "If it rains, I'll stay at home.",
  figCap: 'Первая ступень лестницы: говорим про будущее, а в условие ставим настоящее время.',
  lead: 'Реальное условие: это может произойти на самом деле. В русском переводе здесь <b>ни одного «бы»</b> — «Если пойдёт дождь, я останусь дома».',
  blocks: [
    { kind: 'key', h: 'Шаг назад в действии',
      p: 'Говорим про <b>будущее</b> — а в if-части ставим <b>настоящее</b>. Это первая ступень той самой лестницы: условие всегда отстаёт от результата на один шаг.' },
    { kind: 'trap', h: 'Ловушка номер один во всём английском',
      p: 'После <span class="mono">if</span> никогда не ставят <span class="mono">will</span>.<br><span class="mono no">If it will rain, I\'ll stay home</span> → <span class="mono yes">If it <b>rains</b>, I\'ll stay home</span><br>То же самое после <span class="mono">when, as soon as, until, before, after</span>: <span class="mono yes">I\'ll call you as soon as I <b>arrive</b></span>.' },
    { kind: 'plain', h: 'Чем можно заменить will',
      p: 'Во второй части вместо <span class="mono">will</span> легко встают <span class="mono">can, may, might, should, must</span> и даже повелительное наклонение.<br><span class="mono">If it rains, we <b>can</b> stay in.</span> · <span class="mono">If you see him, <b>tell</b> him to call me.</span>' },
    { kind: 'plain', h: 'Unless = if not',
      p: '<span class="mono">Unless you hurry, you\'ll miss it.</span> = <span class="mono">If you don\'t hurry, you\'ll miss it.</span> Обратите внимание: после unless отрицание уже не нужно — оно внутри самого слова.' }
  ],
  forms: { p: 'If it <b>rains</b>, I <b>\'ll stay</b> home.', n: 'If he <b>doesn\'t come</b>, we <b>\'ll start</b> without him.', q: 'What <b>will</b> you <b>do</b> if she says no?' },
  markers: ['if', 'unless', 'as soon as', 'when', 'in case', 'provided that', 'will / can / may'],
  ex: [
    { en: 'If it <i class="v">rains</i>, I <i class="v">\'ll stay</i> at home.', ru: 'Если пойдёт дождь, я останусь дома.', nb: 'ни одного «бы» — значит, реальность' },
    { en: 'If you <i class="v">don\'t hurry</i>, you <i class="v">\'ll miss</i> the train.', ru: 'Если не поторопишься, опоздаешь на поезд.' },
    { en: 'I <i class="v">\'ll call</i> you as soon as I <i class="v">arrive</i>.', ru: 'Я позвоню, как только приеду.', nb: 'после as soon as тоже без will' },
    { en: 'If you <i class="v">see</i> Tom, <i class="v">tell</i> him I\'m waiting.', ru: 'Если увидишь Тома, скажи ему, что я жду.', nb: 'вместо will — повелительное' }
  ]
},
{
  id: 'second', zone: 'unreal', level: 2, idx: 3,
  name: 'Second Conditional', core: 'if + V2, would + V',
  thesis: 'Два «бы» — и речь про сейчас',
  short: 'Второй',
  mxEx: 'If I had money, I would buy a house.',
  figCap: 'Вторая ступень: говорим про настоящее, а в условие ставим прошедшее. Прошедшее время тут не про прошлое, а про «понарошку».',
  lead: 'Нереальное или маловероятное условие, относящееся к <b>настоящему или будущему</b>. В русском здесь два «бы»: «Если бы у меня <b>были</b> деньги, я <b>бы купил</b> машину».',
  blocks: [
    { kind: 'key', h: 'Детектор двух «бы»',
      p: 'Как только в русском переводе появляется «если <b>бы</b> … то … <b>бы</b>» — это точно второй или третий тип. Первый и нулевой отпадают сразу. Остаётся один вопрос: речь про сейчас или про тогда.' },
    { kind: 'plain', h: 'Шаг назад',
      p: 'Говорим про <b>настоящее</b> — а в if-части ставим <b>прошедшее</b>. Вторая ступень лестницы. Прошедшее время здесь работает не как прошлое, а как метка «это выдумка».' },
    { kind: 'plain', h: 'Почему were, а не was',
      p: 'В нереальном условии для всех лиц традиционно идёт <span class="mono">were</span>: <span class="mono">If I <b>were</b> you…</span>, <span class="mono">If he <b>were</b> here…</span> В разговорной речи слышно и <span class="mono">was</span>, но <span class="mono">were</span> — беспроигрышный вариант, а в обороте <span class="mono">If I were you</span> он обязателен.' },
    { kind: 'plain', h: 'Самый частый способ дать совет',
      p: '<span class="mono">If I were you, I would…</span> — по-русски это «на твоём месте я бы…». Запомните оборот целиком, он пригодится чаще всего остального в этой теме.' },
    { kind: 'trap', h: 'Ловушка: would за if не заходит',
      p: 'Правило то же, что и с <span class="mono">will</span>.<br><span class="mono no">If I would have money…</span> → <span class="mono yes">If I <b>had</b> money…</span>' }
  ],
  forms: { p: 'If I <b>had</b> time, I <b>would help</b>.', n: 'If I <b>didn\'t work</b> here, I <b>wouldn\'t know</b>.', q: 'What <b>would</b> you <b>do</b> if you won?' },
  markers: ['if I were you', 'would', 'could', 'might', 'imagine', 'suppose'],
  ex: [
    { en: 'If I <i class="v">had</i> more money, I <i class="v">would buy</i> a house.', ru: 'Если бы у меня было больше денег, я бы купил дом.', nb: 'два «бы» — и всё это про сейчас' },
    { en: 'If I <i class="v">were</i> you, I <i class="v">\'d apologise</i>.', ru: 'На твоём месте я бы извинился.', nb: 'совет' },
    { en: 'What <i class="v">would</i> you <i class="v">do</i> if you <i class="v">won</i> the lottery?', ru: 'Что бы ты сделал, если бы выиграл в лотерею?' },
    { en: 'If he <i class="v">studied</i> harder, he <i class="v">would pass</i>.', ru: 'Если бы он больше занимался, он бы сдал.', nb: 'он плохо учится сейчас — поэтому и не сдаёт' }
  ]
},
{
  id: 'third', zone: 'pastc', level: 2, idx: 4,
  name: 'Third Conditional', core: 'if + had + V3, would have + V3',
  thesis: 'Два «бы» — но поезд ушёл',
  short: 'Третий',
  mxEx: 'If I had known, I would have come.',
  figCap: 'Третья ступень, дальше опускаться некуда: говорим про прошедшее, а в условие ставим предпрошедшее.',
  lead: 'Нереальное условие <b>в прошлом</b>. Изменить уже ничего нельзя — это разговор о том, чего не случилось. В русском тут те же два «бы», что и во втором типе, поэтому различить их можно только по смыслу.',
  blocks: [
    { kind: 'key', h: 'Как отличить от второго типа',
      p: 'Спросите себя: про какое время речь?<br>«Если бы у меня были деньги <b>(сейчас)</b>, я бы купил» — <b>второй</b>.<br>«Если бы у меня были деньги <b>(тогда)</b>, я бы купил» — <b>третий</b>.<br>Русский эти два случая не разводит вообще. Английский обязан, и подсказку приходится брать из контекста.' },
    { kind: 'plain', h: 'Шаг назад',
      p: 'Говорим про <b>прошедшее</b> — а в if-части ставим <b>предпрошедшее</b>. Третья ступень лестницы, ниже уже нечего.' },
    { kind: 'plain', h: 'Как это звучит по-человечески',
      p: 'Этот тип почти всегда означает «эх, надо было» или «вот если бы ты тогда…». Сожаление или мягкий упрёк: <span class="mono">If you had told me, I would have helped.</span>' },
    { kind: 'trap', h: 'Ловушка: would have после if',
      p: '<span class="mono no">If I would have known…</span> → <span class="mono yes">If I <b>had</b> known…</span><br>Это самая частая ошибка в третьем типе. Would никогда не заходит за <span class="mono">if</span> — ни в каком виде.' }
  ],
  forms: { p: 'If I <b>had known</b>, I <b>would have come</b>.', n: 'If she <b>hadn\'t helped</b>, we <b>wouldn\'t have finished</b>.', q: 'What <b>would</b> you <b>have done</b>?' },
  markers: ['would have', 'could have', 'might have', 'if only', '«надо было»'],
  ex: [
    { en: 'If I <i class="v">had known</i>, I <i class="v">would have come</i> earlier.', ru: 'Если бы я знал, я бы приехал раньше.', nb: 'тогда — и уже ничего не изменить' },
    { en: 'If you <i class="v">had told</i> me, I <i class="v">could have helped</i>.', ru: 'Если бы ты сказал, я бы мог помочь.', nb: 'мягкий упрёк' },
    { en: 'She <i class="v">wouldn\'t have missed</i> the flight if she <i class="v">had left</i> earlier.', ru: 'Она бы не опоздала на рейс, если бы выехала раньше.' }
  ]
},
{
  id: 'mixed', zone: 'pastc', level: 3, idx: 5,
  name: 'Mixed Conditionals', core: 'половинки из разных типов',
  thesis: 'Условие и результат в разных временах',
  short: 'Смешанный',
  mxEx: 'If I had studied medicine, I would be a doctor now.',
  figCap: 'Смешанный тип не добавляет новых деталей: он берёт if-часть от одного типа, а главную — от другого.',
  lead: 'Смешанный тип появляется, когда <b>условие и результат живут в разных временах</b>. Чаще всего ошибка была в прошлом, а расплачиваемся мы за неё прямо сейчас.',
  blocks: [
    { kind: 'key', h: 'Вариант 1 · прошлое → настоящее',
      p: '<span class="mono">If I <b>had studied</b> medicine, I <b>would be</b> a doctor now.</span><br>Условие в прошлом (не выучился), результат в настоящем (не врач). Формула: <span class="mono">if + had + V3, would + V</span>.<br>Слово <span class="mono">now</span> в конце почти всегда выдаёт именно этот вариант.' },
    { kind: 'plain', h: 'Вариант 2 · настоящее → прошлое',
      p: '<span class="mono">If I <b>weren\'t</b> so shy, I <b>would have asked</b> her out.</span><br>Постоянное свойство (стеснительный вообще), последствие в прошлом (не позвал). Формула: <span class="mono">if + V2, would have + V3</span>.' },
    { kind: 'plain', h: 'Как распознать',
      p: 'Посмотрите на каждую половину по отдельности и определите, к какому времени она относится. Если времена не совпали — перед вами смешанный тип. Никакой отдельной формулы запоминать не нужно.' }
  ],
  forms: { p: 'If I <b>had saved</b>, I <b>would be</b> rich now.', n: 'If he <b>hadn\'t lied</b>, we <b>wouldn\'t be</b> in this mess.', q: '<b>Would</b> you <b>be</b> here if you <b>had taken</b> that job?' },
  markers: ['now', 'today', 'still', '«до сих пор»', '«тогда → сейчас»'],
  ex: [
    { en: 'If I <i class="v">had studied</i> medicine, I <i class="v">would be</i> a doctor now.', ru: 'Если бы я выучился на врача, я бы сейчас им работал.', nb: 'прошлое → настоящее' },
    { en: 'If he <i class="v">had taken</i> that job, he <i class="v">would be living</i> in Berlin.', ru: 'Если бы он согласился на ту работу, он бы сейчас жил в Берлине.' },
    { en: 'If I <i class="v">weren\'t</i> afraid of flying, I <i class="v">would have gone</i> with you.', ru: 'Если бы я не боялся летать, я бы поехал с вами.', nb: 'настоящее → прошлое' }
  ]
},
{
  id: 'inversion', zone: 'unreal', level: 3, idx: 6,
  name: 'Инверсия без if', core: 'Were / Had / Should + подлежащее',
  thesis: 'Убираем if — поднимаем глагол',
  short: 'Инверсия',
  mxEx: 'Had I known, I would have helped.',
  figCap: 'Союз if исчезает, а его работу берёт на себя вспомогательный глагол, вышедший вперёд.',
  lead: 'В книжной и деловой речи <span class="mono">if</span> можно выбросить совсем, а вспомогательный глагол поставить вперёд. Смысл тот же, звучание — строже.',
  blocks: [
    { kind: 'key', h: 'Три рабочие формулы',
      p: '<span class="mono">If I <b>were</b> you</span> → <span class="mono"><b>Were</b> I you</span><br><span class="mono">If I <b>had</b> known</span> → <span class="mono"><b>Had</b> I known</span><br><span class="mono">If you <b>should</b> need help</span> → <span class="mono"><b>Should</b> you need help</span>' },
    { kind: 'trap', h: 'Ловушка: инвертируются только три глагола',
      p: 'Вперёд выходят только <span class="mono">were</span>, <span class="mono">had</span> и <span class="mono">should</span>. С обычными глаголами так не делают:<br><span class="mono no">Studied he harder, he would pass</span> — такого в английском нет.' },
    { kind: 'plain', h: 'В отрицании не сокращают',
      p: '<span class="mono yes">Had I not known…</span>, а не <span class="mono no">Hadn\'t I known…</span> Сокращённая форма в инверсии превратила бы фразу в вопрос.' },
    { kind: 'plain', h: 'Где встретится',
      p: 'Договоры, деловая переписка, литература. <span class="mono">Should you have any questions, please contact us.</span> — стандартная концовка делового письма, которую стоит просто узнавать в лицо.' }
  ],
  forms: { p: '<b>Had</b> I known, I would have helped.', n: '<b>Had</b> I <b>not</b> seen it myself…', q: '<i>инверсия сама по себе не вопрос</i>' },
  markers: ['Were I…', 'Had I…', 'Should you…', 'формальный стиль'],
  ex: [
    { en: '<i class="v">Were</i> I you, I would accept the offer.', ru: 'На вашем месте я бы согласился на предложение.', nb: '= If I were you' },
    { en: '<i class="v">Had</i> we left earlier, we would have caught the train.', ru: 'Если бы мы выехали раньше, мы бы успели на поезд.', nb: '= If we had left' },
    { en: '<i class="v">Should</i> you need assistance, call this number.', ru: 'Если вам понадобится помощь, позвоните по этому номеру.', nb: 'деловой стандарт' }
  ]
},
{
  id: 'wish', zone: 'pastc', level: 3, idx: 7,
  name: 'I wish / If only', core: 'wish + V2 / had + V3',
  thesis: 'Тот же шаг назад, только без if',
  short: 'I wish',
  mxEx: 'I wish I had studied more.',
  figCap: 'Механика та же, что в условных: сожаление о настоящем опускается в прошедшее, сожаление о прошлом — в предпрошедшее.',
  lead: 'Ближайший родственник второго и третьего типов: та же механика шага назад, только вместо <span class="mono">if</span> стоит <span class="mono">I wish</span> или <span class="mono">If only</span>. По-русски это «жаль, что…» или «вот бы…».',
  blocks: [
    { kind: 'key', h: 'Две ступени — ровно как в условных',
      p: 'Сожаление о <b>настоящем</b> → прошедшее время:<br><span class="mono">I wish I <b>had</b> more time.</span> — Жаль, что у меня мало времени <i>сейчас</i>.<br><br>Сожаление о <b>прошлом</b> → предпрошедшее:<br><span class="mono">I wish I <b>had studied</b> more.</span> — Жаль, что я мало учился <i>тогда</i>.' },
    { kind: 'trap', h: 'Ловушка перевода: отрицание переворачивается',
      p: 'Русское «жаль, что <b>не</b>» превращается в английское утверждение — частицу «не» съедает само слово <span class="mono">wish</span>.<br>«Жаль, что я <b>не</b> знаю» → <span class="mono yes">I wish I <b>knew</b></span> (без not)<br>«Жаль, что здесь <b>так</b> холодно» → <span class="mono yes">I wish it <b>weren\'t</b> so cold</span>' },
    { kind: 'plain', h: 'Раздражение чужим поведением → would',
      p: '<span class="mono">I wish he <b>would</b> stop interrupting.</span> — про то, что делает кто-то другой и что хочется прекратить. Про себя так не говорят: <span class="mono no">I wish I would…</span>' },
    { kind: 'plain', h: 'If only — то же самое, но громче',
      p: '<span class="mono">If only we had left earlier!</span> Смысл тот же, эмоции сильнее. Часто идёт с восклицательным знаком и без второй части.' }
  ],
  forms: { p: 'I <b>wish</b> I <b>knew</b> the answer.', n: 'I <b>wish</b> it <b>weren\'t</b> so cold.', q: '<b>Don\'t</b> you <b>wish</b> you <b>had gone</b>?' },
  markers: ['I wish', 'If only', '«жаль, что»', '«вот бы»', 'would (о чужом)'],
  ex: [
    { en: 'I wish I <i class="v">knew</i> the answer.', ru: 'Жаль, что я не знаю ответа.', nb: 'про сейчас — и «не» по-английски исчезает' },
    { en: 'I wish I <i class="v">had studied</i> more.', ru: 'Жаль, что я мало учился.', nb: 'про тогда' },
    { en: 'I wish he <i class="v">would stop</i> interrupting.', ru: 'Вот бы он перестал перебивать.', nb: 'раздражение чужим поведением' },
    { en: 'If only we <i class="v">had left</i> earlier!', ru: 'Вот если бы мы выехали раньше!' }
  ]
}
];

/* ═══════════════ ДУЭЛИ · УСЛОВНЫЕ ═══════════════ */
const CDUELS = [
  {
    q: 'First или Second? — считаем «бы»',
    a: { z: 'real', n: 'First · реально', en: 'If it <i class="v">rains</i>, I <i class="v">\'ll stay</i> home.', ru: 'Если пойдёт дождь, я останусь дома.', why: 'Ни одного «бы». Дождь вполне может пойти — это реальный прогноз на будущее.' },
    b: { z: 'unreal', n: 'Second · воображение', en: 'If it <i class="v">rained</i>, I <i class="v">would stay</i> home.', ru: 'Если бы шёл дождь, я бы остался дома.', why: 'Два «бы». Дождя нет и не ожидается — мы просто фантазируем.' },
    r: 'Посчитайте «бы» в русском переводе. Ноль — первый тип. Два — второй или третий.'
  },
  {
    q: 'Second или Third? — спрашиваем «когда»',
    a: { z: 'unreal', n: 'Second · если бы сейчас', en: 'If I <i class="v">had</i> money, I <i class="v">would buy</i> it.', ru: 'Если бы у меня были деньги, я бы это купил.', why: 'Денег нет прямо сейчас. Ситуацию теоретически ещё можно изменить.' },
    b: { z: 'pastc', n: 'Third · если бы тогда', en: 'If I <i class="v">had had</i> money, I <i class="v">would have bought</i> it.', ru: 'Если бы у меня были деньги, я бы это купил.', why: 'Денег не было тогда, и вещь уже не куплена. Изменить нельзя ничего.' },
    r: 'Русский перевод у обоих одинаковый — вот почему это самая коварная пара. Разводить их приходится по смыслу: речь про сейчас или про тогда.'
  },
  {
    q: 'Third или Mixed? — куда смотрит результат',
    a: { z: 'pastc', n: 'Third · результат в прошлом', en: 'If I <i class="v">had studied</i>, I <i class="v">would have passed</i>.', ru: 'Если бы я учился, я бы сдал.', why: 'Обе половины про прошлое: не учился тогда — не сдал тогда.' },
    b: { z: 'pastc', n: 'Mixed · результат сейчас', en: 'If I <i class="v">had studied</i>, I <i class="v">would be</i> a doctor now.', ru: 'Если бы я учился, я бы сейчас был врачом.', why: 'Условие в прошлом, а результат в настоящем. Слово now выдаёт смешанный тип.' },
    r: 'Проверьте половины по отдельности. Обе про прошлое — третий тип. Разошлись по временам — смешанный.'
  },
  {
    q: 'if или when? — насколько это точно',
    a: { z: 'real', n: 'if · может быть', en: '<i class="v">If</i> I finish early, I\'ll call you.', ru: 'Если закончу рано, позвоню.', why: 'Не факт, что закончу рано. Условие под вопросом.' },
    b: { z: 'real', n: 'when · точно будет', en: '<i class="v">When</i> I finish, I\'ll call you.', ru: 'Когда закончу, позвоню.', why: 'Закончу обязательно, вопрос только в том, во сколько.' },
    r: 'if — событие под вопросом, when — событие точно произойдёт. Но правило «никакого will после них» одинаково для обоих.'
  },
  {
    q: 'I wish + прошедшее или предпрошедшее?',
    a: { z: 'unreal', n: 'wish + V2 · про сейчас', en: 'I wish I <i class="v">spoke</i> French.', ru: 'Жаль, что я не говорю по-французски.', why: 'Не говорю прямо сейчас. Один шаг назад — как во втором типе.' },
    b: { z: 'pastc', n: 'wish + had + V3 · про тогда', en: 'I wish I <i class="v">had learnt</i> French.', ru: 'Жаль, что я не выучил французский.', why: 'Не выучил тогда, в прошлом. Два шага назад — как в третьем типе.' },
    r: 'Та же лестница, что и в условных: сожаление о настоящем опускается на один шаг, о прошлом — на два.'
  }
];
