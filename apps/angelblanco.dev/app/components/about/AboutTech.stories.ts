import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, userEvent, within } from 'storybook/test';
import useTechList, { TechName, TechType } from '../../composables/useTechList';
import AboutTech from './AboutTech.vue';

const { technologies, types } = useTechList();

function techCards(canvasElement: HTMLElement) {
  return Array.from(canvasElement.querySelectorAll<HTMLElement>('div.group'));
}

function dimmedCards(canvasElement: HTMLElement) {
  return techCards(canvasElement).filter(card => card.classList.contains('opacity-45'));
}

function chip(canvasElement: HTMLElement, type: TechType) {
  return within(canvasElement).getByRole('button', { name: `#${type}` });
}

const meta = {
  title: 'About/Tech',
  component: AboutTech,
} satisfies Meta<typeof AboutTech>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const chips = within(canvasElement).getAllByRole('button');

    await expect(chips).toHaveLength(types.length);
    for (const button of chips)
      await expect(button).toHaveClass('bg-neutral');

    await expect(techCards(canvasElement)).toHaveLength(technologies.length);
    await expect(dimmedCards(canvasElement)).toHaveLength(0);

    const frameworks = chip(canvasElement, TechType.Framework);
    await userEvent.click(frameworks);
    await userEvent.click(frameworks);

    await expect(frameworks).toHaveClass('bg-neutral');
    await expect(frameworks).not.toHaveClass('bg-primary');
    await expect(dimmedCards(canvasElement)).toHaveLength(0);
  },
};

export const FrameworksSelected: Story = {
  parameters: {
    docs: {
      description: { story: 'The #frameworks chip is selected by its play function; click a chip to filter on this page.' },
    },
  },
  play: async ({ canvasElement }) => {
    const frameworks = chip(canvasElement, TechType.Framework);

    await userEvent.click(frameworks);

    await expect(frameworks).toHaveClass('bg-primary');
    for (const other of within(canvasElement).getAllByRole('button').filter(button => button !== frameworks))
      await expect(other).toHaveClass('bg-neutral');

    await expect(dimmedCards(canvasElement)).toHaveLength(
      technologies.filter(entry => entry.type !== TechType.Framework).length,
    );
  },
};

export const SelectedFromCard: Story = {
  parameters: {
    docs: {
      description: { story: 'Clicking the Typescript card selects #langs in its play function; click any card to filter by its type.' },
    },
  },
  play: async ({ canvasElement }) => {
    const index = technologies.findIndex(entry => entry.title === TechName.Typescript);
    const card = techCards(canvasElement)[index]!;

    await userEvent.click(card);

    await expect(chip(canvasElement, TechType.Language)).toHaveClass('bg-primary');
    await expect(card).not.toHaveClass('opacity-45');
    await expect(dimmedCards(canvasElement)).toHaveLength(
      technologies.filter(entry => entry.type !== TechType.Language).length,
    );
  },
};

export const Mobile: Story = {
  tags: ['!test', '!autodocs'],
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
