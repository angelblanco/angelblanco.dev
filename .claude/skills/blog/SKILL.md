---
name: blog
description: Writes, updates, translates and reviews the bilingual (English and Castilian Spanish) blog posts of angelblanco.dev in Ángel Blanco's voice, and validates them with `pnpm blog check`. Use when drafting a new post, editing or proofreading an existing one, syncing the Spanish version, checking links and technical claims, or getting posts ready to publish.
metadata:
  author: Ángel Blanco
  version: "2026.11.05"
---

# Blog

Every post is a pair with the same file name:

- EN: `apps/angelblanco.dev/content/blog/NNNN.slug.md`
- ES: `apps/angelblanco.dev/content/es/blog/NNNN.slug.md`

[packages/conventions/blog.md](../../../packages/conventions/blog.md) holds the rules and `apps/angelblanco.dev/content.config.ts` the schema. `pnpm blog check` enforces everything mechanical, so spend your attention on what a script can't judge: facts, clarity and voice.

The newest post (highest `NNNN`) is the style model.

## Workflow

Work out what the user wants, do it end to end, then run [Finish](#finish). There are no review phases or checkpoints: fix what is objective, propose what is subjective, and report once.

### Write a new post

1. Get the topic, the angle and any must-have code or links. Ask only for what is missing, in a single question. Don't ask for what the repo or the web can tell you.
2. Research before writing. Every version, date, flag and number in the post needs a primary source: official docs, release notes or changelogs. Fetch them and keep the URL next to each fact.
3. Number the file as the highest `NNNN` + 1. Make the slug the phrase readers would search for.
4. Write the English version following [core-voice](references/core-voice.md).
5. Write the Spanish version as an adaptation, following [core-spanish](references/core-spanish.md). Never translate sentence by sentence.
6. Put scripts readers will run in `apps/angelblanco.dev/public/scripts/` and embed them with automd. Don't paste them into the post.

### Update or edit a post

Change both languages in the same pass. For substantive content changes, set `updatedAt` to today in both versions and keep `date`. Typo fixes don't need `updatedAt`.

### Review a post

This is the default when the user says "review", "check" or "proofread", or names posts without a task. The target is the posts named; otherwise it's the posts changed against `master`, which `pnpm blog check` finds when given no arguments.

Read both versions in full, then apply every lens in [best-practices-review](references/best-practices-review.md).

- **Fix directly** anything objective. This covers:
  - spelling, grammar, punctuation, Spanish calques and heading case
  - missing fence languages, untranslated comments and broken links
  - frontmatter drift between languages and missing official docs links
  - Spanish content that lags behind the English, including missing code blocks
  - wrong commands
  - facts that are wrong or out of date. Make the smallest edit that makes the fact true and set `updatedAt`.
- **Propose, don't apply**, anything that changes the author's argument, voice, title, slug or structure, including rewriting a paragraph around a corrected fact. Show the current text, the suggestion and a one-line reason.
- **Never change** the numeric prefix, slug or `date` of a published post: they are its URL and its history.

Verifying technical claims is independent work per claim. Verify up to about 10 claims yourself. For more than that, give each group of claims that shares a source to a parallel subagent, with the claim, the line and the source to check, and ask for a verdict plus the URL. Verify by reading primary sources; don't spin up containers or VMs unless the user asks. List whatever stays unconfirmed under "Not verified".

## Finish

Run this for every task, in this order. Repeat the check after every fix until it reports no errors:

```
- [ ] pnpm automd                         # in apps/angelblanco.dev, only if an automd source changed
- [ ] pnpm lint:fix                       # reformats code blocks and tables inside the markdown
- [ ] pnpm blog check <slug> --links     # fix every ERROR, judge every WARN, re-run
- [ ] Re-read both versions top to bottom as a reader would
```

`<slug>` can be the route (`install-node-24-on-ubuntu-24`), the number (`0002`) or the path. Add `--all` to check every post.

Then report briefly: what you fixed (grouped, not line by line), what you propose, and what you could not verify. Don't commit unless asked.

## Gotchas

- **automd blocks are generated.** Everything between `<!-- automd:file src="…" -->` and `<!-- /automd -->` is copied from `src`, resolved relative to the post. Edit the source file, then run `pnpm automd` in `apps/angelblanco.dev`. In scripts, touch only comments and `echo` text. The embedded copy keeps its English comments in the Spanish post too.
- **Internal links drop the numeric prefix and end with a slash.** `0002.install-node-24-on-ubuntu-24.md` is `/blog/install-node-24-on-ubuntu-24/` in English and `/es/blog/install-node-24-on-ubuntu-24/` in Spanish (anchors go after the slash: `/blog/install-node-24-on-ubuntu-24/#what-about-nvm`). Without it GitHub Pages answers with a 301 and the build's link checker warns.
- **Anchors come from the translated heading** and keep accents: EN `#what-about-nvm`, ES `#y-qué-hay-de-nvm`. Before you rename a heading, run `grep -rn '#old-anchor' apps/angelblanco.dev/content`, because other posts may link to it. Then update every link in both languages.
- **Frontmatter is shared.** `tags`, `date`, `updatedAt`, `image` and `toc` are identical in both versions; only `title` is translated. Quote a title that contains a colon.
- **Localized external links are fine.** Link `nodejs.org/en/…` in EN and `nodejs.org/es/…` in ES when the Spanish page exists; the checker treats them as the same link.
- **GitHub repo cards** use the MDC component `::github-repo-preview{repo="owner/name" description="…"}`, closed by `::` on the next line.
- **Write absolute dates.** Posts are read for years, so write "since October 28, 2026", not "last week". Check every "latest", "current" or "LTS" claim against today's date.
- **The pre-commit hook runs `pnpm lint:fix`.** It realigns markdown tables and reformats code, so run it before your final re-read to keep the diff stable.
