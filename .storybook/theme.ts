import { create } from 'storybook/theming';

/**
 * Storybook manager + docs theme — makes Storybook's OWN chrome (sidebar,
 * toolbar, docs pages) match the Stratum UI brand instead of the default
 * purple Storybook look.
 *
 * Values are the literal dark-theme tokens from `src/styles/tokens.css`.
 * They're hard-coded here (not `var(--…)`) because the manager UI renders
 * outside the preview iframe and never imports globals.css, so CSS custom
 * properties from the design system aren't available in this context.
 */
export const stratumTheme = create({
  base: 'dark',

  // ── Brand — shown in the sidebar header ──
  brandTitle: 'Stratum UI',
  brandUrl: '/',
  brandImage: '/Kaistrum-logo.svg',
  brandTarget: '_self',

  // ── Accent (teal) ──
  colorPrimary: '#2DD4BF', // --accent
  colorSecondary: '#2DD4BF', // selection / active states

  // ── App surfaces ──
  appBg: '#07090F', // --bg
  appContentBg: '#0D1117', // --bg-surface
  appPreviewBg: '#07090F', // --bg (canvas background)
  appBorderColor: 'rgba(255, 255, 255, 0.07)', // --border
  appBorderRadius: 0, // brand is sharp, not soft

  // ── Typography ──
  fontBase:
    "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontCode:
    "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",

  // ── Text ──
  textColor: '#E2E8F0', // --text
  textInverseColor: '#07090F', // --text-on-accent
  textMutedColor: 'rgba(226, 232, 240, 0.65)', // --text-dim

  // ── Toolbar / top bar ──
  barTextColor: 'rgba(226, 232, 240, 0.65)', // --text-dim
  barSelectedColor: '#2DD4BF', // --accent
  barHoverColor: '#5EEAD4', // --accent-strong
  barBg: '#07090F', // --bg

  // ── Form controls (addon panels, search) ──
  inputBg: '#111827', // --bg-card
  inputBorder: 'rgba(255, 255, 255, 0.16)', // --border-strong
  inputTextColor: '#E2E8F0', // --text
  inputBorderRadius: 0,
});

export default stratumTheme;
