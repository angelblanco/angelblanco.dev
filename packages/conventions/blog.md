# Blog Post Conventions

This document outlines the standards for creating and editing blog posts for angelblanco.dev, including content structure, writing style, bilingual requirements, and technical guidelines.

## Overview

The angelblanco.dev blog is a bilingual technical blog targeting full-stack developers. All blog posts are written in both English (en_US) and Spanish (es_ES) (Castilian Spanish from Spain), with synchronized content that maintains the same core ideas while being culturally adapted for each audience.

## File Structure

### Location

Blog posts are stored in the following locations:

- **English posts**: `apps/angelblanco.dev/content/blog/[slug].md`
- **Spanish posts**: `apps/angelblanco.dev/content/es/blog/[slug].md`

### Naming Convention

Posts follow a numerical prefix pattern for ordering:

```
0001.hello.md
0002.install-node-24-on-ubuntu-24.md
0003.your-next-post.md
```

The slug (filename) should be:

- Lowercase
- Hyphen-separated
- Descriptive and SEO-friendly
- Consistent across both languages

## Frontmatter Schema

Every blog post must include YAML frontmatter at the top of the file. The schema is defined in `apps/angelblanco.dev/content.config.ts`:

```yaml
---
title: Your Post Title
tags:
  - tag1
  - tag2
  - tag3
date: YYYY-MM-DD
image: /path/to/optional/image.jpg # Optional if the user provides one
toc: true # Optional, enables table of contents
---
```

### Frontmatter Requirements

- **title**: Minimum 10 characters, descriptive and SEO-optimized
- **tags**: At least 1 tag, use relevant technology keywords
- **date**: ISO format (YYYY-MM-DD), typically the publication date
- **image**: Optional Open Graph image for social sharing
- **toc**: Optional boolean to enable table of contents

## Writing Style and Tone

### Target Audience

Write for experienced full-stack developers who:

- Understand modern web technologies
- Are comfortable with JavaScript/TypeScript
- Work with frameworks like Vue, React, or similar
- Value practical, actionable content

### Tone Guidelines

The tone should be **professional yet approachable and engaging**. Think of it as a friendly and knowledgeable content creator who:

- Communicates complex ideas clearly
- Can bring a smile to the reader's face
- Uses humor appropriately (not forced)
- Avoids sounding like a dry user manual
- Is conversational but not casual
- Respects the reader's time and intelligence

### Writing Principles

1. **Be Clear and Concise**: Get to the point quickly, but don't oversimplify
2. **Show, Don't Just Tell**: Use code examples and practical demonstrations
3. **Provide Context**: Explain the "why" behind technical decisions
4. **Add Value**: Every paragraph should serve a purpose
5. **Be Honest**: Share trade-offs and limitations
6. **Stay Relevant**: Link to official documentation and authoritative sources

### Markdown Title Conventions

Use normal sentence casing for titles, NOT Title Case:

```markdown
✅ CORRECT:

### The easy way

### What about NVM?

### Configure npm's global prefix

❌ INCORRECT:

### The Easy Way

### What About NVM?

### Configure Npm's Global Prefix
```

## Bilingual Content Requirements

### English vs. Spanish

Both language versions must:

- Cover the same core ideas and structure
- Maintain the same technical accuracy
- Include the same code examples
- Link to the same resources

However, the Spanish version is **NOT a literal translation**. It should be:

- Naturally written in Castilian Spanish (español de España, es-ES)
- Culturally adapted for Spanish-speaking tech audiences
- Idiomatic and fluent, not robotic

### Technical Terms in Spanish

Use common English technical terms when they are industry standard in the Spanish-speaking world:

```markdown
✅ Use these English terms in Spanish posts:

- commit
- deploy
- frontend / backend
- script
- framework
- build
- setup
- repository
- pull request
- open source

❌ Don't over-translate:

- "despliegue" (use "deploy" instead)
- "repositorio" is fine, but "repo" is also acceptable
- "interfaz de usuario" → use "UI" or "frontend"
```

### Code Blocks

#### In Both Languages

- All code must be written in English
- Variable names, function names, and keywords remain in English
- Bash commands and scripts are identical

#### Spanish-Specific Rules

- **Code comments MUST be translated to Spanish**

Example:

**English:**

```bash
# Update dependencies and add NodeSource repository
sudo apt update
sudo apt install -y ca-certificates curl gnupg
```

**Spanish:**

```bash
# Actualizar dependencias y añadir el repositorio de NodeSource
sudo apt update
sudo apt install -y ca-certificates curl gnupg
```

## SEO and External Linking

### Link to Authoritative Sources

To improve SEO and provide value to readers, always link to official documentation and high-authority resources when mentioning:

- Technologies (e.g., [Node.js](https://nodejs.org/))
- Frameworks (e.g., [Nuxt](https://nuxt.com/), [Vue](https://vuejs.org/))
- Tools (e.g., [Tailwind CSS](https://tailwindcss.com/))
- Package managers (e.g., [pnpm](https://pnpm.io/), [Yarn](https://yarnpkg.com/))
- Services (e.g., [GitHub](https://github.com/), [NodeSource](https://nodesource.com/))

### SEO Best Practices

- Use descriptive titles with relevant keywords
- Include meta descriptions (via frontmatter or first paragraph)
- Use proper heading hierarchy (H1 → H2 → H3)
- Add alt text to images
- Use internal links to other blog posts when relevant
- Optimize slugs for search engines

## Content Structure

### Recommended Post Structure

1. **Introduction** (1-2 paragraphs)
   - Hook the reader
   - Explain the problem or topic
   - Preview what they'll learn

2. **Main Content**
   - Break into logical sections with H2/H3 headings
   - Use code blocks liberally
   - Include explanatory prose between code snippets
   - Add visual breaks (images, diagrams, quotes)

3. **Practical Examples**
   - Show working code
   - Provide step-by-step instructions
   - Include common pitfalls and solutions

4. **Conclusion** (optional)
   - Summarize key takeaways
   - Suggest next steps or related topics
   - Encourage feedback or questions

### Code Block Best Practices

Use code fences with language identifiers:

````markdown
```bash
npm install
```
````

```typescript
interface User {
  name: string;
  email: string;
}
```

```vue
<script setup lang="ts">
const count = ref(0);
</script>
```

````

Add file names or descriptions when helpful:

```markdown
```bash [install.sh]
#!/bin/bash
npm install
````

````

## Embedding File Content with `automd`

To automatically embed and synchronize file content within a blog post, use the `automd` `file` generator. This is useful for keeping code examples or scripts up-to-date, if we are referencing code of this repository itself. `automd` blocks MUST NOT be modified by anyone.

### Usage

To embed a code file, use the following syntax in your markdown. The file path must be relative to the markdown itself. The "code" attribute is needed to generate it as a code block. A comment with `\automd` is mandatory as closing tag for the replacement.

```markdown
<!-- automd:file src="../../public/scripts/ubuntu-install-node-24.sh" code lang="bash" -->
<!-- /automd -->
````

### Additional Arguments

- `src` (string): The relative path to the file you want to embed
- `lang` (string): The language of the code block
- `code` (boolean): Render the file content within a code block
- `name` (string | boolean): Sets the file name displayed in the code block header. Use `no-name` to disable it

### When to Use automd

- Embedding shell scripts stored in `public/scripts/`
- Including configuration files
- Showing example code that's tested and maintained elsewhere or in this repo itself. Try not to copy code from the blog, if you can use automd instead.
- Keeping blog content in sync with actual code

## Writing and Editing Workflow

### Creating a New Blog Post

When creating a new blog post:

1. **Choose a descriptive slug**: Use lowercase, hyphen-separated format (e.g., `install-node-24-on-ubuntu-24`)
2. **Create both language files**:
   - English: `apps/angelblanco.dev/content/blog/[slug].md`
   - Spanish: `apps/angelblanco.dev/content/es/blog/[slug].md`
3. **Write valid frontmatter**: Follow the schema defined in `apps/angelblanco.dev/content.config.ts`
4. **Write content following conventions**: Apply all tone, style, and technical guidelines
5. **Add external links**: Link to official documentation for all mentioned technologies
6. **Synchronize both versions**: Ensure core ideas and structure match across languages

### Refining an Existing Blog Post

When proofreading and editing existing posts:

1. **Read both language versions carefully**
2. **Correct objective errors only**:
   - Spelling mistakes
   - Punctuation errors
   - Grammatical errors
   - Inconsistent terminology
3. **Preserve the author's voice**: Don't rewrite for style if grammatically correct
4. **Don't alter structure**: Keep paragraphs and sections in their original order
5. **Leave frontmatter unchanged**: Only fix clear typos in string values
6. **Don't modify code blocks**: Keep all code examples as-is

## Content Quality Checklist

Before publishing a blog post, ensure:

- [ ] Linter passes. Run `pnpm lint:fix` to ensure properly linted code blocks.
- [ ] Both English and Spanish versions exist
- [ ] Frontmatter is complete and valid
- [ ] Title is descriptive and SEO-optimized (min 10 characters)
- [ ] At least one tag is assigned
- [ ] Date is in ISO format (YYYY-MM-DD)
- [ ] Headings use normal casing, not Title Case
- [ ] Code blocks have language identifiers
- [ ] Code comments are in Spanish in the Spanish version
- [ ] External links to official documentation are included
- [ ] Content is synchronized between both languages
- [ ] Tone is professional yet approachable
- [ ] Technical accuracy has been verified
- [ ] No spelling or grammar errors
- [ ] Images have alt text (if applicable)
- [ ] automd directives are correctly formatted (if used) and automd works.

## Language-Specific Proofreading

### English (US)

- Use American English spelling (e.g., "color", "optimize")
- Follow standard US punctuation rules
- Use Oxford comma for lists

### Spanish (Castilian, es-ES)

- Use español de España spelling and conventions
- Use "vosotros" forms when appropriate (informal plural)
- Follow RAE (Real Academia Española) grammar rules
- Use inverted question and exclamation marks (¿?, ¡!)

## Examples

### Good Blog Post Example

See `apps/angelblanco.dev/content/blog/0002.install-node-24-on-ubuntu-24.md` for a well-structured example that demonstrates:

- Clear introduction with context
- Practical code examples
- Step-by-step instructions
- External links to official docs
- Embedded script using automd
- Conversational yet professional tone
- Proper heading structure

## Additional Resources

- [Content Schema Definition](../../apps/angelblanco.dev/content.config.ts)
- [Nuxt Content Documentation](https://content.nuxt.com/)
- [automd Documentation](https://github.com/unjs/automd)
