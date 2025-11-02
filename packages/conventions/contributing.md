# Contributing Conventions

This document outlines the conventions for contributing to the angelblanco.dev monorepo, including commit message standards, pull request guidelines, and git workflow best practices.

## Commit Message Conventions

### Commit Message Format

We follow a conventional commit style with emojis for visual clarity. Each commit message should follow this structure:

```
[emoji] [type]([optional scope]): [description]

[optional body]
```

### Commit Types

- `feat`: A new feature
- `fix`: A bug fix
- `refactor`: Code changes that neither fix a bug nor add a feature
- `chore`: Changes to build process, dependencies, or tooling
- `docs`: Documentation-only changes
- `test`: Adding or updating tests
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `perf`: Performance improvements
- `ci`: Changes to CI/CD configuration

### Scopes

Scopes help identify which part of the codebase is affected. Common scopes include:

- `deps`: Dependencies
- `seo`: SEO-related changes
- `blog`: Blog-related changes
- `ui`: User interface changes
- `i18n`: Internationalization
- `e2e`: End-to-end tests

### Emojis (Required)

Emojis must be added at the beginning of commit messages for visual clarity, for example:

- `✨` feat: New feature
- `🐛` fix: Bug fix
- `🚀` chore(deps): Dependency updates
- `⚙️` ci: CI/CD changes
- `🎉` feat: Major feature or milestone
- `📚` docs: Documentation
- `♻️` refactor: Code refactoring
- `🧪` test: Testing

### Examples

```bash
# Simple feature
✨ feat(blog): add reading time estimation

# Bug fix with scope
🐛 fix(seo): correct sitemap generation for GitHub Pages

# Dependency update
🚀 chore(deps): upgrade to Node.js 24

# Refactoring
♻️ refactor: enhance UI components and developer experience

# With emoji
✨ feat(blog): add new blog post about Node.js installation
```

### Writing Good Commit Messages

When crafting commit messages:

1. **Review your changes**: Use `git status` and `git diff` to understand what you're committing
2. **Analyze recent commits**: Check `git log` to match the project's style and conventions
3. **Focus on the "why"**: Explain the reasoning behind the change, not just what changed
4. **Be concise**: Keep the subject line under 50 characters when possible
5. **Use the body for details**: Add a blank line after the subject, then provide context if needed

## Pull Request Conventions

### PR Title Format

PR titles should follow the same format as commit messages:

```
[emoji] [type]([optional scope]): [description]
```

When a PR contains multiple commits, the title should reflect the overall purpose of the changes.

### PR Description Template

Every pull request must include:

- Introduction with description.
- bullet points summarizing ALL changes across all diff changes. It must clean inconistencies between commits.
- Focus on the business value and user impact
- Be specific about what was added, changed, or fixed
- If any: Cover edge cases and potential regressions, informing the reviwers of potential RISKS.

### Creating a Pull Request

When creating a pull request, use `master` as [base-branch] by default.

1. **Understand the full scope**: Review ALL commits since diverging from the base branch using `git log` and `git diff [base-branch]...HEAD`
2. **Check current state**: Run `git status` to see tracked/untracked files
3. **Ensure branch is up to date**: Verify your branch tracks a remote and is synced
4. **Push if needed**: Use `git push -u origin [branch-name]` for new branches
5. **Create the PR**: Use `gh pr create` with appropriate title and body
6. **Write a comprehensive summary**: Cover ALL changes across all commits, not just the latest one
