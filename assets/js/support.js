(() => {
  'use strict';
  const form = document.querySelector('[data-help-search]');
  const content = document.querySelector('[data-help-content]');
  if (!form || !content) return;
  const input = form.querySelector('input[type="search"]');
  const status = document.getElementById('help-search-status');
  const empty = content.querySelector('[data-help-empty]');
  const sections = Array.from(content.querySelectorAll('[data-help-section]'));
  const resets = Array.from(document.querySelectorAll('[data-help-reset]'));
  if (!input || !status || !empty || sections.length === 0) return;
  const normalize = text => text.normalize('NFKC').toLocaleLowerCase('ja').replace(/\s+/g, ' ').trim();
  const sectionText = new Map(sections.map(section => [section, normalize(section.textContent)]));
  let savedOpenStates = null;
  const apply = () => {
    const query = normalize(input.value);
    const words = query.split(' ').filter(Boolean);
    if (query && !savedOpenStates) {
      savedOpenStates = new Map(Array.from(content.querySelectorAll('details')).map(item => [item, item.open]));
    }
    let matches = 0;
    sections.forEach(section => {
      const visible = !query || words.every(word => sectionText.get(section).includes(word));
      section.hidden = !visible;
      if (visible) matches += 1;
      if (query && visible) {
        section.querySelectorAll('details').forEach(item => {
          item.open = words.every(word => normalize(item.textContent).includes(word));
        });
      }
    });
    if (!query && savedOpenStates) {
      savedOpenStates.forEach((wasOpen, item) => { item.open = wasOpen; });
      savedOpenStates = null;
    }
    empty.hidden = matches !== 0;
    resets.forEach(button => { if (form.contains(button)) button.hidden = !query; });
    status.textContent = !query ? 'キーワードで、このページの説明を探せます。' : matches ? `${matches}つのカテゴリに見つかりました。該当する説明を表示しています。` : '一致する項目がありません。別のキーワードでお試しください。';
  };
  const clear = (focus = false) => { input.value = ''; apply(); if (focus) input.focus(); };
  form.addEventListener('submit', event => { event.preventDefault(); apply(); });
  input.addEventListener('input', event => { if (!event.isComposing) apply(); });
  input.addEventListener('compositionend', apply);
  input.addEventListener('search', apply);
  input.addEventListener('keydown', event => {
    if (event.key === 'Escape' && input.value) { event.preventDefault(); clear(true); }
  });
  resets.forEach(button => button.addEventListener('click', () => clear(true)));
  document.querySelectorAll('.help-toc a[href^="#"], [data-help-contact]').forEach(link => {
    link.addEventListener('click', () => { if (input.value) clear(); });
  });
  window.addEventListener('hashchange', () => {
    const target = document.getElementById(location.hash.slice(1));
    if (target && target.hidden && input.value) { clear(); target.scrollIntoView(); }
  });
  form.hidden = false;
})();
