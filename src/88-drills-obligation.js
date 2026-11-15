function obligationDrill(prompt, answer, why, wrongOptions) {
  return Q(prompt, ['+' + answer, why], ...wrongOptions);
}

function adviceDrill(prompt, verb) {
  return obligationDrill(prompt, 'should ' + verb, 'Это совет. После should сразу ставим ' + verb + '.',
    [['must ' + verb, 'Must прозвучит как требование. Здесь человек просто подсказывает.'],
     ['should to ' + verb, 'Should подходит по смыслу, но после него сразу ставим ' + verb + ', без to.']]);
}

function needDrill(prompt, singular) {
  return obligationDrill(prompt, singular ? 'has to' : 'have to',
    singular ? 'С he, she или одним человеком говорим has to.' : 'С I, you, we или they говорим have to.',
    [[singular ? 'have to' : 'has to', singular ? 'Когда речь об одном человеке и его можно назвать he или she, здесь нужно has to.' : 'Has to используем с he, she или it. Здесь говорим have to.'],
     ['have', 'В выражении «нужно что-то сделать» после have или has должно идти to.']]);
}

function mustDrill(prompt, verb) {
  return obligationDrill(prompt, 'must ' + verb, 'Это прямое требование. После must сразу ставим ' + verb + '.',
    [['should ' + verb, 'Should прозвучит как совет. По условию это требование.'],
     ['must to ' + verb, 'Must подходит по смыслу, но после него сразу ставим ' + verb + ', без to.']]);
}

const obligationMeanings = {
  forbidden: ['mustn’t', 'Здесь прямо запрещают это делать.'],
  optional: ['don’t have to', 'Это можно сделать по желанию.'],
  discouraged: ['shouldn’t', 'Здесь советуют этого избегать.']
};

function negativeObligationDrill(prompt, meaning) {
  const [answer, reason] = obligationMeanings[meaning];
  const wrongOptions = Object.entries(obligationMeanings)
    .filter(([key]) => key !== meaning)
    .map(([, [form, alternative]]) => [form, form + ' подошло бы в другой ситуации. ' + alternative.replace('Здесь', 'В таком случае')]);
  return obligationDrill(prompt, answer, reason + ' Поэтому ' + answer + '.', wrongOptions);
}

function pastObligationDrill(prompt, verb, done, advice) {
  return obligationDrill(prompt, advice ? 'should have ' + done : 'had to ' + verb,
    advice
      ? 'Мы смотрим назад и говорим, как стоило поступить. Ставим should have и третью форму глагола — ' + done + '.'
      : 'Тогда это было нужно. Говорим had to и добавляем ' + verb + '.',
    [[advice ? 'had to ' + verb : 'should have ' + done, advice
      ? 'Had to значит «тогда это было нужно». В этой фразе оцениваем решение задним числом.'
      : 'Should have здесь означало бы «стоило бы». В этой фразе говорим об обязанности, которая уже действовала.'],
     ['must have ' + done, 'Must have с третьей формой — это догадка о прошлом. Здесь мы не гадаем, что произошло.']]);
}

const MDRILLS = {
  'm-should': [
    ['Если хочешь, чтобы тебе тоже хватило, стоит купить три конфеты.', 'You ___ three candies.', 'buy'],
    ['На улице ветер. Тебе стоит взять куртку.', 'You ___ a jacket.', 'take'],
    ['По-моему, тебе стоит попробовать этот пирог.', 'You ___ this cake.', 'try'],
    ['Ты устал. Тебе стоит немного отдохнуть.', 'You ___ for a while.', 'rest'],
    ['Крис скучает по тебе. Тебе стоит ему позвонить.', 'You ___ Chris.', 'call'],
    ['Тебе стоит сесть ближе, отсюда плохо видно.', 'You ___ closer.', 'sit'],
    ['В этой пекарне отличный хлеб. Тебе стоит туда сходить.', 'You ___ that bakery.', 'visit'],
    ['Я бы советовал тебе проверить адрес.', 'You ___ the address.', 'check']
  ].map(([ru, en, verb]) => adviceDrill(ru + ' · ' + en, verb)).concat([
    Q('Как спросить совета «Мне взять зонт?»', ['+Should I take an umbrella?', 'Спрашиваем, стоит ли. Ставим should первым, дальше I и take.'], ['Do I should take an umbrella?', 'Вопрос начинается с should. Слово do здесь лишнее.'], ['Should I to take an umbrella?', 'После should используем take без to.']),
    Q('Тебе стоит записать этот номер. · You should ___ this number.', ['+write down', 'После should сразу ставим глагол write down.'], ['wrote down', 'Wrote — форма прошедшего времени. Здесь даём совет, поэтому write.'], ['to write down', 'После should не добавляем to.'])
  ]),
  'm-have': [
    ['По договорённости ты должен купить три конфеты.', 'You ___ buy three candies.', false],
    ['По графику Маша должна открыть магазин в восемь.', 'Masha ___ open the shop at eight.', true],
    ['У нас назначена встреча. Нам нужно уйти в пять.', 'We ___ leave at five.', false],
    ['Автобусы больше не ходят. Ему нужно идти пешком.', 'He ___ walk home.', true],
    ['Они обещали вернуть книгу в пятницу.', 'They ___ return the book on Friday.', false],
    ['У неё приём у врача. Ей нужно уйти пораньше.', 'She ___ leave early.', true],
    ['Зарядка сломалась. Мне нужно найти другую.', 'I ___ find another charger.', false],
    ['Чтобы выставить команду на игру, тренеру нужно найти пять игроков.', 'The coach ___ find five players.', true]
  ].map(([ru, en, singular]) => needDrill(ru + ' · ' + en, singular)).concat([
    Q('По расписанию ей нужно работать в субботу?', ['+Does she have to work on Saturday?', 'С she начинаем вопрос с does. После этого остаётся have to.'], ['Does she has to work on Saturday?', 'Слово does уже показывает, что речь о she. Дальше пишем have to.'], ['Is she have to work on Saturday?', 'Чтобы задать вопрос с have to и she, начинаем с does.']),
    Q('Нам нужно переводить весь текст? · ___ we have to translate the whole text?', ['+Do', 'С we вопрос с have to начинается с do.'], ['Does', 'Does подходит с he, she или it. С we ставим do.'], ['Are', 'Вопрос с have to здесь начинается с do.'])
  ]),
  'm-must': [
    ['Ты обязан ей помочь. Она твоя дочь.', 'You ___ her. She’s your daughter.', 'help'],
    ['Прямое распоряжение сотрудникам. Вы обязаны запереть дверь.', 'You ___ the door.', 'lock'],
    ['Тренер требует, чтобы все соблюдали правила.', 'You ___ the rules.', 'follow'],
    ['Строгое правило в лаборатории. Нужно надеть перчатки.', 'You ___ gloves.', 'wear'],
    ['Начальник даёт прямое указание подписать документ.', 'You ___ this document.', 'sign'],
    ['Обязательное условие игры. Нужно оставаться за линией.', 'You ___ behind the line.', 'stay'],
    ['Сотрудник аэропорта требует показать паспорт.', 'You ___ your passport.', 'show'],
    ['Охранник требует остановиться у ворот.', 'You ___ at the gate.', 'stop']
  ].map(([ru, en, verb]) => mustDrill(ru + ' · ' + en, verb)).concat([
    Q('Как спросить с must «Мы обязаны прийти лично?»', ['+Must we come in person?', 'В вопросе с must ставим его перед we. Дальше сразу come.'], ['Do we must come in person?', 'С must в вопросе дополнительное do не нужно.'], ['Must we to come in person?', 'После must ставим come без to.']),
    Q('Он обязан носить шлем. · He ___ a helmet.', ['+must wear', 'Даже с he пишем must и сразу wear.'], ['must wears', 'После must оставляем wear без окончания s.'], ['must to wear', 'После must ставим wear без to.'])
  ]),
  'm-not': [
    ['На выставке запрещено трогать экспонаты. · You ___ touch the exhibits.', 'forbidden'],
    ['Если не хочется, можешь не петь. · You ___ sing.', 'optional'],
    ['Я бы тебе не советовал идти этой дорогой. · You ___ go this way.', 'discouraged'],
    ['Здесь запрещено парковаться. · You ___ park here.', 'forbidden'],
    ['Можешь не брать полотенце, их выдают. · You ___ bring a towel.', 'optional'],
    ['Совет врача. Тебе лучше не пить кофе на ночь. · You ___ drink coffee before bed.', 'discouraged'],
    ['Билет можно распечатать по желанию. · You ___ print your ticket.', 'optional'],
    ['В кабинете запрещено есть. · You ___ eat in this room.', 'forbidden'],
    ['Я бы не советовал покупать этот телефон. · You ___ buy this phone.', 'discouraged'],
    ['Встреча по желанию. Можешь не приходить. · You ___ come to the meeting.', 'optional']
  ].map(([prompt, meaning]) => negativeObligationDrill(prompt, meaning)),
  'm-past': [
    ['Ты купил две конфеты. Задним числом понятно, что стоило купить три. · You ___ three candies.', 'buy', 'bought', true],
    ['По вчерашней договорённости ты должен был купить три конфеты. · You ___ three candies.', 'buy', 'bought', false],
    ['Ты был обязан ей помочь тогда. Она твоя дочь. · You ___ her.', 'help', 'helped', false],
    ['Стоило записать адрес. Теперь я его не помню. · I ___ the address.', 'write down', 'written down', true],
    ['По условиям конкурса нам нужно было отправить работу вчера. · We ___ it yesterday.', 'send', 'sent', false],
    ['Зря я не взял ключи. Стоило взять их с собой. · I ___ my keys.', 'take', 'taken', true],
    ['Лифт не работал. Нам пришлось подняться пешком. · We ___ up the stairs.', 'walk', 'walked', false],
    ['Зря ты не позвонил заранее. · You ___ ahead.', 'call', 'called', true]
  ].map(args => pastObligationDrill(...args)).concat([
    Q('Вам вчера пришлось ждать? · ___ you have to wait yesterday?', ['+Did', 'С yesterday говорим о прошлом. Вопрос начинаем с did, дальше остаётся have to.'], ['Do', 'Do подходит, когда спрашиваем про настоящее. Здесь речь о вчерашнем дне.'], ['Must', 'Must не добавляем к have to. Для вопроса о вчерашнем дне ставим did.']),
    Q('Вчера мне не нужно было работать. · I ___ work yesterday.', ['+didn’t have to', 'Вчера такой необходимости не было. После didn’t остаётся have to.'], ['mustn’t', 'Mustn’t означает «нельзя». Здесь речь об отсутствии необходимости вчера.'], ['didn’t had to', 'Didn’t уже показывает прошлое. Дальше используем have to.'])
  ])
};

const QUIZ_M = [
  adviceDrill('Дружеский совет. Тебе стоит попробовать суп. · You ___ the soup.', 'try'),
  negativeObligationDrill('Брать ноутбук необязательно. · You ___ bring a laptop.', 'optional'),
  pastObligationDrill('Стоило уйти раньше, теперь опаздываем. · We ___ earlier.', 'leave', 'left', true),
  needDrill('По графику Ник должен начинать в семь. · Nick ___ start at seven.', true),
  mustDrill('Прямое требование. Ты обязан выключить телефон. · You ___ your phone off.', 'turn'),
  negativeObligationDrill('В бассейне запрещено бегать. · You ___ run by the pool.', 'forbidden'),
  Q('Им нужно платить заранее? · ___ they have to pay in advance?', ['+Do', 'С they вопрос с have to начинается с do.'], ['Does', 'Does используется с he, she и it. Здесь they, поэтому do.'], ['Are', 'Здесь вопрос с have to. Начинаем его с do.']),
  pastObligationDrill('Вчера мы были обязаны предъявить билеты на входе. · We ___ our tickets at the entrance yesterday.', 'show', 'shown', false),
  negativeObligationDrill('Я бы не советовал тебе отвечать сгоряча. · You ___ reply while you’re angry.', 'discouraged'),
  Q('Как спросить совета «Что мне сказать?» · What ___ I say?', ['+should', 'Спрашиваем совета. После what ставим should, затем I и say.'], ['should to', 'После should в вопросе здесь сразу идут I и say. To не нужно.'], ['do should', 'Для вопроса с should дополнительное do не нужно.'])
];
