// Scroll parallax for [data-parallax] blocks (full-width image bands).
// The inner [data-parallax-layer] is taller than its frame; as the block scrolls through the viewport the layer
// drifts the opposite way, so the photo appears to move slower than the page. Transform-only, one rAF per frame,
// and only for blocks currently on screen. Without JS or with reduced motion the photo simply sits still.
const EXTRA = 0.12; // must match the layer's overhang in CSS (-top-[12%], h-[124%])

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const blocks = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
const active = new Set<HTMLElement>();
let ticking = false;

const update = () => {
  ticking = false;
  if (reduce.matches) return;
  const vh = window.innerHeight;
  for (const el of active) {
    const layer = el.querySelector<HTMLElement>('[data-parallax-layer]');
    if (!layer) continue;
    const r = el.getBoundingClientRect();
    // -1 when the block is entering at the bottom, +1 when it leaves at the top
    const p = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2)));
    layer.style.transform = `translate3d(0, ${(p * EXTRA * r.height).toFixed(1)}px, 0)`;
  }
};
const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };

if (blocks.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) e.isIntersecting ? active.add(e.target as HTMLElement) : active.delete(e.target as HTMLElement);
    request();
  }, { rootMargin: '10% 0px' });
  blocks.forEach((el) => io.observe(el));
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  reduce.addEventListener?.('change', () => {
    if (reduce.matches) blocks.forEach((el) => el.querySelector<HTMLElement>('[data-parallax-layer]')?.style.removeProperty('transform'));
    request();
  });
}
