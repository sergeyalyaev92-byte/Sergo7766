(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const DEFAULTS = {style:'Outlined',fill:0,weight:400,grade:0,optical:24,iconColor:'#171717',background:'none',backgroundColor:'#E8E8E8',scale:60};
  let settings = loadSettings();
  let activeIcon = null;
  let toastTimer;
  const expanded = new Set();
  const root = document.documentElement;

  function loadSettings(){
    try { return {...DEFAULTS, ...JSON.parse(localStorage.getItem('material-icon-settings') || '{}')}; }
    catch { return {...DEFAULTS}; }
  }
  function saveSettings(){
    try { localStorage.setItem('material-icon-settings', JSON.stringify(settings)); } catch { /* private mode */ }
  }
  function applySettings(){
    root.style.setProperty('--fill', settings.fill);
    root.style.setProperty('--weight', settings.weight);
    root.style.setProperty('--grade', settings.grade);
    root.style.setProperty('--optical-size', settings.optical);
    root.style.setProperty('--icon-color', settings.iconColor);
    root.style.setProperty('--background-color', settings.backgroundColor);
    root.style.setProperty('--icon-scale', settings.scale + '%');
    root.style.setProperty('--font-family', `'Material Symbols ${settings.style}'`);
    ['fill','weight','grade','optical','scale'].forEach(id => { $('#'+id).value = settings[id]; });
    $('#icon-color').value = settings.iconColor; $('#icon-hex').value = settings.iconColor.toUpperCase();
    $('#background-color').value = settings.backgroundColor; $('#background-hex').value = settings.backgroundColor.toUpperCase();
    $('#fill-value').textContent = settings.fill ? '100%' : '0%';
    $('#weight-value').textContent = settings.weight; $('#grade-value').textContent = settings.grade;
    $('#optical-value').textContent = settings.optical; $('#scale-value').textContent = settings.scale + '%';
    $$('#styles button').forEach(b=>b.classList.toggle('active',b.dataset.style===settings.style));
    $$('#backgrounds button').forEach(b=>b.classList.toggle('active',b.dataset.background===settings.background));
    $('#background-color-row').hidden = settings.background === 'none';
    $$('.icon-surface').forEach(setSurface);
    if(activeIcon) updateModalMeta();
    saveSettings();
  }
  function setSurface(el){
    el.classList.remove('background-circle','background-square','background-rounded');
    if(settings.background !== 'none') el.classList.add('background-'+settings.background);
  }

  function card(icon){
    const button = document.createElement('button');
    button.type='button'; button.className='icon-card'; button.dataset.icon=icon.name;
    button.setAttribute('aria-label', `${icon.title}, открыть настройки и экспорт`);
    const symbol=document.createElement('span'); symbol.className='material-icon'; symbol.ariaHidden='true'; symbol.textContent=icon.name;
    const title=document.createElement('span'); title.textContent=icon.title;
    button.append(symbol,title); return button;
  }
  function appendCards(target, icons){
    const fragment=document.createDocumentFragment(); icons.forEach(i=>fragment.append(card(i))); target.replaceChildren(fragment);
  }
  function renderCategories(){
    const host=$('#categories'), fragment=document.createDocumentFragment();
    normalizedCategories.forEach((category,index)=>{
      const section=document.createElement('section'); section.className='icon-category';
      const visible=expanded.has(index)?category.icons:category.icons.slice(0,20);
      section.innerHTML=`<div class="section-heading"><div><h2>${category.title}</h2><p>${category.description}</p></div></div><div class="icon-grid"></div>`;
      appendCards($('.icon-grid',section),visible);
      if(category.icons.length>20){
        const more=document.createElement('button'); more.type='button'; more.className='more-button'; more.dataset.category=index;
        more.textContent=expanded.has(index)?'Свернуть ↑':`Показать ещё ${category.icons.length-20} иконок →`; section.append(more);
      }
      fragment.append(section);
    }); host.replaceChildren(fragment);
  }
  function search(query){
    const q=query.trim().toLocaleLowerCase('ru');
    $('#categories').hidden=!!q; $('#search-results').hidden=!q; $('#show-all').hidden=!!q;
    if(!q) return;
    const words=q.split(/\s+/); const found=ICONS.filter(icon=>{
      const hay=`${icon.name} ${icon.title} ${icon.keywords} ${icon.category}`.toLocaleLowerCase('ru');
      return words.every(word=>hay.includes(word));
    }).slice(0,240);
    $('#results-title').textContent=`Поиск: «${query.trim()}»`;
    $('#results-count').textContent=found.length ? `Найдено: ${found.length}` : '';
    $('#empty').hidden=found.length>0; $('#results-grid').hidden=!found.length;
    appendCards($('#results-grid'),found);
  }
  let debounce;
  $('#search').addEventListener('input',e=>{clearTimeout(debounce);debounce=setTimeout(()=>search(e.target.value),120)});
  document.addEventListener('keydown',e=>{
    if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#search').focus()}
    if(e.key==='Escape'){closeModal();closeSettings()}
  });
  document.addEventListener('click',e=>{
    const iconButton=e.target.closest('.icon-card'); if(iconButton) openModal(iconButton.dataset.icon);
    const more=e.target.closest('.more-button'); if(more){const i=+more.dataset.category;expanded.has(i)?expanded.delete(i):expanded.add(i);renderCategories()}
  });
  $('#show-all').addEventListener('click',()=>{expanded.clear();normalizedCategories.forEach((_,i)=>expanded.add(i));renderCategories();$('#show-all').hidden=true});

  function openSettings(){ $('#settings-overlay').hidden=false; $('#settings').classList.add('open'); $('#settings').setAttribute('aria-hidden','false'); document.body.classList.add('locked'); $('#close-settings').focus(); }
  function closeSettings(){ if(!$('#settings').classList.contains('open'))return; $('#settings').classList.remove('open'); $('#settings').setAttribute('aria-hidden','true'); $('#settings-overlay').hidden=true; unlockBody(); }
  $('#open-settings').onclick=openSettings; $('#close-settings').onclick=closeSettings; $('#settings-overlay').onclick=closeSettings;
  ['fill','weight','grade','optical','scale'].forEach(id=>$('#'+id).addEventListener('input',e=>{settings[id]=+e.target.value;applySettings()}));
  $('#styles').onclick=e=>{if(e.target.dataset.style){settings.style=e.target.dataset.style;applySettings()}};
  $('#backgrounds').onclick=e=>{const b=e.target.closest('[data-background]');if(b){const wasNone=settings.background==='none';settings.background=b.dataset.background;if(wasNone&&settings.background!=='none'&&settings.iconColor.toLowerCase()===DEFAULTS.iconColor.toLowerCase())settings.iconColor='#FFFFFF';applySettings()}};
  function validHex(value){return /^#[0-9a-f]{6}$/i.test(value)}
  function connectColor(picker,hex,key){$(picker).oninput=e=>{settings[key]=e.target.value;applySettings()};$(hex).addEventListener('change',e=>{let value=e.target.value.trim();if(!value.startsWith('#'))value='#'+value;if(validHex(value)){settings[key]=value;applySettings()}else e.target.value=settings[key]})}
  connectColor('#icon-color','#icon-hex','iconColor');connectColor('#background-color','#background-hex','backgroundColor');
  $('#reset').onclick=()=>{settings={...DEFAULTS};applySettings();showToast('Настройки сброшены')};

  function openModal(name, push=true){
    activeIcon=ICONS.find(i=>i.name===name); if(!activeIcon)return;
    $('#modal-symbol').textContent=name; $('#modal-system').textContent=name; $('#modal-title').textContent=activeIcon.title; $('#modal-category').textContent=activeIcon.category;
    setSurface($('#modal-symbol')); updateModalMeta(); renderRelated();
    $('#modal-backdrop').hidden=false; $('#icon-modal').classList.add('open'); $('#icon-modal').setAttribute('aria-hidden','false');document.body.classList.add('locked');
    if(push){const url=new URL(location.href);url.searchParams.set('icon',name);history.pushState({icon:name},'',url)}
    $('#close-modal').focus();
  }
  function closeModal(push=true){if(!$('#icon-modal').classList.contains('open'))return;$('#icon-modal').classList.remove('open');$('#icon-modal').setAttribute('aria-hidden','true');$('#modal-backdrop').hidden=true;activeIcon=null;unlockBody();if(push){const url=new URL(location.href);url.searchParams.delete('icon');history.pushState({},'',url)}}
  function unlockBody(){if(!$('#settings').classList.contains('open')&&!$('#icon-modal').classList.contains('open'))document.body.classList.remove('locked')}
  function updateModalMeta(){if(activeIcon)$('#modal-settings').textContent=`${settings.style} · FILL ${settings.fill} · ${settings.weight} · GRAD ${settings.grade} · opsz ${settings.optical}`}
  function renderRelated(){const related=normalizedCategories[activeIcon.categoryIndex].icons.filter(i=>i.name!==activeIcon.name).slice(0,5);appendCards($('#related-icons'),related)}
  $('#close-modal').onclick=()=>closeModal();$('#modal-backdrop').onclick=()=>closeModal();
  window.addEventListener('popstate',()=>{const name=new URL(location.href).searchParams.get('icon');name?openModal(name,false):closeModal(false)});
  $('#copy-link').onclick=async()=>{const url=new URL(location.href);url.searchParams.set('icon',activeIcon.name);await copyText(url.href,'Ссылка скопирована')};
  const sizeInput=$('#export-size');
  function exportSize(){return Math.max(16,Math.min(2048,parseInt(sizeInput.value,10)||256))}
  $('#size-minus').onclick=()=>{sizeInput.value=Math.max(16,exportSize()-16);syncQuick()};$('#size-plus').onclick=()=>{sizeInput.value=Math.min(2048,exportSize()+16);syncQuick()};sizeInput.onchange=()=>{sizeInput.value=exportSize();syncQuick()};
  $('#quick-sizes').onclick=e=>{if(e.target.tagName==='BUTTON'){sizeInput.value=e.target.textContent;syncQuick()}};
  function syncQuick(){$$('#quick-sizes button').forEach(b=>b.classList.toggle('active',+b.textContent===exportSize()))}

  function svgString(){
    const size=exportSize(), iconPx=Math.round(size*settings.scale/100), pos=size/2;
    let bg=''; if(settings.background!=='none'){
      if(settings.background==='circle')bg=`<circle cx="${pos}" cy="${pos}" r="${pos}" fill="${settings.backgroundColor}"/>`;
      else bg=`<rect width="${size}" height="${size}" rx="${settings.background==='rounded'?Math.round(size*.19):0}" fill="${settings.backgroundColor}"/>`;
    }
    const family=`Material Symbols ${settings.style}`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${bg}<style>@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+${settings.style}:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');text{font-family:'${family}';font-variation-settings:'FILL' ${settings.fill},'wght' ${settings.weight},'GRAD' ${settings.grade},'opsz' ${settings.optical};font-size:${iconPx}px;fill:${settings.iconColor}}</style><text x="${pos}" y="${pos}" text-anchor="middle" dominant-baseline="central">${activeIcon.name}</text></svg>`;
  }
  function download(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
  $('#download-svg').onclick=()=>download(new Blob([svgString()],{type:'image/svg+xml'}),`icon-${activeIcon.name}.svg`);
  async function pngBlob(){
    const size=exportSize(),canvas=document.createElement('canvas');canvas.width=canvas.height=size;const ctx=canvas.getContext('2d');
    if(settings.background!=='none'){ctx.fillStyle=settings.backgroundColor;if(settings.background==='circle'){ctx.beginPath();ctx.arc(size/2,size/2,size/2,0,Math.PI*2);ctx.fill()}else if(settings.background==='rounded'){roundedRect(ctx,0,0,size,size,size*.19);ctx.fill()}else ctx.fillRect(0,0,size,size)}
    await document.fonts.load(`${Math.round(size*settings.scale/100)}px "Material Symbols ${settings.style}"`);
    ctx.fillStyle=settings.iconColor;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`${Math.round(size*settings.scale/100)}px "Material Symbols ${settings.style}"`;
    try{ctx.fontKerning='none';ctx.fontVariantLigatures='common-ligatures'}catch{}
    ctx.fillText(activeIcon.name,size/2,size/2);
    return new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
  }
  function roundedRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect?ctx.roundRect(x,y,w,h,r):(ctx.rect(x,y,w,h));}
  $('#download-png').onclick=async()=>download(await pngBlob(),`icon-${activeIcon.name}-${exportSize()}.png`);
  $('#copy-svg').onclick=()=>copyText(svgString(),'SVG скопирован');
  $('#copy-png').onclick=async()=>{try{if(!navigator.clipboard||!window.ClipboardItem)throw new Error();const blob=await pngBlob();await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);showToast('PNG скопирован')}catch{showToast('Откройте сайт через localhost для копирования',3500)}};
  async function copyText(text,message){try{await navigator.clipboard.writeText(text);showToast(message)}catch{showToast('Откройте сайт через localhost для копирования',3500)}}
  function showToast(message,duration=2200){const toast=$('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),duration)}

  renderCategories(); applySettings();
  const initial=new URL(location.href).searchParams.get('icon'); if(initial)setTimeout(()=>openModal(initial,false),0);
})();
