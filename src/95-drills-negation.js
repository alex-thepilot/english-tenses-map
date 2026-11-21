function negationQuestions(block) {
  return block.trim().split('\n').map(line => {
    const [sentence, answer, why, first, firstWhy, second, secondWhy] = line.trim().split('|');
    return Q(sentence, ['+' + answer, why], [first, firstWhy], [second, secondWhy]);
  });
}

const NEGATION_DRILLS = {
  'g-once': negationQuestions(`
    Я никогда не курю. · I ___ smoke.|never|Never уже означает «никогда не». Ещё одно не не нужно.|never don’t|Never уже отрицает. Don’t сюда не добавляем.|not never|Для «никогда не» достаточно never без not.
    Никто не пришёл. · ___ came.|Nobody|Nobody уже сообщает, что не пришёл ни один человек.|Anybody|Anybody не сообщает, что никто не пришёл.|Nobody didn’t|Nobody уже даёт отрицание. Came оставляем без didn’t.
    Я ничего не знаю об этом. · I know ___ about it.|nothing|Nothing уже означает «ничего». Перед know не нужно don’t.|anything|В этой сборке нет другого отрицания. Нужно nothing.|not nothing|Для «ничего не знаю» достаточно nothing после know.
    Мы никуда не ходили. · We went ___.|nowhere|Nowhere означает «никуда». Went оставляем без didn’t.|anywhere|Без отрицания anywhere не передаст «никуда не».|not nowhere|Здесь нужно одно отрицание: nowhere.
    Я никогда раньше этого не видел. · I have ___ seen this before.|never|Never ставим после have. Don’t здесь не нужно.|never don’t|Отрицание уже в never. Don’t лишнее, а seen оставляем.|not never|Для «никогда не» здесь нужно never без not.
    Она никогда не опаздывает. · She is ___ late.|never|После is ставим never: She is never late.|never doesn’t|Never уже даёт отрицание. Doesn’t не добавляем.|not never|Здесь говорим «никогда не», поэтому достаточно never.
    Никто не позвонил. · ___ called.|No one|No one означает то же, что nobody: никто.|No one didn’t|No one уже отрицает. Не добавляем didn’t.|Someone|Someone — кто-то. Здесь не позвонил никто.
    Я никогда тебя не забуду. · I will ___ forget you.|never|Never ставим после will. Оно уже означает «никогда не».|never won’t|Will уже стоит перед пропуском. Отрицание даёт never.|not never|Нужно never без второго отрицания not.
    В коробке ничего нет. · There is ___ in the box.|nothing|Nothing уже говорит, что внутри ничего нет.|anything|В этой фразе нет not. Для пустой коробки нужно nothing.|not nothing|Не добавляем not к nothing для «ничего нет».
    У меня нет вопросов. · I have ___ questions.|no|No ставим перед названием того, чего нет: no questions.|nothing|Nothing — самостоятельное «ничего». Перед questions нужно no.|not no|No уже означает отсутствие вопросов. Ещё одно not не нужно.
  `),
  'g-any': negationQuestions(`
    Я никого не видел. · I didn’t see ___.|anybody|Didn’t уже отрицает. После него выбираем anybody.|nobody|Для этого смысла не соединяем didn’t и nobody.|somebody|Somebody — кто-то определённый. Здесь говорим, что не видели никого.
    Я ничего не знаю. · I don’t know ___.|anything|Don’t уже означает «не». Поэтому дальше anything.|nothing|Не склеиваем don’t и nothing для «ничего не».|everything|Not everything означает «не всё». Это другой смысл.
    Мы никуда не ходили. · We didn’t go ___.|anywhere|Отрицание уже в didn’t. Выбираем anywhere.|nowhere|Для «никуда не» после didn’t не нужно nowhere.|everywhere|Not everywhere — «не везде». Здесь не ходили вообще никуда.
    У меня нет денег. · I don’t have ___ money.|any|Don’t уже отрицает. Перед money ставим any.|no|Не соединяем don’t и no для «денег нет».|nothing|Nothing не ставим перед money. Здесь нужно any money.
    У меня нет времени. · I have ___ time.|no|В этой сборке нет don’t. Слово no само показывает отсутствие времени.|any|Any само не передаёт «нет». Здесь нужно no.|nothing|Перед time ставим no. Nothing означает «ничего» и стоит само.
    Я никого не видел. Другой способ: I didn’t ___ anybody.|see|Прошлое уже показывает didn’t. Действие возвращаем к виду see.|saw|Saw уже показывает прошлое. После didn’t говорим see.|seen|После didn’t нужна обычная форма see, а не третья форма seen.
    В сумке ничего нет. · There isn’t ___ in the bag.|anything|Isn’t уже содержит not. Дальше выбираем anything.|nothing|Для пустой сумки не соединяем isn’t и nothing.|everything|Not everything — «не всё». Нам нужно «ничего».
    Я никогда этого не пробовал. · I haven’t ___ tried it.|ever|Haven’t уже отрицает. С ever получится «никогда не пробовал».|never|Для «никогда не» после haven’t не добавляем never.|not ever|В haven’t уже есть not. Второе not не нужно.
    Никто никогда ничего мне не рассказывает. · Nobody ___ tells me anything.|ever|Отрицание уже в nobody. Поэтому дальше ever, а не never.|never|Не переносим каждое русское «ни» отдельным отрицанием.|doesn’t|Nobody уже сообщает «никто не». Doesn’t здесь не нужно.
    Никто ничего не знает об этом. · Nobody knows ___ about it.|anything|Nobody уже отрицает всю фразу. Поэтому дальше anything.|nothing|Для этого смысла не ставим nobody и nothing вместе.|not anything|Отрицание уже есть в nobody. Дополнительное not не нужно.
  `),
  'g-questions': negationQuestions(`
    Ты когда-нибудь раньше это видел? · Have you ___ seen this before?|ever|Спрашиваем «когда-нибудь?», поэтому ever.|never|Never дало бы «неужели никогда?». Это другой вопрос.|don’t ever|Вопрос уже строится через have. Don’t здесь не нужно.
    Ты кого-нибудь видел? · ___ you see anybody?|Did|Вопрос о прошлом: did выходит перед you, дальше see.|Do|Do спросило бы про настоящее. Здесь спрашиваем, видел ли ты.|Didn’t nobody|Это не сборка вопроса «ты кого-нибудь видел?». Здесь достаточно Did you.
    Кто-нибудь дома? · ___ anybody home?|Is|В такой фразе вперёд выходит is. Do ему не нужно.|Does|Home здесь говорит, где человек. Нужен is, как в He is home.|Do is|Не добавляем do перед is. Вопрос делает само is.
    Кто-нибудь может мне помочь? · ___ anybody help me?|Can|Can выходит в начало и само задаёт вопрос.|Does can|Can не нужен помощник does. Говорим Can anybody help me?|Do can|Не ставим do перед can. Вперёд выходит can.
    Никто не позвонил? · ___ nobody call?|Did|Did помогает спросить. Оно само не означает «не». Отрицание уже в nobody.|Didn’t|Для этого смысла не добавляем didn’t к nobody.|Was|С call здесь спрашиваем через did. Was не нужно.
    Никто не знает ответ? · Does nobody ___ the answer?|know|Does уже помогает задать вопрос. После него обычное know.|knows|Окончание s после does к know не добавляем.|doesn’t know|Отрицание уже в nobody, а does уже стоит в начале.
    Ты когда-нибудь был в Лондоне? · ___ you ever been to London?|Have|Вопрос строим через have: Have you ever been…?|Did|С been и ever здесь нужна сборка Have you ever been…?|Do|Для «когда-нибудь был» в этой фразе нужно Have you ever been…?
    В коробке что-нибудь есть? · Is there ___ in the box?|anything|Нейтрально спрашиваем, есть ли что-нибудь.|nothing|Nothing сделало бы вопрос «неужели ничего нет?».|not nothing|Для нейтрального вопроса не нужны два отрицания. Нужно anything.
    Кто-нибудь знает дорогу? · Does ___ know the way?|anybody|Для «кто-нибудь?» в этом вопросе подходит anybody.|nobody|Nobody изменит смысл: «никто не знает дорогу?»|not anybody|Does здесь лишь помогает спросить. Для нужного вопроса выбираем anybody.
    Никто не опаздывает? · ___ nobody late?|Is|Late говорит, в каком человек состоянии. Нужен is, как в Nobody is late.|Does|Не говорим Does nobody late. Здесь вперёд выходит is.|Isn’t|Для этого смысла nobody уже даёт отрицание. Достаточно Is nobody late?
  `),
  'g-either': negationQuestions(`
    Можно взять или чай, или кофе. · You can have ___ tea or coffee.|either|Either идёт в паре с or: «или … или …».|neither|Neither требует nor и убирает оба варианта.|both|Both соединяем через and. Здесь предлагаем выбор.
    Или идём пешком, или берём такси. · We can either walk ___ take a taxi.|or|Пара either … or … соединяет два варианта.|nor|Nor ставим с neither. Здесь either, поэтому or.|and|And подошло бы к both. Здесь выбираем.
    Или Том, или Анна тебе позвонит. · ___ Tom or Anna will call you.|Either|Either … or …: позвонит один из двух.|Neither|Neither соединяем с nor. Оно означает «ни тот ни другой».|Both|Both идёт с and и означает обоих.
    Можно остаться здесь или пойти с нами. · You can either stay here or ___.|come with us|Соединяем два действия: stay here и come with us.|coming with us|После can здесь оба действия называем прямо: stay и come.|to come with us|Can уже относится к обеим частям. To перед come не добавляем.
    Здесь работает или Том, или Анна. · Either Tom or Anna ___ here.|works|Ближе к действию Anna, один человек. Поэтому works, как Anna works.|work|Здесь Anna — один человек. Говорим Anna works.|working|Для обычного «работает здесь» нужно works. Working само по себе так не ставим.
    Приходи или в понедельник, или во вторник. · Come either on Monday ___ on Tuesday.|or|После either выбираем or: два дня на выбор.|nor|N есть у neither и nor. Здесь either без n.|and|And означало бы соединение обоих дней. Здесь выбираем один.
    Можно заплатить наличными или картой. · You can pay ___ in cash or by card.|either|Either … or … предлагает два способа оплаты.|both|Для both потребовалось бы and и смысл «обоими способами».|neither|Neither исключает оба способа и требует nor.
    Мы можем или пройти пешком, или взять такси? · ___ we either walk or take a taxi?|Can|Вопрос задаёт can в начале. Пара either … or … остаётся внутри.|Do can|Перед can не ставим do. Can само выходит вперёд.|Can’t neither|Здесь обычный вопрос о выборе. Нужно Can we either…?
    Мы не можем поехать ни по одному из двух маршрутов. · We can’t take ___ route.|either|Can’t уже отрицает. После него either route означает «ни один из двух».|neither|Для этого смысла после can’t не добавляем neither.|both|Both route так не собирается: для обоих нужно both routes.
    Или Том, или его друзья придут. · Either Tom or his friends ___ coming.|are|Рядом с действием his friends — «они». Поэтому are coming.|is|Ближе к действию his friends. Для «они» нужно are.|am|Am подходит к I. Здесь friends, поэтому are.
  `),
  'g-neither': negationQuestions(`
    Я не пью ни чай, ни кофе. · I drink ___ tea nor coffee.|neither|Neither идёт с nor. N напоминает no: ни один напиток.|either|Either требует or и предлагает выбор, а не отказ от обоих.|both|Both идёт с and и означает оба напитка.
    Она не умеет ни петь, ни танцевать. · She can neither sing ___ dance.|nor|После neither ставим nor. У обоих впереди n.|or|Or — пара для either. Здесь нужно nor.|and|And — пара для both. Здесь отрицаем оба действия.
    Я не пью ни чай, ни кофе. · I ___ neither tea nor coffee.|drink|Neither … nor … уже отрицает. Drink оставляем без don’t.|don’t drink|Не добавляем don’t к neither … nor … для этого смысла.|doesn’t drink|После I не ставим doesn’t, а отрицание уже есть в neither.
    Ни Том, ни Анна не позвонили. · ___ Tom nor Anna called.|Neither|Neither … nor … означает «ни … ни …».|Either|Для either нужно or. Здесь отказываемся от обоих.|Both|Both … and … означало бы, что позвонили оба.
    Комната ни большая, ни удобная. · The room is neither big ___ comfortable.|nor|Соединяем два качества через neither … nor ….|or|Не меняем пару: neither требует nor.|and|And ставим с both. Здесь оба качества отрицаем.
    Мне не нравится ни один из них двоих. · I like ___ of them.|neither|Neither of them — ни один из двух. Don’t не нужно.|both|Both of them означает обоих. Это противоположный смысл.|either|Без отрицания either не передаст отказ от обоих.
    Ни Том, ни Анна здесь не работает. · Neither Tom nor Anna ___ here.|works|Ближе к действию Anna — один человек. Works, как Anna works.|work|В этой фразе после nor стоит Anna. Для неё выбираем works.|doesn’t work|Neither уже даёт отрицание. Не добавляем doesn’t.
    Она не умеет ни читать, ни писать. · She ___ neither read nor write.|can|Отрицание уже в neither … nor …, поэтому can без not.|can’t|Для этого смысла не добавляем can’t к neither … nor ….|does can|Can не нужен помощник does.
    Ни Том, ни его друзья не придут. · Neither Tom nor his friends ___ coming.|are|Ближе к действию his friends — «они». Выбираем are.|is|Рядом с действием друзья, поэтому are, а не is.|aren’t|Neither … nor … уже отрицает. Второе отрицание не нужно.
    Еда ни горячая, ни свежая. · The food ___ neither hot nor fresh.|is|Состояние называем через is. Neither … nor … уже отрицает.|isn’t|Для этого смысла не соединяем isn’t и neither.|does|С hot и fresh нужен is. Does сюда не ставим.
  `),
  'g-both': negationQuestions(`
    Мне нравятся и чай, и кофе. · I like ___ tea and coffee.|both|Both … and … включает оба напитка.|either|Either идёт с or и предлагает выбор.|neither|Neither идёт с nor и исключает оба варианта.
    Она умеет и петь, и танцевать. · She can both sing ___ dance.|and|Пара both … and … означает «и … и …».|or|Or ставим с either, когда выбираем.|nor|Nor ставим с neither, когда отрицаем оба.
    И Том, и Анна работают здесь. · Both Tom and Anna ___ here.|work|Двое вместе — как they. Поэтому work без s.|works|Works подходит одному человеку. Здесь вместе работают двое.|is working|Для двоих было бы are working. Здесь привычное действие: work.
    И Том, и Анна здесь. · Both Tom and Anna ___ here.|are|Том и Анна вместе — «они». Для них выбираем are.|is|Is подходит одному. Здесь двое, поэтому are.|am|Am ставим с I. Здесь двое, поэтому are.
    Маршрут и короткий, и безопасный. · The route is both short ___ safe.|and|Два качества соединяем через both … and ….|nor|Nor нужно с neither. Здесь оба качества есть.|or|Or даёт выбор. Здесь есть оба качества.
    Мне нравятся они оба. · I like ___ of them.|both|Both of them означает «они оба».|neither|Neither of them — ни один из двоих. Это другой смысл.|nobody|Nobody — «никто». Nobody of them так не говорим.
    Мне нравятся не оба. · I don’t like both of them. Это значит: ___|не обязательно нравятся оба|Фраза не говорит, что не нравится ни один. Один может нравиться.|точно не нравится ни один|Для «ни один из двух» скажи I like neither of them.|точно нравятся оба|Don’t отрицает «оба нравятся». Оба сразу здесь не утверждаем.
    Мне не нравится ни один из двух фильмов. · I like ___ film.|neither|Neither film исключает оба фильма. Don’t не нужно.|both|Both film так не собирается, а both films означало бы оба фильма.|either|Здесь нет другого отрицания. Для отказа от обоих нужно neither.
    Ты говоришь и по-английски, и по-французски? · Do you speak ___ English and French?|both|Пара both … and … сохраняется внутри вопроса.|either|Either требует or и предлагает выбрать.|neither|Neither требует nor. Вопрос здесь про оба языка.
    Можно взять и яблоко, и грушу. · You can have both an apple ___ a pear.|and|Both идёт с and: можно взять оба фрукта.|or|Or оставило бы выбор. Здесь разрешены оба.|nor|Nor отрицает вместе с neither. Здесь оба фрукта можно.
  `)
};

const QUIZ_NEGATION = negationQuestions(`
  Никто не ответил. · ___ answered.|Nobody|Nobody уже означает «никто не». Второе отрицание не нужно.|Nobody didn’t|Для «никто не ответил» не добавляем didn’t к nobody.|Anybody|Anybody не сообщает, что никто не ответил.
  Я ничего не слышал. · I didn’t hear ___.|anything|Отрицание уже в didn’t. Поэтому anything.|nothing|Не склеиваем didn’t и nothing для «ничего не».|everything|Not everything — «не всё». Здесь не слышал вообще ничего.
  Я никогда не был в Париже. · I have ___ been to Paris.|never|Never ставим после have. Оно уже означает «никогда не».|never don’t|Отрицание уже в never. Don’t не добавляем.|not never|Для «никогда не» здесь достаточно never.
  Можно взять или суп, или салат. · You can have either soup ___ salad.|or|Either идёт с or: или один вариант, или другой.|nor|Nor нужно с neither. Здесь either.|and|And нужно с both. Здесь предлагаем выбор.
  Он не говорит ни по-английски, ни по-французски. · He speaks ___ English nor French.|neither|Neither … nor … уже отрицает. Speaks оставляем без doesn’t.|either|Either идёт с or и даёт выбор.|both|Both идёт с and и включает оба языка.
  И Марк, и Лиза живут здесь. · Both Mark and Lisa ___ here.|live|Двое вместе — как they. Поэтому live без s.|lives|Lives подходит одному. Здесь двое вместе.|is living|Для двоих было бы are living. В этой фразе выбираем live.
  Ты когда-нибудь видел кита? · Have you ___ seen a whale?|ever|Спрашиваем «когда-нибудь?» — ever.|never|Never изменит вопрос на «неужели никогда?».|don’t ever|Вопрос строит have. Don’t сюда не добавляем.
  Мы никуда не ездили в воскресенье. · We went ___ on Sunday.|nowhere|Nowhere уже означает «никуда». Went остаётся без didn’t.|anywhere|В этой сборке нет другого отрицания. Нужно nowhere.|not nowhere|Не добавляем not к nowhere для «никуда не».
  Она не умеет ни водить, ни плавать. · She can neither drive ___ swim.|nor|Neither идёт с nor. У обоих слов впереди n.|or|Or — пара для either. Здесь ни одно действие не умеет.|and|And — пара для both. Здесь оба действия отрицаем.
  Комната и тёплая, и тихая. · The room is ___ warm and quiet.|both|Both … and … включает оба качества.|neither|Neither потребовало бы nor и отрицало бы оба качества.|either|Either идёт с or. Здесь не выбор, а два качества вместе.
  Никто не помог? · ___ nobody help?|Did|Did задаёт вопрос, но само не означает «не». Отрицание уже в nobody.|Didn’t|Для этого смысла не добавляем didn’t к nobody.|Was|С help здесь вопрос строится через did.
  У меня нет билетов. · I don’t have ___ tickets.|any|Don’t уже отрицает. Перед tickets выбираем any.|no|Для «билетов нет» не ставим don’t и no вместе.|nothing|Nothing стоит само. Перед tickets нужно any.
`);
