const NEGATION_LEVELS = [
  { n: 1, ru: 'Одного отрицания достаточно', title: 'Не переноси русское «не» дважды', code: 'never · nobody · nothing',
    txt: 'По-русски говорим «никто не пришёл». По-английски nobody уже сообщает, что не пришёл ни один человек. Ещё одно «не» ему не нужно.' },
  { n: 2, ru: 'Выбор и две части', title: 'Один, ни один или оба', code: 'either · neither · both',
    txt: 'Сначала реши, что хочешь сказать: выбрать один вариант, отказаться от обоих или взять оба. Потом соедини две части нужной парой слов.' }
];

const NEGATION_WORDS = [
  ['never', 'никогда', 'I never smoke.', 'Я никогда не курю.'],
  ['nobody / no one', 'никто, никого', 'Nobody called.', 'Никто не позвонил.'],
  ['nothing', 'ничего', 'I know nothing about it.', 'Я ничего об этом не знаю.'],
  ['nowhere', 'нигде, никуда', 'We went nowhere.', 'Мы никуда не ходили.'],
  ['no + название', 'нет, ни одного', 'I have no questions.', 'У меня нет вопросов.'],
  ['neither … nor …', 'ни … ни …', 'I drink neither tea nor coffee.', 'Я не пью ни чай, ни кофе.']
];

const NEGATION_STATIONS = [
  {
    id: 'g-once', zone: 'past', level: 1, idx: 1, short: 'Одно отрицание',
    name: '«Никто пришёл» — английскому всё понятно', core: 'Nobody came. · I have never seen this before.',
    thesis: 'По-русски повторяем «не», а по-английски одного слова уже достаточно',
    lead: 'По-русски мы спокойно говорим: «Я <b>никогда не</b> видел», «Я <b>ничего не</b> знаю», «<b>Никто не</b> пришёл». Хочется перенести в английский сразу оба отрицания. Но в обычном английском слова <b>never</b>, <b>nothing</b> и <b>nobody</b> уже сами говорят «нет».',
    blocks: [
      { kind: 'key', h: 'Мысленно прочитай «я видел никого»', p: '<b>I saw nobody.</b> — «Я никого не видел». Чтобы понять сборку, мысленно прочитай «я видел никого». Это подсказка, а не перевод на хороший русский. Так же <b>Nobody came</b> буквально собирается как «никто пришёл». Английскому всё понятно: <b>nobody</b> уже означает, что не пришёл ни один человек.' },
      { kind: 'plain', h: 'Разберём твоё «я никогда раньше этого не видел»', p: '<b>I have seen this before.</b> — «Я раньше это видел». Добавляем <b>never</b>: <b>I have never seen this before.</b> — «Я никогда раньше этого не видел». Всё: отрицание уже появилось. <b>Have</b> помогает построить фразу «видел раньше», а <b>seen</b> — третья форма <b>see</b>, «видеть». Слово <b>never</b> стоит между ними.' },
      { kind: 'trap', h: 'Не вставляй don’t из русского перевода', p: 'Если хочешь сказать «я никогда этого не видел», нужно <b>I have never seen this before</b>. Вариант <b>I have never don’t see this before</b> так не собирается. И не убирай <b>have</b>: оно помогает построить фразу, само по себе оно не означает «не».' },
      { kind: 'plain', h: 'Где поставить never', p: 'Перед обычным действием: <b>I never smoke.</b> После <b>am, is, are</b>: <b>She is never late.</b> Если есть помощник вроде <b>have</b> или <b>will</b>, ставим после него: <b>I have never seen it.</b> · <b>I will never forget you.</b>' },
      { kind: 'plain', h: 'Почему иногда слышно I don’t know nothing', p: 'Такое можно услышать в песнях и некоторых вариантах разговорной речи. Но для своей обычной речи и письма держись схем из этой вкладки: <b>I know nothing</b> или <b>I don’t know anything</b>.' }
    ],
    forms: { p: 'I have seen this before.', n: 'I have <b>never</b> seen this before.', q: 'Have you <b>ever</b> seen this before?' },
    markers: ['никогда не → never', 'никто не → nobody', 'ничего не → nothing'],
    ex: [
      { en: 'Nobody came.', ru: 'Никто не пришёл.', nb: 'Nobody уже отрицает приход.' },
      { en: 'She is never late.', ru: 'Она никогда не опаздывает.' },
      { en: 'I have never seen snow.', ru: 'Я никогда не видел снег.' }
    ]
  },
  {
    id: 'g-any', zone: 'present', level: 1, idx: 2, short: 'Два способа',
    name: 'Nobody или not anybody — выбери одну сборку', core: 'I saw nobody. = I didn’t see anybody.',
    thesis: 'Отрицание уже в слове или стоит рядом с глаголом',
    lead: 'Можно сказать <b>I saw nobody</b>. А можно поставить отрицание рядом с глаголом: <b>I didn’t see anybody</b>. По-русски оба варианта означают «я никого не видел». Главное — не склеивать два способа.',
    blocks: [
      { kind: 'key', h: 'Меняем слова парой', p: '<b>I saw nobody. → I didn’t see anybody.</b><br><b>I know nothing. → I don’t know anything.</b><br><b>We went nowhere. → We didn’t go anywhere.</b><br><b>I have no questions. → I don’t have any questions.</b>' },
      { kind: 'trap', h: 'Не оставляй nothing после don’t для «ничего не»', p: 'Если хочешь сказать «я ничего не знаю», выбирай <b>I know nothing</b> или <b>I don’t know anything</b>. Не собирай <b>I don’t know nothing</b> по русским словам. После <b>don’t</b> здесь нужно <b>anything</b>.' },
      { kind: 'plain', h: 'После didn’t действие возвращаем к обычному виду', p: '<b>I saw nobody.</b> Слово <b>saw</b> уже показывает, что дело было в прошлом. Когда добавили <b>didn’t</b>, прошлое показывает оно: <b>I didn’t see anybody</b>. Поэтому <b>see</b>, а не <b>saw</b>.' },
      { kind: 'plain', h: 'No ставим перед названием чего-то', p: '<b>I have no money.</b> — «У меня нет денег». Ещё можно сказать <b>I don’t have any money</b>. После <b>no</b> называем, чего нет: <b>no money</b>, <b>no questions</b>, <b>no time</b>.' },
      { kind: 'plain', h: 'А если отрицательных слов по-русски три?', p: '«Никто никогда ничего мне не рассказывает» → <b>Nobody ever tells me anything.</b> Здесь отрицание уже в <b>nobody</b>, поэтому дальше <b>ever</b> и <b>anything</b>. Не переводим каждое русское «ни» отдельным английским отрицанием.' }
    ],
    forms: { p: 'I know something.', n: 'I know <b>nothing</b>. = I <b>don’t</b> know <b>anything</b>.', q: 'Do you know <b>anything</b> about it?' },
    markers: ['nobody ↔ not anybody', 'nothing ↔ not anything', 'nowhere ↔ not anywhere', 'no ↔ not any'],
    ex: [
      { en: 'We didn’t go anywhere.', ru: 'Мы никуда не ходили.' },
      { en: 'There is nothing in the box.', ru: 'В коробке ничего нет.' },
      { en: 'There isn’t anything in the box.', ru: 'В коробке ничего нет. Другой способ сказать то же самое.' }
    ]
  },
  {
    id: 'g-questions', zone: 'future', level: 1, idx: 3, short: 'Вопросы',
    name: 'Вопрос строим как обычно', core: 'Did you see anybody? · Did nobody call?',
    thesis: 'Слово с отрицанием не заменяет порядок слов в вопросе',
    lead: '<b>Never</b> и <b>nobody</b> уже дают отрицание, но не строят за тебя вопрос. Если нужен вопрос, используем знакомую сборку: помощник → кто → действие → остальное.',
    blocks: [
      { kind: 'key', h: 'Кого-нибудь и когда-нибудь', p: '<b>Did you see anybody?</b> — «Ты кого-нибудь видел?»<br><b>Have you ever seen this before?</b> — «Ты когда-нибудь раньше это видел?» Спрашиваем «когда-нибудь?», поэтому здесь <b>ever</b>, а не <b>never</b>.' },
      { kind: 'plain', h: 'Само did не означает «не»', p: '<b>Did nobody call?</b> — «Никто не позвонил?» Здесь есть <b>did</b>, но нет <b>not</b>. Слово <b>did</b> помогает спросить, а <b>nobody</b> сообщает «никто». Поэтому два отрицания здесь не появились.' },
      { kind: 'plain', h: 'Если уже есть be или can', p: '<b>Is anybody home?</b> — «Кто-нибудь дома?» Вперёд выходит <b>is</b>.<br><b>Can anybody help me?</b> — «Кто-нибудь может мне помочь?» Вперёд выходит <b>can</b>. Дополнительное <b>do</b> им не нужно.' },
      { kind: 'plain', h: 'С nothing тоже можно спросить', p: '<b>Is there nothing in the box?</b> — «В коробке ничего нет?» Ты уже предполагаешь, что коробка пустая. Нейтральное «там что-нибудь есть?» звучит как <b>Is there anything in the box?</b> Смысл выбирает слово.' }
    ],
    forms: { p: 'Somebody called.', n: '<b>Nobody</b> called.', q: '<b>Did</b> anybody call?' },
    markers: ['когда-нибудь? → ever', 'кто-нибудь? → anybody', 'did ≠ didn’t'],
    ex: [
      { en: 'Have you ever been to London?', ru: 'Ты когда-нибудь был в Лондоне?' },
      { en: 'Does nobody know the answer?', ru: 'Никто не знает ответ?' },
      { en: 'Can anybody hear me?', ru: 'Кто-нибудь меня слышит?' }
    ]
  },
  {
    id: 'g-either', zone: 'future', level: 2, idx: 4, short: 'Или — или',
    name: 'Either … or … — предлагаю выбор', core: 'either tea or coffee',
    thesis: 'Сейчас будут варианты: или одно, или другое',
    lead: '<b>You can have either tea or coffee.</b> — «Можешь взять или чай, или кофе». Сначала <b>either</b> показывает: сейчас будут варианты. Потом <b>or</b> соединяет их. Запомни готовую пару: <b>either → or</b>, «или → или».',
    blocks: [
      { kind: 'key', h: 'Соединяй то, между чем выбираешь', p: 'Два напитка: <b>either tea or coffee</b>.<br>Два действия: <b>either walk or take a taxi</b>.<br>Два человека: <b>either Tom or Anna</b>. Сначала придумай две части, потом соедини их.' },
      { kind: 'plain', h: 'Вопрос и отрицание собираются вокруг выбора', p: '<b>Can we either walk or take a taxi?</b> — «Мы можем или пойти пешком, или взять такси?» Вопрос делает <b>can</b> в начале. В <b>You can’t choose both; you can choose either tea or coffee</b> запрещаем брать оба напитка и предлагаем выбрать один.' },
      { kind: 'plain', h: 'Если действие делает один из двух', p: '<b>Either Tom or Anna works here.</b> — «Здесь работает или Том, или Анна». В этом примере оба человека названы по одному. Поэтому <b>works</b>, как в <b>Tom works here</b>. Если соединяешь разные варианты вроде <b>Tom</b> и <b>his friends</b>, смотри на ближайшую к действию часть: <b>Either Tom or his friends are coming.</b>' }
    ],
    forms: { p: 'We can <b>either</b> walk <b>or</b> take a taxi.', n: 'We can’t take <b>either</b> route.', q: 'Can we <b>either</b> walk <b>or</b> take a taxi?' },
    markers: ['either → or', 'или → или', 'выбор из двух'],
    ex: [
      { en: 'Either Tom or Anna will call you.', ru: 'Тебе позвонит или Том, или Анна.' },
      { en: 'You can either stay here or come with us.', ru: 'Можешь или остаться здесь, или пойти с нами.' },
      { en: 'We can’t take either route.', ru: 'Мы не можем поехать ни по одному из двух маршрутов.', nb: 'Отрицает can’t. После него either не означает, что один маршрут всё-таки подходит.' }
    ]
  },
  {
    id: 'g-neither', zone: 'past', level: 2, idx: 5, short: 'Ни — ни',
    name: 'Neither … nor … — буква n напоминает no', core: 'neither tea nor coffee',
    thesis: 'Поставили n перед either — поставим её и перед or',
    lead: 'Было <b>either</b> — «или». Поставили впереди <b>n</b>, получили <b>neither</b> — «ни». Буква <b>n</b> напоминает слово <b>no</b> — «нет». Во второй части тоже ставим <b>n</b>: <b>or → nor</b>. Получилась пара <b>neither → nor</b>, «ни → ни».',
    blocks: [
      { kind: 'key', h: 'У обоих слов впереди n', p: '<b>I drink neither tea nor coffee.</b> — «Я не пью ни чай, ни кофе». Русское «не пью» не заставляет добавлять <b>don’t</b>: <b>neither … nor …</b> уже всё отрицает. Если выбрал <b>neither</b>, дальше ищи <b>nor</b>.' },
      { kind: 'trap', h: 'Не склеивай два отрицания', p: 'Для «я не пью ни чай, ни кофе» выбирай <b>I drink neither tea nor coffee</b>. Не добавляй <b>don’t</b> и не меняй пару на <b>neither … or …</b>.' },
      { kind: 'plain', h: 'Можно соединять действия и качества', p: '<b>She can neither sing nor dance.</b> — «Она не умеет ни петь, ни танцевать».<br><b>The room is neither big nor comfortable.</b> — «Комната ни большая, ни удобная». Слова <b>can</b> и <b>is</b> остаются на месте, дополнительное <b>not</b> не нужно.' },
      { kind: 'plain', h: 'Если не сделал ни тот ни другой', p: '<b>Neither Tom nor Anna called.</b> — «Ни Том, ни Анна не позвонили». В настоящем: <b>Neither Tom nor Anna works here.</b> Оба названы по одному, поэтому <b>works</b>. Если ближе к действию стоит <b>his friends</b>, выбираем форму для «они»: <b>Neither Tom nor his friends are coming.</b>' }
    ],
    forms: { p: 'I drink tea and coffee.', n: 'I drink <b>neither</b> tea <b>nor</b> coffee.', q: 'Do you drink tea or coffee?' },
    markers: ['n → no → нет', 'neither → nor', 'ни → ни'],
    ex: [
      { en: 'Neither Tom nor Anna called.', ru: 'Ни Том, ни Анна не позвонили.' },
      { en: 'She can neither sing nor dance.', ru: 'Она не умеет ни петь, ни танцевать.' },
      { en: 'I like neither of them.', ru: 'Мне не нравится ни один из них двоих.' }
    ]
  },
  {
    id: 'g-both', zone: 'present', level: 2, idx: 6, short: 'И — и',
    name: 'Both … and … — подходят оба', core: 'both tea and coffee',
    thesis: 'Ничего не выбираем и не отрицаем: берём обе части',
    lead: '<b>I like both tea and coffee.</b> — «Мне нравятся и чай, и кофе». Слово <b>both</b> подсказывает: подходят оба варианта. Соединяем их через <b>and</b>. Запомни парой: <b>both → and</b>, «и → и».',
    blocks: [
      { kind: 'key', h: 'Люди, действия или качества', p: '<b>Both Tom and Anna work here.</b> — «И Том, и Анна работают здесь».<br><b>She can both sing and dance.</b> — «Она умеет и петь, и танцевать».<br><b>The room is both cheap and comfortable.</b> — «Комната и дешёвая, и удобная».' },
      { kind: 'plain', h: 'Двое вместе — как they', p: 'Если и Том, и Анна что-то делают, считаем их вместе: <b>they</b>, «они». Поэтому <b>Both Tom and Anna work here</b>, как <b>They work here</b>. Не добавляем к <b>work</b> окончание <b>-s</b>.' },
      { kind: 'trap', h: '«Не оба» ещё не значит «ни один»', p: '<b>I don’t like both of them.</b> — «Мне нравятся не оба». Это не означает, что не нравится никто: один может нравиться, а другой — нет. Если хочешь сказать «ни тот ни другой», скажи <b>I like neither of them</b>.' },
      { kind: 'plain', h: 'Три пары — три разных смысла', p: '<b>Either tea or coffee</b> — выбираем один напиток.<br><b>Neither tea nor coffee</b> — ни один не подходит.<br><b>Both tea and coffee</b> — подходят оба. Сначала реши, какой смысл тебе нужен.' }
    ],
    forms: { p: 'I like <b>both</b> tea <b>and</b> coffee.', n: 'I like <b>neither</b> tea <b>nor</b> coffee.', q: 'Do you like <b>both</b> tea <b>and</b> coffee?' },
    markers: ['both → and', 'и → и', 'оба вместе → they'],
    ex: [
      { en: 'Both Tom and Anna are here.', ru: 'И Том, и Анна здесь.' },
      { en: 'The route is both short and safe.', ru: 'Маршрут и короткий, и безопасный.' },
      { en: 'Do you speak both English and French?', ru: 'Ты говоришь и по-английски, и по-французски?' }
    ]
  }
];

const NEGATION_DUELS = [
  { q: 'Два способа сказать «я никого не видел»',
    a: { z: 'past', n: 'Отрицание в слове', en: 'I saw nobody.', ru: 'Я никого не видел.', why: 'Nobody уже говорит «никого». Слово saw показывает прошлое.' },
    b: { z: 'present', n: 'Отрицание рядом с действием', en: 'I didn’t see anybody.', ru: 'Я никого не видел.', why: 'Didn’t уже отрицает. Поэтому anybody, а действие — see.' },
    r: 'Выбери одну сборку. Для этого смысла не ставь didn’t и nobody вместе.' },
  { q: 'Или один, или ни один?',
    a: { z: 'future', n: 'Предлагаю выбор', en: 'You can have either tea or coffee.', ru: 'Можно взять или чай, или кофе.', why: 'Выбирай один из двух напитков.' },
    b: { z: 'past', n: 'Отказываюсь от обоих', en: 'I drink neither tea nor coffee.', ru: 'Я не пью ни чай, ни кофе.', why: 'Буква n напоминает no. Она есть у neither и у nor.' },
    r: 'Either идёт с or. Neither идёт с nor.' },
  { q: 'Оба или ни один?',
    a: { z: 'present', n: 'Подходят оба', en: 'I like both of them.', ru: 'Мне нравятся они оба.', why: 'Both включает обоих.' },
    b: { z: 'past', n: 'Не подходит ни один', en: 'I like neither of them.', ru: 'Мне не нравится ни один из них двоих.', why: 'Neither исключает обоих.' },
    r: 'I don’t like both of them — «мне нравятся не оба». Это не то же самое, что neither.' }
];

const NEGATION_SCENES = [
  ['Я никогда раньше этого не видел.', [['subj', 'I'], ['aux', 'have'], ['neg', 'never'], ['verb', 'seen'], ['rest', 'this before'], ['end', '.']],
    'Never уже означает «никогда не». Have помогает построить фразу, seen — третья форма see. Don’t сюда не добавляем.'],
  ['Я никого не видел.', [['subj', 'I'], ['verb', 'saw'], ['neg', 'nobody'], ['end', '.']],
    'Для сборки мысленно прочитай «я видел никого». Nobody уже даёт отрицание.'],
  ['Я никого не видел. Другой способ.', [['subj', 'I'], ['aux', 'didn’t'], ['verb', 'see'], ['rest', 'anybody'], ['end', '.']],
    'Отрицание уже в didn’t. Поэтому anybody, а действие возвращаем к обычному виду: see.'],
  ['Ты когда-нибудь раньше это видел?', [['aux', 'Have'], ['subj', 'you'], ['rest', 'ever'], ['verb', 'seen'], ['rest', 'this before'], ['end', '?']],
    'Спрашиваем «когда-нибудь?» — ever. Have выходит перед you, как в обычном вопросе.'],
  ['Можно взять или чай, или кофе.', [['subj', 'You'], ['aux', 'can'], ['verb', 'have'], ['rest', 'either tea'], ['rest', 'or coffee'], ['end', '.']],
    'Предлагаем выбор. Пара either … or … означает «или … или …».'],
  ['Я не пью ни чай, ни кофе.', [['subj', 'I'], ['verb', 'drink'], ['neg', 'neither tea'], ['neg', 'nor coffee'], ['end', '.']],
    'N напоминает no. Она есть и в neither, и в nor. Дополнительное don’t не нужно.'],
  ['Мне нравятся и чай, и кофе.', [['subj', 'I'], ['verb', 'like'], ['rest', 'both tea'], ['rest', 'and coffee'], ['end', '.']],
    'Подходят оба напитка. Both … and … означает «и … и …».']
];
