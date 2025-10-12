# Blog Post Conventions

This document outlines the conventions for writing and editing blog posts for angelblanco.dev. These guidelines are derived from the project's context and AI command configurations to ensure consistency and quality.

## Guiding Principles

### Audience & Tone

- **Target Audience:** The primary audience is full-stack software developers.
- **Tone:** Content should be professional yet approachable and engaging. The voice is that of a friendly, knowledgeable peer who explains complex topics clearly. A touch of humor is encouraged, but the content should not feel like a dry user manual.

### SEO & Linking

- To improve SEO and provide value, posts **must** include external links to relevant, high-authority sources.
- When mentioning a technology, framework, or tool (e.g., Nuxt, Tailwind CSS), link to its official website or documentation.

## Language & Translation

All blog posts must have both an English and a Spanish version.

- **Synchronization:** The core concepts, structure, and technical information must be consistent across both versions.
- **Spanish Adaptation:** The Spanish post is **not** a literal translation. It must be an idiomatic adaptation for a tech audience from Spain (Castilian Spanish), ensuring it reads naturally.
- **Technical Terminology:**
  - Code blocks (` ``` `) must be identical in both posts and written in English.
  - Common English technical terms (e.g., "commit", "deploy", "frontend") should be kept in English within the Spanish prose, as they are the industry standard.

## Formatting

- **Titles:** Markdown titles must use sentence case, not title case (e.g., `# My new blog post` instead of `# My New Blog Post`).
- **Frontmatter:** All posts must include a valid YAML frontmatter block. See `GEMINI.md` for the schema.

## Embedding File Content with `automd`

To automatically embed and synchronize file content within a blog post, use the `automd` `file` generator. This is useful for keeping code examples or scripts up-to-date.

### Usage

To embed a code file, use the following syntax in your markdown, the file path must be relative to the markdown itself.
The "code" attribute is needed to generate it as a code block. A comment with `\automd` is mandatory as closing tag for the replacement.

```markdown
<!-- automd:file src=".../...path/to/your/file.ts" code lang="ts"-->
<!-- /automd -->
```

### Additional arguments

- `src` (string): The relative path to the file you want to embed.
- `lang` (string): The lang of the markdown file.
- `code` (boolean): Render the file content within a code block.
- `name` (string | boolean): Sets the file name displayed in the code block header. Use `no-name` to disable it.
