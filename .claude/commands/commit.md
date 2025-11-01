---
description: Create a git commit of all changes staged and unstaged.
allowed-tools: Bash(git *)
---

**Current branch**: !`git branch --show-current`

If current branch is `master` or `main`: ABORT and inform user to create a new branch with a name suggestion (e.g., `git checkout -b my-awesome-branch`), then retry `/commit`.

**Unstaged changes**: !`git diff --stat`

Review unstaged files. If large files (>100KB) or unintended files detected, ABORT and inform user to review changes before staging.

Otherwise: Stage all changes (`git add -A`) and create a commit following @packages/conventions/contributing.md and user instructions.

$ARGUMENTS
