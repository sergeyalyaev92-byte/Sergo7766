from pathlib import Path

# --- Fix SVG/PNG export: Google Material Symbols SVGs commonly use viewBox="0 -960 960 960".
# The previous exporter scaled width/height but ignored minX/minY, so geometry with negative Y
# was shifted outside the downloaded canvas.
app = Path('app.js')
text = app.read_text(encoding='utf-8')
old = """    const [, ,sourceWidth=24,sourceHeight=24]=viewBox.split(/\\s+/).map(Number),sx=(size*scale)/sourceWidth,sy=(size*scale)/sourceHeight;\n    let background='';if(settings.background==='circle')background=`<circle cx=\"${size/2}\" cy=\"${size/2}\" r=\"${size/2}\" fill=\"${settings.backgroundColor}\"/>`;else if(settings.background!=='none')background=`<rect width=\"${size}\" height=\"${size}\" rx=\"${settings.background==='rounded'?size*.2:0}\" fill=\"${settings.backgroundColor}\"/>`;\n    return `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${size}\" height=\"${size}\" viewBox=\"0 0 ${size} ${size}\">${background}<g fill=\"${settings.iconColor}\" transform=\"translate(${inset} ${inset}) scale(${sx} ${sy})\">${geometry}</g></svg>`;"""
new = """    const [minX=0,minY=0,sourceWidth=24,sourceHeight=24]=viewBox.split(/\\s+/).map(Number),sx=(size*scale)/sourceWidth,sy=(size*scale)/sourceHeight;\n    const tx=inset-minX*sx,ty=inset-minY*sy;\n    let background='';if(settings.background==='circle')background=`<circle cx=\"${size/2}\" cy=\"${size/2}\" r=\"${size/2}\" fill=\"${settings.backgroundColor}\"/>`;else if(settings.background!=='none')background=`<rect width=\"${size}\" height=\"${size}\" rx=\"${settings.background==='rounded'?size*.2:0}\" fill=\"${settings.backgroundColor}\"/>`;\n    return `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${size}\" height=\"${size}\" viewBox=\"0 0 ${size} ${size}\">${background}<g fill=\"${settings.iconColor}\" transform=\"translate(${tx} ${ty}) scale(${sx} ${sy})\">${geometry}</g></svg>`;"""
if old not in text:
    raise SystemExit('app.js export block not found; refusing unsafe patch')
text = text.replace(old, new, 1)
# Hide the technical Material Symbol system name from the user-facing modal.
text = text.replace("$('#modal-symbol').replaceChildren(createIconVisual(icon));$('#modal-system').textContent=name;$('#modal-title').textContent=icon.title;", "$('#modal-symbol').replaceChildren(createIconVisual(icon));$('#modal-system').hidden=true;$('#modal-system').textContent=name;$('#modal-title').textContent=icon.title;", 1)
app.write_text(text, encoding='utf-8')

# --- Make visible titles Russian. English system names stay in keywords for search only.
ru = Path('ru-enhancements.js')
rutext = ru.read_text(encoding='utf-8')
anchor = "  const ACR = {wifi:'Wi-Fi',usb:'USB',qr:'QR',hd:'HD',hdr:'HDR',vpn:'VPN',sms:'SMS',nfc:'NFC',gps:'GPS',api:'API',apk:'APK',ios:'iOS',android:'Android',ai:'AI',ar:'AR',vr:'VR',tv:'TV',id:'ID','2d':'2D','3d':'3D','4k':'4K','5g':'5G','360':'360°'};"
extra = """  Object.assign(WORDS_RU,{\n    accessibility:'Доступность',accessible:'Доступность',acupuncture:'Акупунктура',acute:'Острое',adaptive:'Адаптивный',ad:'Реклама',admin:'Администратор',ads:'Реклама',agriculture:'Сельское хозяйство',airplane:'Самолёт',airport:'Аэропорт',album:'Альбом',align:'Выравнивание',allergy:'Аллергия',allergies:'Аллергия',altitude:'Высота',ambulance:'Скорая помощь',anchor:'Якорь',announcement:'Объявление',approval:'Подтверждение',area:'Область',art:'Искусство',assignment:'Задание',assistant:'Помощник',attractions:'Достопримечательности',attribution:'Авторство',bakery:'Пекарня',balcony:'Балкон',ballot:'Голосование',barcode:'Штрихкод',bathroom:'Ванная',bathtub:'Ванна',beach:'Пляж',bedtime:'Сон',bike:'Велосипед',biotech:'Биотехнологии',blood:'Кровь',body:'Тело',bolt:'Молния',bomb:'Опасность',brand:'Бренд',breakfast:'Завтрак',broken:'Повреждено',browser:'Браузер',bug:'Ошибка',bungalow:'Бунгало',bus:'Автобус',cached:'Обновить',cake:'Торт',calculate:'Калькулятор',campaign:'Кампания',camping:'Кемпинг',capture:'Съёмка',cardio:'Кардио',cases:'Кейсы',casino:'Казино',cast:'Трансляция',castle:'Замок',celebration:'Праздник',center:'Центр',charger:'Зарядка',charging:'Зарядка',chess:'Шахматы',church:'Церковь',clinical:'Медицинский',cloudy:'Облачно',collections:'Коллекции',compare:'Сравнить',compass:'Компас',conditions:'Условия',confirmation:'Подтверждение',connect:'Подключение',connected:'Подключено',contract:'Договор',control:'Управление',cookie:'Куки',cooking:'Готовка',corporate:'Корпоративный',cottage:'Дом',crown:'Корона',cycle:'Цикл',date:'Дата',deck:'Терраса',detector:'Датчик',dining:'Питание',disabled:'Отключено',diversity:'Разнообразие',draft:'Черновик',drafts:'Черновики',electric:'Электрический',energy:'Энергия',exposure:'Экспозиция',festival:'Фестиваль',fitness:'Фитнес',food:'Еда',garden:'Сад',gas:'Топливо',grocery:'Продукты',health:'Здоровье',hiking:'Поход',hospital:'Больница',hour:'Час',inbox:'Входящие',landscape:'Пейзаж',laundry:'Стирка',library:'Библиотека',local:'Местный',luggage:'Багаж',mall:'Торговый центр',meds:'Лекарства',museum:'Музей',near:'Рядом',park:'Парк',parking:'Парковка',passport:'Паспорт',pet:'Питомец',pets:'Питомцы',pool:'Бассейн',restaurant:'Ресторан',road:'Дорога',room:'Комната',sailing:'Парусный спорт',scanner:'Сканер',screenshot:'Снимок экрана',shower:'Душ',smoke:'Дым',taxi:'Такси',toys:'Игрушки',traffic:'Движение',vacuum:'Пылесос',voice:'Голос',yard:'Двор',\n    left:'Влево',right:'Вправо',up:'Вверх',down:'Вниз',top:'Сверху',bottom:'Снизу',next:'Следующий',previous:'Предыдущий',off:'Выключено',on:'Включено',filled:'Заполненный',outline:'Контур',new:'Новый',small:'Маленький',large:'Большой',high:'Высокий',low:'Низкий',medium:'Средний',full:'Полный',empty:'Пустой',first:'Первый',last:'Последний',horizontal:'Горизонтальный',vertical:'Вертикальный',forward:'Вперёд',backward:'Назад',start:'Начало',end:'Конец',open:'Открыть',closed:'Закрыто',question:'Вопрос',plus:'Плюс',minus:'Минус',selected:'Выбрано',select:'Выбрать',searching:'Поиск',download:'Скачать',upload:'Загрузить'\n  });\n\n  const CATEGORY_FALLBACK_RU={\n    'Популярные иконки для презентаций':'Иконка',\n    'Элементы интерфейса':'Элемент интерфейса',\n    'Люди и соцсети':'Люди',\n    'Действия':'Действие',\n    'Общение и связь':'Связь',\n    'Изображения и фото':'Изображение',\n    'Бизнес и финансы':'Бизнес',\n    'Карты и места':'Место',\n    'Текст и форматирование':'Текст',\n    'Аудио и видео':'Медиа',\n    'Транспорт':'Транспорт',\n    'Занятия и досуг':'Досуг',\n    'Android и система':'Системная иконка',\n    'Техника и гаджеты':'Устройство',\n    'Безопасность':'Безопасность',\n    'Путешествия':'Путешествие',\n    'Дом и быт':'Дом',\n    'Умный дом':'Умный дом',\n    'Другие иконки':'Другая иконка'\n  };\n\n"""
if anchor not in rutext:
    raise SystemExit('ru-enhancements.js ACR anchor not found')
rutext = rutext.replace(anchor, extra + anchor, 1)
old_title = """  const betterTitle = name => {\n    if(RU_ICON_META[name]) return RU_ICON_META[name][0];\n    const tokens=name.split('_').filter(Boolean);\n    const parts=tokens.map(token=>WORDS_RU[token.toLowerCase()]||ACR[token.toLowerCase()]||null);\n    return parts.length && parts.every(Boolean) ? parts.join(' ') : englishTitle(name);\n  };"""
new_title = """  const betterTitle = (name,category='Другие иконки') => {\n    if(RU_ICON_META[name]) return RU_ICON_META[name][0];\n    const tokens=name.split('_').filter(Boolean);\n    const parts=[];\n    for(const token of tokens){\n      const low=token.toLowerCase();\n      const value=WORDS_RU[low]||ACR[low]||(/^\\d+(k|mp|fps)?$/i.test(token)?token.toUpperCase():null);\n      if(value && !parts.includes(value)) parts.push(value);\n    }\n    if(parts.some(part=>/[А-Яа-яЁё]/.test(part))) return parts.join(' ');\n    if(parts.length) return parts.join(' ');\n    return CATEGORY_FALLBACK_RU[category]||'Другая иконка';\n  };"""
if old_title not in rutext:
    raise SystemExit('ru-enhancements.js betterTitle block not found')
rutext = rutext.replace(old_title, new_title, 1)
rutext = rutext.replace("    icon.title=betterTitle(icon.name);", "    icon.title=betterTitle(icon.name,icon.category);", 1)
ru.write_text(rutext, encoding='utf-8')

# --- Cache bust and hide the technical English system name in markup too.
index = Path('index.html')
idx = index.read_text(encoding='utf-8')
idx = idx.replace('id="modal-system">search</p>', 'id="modal-system" hidden>search</p>')
idx = idx.replace('v=20260912-1', 'v=20260912-2')
index.write_text(idx, encoding='utf-8')

# Static safety assertions.
patched = app.read_text(encoding='utf-8')
assert 'const [minX=0,minY=0,sourceWidth=24,sourceHeight=24]' in patched
assert 'translate(${tx} ${ty}) scale(${sx} ${sy})' in patched
# Regression math for the exact class of Google SVG used by the reported broken export.
size=256; scale=0.60; inset=size*(1-scale)/2; min_x=0; min_y=-960; source_w=960; source_h=960
sx=(size*scale)/source_w; sy=(size*scale)/source_h
tx=inset-min_x*sx; ty=inset-min_y*sy
assert round(tx,1)==51.2 and round(ty,1)==204.8
print('export transform regression:', tx, ty, sx, sy)
