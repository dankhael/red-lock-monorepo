// Analytics via Umami (self-hosted em stats.dankredbox.com).
// Sem cookies e sem dados pessoais. O script rastreia sozinho as trocas de
// rota do React (observa history.pushState), então não há page view manual.
const UMAMI_URL = process.env.REACT_APP_UMAMI_URL;
const UMAMI_WEBSITE_ID = process.env.REACT_APP_UMAMI_WEBSITE_ID;

let initialized = false;

export function initAnalytics() {
  if (!UMAMI_URL || !UMAMI_WEBSITE_ID || initialized) return;

  const script = document.createElement('script');
  script.defer = true;
  script.src = `${UMAMI_URL}/rb.js`;
  script.dataset.websiteId = UMAMI_WEBSITE_ID;
  // Só conta visitas no domínio real (não conta localhost / previews)
  script.dataset.domains = 'dankredbox.com,www.dankredbox.com';
  script.dataset.doNotTrack = 'true';
  document.head.appendChild(script);

  initialized = true;
}
