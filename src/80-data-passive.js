const VLEVELS = [
  { n: 1, title: 'Что с ним сделали?', code: 'be + V3', ru: 'Основа',
    txt: 'Выберите, про кого или про что говорите, и соберите фразу в настоящем, прошедшем или будущем.' },
  { n: 2, title: 'Нет, вопрос и автор', code: 'not · ? · by', ru: 'Собираем фразу',
    txt: 'Переставьте помощника для вопроса, добавьте not для отрицания или назовите того, кто это сделал.' },
  { n: 3, title: 'Действие сейчас, результат и возможность', code: 'being · been · can be', ru: 'Дальше',
    txt: 'Потренируйтесь говорить о процессе, готовом результате и о том, что можно сделать.' }
];

const V = [
  {
    id: 'v-focus', zone: 'present', level: 1, idx: 1, short: 'Фокус',
    name: 'Кто сделал? Что с ним сделали?', core: 'They invited me. → I was invited.',
    thesis: 'Начинаем с того, про кого хотим рассказать',
    lead: '«Они пригласили меня» начинается с тех, кто пригласил. «Меня пригласили» начинается с человека, с которым это произошло. В английском можно сделать тот же выбор.',
    fig: {
      rows: [
        { l: 'Кто сделал?', tr: [['subj','They'],['verb','invited'],['rest','me'],['end','.']] },
        { l: 'Что со мной сделали?', tr: [['subj','I'],['aux','was'],['verb','invited'],['end','.']] }
      ],
      cap: 'По-русски «меня», по-английски на первом месте I. Связка was invited говорит, что приглашение получил я.'
    },
    blocks: [
      { kind: 'key', h: 'Спросите «что с ним сделали?»', p: '«Нам заплатили», «окно разбили», «посылку доставили». Мы уже знаем, про кого или про что говорим. Ставим это слово первым и добавляем <b>be + третью форму глагола</b>.' },
      { kind: 'trap', h: 'Что меняет was', p: '<b>I invited Anna</b> — я пригласил Анну. <b>I was invited</b> — меня пригласили. Для второго смысла нужны оба слова: <b>was invited</b>.' }
    ],
    forms: { p: 'I <b>was invited</b>.', n: 'I <b>wasn’t invited</b>.', q: '<b>Was</b> I <b>invited</b>?' },
    markers: ['меня пригласили', 'нам сказали', 'окно разбили'],
    ex: [
      { en: 'The window was broken.', ru: 'Окно разбили.' },
      { en: 'We were told to wait outside.', ru: 'Нам сказали подождать снаружи.' },
      { en: 'I was invited to the wedding.', ru: 'Меня пригласили на свадьбу.' }
    ]
  },
  {
    id: 'v-time', zone: 'present', level: 1, idx: 2, short: 'Время',
    name: 'Убирают, убрали, уберут', core: 'is cleaned · was cleaned · will be cleaned',
    thesis: 'Время меняется, третья форма остаётся',
    lead: 'Берём одну комнату. «Её убирают каждый день» — <b>is cleaned</b>. «Её убрали вчера» — <b>was cleaned</b>. «Её уберут завтра» — <b>will be cleaned</b>.',
    blocks: [
      { kind: 'key', h: 'Подберите be под время и количество', p: 'С одной комнатой <b>is / was</b>, с несколькими <b>are / were</b>. С <b>I</b> сейчас будет <b>am</b>, в прошлом <b>was</b>. С <b>you</b> — <b>are / were</b>. Для будущего у всех одна связка <b>will be</b>.' },
      { kind: 'trap', h: 'Берём третье слово в ряду', p: 'У обычных глаголов подойдёт форма с <b>-ed</b>: <b>cleaned</b>, <b>invited</b>. У неправильных берём третью форму: <b>write — wrote — written</b>, <b>send — sent — sent</b>, <b>break — broke — broken</b>.' }
    ],
    forms: { p: 'The room <b>will be cleaned</b>.', n: 'The room <b>won’t be cleaned</b>.', q: '<b>Will</b> the room <b>be cleaned</b>?' },
    markers: ['every day', 'yesterday', 'tomorrow'],
    ex: [
      { en: 'These rooms are cleaned every day.', ru: 'Эти комнаты убирают каждый день.' },
      { en: 'The letter was written yesterday.', ru: 'Письмо написали вчера.' },
      { en: 'The tickets will be sent tomorrow.', ru: 'Билеты отправят завтра.' }
    ]
  },
  {
    id: 'v-neg', zone: 'future', level: 2, idx: 3, short: 'Отрицание',
    name: 'Как сказать «не сделали»', core: 'первый помощник + not',
    thesis: 'Not стоит сразу после первого помощника',
    lead: '«Комнату убрали» — <b>was cleaned</b>. «Комнату не убрали» — <b>was not cleaned</b>. Добавьте <b>not</b> сразу после первого помощника.',
    blocks: [
      { kind: 'key', h: 'С will работает то же правило', p: '<b>will be cleaned → will not be cleaned</b>. Первым стоит <b>will</b>, после него и ставим <b>not</b>.' },
      { kind: 'plain', h: 'Как это сокращают в разговоре', p: '<b>is not → isn’t</b>, <b>were not → weren’t</b>, <b>will not → won’t</b>. После сокращения остальные слова остаются на месте.' }
    ],
    forms: { p: 'The bike <b>was repaired</b>.', n: 'The bike <b>wasn’t repaired</b>.', q: '<b>Was</b> the bike <b>repaired</b>?' },
    markers: ['isn’t', 'weren’t', 'won’t be'],
    ex: [
      { en: 'My name wasn’t printed on the ticket.', ru: 'Моё имя не напечатали на билете.' },
      { en: 'The rooms aren’t cleaned on Sundays.', ru: 'Комнаты не убирают по воскресеньям.' },
      { en: 'The room won’t be cleaned tomorrow.', ru: 'Комнату не уберут завтра.' }
    ]
  },
  {
    id: 'v-question', zone: 'future', level: 2, idx: 4, short: 'Вопрос',
    name: 'Как спросить «сделали?»', core: 'первый помощник → кто / что → остальное',
    thesis: 'Первый помощник переезжает вперёд',
    lead: '«Письмо отправили» — <b>The letter was sent</b>. «Письмо отправили?» — <b>Was the letter sent?</b> В начало переехало только <b>was</b>.',
    blocks: [
      { kind: 'key', h: 'Если есть will, вперёд идёт will', p: '<b>The room will be cleaned</b> → <b>Will the room be cleaned?</b> Слово <b>be</b> остаётся рядом с <b>cleaned</b>.' },
      { kind: 'plain', h: 'Когда, почему, где', p: 'Поставьте вопросительное слово перед помощником: <b>When was the letter sent?</b> — «Когда отправили письмо?»' },
      { kind: 'trap', h: 'Помощник уже есть', p: 'Для <b>Was the letter sent?</b> дополнительный <b>did</b> не нужен.' }
    ],
    forms: { p: 'The results <b>will be announced</b>.', n: 'The results <b>won’t be announced</b>.', q: 'When <b>will</b> the results <b>be announced</b>?' },
    markers: ['Was …?', 'When was …?', 'Where will … be?'],
    ex: [
      { en: 'Were you invited to the wedding?', ru: 'Тебя пригласили на свадьбу?' },
      { en: 'Why was the flight canceled?', ru: 'Почему отменили рейс?' },
      { en: 'Where will the meeting be held?', ru: 'Где проведут встречу?' }
    ]
  },
  {
    id: 'v-by', zone: 'ask', level: 2, idx: 5, short: 'Кем',
    name: 'Как добавить «кем»', core: '… by Chekhov',
    thesis: 'Хотите назвать автора — добавьте by',
    lead: '«Книгу написал Чехов» можно сказать через книгу: <b>The book was written by Chekhov.</b> Слово <b>by</b> вводит того, кто это сделал.',
    blocks: [
      { kind: 'key', h: 'By можно опустить', p: '<b>My bike was stolen</b> — «У меня украли велосипед». Главное здесь то, что случилось с велосипедом. Кто его украл, мы можем не знать.' },
      { kind: 'plain', h: 'Кем и чем', p: 'Когда называем того, кто сделал, берём <b>by</b>: <b>by my sister</b>. Когда называем инструмент, обычно берём <b>with</b>: <b>with a knife</b> — ножом.' }
    ],
    forms: { p: 'It <b>was painted</b> by Maya.', n: 'It <b>wasn’t painted</b> by Maya.', q: '<b>Was</b> it <b>painted</b> by Maya?' },
    markers: ['by Chekhov', 'by my sister', 'with a knife'],
    ex: [
      { en: 'The photo was taken by my sister.', ru: 'Фото сделала моя сестра.' },
      { en: 'The bread was cut with a knife.', ru: 'Хлеб нарезали ножом.' },
      { en: 'English is spoken here.', ru: 'Здесь говорят по-английски.' }
    ]
  },
  {
    id: 'v-extra', zone: 'future', level: 3, idx: 6, short: 'Другие формы',
    name: 'Прямо сейчас, уже и можно', core: 'is being · has been · can be + V3',
    thesis: 'Смысл подсказывает, каким будет be',
    lead: 'Возьмём одну посылку. Её доставляют сейчас — <b>is being delivered</b>. Уже доставили — <b>has been delivered</b>. Могут доставить — <b>can be delivered</b>.',
    blocks: [
      { kind: 'key', h: 'Процесс, результат, возможность', p: 'Для процесса сейчас берём <b>am / is / are + being</b>. Для результата к настоящему моменту — <b>have / has + been</b>. После <b>can</b>, <b>must</b> и <b>should</b> ставим обычное <b>be</b>. Во всех случаях в конце остаётся третья форма.' },
      { kind: 'plain', h: 'Вопрос и отрицание работают по знакомой схеме', p: '<b>Has</b> the package been delivered? — «Посылку доставили?» <b>The package hasn’t been delivered.</b> — «Посылку ещё не доставили».' }
    ],
    forms: { p: 'The package <b>has been delivered</b>.', n: 'The package <b>hasn’t been delivered</b>.', q: '<b>Has</b> the package <b>been delivered</b>?' },
    markers: ['right now', 'already', 'yet', 'can / must / should'],
    ex: [
      { en: 'The bridge is being repaired.', ru: 'Мост сейчас ремонтируют.' },
      { en: 'The tickets have already been sold.', ru: 'Билеты уже продали.' },
      { en: 'The package can be delivered tomorrow.', ru: 'Посылку могут доставить завтра.' }
    ]
  }
];

const VDUELS = [
  { q: 'Я пригласил или меня пригласили?',
    a: { z: 'present', n: 'Я сделал', en: 'I invited Anna.', ru: 'Я пригласил Анну.', why: 'Начинаем с того, кто пригласил.' },
    b: { z: 'future', n: 'Со мной сделали', en: 'I was invited.', ru: 'Меня пригласили.', why: 'Начинаем с того, кого пригласили.' },
    r: 'Спросите, I здесь приглашает или получает приглашение.' },
  { q: 'Обычно ремонтируют или прямо сейчас?',
    a: { z: 'present', n: 'Обычно', en: 'Bikes are repaired here.', ru: 'Здесь ремонтируют велосипеды.', why: 'Говорим, чем здесь занимаются.' },
    b: { z: 'future', n: 'Сейчас', en: 'The bike is being repaired.', ru: 'Велосипед сейчас ремонтируют.', why: 'Ремонт идёт в этот момент.' },
    r: 'Для процесса в данный момент добавляем being.' },
  { q: 'Вчера доставили или уже доставили?',
    a: { z: 'past', n: 'Вчера', en: 'The package was delivered yesterday.', ru: 'Посылку доставили вчера.', why: 'Назван день в прошлом.' },
    b: { z: 'present', n: 'Уже', en: 'The package has been delivered.', ru: 'Посылку уже доставили.', why: 'Важен результат сейчас.' },
    r: 'Вчера указывает, когда это случилось. Уже сообщает, что результат есть.' }
];
