// Shared behavior for the homepage and static collection pages.
let english = false;
const originalTitle = document.title;
document.querySelector('#language')?.addEventListener('click', () => {
  english = !english;
  document.documentElement.lang = english ? 'en' : 'zh-Hant';
  document.querySelectorAll('[data-zh][data-en]').forEach(el => {
    el.innerHTML = el.dataset[english ? 'en' : 'zh'];
  });
  document.querySelectorAll('a[href]').forEach(link => {
    const target = new URL(link.href, location.href);
    if (target.origin === 'https://paperbag-afterhours.mcjohn686.chatgpt.site' &&
        ['/town.html', '/town-en.html'].includes(target.pathname)) {
      target.pathname = english ? '/town-en.html' : '/town.html';
      link.href = target.href;
    }
  });
  const button = document.querySelector('#language');
  button.textContent = english ? '中文' : 'EN';
  button.setAttribute('aria-label', english ? '切換繁體中文' : 'Switch to English');
  const heading = document.querySelector('.collection-heading h1');
  document.title = english ? (heading ? heading.textContent + ' | Original Paperbag Characters' : 'DONGZE | Original Paperbag Characters & Art Toys') : originalTitle;
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
document.querySelectorAll('canvas[data-art]').forEach(canvas => {
  const image = new Image();
  image.onload = () => {
    const scale = Math.min(1, 1200 / Math.max(image.naturalWidth, image.naturalHeight));
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);
    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
  };
  image.onerror = () => canvas.setAttribute('aria-label', '圖片暫時無法載入 / Image unavailable');
  image.src = canvas.dataset.art;
});
