# Marketing Maison — Website

Official website for **Marketing Maison**, a boutique marketing agency based in Jacksonville, FL. Founded by Franchesca Bethel, Marketing Maison provides integrated marketing strategy across nine service lines — built for brands that want to own it, build it, and scale it.

🌐 **Live site:** [franchescabethel-fb.github.io/marketing-maison-site](https://franchescabethel-fb.github.io/marketing-maison-site/index.html)

---

## Pages

| File | Description |
|---|---|
| `index.html` | Homepage — full-bleed video hero, services overview, social proof, CTA |
| `about.html` | About — founder-forward hero, origin story, values, differentiators |
| `portfolio.html` | Portfolio — filterable project gallery by service category |
| `services.html` | Services — all nine service lines with detail and pricing context |
| `contact.html` | Contact — discovery call booking and inquiry form |

---

## Project Structure

```
/
├── index.html
├── about.html
├── portfolio.html
├── services.html
├── contact.html
├── css/
│   ├── styles.css       # Main stylesheet — design tokens, layout, components
│   ├── animations.css   # Scroll-triggered fade and entrance animations
│   └── tokens.css       # CSS custom property definitions (color, type, spacing)
├── js/
│   └── main.js          # Nav scroll behavior, mobile menu, fade-in observers
└── assets/
    ├── HP_Hero.mp4      # Homepage hero background video
    └── logos/           # Brand logo files (primary, submark, color variants)
```

---

## Brand

**Color Palette**

| Token | Hex | Name |
|---|---|---|
| `--black` | `#0c1c2e` | Deep navy-black |
| `--charcoal` | `#13273f` | Mystic Navy |
| `--cream` | `#e9d4c3` | Mother of Pearl |
| `--wine` | `#4e0000` | Red Inferno |
| `--chocolate` | `#5c3929` | Chocolate Cremoso |
| `--slate` | `#7590ae` | Slate blue accent |

**Typography**
- Display / Editorial — Cormorant Garamond (serif)
- Body / UI — system sans-serif stack

---

## Development

This is a static HTML/CSS/JS site — no build step required.

**To preview locally:**
```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

Then open `http://localhost:8080` in your browser.

**To deploy:** Push to the `main` branch. GitHub Pages serves from the repo root automatically.

---

## Adding a Founder Photo to the About Hero

The About page hero currently displays a branded gradient placeholder. To swap in a real photo:

1. Add your image to the `assets/` folder
2. Open `about.html` and find the `<div class="about-hero-bg">` element
3. Add a `style` attribute with the image path:

```html
<div class="about-hero-bg" style="background-image: url('assets/your-photo.jpg');" aria-hidden="true"></div>
```

The dark overlay scrim is already in place — the photo will show through automatically.

---

## Adding Real Portfolio Images

Portfolio cards currently use CSS gradient placeholders. To add a real project image:

1. Place the image inside the `.port-card-visual` div in `portfolio.html`:

```html
<div class="port-card-visual">
  <img src="assets/portfolio/project-name.jpg" alt="Project description" loading="lazy" />
</div>
```

---

*Built and maintained by Marketing Maison · Jacksonville, FL*
