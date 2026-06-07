import { showToast } from '../toast';

const STATS_CONTENT = `
  <p style="font-family:var(--font-mono);font-size:9px;color:#ef4444;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px;">// not.the.easter.egg</p>
  <p style="font-family:var(--font-display);font-size:14px;font-weight:700;color:#fff;margin:0 0 6px;">Bien essayé 👏</p>
  <p style="font-family:var(--font-mono);font-size:11px;color:rgba(255,255,255,0.45);margin:0;line-height:1.6;">Avoir cliqué 3 fois sur l'image, c'est malin... mais ce n'est pas l'easter egg du site. Cherchez l'année !</p>
`;

export function initStatsEgg(logoEl: HTMLElement): void {
  let clickCount = 0;
  let clickTimer: ReturnType<typeof setTimeout> | null = null;

  logoEl.addEventListener('click', (e) => {
    e.preventDefault();
    clickCount++;

    if (clickTimer) clearTimeout(clickTimer);

    if (clickCount >= 3) {
      clickCount = 0;
      showToast({ content: STATS_CONTENT, duration: 6000 });
    } else {
      clickTimer = setTimeout(() => { clickCount = 0; }, 600);
      if (clickCount === 1) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  });
}
