'use strict';
(() => {
  const dashboard = document.getElementById('tab-dashboard');
  const tools = document.getElementById('mr-tools');
  const panel = document.getElementById('mr-panel');
  const nav = document.getElementById('mr-nav');
  const definitions = [['url','URL 编解码'],['qr','生成二维码'],['timestamp','时间戳'],['json','JSON 格式化'],['password','密码生成器'],['unicode','Unicode 编码']];
  let current = 'url';
  let clock;
  const drafts = new Map();
  const $ = id => panel.querySelector('#'+id);
  function button(text, handler) { const b=document.createElement('button'); b.type='button'; b.textContent=text; b.addEventListener('click',handler); return b; }
  function error(e) { $('mr-error').textContent=e ? e.message : ''; }
  function action(text, fn) { $('mr-actions').append(button(text, () => { try { error(null); fn(); } catch(e) { error(e); } })); }
  function copy(value) { navigator.clipboard.writeText(value).then(() => { $('mr-error').textContent='已复制'; },error); }
  function saveDraft() { drafts.set(current, [...panel.querySelectorAll('textarea,input')].map(el => ({value:el.value,checked:el.checked}))); }
  function showTool(id) {
    if(panel.children.length) saveDraft();
    clearInterval(clock); current=id;
    nav.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed',String(b.dataset.tool===id)));
    panel.innerHTML='<h2></h2><div id="mr-body"></div><div class="mr-actions" id="mr-actions"></div><p class="mr-error" id="mr-error" role="status"></p>';
    panel.querySelector('h2').textContent=definitions.find(d=>d[0]===id)[1];
    const body=$('mr-body');
    if(id==='url'||id==='unicode') {
      body.innerHTML='<label>输入<textarea id="mr-input" rows="6" placeholder="请输入…"></textarea></label><label>输出<textarea id="mr-output" rows="6" readonly></textarea></label>';
      action(id==='url'?'URL 编码':'中文 → Unicode',()=> { $('mr-output').value=id==='url'?encodeURIComponent($('mr-input').value):$('mr-input').value.split('').map(c=>c.charCodeAt(0)>127?'\\u'+c.charCodeAt(0).toString(16).padStart(4,'0'):c).join(''); });
      action(id==='url'?'URL 解码':'Unicode → 中文',()=> { $('mr-output').value=id==='url'?decodeURIComponent($('mr-input').value):$('mr-input').value.replace(/\\u([a-f\d]{4})|\\x([a-f\d]{2})|%u([a-f\d]{4})|%([a-f\d]{2})/gi,(_,a,b,c,d)=>String.fromCharCode(parseInt(a||b||c||d,16))); });
      action('交换输入输出',()=> { const v=$('mr-input').value; $('mr-input').value=$('mr-output').value; $('mr-output').value=v; });
      action('清空',()=> { $('mr-input').value=''; $('mr-output').value=''; });
      action('复制输出',()=>copy($('mr-output').value));
    } else if(id==='qr') {
      body.innerHTML='<label>二维码内容<textarea id="mr-input" rows="3" placeholder="输入文字或链接…"></textarea></label><canvas id="mr-qr" width="240" height="240" hidden></canvas>';
      const render=()=> { try { error(null); $('mr-qr').hidden=!$('mr-input').value; if($('mr-input').value) new QRious({element:$('mr-qr'),value:$('mr-input').value,size:240}); } catch(e) { $('mr-qr').hidden=true; error(e); } };
      $('mr-input').addEventListener('input',render);
      action('下载二维码',()=> { if(!$('mr-input').value||$('mr-qr').hidden) throw new Error('请先输入有效的二维码内容'); const a=document.createElement('a'); a.download='二维码'+Date.now()+'.png'; a.href=$('mr-qr').toDataURL('image/png'); a.click(); });
    } else if(id==='timestamp') {
      body.innerHTML='<p>Unix 时间戳（秒）</p><div class="mr-time" id="mr-time"></div><table><tbody></tbody></table>';
      const tick=()=> { $('mr-time').textContent=Math.floor(Date.now()/1000); }; tick(); clock=setInterval(tick,1000);
      for(const [lang,code] of [['Objective-C','(UInt64)[[NSDate date] timeIntervalSince1970]'],['Bash','date +"%s"'],['JavaScript','Math.floor(Date.now() / 1000)'],['Ruby','Time.now.to_i']]) { const tr=document.createElement('tr'); for(const v of [lang,code]) {const td=document.createElement('td');td.textContent=v;tr.append(td);} body.querySelector('tbody').append(tr); }
      action('复制当前时间戳',()=>copy($('mr-time').textContent));
    } else if(id==='json') {
      body.innerHTML='<label><input id="mr-quotes" type="checkbox" checked>显示属性名引号</label><label>JSON 输入<textarea id="mr-input" rows="8" placeholder="请输入 JSON…"></textarea></label><div id="mr-json"></div>';
      function tree(value,key) {
        const container=document.createElement('div');
        const prefix=key===undefined?'':($('mr-quotes').checked?JSON.stringify(key):key)+': ';
        if(value!==null&&typeof value==='object') {
          const d=document.createElement('details'); d.open=true;
          const s=document.createElement('summary'); s.textContent=prefix+(Array.isArray(value)?'[…]':'{…}'); d.append(s);
          for(const [k,v] of Object.entries(value)) d.append(tree(v,Array.isArray(value)?undefined:k)); container.append(d);
        } else { const p=document.createElement('pre');p.textContent=prefix+JSON.stringify(value);container.append(p); }
        return container;
      }
      const render=()=> { $('mr-json').replaceChildren(); try {error(null);if($('mr-input').value.trim()) $('mr-json').append(tree(JSON.parse($('mr-input').value)));}catch(e){error(e);} };
      $('mr-input').addEventListener('input',render); $('mr-quotes').addEventListener('change',render);
      action('复制格式化 JSON',()=>copy(JSON.stringify(JSON.parse($('mr-input').value),null,2)));
    } else if(id==='password') {
      body.innerHTML='<div id="mr-groups"></div><label><input id="mr-exclude" type="checkbox" checked>排除混淆字符：I l 0 o O</label><label>自定义字符<input id="mr-custom" type="text"></label><label>密码长度<input id="mr-length" type="number" min="1" max="4096" value="16"></label><label>生成密码<textarea id="mr-output" rows="3" readonly></textarea></label>';
      const groups=['abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ','0123456789','~!@#$%^&*()_+-=[]{}/?<>'];
      groups.forEach((g,i)=> {const l=document.createElement('label'); const c=document.createElement('input');c.type='checkbox';c.checked=true;c.id='mr-group-'+i;l.append(c,document.createTextNode(g));$('mr-groups').append(l);});
      function random(n) { const a=new Uint32Array(1); const limit=2**32-(2**32%n); do {crypto.getRandomValues(a);}while(a[0]>=limit); return a[0]%n; }
      const generate=()=> { try {error(null);const length=Number($('mr-length').value);if(!Number.isInteger(length)||length<1||length>4096) throw new Error('密码长度需为 1–4096 的整数');
        let sets=groups.filter((g,i)=>$('mr-group-'+i).checked); if($('mr-custom').value) sets.push($('mr-custom').value);
        sets=sets.map(s=>Array.from(s).filter(c=>!$('mr-exclude').checked||!'Il0oO'.includes(c))).filter(s=>s.length);
        if(!sets.length) throw new Error('没有可用于生成密码的字符');
        const pool=sets.flat(); const result=length>=sets.length?sets.map(s=>s[random(s.length)]):[];
        while(result.length<length) result.push(pool[random(pool.length)]);
        for(let i=result.length-1;i>0;i--){const j=random(i+1);[result[i],result[j]]=[result[j],result[i]];} $('mr-output').value=result.join('');
      }catch(e){$('mr-output').value='';error(e);} };
      body.addEventListener('input',generate); action('重新生成',generate); action('复制密码',()=>copy($('mr-output').value)); generate();
    }
    const saved=drafts.get(id); if(saved) {panel.querySelectorAll('textarea,input').forEach((el,i)=> {if(saved[i]) {el.value=saved[i].value;el.checked=saved[i].checked;}}); if(['qr','json','password'].includes(id)) $('mr-input')?.dispatchEvent(new Event('input'));}
  }
  definitions.forEach(([id,label])=> {const b=button(label,()=>showTool(id));b.dataset.tool=id;nav.append(b);});
  document.getElementById('mr-open').addEventListener('click',()=> {dashboard.hidden=true;tools.hidden=false;showTool(current);document.getElementById('mr-back').focus();window.scrollTo(0,0);});
  document.getElementById('mr-back').addEventListener('click',()=> {saveDraft();clearInterval(clock);tools.hidden=true;dashboard.hidden=false;document.getElementById('mr-open').focus();});
})();
