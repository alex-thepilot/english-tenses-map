const MLEVELS = [
  { n: 1, ru: 'Выбор слова', title: 'Совет, необходимость и обязанность', code: 'should · have to · must',
    txt: 'Сначала спроси себя, что хочешь передать. Ты советуешь, напоминаешь о договорённости или говоришь, что сделать обязательно?' },
  { n: 2, ru: 'Отрицание и прошлое', title: 'Нельзя, не нужно и надо было', code: 'mustn’t · don’t have to · had to',
    txt: 'Сравним «лучше не делать», «можно не делать» и «нельзя». Потом перенесём наши примеры в прошлое.' }
];

const M = [
  {
    id: 'm-should', zone: 'present', level: 1, idx: 1, short: 'Совет',
    name: 'Should — стоит сделать', core: 'You should buy three candies.',
    thesis: 'Так будет лучше, решать тебе',
    lead: 'Ты собираешься купить две конфеты, а вас трое. Я говорю <b>You should buy three candies</b>. Стоит взять три, тогда хватит и тебе. Никакого уговора о трёх конфетах не было. Я просто подсказываю.',
    blocks: [
      { kind: 'key', h: 'Можно подставить «стоит»', p: 'После <b>should</b> ставим глагол как в словаре. <b>Should buy</b> — стоит купить. Даже с he или she ничего не добавляем.' },
      { kind: 'plain', h: 'Как спросить совета', p: '<b>Should I buy three?</b> — «Мне стоит купить три?» Для вопроса ставим <b>should</b> перед <b>I</b>. <b>Shouldn’t</b> значит «лучше не делать».' }
    ],
    forms: { p: 'You <b>should buy</b> three.', n: 'You <b>shouldn’t buy</b> two.', q: '<b>Should</b> I buy three?' },
    markers: ['стоит', 'я бы посоветовал', 'лучше не'],
    ex: [
      { en: 'You should take an umbrella.', ru: 'Тебе стоит взять зонт.' },
      { en: 'Should I call her now?', ru: 'Мне стоит ей сейчас позвонить?' },
      { en: 'You shouldn’t skip breakfast.', ru: 'Тебе лучше не пропускать завтрак.' }
    ]
  },
  {
    id: 'm-have', zone: 'past', level: 1, idx: 2, short: 'Надо',
    name: 'Have to — надо, потому что так вышло или так договорились', core: 'You have to buy three candies.',
    thesis: 'Есть причина, по которой это нужно сделать',
    lead: 'Мы заранее договорились, что ты принесёшь три конфеты. Напоминаю <b>You have to buy three candies</b>. Купить их или нет решаешь ты. Чтобы выполнить уговор, нужно принести именно три конфеты.',
    blocks: [
      { kind: 'key', h: 'С he, she и it говорим has to', p: '<b>I have to leave</b> — мне нужно уйти. <b>She has to leave</b> — ей нужно уйти. Дальше <b>leave</b> остаётся как в словаре.' },
      { kind: 'plain', h: 'Для вопроса нужен do или does', p: '<b>Do I have to bring anything?</b> — «Мне нужно что-нибудь принести?» С she спрашиваем <b>Does she have to bring anything?</b> После <b>does</b> снова пишем <b>have to</b>.' },
      { kind: 'plain', h: 'Причина может быть серьёзной', p: '<b>We have to leave now or we’ll miss the train.</b> Нам надо уходить сейчас, иначе опоздаем. <b>Have to</b> подходит и для строгих правил, если ты объясняешь, что от тебя требуют.' }
    ],
    forms: { p: 'She <b>has to</b> leave.', n: 'She <b>doesn’t have to</b> leave.', q: '<b>Does</b> she <b>have to</b> leave?' },
    markers: ['мы договорились', 'по правилам', 'иначе опоздаем'],
    ex: [
      { en: 'I have to get up at six. My shift starts at seven.', ru: 'Мне надо встать в шесть. Смена начинается в семь.' },
      { en: 'Do we have to pay in advance?', ru: 'Нам обязательно платить заранее?' }
    ]
  },
  {
    id: 'm-must', zone: 'future', level: 1, idx: 3, short: 'Обязан',
    name: 'Must — это обязательно', core: 'You must help her.',
    thesis: 'Говорю прямо, что считаю это обязательным',
    lead: '«Ты обязан ей помочь. Она твоя дочь». Если говорю об этом сейчас, получится <b>You must help her. She’s your daughter.</b> Здесь я прямо говорю, что считаю помощь обязанностью.',
    blocks: [
      { kind: 'key', h: 'После must ставим глагол как в словаре', p: '<b>You must help</b>, <b>he must help</b>. Ни <b>to</b>, ни окончания <b>-s</b> добавлять не нужно. Это работает и в правилах: <b>Visitors must show ID</b>.' },
      { kind: 'plain', h: 'Must и have to иногда подходят оба', p: 'В инструкции можно написать <b>You must show ID</b> — предъявите документ, это обязательно. Другу можно объяснить <b>We have to show ID</b> — нам нужно предъявить документ, таковы правила. Требование одно и то же.' },
      { kind: 'plain', h: 'Как спросить, обязательно ли', p: '<b>Must I sign here?</b> — «Мне обязательно подписать здесь?» Ставим <b>must</b> перед <b>I</b>. В обычном разговоре часто спрашивают <b>Do I have to sign here?</b>' }
    ],
    forms: { p: 'You <b>must</b> sign here.', n: 'You <b>mustn’t</b> sign for someone else.', q: '<b>Must</b> I sign here?' },
    markers: ['обязательно', 'требование', 'считаю своим долгом'],
    ex: [
      { en: 'You must wear a seat belt.', ru: 'Ремень обязательно нужно пристегнуть.' },
      { en: 'I must apologize to her.', ru: 'Я должен перед ней извиниться.' }
    ]
  },
  {
    id: 'm-not', zone: 'present', level: 2, idx: 4, short: 'Отрицание',
    name: 'Mustn’t — нельзя. Don’t have to — не обязательно', core: 'mustn’t ≠ don’t have to',
    thesis: 'Можно пропустить или нельзя делать?',
    lead: '<b>You mustn’t bring food into the lab.</b> Еду в лабораторию приносить нельзя. <b>You don’t have to bring food to the party.</b> На вечеринку еду приносить не обязательно. Захочешь — принеси.',
    blocks: [
      { kind: 'key', h: 'Сначала переведи «не должен»', p: 'Если по смыслу <b>«нельзя»</b>, ставим <b>mustn’t</b>. Если <b>«можешь не делать»</b>, ставим <b>don’t have to</b>. С he, she и it говорим <b>doesn’t have to</b>.' },
      { kind: 'plain', h: 'Shouldn’t оставляет выбор', p: '<b>You shouldn’t drink coffee this late.</b> Тебе лучше не пить кофе так поздно. Это совет, а запрет звучал бы как <b>You mustn’t drink coffee here</b>.' }
    ],
    forms: { p: 'You <b>have to</b> bring a pen.', n: 'You <b>don’t have to</b> bring a pen.', q: '<b>Do</b> I <b>have to</b> bring a pen?' },
    markers: ['нельзя', 'можно не делать', 'лучше не делать'],
    ex: [
      { en: 'You mustn’t touch the exhibits.', ru: 'Экспонаты трогать нельзя.' },
      { en: 'You don’t have to print the ticket.', ru: 'Билет распечатывать не обязательно.' },
      { en: 'She shouldn’t stay up so late.', ru: 'Ей лучше не засиживаться так допоздна.' }
    ]
  },
  {
    id: 'm-past', zone: 'past', level: 2, idx: 5, short: 'Прошлое',
    name: 'Стоило купить или нужно было купить?', core: 'should have bought · had to buy',
    thesis: 'Смотрю назад и спрашиваю, был ли это совет или обязанность',
    lead: 'Ты уже купил две конфеты. Теперь видно, что тебе не хватит. <b>You should have bought three candies</b> — «Стоило купить три». Если мы заранее договорились о трёх, можно сказать <b>You had to buy three candies</b> — «Тебе нужно было купить три, мы же договорились».',
    blocks: [
      { kind: 'key', h: 'Стоило сделать тогда', p: 'Ставим <b>should have</b> и третью форму глагола. У <b>buy</b> это <b>bought</b>. <b>You shouldn’t have bought only two</b> — «Не стоило покупать всего две».' },
      { kind: 'plain', h: 'Обязан был тогда', p: '<b>You had to help her. She’s your daughter.</b> — «Ты был обязан ей помочь. Она твоя дочь». Если рассказываем о том, что было нужно или обязательно в прошлом, берём <b>had to</b>. Дальше <b>help</b> как в словаре.' },
      { kind: 'trap', h: 'Must have — это уже догадка', p: '<b>He must have bought three</b> значит «Он, должно быть, купил три». Мы догадываемся, что он сделал. Чтобы сказать «ему нужно было купить три», говорим <b>He had to buy three</b>.' },
      { kind: 'plain', h: 'Само действие могло не случиться', p: '<b>He had to call me, but he didn’t.</b> Ему нужно было позвонить, но он не позвонил. <b>Had to</b> говорит, что нужно было сделать. Что вышло на деле, понятно из остальной фразы.' }
    ],
    forms: { p: 'He <b>had to</b> call.', n: 'He <b>didn’t have to</b> call.', q: '<b>Did</b> he <b>have to</b> call?' },
    markers: ['стоило тогда', 'нужно было', 'не обязательно было'],
    ex: [
      { en: 'I should have told you sooner.', ru: 'Мне стоило сказать тебе раньше.' },
      { en: 'Did you have to wait long?', ru: 'Тебе пришлось долго ждать?' },
      { en: 'They didn’t have to pay.', ru: 'Им не нужно было платить.' }
    ]
  }
];

const MDUELS = [
  { q: 'Одна покупка, две причины взять три',
    a: { z: 'present', n: 'Совет после покупки', en: 'You should have bought three.', ru: 'Стоило купить три.', why: 'Уже купили две. Теперь видно, что всем не хватит.' },
    b: { z: 'past', n: 'Договорились заранее', en: 'You had to buy three.', ru: 'Тебе нужно было купить три.', why: 'Три конфеты были частью уговора до покупки.' },
    r: 'Should have bought оценивает покупку задним числом. Had to buy передаёт, что требовалось тогда.' },
  { q: 'Нельзя или можно не делать?',
    a: { z: 'future', n: 'Запрет', en: 'You mustn’t bring a bag.', ru: 'С сумкой нельзя.', why: 'Сумку проносить запрещено.' },
    b: { z: 'present', n: 'По желанию', en: 'You don’t have to bring a bag.', ru: 'Сумку брать не обязательно.', why: 'Можно прийти и без неё.' },
    r: '«Нельзя» — mustn’t. «Можно не брать» — don’t have to.' },
  { q: 'Должен был или должно быть?',
    a: { z: 'past', n: 'Обязанность', en: 'She had to lock the door.', ru: 'Ей нужно было запереть дверь.', why: 'Мы знаем, что от неё требовалось.' },
    b: { z: 'future', n: 'Догадка', en: 'She must have locked the door.', ru: 'Она, должно быть, заперла дверь.', why: 'Мы делаем вывод, что дверь уже заперта.' },
    r: 'Had to передаёт «нужно было», а must have здесь передаёт «должно быть».' }
];
