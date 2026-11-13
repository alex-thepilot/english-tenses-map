/* В каждой строке после предложения идут три пары «ответ, пояснение».
   Знак + отмечает верный вариант, как и в других вкладках. */
const VDRILLS = {
  'v-focus': [
    Q('«Меня пригласили». ___ invited.', ['+I was','I стоит первым, а was invited означает «меня пригласили».'], ['Me was','Me — форма для «меня» после глагола. Здесь первым стоит I.'], ['I','I invited означает «я пригласил».']),
    Q('«Кто-то разбил окно». Someone ___ the window.', ['+broke','Someone — тот, кто разбил. Здесь подходит broke.'], ['was broken','Was broken описывало бы того или то, что разбили.'], ['were broken','С someone было бы was, если бы что-то сделали с этим человеком. Здесь он сам разбил окно.']),
    Q('«Нам заплатили». We ___ paid yesterday.', ['+were','Деньги получили мы. С we в прошедшем ставим were paid.'], ['was','С we нужна форма were.'], ['did','«Нам заплатили» — We were paid. Берём were и третью форму pay — paid.']),
    Q('«Мы заплатили за обед». We ___ for lunch.', ['+paid','Мы сами заплатили, поэтому говорим We paid.'], ['were paid','We were paid означает «нам заплатили».'], ['paid us','Us поменяло бы смысл: заплатили нам.']),
    Q('«Его позвали внутрь». ___ called inside.', ['+He was','He стоит первым, was called говорит, что позвали его.'], ['Him was','В начале нужно he. Him ставится после глагола или предлога.'], ['He','He called означает, что позвал он сам.']),
    Q('«Посылку доставили в полдень». The parcel ___ at noon.', ['+was delivered','Рассказываем о том, что сделали с посылкой.'], ['delivered it','Тогда получилось бы, что посылка что-то доставила.'], ['were delivered','Посылка одна, поэтому was.']),
    Q('«Я отправил письмо». I ___ the letter.', ['+sent','Я сам отправил письмо.'], ['was sent','I was sent означает «меня отправили».'], ['was send','Если кого-то отправили, после was берём третью форму send — sent. Здесь письмо отправил я сам.']),
    Q('«Нас предупредили заранее». ___ warned in advance.', ['+We were','Предупредили нас. Первым ставим we, затем were warned.'], ['Us were','В начале на этом месте нужна форма we.'], ['We','We warned означало бы, что предупредили мы.']),
    Q('«Дверь открыли в восемь». The door ___ at eight.', ['+was opened','Кто-то открыл дверь. Дверь ставим первой и говорим was opened.'], ['was open','Это «дверь была открыта» как состояние, без указания на само открытие.'], ['was opening','Это описание процесса, в котором дверь открывалась.']),
    Q('«Собака съела бутерброд». The dog ___ the sandwich.', ['+ate','Собака сделала это сама, поэтому ate.'], ['was eaten','Was eaten означало бы, что съели собаку.'], ['was ate','Если что-то съели, после was ставим третью форму eat — eaten. Здесь собака сама съела бутерброд.'])
  ],
  'v-time': [
    Q('This hall ___ every morning.', ['+is cleaned','Зал один, и уборка регулярная.'], ['are cleaned','С одним залом нужна форма is.'], ['is clean','Это «зал чистый», а здесь речь о регулярной уборке.']),
    Q('These windows ___ every Friday.', ['+are washed','Окон несколько, поэтому are washed.'], ['is washed','С несколькими окнами нужна форма are.'], ['are wash','После are нужна третья форма washed.']),
    Q('The lights ___ last night.', ['+were turned off','Огней несколько, last night относит событие в прошлое.'], ['was turned off','С lights нужна форма were.'], ['are turned off','Are относится к настоящему, а здесь last night.']),
    Q('The note ___ yesterday.', ['+was written','Вчерашнее событие. Третья форма write — written.'], ['was wrote','Wrote — вторая форма. После was берём written.'], ['is written','Is не подходит для завершённого события вчера.']),
    Q('All the forms ___ tomorrow.', ['+will be checked','В будущем подходит will be + checked.'], ['will checked','После will нужно be, затем checked.'], ['will be check','После be берём третью форму checked.']),
    Q('The old bridge ___ in 1980.', ['+was built','Мост один, и назван год в прошлом.'], ['was build','После was нужна третья форма built.'], ['were built','Мост один, поэтому was.']),
    Q('The prize ___ next week.', ['+will be given','Приз вручат в будущем. Третья форма give — given.'], ['will be gave','Gave — вторая форма, а нужна given.'], ['will give','Тогда сам приз что-то вручит.']),
    Q('I ___ for this work every month.', ['+am paid','С I в настоящем берём am.'], ['is paid','Is ставим с he, she, it.'], ['am pay','После am нужна третья форма paid.']),
    Q('You ___ a new badge when you joined last year.', ['+were given','С you в прошлом используем were, затем given.'], ['was given','С you форма прошедшего — were.'], ['were gave','Gave — вторая форма, а нужна given.']),
    Q('The keys ___ in the drawer yesterday.', ['+were found','Ключей несколько, а found — третья форма find.'], ['was found','С keys нужна форма were.'], ['were find','После were ставим found.'])
  ],
  'v-neg': [
    Q('«Имя не напечатали». The name ___ on the ticket.', ['+was not printed','После was ставим not, затем printed.'], ['did not printed','После did нужна начальная форма, а для этого смысла — was not printed.'], ['was printed not','Not идёт сразу после was.']),
    Q('«Посылку завтра не доставят». The parcel ___ tomorrow.', ['+will not be delivered','Ставим not после will. Be и delivered остаются на месте.'], ['will be not delivered','В обычном отрицании not стоит после will.'], ['won’t delivered','После won’t нужно be.']),
    Q('«Этот вход не используют». This entrance ___.', ['+isn’t used','Isn’t — это is not. Затем ставим used.'], ['doesn’t used','«Этот вход не используют» — This entrance isn’t used. Ставим isn’t перед used.'], ['aren’t used','Вход один, поэтому isn’t.']),
    Q('«Двери не заперли вчера». The doors ___ yesterday.', ['+weren’t locked','С doors нужно were not или weren’t.'], ['wasn’t locked','Дверей несколько, поэтому weren’t.'], ['weren’t lock','После weren’t нужна третья форма locked.']),
    Q('«Письмо не отправили». The letter ___.', ['+wasn’t sent','Wasn’t sent — письмо не отправили.'], ['wasn’t send','Третья форма send — sent.'], ['didn’t sent','После didn’t было бы send. Здесь говорим «письмо не отправили», поэтому wasn’t sent.']),
    Q('«Тебя не предупредили». You ___ about the change.', ['+weren’t told','С you берём weren’t и третью форму told.'], ['wasn’t told','С you нужна форма weren’t.'], ['weren’t tell','После weren’t нужна третья форма told.']),
    Q('«Цены не поднимут». The prices ___ this month.', ['+won’t be raised','Won’t заменяет will not. За ним остаётся be raised.'], ['won’t raised','После won’t ставим be, а затем третью форму основного глагола.'], ['will be raised','Это утверждение, что цены поднимут.']),
    Q('«Столики здесь не бронируют». Tables ___ here.', ['+aren’t reserved','С tables в настоящем подходит are not.'], ['isn’t reserved','С tables нужна форма aren’t.'], ['aren’t reserve','После aren’t берём reserved.']),
    Q('«Мне не заплатили в пятницу». I ___ on Friday.', ['+wasn’t paid','В прошлом с I ставим was not и paid.'], ['weren’t paid','С I здесь нужно wasn’t.'], ['wasn’t pay','Нужна третья форма paid.']),
    Q('«Мост в следующем году не построят». The bridge ___ next year.', ['+will not be built','Not стоит после will, а третья форма build — built.'], ['will not be build','После be нужна третья форма built.'], ['will not built','Между not и built нужно be.'])
  ],
  'v-question': [
    Q('___ the letter sent yesterday?', ['+Was','Первым ставим was.'], ['Did','В обычной фразе уже есть was. Чтобы задать вопрос, переставляем was вперёд.'], ['Were','Письмо одно, поэтому was.']),
    Q('___ the rooms cleaned every morning?', ['+Are','Комнат несколько, и речь о привычном порядке.'], ['Is','Комнат несколько, поэтому are.'], ['Do','В обычной фразе уже есть are. Для вопроса ставим его перед тем, о чём спрашиваем.']),
    Q('___ the bike be repaired tomorrow?', ['+Will','Вперёд переезжает will, а be остаётся перед repaired.'], ['Will be','Be уже стоит в предложении.'], ['Was','Слово tomorrow указывает на будущее.']),
    Q('When ___ the window broken?', ['+was','После When ставим was, затем the window.'], ['did','Спрашиваем, когда разбили окно. После When ставим was перед the window, а дальше broken.'], ['were','Окно одно, поэтому was.']),
    Q('Why ___ the lights turned off last night?', ['+were','Lights во множественном числе, событие было вчера вечером.'], ['was','Огней несколько, поэтому were.'], ['are','Last night указывает на прошлое.']),
    Q('Where ___ the meeting be held next week?', ['+will','Вопросительное слово стоит первым, за ним идёт will.'], ['will be','Be уже стоит перед held.'], ['is','Здесь речь о будущем и уже дано be.']),
    Q('«Тебя пригласили?» ___ you invited?', ['+Were','С you в прошедшем вопрос начинается с Were.'], ['Was','С you нужна форма were.'], ['Did','Вопрос строится с were, а invited остаётся в третьей форме.']),
    Q('___ this cheese made locally?', ['+Is','С cheese в настоящем ставим is.'], ['Are','Cheese здесь употребляется в единственном числе.'], ['Does','Вопрос уже строится с is.']),
    Q('«Когда опубликуют результаты?» ___ the results be published?', ['+When will','Сначала When, потом will.'], ['Will when','When должно стоять первым.'], ['When were','Were относится к прошлому, а здесь будущее.']),
    Q('How ___ the boxes packed for shipping?', ['+are','После How выносим are перед the boxes.'], ['is','С boxes нужна форма are.'], ['do','В обычной фразе уже есть are. Для вопроса ставим его перед тем, о чём спрашиваем.'])
  ],
  'v-by': [
    Q('The story was written ___ Chekhov.', ['+by','By называет автора.'], ['with','With здесь подошло бы для инструмента.'], ['from','From указывает источник или отправную точку, а здесь нужен автор.']),
    Q('The bread was cut ___ a knife.', ['+with','Нож — инструмент. Используем with.'], ['by','By называет того, кто резал, а здесь указан нож.'], ['to','To не обозначает инструмент.']),
    Q('«Фото сделала моя сестра». The photo was taken ___ my sister.', ['+by','Сестра сделала фото. By называет того, кто это сделал.'], ['with','With my sister означало бы «вместе с сестрой».'], ['at','At может назвать место или время, а здесь нужен автор фото.']),
    Q('«У меня украли велосипед». My bike ___.', ['+was stolen','Фраза уже закончена. Можно не говорить, кто украл велосипед.'], ['was stole','Третья форма steal — stolen.'], ['was stolen by','После by нужно назвать того, кто это сделал.']),
    Q('«Раму сделал мой дедушка». The frame was made ___ my grandfather.', ['+by','Дедушка сделал раму.'], ['with','With my grandfather означало бы «вместе с дедушкой».'], ['into','Into может показать, во что что-то превратили. Здесь указан мастер.']),
    Q('The names were written ___ a black pen.', ['+with','Ручка — инструмент, используем with.'], ['by','By подошло бы к тому, кто писал.'], ['for','For обозначило бы, для кого или для чего, а не чем написали.']),
    Q('The song was recorded ___ a local band.', ['+by','Группа записала песню. By вводит исполнителя действия.'], ['from','From могло бы назвать источник, а здесь указано, кто записал песню.'], ['at','At вводило бы место записи, а не группу.']),
    Q('«Здесь говорят по-английски». English ___ here.', ['+is spoken','Можно сообщить, какой язык здесь используют, без уточнения, кто говорит.'], ['is spoke','Третья форма speak — spoken.'], ['is spoken by','Here указывает место. После by пришлось бы назвать людей.']),
    Q('The door was opened ___ a spare key.', ['+with','Запасной ключ — то, чем открыли дверь.'], ['by','Здесь назван инструмент, а не тот, кто открыл.'], ['at','At не отвечает на вопрос «чем открыли?».']),
    Q('«Роспись сделали два местных художника». The mural was painted ___ two local artists.', ['+by','Художники выполнили работу. Перед ними ставим by.'], ['with','With могло бы означать «вместе с», а здесь называем авторов.'], ['to','To не называет автора работы.'])
  ],
  'v-extra': [
    Q('Look! The bridge ___ right now.', ['+is being repaired','Ремонт идёт прямо сейчас. Нужны is being и repaired.'], ['has been repaired','Тогда ремонт уже закончился бы.'], ['is being repair','После being нужна третья форма repaired.']),
    Q('The tickets ___ already. There are none left.', ['+have been sold','Все билеты уже продали, это видно по результату.'], ['are being sold','Это означало бы, что продажа ещё идёт.'], ['have been sell','Третья форма sell — sold.']),
    Q('The parcel can ___ tomorrow.', ['+be delivered','После can ставим be и третью форму delivered.'], ['is delivered','После can форма is не подходит.'], ['be deliver','После be здесь нужна третья форма delivered.']),
    Q('___ the package been delivered yet?', ['+Has','Has выносим вперёд, а been delivered остаётся.'], ['Is','Is не соединяется с been в этой форме.'], ['Does','В таком вопросе вперёд выходит has.']),
    Q('The walls ___ painted at the moment.', ['+are being','Стены красят сейчас. С walls нужно are being.'], ['has been','Has не согласуется с walls и не описывает текущий процесс.'], ['are been','Для процесса после are ставим being.']),
    Q('The door must ___ before closing time.', ['+be locked','После must берём be и locked.'], ['is locked','После must нужна начальная форма be.'], ['be lock','После be здесь нужна третья форма locked.']),
    Q('The report ___ yet, so we’re still waiting.', ['+hasn’t been sent','Hasn’t been sent сообщает, что результата пока нет.'], ['has been sent','Это значило бы, что отчёт уже отправили.'], ['hasn’t being sent','После hasn’t нужна форма been.']),
    Q('The bike is ___ repaired right now.', ['+being','Being показывает, что ремонт идёт сейчас.'], ['been','Been употребили бы после has или have.'], ['be','После is для такого процесса нужна форма being.']),
    Q('These files should ___ in a safe place.', ['+be kept','После should берём be, затем kept.'], ['are kept','После should нельзя ставить are.'], ['be keep','Третья форма keep — kept.']),
    Q('___ the documents been signed?', ['+Have','С documents нужен have. В вопросе он стоит первым.'], ['Has','Документов несколько, поэтому have.'], ['Are','С are можно было бы спросить о процессе через being.'])
  ]
};

const QUIZ_V = [
  Q('«Мне дали ключ». ___ given a key.', ['+I was','Ключ получил я. Начинаем с I и добавляем was given.'], ['Me was','На первом месте здесь нужна форма I.'], ['I','I given не образует полного предложения.']),
  Q('The students ___ the chairs before class.', ['+moved','Стулья передвинули сами ученики.'], ['were moved','Это означало бы, что передвинули учеников.'], ['was moved','Was не подходит к students во множественном числе.']),
  Q('The invitations ___ last Friday.', ['+were sent','Приглашений несколько, а last Friday указывает на прошлое.'], ['was sent','С invitations нужна форма were.'], ['were send','После were берём третью форму sent.']),
  Q('The new timetable ___ tomorrow.', ['+will be posted','Расписание опубликуют завтра. Нужны will be и posted.'], ['will posted','Пропущено be.'], ['will be post','После be нужна третья форма posted.']),
  Q('«Лифт вчера не починили». The lift ___ yesterday.', ['+wasn’t fixed','Отрицание в прошлом: was not + fixed.'], ['was fixed','Это утверждение, что лифт починили.'], ['wasn’t fix','После wasn’t здесь нужна третья форма fixed.']),
  Q('«Работы в пятницу не проверят». The papers ___ on Friday.', ['+won’t be checked','После won’t остаются be и checked.'], ['will be checked','Это утверждение, а нужно отрицание.'], ['won’t checked','После won’t ставим be, а затем третью форму основного глагола.']),
  Q('When ___ the museum built?', ['+was','После When ставим was. Музей один.'], ['were','С museum нужна форма was.'], ['did','В обычной фразе уже есть was. Чтобы задать вопрос, переставляем was вперёд.']),
  Q('___ the results be announced on Monday?', ['+Will','Первым ставим will. Be остаётся перед announced.'], ['Will be','Так be оказалось бы в вопросе дважды.'], ['Were','Для будущего с be нужен will.']),
  Q('The picture was drawn ___ a child.', ['+by','By называет того, кто нарисовал.'], ['with','With указывало бы на инструмент или совместную работу.'], ['to','To здесь не вводит автора.']),
  Q('The rope was cut ___ scissors.', ['+with','Ножницы — инструмент.'], ['by','Здесь указано, чем резали, а не кто резал.'], ['for','For обозначило бы назначение, а не инструмент.']),
  Q('Please wait. The floor ___ right now.', ['+is being cleaned','Пол моют прямо сейчас.'], ['has been cleaned','Это означало бы, что пол уже вымыли.'], ['is been cleaned','Для процесса после is нужно being.']),
  Q('The forms ___ already, so you can pick them up.', ['+have been signed','Подписи уже стоят, и бланки можно забрать.'], ['are being signed','Это означало бы, что бланки ещё подписывают.'], ['has been signed','С forms во множественном числе нужно have.'])
];
