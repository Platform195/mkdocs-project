# Uplift Hub Docs (Mintlify)

Documentation site for **Uplift Hub** — built with [Mintlify](https://mintlify.com/) and ready to publish at `docs.uplifthub.io`.

## Local development

```bash
# 1. Install the Mintlify CLI (one time)
npm i -g mint

# 2. From this folder
mint dev
# → http://localhost:3000
```

`mint dev` watches MDX files and live-reloads.

## Folder layout

```
.
├── docs.json                # site config: nav, theme, branding
├── index.mdx                # home
├── favicon.svg
├── logo/
│   ├── light.svg
│   └── dark.svg
├── snippets/                # reusable MDX bits (status pills, ui-ref)
├── get-started/
├── setup/
├── line-items/
├── creatives/
├── going-live/
├── more/
├── reporting/
└── reference/
```

## Authoring

- All pages are **MDX** — Markdown plus React-ish components.
- Use Mintlify's built-in components for callouts and structure:

  ```mdx
  <Tip>Pro tip body</Tip>
  <Note>Useful aside</Note>
  <Warning>Heads-up</Warning>

  <Steps>
    <Step title="Open Accounts">…</Step>
    <Step title="Click Add new">…</Step>
  </Steps>
  ```

- Reusable snippets live in `snippets/` and are included with:
  ```mdx
  import { Pill } from "/snippets/pill.mdx";
  ```

- Reference UI elements inline with the `<Ui>` snippet:
  ```mdx
  Click <Ui>Save</Ui> to continue.
  ```

## Deployment

1. Push this folder to a GitHub repo.
2. Connect the repo in your Mintlify dashboard (Settings → GitHub).
3. Mintlify auto-builds on every push to `main` and deploys to your subdomain — point `docs.uplifthub.io` at it via Settings → Custom Domain.

## Editing without Git

Non-engineers can edit any page through the Mintlify web editor (Dashboard → Editor). Changes commit back to the same Git branch.

## Migrating from MkDocs

The source content was previously authored in MkDocs (Markdown + `mkdocs.yml`). The conversion is mostly:

| MkDocs                               | Mintlify                              |
| ------------------------------------ | ------------------------------------- |
| `!!! tip "title"` admonition         | `<Tip>` component                     |
| `!!! note` / `!!! warning`           | `<Note>` / `<Warning>`                |
| Numbered list "## Steps"             | `<Steps>` + `<Step>` components       |
| `mkdocs.yml` `nav:`                  | `docs.json` `navigation.tabs.groups`  |
| `extra.css` for status pills         | `snippets/pill.mdx` reusable snippet  |
