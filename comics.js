(() => {
  const episodes = [
    {id:'deadline-intercept',no:'01',zh:'下班前的文件攔截',en:'The Last-Minute File Intercept'},
    {id:'coffee-rescue',no:'02',zh:'咖啡救援',en:'Coffee Rescue'},
    {id:'reboot-helper',no:'03',zh:'重新開機',en:'Have You Tried Restarting?'},
    {id:'after-work-switch',no:'04',zh:'下班切換',en:'After-Work Mode'},
    {id:'meeting-about-meetings',no:'05',zh:'減少開會',en:'Fewer Meetings'}
  ];
  const section = document.querySelector('#comic');
  if (section && !document.body.classList.contains('comics-library')) {
    section.className = 'section comic-latest';
    section.innerHTML = '<div class="section-heading"><div><p class="eyebrow">DONGZE / COMIC LIBRARY</p><h2 id="comic-title" data-zh="上班日常，笑著過。" data-en="A little humor for the working day.">上班日常，笑著過。</h2></div><a class="comic-all" href="/comics/" data-zh="看全部漫畫 ↗" data-en="Browse all comics ↗">看全部漫畫 ↗</a></div><p class="comic-latest-intro" data-zh="紙袋人的職場日常，把笑點和溫暖留給你。" data-en="Paperbag office stories with humor and warmth.">紙袋人的職場日常，把笑點和溫暖留給你。</p><div class="comic-latest-grid">' + episodes.slice(-3).reverse().map(e=>'<a class="comic-story-card" href="/comics/#comic-'+e.id+'"><img src="/assets/story-'+e.id+'.webp" alt="'+e.zh+'四格漫畫" loading="lazy" width="1024" height="1536"><div><span class="comic-series-tag" data-zh="紙袋人・職場日常" data-en="Paperbag People · Office Life">紙袋人・職場日常</span><h3 data-zh="'+e.no+' / '+e.zh+'" data-en="'+e.no+' / '+e.en+'">'+e.no+' / '+e.zh+'</h3><span class="comic-read" data-zh="閱讀完整漫畫 ↗" data-en="Read the full comic ↗">閱讀完整漫畫 ↗</span></div></a>').join('') + '</div>';
    return;
  }
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
  select(pages.some(page => '#' + page.id === location.hash) ? location.hash.slice(1) : 'comic-deadline-intercept');
})();

