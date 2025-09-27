---
title: "De Svelte a Nuxt: Reconstruyendo mi portfolio en 2025"
date: '2025-09-27'
tags: ['nuxt', 'vue', 'svelte', 'turborepo', 'tailwindcss', 'daisyui']
post_id: 1
toc: true
---

Estamos en 2025 y acabo de lanzar una reconstrucción completa de mi web personal. He migrado de un stack basado en [Svelte / Kit (Sapper)](https://svelte.dev/) a un stack moderno con [Nuxt](https://nuxt.com/), [Tailwind CSS](https://tailwindcss.com/) y un [Turborepo](https://turbo.build/repo). No ha sido solo un cambio estético; ha sido un cambio total, impulsada por cinco años de evolución en el panorama frontend y el deseo de alinear mis proyectos personales con mi trabajo diario.

## La decisión de 2020: ¿Por qué Svelte?

En 2020, cuando construí la primera versión de esta web, el ecosistema de Vue estaba en plena transición. Vue 3 estaba en pruebas, y se lanzó justo cuando yo ya había acabado mi página web. Los primeros dos años de Vue 3 fueron un dolor y Nuxt 3 no tuvo soporte total, hasta Noviembre de 2022. El camino de migración desde Vue 2 era incierto y, francamente, el futuro parecía algo inestable.

En el 2020 Svelte y Sapper, su framework de aplicaciones, ofrecían una alternativa muy atractiva. Era rápido, sencillo y proporcionaba una experiencia de desarrollo estable y con proyección de futuro. Fue la decisión acertada en aquel momento.

## El punto de inflexión: Ecosistema vs. DIY

Cinco años después, la situación ha cambiado radicalmente. Aunque Svelte sigue siendo un framework fantástico, el ecosistema de Nuxt es una maravilla.

Con mi antiguo sitio en Sapper, tuve que construir desde cero muchas funcionalidades: generación de metaetiquetas para SEO, gestión de contenido para el blog y optimización de imágenes. Aunque aprendí mucho, mantener ese código a medida se convirtió en un engorro. Además, la migración de Sapper a SvelteKit resultó ser una tarea de una envergadura para la que, simplemente, no tenía tiempo.

Nuxt ahora mismo, por otro lado, ofrece una cantidad de módulos oficiales que solucionan la mayoría de las necesidades para construir una página cómo esta:

- **[@nuxt/content](https://content.nuxt.com/):** Para gestionar el contenido desde archivos, sin complicaciones.
- **[@nuxt/seo](https://nuxt.com/modules/seo):** Para un control robusto del SEO y los metadatos, donde sin configurar nada, tienes una configuración por defecto suficiente para la mayoría de casos.
- **[@nuxt/icons](https://icons.nuxt.com/):** Para usar todos los iconos que quieras, de manera optimizada.

Creo que estas herramientas me permitirán centrarme en lo que de verdad importa: crear contenido.

## Alineación con mi flujo de trabajo diario

En mi trabajo usamos Vue 3 con TypeScript y Composition API así cómo Tailwind. Tiene todo el sentido que mi plataforma personal esté construida con las mismas tecnologías que uso y con las que disfruto profesionalmente. Trabajar con Nuxt me ha resultado muy sencillo (una vez entiendes su filosofía) e increíblemente potente.

## El nuevo stack de un vistazo

- **[Nuxt](https://nuxt.com/):** El núcleo de la aplicación, que proporciona un framework potente y optimizado basado en Vue.
- **[Tailwind CSS](https://tailwindcss.com/):** Para todo lo relacionado con el CSS.
- **[DaisyUI](https://daisyui.com/):** Cómo framework para definir el tema claro/oscuro de la aplicación.
- **[Turborepo](https://turbo.build/repo):** Para organizar la estructura del monorepo, manteniendo la app principal, configuraciones y herramientas internas en un único lugar.

### De Bulma a Tailwind CSS & DaisyUI

En la versión anterior de mi web, usaba [Bulma](https://bulma.io/), que es una librería CSS fantástica. Sin embargo, mi día a día gira en torno a Tailwind CSS y pivotar entre el template y el css a día de hoy me parece el doble de trabajo, ya que rara vez en un componente `.vue` o `.svelte` vas a reutilizar las clases.

Como uso Tailwind todos los días, he empezado a "pensar" en Tailwind a la hora de maquetar. El live reload de Vite + el enfoque _utility-first_ son parte de mi forma de trabajar, una vez que piensas así es muy díficil volver atrás. Además, lo he combinado con [DaisyUI](https://daisyui.com/), que ofrece lo mejor de ambos mundos. Me permite usar componentes ya listos cuando no me quiero complicar, pero también me da la libertad de no usarlos y crear algo totalmente a medida sin sacrificar ninguna de las ventajas de Tailwind. Además, viene con un genial sistema de temas diseñado específicamente para Tailwind y siguiendo su guía puedes tener tantos temas cómo quieras en tu página web.

## El papel de la IA en el desarrollo

Esta reconstrucción también está siendo una oportunidad para experimentar con la última generación de asistentes de código basados en IA. He probado (demasiadas) herramientas cómo [**Gemini CLI**](https://ai.google.dev/docs/gemini_cli_quickstart), [**Aider**](https://github.com/paul-gauthier/aider) y [**GitHub Copilot**](https://github.com/features/copilot) durante todo el proceso. Usandolas, algunos días me he sentido con superpoderes y otros, como si tuviera la gripe. Si cumplo mi objetivo, de empezar a escribir, te contaré más acerca de cada una de ellas en nada.

## ¿Y ahora qué?

Tengo ganas de empezar a escribir más, compartir algunas ideas que llevo pensando mucho tiempo y quizás incluso empezar a contribuir el algún proyecto open source.

Muchas gracias por llegar hasta el final,

¡Nos vemos!
