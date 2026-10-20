# Recipe Secrets Restaurant — Website

A 5-page static website for a fictional restaurant, **Recipe Secrets**. All restaurant details
(name, address, phone, hours, menu items, prices) are sample/placeholder content — replace them
with the real thing before launch.

## Stack

Plain vanilla HTML/CSS/JS, no framework, no build step, no backend. This keeps the site simple
to edit, free to host, and fast to load — exactly what a small static restaurant site needs.

## Running locally

No build step. Just open `index.html` in a browser, or serve the folder with any static server,
e.g.:

```
npx serve .
```

or in Python:

```
python -m http.server 8000
```

## Project structure

```
/
├── index.html, about.html, specials.html, reservation.html, contact.html
├── css/style.css          shared stylesheet (colors/spacing/fonts as CSS variables)
├── js/main.js             shared behavior: nav toggle, form validation, scroll-reveal, specials rendering
├── js/specials-data.js    the dish data for specials.html, as a plain JS array
├── images/                downloaded, locally-hosted photos (see IMAGES.md for credits)
├── IMAGES.md              per-image source/credit list
└── README.md              this file
```

## Editing content

- **Specials / menu items**: edit the `specials` array in `js/specials-data.js`. Each entry is
  `{ name, description, price, image, alt, category }` where `category` is `"today"`, `"weekly"`,
  or `"seasonal"`. specials.html renders them automatically, grouped by category.
- **Hours**: search for "Tue–Sun: 11:00 AM" — it appears in each page's footer, plus on the
  home page and beside the reservation form. Update all occurrences.
- **Address / phone / email**: appears in each page's footer and on contact.html. Search for
  "123 Harvest Lane" / "(555) 123-4567" / "hello@recipesecrets.example".
- **Images**: add new files to `/images` and reference them as `images/your-file.jpg`. Keep
  hero images around 1920px wide and card/content images around 800px wide. Add
  `loading="lazy"` to anything that isn't the first thing visible on the page.

## Forms

Both forms (`reservation.html`, `contact.html`) do client-side validation in `js/main.js` and
show a friendly on-page confirmation message — this works with zero backend.

`reservation.html`'s `<form>` also has a **Formspree** placeholder wired up:

```html
<form class="form-card" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" ...>
```

To make it actually deliver to an inbox:

1. Create a free form at [formspree.io](https://formspree.io) and copy its form ID.
2. Replace `YOUR_FORM_ID` in `reservation.html` with that ID.
3. In `js/main.js`, the submit handler calls `event.preventDefault()` so this demo always shows
   the local confirmation message instead of actually posting anywhere. Remove (or conditionally
   skip) that `preventDefault()` once a real Formspree ID is in place, so the browser's native
   form submission goes through to Formspree. The validation logic can run first either way.

`contact.html`'s form has no `action` set — wire up a Formspree/Netlify Forms endpoint the same
way if you want contact messages emailed to you.

## Deployment

### GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch", pick the `main`
   branch and the `/ (root)` folder.
4. Save — GitHub will publish the site at `https://<username>.github.io/<repo>/` within a
   minute or two.

### Netlify

1. Drag-and-drop this folder onto [app.netlify.com/drop](https://app.netlify.com/drop), **or**
   connect the GitHub repo via "Add new site → Import an existing project".
2. No build command is needed (leave it blank) and the publish directory is the project root (`.`).
3. Netlify gives you a live URL immediately; you can add a custom domain under **Domain settings**.

## Assumptions made

- All restaurant details (name, address, phone, email, hours, menu, prices, testimonials) are
  fictional sample content, clearly meant to be replaced.
- The Google Map on contact.html uses the plain `output=embed` query format (no API key) pointed
  at the sample address text, not a verified real location pin.
- Social links in the footer point to placeholder URLs (`https://instagram.com/example`, etc.).
- The Formspree form ID is a placeholder (`YOUR_FORM_ID`) and must be replaced to go live.
