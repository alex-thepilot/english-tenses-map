const CLOCK_LEVELS = [
  { n: 1, ru: 'Две половины', title: 'Минуты после или до часа', code: 'past · to',
    txt: 'Смотри на длинную стрелку. Справа считаем, сколько минут прошло. Слева — сколько осталось.' },
  { n: 2, ru: 'Особые отметки', title: 'Четверть, половина и ровный час', code: 'quarter · half · o’clock',
    txt: 'На отметках :00, :15, :30 и :45 есть свои короткие слова. Научимся узнавать их по циферблату.' }
];

const CLOCK_STATIONS = [
  {
    id: 'h-past', zone: 'present', level: 1, idx: 1, short: 'После часа', clock: [12, 20],
    name: 'Первая половина часа — past', core: '12:20 · It’s twenty past twelve.',
    thesis: 'Сколько минут прошло после двенадцати?',
    lead: 'Делим циферблат пополам линией от 12 до 6. Если длинная стрелка справа, вспоминаем час, который только что начался. На часах <b>12:20</b>. После двенадцати прошло двадцать минут, поэтому говорим <b>twenty past twelve</b>.',
    blocks: [
      { kind: 'key', h: 'Сначала минуты, потом past и час', p: '<b>Past</b> здесь значит «после». Говорим, сколько минут прошло, а потом называем час, после которого их считаем.' },
      { kind: 'plain', h: 'А если на часах 12:07?', p: 'Говорим <b>seven minutes past twelve</b>. На круглых отметках вроде :05, :10 или :20 слово <b>minutes</b> часто опускают. Для 7 минут лучше его оставить.' },
      { kind: 'plain', h: 'Как спросить, сколько времени', p: '<b>What time is it?</b> — «Который час?» Начни ответ с <b>It’s</b> и назови время.' }
    ],
    forms: { q: 'What time is it?', p: 'It’s <b>twenty past</b> twelve.', n: 'It’s not quite half past twelve yet.' },
    markers: ['минуты уже прошли', 'длинная стрелка справа', 'текущий час'],
    ex: [
      { en: 'It’s five past two.', ru: '2:05 · Два часа пять минут.' },
      { en: 'It’s ten past seven.', ru: '7:10 · Семь часов десять минут.' },
      { en: 'It’s twenty-five past eight.', ru: '8:25 · Восемь часов двадцать пять минут.' }
    ]
  },
  {
    id: 'h-to', zone: 'future', level: 1, idx: 2, short: 'До часа', clock: [12, 40],
    name: 'Перешли за половину — to', core: '12:40 · It’s twenty to one.',
    thesis: 'Сколько минут осталось до часа?',
    lead: 'После половины часа длинная стрелка оказалась слева. Мы теперь ближе к следующему часу, поэтому смотрим вперёд. На часах <b>12:40</b>. До часа дня осталось двадцать минут, и мы говорим <b>twenty to one</b>. По-русски точно так же — «без двадцати час».',
    blocks: [
      { kind: 'key', h: 'Из 60 вычитаем минуты на часах', p: 'В <b>12:40</b> уже прошло 40 минут. До полного часа осталось <b>60 − 40 = 20</b>. Называем остаток, ставим <b>to</b> и переходим к следующему часу — <b>one</b>.' },
      { kind: 'plain', h: 'После одиннадцати идём к двенадцати', p: 'В <b>11:55</b> до двенадцати осталось пять минут. Значит, <b>five to twelve</b>. В <b>11:58</b> осталось две — <b>two minutes to twelve</b>.' },
      { kind: 'plain', h: 'Если кто-то читает цифры напрямую', p: 'Для <b>12:40</b> можно также услышать <b>twelve forty</b>. В этом способе просто называем час и минуты с экрана. С <b>to</b> считаем, сколько минут осталось до следующего часа.' }
    ],
    forms: { p: 'It’s <b>twenty to</b> one.', n: 'It’s not one o’clock yet.', q: 'Is it <b>twenty to</b> one?' },
    markers: ['считаем остаток', 'длинная стрелка слева', 'следующий час'],
    ex: [
      { en: 'It’s twenty-five to four.', ru: '3:35 · Без двадцати пяти четыре.' },
      { en: 'It’s ten to nine.', ru: '8:50 · Без десяти девять.' },
      { en: 'It’s five to twelve.', ru: '11:55 · Без пяти двенадцать.' }
    ]
  },
  {
    id: 'h-quarter', zone: 'past', level: 2, idx: 3, short: 'Четверть и половина', clock: [12, 30],
    name: 'Половина — half, четверть — a quarter', core: 'a quarter past twelve · half past twelve · a quarter to one',
    thesis: 'Половину считаем от текущего часа, четверть — в обе стороны',
    lead: '<b>Quarter</b> значит «четверть». Четверть часа — это <b>15 минут</b>, потому что 60 делим на четыре. <b>Half</b> значит «половина». Половина часа — это <b>30 минут</b>.',
    blocks: [
      { kind: 'key', h: 'В половине часа говорим half past', p: '<b>12:30</b> — <b>half past twelve</b>. Половина часа прошла <em>после двенадцати</em>. По-русски можно сказать «половина первого», а в английском с <b>half past</b> мы называем <b>текущий</b> час, то есть двенадцать.' },
      { kind: 'plain', h: 'Четверть уже прошла — a quarter past', p: '<b>12:15</b> — <b>a quarter past twelve</b>. После двенадцати прошло пятнадцать минут.' },
      { kind: 'plain', h: 'Четверть осталась — a quarter to', p: '<b>12:45</b> — <b>a quarter to one</b>. До часу осталось пятнадцать минут. По-русски — «без четверти час».' }
    ],
    forms: { p: 'It’s <b>half past</b> twelve.', n: 'It’s not <b>a quarter to</b> one yet.', q: 'Is it <b>a quarter past</b> twelve?' },
    markers: ['четверть часа прошла', 'прошло полчаса', 'осталась четверть часа'],
    ex: [
      { en: 'It’s a quarter past four.', ru: '4:15 · Четверть пятого.' },
      { en: 'It’s half past six.', ru: '6:30 · Половина седьмого.' },
      { en: 'It’s a quarter to ten.', ru: '9:45 · Без четверти десять.' }
    ]
  },
  {
    id: 'h-exact', zone: 'present', level: 2, idx: 4, short: 'Ровный час', clock: [12, 0],
    name: 'Ровный час и время на табло', core: 'It’s eight o’clock. · It’s eight forty.',
    thesis: 'o’clock подходит, когда на часах :00',
    lead: 'Когда длинная стрелка на 12 и минут ещё нет, называем час и добавляем <b>o’clock</b>. Например, <b>8:00</b> — <b>It’s eight o’clock</b>. Если нужно сказать «в восемь», добавляем <b>at</b>: <b>at eight o’clock</b>.',
    blocks: [
      { kind: 'key', h: 'С цифрами тоже можно', p: 'На экране <b>8:40</b>. Читаем по порядку <b>eight forty</b>, а с <b>to</b> получится <b>twenty to nine</b>. При чтении <b>8:05</b> перед <b>five</b> обычно говорим <b>oh</b> — <b>eight oh five</b>.' },
      { kind: 'plain', h: 'Утром или вечером?', p: '<b>Seven a.m.</b> — семь утра. <b>Seven p.m.</b> — семь вечера. Чтобы на двенадцати точно не запутаться, можно сказать <b>noon</b> — полдень, <b>midnight</b> — полночь.' },
      { kind: 'plain', h: 'Который час или во сколько?', p: '<b>What time is it?</b> — «Который час?» А <b>What time does the shop open?</b> — «Во сколько открывается магазин?» Можно ответить <b>It opens at nine o’clock</b>.' }
    ],
    forms: { p: 'It’s <b>eight o’clock</b>.', n: 'It’s not <b>eight o’clock</b> yet.', q: 'Is it <b>eight o’clock</b>?' },
    markers: ['ровно', 'в семь утра', 'во сколько?'],
    ex: [
      { en: 'It’s twelve noon.', ru: 'Сейчас ровно полдень.' },
      { en: 'It’s nine oh five.', ru: 'Сейчас 9:05.' },
      { en: 'The bus leaves at eleven thirty.', ru: 'Автобус отправляется в 11:30.' }
    ]
  }
];

const CLOCK_DUELS = [
  { q: 'Двадцать минут прошло или осталось?',
    a: { z: 'present', n: '12:20', en: 'Twenty past twelve.', ru: 'Двадцать минут после двенадцати.', why: 'Уже прошло двадцать. Называем текущий час.' },
    b: { z: 'future', n: '12:40', en: 'Twenty to one.', ru: 'Без двадцати час.', why: 'Осталось двадцать. Называем следующий час.' },
    r: 'Past — сколько минут уже прошло. To — сколько осталось.' },
  { q: 'Половина первого по-русски и по-английски',
    a: { z: 'past', n: 'По-русски', en: '12:30', ru: 'Половина первого.', why: 'Упоминаем час, к которому идём.' },
    b: { z: 'present', n: 'По-английски', en: 'Half past twelve.', ru: 'Половина часа после двенадцати.', why: 'Вспоминаем час, который уже начался.' },
    r: 'На часах одно и то же время. С half past называем двенадцать.' }
];

const CLOCK_NUMBERS = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
  'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five',
  'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine'
];

function clockTime(hour, minute) {
  return hour + ':' + String(minute).padStart(2, '0');
}

function clockParts(hour, minute) {
  if (minute === 0) return [CLOCK_NUMBERS[hour], 'o’clock', ''];
  const to = minute > 30;
  const minutes = to ? 60 - minute : minute;
  const target = to ? hour % 12 + 1 : hour;
  const amount = minutes === 30 ? 'half' : minutes === 15 ? 'a quarter'
    : CLOCK_NUMBERS[minutes] + (minutes % 5 === 0 ? '' : minutes === 1 ? ' minute' : ' minutes');
  return [amount, to ? 'to' : 'past', CLOCK_NUMBERS[target]];
}

function clockFace(hour, minute, showHalves = false, label = '') {
  const point = (mark, radius) => {
    const angle = mark * Math.PI / 30;
    return [140 + radius * Math.sin(angle), 140 - radius * Math.cos(angle)].map(n => n.toFixed(2));
  };
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const major = i % 5 === 0;
    const [x1, y1] = point(i, 108);
    const [x2, y2] = point(i, major ? 98 : 104);
    return `<line class="clock-tick${major ? ' clock-tick--major' : ''}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
  }).join('');
  const numbers = Array.from({ length: 12 }, (_, i) => {
    const [x, y] = point(i * 5, 84);
    return `<text class="clock-number" x="${x}" y="${y}">${i || 12}</text>`;
  }).join('');
  const [hx, hy] = point((hour % 12) * 5 + minute / 12, 53);
  const [mx, my] = point(minute, 77);
  const accessibility = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  const halves = showHalves ? `
    <path class="clock-half clock-half--to" d="M140 24 A116 116 0 0 0 140 256Z"/>
    <path class="clock-half clock-half--past" d="M140 24 A116 116 0 0 1 140 256Z"/>
    <line class="clock-divider" x1="140" y1="38" x2="140" y2="242"/>` : '';
  return `<svg class="clock-face" viewBox="18 18 244 244" ${accessibility}>
    <circle class="clock-rim" cx="140" cy="140" r="116"/>${halves}
    ${ticks}${numbers}
    <line class="clock-hand clock-hand--hour" x1="140" y1="140" x2="${hx}" y2="${hy}"/>
    <line class="clock-hand clock-hand--minute" x1="140" y1="140" x2="${mx}" y2="${my}"/>
    <circle class="clock-pin" cx="140" cy="140" r="5"/>
  </svg>`;
}
