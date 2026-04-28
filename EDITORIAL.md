# Editorial guide

A short reference for everyone writing Uplift Hub docs. Stick to these and the
site stays consistent.

## Voice

- **Second person, active voice.** "Open the campaign, then click Save."
  Not "the campaign should be opened by the user".
- **Present tense.** "Pacing shows…" — not "Pacing will show…".
- **British English.** "Customise", "organise", "behaviour".

## Structure for any "how to" page

1. **One-line description** in frontmatter.
2. **Lead paragraph** — what this is and when you'd do it.
3. **Steps** in a `<Steps>` block.
4. **Optional `<Tip>` / `<Note>` / `<Warning>`** for caveats.
5. **Screenshot** in a `<Frame>` if it materially helps.

Avoid "Introduction", "Conclusion", "Overview" headings — the lead paragraph
covers them.

## Component cheat sheet

| Component                              | Use for                                  |
| -------------------------------------- | ---------------------------------------- |
| `<Tip>`                                | Helpful pro-tip — green                  |
| `<Note>`                               | Neutral aside — blue                     |
| `<Warning>`                            | Heads-up / known issue — yellow/red      |
| `<Steps>` + `<Step title="…">`         | Numbered procedure                       |
| `<CardGroup cols={2}>` + `<Card>`      | Landing page / hub page link grid        |
| `<AccordionGroup>` + `<Accordion>`     | FAQ, glossary, anything browsable        |
| `<Frame caption="…">`                  | Screenshot wrapper                       |
| `<Ui>Save</Ui>` (snippet)              | Inline UI reference (button name etc.)   |
| `<Pill tone="live">Live</Pill>`        | Status pill matching product UI          |

## Naming UI elements

- **Bold** for screen names: "Open the **Campaigns** screen."
- **`<Ui>`** for clickable elements: "Click <Ui>Add new line item</Ui>."
- Backticks for field values: "Set **Type** to `Custom`."

## Linking

- Internal links use absolute paths: `/setup/add-account` (no `.mdx`).
- External links use full URLs and open in the same tab unless they leave the
  product.

## Screenshots

- Save under `images/` at the project root.
- 2× resolution preferred (Mintlify downscales for retina).
- Trim to the relevant area; full-app shots are usually too small to read.
- Use `<Frame caption="…">` to caption.

## Code samples

````
```ts
const x = 1;
```
````

Always include the language. Mintlify highlights JS/TS/JSON/Bash/HTTP cleanly.

## When in doubt

Match the tone of the **Setup** section pages. They're the canonical example.
