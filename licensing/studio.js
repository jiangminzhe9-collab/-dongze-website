(() => {
  'use strict';
  const home = location.pathname === '/' || location.pathname === '/index.html';
  const originalTitle = document.title;
  const language = document.getElementById('language');
  const form = document.getElementById('licensing-inquiry');
  const status = document.getElementById('form-status');
  let english = new URLSearchParams(location.search).get('lang') === 'en';
  let statusKey = '';
  const messages = {
    sending: ['正在送出…','Sending…'],
    sent: ['已收到你的授權詢問，東澤會透過你填寫的信箱回覆。','Enquiry received. DONGZE will reply to the email address you provided.'],
    failed: ['送出未確認。可重試，或使用公司信箱與 LINE 聯絡。','Delivery could not be confirmed. Retry, or contact us by email or LINE.'],
    slow: ['短時間內已送出多筆，請稍後再試或直接來信。','Several enquiries have been submitted. Please try later or contact us directly.']
  };
  function setStatus(key) {
    statusKey = key;
    if (status) status.textContent = key ? messages[key][english ? 1 : 0] : '';
  }
  function applyLanguage() {
    document.documentElement.lang = english ? 'en' : 'zh-Hant';
    document.title = english ? document.body.dataset.enTitle : originalTitle;
    document.querySelectorAll('[data-zh][data-en]').forEach(el => {
      el.textContent = english ? el.dataset.en : el.dataset.zh;
    });
    document.querySelectorAll('a[href]').forEach(link => {
      if (!link.dataset.originalHref) link.dataset.originalHref = link.getAttribute('href');
      const href = (english && link.dataset.enHref) || link.dataset.originalHref;
      if (!href.startsWith('/') || href.startsWith('//') || /\.pdf($|[?#])/i.test(href) || (english && link.dataset.enHref)) {
        link.setAttribute('href', href);
        return;
      }
      const target = new URL(href, location.href);
      if (english) target.searchParams.set('lang', 'en');
      link.setAttribute('href', target.pathname + target.search + target.hash);
    });
    language.textContent = english ? '中文' : 'EN';
    language.setAttribute('aria-label', english ? '切換繁體中文' : 'Switch to English');
    setStatus(statusKey);
  }
  language.addEventListener('click', () => {
    english = !english;
    const url = new URL(location.href);
    if (english) url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
    history.replaceState(null, '', url);
    applyLanguage();
  });
  applyLanguage();
  const legacy = {
    'line-stickers':'/line-stickers/', 'line-stickers-title':'/line-stickers/',
    'line-christmas-feature':'/line-stickers/#line-pack-37685777', 'line-sheep-feature':'/line-stickers/#line-pack-37911293',
    'line-kumo-christmas-feature':'/line-stickers/#line-pack-37949033', 'comic':'/comics/#comic',
    'kumo-christmas-cards':'/christmas/kumo/', 'christmas-cards':'/christmas/',
    'paperbag-100-entry':'/paperbag-100/', 'sports-crew-entry':'/sports/', 'creative-stories':'/stories/',
    'office-heroes-alien-battle':'/games/alien-invasion/', 'paperbag-town':'/games/paperbag-town/',
    'paperbag-freak':'https://paperbagfreak.com/', 'tarot-guide':'/explore/#arcana',
    'tarot-reading-cta':'/explore/#arcana', 'office-defense-guide':'/games/office-defense/guide/#office-defense-guide',
    'office-venue-mechanisms':'/games/office-defense/guide/#office-venue-mechanisms',
    'office-boss-battles':'/games/office-defense/guide/#office-boss-battles'
  };
  function handleFragment() {
    const id = location.hash.slice(1);
    const found = document.getElementById(id);
    if (found) {
      if (found.matches('details')) {
        for (let node = found; node; node = node.parentElement) if (node.matches('details')) node.open = true;
        found.scrollIntoView();
      }
      return;
    }
    if (!home || !id) return;
    const target = Object.hasOwn(legacy, id) ? legacy[id] : /^comic-[a-z-]+$/.test(id) ? '/comics/#'+id
      : /^kumo-pack-\d+$/.test(id) ? '/explore/#kumo' : null;
    if (target) {
      const url = new URL(target, location.href);
      if (english && url.origin === location.origin) url.searchParams.set('lang','en');
      location.replace(url);
    }
  }
  handleFragment();
  window.addEventListener('hashchange', handleFragment);
  if (!form) return;
  form.hidden = false;
  const submit = form.querySelector('button[type=submit]');
  let requestId, signature, sending = false;
  form.addEventListener('input', () => { if (!sending && statusKey) setStatus(''); });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    const fields = Object.fromEntries(new FormData(form));
    for (const key of Object.keys(fields)) fields[key] = fields[key].trim();
    if (!fields.brand || !fields.intended_use) {
      const empty = form.elements.namedItem(!fields.brand ? 'brand' : 'intended_use');
      empty.value = ''; empty.reportValidity(); return;
    }
    const fingerprint = JSON.stringify(fields);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    sending = true;
    const controls = Array.from(form.querySelectorAll('input, textarea'));
    controls.forEach(control => { control.readOnly = true; });
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    setStatus('sending');
    try {
      if (signature !== fingerprint) {
        requestId = crypto.randomUUID();
        signature = fingerprint;
      }
      const response = await fetch('https://yliacgixfhjhgjemvbpg.supabase.co/rest/v1/rpc/submit_dongze_licensing', {
        method: 'POST', credentials: 'omit', referrerPolicy: 'no-referrer',
        headers: {'Content-Type':'application/json', apikey:'sb_publishable_MTi1uzs0XQMy9R6CfAYVHQ_5TDgjltp'},
        body: JSON.stringify({...fields, request_id: requestId}), signal: controller.signal
      });
      if (response.status === 429) { setStatus('slow'); return; }
      if (!response.ok || (await response.json()) !== true) throw new Error('Delivery unconfirmed');
      form.reset();
      signature = requestId = undefined;
      setStatus('sent');
      if (window.siteAnalyticsPreferences?.blocked === false && typeof window.gtag === 'function')
        window.gtag('event','generate_lead',{lead_source:'dongze_licensing',content_language:document.documentElement.lang});
    } catch { setStatus('failed'); }
    finally {
      clearTimeout(timeout);
      sending = false;
      controls.forEach(control => { control.readOnly = false; });
      submit.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
})();
