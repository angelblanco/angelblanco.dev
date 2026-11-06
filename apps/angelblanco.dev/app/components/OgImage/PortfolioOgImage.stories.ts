import type { Decorator, Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import { h } from 'vue';
import PortfolioOgImage from './PortfolioOgImage.browser.vue';
import styles from './PortfolioOgImage.css?raw';

interface OgCanvas {
  width: number;
  height: number;
}

const ogCanvas: OgCanvas = { width: 1200, height: 600 };
const whatsappCanvas: OgCanvas = { width: 800, height: 800 };
const squareStyles = styles.replace('@media (max-aspect-ratio: 1/1)', '@container (max-aspect-ratio: 1/1)');

const withCanvas: Decorator = (story, { parameters }) => {
  const { width, height } = (parameters.ogCanvas as OgCanvas | undefined) ?? ogCanvas;

  return {
    setup: () => () => h('div', {
      style: { maxWidth: '100%', overflowX: 'auto' },
    }, h('div', {
      style: {
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'hidden',
        containerType: 'size',
      },
    }, [
      width <= height && h('style', squareStyles),
      h(story()),
    ])),
  };
};

function getOg(canvasElement: HTMLElement) {
  return within(canvasElement).getByTestId('og-title').closest('section')!;
}

const meta = {
  title: 'OG/PortfolioOgImage',
  component: PortfolioOgImage,
  decorators: [withCanvas],
  parameters: {
    layout: 'fullscreen',
    ogCanvas,
  },
  args: {
    title: 'Ángel Blanco',
    description: 'Personal full-stack engineering blog',
    cta: 'Discover more',
  },
} satisfies Meta<typeof PortfolioOgImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(getOg(canvasElement)).toHaveAttribute('data-len', 's');
    await expect(canvas.getByTestId('og-description')).toBeInTheDocument();
    await expect(canvas.getByTestId('og-cta')).toBeInTheDocument();
    await expect(canvas.queryByTestId('og-section')).toBeNull();
    await expect(canvas.getByTestId('og-photo').getAttribute('src')).toMatch(/^data:image\/webp;base64,/);
  },
};

export const Projects: Story = {
  args: {
    title: 'Projects',
    description: 'Here you can find a selection of projects I\'ve worked on throughout my career.',
    cta: 'See projects',
    section: 'projects',
  },
  play: async ({ canvasElement }) => {
    await expect(getOg(canvasElement)).toHaveAttribute('data-len', 's');
    await expect(within(canvasElement).getByTestId('og-section')).toBeInTheDocument();
  },
};

export const Article: Story = {
  args: {
    title: 'Install PHP 8.5 with apt on Ubuntu 26.04',
    description: 'Install PHP 8.5 and Composer on Ubuntu 26.04 LTS with apt from Ondřej Surý\'s packages.sury.org repository, and keep them patched with apt upgrade.',
    cta: 'Read article',
    section: 'blog',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(getOg(canvasElement)).toHaveAttribute('data-len', 'm');
    await expect(canvas.getByTestId('og-section')).toBeInTheDocument();
    await expect(canvas.getByTestId('og-description')).toBeInTheDocument();
    await expect(canvas.getByTestId('og-cta')).toBeInTheDocument();
  },
};

export const TitleL: Story = {
  args: {
    title: 'From Svelte to Nuxt: Rebuilding my portfolio in 2025',
    description: undefined,
    cta: 'Read article',
    section: 'blog',
  },
  play: async ({ canvasElement }) => {
    await expect(getOg(canvasElement)).toHaveAttribute('data-len', 'l');
  },
};

export const TitleXl: Story = {
  args: {
    title: 'Crea tu propia configuración de ESLint y compártela entre proyectos',
    description: undefined,
    cta: 'Leer artículo',
    section: 'blog',
  },
  play: async ({ canvasElement }) => {
    await expect(getOg(canvasElement)).toHaveAttribute('data-len', 'xl');
  },
};

export const TitleXxl: Story = {
  args: {
    title: 'Here you can find a selection of projects I\'ve worked on throughout my career.',
    description: undefined,
    cta: 'See projects',
    section: 'projects',
  },
  play: async ({ canvasElement }) => {
    await expect(getOg(canvasElement)).toHaveAttribute('data-len', 'xxl');
  },
};

export const Minimal: Story = {
  args: {
    title: 'Ángel Blanco',
    description: undefined,
    cta: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByTestId('og-description')).toBeNull();
    await expect(canvas.queryByTestId('og-cta')).toBeNull();
    await expect(canvas.queryByTestId('og-section')).toBeNull();
  },
};

export const Square: Story = {
  args: Article.args,
  parameters: { ogCanvas: whatsappCanvas },
  play: async ({ canvasElement }) => {
    await expect(squareStyles).not.toBe(styles);
    await expect(canvasElement.querySelector('style')?.textContent).toContain('@container (max-aspect-ratio: 1/1)');
    await expect(getOg(canvasElement)).toHaveAttribute('data-len', 'm');
  },
};
