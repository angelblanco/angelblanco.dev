import type { VueWrapper } from '@vue/test-utils';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { BlogHeader, BlogIndexHeader, BlogRelated, BlogSearchDialog, BlogTagCloud, BlogTags, GithubRepoPreview, HomeBlogList } from '#components';
import { blogTagCounts, homeBlogPosts, postFixture, realBlogPostSummaries } from '../../../.storybook/fixtures/blog';
import { searchSectionsFixture } from '../../../.storybook/fixtures/search';

const lowContrastClasses = ['text-primary', 'text-base-content/50', 'text-base-content/60'];

function lowContrastElements(wrapper: VueWrapper) {
  const root: Element = wrapper.element.parentElement ?? wrapper.element;

  return Array.from(root.querySelectorAll<HTMLElement>('[class]'))
    .filter(element => !element.classList.contains('iconify'))
    .filter(element => lowContrastClasses.some(name => element.classList.contains(name)))
    .map(element => `${element.tagName.toLowerCase()}.${[...element.classList].join('.')}`);
}

describe('text contrast on the light theme', () => {
  it('uses the dark primary token for the home show more link', async () => {
    const [latestPost, ...otherPosts] = homeBlogPosts;
    const wrapper = await mountSuspended(HomeBlogList, {
      props: { latestPost: latestPost!, otherPosts },
    });
    const showMore = wrapper.findAll('a').find(link => link.text() === 'Show more')!;

    expect(showMore.classes()).toEqual(expect.arrayContaining(['text-primary-content', 'dark:text-primary']));
    expect(lowContrastElements(wrapper)).toEqual([]);
  });

  it('uses the dark primary token for the all topics link', async () => {
    const wrapper = await mountSuspended(BlogIndexHeader, {
      props: { tags: blogTagCounts },
    });
    const allTopics = wrapper.get('a[href="/blog/tags/"]');

    expect(allTopics.classes()).toEqual(expect.arrayContaining(['text-primary-content', 'dark:text-primary']));
    expect(lowContrastElements(wrapper)).toEqual([]);
  });

  it('marks the active tag with the dark primary token', async () => {
    const tags = await mountSuspended(BlogTags, {
      props: { tags: realBlogPostSummaries[0]!.tags },
    });
    const cloud = await mountSuspended(BlogTagCloud, {
      props: { tags: blogTagCounts },
    });

    for (const wrapper of [tags, cloud]) {
      for (const link of wrapper.findAllComponents({ name: 'NuxtLink' }))
        expect(link.props('activeClass')).toBe('text-primary-content dark:text-primary');
      expect(lowContrastElements(wrapper)).toEqual([]);
    }
  });

  it('highlights the active search result with the dark primary token', async () => {
    const wrapper = await mountSuspended(BlogSearchDialog, {
      props: { open: true, sections: searchSectionsFixture, status: 'success' },
    });
    await wrapper.get('input').setValue('composer');

    expect(wrapper.get('[aria-selected="true"] .font-semibold').classes()).toEqual(expect.arrayContaining(['text-primary-content', 'dark:text-primary']));
    expect(lowContrastElements(wrapper)).toEqual([]);
  });

  it('keeps muted text at base-content/70 or stronger', async () => {
    const wrappers = await Promise.all([
      mountSuspended(BlogHeader, {
        props: { post: postFixture, alternativeLocale: 'es' },
      }),
      mountSuspended(BlogRelated, {
        props: { post: realBlogPostSummaries[0]!, posts: realBlogPostSummaries },
      }),
      mountSuspended(GithubRepoPreview, {
        props: { repo: 'angelblanco/eslint-config', description: 'ESLint config' },
      }),
    ]);

    for (const wrapper of wrappers)
      expect(lowContrastElements(wrapper)).toEqual([]);
  });
});
