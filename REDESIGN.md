# Personal homepage

The new homepage is `index.html`, with styles in `assets/css/personal.css`.
It is plain HTML/CSS, with no JavaScript, CDN fonts, or additional build dependencies.
GitHub Pages copies it as a static file; the existing Jekyll site and document URLs remain supported.

- Homepage: `index.html`
- Shared style: `assets/css/personal.css`
- Publications and CV layout: `_layouts/personal.html`
- Portrait: `images/me.png`
- CV: `files/CV_JianghaiChen.pdf`
- `/about/` redirects to `/` using the existing Jekyll redirect plugin.

Preview the homepage with `python3 -m http.server 4173 --bind 127.0.0.1` and open http://127.0.0.1:4173.
For all Jekyll-generated routes, use `bundle install` and `bundle exec jekyll serve`.
The Python server only previews the static homepage, not the Jekyll routes.

Content is based on the existing website and profile README. Education is worded without asserting a current enrollment status. The existing CV is retained; review it before publishing if it needs updating.
