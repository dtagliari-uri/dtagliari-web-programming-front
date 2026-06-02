
/* ════════════════════════════════════════
   1. DARK/LIGHT MODE
════════════════════════════════════════ */
const body = document.body;
const modeBtn = document.getElementById('mode-toggle');

// Load saved preference
if (localStorage.getItem('showcase-theme') === 'light') {
  body.classList.add('light');
  modeBtn.textContent = '☀️';
}

if (modeBtn) {
  modeBtn.addEventListener('click', () => {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    modeBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('showcase-theme', isLight ? 'light' : 'dark');
  });
}

/* ════════════════════════════════════════
   2. SCROLL PROGRESS + BACK TO TOP
════════════════════════════════════════ */
const scrollBar = document.getElementById('scroll-bar');
const backTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
  if (scrollBar) scrollBar.style.width = pct + '%';

  // Back to top visibility
  if (backTop) {
    if (window.scrollY > 400) backTop.classList.add('visible');
    else backTop.classList.remove('visible');
  }

  // Navbar active link
  updateActiveNav();
  updateBreakpoints();
}, { passive: true });

if (backTop) {
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ════════════════════════════════════════
   3. SCROLL REVEAL (IntersectionObserver)
════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll('.showcase-section').forEach(s => revealObserver.observe(s));

/* ════════════════════════════════════════
   4. ACTIVE NAVBAR LINK
════════════════════════════════════════ */
function updateActiveNav() {
  const sections = document.querySelectorAll('.showcase-section');
  const navLinks = document.querySelectorAll('.navbar-nav a');

  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      navLinks.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.navbar-nav a[href="#${sec.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}

/* ════════════════════════════════════════
   5. MOBILE NAV
════════════════════════════════════════ */
function toggleMobileNav() {
  const nav = document.getElementById('navbar-nav');
  const btn = document.getElementById('hamburger');
  const isOpen = nav.classList.toggle('mobile-open');
  btn.textContent = isOpen ? '✕' : '☰';
  btn.setAttribute('aria-expanded', isOpen.toString());
}

// Close mobile nav on link click
document.querySelectorAll('.navbar-nav a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navbar-nav').classList.remove('mobile-open');
    document.getElementById('hamburger').textContent = '☰';
    document.getElementById('hamburger').setAttribute('aria-expanded', 'false');
  });
});

/* ════════════════════════════════════════
   6. RESPONSIVE BREAKPOINT INDICATOR
════════════════════════════════════════ */
function updateBreakpoints() {
  const w = window.innerWidth;
  const bpXs = document.getElementById('bp-xs');
  if (bpXs) bpXs.classList.toggle('active', w < 480);
  const bpSm = document.getElementById('bp-sm');
  if (bpSm) bpSm.classList.toggle('active', w >= 480 && w < 768);
  const bpMd = document.getElementById('bp-md');
  if (bpMd) bpMd.classList.toggle('active', w >= 768 && w < 1024);
  const bpLg = document.getElementById('bp-lg');
  if (bpLg) bpLg.classList.toggle('active', w >= 1024);
}

window.addEventListener('resize', updateBreakpoints);
updateBreakpoints();

/* ════════════════════════════════════════
   7. HTTP REQUEST ANIMATION
════════════════════════════════════════ */
async function animarRequisicao() {
  const reqArrow = document.getElementById('req-arrow');
  const resArrow = document.getElementById('res-arrow');
  const log = document.getElementById('req-log');
  const btn = document.getElementById('req-btn');

  btn.disabled = true;

  // Step 1 — client sends request
  reqArrow.style.opacity = '1';
  log.textContent = '① Cliente envia: GET /index.html HTTP/1.1';
  await sleep(1200);

  // Step 2 — server processes
  reqArrow.style.opacity = '0.3';
  log.textContent = '② Servidor processa a requisição... (DNS → TCP → HTTP)';
  await sleep(900);

  // Step 3 — response
  resArrow.style.opacity = '1';
  log.textContent = '③ Servidor responde: HTTP/1.1 200 OK + HTML payload';
  await sleep(1200);

  // Step 4 — render
  log.textContent = '④ Browser recebe o HTML e renderiza a página. ✓ Completo!';
  await sleep(1800);

  // Reset
  reqArrow.style.opacity = '0';
  resArrow.style.opacity = '0';
  log.textContent = '';
  btn.disabled = false;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ════════════════════════════════════════
   8. HTML TAG EXPLORER
════════════════════════════════════════ */
const tagContent = {
  semantic: `<div>
        <p style="font-size:0.82rem;color:var(--mode-txt2);margin-bottom:1rem;">Tags semânticas transmitem significado ao browser e ao SEO:</p>
        <div style="display:flex;flex-direction:column;gap:0.5rem;">
          ${['header', 'nav', 'main', 'section', 'article', 'aside', 'footer'].map(t => `
          <div style="display:flex;align-items:center;gap:0.75rem;padding:0.6rem;background:var(--mode-bg2);border-radius:8px;border:1px solid var(--mode-border);">
            <code style="color:var(--blue);font-family:'Fira Code',monospace;font-size:0.82rem;min-width:90px;">&lt;${t}&gt;</code>
            <span style="font-size:0.82rem;color:var(--mode-txt2);">${{ header: 'Cabeçalho da página ou seção', nav: 'Bloco de links de navegação', main: 'Conteúdo principal (único)', section: 'Seção temática com heading', article: 'Conteúdo autônomo', aside: 'Conteúdo lateral/complementar', footer: 'Rodapé da página' }[t]}</span>
          </div>`).join('')}
        </div></div>`,

  form: `<form onsubmit="event.preventDefault()" style="display:flex;flex-direction:column;gap:0.75rem;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
          <input type="text" placeholder="&lt;input type=text&gt;" style="padding:0.5rem;background:var(--mode-bg2);border:1px solid var(--mode-border);border-radius:6px;color:var(--mode-txt);">
          <input type="email" placeholder="&lt;input type=email&gt;" style="padding:0.5rem;background:var(--mode-bg2);border:1px solid var(--mode-border);border-radius:6px;color:var(--mode-txt);">
          <input type="password" placeholder="&lt;input type=password&gt;" style="padding:0.5rem;background:var(--mode-bg2);border:1px solid var(--mode-border);border-radius:6px;color:var(--mode-txt);">
          <input type="number" placeholder="&lt;input type=number&gt;" style="padding:0.5rem;background:var(--mode-bg2);border:1px solid var(--mode-border);border-radius:6px;color:var(--mode-txt);">
          <input type="date" style="padding:0.5rem;background:var(--mode-bg2);border:1px solid var(--mode-border);border-radius:6px;color:var(--mode-txt);">
          <select style="padding:0.5rem;background:var(--mode-bg2);border:1px solid var(--mode-border);border-radius:6px;color:var(--mode-txt);"><option>&lt;select&gt;</option><option>Opção 1</option></select>
        </div>
        <textarea rows="2" placeholder="&lt;textarea&gt; — campo de texto longo" style="padding:0.5rem;background:var(--mode-bg2);border:1px solid var(--mode-border);border-radius:6px;color:var(--mode-txt);"></textarea>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
          <label style="display:flex;align-items:center;gap:0.4rem;font-size:0.82rem;"><input type="radio" name="rg"> Radio 1</label>
          <label style="display:flex;align-items:center;gap:0.4rem;font-size:0.82rem;"><input type="radio" name="rg"> Radio 2</label>
          <label style="display:flex;align-items:center;gap:0.4rem;font-size:0.82rem;"><input type="checkbox"> Checkbox A</label>
          <label style="display:flex;align-items:center;gap:0.4rem;font-size:0.82rem;"><input type="checkbox"> Checkbox B</label>
        </div>
        <button type="submit" style="padding:0.6rem;background:linear-gradient(135deg,var(--blue),var(--purple));color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;">&lt;button type="submit"&gt;</button>
      </form>`,

  table: `<table style="width:100%;border-collapse:collapse;font-size:0.82rem;">
        <caption style="text-align:left;font-size:0.78rem;color:var(--mode-txt2);margin-bottom:0.5rem;">&lt;table&gt; com thead, tbody, tfoot</caption>
        <thead><tr style="border-bottom:2px solid var(--mode-border);">
          <th style="padding:0.75rem;text-align:left;color:var(--blue);">Tag</th>
          <th style="padding:0.75rem;text-align:left;color:var(--blue);">Finalidade</th>
          <th style="padding:0.75rem;text-align:left;color:var(--blue);">Obrigatório?</th>
        </tr></thead>
        <tbody>
          ${[['&lt;thead&gt;', 'Cabeçalho da tabela', 'Recomendado'], ['&lt;tbody&gt;', 'Corpo de dados', 'Recomendado'], ['&lt;tr&gt;', 'Linha de dados', 'Sim'], ['&lt;th&gt;', 'Célula de cabeçalho', 'Sim (em thead)'], ['&lt;td&gt;', 'Célula de dado', 'Sim'], ['&lt;caption&gt;', 'Descrição da tabela', 'WCAG A11Y']].map((r, i) => `
          <tr style="border-bottom:1px solid rgba(255,255,255,0.05);background:${i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'};">
            <td style="padding:0.6rem;font-family:'Fira Code',monospace;color:var(--cyan);">${r[0]}</td>
            <td style="padding:0.6rem;color:var(--mode-txt2);">${r[1]}</td>
            <td style="padding:0.6rem;color:${r[2] === 'Sim' ? 'var(--green)' : 'var(--mode-txt2)'};">${r[2]}</td>
          </tr>`).join('')}
        </tbody>
      </table>`,

  media: `<div style="display:flex;flex-direction:column;gap:1rem;">
        <div>
          <p style="font-size:0.75rem;color:var(--mode-txt2);margin-bottom:0.4rem;">&lt;audio controls&gt; — Player de áudio nativo:</p>
          <audio controls style="width:100%;" aria-label="Demonstração de audio HTML5">
            <source src="https://www.soundjay.com/buttons/beep-01a.mp3" type="audio/mpeg">
            Seu navegador não suporta &lt;audio&gt;.
          </audio>
        </div>
        <div>
          <p style="font-size:0.75rem;color:var(--mode-txt2);margin-bottom:0.4rem;">&lt;video controls&gt; — Player de vídeo nativo:</p>
          <video controls width="100%" style="border-radius:8px;max-height:200px;" aria-label="Demonstração de video HTML5">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
            Seu navegador não suporta &lt;video&gt;.
          </video>
        </div>
        <div>
          <p style="font-size:0.75rem;color:var(--mode-txt2);margin-bottom:0.4rem;">&lt;iframe&gt; — Conteúdo externo embutido:</p>
          <iframe src="https://info.cern.ch" title="Primeiro website do mundo — CERN" width="100%" height="150" style="border:1px solid var(--mode-border);border-radius:8px;background:#fff;" loading="lazy"></iframe>
        </div>
      </div>`,

  'meta-demo': `<div style="display:flex;flex-direction:column;gap:0.75rem;">
        <p style="font-size:0.82rem;color:var(--mode-txt2);">Meta tags no &lt;head&gt; controlam charset, viewport, SEO e redes sociais:</p>
        ${[
      ['charset', 'UTF-8', 'Codificação de caracteres. Sempre UTF-8.'],
      ['viewport', 'width=device-width, initial-scale=1.0', 'Controla escala em dispositivos móveis. Obrigatório para responsive.'],
      ['description', 'Texto até 155 chars...', 'Snippet exibido nos resultados do Google (SEO crítico).'],
      ['og:title', 'Título para redes sociais', 'OpenGraph — compartilhamento no Facebook, LinkedIn, WhatsApp.'],
      ['og:image', 'URL da imagem', 'Imagem exibida quando o link é compartilhado nas redes.'],
    ].map(([n, v, d]) => `
        <div style="background:var(--mode-bg2);border:1px solid var(--mode-border);border-radius:8px;padding:0.75rem;">
          <code style="font-family:'Fira Code',monospace;font-size:0.76rem;color:var(--blue);">&lt;meta name="${n}" content="${v}"&gt;</code>
          <p style="font-size:0.78rem;color:var(--mode-txt2);margin-top:0.25rem;">${d}</p>
        </div>`).join('')}
      </div>`
};

function showTag(key) {
  const display = document.getElementById('tag-display');
  if (!display) return;
  display.innerHTML = tagContent[key];
  document.querySelectorAll('.layout-tab').forEach((t, i) => {
    const keys = ['semantic', 'form', 'table', 'media', 'meta-demo'];
    t.classList.toggle('active', keys[i] === key);
    t.setAttribute('aria-pressed', (keys[i] === key).toString());
  });
}

// Init HTML explorer
showTag('semantic');

/* ════════════════════════════════════════
   9. FORM VALIDATION
════════════════════════════════════════ */
function validateField(id, check, okMsg, errMsg) {
  const el = document.getElementById(id);
  const msg = document.getElementById(id + '-msg');
  if (!el || !msg) return true;
  const valid = check(el.value);
  el.classList.toggle('valid', valid);
  el.classList.toggle('invalid', !valid && el.value.length > 0);
  if (el.value.length === 0) { msg.textContent = ''; msg.className = 'field-msg'; return false; }
  msg.textContent = valid ? okMsg : errMsg;
  msg.className = 'field-msg ' + (valid ? 'ok' : 'err');
  return valid;
}

const fName = document.getElementById('f-name'); if (fName) fName.addEventListener('input', () =>
  validateField('f-name', v => v.trim().length >= 3, '✓ Nome válido', '✗ Mínimo 3 caracteres'));

const fEmail = document.getElementById('f-email'); if (fEmail) fEmail.addEventListener('input', () =>
  validateField('f-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), '✓ E-mail válido', '✗ E-mail inválido'));

const fPass = document.getElementById('f-pass'); if (fPass) fPass.addEventListener('input', () =>
  validateField('f-pass', v => v.length >= 8, '✓ Senha forte', '✗ Mínimo 8 caracteres'));

const fAge = document.getElementById('f-age'); if (fAge) fAge.addEventListener('input', () =>
  validateField('f-age', v => !v || (Number(v) >= 1 && Number(v) <= 120), '✓ Idade válida', '✗ Entre 1 e 120'));

function handleFormSubmit(e) {
  e.preventDefault();
  const nameOk = validateField('f-name', v => v.trim().length >= 3, '✓ OK', '✗ Mínimo 3 caracteres');
  const emailOk = validateField('f-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), '✓ OK', '✗ E-mail inválido');
  const passOk = validateField('f-pass', v => v.length >= 8, '✓ OK', '✗ Mínimo 8 caracteres');

  // Advanced Validation: Radio & Checkbox
  const levelSelected = document.querySelector('input[name="level"]:checked');
  const levelMsg = document.getElementById('f-level-msg');
  if (!levelSelected) {
    levelMsg.textContent = '✗ Selecione seu nível';
    levelMsg.className = 'field-msg err';
  } else {
    levelMsg.textContent = '✓ OK';
    levelMsg.className = 'field-msg ok';
  }

  const techSelected = document.querySelectorAll('input[name="tech"]:checked');
  const techMsg = document.getElementById('f-tech-msg');
  if (techSelected.length === 0) {
    techMsg.textContent = '✗ Selecione ao menos uma tecnologia';
    techMsg.className = 'field-msg err';
  } else {
    techMsg.textContent = '✓ OK';
    techMsg.className = 'field-msg ok';
  }

  const result = document.getElementById('form-result');
  result.style.display = 'block';

  if (nameOk && emailOk && passOk && levelSelected && techSelected.length > 0) {
    result.style.background = 'rgba(52,211,153,0.12)';
    result.style.border = '1px solid rgba(52,211,153,0.3)';
    result.style.color = 'var(--green)';
    result.textContent = '✓ Formulário enviado com sucesso! (simulação — nenhum dado foi enviado)';
  } else {
    result.style.background = 'rgba(248,113,113,0.12)';
    result.style.border = '1px solid rgba(248,113,113,0.3)';
    result.style.color = 'var(--red)';
    result.textContent = '✗ Corrija os campos em vermelho antes de continuar.';
  }
}

function resetForm() {
  document.getElementById('form-result').style.display = 'none';
  document.querySelectorAll('#showcase-form .field-msg').forEach(m => { m.textContent = ''; m.className = 'field-msg'; });
  document.querySelectorAll('#showcase-form input').forEach(i => { i.classList.remove('valid', 'invalid'); });
}

/* ════════════════════════════════════════
   10. CSS PLAYGROUND
════════════════════════════════════════ */
const cssState = { shadow: false, radius: false, gradient: false, rotate: false, scale: false, blur: false, opacity: false };

function toggleCSS(prop) {
  cssState[prop] = !cssState[prop];
  const tog = document.getElementById('tog-' + prop);
  tog.classList.toggle('on', cssState[prop]);
  tog.setAttribute('aria-checked', cssState[prop].toString());

  const el = document.getElementById('preview-el');
  const rules = [];
  if (cssState.shadow) rules.push('box-shadow: 0 0 40px rgba(79,142,247,0.7)');
  if (cssState.radius) rules.push('border-radius: 50%');
  if (cssState.gradient) el.style.backgroundSize = '200% 200%';
  if (cssState.rotate) rules.push('transform: rotate(45deg)');
  if (cssState.scale) rules.push('transform: ' + (cssState.rotate ? 'rotate(45deg) scale(1.5)' : 'scale(1.5)'));
  if (cssState.blur) rules.push('filter: blur(3px)');
  if (cssState.opacity) rules.push('opacity: 0.3');

  let combined = {};
  rules.forEach(r => {
    const [k, v] = r.split(/: (.+)/);
    combined[k.trim()] = v.trim();
  });

  el.style.boxShadow = cssState.shadow ? '0 0 40px rgba(79,142,247,0.7)' : '';
  el.style.borderRadius = cssState.radius ? '50%' : '12px';
  el.style.filter = cssState.blur ? 'blur(3px)' : '';
  el.style.opacity = cssState.opacity ? '0.3' : '';

  let transform = '';
  if (cssState.rotate) transform += 'rotate(45deg) ';
  if (cssState.scale) transform += 'scale(1.5)';
  el.style.transform = transform.trim();

  // Update code display
  const activeRules = Object.entries(cssState).filter(([, v]) => v).map(([k]) => k);
  const codeLines = [
    `.preview-target {`,
    `  background: linear-gradient(135deg, #4f8ef7, #a855f7);`,
    `  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);`,
    ...(cssState.shadow ? [`  box-shadow: 0 0 40px rgba(79,142,247, 0.7);`] : []),
    ...(cssState.radius ? [`  border-radius: 50%;`] : []),
    ...(cssState.rotate ? [`  transform: rotate(45deg);`] : []),
    ...(cssState.scale ? [`  transform: scale(1.5);`] : []),
    ...(cssState.blur ? [`  filter: blur(3px);`] : []),
    ...(cssState.opacity ? [`  opacity: 0.3;`] : []),
    `}`,
  ];
  document.getElementById('css-code-display').textContent = codeLines.join('\n');
}

/* ════════════════════════════════════════
   11. LAYOUT DEMO (FLEX/GRID/POSITION)
════════════════════════════════════════ */
let currentLayout = 'flex';
let flexDir = 'row';
let flexJustify = 'center';
let flexAlign = 'center';
let flexWrap = 'nowrap';
let gridCols = 3;

function setLayout(type) {
  currentLayout = type;
  document.querySelectorAll('.layout-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-pressed', 'false');
  });
  document.getElementById('lt-' + type).classList.add('active');
  document.getElementById('lt-' + type).setAttribute('aria-pressed', 'true');
  renderLayoutDemo();
}

function renderLayoutDemo() {
  const container = document.getElementById('layout-children');
  const controls = document.getElementById('layout-controls');
  const codeEl = document.getElementById('layout-code');
  const label = document.getElementById('layout-label');
  if (!container || !controls || !codeEl || !label) return;

  const children = Array.from({ length: 4 }, (_, i) => `<div class="demo-child">Item ${i + 1}</div>`).join('');

  if (currentLayout === 'flex') {
    label.textContent = 'Flexbox Demo';
    container.style.cssText = `display:flex;flex-direction:${flexDir};justify-content:${flexJustify};align-items:${flexAlign};flex-wrap:${flexWrap};gap:10px;height:100%;min-height:180px;`;
    container.innerHTML = children;
    controls.innerHTML = `
          <select onchange="flexDir=this.value;renderLayoutDemo()" aria-label="flex-direction" style="padding:0.4rem;background:var(--mode-bg2);border:1px solid var(--mode-border);border-radius:6px;color:var(--mode-txt);">
            ${['row', 'column', 'row-reverse', 'column-reverse'].map(v => `<option ${v === flexDir ? 'selected' : ''}>${v}</option>`).join('')}
          </select>
          <select onchange="flexJustify=this.value;renderLayoutDemo()" aria-label="justify-content" style="padding:0.4rem;background:var(--mode-bg2);border:1px solid var(--mode-border);border-radius:6px;color:var(--mode-txt);">
            ${['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].map(v => `<option ${v === flexJustify ? 'selected' : ''}>${v}</option>`).join('')}
          </select>
          <select onchange="flexAlign=this.value;renderLayoutDemo()" aria-label="align-items" style="padding:0.4rem;background:var(--mode-bg2);border:1px solid var(--mode-border);border-radius:6px;color:var(--mode-txt);">
            ${['flex-start', 'center', 'flex-end', 'stretch', 'baseline'].map(v => `<option ${v === flexAlign ? 'selected' : ''}>${v}</option>`).join('')}
          </select>
          <select onchange="flexWrap=this.value;renderLayoutDemo()" aria-label="flex-wrap" style="padding:0.4rem;background:var(--mode-bg2);border:1px solid var(--mode-border);border-radius:6px;color:var(--mode-txt);">
            ${['nowrap', 'wrap', 'wrap-reverse'].map(v => `<option ${v === flexWrap ? 'selected' : ''}>${v}</option>`).join('')}
          </select>`;
    codeEl.textContent = `.container {\n  display: flex;\n  flex-direction: ${flexDir};\n  justify-content: ${flexJustify};\n  align-items: ${flexAlign};\n  flex-wrap: ${flexWrap};\n  gap: 10px;\n}`;

  } else if (currentLayout === 'grid') {
    label.textContent = 'CSS Grid Demo';
    container.style.cssText = `display:grid;grid-template-columns:repeat(${gridCols},1fr);gap:10px;`;
    container.innerHTML = children;
    controls.innerHTML = `
          <label style="font-size:0.82rem;color:var(--mode-txt2)">Colunas:
          <input type="range" min="1" max="5" value="${gridCols}" oninput="gridCols=+this.value;this.nextSibling.textContent=this.value;renderLayoutDemo()" style="margin:0 0.5rem;vertical-align:middle;"><span>${gridCols}</span>
          </label>`;
    codeEl.textContent = `.container {\n  display: grid;\n  grid-template-columns: repeat(${gridCols}, 1fr);\n  gap: 10px;\n}`;

  } else {
    label.textContent = 'Position Demo';
    container.style.cssText = 'position:relative;height:180px;';
    container.innerHTML = `
          <div class="demo-child" style="position:static;height:40px;flex:none;width:auto;min-width:0;padding:0.5rem 1rem;font-size:0.78rem;">static</div>
          <div class="demo-child" style="position:relative;top:10px;left:10px;height:40px;flex:none;width:auto;min-width:0;padding:0.5rem 1rem;font-size:0.78rem;">relative (top:10,left:10)</div>
          <div class="demo-child" style="position:absolute;top:0;right:0;height:40px;flex:none;width:auto;min-width:0;padding:0.5rem 1rem;font-size:0.78rem;background:linear-gradient(135deg,var(--green),var(--cyan));">absolute (top:0,right:0)</div>`;
    controls.innerHTML = '<span style="font-size:0.8rem;color:var(--mode-txt2)">Demonstração de position: static, relative e absolute</span>';
    codeEl.textContent = `.parent { position: relative; }\n.static   { position: static; }\n.relative { position: relative; top: 10px; left: 10px; }\n.absolute { position: absolute; top: 0; right: 0; }`;
  }
}

renderLayoutDemo();

/* ════════════════════════════════════════
   12. JS FUNDAMENTALS DEMOS
════════════════════════════════════════ */

// Template literals & variables
function updateGreeting() {
  const name = document.getElementById('js-name-in').value;
  const year = parseInt(document.getElementById('js-year-in').value);
  const out = document.getElementById('js-greeting-out');

  if (!name && !year) { out.textContent = '// Saída aparecerá aqui'; return; }

  const currentYear = new Date().getFullYear();
  const age = year ? currentYear - year : '?';
  out.textContent = `const nome = "${name || 'Anônimo'}";\nconst idade = ${age};\nconsole.log(\`Olá, ${name || 'Anônimo'}! Você tem ${age} anos.\`);`;
}

// Array methods
const sampleArr = [3, 7, 12, 1, 45, 8, 23, 6];

function runArrayDemo(method) {
  const codeOut = document.getElementById('array-code-out');
  const resOut = document.getElementById('array-result-out');
  const arr = sampleArr;

  const demos = {
    map: {
      code: `const arr = [${arr}];\narr.map(x => x * 2);\n// Multiplica cada elemento por 2`,
      result: `→ [${arr.map(x => x * 2).join(', ')}]`
    },
    filter: {
      code: `const arr = [${arr}];\narr.filter(x => x > 10);\n// Mantém apenas os maiores que 10`,
      result: `→ [${arr.filter(x => x > 10).join(', ')}]`
    },
    reduce: {
      code: `const arr = [${arr}];\narr.reduce((acc, x) => acc + x, 0);\n// Soma todos os elementos`,
      result: `→ ${arr.reduce((a, b) => a + b, 0)} (soma total)`
    },
    foreach: {
      code: `const arr = [${arr}];\narr.forEach(x => console.log(x * x));\n// Eleva ao quadrado (efeito colateral)`,
      result: `→ ${arr.map(x => x * x).join(', ')}`
    }
  };

  codeOut.textContent = demos[method].code;
  resOut.textContent = demos[method].result;
}

// DOM manipulation
let domCounter = 0;

function domAddItem() {
  const list = document.getElementById('dom-list');
  domCounter++;
  const li = document.createElement('li');
  li.style.cssText = 'display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.75rem;background:var(--mode-surface);border:1px solid var(--mode-border);border-radius:8px;font-size:0.83rem;animation:slideIn 0.3s ease;';
  li.innerHTML = `<span style="color:var(--blue);font-family:'Fira Code',monospace;font-size:0.72rem;min-width:28px;">#${domCounter}</span>
        <span style="color:var(--mode-txt);">Elemento criado dinamicamente</span>
        <button onclick="this.parentElement.remove()" style="margin-left:auto;background:none;border:none;color:var(--red);cursor:pointer;font-size:0.8rem;" aria-label="Remover item">✕</button>`;
  list.appendChild(li);
}

function domClearItems() { document.getElementById('dom-list').innerHTML = ''; domCounter = 0; }

// Loop demo
function runLoop() {
  const n = parseInt(document.getElementById('loop-n').value) || 5;
  const out = document.getElementById('loop-out');
  out.innerHTML = '';
  const colors = ['var(--blue)', 'var(--purple)', 'var(--cyan)', 'var(--green)', 'var(--pink)'];
  for (let i = 1; i <= n; i++) {
    const el = document.createElement('div');
    el.style.cssText = `width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;color:#fff;background:${colors[(i - 1) % 5]};animation:fadeUp 0.3s ease ${(i - 1) * 0.05}s both;`;
    el.textContent = i;
    el.setAttribute('aria-label', `Item ${i}`);
    out.appendChild(el);
  }
}

/* ════════════════════════════════════════
   13. CALCULATOR
════════════════════════════════════════ */
let calcExpr = '';
let calcResult = false;

function calcInput(val) {
  const disp = document.getElementById('calc-display');

  if (val === 'C') { calcExpr = ''; calcResult = false; disp.textContent = '0'; return; }

  if (val === '=') {
    try {
      // Replace display chars with JS operators
      const sanitized = calcExpr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
      if (!sanitized) return;
      const res = Function('"use strict";return (' + sanitized + ')')();
      disp.textContent = parseFloat(res.toFixed(10)).toString();
      calcExpr = disp.textContent;
      calcResult = true;
    } catch { disp.textContent = 'Erro'; calcExpr = ''; }
    return;
  }

  if (val === '±') {
    if (calcExpr.startsWith('-')) calcExpr = calcExpr.slice(1);
    else calcExpr = '-' + calcExpr;
    disp.textContent = calcExpr || '0';
    return;
  }

  if (val === '%') {
    try {
      const v = Function('"use strict";return (' + calcExpr.replace(/×/g, '*').replace(/÷/g, '/') + ')')();
      calcExpr = (v / 100).toString();
      disp.textContent = calcExpr;
    } catch { }
    return;
  }

  if (calcResult && /[0-9.]/.test(val)) { calcExpr = ''; calcResult = false; }

  calcExpr += val;
  disp.textContent = calcExpr;
}

/* ════════════════════════════════════════
   14. TO-DO LIST
════════════════════════════════════════ */
let todos = [];

function addTodo() {
  const inp = document.getElementById('todo-in');
  const text = inp.value.trim();
  if (!text) return;
  todos.push({ id: Date.now(), text, done: false });
  inp.value = '';
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById('todo-list');
  const count = document.getElementById('todo-count');
  if (!list || !count) return;
  list.innerHTML = todos.map(t => `
        <li class="todo-item ${t.done ? 'done' : ''}" role="listitem">
          <div class="todo-check" onclick="toggleTodo(${t.id})" role="checkbox" aria-checked="${t.done}" tabindex="0" aria-label="${t.done ? 'Desmarcar' : 'Marcar'}: ${t.text}">${t.done ? '✓' : ''}</div>
          <span class="todo-text">${t.text}</span>
          <button class="todo-del" onclick="deleteTodo(${t.id})" aria-label="Remover tarefa: ${t.text}">✕</button>
        </li>`).join('');
  count.textContent = `${todos.length} tarefa${todos.length !== 1 ? 's' : ''} · ${todos.filter(t => t.done).length} concluída${todos.filter(t => t.done).length !== 1 ? 's' : ''}`;
}

// Init with sample todos
todos = [
  { id: 1, text: 'Estudar HTML5 semântico', done: true },
  { id: 2, text: 'Praticar Flexbox e Grid', done: false },
  { id: 3, text: 'Fazer quiz de revisão', done: false }
];
if (document.getElementById('todo-list')) {
  renderTodos();
}

/* ════════════════════════════════════════
   15. COUNTDOWN TIMER
════════════════════════════════════════ */
let timerInterval = null;
let timerSeconds = 0;

function timerStart() {
  if (timerInterval) return;
  const m = parseInt(document.getElementById('timer-min').value) || 0;
  const s = parseInt(document.getElementById('timer-sec').value) || 0;
  if (timerSeconds === 0) timerSeconds = m * 60 + s;
  if (timerSeconds <= 0) return;

  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerDisplay();
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      document.getElementById('timer-display').textContent = '🔔 Tempo!';
      document.getElementById('timer-display').classList.remove('urgent');
    }
  }, 1000);
}

function timerPause() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function timerReset() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds = 0;
  document.getElementById('timer-display').textContent = '00:00';
  document.getElementById('timer-display').classList.remove('urgent');
}

function updateTimerDisplay() {
  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  const disp = document.getElementById('timer-display');
  disp.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  disp.classList.toggle('urgent', timerSeconds <= 10 && timerSeconds > 0);
}

/* ════════════════════════════════════════
   16. DYNAMIC PRODUCT CARDS
════════════════════════════════════════ */
const productsData = [
  { name: 'Notebook Pro', cat: 'tech', emoji: '💻', price: 'R$ 4.299', desc: 'I7 + 16GB RAM' },
  { name: 'Fone Noise Cancelling', cat: 'tech', emoji: '🎧', price: 'R$ 799', desc: 'Bluetooth 5.3' },
  { name: 'Smartwatch Ultra', cat: 'tech', emoji: '⌚', price: 'R$ 1.599', desc: 'GPS integrado' },
  { name: 'Café Especial', cat: 'food', emoji: '☕', price: 'R$ 49', desc: 'Arábica 250g' },
  { name: 'Kit Granola Premium', cat: 'food', emoji: '🥣', price: 'R$ 35', desc: 'Sem adição de açúcar' },
  { name: 'Whey Protein', cat: 'food', emoji: '💪', price: 'R$ 129', desc: 'Chocolate 900g' },
  { name: 'Clean Code', cat: 'book', emoji: '📗', price: 'R$ 89', desc: 'Robert C. Martin' },
  { name: 'You Don\'t Know JS', cat: 'book', emoji: '📘', price: 'R$ 79', desc: 'Kyle Simpson' },
  { name: 'Design Patterns', cat: 'book', emoji: '📙', price: 'R$ 99', desc: 'Gang of Four' },
];

function filterProducts(cat) {
  document.querySelectorAll('#sec-apps .layout-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-pressed', 'false');
  });
  event.target.classList.add('active');
  event.target.setAttribute('aria-pressed', 'true');

  const filtered = cat === 'all' ? productsData : productsData.filter(p => p.cat === cat);
  renderProducts(filtered);
}

function renderProducts(data) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = data.map(p => `
        <article class="product-card" aria-label="Produto: ${p.name}">
          <span class="product-emoji" aria-hidden="true">${p.emoji}</span>
          <div class="product-name">${p.name}</div>
          <div class="product-cat">${p.cat}</div>
          <div style="font-size:0.78rem;color:var(--mode-txt2);margin-bottom:0.4rem;">${p.desc}</div>
          <div class="product-price">${p.price}</div>
          <button class="product-btn" onclick="alert('${p.name} adicionado ao carrinho! 🛒')" aria-label="Adicionar ${p.name} ao carrinho">+ Carrinho</button>
        </article>`).join('');
}

if (document.getElementById('products-grid')) {
  renderProducts(productsData);
}

/* ════════════════════════════════════════
   17. MINI QUIZ
════════════════════════════════════════ */
const miniQuizData = [
  {
    q: 'Qual declaração cria uma variável de escopo de bloco que não pode ser reatribuída?',
    opts: ['var', 'let', 'const', 'global'],
    correct: 2,
    explain: 'const — cria uma constante de escopo de bloco. O valor não pode ser reatribuído.'
  },
  {
    q: 'Qual é o resultado da operação typeof null em JavaScript?',
    opts: ['"null"', '"undefined"', '"object"', '"string"'],
    correct: 2,
    explain: 'typeof null retorna "object" devido a um bug histórico do JS mantido por compatibilidade.'
  },
  {
    q: 'Como converter uma string JSON de volta para um objeto JavaScript?',
    opts: ['JSON.stringify()', 'JSON.parse()', 'Object.parse()', 'JSON.toObject()'],
    correct: 1,
    explain: 'JSON.parse() desserializa uma string JSON em um objeto ou valor JavaScript correspondente.'
  }
];

let miniQ = 0, miniScore = 0, miniAnswered = false;

function renderMiniQuiz() {
  const wrap = document.getElementById('mini-quiz-wrap');
  if (!wrap) return;
  if (miniQ >= miniQuizData.length) {
    wrap.innerHTML = `<div style="text-align:center;padding:1.5rem;">
          <div style="font-size:2.5rem;font-weight:900;background:linear-gradient(90deg,var(--blue),var(--purple));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;">${miniScore}/${miniQuizData.length}</div>
          <p style="color:var(--mode-txt2);margin:0.5rem 0 1rem;">Quiz concluído! ${miniScore === miniQuizData.length ? '🏆 Perfeito!' : ''}</p>
          <button class="btn btn-primary" onclick="miniQ=0;miniScore=0;miniAnswered=false;renderMiniQuiz()">↺ Repetir</button>
        </div>`;
    return;
  }

  const q = miniQuizData[miniQ];
  wrap.innerHTML = `
        <div class="quiz-card">
          <div style="font-size:0.72rem;color:var(--mode-txt2);margin-bottom:0.75rem;">Questão ${miniQ + 1} de ${miniQuizData.length} · Pontos: ${miniScore}</div>
          <p class="quiz-q-text">${q.q}</p>
          <div class="quiz-opts">
            ${q.opts.map((o, i) => `<button class="quiz-opt-btn" id="mq-opt-${i}" onclick="answerMini(${i})" aria-label="Resposta: ${o}">${o}</button>`).join('')}
          </div>
          <div id="mini-fb" style="font-size:0.82rem;min-height:1rem;margin-top:0.75rem;" aria-live="polite"></div>
          <button id="mini-next" class="btn btn-primary" onclick="miniQ++;miniAnswered=false;renderMiniQuiz()" style="margin-top:1rem;display:none;" aria-label="Próxima questão">Próxima →</button>
        </div>`;
}

function answerMini(idx) {
  if (miniAnswered) return;
  miniAnswered = true;
  const q = miniQuizData[miniQ];
  const fb = document.getElementById('mini-fb');
  const next = document.getElementById('mini-next');

  document.querySelectorAll('.quiz-opt-btn').forEach((b, i) => {
    b.disabled = true;
    if (i === q.correct) b.classList.add('correct');
    else if (i === idx) b.classList.add('wrong');
  });

  if (idx === q.correct) {
    miniScore++;
    fb.style.color = 'var(--green)';
    fb.textContent = `✓ Correto! ${q.explain}`;
  } else {
    fb.style.color = 'var(--red)';
    fb.textContent = `✗ Incorreto. ${q.explain}`;
  }
  next.style.display = 'inline-flex';
}

renderMiniQuiz();

/* ════════════════════════════════════════
   18. FETCH API DEMO
════════════════════════════════════════ */
async function loadFetchData(type) {
  // Update active tab
  document.querySelectorAll('.fetch-tabs .layout-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-pressed', 'false');
  });
  document.getElementById('fetch-tab-' + type).classList.add('active');
  document.getElementById('fetch-tab-' + type).setAttribute('aria-pressed', 'true');

  const status = document.getElementById('fetch-status');
  const content = document.getElementById('fetch-content');

  // Loading state
  status.style.display = 'block';
  status.className = 'fetch-status loading';
  status.textContent = '⟳ Buscando dados de jsonplaceholder.typicode.com...';
  content.innerHTML = '<div class="spinner"></div>';

  try {
    const limit = type === 'posts' ? 6 : 8;
    const res = await fetch(`https://jsonplaceholder.typicode.com/${type}?_limit=${limit}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    status.className = 'fetch-status success';
    status.textContent = `✓ ${data.length} ${type} carregados com sucesso!`;

    if (type === 'posts') {
      content.innerHTML = `<div class="posts-list">${data.map(p => `
            <div class="post-card" role="article" aria-label="Post: ${p.title}">
              <h4>#${p.id} — ${p.title}</h4>
              <p>${p.body}</p>
            </div>`).join('')}</div>`;
    } else {
      content.innerHTML = `<div class="posts-list">${data.map(u => `
            <div class="user-card" role="article" aria-label="Usuário: ${u.name}">
              <div class="user-avatar" aria-hidden="true">${u.name.charAt(0)}</div>
              <div class="user-info">
                <h4>${u.name}</h4>
                <p>📧 ${u.email} · 🌐 ${u.website}</p>
              </div>
            </div>`).join('')}</div>`;
    }
  } catch (err) {
    status.className = 'fetch-status error';
    status.textContent = `✗ Erro: ${err.message}`;
    content.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--red);">
          <div style="font-size:2rem;margin-bottom:0.5rem;">⚠️</div>
          <p style="font-weight:700;">Falha na requisição</p>
          <p style="font-size:0.82rem;color:var(--mode-txt2);margin-top:0.25rem;">${err.message}</p>
        </div>`;
  }
}

function simulateFetchError() {
  const status = document.getElementById('fetch-status');
  const content = document.getElementById('fetch-content');
  status.style.display = 'block';
  status.className = 'fetch-status loading';
  status.textContent = '⟳ Tentando conectar a URL inválida...';
  content.innerHTML = '<div class="spinner"></div>';

  setTimeout(() => {
    status.className = 'fetch-status error';
    status.textContent = '✗ Erro 404: Recurso não encontrado (simulado)';
    content.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--red);">
          <div style="font-size:2.5rem;margin-bottom:0.5rem;">❌</div>
          <p style="font-weight:700;">404 — Not Found</p>
          <p style="font-size:0.82rem;color:var(--mode-txt2);margin-top:0.25rem;">Trate sempre erros de rede com try/catch para evitar crash na UI</p>
        </div>`;
  }, 1500);
}

/* ════════════════════════════════════════
   19. A11Y LIVE REGION TEST
════════════════════════════════════════ */
const liveMessages = [
  '✓ Produto adicionado ao carrinho!',
  '📩 Mensagem enviada com sucesso!',
  '⚠️ Preencha todos os campos obrigatórios.',
  '🔔 Notificação: nova mensagem recebida.',
  '✓ Preferências salvas!'
];
let liveIdx = 0;

function testLiveRegion() {
  const el = document.getElementById('live-region-out');
  el.textContent = liveMessages[liveIdx % liveMessages.length];
  liveIdx++;
}

/* ════════════════════════════════════════
   21. NAVIGATOR APIs
════════════════════════════════════════ */
function checkBattery() {
  const fill = document.getElementById('bat-fill');
  const res = document.getElementById('bat-res');
  if (!navigator.getBattery) {
    res.textContent = 'Não suportado';
    return;
  }
  navigator.getBattery().then(bat => {
    const pct = Math.round(bat.level * 100);
    fill.style.width = pct + '%';
    res.textContent = `${pct}% (${bat.charging ? 'Carregando' : 'Bateria'})`;
  });
}

function checkGeo() {
  const res = document.getElementById('geo-res');
  res.textContent = 'Localizando...';
  navigator.geolocation.getCurrentPosition(
    pos => res.textContent = `Lat: ${pos.coords.latitude.toFixed(4)}, Lon: ${pos.coords.longitude.toFixed(4)}`,
    err => res.textContent = 'Erro: ' + err.message
  );
}

function triggerVibrate() {
  const res = document.getElementById('vib-res');
  if (navigator.vibrate) {
    navigator.vibrate(200);
    res.textContent = 'Vibrando! 📳';
  } else {
    res.textContent = 'Não suportado ❌';
  }
}

function askNotify() {
  const res = document.getElementById('not-res');
  Notification.requestPermission().then(p => {
    res.textContent = p === 'granted' ? 'Autorizado! ✅' : 'Negado ❌';
    if (p === 'granted') new Notification('Tagliari Showcase', { body: 'Notificações ativadas!' });
  });
}

function triggerShare() {
  const res = document.getElementById('share-res');
  if (navigator.share) {
    navigator.share({
      title: 'Tagliari Web Showcase',
      text: 'Confira este guia de Programação Web!',
      url: window.location.href
    }).then(() => res.textContent = 'Sucesso!')
      .catch(() => res.textContent = 'Cancelado');
  } else {
    res.textContent = 'Não suportado ❌';
  }
}

function listMedia() {
  const res = document.getElementById('media-res');
  res.innerHTML = '<li>Solicitando...</li>';
  if (!navigator.mediaDevices) {
    res.innerHTML = '<li>Não suportado ❌</li>';
    return;
  }
  navigator.mediaDevices.enumerateDevices().then(devices => {
    res.innerHTML = devices.map(d => `<li>${d.kind === 'videoinput' ? '📷' : '🎤'} ${d.label || d.kind}</li>`).join('') || '<li>Nenhum encontrado</li>';
  }).catch(err => res.innerHTML = `<li>Erro: ${err.message}</li>`);
}

/* ════════════════════════════════════════
   22. JOGO DO CLIQUE
════════════════════════════════════════ */
let gameScore = 0;
let gameTime = 5.0;
let gameInterval = null;

function startGame() {
  gameScore = 0;
  gameTime = 5.0;
  document.getElementById('game-score').textContent = '0';
  document.getElementById('game-timer').textContent = '5.0';
  document.getElementById('game-msg').textContent = 'VAI!';
  document.getElementById('btn-start-game').disabled = true;
  document.getElementById('btn-click-game').disabled = false;

  gameInterval = setInterval(() => {
    gameTime -= 0.1;
    document.getElementById('game-timer').textContent = gameTime.toFixed(1);
    if (gameTime <= 0) {
      clearInterval(gameInterval);
      document.getElementById('game-timer').textContent = '0.0';
      document.getElementById('btn-click-game').disabled = true;
      document.getElementById('btn-start-game').disabled = false;
      document.getElementById('game-msg').textContent = `Fim! Score: ${gameScore}`;
    }
  }, 100);
}

function recordClick() {
  gameScore++;
  document.getElementById('game-score').textContent = gameScore;
  if (navigator.vibrate) navigator.vibrate(50);
}

/* ════════════════════════════════════════
   23. UI LAB (Ripple)
════════════════════════════════════════ */
function createRipple(event) {
  const btn = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.pageX - btn.offsetLeft - radius}px`;
  circle.style.top = `${event.pageY - btn.offsetTop - radius}px`;
  circle.classList.add('ripple');

  const ripple = btn.getElementsByClassName('ripple')[0];
  if (ripple) ripple.remove();

  btn.appendChild(circle);
}

/* Update Network status */
window.addEventListener('online', () => { if (document.getElementById('net-res')) document.getElementById('net-res').textContent = 'Online ✅'; });
window.addEventListener('offline', () => { if (document.getElementById('net-res')) document.getElementById('net-res').textContent = 'Offline 🔴'; });

/* ════════════════════════════════════════
   24. SELETORES CSS DEMO
════════════════════════════════════════ */
function toggleHighlight(type) {
  const p = document.getElementById('demo-para');
  if (!p) return;

  if (type === 'el') {
    p.style.color = p.style.color === 'blue' ? '' : 'blue';
  } else if (type === 'id') {
    p.style.backgroundColor = (p.style.backgroundColor === 'rgb(240, 240, 240)' || p.style.backgroundColor === '#f0f0f0') ? '' : '#f0f0f0';
  } else if (type === 'cl') {
    p.style.fontWeight = p.style.fontWeight === 'bold' ? '' : 'bold';
  }
}

/* ════════════════════════════════════════
   26. A11Y GUIDE DATA & LOGIC
════════════════════════════════════════ */
const a11yData = {
  dislexia: {
    title: '🧠 Projetando para usuários com Dislexia',
    content: [
      ['Use imagens e diagramas para apoiar o texto', 'Use blocos grandes de texto denso'],
      ['Alinhe o texto à esquerda e mantenha um layout consistente', 'Sublinhe palavras, use itálico ou escreva tudo em caixa alta'],
      ['Mantenha o conteúdo curto, claro e simples', 'Force os usuários a lembrar coisas de páginas anteriores'],
      ['Permita que os usuários alterem o contraste', 'Confie apenas na ortografia correta'],
      ['Considere formatos alternativos (áudio/vídeo)', 'Coloque muita informação em um só lugar']
    ]
  },
  motora: {
    title: '⌨️ Projetando para usuários com Deficiência Motora',
    content: [
      ['Crie áreas clicáveis grandes', 'Exija precisão excessiva'],
      ['Dê espaço aos campos de formulário', 'Agrupe interações muito próximas'],
      ['Projete para uso apenas via teclado ou voz', 'Crie conteúdo dinâmico que exija muito movimento do mouse'],
      ['Pense em dispositivos móveis e toque', 'Tenha janelas de tempo (timeout) curtas'],
      ['Forneça atalhos de teclado', 'Tire usuários com muita digitação e scroll']
    ]
  },
  auditiva: {
    title: '👂 Projetando para usuários Surdos ou com Deficiência Auditiva',
    content: [
      ['Escreva em linguagem simples e direta', 'Use palavras complicadas ou figuras de linguagem'],
      ['Use legendas ou forneça transcrições para vídeos', 'Coloque conteúdo apenas em áudio ou vídeo'],
      ['Use um layout linear e lógico', 'Crie layouts e menus complexos'],
      ['Divida o conteúdo com subtítulos e imagens', 'Force os usuários a ler longos blocos de texto'],
      ['Ofereça múltiplas formas de contato', 'Faça do telefone o único meio de contato']
    ]
  },
  visao: {
    title: '👓 Projetando para usuários com Baixa Visão',
    content: [
      ['Use bons contrastes e fontes legíveis', 'Use baixo contraste e fontes pequenas'],
      ['Publique informações em HTML', 'Esconda informações dentro de downloads'],
      ['Combine cores, formas e texto', 'Use apenas cores para transmitir significado'],
      ['Mantenha um layout linear e lógico', 'Espalhe o conteúdo por toda a página'],
      ['Coloque botões e notificações em contexto', 'Separe ações de seus contextos']
    ]
  },
  readers: {
    title: '📢 Projetando para usuários de Leitores de Tela',
    content: [
      ['Descreva imagens e transcreva vídeos', 'Exiba informações apenas em imagens ou vídeos'],
      ['Siga um layout linear e lógico', 'Espalhe o conteúdo aleatoriamente na página'],
      ['Estruture o conteúdo com HTML5 semântico', 'Confie no tamanho e posição para estrutura'],
      ['Construa para uso exclusivo via teclado', 'Force o uso do mouse ou toque'],
      ['Escreva links e cabeçalhos descritivos', 'Use links vagos como "clique aqui"']
    ]
  },
  autista: {
    title: '🌈 Projetando para usuários no Espectro Autista',
    content: [
      ['Use cores simples e calmas', 'Use cores brilhantes e contrastantes'],
      ['Escreva em linguagem direta e clara', 'Use figuras de linguagem e expressões idiomáticas'],
      ['Use frases simples e listas (bullets)', 'Crie "paredes de texto"'],
      ['Crie botões descritivos e previsíveis', 'Crie botões vagos (ex: "Clique aqui")'],
      ['Construa layouts simples e consistentes', 'Construa layouts complexos e poluídos']
    ]
  }
};

function switchA11yTab(cat) {
  const data = a11yData[cat];
  if (!data) return;

  document.querySelectorAll('.a11y-category-btn').forEach(btn => {
    const isActive = btn.getAttribute('onclick').includes(`'${cat}'`);
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive.toString());
  });

  document.getElementById('a11y-title').textContent = data.title;
  const tbody = document.getElementById('a11y-content');
  tbody.innerHTML = data.content.map(row => `
    <tr>
      <td class="do">${row[0]}</td>
      <td class="dont">${row[1]}</td>
    </tr>
  `).join('');
}

/* ════════════════════════════════════════
   27. CORE WEB VITALS LOGIC
════════════════════════════════════════ */
function updateMetric(metric, value) {
  const card = document.getElementById(`metric-${metric}`);
  if (!card) return;
  const valEl = card.querySelector('.metric-value');
  const statusEl = card.querySelector('.metric-status');

  valEl.textContent = value;

  let status = 'good';
  if (metric === 'lcp') {
    const v = parseFloat(value);
    status = v <= 2.5 ? 'good' : v <= 4.0 ? 'needs-improvement' : 'poor';
  } else if (metric === 'inp') {
    const v = parseInt(value);
    status = v <= 200 ? 'good' : v <= 500 ? 'needs-improvement' : 'poor';
  } else if (metric === 'cls') {
    const v = parseFloat(value);
    status = v <= 0.1 ? 'good' : v <= 0.25 ? 'needs-improvement' : 'poor';
  }

  card.className = `metric-card ${status}`;
  statusEl.textContent = status === 'good' ? 'Bom' : status === 'needs-improvement' ? 'Melhorar' : 'Pobre';
}

/* ════════════════════════════════════════
   28. INITIALIZATION
════════════════════════════════════════ */
updateBreakpoints();
if (document.getElementById('a11y-content')) {
  switchA11yTab('dislexia');
}
/* ----------------------------------------
   SEGUNDO CONTEÚDO — NEW SECTION JS
---------------------------------------- */

/* -- DNS CHAIN ANIMATION --------------- */
async function animateDNS() {
  const nodes = ['dns-browser', 'dns-os', 'dns-isp', 'dns-root', 'dns-tld', 'dns-auth'];
  const arrows = ['dns-a1', 'dns-a2', 'dns-a3', 'dns-a4', 'dns-a5'];
  const messages = [
    '🔍 Verificando cache local do navegador... MISS',
    '💾 Verificando cache do sistema operacional... MISS',
    '🌐 Consultando resolver recursivo do ISP...',
    '🏢 Root nameserver: "Tente o TLD .com.br"',
    '🏢 TLD nameserver: encontrou nameserver autoritativo!',
    '✅ Resposta: www.exemplo.com.br → 189.32.14.55'
  ];
  const log = document.getElementById('dns-log');
  const btn = document.getElementById('dns-btn');
  if (!btn || btn.disabled) return;
  btn.disabled = true;

  // Reset all
  nodes.forEach(id => { const el = document.getElementById(id); if (el) { el.classList.remove('active', 'resolved'); } });
  arrows.forEach(id => { const el = document.getElementById(id); if (el) el.classList.remove('active'); });
  log.textContent = '';

  for (let i = 0; i < nodes.length; i++) {
    const node = document.getElementById(nodes[i]);
    const arrow = i < arrows.length ? document.getElementById(arrows[i]) : null;
    if (node) node.classList.add('active');
    if (arrow) arrow.classList.add('active');
    log.textContent = messages[i];
    await sleep(900);
    if (node) { node.classList.remove('active'); node.classList.add('resolved'); }
    if (arrow) arrow.classList.remove('active');
  }
  log.textContent = '✓ DNS resolvido em ~45ms! Conexão TCP iniciada para 189.32.14.55';
  btn.disabled = false;
}

/* -- EXAM TRAINING MODE ---------------- */
const examQuestions2 = [
  { cat: 'internet', type: 'single', q: 'O que significa a sigla ARPANET?', opts: ['Advanced Research Projects Agency Network', 'American Research Protocol And Network Exchange', 'Automated Routing Protocol And Network Technology', 'Applied Research And Protocol Advanced Network'], correct: 0, explain: 'ARPANET = Advanced Research Projects Agency Network — criada pelo Departamento de Defesa dos EUA em 1969.' },
  { cat: 'internet', type: 'single', q: 'Em que ano o TCP/IP foi adotado oficialmente pela ARPANET (Flag Day)?', opts: ['1969', '1983', '1991', '1995'], correct: 1, explain: '1 de janeiro de 1983 — o "Flag Day" marcou a transição completa para TCP/IP.' },
  { cat: 'internet', type: 'single', q: 'Quem criou o World Wide Web (WWW)?', opts: ['Bill Gates', 'Steve Jobs', 'Tim Berners-Lee', 'Vint Cerf'], correct: 2, explain: 'Tim Berners-Lee, pesquisador do CERN, propôs e implementou HTTP e HTML em 1991.' },
  { cat: 'internet', type: 'single', q: 'Qual é o URL do primeiro website do mundo?', opts: ['www.google.com', 'info.cern.ch', 'www.arpanet.org', 'www.internet.com'], correct: 1, explain: 'O primeiro website foi info.cern.ch, criado por Tim Berners-Lee no CERN.' },
  { cat: 'internet', type: 'single', q: 'Packet Switching (comutação de pacotes) significa:', opts: ['Dados enviados em um único fluxo contínuo', 'Dados divididos em pacotes que viajam por rotas independentes', 'Dados transmitidos somente por cabo físico', 'Dados comprimidos antes do envio'], correct: 1, explain: 'Na comutação de pacotes, os dados são fragmentados e cada pacote pode tomar uma rota diferente até o destino.' },
  { cat: 'internet', type: 'single', q: 'Qual protocolo garante entrega ordenada e confiável dos pacotes?', opts: ['UDP', 'IP', 'TCP', 'HTTP'], correct: 2, explain: 'TCP (Transmission Control Protocol) garante entrega confiável via 3-way handshake e controle de fluxo.' },
  { cat: 'internet', type: 'single', q: 'Qual protocolo é preferido para streaming de vídeo ao vivo e jogos online?', opts: ['TCP', 'UDP', 'FTP', 'SMTP'], correct: 1, explain: 'UDP (User Datagram Protocol) é mais rápido pois não estabelece conexão nem garante entrega — aceita alguma perda de pacotes.' },
  { cat: 'internet', type: 'single', q: 'O que é DNS?', opts: ['Domain Name System — converte nomes em IPs', 'Data Network Security — protocolo de segurança', 'Dynamic Node Switching — roteamento de pacotes', 'Digital Network Standard — padrão de rede'], correct: 0, explain: 'DNS (Domain Name System) é como a "lista telefônica" da internet — converte www.google.com em 142.250.1.1.' },
  { cat: 'internet', type: 'single', q: 'Qual entidade é responsável pelo registro de domínios .br no Brasil?', opts: ['CGI.br', 'NIC.br', 'Registro.br', 'ANATEL'], correct: 2, explain: 'Registro.br é o serviço do NIC.br responsável pelo registro e manutenção de todos os domínios .br.' },
  { cat: 'internet', type: 'single', q: 'Qual é a relação correta entre CGI.br, NIC.br e Registro.br?', opts: ['São todos independentes entre si', 'CGI.br executa as decisões do NIC.br', 'NIC.br executa as decisões do CGI.br e mantém o Registro.br', 'Registro.br supervisiona o CGI.br'], correct: 2, explain: 'CGI.br define políticas → NIC.br as executa e opera → Registro.br é um serviço do NIC.br para domínios .br.' },
  { cat: 'html', type: 'single', q: 'Qual tag define o conteúdo principal e único de uma página HTML5?', opts: ['<section>', '<article>', '<main>', '<div>'], correct: 2, explain: '<main> marca o conteúdo principal da página — deve ser único e não pode ser filho de <header>, <footer>, <nav>, <aside> ou <article>.' },
  { cat: 'html', type: 'single', q: 'Qual atributo é obrigatório para acessibilidade na tag <img>?', opts: ['src', 'href', 'alt', 'title'], correct: 2, explain: 'O atributo alt descreve a imagem para leitores de tela e é exibido se a imagem não carregar — essencial para WCAG.' },
  { cat: 'html', type: 'single', q: 'Para que serve a tag <nav>?', opts: ['Criar um container genérico', 'Marcar um bloco de links de navegação', 'Inserir um script externo', 'Criar uma seção de artigo'], correct: 1, explain: '<nav> é uma tag semântica que marca blocos de navegação — menus, breadcrumbs, links de paginação.' },
  { cat: 'html', type: 'single', q: 'Qual elemento HTML cria uma lista ordenada?', opts: ['<ul>', '<dl>', '<ol>', '<li>'], correct: 2, explain: '<ol> (ordered list) cria listas numeradas. <ul> cria listas com marcadores (bullets). <li> é o item de cada lista.' },
  { cat: 'html', type: 'single', q: 'Qual tag deve conter informações como charset, viewport e meta description?', opts: ['<body>', '<header>', '<head>', '<html>'], correct: 2, explain: 'A tag <head> contém metadados da página — não é exibida ao usuário mas é crucial para SEO, acessibilidade e responsividade.' },
  { cat: 'html', type: 'single', q: 'Qual atributo em <input> define uma dica de texto ao usuário antes de digitar?', opts: ['hint', 'placeholder', 'tooltip', 'label'], correct: 1, explain: 'O atributo placeholder exibe um texto-guia dentro do input que some quando o usuário começa a digitar.' },
  { cat: 'css', type: 'single', q: 'Qual propriedade CSS cria um layout bidimensional (linhas e colunas)?', opts: ['display: flex', 'display: block', 'display: grid', 'display: inline'], correct: 2, explain: 'display: grid cria um CSS Grid — o único modelo de layout verdadeiramente bidimensional do CSS.' },
  { cat: 'css', type: 'single', q: 'Qual a diferença entre margin e padding?', opts: ['Margin é interno, padding é externo', 'Padding é interno (entre conteúdo e borda), margin é externo (entre elementos)', 'São sinônimos', 'Margin afeta apenas textos'], correct: 1, explain: 'Padding = espaço INTERNO (entre conteúdo e borda). Margin = espaço EXTERNO (entre o elemento e os outros elementos).' },
  { cat: 'css', type: 'single', q: 'Como centralizar horizontalmente um elemento de bloco com largura definida?', opts: ['text-align: center', 'float: center', 'margin: 0 auto', 'padding: auto'], correct: 2, explain: 'margin: 0 auto com width definido centraliza elementos de bloco. Para centralizar inline, use text-align: center no pai.' },
  { cat: 'css', type: 'single', q: 'Qual pseudo-classe CSS aplica estilos quando o usuário passa o mouse sobre um elemento?', opts: [':focus', ':active', ':hover', ':visited'], correct: 2, explain: ':hover é disparado quando o ponteiro do mouse está sobre o elemento. Não funciona em touch screens sem JavaScript.' },
  { cat: 'css', type: 'single', q: 'O que faz a propriedade position: sticky?', opts: ['Remove o elemento do fluxo', 'Fixa o elemento na viewport como fixed', 'Misto entre relative e fixed — gruda ao scroll até um threshold', 'Posiciona em relação ao pai'], correct: 2, explain: 'sticky mantém o elemento no fluxo até atingir o threshold de scroll definido, então se comporta como fixed.' },
  { cat: 'css', type: 'single', q: 'Qual valor de display cria um contexto flexível de layout 1D?', opts: ['block', 'inline', 'flex', 'table'], correct: 2, explain: 'display: flex cria um Flexbox container — ideal para layouts unidimensionais (linha ou coluna).' },
  { cat: 'js', type: 'single', q: 'Qual método de array retorna um NOVO array com os elementos transformados?', opts: ['.forEach()', '.filter()', '.map()', '.reduce()'], correct: 2, explain: '.map() aplica uma função a cada elemento e retorna um NOVO array do mesmo tamanho. .forEach() não retorna nada.' },
  { cat: 'js', type: 'single', q: 'O que faz localStorage.setItem("chave", "valor")?', opts: ['Salva dados no servidor', 'Cria um cookie de sessão', 'Persiste dados no navegador do usuário (não expira)', 'Envia dados via AJAX'], correct: 2, explain: 'localStorage persiste dados no navegador sem prazo de expiração — diferente de sessionStorage (limpo ao fechar a aba).' },
  { cat: 'js', type: 'single', q: 'Qual é a forma moderna de lidar com Promises encadeadas em JavaScript?', opts: ['Callbacks', 'Promise.then().then()', 'async/await', 'setTimeout'], correct: 2, explain: 'async/await é "açúcar sintético" sobre Promises — torna código assíncrono legível como código síncrono.' },
  { cat: 'js', type: 'single', q: 'O que é o DOM?', opts: ['Document Object Model — representação em árvore do HTML', 'Data Object Manager — gerenciador de dados', 'Dynamic Output Markup — linguagem de templates', 'Document Ordering Model — ordenação de elementos'], correct: 0, explain: 'DOM (Document Object Model) é a representação em memória do HTML como uma árvore de objetos — o JavaScript o manipula.' },
  { cat: 'http', type: 'single', q: 'Qual método HTTP é usado para CRIAR um novo recurso no servidor?', opts: ['GET', 'PUT', 'POST', 'PATCH'], correct: 2, explain: 'POST cria um novo recurso e geralmente retorna 201 Created. PUT atualiza um recurso existente por completo.' },
  { cat: 'http', type: 'single', q: 'Qual código HTTP indica que um recurso não foi encontrado?', opts: ['200', '301', '403', '404'], correct: 3, explain: '404 Not Found — o servidor não encontrou o recurso. 200 OK, 301 Moved Permanently, 403 Forbidden.' },
  { cat: 'http', type: 'single', q: 'Qual é a diferença entre PUT e PATCH?', opts: ['São idênticos', 'PUT substitui o recurso inteiro, PATCH modifica parcialmente', 'PATCH substitui, PUT modifica parcialmente', 'PATCH cria, PUT atualiza'], correct: 1, explain: 'PUT substitui o recurso COMPLETO (idempotente). PATCH faz atualização PARCIAL de campos específicos.' },
  { cat: 'http', type: 'single', q: 'O que significa CORS?', opts: ['Cross-Origin Resource Sharing', 'Cached Object Response System', 'Client-Origin Request Security', 'Content Object Routing Scheme'], correct: 0, explain: 'CORS (Cross-Origin Resource Sharing) controla quais origens externas podem acessar os recursos de uma API.' },
  { cat: 'a11y', type: 'single', q: 'O que significa WCAG?', opts: ['Web Content Accessibility Guidelines', 'Web Code And Graphic Standards', 'Website Compliance And Governance', 'Web Configuration And General Standards'], correct: 0, explain: 'WCAG (Web Content Accessibility Guidelines) são as diretrizes internacionais de acessibilidade web — WCAG AA exige contraste 4.5:1.' },
  { cat: 'a11y', type: 'single', q: 'Qual atributo ARIA anuncia mudanças dinâmicas para leitores de tela?', opts: ['aria-label', 'aria-live', 'aria-hidden', 'aria-expanded'], correct: 1, explain: 'aria-live="polite" ou "assertive" faz o leitor de tela anunciar mudanças de conteúdo dinamicamente.' },
  { cat: 'a11y', type: 'single', q: 'Por que nunca devemos pular níveis de heading (ex: h1 → h3)?', opts: ['Por questões de estilo visual', 'Leitores de tela usam a hierarquia para navegação — pular quebra a estrutura semântica', 'Para manter consistência de fonte', 'Por razões de performance'], correct: 1, explain: 'Screen readers permitem navegar por headings — pular de h1 para h3 quebra a hierarquia e confunde usuários com deficiência visual.' },
];

// -- State --
let examMode = 'quiz';
let examCurrentFilter = 'all';
let examUserAnswers = JSON.parse(localStorage.getItem('exam-answers') || '{}');
let examCorrect = parseInt(localStorage.getItem('exam-correct') || '0');
let examWrong = parseInt(localStorage.getItem('exam-wrong') || '0');

function setExamMode(mode) {
  examMode = mode;
  ['quiz', 'flash', 'random'].forEach(m => {
    const btn = document.getElementById('exam-mode-' + m);
    if (!btn) return;
    btn.className = m === mode ? 'btn btn-primary' : 'btn btn-outline';
    btn.setAttribute('aria-pressed', (m === mode).toString());
  });
  const qc = document.getElementById('exam-container');
  const fc = document.getElementById('flashcard-container');
  if (!qc || !fc) return;
  if (mode === 'flash') {
    qc.style.display = 'none';
    fc.style.display = 'block';
    renderFlashcard();
  } else {
    qc.style.display = 'block';
    fc.style.display = 'none';
    const q = mode === 'random' ? shuffleArr([...filteredExamQ()]).slice(0, 10) : filteredExamQ();
    renderExamQuiz(q);
  }
}

function filteredExamQ() {
  return examCurrentFilter === 'all' ? examQuestions2 : examQuestions2.filter(q => q.cat === examCurrentFilter);
}

function filterExam(cat) {
  examCurrentFilter = cat;
  document.querySelectorAll('#sec-exam .layout-tab').forEach(t => {
    const pressed = t.textContent.toLowerCase().includes(cat) || (cat === 'all' && t.textContent === 'Todos');
    t.classList.toggle('active', pressed);
    t.setAttribute('aria-pressed', pressed.toString());
  });
  setExamMode(examMode);
}

function shuffleArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderExamQuiz(questions) {
  const container = document.getElementById('exam-container');
  if (!container) return;
  updateExamProgress(questions);
  container.innerHTML = questions.map((q, qi) => {
    const key = q.q.substring(0, 30);
    const answered = examUserAnswers[key];
    const cardClass = answered !== undefined ? (answered === q.correct ? 'answered-correct' : 'answered-wrong') : '';
    return `<div class="exam-q-card ${cardClass}" id="eq-${qi}">
      <div class="exam-q-meta">
        <span class="exam-q-num">Q${qi + 1}</span>
        <span class="exam-q-cat">${catLabel(q.cat)}</span>
        <span class="exam-q-type-badge">Múltipla Escolha</span>
      </div>
      <p class="exam-q-text">${q.q}</p>
      <div class="exam-opts">
        ${q.opts.map((o, oi) => {
      let cls = '';
      if (answered !== undefined) {
        if (oi === q.correct) cls = 'correct';
        else if (oi === answered) cls = 'wrong';
      }
      return `<button class="exam-opt-btn ${cls}" id="eq-${qi}-opt-${oi}"
            onclick="answerExam(${qi}, ${oi})" ${answered !== undefined ? 'disabled' : ''}
            aria-label="Opção ${String.fromCharCode(65 + oi)}: ${o}">
            <span class="exam-opt-letter">${String.fromCharCode(65 + oi)}</span>
            ${o}
          </button>`;
    }).join('')}
      </div>
      ${answered !== undefined ? `<div class="exam-feedback ${answered === q.correct ? 'ok' : 'err'}">
        ${answered === q.correct ? '?' : '?'} ${q.explain}
      </div>` : '<div class="exam-feedback" id="ef-' + qi + '" style="display:none"></div>'}
    </div>`;
  }).join('');
}

function answerExam(qi, optIdx) {
  const questions = examMode === 'random' ? shuffleArr([...filteredExamQ()]).slice(0, 10) : filteredExamQ();
  const q = questions[qi];
  const key = q.q.substring(0, 30);
  if (examUserAnswers[key] !== undefined) return;
  examUserAnswers[key] = optIdx;

  const isCorrect = optIdx === q.correct;
  if (isCorrect) { examCorrect++; } else { examWrong++; }

  localStorage.setItem('exam-answers', JSON.stringify(examUserAnswers));
  localStorage.setItem('exam-correct', examCorrect);
  localStorage.setItem('exam-wrong', examWrong);

  // Update button states
  q.opts.forEach((_, oi) => {
    const btn = document.getElementById(`eq-${qi}-opt-${oi}`);
    if (!btn) return;
    btn.disabled = true;
    if (oi === q.correct) btn.classList.add('correct');
    else if (oi === optIdx) btn.classList.add('wrong');
  });

  const card = document.getElementById(`eq-${qi}`);
  if (card) card.classList.add(isCorrect ? 'answered-correct' : 'answered-wrong');

  const fb = document.getElementById(`ef-${qi}`);
  if (fb) {
    fb.style.display = 'block';
    fb.className = `exam-feedback ${isCorrect ? 'ok' : 'err'}`;
    fb.innerHTML = `${isCorrect ? '?' : '?'} ${q.explain}`;
  }
  updateExamProgress(questions);
}

function updateExamProgress(questions) {
  const total = questions.length;
  let answered = 0;
  questions.forEach(q => {
    const key = q.q.substring(0, 30);
    if (examUserAnswers[key] !== undefined) answered++;
  });
  const pct = total > 0 ? (answered / total) * 100 : 0;
  const fill = document.getElementById('exam-progress-fill');
  const txt = document.getElementById('exam-progress-text');
  const corEl = document.getElementById('exam-correct-count');
  const wrEl = document.getElementById('exam-wrong-count');
  if (fill) fill.style.width = pct + '%';
  if (txt) txt.textContent = `${answered} / ${total} respondidas`;
  if (corEl) corEl.textContent = examCorrect;
  if (wrEl) wrEl.textContent = examWrong;
}

function catLabel(cat) {
  const m = { internet: '🌐 Internet', html: '📄 HTML5', css: '💅 CSS', js: '⚡ JS', http: '📡 HTTP', a11y: '♿ A11Y' };
  return m[cat] || cat;
}

/* -- FLASHCARDS ------------------------- */
const flashcardData = examQuestions2.map(q => ({
  category: catLabel(q.cat),
  question: q.q,
  answer: q.opts[q.correct] + ' — ' + q.explain
}));

let fcIndex = 0;
let fcKnown = new Set(JSON.parse(localStorage.getItem('fc-known') || '[]'));

function renderFlashcard() {
  const fc = flashcardData[fcIndex];
  if (!fc) return;
  const card = document.getElementById('flashcard');
  if (card) card.classList.remove('flipped');
  const cat = document.getElementById('fc-category');
  const q = document.getElementById('fc-question');
  const a = document.getElementById('fc-answer');
  const counter = document.getElementById('fc-counter');
  if (cat) cat.textContent = fc.category;
  if (q) q.textContent = fc.question;
  if (a) a.textContent = fc.answer;
  if (counter) counter.textContent = `${fcIndex + 1} / ${flashcardData.length}`;
}

function flipCard() {
  const card = document.getElementById('flashcard');
  if (card) card.classList.toggle('flipped');
}

function fcNav(dir) {
  fcIndex = (fcIndex + dir + flashcardData.length) % flashcardData.length;
  renderFlashcard();
}

function fcMarkKnown() {
  fcKnown.add(fcIndex);
  localStorage.setItem('fc-known', JSON.stringify([...fcKnown]));
  fcNav(1);
}

function fcMarkUnknown() {
  fcKnown.delete(fcIndex);
  localStorage.setItem('fc-known', JSON.stringify([...fcKnown]));
  fcNav(1);
}

/* -- LIVE CODE EDITOR ------------------- */
let solutionVisible = false;

const starterCode = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Produto Incrível</title>
  <style>
    /* Escreva seu CSS aqui */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
  <!-- Construa sua página de produto abaixo -->
  <nav>
    <a href="#">Início</a>
    <a href="#">Produtos</a>
    <a href="#">Contato</a>
  </nav>

  <main>
    <h1>Nome do Produto</h1>
    <!-- Adicione imagem, descrição, botão de compra... -->
  </main>

  <footer>
    <p>&copy; 2025 Minha Loja</p>
  </footer>
</body>
</html>`;

const solutionCode = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Notebook Ultralight Pro é o notebook mais leve e potente do mercado.">
  <title>Notebook Ultralight Pro | TechStore</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Segoe UI',sans-serif;background:#f0f4f8;color:#1a202c}
    nav{background:#1a202c;padding:1rem 2rem;display:flex;gap:1.5rem;align-items:center}
    nav a{color:#fff;text-decoration:none;font-size:.9rem;opacity:.8;transition:opacity .2s}
    nav a:hover{opacity:1}
    nav .brand{font-weight:800;font-size:1.1rem;opacity:1;margin-right:auto}
    main{max-width:900px;margin:3rem auto;padding:0 1.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center}
    @media(max-width:640px){main{grid-template-columns:1fr}}
    img{width:100%;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.12)}
    .product-info h1{font-size:2rem;font-weight:800;margin-bottom:.75rem;line-height:1.2}
    .badge{display:inline-block;background:#38a169;color:#fff;font-size:.72rem;font-weight:700;padding:.25rem .75rem;border-radius:100px;margin-bottom:1rem}
    .price{font-size:2.2rem;font-weight:900;color:#2b6cb0;margin:1rem 0}
    .desc{color:#4a5568;line-height:1.8;margin-bottom:1.5rem;font-size:.95rem}
    .btn-buy{display:inline-block;background:#2b6cb0;color:#fff;padding:.85rem 2rem;border-radius:12px;font-size:1rem;font-weight:700;border:none;cursor:pointer;transition:all .2s;text-decoration:none}
    .btn-buy:hover{background:#2c5282;transform:translateY(-2px);box-shadow:0 8px 25px rgba(43,108,176,.3)}
    footer{text-align:center;padding:2rem;background:#1a202c;color:#a0aec0;font-size:.85rem;margin-top:4rem}
  </style>
</head>
<body>
  <nav aria-label="Navegação principal">
    <a href="#" class="brand">💻 TechStore</a>
    <a href="#">Início</a>
    <a href="#">Produtos</a>
    <a href="#">Suporte</a>
    <a href="#">Contato</a>
  </nav>

  <main>
    <section aria-label="Imagem do produto">
      <img
        src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80"
        alt="Notebook Ultralight Pro aberto sobre mesa branca, mostrando tela fina e acabamento premium"
        width="600"
        height="400"
        loading="lazy"
      >
    </section>

    <article class="product-info">
      <span class="badge">✓ Em Estoque</span>
      <h1>Notebook Ultralight Pro</h1>
      <p class="desc">
        O notebook mais leve do mercado: apenas <strong>900g</strong> com
        processador Intel Core i7, 16GB RAM e SSD NVMe de 512GB.
        Bateria de até <strong>18 horas</strong> de uso real.
      </p>
      <div class="price" aria-label="Preço: R$ 4.299">R$ 4.299</div>
      <a
        href="#"
        class="btn-buy"
        role="button"
        aria-label="Comprar Notebook Ultralight Pro por R$ 4.299"
      >
        🛒 Comprar Agora
      </a>
    </article>
  </main>

  <footer role="contentinfo">
    <p>&copy; 2025 TechStore. Todos os direitos reservados.</p>
  </footer>
</body>
</html>`;

function loadStarterCode() {
  const editor = document.getElementById('code-editor');
  if (editor) { editor.value = starterCode; livePreview(); }
}

function clearEditor() {
  const editor = document.getElementById('code-editor');
  if (editor) { editor.value = ''; livePreview(); }
}

function toggleSolution() {
  solutionVisible = !solutionVisible;
  const btn = document.getElementById('btn-solution');
  const editor = document.getElementById('code-editor');
  if (editor) { editor.value = solutionVisible ? solutionCode : starterCode; livePreview(); }
  if (btn) btn.textContent = solutionVisible ? '💡 Esconder Solução' : '💡 Ver Solução';
}

function livePreview() {
  const editor = document.getElementById('code-editor');
  const frame = document.getElementById('preview-frame');
  const counter = document.getElementById('editor-char-count');
  if (!editor || !frame) return;
  const code = editor.value;
  if (counter) counter.textContent = code.length + ' chars';
  try {
    const doc = frame.contentDocument || frame.contentWindow.document;
    doc.open(); doc.write(code); doc.close();
  } catch (e) { }
}

function runCode() { livePreview(); }

function openPreviewFull() {
  const editor = document.getElementById('code-editor');
  if (!editor) return;
  const win = window.open('', '_blank');
  win.document.open(); win.document.write(editor.value); win.document.close();
}

/* -- CHECKLIST -------------------------- */
const checklistCriteria = [
  { id: 'has-doctype', label: 'DOCTYPE html declarado', hint: 'Adicione <code>&lt;!DOCTYPE html&gt;</code> na primeira linha do arquivo.' },
  { id: 'has-title', label: 'Título da aba definido', hint: 'Use <code>&lt;title&gt;Seu Título&lt;/title&gt;</code> dentro do &lt;head&gt;.' },
  { id: 'has-meta-viewport', label: 'Meta viewport presente', hint: '<code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code>' },
  { id: 'has-h1', label: 'Heading H1 presente', hint: 'Deve existir exatamente um <code>&lt;h1&gt;</code> por página.' },
  { id: 'has-nav', label: 'Navegação semântica (<nav>)', hint: 'Use <code>&lt;nav&gt;</code> para envolver os links de navegação.' },
  { id: 'has-main', label: 'Tag <main> presente', hint: 'O conteúdo principal deve estar dentro de <code>&lt;main&gt;</code>.' },
  { id: 'has-footer', label: 'Rodapé (<footer>) presente', hint: 'Use <code>&lt;footer&gt;</code> para o rodapé da página.' },
  { id: 'has-img', label: 'Imagem inserida', hint: 'Use <code>&lt;img src="..." alt="..."&gt;</code> para adicionar uma imagem.' },
  { id: 'has-alt', label: 'Alt text em todas as imagens', hint: 'TODAS as imagens devem ter atributo <code>alt</code> descritivo.' },
  { id: 'has-button', label: 'Botão de ação presente', hint: 'Adicione um <code>&lt;button&gt;</code> ou <code>&lt;a class="btn"&gt;</code> para a ação principal.' },
  { id: 'has-price', label: 'Preço visível na página', hint: 'Mostre o preço do produto com destaque visual (class, strong, etc.).' },
  { id: 'has-lang', label: 'Atributo lang em <html>', hint: '<code>&lt;html lang="pt-BR"&gt;</code> é obrigatório para acessibilidade.' },
  { id: 'has-meta-desc', label: 'Meta description presente', hint: '<code>&lt;meta name="description" content="..."&gt;</code> para SEO.' },
  { id: 'has-hover', label: 'Efeito hover no botão (CSS)', hint: 'No CSS: <code>.btn-buy:hover { background: ...; transform: translateY(-2px); }</code>' },
  { id: 'has-responsive', label: 'Layout responsivo (media query ou grid)', hint: 'Use <code>@media</code> ou <code>display: grid/flex</code> para adaptar o layout.' },
];

function renderChecklist() {
  const grid = document.getElementById('checklist-grid');
  const hints = document.getElementById('hints-accordion');
  if (!grid || !hints) return;

  grid.innerHTML = checklistCriteria.map(c => `
    <div class="checklist-item" id="ci-${c.id}">
      <span class="checklist-item-icon" id="ci-icon-${c.id}">○</span>
      <span class="checklist-item-text">${c.label}</span>
    </div>`).join('');

  hints.innerHTML = checklistCriteria.map((c, i) => `
    <div class="hint-item">
      <button class="hint-toggle" onclick="toggleHint('hint-${i}')" aria-expanded="false" aria-controls="hint-${i}">
        <span>${c.label}</span>
        <span class="hint-chevron">▶</span>
      </button>
      <div class="hint-body" id="hint-${i}">${c.hint}</div>
    </div>`).join('');
}

function runChecklist() {
  const editor = document.getElementById('code-editor');
  if (!editor) return;
  const code = editor.value;
  let passed = 0;

  const checks = {
    'has-doctype': () => /<!DOCTYPE\s+html/i.test(code),
    'has-title': () => /<title>.+<\/title>/i.test(code),
    'has-meta-viewport': () => /meta[^>]+viewport/i.test(code),
    'has-h1': () => /<h1[^>]*>.+<\/h1>/i.test(code),
    'has-nav': () => /<nav[\s>]/i.test(code),
    'has-main': () => /<main[\s>]/i.test(code),
    'has-footer': () => /<footer[\s>]/i.test(code),
    'has-img': () => /<img[\s]/i.test(code),
    'has-alt': () => { const imgs = code.match(/<img[^>]+>/gi) || []; return imgs.length > 0 && imgs.every(t => /alt\s*=/i.test(t)); },
    'has-button': () => /<button[\s>]/i.test(code) || /class\s*=\s*["'][^"']*btn/i.test(code),
    'has-price': () => /R\$|preço|price|\d+\.\d{3}|\d+,\d{2}/i.test(code),
    'has-lang': () => /<html[^>]+lang\s*=/i.test(code),
    'has-meta-desc': () => /meta[^>]+name\s*=\s*["']description["']/i.test(code),
    'has-hover': () => /:hover/i.test(code),
    'has-responsive': () => /@media/i.test(code) || /display\s*:\s*(grid|flex)/i.test(code),
  };

  checklistCriteria.forEach(c => {
    const pass = checks[c.id] ? checks[c.id]() : false;
    if (pass) passed++;
    const item = document.getElementById(`ci-${c.id}`);
    const icon = document.getElementById(`ci-icon-${c.id}`);
    if (item) item.className = `checklist-item ${pass ? 'pass' : 'fail'}`;
    if (icon) icon.textContent = pass ? '✓' : '✗';
  });

  const score = document.getElementById('checklist-score');
  const result = document.getElementById('checklist-result');
  if (score) score.textContent = `${passed}/15`;
  if (result) {
    if (passed === 15) { result.style.color = 'var(--green)'; result.textContent = '🎉 Perfeito! Todos os critérios atendidos!'; }
    else if (passed >= 10) { result.style.color = 'var(--yellow)'; result.textContent = `⚠️ Bom! ${15 - passed} critério(s) ainda precisam de atenção.`; }
    else { result.style.color = 'var(--red)'; result.textContent = `Ainda faltam ${15 - passed} critérios. Use as dicas abaixo!`; }
  }
}

function resetChecklist() {
  checklistCriteria.forEach(c => {
    const item = document.getElementById(`ci-${c.id}`);
    const icon = document.getElementById(`ci-icon-${c.id}`);
    if (item) item.className = 'checklist-item';
    if (icon) icon.textContent = '○';
  });
  const score = document.getElementById('checklist-score');
  const result = document.getElementById('checklist-result');
  if (score) score.textContent = '0/15';
  if (result) result.textContent = '';
}

function toggleHint(id) {
  const body = document.getElementById(id);
  const toggle = body ? body.previousElementSibling : null;
  if (!body || !toggle) return;
  const isOpen = body.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', isOpen.toString());
}

/* -- INIT NEW SECTIONS ------------------ */
// Initialize exam quiz if section exists
if (document.getElementById('exam-container')) {
  renderExamQuiz(examQuestions2);
  renderFlashcard();
  renderChecklist();
  loadStarterCode();
  updateExamProgress(examQuestions2);
}

// SECTION 1: Client-Server request simulation logic
function startRequestSimulation() {
  const c = document.getElementById('node-client');
  const s = document.getElementById('node-server');
  const db = document.getElementById('node-db');
  const packet = document.getElementById('packet');
  const consoleLog = document.getElementById('sim-console');

  consoleLog.textContent = '';
  c.classList.remove('active');
  s.classList.remove('active');
  db.classList.remove('active');

  logSim('Iniciando ciclo Client-Server...', '#3b7ee3');

  // Step 1: Client sends Request
  setTimeout(() => {
    c.classList.add('active');
    logSim('1. Cliente gera requisição HTTP GET para /produtos', 'var(--blue)');
    packet.style.display = 'block';
    packet.style.animation = 'sendRequest 1.5s forwards linear';
  }, 500);

  // Step 2: Server Receives
  setTimeout(() => {
    s.classList.add('active');
    c.classList.remove('active');
    logSim('2. Servidor express escuta na porta 3000 e recebe o pacote HTTP', 'var(--purple)');
  }, 2000);

  // Step 3: Server queries DB
  setTimeout(() => {
    db.classList.add('active');
    logSim('3. Servidor executa consulta SQL: SELECT * FROM produtos;', 'var(--yellow)');
  }, 3000);

  // Step 4: DB returns data
  setTimeout(() => {
    db.classList.remove('active');
    logSim('4. Banco de dados responde consulta com registros', 'var(--green)');
  }, 4200);

  // Step 5: Server responds to Client
  setTimeout(() => {
    packet.style.animation = 'sendResponse 1.5s forwards linear';
    logSim('5. Servidor serializa dados para JSON e monta resposta HTTP 200 OK', 'var(--purple)');
  }, 5000);

  // Step 6: Client Receives Response
  setTimeout(() => {
    c.classList.add('active');
    s.classList.remove('active');
    packet.style.display = 'none';
    logSim('6. Cliente recebe a resposta, monta a árvore DOM e exibe os produtos na tela!', 'var(--green)');
  }, 6500);
}

function resetRequestSimulation() {
  document.getElementById('node-client').classList.remove('active');
  document.getElementById('node-server').classList.remove('active');
  document.getElementById('node-db').classList.remove('active');
  document.getElementById('packet').style.display = 'none';
  document.getElementById('sim-console').textContent = '// Console de Simulação resetado.';
}

function logSim(msg, color) {
  const consoleLog = document.getElementById('sim-console');
  const time = new Date().toLocaleTimeString();
  consoleLog.innerHTML += `<div style="color: ${color}">[${time}] ${msg}</div>`;
  consoleLog.scrollTop = consoleLog.scrollHeight;
}

// SECTION 2: HTTP status codes
const statusData = {
  200: {
    title: "200 OK",
    badge: "s2xx",
    desc: "A requisição foi bem sucedida. As informações solicitadas foram localizadas e enviadas de volta ao navegador do cliente.",
    analogy: "Você vai à biblioteca, pede um livro e o bibliotecário o entrega imediatamente.",
    code: "res.status(200).json(products);"
  },
  201: {
    title: "201 Created",
    badge: "s2xx",
    desc: "A requisição foi processada e um novo recurso foi criado com sucesso no banco de dados.",
    analogy: "Você faz o pedido de um bolo, e o confeiteiro o entrega fresquinho na hora.",
    code: "res.status(201).json({ message: 'Produto cadastrado!' });"
  },
  301: {
    title: "301 Moved Permanently",
    badge: "s3xx",
    desc: "O recurso procurado mudou definitivamente de endereço. O navegador é redirecionado automaticamente para a nova URL.",
    analogy: "Uma loja fechou de endereço e deixou uma placa indicando a nova rua na vitrine.",
    code: "res.redirect(301, 'https://novo-site.com');"
  },
  400: {
    title: "400 Bad Request",
    badge: "s4xx",
    desc: "O servidor não pôde entender a requisição do cliente por causa de sintaxe inválida no JSON enviado ou dados faltando.",
    analogy: "Você tenta comprar um produto preenchendo o formulário com letras no lugar do número do CEP.",
    code: "res.status(400).send('Campo Nome é obrigatório.');"
  },
  401: {
    title: "401 Unauthorized",
    badge: "s4xx",
    desc: "A autenticação é necessária. O usuário deve fazer login antes de acessar este recurso específico.",
    analogy: "Tentar entrar em uma festa exclusiva sem mostrar o convite ou a identidade na entrada.",
    code: "res.status(401).send('Token inválido ou expirado.');"
  },
  403: {
    title: "403 Forbidden",
    badge: "s4xx",
    desc: "O cliente foi autenticado, mas não possui permissões adequadas de autorização para ler ou modificar o recurso solicitado.",
    analogy: "Um funcionário comum tentando entrar no cofre blindado reservado para a diretoria administrativa.",
    code: "res.status(403).send('Permissão negada.');"
  },
  404: {
    title: "404 Not Found",
    badge: "s4xx",
    desc: "O servidor não conseguiu localizar o recurso solicitado no endpoint indicado pela URL.",
    analogy: "Você entra em uma livraria física e pede por um livro que nunca foi publicado.",
    code: "res.status(404).send('Produto não encontrado.');"
  },
  500: {
    title: "500 Internal Server Error",
    badge: "s5xx",
    desc: "O servidor encontrou uma condição inesperada que o impediu de completar a requisição. Erro na lógica de programação backend.",
    analogy: "O garçom anota seu pedido corretamenente, mas ao chegar na cozinha o fogão explode.",
    code: "try { ... } catch (error) { res.status(500).send(error.message); }"
  }
};

function showStatus(code, btn) {
  document.querySelectorAll('.status-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const data = statusData[code];
  const target = document.getElementById('status-display');
  target.style.display = 'block';

  target.innerHTML = `
        <span class="status-badge badge-${data.badge}">${data.title}</span>
        <h3 style="margin-bottom: 0.5rem; font-weight: 800;">Detalhes Técnicos:</h3>
        <p style="margin-bottom: 1rem; color: var(--mode-txt2); font-size: 0.95rem;">${data.desc}</p>
        <div style="background: var(--mode-bg2); border: 1px solid var(--mode-border); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
          <strong style="display: block; font-size: 0.8rem; text-transform: uppercase; color: var(--purple);">Analogia Real:</strong>
          <span style="font-size: 0.9rem; color: var(--mode-txt2);">${data.analogy}</span>
        </div>
        <strong style="display: block; font-size: 0.8rem; text-transform: uppercase; color: var(--blue); margin-bottom: 0.5rem;">Como retornar no Express (Node.js):</strong>
        <div class="code-block" style="margin: 0;">${data.code}</div>
      `;
}

// Initialize with 200 OK
const initialStatusBtn = document.querySelector('.status-btn.s2xx');
if (initialStatusBtn) {
  showStatus(200, initialStatusBtn);
}

// SECTION 3: HTTP Methods Simulator Database
let simulatedDB = [
  { id: 1, name: "Teclado Mecânico", price: 299 },
  { id: 2, name: "Mouse Gamer", price: 189 },
  { id: 3, name: "Monitor IPS 24", price: 899 }
];

let selectedVerb = "GET";

function selectMethod(verb, btn) {
  document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  selectedVerb = verb;
  const methodLabel = document.getElementById('url-method-label');
  const endpoint = document.getElementById('url-endpoint-value');
  const payloadContainer = document.getElementById('payload-editor-container');
  const payloadTextarea = document.getElementById('payload-textarea-input');

  methodLabel.className = 'url-method ' + 'm-' + verb.toLowerCase();
  methodLabel.textContent = verb;

  if (verb === 'GET' || verb === 'DELETE') {
    payloadContainer.style.display = 'none';
    endpoint.value = verb === 'DELETE' ? 'https://api.loja.com/products/1' : 'https://api.loja.com/products';
  } else {
    payloadContainer.style.display = 'flex';
    if (verb === 'POST') {
      endpoint.value = 'https://api.loja.com/products';
      payloadTextarea.value = JSON.stringify({ name: "Headset Pro", price: 349 }, null, 2);
    } else if (verb === 'PUT') {
      endpoint.value = 'https://api.loja.com/products/1';
      payloadTextarea.value = JSON.stringify({ id: 1, name: "Teclado Mecânico RGB", price: 350 }, null, 2);
    } else if (verb === 'PATCH') {
      endpoint.value = 'https://api.loja.com/products/1';
      payloadTextarea.value = JSON.stringify({ price: 320 }, null, 2);
    }
  }
}

function renderDB() {
  const container = document.getElementById('db-products-list');
  if (!container) return;
  container.innerHTML = '';
  simulatedDB.forEach(item => {
    container.innerHTML += `
          <div class="db-item">
            <span style="font-weight:800; color: var(--blue);">ID ${item.id}</span>
            <span>${item.name}</span>
            <span style="color: var(--green);">R$ ${item.price}</span>
          </div>
        `;
  });
}

function sendRestRequest() {
  const respStatus = document.getElementById('resp-status');
  const respBody = document.getElementById('resp-body');
  const payloadTextarea = document.getElementById('payload-textarea-input');

  if (selectedVerb === 'GET') {
    respStatus.textContent = '200 OK';
    respStatus.style.color = 'var(--green)';
    respBody.textContent = JSON.stringify(simulatedDB, null, 2);
  } else if (selectedVerb === 'POST') {
    try {
      const newProduct = JSON.parse(payloadTextarea.value);
      if (!newProduct.name || !newProduct.price) {
        respStatus.textContent = '400 Bad Request';
        respStatus.style.color = 'var(--red)';
        respBody.textContent = '{"error": "Os campos name e price são obrigatórios"}';
        return;
      }
      const nextId = simulatedDB.length > 0 ? Math.max(...simulatedDB.map(p => p.id)) + 1 : 1;
      const created = { id: nextId, name: newProduct.name, price: Number(newProduct.price) };
      simulatedDB.push(created);
      respStatus.textContent = '201 Created';
      respStatus.style.color = 'var(--green)';
      respBody.textContent = JSON.stringify(created, null, 2);
      renderDB();
    } catch (e) {
      respStatus.textContent = '400 Bad Request';
      respStatus.style.color = 'var(--red)';
      respBody.textContent = '{"error": "Payload JSON inválido"}';
    }
  } else if (selectedVerb === 'PUT') {
    try {
      const bodyData = JSON.parse(payloadTextarea.value);
      const index = simulatedDB.findIndex(p => p.id === 1);
      if (index !== -1) {
        simulatedDB[index] = { id: 1, name: bodyData.name || simulatedDB[index].name, price: Number(bodyData.price) || simulatedDB[index].price };
        respStatus.textContent = '200 OK';
        respStatus.style.color = 'var(--green)';
        respBody.textContent = JSON.stringify(simulatedDB[index], null, 2);
        renderDB();
      } else {
        respStatus.textContent = '404 Not Found';
        respStatus.style.color = 'var(--red)';
        respBody.textContent = '{"error": "Produto com ID 1 não localizado"}';
      }
    } catch (e) {
      respStatus.textContent = '400 Bad Request';
      respStatus.style.color = 'var(--red)';
      respBody.textContent = '{"error": "Payload JSON inválido"}';
    }
  } else if (selectedVerb === 'PATCH') {
    try {
      const bodyData = JSON.parse(payloadTextarea.value);
      const index = simulatedDB.findIndex(p => p.id === 1);
      if (index !== -1) {
        if (bodyData.price !== undefined) simulatedDB[index].price = Number(bodyData.price);
        if (bodyData.name !== undefined) simulatedDB[index].name = bodyData.name;
        respStatus.textContent = '200 OK';
        respStatus.style.color = 'var(--green)';
        respBody.textContent = JSON.stringify(simulatedDB[index], null, 2);
        renderDB();
      } else {
        respStatus.textContent = '404 Not Found';
        respStatus.style.color = 'var(--red)';
        respBody.textContent = '{"error": "Produto com ID 1 não localizado"}';
      }
    } catch (e) {
      respStatus.textContent = '400 Bad Request';
      respStatus.style.color = 'var(--red)';
      respBody.textContent = '{"error": "Payload JSON inválido"}';
    }
  } else if (selectedVerb === 'DELETE') {
    const index = simulatedDB.findIndex(p => p.id === 1);
    if (index !== -1) {
      simulatedDB.splice(index, 1);
      respStatus.textContent = '200 OK';
      respStatus.style.color = 'var(--green)';
      respBody.textContent = '{"message": "Produto excluído com sucesso."}';
      renderDB();
    } else {
      respStatus.textContent = '404 Not Found';
      respStatus.style.color = 'var(--red)';
      respBody.textContent = '{"error": "Produto com ID 1 não localizado"}';
    }
  }
}

renderDB();

// SECTION 4: DOM manipulation logic
function updateDomTitle(text) {
  const title = document.getElementById('dom-target-title');
  title.textContent = text;
  updateDomLiveCode(`document.getElementById('dom-target-title').textContent = "${text}";`);
}

function updateDomParagraph(html) {
  const p = document.getElementById('dom-target-desc');
  p.innerHTML = html;
  updateDomLiveCode(`document.getElementById('dom-target-desc').innerHTML = "${html}";`);
}

// Toggle target classes
function toggleDomClass(clsName) {
  const target = document.getElementById('dom-target');
  target.classList.toggle(clsName);
  updateDomLiveCode(`document.getElementById('dom-target').classList.toggle('${clsName}');`);
}

function updateDomLiveCode(code) {
  document.getElementById('dom-live-code').textContent = code;
}

// SECTION 5: Event visualizer logic
function logEvent(type, details) {
  const consoleLog = document.getElementById('events-console');
  const time = new Date().toLocaleTimeString();
  consoleLog.innerHTML += `<div style="margin-bottom: 0.25rem;">[Event: <span style="color:var(--pink);">${type}</span>] ${details}</div>`;
  consoleLog.scrollTop = consoleLog.scrollHeight;
}

// SECTION 6: Form Validation
function validateFieldModulo2(field) {
  const name = document.getElementById('val-name');
  const email = document.getElementById('val-email');
  const pass = document.getElementById('val-pass');

  const msgName = document.getElementById('msg-name');
  const msgEmail = document.getElementById('msg-email');
  const msgPass = document.getElementById('msg-pass');

  if (field === 'name') {
    if (name.value.length >= 4) {
      name.style.borderColor = 'var(--green)';
      msgName.textContent = '✓ Nome válido';
      msgName.style.color = 'var(--green)';
    } else {
      name.style.borderColor = 'var(--red)';
      msgName.textContent = 'Erro: Mínimo de 4 caracteres';
      msgName.style.color = 'var(--red)';
    }
  }

  if (field === 'email') {
    const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
    if (emailRegex.test(email.value)) {
      email.style.borderColor = 'var(--green)';
      msgEmail.textContent = '✓ Email estruturado corretamente';
      msgEmail.style.color = 'var(--green)';
    } else {
      email.style.borderColor = 'var(--red)';
      msgEmail.textContent = 'Erro: Digite um email válido';
      msgEmail.style.color = 'var(--red)';
    }
  }

  if (field === 'pass') {
    if (pass.value.length >= 6) {
      pass.style.borderColor = 'var(--green)';
      msgPass.textContent = '✓ Senha forte';
      msgPass.style.color = 'var(--green)';
    } else {
      pass.style.borderColor = 'var(--red)';
      msgPass.textContent = 'Erro: Mínimo 6 caracteres';
      msgPass.style.color = 'var(--red)';
    }
  }
}

function handleDemoSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('val-name');
  const email = document.getElementById('val-email');
  const pass = document.getElementById('val-pass');

  if (name.value.length >= 4 && email.value.includes('@') && pass.value.length >= 6) {
    alert('Cadastro enviado com sucesso e validado pelo JavaScript!');
  } else {
    alert('Por favor, corrija os erros do formulário antes de enviar.');
  }
}

// SECTION 7: JSON Visualizer
function renderJsonVisualizer(text) {
  const status = document.getElementById('json-status-indicator');
  const tree = document.getElementById('json-tree-container');
  try {
    const obj = JSON.parse(text);
    status.textContent = '✓ JSON Válido';
    status.style.color = 'var(--green)';

    tree.innerHTML = renderNode(obj);
  } catch (e) {
    status.textContent = '❌ JSON Inválido: ' + e.message;
    status.style.color = 'var(--red)';
  }
}

function renderNode(val) {
  if (typeof val === 'string') {
    return `<span class="json-value-string">"${val}"</span>`;
  }
  if (typeof val === 'number') {
    return `<span class="json-value-number">${val}</span>`;
  }
  if (typeof val === 'boolean') {
    return `<span class="json-value-boolean">${val}</span>`;
  }
  if (val === null) {
    return `<span class="json-value-boolean">null</span>`;
  }
  if (Array.isArray(val)) {
    return `[ ${val.map(item => renderNode(item)).join(', ')} ]`;
  }
  if (typeof val === 'object') {
    let h = '{<div style="margin-left: 1.5rem;">';
    const keys = Object.keys(val);
    keys.forEach((key, index) => {
      h += `<span class="json-key">"${key}"</span>: ${renderNode(val[key])}${index < keys.length - 1 ? ',' : ''}<br>`;
    });
    h += '</div>}';
    return h;
  }
}

// Init JSON visualizer
const initialJsonText = document.getElementById('json-editor-text');
if (initialJsonText) {
  renderJsonVisualizer(initialJsonText.value);
}

// SECTION 8: Fetch API Loading simulation
function simulateFetch(mode) {
  const loader = document.getElementById('fetch-loader-status');
  const output = document.getElementById('fetch-output-console');

  loader.textContent = 'PENDING (Aguardando rede...)';
  loader.style.color = 'var(--yellow)';
  output.textContent = '// Fazendo chamada fetch à API...';

  setTimeout(() => {
    if (mode === 'success') {
      loader.textContent = 'SUCCESS (200 OK)';
      loader.style.color = 'var(--green)';
      output.innerHTML = `<div style="color:var(--green)">✓ Resposta recebida! JSON de Retorno:</div><pre style="font-family:inherit;color:#34d399;">{
  "success": true,
  "payload": ["Item A", "Item B"]
}</pre>`;
    } else if (mode === 'error') {
      loader.textContent = 'ERROR (404 Not Found)';
      loader.style.color = 'var(--yellow)';
      output.innerHTML = `<div style="color:var(--yellow)">⚠ Recurso não encontrado. Mensagem de erro da API:</div><pre style="font-family:inherit;color:var(--yellow);">{
  "error": "Endpoint inválido"
}</pre>`;
    } else {
      loader.textContent = 'FAILED (Network Error)';
      loader.style.color = 'var(--red)';
      output.innerHTML = `<div style="color:var(--red)">❌ TypeError: Failed to fetch (Servidor inalcançável ou CORS incorreto).</div>`;
    }
  }, 1500);
}

// SECTION 10: Security pass updates
function updateSecPass(val) {
  document.getElementById('packet-http').textContent = 'GET: pass=' + val;
  const hashed = val.split('').map(() => '*').join('');
  document.getElementById('packet-https').textContent = 'GET: pass=' + btoa(val).substring(0, 15) + '...';
  document.getElementById('intercept-http').innerHTML = '// Pacote de Rede Interceptado pelo Hacker: <strong style="color:var(--red)">' + val + '</strong> (SENHA EXPOSTA!)';
}

function startSecurityBattle() {
  const httpPacket = document.getElementById('packet-http');
  const httpsPacket = document.getElementById('packet-https');

  const httpInt = document.getElementById('intercept-http');
  const httpsInt = document.getElementById('intercept-https');

  httpPacket.style.animation = 'none';
  httpsPacket.style.animation = 'none';
  httpInt.style.display = 'none';
  httpsInt.style.display = 'none';

  setTimeout(() => {
    httpPacket.style.animation = 'sendRequest 2s forwards linear';
    httpsPacket.style.animation = 'sendRequest 2s forwards linear';
  }, 100);

  setTimeout(() => {
    httpInt.style.display = 'block';
    httpsInt.style.display = 'block';
  }, 2100);
}

// SECTION 11: Authorization & roles simulator
const rolePermissions = {
  guest: { public: '🔓 Permitido', grades: '🔒 Negado', admin: '🔒 Negado' },
  user: { public: '🔓 Permitido', grades: '🔓 Permitido', admin: '🔒 Negado' },
  admin: { public: '🔓 Permitido', grades: '🔓 Permitido', admin: '🔓 Permitido' }
};

function selectRole(role, btn) {
  document.querySelectorAll('#sec-auth-authz button').forEach(b => {
    b.className = 'btn btn-outline';
  });
  if (btn) btn.className = 'btn btn-primary';

  const p = rolePermissions[role];
  const cardPub = document.getElementById('card-public');
  const cardGra = document.getElementById('card-grades');
  const cardAdm = document.getElementById('card-admin-dashboard');

  updateRoleCard(cardPub, p.public);
  updateRoleCard(cardGra, p.grades);
  updateRoleCard(cardAdm, p.admin);
}

function updateRoleCard(el, status) {
  if (!el) return;
  const icon = el.querySelector('.role-status-icon');
  if (status.includes('Permitido')) {
    el.className = 'role-card allowed';
    icon.textContent = '🔓';
  } else {
    el.className = 'role-card denied';
    icon.textContent = '🔒';
  }
}

const defaultRoleEl = document.getElementById('role-guest');
if (defaultRoleEl) {
  selectRole('guest', defaultRoleEl);
}

// SECTION 12: Storage Playground logic
function renderStorageTable() {
  const consoleOutput = document.getElementById('storage-console');
  if (!consoleOutput) return;
  consoleOutput.innerHTML = '';
  if (localStorage.length === 0) {
    consoleOutput.textContent = '// Nenhuma chave salva no LocalStorage.';
    return;
  }
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const val = localStorage.getItem(key);
    consoleOutput.innerHTML += `<div style="margin-bottom:0.25rem;">chave: <strong style="color:var(--pink)">"${key}"</strong>, valor: <strong style="color:var(--green)">"${val}"</strong></div>`;
  }
}

function saveToStorage(type) {
  const key = document.getElementById('storage-key-input').value;
  const val = document.getElementById('storage-value-input').value;

  if (!key) return alert('Por favor digite uma chave válida.');

  if (type === 'local') {
    localStorage.setItem(key, val);
  } else {
    sessionStorage.setItem(key, val);
  }
  if (document.getElementById('storage-console')) {
  renderStorageTable();
}
}

renderStorageTable();



// SECTION 15: SANDBOX
function switchSandboxTab(tab, btn) {
  document.querySelectorAll('.sandbox-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.sandbox-tab-panel').forEach(p => p.classList.remove('active'));

  btn.classList.add('active');
  document.getElementById('sandbox-panel-' + tab).classList.add('active');
}

function createSandboxNode() {
  const text = document.getElementById('sandbox-dom-text').value || "Novo Item";
  const container = document.getElementById('sandbox-dom-container');

  if (container.textContent.includes('// Elementos')) {
    container.innerHTML = '';
  }

  const item = document.createElement('div');
  item.className = 'db-item';
  item.textContent = text;
  item.onclick = function () {
    this.remove();
    if (container.children.length === 0) {
      container.innerHTML = '// Elementos aparecerão aqui...';
    }
  };
  container.appendChild(item);
}

function clearSandboxContainer() {
  const container = document.getElementById('sandbox-dom-container');
  container.innerHTML = '// Elementos aparecerão aqui...';
}

function executeSandboxApi() {
  const verb = document.getElementById('sandbox-api-verb').value;
  const url = document.getElementById('sandbox-api-url').value;
  const consoleEl = document.getElementById('sandbox-api-console');

  consoleEl.innerHTML = '// Enviando chamada para o simulador...';
  setTimeout(() => {
    consoleEl.innerHTML = `
          <span style="color:var(--green)">[API Log] Requisição efetuada com sucesso:</span><br>
          <span style="color:var(--purple)">Method:</span> ${verb}<br>
          <span style="color:var(--purple)">URL:</span> ${url}<br>
          <span style="color:var(--blue)">Status:</span> 200 OK<br>
          <span style="color:var(--cyan)">Response Payload:</span> {"success": true, "timestamp": ${Date.now()}}
        `;
  }, 800);
}

function executeSandboxSave() {
  const key = document.getElementById('sandbox-key').value;
  const val = document.getElementById('sandbox-val').value;
  const log = document.getElementById('sandbox-storage-console');

  if (!key) return alert('Chave obrigatória.');
  localStorage.setItem(key, val);
  log.innerHTML = `[LocalStorage] Salvo: <strong>${key}</strong> = "${val}"`;
}

function executeSandboxLoad() {
  const key = document.getElementById('sandbox-key').value;
  const log = document.getElementById('sandbox-storage-console');

  if (!key) return alert('Chave obrigatória.');
  const val = localStorage.getItem(key);
  if (val === null) {
    log.innerHTML = `[LocalStorage] Chave <strong>${key}</strong> não encontrada.`;
  } else {
    log.innerHTML = `[LocalStorage] Carregado: <strong>${key}</strong> = "${val}"`;
  }
}

/* ════════════════════════════════════════
   MÓDULO 2 — NOVAS INTERATIVIDADES COMPLEMENTARES
════════════════════════════════════════ */

// 1. TIMELINE DA HISTÓRIA DO JS
const historyMilestones = [
  {
    title: "1995 — O Nascimento e Eich",
    text: "Brendan Eich desenvolve o <strong>Mocha</strong> (nome inicial) em apenas 10 dias na Netscape. Posteriormente renomeado para LiveScript e depois para <strong>JavaScript</strong> para pegar carona no sucesso da linguagem Java. Recebeu muitas críticas iniciais por ser lenta e 'bugada', enquanto Applets Java eram a tecnologia preferida."
  },
  {
    title: "1996 — Guerra dos Navegadores e JScript",
    text: "A Microsoft faz engenharia reversa e cria o <strong>JScript</strong> para o Internet Explorer 3. A fragmentação da web se torna absurda. Para salvar a linguagem, a Netscape submete o JS à <strong>ECMA International</strong>, iniciando a padronização oficial (ECMAScript)."
  },
  {
    title: "2005 — A Revolução AJAX",
    text: "Jesse James Garrett cunha o termo <strong>AJAX</strong>. Google lança o Maps e Gmail usando requisições assíncronas em background. A web deixa de ser um mar de documentos estáticos e passa a se comportar como aplicativos interativos (Single Page Applications)."
  },
  {
    title: "2009-2013 — NodeJS e SPAs",
    text: "Em 2009, Ryan Dahl extrai o motor <strong>V8</strong> do Chrome e cria o <strong>Node.js</strong>, permitindo rodar JS no servidor. Em seguida, surgem gerenciadores como npm e frameworks modernos de Single Page Applications como AngularJS (2010), Webpack (2012) e React (2013)."
  },
  {
    title: "2015+ — ECMAScript 6 (ES6 / ES2015)",
    text: "O lançamento do <strong>ES6</strong> representa a maior evolução da linguagem desde seu nascimento. Introduz <code>let</code>, <code>const</code>, classes baseadas em protótipos, promises nativas, arrow functions, destructuring e template literals, estabelecendo a base moderna."
  }
];

function showHistoryStep(index, btn) {
  const container = document.getElementById("history-content-display");
  if (!container) return;

  // Update tabs
  document.querySelectorAll(".modulo2-page .step-tab").forEach(tab => tab.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const step = historyMilestones[index];
  container.innerHTML = `
    <h3>${step.title}</h3>
    <p style="font-size:0.9rem; line-height:1.6; color:var(--mode-txt2);">${step.text}</p>
  `;
}

// Initial step loading
showHistoryStep(0, null);

// 2. SIMULADOR DE CARREGAMENTO DE SCRIPTS
let scriptSimTimer = null;
function simulateScriptLoad(type) {
  if (scriptSimTimer) {
    clearInterval(scriptSimTimer);
  }

  const htmlBar = document.getElementById("html-parse-bar");
  const dlBar = document.getElementById("js-download-bar");
  const execBar = document.getElementById("js-execution-bar");
  const consoleEl = document.getElementById("script-load-console");

  if (!htmlBar || !dlBar || !execBar || !consoleEl) return;

  // Reset bars
  htmlBar.style.width = "0%";
  dlBar.style.width = "0%";
  execBar.style.width = "0%";
  consoleEl.innerHTML = "Iniciando simulação do tipo: <strong>" + type.toUpperCase() + "</strong>...";

  let time = 0;
  const maxTime = 100; // Total duration ticks

  scriptSimTimer = setInterval(() => {
    time += 2;
    if (time > maxTime) {
      clearInterval(scriptSimTimer);
      consoleEl.innerHTML += "<br><span style='color:var(--green)'>✓ Renderização e Execução Concluídas!</span>";
      return;
    }

    if (type === 'normal') {
      // Normal blocking script
      if (time <= 30) {
        htmlBar.style.width = (time / 100 * 100) + "%";
        consoleEl.innerHTML = "Analisando HTML (Parser ativo)...";
      } else if (time > 30 && time <= 60) {
        dlBar.style.width = ((time - 30) / 30 * 100) + "%";
        consoleEl.innerHTML = "<span style='color:var(--red)'>⚠ Parser BLOQUEADO!</span> Baixando script JS...";
      } else if (time > 60 && time <= 80) {
        execBar.style.width = ((time - 60) / 20 * 100) + "%";
        consoleEl.innerHTML = "<span style='color:var(--red)'>⚠ Parser BLOQUEADO!</span> Executando script JS...";
      } else {
        htmlBar.style.width = ((time - 20) / 100 * 100) + "%";
        consoleEl.innerHTML = "Retomando parsing do HTML e finalizando renderização.";
      }
    } else if (type === 'async') {
      // Async script
      if (time <= 50) {
        htmlBar.style.width = (time / 100 * 100) + "%";
        dlBar.style.width = (time / 50 * 100) + "%";
        consoleEl.innerHTML = "Analisando HTML e Baixando JS em paralelo...";
      } else if (time > 50 && time <= 70) {
        execBar.style.width = ((time - 50) / 20 * 100) + "%";
        consoleEl.innerHTML = "<span style='color:var(--red)'>⚠ Script Baixado! Parser BLOQUEADO</span> para execução imediata do JS...";
      } else {
        htmlBar.style.width = ((time - 20) / 100 * 100) + "%";
        consoleEl.innerHTML = "Execução terminada. Finalizando parsing do HTML.";
      }
    } else if (type === 'defer') {
      // Defer script
      if (time <= 70) {
        htmlBar.style.width = (time / 80 * 100) + "%";
        dlBar.style.width = (time / 70 * 100) + "%";
        consoleEl.innerHTML = "Analisando HTML e Baixando JS em paralelo (Sem bloqueios)...";
      } else if (time > 70 && time <= 80) {
        htmlBar.style.width = (time / 80 * 100) + "%";
        consoleEl.innerHTML = "JS baixado. Aguardando fim do parsing do HTML...";
      } else if (time > 80 && time <= 95) {
        execBar.style.width = ((time - 80) / 15 * 100) + "%";
        consoleEl.innerHTML = "<span style='color:var(--blue)'>HTML completamente carregado.</span> Iniciando execução dos scripts deferidos...";
      } else {
        consoleEl.innerHTML = "Tudo finalizado de forma fluida.";
      }
    }
  }, 80);

  // Active button styling
  document.querySelectorAll("[id^='btn-load-']").forEach(btn => btn.className = 'btn btn-outline');
  document.getElementById("btn-load-" + type).className = 'btn btn-primary';
}

// 3. CSSOM EXPLORER
function updateCssomDisplay() {
  const elId = document.getElementById("cssom-element-select").value;
  const targetEl = document.getElementById(elId);

  const inlineValEl = document.getElementById("cssom-inline-val");
  const inlineRadiusEl = document.getElementById("cssom-inline-radius");
  const computedValEl = document.getElementById("cssom-computed-val");
  const computedRadiusEl = document.getElementById("cssom-computed-radius");

  if (!targetEl || !inlineValEl) return;

  // Inline styles read
  inlineValEl.textContent = targetEl.style.color ? `"${targetEl.style.color}"` : '"" (vazio)';
  inlineRadiusEl.textContent = targetEl.style.borderRadius ? `"${targetEl.style.borderRadius}"` : '"" (vazio)';

  // Computed styles read
  const comp = window.getComputedStyle(targetEl);
  computedValEl.textContent = `"${comp.color}"`;
  computedRadiusEl.textContent = `"${comp.borderRadius}"`;
}

function setCssomStyle(prop, val) {
  const elId = document.getElementById("cssom-element-select").value;
  const targetEl = document.getElementById(elId);

  if (!targetEl) return;

  targetEl.style[prop] = val;
  updateCssomDisplay();
}

// Initialize CSSOM display on load
setTimeout(updateCssomDisplay, 500);

// 4. VAR, LET, CONST & HOISTING SCENARIOS
const varScenarios = {
  "var-hoisting": {
    code: `console.log(a);\nvar a = 5;\nconsole.log(a);`,
    exec: function() {
      return {
        log: "console.log(a) -> undefined\nvar a = 5;\nconsole.log(a) -> 5",
        explain: "A declaração 'var a' foi içada (hoisting) para o topo, porém seu valor (5) não. Por isso, a variável existe mas inicia com o valor especial 'undefined' até ser inicializada na segunda linha."
      };
    }
  },
  "let-hoisting": {
    code: `console.log(b);\nlet b = 10;`,
    exec: function() {
      return {
        log: "ReferenceError: Cannot access 'b' before initialization",
        explain: "O let também sofre hoisting, porém a variável entra na Temporal Dead Zone (Zona Morta Temporal). Acessá-la antes de sua linha de declaração gera um erro fatal de execução."
      };
    }
  },
  "let-block": {
    code: `if (true) {\n  var v = "var global";\n  let l = "let de bloco";\n}\nconsole.log(v);\nconsole.log(l);`,
    exec: function() {
      return {
        log: "console.log(v) -> \"var global\"\nReferenceError: l is not defined",
        explain: "A variável declarada com 'var' ignora o escopo do bloco 'if' e permanece acessível fora. Já a variável com 'let' respeita o escopo e é destruída ao fechar o bloco."
      };
    }
  },
  "const-mutation": {
    code: `const obj = { name: "John" };\nobj.name = "Snow"; // OK!\nobj = { name: "Other" }; // ERRO!`,
    exec: function() {
      return {
        log: "obj.name -> \"Snow\"\nTypeError: Assignment to constant variable",
        explain: "A palavra-chave 'const' impede a reatribuição da variável (você não pode apontar 'obj' para outro objeto), mas não congela as propriedades internas, que permanecem mutáveis."
      };
    }
  }
};

function runVarScenarioSim() {
  const key = document.getElementById("var-scenario-select").value;
  const scene = varScenarios[key];
  const codeEl = document.getElementById("var-sim-code");

  if (!scene || !codeEl) return;
  codeEl.innerHTML = `<pre style="margin:0; font-family:inherit;">${scene.code}</pre>`;
}

function executeVarScenarioSim() {
  const key = document.getElementById("var-scenario-select").value;
  const scene = varScenarios[key];
  const consoleEl = document.getElementById("var-sim-console");

  if (!scene || !consoleEl) return;

  const res = scene.exec();
  consoleEl.innerHTML = `
    <span style="color:var(--pink)">[Executando console...]</span><br>
    <pre style="margin:0.25rem 0; font-family:inherit; color:var(--cyan); font-weight:700;">${res.log}</pre>
    <span style="color:var(--green)">Explicação:</span> ${res.explain}
  `;
}

// Init scenario code view
runVarScenarioSim();

// 5. TYPE CHECKER & COERCION SANDBOX
function setTypeCheckerValue(val) {
  const input = document.getElementById("type-checker-input");
  if (!input) return;
  input.value = val;
  evaluateTypeCheckerExpression();
}

function evaluateTypeCheckerExpression() {
  const expr = document.getElementById("type-checker-input").value;
  const exprOut = document.getElementById("type-expr-out");
  const valOut = document.getElementById("type-val-out");
  const typeOut = document.getElementById("type-type-out");
  const explOut = document.getElementById("type-explanation-out");

  if (!exprOut || !valOut || !typeOut || !explOut) return;

  if (!expr.trim()) {
    exprOut.textContent = "--";
    valOut.textContent = "--";
    typeOut.textContent = "--";
    explOut.textContent = "";
    return;
  }

  exprOut.textContent = expr;

  try {
    let resolved;
    let type;
    let explanation = "";

    const cleaned = expr.replace(/\s+/g, "");

    if (cleaned === '5+"5"' || cleaned === '"5"+5') {
      resolved = "55";
      type = "string";
      explanation = "Coerção implícita: O operador '+' com uma string converte o número para string e realiza concatenação.";
    } else if (cleaned === '"10"-2' || cleaned === '10-"2"') {
      resolved = 8;
      type = "number";
      explanation = "Coerção implícita: O operador '-' não é definido para strings, então o JS força a conversão do texto para número.";
    } else if (cleaned === '3+true' || cleaned === 'true+3') {
      resolved = 4;
      type = "number";
      explanation = "Coerção implícita: Booleanos são convertidos em números (true = 1, false = 0) quando operados matematicamente.";
    } else if (cleaned === '4+undefined' || cleaned === 'undefined+4') {
      resolved = NaN;
      type = "number";
      explanation = "Coerção implícita: Somar undefined resulta em NaN (Not-a-Number) pois undefined não representa valor numérico.";
    } else if (cleaned === '1=="1"') {
      resolved = true;
      type = "boolean";
      explanation = "Coerção implícita: O operador de comparação fraca '==' converte tipos automaticamente antes de testar a igualdade.";
    } else if (cleaned === '1==="1"') {
      resolved = false;
      type = "boolean";
      explanation = "Sem coerção: O operador estrito '===' verifica tanto o valor quanto o tipo. Tipos diferentes (number e string) retornam false.";
    } else if (cleaned === '[]' || cleaned === '{}') {
      resolved = cleaned === '[]' ? "Array(0)" : "[object Object]";
      type = "object";
      explanation = "Estrutura complexa do tipo object.";
    } else if (cleaned === 'null') {
      resolved = "null";
      type = "object";
      explanation = "Atenção: null representa ausência intencional, mas retorna 'object' devido a um bug nas primeiras versões da linguagem.";
    } else {
      if (/^[0-9+\-*/().\s=<>!&|'"[\]{}n]+$/.test(expr)) {
        const fn = new Function("return (" + expr + ")");
        const val = fn();
        resolved = typeof val === 'object' && val !== null ? JSON.stringify(val) : String(val);
        type = typeof val;
        explanation = "Expressão resolvida com sucesso.";
      } else {
        throw new Error("Expressão não suportada.");
      }
    }

    valOut.textContent = resolved;
    typeOut.textContent = type;
    explOut.innerHTML = "⚡ " + explanation;

  } catch (err) {
    valOut.textContent = "Erro de Sintaxe";
    typeOut.textContent = "--";
    explOut.innerHTML = "<span style='color:var(--red)'>Expressão inválida.</span>";
  }
}

// 6. CLASSES & HERANÇA ES6
let instantiatedObjects = [];
function createClassInstance(type) {
  const nome = document.getElementById("class-nome").value || "Sem nome";
  const idade = Number(document.getElementById("class-idade").value) || 0;
  const curso = document.getElementById("class-curso").value || "Sem curso";

  const consoleEl = document.getElementById("class-output-console");
  if (!consoleEl) return;

  if (type === 'Pessoa') {
    const p = {
      tipo: 'Pessoa',
      nome: nome,
      idade: idade,
      apresentar: function() { return "Olá, meu nome é " + this.nome; }
    };
    instantiatedObjects.push(p);
    consoleEl.innerHTML = `
      <span style="color:var(--green)">new Pessoa("${nome}", ${idade}) criado!</span><br>
      Chamando método: <strong>p1.apresentar()</strong> -> <span style="color:var(--cyan)">"${p.apresentar()}"</span><br>
      Estrutura do objeto: <pre style="margin:0.25rem 0; font-size:0.75rem; color:var(--purple);">${JSON.stringify(p, null, 2)}</pre>
    `;
  } else {
    const a = {
      tipo: 'Aluno',
      nome: nome,
      idade: idade,
      curso: curso,
      apresentar: function() { return "Olá, meu nome é " + this.nome; },
      estudar: function() { return this.nome + " está estudando " + this.curso; }
    };
    instantiatedObjects.push(a);
    consoleEl.innerHTML = `
      <span style="color:var(--green)">new Aluno("${nome}", ${idade}, "${curso}") criado!</span><br>
      Chamando método herdado: <strong>a1.apresentar()</strong> -> <span style="color:var(--cyan)">"${a.apresentar()}"</span><br>
      Chamando método próprio: <strong>a1.estudar()</strong> -> <span style="color:var(--cyan)">"${a.estudar()}"</span><br>
      Estrutura do objeto: <pre style="margin:0.25rem 0; font-size:0.75rem; color:var(--purple);">${JSON.stringify(a, null, 2)}</pre>
    `;
  }
}

// 7. TRATAMENTO DE ERROS TRY/CATCH
function runErrorDemoScenario(scenario) {
  const codeEl = document.getElementById("error-flow-code");
  const consoleEl = document.getElementById("error-console-output");

  if (!codeEl || !consoleEl) return;

  codeEl.innerHTML = `
    <span class="kw">try</span> {<br>
    &nbsp;&nbsp;<span class="cm">// Bloco monitorado</span><br>
    &nbsp;&nbsp;<span class="kw">let</span> x = <span id="error-sim-trigger-line">y + 1</span>;<br>
    } <span class="kw">catch</span> (err) {<br>
    &nbsp;&nbsp;<span class="cm">// Tratador de erro</span><br>
    &nbsp;&nbsp;console.<span class="fn">error</span>(err.message);<br>
    } <span class="kw">finally</span> {<br>
    &nbsp;&nbsp;<span class="cm">// Roda sempre</span><br>
    &nbsp;&nbsp;console.<span class="fn">log</span>(<span class="st">"Sempre executa!"</span>);<br>
    }
  `;

  if (scenario === 'reference') {
    consoleEl.innerHTML = `
      <span style="color:var(--pink)">[Iniciando Bloco Try]</span><br>
      Executando linha 3... <span style="color:var(--red)">ReferenceError: y is not defined</span><br>
      Desviando fluxo para o bloco <strong>Catch</strong>!<br>
      <span style="color:var(--red)">[Catch Log] Ocorreu um erro: y is not defined</span><br>
      Entrando no bloco <strong>Finally</strong>...<br>
      [Finally Log] Sempre executa! ✓ Limpeza concluída.
    `;
  } else if (scenario === 'custom') {
    codeEl.innerHTML = codeEl.innerHTML.replace('let x = <span id="error-sim-trigger-line">y + 1</span>;', '<span style="color:var(--pink); font-weight:800;">throw new Error("Saldo Insuficiente!");</span>');
    consoleEl.innerHTML = `
      <span style="color:var(--pink)">[Iniciando Bloco Try]</span><br>
      Executando throw... <span style="color:var(--red)">Lançando erro customizado: Saldo Insuficiente!</span><br>
      Desviando fluxo para o bloco <strong>Catch</strong>!<br>
      <span style="color:var(--red)">[Catch Log] Ocorreu um erro: Saldo Insuficiente!</span><br>
      Entrando no bloco <strong>Finally</strong>...<br>
      [Finally Log] Sempre executa! ✓ Limpeza concluída.
    `;
  } else {
    codeEl.innerHTML = codeEl.innerHTML.replace('y + 1', '10 + 20');
    consoleEl.innerHTML = `
      <span style="color:var(--pink)">[Iniciando Bloco Try]</span><br>
      Executando linha 3: let x = 10 + 20; (x = 30)<br>
      Bloco Try executado com total sucesso. Nenhuma exceção encontrada.<br>
      Ignorando bloco <strong>Catch</strong>.<br>
      Entrando no bloco <strong>Finally</strong>...<br>
      [Finally Log] Sempre executa! ✓ Limpeza concluída.
    `;
  }
}

// 8. REGEX SANDBOX
const regexShortcuts = {
  "has-number": { pattern: "/\\d/", replacement: "XXX", replaceMode: false },
  "only-letters": { pattern: "/[A-Z]/g", replacement: "XXX", replaceMode: false },
  "email-validation": { pattern: "/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/", replacement: "XXX", replaceMode: false },
  "replace-digits": { pattern: "/\\d+/g", replacement: "XXX", replaceMode: true },
  "cep-format": { pattern: "/^\\d{5}-\\d{3}$/", replacement: "XXX", replaceMode: false },
  "phone-format": { pattern: "/^\\(\\d{2}\\)\\s\\d{5}-\\d{4}$/", replacement: "XXX", replaceMode: false }
};

function applyRegexShortcut() {
  const val = document.getElementById("regex-shortcut").value;
  const shortcuts = regexShortcuts[val];

  if (!shortcuts) return;

  document.getElementById("regex-pattern").value = shortcuts.pattern;
  document.getElementById("regex-replacement").value = shortcuts.replacement;
  document.getElementById("regex-replacement-group").style.display = shortcuts.replaceMode ? "block" : "none";

  runLiveRegex();
}

function runLiveRegex() {
  const patternStr = document.getElementById("regex-pattern").value;
  const replacementStr = document.getElementById("regex-replacement").value;
  const inputText = document.getElementById("regex-input-text").value;

  const testOut = document.getElementById("regex-test-out");
  const matchOut = document.getElementById("regex-match-out");
  const replaceOut = document.getElementById("regex-replace-out");

  if (!testOut || !matchOut || !replaceOut) return;

  if (!patternStr.trim() || !inputText) {
    testOut.textContent = "--";
    matchOut.textContent = "--";
    replaceOut.textContent = "--";
    return;
  }

  try {
    const match = patternStr.match(/^\/(.*?)\/([gimy]*)$/);
    let regex;
    if (match) {
      regex = new RegExp(match[1], match[2]);
    } else {
      regex = new RegExp(patternStr);
    }

    const testResult = regex.test(inputText);
    const matchResult = inputText.match(regex);
    const replaceResult = inputText.replace(regex, replacementStr);

    testOut.textContent = String(testResult);
    testOut.style.color = testResult ? "var(--green)" : "var(--red)";

    matchOut.textContent = matchResult ? JSON.stringify(matchResult) : "null";
    replaceOut.textContent = `"${replaceResult}"`;

  } catch (err) {
    testOut.textContent = "Erro na Expressão";
    testOut.style.color = "var(--red)";
    matchOut.textContent = "--";
    replaceOut.textContent = "--";
  }
}

// Initialize regex sandbox
setTimeout(applyRegexShortcut, 500);

// 9. JWT CREATOR AND PARSER
function updateFictionalJwt() {
  const email = document.getElementById("jwt-email").value || "admin@email.com";
  const role = document.getElementById("jwt-role").value;
  const secret = document.getElementById("jwt-secret").value || "secret";

  const stringOut = document.getElementById("jwt-string-output");
  const headerDec = document.getElementById("jwt-header-decoded");
  const payloadDec = document.getElementById("jwt-payload-decoded");
  const sigDec = document.getElementById("jwt-signature-decoded");

  if (!stringOut || !headerDec || !payloadDec || !sigDec) return;

  const headerObj = { alg: "HS256", typ: "JWT" };
  const payloadObj = {
    email: email,
    role: role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600
  };

  headerDec.textContent = JSON.stringify(headerObj, null, 2);
  payloadDec.textContent = JSON.stringify(payloadObj, null, 2);

  function base64url(source) {
    let encoded = btoa(JSON.stringify(source));
    return encoded.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  }

  const part1 = base64url(headerObj);
  const part2 = base64url(payloadObj);

  let rawSig = part1 + "." + part2 + "." + secret;
  let signatureHash = btoa(rawSig).substring(0, 43).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  sigDec.textContent = `HMACSHA256(\n  "${part1}.${part2}",\n  "${secret}"\n) -> "${signatureHash}"`;

  stringOut.innerHTML = `
    <span style="color:var(--red); font-weight:800;">${part1}</span>.<span style="color:var(--blue); font-weight:800;">${part2}</span>.<span style="color:var(--green); font-weight:800;">${signatureHash}</span>
  `;
}

// Initialize JWT sandbox
setTimeout(updateFictionalJwt, 500);

// 10. MVC INTERACTIVE FLOW
let mvcFlowTimer = null;
async function startMvcRequestFlow() {
  if (mvcFlowTimer) return;

  const client = document.getElementById("mvc-client");
  const controller = document.getElementById("mvc-controller");
  const model = document.getElementById("mvc-model");
  const arrow1 = document.getElementById("mvc-arrow-1");
  const arrow2 = document.getElementById("mvc-arrow-2");
  const consoleEl = document.getElementById("mvc-sim-console");

  if (!client || !controller || !model || !arrow1 || !arrow2 || !consoleEl) return;

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  client.className = "mvc-node";
  controller.className = "mvc-node";
  model.className = "mvc-node";
  arrow1.className = "mvc-arrow";
  arrow2.className = "mvc-arrow-vertical";

  consoleEl.innerHTML = "① Cliente envia requisição: <span style='color:var(--blue)'>GET /users</span>";
  client.classList.add("active-route");
  await delay(1200);

  consoleEl.innerHTML = "② Controller recebe a rota. Valida o token e decide consultar a lista de usuários.";
  arrow1.classList.add("active-flow");
  client.classList.remove("active-route");
  controller.classList.add("active-route");
  await delay(1500);

  consoleEl.innerHTML = "③ Model inicia consulta ao banco de dados PostgreSQL (porta 5432)...";
  arrow2.classList.add("active-flow", "active-down");
  model.classList.add("active-route");
  await delay(1500);

  consoleEl.innerHTML = "④ Model recupera os registros e retorna a coleção de objetos para o Controller.";
  arrow2.classList.remove("active-down");
  arrow2.classList.add("active-up");
  await delay(1500);

  consoleEl.innerHTML = "⑤ Controller formata os dados em JSON e envia de volta ao cliente. Concluído com sucesso!";
  arrow2.classList.remove("active-flow", "active-up");
  model.classList.remove("active-route");
  controller.classList.remove("active-route");
  client.classList.add("active-route");
  await delay(1800);

  client.classList.remove("active-route");
  arrow1.classList.remove("active-flow");
  consoleEl.innerHTML = "// Fluxo concluído. Pronto para uma nova simulação.";
}