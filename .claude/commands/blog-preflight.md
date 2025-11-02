---
description: Run comprehensive blog post quality checks using specialized agents in interactive checkpoints
allowed-tools: Bash(git *), Read, Task
model: sonnet
---

You are orchestrating a comprehensive blog post quality assurance workflow. Your goal is to systematically review all modified blog posts in the current branch using specialized agents, with interactive checkpoints for user review.

## Overview

This workflow runs 6 specialized agents across 4 interactive checkpoints:

1. **Checkpoint 1**: Auto-fix typos (parallel)
2. **Checkpoint 2**: Review technical, SEO, and links (parallel)
3. **Checkpoint 3**: Check translation consistency (sequential)
4. **Checkpoint 4**: Review engagement and tone (sequential)

## Step 1: Detect Modified Blog Posts

**Current branch**: !`git branch --show-current`
**Modified blog files**: !`git diff --name-only master...HEAD | grep -E 'content/(es/)?blog/.*\.md$' || echo "No blog posts modified"`

If NO blog posts are modified:

- STOP and inform user: "No blog posts found in current branch changes. Nothing to review."
- Exit gracefully

If blog posts ARE found:

- List them clearly
- Identify EN/ES pairs
- Proceed to Checkpoint 1

## Step 2: CHECKPOINT 1 - Typo Fixing (Parallel, Auto-fix)

**Goal**: Automatically fix spelling, grammar, and punctuation errors.

**Action**:

```
Run the blog-typo-fixer agent on all modified blog posts (both EN and ES versions).
Process all files in a single agent call for efficiency.
```

**After agent completes**:

- Display summary of fixes made
- Ask user: "Checkpoint 1 complete. Typos have been auto-fixed. Ready to proceed to Checkpoint 2 (Technical, SEO, and Link Review)? [yes/no]"
- If no: STOP and inform user they can run individual agents manually
- If yes: Proceed to Checkpoint 2

## Step 3: CHECKPOINT 2 - Technical, SEO & Links (Parallel, Reports)

**Goal**: Review technical accuracy, optimize SEO, and verify all links.

**Action**:

```
Run these THREE agents in PARALLEL on all modified blog posts:
1. blog-technical-reviewer - Check code accuracy and best practices
2. blog-seo-optimizer - Optimize SEO elements (hybrid: auto-fix + report)
3. blog-link-verifier - Verify external links and documentation

IMPORTANT: You MUST invoke these agents in parallel using a single message with multiple Task tool calls.
```

**After agents complete**:

- Consolidate findings from all three agents
- Display summary:
  - Technical issues found (by severity)
  - SEO optimizations made and suggested
  - Link status (broken, warnings, missing docs)
- Highlight CRITICAL issues that must be addressed
- Ask user: "Checkpoint 2 complete. Review the findings above. Ready to proceed to Checkpoint 3 (Translation Consistency)? [yes/no]"
- If no: STOP and allow user to address issues
- If yes: Proceed to Checkpoint 3

## Step 4: CHECKPOINT 3 - Translation Consistency (Sequential)

**Goal**: Ensure EN/ES versions are synchronized.

**Action**:

```
Run the blog-spanish-writer agent on EN/ES blog post pairs.
This must check both language versions together for consistency.
```

**After agent completes**:

- Display consistency report
- Highlight:
  - Structure differences
  - Missing translations in code comments
  - Content discrepancies
  - Metadata inconsistencies
- Ask user: "Checkpoint 3 complete. Review translation consistency above. Ready to proceed to Checkpoint 4 (Engagement Review)? [yes/no]"
- If no: STOP and allow user to address issues
- If yes: Proceed to Checkpoint 4

## Step 5: CHECKPOINT 4 - Engagement & Polish (Sequential, Final)

**Goal**: Final polish for tone, voice, and reader engagement.

**Action**:

```
Run the blog-engagement-reviewer agent on all modified blog posts.
This is the final quality check before publishing.
```

**After agent completes**:

- Display engagement report
- Highlight:
  - Tone assessment
  - Top 3 recommendations
  - Overall engagement score
- Generate FINAL SUMMARY (see below)

## Step 6: FINAL SUMMARY

After all checkpoints complete, provide:

```markdown
# Blog Preflight Complete ✅

## Files Reviewed

- [List of all blog post files]

## Checkpoints Summary

### ✅ Checkpoint 1: Typo Fixing

- Files processed: [number]
- Corrections made: [number]
- Status: COMPLETE

### ✅ Checkpoint 2: Technical, SEO & Links

- Technical issues: [number] (Critical: X, Major: Y, Minor: Z)
- SEO optimizations: [number auto-fixed, number suggested]
- Links: [number OK, number broken, number warnings]
- Status: [PASS / NEEDS ATTENTION]

### ✅ Checkpoint 3: Translation Consistency

- Post pairs reviewed: [number]
- Issues found: [number]
- Status: [CONSISTENT / NEEDS REVISION]

### ✅ Checkpoint 4: Engagement Review

- Overall engagement: [score]
- Top recommendations: [summary]
- Status: [EXCELLENT / GOOD / NEEDS IMPROVEMENT]

## Action Items

### 🚨 Critical (Must Fix)

- [List critical issues from all checkpoints]

### ⚠️ Important (Should Fix)

- [List major issues and important suggestions]

### 💡 Suggestions (Optional)

- [List minor improvements and optimizations]

## Next Steps

1. Review and address critical and important action items
2. Consider optional suggestions for maximum impact
3. Run `pnpm lint:fix` to ensure code blocks are properly formatted
4. Test any modified code examples
5. When ready: `/commit` to stage changes
6. When ready: `/create-pr` to create pull request

## Quality Assessment

- Overall Status: [READY TO PUBLISH / NEEDS REVISION / NEEDS MAJOR WORK]
- Confidence Level: [HIGH / MEDIUM / LOW]
```

## Important Guidelines

### Agent Invocation

- **Parallel execution**: Use a single message with multiple Task tool calls for Checkpoint 2
- **Sequential execution**: Run one agent at a time for Checkpoints 1, 3, 4
- **Explicit agent names**: Use exact agent names (blog-typo-fixer, blog-technical-reviewer, etc.)

### User Interaction

- **Interactive checkpoints**: ALWAYS ask user before proceeding to next checkpoint
- **Clear summaries**: Provide concise but complete summaries after each checkpoint
- **Highlight critical issues**: Make critical problems obvious and actionable
- **Respectful of time**: Don't overwhelm with detail, but provide enough context

### Error Handling

- If an agent fails: Report the error, continue with other agents if possible
- If no blog posts found: Exit gracefully with helpful message
- If user says "no" at checkpoint: Provide guidance on running individual agents

### Output Quality

- Use clear formatting (headers, lists, emphasis)
- Provide file paths and line numbers for issues
- Make action items specific and actionable
- Prioritize findings by severity

## Edge Cases

**Only one language version modified:**

- Still run translation-consistency check
- Note which version is missing changes

**Very large number of issues:**

- Group similar issues together
- Focus summary on highest priority items
- Suggest addressing critical issues before continuing

**User wants to skip a checkpoint:**

- Allow it, but warn about implications
- Suggest which checkpoints are most critical

**Agents report conflicting suggestions:**

- Note the conflict in summary
- Provide your recommendation
- Let user decide

## Example Interaction Flow

```
User runs: /blog-preflight

[Step 1: Detect files]
Found 2 modified blog posts:
- apps/angelblanco.dev/content/blog/0003.new-post.md
- apps/angelblanco.dev/content/es/blog/0003.new-post.md

[Step 2: Checkpoint 1]
Running blog-typo-fixer...
✅ Fixed 8 typos across 2 files
Ready to proceed to Checkpoint 2? [User says yes]

[Step 3: Checkpoint 2]
Running technical review, SEO optimization, and link verification in parallel...
✅ Technical: 1 major issue found
✅ SEO: 3 optimizations made, 2 suggestions
✅ Links: All verified, 2 missing docs links
Ready to proceed to Checkpoint 3? [User says yes]

[Step 4: Checkpoint 3]
Running translation consistency check...
✅ Structure matches, 3 code comments need translation
Ready to proceed to Checkpoint 4? [User says yes]

[Step 5: Checkpoint 4]
Running engagement review...
✅ Good tone overall, 2 suggestions for improvement

[Step 6: Final Summary]
[Comprehensive summary with all findings and next steps]
```

## Integration with Conventions

This workflow enforces standards from:

- @packages/conventions/blog.md - All blog post conventions
- @packages/conventions/contributing.md - Commit and PR guidelines

Ensure all suggestions align with these conventions.

---

**Remember**: Your role is to orchestrate, summarize, and guide. The specialized agents do the detailed work. Keep the user informed, engaged, and in control at each checkpoint.

$ARGUMENTS
