/* Вариант «—» означает, что пропуск оставляем пустым. */
function articleDrill(prompt, answer, why, first, firstWhy, second, secondWhy) {
  const startsSentence = /(?:^|[.!?]\s+)___/.test(prompt);
  const option = text => startsSentence ? text[0].toUpperCase() + text.slice(1) : text;
  return Q(prompt, ['+' + option(answer), why], [option(first), firstWhy], [option(second), secondWhy]);
}

function articleSound(prompt, answer, word, sound) {
  const opposite = answer === 'an' ? 'a' : 'an';
  const explanation = 'Сразу после артикля стоит ' + word + '. Первый звук — ' + sound + '.';
  return articleDrill(prompt, answer, explanation + ' Поэтому ' + answer + '.',
    opposite, explanation + ' Здесь нужен ' + answer + '.',
    '—', 'Речь об одном предмете. Перед ним здесь нужен a или an.');
}

const ADRILLS = {
  'a-one': [
    ['Мне нужен карандаш, любой', 'I need ___ pencil.', 'pencil', 'a'],
    ['Можно взять любой свободный стул?', 'Can I take ___ chair?', 'chair', 'a'],
    ['Купи блокнот, любой подойдёт', 'Buy ___ notebook, please.', 'notebook', 'a'],
    ['Моя тётя инженер', 'My aunt is ___ engineer.', 'engineer', 'an'],
    ['Его брат водитель', 'His brother is ___ driver.', 'driver', 'a'],
    ['Нам нужен один волонтёр', 'We need ___ volunteer.', 'volunteer', 'a'],
    ['Она ищет какую-нибудь квартиру', 'She’s looking for ___ apartment.', 'apartment', 'an'],
    ['Налей мне стакан молока', 'Pour me ___ glass of milk.', 'glass', 'a'],
    ['Он попросил коробку, любую', 'He asked for ___ box.', 'box', 'a'],
    ['Мне бы одно яблоко', 'I’d like ___ apple.', 'apple', 'an']
  ].map(([ru, en, word, answer]) => articleDrill('«' + ru + '». ' + en, answer,
    'Здесь речь об одном из многих. С ' + word + ' подходит ' + answer + '.',
    'the', 'С the собеседник должен понимать, какой именно предмет имеется в виду.',
    '—', 'Перед одним ' + word + ' в этой фразе нужен артикль.')),
  'a-sound': [
    ['We need ___ umbrella. Any one will do.', 'an', 'umbrella', 'гласный'],
    ['He told me ___ funny story.', 'a', 'funny', 'согласный'],
    ['I picked ___ orange from the basket.', 'an', 'orange', 'гласный'],
    ['I’m looking for ___ useful app.', 'a', 'useful', '«й»'],
    ['It took us ___ hour to get there.', 'an', 'hour', 'гласный, h не произносится'],
    ['She bought ___ red umbrella.', 'a', 'red', 'согласный'],
    ['I need ___ empty box.', 'an', 'empty', 'гласный'],
    ['They live on ___ quiet street.', 'a', 'quiet', 'согласный'],
    ['We found ___ old key in the garden.', 'an', 'old', 'гласный'],
    ['It’s ___ one-way street.', 'a', 'one-way', 'согласный /w/']
  ].map(row => articleSound(...row)),
  'a-known': [
    ['There’s only one door in this room. Please close ___ door.', 'В комнате одна дверь.'],
    ['I left my keys in a particular spot. ___ keys on the kitchen counter are mine.', 'Уточнение показывает, о каких ключах речь.'],
    ['We’ve arrived at the station. Look at ___ clock above the entrance.', 'Оба видим часы над входом.'],
    ['We’re at the table and there’s one pepper grinder. Could you pass ___ pepper?', 'Понятно, какой перец передать.'],
    ['There is one glass in front of you. Is ___ glass clean?', 'Спрашиваем о стакане перед собеседником.'],
    ['There are several boxes here. ___ boxes marked “Books” are mine.', 'Надпись выделяет нужные коробки.'],
    ['I poured water into a bowl. Don’t touch ___ water in that bowl.', 'Речь о воде в конкретной миске.'],
    ['We’re sitting under one lamp. Could you turn off ___ lamp?', 'Оба понимают, какую лампу выключить.'],
    ['There is a photo on the wall. Who is ___ person in that photo?', 'Уточнение показывает, о каком человеке спрашивают.'],
    ['One taxi is waiting for us. Let’s get in ___ taxi.', 'Речь о машине, которая ждёт нас.']
  ].map(([prompt, cue]) => articleDrill(prompt, 'the', cue + ' Поэтому the.',
    'a', 'С a говорили бы об одном из многих без уточнения. Здесь предмет уже понятен.',
    '—', 'В этой ситуации речь о конкретном предмете или группе. Здесь нужен the.')),
  'a-story': [
    ['I met ___ cyclist on the bridge. The cyclist showed me the way.', 'a'],
    ['I found a coin. ___ coin was under the mat.', 'the'],
    ['We saw ___ owl in the park. The owl flew away.', 'an'],
    ['She opened a parcel. ___ parcel contained a scarf.', 'the'],
    ['He bought ___ lamp at the market. The lamp was very old.', 'a'],
    ['I picked up a leaf. ___ leaf had a tiny hole.', 'the'],
    ['They rented ___ boat. The boat was yellow.', 'a'],
    ['We heard an alarm. ___ alarm came from the kitchen.', 'the'],
    ['There was ___ envelope in the mailbox. The envelope was empty.', 'an'],
    ['He found a glove. ___ glove belonged to his neighbor.', 'the']
  ].map(([prompt, answer]) => articleDrill(prompt, answer,
    answer === 'the' ? 'Об этом предмете уже сказали. Теперь понятно, о каком именно речь.' : 'Знакомим слушателя с новым предметом. Первый звук подсказывает ' + answer + '.',
    answer === 'the' ? 'a' : 'the',
    answer === 'the' ? 'A вводило бы ещё один предмет, а здесь продолжаем говорить о том же.' : 'С the слушатель должен был бы уже знать, о каком предмете речь.',
    '—', 'Здесь говорим об одном предмете. В этом месте нужен артикль.')),
  'a-zero': [
    ['Я люблю груши вообще', 'I like ___ pears.'],
    ['Мне нужна мука, без уточнения', 'I need ___ flour.'],
    ['Мне нравится слушать музыку', 'I enjoy listening to ___ music.'],
    ['Купили помидоры, без уточнения какие', 'We bought ___ tomatoes.'],
    ['Птицам нужны деревья, говорим в целом', 'Birds need ___ trees.'],
    ['Добавь немного соли', 'Add ___ salt.'],
    ['Он пьёт чай, говорим о привычке', 'He drinks ___ tea.'],
    ['Дети любят истории, говорим в целом', 'Children love ___ stories.'],
    ['В этом рецепте используют рис', 'This recipe uses ___ rice.'],
    ['Мы выращиваем огурцы', 'We grow ___ cucumbers.']
  ].map(([ru, en]) => articleDrill('«' + ru + '». ' + en, '—',
    'В этом контексте говорим в целом или без уточнения. Артикль оставляем пустым.',
    'a', 'A нужен для одного предмета. Здесь такого предмета нет.',
    'the', 'The выделил бы конкретную порцию или группу, а здесь уточнения нет.')),
  'a-other': [
    ['Я забыл свой телефон', 'I forgot ___ phone.', 'my'],
    ['Это твой билет?', 'Is this ___ ticket?', 'your'],
    ['Мне нравится эта песня', 'I like ___ song.', 'this'],
    ['Где её сумка?', 'Where is ___ bag?', 'her'],
    ['Открой то окно', 'Open ___ window.', 'that'],
    ['Те перчатки тёплые', '___ gloves are warm.', 'Those'],
    ['Наш класс наверху', '___ classroom is upstairs.', 'Our'],
    ['Возьми эти чашки', 'Take ___ cups.', 'these'],
    ['Мне нужен его адрес', 'I need ___ address.', 'his'],
    ['Их автобус уже уехал', '___ bus has already left.', 'Their']
  ].map(([ru,en,answer]) => articleDrill('«' + ru + '». ' + en, answer,
    'Слово ' + answer + ' уже передаёт, чей это предмет или на какой предмет показывают.',
    'the ' + answer.toLowerCase(), 'Перед ' + answer + ' ещё один артикль не нужен.',
    'the', 'The само по себе не передаёт «чей» или указание «этот», «тот».'))
};

const QUIZ_A = [
  articleDrill('«Нам нужен рюкзак, любой». We need ___ backpack.', 'a', 'Подойдёт один из многих рюкзаков.', 'the', 'The указало бы на рюкзак, который слушатель может определить.', '—', 'Перед одним backpack нужен артикль или другое слово вроде my.'),
  articleSound('It was ___ honest mistake.', 'an', 'honest', 'гласный, h не произносится'),
  articleDrill('There is only one printer here. Is ___ printer working?', 'the', 'Понятно, о каком принтере речь.', 'a', 'С a спрашивали бы об одном из многих принтеров.', '—', 'Перед конкретным printer нужен the.'),
  articleDrill('I ordered a sandwich. ___ sandwich arrived cold.', 'the', 'Говорим о бутерброде, который уже заказали и упомянули.', 'a', 'A ввело бы в рассказ ещё один бутерброд.', '—', 'Здесь говорим о конкретном бутерброде, поэтому нужен the.'),
  articleDrill('«Мне нравятся велосипеды вообще». I like ___ bicycles.', '—', 'Велосипеды во множественном числе, говорим о них в целом.', 'a', 'A не ставим перед множественным числом.', 'the', 'The выделило бы известную группу велосипедов.'),
  articleDrill('«Где мои очки?» Where are ___ glasses?', 'my', 'My передаёт «мои».', 'the my', 'Перед my артикль не нужен.', 'the', 'The не передаёт принадлежность.'),
  articleDrill('«Он стоматолог». He’s ___ dentist.', 'a', 'Стоматолог — одна из профессий.', 'the', 'Здесь сообщаем профессию, собеседнику не нужно опознавать конкретного стоматолога.', '—', 'В английском перед dentist здесь нужен a.'),
  articleSound('They have ___ European office.', 'a', 'European', '«й»'),
  articleDrill('There are three jars on the shelf. ___ jar with the yellow lid is empty.', 'the', 'Жёлтая крышка выделяет нужную банку.', 'a', 'Фраза указывает на банку с конкретной крышкой.', '—', 'Перед одним jar в этой фразе нужен определитель.'),
  articleDrill('She found ___ insect on the windowsill. The insect was tiny.', 'an', 'Вводим насекомое впервые. Insect начинается с гласного звука.', 'the', 'На этом месте слушатель ещё не знает, о каком насекомом речь.', 'a', 'Перед начальным гласным звуком нужно an.'),
  articleDrill('«Нам нужен лёд». We need ___ ice.', '—', 'Лёд нужен без уточнения количества или порции.', 'a', 'Если нужен один кубик, скажем a cube of ice.', 'the', 'The подошло бы к известной порции льда.'),
  articleDrill('«Эти открытки мои». ___ postcards are mine.', 'These', 'These передаёт «эти».', 'The these', 'Перед these не добавляем the.', 'A', 'A не сочетается с postcards во множественном числе.')
];
