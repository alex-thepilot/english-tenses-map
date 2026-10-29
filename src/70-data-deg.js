/* ═══════════════════════════════════════════════════════════
   СТЕПЕНИ СРАВНЕНИЯ · taller, more beautiful, the best
   Цвет кодирует способ образования:
   бирюза — окончание (-er / -est), перивинкл — слово more / the most,
   охра — особая форма (better, worse), серый — помощники (the, than, as).
   Ячейки: [роль, текст, флаги] — роли: er, more, irr, same, base, rest, end.
   ═══════════════════════════════════════════════════════════ */

/* ── слова для конструктора и шпаргалки ──
   type: er — окончание, more — more / the most, irr — особая форма.
   s.c / s.s — предложения: pre + форма + post, ru с <b> вокруг выделенного слова */
const DADJ = [
  { key: 'tall', base: 'tall', ru: 'высокий', type: 'er', cmp: 'taller', sup: 'tallest',
    ear: 'tall + er = taller — «таллер» звучит нормально → окончание',
    note: 'Короткое слово: добавляем окончание, больше ничего менять не нужно.',
    s: { c: { ru: 'Том <b>выше</b> Бена.', pre: 'Tom is', post: 'Ben' },
         s: { ru: 'Том — <b>самый высокий</b> в классе.', pre: 'Tom is', post: 'in the class' } } },
  { key: 'big', base: 'big', ru: 'большой', type: 'er', cmp: 'bigger', sup: 'biggest',
    ear: 'big + er = bigger — «биггер» звучит нормально → окончание',
    note: 'Одна гласная и одна согласная: согласная удваивается — bigger, the biggest.',
    s: { c: { ru: 'Этот дом <b>больше</b> того.', pre: 'This house is', post: 'that one' },
         s: { ru: 'Это <b>самый большой</b> дом в городе.', pre: 'This is', post: 'house in the town' } } },
  { key: 'nice', base: 'nice', ru: 'приятный', type: 'er', cmp: 'nicer', sup: 'nicest',
    ear: 'nice + er = nicer — «найсер» звучит нормально → окончание',
    note: 'Слово уже кончается на e — добавляем только r и st.',
    s: { c: { ru: 'Сегодня <b>приятнее</b>, чем вчера.', pre: 'Today is', post: 'yesterday' },
         s: { ru: 'Это <b>самый приятный</b> день недели.', pre: 'It is', post: 'day of the week' } } },
  { key: 'happy', base: 'happy', ru: 'счастливый', type: 'er', cmp: 'happier', sup: 'happiest',
    ear: 'happy + er = happier — «хэппиер» звучит нормально → окончание',
    note: 'На конце y — меняем её на i и добавляем окончание.',
    s: { c: { ru: 'Анна <b>счастливее</b> Тома.', pre: 'Anna is', post: 'Tom' },
         s: { ru: 'Анна — <b>самая счастливая</b> в группе.', pre: 'Anna is', post: 'in the group' } } },
  { key: 'beautiful', base: 'beautiful', ru: 'красивый', type: 'more', cmp: 'more beautiful', sup: 'the most beautiful',
    ear: 'beautiful + er = beautifuler — «бьютифулер» звучит ужасно → more',
    note: 'Слово остаётся как есть: слева встаёт more или the most. Окончание уже не добавляем.',
    s: { c: { ru: 'Это платье <b>красивее</b> того.', pre: 'This dress is', post: 'that one' },
         s: { ru: 'Это <b>самое красивое</b> платье в магазине.', pre: 'This is', post: 'dress in the shop' } } },
  { key: 'interesting', base: 'interesting', ru: 'интересный', type: 'more', cmp: 'more interesting', sup: 'the most interesting',
    ear: 'interesting + er = interestinger — «интерестингер» звучит ужасно → more',
    note: 'Длинное слово: слово не трогаем, слева ставим more или the most.',
    s: { c: { ru: 'Эта книга <b>интереснее</b> фильма.', pre: 'This book is', post: 'the film' },
         s: { ru: 'Это <b>самая интересная</b> книга в библиотеке.', pre: 'This is', post: 'book in the library' } } },
  { key: 'expensive', base: 'expensive', ru: 'дорогой', type: 'more', cmp: 'more expensive', sup: 'the most expensive',
    ear: 'expensive + er = expensiver — «экспенсивер» звучит ужасно → more',
    note: 'Длинное слово: слово не трогаем, слева ставим more или the most.',
    s: { c: { ru: 'Эта машина <b>дороже</b> той.', pre: 'This car is', post: 'that one' },
         s: { ru: 'Это <b>самая дорогая</b> машина в салоне.', pre: 'This is', post: 'car in the showroom' } } },
  { key: 'good', base: 'good', ru: 'хороший', type: 'irr', cmp: 'better', sup: 'best',
    ear: 'исключение: на слух не проверить, форму просто запоминаем',
    note: 'Слово меняется целиком: good → better → the best. Окончание не нужно.',
    s: { c: { ru: 'Этот фильм <b>лучше</b> того.', pre: 'This film is', post: 'that one' },
         s: { ru: 'Это <b>лучший</b> фильм года.', pre: 'This is', post: 'film of the year' } } },
  { key: 'bad', base: 'bad', ru: 'плохой', type: 'irr', cmp: 'worse', sup: 'worst',
    ear: 'исключение: на слух не проверить, форму просто запоминаем',
    note: 'Слово меняется целиком: bad → worse → the worst. Окончание не нужно.',
    s: { c: { ru: 'Погода <b>хуже</b>, чем вчера.', pre: 'The weather is', post: 'yesterday' },
         s: { ru: 'Это <b>худший</b> день недели.', pre: 'It is', post: 'day of the week' } } }
];

const DTYPES = { er: 'окончание', more: 'more / the most', irr: 'особая форма' };

const DB_DEGREES = [
  { key: 'c', t: 'Сравнительная', i: '«выше», «красивее»' },
  { key: 's', t: 'Превосходная',  i: '«самый высокий»' }
];

/* предложение конструктора: роли ячеек берутся из способа образования слова */
function degTrain(a, deg) {
  const s = a.s[deg], isC = deg === 'c';
  let form;
  if (a.type === 'more') form = [['more', isC ? 'more' : 'the most'], ['base', a.base]];
  else if (isC)          form = [[a.type, a.cmp]];
  else                   form = [['same', 'the'], [a.type, a.sup]];
  return isC
    ? [['rest', s.pre]].concat(form, [['same', 'than'], ['rest', s.post], ['end', '.']])
    : [['rest', s.pre]].concat(form, [['rest', s.post], ['end', '.']]);
}

const DROLES = [
  { r: 'er',   t: 'Окончание', i: '-er · -est' },
  { r: 'more', t: 'More', i: 'more · the most' },
  { r: 'irr',  t: 'Особая форма', i: 'better · worse' },
  { r: 'same', t: 'Помощник', i: 'the · than' },
  { r: 'base', t: 'Само слово', i: 'не меняется рядом с more' },
  { r: 'rest', t: 'Остальные слова', i: '' }
];

/* ── уровни маршрута ── */
const DLEVELS = [
  { n: 1, title: 'Две степени', code: 'сравниваем · самый', ru: 'Главное правило',
    txt: 'Первый этаж — сама идея и главный лайфхак. Сравнительная степень отвечает на вопрос «кто больше, чем кто-то», превосходная — «кто самый». У каждой два пути: окончание или слово <span class="mono">more</span> / <span class="mono">the most</span>. Выбирает между ними <b>русский слух</b>.' },
  { n: 2, title: 'Особые случаи', code: 'happier · better · than · the', ru: 'Где легко ошибиться',
    txt: 'Второй этаж. Слова на -y и двусложные, пять слов-исключений и две мелкие детали, которые забывают чаще всего: <span class="mono">than</span> и <span class="mono">the</span>.' },
  { n: 3, title: 'Тонкости', code: 'as … as · less · much', ru: 'Для уверенной речи',
    txt: 'Верхний этаж. Когда степени сравнения нет, как её усилить, и что делать с наречиями. Ничего нового учить не нужно — это те же слова в других ролях.' }
];

/* ── станции ── */
const D = [
{
  id: 'd-test', zone: 'er', level: 1, idx: 1,
  name: 'Проверка на слух', core: 'tall → taller · beautiful → more beautiful',
  thesis: 'Звучит плохо — ставим more',
  short: 'на слух',
  fig: {
    rows: [
      { l: 'Короткое', tr: [['base','tall'],['end','→'],['er','taller'],['end','·'],['same','the'],['er','tallest']] },
      { l: 'Длинное',  tr: [['base','beautiful'],['end','→'],['more','more beautiful'],['end','·'],['more','the most beautiful']] },
      { l: 'Ошибка',   tr: [['er','beautifuler','bad'],['end','·'],['er','beautifulest','bad']] }
    ],
    cap: 'Добавьте окончание и прислушайтесь. «Таллер» звучит нормально, «бьютифулер» — ужасно. Значит, здесь берём more.'
  },
  lead: 'Сравнительная и превосходная степени нужны, когда мы <b>сравниваем</b> («выше», «красивее») или хотим сказать, что кто-то или что-то <b>самый</b> («самый высокий», «самый красивый»). Способов два: приделать окончание или поставить слово. Какой выбрать — подскажет русский слух.',
  blocks: [
    { kind: 'key', h: 'Лайфхак: примерьте окончание на слух',
      p: 'Добавьте к слову <span class="mono">er</span> или <span class="mono">est</span> и произнесите по-русски. Если звучит нормально — <span class="mono">taller</span> («таллер»), — оставляем окончание.<br>Если звучит очень плохо — <span class="mono">beautifuler</span> («бьютифулер»), <span class="mono">beautifulest</span> («бьютифулест»), — значит, это точно <span class="mono">more</span> или <span class="mono">the most</span>. Тогда окончание уже не добавляем.' },
    { kind: 'plain', h: 'Короткое или длинное',
      p: 'Короткое слово вроде <span class="mono">tall</span> — только окончание. Длинное или составное, как <span class="mono">beautiful</span> («full of beauty», то есть «полный красоты»), — <span class="mono">more</span> и <span class="mono">the most</span>.' },
    { kind: 'plain', h: 'Две степени',
      p: 'Сравниваем: <span class="mono">bigger</span> — больше. Называем самого: <span class="mono">the biggest</span> — самый большой. У превосходной степени всегда стоит <span class="mono">the</span>.' },
    { kind: 'trap', h: 'Ловушка: окончание и more вместе',
      p: '<span class="mono no">more bigger</span>, <span class="mono no">the most tallest</span> → <span class="mono yes">bigger</span>, <span class="mono yes">the tallest</span><br>Одно из двух: либо окончание, либо more.' }
  ],
  forms: { p: 'Tom is <b>taller</b> than Ben.', n: 'Tom isn\'t <b>taller</b> than Ben.', q: 'Is Tom <b>taller</b> than Ben?' },
  markers: ['сравниваем', 'самый', 'than', 'the …est', 'звучит ужасно → more'],
  ex: [
    { en: 'Tom is <i class="v">taller</i> than Ben.', ru: 'Том выше Бена.', nb: 'короткое слово — окончание' },
    { en: 'Tom is <i class="v">the tallest</i> in the class.', ru: 'Том самый высокий в классе.', nb: 'самый — the и est' },
    { en: 'This dress is <i class="v">more beautiful</i> than that one.', ru: 'Это платье красивее того.', nb: '«бьютифулер» звучит ужасно — more' },
    { en: 'This is <i class="v">the most beautiful</i> dress in the shop.', ru: 'Это самое красивое платье в магазине.' }
  ]
},
{
  id: 'd-short', zone: 'er', level: 1, idx: 2,
  name: 'Короткие слова: -er и -est', core: 'tall → taller → the tallest',
  thesis: 'Короткое слово — только окончание',
  short: 'короткие',
  fig: {
    rows: [
      { l: 'Русский',    ru: 'Том <b>выше</b> Бена.' },
      { l: 'Английский', tr: [['rest','Tom is'],['er','taller'],['same','than'],['rest','Ben'],['end','.']] },
      { l: 'Русский',    ru: 'Том — <b>самый высокий</b>.' },
      { l: 'Английский', tr: [['rest','Tom is'],['same','the'],['er','tallest'],['end','.']] }
    ],
    cap: 'Сравнительная — окончание -er и слово than. Превосходная — слово the и окончание -est.'
  },
  lead: 'Слово из одного слога — <span class="mono">tall, old, fast, long, small, cold</span> — обходится без помощников: добавляем окончание, и готово. «Примерять на слух» тут даже не нужно: <span class="mono">taller</span> и <span class="mono">the tallest</span> звучат нормально всегда.',
  blocks: [
    { kind: 'key', h: 'Схема',
      p: 'сравнительная: слово + <span class="mono">er</span> (+ <span class="mono">than</span>)<br>превосходная: <span class="mono">the</span> + слово + <span class="mono">est</span><br><span class="mono">old → older → the oldest</span> · <span class="mono">fast → faster → the fastest</span>' },
    { kind: 'plain', h: 'Слово уже кончается на -e',
      p: 'Добавляем только <span class="mono">r</span> и <span class="mono">st</span>: <span class="mono">nice → nicer → the nicest</span>, <span class="mono">large → larger → the largest</span>.' },
    { kind: 'plain', h: 'Одна гласная и одна согласная — согласная удваивается',
      p: '<span class="mono">big → bigger → the biggest</span> · <span class="mono">hot → hotter → the hottest</span> · <span class="mono">thin → thinner → the thinnest</span><br>Иначе слово прочиталось бы по-другому: <span class="mono">biger</span> звучало бы как «байгер».' },
    { kind: 'trap', h: 'Ловушка: more у короткого слова',
      p: '<span class="mono no">more tall</span>, <span class="mono no">the most fast</span> → <span class="mono yes">taller</span>, <span class="mono yes">the fastest</span><br>Короткому слову more не нужен.' }
  ],
  forms: { p: 'My dog is <b>older</b> than yours.', n: 'It isn\'t <b>the biggest</b> room.', q: 'Who is <b>the fastest</b>?' },
  markers: ['один слог', '+er · +est', 'nice → nicer', 'big → bigger', 'the …est'],
  ex: [
    { en: 'My brother is <i class="v">older</i> than me.', ru: 'Мой брат старше меня.' },
    { en: 'This is <i class="v">the fastest</i> car.', ru: 'Это самая быстрая машина.' },
    { en: 'Today is <i class="v">nicer</i> than yesterday.', ru: 'Сегодня приятнее, чем вчера.', nb: 'e уже есть — добавляем только r' },
    { en: 'This is <i class="v">the biggest</i> house in the town.', ru: 'Это самый большой дом в городе.', nb: 'согласная g удвоилась' }
  ]
},
{
  id: 'd-long', zone: 'more', level: 1, idx: 3,
  name: 'Длинные слова: more и the most', core: 'more beautiful → the most beautiful',
  thesis: 'Длинное слово не трогаем — слева ставим more',
  short: 'длинные',
  fig: {
    rows: [
      { l: 'Русский',    ru: 'Это платье <b>красивее</b> того.' },
      { l: 'Английский', tr: [['rest','This dress is'],['more','more'],['base','beautiful'],['same','than'],['rest','that one'],['end','.']] },
      { l: 'Русский',    ru: 'Это <b>самое красивое</b> платье.' },
      { l: 'Английский', tr: [['rest','This is'],['more','the most'],['base','beautiful'],['rest','dress'],['end','.']] }
    ],
    cap: 'Само слово остаётся как есть. Слева от него встаёт more (сравнительная) или the most (превосходная).'
  },
  lead: 'Слова побольше — <span class="mono">beautiful, interesting, expensive, dangerous</span> — окончание не выдерживают: «бьютифулер» звучит ужасно. Вместо окончания слева от слова встаёт <span class="mono">more</span> или <span class="mono">the most</span>, а само слово не меняется.',
  blocks: [
    { kind: 'key', h: 'Какие это слова',
      p: 'Те самые, у которых окончание звучит плохо. Это длинные слова (<span class="mono">interesting, expensive, comfortable</span>) и слова из нескольких частей, как <span class="mono">beautiful</span> — «full of beauty», то есть красота + <span class="mono">ful</span>. К такому слову третью часть уже не прицепишь.' },
    { kind: 'plain', h: 'Схема',
      p: 'сравнительная: <span class="mono">more</span> + слово (+ <span class="mono">than</span>)<br>превосходная: <span class="mono">the most</span> + слово<br><span class="mono">beautiful → more beautiful → the most beautiful</span>' },
    { kind: 'trap', h: 'Ловушка: more и окончание вместе',
      p: '<span class="mono no">more beautifuler</span>, <span class="mono no">the most beautifulest</span> → <span class="mono yes">more beautiful</span>, <span class="mono yes">the most beautiful</span><br>Слово остаётся таким, каким было.' }
  ],
  forms: { p: 'This book is <b>more interesting</b> than the film.', n: 'It isn\'t <b>the most expensive</b> car.', q: 'Is it <b>more dangerous</b>?' },
  markers: ['длинное слово', 'несколько частей', 'more …', 'the most …', 'слово не меняется'],
  ex: [
    { en: 'This book is <i class="v">more interesting</i> than the film.', ru: 'Эта книга интереснее фильма.' },
    { en: 'It is <i class="v">the most expensive</i> car in the showroom.', ru: 'Это самая дорогая машина в салоне.' },
    { en: 'Skiing is <i class="v">more dangerous</i> than walking.', ru: 'Лыжи опаснее ходьбы.' },
    { en: 'She is <i class="v">the most beautiful</i> girl here.', ru: 'Она самая красивая девушка здесь.' }
  ]
},
{
  id: 'd-y', zone: 'er', level: 2, idx: 4,
  name: 'Слова на -y и двусложные', core: 'happy → happier · clever → cleverer / more clever',
  thesis: 'Слово на -y меняет y на i, остальные — на слух',
  short: 'двусложные',
  fig: {
    rows: [
      { l: 'Русский',    ru: 'Анна <b>счастливее</b> Тома.' },
      { l: 'Английский', tr: [['rest','Anna is'],['er','happier'],['same','than'],['rest','Tom'],['end','.']] },
      { l: 'Русский',    ru: 'Анна — <b>самая счастливая</b>.' },
      { l: 'Английский', tr: [['rest','Anna is'],['same','the'],['er','happiest'],['end','.']] }
    ],
    cap: 'Буква y на конце превращается в i, и только после этого идёт окончание.'
  },
  lead: 'Двусложные слова — серединка. Если слово кончается на <span class="mono">-y</span> (<span class="mono">happy, easy, busy, funny, heavy</span>), примерка проходит легко: <span class="mono">happier</span> и <span class="mono">the happiest</span> звучат нормально. Остальные двусложные решаются на слух.',
  blocks: [
    { kind: 'key', h: 'y → i',
      p: '<span class="mono">happy → happier → the happiest</span><br><span class="mono">easy → easier → the easiest</span><br><span class="mono">busy → busier → the busiest</span>' },
    { kind: 'plain', h: 'Остальные двусложные — на слух',
      p: 'У <span class="mono">clever, quiet, simple, narrow</span> правильны оба варианта: <span class="mono">cleverer</span> и <span class="mono">more clever</span>, <span class="mono">quieter</span> и <span class="mono">more quiet</span>. Если сомневаетесь, <span class="mono">more</span> надёжнее — он не подведёт.' },
    { kind: 'plain', h: 'Слова на -ful, -ous, -ing, -ed',
      p: 'Они почти всегда берут more: <span class="mono">careful, famous, boring, tired</span> → <span class="mono">more famous</span>, <span class="mono">more tired</span>. Окончание у них звучит хуже всего.' },
    { kind: 'trap', h: 'Ловушка: happyer',
      p: '<span class="mono no">happyer</span>, <span class="mono no">the happyest</span> → <span class="mono yes">happier</span>, <span class="mono yes">the happiest</span><br>Y перед окончанием всегда превращается в i.' }
  ],
  forms: { p: 'Anna is <b>happier</b> than Tom.', n: 'This test isn\'t <b>easier</b> than that one.', q: 'Is Anna <b>the happiest</b>?' },
  markers: ['-y → -ier', '-y → -iest', 'двусложные — на слух', '-ful → more', '-ous → more'],
  ex: [
    { en: 'Anna is <i class="v">happier</i> than Tom.', ru: 'Анна счастливее Тома.' },
    { en: 'This is <i class="v">the easiest</i> test.', ru: 'Это самый лёгкий тест.', nb: 'easy → easi-' },
    { en: 'This street is <i class="v">busier</i> than ours.', ru: 'Эта улица оживлённее нашей.' },
    { en: 'He is <i class="v">more famous</i> than his brother.', ru: 'Он известнее своего брата.', nb: '-ous — лучше more' }
  ]
},
{
  id: 'd-irr', zone: 'irr', level: 2, idx: 5,
  name: 'Исключения: good → better', core: 'good · bad · far · little · many → …',
  thesis: 'Эти слова просто запоминаем',
  short: 'исключения',
  fig: {
    rows: [
      { l: 'good',        tr: [['base','good'],['end','→'],['irr','better'],['end','·'],['same','the'],['irr','best']] },
      { l: 'bad',         tr: [['base','bad'],['end','→'],['irr','worse'],['end','·'],['same','the'],['irr','worst']] },
      { l: 'far',         tr: [['base','far'],['end','→'],['irr','farther'],['end','·'],['same','the'],['irr','farthest']] },
      { l: 'little',      tr: [['base','little'],['end','→'],['irr','less'],['end','·'],['same','the'],['irr','least']] },
      { l: 'many · much', tr: [['base','many'],['end','→'],['irr','more'],['end','·'],['same','the'],['irr','most']] }
    ],
    cap: 'Окончание тут не приклеивается: слово меняется целиком.'
  },
  lead: 'Несколько самых частых слов меняются сами по себе. Ни окончание, ни <span class="mono">more</span> им не нужны. Их немного, но встречаются они постоянно, поэтому проще выучить их как готовые пары.',
  blocks: [
    { kind: 'key', h: 'Пять пар',
      p: '<span class="mono">good → better → the best</span><br><span class="mono">bad → worse → the worst</span><br><span class="mono">far → farther → the farthest</span><br><span class="mono">little → less → the least</span><br><span class="mono">many / much → more → the most</span>' },
    { kind: 'trap', h: 'Ловушка: gooder и more good',
      p: '<span class="mono no">gooder</span>, <span class="mono no">more good</span>, <span class="mono no">more better</span> → <span class="mono yes">better</span><br><span class="mono no">badder</span>, <span class="mono no">more bad</span> → <span class="mono yes">worse</span>' },
    { kind: 'plain', h: 'Far — farther и further',
      p: 'Про расстояние подходят обе формы. В переносном смысле — только <span class="mono">further</span>: <span class="mono">further information</span> — «дополнительная информация».' },
    { kind: 'plain', h: 'More о количестве — это другое more',
      p: '<span class="mono">more water</span>, <span class="mono">more books</span> — «больше воды», «больше книг». Это степень слов <span class="mono">many</span> и <span class="mono">much</span>, а не тот <span class="mono">more</span>, что стоит перед длинными прилагательными.' }
  ],
  forms: { p: 'This film is <b>better</b> than that one.', n: 'It isn\'t <b>the worst</b> day.', q: 'Is this <b>the best</b> way?' },
  markers: ['good → better', 'bad → worse', 'far → farther', 'little → less', 'many · much → more'],
  ex: [
    { en: 'This film is <i class="v">better</i> than that one.', ru: 'Этот фильм лучше того.' },
    { en: 'It was <i class="v">the worst</i> day of my life.', ru: 'Это был худший день в моей жизни.' },
    { en: 'I need <i class="v">more</i> time.', ru: 'Мне нужно больше времени.', nb: 'more о количестве, а не перед прилагательным' },
    { en: 'The station is <i class="v">farther</i> than the shop.', ru: 'Вокзал дальше, чем магазин.' }
  ]
},
{
  id: 'd-than', zone: 'same', level: 2, idx: 6,
  name: 'Than и the: две мелкие детали', core: 'taller than · the tallest in',
  thesis: 'Сравниваем — than, выделяем — the',
  short: 'than и the',
  fig: {
    rows: [
      { l: 'Русский',    ru: 'Том выше <b>Бена</b>.' },
      { l: 'Английский', tr: [['rest','Tom is'],['er','taller'],['same','than'],['rest','Ben'],['end','.']] },
      { l: 'Русский',    ru: 'Том самый высокий <b>в классе</b>.' },
      { l: 'Английский', tr: [['rest','Tom is'],['same','the'],['er','tallest'],['same','in'],['rest','the class'],['end','.']] }
    ],
    cap: 'Сравнительная ждёт «чем кто?» — слово than. Превосходная ждёт «среди кого?» — слова in или of.'
  },
  lead: 'Две мелкие детали, которые легко забыть: после сравнительной степени стоит <span class="mono">than</span> («чем»), а перед превосходной — <span class="mono">the</span>.',
  blocks: [
    { kind: 'key', h: 'Than — это «чем»',
      p: '«Том выше, <b>чем</b> Бен» → <span class="mono">Tom is taller <b>than</b> Ben</span>. Than нужен, когда называем, с кем сравниваем.' },
    { kind: 'plain', h: 'The и «среди кого»',
      p: 'Превосходная всегда с <span class="mono">the</span>: <span class="mono">the tallest</span>. А «среди кого» добавляется словом <span class="mono">in</span> (место, группа: <span class="mono">in the class</span>, <span class="mono">in London</span>) или <span class="mono">of</span> (набор: <span class="mono">of all</span>, <span class="mono">of the three</span>).' },
    { kind: 'plain', h: 'Than и местоимение',
      p: 'После than стоит вторая форма: <span class="mono">taller than me</span>, <span class="mono">older than him</span>. Как выбирать форму — на вкладке «Местоимения».<br><a class="goto" href="#p-hero">К местоимениям →</a>' },
    { kind: 'trap', h: 'Ловушка: then вместо than',
      p: '<span class="mono no">taller then Ben</span> → <span class="mono yes">taller than Ben</span> — then значит «потом».<br><span class="mono no">the taller than Ben</span> → <span class="mono yes">taller than Ben</span> — у сравнительной степени the не ставят.' }
  ],
  forms: { p: 'Tom is taller <b>than</b> Ben.', n: 'Tom isn\'t <b>the</b> tallest in the class.', q: 'Who is <b>the</b> tallest in the class?' },
  markers: ['than — чем', 'then — потом', 'the + превосходная', 'in + место', 'of + набор'],
  ex: [
    { en: 'She is older <i class="v">than</i> me.', ru: 'Она старше меня.' },
    { en: 'He is the tallest <i class="v">in</i> the class.', ru: 'Он самый высокий в классе.' },
    { en: 'This is the cheapest <i class="v">of</i> all.', ru: 'Это самое дешёвое из всех.' },
    { en: 'It is bigger <i class="v">than</i> I thought.', ru: 'Это больше, чем я думал.', nb: 'после than может идти целая фраза' }
  ]
},
{
  id: 'd-as', zone: 'same', level: 3, idx: 7,
  name: 'Равенство и «меньше»: as … as · less', core: 'as tall as · less interesting',
  thesis: 'Когда степени нет, слово остаётся как есть',
  short: 'as … as',
  fig: {
    rows: [
      { l: 'Русский',    ru: 'Том <b>такой же высокий, как</b> Бен.' },
      { l: 'Английский', tr: [['rest','Tom is'],['same','as'],['base','tall'],['same','as'],['rest','Ben'],['end','.']] },
      { l: 'Русский',    ru: 'Эта книга <b>менее интересная</b>.' },
      { l: 'Английский', tr: [['rest','This book is'],['more','less'],['base','interesting'],['same','than'],['rest','that one'],['end','.']] }
    ],
    cap: 'Слово остаётся в обычной форме — вокруг него встают as … as или less.'
  },
  lead: 'Ещё два способа сравнить: сказать, что оба одинаковы, или что кто-то <b>меньше</b>. Прилагательное в обоих случаях остаётся как есть.',
  blocks: [
    { kind: 'key', h: 'as … as — «такой же, как»',
      p: '<span class="mono">Tom is as tall as Ben.</span> Слово стоит в обычной форме, а вокруг него два as.<br>Отрицание: <span class="mono">Tom isn\'t as tall as Ben</span> — «не такой высокий, как Бен», то есть ниже.' },
    { kind: 'plain', h: 'less — зеркальное more',
      p: '<span class="mono">less interesting</span> — менее интересный, <span class="mono">the least interesting</span> — наименее интересный. Чаще всего встречается с длинными словами. С короткими обычно говорят иначе: <span class="mono">not as tall as</span>.' },
    { kind: 'trap', h: 'Ловушка: -er после as',
      p: '<span class="mono no">as taller as</span> → <span class="mono yes">as tall as</span><br>Когда одинаково, степени сравнения нет, и слово остаётся в обычной форме.' }
  ],
  forms: { p: 'Tom is <b>as tall as</b> Ben.', n: 'Tom isn\'t <b>as tall as</b> Ben.', q: 'Is Tom <b>as tall as</b> Ben?' },
  markers: ['as … as', 'not as … as', 'less', 'the least', 'слово без изменений'],
  ex: [
    { en: 'Tom is <i class="v">as tall as</i> Ben.', ru: 'Том такой же высокий, как Бен.' },
    { en: 'This phone is <i class="v">not as expensive as</i> that one.', ru: 'Этот телефон не такой дорогой, как тот.' },
    { en: 'This flat is <i class="v">less expensive</i> than that one.', ru: 'Эта квартира менее дорогая, чем та.' },
    { en: 'It is <i class="v">the least interesting</i> book.', ru: 'Это наименее интересная книга.' }
  ]
},
{
  id: 'd-adv', zone: 'more', level: 3, idx: 8,
  name: 'Усилители и наречия', core: 'much taller · more slowly',
  thesis: 'Усилить можно, но не через very',
  short: 'усилители',
  fig: {
    rows: [
      { l: 'Русский',    ru: 'Том <b>намного выше</b> Бена.' },
      { l: 'Английский', tr: [['rest','Tom is'],['same','much'],['er','taller'],['same','than'],['rest','Ben'],['end','.']] },
      { l: 'Русский',    ru: 'Она ходит <b>медленнее</b>.' },
      { l: 'Английский', tr: [['rest','She walks'],['more','more'],['base','slowly'],['end','.']] }
    ],
    cap: 'Much и a lot усиливают сравнительную степень, а very — нет. Наречия на -ly берут more.'
  },
  lead: 'Два последних штриха. Сравнение можно <b>усилить</b>: «намного выше». А ещё степени сравнения бывают у <b>наречий</b>, не только у прилагательных: «быстрее», «медленнее».',
  blocks: [
    { kind: 'key', h: 'Усилители: much, a lot, a bit',
      p: '<span class="mono">much taller</span> — намного выше · <span class="mono">a lot more expensive</span> — гораздо дороже · <span class="mono">a bit older</span> — чуть старше.' },
    { kind: 'trap', h: 'Ловушка: very перед сравнительной',
      p: '<span class="mono no">very taller</span> → <span class="mono yes">much taller</span><br>Very усиливает обычную форму (<span class="mono">very tall</span>), а сравнительной нужны much или a lot.' },
    { kind: 'plain', h: 'Наречия',
      p: 'Короткие наречия ведут себя как короткие прилагательные: <span class="mono">fast → faster → the fastest</span>, <span class="mono">hard → harder</span>, <span class="mono">early → earlier</span>.<br>Наречия на <span class="mono">-ly</span> берут more: <span class="mono">slowly → more slowly</span>, <span class="mono">carefully → more carefully</span>.' },
    { kind: 'plain', h: 'Well — как good',
      p: '<span class="mono">well → better → the best</span>: <span class="mono">He sings better than me.</span>' }
  ],
  forms: { p: 'He drives <b>more carefully</b> than me.', n: 'She doesn\'t run <b>faster</b> than him.', q: 'Who runs <b>the fastest</b>?' },
  markers: ['much · a lot', 'a bit', 'very — нельзя', '-ly → more', 'well → better'],
  ex: [
    { en: 'Tom is <i class="v">much</i> taller than Ben.', ru: 'Том намного выше Бена.' },
    { en: 'This is <i class="v">a lot</i> more expensive.', ru: 'Это гораздо дороже.' },
    { en: 'She walks <i class="v">more slowly</i> than me.', ru: 'Она ходит медленнее меня.' },
    { en: 'He sings <i class="v">better</i> than me.', ru: 'Он поёт лучше меня.', nb: 'well → better' }
  ]
}
];

/* ── дуэли ── */
const DDUELS = [
  {
    q: 'Taller или more beautiful? — на слух',
    a: { z: 'er', n: 'Короткое → окончание', tr: [['rest','Tom is'],['er','taller'],['same','than'],['rest','Ben'],['end','.']],
         en: 'Tom is <i class="v">taller</i> than Ben.', ru: 'Том выше Бена.', why: '«Таллер» звучит нормально, слово короткое — берём окончание.' },
    b: { z: 'more', n: 'Длинное → more', tr: [['rest','This dress is'],['more','more'],['base','beautiful'],['same','than'],['rest','that one'],['end','.']],
         en: 'This dress is <i class="v">more beautiful</i> than that one.', ru: 'Это платье красивее того.', why: '«Бьютифулер» звучит ужасно — слово длинное, ставим more.' },
    r: 'Примерьте окончание на слух. Звучит нормально — окончание, звучит ужасно — more.'
  },
  {
    q: 'Bigger или nicer? — что делать с буквами',
    a: { z: 'er', n: 'big · согласная удваивается', tr: [['rest','This house is'],['er','bigger'],['same','than'],['rest','that one'],['end','.']],
         en: 'This house is <i class="v">bigger</i> than that one.', ru: 'Этот дом больше того.', why: 'Одна гласная и одна согласная — согласная удваивается: biggest, bigger.' },
    b: { z: 'er', n: 'nice · e уже есть', tr: [['rest','Today is'],['er','nicer'],['same','than'],['rest','yesterday'],['end','.']],
         en: 'Today is <i class="v">nicer</i> than yesterday.', ru: 'Сегодня приятнее, чем вчера.', why: 'Слово уже кончается на e — добавляем только r.' },
    r: 'Одна гласная и одна согласная в конце — удваиваем. Слово на -e — добавляем только r или st.'
  },
  {
    q: 'Better или faster? — исключение или нет',
    a: { z: 'irr', n: 'good · особая форма', tr: [['rest','This film is'],['irr','better'],['same','than'],['rest','that one'],['end','.']],
         en: 'This film is <i class="v">better</i> than that one.', ru: 'Этот фильм лучше того.', why: 'Good меняется целиком. Gooder не бывает — форму просто запоминаем.' },
    b: { z: 'er', n: 'fast · обычное слово', tr: [['rest','This car is'],['er','faster'],['same','than'],['rest','that one'],['end','.']],
         en: 'This car is <i class="v">faster</i> than that one.', ru: 'Эта машина быстрее той.', why: 'Fast — обычное короткое слово, и окончание ему подходит.' },
    r: 'Пять слов запомните как пары: good, bad, far, little, many и much. Остальные следуют правилу.'
  },
  {
    q: 'Than или the? — сравниваем или выделяем',
    a: { z: 'same', n: 'Сравниваем → than', tr: [['rest','Tom is'],['er','taller'],['same','than'],['rest','Ben'],['end','.']],
         en: 'Tom is taller <i class="v">than</i> Ben.', ru: 'Том выше Бена.', why: 'Мы называем, с кем сравниваем, — нужен than. The здесь не ставят.' },
    b: { z: 'same', n: 'Выделяем самого → the', tr: [['rest','Tom is'],['same','the'],['er','tallest'],['same','in'],['rest','the class'],['end','.']],
         en: 'Tom is <i class="v">the</i> tallest in the class.', ru: 'Том самый высокий в классе.', why: 'Мы выделяем одного среди многих — нужен the, а «среди кого» добавляет in или of.' },
    r: 'Сравниваем с кем-то — than. Называем самого — the и in или of.'
  },
  {
    q: 'Much или very? — усилитель',
    a: { z: 'same', n: 'Much → сравнительная', tr: [['rest','Tom is'],['same','much'],['er','taller'],['same','than'],['rest','Ben'],['end','.']],
         en: 'Tom is <i class="v">much</i> taller than Ben.', ru: 'Том намного выше Бена.', why: 'Much усиливает сравнительную степень.' },
    b: { z: 'same', n: 'Very → обычная форма', tr: [['rest','Tom is'],['same','very'],['base','tall'],['end','.']],
         en: 'Tom is <i class="v">very</i> tall.', ru: 'Том очень высокий.', why: 'Very усиливает слово в обычной форме, без сравнения.' },
    r: 'Very — для обычной формы, much и a lot — для сравнительной. Very taller — ошибка.'
  }
];
