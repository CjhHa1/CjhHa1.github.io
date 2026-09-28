(() => {
  'use strict';
  const key = 'jianghai-theme';
  const system = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)') : { matches: false };
  let preference = null;
  try { preference = localStorage.getItem(key); } catch (_) { /* Storage may be disabled. */ }
  if (preference !== 'light' && preference !== 'dark') preference = null;
  const root = document.documentElement;
  const apply = (theme) => {
    root.dataset.theme = theme;
    const button = document.querySelector('[data-theme-toggle]');
    if (button) {
      const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      button.setAttribute('aria-label', label);
      button.title = label;
    }
  };
  const followSystem = () => apply(preference || (system.matches ? 'dark' : 'light'));
  followSystem();
  if (typeof system.addEventListener === 'function') {
    system.addEventListener('change', followSystem);
  } else if (typeof system.addListener === 'function') {
    system.addListener(followSystem);
  }
  window.addEventListener('storage', (event) => {
    if (event.key !== key && event.key !== null) return;
    preference = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : null;
    followSystem();
  });
  const initializeToggle = () => {
    const button = document.querySelector('[data-theme-toggle]');
    if (!button) return;
    followSystem();
    button.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, preference); } catch (_) { /* Keep the in-memory choice. */ }
      apply(preference);
    });
    button.hidden = false;
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeToggle, { once: true });
  } else {
    initializeToggle();
  }
})();
