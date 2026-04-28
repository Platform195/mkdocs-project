# Uplift Hub Mintlify Setup — step-by-step

A practical, end-to-end guide for getting `docs.uplifthub.io` live on Mintlify.
Follow this once. The actual day-to-day workflow afterwards is "edit MDX, push
to Git, Mintlify auto-deploys."

---

## 0. What you'll end up with

- Public docs site at **`docs.uplifthub.io`** (custom domain on Mintlify).
- Source MDX files in a private GitHub repo (`uplift-hub-docs`).
- Auto-deploy on every push to `main`.
- Web editor available to non-technical teammates (CS, PMs).

---

## 1. Get your accounts ready

1. **GitHub** — create a private repo named `uplift-hub-docs` under the
   `platform195` org. Don't initialise it with a README; we'll push our files.
2. **Mintlify** — sign up at [mintlify.com](https://mintlify.com/) using your
   work email. Pick the **Pro** or **Growth** plan if you want custom domain +
   multiple editors. (Hobby plan is free but no custom domain.)

---

## 2. Push this folder to GitHub

From the `mintlify-project/` folder in this Claude project:

```bash
# Initialise local repo
git init -b main
git add .
git commit -m "chore: initial Mintlify docs project"

# Connect to GitHub
git remote add origin git@github.com:platform195/uplift-hub-docs.git
git push -u origin main
```

If you'd rather download and upload manually: zip the `mintlify-project/`
folder, upload to GitHub via the web UI ("uploading an existing project").

---

## 3. Connect Mintlify to the repo

1. In the Mintlify dashboard, click **New deployment** → **Connect GitHub**.
2. Authorise Mintlify on the `platform195` org.
3. Pick the `uplift-hub-docs` repo and the `main` branch.
4. Mintlify scans for `docs.json` and runs a first build. This takes ~30s.

You'll get a temporary URL like `uplift-hub.mintlify.app` — visit it and
confirm the site renders.

---

## 4. Point your custom domain

1. **Mintlify dashboard** → Settings → Custom domain → enter
   `docs.uplifthub.io`. Mintlify gives you a DNS target (a CNAME).
2. **Your DNS provider** (Cloudflare, AWS Route 53, etc.) — add a CNAME record:
   - **Name:** `docs`
   - **Value:** the target Mintlify gave you
   - **Proxy / orange-cloud (Cloudflare):** off
3. Wait 1–10 minutes for DNS to propagate. Mintlify auto-provisions an SSL
   cert when it sees the CNAME.

---

## 5. Verify the four required `docs.json` fields

Already set in this project, for reference:

| Field            | Value                  |
| ---------------- | ---------------------- |
| `name`           | `Uplift Hub`           |
| `theme`          | `mint`                 |
| `colors.primary` | `#031e6b` (Uplift navy)|
| `navigation`     | tabs + groups (full)   |

If you ever rename the product or rebrand, change them here — everything else
follows.

---

## 6. Run the docs locally

While editing MDX files locally:

```bash
# One-time install
npm i -g mint

# In the project folder
mint dev
```

Visit `http://localhost:3000`. The dev server live-reloads on every save.

---

## 7. Add your real logo + favicon

Replace these placeholders:

- `logo/light.svg` — used on the light-theme top bar.
- `logo/dark.svg` — used on the dark-theme top bar.
- `favicon.svg` — browser tab icon.

Upload via Git or the Mintlify web editor. SVGs are best; PNG works.

---

## 8. Authoring workflow going forward

- **Engineers / power users:** edit MDX in their IDE → PR → merge → live.
- **CS / PMs:** Mintlify dashboard → Editor → pick page → edit visually →
  "Save and deploy". This commits to a branch (or `main` directly,
  configurable).

Use Mintlify's components for consistency:

```mdx
<Tip>Pro tip body</Tip>
<Note>Useful aside</Note>
<Warning>Heads-up</Warning>

<Steps>
  <Step title="Open Accounts">…</Step>
</Steps>

<CardGroup cols={2}>
  <Card title="Title" href="/path">Body</Card>
</CardGroup>
```

For status pills and inline UI references, import the snippets:

```mdx
import { Ui } from "/snippets/ui.mdx";
import { Pill } from "/snippets/pill.mdx";

Click <Ui>Save</Ui>, then status flips to <Pill tone="live">Live</Pill>.
```

---

## 9. Optional — turn on the in-product widget

Mintlify's **embeddable widget** is what lets you skip building most of the
OutSystems Help Panel from scratch.

1. Mintlify dashboard → Settings → **Widget** → enable.
2. Copy the script tag they give you (looks like
   `<script src="https://widget.mintlify.com/…"></script>`).
3. Paste it in your OutSystems master layout's `<head>`.
4. In OutSystems, when the user clicks <Ui>Help</Ui>, call
   `MintlifyWidget.open({ context: "LineItem.Add" })` — this surfaces the
   articles tagged with that screen key.
5. Tag MDX files for contextual surfacing by adding a frontmatter property:

   ```mdx
   ---
   title: Adding line items
   "x-screens": ["LineItem.Add", "LineItem.Edit"]
   ---
   ```

---

## 10. Migrating away later (if you ever need to)

Mintlify content is plain MDX in your Git repo. If you ever want to leave:

- The MDX files work in **Docusaurus**, **Nextra**, or **Astro Starlight** with
  minimal changes.
- The `docs.json` nav structure maps cleanly to those tools' config files.
- The `<Tip>`, `<Note>` etc. components have equivalents everywhere — or
  rewrite as Markdown admonitions.

So you're not locked in. The cost is your team's productivity, not your
content.

---

## Troubleshooting

| Symptom                                              | Fix                                                                  |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| Build fails: "missing required field `name`"         | Check `docs.json` — first four fields must be set.                   |
| Custom domain stuck "verifying"                      | Confirm CNAME points to Mintlify's target, with proxying off.        |
| Page 404s after rename                               | Add a redirect in `docs.json` → `redirects: [{ source, destination }]`. |
| Component renders as raw text                        | Forgot the `import` statement at the top of the MDX file.            |
| `mint dev` won't start                               | `mint update` to upgrade the CLI; needs Node ≥ 18.                   |
