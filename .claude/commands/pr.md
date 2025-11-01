---
description: Create a pull request
allowed-tools: Bash(git *), Bash(gh *), Bash(pnpm *)
---

**Current branch**: !`git branch --show-current`

**Unstaged changes**: !`git diff --stat`

**Branch status**: !`git fetch origin && git status`

If unstaged changes exist: Review and ask user if they should be committed or were forgotten. ABORT if user needs to commit them first.

If branch is behind `master`: ABORT and suggest running `git merge master` first to update the branch.

**Linting**
If git looks ready, run the linter and observe if it passes. CI will do the tests, typecheck, etc.
`pnpm lint:fix > /dev/null 2>&1 && echo "OK" || echo "ERROR"`

If output is ERROR: ABORT and ask user to fix linting issues first or if assistance to fix is needed.

Otherwise: Proceed with PR creation using `gh pr create` following @packages/conventions/contributing.md format following user instructions.

$ARGUMENTS
