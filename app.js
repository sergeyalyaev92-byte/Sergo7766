(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const DEFAULTS = Object.freeze({style:'Outlined',fill:0,weight:400,grade:0,optical:24,iconColor:'#171717',background:'none',backgroundColor:'#E8E8E8',scale:60});
  const STORAGE_KEY = 'material-icon-settings';
  const SVG_CACHE = new Map();
  let settings = loadSettings(), activeIcon = null, toastTimer, modalHistoryOwned = false;
  let autoColor = false, previousIconColor = settings.iconColor;
  const expanded = new Set(), root = document.documentElement;

  function loadSettings(){
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      const safe = {...DEFAULTS};
      for(const key of Object.keys(safe)) if(stored[key] !== undefined) safe[key] = stored[key];
      return safe;
    } catch { return {...DEFAULTS}; }
  }
  function saveSettings(){ try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch {} }
  function iconFontFamily(){ return `Material Symbols ${settings.style}`; }
  function createIconVisual(icon, options={}){
    const visual=document.createElement('span');
    visual.className=`icon-visual shape-${settings.background}`;
    if(options.className)visual.classList.add(options.className);
    const symbol=document.createElement('span');
    symbol.className='material-icon';symbol.setAttribute('aria-hidden','true');symbol.textContent=typeof icon==='string'?icon:icon.name;
    visual.append(symbol);return visual;
  }
  function updateVisuals(){
    $$('.icon-visual').forEach(visual=>{
      visual.classList.remove('shape-none','shape-circle','shape-square','shape-rounded');
      visual.classList.add(`shape-${settings.background}`);
    });
  }
  function applySettings(){
    const vars={'--fill':settings.fill,'--weight':settings.weight,'--grade':settings.grade,'--optical-size':settings.optical,'--icon-color':settings.iconColor,'--background-color':settings.backgroundColor,'--icon-scale':settings.scale/100,'--font-family':`'${iconFontFamily()}'`};
    Object.entries(vars).forEach(([name,value])=>root.style.setProperty(name,value));
    ['fill','weight','grade','optical','scale'].forEach(id=>$('#'+id).value=settings[id]);
    $('#icon-color').value=settings.iconColor;$('#icon-hex').value=settings.iconColor.toUpperCase();
    $('#background-color').value=settings.backgroundColor;$('#background-hex').value=settings.backgroundColor.toUpperCase();
    $('#fill-value').textContent=settings.fill?'100%':'0%';$('#weight-value').textContent=settings.weight;
    $('#grade-value').textContent=settings.grade;$('#optical-value').textContent=settings.optical;$('#scale-value').textContent=settings.scale+'%';
    $$('#styles button').forEach(b=>b.classList.toggle('active',b.dataset.style===settings.style));
    $$('#backgrounds button').forEach(b=>b.classList.toggle('active',b.dataset.background===settings.background));
    $('#background-color-row').hidden=settings.background==='none';updateVisuals();updateModalMeta();saveSettings();
  }

  function card(icon){
    const button=document.createElement('button');button.type='button';button.className='icon-card';button.dataset.icon=icon.name;
    button.setAttribute('aria-label',`${icon.title}, открыть настройки и экспорт`);
    const title=document.createElement('span');title.className='icon-title';title.textContent=icon.title;
    button.append(createIconVisual(icon),title);return button;
  }
  function appendCards(target,icons){const fragment=document.createDocumentFragment();icons.forEach(icon=>fragment.append(card(icon)));target.replaceChildren(fragment)}
  function renderCategories(){
    const fragment=document.createDocumentFragment();
    normalizedCategories.forEach((category,index)=>{
      const section=document.createElement('section');section.className='icon-category';
      section.innerHTML=`<div class="section-heading"><div><h2>${category.title}</h2><p>${category.description}</p></div></div><div class="icon-grid"></div>`;
      appendCards($('.icon-grid',section),expanded.has(index)?category.icons:category.icons.slice(0,20));
      if(category.icons.length>20){const more=document.createElement('button');more.type='button';more.className='more-button';more.dataset.category=index;more.textContent=expanded.has(index)?'Свернуть ↑':`Показать ещё ${category.icons.length-20} иконок →`;section.append(more)}
      fragment.append(section);
    });$('#categories').replaceChildren(fragment);
  }
  function normalizeQuery(value){return value.toLocaleLowerCase('ru').replaceAll('ё','е').replace(/(ами|ями|ого|ему|ами|ями|ов|ев|ей|ы|и|а|я|у|ю)$/,'')}
  function search(query){
    const q=query.trim();$('#categories').hidden=!!q;$('#search-results').hidden=!q;$('#show-all').hidden=!!q;if(!q)return;
    const words=q.split(/\s+/).map(normalizeQuery);
    const found=ICONS.filter(icon=>{const hay=normalizeQuery(`${icon.name} ${icon.title} ${icon.keywords} ${icon.category}`);return words.every(word=>hay.includes(word))}).slice(0,300);
    $('#results-title').textContent=`Поиск: «${q}»`;$('#results-count').textContent=found.length?`Найдено: ${found.length}`:'';
    $('#empty').hidden=!!found.length;$('#results-grid').hidden=!found.length;appendCards($('#results-grid'),found);
  }
  let debounce;
  $('#search').addEventListener('input',event=>{clearTimeout(debounce);debounce=setTimeout(()=>search(event.target.value),120)});
  document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();$('#search').focus()}if(event.key==='Escape'){closeModal();closeSettings()}});
  document.addEventListener('click',event=>{const iconButton=event.target.closest('.icon-card');if(iconButton)openModal(iconButton.dataset.icon);const more=event.target.closest('.more-button');if(more){const index=+more.dataset.category;expanded.has(index)?expanded.delete(index):expanded.add(index);renderCategories()}});
  $('#show-all').onclick=()=>{normalizedCategories.forEach((_,index)=>expanded.add(index));renderCategories();$('#show-all').hidden=true};

  function openSettings(){$('#settings-overlay').hidden=false;$('#settings').classList.add('open');$('#settings').setAttribute('aria-hidden','false');document.body.classList.add('locked');$('#close-settings').focus()}
  function closeSettings(){if(!$('#settings').classList.contains('open'))return;$('#settings').classList.remove('open');$('#settings').setAttribute('aria-hidden','true');$('#settings-overlay').hidden=true;unlockBody()}
  $('#open-settings').onclick=openSettings;$('#close-settings').onclick=closeSettings;$('#settings-overlay').onclick=closeSettings;
  ['fill','weight','grade','optical','scale'].forEach(id=>$('#'+id).addEventListener('input',event=>{settings[id]=+event.target.value;applySettings()}));
  $('#styles').onclick=event=>{if(event.target.dataset.style){settings.style=event.target.dataset.style;applySettings()}};
  $('#backgrounds').onclick=event=>{
    const button=event.target.closest('[data-background]');if(!button)return;
    const next=button.dataset.background;
    if(settings.background==='none'&&next!=='none'&&settings.iconColor.toLowerCase()===DEFAULTS.iconColor.toLowerCase()){previousIconColor=settings.iconColor;settings.iconColor='#FFFFFF';autoColor=true}
    if(next==='none'&&autoColor){settings.iconColor=previousIconColor;autoColor=false}
    settings.background=next;applySettings();
  };
  function validHex(value){return /^#[0-9a-f]{6}$/i.test(value)}
  function connectColor(picker,hex,key){
    const set=value=>{settings[key]=value;if(key==='iconColor'){autoColor=false;previousIconColor=value}applySettings()};
    $(picker).oninput=event=>set(event.target.value);$(hex).onchange=event=>{let value=event.target.value.trim();if(!value.startsWith('#'))value='#'+value;validHex(value)?set(value):event.target.value=settings[key]};
  }
  connectColor('#icon-color','#icon-hex','iconColor');connectColor('#background-color','#background-hex','backgroundColor');
  $('#reset').onclick=()=>{settings={...DEFAULTS};autoColor=false;previousIconColor=DEFAULTS.iconColor;applySettings();showToast('Настройки сброшены')};

  function openModal(name,historyMode='auto'){
    const icon=ICONS.find(item=>item.name===name);if(!icon)return;
    const alreadyOpen=$('#icon-modal').classList.contains('open');activeIcon=icon;
    $('#modal-symbol').replaceChildren(createIconVisual(icon));$('#modal-system').textContent=name;$('#modal-title').textContent=icon.title;$('#modal-category').textContent=icon.category;
    updateModalMeta();renderRelated();$('#modal-backdrop').hidden=false;$('#icon-modal').classList.add('open');$('#icon-modal').setAttribute('aria-hidden','false');document.body.classList.add('locked');
    if(historyMode==='auto'){const url=new URL(location.href);url.searchParams.set('icon',name);if(alreadyOpen||modalHistoryOwned)history.replaceState({icon:name,iconModal:true},'',url);else{history.pushState({icon:name,iconModal:true},'',url);modalHistoryOwned=true}}
    if(!alreadyOpen)$('#close-modal').focus();
  }
  function hideModal(){if(!$('#icon-modal').classList.contains('open'))return;$('#icon-modal').classList.remove('open');$('#icon-modal').setAttribute('aria-hidden','true');$('#modal-backdrop').hidden=true;activeIcon=null;unlockBody()}
  function closeModal(){if(!$('#icon-modal').classList.contains('open'))return;if(modalHistoryOwned){modalHistoryOwned=false;history.back()}else{const url=new URL(location.href);url.searchParams.delete('icon');history.replaceState({},'',url);hideModal()}}
  function unlockBody(){if(!$('#settings').classList.contains('open')&&!$('#icon-modal').classList.contains('open'))document.body.classList.remove('locked')}
  function updateModalMeta(){if(activeIcon)$('#modal-settings').textContent=`${settings.style} · FILL ${settings.fill} · wght ${settings.weight} · GRAD ${settings.grade} · opsz ${settings.optical}`}
  function renderRelated(){appendCards($('#related-icons'),normalizedCategories[activeIcon.categoryIndex].icons.filter(icon=>icon.name!==activeIcon.name).slice(0,5))}
  $('#close-modal').onclick=closeModal;$('#modal-backdrop').onclick=closeModal;
  window.addEventListener('popstate',()=>{const name=new URL(location.href).searchParams.get('icon');if(name)openModal(name,'none');else hideModal()});
  $('#copy-link').onclick=()=>{const url=new URL(location.href);url.searchParams.set('icon',activeIcon.name);copyText(url.href,'Ссылка скопирована')};

  const sizeInput=$('#export-size');
  function exportSize(){return Math.max(16,Math.min(2048,parseInt(sizeInput.value,10)||256))}
  function syncQuick(){$$('#quick-sizes button').forEach(button=>button.classList.toggle('active',+button.textContent===exportSize()))}
  $('#size-minus').onclick=()=>{sizeInput.value=Math.max(16,exportSize()-16);syncQuick()};$('#size-plus').onclick=()=>{sizeInput.value=Math.min(2048,exportSize()+16);syncQuick()};sizeInput.onchange=()=>{sizeInput.value=exportSize();syncQuick()};
  $('#quick-sizes').onclick=event=>{if(event.target.tagName==='BUTTON'){sizeInput.value=event.target.textContent;syncQuick()}};

  function staticAssetUrls(name){
    const family=`materialsymbols${settings.style.toLowerCase()}`, size=[20,24,40,48].reduce((a,b)=>Math.abs(b-settings.optical)<Math.abs(a-settings.optical)?b:a);
    const parts=[];if(settings.weight!==400)parts.push(`wght${settings.weight}`);if(settings.grade)parts.push(`grad${settings.grade}`);if(settings.fill)parts.push('fill1');
    const variants=[parts.join(''),parts.filter(p=>!p.startsWith('grad')).join(''),settings.fill?'fill1':'default','default'].filter(Boolean);
    return [...new Set(variants)].map(variant=>`https://fonts.gstatic.com/s/i/short-term/release/${family}/${encodeURIComponent(name)}/${variant}/${size}px.svg`);
  }
  async function getOfficialGeometry(){
    const cacheKey=[activeIcon.name,settings.style,settings.fill,settings.weight,settings.grade,settings.optical].join(':');if(SVG_CACHE.has(cacheKey))return SVG_CACHE.get(cacheKey);
    let lastError;
    for(const url of staticAssetUrls(activeIcon.name))try{const response=await fetch(url);if(!response.ok)throw new Error(String(response.status));const text=await response.text();const doc=new DOMParser().parseFromString(text,'image/svg+xml'),source=doc.documentElement;const geometry=[...source.children].filter(el=>['path','g','circle','rect','polygon'].includes(el.localName)).map(el=>el.outerHTML).join('');if(!geometry)throw new Error('no path');const result={geometry,viewBox:source.getAttribute('viewBox')||'0 0 24 24'};SVG_CACHE.set(cacheKey,result);return result}catch(error){lastError=error}
    throw new Error(`Не удалось получить официальный SVG path: ${lastError?.message||''}`);
  }
  async function svgString(){
    const {geometry,viewBox}=await getOfficialGeometry(),size=exportSize(),scale=settings.scale/100,inset=size*(1-scale)/2;
    const [, ,sourceWidth=24,sourceHeight=24]=viewBox.split(/\s+/).map(Number),sx=(size*scale)/sourceWidth,sy=(size*scale)/sourceHeight;
    let background='';if(settings.background==='circle')background=`<circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="${settings.backgroundColor}"/>`;else if(settings.background!=='none')background=`<rect width="${size}" height="${size}" rx="${settings.background==='rounded'?size*.2:0}" fill="${settings.backgroundColor}"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${background}<g fill="${settings.iconColor}" transform="translate(${inset} ${inset}) scale(${sx} ${sy})">${geometry}</g></svg>`;
  }
  function download(blob,name){const anchor=document.createElement('a');anchor.href=URL.createObjectURL(blob);anchor.download=name;anchor.click();setTimeout(()=>URL.revokeObjectURL(anchor.href),1000)}
  async function withExport(action){try{await action()}catch(error){console.error(error);showToast('Экспорт этой иконки временно недоступен',3500)}}
  $('#download-svg').onclick=()=>withExport(async()=>download(new Blob([await svgString()],{type:'image/svg+xml'}),`icon-${activeIcon.name}.svg`));
  async function pngBlob(){
    const svg=await svgString(),url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));
    try{const image=new Image();await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;image.src=url});const canvas=document.createElement('canvas');canvas.width=canvas.height=exportSize();canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);return await new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('PNG error')),'image/png'))}finally{URL.revokeObjectURL(url)}
  }
  $('#download-png').onclick=()=>withExport(async()=>download(await pngBlob(),`icon-${activeIcon.name}-${exportSize()}.png`));
  $('#copy-svg').onclick=()=>withExport(async()=>{
    const svg=await svgString();
    try{await navigator.clipboard.write([new ClipboardItem({'image/svg+xml':new Blob([svg],{type:'image/svg+xml'}),'text/plain':new Blob([svg],{type:'text/plain'})})]);showToast('SVG скопирован')}
    catch{await copyText(svg,'SVG скопирован как текст — вставьте его в Figma')}
  });
  $('#copy-png').onclick=()=>withExport(async()=>{try{const blob=await pngBlob();await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);showToast('PNG скопирован')}catch{showClipboardError('PNG')}});
  async function copyText(text,message){try{await navigator.clipboard.writeText(text);showToast(message)}catch{showClipboardError()}}
  function showClipboardError(){showToast('Браузер не разрешил доступ к буферу. Разрешите доступ или скачайте файл.',4000)}
  function showToast(message,duration=2300){const toast=$('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),duration)}

  $('#settings-icon').replaceChildren(createIconVisual('favorite'));renderCategories();applySettings();
  $('#icon-count').textContent=`${ICONS.length} иконок`;
  loadOfficialIcons().then(()=>{$('#icon-count').textContent=`${ICONS.length} иконок`;renderCategories();if($('#search').value)search($('#search').value);const requested=new URL(location.href).searchParams.get('icon');if(requested&&!activeIcon)openModal(requested,'none')}).catch(error=>{console.warn('Полный каталог Google недоступен, используется встроенный набор.',error);$('#icon-count').textContent=`${ICONS.length} иконок`});
  const initial=new URL(location.href).searchParams.get('icon');if(initial)setTimeout(()=>openModal(initial,'none'));
})();
