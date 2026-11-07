import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import { expect, within } from 'storybook/test';
import { h } from 'vue';
import ProseCustomStrong from './ProseCustomStrong.global.vue';

interface Segment {
  text: string;
  bold?: boolean;
}

const paragraphs: Segment[][] = [
  [
    { text: 'I\'m a ' },
    { text: 'web engineer', bold: true },
    { text: ' with over 10 years of experience in the tech-tourism industry, specializing in ' },
    { text: 'team leadership', bold: true },
    { text: ' and building web applications from the ground up.' },
  ],
  [
    { text: 'My expertise includes ' },
    { text: 'architecting AI and Big Data solutions', bold: true },
    { text: ', mentoring and scaling tech teams from startup to growth-stage.' },
  ],
  [
    { text: 'I have collaborated with international teams, leading projects in both English and Spanish. My two fundamental pillars are ' },
    { text: 'automated testing', bold: true },
    { text: ' and ' },
    { text: 'agile development', bold: true },
    { text: ' assisted with AI, and I strive to facilitate their adoption within the teams I lead.' },
  ],
];

const boldCount = paragraphs.flat().filter(segment => segment.bold).length;

const strongClassPattern = /^strong-child-[123]$/;

function renderResume(wrapperClass: string, testId: string) {
  return () => ({
    setup: () => () => h('div', { 'class': wrapperClass, 'data-testid': testId }, paragraphs.map(segments => h('p', null, segments.map(segment =>
      segment.bold
        ? h(ProseCustomStrong, null, () => segment.text)
        : segment.text,
    )))),
  });
}

function childIndex(strong: Element) {
  return Number(strong.className.replace('strong-child-', ''));
}

const meta = {
  title: 'Content/ProseCustomStrong',
  component: ProseCustomStrong,
  render: renderResume('space-y-3 md-bold-styled', 'prose-strong-styled'),
  parameters: {
    docs: {
      description: {
        component: 'Markdown bold that cycles through three gradients (`strong-child-1..3`) inside `.md-bold-styled`, as in the about resume. The cycle comes from a module-level counter shared by every instance, so the colour each bold gets depends on render order and changes across stories and docs pages.',
      },
    },
  },
} satisfies Meta<typeof ProseCustomStrong>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wrapper = canvas.getByTestId('prose-strong-styled');
    const strongs = Array.from(wrapper.querySelectorAll('strong'));

    await expect(wrapper).toHaveClass('md-bold-styled');
    await expect(strongs).toHaveLength(boldCount);
    for (const strong of strongs)
      await expect(strong.className).toMatch(strongClassPattern);

    for (let index = 1; index < strongs.length; index++)
      await expect(childIndex(strongs[index]!)).toBe(childIndex(strongs[index - 1]!) % 3 + 1);

    await expect(new Set(strongs.map(childIndex)).size).toBe(3);
  },
};

export const InsideProse: Story = {
  render: renderResume('prose', 'prose-strong-plain'),
  parameters: {
    docs: {
      description: {
        story: 'Without `.md-bold-styled`, as in blog posts: the classes are still set but bolds keep the prose style.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wrapper = canvas.getByTestId('prose-strong-plain');
    const strongs = Array.from(wrapper.querySelectorAll('strong'));

    await expect(wrapper).toHaveClass('prose');
    await expect(wrapper).not.toHaveClass('md-bold-styled');
    await expect(strongs).toHaveLength(boldCount);
    for (const strong of strongs)
      await expect(strong.className).toMatch(strongClassPattern);
  },
};

export const Dark: Story = {
  tags: ['!test', '!autodocs'],
  globals: { theme: 'dark' },
};
