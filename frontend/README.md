# World Budō Sosa-Kai — React Website

This is your website rebuilt in **React**, a JavaScript library for building
web pages out of reusable pieces called "components." You don't need to know
React to run this — just follow the steps below.

## What's in this project

```
react-app/
├── public/images/     ← all your photos and logos live here
├── src/
│   ├── components/    ← pieces reused on every page (Header, Navbar, Footer)
│   ├── pages/         ← one file per page (Home, About, Programs, Contact, Events)
│   ├── App.jsx         ← wires the pages together and handles navigation
│   ├── main.jsx         ← the very first file that runs
│   └── index.css       ← all the styling (this is basically your old style.css)
├── index.html          ← the single HTML shell React loads into
└── package.json        ← lists what tools this project needs
```

Every page you see on the site (Home, About, Programs, Contact, Events) is a
plain `.jsx` file in `src/pages/`. If you ever want to change text, open the
matching file — it reads almost exactly like the HTML you're used to.

## One-time setup

1. **Install Node.js** (if you don't have it already): go to
   https://nodejs.org and download the "LTS" version. Just click through the
   installer with the default options.

2. **Open a terminal** in this `react-app` folder. (On Mac: right-click the
   folder → "New Terminal at Folder". On Windows: open the folder in File
   Explorer, then type `cmd` in the address bar and hit Enter.)

3. **Install the project's dependencies** — this downloads React and the
   other tools listed in `package.json`:

   ```bash
   npm install
   ```

   This only needs to be done once (and again any time you pull new changes
   from GitHub that touch `package.json`).

## Running it locally

```bash
npm run dev
```

This starts a local server and prints a URL, usually:

```
Local:   http://localhost:5173/
```

Open that link in your browser. The site will reload automatically any time
you save a change to a file — no need to restart anything.

Press `Ctrl + C` in the terminal to stop the server when you're done.

## The contact form

The Contact page submits to `/api/contact`, which is the same endpoint your
existing Flask backend (`app.py`) already provides. For the form to actually
work while you're developing, run your Flask app too, in a **second**
terminal window:

```bash
python app.py
```

Flask runs on port 5001, and `vite.config.js` is already set up to forward
any `/api/...` request from React straight to it — so you don't need to
change anything, just have both running at the same time.

## Building for real deployment

When you're ready to put this on a live server (not just testing locally):

```bash
npm run build
```

This creates a `dist/` folder with the finished, optimized site — plain
HTML/CSS/JS files that any web host can serve. You'd typically have Flask (or
another server) serve the contents of `dist/` and continue handling `/api/...`
requests.

## Deploying on Render

This repository includes a `render.yaml` Blueprint configured for a Render
static site. From the Render dashboard, create a new Blueprint and connect this
GitHub repository. Render will run `npm ci && npm run build`, publish `dist`,
and rewrite application routes to `index.html` so React Router links work when
opened or refreshed directly.

The current contact form posts to the Flask endpoint at `/api/contact`. A static
site does not run that backend, so deploy the Flask API separately before using
the form in production.

## What changed from the old HTML/CSS version

- Every page is now a React **component** instead of a Jinja template —
  same content, just written in `.jsx` files.
- Navigation between pages no longer reloads the whole site (it's instant),
  handled by `react-router-dom`.
- The mobile hamburger menu now uses React state instead of manually
  toggling a CSS class with JavaScript.
- The Contact form uses React state to track what's typed and show
  success/error messages, instead of grabbing values from the DOM by hand.
- All the same content, image, and spelling fixes from the Flask version are
  already included here (full-size hero photo, uncropped "Why Choose"
  photos, the finalized Tai-Jūtsu crest, and "KarateDō" spelled consistently).
