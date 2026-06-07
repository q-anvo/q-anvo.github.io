const STAGGER  = 70;
const DURATION = 400;

let savedScroll = 0;

function lockScroll() {
  savedScroll = window.scrollY;
  document.body.style.cssText = `position:fixed;top:-${savedScroll}px;width:100%;`;
}

function unlockScroll() {
  document.body.style.cssText = '';
  window.scrollTo(0, savedScroll);
}

function animateSections(els: HTMLElement[], exit: boolean): Promise<void> {
  if (!els.length) return Promise.resolve();

  els.forEach((el, i) => {
    el.getAnimations().forEach((a) => a.cancel());

    el.animate(
      exit
        ? [{ transform: 'translateY(0)',      opacity: '1' },
           { transform: 'translateY(110vh)',   opacity: '0' }]
        : [{ transform: 'translateY(110vh)',   opacity: '0' },
           { transform: 'translateY(0)',        opacity: '1' }],
      {
        duration: DURATION,
        delay:    i * STAGGER,
        fill:     'both',
        easing:   exit ? 'cubic-bezier(0.4,0,1,1)' : 'cubic-bezier(0,0,0.2,1)',
      },
    );
  });

  return new Promise((resolve) => {
    setTimeout(resolve, (els.length - 1) * STAGGER + DURATION + 30);
  });
}

function updateBtnLabel(btnEl: HTMLElement, active: boolean) {
  const frEl = btnEl.querySelector<HTMLElement>('[data-fr]');
  const enEl = btnEl.querySelector<HTMLElement>('[data-en]');
  if (frEl) frEl.textContent = active ? '← Ma carte Pro'  : '✦ Mon univers';
  if (enEl) enEl.textContent = active ? '← My Pro card'   : '✦ My universe';
}

function raf(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

export async function activateUniverse(
  proContent: HTMLElement,
  universeContent: HTMLElement,
  btnEl: HTMLElement,
): Promise<void> {
  window.scrollTo(0, 0);
  lockScroll();

  const proSections = Array.from(proContent.querySelectorAll<HTMLElement>('[data-animate-section]'));
  await animateSections(proSections, true);

  proContent.style.display = 'none';
  proSections.forEach((el) => el.getAnimations().forEach((a) => a.cancel()));

  document.documentElement.dataset.universe = 'true';
  document.dispatchEvent(new CustomEvent('universechange'));
  updateBtnLabel(btnEl, true);

  universeContent.style.display = 'block';
  await raf();

  unlockScroll();

  const universeSections = Array.from(universeContent.querySelectorAll<HTMLElement>('[data-animate-section]'));
  await animateSections(universeSections, false);
  universeSections.forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
}

export async function deactivateUniverse(
  proContent: HTMLElement,
  universeContent: HTMLElement,
  btnEl: HTMLElement,
): Promise<void> {
  window.scrollTo(0, 0);
  lockScroll();

  const universeSections = Array.from(universeContent.querySelectorAll<HTMLElement>('[data-animate-section]'));
  await animateSections(universeSections, true);

  universeContent.style.display = 'none';
  universeSections.forEach((el) => el.getAnimations().forEach((a) => a.cancel()));

  document.documentElement.dataset.universe = '';
  document.dispatchEvent(new CustomEvent('universechange'));
  updateBtnLabel(btnEl, false);

  proContent.style.display = 'block';
  await raf();

  unlockScroll();

  const proSections = Array.from(proContent.querySelectorAll<HTMLElement>('[data-animate-section]'));
  await animateSections(proSections, false);
  proSections.forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
}

export function initUniverseMode(btnEl: HTMLAnchorElement): void {
  const proContent      = document.getElementById('pro-content');
  const universeContent = document.getElementById('universe-content');
  if (!proContent || !universeContent) return;

  universeContent.style.display = 'none';
  let busy = false;

  btnEl.addEventListener('click', async (e) => {
    e.preventDefault();
    if (busy) return;
    busy = true;
    const isActive = document.documentElement.dataset.universe === 'true';
    if (isActive) {
      await deactivateUniverse(proContent, universeContent, btnEl);
    } else {
      await activateUniverse(proContent, universeContent, btnEl);
    }
    busy = false;
  });
}
