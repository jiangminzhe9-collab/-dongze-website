// Shared GA4 measurement for DONGZE and Paperbag Crew.
// Automated QA and explicit ?analytics=off visits do not send analytics.
(() => {
  'use strict';
  function startMeasurement() {
  const params = new URLSearchParams(location.search);
  if (navigator.webdriver || params.get('analytics') === 'off' ||
      !['dongze.win', 'www.dongze.win', 'paperbagcrew.com', 'www.paperbagcrew.com'].includes(location.hostname)) return;
  const measurementId = 'G-7XNY9JBP6C';
  const siteName = location.hostname.includes('paperbagcrew') ? 'Paperbag Crew' : 'DONGZE';
  const isStickerPage = path => /^\/line-stickers(?:\/index\.html|\/)?$/.test(path);
  const sourcePage = /^\/(?:index\.html)?$/.test(location.pathname) ? 'home' : isStickerPage(location.pathname) ? 'line_stickers' : 'other';
  const language = () => params.get('lang') === 'en' || document.documentElement.lang.startsWith('en') ? 'en' : 'zh-Hant';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  // Keep only a validated public referring origin; never credentials, path, query or fragment.
  let referrerOrigin = '';
  try {
    const referrer = new URL(document.referrer);
    if (['http:', 'https:'].includes(referrer.protocol) && !referrer.username && !referrer.password) referrerOrigin = referrer.origin;
  } catch (_) {}
  // Never forward query strings or auth fragments.
  window.gtag('config', measurementId, { site_name: siteName, content_language: language(), page_location: location.origin + location.pathname, page_referrer: referrerOrigin, allow_google_signals: false, allow_ad_personalization_signals: false });
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(tag);
  document.addEventListener('click', event => {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    let target;
    try { target = new URL(link.href, location.href); } catch (_) { return; }
    if (!['http:', 'https:'].includes(target.protocol) || target.username || target.password) return;
    let eventName;
    // Only fixed labels and numeric product IDs; never link text or full URLs.
    const detail = { site_name: siteName, content_language: document.documentElement.lang || language(), transport_type: 'beacon', source_page: sourcePage };
    const stickerMatch = target.hostname === 'line.me'
      ? target.pathname.match(/^\/S\/sticker\/(\d+)\/?$/)
      : target.hostname === 'store.line.me'
        ? target.pathname.match(/^\/stickershop\/product\/(\d+)(?:\/[A-Za-z-]+)?\/?$/)
        : null;
    if (stickerMatch) {
      eventName = 'sticker_store_click';
      detail.sticker_id = stickerMatch[1];
    } else if (['dongze.win', 'www.dongze.win'].includes(target.hostname) &&
        (isStickerPage(target.pathname) || target.hash === '#line-stickers')) {
      eventName = 'sticker_preview_click';
      // Keep historical anchor events separate from entries to the catalog.
      detail.destination_type = isStickerPage(target.pathname) && link.getAttribute('href').charAt(0) !== '#' ? 'catalog' : 'legacy_anchor';
      detail.entry_location = link.closest('#line-christmas-feature') ? 'christmas_feature'
        : link.closest('header nav') ? 'navigation'
        : link.closest('.hero') ? 'hero'
        : link.closest('#comic') ? 'comic'
        : link.closest('#line-stickers') ? 'sticker_section' : 'other';
    }
    if (eventName) window.gtag('event', eventName, detail);
  });
  }
  if (document.readyState === 'complete') startMeasurement();
  else document.addEventListener('DOMContentLoaded', startMeasurement, { once: true });
})();
