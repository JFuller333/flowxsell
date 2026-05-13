const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const FETCH_TIMEOUT_MS = 12_000;
const PSI_TIMEOUT_MS = 35_000;

const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

const TECH_SIGNATURES = [
  { name: 'Shopify',         re: /cdn\.shopify\.com|myshopify\.com|Shopify\.theme/i },
  { name: 'WooCommerce',     re: /woocommerce|wp-content\/plugins\/woocommerce/i },
  { name: 'BigCommerce',     re: /bigcommerce\.com|stencil-utils/i },
  { name: 'Magento',         re: /Magento|mage\/cookies|Mage\.Cookies/i },
  { name: 'WordPress',       re: /wp-content|wp-includes/i },
  { name: 'Webflow',         re: /webflow\.com|data-wf-page/i },
  { name: 'Klaviyo',         re: /klaviyo\.com|_learnq|klaviyo_subscribe/i },
  { name: 'GA4',             re: /googletagmanager\.com\/gtag\/js\?id=G-|gtag\(['"]config['"],\s*['"]G-/i },
  { name: 'GTM',             re: /googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]+/i },
  { name: 'Meta Pixel',      re: /connect\.facebook\.net\/.+\/fbevents\.js|fbq\(['"]init['"]/i },
  { name: 'TikTok Pixel',    re: /analytics\.tiktok\.com|ttq\.load|ttq\.track/i },
  { name: 'Pinterest Tag',   re: /ct\.pinterest\.com|pintrk\(/i },
  { name: 'Hotjar',          re: /static\.hotjar\.com|hjid:/i },
  { name: 'Judge.me',        re: /judge\.me|judgeme/i },
  { name: 'Yotpo',           re: /yotpo\.com|staticw2\.yotpo/i },
  { name: 'Loox',            re: /loox\.io/i },
  { name: 'Okendo',          re: /okendo\.io/i },
  { name: 'Stamped',         re: /stamped\.io/i },
  { name: 'Reviews.io',      re: /widget\.reviews\.co\.uk|reviews\.io/i },
  { name: 'Mailchimp',       re: /chimpstatic\.com|mailchimp\.com\/embed/i },
  { name: 'Stripe',          re: /js\.stripe\.com/i },
  { name: 'Shop Pay',        re: /shop-pay|shopify-payment-button|shoppay/i },
  { name: 'Apple Pay',       re: /apple-pay|applePayButton|apple_pay/i },
  { name: 'Google Pay',      re: /google-pay|googlepay-button|googlePay/i },
  { name: 'PayPal',          re: /paypal\.com\/sdk|paypalobjects\.com/i },
  { name: 'Klarna',          re: /klarna\.com|klarna-placement/i },
  { name: 'Afterpay',        re: /afterpay\.com|afterpay-clearpay/i },
  { name: 'Cloudflare',      re: /cloudflare\.com|cf-ray/i },
];

async function fetchPage(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: controller.signal,
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    return { html, finalUrl: res.url, headers: Object.fromEntries(res.headers.entries()) };
  } finally {
    clearTimeout(timer);
  }
}

function detectTechStack(html, headers) {
  const blob = `${html}\n${JSON.stringify(headers)}`;
  return TECH_SIGNATURES.filter(t => t.re.test(blob)).map(t => t.name);
}

/** Turn PSI HTTP failures into short, actionable messages (429 quota is common). */
function psiHttpError(status, rawBody) {
  if (status === 429) {
    const hasKey = Boolean(process.env.PAGESPEED_API_KEY);
    return new Error(
      hasKey
        ? 'Google PageSpeed daily quota exceeded for this API key. Wait until the quota resets (often midnight Pacific), or increase quota in Google Cloud Console → APIs & Services → PageSpeed Insights API.'
        : 'Google PageSpeed daily quota exceeded (unkeyed requests are very limited). Set PAGESPEED_API_KEY in .env: Google Cloud Console → enable PageSpeed Insights API → create an API key. Each snapshot uses 2 runs (mobile + desktop).'
    );
  }
  let snippet = rawBody.slice(0, 160);
  try {
    const j = JSON.parse(rawBody);
    if (j?.error?.message) snippet = String(j.error.message).slice(0, 200);
  } catch {
    /* keep snippet */
  }
  return new Error(`PSI ${status}: ${snippet}`);
}

async function runPageSpeed(url, strategy) {
  const params = new URLSearchParams({ url, strategy, category: 'performance' });
  if (process.env.PAGESPEED_API_KEY) params.set('key', process.env.PAGESPEED_API_KEY);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PSI_TIMEOUT_MS);
  try {
    const res = await fetch(`${PSI_ENDPOINT}?${params.toString()}`, { signal: controller.signal });
    const rawBody = await res.text();
    if (!res.ok) {
      throw psiHttpError(res.status, rawBody);
    }
    if (!rawBody.trim()) {
      throw new Error('PSI returned an empty body, check PAGESPEED_API_KEY and quota.');
    }
    let data;
    try {
      data = JSON.parse(rawBody);
    } catch {
      throw new Error('PSI returned invalid JSON.');
    }
    const lh = data.lighthouseResult;
    if (!lh) throw new Error('PSI returned no lighthouse result');
    const scoreRaw = lh.categories?.performance?.score;
    const audits = lh.audits ?? {};
    return {
      score: scoreRaw != null ? Math.round(scoreRaw * 100) : null,
      lcpMs: audits['largest-contentful-paint']?.numericValue ?? null,
      clsValue: audits['cumulative-layout-shift']?.numericValue ?? null,
      fcpMs: audits['first-contentful-paint']?.numericValue ?? null,
      ttiMs: audits['interactive']?.numericValue ?? null,
      tbtMs: audits['total-blocking-time']?.numericValue ?? null,
    };
  } finally {
    clearTimeout(timer);
  }
}

function findCheckoutCandidate(html, baseUrl) {
  const origin = new URL(baseUrl).origin;
  const candidates = [];
  const re = /href=["']([^"']*\/(?:cart|checkout|basket)[^"'?#\s]*)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    const full = href.startsWith('http') ? href : `${origin}${href.startsWith('/') ? '' : '/'}${href}`;
    if (!candidates.includes(full)) candidates.push(full);
  }
  if (candidates.length === 0) candidates.push(`${origin}/cart`);
  return candidates[0];
}

function analyzeForms(html) {
  const inputs = html.match(/<input[^>]+/gi) ?? [];
  const visibleInputs = inputs.filter(i => !/type=["']hidden["']/i.test(i));
  const selects = html.match(/<select[^>]+/gi) ?? [];
  const textareas = html.match(/<textarea[^>]+/gi) ?? [];
  return {
    fieldCount: visibleInputs.length + selects.length + textareas.length,
    hiddenFieldCount: inputs.length - visibleInputs.length,
  };
}

function detectExpressPay(html) {
  return {
    shopPay:   /shop-pay|shopify-payment-button|shoppay-button/i.test(html),
    applePay:  /apple-pay-button|apple_pay|ApplePaySession/i.test(html),
    googlePay: /google-pay-button|googlepay/i.test(html),
    paypal:    /paypal-button|paypal\.com\/sdk/i.test(html),
    klarna:    /klarna-placement|klarna\.com/i.test(html),
    afterpay:  /afterpay-clearpay|afterpay\.com/i.test(html),
  };
}

function detectStickyCta(html) {
  return /sticky.{0,40}(?:add.?to.?cart|buy|atc|cta)/i.test(html) ||
         /fixed.{0,40}(?:cart|atc|buy.?now)/i.test(html);
}

function buildLeaks({ perf, forms, expressPay, hasStickyCta, vertical }) {
  const leaks = [];

  const mobileLcp = perf.mobile?.lcpMs != null ? perf.mobile.lcpMs / 1000 : null;
  if (mobileLcp != null && mobileLcp > 4) {
    leaks.push({
      stage: 'Landing → Product',
      severity: mobileLcp > 6 ? 'critical' : 'high',
      dropEstimate: mobileLcp > 6 ? 65 : 50,
      reason: `Mobile LCP is ${mobileLcp.toFixed(1)}s. Top-quartile ${vertical} sites load under 2.5s, every extra second drops conversion ~7%.`,
      signal: 'Google PageSpeed Insights',
    });
  } else if (mobileLcp != null && mobileLcp > 2.5) {
    leaks.push({
      stage: 'Landing → Product',
      severity: 'medium',
      dropEstimate: 30,
      reason: `Mobile LCP is ${mobileLcp.toFixed(1)}s, slightly above the 2.5s "good" threshold.`,
      signal: 'Google PageSpeed Insights',
    });
  }

  if (forms.fieldCount >= 10) {
    leaks.push({
      stage: 'Checkout → Purchase',
      severity: forms.fieldCount >= 14 ? 'critical' : 'high',
      dropEstimate: forms.fieldCount >= 14 ? 70 : 55,
      reason: `Detected ${forms.fieldCount} visible form fields on cart/checkout. ${vertical} median is 5–7. Each extra field cuts completion ~5%.`,
      signal: 'Checkout HTML scan',
    });
  }

  const noExpress = !expressPay.shopPay && !expressPay.applePay && !expressPay.googlePay && !expressPay.paypal;
  if (noExpress) {
    leaks.push({
      stage: 'Checkout → Purchase',
      severity: 'high',
      dropEstimate: 45,
      reason: 'No express pay detected (Shop Pay, Apple Pay, Google Pay, PayPal). Mobile shoppers abandon checkout 2× more often without one-tap pay.',
      signal: 'Checkout HTML scan',
    });
  }

  if (!hasStickyCta) {
    leaks.push({
      stage: 'Product → Cart',
      severity: 'medium',
      dropEstimate: 40,
      reason: 'No sticky add-to-cart detected on mobile. Above-the-fold CTA is the single biggest mobile PDP lever.',
      signal: 'Page DOM crawl',
    });
  }

  return leaks.sort((a, b) => b.dropEstimate - a.dropEstimate).slice(0, 5);
}

function inferVertical(techStack) {
  if (techStack.some(t => /Shopify|WooCommerce|BigCommerce|Magento/.test(t))) return 'DTC e-commerce';
  if (techStack.includes('Webflow')) return 'SaaS / brand site';
  return 'general web';
}

function buildModeledFunnel(perf, leaks) {
  const baseDropFromPrev = [0, 55, 70, 45, 65];
  const lcpPenalty = perf.mobile?.lcpMs != null && perf.mobile.lcpMs > 4000 ? 10 : 0;
  const adjusted = baseDropFromPrev.map((d, i) => (i === 1 ? Math.min(d + lcpPenalty, 80) : d));

  let pct = 100;
  const stages = [
    { label: 'Ad / Landing',      note: 'Modeled top of funnel' },
    { label: 'Product page',      note: 'Modeled from PDP click-through' },
    { label: 'Add to cart',       note: 'Heuristic: PageSpeed + mobile CTA' },
    { label: 'Checkout started',  note: 'Estimated from form complexity' },
    { label: 'Purchase',          note: 'Modeled from express-pay availability' },
  ];

  return stages.map((s, i) => {
    const drop = adjusted[i];
    pct = i === 0 ? 100 : Math.max(0.5, +(pct * (1 - drop / 100)).toFixed(2));
    const visitors = Math.round(pct * 100);
    return { ...s, pctOfTop: pct, dropFromPrev: drop, visitors };
  });
}

const VERTICAL_BENCHMARKS = {
  'DTC e-commerce':   { median: 2.3, topQuartile: 4.8 },
  'SaaS / brand site':{ median: 3.5, topQuartile: 7.2 },
  'general web':      { median: 1.8, topQuartile: 4.0 },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url: rawUrl } = req.body ?? {};
  if (!rawUrl) return res.status(400).json({ error: 'URL is required' });

  let siteUrl;
  try {
    siteUrl = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`).href;
  } catch {
    return res.status(400).json({ error: 'Invalid URL, please include a full site URL' });
  }

  try {
    const { html: homeHtml, finalUrl, headers } = await fetchPage(siteUrl);
    const techStack = detectTechStack(homeHtml, headers);
    const vertical = inferVertical(techStack);

    const checkoutUrl = findCheckoutCandidate(homeHtml, finalUrl);
    let checkoutHtml = '';
    try {
      ({ html: checkoutHtml } = await fetchPage(checkoutUrl));
    } catch {
      /* checkout fetch failures are non-fatal */
    }

    const formsHtml = checkoutHtml || homeHtml;
    const forms = analyzeForms(formsHtml);
    const expressPay = detectExpressPay(`${homeHtml}\n${checkoutHtml}`);
    const hasStickyCta = detectStickyCta(homeHtml);

    const [mobilePerf, desktopPerf] = await Promise.allSettled([
      runPageSpeed(finalUrl, 'mobile'),
      runPageSpeed(finalUrl, 'desktop'),
    ]);

    const perf = {
      mobile:  mobilePerf.status === 'fulfilled' ? mobilePerf.value : null,
      desktop: desktopPerf.status === 'fulfilled' ? desktopPerf.value : null,
      mobileError:  mobilePerf.status === 'rejected'  ? String(mobilePerf.reason?.message || mobilePerf.reason) : null,
      desktopError: desktopPerf.status === 'rejected' ? String(desktopPerf.reason?.message || desktopPerf.reason) : null,
    };

    const leaks = buildLeaks({ perf, forms, expressPay, hasStickyCta, vertical });
    const benchmark = { vertical, ...VERTICAL_BENCHMARKS[vertical] };
    const funnel = buildModeledFunnel(perf, leaks);

    res.json({
      domain: new URL(finalUrl).hostname,
      finalUrl,
      checkoutUrl,
      scannedAt: new Date().toISOString(),
      techStack,
      performance: perf,
      forms,
      expressPay,
      hasStickyCta,
      leaks,
      benchmark,
      funnel,
      sources: {
        techStack:    'HTML + header signature scan',
        performance:  'Google PageSpeed Insights API',
        forms:        'Cart/checkout HTML scan',
        expressPay:   'Cart/checkout HTML scan',
        funnel:       'Modeled from real signals + vertical benchmarks',
        benchmark:    'Industry benchmark (Littledata, public sources)',
      },
    });
  } catch (err) {
    res.status(500).json({ error: `Could not scan that site: ${err.message}` });
  }
}
