(function (scope) {
  'use strict';
  const purposes = {
    collaboration: { zh: '品牌聯名', en: 'Brand collaboration' },
    licensing: { zh: '商品授權', en: 'Merchandise licensing' },
    commission: { zh: '設計委託', en: 'Design commission' },
  };
  function draft(role, purposeKey, details, english) {
    if (!role || !role.code || !role.zh || !role.en) throw new Error('Missing character');
    const purpose = purposes[purposeKey] || purposes.collaboration;
    const text = String(details || '').trim().slice(0, 700);
    const subject = english
      ? 'DONGZE character enquiry: ' + role.code + ' / ' + purpose.en
      : '東澤角色合作洽詢｜' + role.code + '｜' + purpose.zh;
    const body = english
      ? ['Hello DONGZE,', '', 'I would like to discuss the following character:', 'Character code: ' + role.code, 'Character: ' + role.en, 'Collection: ' + role.series, 'Purpose: ' + purpose.en, 'Project details: ' + (text || '(Please describe your project)'), 'Character page: ' + role.page, '', 'Thank you.'].join('\n')
      : ['東澤文創您好：', '', '我想洽詢以下角色的合作：', '角色編號：' + role.code, '角色名稱：' + role.zh, '英文名稱：' + role.en, '合作用途：' + purpose.zh, '合作需求：' + (text || '（請補充預計商品、內容、數量、地區或時間）'), '角色頁面：' + role.page, '', '謝謝。'].join('\n');
    return {
      subject,
      body,
      emailHref: 'mailto:dongze.ltd@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body),
    };
  }
  scope.DongzeInquiry = Object.freeze({ draft });
})(globalThis);
