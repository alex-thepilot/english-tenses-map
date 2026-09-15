/* ═══════════════════════════════════════════════════════════
   ОСНОВА · КАК СТРОИТСЯ ПРЕДЛОЖЕНИЕ
   Цвет кодирует роль слова в предложении:
   перивинкл — «прыгает вперёд» (be, do, will, can),
   бирюза — смысловой глагол, стоит на месте,
   охра — вопросительное слово, всегда первое.
   Ячейки: [роль, текст, флаги] — флаги: jump, ghost, bad.
   ═══════════════════════════════════════════════════════════ */

/* ── конструктор: 3 вида × 5 типов, из этих же данных собирается шпаргалка ── */
const BUILD_KINDS = [
  { key: 'be',  t: 'Глагола нет',  i: '«Ты дома»',            note: 'В русском глагола нет — его место занимает <b>be</b>. Он сам выходит вперёд в вопросе и сам принимает not.' },
  { key: 'do',  t: 'Есть глагол',  i: '«Ты любишь кофе»',     note: 'Глагол в русском есть — be не нужен. Для вопроса и отрицания зовём помощника <b>do</b>: в утверждении он спрятан внутри глагола.' },
  { key: 'can', t: 'Модальный',    i: '«Ты умеешь танцевать»', note: 'Модальный глагол <b>сам себе помощник</b>: вперёд выходит сам, not принимает сам, do ему не нужен.' }
];

const BUILD_TYPES = [
  { key: 'pos', t: 'Утверждение',       sch: 'кто → глагол → остальное',                note: 'Базовый порядок: сначала кто, потом глагол.' },
  { key: 'neg', t: 'Отрицание',         sch: 'кто → помощник + not → глагол',           note: 'Not цепляется к помощнику, а не к смысловому глаголу.' },
  { key: 'q',   t: 'Вопрос',            sch: 'помощник → кто → глагол ?',               note: 'Помощник встаёт первым: вопрос задаёт порядок слов, а не интонация.' },
  { key: 'wh',  t: 'Вопрос со словом',  sch: 'вопр. слово → помощник → кто → глагол ?', note: 'Вопросительное слово встаёт перед всей схемой вопроса.' },
  { key: 'who', t: 'Вопрос «кто?»',     sch: 'вопр. слово (= кто) → глагол ?',          note: 'Спрашиваем про того, кто действует: вопросительное слово само занимает место «кто», и помощник не нужен.' }
];

const BUILD = {
  be: {
    pos: { ru: 'Ты дома.',         s: 'кто → be → остальное',                 tr: [['subj','You'],['aux','are'],['rest','at home'],['end','.']] },
    neg: { ru: 'Ты не дома.',      s: 'кто → be + not → остальное',           tr: [['subj','You'],['aux','aren\'t'],['rest','at home'],['end','.']] },
    q:   { ru: 'Ты дома?',         s: 'be → кто → остальное ?',               tr: [['aux','Are','jump'],['subj','you'],['rest','at home'],['end','?']] },
    wh:  { ru: 'Где ты?',          s: 'вопр. слово → be → кто ?',             tr: [['q','Where'],['aux','are','jump'],['subj','you'],['end','?']] },
    who: { ru: 'Кто дома?',        s: 'вопр. слово (= кто) → be → остальное ?', tr: [['q','Who'],['aux','is'],['rest','at home'],['end','?']] }
  },
  do: {
    pos: { ru: 'Ты любишь кофе.',     s: 'кто → (do) → глагол → остальное',        tr: [['subj','You'],['aux','(do)','ghost'],['verb','like'],['rest','coffee'],['end','.']] },
    neg: { ru: 'Ты не любишь кофе.',  s: 'кто → do + not → глагол → остальное',    tr: [['subj','You'],['aux','don\'t'],['verb','like'],['rest','coffee'],['end','.']] },
    q:   { ru: 'Ты любишь кофе?',     s: 'do → кто → глагол → остальное ?',        tr: [['aux','Do','jump'],['subj','you'],['verb','like'],['rest','coffee'],['end','?']] },
    wh:  { ru: 'Что ты любишь?',      s: 'вопр. слово → do → кто → глагол ?',      tr: [['q','What'],['aux','do','jump'],['subj','you'],['verb','like'],['end','?']] },
    who: { ru: 'Кто любит кофе?',     s: 'вопр. слово (= кто) → глагол → остальное ?', tr: [['q','Who'],['verb','likes'],['rest','coffee'],['end','?']] }
  },
  can: {
    pos: { ru: 'Ты умеешь танцевать.',     s: 'кто → can → глагол',              tr: [['subj','You'],['aux','can'],['verb','dance'],['end','.']] },
    neg: { ru: 'Ты не умеешь танцевать.',  s: 'кто → can + not → глагол',        tr: [['subj','You'],['aux','can\'t'],['verb','dance'],['end','.']] },
    q:   { ru: 'Ты умеешь танцевать?',     s: 'can → кто → глагол ?',            tr: [['aux','Can','jump'],['subj','you'],['verb','dance'],['end','?']] },
    wh:  { ru: 'Что ты умеешь делать?',    s: 'вопр. слово → can → кто → глагол ?', tr: [['q','What'],['aux','can','jump'],['subj','you'],['verb','do'],['end','?']] },
    who: { ru: 'Кто умеет танцевать?',     s: 'вопр. слово (= кто) → can → глагол ?', tr: [['q','Who'],['aux','can'],['verb','dance'],['end','?']] }
  }
};

const ROLES = [
  { r: 'q',    t: 'Вопросительное слово', i: 'всегда первое' },
  { r: 'aux',  t: 'Помощник: be, do, will, can', i: 'умеет выходить вперёд' },
  { r: 'subj', t: 'Кто действует', i: '' },
  { r: 'verb', t: 'Смысловой глагол', i: 'стоит на месте' },
  { r: 'rest', t: 'Остальное', i: '' }
];

/* ── уровни маршрута ── */
const SLEVELS = [
  { n: 1, title: 'Утверждение', code: 'кто → глагол → остальное', ru: 'Главное правило',
    txt: 'Первый этаж — само предложение. Здесь живёт главное правило: <b>в английском глагол есть всегда</b>. Нет глагола в русском — ставим be. Есть — берём его и ставим в нужное время. Плюс порядок слов, который в английском не гуляет.' },
  { n: 2, title: 'Вопрос', code: 'помощник → кто → глагол ?', ru: 'Меняем порядок',
    txt: 'Второй этаж. Английский задаёт вопрос не интонацией, а <b>порядком слов</b>: помощник выходит вперёд, а вопросительное слово — ещё раньше. И «вопросительное слово» запросто бывает длиной в три слова.' },
  { n: 3, title: 'Отрицание и модальные', code: 'not · can · must', ru: 'Помощник и исключение',
    txt: 'Верхний этаж. Отрицание зовёт того же помощника, что и вопрос. А модальные глаголы — исключение из всех правил выше: они <b>сами себе помощники</b>.' }
];

/* ── станции ── */
const S = [
{
  id: 's-be', zone: 'jump', level: 1, idx: 1,
  name: 'Нет глагола → to be', core: 'am / is / are · was / were · will be',
  thesis: 'Пустую ячейку занимает be',
  short: 'be',
  fig: {
    rows: [
      { l: 'Русский', ru: 'Я <span class="sgap">?</span> Саша.' },
      { l: 'Английский', tr: [['subj','I'],['aux','am','jump'],['rest','Sasha'],['end','.']] }
    ],
    cap: 'В русском между «я» и «Саша» пусто. В английском ячейка под глагол пустой не бывает — туда встаёт be.'
  },
  lead: 'Главное, незыблемое правило английского: <b>в предложении всегда есть глагол</b>. Русский спокойно обходится без него — «Я Саша», «Он дома», «Мне холодно». Английский так не умеет, и пустое место занимает глагол <span class="mono">to be</span> — «быть, являться, находиться».',
  blocks: [
    { kind: 'key', h: 'Как понять, что нужен be',
      p: 'Поищите в русском предложении действие. «Я Саша» — что я делаю? Ничего, я просто есть. Действия нет — ставим be: <span class="mono">I am Sasha</span>.<br>«Я читаю» — действие есть, be не нужен: <span class="mono">I read</span>.' },
    { kind: 'plain', h: 'Какую форму выбрать',
      p: '<b>Сейчас:</b> <span class="mono">I am</span> · <span class="mono">he / she / it is</span> · <span class="mono">we / you / they are</span><br><b>Раньше:</b> <span class="mono">I / he / she / it was</span> · <span class="mono">we / you / they were</span><br><b>Потом:</b> <span class="mono">will be</span> для всех.<br>В прошедшем и будущем русский вспоминает про «быть»: «я <b>был</b> дома», «я <b>буду</b> дома». Это тот же самый be — <span class="mono">I was at home</span>, <span class="mono">I will be at home</span>.' },
    { kind: 'plain', h: 'Где русский прячет be',
      p: 'Имя и профессия: «Я врач» → <span class="mono">I am a doctor</span><br>Возраст: «Мне 25» → <span class="mono">I am 25</span><br>Место: «Он дома» → <span class="mono">He is at home</span><br>Состояние: «Мне холодно» → <span class="mono">I am cold</span><br>Качество: «Машина красная» → <span class="mono">The car is red</span>' },
    { kind: 'trap', h: 'Ловушка: «у меня есть» — это не be',
      p: 'Если в русском речь о том, что у кого-то что-то есть, английский берёт глагол <span class="mono">have</span> — «иметь».<br>«У меня есть машина» → <span class="mono yes">I have a car</span>, а не <span class="mono no">I am a car</span><br>Сравните: «Мне 25 лет» — это be: <span class="mono yes">I am 25</span>, а не <span class="mono no">I have 25 years</span>.' },
    { kind: 'plain', h: 'Тонкость: когда в русском нет даже «кто»',
      p: '«Холодно», «Уже поздно» — в русском нет ни глагола, ни того, о ком речь. Английский подставит оба: <span class="mono">It is cold</span> · <span class="mono">It is late</span>.<br>А если сообщаем, что где-то что-то есть — «В комнате стол», — предложение начинается с <span class="mono">there is / there are</span>: <span class="mono">There is a table in the room</span>.' },
    { kind: 'plain', h: 'Тонкость: русский глагол, который становится be',
      p: '«Я боюсь», «Он опаздывает», «Я интересуюсь» — по-русски это глаголы, а по-английски <b>состояния</b>: <span class="mono">I am afraid</span> · <span class="mono">He is late</span> · <span class="mono">I am interested</span>. Правило не нарушено: глагол в предложении есть, просто это be.' }
  ],
  forms: { p: 'I <b>am</b> Sasha. · She <b>is</b> a doctor.', n: 'I <b>am not</b> Sasha. · They <b>aren\'t</b> at home.', q: '<b>Are</b> you Sasha? · <b>Is</b> it cold?' },
  markers: ['am / is / are', 'was / were', 'will be', 'нет действия', '«был» / «буду»', 'возраст · место · состояние'],
  ex: [
    { en: 'I <i class="v">am</i> Sasha.', ru: 'Я Саша.', nb: 'глагола нет — ставим be' },
    { en: 'She <i class="v">is</i> 25.', ru: 'Ей 25 лет.', nb: 'возраст — тоже через be, а не have' },
    { en: 'We <i class="v">were</i> at home yesterday.', ru: 'Вчера мы были дома.', nb: 'прошедшее: were' },
    { en: 'It <i class="v">is</i> cold today.', ru: 'Сегодня холодно.', nb: 'нет ни глагола, ни «кто» — английский подставит оба' }
  ]
},
{
  id: 's-verb', zone: 'stay', level: 1, idx: 2,
  name: 'Есть глагол → время', core: 'кто + глагол в нужном времени',
  thesis: 'Если глагол есть — be не нужен',
  short: 'глагол',
  fig: {
    rows: [
      { l: 'Русский', ru: 'Я <b>люблю</b> кофе.' },
      { l: 'Верно', tr: [['subj','I'],['verb','like'],['rest','coffee'],['end','.']] },
      { l: 'Ошибка', tr: [['subj','I'],['aux','am','bad'],['verb','like'],['rest','coffee'],['end','.']] }
    ],
    cap: 'Глагол в русском уже есть — значит, ячейка занята. Второй «быть» туда не встаёт.'
  },
  lead: 'Вторая ветка главного правила. Если в русском предложении есть действие — «я люблю», «она работает», «мы поехали», — английский берёт этот глагол и ставит его в <b>нужное время</b>. Как выбрать время — отдельная большая тема, для неё есть своя вкладка.',
  blocks: [
    { kind: 'key', h: 'Глагол занял ячейку — be уже не нужен',
      p: 'В одной ячейке помещается только один глагол. Раз там уже стоит <span class="mono">like</span>, для <span class="mono">am</span> места не остаётся.<br><span class="mono no">I am like coffee</span> → <span class="mono yes">I like coffee</span><br><span class="mono no">She is work in a bank</span> → <span class="mono yes">She works in a bank</span><br>Это самая частая ошибка русскоговорящих — стоит проверять её в каждом предложении.' },
    { kind: 'plain', h: 'А как же I am working?',
      p: 'Не путайте с Continuous. Там <span class="mono">am</span> работает помощником времени, и смысловой глагол обязательно стоит с <span class="mono">-ing</span>: <span class="mono">I am working</span> — «я работаю прямо сейчас». Голый глагол после am невозможен: <span class="mono no">I am work</span>.' },
    { kind: 'plain', h: 'Форма глагола зависит от времени',
      p: '«Я работаю / работал / буду работать» → <span class="mono">I work / worked / will work</span>. Какое время выбрать по смыслу, разбираем дальше — на вкладке «Времена».<br><a class="goto" href="#t-hero">Перейти к временам →</a>' }
  ],
  forms: { p: 'I <b>like</b> coffee. · She <b>works</b> here.', n: 'I <b>don\'t like</b> coffee.', q: '<b>Do</b> you <b>like</b> coffee?' },
  markers: ['есть действие', 'люблю · работаю · еду', 'глагол → время', 'без am / is / are'],
  ex: [
    { en: 'I <i class="v">like</i> coffee.', ru: 'Я люблю кофе.', nb: 'глагол есть — be не нужен' },
    { en: 'She <i class="v">works</i> in a bank.', ru: 'Она работает в банке.' },
    { en: 'We <i class="v">went</i> to the cinema.', ru: 'Мы ходили в кино.', nb: 'прошедшее время' },
    { en: 'They <i class="v">are playing</i> football now.', ru: 'Они сейчас играют в футбол.', nb: 'здесь are — помощник времени, а не be вместо глагола' }
  ]
},
{
  id: 's-order', zone: 'stay', level: 1, idx: 3,
  name: 'Порядок слов', core: 'кто → глагол → что → где → когда',
  thesis: 'У каждого слова своя ячейка',
  short: 'порядок',
  fig: {
    rows: [
      { l: 'Русский', ru: 'Вчера в парке я видел Тома.' },
      { l: 'Английский', tr: [['subj','I'],['verb','saw'],['rest','Tom'],['rest','in the park'],['rest','yesterday'],['end','.']] }
    ],
    cap: 'По-русски слова можно переставлять почти как угодно. В английском у каждого своя ячейка, и порядок несёт смысл.'
  },
  lead: 'По-русски можно сказать «я люблю кофе», «кофе я люблю», «люблю я кофе» — смысл не изменится. В английском так не получится: <b>порядок слов фиксирован</b>, и именно он показывает, кто что делает.',
  blocks: [
    { kind: 'key', h: 'Базовая схема',
      p: '<b>кто → глагол → что → где → когда</b><br><span class="mono">I saw Tom in the park yesterday.</span><br>Место идёт раньше времени: сначала «где», потом «когда».' },
    { kind: 'plain', h: 'Почему это так важно',
      p: 'В английском почти нет падежей, и роль слова определяет его место.<br><span class="mono">The dog bit the man</span> — собака укусила человека.<br><span class="mono">The man bit the dog</span> — человек укусил собаку.<br>Слова те же, а смысл перевернулся.' },
    { kind: 'trap', h: 'Ловушка: very much и often',
      p: 'Наречие не встаёт между глаголом и тем, на что он направлен.<br><span class="mono no">I like very much coffee</span> → <span class="mono yes">I like coffee very much</span><br>Слова частоты — <span class="mono">always, often, never</span> — стоят перед смысловым глаголом, но после be:<br><span class="mono yes">I often read</span> · <span class="mono yes">He is always busy</span>' }
  ],
  forms: { p: 'I <b>read</b> books at home every evening.', n: 'I <b>don\'t read</b> books at home.', q: '<b>Do</b> you read books at home?' },
  markers: ['кто → глагол', 'где → когда', 'very much — в конце', 'often — перед глаголом', 'always — после be'],
  ex: [
    { en: 'I <i class="v">saw</i> Tom in the park yesterday.', ru: 'Вчера в парке я видел Тома.', nb: 'кто → глагол → кого → где → когда' },
    { en: 'She <i class="v">speaks</i> English very well.', ru: 'Она очень хорошо говорит по-английски.', nb: 'very well — после того, на каком языке' },
    { en: 'We often <i class="v">go</i> there.', ru: 'Мы часто туда ходим.', nb: 'often — перед смысловым глаголом' },
    { en: 'He <i class="v">is</i> always busy.', ru: 'Он всегда занят.', nb: 'always — после be' }
  ]
},
{
  id: 's-yesno', zone: 'jump', level: 2, idx: 4,
  name: 'Вопрос «да или нет»', core: 'помощник → кто → глагол → остальное ?',
  thesis: 'Помощник выходит вперёд',
  short: 'общий вопрос',
  fig: {
    rows: [
      { l: 'Утверждение', tr: [['subj','You'],['aux','(do)','ghost'],['verb','like'],['rest','coffee'],['end','.']] },
      { l: 'Вопрос', tr: [['aux','Do','jump'],['subj','you'],['verb','like'],['rest','coffee'],['end','?']] }
    ],
    cap: 'В утверждении помощник do спрятан. Как только появляется вопрос, он выходит из тени и встаёт первым.'
  },
  lead: 'Вопрос, на который отвечают «да» или «нет». В русском мы просто меняем интонацию: «Ты любишь кофе?» В английском интонации мало — меняется <b>порядок слов</b>: вперёд выходит вспомогательный глагол.',
  blocks: [
    { kind: 'key', h: 'Схема',
      p: '<b>помощник → кто → глагол → остальное ?</b><br><span class="mono">Do you like coffee?</span> · <span class="mono">Did she call?</span> · <span class="mono">Will they come?</span>' },
    { kind: 'plain', h: 'Откуда берётся do',
      p: 'Он был в предложении всегда, просто прятался внутри глагола: <span class="mono">You like</span> = <span class="mono">You do like</span>. В вопросе помощник выходит наружу и встаёт первым.<br>Вместе с ним уходит и окончание: <span class="mono">She likes</span> → <span class="mono">Does she like?</span> — -s перепрыгнула на does, а глагол остался голым.' },
    { kind: 'plain', h: 'Если глагола нет — вперёд выходит be',
      p: 'Помощник не нужен: be сам умеет вставать первым.<br><span class="mono">You are Sasha</span> → <span class="mono">Are you Sasha?</span><br><span class="mono">It was cold</span> → <span class="mono">Was it cold?</span>' },
    { kind: 'trap', h: 'Ловушка: двойное прошедшее и двойная -s',
      p: 'После помощника глагол всегда голый: время и -s уже забрал помощник.<br><span class="mono no">Did you went?</span> → <span class="mono yes">Did you go?</span><br><span class="mono no">Does she likes?</span> → <span class="mono yes">Does she like?</span>' }
  ],
  forms: { p: 'You <b>like</b> coffee. · You <b>are</b> Sasha.', n: 'You <b>don\'t like</b> coffee.', q: '<b>Do</b> you like coffee? · <b>Are</b> you Sasha?' },
  markers: ['Do / Does / Did', 'Am / Is / Are', 'Was / Were', 'Will', 'ответ yes / no'],
  ex: [
    { en: '<i class="v">Do</i> you like coffee?', ru: 'Ты любишь кофе?', nb: 'помощник do вышел вперёд' },
    { en: '<i class="v">Does</i> she work here?', ru: 'Она здесь работает?', nb: '-s ушла к does' },
    { en: '<i class="v">Are</i> you Sasha?', ru: 'Ты Саша?', nb: 'глагола нет — вперёд выходит be' },
    { en: '<i class="v">Did</i> they call you?', ru: 'Они тебе звонили?', nb: 'прошедшее — did, глагол голый' }
  ]
},
{
  id: 's-wh', zone: 'ask', level: 2, idx: 5,
  name: 'Вопрос со словом', core: 'вопр. слово → помощник → кто → глагол ?',
  thesis: 'Вопросительное слово — самое первое',
  short: 'вопрос со словом',
  fig: {
    rows: [
      { l: 'Общий вопрос', tr: [['aux','Do'],['subj','you'],['verb','like'],['rest','coffee'],['end','?']] },
      { l: 'Со словом', tr: [['q','What','jump'],['aux','do'],['subj','you'],['verb','like'],['end','?']] }
    ],
    cap: 'Схема общего вопроса остаётся целиком — вопросительное слово просто встаёт перед ней.'
  },
  lead: 'Если вопрос начинается с «что», «где», «когда», «почему» — схема та же, что у общего вопроса. Добавляется ровно одно: <b>вопросительное слово встаёт в самое начало</b>, перед помощником.',
  blocks: [
    { kind: 'key', h: 'Схема',
      p: '<b>вопросительное слово → помощник → кто → глагол → остальное ?</b><br><span class="mono">What do you like?</span> · <span class="mono">Where does she live?</span> · <span class="mono">When did they arrive?</span>' },
    { kind: 'plain', h: 'Без глагола — то же самое, только с be',
      p: '<span class="mono">Where are you?</span> — Где ты?<br><span class="mono">Who is he?</span> — Кто он?<br><span class="mono">Why are you so sad?</span> — Почему ты такой грустный?' },
    { kind: 'plain', h: 'Основные вопросительные слова',
      p: '<span class="mono">what</span> — что, какой · <span class="mono">where</span> — где, куда · <span class="mono">when</span> — когда · <span class="mono">why</span> — почему · <span class="mono">who</span> — кто · <span class="mono">how</span> — как · <span class="mono">which</span> — который · <span class="mono">whose</span> — чей' },
    { kind: 'trap', h: 'Ловушка: вопрос о том, кто действует',
      p: 'Если спрашиваем про того, <b>кто совершает действие</b>, вопросительное слово само занимает ячейку «кто». Помощник тогда не нужен, и порядок остаётся как в утверждении.<br>«Кто тебе позвонил?» → <span class="mono yes">Who called you?</span>, а не <span class="mono no">Who did call you?</span><br>«Кому ты позвонил?» → <span class="mono yes">Who did you call?</span> — здесь «кто» уже ты, и схема обычная.' }
  ],
  forms: { p: 'You <b>like</b> coffee.', n: 'Why <b>don\'t</b> you like coffee?', q: '<b>What</b> do you like? · <b>Where</b> are you?' },
  markers: ['what', 'where', 'when', 'why', 'who', 'how', 'which', 'whose'],
  ex: [
    { en: '<i class="v">What</i> do you want?', ru: 'Что ты хочешь?' },
    { en: '<i class="v">Where</i> does he live?', ru: 'Где он живёт?', nb: '-s ушла к does' },
    { en: '<i class="v">Why</i> are you so sad?', ru: 'Почему ты такой грустный?', nb: 'глагола нет — be' },
    { en: '<i class="v">Who</i> called you?', ru: 'Кто тебе звонил?', nb: 'спрашиваем про того, кто действует, — без помощника' }
  ]
},
{
  id: 's-whgroup', zone: 'ask', level: 2, idx: 6,
  name: 'Вопросительное слово из нескольких слов', core: '[то, о чём спрашиваем] → помощник → кто → глагол ?',
  thesis: 'Вопросительное слово — это то, что хотим узнать',
  short: 'группа вопроса',
  fig: {
    rows: [
      { l: 'Русский', ru: 'Какого цвета эта машина?' },
      { l: 'Английский', tr: [['q','What color','jump'],['aux','is'],['subj','this car'],['end','?']] },
      { l: 'Русский', ru: 'Какая красная машина тебе понравилась больше всего?' },
      { l: 'Английский', tr: [['q','What red car','jump'],['aux','did'],['subj','you'],['verb','like'],['rest','most'],['end','?']] }
    ],
    cap: 'По-русски «какого цвета» звучит как одно понятие — и английский держит его вместе: вся группа целиком встаёт в начало.'
  },
  lead: 'В русском вопросе кажется, что вопросительное слово одно: «какого». Но спрашиваем-то мы не «какого», а <b>какого цвета</b>. В английском вопросительное слово — это <b>всё, о чём мы спрашиваем</b>, и оно может состоять из двух, трёх и более слов.',
  blocks: [
    { kind: 'key', h: 'Как найти границы группы',
      p: 'Спросите себя: что именно я хочу узнать? Всё это и есть вопросительное слово.<br>«Какого <b>цвета</b> машина?» → <span class="mono">What color</span> is the car?<br>«Какая <b>красная машина</b> понравилась?» → <span class="mono">What red car</span> did you like?<br>«<b>Сколько книг</b> ты прочитал?» → <span class="mono">How many books</span> did you read?' },
    { kind: 'trap', h: 'Ловушка: разорвать группу',
      p: 'Группу нельзя делить — она переезжает в начало целиком.<br><span class="mono no">What is color this car?</span> → <span class="mono yes">What color is this car?</span><br><span class="mono no">How many did you read books?</span> → <span class="mono yes">How many books did you read?</span>' },
    { kind: 'plain', h: 'Самые частые группы',
      p: '<span class="mono">what time</span> — во сколько · <span class="mono">what kind of</span> — какой (вид) · <span class="mono">how many / how much</span> — сколько · <span class="mono">how long</span> — как долго · <span class="mono">how often</span> — как часто · <span class="mono">how old</span> — сколько лет · <span class="mono">whose book</span> — чья книга' },
    { kind: 'plain', h: 'Тонкость: предлог может уйти в конец',
      p: '«Возле какого дома ты живёшь?» Строго по схеме — <span class="mono">Near which house do you live?</span> Так правильно, но звучит книжно. В живой речи предлог обычно отправляют в конец: <span class="mono">Which house do you live near?</span><br>«С кем ты говорил?» → <span class="mono">Who did you talk to?</span>' }
  ],
  forms: { p: 'This car <b>is</b> red.', n: 'Which car <b>didn\'t</b> you like?', q: '<b>What color</b> is this car?' },
  markers: ['what color', 'what time', 'how many', 'how much', 'how long', 'how old', 'what kind of', 'whose …'],
  ex: [
    { en: '<i class="v">What color</i> is this car?', ru: 'Какого цвета эта машина?', nb: '«какого цвета» — одна группа' },
    { en: '<i class="v">What red car</i> did you like most?', ru: 'Какая красная машина тебе понравилась больше всего?', nb: 'группа из трёх слов' },
    { en: '<i class="v">How many books</i> did you read?', ru: 'Сколько книг ты прочитал?' },
    { en: '<i class="v">What time</i> is it?', ru: 'Который час?' }
  ]
},
{
  id: 's-neg', zone: 'jump', level: 3, idx: 7,
  name: 'Отрицание', core: 'кто → помощник + not → глагол → остальное',
  thesis: 'Not цепляется к помощнику',
  short: 'отрицание',
  fig: {
    rows: [
      { l: 'С глаголом', tr: [['subj','I'],['aux','don\'t','jump'],['verb','like'],['rest','coffee'],['end','.']] },
      { l: 'Без глагола', tr: [['subj','I'],['aux','am not','jump'],['rest','Sasha'],['end','.']] },
      { l: 'Модальный', tr: [['subj','I'],['aux','can\'t','jump'],['verb','dance'],['end','.']] }
    ],
    cap: 'Not никогда не встаёт сам по себе рядом с обычным глаголом — ему нужен помощник, к которому можно прицепиться.'
  },
  lead: 'В русском частица «не» встаёт прямо перед глаголом: «я не люблю». В английском <span class="mono">not</span> к обычному глаголу цепляться не умеет. Ему нужен <b>помощник</b> — тот же самый, что выходит вперёд в вопросе.',
  blocks: [
    { kind: 'key', h: 'Схема',
      p: '<b>кто → помощник + not → глагол → остальное</b><br><span class="mono">I do not like</span> = <span class="mono">I don\'t like</span> · <span class="mono">She doesn\'t work</span> · <span class="mono">We didn\'t go</span>' },
    { kind: 'plain', h: 'Без глагола — not просто встаёт после be',
      p: 'Помощник не нужен, be справляется сам: <span class="mono">I am not Sasha</span> · <span class="mono">It isn\'t cold</span> · <span class="mono">They weren\'t at home</span>.' },
    { kind: 'trap', h: 'Ловушка: not прямо перед глаголом',
      p: '<span class="mono no">I not like coffee</span> → <span class="mono yes">I don\'t like coffee</span><br><span class="mono no">She don\'t know</span> → <span class="mono yes">She doesn\'t know</span><br><span class="mono no">He didn\'t went</span> → <span class="mono yes">He didn\'t go</span>' },
    { kind: 'plain', h: 'Сокращения — норма живой речи',
      p: '<span class="mono">do not → don\'t · does not → doesn\'t · did not → didn\'t · is not → isn\'t · are not → aren\'t · will not → won\'t · cannot → can\'t</span><br>У <span class="mono">I am not</span> пары нет — только <span class="mono">I\'m not</span>.' }
  ],
  forms: { p: 'I <b>like</b> coffee. · I <b>am</b> Sasha.', n: 'I <b>don\'t like</b> coffee. · I <b>am not</b> Sasha.', q: '<b>Don\'t</b> you like coffee?' },
  markers: ['don\'t / doesn\'t', 'didn\'t', 'isn\'t / aren\'t', 'wasn\'t / weren\'t', 'won\'t', 'can\'t'],
  ex: [
    { en: 'I <i class="v">don\'t like</i> coffee.', ru: 'Я не люблю кофе.', nb: 'not прицепился к do' },
    { en: 'She <i class="v">doesn\'t work</i> on Sundays.', ru: 'Она не работает по воскресеньям.', nb: '-s ушла к does' },
    { en: 'I <i class="v">am not</i> hungry.', ru: 'Я не голоден.', nb: 'глагола нет — not встаёт после be' },
    { en: 'They <i class="v">didn\'t call</i>.', ru: 'Они не позвонили.', nb: 'didn\'t плюс голый глагол' }
  ]
},
{
  id: 's-modal', zone: 'jump', level: 3, idx: 8,
  name: 'Модальные глаголы', core: 'can / must / should + голый глагол',
  thesis: 'Модальный сам себе помощник',
  short: 'модальные',
  fig: {
    rows: [
      { l: 'Обычный глагол', tr: [['aux','Do','jump'],['subj','you'],['verb','dance'],['end','?']] },
      { l: 'Модальный', tr: [['aux','Can','jump'],['subj','you'],['verb','dance'],['end','?']] },
      { l: 'Ошибка', tr: [['aux','Do','bad'],['subj','you'],['aux','can'],['verb','dance'],['end','?']] }
    ],
    cap: 'Модальный глагол уже умеет всё, что умеет помощник: выходить вперёд и принимать not. Второй помощник ему не нужен.'
  },
  lead: 'Все правила выше не касаются модальных глаголов — <span class="mono">can, must, should, may, might, could, would</span>. Это <b>самостоятельные сущности</b>: они сами работают помощниками, поэтому <span class="mono">do / does / did</span> им не нужны ни в вопросе, ни в отрицании. Подробно о каждом модальном — в отдельных уроках; здесь только то, как они меняют строй предложения.',
  blocks: [
    { kind: 'key', h: 'В вопросе — сразу вперёд',
      p: '«Ты можешь танцевать?»<br><span class="mono no">Do you can dance?</span> → <span class="mono yes">Can you dance?</span><br>Модальный сам выходит на первое место — точно так же, как be.' },
    { kind: 'plain', h: 'В утверждении — без помощника, даже если есть глагол',
      p: '<span class="mono">I can swim</span> · <span class="mono">You should go</span> · <span class="mono">She must work</span><br>Смысловой глагол после модального стоит голым: без <span class="mono">to</span> и без <span class="mono">-s</span>.' },
    { kind: 'trap', h: 'Ловушка: to, -s и do рядом с модальным',
      p: '<span class="mono no">She cans swim</span> → <span class="mono yes">She can swim</span> — у модальных нет -s даже с he / she / it.<br><span class="mono no">I can to swim</span> → <span class="mono yes">I can swim</span> — после модального to не ставят.<br><span class="mono no">I don\'t can</span> → <span class="mono yes">I can\'t</span> — not цепляется прямо к модальному.' },
    { kind: 'plain', h: 'А have to?',
      p: 'Это не модальный, а обычный глагол, поэтому ему нужен do: <span class="mono">Do you have to go?</span> · <span class="mono">I don\'t have to go</span>. Об этом тоже будет отдельный урок.' }
  ],
  forms: { p: 'I <b>can</b> dance. · She <b>should</b> go.', n: 'I <b>can\'t</b> dance. · You <b>mustn\'t</b> smoke.', q: '<b>Can</b> you dance? · <b>Should</b> I go?' },
  markers: ['can / could', 'must', 'should', 'may / might', 'would', 'без do', 'без to', 'без -s'],
  ex: [
    { en: '<i class="v">Can</i> you dance?', ru: 'Ты умеешь танцевать?', nb: 'не Do you can dance' },
    { en: 'She <i class="v">can</i> speak three languages.', ru: 'Она может говорить на трёх языках.', nb: 'после can — голый глагол, у can нет -s' },
    { en: 'You <i class="v">shouldn\'t</i> eat so late.', ru: 'Тебе не стоит есть так поздно.', nb: 'not прямо к модальному' },
    { en: 'What <i class="v">can</i> I do?', ru: 'Что я могу сделать?', nb: 'вопр. слово → модальный → кто → глагол' }
  ]
}
];

/* ── дуэли: у каждой стороны своя строка ячеек ── */
const SDUELS = [
  {
    q: 'Be или глагол? — ищем действие',
    a: { z: 'jump', n: 'Нет глагола → be', tr: [['subj','I'],['aux','am','jump'],['rest','a teacher'],['end','.']],
         en: 'I <i class="v">am</i> a teacher.', ru: 'Я учитель.', why: 'Действия нет — я просто кто-то. Пустую ячейку занимает be.' },
    b: { z: 'stay', n: 'Есть глагол → без be', tr: [['subj','I'],['verb','teach'],['rest','English'],['end','.']],
         en: 'I <i class="v">teach</i> English.', ru: 'Я преподаю английский.', why: 'Действие есть — teach. Ячейка занята, be сюда уже не встанет.' },
    r: 'Нашли в русском действие — be не нужен. Не нашли — ставим be. В одной ячейке они не уживаются: I am teach — ошибка.'
  },
  {
    q: 'Кто выходит вперёд в вопросе?',
    a: { z: 'jump', n: 'Be выходит сам', tr: [['aux','Are','jump'],['subj','you'],['rest','a teacher'],['end','?']],
         en: '<i class="v">Are</i> you a teacher?', ru: 'Ты учитель?', why: 'Be умеет вставать первым без посторонней помощи.' },
    b: { z: 'jump', n: 'Глаголу нужен do', tr: [['aux','Do','jump'],['subj','you'],['verb','teach'],['rest','English'],['end','?']],
         en: '<i class="v">Do</i> you teach English?', ru: 'Ты преподаёшь английский?', why: 'Обычный глагол вперёд не выходит — вместо него встаёт помощник do.' },
    r: 'Вперёд выходят только «прыгающие» слова: be, помощники и модальные. Смысловой глагол всегда остаётся на своём месте.'
  },
  {
    q: 'Модальный или обычный глагол?',
    a: { z: 'jump', n: 'Модальный · сам себе помощник', tr: [['aux','Can','jump'],['subj','you'],['verb','swim'],['end','?']],
         en: '<i class="v">Can</i> you swim?', ru: 'Ты умеешь плавать?', why: 'Can сам выходит вперёд, do ему не нужен.' },
    b: { z: 'stay', n: 'Обычный · зовёт do', tr: [['aux','Do','jump'],['subj','you'],['verb','swim'],['end','?']],
         en: '<i class="v">Do</i> you swim?', ru: 'Ты плаваешь?', why: 'Swim — обычный глагол, в вопросе ему нужен помощник.' },
    r: 'Модальный уже работает помощником. Do you can — это два помощника в одном вопросе.'
  },
  {
    q: '«Кто позвонил?» или «Кому позвонил?»',
    a: { z: 'ask', n: 'Про того, кто действует', tr: [['q','Who','jump'],['verb','called'],['rest','you'],['end','?']],
         en: '<i class="v">Who</i> called you?', ru: 'Кто тебе позвонил?', why: 'Who сам занимает ячейку «кто». Порядок как в утверждении, помощник не нужен.' },
    b: { z: 'ask', n: 'Про того, кому звонили', tr: [['q','Who','jump'],['aux','did'],['subj','you'],['verb','call'],['end','?']],
         en: '<i class="v">Who</i> did you call?', ru: 'Кому ты позвонил?', why: '«Кто» здесь — ты. Схема обычная: вопросительное слово → помощник → кто → глагол.' },
    r: 'Спросите себя, о ком вопрос: о том, кто совершил действие, или о том, на кого оно направлено. В первом случае помощник не нужен.'
  },
  {
    q: 'Одно вопросительное слово или группа?',
    a: { z: 'ask', n: 'Одно слово', tr: [['q','What','jump'],['aux','is'],['subj','this'],['end','?']],
         en: '<i class="v">What</i> is this?', ru: 'Что это?', why: 'Спрашиваем про сам предмет — вопросительное слово одно.' },
    b: { z: 'ask', n: 'Группа из двух слов', tr: [['q','What color','jump'],['aux','is'],['subj','this'],['end','?']],
         en: '<i class="v">What color</i> is this?', ru: 'Какого это цвета?', why: 'Спрашиваем про цвет — «какого цвета» переезжает в начало целиком.' },
    r: 'Вопросительное слово — это всё, что вы хотите узнать. Сколько в нём окажется слов, решает смысл, а не русский перевод.'
  }
];
