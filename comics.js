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
  const hydrateComicB64 = (root = document) => {
    root.querySelectorAll('[data-comic-b64]').forEach(async image => {
      try {
        const response = await fetch(image.dataset.comicB64, { cache: 'force-cache' });
        if (!response.ok) throw new Error('Comic artwork could not be loaded');
        const encoded = (await response.text()).trim();
        const dataUrl = 'data:image/webp;base64,' + encoded;
        image.src = dataUrl;
        const link = image.closest('a.comic-artwork');
        if (link) link.href = dataUrl;
      } catch (error) {
        image.alt += '（漫畫圖片載入失敗）';
        console.error(error);
      }
    });
  };
  const section = document.querySelector('#comic');
  if (section && !document.body.classList.contains('comics-library')) {
    section.className = 'section comic-latest';
    section.innerHTML = '<div class="section-heading"><div><p class="eyebrow">DONGZE / COMIC LIBRARY</p><h2 id="comic-title" data-zh="日常故事，笑著過。" data-en="A little humour for everyday life.">日常故事，笑著過。</h2></div><a class="comic-all" href="/comics/" data-zh="看全部漫畫 ↗" data-en="Browse all comics ↗">看全部漫畫 ↗</a></div><p class="comic-latest-intro" data-zh="從職場到街坊，收藏紙袋人的笑點與溫暖。" data-en="Paperbag stories from the office and the neighbourhood, with humour and warmth.">從職場到街坊，收藏紙袋人的笑點與溫暖。</p><div class="comic-latest-grid"><a class="comic-story-card" href="/comics/#comic-paperbag-cat-ramen"><img src="/assets/story-paperbag-cat-ramen.webp" alt="紙袋貓：隨便吃" loading="lazy" width="768" height="1152"><div><span class="comic-series-tag" data-zh="紙袋貓系列" data-en="Paperbag Cats">紙袋貓系列</span><h3 data-zh="01 / 隨便吃" data-en="01 / Whatever You Like">01 / 隨便吃</h3><span class="comic-read" data-zh="前往分類閱讀 ↗" data-en="Browse this series ↗">前往分類閱讀 ↗</span></div></a><a class="comic-story-card" href="/comics/#comic-last-minute"><img src="/assets/IMG_4282.webp" alt="紙袋人：最後一分鐘" loading="lazy" width="1024" height="1536"><div><span class="comic-series-tag" data-zh="紙袋人・職場日常" data-en="Paperbag People · Office Life">紙袋人・職場日常</span><h3 data-zh="09 / 最後一分鐘" data-en="09 / The Last Minute">09 / 最後一分鐘</h3><span class="comic-read" data-zh="前往分類閱讀 ↗" data-en="Browse this series ↗">前往分類閱讀 ↗</span></div></a><a class="comic-story-card" href="/comics/#comic-craft-just-a-little"><img src="/assets/craft-story-just-a-little-original.jpeg" alt="生活職人：一點點" loading="lazy" width="878" height="1536"><div><span class="comic-series-tag" data-zh="生活職人系列" data-en="Everyday Craftspeople">生活職人系列</span><h3 data-zh="04 / 一點點" data-en="04 / Just a Little">04 / 一點點</h3><span class="comic-read" data-zh="前往分類閱讀 ↗" data-en="Browse this series ↗">前往分類閱讀 ↗</span></div></a></div>';
    hydrateComicB64(section);
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
  hydrateComicB64(document);
})();

// Artwork revision 20261014-04: selected factory worker After-Work Mode original.
