// DATABASE OF STUDENTS
const CLASS_T1 = [
  "ALEX JUNIOR SIMON",
  "ÂNGELO LUIZ GIROLETTO",
  "BERNARDO BRANDÃO",
  "BERNARDO LUÍS DOS SANTOS",
  "BRUNO BALDIGA",
  "CAROL FERREIRA TOMAZ",
  "EDSOM RODRIGUES CASSAMALI JUNIOR",
  "EDUARDO HENRIQUE THOMAZ",
  "GABRIEL DAVID RIBEIRO DA SILVA",
  "HENRIQUE ALBA TOMAZONI",
  "JOÃO VÍTOR AZAMBUJA",
  "JOHN OLIVER OLIVEIRA DA SILVA",
  "KAUANE ZICATO",
  "LAIS ANTUNES DOS SANTOS",
  "LEVI DE SOUSA GRONENSCHILD",
  "LUCAS BOGO DOS SANTOS",
  "MARCEL LEONARDO CORREA",
  "MARCO ANTÔNIO BARRO TORTELLI",
  "MATEUS CADORE",
  "MIGUEL ÁLVARO MONTEMEZZO",
  "PEDRO DALLA ROSA BALDI",
  "RAFAEL DE OLIVEIRA",
  "RAFAEL HENRIQUE SCHNEIDER",
  "RENAN KONCIKOSKI ABEL",
  "RUAN FERREIRA CASAROTTO"
];

const CLASS_T2 = [
  "EDUARDO ENRIQUE FABISIAK",
  "ERICK JHEIMES BIENIEK",
  "FELIPE CASA RIGO",
  "GABRIEL FREIRE LAZZARE",
  "GABRIEL NOVELO JAVORNIK",
  "GRAZIELI JULIA PIEKAS",
  "GUILHERME CENTENARO",
  "GUSTAVO HENRIQUE CASTALDI TIBURSKI",
  "HENRIQUE JOSÉ GIACOMEL NETO",
  "HENRIQUE VIEIRA",
  "JOÃO HENRIQUE ANTONIAZZI",
  "JOÃO VICTOR VEDOVATO",
  "JOAO VITOR BUSETTO MENEZES",
  "JOHNY CRISTIAN BOLIS",
  "LUCAS MARCELO NAGEL STRACKE",
  "LUCIANO EDUARDO ALLEBRANDT",
  "MARIA EDUARDA FALKOSKI",
  "MATEUS ANTUNES PINTO",
  "MATHEUS LOPES COLOSSI",
  "MAURÍCIO JOSÉ HAIDUCK",
  "PEDRO AUGUSTO ESMELINDRO FALCÃO",
  "PEDRO SANTIN MONTEMESSO",
  "RAFAEL CÉSAR MICHALCZUK",
  "RAFAEL GUSTAVO KAMMLER",
  "RUAN SAUGO",
  "SAMUEL MARTINI",
  "THIAGO HENRIQUE MARKENDORF",
  "YASMIN NASCIMENTO PRICHOA"
];

// STATE MANAGEMENT
let students = [];
let history = [];
let activeTab = "ALL"; // ALL, T1, T2
let preventRepeats = true;
let soundEnabled = true;

// WEB AUDIO API SYNTHESIZER
let audioCtx = null;
let droneOsc = null;
let droneGain = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// Play a short spinner tick sound (Spooky heartbeat thump + clock click)
function playTickSound() {
  if (!soundEnabled) return;
  initAudio();
  try {
    const now = audioCtx.currentTime;

    // Heartbeat thump (layered detuned waves)
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(65, now);
    osc1.frequency.exponentialRampToValueAtTime(30, now + 0.09);

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(68, now);
    osc2.frequency.exponentialRampToValueAtTime(32, now + 0.09);

    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start(now);
    osc1.stop(now + 0.1);
    osc2.start(now);
    osc2.stop(now + 0.1);

    // Creaking clock hand high-click
    const clickOsc = audioCtx.createOscillator();
    const clickGain = audioCtx.createGain();
    clickOsc.type = "square";
    clickOsc.frequency.setValueAtTime(1400, now);
    clickOsc.frequency.setValueAtTime(800, now + 0.01);

    clickGain.gain.setValueAtTime(0.03, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    clickOsc.connect(clickGain);
    clickGain.connect(audioCtx.destination);

    clickOsc.start(now);
    clickOsc.stop(now + 0.03);
  } catch (e) {
    console.error("Audio error:", e);
  }
}

// Play success fanfare chime (Heavy Synthesized Cinematic Explosion)
function playSuccessSound() {
  if (!soundEnabled) return;
  initAudio();
  try {
    const now = audioCtx.currentTime;

    // 1. Initial Blast / Shockwave (White Noise swept down rapidly)
    const blastBufferSize = audioCtx.sampleRate * 0.5; // 0.5s blast
    const blastBuffer = audioCtx.createBuffer(1, blastBufferSize, audioCtx.sampleRate);
    const blastData = blastBuffer.getChannelData(0);
    for (let i = 0; i < blastBufferSize; i++) {
      blastData[i] = Math.random() * 2 - 1;
    }
    const blastNode = audioCtx.createBufferSource();
    blastNode.buffer = blastBuffer;

    const blastFilter = audioCtx.createBiquadFilter();
    blastFilter.type = "lowpass";
    blastFilter.frequency.setValueAtTime(1200, now);
    blastFilter.frequency.exponentialRampToValueAtTime(100, now + 0.3);

    const blastGain = audioCtx.createGain();
    blastGain.gain.setValueAtTime(0.65, now);
    blastGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    blastNode.connect(blastFilter);
    blastFilter.connect(blastGain);
    blastGain.connect(audioCtx.destination);
    blastNode.start(now);

    // 2. Heavy Low-Frequency Rumble (Heavily low-passed white noise with resonance)
    const rumbleBufferSize = audioCtx.sampleRate * 2.0; // 2.0s rumble
    const rumbleBuffer = audioCtx.createBuffer(1, rumbleBufferSize, audioCtx.sampleRate);
    const rumbleData = rumbleBuffer.getChannelData(0);
    for (let i = 0; i < rumbleBufferSize; i++) {
      rumbleData[i] = Math.random() * 2 - 1;
    }
    const rumbleNode = audioCtx.createBufferSource();
    rumbleNode.buffer = rumbleBuffer;

    const rumbleFilter = audioCtx.createBiquadFilter();
    rumbleFilter.type = "lowpass";
    rumbleFilter.frequency.setValueAtTime(160, now);
    rumbleFilter.frequency.exponentialRampToValueAtTime(15, now + 1.6);
    rumbleFilter.Q.setValueAtTime(4.0, now); // Bass resonance peak

    const rumbleGain = audioCtx.createGain();
    rumbleGain.gain.setValueAtTime(0.5, now);
    rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    rumbleNode.connect(rumbleFilter);
    rumbleFilter.connect(rumbleGain);
    rumbleGain.connect(audioCtx.destination);
    rumbleNode.start(now);

    // 3. Sub-Bass Thump (Low frequency pitch drop)
    const thumpOsc = audioCtx.createOscillator();
    const thumpGain = audioCtx.createGain();
    thumpOsc.type = "triangle";
    thumpOsc.frequency.setValueAtTime(95, now);
    thumpOsc.frequency.exponentialRampToValueAtTime(20, now + 0.35);

    thumpGain.gain.setValueAtTime(0.7, now);
    thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    thumpOsc.connect(thumpGain);
    thumpGain.connect(audioCtx.destination);
    thumpOsc.start(now);
    thumpOsc.stop(now + 0.45);

    // 4. Crackling Fire/Debris (High-passed noise with rapid crackling volume shifts)
    const debrisBufferSize = audioCtx.sampleRate * 1.2;
    const debrisBuffer = audioCtx.createBuffer(1, debrisBufferSize, audioCtx.sampleRate);
    const debrisData = debrisBuffer.getChannelData(0);
    for (let i = 0; i < debrisBufferSize; i++) {
      debrisData[i] = Math.random() * 2 - 1;
    }
    const debrisNode = audioCtx.createBufferSource();
    debrisNode.buffer = debrisBuffer;

    const debrisFilter = audioCtx.createBiquadFilter();
    debrisFilter.type = "bandpass";
    debrisFilter.frequency.setValueAtTime(2500, now);
    debrisFilter.frequency.exponentialRampToValueAtTime(800, now + 1.0);
    debrisFilter.Q.value = 1.5;

    const debrisGain = audioCtx.createGain();
    debrisGain.gain.setValueAtTime(0, now);
    debrisGain.gain.linearRampToValueAtTime(0.18, now + 0.05);
    // Rapid crackle volume envelope
    for (let t = 0.05; t < 1.0; t += 0.04) {
      const vol = 0.18 * (1 - t);
      debrisGain.gain.linearRampToValueAtTime(vol, now + t);
      debrisGain.gain.linearRampToValueAtTime(vol * 0.1, now + t + 0.02);
    }
    debrisGain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

    debrisNode.connect(debrisFilter);
    debrisFilter.connect(debrisGain);
    debrisGain.connect(audioCtx.destination);
    debrisNode.start(now);

  } catch (e) {
    console.error("Audio error:", e);
  }
}

// Background suspense drone (plays during spin)
function startDrone() {
  if (!soundEnabled) return;
  initAudio();
  try {
    const now = audioCtx.currentTime;
    droneOsc = audioCtx.createOscillator();
    droneGain = audioCtx.createGain();

    droneOsc.type = "sawtooth";
    // Tense sub-bass frequency rumble
    droneOsc.frequency.setValueAtTime(45, now);
    // Sweeps slowly upward to build horror suspense!
    droneOsc.frequency.linearRampToValueAtTime(85, now + 2.5);

    // Lowpass filter to make it rumbling and dark
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(90, now);
    filter.frequency.linearRampToValueAtTime(160, now + 2.5);

    // Automate volume to pulsate like an emergency warning alarm
    droneGain.gain.setValueAtTime(0, now);
    droneGain.gain.linearRampToValueAtTime(0.35, now + 0.3);
    for (let t = 0.3; t < 2.5; t += 0.2) {
      droneGain.gain.linearRampToValueAtTime(0.4, now + t);
      droneGain.gain.linearRampToValueAtTime(0.12, now + t + 0.1);
    }

    droneOsc.connect(filter);
    filter.connect(droneGain);
    droneGain.connect(audioCtx.destination);

    droneOsc.start(now);
  } catch (e) {
    console.error("Drone error:", e);
  }
}

function stopDrone() {
  if (droneOsc) {
    try {
      const now = audioCtx.currentTime;
      droneGain.gain.cancelScheduledValues(now);
      droneGain.gain.setValueAtTime(droneGain.gain.value, now);
      droneGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      droneOsc.stop(now + 0.16);
    } catch (e) {
      console.error("Drone stop error:", e);
    }
    droneOsc = null;
    droneGain = null;
  }
}

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  loadData();
  renderAll();
  setupEventListeners();
});

// LOAD AND BUILD DATA
function loadData() {
  const storedStudents = localStorage.getItem("sorteador_students");
  const storedHistory = localStorage.getItem("sorteador_history");
  const storedTab = localStorage.getItem("sorteador_activeTab");
  const storedRepeats = localStorage.getItem("sorteador_preventRepeats");
  const storedSound = localStorage.getItem("sorteador_soundEnabled");

  if (storedTab) activeTab = storedTab;
  if (storedRepeats !== null) preventRepeats = storedRepeats === "true";
  if (storedSound !== null) soundEnabled = storedSound === "true";

  if (storedStudents) {
    students = JSON.parse(storedStudents);
  } else {
    // Build initial list from source lists
    students = [
      ...CLASS_T1.map(name => ({ id: `t1-${encodeName(name)}`, name, classroom: "T1", present: true, drawn: false })),
      ...CLASS_T2.map(name => ({ id: `t2-${encodeName(name)}`, name, classroom: "T2", present: true, drawn: false }))
    ];
    saveData();
  }

  if (storedHistory) {
    history = JSON.parse(storedHistory);
  }
}

function saveData() {
  localStorage.setItem("sorteador_students", JSON.stringify(students));
  localStorage.setItem("sorteador_history", JSON.stringify(history));
  localStorage.setItem("sorteador_activeTab", activeTab);
  localStorage.setItem("sorteador_preventRepeats", preventRepeats);
  localStorage.setItem("sorteador_soundEnabled", soundEnabled);
}

function encodeName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// THEME SYSTEM
function setupTheme() {
  const currentTheme = localStorage.getItem("theme") || "dark";
  const body = document.body;
  const toggle = document.getElementById("mode-toggle");

  if (currentTheme === "light") {
    body.classList.add("light");
    toggle.textContent = "☀️";
  } else {
    body.classList.remove("light");
    toggle.textContent = "🌙";
  }

  toggle.addEventListener("click", () => {
    initAudio();
    if (body.classList.contains("light")) {
      body.classList.remove("light");
      toggle.textContent = "🌙";
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.add("light");
      toggle.textContent = "☀️";
      localStorage.setItem("theme", "light");
    }
  });

  // Scroll Progress logic
  window.addEventListener("scroll", () => {
    const scrollBar = document.getElementById("scroll-bar");
    if (!scrollBar) return;
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    scrollBar.style.width = scrolled + "%";
  });
}

// EVENT LISTENERS
function setupEventListeners() {
  // Checkbox settings
  const chkRepeats = document.getElementById("chk-repeats");
  const chkSound = document.getElementById("chk-sound");

  chkRepeats.checked = preventRepeats;
  chkSound.checked = soundEnabled;

  chkRepeats.addEventListener("change", (e) => {
    preventRepeats = e.target.checked;
    saveData();
  });

  chkSound.addEventListener("change", (e) => {
    soundEnabled = e.target.checked;
    initAudio();
    saveData();
  });

  // Search input
  const searchInput = document.getElementById("student-search");
  searchInput.addEventListener("input", () => {
    filterStudents();
  });
}

// RENDERING LOGIC
function renderAll() {
  renderTabs();
  renderStats();
  renderStudentGrid();
  renderHistory();
}

function renderTabs() {
  const container = document.getElementById("tabs-container");
  container.innerHTML = `
    <button class="tab-btn ${activeTab === 'ALL' ? 'active' : ''}" onclick="changeTab('ALL')">Todos</button>
    <button class="tab-btn ${activeTab === 'T1' ? 'active' : ''}" onclick="changeTab('T1')">Classe T1</button>
    <button class="tab-btn ${activeTab === 'T2' ? 'active' : ''}" onclick="changeTab('T2')">Classe T2</button>
  `;
}

function renderStats() {
  const filtered = getFilteredStudents();
  const total = filtered.length;
  const present = filtered.filter(s => s.present).length;
  const absent = filtered.filter(s => !s.present).length;
  const drawn = filtered.filter(s => s.present && s.drawn).length;

  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-present").textContent = present;
  document.getElementById("stat-absent").textContent = absent;
  document.getElementById("stat-drawn").textContent = `${drawn}/${present}`;
}

function getFilteredStudents() {
  if (activeTab === "ALL") return students;
  return students.filter(s => s.classroom === activeTab);
}

function getInitials(name) {
  const parts = name.split(" ").filter(p => p.length > 0);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function renderStudentGrid() {
  const grid = document.getElementById("student-grid");
  const filtered = getFilteredStudents();
  const searchQuery = document.getElementById("student-search").value.toLowerCase();

  grid.innerHTML = "";

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--mode-txt2); padding: 2rem;">Nenhum aluno cadastrado nesta classe.</div>`;
    return;
  }

  filtered.forEach(s => {
    // Filter matching search query
    if (searchQuery && !s.name.toLowerCase().includes(searchQuery)) return;

    const card = document.createElement("div");
    card.id = `card-${s.id}`;
    card.className = `student-card ${!s.present ? 'absent' : ''} ${s.drawn ? 'drawn' : ''}`;

    card.innerHTML = `
      <div class="card-top">
        <span class="student-initials">${getInitials(s.name)}</span>
        <span class="class-pill ${s.classroom.toLowerCase()}">${s.classroom}</span>
      </div>
      <div class="student-name">${s.name}</div>
      <div class="card-actions">
        <label class="attendance-toggle">
          <input type="checkbox" ${s.present ? 'checked' : ''} onchange="toggleAttendance('${s.id}')">
          <span>Presente</span>
        </label>
        <span class="status-dot">${s.drawn ? 'Sorteado' : 'Aguardando'}</span>
      </div>
    `;

    grid.appendChild(card);
  });
}

function filterStudents() {
  renderStudentGrid();
}

function renderHistory() {
  const list = document.getElementById("history-list");
  list.innerHTML = "";

  if (history.length === 0) {
    list.innerHTML = `<li class="history-empty">Nenhum sorteio realizado ainda.</li>`;
    return;
  }

  history.forEach((h, index) => {
    const item = document.createElement("li");
    item.className = "history-item";
    item.innerHTML = `
      <div class="history-info">
        <span class="history-num">${index + 1}</span>
        <span class="history-name">${h.name}</span>
        <span class="history-badge ${h.classroom.toLowerCase()}">${h.classroom}</span>
      </div>
      <button class="history-delete" onclick="removeFromHistory(${index})" title="Remover do histórico">✕</button>
    `;
    list.appendChild(item);
  });
}

// ACTIONS AND HANDLERS
window.changeTab = function (tab) {
  initAudio();
  activeTab = tab;
  saveData();
  renderAll();
};

window.toggleAttendance = function (id) {
  initAudio();
  const student = students.find(s => s.id === id);
  if (student) {
    student.present = !student.present;
    // If marked absent, reset drawn status
    if (!student.present) {
      student.drawn = false;
      // Also remove from history
      history = history.filter(h => !(h.name === student.name && h.classroom === student.classroom));
    }
    saveData();
    renderAll();
  }
};

window.removeFromHistory = function (index) {
  initAudio();
  const record = history[index];
  if (record) {
    // Reset student drawn status
    const student = students.find(s => s.name === record.name && s.classroom === record.classroom);
    if (student) {
      student.drawn = false;
    }
    // Remove from history list
    history.splice(index, 1);
    saveData();
    renderAll();
  }
};

window.resetHistory = function () {
  initAudio();
  if (confirm("Deseja realmente reiniciar todos os sorteios? Os alunos voltarão para a fila de disponíveis.")) {
    history = [];
    students.forEach(s => s.drawn = false);
    saveData();
    renderAll();

    // Reset screen
    const screenName = document.getElementById("display-name");
    screenName.textContent = "Aguardando...";
    screenName.className = "display-name";
    const screenClass = document.getElementById("display-class");
    screenClass.style.display = "none";
  }
};

// SHUFFLE & SELECT ENGINE
let isSpinning = false;

window.drawStudent = function () {
  if (isSpinning) return;
  initAudio();

  const filtered = getFilteredStudents();
  // Candidates are: present, and optionally not already drawn
  let candidates = filtered.filter(s => s.present);
  if (preventRepeats) {
    candidates = candidates.filter(s => !s.drawn);
  }

  if (candidates.length === 0) {
    alert("Nenhum estudante disponível para sorteio! Redefina o histórico ou verifique a presença.");
    return;
  }

  isSpinning = true;
  document.getElementById("btn-draw").disabled = true;
  startDrone();

  const screenName = document.getElementById("display-name");
  const screenClass = document.getElementById("display-class");
  screenName.className = "display-name spinning";
  screenClass.style.display = "none";

  // Pick winner immediately, but animate before showing
  const winner = candidates[Math.floor(Math.random() * candidates.length)];

  // List of active cards in the DOM to flash
  const activeDomCards = Array.from(document.querySelectorAll(".student-card")).filter(card => {
    const id = card.id.replace("card-", "");
    const student = students.find(s => s.id === id);
    return student && student.present && (!preventRepeats || !student.drawn);
  });

  let cycleCount = 0;
  const maxCycles = 25;
  let intervalTime = 60; // ms

  function spinCycle() {
    cycleCount++;

    // Choose a random student to show on screen
    const tempStudent = candidates[Math.floor(Math.random() * candidates.length)];
    screenName.textContent = tempStudent.name;

    // Highlight card in grid
    document.querySelectorAll(".student-card").forEach(c => c.classList.remove("picker-highlight"));
    if (activeDomCards.length > 0) {
      const randomCard = activeDomCards[Math.floor(Math.random() * activeDomCards.length)];
      randomCard.classList.add("picker-highlight");
    }

    playTickSound();

    if (cycleCount < maxCycles) {
      // Exponentially slow down
      if (cycleCount > maxCycles - 20) {
        intervalTime += 20;
      }
      setTimeout(spinCycle, intervalTime);
    } else {
      // Stop and reveal winner!
      revealWinner(winner);
    }
  }

  spinCycle();
};

function revealWinner(winner) {
  stopDrone();
  isSpinning = false;
  document.getElementById("btn-draw").disabled = false;

  // Update State
  winner.drawn = true;
  history.push({
    name: winner.name,
    classroom: winner.classroom,
    timestamp: new Date().toLocaleTimeString("pt-BR")
  });
  saveData();

  // Screen display winner
  const screenName = document.getElementById("display-name");
  const screenClass = document.getElementById("display-class");

  screenName.textContent = winner.name;
  screenName.className = "display-name winner";

  screenClass.textContent = winner.classroom;
  screenClass.className = `display-class ${winner.classroom.toLowerCase()}`;
  screenClass.style.display = "block";

  // Re-render and highlight card
  renderAll();

  const winnerCard = document.getElementById(`card-${winner.id}`);
  if (winnerCard) {
    winnerCard.classList.add("picker-winner");
    winnerCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Play Sound Fanfare
  playSuccessSound();

  // Fire Confetti
  triggerConfetti();
}

// PURE CSS CONFETTI GENERATOR
function triggerConfetti() {
  const container = document.body;
  const colors = ["#4f8ef7", "#a855f7", "#22d3ee", "#34d399", "#fcd34d", "#f87171", "#f472b6"];
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    const el = document.createElement("div");
    el.className = "confetti";

    // Random styling
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = "-10px";

    const size = Math.random() * 8 + 6;
    el.style.width = size + "px";
    el.style.height = size + "px";
    el.style.transform = `rotate(${Math.random() * 360}deg)`;

    // Append
    container.appendChild(el);

    // CSS Keyframe Translation
    const duration = Math.random() * 2 + 1.5;
    const drift = (Math.random() - 0.5) * 200;

    el.animate([
      { top: "-10px", transform: `translateX(0px) rotate(0deg)`, opacity: 1 },
      { top: "105vh", transform: `translateX(${drift}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], {
      duration: duration * 1000,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      fill: "forwards"
    });

    // Cleanup
    setTimeout(() => {
      el.remove();
    }, duration * 1000 + 100);
  }
}

// COPY ORDER TO CLIPBOARD
window.copyHistory = function () {
  initAudio();
  if (history.length === 0) {
    alert("Nenhum sorteio registrado para copiar.");
    return;
  }

  const text = history.map((h, i) => `${i + 1}. ${h.name} (${h.classroom})`).join("\n");
  navigator.clipboard.writeText(text)
    .then(() => {
      alert("Ordem de apresentação copiada para a área de transferência!");
    })
    .catch(err => {
      console.error("Clipboard copy failed: ", err);
    });
};
