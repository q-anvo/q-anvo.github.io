export interface ToastConfig {
  content: string;
  duration?: number;
  onDismiss?: () => void;
}

let activeToast: HTMLElement | null = null;
let dismissTimer: ReturnType<typeof setTimeout> | null = null;

export function showToast(config: ToastConfig): HTMLElement {
  const { content, duration = 6000 } = config;

  if (activeToast) {
    activeToast.remove();
    if (dismissTimer) clearTimeout(dismissTimer);
  }

  const root = document.getElementById('toast-root')!;
  const toast = document.createElement('div');
  toast.id = 'active-toast';
  toast.innerHTML = content;
  Object.assign(toast.style, {
    position:     'fixed',
    bottom:       '24px',
    right:        '24px',
    zIndex:       '9999',
    background:   'var(--color-surface)',
    border:       '1px solid rgba(255,255,255,0.12)',
    borderRadius: '12px',
    padding:      '16px 20px',
    maxWidth:     '320px',
    boxShadow:    '0 16px 48px rgba(0,0,0,0.6)',
    animation:    'toastIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both',
  });

  root.appendChild(toast);
  activeToast = toast;

  if (duration > 0) {
    dismissTimer = setTimeout(() => dismissToast(toast, config.onDismiss), duration);
  }

  return toast;
}

export function dismissToast(toast: HTMLElement, cb?: () => void): void {
  toast.style.animation = 'toastOut 0.2s ease forwards';
  setTimeout(() => {
    toast.remove();
    activeToast = null;
    cb?.();
  }, 200);
}
