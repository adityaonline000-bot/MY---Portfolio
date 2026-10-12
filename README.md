# MY---Portfolio

Personal cinematic portfolio for Aditya Yadav (adityayadav.space) built with React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, GSAP, Three.js, and OGL.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Local development

```sh
npm ci
npm run dev
```

Vite prints the local development URL when the server is ready.

## Validation and production build

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
```

The production site is written to `dist/`. Deploy the contents of that directory to a static host. Configure the host to serve `index.html` for application routes so direct navigation to portfolio pages works.

## Notes

- WebGL effects are loaded only when needed. Reduced-motion preferences are respected by the motion and scroll styles.
- The site uses Google Fonts and several external profile/project links, so those features require network access.
