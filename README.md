# Behance-Style Portfolio Website

A clean, Behance-inspired portfolio site for an architectural designer / 3D visualizer.
Built with plain HTML + CSS + JS — no frameworks, no build step, works offline.

## Run it

Any static server works:

```bash
cd portfolio
python3 -m http.server 8080
# open http://localhost:8080
```

Or just open `index.html` directly in a browser.

## Customize

| What | Where |
| --- | --- |
| Name, title, location | `index.html` → search for `Your Name`, `Your City` |
| Stats numbers | `index.html` → `data-count` attributes in `#stats` (JS animates them) |
| Projects (title, image, likes, views, description) | `js/app.js` → `PROJECTS` array at the top |
| Project filters | `index.html` → `#filters` buttons + `category` in `PROJECTS` |
| Services | `index.html` → `#services` section |
| Skills | `index.html` → `data-level` on `.bar-fill` |
| Contact info | `index.html` → `#contact` section |
| Colors / theming | `css/styles.css` → `:root` variables (light + dark) |
| Images | replace files in `images/` (keep the same names, or update `PROJECTS`) |

## Features

- Behance-style profile header: banner, avatar, availability badge, Follow/Message
- Animated stats (project views, appreciations, followers, following)
- Project grid with **category filters + live search**
- Project detail **modal** (keyboard: ←/→ to browse, Esc to close, like button persists in localStorage)
- Services, About (skills bars + experience timeline), Contact form (demo)
- Light/dark theme toggle (persisted, follows system preference)
- Fully responsive, scroll-reveal animations, toast notifications

## Note

All content is placeholder ("Your Name"). Images are AI-generated interior
visualization renders — replace them with your own work before publishing.
