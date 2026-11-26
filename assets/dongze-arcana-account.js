(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const accountPage = Boolean($('auth-form'));
  const arcanaQuery = new URLSearchParams(location.search);
  const arcanaReturn = true;
  const arcanaProfileEdit = arcanaReturn && arcanaQuery.get('edit') === 'profile';
  const arcanaLanguage = arcanaQuery.get('lang') === 'en' ? 'en' : 'zh-Hant';
  const arcanaMarket = arcanaLanguage === 'zh-Hant' ? 'tw' : 'global';
  const arcanaSuffix = '?market=' + arcanaMarket + '&lang=' + arcanaLanguage;
  const callback = 'https://dongze.win/account/?next=arcana&market=' + arcanaMarket + '&lang=' + arcanaLanguage;
  const hash = new URLSearchParams(location.hash.slice(1));
  const query = new URLSearchParams(location.search);
  // Forward callbacks before an SDK consumes the fragment on the homepage.
  if (!accountPage && (hash.has('access_token') || hash.has('error_description') || query.has('code'))) {
    location.replace('/account/' + location.search + location.hash); return;
  }
  const message = (value = '', error = false) => {
    if (!$('status')) return;
    $('status').textContent = value;
    $('status').dataset.error = String(error);
    const feedback = $('auth-feedback');
    if (feedback) { feedback.textContent = value; feedback.dataset.error = String(error); feedback.hidden = !value; }
  };
  if (!window.supabase) { message('Account services could not load. Please refresh the page or check your connection.', true); return; }
  // Bound network waits without retrying account creation or changing Auth settings.
  const accountFetch = async (input, init = {}) => {
    const controller = new AbortController();
    const abort = () => controller.abort();
    if (init.signal?.aborted) abort();
    else init.signal?.addEventListener('abort', abort, {once: true});
    const timer = setTimeout(abort, 20000);
    try { return await fetch(input, {...init, signal: controller.signal}); }
    catch (error) {
      if (controller.signal.aborted) throw new Error(arcanaReturn && arcanaLanguage === 'zh-Hant' ? '連線逾時，尚未確認請求結果。請先檢查信箱與網路，再重新整理；請勿連續重複提交。' : 'Connection timed out; the request is not confirmed. Check your inbox and connection, then refresh. Please do not submit repeatedly.');
      throw error;
    } finally { clearTimeout(timer); init.signal?.removeEventListener('abort', abort); }
  };
  const client = window.supabase.createClient('https://yliacgixfhjhgjemvbpg.supabase.co', 'sb_publishable_MTi1uzs0XQMy9R6CfAYVHQ_5TDgjltp', {
    global: { fetch: accountFetch },
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: 'implicit' }
  });
  window.paperbagMemberClient = client;
  if (!accountPage) {
    client.auth.getSession().then(({data, error}) => {
      if (!error && data.session) {
        const link = document.querySelector('[data-member-link]');
        if (link) link.textContent = 'My account';
        if (!query.has('browse')) location.replace('/account/');
      }
    }).catch(() => {});
    return;
  }
  let signup = false, busy = false, recovering = hash.get('type') === 'recovery';
  const zh=arcanaLanguage==='zh-Hant';document.documentElement.lang=zh?'zh-Hant':'en';document.title=zh?'會員帳戶｜東澤':'Account | DONGZE';$('return-reading').href='/arcana/readings/'+arcanaSuffix;document.querySelectorAll('a[href="/arcana/readings/?market=global&lang=en"]').forEach(a=>a.href='/arcana/readings/'+arcanaSuffix);if(zh){const values={'DZ ARCANA membership':'DZ ARCANA 會員','A moment with the cards.':'你的塔羅小時光。','Sign in to save and revisit your daily tarot readings.':'登入後保存每日抽牌與解讀紀錄。','Your email is used for account access and verification. No shipping address is needed to join.':'電子郵件用於登入與驗證，不需要收件地址。','Sign in':'登入','Create account':'註冊會員','Nickname':'暱稱','Email address':'電子郵件','Password':'密碼','Use at least 8 characters.':'至少 8 個字元。','This browser keeps you signed in. Sign out when using a shared device.':'此瀏覽器會保留登入狀態，共用裝置請登出。','Resend verification email':'重寄驗證郵件','Forgot your password?':'忘記密碼？','Member profile':'會員資料','Welcome back.':'歡迎回來。','Save profile':'儲存暱稱','My tarot readings ↗':'我的塔羅解讀 ↗','Sign out on this device':'登出此裝置','Choose a new password':'設定新密碼','New password':'新密碼','Confirm new password':'確認新密碼','Save new password':'儲存新密碼','Terms & Disclaimer':'使用條款與免責聲明'};document.querySelectorAll('h1,h2,p,label,button,a').forEach(el=>{const v=values[el.textContent.trim()];if(v)el.textContent=v;});document.querySelector('form p.muted a').href='/legal/#disclaimer';}else{document.querySelectorAll('a[href="/legal/#disclaimer"]').forEach(el=>el.href='/legal/en/#disclaimer');}

  const showSession = session => {
    $('auth').hidden = Boolean(session);
    $('profile').hidden = !session || recovering;
    $('recovery').hidden = !session || !recovering;
    if (session) {
      if (!recovering && arcanaReturn && !arcanaProfileEdit) { location.replace('/arcana/readings/' + arcanaSuffix); return; }
      const name = session.user.user_metadata?.display_name || '';
      $('welcome').textContent = name ? (zh?'歡迎，':'Welcome, ') + name + '。' : (zh?'歡迎回來。':'Welcome back.');
      $('profile-name').value = name;
      $('member-email').textContent = session.user.email || '';
    }
  };
  client.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') recovering = true;
    if (event === 'SIGNED_OUT') recovering = false;
    showSession(session);
  });
  const run = async action => {
    if (busy) return;
    busy = true;
    document.querySelectorAll('#auth button, #profile button, #recovery button').forEach(b => b.disabled = true);
    message('Please wait…');
    try { await action(); }
    catch (error) { message(error.message || 'Something went wrong. Please try again.', true); }
    finally { busy = false; document.querySelectorAll('#auth button, #profile button, #recovery button').forEach(b => b.disabled = false); }
  };
  const check = result => { if (result.error) throw result.error; return result.data; };
  const email = () => {
    if (!$('email').reportValidity()) throw new Error('Enter a valid email address first.');
    return $('email').value.trim();
  };
  const mode = value => {
    signup = value; $('name-field').hidden = !value; $('name').required = value;
    $('password-hint').hidden = !value; $('password').minLength = value ? 8 : 1;
    $('password').autocomplete = value ? 'new-password' : 'current-password';
    $('submit').textContent = value ? (zh?'建立帳號':'Create account') : (zh?'登入':'Sign in');
    $('signup-tab').setAttribute('aria-pressed', String(value));
    $('login-tab').setAttribute('aria-pressed', String(!value)); message();
  };
  $('signup-tab').onclick = () => mode(true);
  $('login-tab').onclick = () => mode(false);
  // Native validation bubbles may be hidden in mobile/in-app browsers.
  $('auth-form').addEventListener('invalid', event => {
    const field = event.target;
    const zh = arcanaReturn && arcanaLanguage === 'zh-Hant';
    const error = field.id === 'password'
      ? (field.validity.valueMissing ? (zh ? '請輸入密碼。' : 'Please enter your password.') : (zh ? '密碼至少需要 8 個字元。' : 'Use at least 8 characters for your password.'))
      : field.id === 'name' ? (zh ? '請輸入暱稱。' : 'Please enter a nickname.')
      : (zh ? '請輸入有效的電子郵件地址。' : 'Please enter a valid email address.');
    message(error, true);
  }, true);
  $('auth-form').onsubmit = event => { event.preventDefault(); run(async () => {
    const credentials = {email: email(), password: $('password').value};
    if (signup) {
      const name = $('name').value.trim();
      if (!name) throw new Error('Please enter a nickname.');
      const data = check(await client.auth.signUp({...credentials, options: {emailRedirectTo: callback, data: {display_name: name}}}));
      $('password').value = '';
      message(data.session ? 'Your account is ready.' : 'Check your inbox and spam folder for a verification link. If you already have an account, sign in or reset your password.');
      showSession(data.session);
    } else {
      const data = check(await client.auth.signInWithPassword(credentials));
      $('password').value = ''; message('You are signed in.'); showSession(data.session);
    }
  }); };
  let nextEmailAt = 0;
  const sendEmail = action => run(async () => {
    if (Date.now() < nextEmailAt) throw new Error('Please wait one minute before requesting another email.');
    await action(); nextEmailAt = Date.now() + 60000;
  });
  $('resend').onclick = () => sendEmail(async () => {
    check(await client.auth.resend({type: 'signup', email: email(), options: {emailRedirectTo: callback}}));
    message('If this account needs verification, a new link has been requested. Check your inbox and spam folder.');
  });
  $('forgot').onclick = () => sendEmail(async () => {
    check(await client.auth.resetPasswordForEmail(email(), {redirectTo: callback}));
    message('If this email has an account, a password reset link has been requested. Check your inbox.');
  });
  $('profile-form').onsubmit = event => { event.preventDefault(); run(async () => {
    const name = $('profile-name').value.trim();
    if (!name) throw new Error('Please enter a nickname.');
    check(await client.auth.updateUser({data: {display_name: name}}));
    if (arcanaProfileEdit && !recovering) { location.replace('/arcana/readings/' + arcanaSuffix); return; }
    $('welcome').textContent = (zh?'歡迎，':'Welcome, ') + name + (zh?'。':'.'); message('Profile saved.');
  }); };
  $('signout').onclick = () => run(async () => { check(await client.auth.signOut({scope: 'local'})); showSession(null); message('You are signed out on this device.'); });
  $('recovery-form').onsubmit = event => { event.preventDefault(); run(async () => {
    const password = $('new-password').value;
    if (password !== $('confirm-password').value) throw new Error('The passwords do not match.');
    check(await client.auth.updateUser({password})); recovering = false;
    $('new-password').value = ''; $('confirm-password').value = '';
    const data = check(await client.auth.getSession()); showSession(data.session); message('Your password has been updated.');
  }); };
  (async () => {
    try {
      const data = check(await client.auth.getSession()); showSession(data.session);
      if (hash.has('error_description')) message(hash.get('error_description') + ' Request a new email below.', true);
      else message();
      history.replaceState(null, '', '/account/' + (arcanaReturn ? '?next=arcana' + (arcanaProfileEdit ? '&edit=profile' : '') + '&market=' + arcanaMarket + '&lang=' + arcanaLanguage : '') + (!arcanaReturn && query.has('artwork') ? '?artwork=' + encodeURIComponent(query.get('artwork')) : '') + (location.hash === '#wallpapers' ? '#wallpapers' : ''));
    } catch (error) { $('auth').hidden = false; message(error.message, true); }
  })();
})();


