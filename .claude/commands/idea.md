---
description: Convert an idea into a new bilingual blog post following project conventions.
allowed-tools: Bash(ls apps/angelblanco.dev/content/blog/*), Read, Write
---

Turn the following idea into a complete bilingual blog post: **$ARGUMENTS**

## Context

**Existing posts**: !`ls apps/angelblanco.dev/content/blog/*.md | sort`

Determine the next sequential 4-digit number from the list above and derive a descriptive, SEO-friendly slug from the idea.

## Task

Create both files following **all** conventions in @packages/conventions/blog.md:

- `apps/angelblanco.dev/content/blog/[NNNN].[slug].md` — English
- `apps/angelblanco.dev/content/es/blog/[NNNN].[slug].md` — Spanish (Castilian, naturally written — NOT a literal translation)

Use the good example at `apps/angelblanco.dev/content/blog/0002.install-node-24-on-ubuntu-24.md` as structural reference.

Once done, remind the user to run `/blog-preflight` for quality review.
