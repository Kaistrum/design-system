import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],

  framework: '@storybook/react-vite',

  // Strip Storybook's own promotional/telemetry chrome so nothing but the
  // Stratum UI brand shows: no "What's New" notifications, no phone-home.
  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
  },

  managerHead: (head) => `
    ${head}
    <title>Stratum UI</title>
    <link rel="icon" type="image/svg+xml" href="/Kaistrum-logo.svg" />
    <style>
      /* The manager UI renders outside the preview iframe, so the local
         SF Pro Display faces from globals.css aren't available here. Load
         the brand's regular + medium weights so the themed fontBase applies. */
      @font-face {
        font-family: 'SF Pro Display';
        src: url('/fonts/SFPRODISPLAYREGULAR.woff2') format('woff2'), url('/fonts/SFPRODISPLAYREGULAR.OTF') format('opentype');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'SF Pro Display';
        src: url('/fonts/SFPRODISPLAYMEDIUM.woff2') format('woff2'), url('/fonts/SFPRODISPLAYMEDIUM.OTF') format('opentype');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }

      /* Brand lockup in the sidebar header: the raw logo renders ~100px tall
         by default, which dwarfs the sidebar. Shrink it to a small mark and
         pair it with the "Stratum UI" wordmark (brandTitle is only used as
         alt text when brandImage is set, so we render the name via CSS). */
      .sidebar-header a[title="Stratum UI"] {
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }
      .sidebar-header a[title="Stratum UI"] img {
        width: 26px !important;
        height: 26px !important;
        max-height: 26px !important;
        object-fit: cover;
        border-radius: 6px;
      }
      .sidebar-header a[title="Stratum UI"]::after {
        content: 'Stratum UI';
        font-family: 'SF Pro Display', -apple-system, 'Segoe UI', sans-serif;
        font-weight: 600;
        font-size: 15px;
        letter-spacing: 0.2px;
        color: #111827; /* matches the light manager theme's barTextColor */
      }

      /* Storybook 10's onboarding checklist ("See what's new", "Share your
         Storybook for feedback", …) — pure Storybook promo, hide it. */
      #storybook-checklist-widget { display: none !important; }
    </style>
    <script>
      // Storybook overwrites document.title on navigation (e.g.
      // "Button - Primary ⋅ Storybook") and injects its own favicon.
      // Keep the brand name in the tab, and make the brand logo the only
      // favicon (drop Storybook's default ./favicon.svg).
      (function () {
        var BRAND_ICON = '/Kaistrum-logo.svg';
        var titleEl = document.querySelector('title');
        function brandTitle() {
          if (titleEl && /Storybook/.test(titleEl.textContent)) {
            titleEl.textContent = titleEl.textContent.replace(/Storybook/g, 'Stratum UI');
          }
        }
        function brandIcon() {
          document.querySelectorAll('link[rel~="icon"]').forEach(function (l) {
            if (l.getAttribute('href') !== BRAND_ICON) l.remove();
          });
          if (!document.querySelector('link[rel~="icon"]')) {
            var l = document.createElement('link');
            l.rel = 'icon';
            l.type = 'image/svg+xml';
            l.href = BRAND_ICON;
            document.head.appendChild(l);
          }
        }
        function brandHeading() {
          // Storybook hard-codes an sr-only landmark <h1>Storybook</h1>, which
          // React re-renders (replacing the node) on navigation. Re-query and
          // re-apply on every mutation; the guard prevents a feedback loop.
          var h = document.getElementById('global-site-h1');
          if (h && h.textContent !== 'Stratum UI') h.textContent = 'Stratum UI';
        }
        if (titleEl) new MutationObserver(brandTitle).observe(titleEl, { childList: true });
        new MutationObserver(brandIcon).observe(document.head, { childList: true });
        new MutationObserver(brandHeading).observe(document.body, {
          childList: true,
          characterData: true,
          subtree: true,
        });
        brandTitle();
        brandIcon();
        brandHeading();
      })();
    </script>
  `,
};

export default config;