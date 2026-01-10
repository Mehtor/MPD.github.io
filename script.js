// Состояние приложения
const state = {
    screen: 'setup',
    flowType: 0,
    questionNow: 1,
    previousQuestion: 0,
    familyID: 1,
    pageID: 0,
    canContinueScrolling: false,
    collection: {},
    settings: {
        useWiFi: true,
        wifiRealTimeSearch: true,
        checkForUpdates: true,
        autoUpdate: false,
        debugMode: true,
        sleepingMode: true,
        autoOff: true,
        tftReconnect: true
    },
    sleepingMode: false,
    lastUsedTime: Date.now()
};

// Данные определителя
const data = {
    goto_if_true: {
        1: 2, 2: 8, 3: 4, 4: -9, 5: 1055, 6: 1059, 7: -10,
        8: 9, 9: 114, 10: 20, 11: 12, 12: 1085, 13: 1145,
        14: 1370, 15: 16, 16: 1074, 17: -212, 18: 19,
        19: -452, 20: 1335, 21: 1272, 22: 1406, 23: 24,
        24: 25, 25: 1534, 26: -716, 27: 1206, 28: 29,
        29: 1460, 30: 31, 31: 1486, 32: -629, 33: 34,
        34: 1384, 35: 1267, 36: 1387, 37: -346, 38: -41,
        39: -343, 40: 1304, 41: 42, 42: 1526, 43: 1511,
        44: 45, 45: -655, 46: -652, 47: 48, 48: 1398,
        49: 1432, 50: 51, 51: 1167, 52: -351, 53: 1205,
        54: 55, 55: 1449, 56: -537, 57: 58, 58: -654,
        59: 1427, 60: 61, 61: 1435, 62: 1508, 63: 1486,
        64: 65, 65: -544, 66: -543, 67: 1447, 68: -549,
        69: 1369, 70: 71, 71: 1295, 72: -42, 73: -38,
        74: 75, 75: 1361, 76: 1364, 77: -483, 78: 1366,
        79: 1226, 80: 82, 81: -352, 82: -523, 83: -350,
        84: -169, 85: -173, 86: 87, 87: 1153, 88: -168,
        89: -39, 90: 91, 91: 92, 92: -387, 93: -385,
        94: -245, 95: 1202, 96: 1226, 97: 1199, 98: 1147,
        99: -44, 100: 101, 101: 102, 102: 103, 103: -45,
        104: -490, 105: -225, 106: 107, 107: 1076, 108: -493,
        109: -37, 110: -43, 111: 1507, 112: -534, 113: 1404,
        114: -291, 115: 1267, 116: 117, 117: -460, 118: 1170,
        119: 1389, 120: 121, 121: -26, 122: 123, 123: 124,
        124: 1335, 125: 128, 126: 1177, 127: 1189, 128: -540,
        129: 130, 130: -539, 131: -459, 132: 1347, 133: -453,
        134: -305, 135: 1395, 136: -599, 137: 1376, 138: -480,
        139: 1381, 140: 141, 141: -518, 142: 1298, 143: 144,
        144: -353, 145: -463, 146: 147, 147: 1177, 148: 1189,
        149: 150, 150: -458, 151: 152, 152: 1304, 153: -480
    },
    
    goto_if_false: {
        1: 120, 2: 3, 3: 5, 4: -20, 5: 6, 6: 7, 7: 1049,
        8: 98, 9: 10, 10: 11, 11: 13, 12: 1127, 13: 14,
        14: 15, 15: 17, 16: 1072, 17: 18, 18: 1216, 19: -493,
        20: 21, 21: 22, 22: 23, 23: 26, 24: 1524, 25: -670,
        26: 27, 27: 28, 28: 30, 29: 1451, 30: 33, 31: 32,
        32: -630, 33: 41, 34: 35, 35: 36, 36: 37, 37: 38,
        38: 39, 39: 40, 40: 1247, 41: 54, 42: 43, 43: 44,
        44: 47, 45: 46, 46: -564, 47: 50, 48: 49, 49: 1529,
        50: 52, 51: 1170, 52: 53, 53: -215, 54: 56, 55: -522,
        56: 57, 57: 69, 58: 59, 59: 60, 60: 62, 61: -538,
        62: 63, 63: 64, 64: 67, 65: 66, 66: 1443, 67: 68,
        68: 1479, 69: 70, 70: 74, 71: 72, 72: 73, 73: -40,
        74: 84, 75: 76, 76: 77, 77: 78, 78: 79, 79: 80,
        80: 81, 81: 1294, 82: 83, 83: 1424, 84: 85, 85: 86,
        86: 90, 87: 83, 88: 89, 89: 1149, 90: 95, 91: 93,
        92: -339, 93: 94, 94: 1216, 95: 96, 96: 97, 97: -446,
        98: 99, 99: 100, 100: 106, 101: -293, 102: 104, 103: 1244,
        104: 105, 105: -34, 106: 111, 107: 108, 108: 109, 109: 110,
        110: -452, 111: 112, 112: 113, 113: -279, 114: 115, 115: 116,
        116: 118, 117: -605, 118: 119, 119: 1247, 120: 122, 121: 1062,
        122: 146, 123: 143, 124: 125, 125: 126, 126: 127, 127: -207,
        128: 129, 129: 140, 130: 131, 131: 132, 132: 133, 133: 134,
        134: 135, 135: 136, 136: 137, 137: 138, 138: 139, 139: 1427,
        140: 142, 141: 1516, 142: 1432, 143: 145, 144: -469, 145: 1304,
        146: 149, 147: 148, 148: -207, 149: 151, 150: -540, 151: 1198,
        152: 153, 153: 1377
    },
    
    questions_true: [
        "Листья, спороносные и бесплодные, все одинаковые",
        "Листья перисторассеченные с перистораздельными долями",
        "Спороносные листья резко отличаются от бесплодных",
        "Спорангии собраны в округлые кучки",
        "Листья дважды-перистораздельные",
        "Корневище толстое, короткое",
        "Листья сидят пучком на корневище",
        "Рост растения 10-30 см",
        "Спорангии с вздутым покрывалом",
        "Растение встречается в затененных местах"
    ],
    
    questions_false: [
        "Спороносные листья резко отличаются от бесплодных",
        "Листья цельные или слабораздельные",
        "Спороносные и бесплодные листья сходны",
        "Спорангии собраны в линейные сорусы",
        "Листья простые или слабораздельные",
        "Корневище тонкое, ползучее",
        "Листья расположены поодиночке",
        "Рост растения более 50 см",
        "Спорангии без покрывала",
        "Растение встречается на открытых местах"
    ],
    
    resultText: {
        1: {
            title: "Пузырник ломкий",
            pages: [
                "Спорангии собраны в округлые кучки, расположенные по середине боковых жилок, покрытые вздутым покрывалом яйцевидной формы, имеющим вид колпачка, пузыря. У зрелых кучек покрывало сморщивается, а затем исчезает.",
                "Листья дважды-перистораздельные, в очертании продолговатоланцетные, с тонкими буроватыми черешками. Корневище толстое, короткое, листья сидят на нем пучком.",
                "Рост 10-30 см. Споры в июне-августе. По облесенным оврагам, затененным откосам, скалам, на известковой почве. Небольшой нежный папоротник, весьма ломкий.",
                "Имеет очень широкое распространение: от Гренландии до Новой Зеландии. Научное название Cystopteris происходит от греческих слов kystis - «пузырь» и pteris - «папоротник».",
                "Молодые листья обладают запахом горького миндаля. Споры содержат синильную кислоту. Растение используется в народной медицине с осторожностью."
            ]
        },
        2: {
            title: "Страусопер",
            pages: [
                "Спорангии собраны в кучки, расположенные на особых спороносных листьях, по своей величине и форме резко отличающихся от бесплодных.",
                "Края сегментов пластинки спороносного листа свернуты до середины жилки. Бесплодные листья значительно крупнее спороносных, дважды-перистые.",
                "Толстое корневище с подземными ползучими побегами. Рост 60-100 см. Споры в июле и августе. По сырым лесам.",
                "Название происходит от сходства плодущих листьев с пером страуса. Видовое название происходит от латинских слов filix - «папоротник».",
                "Может служить декоративным растением. Выдерживает пересадку в сады и парки. Растение ядовитое для скота (кроме корневищ)."
            ]
        },
        3: {
            title: "Щитовник болотный",
            pages: [
                "Спорангии собраны в кучки, расположенные в 2 ряда между жилкой и завороченным краем листа.",
                "Покрывало почковидной формы имеется в молодости, впоследствии отпадает. Листья с длинными ломкими черешками, дважды-перистые.",
                "Корневище тонкое, ползучее, черноватого цвета. Рост 30-60 см. Споры в июле-августе.",
                "По болотам, влажным кустарникам, лугам. Научное название Thelypteris происходит от греческого слова thelis - «женский».",
                "Корневища вместе с корнями используются как составная часть при приготовлении субстрата для культуры оранжерейных растений."
            ]
        },
        4: {
            title: "Щитовник мужской",
            pages: [
                "Спорангии собраны в кучки округлой формы, расположенные в два ряда по бокам средней жилки, всегда с заметными покрывалами.",
                "В нижней части черешка проходят 5-8 сосудистых пучков. Листья перисторассеченные с перистораздельными долями.",
                "Листья на коротких черешках, густо покрытых буроватыми чешуйками. Рост 50-100 см. Споры в июне и июле.",
                "По лиственным лесам. Научное название рода Dryopteris происходит от греческих слов drys - «дуб» и pteris - «папоротник».",
                "Верхняя часть собранного осенью корневища употребляется в медицине как глистогонное средство. Корневище ядовито!"
            ]
        }
    }
};

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    simulateLoading();
});

function initializeApp() {
    // Загрузка состояния из localStorage
    const savedState = localStorage.getItem('plantIdentifierState');
    if (savedState) {
        try {
            const parsedState = JSON.parse(savedState);
            Object.assign(state, parsedState);
        } catch(e) {
            console.error('Ошибка загрузки состояния:', e);
        }
    }
    
    // Загрузка коллекции
    const savedCollection = localStorage.getItem('plantCollection');
    if (savedCollection) {
        try {
            state.collection = JSON.parse(savedCollection);
        } catch(e) {
            console.error('Ошибка загрузки коллекции:', e);
        }
    }
    
    updateUI();
}

function setupEventListeners() {
    // Главный экран
    document.getElementById('start-work').addEventListener('click', function() {
        showScreen('process');
    });
    
    document.getElementById('settings').addEventListener('click', function() {
        showScreen('settings');
    });
    
    document.getElementById('library').addEventListener('click', function() {
        showScreen('library');
    });
    
    // Экран определения
    document.querySelector('.true-section').addEventListener('click', function() {
        answerQuestion(1);
    });
    
    document.querySelector('.false-section').addEventListener('click', function() {
        answerQuestion(0);
    });
    
    document.getElementById('back-btn').addEventListener('click', function() {
        answerQuestion(2);
    });
    
    // Экран результата
    document.getElementById('result-prev').addEventListener('click', showPrevPage);
    document.getElementById('result-next').addEventListener('click', showNextPage);
    document.getElementById('result-save').addEventListener('click', toggleSavePlant);
    
    // Экран настроек
    document.getElementById('settings-back').addEventListener('click', function() {
        if (state.pageID === 0) {
            showScreen('setup');
        } else {
            state.pageID--;
            updateSettingsScreen();
        }
    });
    
    document.getElementById('settings-next').addEventListener('click', function() {
        state.pageID++;
        updateSettingsScreen();
    });
    
    // Экран библиотеки
    document.getElementById('library-back').addEventListener('click', function() {
        if (state.pageID === 0) {
            showScreen('setup');
        } else {
            state.pageID--;
            updateLibraryScreen();
        }
    });
    
    document.getElementById('library-next').addEventListener('click', function() {
        state.pageID++;
        updateLibraryScreen();
    });
    
    // Кнопка питания
    document.getElementById('power-btn').addEventListener('click', function() {
        if (state.sleepingMode) {
            wakeUp();
        } else {
            showNotification('Удерживайте для выключения', 3000);
            // Имитация долгого нажатия
            setTimeout(function() {
                if (confirm('Выключить систему?')) {
                    SystemShutdown();
                }
            }, 3000);
        }
    });
    
    // Автоматическое выключение при бездействии
    setInterval(function() {
        if (state.settings.sleepingMode && !state.sleepingMode && 
            Date.now() - state.lastUsedTime > 180000) {
            showScreen('sleep');
            state.sleepingMode = true;
        }
    }, 60000);
    
    // Обновление индикатора WiFi
    setInterval(updateWiFiIndicator, 30000);
}

// Функция показа экрана
function showScreen(screenName) {
    state.screen = screenName;
    state.lastUsedTime = Date.now();
    
    // Скрыть все экраны
    const screens = document.querySelectorAll('.screen');
    screens.forEach(function(screen) {
        screen.style.display = 'none';
    });
    
    // Показать выбранный экран
    const screenElement = document.getElementById(screenName + '-screen');
    if (screenElement) {
        screenElement.style.display = 'flex';
    }
    
    // Обновить UI для экрана
    switch(screenName) {
        case 'setup':
            updateSetupScreen();
            break;
        case 'process':
            updateProcessScreen();
            break;
        case 'result':
            updateResultScreen();
            break;
        case 'settings':
            updateSettingsScreen();
            break;
        case 'library':
            updateLibraryScreen();
            break;
        case 'sleep':
            updateSleepScreen();
            break;
    }
    
    // Сохранить состояние
    saveState();
}

function simulateLoading() {
    const progressBar = document.getElementById('loading-progress');
    let progress = 0;
    
    const interval = setInterval(function() {
        progress += 5;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            // Показать уведомление об обновлении
            setTimeout(function() {
                showNotification('Система готова', 2000);
            }, 500);
        }
    }, 100);
}

function updateSetupScreen() {
    // Обновить индикатор WiFi
    updateWiFiIndicator();
}

function updateProcessScreen() {
    // Сбросить состояние при начале новой работы
    if (state.questionNow === 1) {
        state.flowType = 0;
        state.previousQuestion = 0;
        state.familyID = 1;
    }
    
    // Обновить номер вопроса
    document.getElementById('question-number').textContent = state.questionNow;
    
    // Обновить тип потока
    document.getElementById('flow-type').textContent = 
        state.flowType === 0 ? 'Основной поток' : 'Видовой поток';
    
    // Обновить текст вопросов
    const questionIndex = (state.questionNow - 1) % data.questions_true.length;
    document.getElementById('question-true').textContent = 
        data.questions_true[questionIndex];
    document.getElementById('question-false').textContent = 
        data.questions_false[questionIndex];
    
    // Подсветить кнопку "Назад" красным для первого вопроса
    const backBtn = document.getElementById('back-btn');
    if (state.questionNow === 1 && state.flowType === 0) {
        backBtn.style.color = '#ff0000';
    } else {
        backBtn.style.color = '#e0de97';
    }
}

function answerQuestion(answer) {
    state.lastUsedTime = Date.now();
    
    if (answer === 2) { // Кнопка "Назад"
        if (state.questionNow === 1) {
            if (state.flowType === 0) {
                showScreen('setup');
                return;
            } else {
                changeFlow(0);
                return;
            }
        }
        
        // Возврат к предыдущему вопросу
        state.questionNow = state.previousQuestion;
        showScreen('process');
        return;
    }
    
    // Сохраняем предыдущий вопрос
    state.previousQuestion = state.questionNow;
    
    // Определяем следующий вопрос
    if (answer === 1) { // Ответ "Да"
        state.questionNow = data.goto_if_true[state.questionNow] || 1;
    } else if (answer === 0) { // Ответ "Нет"
        state.questionNow = data.goto_if_false[state.questionNow] || 1;
    }
    
    // Проверяем результат
    if (state.questionNow < 0) {
        // Показать результат
        showResult(Math.abs(state.questionNow));
    } else if (state.questionNow >= 1000) {
        // Переход к видовому определителю
        state.familyID = state.questionNow - 1049;
        changeFlow(1);
    } else {
        // Следующий вопрос
        showScreen('process');
    }
    
    saveState();
}

function changeFlow(toSpecies) {
    state.flowType = toSpecies ? 1 : 0;
    
    if (toSpecies) {
        showNotification('Переход к видовому определителю', 1500);
        state.questionNow = 1;
    } else {
        showNotification('Возврат к основному потоку', 1500);
    }
    
    setTimeout(function() {
        showScreen('process');
    }, 1500);
}

function showResult(resultId) {
    state.screen = 'result';
    state.pageID = 0;
    
    // Обновить заголовок и текст результата
    const result = data.resultText[resultId] || data.resultText[1];
    document.getElementById('result-title').textContent = result.title;
    
    // Очистить предыдущие страницы
    for (let i = 0; i < 5; i++) {
        const page = document.getElementById('result-page-' + i);
        if (page) {
            page.style.display = 'none';
            page.querySelector('.result-text').textContent = 
                result.pages[i] || 'Нет описания';
        }
    }
    
    // Показать первую страницу
    const firstPage = document.getElementById('result-page-0');
    if (firstPage) {
        firstPage.style.display = 'block';
    }
    
    // Обновить индикатор коллекции
    updateCollectionIndicator(resultId);
    
    // Обновить кнопки навигации
    updateResultNavigation(result.pages.length);
    
    showScreen('result');
}

function updateResultScreen() {
    const resultId = Math.abs(state.questionNow);
    const result = data.resultText[resultId] || data.resultText[1];
    
    // Скрыть все страницы
    for (let i = 0; i < 5; i++) {
        const page = document.getElementById('result-page-' + i);
        if (page) page.style.display = 'none';
    }
    
    // Показать текущую страницу
    const currentPage = document.getElementById('result-page-' + state.pageID);
    if (currentPage) {
        currentPage.style.display = 'block';
    }
    
    // Обновить кнопки навигации
    updateResultNavigation(result.pages.length);
    
    // Обновить индикатор коллекции
    updateCollectionIndicator(resultId);
}

function updateCollectionIndicator(resultId) {
    const indicator = document.getElementById('collection-indicator');
    const countElement = document.getElementById('collection-count');
    const saveBtn = document.getElementById('result-save');
    
    const count = state.collection[resultId] || 0;
    
    if (count > 0) {
        indicator.style.display = 'flex';
        countElement.textContent = count;
        saveBtn.innerHTML = '<i class="fas fa-save"></i><span>Добавить</span>';
    } else {
        indicator.style.display = 'none';
        saveBtn.innerHTML = '<i class="fas fa-save"></i><span>Сохранить</span>';
    }
}

function updateResultNavigation(totalPages) {
    const prevBtn = document.getElementById('result-prev');
    const nextBtn = document.getElementById('result-next');
    
    // Кнопка "Назад"
    prevBtn.disabled = state.pageID === 0;
    prevBtn.innerHTML = state.pageID === 0 ? 
        '<i class="fas fa-arrow-left"></i>' : 
        '<i class="fas fa-chevron-left"></i>';
    
    // Кнопка "Дальше"
    nextBtn.disabled = state.pageID >= totalPages - 1 || totalPages <= 1;
    state.canContinueScrolling = !nextBtn.disabled;
}

function showPrevPage() {
    if (state.pageID > 0) {
        state.pageID--;
        updateResultScreen();
    }
}

function showNextPage() {
    const resultId = Math.abs(state.questionNow);
    const result = data.resultText[resultId] || data.resultText[1];
    
    if (state.pageID < result.pages.length - 1) {
        state.pageID++;
        updateResultScreen();
    }
}

function toggleSavePlant() {
    const resultId = Math.abs(state.questionNow);
    
    if (!state.collection[resultId]) {
        state.collection[resultId] = 0;
    }
    
    state.collection[resultId]++;
    
    // Сохранить в localStorage
    localStorage.setItem('plantCollection', JSON.stringify(state.collection));
    
    // Обновить индикатор
    updateCollectionIndicator(resultId);
    
    showNotification('Растение сохранено в библиотеку', 2000);
}

function updateSettingsScreen() {
    // Обновить список настроек
    const settingsList = document.querySelector('.settings-list');
    settingsList.innerHTML = '';
    
    const settingsArray = [
        { id: 'wifi', name: 'Use WiFi', value: state.settings.useWiFi },
        { id: 'wifi-search', name: 'WiFi Real Time Search', value: state.settings.wifiRealTimeSearch },
        { id: 'updates', name: 'Check for Updates', value: state.settings.checkForUpdates },
        { id: 'auto-update', name: 'Auto Update', value: state.settings.autoUpdate },
        { id: 'debug', name: 'Debug Mode', value: state.settings.debugMode },
        { id: 'sleep', name: 'Sleeping Mode', value: state.settings.sleepingMode },
        { id: 'auto-off', name: 'Auto Off', value: state.settings.autoOff },
        { id: 'tft-reconnect', name: 'TFT Reconnect', value: state.settings.tftReconnect }
    ];
    
    // Показать только 6 настроек на страницу
    const startIndex = state.pageID * 6;
    const endIndex = Math.min(startIndex + 6, settingsArray.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        const setting = settingsArray[i];
        const item = document.createElement('div');
        item.className = 'setting-item';
        item.setAttribute('data-index', i);
        
        item.innerHTML = `
            <span class="setting-name">${setting.name}</span>
            <div class="toggle-switch">
                <input type="checkbox" id="${setting.id}-toggle" ${setting.value ? 'checked' : ''}>
                <label for="${setting.id}-toggle"></label>
            </div>
        `;
        
        // Добавить обработчик клика
        const toggle = item.querySelector('input');
        toggle.addEventListener('change', function() {
            updateSetting(i, this.checked);
        });
        
        settingsList.appendChild(item);
    }
    
    // Обновить кнопки навигации
    const nextBtn = document.getElementById('settings-next');
    nextBtn.disabled = endIndex >= settingsArray.length;
}

function updateSetting(index, value) {
    const settingsArray = [
        'useWiFi', 'wifiRealTimeSearch', 'checkForUpdates', 
        'autoUpdate', 'debugMode', 'sleepingMode', 'autoOff', 'tftReconnect'
    ];
    
    if (settingsArray[index]) {
        state.settings[settingsArray[index]] = value;
    }
    
    saveState();
    showNotification('Настройка сохранена', 1500);
}

function updateLibraryScreen() {
    const libraryList = document.getElementById('library-list');
    libraryList.innerHTML = '';
    
    // Получить сохранённые растения
    const savedPlants = [];
    for (const [id, count] of Object.entries(state.collection)) {
        if (count > 0) {
            const plantId = parseInt(id);
            savedPlants.push({
                id: plantId,
                count: count,
                name: (data.resultText[plantId] || { title: `Растение #${plantId}` }).title
            });
        }
    }
    
    if (savedPlants.length === 0) {
        libraryList.innerHTML = `
            <div class="library-item" style="justify-content: center;">
                <span>Библиотека пуста</span>
            </div>
        `;
        return;
    }
    
    // Отобразить растения (максимум 6 на страницу)
    const startIndex = state.pageID * 6;
    const endIndex = Math.min(startIndex + 6, savedPlants.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        const plant = savedPlants[i];
        const item = document.createElement('div');
        item.className = 'library-item';
        
        item.innerHTML = `
            <span class="plant-name">${plant.name}</span>
            <span class="plant-count">${plant.count}</span>
        `;
        
        item.addEventListener('click', function() {
            state.questionNow = -plant.id;
            showResult(plant.id);
        });
        
        libraryList.appendChild(item);
    }
    
    // Обновить кнопки навигации
    const nextBtn = document.getElementById('library-next');
    nextBtn.disabled = endIndex >= savedPlants.length;
}

function updateSleepScreen() {
    // Добавить обработчик пробуждения
    const sleepScreen = document.getElementById('sleep-screen');
    sleepScreen.addEventListener('click', wakeUp);
}

function wakeUp() {
    state.sleepingMode = false;
    state.lastUsedTime = Date.now();
    showScreen('setup');
}

function updateWiFiIndicator() {
    const indicator = document.getElementById('wifi-indicator');
    const bars = indicator.querySelectorAll('.wifi-bar');
    
    // Случайное состояние WiFi для демонстрации
    const signalStrength = Math.floor(Math.random() * 4); // 0-3
    
    bars.forEach(function(bar, index) {
        if (index < signalStrength) {
            bar.style.opacity = '1';
        } else {
            bar.style.opacity = '0.3';
        }
    });
}

function showNotification(text, duration) {
    const notification = document.getElementById('notification');
    const textElement = document.getElementById('notification-text');
    
    textElement.textContent = text;
    notification.style.display = 'block';
    
    setTimeout(function() {
        notification.style.display = 'none';
    }, duration || 3000);
}

function saveState() {
    try {
        localStorage.setItem('plantIdentifierState', JSON.stringify({
            screen: state.screen,
            questionNow: state.questionNow,
            previousQuestion: state.previousQuestion,
            flowType: state.flowType,
            familyID: state.familyID,
            pageID: state.pageID,
            settings: state.settings
        }));
    } catch(e) {
        console.error('Ошибка сохранения состояния:', e);
    }
}

function updateUI() {
    // Восстановить последний экран
    if (state.screen && state.screen !== 'setup') {
        showScreen(state.screen);
    }
}

function SystemShutdown() {
    showNotification('Выключение системы...', 2000);
    setTimeout(function() {
        // Очистить состояние
        localStorage.removeItem('plantIdentifierState');
        localStorage.removeItem('plantCollection');
        // Перезагрузить страницу
        location.reload();
    }, 2000);
}
