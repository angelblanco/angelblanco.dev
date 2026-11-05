# Review lenses

Apply all four lenses to every post under review. `pnpm blog check --links` already covers schema, parity, fences, heading case, internal links, anchors and dead links, so don't repeat those by eye.

## 1. Technical accuracy

Rank each finding by severity:

- **Critical:** the reader breaks something or is misled. The code doesn't run on the target named in the title, a command is destructive or unsafe, or a fact is wrong.
- **Major:** the code works but is outdated, deprecated or a poor practice, or a needed step or caveat is missing.
- **Minor:** the code works, but a detail is suboptimal or a clarification is missing.

How to check:

- Run every command mentally on a clean install of the exact target (for example Ubuntu 26.04 with no Node.js). Does each command's precondition hold at that point in the post?
- Check every version, date, default, flag and URL in the post against its primary source. Fetch the docs or release notes rather than trusting memory, because your training data predates newer releases. Use context7 for library docs.
- Pin version-specific claims ("since Node.js 25", "from October 28") to a source, and link that source in the post when the reader would want it.
- When a command pipes `curl` into a shell, the post must link the script for review.

## 2. Sources and links

- Every number or date claim should be traceable to a link in the post, or be common knowledge.
- Link the first meaningful mention of each tool or service to its official site or docs. Skip passing mentions and names inside code blocks.
- Prefer primary sources (docs, release notes, changelogs, the project's GitHub) over third-party blogs.
- When a redirect warning points to the canonical page, update the link. If the redirect leaves the version the post is about (for example `nodejs.org/api/…` moving on to a newer release), link the version-pinned page instead (`nodejs.org/docs/latest-v24.x/api/…`).
- When a page is gone, replace it with the current equivalent instead of removing the link.

## 3. Search and sharing

- **Title:** 60 characters or fewer, starts with or contains the phrase readers would search for ("Install Node.js 26 with apt on Ubuntu 26.04"), and has no clickbait.
- **First paragraph:** it doubles as the search snippet, so its first 1-2 sentences must say what the post solves on their own.
- **Tags:** 3-6, lowercase, and reused from existing tags when possible. List them with `grep -h -A8 '^tags' apps/angelblanco.dev/content/blog/*.md`.
- **Headings:** descriptive enough to work in the table of contents and as search sitelinks.
- **Internal links:** link at least one related post when one exists.
- **`image`:** if set, check that the file exists under `apps/angelblanco.dev/public`.

## 4. Reader experience

- **Hook:** would an experienced developer keep reading after the first 2 sentences?
- **Density:** does every paragraph earn its place? Cut repetition, throat-clearing and summaries of what was just said.
- **Skimming:** can a reader skim the headings and code blocks and still succeed?
- **Trade-offs:** are alternatives and limitations stated plainly (for example, why not NVM)?
- **Voice:** check the hard rules in [core-voice](core-voice.md): marketing words, exclamation marks, em dashes, bold overuse, bullet-point prose.
- **Spanish:** does the Spanish version read as native? Check it against [core-spanish](core-spanish.md).

## Report

Keep it short and actionable. Leave out sections that have nothing to report.

```markdown
## Blog review: <slug>

**Fixed** (both languages unless noted)
- 6 typos, 2 headings to sentence case, untranslated comments in ES step 3
- Node.js docs link updated to the canonical URL

**Proposed**
1. Title: "Install Node.js 26 on Ubuntu" → "Install Node.js 26 with apt on Ubuntu 26.04". It adds the search phrase "with apt".
2. EN L42: "This is a really powerful approach that…" → "This keeps Node.js patched by `apt upgrade`." It cuts a marketing word and states the benefit.

**Technical**
- Major, EN L88 / ES L91: `npm config set prefix` must run before installing global packages, but the post installs pnpm first. Swap steps 3 and 4.

**Not verified**
- npmjs.com returned 403 to the checker (bot protection), but the package exists in the registry.

`pnpm blog check 0004 --links`: 0 errors, 1 warning (explained above).
```

<!--
Source references:
- packages/conventions/blog.md
- https://vercel.com/design/guidelines
-->
