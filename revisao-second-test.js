/* ════════════════════════════════════════
   1. DARK/LIGHT MODE
   ════════════════════════════════════════ */
const body = document.body;
const modeBtn = document.getElementById('mode-toggle');

if (localStorage.getItem('showcase-theme') === 'light') {
  body.classList.add('light');
  if (modeBtn) modeBtn.textContent = '☀️';
}

if (modeBtn) {
  modeBtn.addEventListener('click', () => {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    modeBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('showcase-theme', isLight ? 'light' : 'dark');
  });
}

/* ═══════════════════════════════════════
   2. SCROLL PROGRESS + BACK TO TOP
   ═══════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  const pb = document.getElementById('progress-bar');
  if (pb) pb.style.width = pct + '%';
  
  const bt = document.getElementById('back-top');
  if (bt) {
    if (window.scrollY > 400) {
      bt.classList.add('visible');
    } else {
      bt.classList.remove('visible');
    }
  }
}, { passive: true });

const btEl = document.getElementById('back-top');
if (btEl) {
  btEl.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════
   3. STUDY TIMER (POMODORO)
   ═══════════════════════════════════════ */
let timerSec = 0, timer = null;

function timerStart() {
  if (timer) return;
  if (timerSec === 0) {
    const mins = parseInt(document.getElementById('tk-min').value) || 10;
    timerSec = mins * 60;
  }
  timer = setInterval(() => {
    timerSec--;
    updateTimerDisplay();
    if (timerSec <= 0) {
      clearInterval(timer); timer = null;
      document.getElementById('td').textContent = '⏰ DONE!';
      document.getElementById('td').classList.remove('urgent');
    }
  }, 1000);
}

function timerPause() { 
  clearInterval(timer); 
  timer = null; 
}

function timerReset() {
  clearInterval(timer); timer = null; timerSec = 0;
  document.getElementById('td').textContent = '00:00';
  document.getElementById('td').classList.remove('urgent');
}

function updateTimerDisplay() {
  const m = Math.floor(timerSec / 60), s = timerSec % 60;
  const display = document.getElementById('td');
  if (display) {
    display.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    display.classList.toggle('urgent', timerSec <= 60 && timerSec > 0);
  }
}

/* ═══════════════════════════════════════
   4. CLIENT-SERVER SIMULATION
   ═══════════════════════════════════════ */
let csRunning = false;
const csSteps = [
  { id: 'cs-step-0', text: "Cliente (Browser) dispara requisição: <code>GET /api/users</code>" },
  { id: 'cs-step-1', text: "Resolução DNS traduz domínio em IP e abre conexão TCP/TLS" },
  { id: 'cs-step-2', text: "Servidor recebe cabeçalhos HTTP e valida rota com Controller/Router" },
  { id: 'cs-step-3', text: "Controller consulta Banco de Dados e processa serialização em JSON" },
  { id: 'cs-step-4', text: "Servidor envia resposta <code>200 OK</code> com o JSON de usuários de volta" }
];

async function runClientServerSimulation() {
  if (csRunning) return;
  csRunning = true;
  const startBtn = document.getElementById('cs-sim-btn');
  if (startBtn) startBtn.disabled = true;
  
  // Clear steps
  csSteps.forEach(step => {
    const el = document.getElementById(step.id);
    if (el) el.classList.remove('active', 'done');
  });

  for (let i = 0; i < csSteps.length; i++) {
    const el = document.getElementById(csSteps[i].id);
    if (el) {
      el.classList.add('active');
      await sleep(1000);
      el.classList.remove('active');
      el.classList.add('done');
    }
  }
  
  if (startBtn) startBtn.disabled = false;
  csRunning = false;
}

function sleep(ms) { 
  return new Promise(r => setTimeout(r, ms)); 
}

/* ═══════════════════════════════════════
   5. WRITTEN ANSWERS & MODEL TOWARDS
   ═══════════════════════════════════════ */
function showModel(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('visible');
  const btn = event.currentTarget;
  if (btn && el) {
    btn.textContent = el.classList.contains('visible') ? '▲ Ocultar Gabarito' : 'Ver Gabarito';
  }
}
function clearAnswer(id) { 
  const el = document.getElementById(id);
  if (el) el.value = ''; 
}

/* ═══════════════════════════════════════
   6. DOM & EVENTS CODE CORRECTION
   ═══════════════════════════════════════ */
function showFix(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('visible');
  const btn = event.currentTarget;
  if (btn && el) {
    btn.textContent = el.classList.contains('visible') ? '▲ Ocultar Correção' : 'Ver Correção';
  }
}

function validateDOMFix(idx) {
  const editor = document.getElementById('fth-editor-' + idx);
  const fb = document.getElementById('fth-fb-' + idx);
  if (!editor || !fb) return;

  const code = editor.innerText;
  fb.classList.remove('ok', 'err');
  fb.classList.add('visible');

  let errors = [];
  const raw = code.toLowerCase();

  if (idx === 1) {
    if (raw.includes('getelementbyclass')) errors.push("Não existe 'getElementByClass'. O correto é 'getElementsByClassName' ou 'querySelector'.");
    if (!raw.includes('addeventlistener')) errors.push("Use 'addEventListener' para monitorar o clique de forma moderna.");
    if (raw.includes('onclick=')) errors.push("Evite colocar o clique inline ou por atributo direto 'onclick' se quiser estruturar um listener limpo.");
  }

  if (idx === 2) {
    if (!raw.includes('preventdefault()')) errors.push("Para formulários, chame 'event.preventDefault()' para interceptar o envio e evitar o recarregamento automático da página.");
    if (raw.includes('input.value()')) errors.push("Para ler um valor de input, use a propriedade '.value', não o chame como função '.value()'.");
  }

  if (errors.length === 0) {
    fb.innerHTML = '<strong>✓ Excelente!</strong> Código livre dos principais problemas apontados.';
    fb.classList.add('ok');
  } else {
    fb.innerHTML = '<strong>⚠ Ajustes necessários:</strong><br>• ' + errors.join('<br>• ');
    fb.classList.add('err');
  }
}

/* ═══════════════════════════════════════
   7. SANDBOX LAB TABS
   ═══════════════════════════════════════ */
function switchSandboxTab(tab, btn) {
  const panelParent = btn.closest('.demo-panel');
  panelParent.querySelectorAll('.sandbox-tab-btn').forEach(b => b.classList.remove('active'));
  panelParent.querySelectorAll('.sandbox-tab-panel').forEach(p => p.classList.remove('active'));

  btn.classList.add('active');
  const panel = panelParent.querySelector('#sandbox-panel-' + tab);
  if (panel) panel.classList.add('active');
}

/* API Request Lab */
function executeSandboxApi() {
  const verb = document.getElementById('sandbox-api-verb').value;
  const url = document.getElementById('sandbox-api-url').value;
  const consoleEl = document.getElementById('sandbox-api-console');
  if (!consoleEl) return;

  consoleEl.innerHTML = '// Enviando chamada HTTP assíncrona fictícia...';
  setTimeout(() => {
    consoleEl.innerHTML = `
<span style="color:var(--green)">[HTTP Success] Requisição Efetuada:</span>
<span style="color:var(--cyan)">Verbo:</span> ${verb}
<span style="color:var(--cyan)">Destino:</span> https://api.universidade.edu${url}
<span style="color:var(--yellow)">Status Code:</span> ${verb === 'POST' ? '201 Created' : '200 OK'}
<span style="color:var(--primary)">JSON Response:</span> {
  "status": "success",
  "endpoint": "${url}",
  "timestamp": ${Date.now()},
  "data": { "msg": "Simulação efetuada com sucesso" }
}
    `.trim();
  }, 750);
}

/* Storage Lab */
function executeSandboxSave() {
  const key = document.getElementById('sandbox-key').value.trim();
  const val = document.getElementById('sandbox-val').value.trim();
  const log = document.getElementById('sandbox-storage-console');
  if (!log) return;

  if (!key) {
    alert('Por favor digite uma chave válida.');
    return;
  }
  localStorage.setItem(key, val);
  log.innerHTML = `[LocalStorage] Chave <strong style="color:var(--pink)">"${key}"</strong> salva com o valor <strong style="color:var(--green)">"${val}"</strong>.`;
  showActiveStorageKeys();
}

function executeSandboxLoad() {
  const key = document.getElementById('sandbox-key').value.trim();
  const log = document.getElementById('sandbox-storage-console');
  if (!log) return;

  if (!key) {
    alert('Por favor digite uma chave válida.');
    return;
  }
  const val = localStorage.getItem(key);
  if (val === null) {
    log.innerHTML = `[LocalStorage] Chave <strong style="color:var(--pink)">"${key}"</strong> não encontrada no armazenamento local.`;
  } else {
    log.innerHTML = `[LocalStorage] Carregado: <strong style="color:var(--pink)">"${key}"</strong> = <strong style="color:var(--green)">"${val}"</strong>`;
  }
}

function showActiveStorageKeys() {
  const container = document.getElementById('sandbox-active-keys');
  if (!container) return;
  container.innerHTML = '';
  if (localStorage.length === 0) {
    container.innerHTML = '<span style="color:var(--txt2);">Nenhuma chave ativa no LocalStorage.</span>';
    return;
  }
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const item = document.createElement('div');
    item.className = 'db-item';
    item.innerHTML = `Chave: <strong>${key}</strong> (Remover)`;
    item.onclick = function() {
      localStorage.removeItem(key);
      showActiveStorageKeys();
      const log = document.getElementById('sandbox-storage-console');
      if (log) log.innerHTML = `[LocalStorage] Chave "${key}" removida.`;
    };
    container.appendChild(item);
  }
}

/* JSON Validator Lab */
function executeJsonValidator() {
  const text = document.getElementById('sandbox-json-text').value;
  const consoleEl = document.getElementById('sandbox-json-console');
  if (!consoleEl) return;

  try {
    const parsed = JSON.parse(text);
    consoleEl.style.color = '#34d399';
    consoleEl.innerHTML = `✓ JSON 100% Válido!\n\nObjeto Parseado:\n` + JSON.stringify(parsed, null, 2);
  } catch (e) {
    consoleEl.style.color = 'var(--accent)';
    consoleEl.innerHTML = `✗ JSON Inválido!\nErro: ${e.message}\n\nDica: Lembre-se que JSON exige aspas duplas ("") em chaves e strings, e vírgulas corretas.`;
  }
}

/* Security Auth Roles Simulator */
const simulatedPermissions = {
  guest: { read: '🔓 Permitido', edit: '🔒 Bloqueado', admin: '🔒 Bloqueado' },
  user: { read: '🔓 Permitido', edit: '🔓 Permitido', admin: '🔒 Bloqueado' },
  admin: { read: '🔓 Permitido', edit: '🔓 Permitido', admin: '🔓 Permitido' }
};

function selectSandboxRole(role, btn) {
  const panel = btn.closest('.demo-panel');
  if (!panel) return;
  panel.querySelectorAll('.flex-row .btn').forEach(b => b.className = 'btn btn-ghost');
  btn.className = 'btn btn-primary';

  const perms = simulatedPermissions[role];
  const cardRead = panel.querySelector('#sim-card-read');
  const cardEdit = panel.querySelector('#sim-card-edit');
  const cardAdmin = panel.querySelector('#sim-card-admin');

  updateSimCard(cardRead, perms.read);
  updateSimCard(cardEdit, perms.edit);
  updateSimCard(cardAdmin, perms.admin);
}

function updateSimCard(card, status) {
  if (!card) return;
  const badge = card.querySelector('.role-status-icon');
  if (status.includes('Permitido')) {
    card.className = 'role-card allowed';
    badge.textContent = '🔓 Permitido';
  } else {
    card.className = 'role-card denied';
    badge.textContent = '🔒 Bloqueado';
  }
}

/* Framework State Simulator */
let reactiveCounter = 0;
function incrementReactiveState() {
  reactiveCounter++;
  const stateEl = document.getElementById('framework-state-val');
  const domEl = document.getElementById('framework-dom-val');
  const vdomLog = document.getElementById('vdom-diff-log');

  if (stateEl) stateEl.textContent = reactiveCounter;
  
  if (domEl) {
    domEl.classList.add('pulse');
    domEl.textContent = `Página Renderizada (Contagem: ${reactiveCounter})`;
    setTimeout(() => domEl.classList.remove('pulse'), 500);
  }

  if (vdomLog) {
    vdomLog.innerHTML = `
[Virtual DOM Diff]
1. Estado mudou de ${reactiveCounter - 1} para ${reactiveCounter}.
2. Novo Virtual Tree gerado em memória.
3. Diffing: Árvores comparadas. Identificado nó de texto alterado.
4. Patch: Apenas 1 nó atualizado no DOM real de forma ultra-rápão.
    `.trim();
  }
}

/* ═══════════════════════════════════════
   8. FLASHCARDS SYSTEM
   ═══════════════════════════════════════ */
const fcM2 = [
  { term: 'document.querySelector()', cat: 'DOM API', answer: 'Busca e retorna o primeiro elemento no DOM que casa com o seletor CSS informado (ex: "#id" ou ".class").' },
  { term: 'addEventListener()', cat: 'DOM Events', answer: 'Associa uma função manipuladora (handler) a um evento específico (ex: "click", "submit", "input") em um elemento.' },
  { term: 'JSON.stringify()', cat: 'JSON API', answer: 'Transforma uma estrutura de dados (como objetos ou arrays) em uma string no formato de intercâmbio JSON.' },
  { term: 'JSON.parse()', cat: 'JSON API', answer: 'Analisa uma string contendo dados JSON e a converte de volta em objetos nativos do JavaScript.' },
  { term: 'async / await', cat: 'JS Async', answer: 'Sintaxe moderna construída sobre Promises que permite escrever fluxos assíncronos de forma linear e limpa com try/catch.' },
  { term: 'CORS', cat: 'Web Security', answer: 'Cross-Origin Resource Sharing. Mecanismo que usa cabeçalhos HTTP do lado do servidor para liberar recursos para chamadas de origens externas.' },
  { term: 'XSS', cat: 'Web Security', answer: 'Cross-Site Scripting. Ataque de injeção de scripts no qual strings enviadas por usuários são interpretadas como código por falha de sanitização.' },
  { term: 'LocalStorage', cat: 'Web Storage', answer: 'Armazenamento chave-valor persistente de até 5-10MB por origem no navegador. Os dados permanecem mesmo fechando a aba/janela.' },
  { term: 'SessionStorage', cat: 'Web Storage', answer: 'Similar ao LocalStorage, porém os dados expiram imediatamente após o encerramento da aba ou sessão de navegação.' },
  { term: 'Virtual DOM', cat: 'Frameworks', answer: 'Representação em memória do DOM real. Frameworks realizam o "diffing" no Virtual DOM para aplicar atualizações cirúrgicas de alta performance.' }
];

let fcM2Idx = 0;

function flipCard(sceneId) {
  const scene = document.getElementById(sceneId);
  if (scene) scene.classList.toggle('flipped');
}

function nextCard() {
  const scene = document.getElementById('fc-m2-scene');
  if (scene) scene.classList.remove('flipped');
  fcM2Idx = (fcM2Idx + 1) % fcM2.length;
  updateFCards();
}

function prevCard() {
  const scene = document.getElementById('fc-m2-scene');
  if (scene) scene.classList.remove('flipped');
  fcM2Idx = (fcM2Idx - 1 + fcM2.length) % fcM2.length;
  updateFCards();
}

function updateFCards() {
  const card = fcM2[fcM2Idx];
  const termEl = document.getElementById('fc-m2-term');
  const catEl = document.getElementById('fc-m2-cat');
  const ansEl = document.getElementById('fc-m2-answer');
  const counterEl = document.getElementById('fc-m2-counter');

  if (termEl) termEl.textContent = card.term;
  if (catEl) catEl.textContent = card.cat;
  if (ansEl) ansEl.textContent = card.answer;
  if (counterEl) counterEl.textContent = `${fcM2Idx + 1} / ${fcM2.length}`;
}

// Keyboard keybindings for flashcards
const fcScene = document.getElementById('fc-m2-scene');
if (fcScene) {
  fcScene.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { 
      e.preventDefault(); 
      fcScene.classList.toggle('flipped'); 
    }
  });
}

/* ═══════════════════════════════════════
   9. QUIZ ENGINE (GENERIC CLASS)
   ═══════════════════════════════════════ */
function createQuizEngine(questions, prefix) {
  let currentQ = 0, score = 0, answered = false;

  function render() {
    const q = questions[currentQ];
    const pct = ((currentQ + 1) / questions.length) * 100;

    const counterEl = document.getElementById(prefix + '-counter');
    const barEl = document.getElementById(prefix + '-bar');
    const qEl = document.getElementById(prefix + '-q');
    const fbEl = document.getElementById(prefix + '-fb');
    const nextBtn = document.getElementById(prefix + '-next');

    if (counterEl) counterEl.textContent = `Questão ${currentQ + 1} de ${questions.length}`;
    if (barEl) barEl.style.width = pct + '%';
    if (qEl) qEl.textContent = q.q;
    if (fbEl) {
      fbEl.textContent = '';
      fbEl.className = 'qz-feedback';
      fbEl.style.display = 'none';
    }
    if (nextBtn) nextBtn.disabled = true;
    answered = false;

    const opts = document.getElementById(prefix + '-opts');
    if (opts) {
      opts.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];
      q.opts.forEach((opt, i) => {
        const safeOpt = opt.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const btn = document.createElement('button');
        btn.className = 'qz-opt';
        btn.innerHTML = `<span class="opt-badge">${letters[i]}</span>${safeOpt}`;
        btn.addEventListener('click', () => selectAnswer(i));
        opts.appendChild(btn);
      });
    }
  }

  function selectAnswer(idx) {
    if (answered) return;
    answered = true;
    const q = questions[currentQ];
    const opts = document.querySelectorAll('#' + prefix + '-opts .qz-opt');
    const fb = document.getElementById(prefix + '-fb');
    const nextBtn = document.getElementById(prefix + '-next');

    opts.forEach((b, i) => {
      b.disabled = true;
      if (i === q.correct) b.classList.add('correct');
      else if (i === idx) b.classList.add('wrong');
    });

    if (fb) {
      fb.style.display = 'block';
      if (idx === q.correct) {
        score++;
        fb.textContent = '✓ Correto! ' + q.explain;
        fb.className = 'qz-feedback ok';
      } else {
        fb.textContent = '✗ Incorreto. ' + q.explain;
        fb.className = 'qz-feedback err';
      }
    }

    const scoreEl = document.getElementById(prefix + '-score');
    if (scoreEl) scoreEl.textContent = '✓ ' + score;
    if (nextBtn) nextBtn.disabled = false;
  }

  function next() {
    currentQ++;
    if (currentQ < questions.length) { 
      render(); 
    } else {
      const area = document.getElementById(prefix + '-area');
      const res = document.getElementById(prefix + '-result');
      const bigScore = document.getElementById(prefix + '-big');
      const msgEl = document.getElementById(prefix + '-msg');
      const restartBtn = document.getElementById(prefix + '-restart');

      if (area) area.style.display = 'none';
      if (res) res.classList.remove('hidden');
      
      const pct = Math.round(score / questions.length * 100);
      if (bigScore) bigScore.textContent = score + '/' + questions.length;
      
      let msg;
      if (pct >= 90) msg = '🏆 Excelente! Você domina estes conceitos do Módulo 2!';
      else if (pct >= 70) msg = '👍 Bom resultado! Dê uma rápida revisada nos erros.';
      else if (pct >= 50) msg = '📚 Estude um pouco mais — releia a teoria e tente novamente.';
      else msg = '💪 Continue praticando! Use os simuladores e revise a matéria.';
      
      if (msgEl) msgEl.textContent = msg;
      if (restartBtn) restartBtn.style.display = 'inline-flex';
    }
  }

  function restart() {
    currentQ = 0; score = 0; answered = false;
    const area = document.getElementById(prefix + '-area');
    const res = document.getElementById(prefix + '-result');
    const scoreEl = document.getElementById(prefix + '-score');
    const restartBtn = document.getElementById(prefix + '-restart');

    if (area) area.style.display = 'block';
    if (res) res.classList.add('hidden');
    if (scoreEl) scoreEl.textContent = '✓ 0';
    if (restartBtn) restartBtn.style.display = 'none';
    render();
  }

  render();
  return { next, restart };
}

/* ═══════════════════════════════════════
   10. TOPIC MINI-QUIZZES DATA
   ═══════════════════════════════════════ */

/* Topic 1: Client-Server */
const clientServerQuestions = [
  { q: "Qual a função do servidor no modelo cliente-servidor?", opts: ["Iniciar a requisição HTTP", "Hospedar o navegador", "Processar requisições e devolver respostas", "Traduzir IPs em domínios"], correct: 2, explain: "O servidor escuta conexões, processa as solicitações enviadas pelo cliente e envia de volta uma resposta correspondente." },
  { q: "Quem inicia a comunicação HTTP em uma chamada clássica?", opts: ["O cliente", "O servidor", "O banco de dados", "O proxy reverso"], correct: 0, explain: "No modelo Request/Response clássico da Web, a comunicação é sempre disparada e iniciada pelo cliente." },
  { q: "O que é o ciclo Request/Response?", opts: ["O ciclo de vida de uma tag HTML", "O fluxo de envio de dados do browser e a resposta do servidor", "A compilação de código JS", "O backup do banco de dados"], correct: 1, explain: "É a troca básica de mensagens entre cliente (Request) e servidor (Response)." },
  { q: "O que acontece quando um usuário clica em um link de uma página web?", opts: ["O navegador envia uma requisição para o servidor", "O CSS é convertido em JavaScript", "O banco de dados é apagado", "O HTML deixa de existir"], correct: 0, explain: "Clicar em um link faz o navegador emitir uma nova requisição HTTP para a URL de destino." },
  { q: "Qual código HTTP normalmente indica que uma operação foi realizada com sucesso?", opts: ["200", "404", "500", "403"], correct: 0, explain: "A família de status 2xx (como o 200 OK) indica que a requisição foi recebida e processada com sucesso." },
  { q: "Qual alternativa representa melhor um exemplo de frontend?", opts: ["Banco de dados MySQL", "Interface visual exibida ao usuário", "Servidor Node.js", "API REST"], correct: 1, explain: "O frontend compreende tudo que roda no cliente e com o qual o usuário interage diretamente (a interface visual)." },
  { q: "Um usuário preenche um formulário de cadastro e clica em 'Salvar'. Qual sequência representa o fluxo correto da informação?", opts: ["Navegador → Servidor → Banco de Dados → Servidor → Navegador", "Banco de Dados → Navegador → Servidor", "Servidor → Navegador → Banco de Dados", "Navegador → CSS → Banco de Dados"], correct: 0, explain: "A informação sai do cliente (Navegador), é tratada pela lógica da aplicação (Servidor), persistida no Banco de Dados, respondida pelo Servidor e exibida no Navegador." }
];

/* Topic 2: DOM & Events */
const domEventsQuestions = [
  { q: "Em uma aplicação web, qual tecnologia é responsável por adicionar interatividade à página?", opts: ["DNS", "HTML", "JavaScript", "TCP"], correct: 2, explain: "Enquanto o HTML estrutura e o CSS estiliza, o JavaScript é a linguagem que controla a interatividade e comportamentos dinâmicos." },
  { q: "Qual método JavaScript é frequentemente utilizado para responder a um clique do usuário?", opts: ["addEventListener()", "createDatabase()", "openServer()", "connectAPI()"], correct: 0, explain: "O método addEventListener() registra um ouvinte para disparar uma função callback quando o usuário clica ou interage com o elemento." },
  { q: "Em um formulário de cadastro, qual tipo de validação ajuda a impedir que um campo obrigatório seja enviado vazio?", opts: ["required", "hover", "display", "padding"], correct: 0, explain: "O atributo booleano HTML5 'required' ativa a validação nativa do navegador impedindo o envio se o campo estiver vazio." },
  { q: "Observe o código: document.getElementById('mensagem').textContent = 'Olá!'. O que ele faz?", opts: ["Cria uma nova página HTML", "Altera o texto de um elemento existente", "Remove todos os elementos da página", "Cria um banco de dados"], correct: 1, explain: "Esse código localiza o nó pelo ID 'mensagem' e atualiza a propriedade textContent para mudar o texto visível." }
];

/* Topic 3: AJAX & Fetch */
const ajaxFetchQuestions = [
  { q: "O que a Fetch API retorna imediatamente quando chamada?", opts: ["Um objeto JSON", "Uma String", "Uma Promise representando a chamada futura", "Um Array de dados"], correct: 2, explain: "Fetch é uma operação assíncrona, portanto retorna de imediato um objeto Promise que será resolvido no futuro." },
  { q: "Qual método lê a resposta de um Fetch como JSON convertendo-o de volta em objeto?", opts: [".text()", ".json()", "JSON.parse()", ".body()"], correct: 1, explain: "O método .json() do objeto Response lê e parseia o corpo da resposta HTTP de forma assíncrona." },
  { q: "Sobre APIs Web, qual alternativa está correta?", opts: ["São acessadas apenas por aplicativos desktop", "Elas não podem transferir dados em JSON", "Permitem a comunicação entre sistemas e podem ser consumidas com JS", "Elas rodam direto no banco de dados do cliente"], correct: 2, explain: "APIs Web servem para integrar sistemas, trafegam dados em JSON ou XML e são consumidas assincronamente pelo JS no browser." },
  { q: "Qual das opções abaixo representa uma estrutura JSON válida?", opts: ["{ \"produto\": \"Notebook\", \"preco\": 3500 }", "{ produto = Notebook, preco = 3500 }", "<produto>Notebook</produto>", "[produto:Notebook]"], correct: 0, explain: "A primeira opção usa aspas duplas nas chaves e strings, seguindo a especificação estrita do JSON." },
  { q: "Qual é a principal função de uma API REST?", opts: ["Definir estilos CSS", "Criar imagens", "Permitir troca de informações entre aplicações", "Substituir bancos de dados"], correct: 2, explain: "APIs REST padronizam a comunicação e troca de recursos entre aplicações por meio do protocolo HTTP." },
  { q: "Qual método HTTP é mais apropriado para remover um registro de uma API?", opts: ["GET", "POST", "DELETE", "PATCH"], correct: 2, explain: "O verbo HTTP DELETE é o padrão recomendado no REST para solicitar a exclusão de um recurso." }
];

/* Topic 4: Storage */
const storageQuestions = [
  { q: "Qual armazenamento web persiste os dados mesmo se o navegador for fechado?", opts: ["SessionStorage", "Cookies temporários", "LocalStorage", "Cache HTTP"], correct: 2, explain: "LocalStorage armazena dados de forma permanente (sem expiração de tempo) no navegador por origem." },
  { q: "Qual o limite de tamanho aproximado de armazenamento do LocalStorage?", opts: ["4KB", "100KB", "5MB a 10MB", "Ilimitado"], correct: 2, explain: "O LocalStorage geralmente aceita de 5MB a 10MB de dados de texto em formato chave-valor." },
  { q: "Qual recurso permite armazenar informações diretamente no navegador do usuário?", opts: ["localStorage", "DNS", "HTTP", "API"], correct: 0, explain: "O localStorage (Web Storage) é o recurso nativo do navegador para armazenar informações chave-valor localmente." }
];

/* Topic 5: Security */
const securityQuestions = [
  { q: "Qual a diferença entre Autenticação e Autorização?", opts: ["São sinônimos idênticos", "Autenticação valida identidade (quem é); Autorização valida privilégios (o que pode fazer)", "Autenticação é backend, Autorização é frontend", "Autenticação usa cookies, Autorização não"], correct: 1, explain: "Autenticação estabelece se você é o usuário real; Autorização decide se esse usuário tem permissão para acessar determinado recurso." },
  { q: "Quando utilizamos HTTPS em vez de HTTP, estamos:", opts: ["Melhorando a criptografia da comunicação", "Removendo a necessidade de login", "Eliminando o uso do servidor", "Substituindo o JavaScript"], correct: 0, explain: "O HTTPS envelopa a camada HTTP com criptografia SSL/TLS, garantindo confidencialidade e integridade dos dados em trânsito." },
  { q: "Em um sistema de login, a autenticação tem como objetivo:", opts: ["Verificar a identidade do usuário", "Definir o layout da página", "Armazenar imagens", "Criar APIs"], correct: 0, explain: "Autenticar consiste em validar que o usuário é quem ele diz ser (ex: confrontar email e senha informados)." },
  { q: "Após autenticar um usuário, qual conceito define quais áreas do sistema ele pode acessar?", opts: ["Responsividade", "Autorização", "Semântica", "Renderização"], correct: 1, explain: "A autorização valida quais permissões (roles/privilégios) o usuário logado possui para acessar recursos específicos." }
];

/* Topic 6: Frameworks */
const frameworksQuestions = [
  { q: "Qual biblioteca é amplamente conhecida por ser baseada em componentes e criada pelo Facebook?", opts: ["Angular", "React", "Vue.js", "jQuery"], correct: 1, explain: "React é uma biblioteca front-end baseada em componentes criada e mantida pelo Facebook (Meta)." },
  { q: "Qual framework estruturado mantido pelo Google inclui de forma nativa quase tudo o que é necessário para grandes aplicações corporativas?", opts: ["React", "Vue.js", "Angular", "WordPress"], correct: 2, explain: "Angular é um framework robusto mantido pelo Google, projetado com uma arquitetura completa para aplicações enterprise." }
];

// Initialize mini-quizzes
let csEngine, domEngine, fetchEngine, storageEngine, securityEngine, frameworksEngine;

function initMiniQuizzes() {
  csEngine = createQuizEngine(clientServerQuestions, 'qcs');
  domEngine = createQuizEngine(domEventsQuestions, 'qdom');
  fetchEngine = createQuizEngine(ajaxFetchQuestions, 'qfch');
  storageEngine = createQuizEngine(storageQuestions, 'qstg');
  securityEngine = createQuizEngine(securityQuestions, 'qsec');
  frameworksEngine = createQuizEngine(frameworksQuestions, 'qfwk');
}

// Next/Restart handlers for mini-quizzes
function csQuizNext() { csEngine.next(); }
function csQuizRestart() { csEngine.restart(); }
function domQuizNext() { domEngine.next(); }
function domQuizRestart() { domEngine.restart(); }
function fetchQuizNext() { fetchEngine.next(); }
function fetchQuizRestart() { fetchEngine.restart(); }
function storageQuizNext() { storageEngine.next(); }
function storageQuizRestart() { storageEngine.restart(); }
function securityQuizNext() { securityEngine.next(); }
function securityQuizRestart() { securityEngine.restart(); }
function frameworksQuizNext() { frameworksEngine.next(); }
function frameworksQuizRestart() { frameworksEngine.restart(); }


/* ═══════════════════════════════════════
   11. MAIN SIMULADO QUIZ (Relocated Questions)
   ═══════════════════════════════════════ */
const mainQuestionsList = [
  { q: "No modelo Cliente-Servidor, qual componente inicia a comunicação?", opts: ["O Banco de Dados", "O Servidor", "O Cliente", "O Provedor DNS"], correct: 2, explain: "No ciclo Request/Response clássico, a requisição sempre é iniciada pelo Cliente (como o Browser)." },
  { q: "Qual dos seguintes códigos de status HTTP indica que o recurso não foi encontrado?", opts: ["200", "301", "404", "500"], correct: 2, explain: "O código 404 indica 'Not Found', indicando que o servidor não conseguiu achar a URL requisitada." },
  { q: "O método PUT é comumente associado a qual operação do banco de dados (CRUD)?", opts: ["Create (Criar)", "Update (Atualizar Completamente)", "Read (Ler)", "Delete (Excluir)"], correct: 1, explain: "O verbo PUT é usado para substituir completamente a representação de um recurso existente." },
  { q: "Qual evento JS monitora especificamente a mudança de valor em caixas de input enquanto o usuário digita?", opts: ["click", "submit", "input", "mouseover"], correct: 2, explain: "O evento 'input' é disparado imediatamente a cada tecla pressionada que altera o valor da caixa." },
  { q: "Qual atributo HTML5 garante de forma nativa que um campo não seja enviado em branco?", opts: ["placeholder", "required", "minlength", "email"], correct: 1, explain: "O atributo booleano 'required' aciona mensagens de aviso nativas do navegador se o campo estiver vazio." },
  { q: "No JSON, quais caracteres são obrigatórios para delimitar chaves (keys)?", opts: ["Aspas simples ('')", "Aspas duplas (\"\")", "Crase (backtick)", "Nenhum delimitador"], correct: 1, explain: "A especificação estrita do JSON exige que as strings de chaves (keys) e valores usem aspas duplas." },
  { q: "A Fetch API retorna um objeto do tipo:", opts: ["String", "Array", "Promise", "XML"], correct: 2, explain: "Fetch retorna uma Promise que é resolvida com o objeto Response representando a chamada futura." },
  { q: "Em uma API RESTful, o recurso '/users/15' representa:", opts: ["O usuário de ID 15", "Uma lista de 15 usuários", "A deleção do usuário", "A criação de 15 contas"], correct: 0, explain: "Na convenção REST, caminhos com IDs representam itens específicos individuais de uma coleção." },
  { q: "O protocolo HTTPS roda comumente em cima de qual camada criptográfica?", opts: ["SQL/NoSQL", "Express", "SSL/TLS", "DNS"], correct: 2, explain: "SSL/TLS fornece a camada de criptografia simétrica e assimétrica sobre a comunicação HTTP pura." }
];

let mainQuizEngine;
function initMainQuiz() {
  mainQuizEngine = createQuizEngine(mainQuestionsList, 'quiz');
}
function nextQuestion() { mainQuizEngine.next(); }
function restartQuiz() { mainQuizEngine.restart(); }


/* ═══════════════════════════════════════
   12. SELF-ASSESSMENT CHECKLIST
   ═══════════════════════════════════════ */
const checkItems = [
  'Entendo a diferença entre Cliente e Servidor no modelo Request/Response',
  'Sei selecionar elementos do DOM usando querySelector e querySelectorAll',
  'Sei criar e remover elementos dinamicamente (createElement, appendChild, remove)',
  'Entendo eventos do DOM e sei usar addEventListener',
  'Consigo fazer chamadas assíncronas usando a Fetch API',
  'Sei o que é uma Promise e como usar async/await para lidar com assincronismo',
  'Entendo o formato JSON e sei usar JSON.parse() e JSON.stringify()',
  'Diferencio LocalStorage, SessionStorage e Cookies para armazenamento',
  'Sei como funciona o HTTPS e por que o SSL/TLS é necessário',
  'Compreendo o Same-Origin Policy e por que o CORS é configurado no servidor',
  'Entendo o que é Cross-Site Scripting (XSS) e como sanitizar inputs',
  'Sei a diferença entre Autenticação (quem é) e Autorização (o que pode fazer)',
  'Diferencio aplicações SPA (Single Page Application) de MPA (Multi-Page Application)',
  'Compreendo o conceito de Estado Reativo e Virtual DOM usado por React/Vue',
  'Consigo iniciar projetos utilizando o Vite e gerenciando dependências com npm'
];

const CL_KEY = 'revisao_second_test_checklist';

function loadCLState() {
  try {
    return JSON.parse(localStorage.getItem(CL_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveCLState(state) {
  localStorage.setItem(CL_KEY, JSON.stringify(state));
}

function renderChecklist() {
  const grid = document.getElementById('checklist-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const state = loadCLState();

  checkItems.forEach((item, idx) => {
    const isChecked = !!state[idx];
    const itemEl = document.createElement('div');
    itemEl.className = 'check-item' + (isChecked ? ' checked' : '');
    itemEl.setAttribute('role', 'checkbox');
    itemEl.setAttribute('aria-checked', isChecked ? 'true' : 'false');
    itemEl.setAttribute('tabindex', '0');
    itemEl.innerHTML = `
      <div class="check-box">${isChecked ? '✓' : ''}</div>
      <div class="check-label">${item}</div>
    `;

    const toggle = () => {
      state[idx] = !state[idx];
      saveCLState(state);
      renderChecklist();
      updateChecklistProgress();
    };

    itemEl.addEventListener('click', toggle);
    itemEl.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggle();
      }
    });

    grid.appendChild(itemEl);
  });
  updateChecklistProgress();
}

function updateChecklistProgress() {
  const state = loadCLState();
  const checkedCount = Object.values(state).filter(Boolean).length;
  const totalCount = checkItems.length;
  const pct = totalCount === 0 ? 0 : Math.round((checkedCount / totalCount) * 100);

  const countEl = document.getElementById('check-count');
  const totalEl = document.getElementById('check-total');
  const barEl = document.getElementById('check-bar');
  const statEl = document.getElementById('check-stat');

  if (countEl) countEl.textContent = checkedCount;
  if (totalEl) totalEl.textContent = totalCount;
  if (barEl) barEl.style.width = pct + '%';
  if (statEl) statEl.textContent = pct + '%';
}


/* ═══════════════════════════════════════
   13. LIVE CODING CHALLENGE (PLAYGROUND)
   ═══════════════════════════════════════ */
const challengeTasks = [
  { id: 'has_dom_selector', label: 'Selecionou elemento pelo ID "target" usando querySelector' },
  { id: 'has_click_event', label: 'Adicionou evento de clique usando addEventListener' },
  { id: 'has_text_content', label: 'Alterou o texto do elemento usando textContent de forma segura' },
  { id: 'has_local_storage', label: 'Salvou ou buscou um item usando localStorage.setItem ou getItem' },
  { id: 'has_async_fetch', label: 'Usou a Fetch API para disparar chamada assíncrona' }
];

let challengeState = {};

function renderChallengeChecklist() {
  const grid = document.getElementById('challenge-grid');
  if (!grid) return;
  grid.innerHTML = '';

  challengeTasks.forEach(task => {
    const done = !!challengeState[task.id];
    const div = document.createElement('div');
    div.className = 'challenge-check' + (done ? ' done' : '');
    div.style.cursor = 'default';
    div.innerHTML = `<span class="cc-box">${done ? '✓' : ''}</span><span class="cc-text">${task.label}</span>`;
    grid.appendChild(div);
  });

  updateChallengeScore();
}

function updateChallengeScore() {
  const doneCount = Object.values(challengeState).filter(Boolean).length;
  const total = challengeTasks.length;
  const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  const pctEl = document.getElementById('challenge-pct');
  const barEl = document.getElementById('challenge-bar');
  const msgEl = document.getElementById('challenge-msg');

  if (pctEl) pctEl.textContent = pct + '%';
  if (barEl) barEl.style.width = pct + '%';

  let msg;
  if (pct === 100) msg = '🏆 Desafio 100% Concluído! Você provou domínio no código assíncrono e manipulador!';
  else if (pct >= 60) msg = '👍 Muito bom! Quase lá, verifique os critérios que restam.';
  else if (pct >= 20) msg = '💪 Mão na massa! A lógica assíncrona está sendo desenvolvida.';
  else msg = '🚀 Escreva seu código JS abaixo e clique em Validar Código para pontuar!';
  
  if (msgEl) msgEl.textContent = msg;
}

function updateLivePreview() {
  const editor = document.getElementById('pg-editor');
  const iframe = document.getElementById('pg-preview');
  if (!editor || !iframe) return;
  iframe.srcdoc = `
    <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 1.5rem; background: #fafafa; color: #333; }
          #target { padding: 1rem; border: 2px dashed #bbb; border-radius: 8px; text-align: center; font-weight: bold; background: #fff; cursor: pointer; transition: all 0.2s; }
          #target:hover { border-color: #58a6ff; background: #f0f7ff; }
        </style>
      </head>
      <body>
        <h3>Laboratório Prático Módulo 2</h3>
        <p>Clique no elemento pontilhado abaixo para disparar seu script:</p>
        <div id="target">Clique Aqui para Testar</div>
        <script>
          ${editor.value}
        </script>
      </body>
    </html>
  `;
}

const ed = document.getElementById('pg-editor');
if (ed) {
  ed.addEventListener('input', () => {
    clearTimeout(window.previewTimeout);
    window.previewTimeout = setTimeout(updateLivePreview, 400);
  });
}

function validatePlayground() {
  const code = document.getElementById('pg-editor').value;
  const raw = code.toLowerCase();

  const state = {};
  state.has_dom_selector = raw.includes("queryselector('#target')") || raw.includes('queryselector("#target")') || raw.includes("getelementbyid('target')") || raw.includes('getelementbyid("target")');
  state.has_click_event = raw.includes("addeventlistener('click'") || raw.includes('addeventlistener("click"') || raw.includes(".onclick");
  state.has_text_content = raw.includes(".textcontent");
  state.has_local_storage = raw.includes("localstorage.setitem") || raw.includes("localstorage.getitem");
  state.has_async_fetch = raw.includes("fetch(") || raw.includes("fetch (");

  challengeState = state;
  renderChallengeChecklist();
}

/* ═══════════════════════════════════════
   14. CHEAT SHEET TABS SWITCHER
   ═══════════════════════════════════════ */
function switchTab(id) {
  document.querySelectorAll('.cheat-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.cheat-tab').forEach(t => { 
    t.classList.remove('active'); 
    t.setAttribute('aria-selected', 'false'); 
  });
  
  const panel = document.getElementById('panel-' + id);
  const tab = document.getElementById('tab-' + id);
  if (panel) panel.classList.add('active');
  if (tab) {
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
  }
}

/* ═══════════════════════════════════════
   15. INITIALIZATION
   ═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initMiniQuizzes();
  initMainQuiz();
  updateFCards();
  renderChecklist();
  showActiveStorageKeys();
  renderChallengeChecklist();
  updateLivePreview();
});
