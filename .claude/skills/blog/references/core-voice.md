# Voice and structure

How Ángel writes. These rules apply to both languages; [core-spanish](core-spanish.md) adds what is specific to Spanish.

## Hard rules

1. Open with the fact, the news or the problem. Never with "In this post I will…", "Have you ever…?" or a definition of the technology.
2. No marketing words: game-changer, leverage, seamless, robust, powerful, supercharge, unlock, cutting-edge, comprehensive, delve, effortless, "in today's fast-paced world".
3. No emojis and no exclamation marks in prose or headings.
4. No em dashes (—). Use a colon, a comma, parentheses or a new sentence.
5. Bold at most once per section, for the one fact the reader must not miss (in 0004: **Corepack is no longer bundled with Node.js**).
6. Headings use sentence case and say what the section gives the reader. Use one level for sections and the next level for steps inside a section, without skipping levels.
7. Write prose, not bullet points. Use a list only for real sequences or sets (steps, options), and never as bold label + colon on every item.
8. Don't hedge ("I think maybe", "it might be possible that"). State the fact or the opinion, and give the trade-off plainly.

## Voice

- Use first person singular for experience and choices: "I took the simplest route and now install pnpm with its own standalone installer."
- Use second person for the reader, with instructions in the imperative: "Then add it to your `PATH`."
- Use contractions in English: it's, don't, won't, you're.
- Keep paragraphs to 1-4 sentences. Mix short sentences with medium ones.
- Allow at most one dry remark per section, and only when it's true and useful. It must never be forced: "Running random scripts from the internet is a fun hobby until it isn't."
- Be concrete: "ten vulnerabilities, four of them rated high", not "several serious issues".
- Respect the reader's level. They are experienced full-stack developers, so don't explain what npm, `PATH` or a terminal is.

## Structure

**Opening (2-3 short paragraphs).** The first sentence is why this matters now. The second paragraph says what the reader will do about it. If there's an earlier related post, link it here.

**Facts at a glance.** Put versions, dates and support windows in a small table, not in prose.

**Body.** One idea per section.

- Introduce code with one sentence that says what it does ("Then add the NodeSource repository for Node.js 26:").
- After code, explain only the non-obvious why (what the apt pin is for, or why `sudo -E`). Don't narrate the code back.
- Use one command block per step in step-by-step guides, with numbered headings ("#### 1. Install Node.js and npm").
- Offer the shortcut first ("The easy way") and the manual steps after.
- Link the first meaningful mention of each tool to its official docs, and only once. Weave links into the sentence: "install it with its [standalone script](…)", never "click [here](…)".

**Closing.** No "In conclusion" summary of what was just read. End with the practical next step (how to keep it updated, what to do next) or one short line the reader will remember. Close on the main idea, not on a call to subscribe.

## Post types

- **How-to:** problem and context, the shortcut, the step-by-step guide, how to maintain it, closing.
- **Opinion or decision:** the real situation that prompted it, the argument (one aspect per section), the other side stated fairly, the practical takeaway.
- **Project or package announcement:** the problem it solves, basic usage with code, one section per main feature, links to the repo and docs.
- **Story:** the experience, the technical details woven in, what you learned.

## Copy details

- Use numerals for counts and versions: "8 steps", "Node.js 26".
- Put a space between a number and its unit: "10 MB", "600 ms".
- Use backticks for commands, file names, packages, flags, env vars and config keys: `pnpm audit`, `~/.npmrc`, `--frozen-lockfile`.
- Keep terms consistent: once you pick "script", "repository" or "global prefix", don't switch to synonyms.
- Write in the active voice: "The script asks for confirmation", not "Confirmation will be requested".
- Write alt text that describes what the image shows, not "image" or "screenshot".
- Use the ellipsis character `…` in prose, not three dots.

<!--
Source references:
- apps/angelblanco.dev/content/blog/0004.apt-install-node-26-on-ubuntu-26.md
- packages/conventions/blog.md
- https://github.com/freekmurze/dotfiles/tree/main/config/claude/skills/write-freek-dev-blogpost
- https://vercel.com/design/guidelines
-->
