(function () {
  var STORAGE_KEY = 'resumo-financeiro-theme';

  var SUN_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="4"></circle>' +
    '<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>' +
    '</svg>';

  var MOON_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>' +
    '</svg>';

  function getQueryTheme() {
    try {
      var params = new URLSearchParams(window.location.search);
      var theme = params.get('theme');
      if (theme === 'dark' || theme === 'light') {
        return theme;
      }
    } catch (e) {
      // Ignore URL parsing errors
    }
    return null;
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // Ignore storage errors in restricted contexts
    }
  }

  function updateImages(theme) {
    var imgs = document.querySelectorAll('img[data-light-src][data-dark-src]');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      var nextSrc = theme === 'dark' ? img.getAttribute('data-dark-src') : img.getAttribute('data-light-src');
      if (nextSrc && img.getAttribute('src') !== nextSrc) {
        img.setAttribute('src', nextSrc);
      }
    }
  }

  function updateToggleButton(theme) {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var isDark = theme === 'dark';
    btn.setAttribute('aria-pressed', String(isDark));
    btn.setAttribute('aria-label', isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro');
    btn.setAttribute('title', isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro');
    btn.innerHTML = (isDark ? SUN_ICON : MOON_ICON) + '<span>' + (isDark ? 'Claro' : 'Escuro') + '</span>';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateImages(theme);
    updateToggleButton(theme);
  }

  var queryTheme = getQueryTheme();
  if (queryTheme) {
    saveTheme(queryTheme);
  }
  var initialTheme = queryTheme || getStoredTheme();
  document.documentElement.setAttribute('data-theme', initialTheme);

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(initialTheme);

    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        var next = current === 'dark' ? 'light' : 'dark';
        saveTheme(next);
        applyTheme(next);
      });
    }
  });
})();

