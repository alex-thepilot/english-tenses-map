function spellNumber(value) {
  return numberChunks(value).join(' ');
}

function showNumber(value) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function readNumberDrill(value, first, second) {
  const parts = numberChunks(value);
  const correct = parts.join(' ');
  return Q('Как сказать ' + showNumber(value) + ' по-английски?',
    ['+' + correct, 'Читаем по порядку: ' + parts.join(' + ') + '.'],
    [spellNumber(first), 'Так получится ' + showNumber(first) + '. В задании число ' + showNumber(value) + '.'],
    [spellNumber(second), 'Так получится ' + showNumber(second) + '. Нужные кусочки здесь: ' + parts.join(' + ') + '.']);
}

function orderNumberDrill(prompt, value, wrong, wrongWhy) {
  const words = numberChunks(value, true).join(' ');
  const plain = spellNumber(value);
  return Q(prompt, ['+' + words, 'Здесь спрашиваем «который?». Для этого числа говорим ' + words + '.'],
    [plain, plain + ' отвечает на «сколько?». Здесь важно место по счёту.'],
    [wrong, wrongWhy || 'Для этого числа нужная форма по счёту — ' + words + '.']);
}

function ordinalSuffixDrill(prompt, value, first, second) {
  const suffix = numberOrdinalSuffix(value);
  const ending = value % 100;
  const reason = ending >= 11 && ending <= 13
    ? 'Число заканчивается на ' + ending + ', поэтому пишем th.'
    : 'Смотрим на последнюю цифру. Для ' + (value % 10) + ' в этом числе используем ' + suffix + '.';
  return Q(prompt, ['+' + value + suffix, reason],
    [value + first, reason], [value + second, reason]);
}

const NUMBER_DRILLS = {
  'n-small': [
    [0, 1, 10], [12, 20, 2], [15, 50, 55], [16, 60, 66], [20, 12, 22], [45, 54, 40],
    [52, 25, 50], [65, 56, 60], [79, 97, 70]
  ].map(([value, first, second]) => readNumberDrill(value, first, second)).concat([
    Q('Как пишется число 40?', ['+forty', 'В слове forty нет u.'], ['fourty', 'У four есть u, а у forty его нет.'],
      ['fourteen', 'Fourteen — четырнадцать. Здесь нужно forty.'])
  ]),
  'n-big': [
    [152365, 125365, 152356], [203, 230, 2003], [1500, 1050, 15000], [72004, 72040, 70204],
    [240615, 24615, 240650], [1000001, 1001, 1000010], [2040010, 2400010, 2040100],
    [6010020, 6100020, 6010200], [10000000, 1000000, 100000000]
  ].map(([value, first, second]) => readNumberDrill(value, first, second)).concat([
    Q('Для проекта нужно две тысячи кирпичей. · We need ___ bricks.',
      ['+two thousand', 'После точного числа two слово thousand остаётся как есть.'],
      ['two thousands', 'Когда называем точное количество, s к thousand не добавляем.'],
      ['twenty thousand', 'Twenty thousand — двадцать тысяч. Здесь нужно две.'])
  ]),
  'n-order': [
    ['Первый день. · The ___ day.', 1, 'oneth'],
    ['Второй этаж. · The ___ floor.', 2, 'twoth'],
    ['Её третий урок. · Her ___ lesson.', 3, 'threeth'],
    ['Четвёртая остановка. · The ___ stop.', 4, 'fourthe'],
    ['Пятая страница. · The ___ page.', 5, 'fiveth', 'У five особая форма. Пишем fifth.'],
    ['Восьмой участник. · The ___ contestant.', 8, 'eightth', 'У eight уже есть t в конце. Пишем eighth.'],
    ['Девятый день. · The ___ day.', 9, 'nineth', 'В ninth буква e из nine пропадает.'],
    ['Двенадцатая глава. · The ___ chapter.', 12, 'twelveth', 'Двенадцатый — twelfth. Эту форму лучше запомнить.'],
    ['Двадцатая минута. · The ___ minute.', 20, 'twentyth', 'У круглых десятков y меняется на ieth.']
  ].map(([prompt, value, wrong, why]) => orderNumberDrill(prompt, value, wrong, why)).concat([
    Q('Как сказать «моя вторая попытка»? · It was ___.', ['+my second attempt', 'My уже говорит, чья попытка. После него ставим second.'],
      ['the my second attempt', 'Слово my уже стоит перед second. The сюда не добавляем.'],
      ['my two attempt', 'Two — «два». Когда речь о второй попытке, нужно second.'])
  ]),
  'n-compound': [
    orderNumberDrill('Двадцать первая страница. · The ___ page.', 21, 'twentieth-first', 'Меняем последнее слово. Twenty оставляем как есть.'),
    orderNumberDrill('Тридцать второй день. · The ___ day.', 32, 'thirtieth-second', 'Thirty остаётся как есть. Только two становится second.'),
    orderNumberDrill('Шестьдесят пятый участник. · The ___ contestant.', 65, 'sixtieth-five', 'Меняем последнее слово: five → fifth.'),
    orderNumberDrill('Сотый посетитель. · The ___ visitor.', 100, 'first hundred', 'One остаётся как есть. Последнее слово hundred становится hundredth.'),
    orderNumberDrill('Тысячный заказ. · The ___ order.', 1000, 'first thousand', 'К слову thousand добавляем th. Оно последнее в числе.'),
    ordinalSuffixDrill('Как записать «сорок третий» цифрами?', 43, 'th', 'st'),
    ordinalSuffixDrill('Как записать «шестьдесят второй» цифрами?', 62, 'th', 'rd'),
    ordinalSuffixDrill('Как записать «сто одиннадцатый» цифрами?', 111, 'st', 'nd'),
    ordinalSuffixDrill('Как записать «сто двенадцатый» цифрами?', 112, 'nd', 'rd'),
    ordinalSuffixDrill('Как записать «двести тринадцатый» цифрами?', 213, 'rd', 'st')
  ]
};

const QUIZ_NUMBERS = [
  readNumberDrill(17, 70, 77),
  readNumberDrill(50462, 54062, 50426),
  orderNumberDrill('Третий этаж. · The ___ floor.', 3, 'threeth'),
  readNumberDrill(996, 969, 9906),
  ordinalSuffixDrill('Как записать «пятьдесят первый» цифрами?', 51, 'th', 'nd'),
  readNumberDrill(46, 64, 16),
  orderNumberDrill('Восемьдесят девятая страница. · The ___ page.', 89, 'eightieth-nine', 'Eighty оставляем, а nine меняем на ninth.'),
  readNumberDrill(6050000, 6005000, 6500000),
  Q('В доме два этажа. · The house has ___ floors.', ['+two', 'Здесь спрашиваем, сколько этажей. Значит, two.'],
    ['second', 'Second означает «второй». Так мы бы назвали один этаж по счёту.'],
    ['twenty', 'Twenty — двадцать, а этажей два.']),
  orderNumberDrill('Тридцатая попытка. · The ___ try.', 30, 'thirtyth', 'У thirty меняем y на ieth. Получится thirtieth.')
];
