(function(root){
  'use strict';
  const SKU='DZ_ARCANA_EN78', VERSION='2026-11-04';
  function draft(input,english){
    const name=String(input.name||'').trim().slice(0,80).replace(/[\r\n]/g,' ');
    const email=String(input.email||'').trim();
    const details=String(input.details||'').trim().slice(0,600);
    if(!name||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254)throw Error('INVALID_CONTACT');
    if(!['personal','commercial'].includes(input.license)||input.accepted!==true)throw Error('REVIEW_REQUIRED');
    const personal=input.license==='personal';
    const market=input.market==='global'?'global':'tw';
    const price=personal?(market==='global'?'US$9.99':'NT$299'):(english?'Quotation required':'另行報價');
    const license=personal?(english?'Personal use':'個人使用'):(english?'Commercial licensing enquiry':'商業授權詢價');
    const subject=(english?'DZ ARCANA order enquiry':'DZ ARCANA 訂購登記')+' | '+SKU+' | '+license;
    const body=english?[
      'Hello DONGZE,','','I would like to register my interest in ordering the following digital card collection.',
      'Product: DZ ARCANA — 78-card digital collection + 1 card back','SKU: '+SKU,
      'License: '+license,'Listed price: '+price,'Market: '+market,'Name: '+name,'Reply email: '+email,
      'Details: '+(details||'(None)'),'',
      'I have reviewed the product specifications and personal-use license information (version '+VERSION+').',
      'I understand checkout is not open. This is an enquiry, not a paid order; no download license has been issued.',
      'Please confirm availability, the final amount and a supported payment method before I pay.'
    ]:[
      '東澤文創您好：','','我想登記訂購以下數位卡牌商品。',
      '商品：DZ ARCANA 78張數位牌組＋1張牌背','商品編號：'+SKU,'授權用途：'+license,'標示售價：'+price,
      '市場：'+market,'稱呼：'+name,'聯絡 Email：'+email,'需求說明：'+(details||'無'),'',
      '我已閱讀商品規格與個人使用授權說明（版本 '+VERSION+'）。',
      '我了解目前尚未開放付款，這是訂購登記，並非已付款訂單，也尚未取得下載授權。',
      '請先確認可購買狀態、最終金額與可用付款方式，再通知我付款。'
    ];
    return {subject,body:body.join('\n'),emailHref:'mailto:dongze.ltd@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body.join('\n'))};
  }
  root.DongzeCardOrder=Object.freeze({draft,SKU,VERSION});
})(globalThis);
