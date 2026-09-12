const ASPECTS = [
  { key: 'simple',      name: 'Simple',             core: 'V / V2',            short: 'факт' },
  { key: 'continuous',  name: 'Continuous',         core: 'be + V-ing',        short: 'процесс' },
  { key: 'perfect',     name: 'Perfect',            core: 'have + V3',         short: 'результат' },
  { key: 'perfectcont', name: 'Perfect Continuous', core: 'have been + V-ing', short: 'процесс + счётчик' }
];

const T = [
/* ─────────── УРОВЕНЬ 1 · SIMPLE ─────────── */
{
  id: 'present-simple', zone: 'present', aspect: 'simple', level: 1, idx: 1,
  name: 'Present Simple', core: 'V / V-s',
  thesis: 'Настройки по умолчанию',
  mxEx: 'I drink coffee every morning.',
  tlCap: 'Точки по всей оси: действие верно не «сейчас», а вообще — и в прошлом, и в будущем.',
  lead: 'Главное недоразумение всей темы: Present Simple — это <b>не «сейчас»</b>. Это «вообще». Всё, что верно всегда, повторяется регулярно или стоит в расписании.',
  blocks: [
    { kind: 'plain', h: 'Как это представить',
      p: 'Это конфиг-файл человека. <span class="mono">подъём: 7:00</span>, <span class="mono">кофе: да</span>, <span class="mono">любит понедельники: нет</span>. Вы не описываете текущий кадр — вы описываете настройку, которая включена постоянно.' },
    { kind: 'trap', h: 'Ловушка: та самая -s',
      p: 'Правило-подсказка: <b>буква s живёт только в одном месте</b> — либо у подлежащего (значит, их много), либо у глагола (значит, он один). Никогда в обоих сразу.<br><span class="mono yes">The cat<b>s</b> sleep</span> · <span class="mono yes">The cat sleep<b>s</b></span> · <span class="mono no">The cats sleeps</span>' },
    { kind: 'plain', h: 'Тонкость, которая удивляет',
      p: 'Расписание в будущем — это тоже Present Simple: <span class="mono">The train leaves at 7 tomorrow.</span> Потому что это не ваш план, а факт из таблицы отправлений. Ваши личные планы будут жить в другом времени — увидим на станции 04.' }
  ],
  forms: { p: 'I / you / we / they <b>work</b><br>he / she / it <b>works</b>', n: 'do not (don\'t) work<br>does not (doesn\'t) work', q: 'Do you work?<br>Does he work?' },
  markers: ['always', 'usually', 'often', 'sometimes', 'rarely', 'never', 'every day', 'on Mondays', 'twice a week'],
  ex: [
    { en: 'I <i class="v">drink</i> coffee every morning.', ru: 'Я пью кофе каждое утро.', nb: 'настройка, а не текущий момент' },
    { en: 'Water <i class="v">boils</i> at 100 °C.', ru: 'Вода кипит при 100 °C.', nb: 'факт мира — он не меняется' },
    { en: 'She <i class="v">doesn\'t eat</i> meat.', ru: 'Она не ест мясо.', nb: 'постоянное свойство человека' },
    { en: 'What time <i class="v">does</i> the shop <i class="v">open</i>?', ru: 'Во сколько открывается магазин?', nb: 'расписание' }
  ]
},
{
  id: 'past-simple', zone: 'past', aspect: 'simple', level: 1, idx: 2,
  name: 'Past Simple', core: 'V2 / V-ed',
  thesis: 'Точка с адресом во времени',
  mxEx: 'I saw him yesterday.',
  tlCap: 'Одна точка в прошлом и вертикальная засечка под ней: у события есть координата, и она названа.',
  lead: 'Было и закончилось. И — это ключевое — <b>у события есть адрес</b>: вчера, в 2019-м, два часа назад, когда мне было десять. Прошлое закрыто, дверь захлопнулась.',
  blocks: [
    { kind: 'plain', h: 'Как это представить',
      p: 'Запись в журнале с таймстемпом: <span class="mono">14:32 — вышел из дома</span>. Событие зафиксировано в точке и больше не связано с настоящим.' },
    { kind: 'trap', h: 'Ловушка: двойное прошлое',
      p: 'Один показатель прошлого на предложение. Если появился <span class="mono">did</span>, он забирает прошедшее время себе, а глагол становится «голым».<br><span class="mono no">Did you went?</span> → <span class="mono yes">Did you go?</span> · <span class="mono no">I didn\'t saw</span> → <span class="mono yes">I didn\'t see</span>' },
    { kind: 'plain', h: 'Про неправильные глаголы',
      p: 'Это не хаос, а примерно сотня самых частых слов, которые «истёрлись» от употребления — как ступеньки, по которым чаще ходят. Учить лучше не таблицу подряд, а группами по звуку: <span class="mono">sing–sang–sung</span>, <span class="mono">ring–rang–rung</span>, <span class="mono">drink–drank–drunk</span>.' }
  ],
  forms: { p: 'I <b>worked</b> / I <b>saw</b>', n: 'did not (didn\'t) work', q: 'Did you work?' },
  markers: ['yesterday', '... ago', 'last week', 'in 2019', 'then', 'when I was a child'],
  ex: [
    { en: 'I <i class="v">saw</i> him yesterday.', ru: 'Я видел его вчера.', nb: 'координата названа — значит, только Past Simple' },
    { en: 'We <i class="v">moved</i> to Berlin in 2019.', ru: 'Мы переехали в Берлин в 2019-м.' },
    { en: 'She <i class="v">didn\'t call</i> me back.', ru: 'Она мне не перезвонила.' },
    { en: 'Where <i class="v">did</i> you <i class="v">buy</i> it?', ru: 'Где ты это купил?' }
  ]
},
{
  id: 'future-simple', zone: 'future', aspect: 'simple', level: 1, idx: 3,
  name: 'Future Simple', core: 'will + V',
  thesis: 'Решение, принятое прямо сейчас',
  mxEx: "I'll help you.",
  tlCap: 'Точка в будущем и дуга от «сейчас»: решение рождается в момент речи и улетает вперёд.',
  lead: '<span class="mono">will</span> — это не «будущее вообще». Это <b>решение, обещание или прогноз, которые рождаются прямо в момент речи</b>. Кнопка, которую вы нажимаете сию секунду.',
  blocks: [
    { kind: 'key', h: 'Главное различие: will или be going to',
      p: '<b>will</b> — решил только что: <span class="mono">— The phone\'s ringing. — I\'ll get it!</span><br><b>be going to</b> — решил раньше, план уже есть: <span class="mono">I\'m going to buy a new laptop.</span> (уже выбрал модель и отложил деньги)' },
    { kind: 'plain', h: 'У going to есть второй смысл',
      p: '«Есть видимые признаки, я делаю вывод»: <span class="mono">Look at the sky — it\'s going to rain.</span> Вы видите тучи. А <span class="mono">It will rain tomorrow</span> — это просто ваше мнение или прогноз погоды.' },
    { kind: 'trap', h: 'Ловушка: will после if и when',
      p: 'В придаточных времени и условия будущее выражается настоящим — <span class="mono">will</span> туда не ставят.<br><span class="mono no">If it will rain, I\'ll stay home</span> → <span class="mono yes">If it <b>rains</b>, I\'ll stay home</span>' }
  ],
  forms: { p: 'I <b>will (\'ll)</b> work', n: 'will not (won\'t) work', q: 'Will you work?' },
  markers: ['tomorrow', 'next week', 'in 2030', 'I think', 'probably', 'maybe', 'I promise', 'I\'m sure'],
  ex: [
    { en: 'That bag looks heavy — I <i class="v">\'ll help</i> you.', ru: 'Сумка тяжёлая — давай помогу.', nb: 'решение принято в эту секунду' },
    { en: 'I <i class="v">\'m going to</i> start running.', ru: 'Я собираюсь начать бегать.', nb: 'решил раньше, уже купил кроссовки' },
    { en: 'I think she <i class="v">will like</i> it.', ru: 'Думаю, ей понравится.', nb: 'прогноз, мнение' },
    { en: 'I <i class="v">won\'t tell</i> anyone. I promise.', ru: 'Я никому не скажу. Обещаю.' }
  ]
},

/* ─────────── УРОВЕНЬ 2 · CONTINUOUS ─────────── */
{
  id: 'present-continuous', zone: 'present', aspect: 'continuous', level: 2, idx: 4,
  name: 'Present Continuous', core: 'am/is/are + V-ing',
  thesis: 'Прямой эфир',
  mxEx: "Look! It's raining.",
  tlCap: 'Волна вокруг «сейчас»: процесс уже начался, ещё не кончился, и мы видим его в кадре.',
  lead: 'Камера включена, полоска идёт. Действие <b>в процессе</b> — либо буквально сейчас, либо в этот период жизни.',
  blocks: [
    { kind: 'plain', h: 'Три режима работы',
      p: '<b>1. Буквально сейчас:</b> <span class="mono">I\'m writing to you.</span><br><b>2. Временно, в этот период:</b> <span class="mono">I\'m reading a great book.</span> — книга не в руках сию секунду, но процесс запущен. <span class="mono">She\'s living with her parents this month.</span> — временно, не навсегда.<br><b>3. Личные планы на будущее:</b> <span class="mono">I\'m meeting Anna at 6.</span> — уже договорились, есть время и место.' },
    { kind: 'key', h: 'Почему план — и вдруг Continuous',
      p: 'Потому что договорённость уже существует, она «в календаре», процесс подготовки идёт. Это самый частый способ говорить о личных планах — гораздо чаще, чем <span class="mono">will</span>. Сравните: <span class="mono">The train leaves at 7</span> (расписание, не ваше) и <span class="mono">I\'m leaving at 7</span> (ваша договорённость).' },
    { kind: 'trap', h: 'Ловушка: глаголы состояния',
      p: 'У некоторых глаголов нет процесса — их нельзя «крутить»: <span class="mono">know, want, like, love, hate, need, believe, understand, remember, mean, belong, seem, cost</span>.<br><span class="mono no">I\'m knowing him</span> → <span class="mono yes">I know him</span><br><b>Проверка:</b> можно ли это делать нарочно, с усилием? «Стараться знать» нельзя — значит, без -ing.<br><b>Хамелеоны:</b> <span class="mono">I\'m thinking about it</span> (обдумываю = процесс), <span class="mono">He\'s being rude</span> (ведёт себя так сейчас, а не всегда такой).' }
  ],
  forms: { p: 'I <b>am</b> working<br>he <b>is</b> / we <b>are</b> working', n: 'I\'m not working<br>isn\'t / aren\'t working', q: 'Are you working?<br>Is he working?' },
  markers: ['now', 'right now', 'at the moment', 'currently', 'today', 'this week', 'Look!', 'Listen!'],
  ex: [
    { en: 'Look! It <i class="v">is raining</i>.', ru: 'Смотри! Идёт дождь.', nb: 'прямо в кадре' },
    { en: 'I <i class="v">\'m working</i> on a new project this month.', ru: 'В этом месяце я работаю над новым проектом.', nb: 'временно, не «всегда»' },
    { en: 'We <i class="v">\'re having</i> dinner with Tom on Friday.', ru: 'В пятницу мы ужинаем с Томом.', nb: 'договорённость = будущее' },
    { en: 'Why <i class="v">are</i> you <i class="v">smiling</i>?', ru: 'Ты чего улыбаешься?' }
  ]
},
{
  id: 'past-continuous', zone: 'past', aspect: 'continuous', level: 2, idx: 5,
  name: 'Past Continuous', core: 'was/were + V-ing',
  thesis: 'Фон, в который врезалось событие',
  mxEx: 'I was walking home when I met Tom.',
  tlCap: 'Длинная волна и вспышка поверх неё: одно тянулось, второе случилось мгновенно.',
  lead: 'В прошлом что-то <b>длилось</b> — и в этот момент случилось что-то короткое. Длинное берёт Continuous, короткое — Past Simple.',
  blocks: [
    { kind: 'key', h: 'Эталонная пара',
      p: '<span class="mono">I <b>was walking</b> home <b>when</b> I <b>met</b> Tom.</span><br>Шёл — долго, встретил — мгновенно. Подсказка по союзам: после <span class="mono">while</span> почти всегда длинное, после <span class="mono">when</span> — обычно короткое.' },
    { kind: 'plain', h: 'Два длинных сразу',
      p: 'Если оба действия тянулись параллельно — оба в Continuous: <span class="mono">While I was cooking, she was working.</span>' },
    { kind: 'plain', h: 'Точка на часах',
      p: '<span class="mono">At 8 p.m. yesterday I was still working.</span> — не «работал вообще вчера», а «в восемь был в процессе». Если сказать <span class="mono">I worked at 8</span>, получится, что вы начали ровно в восемь.' },
    { kind: 'plain', h: 'Декорации в рассказе',
      p: 'Вот почему все истории начинаются именно так: <span class="mono">It was raining. The wind was blowing. Suddenly the door opened.</span> Continuous ставит декорации, Past Simple запускает сюжет.' }
  ],
  forms: { p: 'I / he <b>was</b> working<br>you / we / they <b>were</b> working', n: 'wasn\'t / weren\'t working', q: 'Were you working?<br>Was he working?' },
  markers: ['while', 'when', 'at 5 o\'clock yesterday', 'all evening', 'as', 'at that moment'],
  ex: [
    { en: 'I <i class="v">was walking</i> home when I <i class="v">met</i> Tom.', ru: 'Я шёл домой, когда встретил Тома.', nb: 'фон + вспышка' },
    { en: 'While she <i class="v">was cooking</i>, I <i class="v">was cleaning</i>.', ru: 'Пока она готовила, я убирался.', nb: 'два длинных параллельно' },
    { en: 'At 9 p.m. we <i class="v">were still driving</i>.', ru: 'В девять вечера мы всё ещё ехали.' },
    { en: 'Sorry, I <i class="v">wasn\'t listening</i>.', ru: 'Извини, я не слушал.' }
  ]
},
{
  id: 'future-continuous', zone: 'future', aspect: 'continuous', level: 2, idx: 6,
  name: 'Future Continuous', core: 'will be + V-ing',
  thesis: 'В этот момент завтра я буду в процессе',
  mxEx: "This time tomorrow I'll be flying.",
  tlCap: 'Волна в будущем, пересечённая засечкой: в названный момент процесс уже будет идти.',
  lead: 'Не «сделаю», а <b>«буду в процессе»</b> в конкретный момент будущего. Полезно, когда надо объяснить, почему вас нельзя будет дёргать.',
  blocks: [
    { kind: 'plain', h: 'Как звучит в жизни',
      p: '<span class="mono">Don\'t call me at 7 — I\'ll be driving.</span><br><span class="mono">This time tomorrow I\'ll be flying to Rome.</span>' },
    { kind: 'key', h: 'Бонус: самый вежливый вопрос в английском',
      p: '<span class="mono">Will you be using the car tonight?</span> — это не просьба, а «я просто уточняю, идёт ли это у тебя по плану». Никакого давления.<br>Сравните с <span class="mono">Will you use the car?</span> — звучит уже как намёк или требование. Разница ощутимая, и носители её слышат.' }
  ],
  forms: { p: 'I <b>will be</b> working', n: 'won\'t be working', q: 'Will you be working?' },
  markers: ['at this time tomorrow', 'at 5 p.m. next Friday', 'all day tomorrow', 'when you arrive'],
  ex: [
    { en: 'This time tomorrow I <i class="v">\'ll be lying</i> on the beach.', ru: 'Завтра в это время я буду лежать на пляже.' },
    { en: 'Don\'t call at 7 — I <i class="v">\'ll be driving</i>.', ru: 'Не звони в семь — я буду за рулём.' },
    { en: '<i class="v">Will</i> you <i class="v">be using</i> the printer later?', ru: 'Ты будешь пользоваться принтером позже?', nb: 'вежливое уточнение без давления' }
  ]
},

/* ─────────── УРОВЕНЬ 3 · PERFECT ─────────── */
{
  id: 'present-perfect', zone: 'present', aspect: 'perfect', level: 3, idx: 7,
  name: 'Present Perfect', core: 'have/has + V3',
  thesis: 'Результат без координаты',
  mxEx: "I've lost my keys.",
  tlCap: 'Пунктирная точка в прошлом (когда — неизвестно) и дуга, которая приводит результат в «сейчас».',
  lead: 'Самое пугающее время — на самом деле самое простое, если сравнить его с соседом. Present Perfect очень похож на Past Simple: оба про то, что <b>уже произошло</b>. Разница ровно одна.',
  blocks: [
    { kind: 'key', h: 'Вся разница в одной строке',
      p: '<b>Past Simple отвечает на вопрос «КОГДА?». Present Perfect — на вопрос «И ЧТО ТЕПЕРЬ?»</b><br><br><span class="mono">I lost my keys yesterday.</span> — просто история из прошлого. Может, я их уже нашёл.<br><span class="mono">I\'ve lost my keys.</span> — <b>сейчас</b> я стою без ключей. Это проблема здесь и теперь.' },
    { kind: 'plain', h: 'Правило-детектор',
      p: 'Как только в предложении появляется точное время в прошлом — <span class="mono">yesterday, in 2019, two days ago, when I was ten</span> — Present Perfect <b>выключается</b>, включается Past Simple. Перфект не терпит координат: он про результат, а не про дату.' },
    { kind: 'plain', h: 'Три работы этого времени',
      p: '<b>1. Результат сейчас.</b> <span class="mono">She has broken her leg.</span> → нога в гипсе прямо сейчас.<br><b>2. Опыт, ачивки в профиле.</b> <span class="mono">I\'ve been to Japan.</span> Когда — неважно, важно что значок получен. Здесь живут <span class="mono">ever</span> и <span class="mono">never</span>.<br><b>3. Незакончившийся период.</b> <span class="mono">I\'ve read two books this week.</span> Неделя ещё идёт — счётчик открыт. Кончится неделя — превратится в <span class="mono">I read two books last week</span>.' },
    { kind: 'plain', h: 'Слова-маячки',
      p: 'Эти слова почти всегда тянут за собой перфект, потому что все они про «к настоящему моменту»: <span class="mono">just</span> (только что), <span class="mono">already</span> (уже), <span class="mono">yet</span> (ещё — в отрицаниях и вопросах), <span class="mono">ever, never, so far, recently, lately</span>.' },
    { kind: 'trap', h: 'Ловушка родного языка',
      p: 'По-русски «Я уже сделал» и «Я сделал вчера» — одно и то же прошедшее время. Английский <b>обязан</b> эти два случая разводить, и выбор здесь не стилистический, а обязательный.<br><br><b>И ещё been / gone:</b> <span class="mono">He has <b>gone</b> to London</span> — уехал, его здесь нет. <span class="mono">He has <b>been</b> to London</span> — был и вернулся, это опыт.' }
  ],
  forms: { p: 'I / you / we / they <b>have</b> (\'ve) done<br>he / she / it <b>has</b> (\'s) done', n: 'haven\'t / hasn\'t done', q: 'Have you done?<br>Has he done?' },
  markers: ['just', 'already', 'yet', 'ever', 'never', 'so far', 'recently', 'lately', 'this week', 'today'],
  ex: [
    { en: 'I <i class="v">\'ve lost</i> my keys.', ru: 'Я потерял ключи.', nb: 'и сейчас не могу попасть домой' },
    { en: 'I <i class="v">\'ve just finished</i> the report.', ru: 'Я только что закончил отчёт.' },
    { en: '<i class="v">Have</i> you <i class="v">ever been</i> to Japan?', ru: 'Ты когда-нибудь был в Японии?', nb: 'опыт — когда именно, неважно' },
    { en: 'He <i class="v">hasn\'t called</i> yet.', ru: 'Он ещё не позвонил.', nb: 'и мы всё ещё ждём' },
    { en: 'We <i class="v">\'ve had</i> three meetings this week.', ru: 'На этой неделе у нас было три встречи.', nb: 'неделя ещё не кончилась' }
  ]
},
{
  id: 'past-perfect', zone: 'past', aspect: 'perfect', level: 3, idx: 8,
  name: 'Past Perfect', core: 'had + V3',
  thesis: 'Прошлое до прошлого',
  mxEx: 'When I arrived, the train had left.',
  tlCap: 'Две точки в прошлом: дуга показывает, какая из них случилась раньше — порядок слов на это не влияет.',
  lead: 'Нужно ровно в одном случае: в прошлом <b>два события</b>, и надо показать, какое было раньше. Это флешбэк в фильме — основная сцена идёт в Past Simple, вставка «а до этого...» — в Past Perfect.',
  blocks: [
    { kind: 'key', h: 'Одно слово меняет весь смысл',
      p: '<span class="mono">When I arrived, the train <b>had left</b>.</span> — сначала уехал поезд, потом приехал я. Я опоздал.<br><span class="mono">When I arrived, the train <b>left</b>.</span> — я приехал, и поезд тронулся при мне. Я успел.' },
    { kind: 'plain', h: 'Зачем это вообще нужно',
      p: 'Чтобы <b>порядок слов перестал совпадать с порядком событий</b>. Вы можете рассказывать в любой последовательности — <span class="mono">had</span> сам расставит хронологию: <span class="mono">She was upset because she had failed the exam.</span> Провал был раньше, хотя назван позже.' },
    { kind: 'plain', h: 'Когда можно не ставить',
      p: 'Если порядок и так очевиден из <span class="mono">before</span> или <span class="mono">after</span>, перфект необязателен: <span class="mono">He left before I arrived.</span> — и так понятно.' },
    { kind: 'plain', h: 'Где ещё встретится',
      p: 'В сожалениях и нереальном прошлом: <span class="mono">I wish I had studied more.</span> · <span class="mono">If I had known, I would have come.</span> Если освоить <span class="mono">had + V3</span> здесь, третий тип условных перестанет быть отдельной темой.' }
  ],
  forms: { p: 'I / he / they <b>had</b> (\'d) done<br><i>одна форма на все лица</i>', n: 'hadn\'t done', q: 'Had you done?' },
  markers: ['before', 'after', 'by the time', 'already', 'never before', 'when', 'as soon as'],
  ex: [
    { en: 'When I arrived, the train <i class="v">had left</i>.', ru: 'Когда я приехал, поезд уже ушёл.' },
    { en: 'She was upset because she <i class="v">had failed</i> the exam.', ru: 'Она расстроилась, потому что провалила экзамен.', nb: 'провал случился раньше расстройства' },
    { en: 'By the time we got there, they <i class="v">had eaten</i> everything.', ru: 'К тому времени, как мы добрались, они всё съели.' },
    { en: 'I <i class="v">had never seen</i> snow before that winter.', ru: 'До той зимы я никогда не видел снега.' }
  ]
},
{
  id: 'future-perfect', zone: 'future', aspect: 'perfect', level: 3, idx: 9,
  name: 'Future Perfect', core: 'will have + V3',
  thesis: 'Дедлайн',
  mxEx: "By Friday I'll have finished.",
  tlCap: 'Действие завершается до контрольной засечки: к названному моменту прогресс должен показать сто процентов.',
  lead: 'К определённому моменту в будущем это <b>уже будет готово</b>. Прогресс-бар обязан показать сто процентов к контрольной точке.',
  blocks: [
    { kind: 'key', h: 'Слово-триггер: BY',
      p: '<span class="mono">by tomorrow, by 6 o\'clock, by the time you come, by 2030</span>. Если в предложении есть «к такому-то моменту» — это почти наверняка Future Perfect. Не путайте с <span class="mono">until</span>: <span class="mono">by</span> — «не позже чем», <span class="mono">until</span> — «вплоть до».' },
    { kind: 'plain', h: 'Честно о частоте',
      p: 'Встречается реже соседей, но в деловой переписке, планах и обещаниях по срокам — регулярно. Это время звучит профессионально именно потому, что говорит о сроке, а не просто о будущем.' }
  ],
  forms: { p: 'I <b>will have</b> finished', n: 'won\'t have finished', q: 'Will you have finished?' },
  markers: ['by Friday', 'by then', 'by the time...', 'by 2030', 'before you arrive'],
  ex: [
    { en: 'By Friday I <i class="v">\'ll have finished</i> the project.', ru: 'К пятнице я закончу проект.' },
    { en: 'By the time you arrive, we <i class="v">\'ll have eaten</i>.', ru: 'К тому времени, как ты приедешь, мы уже поедим.' },
    { en: 'In two years they <i class="v">\'ll have built</i> the new line.', ru: 'Через два года они построят новую линию.' }
  ]
},

/* ─────────── УРОВЕНЬ 4 · PERFECT CONTINUOUS ─────────── */
{
  id: 'present-perfect-continuous', zone: 'present', aspect: 'perfectcont', level: 4, idx: 10,
  name: 'Present Perfect Continuous', core: 'have/has been + V-ing',
  thesis: 'Счётчик аптайма',
  mxEx: "I've been learning English for 5 years.",
  tlCap: 'Волна тянется из прошлого в «сейчас», а скобка снизу измеряет её длину — это и есть смысл времени.',
  lead: 'Процесс начался в прошлом, всё ещё идёт (или только что закончился), и нам важна <b>его длительность</b> или <b>следы, которые он оставил</b>.',
  blocks: [
    { kind: 'key', h: 'Золотое правило: сколько сделано или сколько длится',
      p: '<b>Perfect</b> = СКОЛЬКО СДЕЛАНО. Результат, количество, готово.<br><span class="mono">I\'ve read three books.</span> · <span class="mono">I\'ve painted the kitchen.</span> (кухня готова)<br><br><b>Perfect Continuous</b> = СКОЛЬКО ДЛИЛОСЬ. Процесс, следы, может быть не закончено.<br><span class="mono">I\'ve been reading all day.</span> · <span class="mono">I\'ve been painting the kitchen.</span> (я весь в краске, кухня, возможно, не доделана)' },
    { kind: 'plain', h: 'Два режима',
      p: '<b>1. Сколько времени:</b> <span class="mono">I\'ve been learning English for five years.</span> Начал пять лет назад, до сих пор учу. <span class="mono">for</span> = сколько длится, <span class="mono">since</span> = с какого момента.<br><b>2. Свежие следы:</b> <span class="mono">Your eyes are red. Have you been crying?</span> Процесс только что закончился, но результат виден на лице.' },
    { kind: 'trap', h: 'Ловушка: сюда тоже не ходят глаголы состояния',
      p: '<span class="mono no">I\'ve been knowing him for years</span> → <span class="mono yes">I\'ve known him for years</span><br>То же самое с <span class="mono">be, have (иметь), like, want</span>. Правило про «нельзя делать нарочно» работает и здесь.' }
  ],
  forms: { p: 'I <b>have been</b> working<br>he <b>has been</b> working', n: 'haven\'t / hasn\'t been working', q: 'Have you been working?<br>How long have you been...?' },
  markers: ['for', 'since', 'all day', 'all morning', 'how long', 'lately', 'recently'],
  ex: [
    { en: 'I <i class="v">\'ve been learning</i> English for five years.', ru: 'Я учу английский пять лет.', nb: 'и продолжаю' },
    { en: 'How long <i class="v">have</i> you <i class="v">been waiting</i>?', ru: 'Сколько ты уже ждёшь?' },
    { en: 'Your eyes are red. <i class="v">Have</i> you <i class="v">been crying</i>?', ru: 'У тебя красные глаза. Ты плакала?', nb: 'свежие следы процесса' },
    { en: 'It <i class="v">\'s been raining</i> since morning.', ru: 'Дождь идёт с самого утра.' }
  ]
},
{
  id: 'past-perfect-continuous', zone: 'past', aspect: 'perfectcont', level: 4, idx: 11,
  name: 'Past Perfect Continuous', core: 'had been + V-ing',
  thesis: 'Счётчик, остановленный в прошлом',
  mxEx: 'I had been waiting for an hour.',
  tlCap: 'Тот же счётчик длительности, но отмеряется он не до «сейчас», а до точки в прошлом.',
  lead: 'То же самое, что и на прошлой станции, только <b>точка отсчёта — не «сейчас», а момент в прошлом</b>. Сколько уже длилось к тому моменту.',
  blocks: [
    { kind: 'plain', h: 'Эталонный пример',
      p: '<span class="mono">I <b>had been waiting</b> for an hour when she finally arrived.</span> — к моменту её прихода я ждал уже час.' },
    { kind: 'plain', h: 'Второе применение: причина',
      p: 'Объяснить, откуда взялось состояние в прошлом: <span class="mono">He was tired because he had been working all night.</span> Усталость — следствие процесса, который шёл до этого.' }
  ],
  forms: { p: 'I <b>had been</b> working', n: 'hadn\'t been working', q: 'Had you been working?' },
  markers: ['for', 'since', 'before', 'when', 'by that time', 'all day'],
  ex: [
    { en: 'I <i class="v">had been waiting</i> for an hour when she arrived.', ru: 'Я ждал уже час, когда она пришла.' },
    { en: 'He was tired because he <i class="v">had been working</i> all night.', ru: 'Он устал, потому что работал всю ночь.' },
    { en: 'The ground was wet — it <i class="v">had been raining</i>.', ru: 'Земля была мокрая — шёл дождь.' }
  ]
},
{
  id: 'future-perfect-continuous', zone: 'future', aspect: 'perfectcont', level: 4, idx: 12,
  name: 'Future Perfect Continuous', core: 'will have been + V-ing',
  thesis: 'Юбилей процесса',
  mxEx: "I'll have been working here for 10 years.",
  tlCap: 'Счётчик отмеряется вперёд: к моменту в будущем процесс будет идти уже названное количество времени.',
  lead: 'К моменту в будущем процесс будет длиться уже <b>столько-то времени</b>. Ровно та фраза, которую говорят на корпоративе про стаж.',
  blocks: [
    { kind: 'plain', h: 'Как звучит',
      p: '<span class="mono">By next June, I\'ll have been working here for ten years.</span><br><span class="mono">In an hour we\'ll have been driving for six hours straight.</span>' },
    { kind: 'plain', h: 'Честно: самое редкое время английского',
      p: 'В живой речи почти не встречается — обычно обходятся Future Continuous или Present Perfect Continuous. Его стоит знать не ради употребления, а чтобы система из двенадцати клеток закрылась и стала логичной. Если вы дошли сюда — вся механика уже у вас в руках.' }
  ],
  forms: { p: 'I <b>will have been</b> working', n: 'won\'t have been working', q: 'Will you have been working?' },
  markers: ['by next year', 'by then', 'for ... by that time'],
  ex: [
    { en: 'By next June I <i class="v">\'ll have been working</i> here for ten years.', ru: 'К следующему июню я проработаю здесь десять лет.' },
    { en: 'By 6 p.m. they <i class="v">\'ll have been travelling</i> for a whole day.', ru: 'К шести вечера они будут в пути уже целые сутки.' }
  ]
}
];

const LEVELS = [
  { n: 1, title: 'Simple', code: 'V / V2 / will + V', ru: 'Факты',
    txt: 'Первый этаж. Здесь живут факты: было, есть, будет. Никаких процессов и результатов — просто «да, это происходит». Три времени, которые покрывают больше половины обычной речи.' },
  { n: 2, title: 'Continuous', code: 'be + V-ing', ru: 'Процессы',
    txt: 'Добавляем «полоску загрузки». Действие не просто есть — оно <b>идёт</b> в конкретный момент. Формула одна на все три времени, меняется только форма глагола <span class="mono">be</span>: was / am / will be.' },
  { n: 3, title: 'Perfect', code: 'have + V3', ru: 'Результаты',
    txt: 'Самый важный этаж и самый непривычный для русского уха. Perfect смотрит не на само действие, а на <b>результат к какому-то моменту</b>. Меняется только форма <span class="mono">have</span>: had / have / will have.' },
  { n: 4, title: 'Perfect Continuous', code: 'have been + V-ing', ru: 'Процесс + счётчик',
    txt: 'Верхний этаж — и он проще, чем кажется: это Perfect, к которому прикрутили секундомер. Не «сколько сделано», а <b>сколько времени это длится</b>. Дальше учить нечего, система закрывается.' }
];

/* ═══════════════ ЛЕГЕНДА АСПЕКТОВ В ГЕРОЕ ═══════════════ */
const LEG = [
  { z: 'present', t: 'Simple', c: 'V / V2', p: 'Просто факт. Точка на оси.', d: id => `<line class="ax" x1="14" y1="34" x2="146" y2="34"/><circle class="m-dot" cx="80" cy="34" r="7.5" style="fill:var(--zone)"/>` },
  { z: 'present', t: 'Continuous', c: 'be + V-ing', p: 'Процесс идёт. Волна.', d: id => `<line class="ax" x1="14" y1="34" x2="146" y2="34"/><defs><clipPath id="lg-${id}"><rect x="30" y="18" width="100" height="32"/></clipPath></defs><g clip-path="url(#lg-${id})"><path class="m-wave flow" style="stroke:var(--zone)" d="${wavePath(6, 156, 34)}"/></g>` },
  { z: 'present', t: 'Perfect', c: 'have + V3', p: 'Результат к моменту. Дуга.', d: id => `<line class="ax" x1="14" y1="34" x2="146" y2="34"/><circle class="m-ghost" cx="42" cy="34" r="6" style="stroke:var(--zone)"/><path class="m-arc" style="stroke:var(--zone)" d="M 42 22 Q 81 -2 118 16"/><polygon class="m-head" style="fill:var(--zone)" points="113.5,14 122,19 114,26"/><circle class="m-dot" cx="120" cy="34" r="7.5" style="fill:var(--zone)"/>` },
  { z: 'present', t: 'Perfect Continuous', c: 'have been + V-ing', p: 'Процесс и его счётчик.', d: id => `<line class="ax" x1="14" y1="34" x2="146" y2="34"/><defs><clipPath id="lg-${id}"><rect x="30" y="18" width="90" height="32"/></clipPath></defs><g clip-path="url(#lg-${id})"><path class="m-wave flow" style="stroke:var(--zone)" d="${wavePath(6, 146, 34)}"/></g><path class="m-span" style="stroke:var(--zone)" d="M 30 46 v 6 H 120 v -6"/>` }
];
