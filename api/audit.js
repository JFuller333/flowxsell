const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const FETCH_TIMEOUT_MS = 10_000;

const DIMENSIONS = {
  pdp:      { label: 'PDP Clarity',       weight: 0.25 },
  offer:    { label: 'Offer Strength',    weight: 0.20 },
  trust:    { label: 'Trust Elements',    weight: 0.20 },
  friction: { label: 'Decision Friction', weight: 0.20 },
  checkout: { label: 'Checkout Flow',     weight: 0.15 },
};

const ITEM_LABELS = {
  pdp:      { hero_images: 'Hero Images & Video', title_clarity: 'Product Title Clarity',
               description: 'Description Depth', variants: 'Variant Selectors',
               mobile_layout: 'Mobile CTA Layout' },
  offer:    { price_value: 'Price / Value Clarity', urgency: 'Urgency & Scarcity',
               bundles: 'Bundle / Upsell Offers', guarantee: 'Risk-Reversal Guarantee',
               free_shipping: 'Free Shipping Visibility' },
  trust:    { reviews_quantity: 'Review Volume', reviews_quality: 'Review Quality',
               trust_badges: 'Trust Badges near ATC', social_proof: 'Press & Social Proof',
               brand_credibility: 'Brand Credibility' },
  friction: { cta_clarity: 'CTA Prominence', option_overload: 'Variant Decision Load',
               page_weight: 'Page Weight Proxy', nav_distraction: 'Navigation Distraction',
               product_faqs: 'Objection Handling / FAQ' },
  checkout: { steps_to_checkout: 'Path to Checkout', guest_checkout: 'Guest Checkout Access',
               payment_options: 'Payment Method Range', cart_recovery: 'Cart Recovery Tools',
               order_summary: 'Order Summary Visibility' },
};

const LEAK_RULES = [
  { dim: 'pdp',      id: 'mobile_layout',    threshold: 2,
    leak: 'Mobile CTA buried — estimated 20–40% mobile revenue loss.' },
  { dim: 'pdp',      id: 'hero_images',      threshold: 2,
    leak: 'Thin image gallery increases return rate and suppresses add-to-cart.' },
  { dim: 'offer',    id: 'urgency',          threshold: 2,
    leak: 'No real urgency signals — customers defer purchase and rarely return.' },
  { dim: 'offer',    id: 'guarantee',        threshold: 2,
    leak: 'Missing guarantee near CTA leaves purchase anxiety unresolved.' },
  { dim: 'offer',    id: 'free_shipping',    threshold: 2,
    leak: 'Free shipping invisible on PDP — checkout sticker shock drives abandonment.' },
  { dim: 'trust',    id: 'reviews_quantity', threshold: 2,
    leak: 'Under 50 reviews — insufficient social proof for skeptical first-time buyers.' },
  { dim: 'trust',    id: 'trust_badges',     threshold: 2,
    leak: 'Missing security badges near ATC — anxiety at the point of purchase.' },
  { dim: 'friction', id: 'page_weight',      threshold: 2,
    leak: 'Heavy page signals slow load — every 1s delay costs ~7% conversion rate.' },
  { dim: 'friction', id: 'cta_clarity',      threshold: 2,
    leak: 'Non-sticky or low-contrast CTA reduces impulse purchase completion rate.' },
  { dim: 'friction', id: 'option_overload',  threshold: 2,
    leak: 'Too many pre-ATC choices — decision fatigue measurably drops conversions.' },
  { dim: 'checkout', id: 'payment_options',  threshold: 2,
    leak: 'Limited payment options — BNPL alone can lift AOV 30–50% in qualifying niches.' },
  { dim: 'checkout', id: 'cart_recovery',    threshold: 2,
    leak: '70%+ of carts are abandoned; a recovery sequence recaptures 5–15% of that.' },
];

const FIXES = {
  pdp: {
    hero_images:    "Shoot lifestyle + detail + scale + in-use images. Embed a 15–30s UGC clip. Serve WebP via Shopify's CDN.",
    title_clarity:  'Rewrite as: [Brand] [Product Name] — [Key Benefit]. E.g. "AeroFit Bands — Zero Snap, Max Tension".',
    description:    'Use PASTOR framework: Problem → Amplify → Story → Transformation → Offer → Response. Add spec accordion.',
    variants:       'Switch to swatches + size guide modal. Show "Only 3 left" per variant when stock < 5.',
    mobile_layout:  'Add sticky ATC bar (Hextom: Sticky Add To Cart). Stack price → stars → CTA above fold on mobile.',
  },
  offer: {
    price_value:    'Show crossed-out compare-at price + savings badge ("Save $18 — 30% off"). Justify price near CTA.',
    urgency:        'Install Hurrify or Countdown Timer Bar. Use real inventory data for stock counters via Klaviyo/LimeSpot.',
    bundles:        'Add "Frequently Bought Together" (FBT app or Bold Bundles). Create tiered savings (buy 2 save 10%).',
    guarantee:      'Place a "30-Day Money-Back" icon row directly under ATC. Link to policy. Say "No questions asked".',
    free_shipping:  'Add sticky announcement bar with progress: "Add $X more for free shipping →". Use Hextom Free Shipping Bar.',
  },
  trust: {
    reviews_quantity: 'Launch post-purchase review sequence via Klaviyo (Day 7 + Day 14). Reward photo reviews with a discount.',
    reviews_quality:  'Enable photo reviews in Judge.me or Okendo. Offer loyalty points for verified photo/video reviews.',
    trust_badges:     'Add 4-icon trust row under ATC: Secure Checkout | Free Returns | 5-Star Rated | Fast Shipping.',
    social_proof:     'Add "As Seen In" press strip. If no press, use a stat: "14,000+ happy customers".',
    brand_credibility:"Add a 60-word Founder's Note to PDP or About page. Use real photography. Consistent tone throughout.",
  },
  friction: {
    cta_clarity:    'Use high-contrast button color not used elsewhere. Add micro-copy under CTA: "Free shipping • Easy returns".',
    option_overload:'Pre-select most popular variant by default. Collapse rare options behind "More options" link.',
    page_weight:    'Compress all images to WebP < 200KB. Defer non-critical JS. Remove unused apps. Target Lighthouse ≥ 70.',
    nav_distraction:'On PDPs, use simplified nav (logo + cart) or hide mega-menu on scroll to cut exit rate.',
    product_faqs:   'Add collapsible FAQ: sizing, shipping time, materials, returns. Write 5–8 Q&As per product type.',
  },
  checkout: {
    steps_to_checkout: 'Enable Shop Pay + "Buy Now" dynamic checkout. Reduces purchase to 2 clicks for returning customers.',
    guest_checkout:    'Shopify Admin → Settings → Checkout → "Accounts are optional". Add social login app.',
    payment_options:   'Enable Shop Pay Installments, Klarna, or Afterpay via Shopify Payments. High ROI for AOV > $75.',
    cart_recovery:     'Build 3-step flow: email at 1h → SMS at 3h → discount email at 24h. Use Klaviyo + Postscript.',
    order_summary:     'Ensure order summary is expanded by default on mobile. Add trust icons above the "Pay Now" button.',
  },
};

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
    return { html, finalUrl: res.url };
  } finally {
    clearTimeout(timer);
  }
}

function detectShopify(html, url) {
  const checks = [
    [/cdn\.shopify\.com/i,                'Shopify CDN assets'],
    [/Shopify\s*=\s*\{|window\.Shopify/i, 'Shopify JS global'],
    [/myshopify\.com/i,                   'myshopify.com reference'],
    [/shopify-checkout-api-token/i,       'Shopify checkout token'],
    [/\/products\//i,                     '/products/ URL structure'],
    [/shopify_theme|theme_store/i,        'Shopify theme metadata'],
  ];
  const signals = checks.filter(([re]) => re.test(html)).map(([, label]) => label);
  if (/myshopify\.com/.test(url)) signals.push('myshopify.com domain');
  return {
    isShopify: signals.length >= 1,
    confidence: signals.length >= 3 ? 'High' : signals.length >= 1 ? 'Medium' : 'Low',
    signals,
  };
}

async function findProductPage(homeHtml, baseUrl) {
  const origin = new URL(baseUrl).origin;
  const links = [];
  const productRe = /href=["']([^"']*\/products\/[^"'?#\s]+)["']/gi;
  let m;
  while ((m = productRe.exec(homeHtml)) !== null) {
    const href = m[1];
    const full = href.startsWith('http') ? href : `${origin}${href.startsWith('/') ? '' : '/'}${href}`;
    if (!links.includes(full)) links.push(full);
  }
  if (links.length === 0) {
    const colRe = /href=["']([^"']*\/collections\/[^"'?#\s]+)["']/gi;
    while ((m = colRe.exec(homeHtml)) !== null) {
      const href = m[1];
      const full = href.startsWith('http') ? href : `${origin}${href}`;
      try {
        const { html } = await fetchPage(full);
        let pm;
        const pr = /href=["']([^"']*\/products\/[^"'?#\s]+)["']/gi;
        while ((pm = pr.exec(html)) !== null) {
          const f = pm[1].startsWith('http') ? pm[1] : `${origin}${pm[1]}`;
          if (!links.includes(f)) links.push(f);
        }
        if (links.length) break;
      } catch (_) {}
    }
  }
  return links[0] ?? null;
}

const count = (html, re) => (html.match(re) || []).length;
const has = (html, ...patterns) => patterns.some(p => p.test(html));

function analyzePDP(productHtml) {
  const imgCount = count(productHtml, /<img[^>]+/gi);
  const hasVideo = has(productHtml, /<video/i, /youtube\.com\/embed/i, /vimeo\.com/i, /\.mp4/i);
  const imageScore = hasVideo && imgCount >= 5 ? 4 : imgCount >= 5 ? 3 : imgCount >= 3 ? 2 : 1;
  const imageEvidence = `${imgCount} <img> tags found${hasVideo ? ' + video element detected' : ', no video detected'}`;

  const titleMatch =
    productHtml.match(/<h1[^>]*>([^<]{4,})<\/h1>/i) ||
    productHtml.match(/<title[^>]*>([^<|–—]+)/i);
  const titleText = (titleMatch?.[1] ?? '').trim().replace(/\s+/g, ' ');
  const hasBenefit   = /\b(for|with|without|anti|pro|ultra|max|best|premium|fast|instant|easy|natural|organic)\b/i.test(titleText);
  const hasSeparator = /[–—:|]/.test(titleText);
  const titleScore = titleText.length > 40 && hasBenefit && hasSeparator ? 4 : titleText.length > 25 && hasBenefit ? 3 : titleText.length > 12 ? 2 : 1;
  const titleEvidence = titleText ? `"${titleText.slice(0, 70)}${titleText.length > 70 ? '…' : ''}"` : 'No <h1> title found on page';

  const hasFAQ     = /faq|frequently asked/i.test(productHtml);
  const hasBullets = /<li[^>]*>/i.test(productHtml);
  const hasSpecs   = /specification|dimension|material|weight|composition/i.test(productHtml);
  const descBlock  = productHtml.match(/class="[^"]*(?:description|product-desc|product__desc)[^"]*"[^>]*>([\s\S]{0,3000})/i);
  const descLen    = descBlock ? descBlock[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length : 0;
  const descScore  = hasFAQ && hasSpecs && descLen > 300 ? 4 : (hasSpecs || descLen > 200) ? 3 : (hasBullets || descLen > 60) ? 2 : 1;
  const descEvidence = `~${descLen} chars in description block${hasSpecs ? ', specs found' : ''}${hasFAQ ? ', FAQ found' : ''}`;

  const hasSwatches  = has(productHtml, /swatch|color-option|colour-swatch/i);
  const hasSizeGuide = has(productHtml, /size.?guide|size.?chart|sizing/i);
  const hasStock     = has(productHtml, /only \d+ left|low stock|in stock|out of stock/i);
  const hasSelect    = /<select[^>]*>/i.test(productHtml);
  const variantScore = hasSwatches && hasSizeGuide && hasStock ? 4 : hasSwatches && hasSizeGuide ? 3 : hasSwatches ? 2 : hasSelect ? 1 : 2;
  const variantEvidence = `swatches: ${hasSwatches ? '✓' : '✗'}, size guide: ${hasSizeGuide ? '✓' : '✗'}, stock indicator: ${hasStock ? '✓' : '✗'}`;

  const hasStickyATC = has(productHtml, /sticky.{0,40}(cart|add|atc)/i, /fixed.{0,40}(cart|add|atc)/i, /(cart|add|atc).{0,40}sticky/i, /(cart|add|atc).{0,40}fixed/i);
  const hasViewport  = /name=["']viewport["']/i.test(productHtml);
  const mobileScore  = hasStickyATC ? 4 : hasViewport ? 3 : 2;
  const mobileEvidence = hasStickyATC ? 'Sticky ATC element detected in HTML/CSS' : hasViewport ? 'Responsive viewport meta found; no sticky CTA detected' : 'No viewport meta or sticky CTA signals found';

  return {
    hero_images:   { score: imageScore,   evidence: imageEvidence },
    title_clarity: { score: titleScore,   evidence: titleEvidence },
    description:   { score: descScore,    evidence: descEvidence },
    variants:      { score: variantScore, evidence: variantEvidence },
    mobile_layout: { score: mobileScore,  evidence: mobileEvidence },
  };
}

function analyzeOffer(productHtml) {
  const hasCompareAt  = has(productHtml, /compare.?at|was \$/i, /original.?price/i, /line-through/i);
  const hasSavingsPct = has(productHtml, /save \d+%|\d+% off/i);
  const hasCopy       = has(productHtml, /you save|you're saving|deal|value/i);
  const priceScore    = hasSavingsPct && hasCopy ? 4 : hasSavingsPct ? 3 : hasCompareAt ? 2 : 1;
  const priceEvidence = hasSavingsPct && hasCopy ? 'Savings % + value-justification copy detected' : hasSavingsPct ? 'Savings percentage text detected' : hasCompareAt ? 'Compare-at / was-price detected' : 'No discount or savings signals found';

  const hasTimer     = has(productHtml, /countdown|timer|time.?left|sale ends|ends in/i);
  const hasRealStock = has(productHtml, /only \d+.?left|just \d+.?left|\d+ in stock|selling.?fast/i);
  const hasGeneric   = has(productHtml, /limited.?(?:stock|time|quantity)|while.?supplies/i);
  const urgencyScore = hasRealStock && hasTimer ? 4 : hasRealStock ? 3 : hasGeneric ? 2 : 1;
  const urgencyEvidence = hasRealStock && hasTimer ? 'Real-time stock count + countdown timer both detected' : hasRealStock ? 'Specific stock count text detected (e.g., "Only 3 left")' : hasGeneric ? 'Generic "limited stock" / "limited time" text found' : 'No urgency or scarcity signals found';

  const hasFBT     = has(productHtml, /frequently.?bought|often.?bought|complete.?the.?set|bundle/i);
  const hasTiered  = has(productHtml, /buy \d+.?save|bogo|2 for|3 for|tiered/i);
  const hasRelated = has(productHtml, /related.?products?|you.?may.?also|similar.?products?/i);
  const bundleScore = hasTiered ? 4 : hasFBT ? 3 : hasRelated ? 2 : 1;
  const bundleEvidence = hasTiered ? 'Tiered bundle savings or BOGO text detected' : hasFBT ? '"Frequently Bought Together" or bundle section detected' : hasRelated ? 'Related products block found (no true bundle offer)' : 'No upsell or cross-sell signals found';

  const hasGuarantee  = has(productHtml, /money.?back|guarantee|guaranteed|satisfaction|risk.?free/i);
  const hasDayCount   = has(productHtml, /\d+.?day.?(?:money.?back|guarantee|return|trial)/i);
  const hasReturnLink = has(productHtml, /return.?policy|refund.?policy|free.?returns?/i);
  const guaranteeScore = hasGuarantee && hasDayCount ? 4 : hasGuarantee ? 3 : hasReturnLink ? 2 : 1;
  const guaranteeEvidence = hasGuarantee && hasDayCount ? 'Day-count guarantee detected (e.g., "30-Day Money-Back")' : hasGuarantee ? 'Guarantee text found (no specific day count)' : hasReturnLink ? 'Return/refund policy link found (no prominent guarantee)' : 'No guarantee or return policy visible on this page';

  const hasStickyBar = has(productHtml, /announcement.?bar|header.?bar|top.?bar/i);
  const hasThreshold = has(productHtml, /free.?shipping.{0,30}\$\d+|spend.{0,20}for free shipping/i);
  const hasShipping  = has(productHtml, /free.?(?:shipping|delivery)/i);
  const shippingScore = hasStickyBar && hasThreshold ? 4 : hasShipping ? 3 : has(productHtml, /free.?ship/i) ? 2 : 1;
  const shippingEvidence = hasStickyBar && hasThreshold ? 'Announcement bar + shipping threshold progress detected' : hasShipping ? 'Free shipping text detected in product section' : has(productHtml, /free.?ship/i) ? 'Free shipping mentioned (possibly footer-only)' : 'No free shipping text found on product page';

  return {
    price_value:   { score: priceScore,     evidence: priceEvidence },
    urgency:       { score: urgencyScore,   evidence: urgencyEvidence },
    bundles:       { score: bundleScore,    evidence: bundleEvidence },
    guarantee:     { score: guaranteeScore, evidence: guaranteeEvidence },
    free_shipping: { score: shippingScore,  evidence: shippingEvidence },
  };
}

function analyzeTrust(productHtml, homeHtml) {
  const all = productHtml + homeHtml;

  const countMatch = productHtml.match(/\(?([\d,]+)\s*(?:reviews?|ratings?)\)?/i) || productHtml.match(/based on ([\d,]+)/i);
  const totalReviews = countMatch ? parseInt(countMatch[1].replace(/,/g, ''), 10) : 0;
  const hasReviewWidget = has(productHtml, /judge\.me|okendo|yotpo|loox|stamped|reviews\.io|trustpilot/i);
  const reviewQtyScore = totalReviews >= 200 ? 4 : totalReviews >= 50 ? 3 : totalReviews >= 11 ? 2 : totalReviews > 0 ? 1 : hasReviewWidget ? 2 : 1;
  const reviewQtyEvidence = totalReviews > 0 ? `${totalReviews.toLocaleString()} reviews parsed from page` : hasReviewWidget ? 'Review widget script detected (count not parseable)' : 'No reviews or review widget detected';

  const hasPhotos      = has(productHtml, /photo.?review|review.?photo|review.?image/i);
  const hasVerified    = has(productHtml, /verified.?(?:buyer|purchase|customer)/i);
  const hasVideoReview = has(productHtml, /video.?review|review.?video/i);
  const reviewQualScore = hasPhotos && hasVerified && hasVideoReview ? 4 : hasPhotos && hasVerified ? 3 : hasPhotos ? 2 : 1;
  const reviewQualEvidence = `photos: ${hasPhotos ? '✓' : '✗'}, verified labels: ${hasVerified ? '✓' : '✗'}, video reviews: ${hasVideoReview ? '✓' : '✗'}`;

  const hasSSL      = has(productHtml, /secure.?checkout|ssl|padlock/i);
  const hasPayLogos = has(productHtml, /visa|mastercard|amex|paypal|payment.?icon|accepted.?payment/i);
  const hasThirdPty = has(productHtml, /norton|mcafee|bbb\.org|trustpilot|verified.?by/i);
  const badgeScore  = hasSSL && hasPayLogos && hasThirdPty ? 4 : hasSSL && hasPayLogos ? 3 : hasSSL ? 2 : 1;
  const badgeEvidence = `SSL/secure: ${hasSSL ? '✓' : '✗'}, payment logos: ${hasPayLogos ? '✓' : '✗'}, third-party seals: ${hasThirdPty ? '✓' : '✗'}`;

  const hasPress    = has(all, /as seen in|featured in|press|media coverage/i);
  const hasCustStat = has(all, /[\d,]+\+?\s*(?:customer|order|happy|satisfied)/i);
  const socialScore = hasPress && hasCustStat ? 4 : (hasPress || hasCustStat) ? 3 : has(all, /press|magazine/i) ? 2 : 1;
  const socialEvidence = `press mentions: ${hasPress ? '✓' : '✗'}, customer count stat: ${hasCustStat ? '✓' : '✗'}`;

  const hasAbout    = /href=["'][^"']*\/about[^"']*["']/i.test(homeHtml);
  const hasFounder  = has(all, /founder|our story|meet.{0,20}team/i);
  const hasBrandVid = has(homeHtml, /<video|brand.?video|our.?story.?video/i);
  const brandScore  = hasAbout && hasFounder && hasBrandVid ? 4 : hasAbout && hasFounder ? 3 : hasAbout ? 2 : 1;
  const brandEvidence = `About page: ${hasAbout ? '✓' : '✗'}, founder/story copy: ${hasFounder ? '✓' : '✗'}, brand video: ${hasBrandVid ? '✓' : '✗'}`;

  return {
    reviews_quantity:  { score: reviewQtyScore,  evidence: reviewQtyEvidence },
    reviews_quality:   { score: reviewQualScore, evidence: reviewQualEvidence },
    trust_badges:      { score: badgeScore,      evidence: badgeEvidence },
    social_proof:      { score: socialScore,     evidence: socialEvidence },
    brand_credibility: { score: brandScore,      evidence: brandEvidence },
  };
}

function analyzeFriction(productHtml) {
  const hasSticky  = has(productHtml, /sticky.{0,40}(add.?to.?cart|buy|atc)/i, /fixed.{0,40}(cart|atc)/i);
  const hasHighCon = has(productHtml, /btn.{0,20}primary|button.{0,20}primary|atc.{0,20}btn/i);
  const hasMicro   = has(productHtml, /free shipping|easy return|secure|safe/i);
  const ctaScore   = hasSticky ? 4 : (hasHighCon && hasMicro) ? 3 : hasHighCon ? 2 : 1;
  const ctaEvidence = hasSticky ? 'Sticky Add-to-Cart element class/style detected' : hasHighCon ? `High-contrast CTA class found${hasMicro ? ' + reassurance micro-copy' : ''}` : 'Standard CTA (no sticky or high-contrast class signals)';

  const selectCount = count(productHtml, /<select[^>]*>/gi);
  const radioNames  = new Set(
    (productHtml.match(/type=["']radio["'][^>]*name=["']([^"']+)["']/gi) || [])
      .map(s => (s.match(/name=["']([^"']+)["']/i) || [])[1])
      .filter(Boolean)
  );
  const totalChoices = selectCount + radioNames.size;
  const optionScore  = totalChoices <= 1 ? 4 : totalChoices <= 2 ? 3 : totalChoices <= 4 ? 2 : 1;
  const optionEvidence = `~${totalChoices} required choice(s) detected (${selectCount} selects, ${radioNames.size} radio groups)`;

  const scripts   = count(productHtml, /<script[^>]*src=/gi);
  const styles    = count(productHtml, /<link[^>]*stylesheet/gi);
  const images    = count(productHtml, /<img[^>]+/gi);
  const heaviness = scripts + styles + Math.floor(images / 5);
  const weightScore = heaviness < 10 ? 4 : heaviness < 20 ? 3 : heaviness < 35 ? 2 : 1;
  const weightEvidence = `~${scripts} external scripts, ~${styles} stylesheets, ${images} images (index: ${heaviness})`;

  const navBlock = productHtml.match(/<nav[^>]*>([\s\S]*?)<\/nav>/i)?.[1] || productHtml.match(/<header[^>]*>([\s\S]*?)<\/header>/i)?.[1] || '';
  const navLinks = count(navBlock, /<a[^>]+href/gi);
  const navScore = navLinks <= 4 ? 4 : navLinks <= 6 ? 3 : navLinks <= 9 ? 2 : 1;
  const navEvidence = `${navLinks} links found in <nav>/<header> block`;

  const hasFAQ       = has(productHtml, /\bfaq\b|frequently asked/i);
  const hasAccordion = has(productHtml, /<details|accordion|collapse/i);
  const hasCompare   = has(productHtml, /<table[^>]*>|comparison table|compare to/i);
  const faqScore     = hasFAQ && hasCompare ? 4 : (hasFAQ || hasAccordion) ? 3 : hasFAQ ? 2 : 1;
  const faqEvidence  = hasFAQ && hasCompare ? 'FAQ section + comparison table both detected' : hasFAQ ? 'FAQ section detected' : hasAccordion ? 'Accordion/collapsible section found (possible FAQ)' : 'No FAQ or objection-handling section detected';

  return {
    cta_clarity:     { score: ctaScore,    evidence: ctaEvidence },
    option_overload: { score: optionScore, evidence: optionEvidence },
    page_weight:     { score: weightScore, evidence: weightEvidence },
    nav_distraction: { score: navScore,    evidence: navEvidence },
    product_faqs:    { score: faqScore,    evidence: faqEvidence },
  };
}

function analyzeCheckout(productHtml, homeHtml) {
  const all = productHtml + homeHtml;

  const hasShopPay = has(all, /shop.?pay|shoppay/i);
  const hasBuyNow  = has(productHtml, /buy.?now|data-shopify="payment-button"|shopify-payment-button/i);
  const stepsScore = hasShopPay && hasBuyNow ? 4 : (hasBuyNow || hasShopPay) ? 3 : 2;
  const stepsEvidence = hasShopPay && hasBuyNow ? 'Shop Pay + Buy Now dynamic checkout detected (2-click path)' : hasBuyNow ? '"Buy Now" button detected (express checkout)' : hasShopPay ? 'Shop Pay logos/script detected' : 'Standard ATC → cart → checkout flow (no express checkout found)';

  const hasSocialLogin = has(all, /google.?sign.?in|apple.?pay|facebook.?login|social.?login/i);
  const hasGuestText   = has(all, /guest.?checkout|checkout.?as.?guest|no account needed/i);
  const guestScore     = hasSocialLogin ? 4 : (hasGuestText || hasShopPay) ? 3 : 3;
  const guestEvidence  = hasSocialLogin ? 'Social login options detected (frictionless access)' : hasGuestText ? 'Guest checkout text detected on page' : 'Shopify native checkout — guest access available by default';

  const hasPayPal = has(all, /paypal/i);
  const hasBNPL   = has(all, /klarna|afterpay|affirm|sezzle|\bzip\b|laybuy|buy.?now.?pay.?later/i);
  const hasApple  = has(all, /apple.?pay/i);
  const hasGoogle = has(all, /google.?pay/i);
  const payScore  = hasBNPL ? 4 : (hasShopPay && hasPayPal) ? 3 : (hasPayPal || hasApple || hasGoogle) ? 2 : 1;
  const bnplName  = all.match(/klarna|afterpay|affirm|sezzle/i)?.[0] ?? 'BNPL';
  const payEvidence = hasBNPL ? `${bnplName} detected — Card + PayPal + Shop Pay + BNPL` : hasShopPay && hasPayPal ? 'Card + PayPal + Shop Pay detected' : hasPayPal ? 'Card + PayPal detected' : hasApple ? 'Card + Apple Pay detected' : hasGoogle ? 'Card + Google Pay detected' : 'Only card payment detected (payment logos not found on this page)';

  const hasKlaviyo    = has(all, /klaviyo/i);
  const hasSMSTool    = has(all, /postscript|smsbump|attentive|recart|omnisend/i);
  const hasExitIntent = has(all, /exit.?intent|exit.?popup|privy|optimonk|wheelio/i);
  const recoveryScore = hasKlaviyo && hasSMSTool && hasExitIntent ? 4 : hasKlaviyo && hasSMSTool ? 3 : hasKlaviyo ? 2 : 1;
  const smsName = all.match(/postscript|smsbump|attentive/i)?.[0] ?? 'SMS tool';
  const recoveryEvidence = hasKlaviyo && hasSMSTool && hasExitIntent ? `Klaviyo + ${smsName} + exit-intent popup all detected` : hasKlaviyo && hasSMSTool ? `Klaviyo (email) + ${smsName} (SMS) detected` : hasKlaviyo ? 'Klaviyo detected (email recovery likely in place)' : 'No cart recovery platform scripts detected in page source';

  const hasProgress = has(all, /progress.?bar|step.?indicator|checkout.?step/i);
  const hasTrustCO  = has(all, /secure.?checkout|trust.{0,30}checkout/i);
  const summaryScore = hasProgress && hasTrustCO ? 4 : 3;
  const summaryEvidence = hasProgress && hasTrustCO ? 'Checkout progress bar + trust signals detected' : hasTrustCO ? '"Secure checkout" signal detected' : 'Shopify native checkout — order summary visible by default';

  return {
    steps_to_checkout: { score: stepsScore,   evidence: stepsEvidence },
    guest_checkout:    { score: guestScore,    evidence: guestEvidence },
    payment_options:   { score: payScore,      evidence: payEvidence },
    cart_recovery:     { score: recoveryScore, evidence: recoveryEvidence },
    order_summary:     { score: summaryScore,  evidence: summaryEvidence },
  };
}

function computeScores(allResults) {
  const dimAvgs = {};
  let weightedTotal = 0;
  for (const [key, dim] of Object.entries(DIMENSIONS)) {
    const scores = Object.values(allResults[key]).map(i => i.score);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    dimAvgs[key] = avg;
    weightedTotal += avg * dim.weight;
  }
  return { dimensions: dimAvgs, overall: weightedTotal };
}

function detectLeaks(allResults) {
  return LEAK_RULES
    .filter(r => allResults[r.dim]?.[r.id]?.score <= r.threshold)
    .map(r => ({
      ...r,
      score:    allResults[r.dim][r.id].score,
      evidence: allResults[r.dim][r.id].evidence,
    }));
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url: rawUrl } = req.body ?? {};
  if (!rawUrl) return res.status(400).json({ error: 'URL is required' });

  let storeUrl;
  try {
    storeUrl = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`).href;
  } catch {
    return res.status(400).json({ error: 'Invalid URL — please include the full store URL' });
  }

  try {
    const { html: homeHtml, finalUrl: homeUrl } = await fetchPage(storeUrl);
    const shopify = detectShopify(homeHtml, homeUrl);
    const productUrl = await findProductPage(homeHtml, homeUrl);

    let productHtml = homeHtml;
    if (productUrl) {
      try {
        ({ html: productHtml } = await fetchPage(productUrl));
      } catch (_) {}
    }

    const allResults = {
      pdp:      analyzePDP(productHtml),
      offer:    analyzeOffer(productHtml),
      trust:    analyzeTrust(productHtml, homeHtml),
      friction: analyzeFriction(productHtml),
      checkout: analyzeCheckout(productHtml, homeHtml),
    };

    const scores = computeScores(allResults);
    const leaks  = detectLeaks(allResults);

    res.json({
      storeUrl: homeUrl,
      productUrl,
      shopify,
      allResults,
      scores,
      leaks,
      itemLabels: ITEM_LABELS,
      dimensions: DIMENSIONS,
      fixes: FIXES,
    });
  } catch (err) {
    res.status(500).json({ error: `Could not reach that store: ${err.message}` });
  }
}
