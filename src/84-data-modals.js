const LLEVELS = [
  { n: 1, ru: 'Как собрать фразу', title: 'Могу, не могу, могу ли?', code: 'can · can’t · could',
    txt: 'Начнём с твоего «могу». На нём видно, почему этим словам не нужен помощник для вопроса или отрицания.' },
  { n: 2, ru: 'Что я хочу сказать', title: 'Разрешение, просьба или «может быть»', code: 'can · could · may · might · would',
    txt: 'Смотри на ситуацию. Ты спрашиваешь, можно ли тебе что-то сделать, просишь другого человека или пока не уверен, что случится?' }
];

const L = [
  {
    id: 'l-can', zone: 'present', level: 1, idx: 1, short: 'Могу',
    name: 'Can — могу или умею', core: 'I can swim. I can’t swim. Can you swim?',
    thesis: 'Модальный глагол сам собирает вопрос и отрицание',
    lead: 'Сравни <b>I swim</b> — «я плаваю» и <b>I can swim</b> — «я умею плавать». Действие одно, но <b>can</b> добавляет смысл. Так работают модальные глаголы: к одному и тому же действию можно добавить «могу», «можно», «может быть» или «стоит».',
    blocks: [
      { kind: 'key', h: 'Модальные глаголы живут сами по себе', p: 'Если в предложении уже есть <b>can</b>, ему не нужны <b>do</b>, <b>does</b> или <b>did</b> для вопроса и отрицания. «Я не могу» — <b>I can’t</b> или <b>I cannot</b>. В полной форме пишем <b>cannot</b> слитно. Так что <b>I don’t can</b> говорить не нужно: <b>can</b> сам справляется с <b>not</b>.' },
      { kind: 'plain', h: 'В вопросе can выходит вперёд', p: '<b>You can swim</b> — «ты умеешь плавать». <b>Can you swim?</b> — «ты умеешь плавать?» Для вопроса просто переставь <b>can</b> перед <b>you</b>. После <b>can</b> ставь глагол как в словаре, без <b>to</b>. Даже с <b>he</b> или <b>she</b> само <b>can</b> остаётся как есть.' },
      { kind: 'plain', h: 'Когда умел раньше', p: '<b>I could swim when I was five</b> — «Я умел плавать в пять лет». <b>I couldn’t swim yet</b> — «Я ещё не умел плавать». Здесь <b>could</b> рассказывает об умении в прошлом. В просьбах это же слово передаёт вежливость.' },
      { kind: 'plain', h: 'А что с have to?', p: '<b>Must</b> и <b>should</b> ведут себя так же: <b>Must I go?</b>, <b>You shouldn’t go</b>. У <b>have to</b> другой порядок: <b>Do I have to go?</b>, <b>I don’t have to go</b>. Эти фразы есть во вкладке <a href="#m-hero">«Долженствование»</a>.' }
    ],
    forms: { p: 'I <b>can</b> swim.', n: 'I <b>can’t</b> swim.', q: '<b>Can</b> you swim?' },
    markers: ['могу', 'умею', 'не получается', 'умел раньше'],
    ex: [
      { en: 'She can read music.', ru: 'Она умеет читать ноты.' },
      { en: 'I can’t hear you.', ru: 'Я тебя не слышу.' },
      { en: 'Could you read when you were five?', ru: 'Ты умел читать в пять лет?' }
    ]
  },
  {
    id: 'l-request', zone: 'past', level: 2, idx: 2, short: 'Просьбы',
    name: 'Можно мне? А ты мог бы?', core: 'Can I sit here? Could you open the window?',
    thesis: 'Посмотри, кто должен сделать действие',
    lead: '<b>Can I open the window?</b> — «Можно <b>мне</b> открыть окно?» Я хочу открыть сам и спрашиваю разрешения. <b>Could you open the window?</b> — «Ты <b>мог бы</b> открыть окно?» Теперь я прошу тебя.',
    blocks: [
      { kind: 'key', h: 'Если спрашиваешь разрешения', p: '<b>Can I sit here?</b> — обычное «Можно я здесь сяду?». <b>Could I sit here?</b> звучит мягче. <b>May I sit here?</b> может пригодиться в более официальной обстановке.' },
      { kind: 'plain', h: 'Если просишь другого человека', p: '<b>Can you send me the address?</b> — «Можешь прислать мне адрес?» <b>Could you send me the address?</b> — «Не мог бы ты прислать мне адрес?» Ещё можно сказать <b>Would you send me the address, please?</b> В этих просьбах речь о том, что человек может сделать сейчас.' }
    ],
    forms: { p: 'You <b>can</b> sit here.', n: 'You <b>can’t</b> sit here.', q: '<b>May</b> I sit here?' },
    markers: ['можно мне?', 'можешь?', 'не мог бы ты?'],
    ex: [
      { en: 'May I come in?', ru: 'Можно войти?' },
      { en: 'Could you pass me the salt?', ru: 'Не мог бы ты передать мне соль?' },
      { en: 'Would you close the door, please?', ru: 'Закройте дверь, пожалуйста.' }
    ]
  },
  {
    id: 'l-chance', zone: 'future', level: 2, idx: 3, short: 'Не уверен',
    name: 'May и might — может быть', core: 'It might rain.',
    thesis: 'Так говорим, когда пока не знаем, что случится',
    lead: 'Собираешься гулять, а на небе тучи. <b>It might rain</b> — «Может пойти дождь». Ты оставляешь место для разных вариантов. <b>It may rain</b> тоже подходит. В разговоре <b>might</b> часто звучит осторожнее.',
    blocks: [
      { kind: 'key', h: 'Умею или пока не знаю, сделаю ли?', p: '<b>I can come on Friday</b> — «Я могу прийти в пятницу», у меня есть такая возможность. <b>I might come on Friday</b> — «Может быть, я приду в пятницу», пока не знаю.' },
      { kind: 'plain', h: 'Как сказать «возможно, не»', p: '<b>She might not come</b> — «Возможно, она не придёт». Ставим <b>not</b> сразу после <b>might</b>. Ещё можно сказать <b>She may not come</b> с тем же смыслом, если из разговора ясно, что ты не уверен.' },
      { kind: 'plain', h: 'А если хочешь спросить?', p: 'В разговоре «Анна может опоздать, как думаешь?» удобно спросить так: <b>Do you think Anna might be late?</b> Здесь <b>do</b> помогает спросить <b>you think</b> — «ты думаешь?». Часть <b>Anna might be late</b> внутри вопроса остаётся целой.' }
    ],
    forms: { p: 'Anna <b>might</b> be late.', n: 'Anna <b>might not</b> be late.', q: 'Do you think Anna <b>might</b> be late?' },
    markers: ['может быть', 'возможно', 'пока не знаю'],
    ex: [
      { en: 'He may join us later.', ru: 'Возможно, он присоединится к нам позже.' },
      { en: 'They might not know the address.', ru: 'Возможно, они не знают адреса.' },
      { en: 'It could rain tonight.', ru: 'Сегодня вечером может пойти дождь.' }
    ]
  }
];

const LDUELS = [
  { q: 'Кто откроет окно?',
    a: { z: 'present', n: 'Спрашиваю разрешения', en: 'Can I open the window?', ru: 'Можно я открою окно?', why: 'Окно собираюсь открыть я.' },
    b: { z: 'past', n: 'Прошу собеседника', en: 'Could you open the window?', ru: 'Не мог бы ты открыть окно?', why: 'Я прошу тебя открыть окно.' },
    r: 'Посмотри, кто стоит после can или could. С I спрашиваю про себя, с you обращаюсь к собеседнику.' },
  { q: 'Есть возможность или пока под вопросом?',
    a: { z: 'present', n: 'Есть возможность', en: 'I can come on Friday.', ru: 'Я могу прийти в пятницу.', why: 'В пятницу у меня получается.' },
    b: { z: 'future', n: 'Пока под вопросом', en: 'I might come on Friday.', ru: 'Возможно, я приду в пятницу.', why: 'Пока не обещаю.' },
    r: 'Can говорит «могу». Might добавляет «может быть».' }
];
