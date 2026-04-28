# Uplift Hub Docs

Documentation site for Uplift Hub — built with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) and hosted on [Read the Docs for Business](https://readthedocs.com/).

Live site: **https://docs.uplifthub.io**

---

## Quick start

```bash
# 1. Clone and enter the repo
git clone git@github.com:platform195/uplift-hub-docs.git
cd uplift-hub-docs

# 2. Install dependencies (Python 3.12+)
python -m venv .venv
source .venv/bin/activate         # Windows: .venv\Scripts\activate
pip install -r docs/requirements.txt

# 3. Run the dev server
mkdocs serve
# → http://127.0.0.1:8000
```

Edit any `.md` file under `docs/`. The browser auto-reloads.

## Folder layout

```
.
├── mkdocs.yml                  # site config + nav
├── .readthedocs.yaml           # RTD build config
├── docs/
│   ├── requirements.txt        # build dependencies
│   ├── index.md                # home
│   ├── stylesheets/extra.css   # navy header, Geist font, status pills
│   ├── assets/                 # logo, icons, screenshots
│   ├── get-started/
│   ├── setup/
│   ├── line-items/
│   ├── creatives/
│   ├── going-live/
│   ├── more/
│   ├── reporting/
│   └── reference/
└── README.md
```

## Authoring

- **Plain Markdown** with [Material extensions](https://squidfunk.github.io/mkdocs-material/reference/).
- **Callouts** use admonitions:
  ```markdown
  !!! tip "Pro tip"
      Drag a card across the kanban to update status.
  ```
- **Status pills** are inline HTML snippets (see `docs/stylesheets/extra.css`):
  ```markdown
  <span class="pill live">Live</span>
  ```
- **Screenshots** go under `docs/assets/screenshots/` and are referenced relative to the markdown file.

## Deployment

Read the Docs builds automatically on every push to `main`. The custom domain `docs.uplifthub.io` is configured in the RTD dashboard (Admin → Domains).

## Support

Internal questions: `#docs` on Slack. External: support@uplifthub.io.
