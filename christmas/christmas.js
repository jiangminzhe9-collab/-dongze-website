(() => {
  'use strict';
  const cards = [...document.querySelectorAll('.card')];
  const dialog = document.getElementById('card-viewer');
  const picture = document.getElementById('viewer-image');
  const title = document.getElementById('viewer-title');
  const count = document.getElementById('viewer-count');
  const language = document.getElementById('language');
  let lang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'zh';
  let current = 0;
  let returnFocus = null;
  let toastTimer;
  const t = (zh, en) => lang === 'zh' ? zh : en;
  const cardTitle = card => card.dataset[lang];

  function showToast(message) {
    const status = document.getElementById('share-status');
    status.textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { status.textContent = ''; }, 4500);
  }
  function updateViewer() {
    const card = cards[current];
    picture.src = card.dataset.image;
    picture.alt = t('阿澤聖誕電子賀卡：', 'A-Ze Christmas card: ') + cardTitle(card);
    title.textContent = cardTitle(card);
    count.textContent = `${String(current + 1).padStart(2, '0')} / 12`;
  }
  function setLanguage() {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant';
    document.querySelectorAll('[data-zh][data-en]:not(.card)').forEach(el => { el.textContent = el.dataset[lang]; });
    language.textContent = lang === 'en' ? '繁中' : 'EN';
    language.setAttribute('aria-label', t('Switch to English', '切換繁體中文'));
    document.title = t('阿澤聖誕電子賀卡・12 款祝福｜東澤文創 DONGZE', 'A-Ze Christmas Cards · 12 Festive Wishes | DONGZE');
    const url = new URL(location.href);
    if (lang === 'en') url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
    history.replaceState(null, '', url);
    if (dialog.open) updateViewer();
  }
  function openCard(index, trigger) {
    current = index;
    returnFocus = trigger || document.querySelector(`[href="#${cards[index].id}"]`) || cards[index].querySelector('.card-art');
    updateViewer();
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('viewing');
    history.replaceState(null, '', `#${cards[index].id}`);
  }
  function closeViewer() { dialog.close(); }
  dialog.addEventListener('close', () => {
    document.body.classList.remove('viewing');
    history.replaceState(null, '', location.pathname + location.search + '#cards');
    returnFocus?.focus({preventScroll:true});
  });
  document.querySelectorAll('[data-open-card]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const index = cards.findIndex(card => card.id === link.dataset.openCard);
      if (index >= 0 && typeof dialog.showModal === 'function') { event.preventDefault(); openCard(index, link); }
    });
  });
  document.getElementById('close-viewer').addEventListener('click', closeViewer);
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeViewer();
  });
  function move(direction) {
    current = (current + direction + cards.length) % cards.length;
    updateViewer();
    history.replaceState(null, '', `#${cards[current].id}`);
  }
  document.getElementById('previous-card').addEventListener('click', () => move(-1));
  document.getElementById('next-card').addEventListener('click', () => move(1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
  });
  async function share(index) {
    const card = cards[index];
    const url = new URL(location.pathname, location.origin);
    if (lang === 'en') url.searchParams.set('lang', 'en');
    url.hash = card.id;
    const data = {title: `${cardTitle(card)} · DONGZE`, text: t('阿澤陪你送上聖誕祝福。', 'A little Christmas wish from A-Ze.'), url: url.href};
    try {
      if (navigator.share) { await navigator.share(data); return; }
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(url.href); showToast(t('賀卡連結已複製，可以貼給親友。', 'Card link copied. Share it with someone you love.')); return; }
      window.prompt(t('複製這張賀卡的連結：', 'Copy this card link:'), url.href);
    } catch (error) {
      if (error.name !== 'AbortError') window.prompt(t('複製這張賀卡的連結：', 'Copy this card link:'), url.href);
    }
  }
  document.querySelectorAll('[data-share-card]').forEach(button => button.addEventListener('click', () => share(cards.findIndex(card => card.id === button.dataset.shareCard))));
  document.getElementById('share-viewer').addEventListener('click', () => share(current));
  language.addEventListener('click', () => { lang = lang === 'zh' ? 'en' : 'zh'; setLanguage(); });
  setLanguage();
  const initial = cards.findIndex(card => '#' + card.id === location.hash);
  if (initial >= 0 && typeof dialog.showModal === 'function') openCard(initial);
})();
