# Spanish version

The Spanish post is an adaptation into Castilian Spanish (es-ES) that reads as if it had been written in Spanish first. It must carry the same facts, code, links and structure as the English one.

## Must match the English version

- Sections, their order and their heading levels
- Every code block, with identical code (only comments change)
- Every fact, number, date and recommendation
- External links (or their localized equivalent page)
- Frontmatter, except `title`

## Must differ from the English version

- **Sentences.** Rebuild each paragraph in natural Spanish; the sentence count can differ.
- **Idioms.** Use Spanish equivalents, or drop them. "Don't panic" becomes "tranquilidad", and "a fun hobby until it isn't" needs a Spanish joke that works, or none.
- **Code comments.** Translate them, except inside automd blocks.
- **Dates.** Write "5 de mayo de 2026". Months and weekdays are lowercase.
- **Headings.** Translate them in sentence case, which changes their anchors (see the Gotchas in SKILL.md).
- **Internal links.** Point them to `/es/blog/…`.

## Register

- Address the reader as **tú** ("tu ordenador", "si usas Yarn"). Not usted, not vosotros.
- Apply RAE spelling and punctuation, opening `¿` and `¡` included.
- Use Spain's vocabulary: ordenador (not computadora), vale, móvil, fichero or archivo.

## Technical terms

Keep the English term when Spanish developers say it in English: commit, deploy, script, framework, build, setup, pull request, open source, frontend, backend, release, runtime, LTS. Don't force translations like "despliegue" for deploy or "interfaz de usuario" for UI.

Translate when Spanish has a natural term: repositorio, paquete, gestor de paquetes, actualizar, instalar, variable de entorno, prefijo global, versión.

## Calques to fix

| Literal (wrong) | Natural |
|---|---|
| es por eso que | por eso |
| eventualmente (for "eventually") | al final, con el tiempo |
| asumir (for "assume") | suponer, dar por hecho |
| soportar Node.js 26 | ser compatible con Node.js 26, admitir |
| remover | quitar, eliminar |
| es instalado por el script | el script lo instala, se instala |
| en orden de | para |
| aplicar para | solicitar |
| Los Pasos Siguientes (title case) | Los pasos siguientes |
| a partir de ahora en adelante | a partir de ahora |
| el mismo (as a pronoun: "instala el mismo") | lo, este |

Watch for chains of gerunds ("instalando… configurando…") and possessives that English needs but Spanish doesn't ("abre tu terminal y escribe tu comando" becomes "abre la terminal y escribe el comando").

## Before you finish

Read the Spanish version aloud in your head without looking at the English one. Rewrite any sentence that sounds translated.

<!--
Source references:
- apps/angelblanco.dev/content/es/blog/0004.apt-install-node-26-on-ubuntu-26.md
- packages/conventions/blog.md
- https://www.rae.es/dpd
-->
