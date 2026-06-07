export const PACE = {
  typeChat:   18,
  typeCode:   14,
  typeTerm:   20,
  msgGap:     750,
  typingShow: 900,
  paneSwap:   500,
  screenSwap: 650,
  endHold:    4200,
};

export const CHAT_P1_PRE = [
  { from: 'them', text: "Bonjour, j'aimerais un site pour mon atelier de bijoux." },
  { from: 'me',   text: 'Bonjour Marie ! Plutôt élégant or & noir ou minimal blanc ?' },
  { from: 'them', text: 'Or & noir, vraiment chic.' },
];

export const CHAT_P1_POST = [
  { from: 'me', text: 'Parfait, je vous prépare une première maquette.' },
];

export const CHAT_P1 = [...CHAT_P1_PRE, ...CHAT_P1_POST];

export const CHAT_P2 = [
  { from: 'system', text: 'Maquette envoyée' },
  { from: 'them',   text: "Wow, c'est exactement ça !" },
  { from: 'them',   text: 'On peut développer 🚀' },
];

export const CODE_LINES = [
  { html: '<span class="syn-comment">// Site Marie Bijoux</span>' },
  { html: '' },
  { html: '<span class="syn-tag">&lt;header&gt;</span>' },
  { html: '  <span class="syn-tag">&lt;h1&gt;</span><span class="syn-text">Marie D.</span><span class="syn-tag">&lt;/h1&gt;</span>' },
  { html: '<span class="syn-tag">&lt;/header&gt;</span>' },
  { html: '' },
  { html: '<span class="syn-tag">&lt;section </span><span class="syn-attr">class</span>=<span class="syn-str">"hero"</span><span class="syn-tag">&gt;</span>' },
  { html: '  <span class="syn-tag">&lt;h2&gt;</span><span class="syn-text">L\'art du bijou fait main</span><span class="syn-tag">&lt;/h2&gt;</span>' },
  { html: '  <span class="syn-tag">&lt;button&gt;</span><span class="syn-text">Voir les créations</span><span class="syn-tag">&lt;/button&gt;</span>' },
  { html: '<span class="syn-tag">&lt;/section&gt;</span>' },
  { html: '' },
  { html: '<span class="syn-tag">&lt;Grid </span><span class="syn-attr">items</span>=<span class="syn-str">"créations"</span> <span class="syn-tag">/&gt;</span>' },
];

export const TERM_LINES = [
  { html: '<span class="term-prompt">$</span> npm run deploy', delay: 350 },
  { html: '<span class="term-dim">  building…</span>', delay: 700 },
  { html: '<span class="term-ok">  ✓</span> build complete (3.2s)', delay: 500 },
  { html: '<span class="term-ok">  ✓</span> deployed → marie-bijoux.fr', delay: 400 },
  { html: '<span class="term-ok">  ✓</span> SSL active', delay: 300 },
];
