// ==================== DATA.H ====================
const goto_if_true = [
  0, 2, 8, 4, -9, 1055, 1059, -10, 9, 114, 20, 12, 1085, 1145, 1370, 16, 1074, -212, 19, -452, 1335, 1272, 1406, 24, 25, 1534, -716, 1206, 29, 1460, 31, 1486, -629, 34, 1384, 1267, 1387, -346, -41, -343, 1304, 42, 1526, 1511, 45, -655, -652, 48, 1398, 1432, 51, 1167, -351, 1205, 55, 1449, -537, 58, -654, 1427, 61, 1435, 1508, 1486, 65, -544, -543, 1447, -549, 1369, 71, 1295, -42, -38, 75, 1361, 1364, -483, 1366, 1226, 82, -352, -523, -350, -169, -173, 87, 1153, -168, -39, 91, 92, -387, -385, -245, 1202, 1226, 1199, 1147, -44, 101, 102, 103, -45, -490, -225, 107, 1076, -493, -37, -43, 1507, -534, 1404, -291, 1267, 117, -460, 1170, 1389, 121, -26, 123, 124, 1335, 128, 1177, 1189, -540, 130, -539, -459, 1347, -453, -305, 1395, -599, 1376, -480, 1381, 141, -518, 1298, 144, -353, -463, 147, 1177, 1189, 150, -458, 152, 1304, -480 
];

const goto_if_false = [
  0, 120, 3, 5, -20, 6, 7, 1049, 98, 10, 11, 13, 1127, 14, 15, 17, 1072, 18, 1216, -493, 21, 22, 23, 26, 1524, -670, 27, 28, 30, 1451, 33, 32, -630, 41, 35, 36, 37, 38, 39, 40, 1247, 54, 43, 44, 47, 46, -564, 50, 49, 1529, 52, 1170, 53, -215, 56, -522, 57, 69, 59, 60, 62, -538, 63, 64, 67, 66, 1443, 68, 1479, 70, 74, 72, 73, -40, 84, 76, 77, 78, 79, 80, 81, 1294, 83, 1424, 85, 86, 90, 83, 89, 1149, 95, 93, -339, 94, 1216, 96, 97, -446, 99, 100, 106, -293, 104, 1244, 105, -34, 111, 108, 109, 110, -452, 112, 113, -279, 115, 116, 118, -605, 119, 1247, 122, 1062, 146, 143, 125, 126, 127, -207, 129, 140, 131, 132, 133, 134, 135, 136, 137, 138, 139, 1427, 142, 1516, 1432, 145, -469, 1304, 149, 148, -207, 151, -540, 1198, 153, 1377
];

const SpeciesDeterminant = {
    1: { // Семейство 50
        Species_Header: "СЕМ. РОLYPODIACEAЕ\n     ПАПОРОТНИКОВЫЕ",
        Species_questions_true: ["Листья, спороносные и бесплодные, все одинаковые", "", "", "", "", "", "", "", "", ""],
        Species_questions_false: ["Спороносные листья резко отличаются от бесплодных", "", "", "", "", "", "", "", "", ""],
        Species_goto_if_true: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Species_goto_if_false: [-2, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
};

// ==================== FILES ====================
const fileCache = {};

async function loadFile(filename) {
    if (fileCache[filename]) {
        return fileCache[filename];
    }

    const response = await fetch(filename);
    if (!response.ok) {
        throw new Error(`Не удалось загрузить файл: ${filename}`);
    }

    const text = await response.text();
    const lines = text.split(/\r?\n/);

    fileCache[filename] = lines;
    return lines;
}

const fileSystem = {
    readSpecificLine: async function (filename, id) {
        id = Math.abs(id);

        const lines = await loadFile(filename);
        const index = id - 1;

        if (index < 0 || index >= lines.length) {
            return "";
        }

        return lines[index];
    }
};


let screenID = 0;
let pageID = 0;
let flowType = 0; // 0 -> Main flow, 1 -> Species flow
let questionNow = 1;
let previousQuestion = 0;
let previousQuestionAtMainFlow = 0;
let familyID = 1;
let menuItemID = 0;
let canBeContinuedScroling = false;
let collection = new Array(120).fill(0);
let settings = {
  useWiFi: true,
  WiFiRealTimeSerch: false,
  checkForUpdates: true,
  autoUpdate: false,
  debugMode: true,
  sleepingMode: true,
  autoOff: true,
  tftReconnect: false,
  sendDebugData: true
};

const tftScreen = document.getElementById('tft-screen');

// ==================== FUNCTIONS ====================

function SetupScreen(loadingProcess) {
    screenID = 0;
    flowType = 0;
    
    let html = '';
    
    tftScreen.className = 'screen bg-main';

    if (loadingProcess > 200) {
        html += `<div class="btn setup-btn" style="top: 132px;" onclick="handleTouch(10)">НАЧАТЬ РАБОТУ</div>`;
        html += `<div class="btn setup-btn" style="top: 186px;" onclick="handleTouch(11)">НАСТРОЙКИ</div>`;
        html += `<div class="btn setup-btn" style="top: 240px;" onclick="handleTouch(12)">БИБЛИОТЕКА</div>`;
        
        html += drawWiFiIndicator();
    }
    html += `<div style="position:absolute; top:29px; left:10px; width:221px; height:76px; background-color:rgb(109, 143, 65); border-radius:10px;"></div>`;
    html += `<div style="position:absolute; top:38px; left:34px; font-family:'Bahamas'; font-size:24px; color:rgb(224, 222, 151);">Определитель</div>`;
    html += `<div style="position:absolute; top:68px; left:67px; font-family:'Bahamas'; font-size:24px; color:rgb(224, 222, 151);">растений</div>`;

    if (loadingProcess != 227) {
        html += `<div style="position:absolute; bottom:17px; left:6px; width:227px; height:19px; background-color:rgb(238, 246, 210); border-radius:10px;"></div>`;
        html += `<div style="position:absolute; bottom:17px; left:6px; width:${loadingProcess}px; height:19px; background-color:rgb(140, 162, 115); border-radius:10px;"></div>`;
    }

    tftScreen.innerHTML = html;
}

function drawWiFiIndicator() {
    if (!settings.useWiFi) return '';
    let html = `<div class="wifi-indicator">`;
    html += `<div class="wifi-bar" style="left:1px; height:6px; width:4px;"></div>`;
    html += `<div class="wifi-bar" style="left:8px; height:11px; width:4px;"></div>`;
    html += `<div class="wifi-bar" style="left:15px; height:16px; width:4px;"></div>`;
    html += `</div>`;
    return html;
}

async function ProcessScreen() {
    if (screenID === 0) {
        screenID = 1;
        questionNow = 1;
        flowType = 0;
    }
    
    const topColor = flowType === 0 ? 'rgb(57, 97, 83)' : 'rgb(54, 78, 49)';
    const botColor = flowType === 0 ? 'rgb(109, 143, 65)' : 'rgb(121, 134, 75)';
    
    let qTrue = "";
    let qFalse = "";
    
    if (flowType === 0) {
        qTrue = await fileSystem.readSpecificLine("questions_true.txt", questionNow);
        qFalse = await fileSystem.readSpecificLine("questions_false.txt", questionNow);
    } else {
        if (SpeciesDeterminant[familyID]) {
            qTrue = SpeciesDeterminant[familyID].Species_questions_true[questionNow - 1] || "";
            qFalse = SpeciesDeterminant[familyID].Species_questions_false[questionNow - 1] || "";
        }
    }

    let html = `
        <div class="question-area-true" style="background-color:${topColor}" onclick="handleTouch(1)">
            <div class="question-text" style="top:0px; left:7px;">${qTrue}</div>
            <div style="position:absolute; top:7px; left:5px; font-family:'Times New Roman'; color:${flowType===0?'white':'rgb(224,222,151)'}">${questionNow}</div>
        </div>
        <div class="question-area-false" style="background-color:${botColor}" onclick="handleTouch(0)">
             <div class="question-text" style="top:0px; left:7px;">${qFalse}</div>
        </div>
        <div class="process-back-btn" style="background:transparent" onclick="event.stopPropagation(); handleTouch(2)">
            <span style="color:${(questionNow == 1 && flowType == 0) ? 'red' : 'rgb(224, 222, 151)'}">Назад</span>
        </div>
    `;
    
    tftScreen.innerHTML = html;
}

async function ResultScreen(mode) {
    if (screenID != 2) {
        screenID = 2;
        pageID = 0;
    }
    
    let html = '';
    tftScreen.className = 'screen bg-dark-purple';
    
    const inCollection = collection[Math.abs(questionNow)] > 0;
    const btnColor = inCollection ? 'rgb(224, 222, 151)' : 'rgb(149, 112, 130)';
    const textColor = inCollection ? 'rgb(149, 112, 130)' : 'rgb(224, 222, 151)';
    const btnText = inCollection ? "Добавить" : "Сохранить";

    html += `<div class="btn" style="left:129px; top:285px; width:102px; height:23px; border-radius:11px; background-color:${btnColor}; color:${textColor}; font-family:'CourierCyr';" onclick="handleTouch(22)">
        ${btnText}
    </div>`;

    if (inCollection) {
         html += `<div class="btn" style="left:100px; top:283px; width:25px; height:25px; border-radius:5px; background-color:rgb(149, 112, 130);" onclick="handleTouch(23)">🗑️</div>`;
         html += `<div style="position:absolute; right:10px; top:20px; font-family:'Bahamas'; font-size:24px; color:white;">${collection[Math.abs(questionNow)]}</div>`;
    }

    const backBtnColor = (pageID == 0) ? 'rgb(224, 222, 151)' : 'rgb(149, 112, 130)';
    const backTxtColor = (pageID == 0) ? 'rgb(149, 112, 130)' : 'rgb(224, 222, 151)';
    html += `<div class="btn" style="left:10px; top:283px; width:25px; height:25px; border-radius:5px; background-color:${backBtnColor}; color:${backTxtColor}; font-size:20px;" onclick="handleTouch(20)">&lt;</div>`;

    let fullText = await fileSystem.readSpecificLine("resultTextShort.txt", questionNow * -1);

    canBeContinuedScroling = fullText.length > 100 * (pageID + 1); 
    
    if (canBeContinuedScroling) {
        html += `<div class="btn" style="left:50px; top:283px; width:25px; height:25px; border-radius:5px; background-color:rgb(149, 112, 130); color:rgb(224, 222, 151); font-size:20px;" onclick="handleTouch(21)">&gt;</div>`;
    }

    let headerText = await fileSystem.readSpecificLine("resultTextHeader.txt", questionNow * -1);
    let parts = headerText.split(';');
    html += `<div style="position:absolute; top:15px; left:3px; font-family:'Cooper'; color:rgb(175, 163, 134);">
        <div>${parts[0] || ''}</div>
        <div>${parts[1] || ''}</div>
    </div>`;

    let displayText = fullText.substring(pageID * 100, (pageID + 1) * 100);
    html += `<div style="position:absolute; top:60px; left:5px; width:230px; font-family:'CourierCyr'; color:rgb(175, 163, 134); font-size:14px; white-space: pre-wrap;">${displayText}</div>`;

    tftScreen.innerHTML = html;
}

function SettingsScreen(fullRedraw) {
    if (screenID != 3) {
        screenID = 3;
        pageID = 0;
    }
    
    tftScreen.className = 'screen bg-settings-dark';
    let html = '';

    html += `<div style="position:absolute; top:35px; left:59px; font-family:'Bahamas'; font-size:16px; color:white;">Настройки</div>`;

    html += `<div class="nav-btn" style="left:9px; top:289px; background-color:${pageID==0 ? 'rgb(224,222,151)' : 'rgb(132,77,104)'}; color:${pageID==0 ? 'rgb(132,77,104)' : 'rgb(224,222,151)'};" onclick="handleTouch(30)">Назад</div>`;
    
    canBeContinuedScroling = pageID === 0;
    if (canBeContinuedScroling) {
         html += `<div class="nav-btn" style="left:129px; top:289px; background-color:rgb(132,77,104); color:rgb(224,222,151);" onclick="handleTouch(31)">Дальше</div>`;
    }

    for (let i = (pageID * 6); i < (pageID * 6) + 6; i++) {
        let name = getSettingName(i);
        if (name === "") break;
        let isOn = getSettingPos(i);
        let color = isOn ? 'white' : 'darkgrey';
        let topY = ((i % 6) * 38) + 56;
        
        let border = (menuItemID === (i % 6)) ? 'border: 1px solid magenta;' : '';

        html += `<div class="list-item" style="top:${topY}px; color:${color}; ${border}" onclick="menuItemID=${i%6}; handleTouch(32);">
            ${i}. ${name}
        </div>`;
    }

    tftScreen.innerHTML = html;
}

async function LibraryScreen(fullRedraw) {
    if (screenID != 4) {
        screenID = 4;
        pageID = 0;
    }
    
    tftScreen.className = 'screen bg-main';
    let html = '';
    
    html += `<div style="position:absolute; top:6px; left:9px; width:221px; height:43px; background-color:rgb(109,143,65); border-radius:10px;"></div>`;
    html += `<div style="position:absolute; top:17px; left:67px; font-family:'Bahamas'; font-size:18px; color:rgb(224,222,151);">Библиотека</div>`;

    html += `<div class="nav-btn" style="left:9px; top:289px; background-color:${pageID==0 ? 'rgb(224,222,151)' : 'rgb(132,77,104)'}; color:${pageID==0 ? 'rgb(132,77,104)' : 'rgb(224,222,151)'};" onclick="handleTouch(40)">Назад</div>`;

    let listSelectHelper = [];
    for(let i=0; i<collection.length; i++) {
        if(collection[i] > 0) {
            listSelectHelper.push({
                id: i,
                header: await fileSystem.readSpecificLine("resultTextHeader.txt", -i),
                count: collection[i]
            });
        }
    }
    
    let lsh = listSelectHelper.length;
    canBeContinuedScroling = pageID < Math.floor(lsh / 6);
    
    if (canBeContinuedScroling) {
        html += `<div class="nav-btn" style="left:129px; top:289px; background-color:rgb(132,77,104); color:rgb(224,222,151);" onclick="handleTouch(41)">Дальше</div>`;
    }

    for (let i = pageID * 6; i < Math.min((pageID + 1) * 6, lsh); i++) {
        let item = listSelectHelper[i];
        let yPos = ((i % 6) * 38) + 56;
        let border = (menuItemID === i) ? 'border: 1px solid magenta;' : '';
        
        html += `<div style="position:absolute; left:9px; top:${yPos}px; width:221px; height:27px; background-color:rgb(132,77,104); border-radius:10px; ${border}" onclick="menuItemID=${i}; handleTouch(42);">
            <span style="position:absolute; left:17px; top:5px; font-family:'Cooper'; color:white; font-size:12px;">${item.header.split(';')[0]}</span>
            <span style="position:absolute; right:10px; top:5px; font-family:'Times New Roman'; color:white;">${item.count}</span>
        </div>`;
    }

    tftScreen.innerHTML = html;
}

function FlowChange(upping) {
    tftScreen.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; height:100%; color:rgb(224,222,151); font-family:'CourierCyr';">смена потока...</div>`;
    
    setTimeout(() => {
        if (upping) {
            previousQuestionAtMainFlow = previousQuestion;
            flowType = 1;
            questionNow = 1;
        } else {
            flowType = 0;
            previousQuestion = previousQuestionAtMainFlow;
        }
        ProcessScreen();
    }, 1000);
}

// ==================== LOGIC HELPERS ====================

function getSettingName(index) {
    const names = ["Use WiFi", "WiFi Real Time Search", "Check for Updates", "Auto Update", "Debug Mode", "Sleeping Mode", "Auto Off", "TFT Reconnect", "Send Debug Data"];
    return names[index] || "";
}

function getSettingPos(index) {
    const keys = ["useWiFi", "WiFiRealTimeSerch", "checkForUpdates", "autoUpdate", "debugMode", "sleepingMode", "autoOff", "tftReconnect", "sendDebugData"];
    return settings[keys[index]];
}

function toggleSetting(index) {
    const keys = ["useWiFi", "WiFiRealTimeSerch", "checkForUpdates", "autoUpdate", "debugMode", "sleepingMode", "autoOff", "tftReconnect", "sendDebugData"];
    settings[keys[index]] = !settings[keys[index]];
}

function questionAnswer(status) {
    if (status == 2) {
        if (questionNow == 1) {
            if (flowType == 0) {
                SetupScreen(227);
                return;
            } else {
                FlowChange(0);
                return;
            }
        }
        questionNow = previousQuestion;
    } else {
        previousQuestion = questionNow;
        if (status == 1) { // Yes
            if (flowType == 0) questionNow = goto_if_true[questionNow];
            else if (SpeciesDeterminant[familyID]) questionNow = SpeciesDeterminant[familyID].Species_goto_if_true[questionNow - 1];
        } else if (status == 0) { // No
            if (flowType == 0) questionNow = goto_if_false[questionNow];
            else if (SpeciesDeterminant[familyID]) questionNow = SpeciesDeterminant[familyID].Species_goto_if_false[questionNow - 1];
        }
    }

    if (questionNow < 0) {
        ResultScreen(0);
    } else if (questionNow >= 1000) {
        familyID = questionNow - 1049;
        FlowChange(1);
    } else {
        ProcessScreen();
    }
}

// ==================== INPUT HANDLER ====================
function handleTouch(actionID) {
    if (screenID === 0) {
        if (actionID === 10) ProcessScreen();
        if (actionID === 11) SettingsScreen(true);
        if (actionID === 12) LibraryScreen(true);
    } 
    else if (screenID === 1) {
        questionAnswer(actionID);
    }
    else if (screenID === 2) {
        if (actionID === 20) {
            if (pageID === 0) SetupScreen(227);
            else { pageID--; ResultScreen(0); }
        }
        if (actionID === 21 && canBeContinuedScroling) {
            pageID++; ResultScreen(0);
        }
        if (actionID === 22) {
             if (collection[Math.abs(questionNow)] > 0) {
                 collection[Math.abs(questionNow)]++; 
             } else {
                 collection[Math.abs(questionNow)]++;
             }
             ResultScreen(1);
        }
        if (actionID === 23) { // Trash
            if (collection[Math.abs(questionNow)] > 0) collection[Math.abs(questionNow)]--;
            ResultScreen(1);
        }
    }
    else if (screenID === 3) {
        if (actionID === 30) {
            if (pageID === 0) SetupScreen(227);
            else { pageID--; SettingsScreen(true); }
        }
        if (actionID === 31 && canBeContinuedScroling) {
            pageID++; SettingsScreen(true);
        }
        if (actionID === 32) {
            toggleSetting(menuItemID + (pageID * 6));
            SettingsScreen(false);
        }
    }
    else if (screenID === 4) {
         if (actionID === 40) {
            if (pageID === 0) SetupScreen(227);
            else { pageID--; LibraryScreen(false); }
        }
        if (actionID === 41 && canBeContinuedScroling) {
            pageID++; LibraryScreen(false);
        }
        if (actionID === 42) {
            let listSelectHelper = [];
            for(let i=0; i<collection.length; i++) {
                if(collection[i] > 0) listSelectHelper.push(i);
            }
            let index = menuItemID + (pageID * 6);
            if(listSelectHelper[index] !== undefined) {
                questionNow = -listSelectHelper[index];
                ResultScreen(0);
            }
        }
    }
}

// Launch
window.onload = function() {
    SetupScreen(227);

};



