# Bangcaya Dashboard

This is Marpel Mar Bangcaya's portfolio website — a dashboard-style
single page with 6 sections you switch between: **Home, Projects,
Skills, Credentials, About, Contact**.

## How the code is organized

Like any normal website, the code is split into 3 kinds of files that
each do one job:

| File | What it does |
|---|---|
| `index.html` | The **content** — all the text, headings, and the layout skeleton for every page. |
| `styles.css` | The **look** — colors, spacing, fonts, dark mode, and how things line up on mobile vs. desktop. |
| `script.js` | The **behavior** — switching pages when you click a sidebar link, the dark/light mode button, and the scrolling "tools I use" ticker. |
| `images/` | Every picture used on the site (profile photo, project illustration, certificate scans). |
| `certs/` | The original certificate files for the few credentials that don't have an online verification link, so the site can still link straight to the real document. |

If you open `index.html` in a code editor, you'll see it just has the
page's text and structure — no giant blocks of code mixed in. That's on
purpose: it keeps each file focused on one job, the same way a real
project is organized.

## How to view it

You don't need to install anything. Just open `index.html` in any web
browser (double-click it, or drag it into a browser window). Every
link between the files (`styles.css`, `script.js`, and everything in
`images/`) is a relative path, so the whole `bangcaya-dashboard` folder
just needs to stay together.

## How to make changes

- Want to change wording, add a project, or add a certificate? Edit `index.html`.
- Want to change a color, spacing, or font? Edit `styles.css`.
- Want to change what happens when something is clicked? Edit `script.js`.
- Adding a new picture? Drop the file into `images/` and reference it
  in `index.html` like the existing ones, e.g. `images/my-photo.jpg`.

## Live site

Published with GitHub Pages at:
https://marpel101.github.io/bangcaya-dashboard/
