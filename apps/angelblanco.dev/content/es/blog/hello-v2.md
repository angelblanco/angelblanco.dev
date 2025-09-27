---
title: "De Svelte a Nuxt: Reconstruyendo Mi Portfolio en 2025"
date: '2025-09-27'
tags: ['nuxt', 'vue', 'svelte', 'turborepo', 'tailwindcss', 'daisyui']
post_id: 1
toc: true
share_tweet: "He reconstruido mi portfolio, pasando de Svelte a un stack moderno con Nuxt, Tailwind CSS y Turborepo. Aquí te cuento el porqué y el cómo."
---

Estamos en 2025 y acabo de lanzar una reconstrucción completa de mi web personal. He migrado de un stack basado en [Svelte / Kit (Sapper)](https://svelte.dev/) a una configuración moderna con [Nuxt](https://nuxt.com/), [Tailwind CSS](https://tailwindcss.com/) y un [Turborepo](https://turbo.build/repo). No ha sido solo un cambio estético; ha sido una decisión estratégica, impulsada por cinco años de evolución en el panorama frontend y el deseo de alinear mis proyectos personales con mi flujo de trabajo profesional diario.

## La Decisión de 2020: ¿Por Qué Svelte?

En 2020, cuando construí la primera versión de esta web, el ecosistema de Vue se encontraba en un estado de cambio masivo. Vue 3 acababa de ser lanzado, pero las herramientas eran inmaduras y Nuxt aún no estaba listo. El camino de migración desde Vue 2 era incierto y, francamente, el futuro parecía un poco inestable.

En ese momento, Svelte y su framework compañero, Sapper, ofrecían una alternativa convincente. Era rápido, sencillo y proporcionaba una experiencia de desarrollo estable y con visión de futuro. Fue la elección correcta para su momento.

## El Punto de Inflexión: Ecosistema vs. DIY

Cinco años después, las tornas han cambiado drásticamente. Aunque Svelte sigue siendo un framework fantástico, el ecosistema de Nuxt ha florecido hasta convertirse en una potencia. Este fue el principal motor de mi migración.

Con mi antiguo sitio de Sapper, tuve que construir muchas funcionalidades desde cero: generación de metaetiquetas para SEO, gestión de contenido para el blog y optimización de imágenes. Aunque aprendí mucho, mantener ese código personalizado se convirtió en una tarea pesada. Además, la migración de Sapper a SvelteKit resultó ser una empresa importante que simplemente no tuve el tiempo libre para gestionar.

Nuxt, por otro lado, ofrece un rico ecosistema de módulos que se encargan de estos problemas de fábrica:

- **[@nuxt/content](https://content.nuxt.com/):** Para una gestión de contenidos basada en archivos y sin esfuerzo.
- **[@nuxt/seo](https://nuxt.com/modules/seo):** Para un manejo robusto de SEO y metadatos.
- **[@nuxt/image](https://image.nuxt.com/):** Para una optimización de imágenes de primera clase.

Estas herramientas maduras me permiten centrarme en lo que más importa: crear contenido, no reinventar la rueda.

## Alineación con Mi Flujo de Trabajo Diario

Mi trabajo diario se centra en Vue 3, TypeScript y la Composition API. Tiene mucho sentido que mi plataforma personal esté construida con las mismas tecnologías que uso y amo profesionalmente. Trabajar con Nuxt me resulta natural, sencillo e increíblemente potente, lo que me permite aprovechar mi experiencia existente.

## Un Vistazo al Nuevo Stack

- **[Nuxt](https://nuxt.com/):** El núcleo de la aplicación, que proporciona un framework ágil y potente basado en Vue.
- **[Tailwind CSS](https://tailwindcss.com/):** Para un estilo *utility-first*, que permite un desarrollo de interfaz de usuario rápido y coherente.
- **[Turborepo](https://turbo.build/repo):** Para gestionar la estructura del monorepo, que mantiene organizadas la aplicación principal, las configuraciones compartidas y las herramientas internas.

### De Bulma a Tailwind CSS & DaisyUI

En la versión anterior de mi web, usaba [Bulma](https://bulma.io/), y es una librería de CSS realmente genial. Sin embargo, mi flujo de trabajo diario está profundamente arraigado en Tailwind CSS. Descubrí que usar un conjunto predefinido de utilidades de un framework que no uso a diario estaba restringiendo mi creatividad.

Como uso Tailwind todos los días, he empezado a "pensar" en Tailwind a la hora de estilizar. Las capacidades de recarga en vivo y el enfoque *utility-first* se han convertido en algo natural. Para esta reconstrucción, lo he combinado con [DaisyUI](https://daisyui.com/), que ofrece lo mejor de ambos mundos. Me permite optar por componentes pre-estilizados cuando me siento perezoso, pero también me permite optar por no usarlos y personalizarlos por completo sin sacrificar ninguna de las ventajas de Tailwind. Además, viene con un fantástico sistema de temas diseñado específicamente para Tailwind.

## El Papel de la IA en el Desarrollo

Esta reconstrucción también fue una oportunidad para experimentar con la última generación de asistentes de codificación de IA. Probé herramientas como [**Gemini CLI**](https://ai.google.dev/docs/gemini_cli_quickstart), [**Aider**](https://github.com/paul-gauthier/aider) y [**GitHub Copilot**](https://github.com/features/copilot) durante todo el proceso. Algunos días, se sentían como superpoderes y otros, como una gripe, pero planeo profundizar en esa experiencia en futuras publicaciones.

## ¿Qué Sigue?

Esta nueva web es una base. Estoy emocionado por empezar a escribir más, compartir lo que aprendo y seguir explorando las increíbles herramientas disponibles para los desarrolladores hoy en día. ¡Estad atentos!
