const NUMBER_LEVELS = [
  { n: 1, ru: 'Сколько?', title: 'От единиц до миллионов', code: 'fifty-two · thousand',
    txt: 'Сначала выучи числа от одного до двадцати и названия десятков. Из них можно собрать даже число из нескольких групп.' },
  { n: 2, ru: 'Который по счёту?', title: 'Первый, второй, двадцать первый', code: 'first · second · twenty-first',
    txt: 'Если важно место в очереди, меняем нужное слово. В составном числе достаточно поменять последнее.' }
];

const NUMBER_STATIONS = [
  {
    id: 'n-small', zone: 'present', level: 1, idx: 1, short: 'До ста',
    name: 'Сначала до двадцати, потом десятки', core: 'sixteen → sixty → sixty-five',
    thesis: 'Шестьдесят пять собираем так же, как по-русски',
    lead: 'Выучи числа от <b>one</b> до <b>twenty</b>. Ноль — <b>zero</b>. Потом запомни названия десятков. После этого <b>65</b> уже не новое слово. Берём <b>sixty</b> («шестьдесят») и <b>five</b> («пять»). Получается <b>sixty-five</b>.',
    blocks: [
      { kind: 'plain', h: 'По цифрам или целиком?', p: '<b>6</b> и <b>5</b> — две цифры. Вместе они образуют число <b>65</b>. Если диктуешь эти две цифры из кода, скажи <b>six, five</b>. Если считаешь, сколько всего, скажи <b>sixty-five</b>.' },
      { kind: 'key', h: 'Сначала десяток, потом единица', p: '32 — <b>thirty-two</b>, 76 — <b>seventy-six</b>. На письме между десятком и единицей ставим дефис. Если единиц нет, просто говорим <b>thirty</b> или <b>seventy</b>.' },
      { kind: 'plain', h: 'Fifteen и fifty звучат похоже', p: '<b>Fifteen</b> — это 15, <b>fifty</b> — 50. Так же <b>sixteen</b> — 16, а <b>sixty</b> — 60. Следи за концом слова: <b>-teen</b> в этих примерах даёт число до двадцати, <b>-ty</b> — десяток.' },
      { kind: 'plain', h: 'Запомни forty', p: '<b>Four</b> — четыре, но сорок пишем <b>forty</b>, без <b>u</b>.' }
    ],
    forms: { p: 'I need <b>twenty-four</b> chairs.', n: 'We don’t have <b>twenty-four</b> chairs.', q: 'Do we need <b>twenty-four</b> chairs?' },
    markers: ['единицы', 'десятки', 'сколько?'],
    ex: [
      { en: 'fifteen', ru: '15 · пятнадцать' },
      { en: 'fifty', ru: '50 · пятьдесят' },
      { en: 'fifty-two', ru: '52 · пятьдесят два' }
    ]
  },
  {
    id: 'n-big', zone: 'future', level: 1, idx: 2, short: 'Большие числа',
    name: 'Большое число читаем кусочками', core: '152,365 · one hundred fifty-two thousand three hundred sixty-five',
    thesis: '152 тысячи и ещё 365',
    lead: 'Число <b>152 365</b> выглядит длинным. Раздели его справа налево по три цифры: <b>152 | 365</b>. Слева 152 тысячи, справа ещё 365. Дальше просто прочитай по порядку, как по-русски.',
    blocks: [
      { kind: 'key', h: 'Один и тот же порядок', p: '<b>Сто + пятьдесят + две + тысячи + триста + шестьдесят + пять.</b><br>По-английски <b>one hundred + fifty-two + thousand + three hundred + sixty-five</b>. Складываем в одну фразу: <b>one hundred fifty-two thousand three hundred sixty-five</b>.' },
      { kind: 'plain', h: 'После числа thousand остаётся как есть', p: 'Две тысячи — <b>two thousand</b>, триста — <b>three hundred</b>, четыре миллиона — <b>four million</b>. Когда называем точное число, не добавляем <b>-s</b>. Пустые группы пропускаем: <b>2,000,010</b> — <b>two million ten</b>.' },
      { kind: 'plain', h: 'Можешь услышать and', p: 'В американском английском часто говорят <b>one hundred fifty-two</b>. В британском обычно добавляют <b>and</b>: <b>one hundred and fifty-two</b>. В большом числе получится <b>one hundred and fifty-two thousand three hundred and sixty-five</b>. Порядок кусочков тот же.' },
      { kind: 'plain', h: 'Как записать цифрами', p: 'По-английски это число обычно записывают <b>152,365</b>. Запятая разделяет тысячи. Точка отделяет дробную часть, как в <b>2.5</b> — «две целых пять десятых».' }
    ],
    forms: { p: 'It costs <b>three hundred</b> pounds.', n: 'It doesn’t cost <b>three hundred</b> pounds.', q: 'Does it cost <b>three hundred</b> pounds?' },
    markers: ['hundred — сто', 'thousand — тысяча', 'million — миллион'],
    ex: [
      { en: 'four hundred twenty', ru: '420 · четыреста двадцать' },
      { en: 'seven thousand five hundred', ru: '7 500 · семь тысяч пятьсот' },
      { en: 'two million twelve thousand', ru: '2 012 000 · два миллиона двенадцать тысяч' }
    ]
  },
  {
    id: 'n-order', zone: 'past', level: 2, idx: 3, short: 'Место по счёту',
    name: 'Два этажа или второй этаж?', core: 'two floors · the second floor',
    thesis: 'Два отвечает на «сколько?», второй — на «который?»',
    lead: 'Скажи <b>two floors</b>, если этажей два. Если объясняешь, на какой этаж идти, нужен <b>the second floor</b> — «второй этаж». Слово <b>second</b> говорит, какой он по счёту.',
    blocks: [
      { kind: 'key', h: 'Первые три лучше запомнить сразу', p: '<b>One → first</b> («первый»), <b>two → second</b> («второй»), <b>three → third</b> («третий»). Дальше часто достаточно <b>-th</b>: <b>four → fourth</b>, <b>six → sixth</b>, <b>ten → tenth</b>.' },
      { kind: 'plain', h: 'У нескольких слов меняется написание', p: '<b>Five → fifth</b>, <b>eight → eighth</b>, <b>nine → ninth</b>, <b>twelve → twelfth</b>. У круглых десятков окончание <b>-y</b> превращается в <b>-ieth</b>: <b>twenty → twentieth</b>, <b>forty → fortieth</b>.' },
      { kind: 'plain', h: 'The second или my second?', p: 'Говорим <b>the second floor</b>, если речь о втором этаже. В <b>my second lesson</b> уже есть <b>my</b> («мой»). Перед ним <b>the</b> не нужно.' }
    ],
    forms: { p: 'The office is on <b>the second floor</b>.', n: 'It isn’t on <b>the second floor</b>.', q: 'Is it on <b>the second floor</b>?' },
    markers: ['сколько? — two', 'который? — second', 'first · second · third'],
    ex: [
      { en: 'the first day', ru: 'первый день' },
      { en: 'the fifth page', ru: 'пятая страница' },
      { en: 'my third attempt', ru: 'моя третья попытка' }
    ]
  },
  {
    id: 'n-compound', zone: 'present', level: 2, idx: 4, short: 'Двадцать первый',
    name: 'В длинном числе меняем только последнее слово', core: 'twenty-one → twenty-first',
    thesis: 'Двадцать оставляем, один меняем на первый',
    lead: 'Сравни «двадцать один» и «двадцать первый». В английском та же логика. Оставляем <b>twenty</b> и меняем только <b>one</b> на <b>first</b>. Получается <b>twenty-first</b>.',
    blocks: [
      { kind: 'key', h: 'Сначала собери обычное число', p: '<b>Thirty-two → thirty-second</b>, <b>sixty-five → sixty-fifth</b>. Если число заканчивается на <b>hundred</b> или <b>thousand</b>, меняем именно это слово: <b>one hundredth</b> — «сотый», <b>one thousandth</b> — «тысячный».' },
      { kind: 'plain', h: 'Как сократить на письме', p: '<b>1st</b>, <b>2nd</b>, <b>3rd</b>, <b>4th</b>. Составные пишем так же: <b>21st</b>, <b>32nd</b>, <b>43rd</b>. Если число заканчивается на <b>11</b>, <b>12</b> или <b>13</b>, пишем <b>th</b>: <b>11th</b>, <b>112th</b>, <b>213th</b>.' }
    ],
    forms: { p: 'She finished <b>twenty-first</b>.', n: 'She didn’t finish <b>twenty-first</b>.', q: 'Did she finish <b>twenty-first</b>?' },
    markers: ['меняем последнее слово', '21st · 22nd · 23rd', '11th · 12th · 13th'],
    ex: [
      { en: 'the twenty-first page', ru: '21-я страница' },
      { en: 'his thirty-second birthday', ru: 'его 32-й день рождения' },
      { en: 'the one hundredth visitor', ru: '100-й посетитель' }
    ]
  }
];

const NUMBER_DUELS = [
  { q: 'Два этажа или второй этаж?',
    a: { z: 'present', n: 'Сколько?', en: 'two floors', ru: 'два этажа', why: 'Считаем этажи.' },
    b: { z: 'past', n: 'Который?', en: 'the second floor', ru: 'второй этаж', why: 'Показываем, куда идти.' },
    r: 'Если по-русски говоришь «второй», выбирай second.' },
  { q: 'Пятьдесят или пятнадцать?',
    a: { z: 'present', n: '50', en: 'fifty', ru: 'пятьдесят', why: 'Fifty — десяток. На конце -ty.' },
    b: { z: 'future', n: '15', en: 'fifteen', ru: 'пятнадцать', why: 'Fifteen заканчивается на -teen.' },
    r: 'В числе 52 слышим fifty-two. В числе 15 — одно слово fifteen.' }
];

const NUMBER_SMALL = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];
const NUMBER_TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const NUMBER_SCALES = ['', 'thousand', 'million'];
const NUMBER_ORDINALS = {
  one: 'first', two: 'second', three: 'third', five: 'fifth', eight: 'eighth', nine: 'ninth', twelve: 'twelfth'
};

function numberChunks(value, ordinal = false) {
  const chunks = [];
  for (let i = 0; value > 0; i++, value = Math.floor(value / 1000)) {
    const group = value % 1000;
    if (!group) continue;
    const hundred = Math.floor(group / 100);
    const rest = group % 100;
    const words = [];
    if (hundred) words.push(NUMBER_SMALL[hundred] + ' hundred');
    if (rest > 0 && rest < 20) words.push(NUMBER_SMALL[rest]);
    if (rest >= 20) {
      const unit = rest % 10;
      words.push(NUMBER_TENS[Math.floor(rest / 10)] + (unit ? '-' + NUMBER_SMALL[unit] : ''));
    }
    if (NUMBER_SCALES[i]) words.push(NUMBER_SCALES[i]);
    chunks.unshift(...words);
  }
  if (chunks.length === 0) chunks.push('zero');
  if (ordinal) {
    const last = chunks.length - 1;
    chunks[last] = chunks[last].replace(/[a-z]+$/, word => NUMBER_ORDINALS[word] ||
      (word.endsWith('y') ? word.slice(0, -1) + 'ieth' : word + 'th'));
  }
  return chunks;
}

function numberOrdinalSuffix(value) {
  if (value % 100 >= 11 && value % 100 <= 13) return 'th';
  return ['th', 'st', 'nd', 'rd'][value % 10] || 'th';
}
