# FastAPI Conference slides

18-slide Slidev deck based on `outline.md`.

```sh
npm install
npm run dev
```

Open http://localhost:3030. Use Right/Space to advance, Left to go back,
and `p` for presenter mode. Code changes, diagrams, and the lifecycle timeline
advance on clicks. Speaker notes are in `slides.md` comments.

Edit `slides.md` for content and `style.css` for the theme.
Generated screenshots and visual checks go in the ignored `previews/` folder,
which can be removed at any time. Original source images stay at the project root.
`npm run build` produces a static website in `dist/`.
For a PDF backup, install Playwright (`npm install -D playwright-chromium`)
and run `npm run export`; click steps become separate PDF pages.

## Showtime (macOS + Safari)

Connect an external monitor or projector in **extended display** mode, keep the
laptop screen on, then run:

```sh
npm run showtime
```

This starts Slidev on port 3030, opens a new presenter window on the built-in
screen, and activates Slidev's fullscreen mode on the first external
display reported by macOS. The presenter window gets keyboard focus once setup
finishes. Keep the terminal running; **Ctrl+C** stops the server. Stop any existing
server on port 3030 first. Safari windows remain open after stopping the server.
If automatic window setup fails, the launcher reports the error and keeps Slidev
running so you can arrange the windows manually.

Before the talk, do one rehearsal with the actual displays:

- Allow your terminal app (Terminal, iTerm, or Codex) to control **Safari** and
  **System Events** when macOS asks. In System Settings → Privacy & Security,
  check **Automation** and enable **Accessibility** for that terminal app.
- Enable **Displays have separate Spaces** in System Settings → Desktop & Dock →
  Mission Control so the laptop stays usable while the projector is in full screen.
  macOS may require a logout after changing this setting.

For automatic Do Not Disturb, create a shortcut in Apple's **Shortcuts** app named
**Showtime DND** with **Set Focus → Turn Do Not Disturb On → Until Turned Off**.
The launcher runs it if present, using Apple's supported
[Shortcuts CLI](https://support.apple.com/guide/shortcuts-mac/apd455c82f02/mac).
Turn DND off yourself after the talk; stopping the server leaves it enabled.

To check display detection without opening Safari:

```sh
osascript -l JavaScript scripts/showtime.js --check
```

## Brand assets

Fonts come from the local Polar repository. The Polar logotype comes from the supplied Polar Brand 2 assets.
The portrait is the supplied `francois-voron.jpg`. Assets are bundled locally.
The dark palette, fine rules, layered geometry, and motion follow the
[Polar landing page](https://polar.sh/). Code uses Vesper for contrast.
The white logotype is bundled unchanged as `public/polar.svg`.

The Vue components in `components/` provide the animations: `PolarOrbit` adapts
the landing's orbiting spheres, `VersionRuler` adapts its moving ruler, and
`ContractFlow` / `GeneratorFlow` illustrate the versioning pipeline with SVG and
CSS. All respect reduced-motion preferences. Slides 11, 14, and 16 each have
two click steps; slide 11 ends with the implementation code.
