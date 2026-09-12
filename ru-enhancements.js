/* Better Russian labels and search vocabulary for the local Material Symbols catalog. */
(() => {
  const META = {
    payments:['Деньги','деньги финансы оплата платёж платежи'],paid:['Оплачено','оплачено деньги оплата платёж'],attach_money:['Деньги','деньги доллар финансы валюта'],currency_ruble:['Рубль','рубль деньги валюта'],currency_exchange:['Обмен валют','валюта обмен деньги курс'],account_balance_wallet:['Кошелёк','кошелёк деньги финансы'],savings:['Сбережения','копилка накопления деньги'],wallet:['Кошелёк','кошелёк деньги'],
    person:['Человек','человек сотрудник пользователь персона'],account_circle:['Профиль','профиль человек пользователь аккаунт'],badge:['Сотрудник','сотрудник бейдж пропуск человек'],groups:['Команда','команда коллектив сотрудники люди группа'],group:['Группа','группа команда люди'],supervisor_account:['Руководитель','руководитель начальник сотрудник команда'],engineering:['Инженерия','инженер инженерия строительство'],
    construction:['Строительство','строительство стройка инструменты'],architecture:['Архитектура','архитектура проектирование строительство'],foundation:['Фундамент','фундамент строительство'],apartment:['Здание','здание дом офис недвижимость'],factory:['Производство','завод производство промышленность'],
    bar_chart:['Столбчатая диаграмма','график диаграмма столбцы данные'],pie_chart:['Круговая диаграмма','график диаграмма круг доли'],analytics:['Аналитика','аналитика данные отчет график'],monitoring:['Мониторинг','мониторинг показатели график'],show_chart:['Линейный график','график линия динамика'],query_stats:['Статистика','статистика данные аналитика'],leaderboard:['Рейтинг','рейтинг лидеры диаграмма'],trending_down:['Снижение','снижение падение график'],
    article:['Статья','статья документ текст'],description:['Документ','документ файл текст'],draft:['Черновик','черновик документ'],contract:['Договор','договор контракт документ'],file_copy:['Копия файла','файл копия документ'],folder:['Папка','папка файлы документы'],notes:['Заметки','заметки текст'],receipt_long:['Квитанция','квитанция чек документ'],
    phone:['Телефон','телефон звонок связь'],call:['Звонок','телефон звонок связь'],smartphone:['Смартфон','смартфон телефон мобильный'],contact_phone:['Контактный телефон','контакт телефон связь'],mail:['Почта','почта письмо email'],email:['Почта','почта письмо email'],chat:['Чат','чат общение сообщения'],forum:['Обсуждение','форум обсуждение чат'],comment:['Комментарий','комментарий сообщение'],message:['Сообщение','сообщение чат письмо'],sms:['SMS','смс сообщение телефон'],support_agent:['Поддержка','поддержка оператор помощь'],
    image:['Изображение','изображение картинка фото'],photo:['Фото','фото фотография изображение'],camera:['Камера','камера фото'],camera_alt:['Камера','камера фото'],photo_camera:['Фотокамера','фото камера'],image_search:['Поиск по изображениям','поиск фото изображение'],palette:['Палитра','палитра цвета дизайн'],color_lens:['Цвета','цвет палитра дизайн'],crop:['Обрезать','обрезка фото изображение'],rotate_left:['Повернуть влево','поворот фото изображение'],rotate_right:['Повернуть вправо','поворот фото изображение'],
    restaurant:['Ресторан','ресторан еда кафе'],local_cafe:['Кафе','кафе кофе ресторан'],coffee:['Кофе','кофе чашка напиток'],local_bar:['Бар','бар напитки'],grocery:['Продукты','продукты еда магазин'],cake:['Торт','торт праздник еда'],
    bed:['Кровать','кровать спальня сон'],chair:['Стул','стул мебель'],kitchen:['Кухня','кухня дом'],bathroom:['Ванная','ванная дом'],shower:['Душ','душ ванная'],bathtub:['Ванна','ванна дом'],desk:['Рабочий стол','стол работа мебель'],cleaning_services:['Уборка','уборка чистота'],local_laundry_service:['Стиральная машина','стирка стиральная машина'],microwave:['Микроволновка','микроволновка кухня'],blender:['Блендер','блендер кухня'],water_drop:['Вода','вода капля'],
    medical_services:['Медицина','медицина врач помощь'],local_hospital:['Больница','больница медицина врач'],ambulance:['Скорая помощь','скорая помощь медицина автомобиль'],emergency:['Экстренная помощь','экстренная помощь опасность'],health_and_safety:['Здоровье и безопасность','здоровье медицина безопасность'],
    directions_car:['Автомобиль','машина автомобиль транспорт'],car_rental:['Аренда авто','аренда автомобиль машина'],local_taxi:['Такси','такси автомобиль'],directions_bus:['Автобус','автобус транспорт'],train:['Поезд','поезд транспорт'],tram:['Трамвай','трамвай транспорт'],subway:['Метро','метро транспорт'],flight:['Самолёт','самолёт полёт путешествие'],flight_takeoff:['Вылет','самолёт вылет'],flight_land:['Посадка','самолёт посадка'],local_shipping:['Доставка','доставка грузовик транспорт'],traffic:['Светофор','светофор дорога транспорт'],
    map:['Карта','карта местность'],navigation:['Навигация','навигация маршрут'],route:['Маршрут','маршрут дорога'],explore:['Компас','компас навигация'],place:['Место','место адрес точка'],location_on:['Место','место адрес геолокация'],pin_drop:['Метка на карте','метка карта точка'],hotel:['Отель','отель гостиница путешествие'],park:['Парк','парк природа'],museum:['Музей','музей культура'],
    computer:['Компьютер','компьютер техника'],laptop:['Ноутбук','ноутбук компьютер'],desktop_windows:['Монитор','монитор компьютер экран'],tablet:['Планшет','планшет техника'],watch:['Часы','часы устройство'],tv:['Телевизор','телевизор экран'],router:['Роутер','роутер интернет сеть wifi'],scanner:['Сканер','сканер документ'],smart_toy:['Робот','робот умный устройство'],
    wifi:['Wi-Fi','wifi вайфай интернет сеть'],wifi_off:['Wi-Fi выключен','wifi вайфай интернет сеть выключен'],bluetooth:['Bluetooth','bluetooth связь устройство'],cloud:['Облако','облако данные'],cloud_download:['Скачать из облака','облако скачать файл'],cloud_upload:['Загрузить в облако','облако загрузить файл'],backup:['Резервная копия','резервная копия данные'],storage:['Хранилище','хранилище данные'],memory:['Память','память устройство'],battery_full:['Батарея','батарея заряд'],battery_charging_full:['Батарея заряжается','батарея зарядка'],
    security:['Безопасность','безопасность защита'],shield:['Щит','щит безопасность защита'],vpn_key:['VPN-ключ','vpn ключ доступ'],password:['Пароль','пароль доступ безопасность'],fingerprint:['Отпечаток пальца','отпечаток палец безопасность'],privacy_tip:['Приватность','приватность безопасность'],verified_user:['Проверенный пользователь','проверка пользователь безопасность'],
    home_iot_device:['Устройство умного дома','умный дом устройство'],thermostat:['Термостат','термостат температура умный дом'],sensors:['Датчики','датчики сенсоры умный дом'],sensor_door:['Датчик двери','датчик дверь умный дом'],sensor_window:['Датчик окна','датчик окно умный дом'],doorbell:['Дверной звонок','звонок дверь умный дом'],nest_cam_indoor:['Камера в помещении','камера помещение дом'],nest_cam_outdoor:['Уличная камера','камера улица дом'],detector_smoke:['Датчик дыма','датчик дым безопасность'],
    fitness_center:['Фитнес','спорт фитнес тренировка'],sports_soccer:['Футбол','футбол спорт'],sports_basketball:['Баскетбол','баскетбол спорт'],sports_tennis:['Теннис','теннис спорт'],hiking:['Поход','поход прогулка туризм'],pool:['Бассейн','бассейн плавание спорт'],pets:['Питомцы','питомцы животные'],casino:['Казино','казино игра'],chess:['Шахматы','шахматы игра'],
    format_bold:['Жирный текст','жирный текст форматирование'],format_italic:['Курсив','курсив текст форматирование'],format_underlined:['Подчёркивание','подчеркнуть текст'],format_list_bulleted:['Маркированный список','список маркеры текст'],format_list_numbered:['Нумерованный список','список номера текст'],
    play_arrow:['Воспроизвести','воспроизвести пуск видео'],volume_up:['Громкость','громкость звук'],volume_off:['Без звука','звук громкость выключен'],mic:['Микрофон','микрофон звук запись'],mic_off:['Микрофон выключен','микрофон звук выключен'],headphones:['Наушники','наушники аудио'],movie:['Видео','видео фильм'],videocam:['Видеокамера','видео камера'],podcast:['Подкаст','подкаст аудио'],
    content_copy:['Копировать','копировать дублировать'],content_paste:['Вставить','вставить буфер'],content_cut:['Вырезать','вырезать ножницы'],attach_file:['Прикрепить файл','прикрепить файл скрепка'],login:['Войти','войти вход авторизация'],logout:['Выйти','выйти выход аккаунт']
  };

  const WORDS = {
    access:'Доступ',account:'Аккаунт',action:'Действие',activity:'Активность',add:'Добавить',alarm:'Будильник',alert:'Предупреждение',all:'Все',alt:'Альтернативный',analytics:'Аналитика',apartment:'Здание',apps:'Приложения',archive:'Архив',arrow:'Стрелка',article:'Статья',attach:'Прикрепить',audio:'Аудио',auto:'Авто',back:'Назад',backup:'Резервная копия',badge:'Сотрудник',balance:'Баланс',bar:'Столбцы',battery:'Батарея',bed:'Кровать',block:'Блокировать',book:'Книга',bookmark:'Закладка',border:'Граница',box:'Блок',brightness:'Яркость',brush:'Кисть',build:'Инструменты',business:'Бизнес',button:'Кнопка',calendar:'Календарь',call:'Звонок',camera:'Камера',cancel:'Отмена',card:'Карта',category:'Категория',cell:'Сотовый',chair:'Стул',chart:'График',chat:'Чат',check:'Готово',child:'Ребёнок',circle:'Круг',clean:'Очистить',cleaning:'Уборка',clock:'Часы',close:'Закрыть',cloud:'Облако',code:'Код',color:'Цвет',comment:'Комментарий',communication:'Связь',computer:'Компьютер',construction:'Строительство',contact:'Контакт',content:'Содержимое',copy:'Копировать',create:'Создать',credit:'Кредитная',crop:'Обрезать',currency:'Валюта',cut:'Вырезать',dark:'Тёмный',dashboard:'Панель',data:'Данные',delete:'Удалить',delivery:'Доставка',description:'Документ',desktop:'Компьютер',device:'Устройство',directions:'Направление',document:'Документ',done:'Готово',door:'Дверь',down:'Вниз',download:'Скачать',drag:'Перетащить',draw:'Рисовать',edit:'Редактировать',elderly:'Пожилой',email:'Почта',emergency:'Экстренный',engineering:'Инженерия',error:'Ошибка',event:'Событие',expand:'Развернуть',explore:'Исследовать',factory:'Производство',family:'Семья',favorite:'Избранное',file:'Файл',filled:'С заливкой',filter:'Фильтр',finance:'Финансы',fingerprint:'Отпечаток',first:'Первый',flag:'Флаг',flight:'Самолёт',folder:'Папка',food:'Еда',format:'Формат',forward:'Вперёд',foundation:'Фундамент',fullscreen:'Полный экран',game:'Игра',garage:'Гараж',grade:'Оценка',graph:'График',group:'Группа',hardware:'Оборудование',health:'Здоровье',help:'Помощь',hide:'Скрыть',history:'История',home:'Дом',hotel:'Отель',house:'Дом',image:'Изображение',info:'Информация',inventory:'Склад',key:'Ключ',keyboard:'Клавиатура',kitchen:'Кухня',language:'Язык',last:'Последний',layers:'Слои',left:'Влево',light:'Свет',line:'Линия',link:'Ссылка',list:'Список',location:'Место',lock:'Замок',login:'Вход',logout:'Выход',mail:'Почта',man:'Мужчина',map:'Карта',medical:'Медицина',menu:'Меню',message:'Сообщение',mic:'Микрофон',mobile:'Мобильный',money:'Деньги',monitor:'Монитор',mood:'Настроение',more:'Ещё',move:'Переместить',movie:'Видео',music:'Музыка',navigation:'Навигация',network:'Сеть',new:'Новый',next:'Следующий',note:'Заметка',notes:'Заметки',notification:'Уведомление',notifications:'Уведомления',off:'Выключен',on:'Включен',open:'Открыть',outline:'Контур',page:'Страница',palette:'Палитра',park:'Парк',password:'Пароль',pause:'Пауза',payment:'Платёж',payments:'Платежи',people:'Люди',person:'Человек',phone:'Телефон',photo:'Фото',place:'Место',play:'Воспроизвести',policy:'Правила',power:'Питание',print:'Печать',privacy:'Приватность',public:'Мир',publish:'Опубликовать',radio:'Радио',receipt:'Чек',record:'Запись',refresh:'Обновить',remove:'Убрать',reply:'Ответить',report:'Отчёт',restaurant:'Ресторан',restore:'Восстановить',right:'Вправо',rotate:'Повернуть',route:'Маршрут',save:'Сохранить',scan:'Сканировать',school:'Обучение',screen:'Экран',search:'Поиск',security:'Безопасность',select:'Выбрать',send:'Отправить',settings:'Настройки',share:'Поделиться',shield:'Щит',shopping:'Покупки',signal:'Сигнал',smart:'Умный',speaker:'Динамик',sports:'Спорт',star:'Звезда',stop:'Стоп',storage:'Хранилище',store:'Магазин',sync:'Синхронизация',system:'Система',table:'Таблица',tablet:'Планшет',task:'Задача',terminal:'Терминал',text:'Текст',thermostat:'Термостат',time:'Время',timer:'Таймер',train:'Поезд',transport:'Транспорт',travel:'Путешествия',tune:'Настройка',undo:'Отменить',up:'Вверх',update:'Обновить',upload:'Загрузить',user:'Пользователь',verified:'Подтверждено',video:'Видео',view:'Просмотр',visibility:'Видимость',volume:'Громкость',wallet:'Кошелёк',warning:'Внимание',water:'Вода',weather:'Погода',wifi:'Wi-Fi',window:'Окно',woman:'Женщина',work:'Работа',zoom:'Масштаб'
  };

  const GROUPS = {
    'деньги финансы оплата платёж платежи рубль валюта банк кошелек кошелёк':['payments','attach_money','paid','savings','account_balance','account_balance_wallet','wallet','credit_card','currency_ruble','currency_exchange'],
    'сотрудник сотрудники человек люди пользователь персона коллега коллеги':['person','badge','account_circle','groups','group','supervisor_account','diversity','contacts'],
    'команда коллектив группа':['groups','group','diversity','supervisor_account','people'],
    'документ документы файл договор контракт бумага':['description','article','draft','contract','file_copy','folder','note','receipt_long'],
    'график диаграмма статистика аналитика данные отчет отчёт показатели':['bar_chart','pie_chart','analytics','monitoring','show_chart','trending_up','trending_down','query_stats','leaderboard'],
    'строительство стройка здание дом проектирование архитектура инженер':['construction','engineering','architecture','foundation','apartment','home_work','factory'],
    'телефон звонок связь мобильный смартфон':['phone','call','smartphone','contact_phone','phone_iphone','phone_android'],
    'почта письмо email':['mail','email','inbox','drafts','mark_email_read','alternate_email'],
    'чат сообщение общение комментарий':['chat','forum','comment','message','sms'],
    'фото фотография камера изображение картинка':['image','photo','camera','camera_alt','photo_camera','image_search','collections'],
    'видео фильм ролик':['movie','video','videocam','video_library','play_arrow','live_tv'],
    'звук музыка аудио микрофон наушники':['music','audio','mic','headphones','speaker','volume','podcast'],
    'машина автомобиль авто транспорт':['car','directions_car','car_rental','local_taxi','traffic','garage','car_repair'],
    'самолет самолёт полет полёт аэропорт путешествие':['flight','flight_takeoff','flight_land','airplane','airport_shuttle','luggage','travel'],
    'карта адрес место геолокация маршрут навигация':['map','location','place','navigation','route','pin_drop','explore'],
    'безопасность защита пароль доступ замок ключ':['security','shield','lock','key','password','fingerprint','privacy','vpn'],
    'компьютер ноутбук монитор техника устройство':['computer','laptop','desktop','monitor','device','hardware','keyboard','mouse'],
    'интернет сеть wifi вайфай роутер':['wifi','network','router','signal','cellular'],
    'облако данные хранение резервная копия':['cloud','storage','backup','data'],
    'дом квартира жилье жильё мебель':['home','house','apartment','bed','chair','kitchen','bathroom','living'],
    'умный дом датчик сенсор':['home_iot','sensor','thermostat','nest_','doorbell','detector'],
    'еда ресторан кафе кофе продукты':['restaurant','local_cafe','coffee','food','grocery','dining','cake'],
    'медицина здоровье врач больница скорая помощь':['medical','health','hospital','ambulance','emergency'],
    'спорт фитнес тренировка футбол баскетбол теннис':['sports','fitness','soccer','basketball','tennis','pool'],
    'настройки параметры регулировка':['settings','tune','adjust'],
    'скачать загрузить файл импорт экспорт':['download','upload','file_download','file_upload','cloud_download','cloud_upload'],
    'редактировать изменить правка карандаш':['edit','create','draw'],
    'удалить корзина убрать':['delete','remove','trash'],
    'помощь вопрос поддержка':['help','support','live_help','support_agent'],
    'время часы таймер расписание календарь':['time','schedule','clock','timer','calendar','event'],
    'идея лампочка мысль':['lightbulb','idea'],
    'галочка готово подтверждение проверить':['check','done','verified'],
    'стрелка вперед вперёд назад влево вправо вверх вниз':['arrow','chevron','forward','back','left','right','up','down']
  };

  Object.assign(WORDS_RU,{
    accessibility:'Доступность',accessible:'Доступность',acupuncture:'Акупунктура',acute:'Острое',adaptive:'Адаптивный',ad:'Реклама',admin:'Администратор',ads:'Реклама',agriculture:'Сельское хозяйство',airplane:'Самолёт',airport:'Аэропорт',album:'Альбом',align:'Выравнивание',allergy:'Аллергия',allergies:'Аллергия',altitude:'Высота',ambulance:'Скорая помощь',anchor:'Якорь',announcement:'Объявление',approval:'Подтверждение',area:'Область',art:'Искусство',assignment:'Задание',assistant:'Помощник',attractions:'Достопримечательности',attribution:'Авторство',bakery:'Пекарня',balcony:'Балкон',ballot:'Голосование',barcode:'Штрихкод',bathroom:'Ванная',bathtub:'Ванна',beach:'Пляж',bedtime:'Сон',bike:'Велосипед',biotech:'Биотехнологии',blood:'Кровь',body:'Тело',bolt:'Молния',bomb:'Опасность',brand:'Бренд',breakfast:'Завтрак',broken:'Повреждено',browser:'Браузер',bug:'Ошибка',bungalow:'Бунгало',bus:'Автобус',cached:'Обновить',cake:'Торт',calculate:'Калькулятор',campaign:'Кампания',camping:'Кемпинг',capture:'Съёмка',cardio:'Кардио',cases:'Кейсы',casino:'Казино',cast:'Трансляция',castle:'Замок',celebration:'Праздник',center:'Центр',charger:'Зарядка',charging:'Зарядка',chess:'Шахматы',church:'Церковь',clinical:'Медицинский',cloudy:'Облачно',collections:'Коллекции',compare:'Сравнить',compass:'Компас',conditions:'Условия',confirmation:'Подтверждение',connect:'Подключение',connected:'Подключено',contract:'Договор',control:'Управление',cookie:'Куки',cooking:'Готовка',corporate:'Корпоративный',cottage:'Дом',crown:'Корона',cycle:'Цикл',date:'Дата',deck:'Терраса',detector:'Датчик',dining:'Питание',disabled:'Отключено',diversity:'Разнообразие',draft:'Черновик',drafts:'Черновики',electric:'Электрический',energy:'Энергия',exposure:'Экспозиция',festival:'Фестиваль',fitness:'Фитнес',food:'Еда',garden:'Сад',gas:'Топливо',grocery:'Продукты',health:'Здоровье',hiking:'Поход',hospital:'Больница',hour:'Час',inbox:'Входящие',landscape:'Пейзаж',laundry:'Стирка',library:'Библиотека',local:'Местный',luggage:'Багаж',mall:'Торговый центр',meds:'Лекарства',museum:'Музей',near:'Рядом',park:'Парк',parking:'Парковка',passport:'Паспорт',pet:'Питомец',pets:'Питомцы',pool:'Бассейн',restaurant:'Ресторан',road:'Дорога',room:'Комната',sailing:'Парусный спорт',scanner:'Сканер',screenshot:'Снимок экрана',shower:'Душ',smoke:'Дым',taxi:'Такси',toys:'Игрушки',traffic:'Движение',vacuum:'Пылесос',voice:'Голос',yard:'Двор',
    left:'Влево',right:'Вправо',up:'Вверх',down:'Вниз',top:'Сверху',bottom:'Снизу',next:'Следующий',previous:'Предыдущий',off:'Выключено',on:'Включено',filled:'Заполненный',outline:'Контур',new:'Новый',small:'Маленький',large:'Большой',high:'Высокий',low:'Низкий',medium:'Средний',full:'Полный',empty:'Пустой',first:'Первый',last:'Последний',horizontal:'Горизонтальный',vertical:'Вертикальный',forward:'Вперёд',backward:'Назад',start:'Начало',end:'Конец',open:'Открыть',closed:'Закрыто',question:'Вопрос',plus:'Плюс',minus:'Минус',selected:'Выбрано',select:'Выбрать',searching:'Поиск',download:'Скачать',upload:'Загрузить'
  });

  const CATEGORY_FALLBACK_RU={
    'Популярные иконки для презентаций':'Иконка',
    'Элементы интерфейса':'Элемент интерфейса',
    'Люди и соцсети':'Люди',
    'Действия':'Действие',
    'Общение и связь':'Связь',
    'Изображения и фото':'Изображение',
    'Бизнес и финансы':'Бизнес',
    'Карты и места':'Место',
    'Текст и форматирование':'Текст',
    'Аудио и видео':'Медиа',
    'Транспорт':'Транспорт',
    'Занятия и досуг':'Досуг',
    'Android и система':'Системная иконка',
    'Техника и гаджеты':'Устройство',
    'Безопасность':'Безопасность',
    'Путешествия':'Путешествие',
    'Дом и быт':'Дом',
    'Умный дом':'Умный дом',
    'Другие иконки':'Другая иконка'
  };

  const ACR = {wifi:'Wi-Fi',usb:'USB',qr:'QR',hd:'HD',hdr:'HDR',vpn:'VPN',sms:'SMS',nfc:'NFC',gps:'GPS',api:'API',apk:'APK',ios:'iOS',android:'Android',ai:'AI',ar:'AR',vr:'VR',tv:'TV',id:'ID','2d':'2D','3d':'3D','4k':'4K','5g':'5G','360':'360°'};
  const human = token => ACR[token.toLowerCase()] || (/^\d+(k|mp|fps)$/i.test(token) ? token.toUpperCase() : token.charAt(0).toUpperCase()+token.slice(1));
  const englishTitle = name => name.split('_').filter(Boolean).map(human).join(' ');
  const betterTitle = (name,category='Другие иконки') => {
    if(RU_ICON_META[name]) return RU_ICON_META[name][0];
    const tokens=name.split('_').filter(Boolean);
    const parts=[];
    for(const token of tokens){
      const low=token.toLowerCase();
      const value=WORDS_RU[low]||ACR[low]||(/^\d+(k|mp|fps)?$/i.test(token)?token.toUpperCase():null);
      if(value && !parts.includes(value)) parts.push(value);
    }
    if(parts.some(part=>/[А-Яа-яЁё]/.test(part))) return parts.join(' ');
    if(parts.length) return parts.join(' ');
    return CATEGORY_FALLBACK_RU[category]||'Другая иконка';
  };
  const betterExtraKeywords = name => Object.entries(SEARCH_GROUPS).filter(([,parts])=>parts.some(part=>name===part||name.startsWith(part+'_')||name.includes(part))).map(([words])=>words).join(' ');
  const tokenKeywords = name => name.split('_').map(token=>WORDS_RU[token.toLowerCase()]||ACR[token.toLowerCase()]||'').filter(Boolean).join(' ');
  const patchIcon = icon => {
    icon.title=betterTitle(icon.name,icon.category);
    icon.keywords=`${RU_ICON_META[icon.name]?.[1]||''} ${betterExtraKeywords(icon.name)} ${tokenKeywords(icon.name)} ${icon.name.replaceAll('_',' ')} ${icon.title}`.replace(/\s+/g,' ').trim();
    return icon;
  };

  Object.assign(RU_ICON_META,META);
  Object.assign(WORDS_RU,WORDS);
  Object.assign(SEARCH_GROUPS,GROUPS);
  translatedTitle=betterTitle;
  extraKeywords=betterExtraKeywords;
  normalizedCategories.forEach(category=>category.icons.forEach(patchIcon));
  const originalLoadOfficialIcons=loadOfficialIcons;
  loadOfficialIcons=async function(){const result=await originalLoadOfficialIcons();result.forEach(patchIcon);return result};
})();