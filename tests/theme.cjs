const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const assert = require('node:assert/strict');
const code = readFileSync('assets/js/theme.js', 'utf8');
for (const readyState of ['loading', 'complete']) {
  for (const api of ['modern', 'legacy', 'none']) {
    for (const blocked of [false, true]) {
      const events = {};
      const root = { dataset: {} };
      const button = { hidden: true, setAttribute() {}, addEventListener(name, fn) { events[name] = fn; } };
      const media = { matches: true };
      if (api === 'modern') media.addEventListener = (_, fn) => { events.system = fn; };
      if (api === 'legacy') media.addListener = fn => { events.system = fn; };
      let stored;
      runInNewContext(code, {
        window: { matchMedia: () => media, addEventListener(name, fn) { events[name] = fn; } },
        document: { readyState, documentElement: root, querySelector: () => button, addEventListener(name, fn) { events[name] = fn; } },
        localStorage: { getItem() { if (blocked) throw Error(); return null; }, setItem(_, value) { if (blocked) throw Error(); stored = value; } }
      });
      if (readyState === 'loading') events.DOMContentLoaded();
      assert.equal(button.hidden, false);
      assert.equal(root.dataset.theme, 'dark');
      events.click();
      assert.equal(root.dataset.theme, 'light');
      if (!blocked) assert.equal(stored, 'light');
      if (events.system) { events.system(); assert.equal(root.dataset.theme, 'light'); }
      events.click();
      assert.equal(root.dataset.theme, 'dark');
      events.storage({ key: 'jianghai-theme', newValue: 'light' });
      assert.equal(root.dataset.theme, 'light');
    }
  }
}
console.log('12 theme initialization/compatibility/storage scenarios passed');
