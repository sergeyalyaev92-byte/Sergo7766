from pathlib import Path
import json

ROOT=Path(__file__).resolve().parents[1]
codepoints=ROOT/'data/MaterialSymbolsOutlined.codepoints'
if not codepoints.exists():
    raise SystemExit('Missing data/MaterialSymbolsOutlined.codepoints')

names=[]
seen=set()
for line in codepoints.read_text(encoding='utf-8').splitlines():
    parts=line.strip().split()
    if not parts:
        continue
    name=parts[0]
    if name not in seen:
        seen.add(name); names.append(name)

(ROOT/'material-symbols-data.js').write_text(
    '/* Generated from data/MaterialSymbolsOutlined.codepoints. Do not edit manually. */\n'
    + 'const MATERIAL_SYMBOL_NAMES = '
    + json.dumps(names, ensure_ascii=False, separators=(',',':'))
    + ';\n', encoding='utf-8')

for html_name in ('index.html','material-icons.html'):
    p=ROOT/html_name
    text=p.read_text(encoding='utf-8')
    old='<script src="icons-data.js"></script><script src="app.js"></script>'
    new='<script src="material-symbols-data.js"></script><script src="icons-data.js"></script><script src="app.js"></script>'
    if 'material-symbols-data.js' not in text:
        if old not in text:
            raise SystemExit(f'Cannot find script block in {html_name}')
        text=text.replace(old,new)
    p.write_text(text,encoding='utf-8')

p=ROOT/'icons-data.js'
text=p.read_text(encoding='utf-8')
marker='function translatedTitle(name){'
if marker not in text:
    raise SystemExit('Cannot find translatedTitle marker')
head=text[:text.index(marker)]
tail=r'''Object.assign(WORDS_RU,{
 activity:'Активность',alert:'Предупреждение',analytics:'Аналитика',apartment:'Здание',archive:'Архив',architecture:'Архитектура',attach:'Прикрепить',audio:'Аудио',backup:'Резервная копия',bluetooth:'Bluetooth',bookmark:'Закладка',border:'Граница',brightness:'Яркость',brush:'Кисть',build:'Инструменты',button:'Кнопка',cancel:'Отмена',card:'Карта',category:'Категория',cell:'Сотовая связь',chat:'Чат',child:'Ребёнок',clean:'Очистить',clock:'Часы',comment:'Комментарий',communication:'Связь',construction:'Строительство',contact:'Контакт',contrast:'Контраст',copy:'Копировать',create:'Создать',currency:'Валюта',cut:'Вырезать',dark:'Тёмный',delivery:'Доставка',desktop:'Компьютер',done:'Готово',door:'Дверь',drag:'Перетащить',draw:'Рисовать',earth:'Земля',elderly:'Пожилой',emergency:'Экстренно',engineering:'Инженерия',expand:'Развернуть',explore:'Исследовать',factory:'Производство',family:'Семья',finance:'Финансы',fingerprint:'Отпечаток',flag:'Флаг',food:'Еда',foundation:'Фундамент',fullscreen:'Полный экран',game:'Игра',garage:'Гараж',grade:'Оценка',graph:'График',hardware:'Оборудование',headphones:'Наушники',history:'История',hotel:'Отель',house:'Дом',inventory:'Склад',key:'Ключ',kitchen:'Кухня',laptop:'Ноутбук',layers:'Слои',login:'Вход',logout:'Выход',medical:'Медицина',message:'Сообщение',mic:'Микрофон',mobile:'Мобильный',monitor:'Монитор',mood:'Настроение',move:'Переместить',movie:'Видео',music:'Музыка',navigation:'Навигация',network:'Сеть',notification:'Уведомление',notes:'Заметки',pause:'Пауза',payment:'Платёж',people:'Люди',place:'Место',policy:'Правила',power:'Питание',privacy:'Приватность',public:'Мир',publish:'Опубликовать',qr:'QR',radio:'Радио',receipt:'Чек',record:'Запись',reply:'Ответить',report:'Отчёт',restore:'Восстановить',route:'Маршрут',school:'Обучение',screen:'Экран',shopping:'Покупки',signal:'Сигнал',smart:'Умный',speaker:'Динамик',sports:'Спорт',stop:'Стоп',store:'Магазин',sync:'Синхронизация',system:'Система',tablet:'Планшет',task:'Задача',terminal:'Терминал',thermostat:'Термостат',timer:'Таймер',train:'Поезд',transport:'Транспорт',trash:'Корзина',tune:'Настройка',undo:'Отменить',user:'Пользователь',vehicle:'Транспорт',verified:'Подтверждено',view:'Просмотр',wallet:'Кошелёк',water:'Вода',weather:'Погода',window:'Окно',woman:'Женщина',man:'Мужчина',boy:'Мальчик',girl:'Девочка',zoom:'Масштаб'
});
const ACRONYMS={wifi:'Wi-Fi',usb:'USB',qr:'QR',hd:'HD',hdr:'HDR',vpn:'VPN',sms:'SMS',nfc:'NFC',gps:'GPS',api:'API',apk:'APK',ios:'iOS',android:'Android',ai:'AI',ar:'AR',vr:'VR',tv:'TV',id:'ID','2d':'2D','3d':'3D','4k':'4K','5g':'5G'};
function humanToken(token){const low=token.toLowerCase();if(ACRONYMS[low])return ACRONYMS[low];if(/^\d+(k|mp)$/i.test(token))return token.toUpperCase();return token.charAt(0).toUpperCase()+token.slice(1)}
function translatedTitle(name){if(RU_ICON_META[name])return RU_ICON_META[name][0];return name.split('_').filter(Boolean).map(token=>WORDS_RU[token.toLowerCase()]||ACRONYMS[token.toLowerCase()]||humanToken(token)).join(' ')||friendlyName(name)}
function extraKeywords(name){return Object.entries(SEARCH_GROUPS).filter(([,names])=>names.some(n=>name===n||name.startsWith(n+'_'))).map(([words])=>words).join(' ')}
const normalizedCategories=ICON_CATEGORIES.map(([title,description,names],categoryIndex)=>({title,description,icons:names.split(' ').map(name=>({name,title:translatedTitle(name),keywords:`${RU_ICON_META[name]?.[1]||''} ${extraKeywords(name)} ${name.replaceAll('_',' ')}`,category:title,categoryIndex}))}));
normalizedCategories.push({title:'Другие иконки',description:'Остальные иконки полного каталога Material Symbols',icons:[]});
const OTHER_CATEGORY_INDEX=normalizedCategories.length-1;
function categoryForName(name){const rules=[
[17,/(home_iot|nest_|thermostat|sensor|sprinkler|doorbell|detector|electric_meter|energy_savings|blinds|curtains|smart_outlet|hvac|heat_pump|air_purifier|water_heater)/],
[14,/(^|_)(lock|key|password|shield|security|verified|privacy|fingerprint|policy|gpp|encrypt|warning|report|danger|emergency|passkey|login|logout|block|phishing|safety|vpn)(_|$)/],
[15,/(flight|luggage|travel|hotel|beach|passport|connecting_airports|departure|sailing|airport|attraction|tour|trip)/],
[10,/(directions_(car|bus|railway|boat|bike)|(^|_)(car|bus|train|tram|subway|bike|scooter|motorcycle|taxi|shipping|delivery|traffic|garage|tire|boat|railway|transport|commute|moped)(_|$)|^ev_|airport_shuttle)/],
[9,/(^|_)(play|pause|stop|video|audio|music|mic|volume|movie|media|podcast|radio|headphones|speaker|subtitle|caption|replay|skip|record|equalizer)(_|$)|fast_forward|fast_rewind|graphic_eq/],
[5,/(^|_)(image|photo|camera|palette|color|crop|rotate|flip|brightness|contrast|filter|landscape|portrait|panorama|slideshow|gradient|texture|exposure|animation)(_|$)|movie_creation/],
[6,/(payment|money|currency|account_balance|wallet|saving|credit|receipt|sale|shopping|store|business|work|finance|analytics|chart|trending|percent|factory|inventory|calculate|paid|sell|price|quote)/],
[7,/(location|place|^map$|navigation|route|explore|pin_drop|where_to_vote|terrain|satellite|streetview|^local_|park|museum|church|domain|layers)/],
[8,/(^|_)(text|format|title|subject|article|description|document|note|table|column|row|space|function|spell|translate|paragraph|font|list|quote|markdown)(_|$)|insert_link|link_off/],
[4,/(mail|email|chat|message|sms|call|phone|notification|forum|voicemail|contact|campaign|rss_feed|communication)/],
[2,/(person|people|group|face|mood|sentiment|diversity|woman|man|child|family|social|accessibility|elderly|boy|girl|badge|contacts|handshake|waving_hand)/],
[16,/(^|_)(home|apartment|cottage|house|door|living|kitchen|chair|bedroom|bath|shower|desk|clean|vacuum|laundry|iron|microwave|blender|flatware|grocery|yard|deck|fence|roof|foundation|household|faucet|oven|dishwasher)(_|$)/],
[13,/(device|computer|laptop|desktop|monitor|smartphone|tablet|watch|^tv$|keyboard|mouse|headset|router|scanner|printer|phone_iphone|phone_android|smart_display|smart_toy|usb|cable|cast|dock|gamepad|hardware|screen|display|earbud|charging)/],
[12,/(android|system|power|restart|update|bug|memory|storage|battery|network|signal|airplane|dark_mode|light_mode|developer|code|terminal|dataset|cloud|backup|bluetooth|data_usage)/],
[11,/(sports|fitness|hiking|pool|surf|ski|golf|casino|celebration|cake|restaurant|local_bar|coffee|theater|piano|draw|pets|eco|spa|camp|kayak|chess|toys|game|stadium|festival|dining|food)/],
[1,/(menu|more_|close|check|expand|chevron|arrow|page|refresh|undo|redo|fullscreen|open_in_new|launch|drag|apps|filter|sort|tune|toggle|radio_button|check_box|cancel|done|view_|dashboard|^tab|window|panel|toolbar|button|select|switch|dropdown)/],
[3,/(edit|delete|save|download|upload|copy|paste|cut|zoom|touch|send|reply|forward|archive|bookmark|flag|push_pin|attach|create|brush|build|history|restore|publish|search|share|print|move|scan|schedule|task)/]
];for(const [index,re] of rules)if(re.test(name))return index;return OTHER_CATEGORY_INDEX}
let ICONS=[];
async function loadOfficialIcons(){if(!Array.isArray(MATERIAL_SYMBOL_NAMES)||MATERIAL_SYMBOL_NAMES.length<4000)throw new Error('Локальный каталог Material Symbols неполный');const officialSet=new Set(MATERIAL_SYMBOL_NAMES);normalizedCategories.slice(0,OTHER_CATEGORY_INDEX).forEach(category=>{category.icons=category.icons.filter(icon=>officialSet.has(icon.name))});normalizedCategories[OTHER_CATEGORY_INDEX].icons=[];const byName=new Map();normalizedCategories.slice(0,OTHER_CATEGORY_INDEX).forEach(category=>category.icons.forEach(icon=>byName.set(icon.name,icon)));for(const name of MATERIAL_SYMBOL_NAMES){if(byName.has(name))continue;const categoryIndex=categoryForName(name),category=normalizedCategories[categoryIndex],title=translatedTitle(name);const icon={name,title,keywords:`${RU_ICON_META[name]?.[1]||''} ${extraKeywords(name)} ${name.replaceAll('_',' ')} ${title}`,category:category.title,categoryIndex};category.icons.push(icon);byName.set(name,icon)}ICONS=[...byName.values()];return ICONS}
'''
p.write_text(head+tail,encoding='utf-8')

p=ROOT/'app.js'
app=p.read_text(encoding='utf-8')
old="""    const found=ICONS.filter(icon=>{const hay=normalizeQuery(`${icon.name} ${icon.title} ${icon.keywords} ${icon.category}`);return words.every(word=>hay.includes(word))}).slice(0,300);\n    $('#results-title').textContent=`Поиск: «${q}»`;$('#results-count').textContent=found.length?`Найдено: ${found.length}`:'';\n    $('#empty').hidden=!!found.length;$('#results-grid').hidden=!found.length;appendCards($('#results-grid'),found);"""
new="""    const matches=ICONS.filter(icon=>{const hay=normalizeQuery(`${icon.name} ${icon.title} ${icon.keywords} ${icon.category}`);return words.every(word=>hay.includes(word))});\n    const found=matches.slice(0,300);\n    $('#results-title').textContent=`Поиск: «${q}»`;$('#results-count').textContent=matches.length?`Найдено: ${matches.length}${matches.length>found.length?` · показаны первые ${found.length}`:''}`:'';\n    $('#empty').hidden=!!matches.length;$('#results-grid').hidden=!matches.length;appendCards($('#results-grid'),found);"""
if old not in app:
    raise SystemExit('Cannot find search block in app.js')
p.write_text(app.replace(old,new),encoding='utf-8')
print('Generated names:',len(names))
