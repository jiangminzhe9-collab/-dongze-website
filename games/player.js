(() => {
  const frame = document.getElementById('game');
  const full = document.getElementById('full');
  const separate = document.querySelector('a[target="_blank"]');
  const english = new URLSearchParams(location.search).get('lang') === 'en';
  if (english) {
    const gameUrl = new URL(frame.src);
    if (gameUrl.hostname === 'paperbag-afterhours.mcjohn686.chatgpt.site' &&
        ['/town.html', '/cafe.html'].includes(gameUrl.pathname)) {
      gameUrl.pathname = gameUrl.pathname.replace('.html', '-en.html');
      frame.src = gameUrl.href;
      separate.href = gameUrl.href;
    }
    document.documentElement.lang = 'en';
    document.title = document.body.dataset.enTitle + ' | DONGZE';
    frame.title = document.body.dataset.enTitle;
    document.querySelector('nav').setAttribute('aria-label', 'Game navigation');
    document.querySelectorAll('[data-en]').forEach(el => { el.textContent = el.dataset.en; });
    document.querySelectorAll('a[data-policy]').forEach(link => { link.href = link.href.replace('/legal/', '/legal/en/'); });
    document.querySelectorAll('a[data-local]').forEach(link => {
      const next = new URL(link.href);
      next.searchParams.set('lang', 'en');
      link.href = next.href;
    });
  }
  if (document.fullscreenEnabled && frame.requestFullscreen) {
    full.hidden = false;
    full.addEventListener('click', async () => {
      try { await frame.requestFullscreen(); }
      catch { separate.focus(); }
    });
  }
})();
