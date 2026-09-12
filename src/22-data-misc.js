const ZONES = [
  { key: 'past', label: 'Past · прошлое' },
  { key: 'present', label: 'Present · настоящее' },
  { key: 'future', label: 'Future · будущее' }
];
const DUELS = [
  {
    q: 'Present Simple или Present Continuous?',
    a: { z: 'present', n: 'Present Simple', tl: 'present-simple', en: 'I <i class="v">work</i> at a bank.', ru: 'Я работаю в банке.', why: 'Вообще, по жизни. Это моя профессия — она не про сегодняшний день.' },
    b: { z: 'present', n: 'Present Continuous', tl: 'present-continuous', en: 'I <i class="v">\'m working</i> from home this week.', ru: 'На этой неделе я работаю из дома.', why: 'Временно, в этот период. На следующей неделе, возможно, всё изменится.' },
    r: '«Вообще» против «сейчас и временно». Если действие можно назвать чертой человека — Simple. Если оно про текущий отрезок — Continuous.'
  },
  {
    q: 'Past Simple или Present Perfect? — та самая пара',
    a: { z: 'past', n: 'Past Simple', tl: 'past-simple', en: 'I <i class="v">lost</i> my keys yesterday.', ru: 'Я потерял ключи вчера.', why: 'Названо «когда». Это просто история из прошлого — может, я их уже нашёл.' },
    b: { z: 'present', n: 'Present Perfect', tl: 'present-perfect', en: 'I <i class="v">\'ve lost</i> my keys.', ru: 'Я потерял ключи.', why: 'Когда — неважно. Важно, что прямо сейчас я стою у закрытой двери.' },
    r: 'Есть точное время в прошлом — Past Simple, и спорить не о чем. Нет времени, но есть последствие в настоящем — Present Perfect.'
  },
  {
    q: 'Present Perfect или Present Perfect Continuous?',
    a: { z: 'present', n: 'Present Perfect', tl: 'present-perfect', en: 'I <i class="v">\'ve painted</i> the kitchen.', ru: 'Я покрасил кухню.', why: 'Сколько сделано. Кухня готова, можно любоваться результатом.' },
    b: { z: 'present', n: 'Present Perfect Cont.', tl: 'present-perfect-continuous', en: 'I <i class="v">\'ve been painting</i> the kitchen.', ru: 'Я красил кухню.', why: 'Сколько длилось. Я весь в краске, и кухня, возможно, ещё не доделана.' },
    r: 'Perfect отвечает «сколько сделано» (результат, количество). Perfect Continuous — «сколько длится» (процесс, следы, усталость).'
  },
  {
    q: 'will или be going to?',
    a: { z: 'future', n: 'will', en: '— It\'s cold. — I <i class="v">\'ll close</i> the window.', ru: '— Холодно. — Я закрою окно.', why: 'Решение родилось прямо в этот момент, в ответ на реплику. Оси это не видно: различие не в том, <b>когда</b> случится действие, а в том, когда было принято решение.' },
    b: { z: 'future', n: 'be going to', en: 'I <i class="v">\'m going to</i> learn Spanish.', ru: 'Я собираюсь учить испанский.', why: 'Решение принято раньше: курс выбран, учебник куплен. Само действие стоит на оси там же, где и в соседней колонке.' },
    r: 'will — решаю сейчас. going to — решил раньше или вижу признаки: Look at the sky, it\'s going to rain.'
  },
  {
    q: 'Past Simple или Past Continuous?',
    a: { z: 'past', n: 'Past Simple', tl: 'past-simple', en: 'The phone <i class="v">rang</i>.', ru: 'Зазвонил телефон.', why: 'Короткая вспышка. Случилось — и всё.' },
    b: { z: 'past', n: 'Past Continuous', tl: 'past-continuous', en: 'I <i class="v">was cooking</i> when the phone rang.', ru: 'Я готовил, когда зазвонил телефон.', why: 'Длинный фон, в который врезалось короткое событие.' },
    r: 'Длинное — Continuous, короткое — Simple. После while обычно длинное, после when — короткое.'
  }
];
