/* Одинаковое свечение у кнопок хедера и навигатора, без внешних библиотек. */
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.course-cta').forEach(button => {
    let frame = 0;
    let point = null;
    button.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || reducedMotion.matches) return;
      point = {x:event.clientX, y:event.clientY};
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = button.getBoundingClientRect();
        if (!point || !box.width || !box.height) return;
        const percent = (value, start, size) => Math.max(0, Math.min(100, (value - start) / size * 100));
        button.style.setProperty('--nav-pointer-x', percent(point.x, box.left, box.width) + '%');
        button.style.setProperty('--nav-pointer-y', percent(point.y, box.top, box.height) + '%');
      });
    }, {passive:true});
    button.addEventListener('pointerleave', () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      point = null;
      button.style.removeProperty('--nav-pointer-x');
      button.style.removeProperty('--nav-pointer-y');
    });
  });
})();
