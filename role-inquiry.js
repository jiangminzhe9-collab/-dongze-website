(function () {
  'use strict';
  const dialog = document.getElementById('role-inquiry');
  const data = document.getElementById('role-inquiry-data');
  if (!dialog || !data || !globalThis.DongzeInquiry) return;
  const roles = JSON.parse(data.textContent);
  const purpose = dialog.querySelector('#inquiry-purpose');
  const details = dialog.querySelector('#inquiry-details');
  const preview = dialog.querySelector('#inquiry-preview');
  const email = dialog.querySelector('#inquiry-email');
  const copy = dialog.querySelector('#inquiry-copy');
  const status = dialog.querySelector('#inquiry-status');
  let selected = null;
  let trigger = null;
  let copyAttempt = 0;
  const english = () => document.documentElement.lang === 'en';
  function refresh() {
    if (!selected) return;
    const en = english();
    const message = DongzeInquiry.draft(selected, purpose.value, details.value, en);
    dialog.querySelector('#inquiry-character-code').textContent = selected.code;
    dialog.querySelector('#inquiry-character-name').textContent = en ? selected.en : selected.zh;
    dialog.querySelector('#inquiry-character-image').src = selected.image;
    dialog.querySelector('#inquiry-character-image').alt = en ? selected.en : selected.zh;
    details.placeholder = en ? 'Tell us about the product or content, approximate quantity, region and timing.' : '預計用在哪些商品或內容？大約數量、地區與時間。';
    email.href = message.emailHref;
    preview.value = message.body;
    status.textContent = '';
    copyAttempt++;
  }
  document.querySelectorAll('[data-role-inquiry]').forEach(link => {
    link.addEventListener('click', event => {
      const card = link.closest('.catalog-card, .character-card');
      const code = card?.querySelector('.catalog-code')?.textContent.trim()
        || card?.getAttribute('data-character-code') || link.dataset.roleInquiry;
      const role = roles[code];
      if (!role || typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      selected = role;
      trigger = link;
      purpose.value = 'collaboration';
      details.value = '';
      refresh();
      dialog.showModal();
      purpose.focus();
    });
  });
  purpose.addEventListener('change', refresh);
  details.addEventListener('input', refresh);
  dialog.querySelector('[data-close-inquiry]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => { copyAttempt++; trigger?.focus(); });
  copy.addEventListener('click', async () => {
    const attempt = ++copyAttempt;
    const text = preview.value;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      if (attempt === copyAttempt) status.textContent = english() ? 'Copied. Open LINE and paste this message into the chat.' : '已複製。開啟 LINE 後，將內容貼到聊天室。';
    } catch {
      if (attempt !== copyAttempt) return;
      dialog.querySelector('.inquiry-message').open = true;
      preview.focus();
      preview.select();
      status.textContent = english() ? 'Please copy the selected message, then open LINE.' : '請長按複製下方已選取的內容，再開啟 LINE。';
    }
  });
  document.getElementById('language')?.addEventListener('click', () => setTimeout(refresh, 0));
})();
