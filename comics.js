(() => {
  const links = [...document.querySelectorAll('[data-comic-select]')];
  const pages = [...document.querySelectorAll('[data-comic-page]')];
  if (!links.length) return;
  function select(id) {
    if (!pages.some(page => page.id === id)) return;
    links.forEach(link => link.setAttribute('aria-current', String(link.hash === '#' + id)));
    pages.forEach(page => { page.hidden = page.id !== id; });
  }
  links.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    select(link.hash.slice(1));
    history.replaceState(null, '', link.hash);
  }));
  window.addEventListener('hashchange', () => select(location.hash.slice(1)));
  select(pages.some(page => '#' + page.id === location.hash) ? location.hash.slice(1) : 'comic-coffee-rescue');
})();
