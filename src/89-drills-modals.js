function modalDrill(prompt, answer, why, wrong, wrongWhy, other, otherWhy) {
  return Q(prompt, ['+' + answer, why], [wrong, wrongWhy], [other, otherWhy]);
}

function canNegative(prompt) {
  return modalDrill(prompt, 'can’t', 'Добавляем not к can. Короткая форма — can’t.',
    'don’t can', 'Can уже может сделать отрицание само. Слово don’t здесь не нужно.',
    'can’t to', 'После can’t сразу называем действие, без to.');
}

function modalQuestion(prompt, form) {
  return modalDrill(prompt, form, 'Для вопроса выносим ' + form.toLowerCase() + ' вперёд.',
    'Do ' + form.toLowerCase(), 'Вопрос уже начинается с ' + form.toLowerCase() + '. Слово do не нужно.',
    form + ' to', 'Ставь ' + form.toLowerCase() + ' перед тем, о ком спрашиваешь. To здесь не нужно.');
}

function permissionDrill(prompt, form, action) {
  return modalDrill(prompt, form + ' I', 'Ты сам хочешь ' + action + '. После ' + form.toLowerCase() + ' ставим I.',
    form + ' you', 'С you вопрос обращён к другому человеку. Здесь ты спрашиваешь про себя.',
    'Do I ' + form.toLowerCase(), form + ' уже начинает вопрос. Дополнительное do не нужно.');
}

function requestDrill(prompt, form, action) {
  return modalDrill(prompt, form + ' you', 'Ты просишь собеседника ' + action + '. После ' + form.toLowerCase() + ' ставим you.',
    form + ' I', 'С I вопрос был бы о тебе. Здесь ты просишь другого человека.',
    form + ' you to', 'После you сразу называем действие, без to.');
}

function chanceDrill(prompt, form) {
  return modalDrill(prompt, form, 'Речь о том, что, возможно, произойдёт. Здесь подходит ' + form + '.',
    'can', 'Can обычно передаёт «может», когда есть возможность или умение. Здесь гадаем, что случится.',
    form + ' to', 'Само слово ' + form + ' подходит. После него действие идёт сразу, без to.');
}

function chanceNegative(prompt, form) {
  return modalDrill(prompt, form + ' not', 'Чтобы сказать «возможно, не», добавляем not после ' + form + '.',
    'doesn’t ' + form, 'Здесь ' + form + ' само справляется с отрицанием. Ставим not после него.',
    form, 'Без not получится обратный смысл. По условию действие, возможно, не случится.');
}

const LDRILLS = {
  'l-can': [
    canNegative('Я не могу открыть файл. · I ___ open the file.'),
    canNegative('Она не может разобрать мой почерк. · She ___ read my handwriting.'),
    canNegative('Мы не можем найти ключи. · We ___ find the keys.'),
    modalQuestion('Ты умеешь водить? · ___ you drive?', 'Can'),
    modalQuestion('Она может поднять эту коробку? · ___ she lift this box?', 'Can'),
    modalQuestion('Ты умел кататься на коньках в шесть лет? · ___ you skate when you were six?', 'Could'),
    modalDrill('Он умеет играть на пианино. · He ___ play the piano.', 'can', 'С he пишем то же can. Дальше сразу play.',
      'cans', 'Даже с he слово can остаётся как есть.', 'can to', 'После can сразу ставим play, без to.'),
    modalDrill('В пять лет я уже умел читать. · I ___ read when I was five.', 'could', 'Говорим об умении в прошлом, поэтому could.',
      'can', 'Can передаёт, что умеешь сейчас. Здесь речь о том, что умел в пять лет.', 'could to', 'Could подходит, но после него сразу идёт read.'),
    modalDrill('В детстве она ещё не умела плавать. · She ___ swim as a child.', 'couldn’t', 'Для «не умела тогда» ставим couldn’t.',
      'didn’t could', 'Could само справляется с отрицанием. Добавляем к нему not, без didn’t.', 'can’t', 'Can’t звучит как «не может сейчас». Здесь речь о детстве.'),
    modalDrill('Я не могу ждать. Используй полную форму. · I ___ wait.', 'cannot', 'Полную форму cannot в этой фразе пишем слитно.',
      'can not', 'В обычной фразе «я не могу» полную форму пишем слитно.', 'do not can', 'Для отрицания добавляем not к can. Do здесь не нужно.')
  ],
  'l-request': [
    permissionDrill('Можно я здесь сяду? · ___ sit here?', 'Can', 'сесть'),
    requestDrill('Не мог бы ты придержать дверь? · ___ hold the door?', 'Could', 'придержать дверь'),
    permissionDrill('Можно мне взглянуть на меню? · ___ see the menu?', 'Could', 'посмотреть меню'),
    requestDrill('Не могли бы вы подписать здесь? · ___ sign here, please?', 'Would', 'подписать'),
    permissionDrill('Можно мне войти? · ___ come in?', 'May', 'войти'),
    requestDrill('Можешь принести два стакана? · ___ bring two glasses?', 'Can', 'принести стаканы'),
    permissionDrill('Можно я одолжу твой карандаш? · ___ borrow your pencil?', 'Can', 'одолжить карандаш'),
    requestDrill('Не мог бы ты повторить свой номер? · ___ repeat your number?', 'Could', 'повторить номер'),
    permissionDrill('Можно я оставлю пальто здесь? · ___ leave my coat here?', 'May', 'оставить пальто'),
    requestDrill('Не могли бы вы говорить помедленнее? · ___ speak more slowly, please?', 'Would', 'говорить помедленнее')
  ],
  'l-chance': [
    chanceDrill('Возможно, магазин закроется пораньше. · The shop ___ close early.', 'might'),
    chanceDrill('Возможно, рейс задержится. · The flight ___ be delayed.', 'may'),
    chanceDrill('Возможно, мы заедем к ним в воскресенье. · We ___ visit them on Sunday.', 'might'),
    chanceDrill('Возможно, лёд растает к обеду. · The ice ___ melt by lunchtime.', 'may'),
    chanceNegative('Возможно, она не получит письмо сегодня. · She ___ get the letter today.', 'might'),
    chanceNegative('Возможно, поезд не остановится в этом городе. · The train ___ stop in this town.', 'may'),
    chanceNegative('Возможно, он не помнит мой адрес. · He ___ remember my address.', 'might'),
    modalDrill('В субботу у меня свободно, так что я могу помочь. · I ___ help on Saturday.',
      'can', 'Ты знаешь, что в субботу у тебя получается. Can передаёт возможность.',
      'might', 'Might прозвучит как «возможно, помогу». Здесь ты говоришь, что можешь.',
      'can to', 'После can сразу ставим help, без to.'),
    modalDrill('Как думаешь, Лена может опоздать? · ___ you think Lena might be late?',
      'Do', 'Do относится к you think. Часть Lena might be late внутри вопроса остаётся целой.',
      'Might', 'В этой фразе спрашиваем «ты думаешь?». Might уже стоит рядом с Lena.',
      'Can', 'Can you think означало бы «Ты можешь думать?». Здесь подойдёт Do you think — «Как думаешь?».'),
    chanceDrill('Возможно, мы увидим лису у леса. · We ___ see a fox near the woods.', 'might')
  ]
};

const QUIZ_L = [
  canNegative('Я не могу найти очки. · I ___ find my glasses.'),
  permissionDrill('Можно мне сфотографировать зал? · ___ take a photo of the hall?', 'May', 'сфотографировать зал'),
  chanceNegative('Возможно, они не услышат звонок. · They ___ hear the bell.', 'might'),
  modalQuestion('Твой брат умеет печь хлеб? · ___ your brother bake bread?', 'Can'),
  requestDrill('Не мог бы ты включить свет? · ___ turn on the light?', 'Could', 'включить свет'),
  chanceDrill('Возможно, Дэн принесёт торт. · Dan ___ bring a cake.', 'may'),
  modalDrill('В восемь лет мы уже умели ездить на велосипеде. · We ___ ride a bike when we were eight.',
    'could', 'Вы описываете, что умели раньше. Для этого используем could.',
    'can', 'Can передаёт умение сейчас. Здесь речь о том, что умели в восемь лет.',
    'could to', 'После could сразу ставим ride, без to.'),
  permissionDrill('Можно я открою коробку? · ___ open the box?', 'Can', 'открыть коробку'),
  requestDrill('Не могли бы вы отправить мне копию? · ___ send me a copy, please?', 'Would', 'отправить копию'),
  chanceDrill('Возможно, мы встретимся уже завтра. · We ___ meet as early as tomorrow.', 'might')
];
