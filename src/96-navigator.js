/* Поиск по теории и формам предложений, с учётом темы и времени. Без сети. */
(() => {
  const launcher = document.getElementById('courseNavigatorButton');
  const panel = document.getElementById('courseNavigator');
  const form = document.getElementById('courseNavigatorForm');
  const input = document.getElementById('courseNavigatorInput');
  const results = document.getElementById('courseNavigatorResults');
  const status = document.getElementById('courseNavigatorStatus');
  const question = document.getElementById('courseNavigatorQuestion');

  const normal = value => value.toLowerCase().replace(/ё/g, 'е')
    .replace(/[’‘`]/g, "'").replace(/<[^>]*>/g, ' ')
    .replace(/[^\p{L}\p{N}'*]+/gu, ' ').replace(/\s+/g, ' ').trim();
  const stop = new Set(('где найти найдите найди покажи покажите открыть открой находится находятся расположен расположена расположено ' +
    'расскажи подскажи пожалуйста мне меня у есть в во на по об про о с со из для к и или а но это эта этот эти ' +
    'такое такой такая как почему когда какой какая какие какую нужная нужную интересует тему тема темы правило правила ' +
    'методичке методички методичку методичка курсе курса курс английском английскому английский языке язык ' +
    'я хочу ищу ищем объясняется объясняются объясняют рассказывается говорится написано правильно использовать ' +
    'употреблять применение объяснение объяснения раздел разделе разделы урок уроке глава главе ' +
    'материал материалы разобраться понять узнать').split(' '));
  const tokens = value => normal(value).replace(/\b(where can i find|where do i find|where is|where are|show me)\b/g, ' ')
    .split(' ').filter(word => word && !stop.has(word));
  const aliases = {
    's-be': 'to be|be|ту би|am is are|was were|нет глагола|я дома|мне холодно|я саша',
    's-verb': 'есть глагол|действие в предложении|глагол в нужном времени',
    's-order': 'порядок слов|порядок в предложении|построение предложений|строить предложени*|составить предложени*',
    's-yesno': 'общий вопрос|вопрос*|вопросительное предложение|do does did|помощник в вопросе|как задать вопрос|вопросы в прошлом',
    's-wh': 'вопросительные слова|who what where when why how|вопрос со словом',
    's-whgroup': 'какого цвета|what color|группа вопросительных слов|сколько лет',
    's-neg': 'обычное отрицание|not|dont|don t|do not|отрицательное предложение',
    's-modal': 'без помощников|самостоятельные глаголы',
    'present-simple': 'present simple|презент симпл|настоящее простое|простое настоящее|обычное настоящее|каждый день|привычки|расписани*|поезд*',
    'past-simple': 'past simple|паст симпл|прошедшее простое|простое прошедшее|что сделал|вчера',
    'future-simple': 'future simple|фьюче симпл|простое будущее|будущее простое|will',
    'present-continuous': 'present continuous|презент континиус|презент континьюс|настоящее длительное|прямо сейчас|процесс сейчас',
    'past-continuous': 'past continuous|паст континиус|паст континьюс|прошедшее длительное|процесс в прошлом',
    'future-continuous': 'future continuous|фьюче континиус|будущее длительное|процесс в будущем',
    'present-perfect': 'present perfect|презент перфект|настоящее совершенное|результат сейчас|have has',
    'past-perfect': 'past perfect|паст перфект|прошедшее совершенное|предпрошедшее|раньше другого прошлого',
    'future-perfect': 'future perfect|фьюче перфект|будущее совершенное|результат к моменту в будущем',
    'present-perfect-continuous': 'present perfect continuous|презент перфект континиус|процесс до сих пор|как долго уже',
    'past-perfect-continuous': 'past perfect continuous|паст перфект континиус|сколько длилось до прошлого момента',
    'future-perfect-continuous': 'future perfect continuous|фьюче перфект континиус|сколько наберется к будущему моменту',
    zero: 'zero conditional|нулевой тип|нулевое условное|закономерности',
    first: 'first conditional|первый тип|первое условное|реальное условие|если в будущем',
    second: 'second conditional|второй тип|второе условное|если бы сейчас|якобы да кабы|бы в настоящем',
    third: 'third conditional|третий тип|третье условное|если бы тогда|бы в прошлом',
    mixed: 'mixed conditional|смешанные условные|смешанный тип',
    inversion: 'инверси*|условие без if|were had should',
    wish: 'i wish|if only|жаль|желание о прошлом',
    'p-test': 'she her|he him|i me|как выбрать местоимение',
    'p-nom': 'я он она мы они|i he she we they|кто делает',
    'p-acc': 'мне меня ему его ей ее|me him her us them|после предлогов',
    'p-same': 'you it|не меняются',
    'p-pair': 'tom and i|tom and me|я и мой друг',
    'p-ru': 'мне нравится|у нее есть|мне нужно',
    'p-poss': 'my your his her its our their|чей|чья|притяжательн*',
    'p-his': 'him his|her hers|его ее их|its it s',
    'd-test': 'степени на слух|красивее|выше|сравнивать прилагательные',
    'd-short': 'er est|короткие прилагательные|окончания er est',
    'd-long': 'more most|the most|длинные прилагательные|самый красивый',
    'd-y': 'happy happier|слова на y|двусложные',
    'd-irr': 'good better best|bad worse worst|исключения сравнения',
    'd-than': 'than|чем|самый|taller than',
    'd-as': 'as as|такой же|less|менее',
    'd-adv': 'наречи*|much taller|усилители сравнения|more slowly',
    'v-focus': 'меня пригласили|что с ним сделали|актив и пассив|active passive|страдательный залог',
    'v-time': 'времена пассива|убирают убрали уберут|was done|is done|will be done',
    'v-neg': 'отрицание в пассиве|не сделали',
    'v-question': 'вопрос в пассиве|спросить сделали',
    'v-by': 'by|кем сделано|кем написано',
    'v-extra': 'being|been|can be|пассив сейчас',
    'a-one': 'a|неопределенный артикль|один из многих',
    'a-sound': 'an|a или an|a an|гласный звук|согласный звук|a university|an hour',
    'a-known': 'the|определенный артикль|та самая|bmw|бмв|the 5',
    'a-story': 'сначала a потом the|первое упоминание|повторное упоминание',
    'a-zero': 'без артикля|нулевой артикль|в целом|исчисляемые неисчисляемые',
    'a-other': 'артикль с my|my this|перед числами',
    'm-should': 'should|шуд|совет|стоит сделать|следует',
    'm-have': 'have to|хэв ту|нужно|надо|договорились|должен',
    'm-must': 'must|маст|обязан|обязательно',
    'm-not': 'mustn t|mustnt|dont have to|don t have to|нельзя или не обязательно',
    'm-past': 'should have|had to|должен был|нужно было|стоило купить',
    'l-can': 'can|could|кэн|могу|мог|умею|не могу',
    'l-request': 'may i|can i|could you|разрешени*|просьб*|можно мне|не мог бы ты',
    'l-chance': 'may|might|мэй|майт|вероятност*|возможно|может быть',
    'h-past': 'past по часам|twenty past|первая половина часа|после двенадцати',
    'h-to': 'to по часам|twenty to|без двадцати|без десяти|следующий час',
    'h-quarter': 'half|quarter|половина первого|половина часа|четверть часа|полчаса|15 минут|30 минут',
    'h-exact': 'o clock|oclock|ровно час|электронные часы|время на табло',
    'n-small': 'числа до ста|цифры|единицы десятки|fifteen fifty|forty|пятнадцать пятьдесят',
    'n-big': 'большие числа|составные числа|тысяч*|миллион*|сотни|hundred|thousand|million|152365|152 365',
    'n-order': 'порядковые|второй этаж|второй|first second third|который по счету',
    'n-compound': 'двадцать первый|21st|22nd|23rd|th|окончания чисел|сто первый',
    'g-once': 'двойное отрицание|два отрицания|никто не|никогда не|ничего не|я видел никого|never|nobody|nothing|nowhere|no one',
    'g-any': 'any anybody anything anywhere|nobody anybody|nothing anything|после отрицания|not any',
    'g-questions': 'вопросы с отрицанием|отрицательные вопросы|did nobody|ever|когда нибудь',
    'g-either': 'either|either or|или или',
    'g-neither': 'neither|nor|neither nor|ни ни|ни чай ни кофе',
    'g-both': 'both|both and|и и|оба',
  };
  const groups = [
    ['sentence', 'Основа', 's-hero', 'основа|начать|начало|с нуля|основы|предложени*'],
    ['tenses', 'Времена', 't-hero', 'времена|времен*|tenses|время|12 времен'],
    ['cond', 'Условные предложения', 'c-hero', 'условн*|conditionals|conditional|кондишнл|если|если бы'],
    ['pron', 'Местоимения', 'p-hero', 'местоимен*|pronouns'],
    ['deg', 'Степени сравнения', 'd-hero', 'степен*|сравнен*|прилагательн*|comparison|comparatives'],
    ['passive', 'Пассив', 'v-hero', 'пассив*|passive|залог'],
    ['articles', 'Артикли', 'a-hero', 'артикл*|articles'],
    ['obligation', 'Долженствование', 'm-hero', 'долженствован*|должен|обязанности|must have to should'],
    ['modals', 'Модальные глаголы', 'l-hero', 'модальн*|modal|modals'],
    ['clock', 'Время по часам', 'h-hero', 'время по часам|говорить время|называть время|час*|clock|time|время|циферблат*'],
    ['numbers', 'Числа и цифры', 'n-hero', 'числ*|цифр*|numbers|numerals'],
    ['negation', 'Отрицания и связки', 'g-hero', 'отрицани*|связк*|negation|союзы'],
  ];
  const catalog = [];
  const plainText = value => {
    const span = document.createElement('span');
    span.innerHTML = String(value || '').replace(/<br\s*\/?\s*>/gi, ' ');
    return span.textContent.replace(/\s+/g, ' ').trim();
  };
  const chunksOf = station => [
    {id: station.id, title: station.name, text: plainText(station.lead)},
    ...station.blocks.map((block, index) => ({
      id: station.id + '-block-' + (index + 1), title: block.h,
      text: plainText(block.h + ' ' + block.p)
    })),
    {id: station.id + '-examples', title: 'Как это звучит',
      text: station.ex.map(ex => plainText(ex.en + ' ' + ex.ru + ' ' + (ex.nb || ''))).join(' ')},
    ...Object.entries(station.forms).map(([kind, text]) => ({
      id: station.id + '-form-' + kind, title: {p:'Утверждение', n:'Отрицание', q:'Вопрос'}[kind],
      text: plainText(text), kind
    }))
  ].map(chunk => ({...chunk, words: [...new Set(tokens(chunk.text))]}));
  const asAliases = value => (value || '').split('|').filter(Boolean).map(normal);
  for (const [tab, group, id, words] of groups) {
    catalog.push({id, title: group, group, section: true, names: tokens(group), aliases: asAliases(words)});
    for (const station of TABDEF[tab].items) {
      const chunks = chunksOf(station);
      catalog.push({ id: station.id, title: station.name, group, tab, station, chunks, section: false,
        names: tokens(station.name + ' ' + (station.short || '') + ' ' + (station.core || '')),
        body: [...new Set(chunks.flatMap(chunk => chunk.words))],
        aliases: asAliases(aliases[station.id]) });
    }
    for (const item of TABDEF[tab].nav) {
      if (!/-quiz$|-sheet$|-system$|-duels$/.test(item.id)) continue;
      catalog.push({id: item.id, title: item.n, group, section: false,
        names: tokens(group + ' ' + item.n + ' ' + item.s + ' ' +
          (item.id.endsWith('-system') ? 'конструктор' : item.id.endsWith('-quiz') ? 'тест задания упражнения' : item.id.endsWith('-sheet') ? 'шпаргалка таблица' : 'сравнение')),
        aliases: []});
    }
  }
  const info = [
    {id: 'home-guide', title: 'Как заниматься', group: 'Главная', section: true, names: tokens('как заниматься пользоваться курсом'), aliases: asAliases('как заниматься|как пользоваться|маршрут|с чего начать')},
    {id: 'home-practice', title: 'Дополнительный тренажёр', group: 'Главная', section: true, names: tokens('дополнительные задания тренажер упражнения'), aliases: asAliases('тренажер|упражнени*|дополнительные задания|домашняя работа|домашнее задание')},
  ];
  catalog.push(...info);

  // Допускаем одну опечатку в достаточно длинном слове, включая перестановку букв.
  function closeWord(a, b) {
    if (a === b) return true;
    if (Math.min(a.length, b.length) < 5 || Math.abs(a.length - b.length) > 1) return false;
    if (a.length === b.length) {
      const differences = [];
      for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) differences.push(i);
      return differences.length === 1 || (differences.length === 2 &&
        differences[1] === differences[0] + 1 &&
        a[differences[0]] === b[differences[1]] && a[differences[1]] === b[differences[0]]);
    }
    const short = a.length < b.length ? a : b;
    const long = a.length < b.length ? b : a;
    let i = 0, j = 0, skipped = false;
    while (i < short.length && j < long.length) {
      if (short[i] === long[j]) { i++; j++; }
      else if (!skipped) { j++; skipped = true; }
      else return false;
    }
    return true;
  }
  function wordMatch(query, word) {
    if (word.endsWith('*')) return query.startsWith(word.slice(0, -1));
    if (query === word) return true;
    if (/^[а-я]+$/.test(query) && /^[а-я]+$/.test(word)) {
      const stem = value => value.replace(/(иями|ами|ями|ого|его|ому|ему|ыми|ими|ую|юю|ая|яя|ое|ее|ие|ые|ий|ый|ой|ым|им|ом|ем|ах|ях|ов|ей|ам|ям|ы|и|а|я|у|ю|е|о)$/, '');
      if (stem(query).length >= 3 && stem(query) === stem(word)) return true;
    }
    return closeWord(query, word);
  }

  const formNames = {p: 'утверждение', n: 'отрицание', q: 'вопрос'};
  const timeNames = {past:'прошлое', present:'настоящее', future:'будущее'};
  let previousContext = null;
  function queryContext(query) {
    const q = normal(query).replace(/\b(where can i find|where do i find|where is|where are|show me)\b/g, ' ');
    const words = tokens(q);
    const forms = [];
    if (/отрицан|отрицател|\bnegative\b|\bnot\b|n't\b|\b(dont|doesnt|didnt|isnt|arent|wasnt|werent|havent|hasnt|hadnt|wont|wouldnt|couldnt|shouldnt|mustnt|cant)\b|(?:^| )не(?: |$)/u.test(q) ||
      words.some(word => wordMatch(word, 'отрицание') || wordMatch(word, 'отрицательный'))) forms.push('n');
    if (/вопрос|спросить|\bquestions?\b|\binterrogative\b/u.test(q) ||
      words.some(word => wordMatch(word, 'вопрос'))) forms.push('q');
    if (/утвержд|утвердител|\baffirmative\b|\bpositive\b/u.test(q)) forms.push('p');
    const times = [];
    if (/прошл|прошедш|предпрош|вчера|\bpast\b|паст|\bdid\b|didn/u.test(q) ||
      words.some(word => wordMatch(word, 'прошлом') || wordMatch(word, 'прошедшем'))) times.push('past');
    if (/настоящ|сейчас|\bpresent\b|презент/u.test(q)) times.push('present');
    if (/будущ|завтра|\bfuture\b|фьюче/u.test(q)) times.push('future');
    const perfect = /\bperfect\b|перфект|совершенн/u.test(q);
    const continuous = /\bcontinuous\b|континиус|континьюс|длительн|процесс/u.test(q);
    const aspect = perfect && continuous ? 'perfectcont' : perfect ? 'perfect' : continuous ? 'continuous'
      : /\bsimple\b|симпл|простое|простом|простой/u.test(q) ? 'simple' : null;

    // Сначала ищем длинные названия, чтобы Past Perfect не перехватывал
    // запрос про Past Perfect Continuous.
    let remaining = ' ' + q + ' ';
    const named = [];
    const names = T.flatMap(station =>
      [normal(station.name), ...asAliases(aliases[station.id]).slice(0, 4)]
        .filter(name => !name.includes('*')).map(name => ({id:station.id, name})))
      .sort((a, b) => b.name.length - a.name.length);
    for (const {id, name} of names) {
      if (remaining.includes(' ' + name + ' ')) {
        if (!named.includes(id)) named.push(id);
        remaining = remaining.replaceAll(' ' + name + ' ', ' ');
      } else {
        const parts = tokens(name);
        if (!parts.length || (parts.length === 1 && parts[0].length < 5)) continue;
        const available = remaining.trim().split(' ');
        const used = new Set();
        const matches = parts.every(part => {
          const index = available.findIndex((word, i) => !used.has(i) && wordMatch(word, part));
          if (index < 0) return false;
          used.add(index);
          return true;
        });
        if (matches) {
          if (!named.includes(id)) named.push(id);
          remaining = ' ' + available.filter((_, i) => !used.has(i)).join(' ') + ' ';
        }
      }
    }
    let tab = null;
    if (/пассив|страдательн|\bpassive\b/u.test(q)) tab = 'passive';
    else if (/должен|обязан|\bmust\b|\bshould\b|\bhave to\b/u.test(q)) tab = 'obligation';
    else if (/модальн|\bmodal|\bcan\b|\bcould\b|\bmay\b|\bmight\b/u.test(q)) tab = 'modals';
    else if (/\bto be\b|\bbe\b|am is are|was were/u.test(q)) tab = 'sentence';
    else if (/условн|\bconditional|\bif\b/u.test(q)) tab = 'cond';
    else if (/артикл|\barticles?\b/u.test(q)) tab = 'articles';
    else if (/местоимен|\bpronouns?\b/u.test(q)) tab = 'pron';
    const topicExplicit = Boolean(tab);
    if (!tab && (named.length || times.length || aspect)) tab = 'tenses';
    return {forms, times, aspect, named, tab, topicExplicit};
  }
  function formTimes(text) {
    const value = plainText(text).toLowerCase().replace(/[’‘]/g, "'");
    const found = [];
    if (/\b(did|was|were|had|could)\b|\b(didn't|wasn't|weren't|hadn't|couldn't)\b/.test(value)) found.push('past');
    if (/\bwill\b|\bwon't\b/.test(value)) found.push('future');
    if (/\b(am|is|are|do|does|have|has|can)\b|\b(isn't|aren't|don't|doesn't|haven't|hasn't|can't)\b/.test(value)) found.push('present');
    return found;
  }
  function chunkForms(chunk) {
    if (chunk.kind) return [chunk.kind];
    const text = chunk.text.toLowerCase().replace(/[’‘]/g, "'");
    const kinds = [];
    if (/\bnot\b|n't\b|отрицан|отрицател|\b(never|nobody|nothing|nowhere)\b/u.test(text)) kinds.push('n');
    if (/\?|вопрос|спрос/u.test(text)) kinds.push('q');
    if (/утвержд|утвердител/u.test(text)) kinds.push('p');
    return kinds;
  }
  function contextSearch(query) {
    let context = queryContext(query);
    const continuation = /^(а(?: |$)|тогда |теперь |в (будущем|настоящем|прошлом)( времени)?$)/u.test(normal(query));
    if (previousContext && continuation &&
      (!context.topicExplicit || context.tab === previousContext.tab)) {
      context = {
        ...context,
        forms: context.forms.length ? context.forms : previousContext.forms,
        times: context.times.length ? context.times : previousContext.times,
        named: context.named.length ? context.named
          : context.times.length || context.aspect ? [] : previousContext.named,
        aspect: context.aspect || previousContext.aspect,
        tab: context.topicExplicit || context.named.length ? context.tab : previousContext.tab
      };
    }
    if (!context.forms.length || !context.tab) return null;
    if (/циферблат|по часам|минут|\bquarter\b|\bhalf\b/u.test(normal(query))) return null;
    if (context.tab === 'tenses' && /двойно|никто|никогда|ничего|\bnobody\b|\bnever\b|\bnothing\b/u.test(normal(query)) && !context.named.length) return null;
    let entries = catalog.filter(item => item.station && item.tab === context.tab);
    if (context.tab === 'sentence') entries = entries.filter(item => item.id === 's-be');
    if (context.tab === 'tenses') {
      if (context.named.length) entries = entries.filter(item => context.named.includes(item.id));
      else {
        if (context.times.length) entries = entries.filter(item => context.times.includes(item.station.zone));
        if (context.aspect) entries = entries.filter(item => item.station.aspect === context.aspect);
      }
      // Названные времена из разных зон оставляем все. Для неопределённого
      // «прошлого» показываем все четыре варианта, а не только Simple.
      entries.sort((a, b) => a.station.idx - b.station.idx);
    } else {
      entries = entries.map(item => ({
        ...item,
        matchedChunks: context.forms.map(kind => item.chunks.filter(chunk =>
          chunkForms(chunk).includes(kind) &&
          (!context.times.length || formTimes(chunk.text).some(time => context.times.includes(time))))
          .sort((a, b) => Number(b.kind === kind) - Number(a.kind === kind))[0])
      })).filter(item => item.matchedChunks.every(Boolean));
    }
    const kind = context.forms[0];
    if (context.tab === 'passive') {
      entries.sort((a, b) => Number(b.id === (kind === 'q' ? 'v-question' : 'v-neg')) -
        Number(a.id === (kind === 'q' ? 'v-question' : 'v-neg')));
    }
    const requested = context.forms.map(form => formNames[form]).join(' и ');
    const matched = entries.map(item => {
      const multiple = context.forms.length > 1;
      const chunks = item.matchedChunks;
      const formsOnly = !chunks || chunks.every(chunk => chunk.kind);
      return {
        id: formsOnly ? item.id + (multiple ? '-forms' : '-form-' + kind)
          : multiple ? item.id : chunks[0].id,
        title: item.title + ' — ' + requested,
        group: item.group, section: false,
        location: item.group + ' → формы предложений',
        excerpt: chunks ? chunks.map(chunk => chunk.text).join(' · ')
          : context.forms.map(form => plainText(item.station.forms[form])).join(' · ')
      };
    });
    const limit = context.tab === 'tenses' ? 12 : 4;
    const matchedTimes = context.tab === 'tenses' ? [...new Set(entries.map(item => item.station.zone))] : context.times;
    const time = matchedTimes.length === 1 ? ' · ' + timeNames[matchedTimes[0]] : '';
    return {
      items: matched.slice(0, limit),
      context,
      message: matched.length
        ? 'Ищу: ' + requested + time + '. ' + (matched.length > 1
          ? 'В подходящих уроках есть отдельные формы предложений. Выбери нужный вариант:'
          : 'Вот ссылка прямо на нужную форму в уроке:')
        : 'Не нашёл в курсе отдельной формы для этого сочетания темы и времени. Уточни запрос или выбери раздел через «Все темы».'
    };
  }
  function rank(query) {
    const q = normal(query);
    const terms = tokens(q);
    if (!terms.length) return catalog.filter(item =>
      item.aliases.some(alias => alias.length > 2 && !alias.includes('*') &&
        (' ' + q + ' ').includes(' ' + alias + ' '))).slice(0, 4);
    const ranked = catalog.map(item => {
      const all = [...item.names, ...item.aliases.flatMap(a => a.split(' '))].filter(w => !stop.has(w));
      const hits = terms.filter(t => all.some(w => wordMatch(t, w)));
      const bodyHits = terms.filter(t => (item.body || []).some(w => wordMatch(t, w)));
      const combined = terms.filter(t => hits.includes(t) || bodyHits.includes(t));
      // Одно случайное слово из примера не считается темой. При этом длинный
      // запрос может находить объяснение, даже если его нет в заголовке.
      if (!hits.length && (bodyHits.length < 2 || bodyHits.length / terms.length < .75)) return {item, score: 0};
      const coverage = combined.length / terms.length;
      let phrase = 0;
      for (const alias of item.aliases) {
        const parts = alias.split(' ');
        const useful = parts.filter(w => !stop.has(w));
        if (!useful.length) continue;
        if (parts.length === 1 && parts[0].length < 3 && q !== alias) continue;
        const exact = (' ' + q + ' ').includes(' ' + alias + ' ');
        const covered = useful.every(w => terms.some(t => wordMatch(t, w)));
        if (exact) phrase = Math.max(phrase, 55 + Math.min(25, useful.length * 7));
        else if (covered) phrase = Math.max(phrase, 30 + Math.min(20, useful.length * 5));
      }
      const nameHits = terms.filter(t => item.names.some(w => wordMatch(t, w))).length;
      const score = coverage * 45 + Math.min(hits.length, 5) * 6 + Math.min(bodyHits.length, 5) * 2 + phrase +
        (nameHits === terms.length && terms.length > 1 ? 30 : 0);
      let target = item;
      if (item.chunks && (!hits.length || (terms.length >= 3 && hits.length / terms.length < .5))) {
        const best = item.chunks.map(chunk => ({chunk, count: terms.filter(t =>
          chunk.words.some(w => wordMatch(t, w))).length})).sort((a, b) => b.count - a.count)[0];
        if (best.count >= 2) target = {...item, id:best.chunk.id,
          title:item.title + ' — ' + best.chunk.title, excerpt:best.chunk.text};
      }
      return {item:target, score: coverage >= .5 ? score : 0};
    }).filter(hit => hit.score >= 48).sort((a, b) => b.score - a.score || Number(b.item.section) - Number(a.item.section));
    if (!ranked.length) return [];
    return ranked.filter(hit => hit.score >= Math.max(48, ranked[0].score - 25) &&
      !(terms.length === 1 && ranked[0].item.section && !hit.item.section))
      .slice(0, 4).map(hit => hit.item);
  }
  function clear() {
    panel.classList.add('course-nav--searched');
    results.replaceChildren();
    question.hidden = true;
    status.textContent = '';
    panel.querySelector('.course-nav__body').scrollTop = 0;
  }
  function showLinks(items) {
    const list = document.createElement('ul');
    list.className = 'course-nav__links';
    for (const item of items) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + item.id;
      const name = document.createElement('span');
      name.textContent = item.title;
      const location = document.createElement('small');
      location.textContent = item.location || (item.section ? 'Открыть раздел' : item.group + ' → открыть тему');
      a.append(name, location);
      if (item.excerpt) {
        const excerpt = document.createElement('p');
        excerpt.className = 'course-nav__excerpt';
        excerpt.textContent = item.excerpt.length > 240 ? item.excerpt.slice(0, 237) + '…' : item.excerpt;
        a.append(excerpt);
      }
      li.append(a);
      list.append(li);
    }
    results.append(list);
    results.scrollTop = 0;
  }
  function search(value) {
    const query = value.trim().slice(0, 240);
    if (!query) { input.focus(); return; }
    clear();
    question.textContent = query;
    question.hidden = false;
    // Это навигатор: у него нет обработчика переводов или свободных ответов.
    if (/\b(translate|translation)\b|переведи|переведите|сделай перевод|как перевести|реши задани|напиши сочинени|напиши эссе|реши пример/iu.test(query)) {
      status.textContent = 'Я помогаю найти тему в методичке. Напиши, какое правило ищешь, например «артикли» или «вопросы в прошлом».';
      return;
    }
    const context = contextSearch(query);
    const found = context ? context.items : rank(query);
    previousContext = context && found.length ? context.context : null;
    if (!found.length) {
      status.textContent = context?.message || 'Не нашёл подходящую тему. Попробуй назвать правило короче или нажми «Все темы». Я могу подсказать только, где что находится в этой методичке.';
      return;
    }
    status.textContent = context?.message || (found.length === 1 ? 'Нашёл подходящий раздел. Нажми, чтобы перейти:' : 'Вот подходящие темы. Выбери нужную:');
    showLinks(found);
  }
  function setOpen(open, restoreFocus = true) {
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    if (open) input.focus({preventScroll: true});
    else if (restoreFocus) launcher.focus({preventScroll: true});
  }
  launcher.hidden = false;
  document.body.classList.add('course-nav-ready');
  launcher.addEventListener('click', () => setOpen(panel.hidden));
  document.getElementById('courseNavigatorClose').addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) { event.preventDefault(); setOpen(false); }
  });
  form.addEventListener('submit', event => { event.preventDefault(); search(input.value); });
  panel.addEventListener('click', event => {
    const example = event.target.closest('[data-nav-query]');
    if (example) { input.value = example.dataset.navQuery; search(input.value); return; }
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    setOpen(false, false);
    requestAnimationFrame(() => {
      const target = document.getElementById(link.hash.slice(1));
      const heading = target?.querySelector('h1,h2,h3') || target;
      if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({preventScroll: true}); }
    });
  });
  document.getElementById('courseNavigatorAll').addEventListener('click', () => {
    previousContext = null;
    clear();
    status.textContent = 'Все темы методички. Нажми на раздел, чтобы открыть его:';
    showLinks(catalog.filter(item => item.section && item.group !== 'Главная'));
  });
})();
