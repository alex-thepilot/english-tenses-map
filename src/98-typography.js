/* Мягкая типографика только в отображаемом тексте: исходные задания не меняются. */
(() => {
  const panels = [...document.querySelectorAll('.tabpanel')];
  const originals = new WeakMap();
  const canvas = document.createElement('canvas');
  const measure = canvas.getContext('2d');
  if (!measure) return;

  const copy = 'p,li,figcaption,h1,h2,h3,h4,.en,.ru,.nb,.why,.bu__note,.bu__schema,.st__top .mono,.home-card__text,.home-card__name,.qz__row > span';
  const skip = 'svg,script,style,button,input,select,textarea,.train,.qz__opts,.qz__q,.drill__top,.qz__nav';
  const emphasis = 'b,strong,.v,.yes,.no,.mono,code';
  const nbsp = '\u00a0';
  const shortWords = /(^|[\s«(—])((?:в|во|на|к|ко|с|со|у|о|об|от|до|из|по|за|не|ни|а|и|но|для|без|под|при|над|про|же|бы|ли)) +(?=([^\s«»()[\]<>]+))/giu;
  let scheduled = false;

  function column(element) {
    let box = element;
    while (box.parentElement && getComputedStyle(box).display === 'inline') box = box.parentElement;
    const css = getComputedStyle(box);
    return Math.max(0, box.clientWidth - parseFloat(css.paddingLeft) - parseFloat(css.paddingRight));
  }

  function width(text, element) {
    const css = getComputedStyle(element);
    measure.font = css.font;
    return measure.measureText(text).width + (parseFloat(css.letterSpacing) || 0) * Math.max(0, text.length - 1);
  }

  function formatText(node) {
    const element = node.parentElement;
    if (!element || element.closest(skip) || !element.closest(copy)) return;
    const old = originals.get(node);
    const original = old && old.rendered === node.data ? old.original : node.data;
    const available = column(element) - 2;
    // Не собираем длинные неразрывные строки: короткая связка — максимум половина колонки.
    const fits = value => width(value, element) <= available * .5;
    let rendered = original.replace(/«([^«»\n]{1,72})»/gu, (all, phrase) => {
      return phrase.trim().split(/\s+/u).length <= 5 && fits(all) ? all.replace(/ +/gu, nbsp) : all;
    });
    rendered = rendered.replace(shortWords, (all, before, word, next) => {
      return fits(word + ' ' + next) ? before + word + nbsp : all;
    });
    if (node.data !== rendered) node.data = rendered;
    originals.set(node, {original, rendered});
  }

  function formatEmphasis(root) {
    root.querySelectorAll(emphasis).forEach(element => {
      element.classList.remove('typography-keep');
      if (element.closest(skip) || !element.closest(copy) || element.querySelector('br') ||
          getComputedStyle(element).display !== 'inline') return;
      const text = element.textContent.trim();
      if (!text || text.split(/\s+/u).length > 6) return;
      // Range учитывает разные шрифты во вложенных span и реальную ширину пробелов.
      element.classList.add('typography-keep');
      const range = document.createRange();
      range.selectNodeContents(element);
      if (range.getBoundingClientRect().width > column(element) - 2) element.classList.remove('typography-keep');
    });
  }

  const observer = new MutationObserver(schedule);
  function observe() {
    panels.forEach(root => observer.observe(root, {
      subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['hidden']
    }));
  }
  function format() {
    scheduled = false;
    observer.disconnect();
    panels.filter(root => !root.hidden).forEach(root => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) formatText(walker.currentNode);
      formatEmphasis(root);
    });
    observe();
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(format);
  }
  window.addEventListener('resize', schedule, {passive: true});
  if (document.fonts) {
    document.fonts.ready.then(schedule);
    document.fonts.addEventListener('loadingdone', schedule);
  }
  observe();
  schedule();
})();
