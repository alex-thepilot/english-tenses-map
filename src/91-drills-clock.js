function readClockDrill(hour, minute, onDial = false) {
  const [amount, direction, target] = clockParts(hour, minute);
  const current = CLOCK_NUMBERS[hour];
  const next = CLOCK_NUMBERS[hour % 12 + 1];
  const when = clockTime(hour, minute);
  const question = onDial
    ? 'Назови время по стрелкам.' + clockFace(hour, minute, false, 'Циферблат показывает ' + when)
    : 'На часах ' + when + '. Как сказать это время?';
  if (minute === 0) {
    return Q(question, ['+' + current + ' o’clock', 'На часах :00, поэтому называем час и добавляем o’clock.'],
      ['half past ' + current, 'Half past означало бы, что после этого часа уже прошло полчаса.'],
      [next + ' o’clock', 'O’clock выбрано верно. Короткая стрелка показывает ' + hour + ', его и называем.']);
  }
  if (minute === 30) {
    return Q(question, ['+half past ' + current, 'Прошло полчаса. После half past называем текущий час — ' + current + '.'],
      ['half past ' + next, '«Половина следующего» подсказывает, как сказать по-русски. В английском с half past берём текущий час.'],
      ['half to ' + next, 'На отметке :30 используем half past и называем текущий час.']);
  }
  const before = direction === 'to';
  const counted = before ? 60 - minute : minute;
  const why = before
    ? 'До следующего часа осталось ' + counted + ' мин. Ставим to и называем ' + target + '.'
    : 'После текущего часа прошло ' + counted + ' мин. Ставим past, затем называем ' + target + '.';
  return Q(question, ['+' + [amount, direction, target].join(' '), why + (counted === 15 ? ' Пятнадцать минут — a quarter.' : '')],
    [amount + ' ' + direction + ' ' + (before ? current : next), before
      ? 'С to называем час, до которого осталось ' + counted + ' мин. Здесь это ' + next + '.'
      : 'С past называем час, который уже начался. Здесь это ' + current + '.'],
    [amount + ' ' + (before ? 'past' : 'to') + ' ' + (before ? current : next), before
      ? 'Стрелка уже прошла отметку :30. Считаем, сколько осталось, и ставим to.'
      : 'Стрелка ещё в первой половине. Считаем, сколько прошло, и ставим past.']);
}

const CLOCK_DRILLS = {
  'h-past': [[12, 20], [1, 5], [9, 25], [4, 10], [6, 20], [3, 7], [8, 1], [2, 25], [10, 17], [11, 5]]
    .map(([hour, minute], i) => readClockDrill(hour, minute, i === 1 || i === 7)),
  'h-to': [[12, 40], [11, 55], [6, 50], [4, 35], [1, 40], [10, 58], [3, 59], [9, 55], [7, 37], [8, 50]]
    .map(([hour, minute], i) => readClockDrill(hour, minute, i === 2 || i === 9)),
  'h-quarter': [[12, 15], [12, 30], [12, 45], [6, 45], [2, 30], [11, 45], [9, 15], [5, 30], [3, 15], [10, 30]]
    .map(([hour, minute], i) => readClockDrill(hour, minute, i === 3 || i === 6)),
  'h-exact': [
    readClockDrill(4, 0), readClockDrill(10, 0, true), readClockDrill(1, 0, true), readClockDrill(12, 0),
    Q('На табло 9:06. Прочитай цифры по порядку.', ['+nine oh six', 'Сначала называем час. Ноль в :06 читаем как oh.'],
      ['nine sixty', 'На табло 06 минут. Слово sixty означает 60.'], ['six oh nine', 'Здесь 9 часов и 6 минут. Сначала говорим nine.']),
    Q('На табло 3:42. Прочитай цифры по порядку.', ['+three forty-two', 'Сначала называем 3 часа, затем 42 минуты.'],
      ['three twenty-four', 'Twenty-four — 24. На табло 42, значит forty-two.'], ['four forty-two', 'На табло 3 часа. При чтении цифр час не меняем.']),
    Q('Как сказать «без четверти девять» в предложении «Мы встречаемся в 8:45»? · We meet ___ a quarter to nine.',
      ['+at', 'Когда отвечаем на вопрос «во сколько?», перед временем ставим at.'],
      ['in', 'В этой фразе называем конкретное время встречи. Перед ним ставим at.'],
      ['on', 'On подходит, например, перед днём недели. Перед временем на часах говорим at.']),
    Q('Как сказать «семь утра»?', ['+seven a.m.', 'A.m. подходит для семи утра.'],
      ['seven p.m.', 'Seven p.m. — семь вечера.'], ['a quarter past seven', 'Это 7:15. Из фразы ещё не ясно, утро или вечер.']),
    Q('Что скажешь, если сейчас ровно полдень?', ['+It’s noon.', 'Noon значит «полдень».'],
      ['It’s midnight.', 'Midnight — это полночь.'], ['It’s half past twelve.', 'Это 12:30, уже полчаса после двенадцати.']),
    Q('Что спросить, чтобы узнать, который час?', ['+What time is it?', 'Так спрашивают, сколько времени сейчас.'],
      ['What time does it start?', 'Это вопрос «Во сколько это начинается?».'], ['What day is it?', 'Так спрашивают, какой сегодня день.'])
  ]
};

const QUIZ_CLOCK = [
  readClockDrill(2, 10, true), readClockDrill(5, 45), readClockDrill(7, 30, true), readClockDrill(12, 55),
  readClockDrill(6, 0, true), readClockDrill(7, 15), readClockDrill(4, 52), readClockDrill(3, 25),
  Q('На экране 10:03. Прочитай цифры по порядку.', ['+ten oh three', 'Говорим час, затем читаем ноль как oh и называем три минуты.'],
    ['three oh ten', 'Так часы и минуты поменялись местами. На табло десять часов.'],
    ['ten thirty', 'Ten thirty — это 10:30. На табло 10:03.']),
  Q('Кафе закрывается в шесть вечера. · The cafe closes at ___.', ['+six p.m.', 'P.m. показывает, что речь о шести вечера.'],
    ['six a.m.', 'Six a.m. — это шесть утра.'], ['half past six', 'Это 6:30, а кафе закрывается ровно в шесть.'])
];
