# Publishing Stratum UI to npm

This repo is packaged as **`@kaistrum/stratum-ui`** — a React + Tailwind CSS v4
component library. The Storybook site is its living documentation; the npm
package is how product codebases consume it.

What ships in the package (see `files` in `package.json`):

| Path | Contents |
| --- | --- |
| `dist-lib/index.js` | All components, `ThemeProvider`, `useTheme`, `cn` (ESM, ~13 kB gzipped) |
| `dist-lib/types/` | Full TypeScript declarations |
| `src/styles/tokens.css` | Design tokens (plain CSS custom properties) |
| `src/styles/globals.css` | Tailwind theme mapping, font-faces, base styles |

The SF Pro Display font files are **deliberately not** in the package — they are
Apple-licensed and must not be redistributed. Consumers self-host them (below).

---

## One-time setup

1. Create an npm account at npmjs.com if you don't have one.
2. The package is scoped to `@kaistrum`, so either:
   - create the **kaistrum** organization on npmjs.com (Add Organization → free
     public org), or
   - rename the scope in `package.json` to your npm username
     (e.g. `@yourname/stratum-ui`).
3. Log in from the terminal:

   ```sh
   npm login        # or: pnpm login
   ```

`publishConfig.access` is already set to `public`, which scoped packages need —
without it, npm assumes scoped packages are private and rejects the publish on
the free plan.

## Publishing a release

```sh
# 1. Bump the version (patch = fixes, minor = new components, major = breaking)
npm version minor

# 2. Publish — prepublishOnly automatically runs the library build
npm publish        # or: pnpm publish

# 3. Push the version-bump commit + tag that `npm version` created
git push --follow-tags
```

To sanity-check the tarball before your first publish:

```sh
npm pack --dry-run   # lists every file that would ship
```

`pnpm run build:lib` can be run at any time to test the build; output goes to
`dist-lib/` (gitignored).

---

## Consuming the package

### Install

```sh
pnpm add @kaistrum/stratum-ui        # or: npm install @kaistrum/stratum-ui
```

React 19, ReactDOM 19, and Tailwind CSS 4 are peer dependencies — the consumer
project provides them. Everything else (framer-motion, lucide-react, CVA, clsx,
tailwind-merge) installs automatically with the package.

### Wire up styles (Tailwind v4)

In the app's main CSS file:

```css
@import '@kaistrum/stratum-ui/styles/globals.css';

/* Tailwind v4 does not scan node_modules by default. This line makes it
   pick up the utility classes used inside the library's components: */
@source "../node_modules/@kaistrum/stratum-ui/dist-lib";
```

(Adjust the relative path to `node_modules` for your CSS file's location.)

`globals.css` already contains `@import "tailwindcss"` and the token → theme
mapping, so this single import gives you the full system: tokens, utilities
like `bg-accent` / `text-dim`, fonts, and base styles.

### Use it

```tsx
import { ThemeProvider, Button, ShipButton } from '@kaistrum/stratum-ui';

export function App() {
  return (
    <ThemeProvider>
      <Button variant="primary">Contact</Button>
      <ShipButton outcome="success" onResult={(o) => console.log(o)} />
    </ThemeProvider>
  );
}
```

Dark is the default theme; `ThemeProvider` toggles the `.light` class on
`<html>` (the Storybook toolbar uses `data-theme` — tokens.css honors both).

### Self-host the brand fonts

`globals.css` declares `@font-face` rules pointing at `/fonts/*.woff2` (with
`.OTF` fallbacks). Copy your licensed SF Pro Display files into the consumer
app's `public/fonts/` directory with the same file names — or override
`--font-sans` in your own CSS if the app uses a different typeface. Instrument
Serif loads from Google Fonts automatically.

### Non-Tailwind projects

Import `@kaistrum/stratum-ui/styles/tokens.css` alone to get the design tokens
(colors, radii, motion) as CSS custom properties for your own components. The
React components themselves are styled with Tailwind utilities, so they need
Tailwind present to render correctly.

---

## Testing the package locally before publishing

From this repo:

```sh
pnpm run build:lib
pnpm pack                     # produces kaistrum-stratum-ui-0.1.0.tgz
```

In a test app:

```sh
pnpm add ../path/to/kaistrum-stratum-ui-0.1.0.tgz
```

This installs exactly what npm would serve, catching packaging mistakes
(missing files, broken types, unresolved imports) before anything is public.
