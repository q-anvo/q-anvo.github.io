import { PACE, CHAT_P1_PRE, CHAT_P1_POST, CHAT_P2, CODE_LINES, TERM_LINES } from '../data/hero-scenarios.js';

const $  = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);
const sleep = ms => new Promise(r => setTimeout(r, ms));

let aborted = false;

const BLOCK_LABELS = ['Brief', 'Spec', 'Dev', 'Launch'];

function setToast(idx) {
  const t = document.getElementById('phase-toast');
  if (!t) return;
  if (idx < 0 || idx > 3) { t.style.opacity = '0'; return; }
  t.style.opacity = '1';
  t.querySelector('.phase-toast-num').textContent  = String(idx + 1).padStart(2, '0');
  t.querySelector('.phase-toast-name').textContent = BLOCK_LABELS[idx];
  t.classList.remove('is-pulse');
  void t.offsetWidth;
  t.classList.add('is-pulse');
}

function revealBlock(idx) {
  $$('.process-block').forEach((el, i) => {
    el.classList.toggle('is-active', i === idx);
    if (i <= idx) el.classList.add('is-revealed');
  });
  setToast(idx);
}

function resetBlocks() {
  $$('.process-block').forEach(el => el.classList.remove('is-revealed', 'is-active'));
  setToast(-1);
}

// ─── State helpers ────────────────────────────────────────────────────────────

function clearAll() {
  $('#chat-body').innerHTML = '';
  $('#editor-code').innerHTML = '';
  $('#editor-gutter').textContent = '';
  $('#editor-term-body').innerHTML = '';
  $('#editor-term').classList.remove('is-open');
  setPane('chat');
  setScreen('off');
  setPhase(0);
  setUrl('about:blank', false);
  hideReplay();
  hideCelebrate();
  resetBlocks();
}

function setPane(name) {
  $$('.pane').forEach(p => p.classList.toggle('is-active', p.dataset.pane === name));
}

function setScreen(state) {
  $$('.site-layer').forEach(l => l.classList.toggle('is-active', l.dataset.state === state));
}

function setPhase(n) {
  $$('.phase-bar span').forEach((el, i) => el.classList.toggle('is-on', i <= n));
}

function setUrl(text, live) {
  const urlBar = $('#browser-url');
  $('#url-text').textContent = text;
  urlBar.classList.toggle('is-live', !!live);
  if (live) {
    urlBar.classList.remove('flash-live');
    void urlBar.offsetWidth;
    urlBar.classList.add('flash-live');
    setTimeout(() => urlBar.classList.remove('flash-live'), 2000);
  }
}

function showReplay() { $('#replay').classList.add('is-visible'); }
function hideReplay() { $('#replay').classList.remove('is-visible'); }

// ─── Celebration ──────────────────────────────────────────────────────────────

const CONFETTI_COLORS = ['#4ade80','#22c55e','#66d9e8','#fbbf24','#b8902a','#a78bfa','#f472b6','#f5f3ef'];

function spawnConfetti(count = 70) {
  const layer = $('#confetti-layer');
  layer.innerHTML = '';
  const W = layer.clientWidth || 600;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti';
    const isStrip = Math.random() > 0.4;
    const w = isStrip ? 4 + Math.random() * 4 : 8 + Math.random() * 6;
    const h = isStrip ? 10 + Math.random() * 6 : w;
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    el.style.cssText = `left:${Math.random()*W}px;width:${w}px;height:${h}px;background:${color};border-radius:${isStrip?'2px':'50%'};--dx:${(Math.random()-.5)*280}px;--dy:${380+Math.random()*220}px;--rot:${(Math.random()>.5?1:-1)*(480+Math.random()*720)}deg;--dur:${2.2+Math.random()*1.6}s;--delay:${Math.random()*.6}s;`;
    layer.appendChild(el);
  }
  setTimeout(() => { layer.innerHTML = ''; }, 4500);
}

async function celebrate() {
  const el = $('#celebrate');
  spawnConfetti(70);
  el.classList.add('is-visible');
  await sleep(3000);
  el.classList.remove('is-visible');
  await sleep(400);
}

function hideCelebrate() {
  $('#celebrate').classList.remove('is-visible');
  $('#confetti-layer').innerHTML = '';
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

function scrollDown(el) { el.scrollTop = el.scrollHeight; }

async function chatMsg(from, text) {
  if (aborted) return;
  const body = $('#chat-body');
  const indicator = document.createElement('div');
  indicator.className = `msg ${from === 'me' ? 'me' : ''}`;
  indicator.innerHTML = from === 'me'
    ? `<div class="bubble me"><span class="typing"><span></span><span></span><span></span></span></div>`
    : `<div class="msg-avatar">M</div><div class="bubble them"><span class="typing"><span></span><span></span><span></span></span></div>`;
  body.appendChild(indicator);
  scrollDown(body);
  await sleep(PACE.typingShow);
  if (aborted) return;
  body.removeChild(indicator);

  const row = document.createElement('div');
  row.className = `msg ${from === 'me' ? 'me' : ''}`;
  if (from === 'them') {
    const av = document.createElement('div');
    av.className = 'msg-avatar';
    av.textContent = 'M';
    row.appendChild(av);
  }
  const bubble = document.createElement('div');
  bubble.className = `bubble ${from === 'me' ? 'me' : 'them'}`;
  row.appendChild(bubble);
  body.appendChild(row);

  for (let i = 1; i <= text.length; i++) {
    if (aborted) return;
    bubble.textContent = text.slice(0, i);
    scrollDown(body);
    await sleep(PACE.typeChat);
  }
}

async function chatSystem(text) {
  if (aborted) return;
  const body = $('#chat-body');
  const el = document.createElement('div');
  el.className = 'msg';
  el.style.justifyContent = 'center';
  el.innerHTML = `<div class="bubble system">📤 ${text}</div>`;
  body.appendChild(el);
  scrollDown(body);
}

async function runChat(messages) {
  for (const m of messages) {
    if (aborted) return;
    if (m.from === 'system') await chatSystem(m.text);
    else                     await chatMsg(m.from, m.text);
    await sleep(PACE.msgGap);
  }
}

// ─── Editor ───────────────────────────────────────────────────────────────────

function collectTextNodes(el) {
  const out = [];
  const walk = node => {
    for (const child of node.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) out.push(child);
      else walk(child);
    }
  };
  walk(el);
  return out;
}

async function typeCode(lines) {
  const code   = $('#editor-code');
  const gutter = $('#editor-gutter');
  code.innerHTML = '';
  gutter.textContent = '';

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    if (aborted) return;
    const line = lines[lineIdx];
    const lineEl = document.createElement('div');
    code.appendChild(lineEl);
    gutter.textContent = Array.from({ length: lineIdx + 1 }, (_, i) => i + 1).join('\n');

    if (!line.html) {
      lineEl.innerHTML = '&nbsp;';
    } else {
      lineEl.innerHTML = line.html;
      const nodes = collectTextNodes(lineEl);
      nodes.forEach(n => { n._full = n.nodeValue; n.nodeValue = ''; });
      const totalText = nodes.reduce((acc, n) => acc + n._full, '');
      let revealed = 0;
      while (revealed < totalText.length) {
        if (aborted) return;
        revealed++;
        let remaining = revealed;
        for (const node of nodes) {
          if (remaining <= node._full.length) {
            node.nodeValue = node._full.slice(0, remaining);
            const idx = nodes.indexOf(node);
            for (let j = idx + 1; j < nodes.length; j++) nodes[j].nodeValue = '';
            break;
          } else {
            node.nodeValue = node._full;
            remaining -= node._full.length;
          }
        }
        await sleep(PACE.typeCode);
      }
    }
    code.scrollTop = code.scrollHeight;
    await sleep(80);
  }
}

// ─── Terminal ─────────────────────────────────────────────────────────────────

async function openTerminal() {
  $('#editor-term').classList.add('is-open');
  await sleep(450);
}

async function termLine(html, post = 200) {
  if (aborted) return;
  const body = $('#editor-term-body');
  const el = document.createElement('div');
  body.appendChild(el);
  el.innerHTML = html;
  const nodes = collectTextNodes(el);
  nodes.forEach(n => { n._full = n.nodeValue; n.nodeValue = ''; });
  const totalText = nodes.reduce((acc, n) => acc + n._full, '');
  let revealed = 0;
  while (revealed < totalText.length) {
    if (aborted) return;
    revealed++;
    let remaining = revealed;
    for (const node of nodes) {
      if (remaining <= node._full.length) {
        node.nodeValue = node._full.slice(0, remaining);
        const idx = nodes.indexOf(node);
        for (let j = idx + 1; j < nodes.length; j++) nodes[j].nodeValue = '';
        break;
      } else {
        node.nodeValue = node._full;
        remaining -= node._full.length;
      }
    }
    body.scrollTop = body.scrollHeight;
    await sleep(PACE.typeTerm);
  }
  await sleep(post);
}

// ─── Main runner ──────────────────────────────────────────────────────────────

async function play() {
  aborted = false;
  clearAll();
  await sleep(700);

  setPhase(0);
  await runChat(CHAT_P1_PRE);
  if (aborted) return;

  await chatSystem('Brief envoyé');
  revealBlock(0);
  await sleep(PACE.msgGap);

  await runChat(CHAT_P1_POST);
  await sleep(400);

  setPhase(1);
  setUrl('localhost:3000', false);
  setScreen('wire');
  await sleep(1600);
  setScreen('mock');
  revealBlock(1);
  await sleep(400);

  await runChat(CHAT_P2);
  await sleep(700);
  if (aborted) return;

  setPhase(2);
  setPane('editor');
  await sleep(PACE.paneSwap);
  revealBlock(2);
  await typeCode(CODE_LINES);
  await sleep(900);
  if (aborted) return;

  setPhase(3);
  await openTerminal();
  revealBlock(3);
  for (const t of TERM_LINES) {
    if (aborted) return;
    await termLine(t.html, t.delay ?? 250);
  }
  await sleep(600);

  setUrl('https://marie-bijoux.fr', true);
  await sleep(450);
  if (aborted) return;

  await celebrate();
  await sleep(800);

  if (!aborted) {
    showReplay();
    await sleep(3000);
  }
  if (!aborted) play();
}

function restart() {
  aborted = true;
  setTimeout(() => play(), 80);
}

$('#replay-btn').addEventListener('click', restart);

const processSection = document.getElementById('process');
if (processSection) {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { obs.disconnect(); play(); }
  }, { rootMargin: '200px' });
  obs.observe(processSection);
}
