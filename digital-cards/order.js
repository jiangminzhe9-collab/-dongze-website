(()=>{
  'use strict';
  const form=document.querySelector('#order-form');
  if(!form||!window.DongzeCardOrder)return;
  const en=document.documentElement.lang==='en',status=document.querySelector('#form-status');
  let current=null;
  function clearDraft(){current=null;document.querySelector('#draft-result').hidden=true;document.querySelector('#email-draft').removeAttribute('href');document.querySelector('#draft-text').value='';status.textContent='';}
  form.addEventListener('input',clearDraft);
  form.addEventListener('change',clearDraft);
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    try{
      const data=new FormData(form);
      current=window.DongzeCardOrder.draft({name:data.get('name'),email:data.get('email'),license:data.get('license'),details:data.get('details'),market:data.get('market'),accepted:data.get('accepted')==='on'},en);
      document.querySelector('#draft-text').value=current.subject+'\n\n'+current.body;
      document.querySelector('#email-draft').href=current.emailHref;
      document.querySelector('#draft-result').hidden=false;
      status.textContent=en?'Your draft is ready. Open your email app and send it to complete your enquiry. Nothing has been sent yet.':'信件草稿已備妥。請開啟 Email 並送出，才會完成訂購登記；目前尚未寄出。';
      document.querySelector('#draft-result').scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    }catch{status.textContent=en?'Please check your contact details and acknowledgement.':'請確認聯絡資料及勾選說明。';}
  });
  document.querySelector('#copy-draft').addEventListener('click',async()=>{
    if(!current)return;
    try{await navigator.clipboard.writeText(current.subject+'\n\n'+current.body);status.textContent=en?'Copied. Paste into an email to dongze.ltd@gmail.com and send.':'已複製。請貼入寄給 dongze.ltd@gmail.com 的 Email 並送出。';}
    catch{document.querySelector('#draft-text').focus();document.querySelector('#draft-text').select();status.textContent=en?'Please copy the selected text manually.':'請手動複製已選取的文字。';}
  });
})();
