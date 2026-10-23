// Shared behavior for the homepage and static collection pages.
let english = false;
const originalTitle = document.title;
function setSiteLanguage(value) {
  english = value;
  document.documentElement.lang = english ? 'en' : 'zh-Hant';
  document.querySelectorAll('[data-zh][data-en]').forEach(el => {
    el.innerHTML = el.dataset[english ? 'en' : 'zh'];
  });
  document.querySelectorAll('[data-href-zh][data-href-en]').forEach(link => { link.href = link.dataset[english ? 'hrefEn' : 'hrefZh']; });
  document.querySelectorAll('a[href]').forEach(link => {
    const target = new URL(link.href, location.href);
    if (target.origin === 'https://paperbag-afterhours.mcjohn686.chatgpt.site' &&
        ['/town.html', '/town-en.html', '/cafe.html', '/cafe-en.html'].includes(target.pathname)) {
      const cafe = target.pathname.startsWith('/cafe');
      target.pathname = cafe ? (english ? '/cafe-en.html' : '/cafe.html') : (english ? '/town-en.html' : '/town.html');
      link.href = target.href;
    }
  });
  const button = document.querySelector('#language');
  button.textContent = english ? '中文' : 'EN';
  button.setAttribute('aria-label', english ? '切換繁體中文' : 'Switch to English');
  const heading = document.querySelector('.collection-heading h1');
  document.title = english ? (heading ? heading.textContent + ' | Original Paperbag Characters' : 'DONGZE | Original Paperbag Characters & Art Toys') : originalTitle;
  const url = new URL(location.href);
  if (english) url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
  history.replaceState(null, '', url);
}
document.querySelector('#language')?.addEventListener('click', () => setSiteLanguage(!english));
document.addEventListener('DOMContentLoaded', () => {
  if (new URLSearchParams(location.search).get('lang') === 'en') setSiteLanguage(true);
});
document.querySelectorAll('[data-copy-contact]').forEach(button => {
  button.addEventListener('click', async () => {
    const value = button.dataset.copyContact;
    const status = document.querySelector('#contact-copy-status');
    try {
      await navigator.clipboard.writeText(value);
      status.textContent = (english ? 'Copied: ' : '已複製：') + value;
    } catch {
      status.textContent = (english ? 'Please copy: ' : '請手動複製：') + value;
    }
  });
});
const artObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    artObserver.unobserve(entry.target);
    loadCanvasArt(entry.target);
  });
}, { rootMargin: '240px' }) : null;
function loadCanvasArt(canvas) {
  if (canvas.dataset.artLoaded) return;
  canvas.dataset.artLoaded = 'true';
  const image = new Image();
  image.decoding = 'async';
  if (canvas.closest('.hero')) image.fetchPriority = 'high';
  image.onload = () => {
    const scale = Math.min(1, 1200 / Math.max(image.naturalWidth, image.naturalHeight));
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);
    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
  };
  image.onerror = () => { delete canvas.dataset.artLoaded; canvas.setAttribute('aria-label', english ? 'Image unavailable' : '圖片暫時無法載入'); };
  image.src = canvas.dataset.art;
}
document.querySelectorAll('canvas[data-art]').forEach(canvas => {
  if (canvas.closest('.hero') || !artObserver) loadCanvasArt(canvas);
  else artObserver.observe(canvas);
});
