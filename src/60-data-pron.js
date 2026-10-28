/* ═══════════════════════════════════════════════════════════
   МЕСТОИМЕНИЯ · she или her
   Цвет кодирует форму местоимения:
   бирюза — «как в словаре» (кто делает), перивинкл — «изменилось»
   (на кого направлено), охра — «чей?», серый — не меняется (you, it).
   Ячейки: [роль, текст] — роли: nom, acc, pos, same, rest, end.
   ═══════════════════════════════════════════════════════════ */

/* ── семь «лиц»: из этих данных собираются конструктор и шпаргалка ── */
const PERSONS = [
  { key: 'i',    t: 'я',         nomRu: 'я',          accRu: 'меня · мне · мной',        posRu: 'мой · моя · моё · мои', nom: 'I',    acc: 'me',   pos: 'my',    ex: 'I read · He sees me · my book' },
  { key: 'you',  t: 'ты / вы',   nomRu: 'ты · вы',    accRu: 'тебя · тебе · вас · вам',  posRu: 'твой · ваш',            nom: 'you',  acc: 'you',  pos: 'your',  ex: 'You read · I see you · your book' },
  { key: 'he',   t: 'он',        nomRu: 'он',         accRu: 'его · ему · ним',          posRu: 'его',                   nom: 'he',   acc: 'him',  pos: 'his',   ex: 'He reads · I see him · his book' },
  { key: 'she',  t: 'она',       nomRu: 'она',        accRu: 'её · ей · ней',            posRu: 'её',                    nom: 'she',  acc: 'her',  pos: 'her',   ex: 'She reads · I see her · her book' },
  { key: 'it',   t: 'вещь',      nomRu: 'он · она · оно', accRu: 'его · её · ему · ей',  posRu: 'его · её',              nom: 'it',   acc: 'it',   pos: 'its',   ex: 'It works · I see it · its color' },
  { key: 'we',   t: 'мы',        nomRu: 'мы',         accRu: 'нас · нам · нами',         posRu: 'наш · наша · наше',     nom: 'we',   acc: 'us',   pos: 'our',   ex: 'We read · He sees us · our book' },
  { key: 'they', t: 'они',       nomRu: 'они',        accRu: 'их · им · ими',            posRu: 'их',                    nom: 'they', acc: 'them', pos: 'their', ex: 'They read · I see them · their book' }
];

/* ── конструктор: 7 лиц × 2 вида ── */
const PB_FORMS = [
  { key: 'nom', t: 'Как в словаре',  i: '«Она читает»' },
  { key: 'acc', t: 'Изменилось',     i: '«Я вижу её»' }
];

const PB = {
  i: {
    nom: { ru: '<b>Я</b> читаю.',                tr: [['nom','I'],['rest','read'],['end','.']],                         s: '«я» осталось как в словаре → I' },
    acc: { ru: 'Он видит <b>меня</b>.',          tr: [['nom','He'],['rest','sees'],['acc','me'],['end','.']],           s: '«я» → «меня»: изменилось → me' },
    note: 'Три русские формы — «меня», «мне», «мной» — по-английски одно слово: <b>me</b>.'
  },
  you: {
    nom: { ru: '<b>Ты</b> читаешь.',             tr: [['same','You'],['rest','read'],['end','.']],                      s: '«ты» осталось как в словаре → you' },
    acc: { ru: 'Я вижу <b>тебя</b>.',            tr: [['nom','I'],['rest','see'],['same','you'],['end','.']],           s: '«ты» → «тебя»: изменилось, но по-английски всё равно you' },
    note: '<b>You</b> — и «ты», и «вы», и «тебя», и «вам». Выбирать между двумя формами здесь не нужно.'
  },
  he: {
    nom: { ru: '<b>Он</b> читает.',              tr: [['nom','He'],['rest','reads'],['end','.']],                       s: '«он» осталось как в словаре → he' },
    acc: { ru: 'Я вижу <b>его</b>.',             tr: [['nom','I'],['rest','see'],['acc','him'],['end','.']],            s: '«он» → «его»: изменилось → him' },
    note: 'Так говорят о человеке. О предмете, даже если по-русски он «он», скажут <b>it</b>.'
  },
  she: {
    nom: { ru: '<b>Она</b> читает.',             tr: [['nom','She'],['rest','reads'],['end','.']],                      s: '«она» осталось как в словаре → she' },
    acc: { ru: 'Я вижу <b>её</b>.',              tr: [['nom','I'],['rest','see'],['acc','her'],['end','.']],            s: '«она» → «её»: изменилось → her' },
    note: 'Так говорят о человеке. О предмете, даже если по-русски он «она», скажут <b>it</b>.'
  },
  it: {
    nom: { ru: '<b>Она</b> (машина) здесь.',     tr: [['same','It'],['rest','is'],['rest','here'],['end','.']],         s: 'вещь — всегда it, хотя по-русски «она»' },
    acc: { ru: 'Я вижу <b>её</b> (машину).',     tr: [['nom','I'],['rest','see'],['same','it'],['end','.']],            s: 'вещь — всегда it, хотя по-русски «её»' },
    note: 'Любая вещь по-английски — <b>it</b>, как бы она ни называлась по-русски: «он», «она» или «оно». И в первой, и во второй форме слово то же.'
  },
  we: {
    nom: { ru: '<b>Мы</b> читаем.',              tr: [['nom','We'],['rest','read'],['end','.']],                        s: '«мы» осталось как в словаре → we' },
    acc: { ru: 'Он видит <b>нас</b>.',           tr: [['nom','He'],['rest','sees'],['acc','us'],['end','.']],           s: '«мы» → «нас»: изменилось → us' },
    note: 'Формы «нас», «нам», «нами» — по-английски одно слово: <b>us</b>.'
  },
  they: {
    nom: { ru: '<b>Они</b> читают.',             tr: [['nom','They'],['rest','read'],['end','.']],                      s: '«они» осталось как в словаре → they' },
    acc: { ru: 'Я вижу <b>их</b>.',              tr: [['nom','I'],['rest','see'],['acc','them'],['end','.']],           s: '«они» → «их»: изменилось → them' },
    note: 'Формы «их», «им», «ими» — по-английски одно слово: <b>them</b>.'
  }
};

const PROLES = [
  { r: 'nom',  t: 'Как в словаре', i: 'кто делает · перед глаголом' },
  { r: 'acc',  t: 'Изменилось', i: 'на кого направлено · после глагола и предлога' },
  { r: 'pos',  t: 'Чей?', i: 'перед существительным' },
  { r: 'same', t: 'Не меняется', i: 'you · it' },
  { r: 'rest', t: 'Остальные слова', i: '' }
];

/* ── уровни маршрута ── */
const PLEVELS = [
  { n: 1, title: 'Две формы', code: 'изменилось ли слово?', ru: 'Главное правило',
    txt: 'Первый этаж — само правило. У английского местоимения две формы, как и у русского: «как в словаре» и «изменённая». Выбор делает один вопрос — <b>изменилось ли слово в русском</b>. Плюс подсказка по месту в предложении, на случай если русский сбивает.' },
  { n: 2, title: 'Особые случаи', code: 'you · it · двое · нравится', ru: 'Где легко ошибиться',
    txt: 'Второй этаж. Два слова, у которых форма одна на все случаи; ситуация, когда рядом стоит чьё-то имя; и русские фразы, устроенные иначе, чем английские. Правило первого этажа остаётся — здесь только его границы.' },
  { n: 3, title: 'Чей?', code: 'my · your · his · her · our · their', ru: 'Отдельная тема',
    txt: 'Верхний этаж — третий набор слов, который отвечает на вопрос «чей?». Он вынесен отдельно, чтобы не смешиваться с первыми двумя: эти слова стоят не вместо существительного, а перед ним.' }
];

/* ── станции ── */
const P = [
{
  id: 'p-test', zone: 'nom', level: 1, idx: 1,
  name: 'Проверка по-русски', core: 'не изменилось → she · изменилось → her',
  thesis: 'Русское слово не изменилось — и английское тоже',
  short: 'проверка',
  fig: {
    rows: [
      { l: 'я',   tr: [['nom','я'],['end','→'],['nom','I'],['end','·'],['acc','меня, мне, мной'],['end','→'],['acc','me']] },
      { l: 'он',  tr: [['nom','он'],['end','→'],['nom','he'],['end','·'],['acc','его, ему, него, ним'],['end','→'],['acc','him']] },
      { l: 'она', tr: [['nom','она'],['end','→'],['nom','she'],['end','·'],['acc','её, ей, ней'],['end','→'],['acc','her']] },
      { l: 'мы',  tr: [['nom','мы'],['end','→'],['nom','we'],['end','·'],['acc','нас, нам, нами'],['end','→'],['acc','us']] },
      { l: 'они', tr: [['nom','они'],['end','→'],['nom','they'],['end','·'],['acc','их, им, них, ними'],['end','→'],['acc','them']] }
    ],
    cap: 'Слева — русское слово «как в словаре» и английская пара к нему, справа — то, что получается из слова, когда оно изменилось. Русская форма подсказывает английскую.'
  },
  lead: 'Выбор между <span class="mono">she</span> и <span class="mono">her</span> кажется случайным, пока не заметишь: <b>в русском такая же разница уже есть</b>. «Она читает» и «Я вижу её» — одно местоимение, но во втором предложении оно изменилось. Английский делает то же самое, просто в родном языке мы этого не замечаем.',
  blocks: [
    { kind: 'key', h: 'Как проверить за секунду',
      p: 'Переведите предложение на русский и посмотрите на местоимение.<br>Если по-русски получается «она», по-английски будет <span class="mono">she</span>.<br>Если русское слово поменялось («её», «ей», «ней»), по-английски будет <span class="mono">her</span>.<br><b>Коротко:</b> русское слово не изменилось — значит, и английское не меняется. Изменилось — меняется и английское.' },
    { kind: 'plain', h: 'Четыре примера',
      p: 'Она читает. → <span class="mono">She reads.</span> («она» осталась как есть — she)<br>Я вижу её. → <span class="mono">I see her.</span> («она» превратилась в «её» — her)<br>Я дал ей книгу. → <span class="mono">I gave her a book.</span><br>Я пошёл с ней. → <span class="mono">I went with her.</span>' },
    { kind: 'plain', h: 'С остальными местоимениями так же',
      p: 'я → <span class="mono">I</span>, а «меня», «мне», «мной» → <span class="mono">me</span><br>он → <span class="mono">he</span>, а «его», «ему», «ним» → <span class="mono">him</span><br>мы → <span class="mono">we</span>, а «нас», «нам», «нами» → <span class="mono">us</span><br>они → <span class="mono">they</span>, а «их», «им», «ими» → <span class="mono">them</span><br>Полная таблица — в шпаргалке внизу.' },
    { kind: 'plain', h: 'Для преподавателя: как это называется',
      p: 'Слово «как в словаре» — это именительный падеж: в английском его называют <i>subject pronoun</i> (<span class="mono">I, he, she, we, they</span>). Все остальные падежи — <i>object pronoun</i> (<span class="mono">me, him, her, us, them</span>). Ученику термины не нужны: хватает вопроса «изменилось ли слово?».' },
    { kind: 'trap', h: 'Ограничение: проверка работает на смысле, а не на словах',
      p: 'Бывает, что русская фраза устроена иначе, чем английская: «у неё есть машина» — слово «неё» изменилось, а по-английски это <span class="mono">She has a car</span>. Такие случаи разобраны ниже.<br><a class="goto" href="#p-ru">Когда русский подводит →</a>' }
  ],
  forms: { p: '<b>She</b> reads. · I see <b>her</b>.', n: '<b>She</b> doesn\'t read. · I don\'t see <b>her</b>.', q: 'Does <b>she</b> read? · Do you see <b>her</b>?' },
  markers: ['изменилось ли слово?', 'она → she', 'её · ей · ней → her', 'как в словаре', 'форма не та, что в словаре'],
  ex: [
    { en: '<i class="v">She</i> reads every day.', ru: 'Она читает каждый день.', nb: '«она» не изменилась — she' },
    { en: 'I see <i class="v">her</i>.', ru: 'Я вижу её.', nb: '«она» → «её»: her' },
    { en: 'I gave <i class="v">her</i> a book.', ru: 'Я дал ей книгу.', nb: '«ей» — тоже изменилось' },
    { en: 'I went with <i class="v">her</i>.', ru: 'Я пошёл с ней.', nb: '«ней» — изменилось' }
  ]
},
{
  id: 'p-nom', zone: 'nom', level: 1, idx: 2,
  name: 'Как в словаре: I · he · she · we · they', core: 'I · he · she · we · they + глагол',
  thesis: 'Тот, кто делает, стоит перед глаголом',
  short: 'кто делает',
  fig: {
    rows: [
      { l: 'Русский',    ru: '<b>Она</b> любит кофе.' },
      { l: 'Английский', tr: [['nom','She'],['rest','loves'],['rest','coffee'],['end','.']] },
      { l: 'Русский',    ru: '<b>Они</b> живут в Лондоне.' },
      { l: 'Английский', tr: [['nom','They'],['rest','live'],['rest','in London'],['end','.']] }
    ],
    cap: 'Слово «как в словаре» отвечает на вопрос «кто?». В английском оно стоит перед глаголом.'
  },
  lead: 'Первый набор — слова «как в словаре»: <span class="mono">I, he, she, we, they</span>. Они отвечают на вопрос <b>«кто делает?»</b> и стоят <b>перед глаголом</b>: <span class="mono">She loves coffee</span>. Если по-русски слово не изменилось, берём именно эти.',
  blocks: [
    { kind: 'key', h: 'Подсказка по месту',
      p: 'Тот, кто делает действие, стоит перед глаголом: <span class="mono">He loves…</span> — кто любит? Он. Если местоимение открывает предложение и сразу за ним идёт глагол, это почти всегда <span class="mono">I, he, she, we, they</span>.' },
    { kind: 'plain', h: 'Пять пар «в словаре»',
      p: 'я → <span class="mono">I</span> · он → <span class="mono">he</span> · она → <span class="mono">she</span> · мы → <span class="mono">we</span> · они → <span class="mono">they</span><br>Ещё два слова ведут себя особо и разобраны на отдельной станции: «ты / вы» → <span class="mono">you</span> и «вещь» → <span class="mono">it</span>.' },
    { kind: 'plain', h: 'Местоимение пропускать нельзя',
      p: 'В русском можно сказать «Читаю книгу» — «кто» понятно по окончанию. В английском ячейка «кто» заполнена всегда: <span class="mono no">Read a book</span> → <span class="mono yes">I read a book</span>.<br><a class="goto" href="#s-hero">Про ячейки — на вкладке «Основа» →</a>' },
    { kind: 'plain', h: 'I пишется с большой буквы всегда',
      p: '<span class="mono">I</span> — единственное местоимение, которое пишется с заглавной даже в середине предложения: <span class="mono">Yesterday I called him</span>.' },
    { kind: 'trap', h: 'Ловушка: me или her в роли «кто делает»',
      p: '<span class="mono no">Me like coffee</span> → <span class="mono yes">I like coffee</span><br><span class="mono no">Her works in a bank</span> → <span class="mono yes">She works in a bank</span><br>Проверка по-русски: «меня любит кофе» или «её работает» не скажешь, нужно «я люблю» и «она работает». Слово «как в словаре» — значит, первая форма.' }
  ],
  forms: { p: '<b>She</b> reads. · <b>They</b> live here.', n: '<b>He</b> doesn\'t know. · <b>We</b> aren\'t ready.', q: 'Does <b>she</b> know? · Are <b>they</b> at home?' },
  markers: ['перед глаголом', 'кто делает?', 'I · he · she · we · they', 'начало предложения', 'как в словаре'],
  ex: [
    { en: '<i class="v">I</i> live in Moscow.', ru: 'Я живу в Москве.' },
    { en: '<i class="v">She</i> works in a bank.', ru: 'Она работает в банке.' },
    { en: '<i class="v">We</i> are friends.', ru: 'Мы друзья.', nb: 'глагола нет — ставим be' },
    { en: '<i class="v">They</i> don\'t speak French.', ru: 'Они не говорят по-французски.' }
  ]
},
{
  id: 'p-acc', zone: 'acc', level: 1, idx: 3,
  name: 'Изменилось: me · him · her · us · them', core: 'глагол / предлог + me · him · her · us · them',
  thesis: 'На кого направлено — после глагола или предлога',
  short: 'на кого',
  fig: {
    rows: [
      { l: 'Русский',    ru: 'Я вижу <b>её</b>.' },
      { l: 'Английский', tr: [['nom','I'],['rest','see'],['acc','her'],['end','.']] },
      { l: 'Русский',    ru: 'Я пошёл с <b>ней</b>.' },
      { l: 'Английский', tr: [['nom','I'],['rest','went'],['rest','with'],['acc','her'],['end','.']] }
    ],
    cap: 'Слово после глагола или после предлога называет того, на кого направлено действие. В русском оно изменилось — в английском тоже.'
  },
  lead: 'Второй набор — слова, которые в русском <b>изменились</b>: «меня», «мне», «нас», «её», «им». В английском это <span class="mono">me, him, her, us, them</span>. Они отвечают на вопросы <b>«кого? кому? с кем? о ком?»</b> — то есть называют того, <b>на кого направлено действие</b>.',
  blocks: [
    { kind: 'key', h: 'Подсказка по месту',
      p: 'Тот, на кого направлено действие, стоит <b>после глагола</b> или <b>после маленьких слов</b> <span class="mono">with, for, to, about</span>: <span class="mono">…loves him</span>, <span class="mono">for him</span>, <span class="mono">with him</span>.<br>То есть если местоимение стоит после глагола или после предлога, почти всегда будет форма <span class="mono">me, him, her, us, them</span>.' },
    { kind: 'plain', h: 'Пять пар «изменилось»',
      p: '«меня, мне, мной» → <span class="mono">me</span> · «его, ему, него, ним» → <span class="mono">him</span> · «её, ей, ней» → <span class="mono">her</span> · «нас, нам, нами» → <span class="mono">us</span> · «их, им, них, ими» → <span class="mono">them</span>' },
    { kind: 'plain', h: 'Русские падежи английскому не нужны',
      p: 'Там, где русскому нужны разные формы, английский обходится одной:<br><span class="mono">I see him</span> — вижу кого? · <span class="mono">I gave him a book</span> — дал кому? · <span class="mono">I went with him</span> — с кем? · <span class="mono">I talked about him</span> — о ком?' },
    { kind: 'plain', h: 'Тонкость: «ним» бывает разным',
      p: '«С ним» и «к ним» — одно и то же русское слово, а по-английски разное: <span class="mono">with him</span>, но <span class="mono">to them</span>. Здесь решает смысл: речь об одном человеке или о нескольких.' },
    { kind: 'trap', h: 'Ловушка: первая форма после глагола или предлога',
      p: '<span class="mono no">I see she</span> → <span class="mono yes">I see her</span><br><span class="mono no">He loves I</span> → <span class="mono yes">He loves me</span><br><span class="mono no">with he</span> → <span class="mono yes">with him</span><br>Проверка по-русски: «он любит я» режет слух — нужно «меня». Значит, <span class="mono">me</span>. Предлог ничего не меняет: после <span class="mono">with, for, to, about, from, of, at</span> всегда вторая форма.' }
  ],
  forms: { p: 'I see <b>her</b>. · He called <b>us</b>.', n: 'I don\'t know <b>him</b>.', q: 'Do you know <b>them</b>? · Can you help <b>me</b>?' },
  markers: ['после глагола', 'после with · for · to · about', 'кого? кому? с кем?', 'me · him · her · us · them', 'слово изменилось'],
  ex: [
    { en: 'He loves <i class="v">me</i>.', ru: 'Он любит меня.', nb: '«я» → «меня»: me' },
    { en: 'I see <i class="v">her</i> every day.', ru: 'Я вижу её каждый день.' },
    { en: 'Give <i class="v">him</i> the book.', ru: 'Дай ему книгу.', nb: '«ему» — изменилось' },
    { en: 'We talked about <i class="v">them</i>.', ru: 'Мы говорили о них.', nb: 'после предлога about' }
  ]
},
{
  id: 'p-same', zone: 'same', level: 2, idx: 4,
  name: 'Не меняются: you и it', core: 'you → you · it → it',
  thesis: 'Два слова, у которых одна форма на всё',
  short: 'you · it',
  fig: {
    rows: [
      { l: 'Русский',    ru: '<b>Ты</b> читаешь. · Я вижу <b>тебя</b>.' },
      { l: 'Английский', tr: [['same','You'],['rest','read'],['end','·'],['nom','I'],['rest','see'],['same','you'],['end','.']] },
      { l: 'Русский',    ru: '<b>Она</b> (машина) здесь. · Я вижу <b>её</b>.' },
      { l: 'Английский', tr: [['same','It'],['rest','is here'],['end','·'],['nom','I'],['rest','see'],['same','it'],['end','.']] }
    ],
    cap: 'У you и it форма одна и для «кто делает», и для «на кого направлено» — выбирать не нужно.'
  },
  lead: 'Два слова выпадают из схемы «изменилось — меняется»: <span class="mono">you</span> и <span class="mono">it</span>. В русском у них по нескольку форм, а в английском — одна. Поэтому проверка «изменилось ли слово?» им не нужна.',
  blocks: [
    { kind: 'key', h: 'You: и «ты», и «вы», и «тебя», и «вам»',
      p: '«Ты», «тебя», «тебе», «вы», «вас», «вам» — всё это по-английски <span class="mono">you</span>.<br><span class="mono">You read</span> — ты читаешь / вы читаете · <span class="mono">I see you</span> — вижу тебя / вас · <span class="mono">I called you</span> — позвонил тебе / вам.<br>Отдельного «вежливого вы» в английском нет: разницу между «ты» и «вы» передают тоном и словами, а не местоимением.' },
    { kind: 'plain', h: 'It: всё, что не человек',
      p: 'Стол, идея, письмо, погода — это <span class="mono">it</span>. И «он», и «она», и «оно» из русского превращаются в <span class="mono">it</span>.<br>«Где ключ? Он на столе» → <span class="mono">Where is the key? It is on the table.</span><br>«Я вижу машину. Она красная» → <span class="mono">I see a car. It is red.</span>' },
    { kind: 'trap', h: 'Ловушка: русский род переносить нельзя',
      p: 'По-русски машина «она», стол «он», окно «оно» — это грамматика, а не смысл. Английский родом предметов не интересуется.<br><span class="mono no">I love my car. She is fast.</span> → <span class="mono yes">I love my car. It is fast.</span><br><span class="mono no">I can\'t find the book. Where is her?</span> → <span class="mono yes">Where is it?</span><br>Для предметов he / she / him / her не годятся.' },
    { kind: 'plain', h: 'Исключение: животные с именами',
      p: 'Если у животного есть имя, для хозяина оно почти человек — и говорят <span class="mono">he</span> или <span class="mono">she</span>: <span class="mono">This is Murka. She is two.</span> Безымянное животное — <span class="mono">it</span>.' },
    { kind: 'plain', h: 'It без «он», «она», «оно»',
      p: '«Холодно», «Уже поздно» — в русском нет даже местоимения, английский подставляет <span class="mono">it</span>: <span class="mono">It is cold</span>, <span class="mono">It is late</span>. Это то же правило с вкладки «Основа»: ячейка «кто» заполнена всегда.' }
  ],
  forms: { p: '<b>You</b> read. · I see <b>it</b>.', n: '<b>It</b> isn\'t here. · I don\'t see <b>you</b>.', q: 'Do <b>you</b> know <b>it</b>?' },
  markers: ['ты · вы → you', 'тебя · вас · вам → you', 'вещь → it', 'род не переносится', 'погода → it', 'есть имя → he / she'],
  ex: [
    { en: '<i class="v">You</i> are right.', ru: 'Ты прав. / Вы правы.', nb: 'один you на «ты» и «вы»' },
    { en: 'I called <i class="v">you</i> yesterday.', ru: 'Я звонил вам вчера.', nb: '«вам» — всё равно you' },
    { en: 'Where is the key? <i class="v">It</i> is on the table.', ru: 'Где ключ? Он на столе.', nb: 'вещь — it, хотя по-русски «он»' },
    { en: 'I love my car. <i class="v">It</i> is very fast.', ru: 'Я люблю свою машину. Она очень быстрая.', nb: 'машина — «она», но it' }
  ]
},
{
  id: 'p-pair', zone: 'nom', level: 2, idx: 5,
  name: 'Двое в одном месте', core: 'Tom and I · Tom and me',
  thesis: 'Вычеркните второго и проверьте',
  short: 'двое',
  fig: {
    rows: [
      { l: 'Русский',    ru: '<b>Том и я</b> пошли в кино.' },
      { l: 'Английский', tr: [['rest','Tom'],['rest','and'],['nom','I'],['rest','went'],['rest','to the cinema'],['end','.']] },
      { l: 'Русский',    ru: 'Она позвонила <b>Тому и мне</b>.' },
      { l: 'Английский', tr: [['nom','She'],['rest','called'],['rest','Tom'],['rest','and'],['acc','me'],['end','.']] }
    ],
    cap: 'Рядом с чужим именем местоимение подчиняется тем же правилам, что и в одиночку.'
  },
  lead: 'Когда рядом с местоимением стоит ещё чьё-то имя — <span class="mono">Tom and I</span>, <span class="mono">my wife and me</span> — легко запутаться. Правило при этом не меняется: <b>изменилось ли русское слово?</b> Имя второго человека на выбор не влияет.',
  blocks: [
    { kind: 'key', h: 'Вычеркните второго',
      p: 'Уберите второго человека и посмотрите, что останется.<br><span class="mono">Tom and ___ went to the cinema.</span> Без Тома: «___ пошёл» → <span class="mono">I went</span>. Значит, <span class="mono">Tom and I went</span>.<br><span class="mono">She called Tom and ___.</span> Без Тома: «позвонила ___» → <span class="mono">called me</span>. Значит, <span class="mono">Tom and me</span>.' },
    { kind: 'trap', h: 'Ловушка: «me and Tom» в роли «кто делает»',
      p: '<span class="mono no">Me and Tom went to the cinema</span> → <span class="mono yes">Tom and I went to the cinema</span><br>По-русски «Том и я» — слово «я» не изменилось, значит, остаётся <span class="mono">I</span>. В живой речи «Me and Tom…» слышно часто, но в школьном и деловом английском это считается ошибкой.' },
    { kind: 'trap', h: 'Ловушка: перебор правильности',
      p: 'Кто выучил, что «me and Tom» плохо, начинает ставить <span class="mono">I</span> везде: <span class="mono no">He gave it to Tom and I</span> → <span class="mono yes">He gave it to Tom and me</span>.<br>После глагола и предлога — вторая форма, даже если рядом другой человек.' },
    { kind: 'plain', h: 'Вежливый порядок',
      p: 'По-английски принято называть себя последним: <span class="mono">Tom and I</span>, <span class="mono">my wife and me</span>, а не <span class="mono">I and Tom</span>. Это правило вежливости, а не грамматики: фраза с <span class="mono">I and Tom</span> понятна, но звучит невежливо.' }
  ],
  forms: { p: '<b>Tom and I</b> went home.', n: '<b>My wife and I</b> don\'t smoke.', q: 'Did she call <b>Tom and me</b>?' },
  markers: ['Tom and I', 'Tom and me', 'вычеркнуть второго', 'my wife and me', 'себя — последним'],
  ex: [
    { en: '<i class="v">Tom and I</i> went to the cinema.', ru: 'Том и я ходили в кино.' },
    { en: 'He invited <i class="v">my wife and me</i>.', ru: 'Он пригласил мою жену и меня.' },
    { en: 'This is between <i class="v">you and me</i>.', ru: 'Это между нами.', nb: 'после предлога between — me' },
    { en: 'Anna and <i class="v">he</i> work together.', ru: 'Анна и он работают вместе.', nb: '«он» не изменилось — he' }
  ]
},
{
  id: 'p-ru', zone: 'acc', level: 2, idx: 6,
  name: 'Когда русский подводит', core: 'у неё есть · мне нужно · ему нравится',
  thesis: 'Проверяйте смысл, а не слова',
  short: 'русский подводит',
  fig: {
    rows: [
      { l: 'Русский',    ru: 'У <b>неё</b> есть машина.' },
      { l: 'Английский', tr: [['nom','She'],['rest','has'],['rest','a car'],['end','.']] },
      { l: 'Русский',    ru: '<b>Мне</b> нужна <b>она</b>.' },
      { l: 'Английский', tr: [['nom','I'],['rest','need'],['acc','her'],['end','.']] },
      { l: 'Русский',    ru: '<b>Ему</b> нравится <b>она</b>.' },
      { l: 'Английский', tr: [['nom','He'],['rest','likes'],['acc','her'],['end','.']] }
    ],
    cap: 'В русском изменяется то слово, которое стоит не на «делающем» месте. Английский смотрит на то, кто на самом деле делает.'
  },
  lead: 'Проверка «изменилось ли русское слово?» работает, пока английское предложение построено так же, как русское: «Я вижу её» → <span class="mono">I see her</span>. Но у некоторых русских фраз <b>другое устройство</b>: человек, который чувствует, нуждается или владеет, стоит в них в изменённой форме. В английском он всё равно «тот, кто делает» — и это <span class="mono">I, he, she</span>.',
  blocks: [
    { kind: 'key', h: 'Как поступить',
      p: 'Сначала спросите себя: <b>кто в английском предложении действует?</b> Того и ставим перед глаголом — в форме <span class="mono">I / he / she / we / they</span>. Всё, что стоит после глагола, получает вторую форму.<br>Если сомневаетесь, держите под рукой подсказку по месту: перед глаголом — первая форма, после глагола или предлога — вторая.' },
    { kind: 'plain', h: 'У меня есть · у неё есть',
      p: '«У неё есть машина»: «неё» изменилось, но по-английски она просто <i>имеет</i> машину — <span class="mono">She has a car</span>.<br>«У нас нет времени» → <span class="mono">We don\'t have time</span>. «У них большой дом» → <span class="mono">They have a big house</span>.' },
    { kind: 'plain', h: 'Мне нужно · ему хочется',
      p: '«Мне нужна помощь» → <span class="mono">I need help</span>. «Ей нужно идти» → <span class="mono">She needs to go</span>. «Ему хочется кофе» → <span class="mono">He wants coffee</span>. «Мне кажется» → <span class="mono">I think</span>.' },
    { kind: 'trap', h: 'Нравится: русский и английский меняются местами',
      p: '«Он мне нравится»: по-русски «он» не изменилось, а «мне» изменилось. Проверка подсказывает <span class="mono">He likes me</span>, но так получится «я ему нравлюсь». Русский глагол «нравиться» устроен наоборот: действует тот, кто нравится. Английское <span class="mono">like</span> — действие того, кому нравится:<br>«Он мне нравится» → <span class="mono yes">I like him</span> · «Ей нравится он» → <span class="mono yes">She likes him</span>' },
    { kind: 'plain', h: 'Это я · это она',
      p: '«Кто там? — Это я». По-русски «я» стоит как в словаре, а по-английски в живой речи ответят <span class="mono">It\'s me</span>. Так же <span class="mono">It\'s her</span>, <span class="mono">That\'s him</span> и в коротком ответе <span class="mono">Who wants tea? — Me!</span><br>Формально правильно <span class="mono">It is I</span>, но звучит книжно и почти не встречается. Это одно из немногих мест, где после глагола <span class="mono">be</span> ставят вторую форму.' },
    { kind: 'plain', h: 'Что запомнить',
      p: 'Русская проверка — не плохая: в обычных предложениях («вижу её», «дал ей», «с ней») она срабатывает мгновенно. Просто помните, где она сбивается — там, где русская фраза построена иначе, чем английская, — и тогда выручит подсказка по месту.' }
  ],
  forms: { p: '<b>She</b> has a car. · I like <b>him</b>.', n: '<b>She</b> doesn\'t like <b>him</b>.', q: 'Do <b>you</b> like <b>her</b>?' },
  markers: ['у неё есть', 'мне нужно', 'ему нравится', 'ей хочется', 'это я → It\'s me', 'сначала: кто действует?'],
  ex: [
    { en: '<i class="v">She</i> has a car.', ru: 'У неё есть машина.', nb: '«неё» изменилось, но она — тот, кто имеет' },
    { en: '<i class="v">I</i> like <i class="v">him</i>.', ru: 'Он мне нравится.', nb: '«он» и «мне» поменялись ролями' },
    { en: '<i class="v">She</i> needs <i class="v">us</i>.', ru: 'Мы ей нужны.', nb: 'нуждается она — она и стоит перед глаголом' },
    { en: 'Who is it? — It\'s <i class="v">me</i>.', ru: 'Кто там? — Это я.', nb: 'после be в живой речи — me' }
  ]
},
{
  id: 'p-poss', zone: 'pos', level: 3, idx: 7,
  name: 'Чей? my · your · his · her · its · our · their', core: 'my · your · his · her · its · our · their + существительное',
  thesis: 'Стоит перед существительным и отвечает на «чей?»',
  short: 'чей?',
  fig: {
    rows: [
      { l: 'Русский',    ru: '<b>Моя</b> мама · <b>мой</b> дом · <b>моё</b> окно' },
      { l: 'Английский', tr: [['pos','my'],['rest','mother'],['end','·'],['pos','my'],['rest','house'],['end','·'],['pos','my'],['rest','window']] },
      { l: 'Русский',    ru: '<b>Её</b> книга · <b>его</b> книга · <b>их</b> книга' },
      { l: 'Английский', tr: [['pos','her'],['rest','book'],['end','·'],['pos','his'],['rest','book'],['end','·'],['pos','their'],['rest','book']] }
    ],
    cap: 'Русское слово меняется по роду предмета — мой, моя, моё. Английское зависит только от владельца: my всегда остаётся my.'
  },
  lead: 'Отдельная тема — не «кто» и не «кого», а <b>«чей?»</b>. Это третий набор слов: <span class="mono">my, your, his, her, its, our, their</span>. Они стоят перед существительным: <span class="mono">my book</span>, <span class="mono">her friend</span>. Смешивать их с <span class="mono">me, him, her</span> не нужно: вопрос здесь другой.',
  blocks: [
    { kind: 'key', h: 'Семь слов — на семерых владельцев',
      p: 'я → <span class="mono">my</span> · ты / вы → <span class="mono">your</span> · он → <span class="mono">his</span> · она → <span class="mono">her</span> · вещь → <span class="mono">its</span> · мы → <span class="mono">our</span> · они → <span class="mono">their</span>' },
    { kind: 'plain', h: 'Что меняется в русском, но не в английском',
      p: 'По-русски «мой» меняется по роду и числу: мой дом, моя мама, моё окно, мои друзья. По-английски выбор зависит только от того, <b>кому принадлежит</b>, а не от того, что принадлежит: <span class="mono">my house, my mother, my window, my friends</span>.' },
    { kind: 'plain', h: 'Как проверить',
      p: 'Задайте вопрос «чей?». Если на него отвечает местоимение, это третий набор.<br>«<b>Чья</b> книга? — Её» → <span class="mono">her book</span>. «<b>Чей</b> дом? — Наш» → <span class="mono">our house</span>.' },
    { kind: 'trap', h: 'Ловушка: me или him перед существительным',
      p: '<span class="mono no">me book</span>, <span class="mono no">him car</span> → <span class="mono yes">my book</span>, <span class="mono yes">his car</span>.<br>Перед существительным, которому кто-то принадлежит, ставят третий набор.' },
    { kind: 'trap', h: 'Ловушка: its и it\'s',
      p: '<span class="mono">its</span> отвечает на «чей?»: <span class="mono">The cat is washing its paws</span>. А <span class="mono">it\'s</span> — сокращение от <span class="mono">it is</span>: <span class="mono">It\'s cold</span>. Апостроф ставится только там, где можно развернуть фразу в «it is» или «it has».' },
    { kind: 'plain', h: 'Когда существительного нет: mine, yours',
      p: 'Если книги в предложении уже нет — «Эта книга моя», — вместо <span class="mono">my</span> ставят <span class="mono">mine</span>: <span class="mono">This book is mine</span>. Остальные: <span class="mono">yours, his, hers, ours, theirs</span>. У <span class="mono">his</span> форма та же.' }
  ],
  forms: { p: 'This is <b>my</b> book. · <b>Their</b> house is big.', n: 'It isn\'t <b>our</b> car.', q: 'Is this <b>your</b> bag? · Where is <b>her</b> phone?' },
  markers: ['чей?', 'перед существительным', 'my · your · his · her · its · our · their', 'мой · моя · моё → my', 'mine · yours — без существительного'],
  ex: [
    { en: 'This is <i class="v">my</i> mother.', ru: 'Это моя мама.', nb: 'мой · моя · моё — всегда my' },
    { en: '<i class="v">Her</i> brother lives in Berlin.', ru: 'Её брат живёт в Берлине.', nb: '«её» отвечает на «чей?»' },
    { en: 'We love <i class="v">our</i> city.', ru: 'Мы любим наш город.' },
    { en: 'The cat is washing <i class="v">its</i> paws.', ru: 'Кот умывает лапы.', nb: 'владелец — кот, поэтому its' }
  ]
},
{
  id: 'p-his', zone: 'pos', level: 3, idx: 8,
  name: 'Его, её, их: him или his', core: 'him / his · her / her · them / their',
  thesis: 'Один вопрос решает: «кого?» или «чей?»',
  short: 'его · её · их',
  fig: {
    rows: [
      { l: 'Русский',    ru: 'Я вижу <b>его</b> (кого?) · это <b>его</b> книга (чья?)' },
      { l: 'Английский', tr: [['nom','I'],['rest','see'],['acc','him'],['end','·'],['rest','this is'],['pos','his'],['rest','book']] },
      { l: 'Русский',    ru: 'Я вижу <b>её</b> (кого?) · это <b>её</b> книга (чья?)' },
      { l: 'Английский', tr: [['nom','I'],['rest','see'],['acc','her'],['end','·'],['rest','this is'],['pos','her'],['rest','book']] },
      { l: 'Русский',    ru: 'Я вижу <b>их</b> (кого?) · это <b>их</b> книга (чья?)' },
      { l: 'Английский', tr: [['nom','I'],['rest','see'],['acc','them'],['end','·'],['rest','this is'],['pos','their'],['rest','book']] }
    ],
    cap: 'Русское «его» одно, а английских слов два: «кого?» — him, «чей?» — his. У «её» оба английских слова совпали.'
  },
  lead: 'В русском одно слово «его» работает в двух ролях: «Я вижу <b>его</b>» и «<b>его</b> книга». В английском для этих ролей <b>разные слова</b>: <span class="mono">him</span> и <span class="mono">his</span>. Чтобы не ошибиться, достаточно одного вопроса.',
  blocks: [
    { kind: 'key', h: 'Вопрос «кого?» или «чей?»',
      p: 'Задайте вопрос к русскому слову.<br>«Я вижу его» → вижу <b>кого</b>? → <span class="mono">I see <b>him</b></span>.<br>«Это его книга» → <b>чья</b> книга? → <span class="mono">This is <b>his</b> book</span>.' },
    { kind: 'plain', h: 'Три пары',
      p: 'он: «его» (кого?) → <span class="mono">him</span> · «его» (чей?) → <span class="mono">his</span><br>она: «её» (кого?) → <span class="mono">her</span> · «её» (чей?) → <span class="mono">her</span> — <i>совпало</i><br>они: «их» (кого?) → <span class="mono">them</span> · «их» (чей?) → <span class="mono">their</span>' },
    { kind: 'plain', h: 'Её — самая удобная пара',
      p: '«Её книга» — <span class="mono">her book</span>, как и «вижу её» — <span class="mono">I see her</span>: слово одно и по-русски, и по-английски. А вот «его книга» — не <span class="mono">him book</span>, а <span class="mono">his book</span>.' },
    { kind: 'trap', h: 'Ловушка: him book и I see his',
      p: '<span class="mono no">him book</span>, <span class="mono no">them house</span> → <span class="mono yes">his book</span>, <span class="mono yes">their house</span><br>И наоборот: <span class="mono no">I see his</span> → <span class="mono yes">I see him</span> — вопрос «кого?» требует him.' },
    { kind: 'plain', h: '«Свой» зависит от того, кто действует',
      p: 'Русское «свой» значит «принадлежащий тому, кто делает». По-английски слова «свой» нет, и берём слово для того, кто действует:<br>«Я люблю <b>свою</b> жену» → <span class="mono">I love <b>my</b> wife</span><br>«Он любит <b>свою</b> жену» → <span class="mono">He loves <b>his</b> wife</span><br>«Они любят <b>свой</b> город» → <span class="mono">They love <b>their</b> city</span>' }
  ],
  forms: { p: 'I see <b>him</b>. · This is <b>his</b> book.', n: 'I don\'t see <b>them</b>. · It isn\'t <b>their</b> house.', q: 'Do you know <b>him</b>? · Is it <b>his</b> bag?' },
  markers: ['кого? → him · her · them', 'чей? → his · her · their', 'его: him или his', 'её: her в обеих ролях', 'их: them или their', 'свой → по тому, кто действует'],
  ex: [
    { en: 'I know <i class="v">him</i>.', ru: 'Я знаю его.', nb: 'кого? → him' },
    { en: 'I know <i class="v">his</i> sister.', ru: 'Я знаю его сестру.', nb: 'чью? → his' },
    { en: 'We often visit <i class="v">them</i>.', ru: 'Мы часто навещаем их.', nb: 'кого? → them' },
    { en: 'We often visit <i class="v">their</i> house.', ru: 'Мы часто бываем в их доме.', nb: 'чей? → their' },
    { en: 'She loves <i class="v">her</i> job.', ru: 'Она любит свою работу.', nb: '«свою» — по тому, кто действует' }
  ]
}
];

/* ── дуэли ── */
const PDUELS = [
  {
    q: 'She или her? — изменилось ли слово',
    a: { z: 'nom', n: 'She · не изменилось', tr: [['nom','She'],['rest','reads'],['end','.']],
         en: '<i class="v">She</i> reads.', ru: 'Она читает.', why: '«Она» осталась как в словаре — значит, she. Она стоит перед глаголом: она делает.' },
    b: { z: 'acc', n: 'Her · изменилось', tr: [['nom','I'],['rest','see'],['acc','her'],['end','.']],
         en: 'I see <i class="v">her</i>.', ru: 'Я вижу её.', why: '«Она» превратилась в «её». Изменилось в русском — изменилось и в английском. Стоит после глагола.' },
    r: 'Сравните русские слова: «она» и «её». Если слово то же, что в словаре, — she. Если другое — her.'
  },
  {
    q: 'Him или his? — кого или чей',
    a: { z: 'acc', n: 'Him · кого?', tr: [['nom','I'],['rest','know'],['acc','him'],['end','.']],
         en: 'I know <i class="v">him</i>.', ru: 'Я знаю его.', why: 'Знаю кого? Его. Слово заменяет человека и стоит после глагола.' },
    b: { z: 'pos', n: 'His · чей?', tr: [['nom','I'],['rest','know'],['pos','his'],['rest','sister'],['end','.']],
         en: 'I know <i class="v">his</i> sister.', ru: 'Я знаю его сестру.', why: 'Чью сестру? Его. Слово отвечает на «чей?» и стоит перед существительным.' },
    r: 'Русское «его» одно, поэтому задайте вопрос: «кого?» — him, «чей?» — his.'
  },
  {
    q: 'Tom and I или Tom and me?',
    a: { z: 'nom', n: 'Tom and I · они делают', tr: [['rest','Tom'],['rest','and'],['nom','I'],['rest','called'],['acc','her'],['end','.']],
         en: '<i class="v">Tom and I</i> called her.', ru: 'Том и я позвонили ей.', why: 'Вычеркните Тома: «я позвонил» → I. Значит, Tom and I.' },
    b: { z: 'acc', n: 'Tom and me · им звонят', tr: [['nom','She'],['rest','called'],['rest','Tom'],['rest','and'],['acc','me'],['end','.']],
         en: 'She called <i class="v">Tom and me</i>.', ru: 'Она позвонила Тому и мне.', why: 'Вычеркните Тома: «позвонила мне» → me. Значит, Tom and me.' },
    r: 'Уберите второго человека и посмотрите, что осталось: I called или called me. Имя соседа выбор не меняет.'
  },
  {
    q: 'Her или it? — человек или вещь',
    a: { z: 'acc', n: 'Her · человек', tr: [['nom','I'],['rest','can\'t find'],['acc','her'],['end','.']],
         en: 'Where is Anna? I can\'t find <i class="v">her</i>.', ru: 'Где Анна? Я не могу найти её.', why: 'Анна — человек, русское «её» превращается в her.' },
    b: { z: 'same', n: 'It · вещь', tr: [['nom','I'],['rest','can\'t find'],['same','it'],['end','.']],
         en: 'Where is the key? I can\'t find <i class="v">it</i>.', ru: 'Где ключ? Я не могу найти его.', why: 'Ключ — вещь. По-русски «его», но предметы по-английски — только it.' },
    r: 'Спросите себя: человек это или вещь? Вещь — всегда it, какой бы род у неё ни был в русском.'
  },
  {
    q: 'I like him или He likes me?',
    a: { z: 'nom', n: 'I like him · он мне нравится', tr: [['nom','I'],['rest','like'],['acc','him'],['end','.']],
         en: '<i class="v">I</i> like <i class="v">him</i>.', ru: 'Он мне нравится.', why: 'Чувствует тот, кому нравится, — это «я». «Я» стоит перед like, значит I; тот, кто нравится, стоит после — him.' },
    b: { z: 'acc', n: 'He likes me · я ему нравлюсь', tr: [['nom','He'],['rest','likes'],['acc','me'],['end','.']],
         en: '<i class="v">He</i> likes <i class="v">me</i>.', ru: 'Я ему нравлюсь.', why: 'Здесь чувствует он: он стоит перед likes, значит he. «Я» оказалось после глагола — me.' },
    r: 'Не переводите по словам: «нравится» в русском работает наоборот. Спросите, кто чувствует, — он и стоит перед глаголом.'
  }
];
