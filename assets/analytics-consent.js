(function () {
  'use strict';

  const containerId = 'GTM-5P9HJM99';
  const measurementId = 'G-WGBN2HRTQ1';
  const storageKey = 'blog.analytics-consent.v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const pilotPaths = [
    '/blog/innovation-tree.html',
    '/blog/llm-world-model-decision-making.html'
  ];
  const isPilot = location.hostname === 'aqiaojoe08.github.io' && pilotPaths.includes(location.pathname);
  const disableKey = 'ga-disable-' + measurementId;
  const denied = {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  };
  let loaded = false;
  let returnFocus = null;

  function readChoice() {
    for (const name of ['localStorage', 'sessionStorage']) {
      try {
        const saved = JSON.parse(window[name].getItem(storageKey));
        if (saved && ['granted', 'denied'].includes(saved.value) && saved.expires > Date.now()) {
          return saved.value;
        }
      } catch (_) { /* A blocked storage API must leave analytics off. */ }
    }
    return null;
  }

  function saveChoice(value) {
    const saved = JSON.stringify({ value: value, expires: Date.now() + lifetime });
    // Prefer persistent storage, with a session-only fallback when it is blocked.
    try {
      localStorage.setItem(storageKey, saved);
      try { sessionStorage.removeItem(storageKey); } catch (_) {}
      return;
    } catch (_) {}
    try { sessionStorage.setItem(storageKey, saved); } catch (_) {}
  }

  function clearAnalyticsCookies() {
    const names = document.cookie.split(';').map(cookie => cookie.trim().split('=')[0])
      .filter(name => /^blog_ga(?:_|$)/.test(name));
    for (const name of names) {
      for (const path of ['/blog/', '/blog', '/']) {
        for (const domain of ['', '; Domain=' + location.hostname]) {
          document.cookie = name + '=; Max-Age=0; Path=' + path + domain + '; SameSite=Lax; Secure';
        }
      }
    }
  }

  function startAnalytics() {
    if (loaded || !isPilot) return;
    loaded = true;
    window[disableKey] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    // Queue all settings before requesting Google's container. No Google code is
    // fetched before consent, including no noscript iframe or preconnect.
    window.gtag('consent', 'default', denied);
    window.gtag('set', {
      cookie_prefix: 'blog',
      cookie_path: '/blog/',
      cookie_domain: 'none',
      cookie_expires: lifetime / 1000,
      cookie_update: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ads_data_redaction: true
    });
    window.gtag('consent', 'update', Object.assign({}, denied, { analytics_storage: 'granted' }));
    window.gtag('js', new Date());
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=' + containerId;
    script.dataset.blogAnalytics = '';
    document.head.appendChild(script);
  }

  let choice = readChoice();
  window[disableKey] = choice !== 'granted';

  const banner = document.createElement('section');
  banner.className = 'analytics-banner';
  banner.hidden = true;
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-labelledby', 'analytics-title');
  banner.innerHTML = '<div class="analytics-copy"><strong id="analytics-title">Optional analytics</strong>' +
    '<p>May I use Google Analytics to understand which articles people read? It uses cookies and sends usage data to Google only after you accept. You can change your choice anytime. <a href="privacy.html">Privacy details</a>.</p>' +
    '<p class="analytics-current" aria-live="polite"></p></div>' +
    '<div class="analytics-actions"><button type="button" data-choice="denied">Reject analytics</button>' +
    '<button type="button" data-choice="granted">Accept analytics</button>' +
    '<button type="button" class="analytics-close" hidden>Keep current choice</button></div>';
  document.body.appendChild(banner);

  function updateStatus() {
    const text = choice === 'granted' ? 'Analytics is currently enabled for the two pilot articles.' :
      'Analytics is currently off.';
    document.querySelectorAll('[data-analytics-status]').forEach(node => { node.textContent = text; });
    banner.querySelector('.analytics-current').textContent = choice ? text : '';
    banner.querySelector('.analytics-close').hidden = !choice;
  }

  function closeBanner() {
    banner.hidden = true;
    if (returnFocus) returnFocus.focus();
  }

  function applyChoice(next) {
    const wasLoaded = loaded;
    choice = next;
    window[disableKey] = next !== 'granted';
    if (next !== 'granted') {
      // Opt out before unloading so page-exit events cannot be sent by GA4.
      clearAnalyticsCookies();
      // Do not send a consent-update ping on withdrawal. The GA opt-out flag
      // takes effect immediately; the reload below removes the running tag.
    }
    updateStatus();
    closeBanner();
    if (wasLoaded && next !== 'granted') {
      // Removing a script element cannot stop an already-running tag. Reload
      // after saving denial to discard its listeners and timers completely.
      location.reload();
    } else if (next === 'granted') {
      startAnalytics();
    }
  }

  banner.querySelectorAll('[data-choice]').forEach(button => {
    button.addEventListener('click', () => {
      saveChoice(button.dataset.choice);
      applyChoice(button.dataset.choice);
    });
  });
  banner.querySelector('.analytics-close').addEventListener('click', closeBanner);
  document.querySelectorAll('[data-analytics-settings]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      returnFocus = button;
      updateStatus();
      banner.hidden = false;
      banner.querySelector('[data-choice]').focus();
    });
  });

  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) {
      const latest = readChoice();
      // Accepting in another tab does not silently activate this tab; denial
      // and withdrawal do stop an active tab immediately.
      if (latest !== 'granted') applyChoice(latest);
    }
  });

  updateStatus();
  if (choice === 'granted') startAnalytics();
  else {
    clearAnalyticsCookies();
    if (isPilot && choice === null) banner.hidden = false;
  }
})();
