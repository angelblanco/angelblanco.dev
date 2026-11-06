import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import UiNavBar from './UiNavBar.vue';

const menuPaths = ['/blog', '/projects', '/about'];

const meta = {
  title: 'UI/NavBar',
  component: UiNavBar,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof UiNavBar>;

export default meta;

type Story = StoryObj<typeof meta>;

function getToggle(canvasElement: HTMLElement) {
  return canvasElement.querySelector<HTMLButtonElement>('#ui-navbar-toggle')!;
}

async function expectMenuLinks(container: Element | null, locale: string) {
  const prefix = locale === 'en'
    ? ''
    : `/${locale}`;

  await waitFor(() => {
    const hrefs = Array.from(container?.querySelectorAll('a') ?? [], link => link.getAttribute('href') ?? '');

    for (const path of menuPaths)
      expect(hrefs).toContainEqual(expect.stringMatching(new RegExp(`^${prefix}${path}/?$`)));
  });
}

async function openMenu(canvasElement: HTMLElement) {
  const toggle = getToggle(canvasElement);

  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await userEvent.click(toggle);
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');

  return toggle;
}

export const Default: Story = {
  play: async ({ canvasElement, globals }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation');
    const repoLink = nav.querySelector('a[target="_blank"]');
    const toggle = getToggle(canvasElement);

    await expect(nav).toHaveAttribute('aria-label');
    await expect(nav).toHaveAttribute('data-is-open', 'false');
    await expect(canvas.getByTestId('ui-navbar-link').getAttribute('href')?.startsWith('/')).toBe(true);
    await expectMenuLinks(nav, globals.locale);

    await expect(repoLink).toHaveAttribute('href', expect.stringContaining('github.com/angelblanco'));
    await expect(repoLink).toHaveAttribute('rel', expect.stringContaining('noopener'));
    await expect(repoLink).toHaveAttribute('aria-label');

    await expect(toggle).toHaveAttribute('type', 'button');
    await expect(toggle).toHaveAttribute('aria-label');
    await expect(toggle).toHaveAttribute('aria-controls', 'ui-nav-bar-menu');
    await expect(canvasElement.querySelector('#ui-nav-bar-menu')).toBeNull();

    await openMenu(canvasElement);
    await userEvent.keyboard('{Escape}');

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).not.toHaveClass('text-primary-content');
    await expect(canvasElement.querySelector('#ui-nav-bar-menu')).toBeNull();
    await expect(nav).toHaveAttribute('data-is-open', 'false');
  },
};

export const MenuOpen: Story = {
  parameters: {
    docs: {
      description: { story: 'Opened by its play function below the md breakpoint; pick a mobile viewport and click the menu button to open it on this page.' },
    },
  },
  play: async ({ canvasElement, globals }) => {
    const toggle = await openMenu(canvasElement);
    const menu = canvasElement.querySelector('#ui-nav-bar-menu');

    await expect(menu).not.toBeNull();
    await expect(toggle).toHaveClass('text-primary-content');
    await expect(within(canvasElement).getByRole('navigation')).toHaveAttribute('data-is-open', 'true');
    await expect(menu?.querySelectorAll('a')).toHaveLength(menuPaths.length);
    await expectMenuLinks(menu, globals.locale);
  },
};

export const Dark: Story = {
  tags: ['!test', '!autodocs'],
  globals: { theme: 'dark' },
};

export const Spanish: Story = {
  tags: ['!test', '!autodocs'],
  globals: { locale: 'es' },
};

export const Mobile: Story = {
  tags: ['!test', '!autodocs'],
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
