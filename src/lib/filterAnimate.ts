// Animated show/hide for filterable grids (gallery, floorplans).
// The visible tiles fade/drift out, the set is swapped, then the matching tiles rise back in with a short stagger.
// Uses the Web Animations API (all current browsers); falls back to an instant swap without it or with reduced motion.
let run = 0;

export function animateFilter<T extends HTMLElement>(items: T[], show: (el: T) => boolean, onSwap?: () => void) {
  const id = ++run;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const swap = () => { items.forEach((el) => (el.hidden = !show(el))); onSwap?.(); };
  if (reduce || typeof items[0]?.animate !== 'function') { swap(); return; }

  items.forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
  const outgoing = items.filter((el) => !el.hidden && inView(el));
  const outs = outgoing.map((el) =>
    el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-12px) scale(0.98)' }], { duration: 220, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'forwards' }).finished.catch(() => {}),
  );
  Promise.all(outs).then(() => {
    if (id !== run) return;
    swap();
    items.forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
    items.filter((el) => !el.hidden).forEach((el, i) => {
      if (!inView(el)) return; // off-screen tiles just appear (their scroll-reveal is unaffected)
      el.animate([{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'none' }], { duration: 620, delay: Math.min(i, 8) * 55, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards' });
    });
  });
}

function inView(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight * 1.2;
}
