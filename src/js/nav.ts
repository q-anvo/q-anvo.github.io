export function initNav(): void {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const html = document.documentElement;

  function setLang(lang: 'fr' | 'en'): void {
    html.dataset.lang = lang;
    html.lang = lang;
    localStorage.setItem('lang', lang);
    nav.querySelectorAll<HTMLButtonElement>('[data-lang-btn]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.langBtn === lang);
    });
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  nav.querySelectorAll<HTMLButtonElement>('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.langBtn as 'fr' | 'en'));
  });

  const raw = localStorage.getItem('lang');
  const saved: 'fr' | 'en' = raw === 'en' ? 'en' : 'fr';
  setLang(saved);
}
