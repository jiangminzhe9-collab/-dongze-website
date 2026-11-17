export const defaults={zh:'願這個聖誕，有溫暖的陪伴，也有剛剛好的幸福。',en:'May your Christmas be filled with warmth, gentle moments, and the people you love.'};
export function clean(x){let n=Number(x.art);return {art:Number.isInteger(n)&&n>=1&&n<=24?String(n).padStart(2,'0'):'01',lang:x.lang==='zh'?'zh':'en',to:String(x.to??'').slice(0,40),msg:String(x.msg??'').slice(0,240),from:String(x.from??'').slice(0,40)}}
export function encode(x){return new URLSearchParams(clean(x)).toString()}
export function decode(hash){if(hash.length>5000)throw Error('Link too long');return clean(Object.fromEntries(new URLSearchParams(hash.replace(/^#/,''))))}
