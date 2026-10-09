// Sets data-scrolled on the navbar once the page has scrolled past the sentinel at the top.
export {}; // makes this a module so its top-level names stay local

const navbar = document.querySelector<HTMLElement>('[data-navbar]');
const sentinel = document.querySelector<HTMLElement>('[data-nav-sentinel]');

if (navbar && sentinel) {
  new IntersectionObserver(([entry]) => {
    navbar.toggleAttribute('data-scrolled', !entry.isIntersecting);
  }).observe(sentinel);
}
