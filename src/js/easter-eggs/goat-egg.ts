import { showToast, dismissToast } from '../toast';

const QUESTION_CONTENT = `
  <p style="font-family:var(--font-mono);font-size:9px;color:var(--color-accent);letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">// goat.question</p>
  <p style="font-family:var(--font-display);font-size:14px;font-weight:700;color:#fff;margin:0 0 14px;line-height:1.4;">Michael Jordan, Kobe Bryant, LeBron James — Qui est le GOAT ?</p>
  <div style="display:flex;flex-direction:column;gap:6px;" id="goat-choices">
    <button data-goat="jordan" style="font-family:var(--font-mono);font-size:11px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.75);padding:7px 12px;border-radius:6px;cursor:pointer;text-align:left;">Michael Jordan</button>
    <button data-goat="kobe"   style="font-family:var(--font-mono);font-size:11px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.75);padding:7px 12px;border-radius:6px;cursor:pointer;text-align:left;">Kobe Bryant</button>
    <button data-goat="lebron" style="font-family:var(--font-mono);font-size:11px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.75);padding:7px 12px;border-radius:6px;cursor:pointer;text-align:left;">LeBron James</button>
  </div>
`;

const SUCCESS_CONTENT = `
  <p style="font-family:var(--font-mono);font-size:9px;color:var(--color-accent);letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">// access.granted</p>
  <p style="font-family:var(--font-display);font-size:14px;font-weight:700;color:#fff;margin:0 0 4px;">Bonne réponse. 🐐</p>
  <p style="font-family:var(--font-mono);font-size:11px;color:rgba(255,255,255,0.45);margin:0;line-height:1.6;">Clique sur <strong style="color:#fff;">✦ Mon univers</strong> dans le header — il vient d'apparaître.</p>
`;

const DENIED_CONTENT = `
  <p style="font-family:var(--font-mono);font-size:9px;color:#ef4444;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">// access.denied</p>
  <p style="font-family:var(--font-display);font-size:14px;font-weight:700;color:#fff;margin:0;">Restons-en là.</p>
`;

export function initGoatEgg(copyrightEl: HTMLElement, onSuccess: () => void): void {
  let clickCount = 0;
  let clickTimer: ReturnType<typeof setTimeout> | null = null;

  copyrightEl.addEventListener('click', () => {
    clickCount++;
    if (clickTimer) clearTimeout(clickTimer);

    if (clickCount >= 3) {
      clickCount = 0;
      const toast = showToast({ content: QUESTION_CONTENT, duration: 0 });

      toast.querySelector('#goat-choices')?.addEventListener('click', (e) => {
        const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-goat]');
        if (!btn) return;

        if (btn.dataset.goat === 'jordan' || btn.dataset.goat === 'kobe') {
          toast.innerHTML = SUCCESS_CONTENT;
          onSuccess();
          setTimeout(() => dismissToast(toast), 3000);
        } else {
          toast.innerHTML = DENIED_CONTENT;
          setTimeout(() => dismissToast(toast), 2500);
        }
      });
    } else {
      clickTimer = setTimeout(() => { clickCount = 0; }, 800);
    }
  });
}
