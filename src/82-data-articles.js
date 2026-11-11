const ALEVELS = [
  { n: 1, ru: 'Один предмет', title: 'Один из многих', code: 'a / an',
    txt: 'Начнём с одного предмета и научимся выбирать a или an на слух.' },
  { n: 2, ru: 'Какой именно', title: 'Та самая вещь', code: 'the',
    txt: 'Посмотрим, как собеседник понимает, о какой именно вещи мы говорим.' },
  { n: 3, ru: 'Без артикля', title: 'Когда слово уже понятно', code: '— · my · this',
    txt: 'Разберём, когда оставлять слово без артикля и когда перед ним уже есть my, this или другое подходящее слово.' }
];

const A = [
  {
    id: 'a-one', zone: 'present', level: 1, idx: 1, short: 'Один из многих',
    name: 'Подойдёт одна из многих', core: 'a pen · an apple',
    thesis: 'Мне нужна одна ручка. Какая подойдёт',
    lead: '<b>I need a pen.</b> По-русски просто «мне нужна ручка». По-английски <b>a</b> показывает, что нужна одна ручка и собеседнику не нужно угадывать, какая именно.',
    blocks: [
      { kind: 'key', h: 'Попробуй сказать «один»', p: 'Одна ручка, одна чашка, один билет. Эти вещи можно посчитать. Если говорим об одной из них и слушателю не нужно её опознавать, подойдёт <b>a</b> или <b>an</b>.' },
      { kind: 'plain', h: 'Кто ты по профессии?', p: '<b>She’s a doctor.</b> Врач — одна из профессий. По-русски хватает «она врач», а по-английски перед <b>doctor</b> ставим <b>a</b>.' },
      { kind: 'trap', h: 'Воду считаем бутылками', p: '<b>I need water</b> — нужна вода. <b>I need a bottle of water</b> — нужна одна бутылка воды. Здесь <b>a</b> относится к бутылке.' }
    ],
    forms: { p: 'I need <b>a</b> pen.', n: 'I don’t need <b>a</b> pen.', q: 'Do you have <b>a</b> pen?' },
    markers: ['один из многих', 'подойдёт любой', 'профессия'],
    ex: [
      { en: 'Can I borrow a pencil?', ru: 'Можно одолжить карандаш?' },
      { en: 'My sister is a nurse.', ru: 'Моя сестра медсестра.' },
      { en: 'I’d like a glass of water.', ru: 'Я бы хотел стакан воды.' }
    ]
  },
  {
    id: 'a-sound', zone: 'present', level: 1, idx: 2, short: 'На слух',
    name: 'A или an? Слушаем первый звук', core: 'a university · an hour',
    thesis: 'Произнеси следующее слово',
    lead: '<b>A</b> и <b>an</b> означают одно и то же. Перед гласным звуком говорим <b>an</b>, перед согласным — <b>a</b>.',
    blocks: [
      { kind: 'key', h: 'Слушай звук, с которого начинаешь', p: 'В <b>hour</b> буква h молчит, поэтому <b>an hour</b>. В <b>university</b> в начале слышится «й», поэтому <b>a university</b>.' },
      { kind: 'plain', h: 'Если перед вещью есть описание', p: 'Слушай первое слово после артикля. <b>An apple</b>, но <b>a green apple</b>. <b>A book</b>, но <b>an old book</b>.' }
    ],
    forms: { p: 'I have <b>an</b> idea.', n: 'I don’t have <b>an</b> answer.', q: 'Do you have <b>a</b> minute?' },
    markers: ['a green apple', 'an old book', 'an hour'],
    ex: [
      { en: 'We waited for an hour.', ru: 'Мы ждали час.' },
      { en: 'She studies at a university.', ru: 'Она учится в университете.' },
      { en: 'He drives an electric car.', ru: 'Он ездит на электромобиле.' }
    ]
  },
  {
    id: 'a-known', zone: 'future', level: 2, idx: 3, short: 'Понятно, какой',
    name: 'The — та самая вещь', core: 'Open the window.',
    thesis: 'Собеседник понимает, о чём речь',
    lead: 'У BMW на странице пятой серии крупно написано <b>THE 5</b>. По-русски можно обыграть это как «та самая пятёрка». Сохрани это ощущение для обычной речи. <b>The</b> подсказывает, что собеседник может понять, о чём именно речь. <a href="https://www.bmw.co.uk/en/all-models/5-series/saloon/bmw-5-series-saloon-overview.html">Посмотреть пример у BMW</a>.',
    blocks: [
      { kind: 'key', h: 'Можем показать пальцем', p: 'Сидим за столом. <b>Pass me the salt.</b> Соль легко найти, хотя о ней до этого не говорили.' },
      { kind: 'plain', h: 'Можем уточнить словами', p: '<b>The bag by the door is mine.</b> Слова <b>by the door</b> помогают понять, какую сумку я имею в виду.' },
      { kind: 'plain', h: 'Один, несколько или вода', p: 'Подходит <b>the book on my desk</b>, <b>the books on my desk</b> и <b>the water in this bottle</b>. В каждом случае ясно, про что говорим.' }
    ],
    forms: { p: '<b>The</b> window is open.', n: '<b>The</b> window isn’t open.', q: 'Can you open <b>the</b> window?' },
    markers: ['та самая', 'понятно из ситуации', 'есть уточнение'],
    ex: [
      { en: 'Turn off the light, please.', ru: 'Выключи свет, пожалуйста.', nb: 'в комнате понятно, какой свет' },
      { en: 'The keys on the table are yours.', ru: 'Ключи на столе твои.' },
      { en: 'The water in this bottle is cold.', ru: 'Вода в этой бутылке холодная.' }
    ]
  },
  {
    id: 'a-story', zone: 'future', level: 2, idx: 4, short: 'Знакомая вещь',
    name: 'В рассказе было a, стало the', core: 'I saw a dog. The dog followed me.',
    thesis: 'Сначала знакомлю, потом возвращаюсь',
    lead: '<b>I saw a dog near the shop.</b> Ты увидел вполне конкретную собаку, но слушатель ещё о ней не знает. <b>The dog followed me home.</b> Теперь вы оба понимаете, про какую собаку идёт речь.',
    blocks: [
      { kind: 'key', h: 'Сверься с тем, что знает слушатель', p: 'Первое упоминание обычно знакомит с вещью, второе возвращает к ней. Но если вещь уже ясна из ситуации, можно сразу сказать <b>the</b>, как в <b>Open the window</b> в комнате с одним окном.' },
      { kind: 'plain', h: 'Если появился ещё один предмет', p: '<b>I bought a book. The book was for my sister. Then I bought a book for myself.</b> Последнее <b>a book</b> вводит другую книгу.' }
    ],
    forms: { p: 'I saw <b>a</b> dog.', n: '<b>The</b> dog didn’t bark.', q: 'Was <b>the</b> dog friendly?' },
    markers: ['вводим в рассказ', 'возвращаемся к тому же', 'другой предмет'],
    ex: [
      { en: 'I bought a book. The book is on my desk.', ru: 'Я купил книгу. Книга у меня на столе.' },
      { en: 'She found an earring. The earring was under the sofa.', ru: 'Она нашла серьгу. Серьга лежала под диваном.' }
    ]
  },
  {
    id: 'a-zero', zone: 'past', level: 3, idx: 5, short: 'В целом',
    name: 'Собаки вообще, вода без уточнения', core: 'dogs · water · the dogs next door',
    thesis: 'Для книг вообще не нужно искать одну книгу',
    lead: '<b>I like dogs.</b> Я люблю собак в целом. <b>I like the dogs next door.</b> Мне нравятся конкретные собаки у соседей.',
    blocks: [
      { kind: 'key', h: 'Вещи во множественном числе', p: '<b>I read books.</b> Читаю книги. <b>I bought apples.</b> Купил яблоки. Здесь мы не уточняем, какие именно книги или яблоки. В заданиях выбери «—», чтобы оставить пропуск пустым.' },
      { kind: 'plain', h: 'То, что обычно не считаем поштучно', p: '<b>I need water.</b> Просто нужна вода. <b>The water in this bottle is cold.</b> Теперь речь о воде в этой бутылке.' },
      { kind: 'trap', h: 'С одной вещью проверь, что стоит перед ней', p: 'Скажи <b>a book</b>, <b>the book</b>, <b>my book</b> или <b>this book</b>. В такой фразе одного <b>book</b> обычно мало.' }
    ],
    forms: { p: 'I like <b>coffee</b>.', n: 'I don’t drink <b>coffee</b>.', q: 'Do you drink <b>coffee</b>?' },
    markers: ['вообще', 'без уточнения', 'вода · кофе · музыка'],
    ex: [
      { en: 'Children need sleep.', ru: 'Детям нужен сон.' },
      { en: 'We bought tomatoes.', ru: 'Мы купили помидоры.' },
      { en: 'The coffee in this cup is cold.', ru: 'Кофе в этой чашке холодный.' }
    ]
  },
  {
    id: 'a-other', zone: 'past', level: 3, idx: 6, short: 'My и this',
    name: 'Моя книга, эта книга, две книги', core: 'my book · this book · two books',
    thesis: 'Перед словом уже есть подсказка',
    lead: 'Сравни <b>a book</b>, <b>the book</b>, <b>my book</b> и <b>this book</b>. Когда уже сказал «моя» или «эта», ещё один артикль туда не ставим.',
    blocks: [
      { kind: 'key', h: 'Скажи «моя книга» целиком', p: '<b>My book</b> — моя книга. <b>This book</b> — эта книга. <b>Those books</b> — те книги. Перед <b>my</b>, <b>this</b> и <b>those</b> артикль не нужен.' },
      { kind: 'plain', h: 'С числом есть два смысла', p: '<b>I bought two books.</b> Я купил две книги. <b>The two books on the shelf are mine.</b> Две книги на полке — мои. Во втором случае ясно, какие именно две книги.' }
    ],
    forms: { p: 'I found <b>my</b> keys.', n: 'I can’t find <b>my</b> keys.', q: 'Where are <b>my</b> keys?' },
    markers: ['my · your · her', 'this · those', 'two books · the two books'],
    ex: [
      { en: 'Is this your jacket?', ru: 'Это твоя куртка?' },
      { en: 'I like those shoes.', ru: 'Мне нравятся те туфли.' },
      { en: 'The three chairs by the window are free.', ru: 'Три стула у окна свободны.' }
    ]
  }
];

const ADUELS = [
  { q: 'Открыть любое окно или то самое?',
    a: { z: 'present', n: 'Одно из окон', en: 'Open a window.', ru: 'Открой какое-нибудь окно.', why: 'В комнате душно. Подойдёт любое окно.' },
    b: { z: 'future', n: 'Понятно, какое', en: 'Open the window.', ru: 'Открой окно.', why: 'В комнате одно окно. Оба понимают, о каком речь.' },
    r: 'Спроси, может ли собеседник понять, какое окно открыть.' },
  { q: 'Собаки вообще или собаки по соседству?',
    a: { z: 'past', n: 'В целом', en: 'I like dogs.', ru: 'Я люблю собак.', why: 'Говорю о собаках вообще.' },
    b: { z: 'future', n: 'Конкретные собаки', en: 'I like the dogs next door.', ru: 'Мне нравятся собаки у соседей.', why: 'Понятно, каких именно собак я имею в виду.' },
    r: 'Со множественным числом тоже ставим the, если понятно, о каких именно вещах или животных речь.' },
  { q: 'A или an, если дальше есть описание?',
    a: { z: 'present', n: 'Слышится согласный', en: 'a green apple', ru: 'зелёное яблоко', why: 'Сразу после артикля звучит green.' },
    b: { z: 'future', n: 'Слышится гласный', en: 'an apple', ru: 'яблоко', why: 'Сразу после артикля звучит apple.' },
    r: 'Слушай первый звук слова, которое стоит сразу после артикля.' }
];
