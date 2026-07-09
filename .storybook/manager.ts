import { addons } from 'storybook/manager-api';
import { stratumTheme } from './theme';

/**
 * Applies the branded Stratum UI theme to Storybook's manager UI
 * (sidebar, toolbar, addon panels). Without this, Storybook falls back
 * to its default styling.
 */
addons.setConfig({
  theme: stratumTheme,
});
