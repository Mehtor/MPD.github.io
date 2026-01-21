let screen = 0;
let collection = JSON.parse(localStorage.getItem("plantCollection") || "{}");

const setupScreen = document.getElementById("setupScreen");
const libraryScreen = document.getElementById("libraryScreen");
const sleepScreen = document.getElementById("sleepScreen");

function showScreen(id) {
  screen = id;
  setupScreen.classList.add("hidden");
  libraryScreen.classList.add("hidden");
  sleepScreen.classList.add("hidden");

  if (id === 0) setupScreen.classList.remove("hidden");
  if (id === 1) libraryScreen.classList.remove("hidden");
  if (id === 2) sleepScreen.classList.remove("hidden");
}

/* ---------- Setup Screen ---------- */
function renderSetup() {
  setupScreen.innerHTML = `
    <div class="center" style="margin-top:40px">
      <div style="
        background: rgb(109,143,65);
        width:220px;
        height:76px;
        border-radius:10px;
        text-align:center;
        padding-top:10px;
        color:rgb(224,222,151);
        font-family:Georgia;
      ">
        <div>Определитель</div>
        <div>растений</div>
      </div>

      <button onclick="startWork()">Начать работу</button>
      <button onclick="openLibrary()">Библиотека</button>
    </div>
  `;
}

function startWork() {
  alert("Процесс определения пока не перенесён 🙂");
}

function openLibrary() {
  renderLibrary();
  showScreen(1);
}

/* ---------- Library ---------- */
const headers = {
  "-1": "Берёза",
  "-2": "Дуб",
  "-3": "Клён",
  "-4": "Липа",
  "-5": "Рябина",
  "-6": "Ива"
};

function renderLibrary() {
  let items = Object.entries(collection);

  let html = `
    <div style="padding:8px">
      <div style="
        background:rgb(109,143,65);
        height:40px;
        border-radius:10px;
        text-align:center;
        color:rgb(224,222,151);
        font-family:Georgia;
        line-height:40px;
      ">
        Библиотека
      </div>
  `;

  if (items.length === 0) {
    html += `
      <p style="text-align:center;color:rgb(224,222,151);margin-top:40px">
        Коллекция пуста
      </p>
    `;
  } else {
    items.forEach(([id, count]) => {
      html += `
        <div style="
          background:rgb(132,77,104);
          margin-top:5px;
          padding:5px 10px;
          border-radius:10px;
          color:rgb(224,222,151);
          display:flex;
          justify-content:space-between;
        ">
          <span>${headers[id] || "Неизвестно"}</span>
          <span>${count}</span>
        </div>
      `;
    });
  }

  html += `
      <button style="margin-top:10px" onclick="showScreen(0)">Назад</button>
    </div>
  `;

  libraryScreen.innerHTML = html;
}

/* ---------- Sleep ---------- */
let lastAction = Date.now();

function activity() {
  lastAction = Date.now();
  if (screen === 2) showScreen(0);
}

document.addEventListener("click", activity);
document.addEventListener("keydown", activity);

setInterval(() => {
  if (Date.now() - lastAction > 180000 && screen !== 2) {
    showScreen(2);
  }
}, 10000);

/* ---------- Init ---------- */
renderSetup();
showScreen(0);
