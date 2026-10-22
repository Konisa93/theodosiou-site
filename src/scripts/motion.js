// Scroll reveals, line drawing, rules and counters.
// Elements are visible by default; the hidden start state only applies under html.js.

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const TARGETS = '[data-reveal], [data-draw], [data-rule], [data-lines], [data-count]';

let observer;

function countUp(el) {
  const to = Number(el.dataset.count);
  const from = Number(el.dataset.from || 0);
  const format = (n) => Math.round(n).toLocaleString(el.closest('[lang]')?.lang || 'el');
  if (reduceMotion()) { el.textContent = format(to); return; }
  const duration = 1000;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = format(from + (to - from) * eased);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function reveal(el) {
  el.classList.add('is-in');
  if (el.hasAttribute('data-count')) countUp(el);
}

export function initMotion(root = document) {
  document.documentElement.classList.add('js');

  // Stagger index for children of a reveal group
  root.querySelectorAll('[data-reveal-group]').forEach((group) => {
    group.querySelectorAll(':scope > [data-reveal]').forEach((el, i) => el.style.setProperty('--i', i));
  });
  root.querySelectorAll('[data-lines]').forEach((h) => {
    h.querySelectorAll('.mask > span').forEach((el, i) => el.style.setProperty('--i', i));
  });

  observer?.disconnect();
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      reveal(entry.target);
      observer.unobserve(entry.target);
    });
    // threshold 0 + bottom margin: tall blocks (e.g. the table on phones) still reveal
  }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });

  root.querySelectorAll(TARGETS).forEach((el) => observer.observe(el));
}

// Replays every motion target inside `scope` (used by the style tile demos).
export function replay(scope) {
  const els = [...scope.querySelectorAll(TARGETS)];
  if (scope.matches(TARGETS)) els.push(scope);
  scope.classList.add('motion-reset');
  els.forEach((el) => el.classList.remove('is-in'));
  void scope.offsetWidth;
  scope.classList.remove('motion-reset');
  requestAnimationFrame(() => requestAnimationFrame(() => els.forEach(reveal)));
}
