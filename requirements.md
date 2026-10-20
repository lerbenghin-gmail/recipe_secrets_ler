# Recipe Secrets Website Requirements

# Task: Build a visually striking website for "Recipe Secrets Restaurant"

## Goal
Build a polished, image-rich, mobile-friendly website for a restaurant called **Recipe Secrets**. The site should look appealing at first glance, with large photography, bold typography, and strong contrast, and make it easy to browse specials, book a table, and get in touch.

## Hard constraints
- **Exactly 5 pages, no more:** Home, About, Contact, Reservation, Specials.
- **Must deploy on free static hosting** (GitHub Pages, Netlify, Cloudflare Pages).
- Use **plain vanilla HTML/CSS/JS** (preferred). Use Next.js only if you have a strong reason, and then only with static export (`output: 'export'`). Explain the choice in one sentence in the README.
- No backend, database, paid services, or API keys.
- No heavy frameworks (no Bootstrap, jQuery, Tailwind CDN). One optional Google Font pairing is fine (a display/serif for headings, a clean sans for body).
- Keep the code simple and readable. Don't over-engineer.

## Design direction
- Warm, upscale-casual restaurant feel. Palette: deep charcoal or espresso, warm cream, and one bold accent (e.g. paprika red or saffron gold). Define colors, spacing, and fonts as CSS variables in one shared stylesheet.
- Full-width hero image with a dark overlay and large headline on the Home page. Use big, edge-to-edge images on every page, not small thumbnails.
- Generous whitespace, large type, rounded image cards, subtle hover zoom on images, and gentle scroll-reveal animations (CSS/IntersectionObserver, kept lightweight).
- High contrast and readable text over images (overlays or gradients behind text). Meet WCAG AA contrast.
- Sticky header with logo and nav, a clear "Reserve a Table" button, and a footer with hours, address, and social icons (inline SVG).
- Fully responsive (mobile first), with a hamburger menu on small screens.

## Images (important)
- Use **real food and restaurant photography**, not blank boxes. Source from **Unsplash or Pexels (free license)**. Download them into `/images` and reference them locally so the site doesn't depend on hotlinking.
- If you can't download images from the shell, use clearly labelled placeholder image paths and a `IMAGES.md` listing exactly which image goes where, its recommended size, and a suggested search term, so I can drop them in.
- Optimize: sensible dimensions (hero ~1920px wide, cards ~800px), compressed JPG/WebP, `loading="lazy"` below the fold, descriptive `alt` text on every image.
- Credit photographers in the footer or in `IMAGES.md` where required.

## Pages and content
Write believable sample copy (fictional restaurant details, clearly marked so I can replace them).

1. **Home (`index.html`)**: hero with tagline and CTA, short intro, 3 to 4 signature-dish image cards, a testimonials strip, opening hours, and a closing CTA banner.
2. **About (`about.html`)**: the restaurant's story, a chef/family section with photo, values or philosophy, and an ambience image gallery.
3. **Specials (`specials.html`)**: a grid of dish cards (photo, name, short description, price) grouped into Today's Specials, Weekly Specials, and Seasonal. Store the dishes in a simple JS array or JSON so they're easy to edit.
4. **Reservation (`reservation.html`)**: a form with name, email, phone, date, time, party size, and special requests, with client-side validation and a friendly confirmation message. Use a free form handler (Formspree or Netlify Forms) with a clearly marked placeholder to configure, and explain the setup in the README. Show opening hours beside the form.
5. **Contact (`contact.html`)**: contact form, address, phone, email, hours, and an embedded Google Map via a plain iframe (no API key).

## Quality requirements
- Semantic HTML, proper heading hierarchy, labels on all form fields, keyboard-accessible navigation, visible focus states.
- Meta tags: title, description, Open Graph, favicon.
- Consistent header and footer across all pages. Mark the active nav link.
- Target Lighthouse scores of 90+ for Performance, Accessibility, and SEO.
- Works with no build step: opening `index.html` should just work.

## Project structure
```
/
├── index.html, about.html, specials.html, reservation.html, contact.html
├── css/style.css
├── js/main.js
├── images/
├── IMAGES.md
└── README.md
```

## Deliverables
1. The complete working site in the structure above.
2. A `README.md` covering how to run locally, how to edit specials/hours/contact details, how to configure the forms, and step-by-step deployment to GitHub Pages or Netlify.
3. Before finishing, open the site in a browser, check every page at mobile and desktop widths, confirm no broken links or missing images, and fix any issues.

## Working approach
Start by briefly stating your stack choice and a page/section outline, then build. Don't ask me questions unless something blocks you. Make sensible assumptions and list them at the end.