(() => {
  const episodes = [
    {id:'deadline-intercept',no:'01',zh:'下班前的文件攔截',en:'The Last-Minute File Intercept'},
    {id:'coffee-rescue',no:'02',zh:'咖啡救援',en:'Coffee Rescue'},
    {id:'reboot-helper',no:'03',zh:'重新開機',en:'Have You Tried Restarting?'},
    {id:'after-work-switch',art:'after-work-switch-original',no:'04',zh:'下班切換',en:'After-Work Mode'},
    {id:'meeting-about-meetings',no:'05',zh:'減少開會',en:'Fewer Meetings'},
    {id:'coat-overtime',no:'06',zh:'加班的是外套',en:'The Coat Works Overtime'},
    {id:'team-credit-black-wok',no:'07',zh:'功勞大家的，鍋你的',en:'Shared Credit, Your Blame'},
    {id:'comfort-zone',no:'08',zh:'舒適圈在哪？',en:'Where Is the Comfort Zone?'}
  ];

  const craftEpisodes = [
    {id:'craft-big-job',art:'craft-story-big-job-original',no:'01',zh:'大工程',en:'The Big Repair'},
    {id:'craft-silent-relay',art:'craft-story-silent-relay-original',no:'02',zh:'無聲接力',en:'The Silent Relay'},
    {id:'craft-best-spot',art:'craft-story-best-spot-original',no:'03',zh:'最佳位置',en:'The Perfect Spot'},
    {id:'craft-just-a-little',art:'craft-story-just-a-little-original',no:'04',zh:'一點點',en:'Just a Little'}
  ];
  const section = document.querySelector('#comic');
  if (section && !document.body.classList.contains('comics-library')) {
    section.className = 'section comic-latest';
    section.innerHTML = '<div class="section-heading"><div><p class="eyebrow">DONGZE / COMIC LIBRARY</p><h2 id="comic-title" data-zh="日常故事，笑著過。" data-en="A little humour for everyday life.">日常故事，笑著過。</h2></div><a class="comic-all" href="/comics/" data-zh="看全部漫畫 ↗" data-en="Browse all comics ↗">看全部漫畫 ↗</a></div><p class="comic-latest-intro" data-zh="從職場到街坊，收藏紙袋人的笑點與溫暖。" data-en="Paperbag stories from the office and the neighbourhood, with humour and warmth.">從職場到街坊，收藏紙袋人的笑點與溫暖。</p><div class="comic-latest-grid"><a class="comic-story-card" href="/comics/#comic-comfort-zone"><img src="/assets/story-comfort-zone.webp" alt="舒適圈在哪？ 問題沒解決，圈倒是畫好了。" loading="lazy" width="1024" height="1536"><div><span class="comic-series-tag" data-zh="紙袋人・職場日常" data-en="Paperbag People · Office Life">紙袋人・職場日常</span><h3 data-zh="08 / 舒適圈在哪？" data-en="08 / Where Is the Comfort Zone?">08 / 舒適圈在哪？</h3><span class="comic-read" data-zh="閱讀完整漫畫 ↗" data-en="Read the full comic ↗">閱讀完整漫畫 ↗</span></div></a><a class="comic-story-card" href="/comics/#comic-team-credit-black-wok"><img src="/assets/story-team-credit-black-wok.webp" alt="功勞大家的，鍋你的：獎盃他拿，黑鍋我背。" loading="lazy" width="1024" height="1536"><div><span class="comic-series-tag" data-zh="紙袋人・職場日常" data-en="Paperbag People · Office Life">紙袋人・職場日常</span><h3 data-zh="07 / 功勞大家的，鍋你的" data-en="07 / Shared Credit, Your Blame">07 / 功勞大家的，鍋你的</h3><span class="comic-read" data-zh="閱讀完整漫畫 ↗" data-en="Read the full comic ↗">閱讀完整漫畫 ↗</span></div></a><a class="comic-story-card" href="/comics/#comic-coat-overtime"><img src="/assets/story-coat-overtime.webp" alt="加班的是外套：本人下班，外套值班。" loading="lazy" width="1024" height="1536"><div><span class="comic-series-tag" data-zh="紙袋人・職場日常" data-en="Paperbag People · Office Life">紙袋人・職場日常</span><h3 data-zh="06 / 加班的是外套" data-en="06 / The Coat Works Overtime">06 / 加班的是外套</h3><span class="comic-read" data-zh="閱讀完整漫畫 ↗" data-en="Read the full comic ↗">閱讀完整漫畫 ↗</span></div></a></div>';
    return;
  }
  const links = [...document.querySelectorAll('[data-comic-select]')];
  const pages = [...document.querySelectorAll('[data-comic-page]')];
  if (!links.length) return;
  function select(id) {
    if (!pages.some(page => page.id === id)) return;
    const target = pages.find(page => page.id === id);
    const group = target.closest('.comic-section');
    links.filter(link => link.closest('.comic-section') === group).forEach(link => link.setAttribute('aria-current', String(link.hash === '#' + id)));
    pages.filter(page => page.closest('.comic-section') === group).forEach(page => { page.hidden = page.id !== id; });
  }
  links.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    select(link.hash.slice(1));
    history.replaceState(null, '', link.hash);
  }));
  window.addEventListener('hashchange', () => select(location.hash.slice(1)));
  document.querySelectorAll('.comic-section').forEach(group => {
    const first = group.querySelector('[data-comic-page]');
    if (first) select(first.id);
  });
  select(pages.some(page => '#' + page.id === location.hash) ? location.hash.slice(1) : 'comic-deadline-intercept');
})();

// Artwork revision 20261014-04: selected factory worker After-Work Mode original.
