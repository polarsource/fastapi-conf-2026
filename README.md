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
