// Marks the nav link of the section crossing a thin band near the middle of the viewport.
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-menu] a[href^="#"]'));
const linkById = new Map(links.map((link) => [link.hash.slice(1), link]));
const sections = Array.from(linkById.keys())
  .map((id) => document.getElementById(id))
  .filter((section): section is HTMLElement => section !== null);

function setCurrent(id: string) {
  for (const [linkId, link] of linkById) {
    if (linkId === id) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
}

if (sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setCurrent(entry.target.id);
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );

  sections.forEach((section) => observer.observe(section));
}
