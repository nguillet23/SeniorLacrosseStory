// Mobile menu: toggles aria-expanded, closes on link click, Esc, outside click and when the
// viewport grows past the mobile breakpoint (keep 52rem in sync with Navbar.astro).
export {}; // makes this a module so its top-level names stay local

const navbar = document.querySelector<HTMLElement>('[data-navbar]');
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');

if (navbar && toggle && menu) {
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
  };

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  menu.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (isOpen() && !navbar.contains(event.target as Node)) setOpen(false);
  });

  window.matchMedia('(max-width: 52rem)').addEventListener('change', (event) => {
    if (!event.matches) setOpen(false);
  });
}
