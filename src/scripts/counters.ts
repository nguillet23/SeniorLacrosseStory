// Counts a metric up from zero the first time it scrolls into view.
// Only values that start with a number animate ("92%", "45 ms", "8.5/10"); placeholders like
// "XX%" stay as written. Skipped entirely when the visitor prefers reduced motion.
const DURATION_MS = 1200;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-metric-value]'));

function animate(element: HTMLElement, target: number, decimals: number, suffix: string) {
  const finalText = element.textContent ?? '';
  const start = performance.now();

  const frame = (now: number) => {
    const progress = Math.min((now - start) / DURATION_MS, 1);
    const eased = 1 - (1 - progress) ** 3;
    element.textContent =
      progress < 1 ? `${(target * eased).toFixed(decimals)}${suffix}` : finalText;
    if (progress < 1) requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}

if (!prefersReducedMotion && elements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);

        const element = entry.target as HTMLElement;
        const match = (element.textContent ?? '').trim().match(/^(\d+(?:\.(\d+))?)(.*)$/);
        if (!match) continue;

        animate(element, Number.parseFloat(match[1]), match[2]?.length ?? 0, match[3]);
      }
    },
    { threshold: 0.6 },
  );

  elements.forEach((element) => observer.observe(element));
}
