interface TaggedPost {
  path: string;
  date: string;
  tags: string[];
}

export function relatedPosts<T extends TaggedPost>(current: TaggedPost, posts: T[], limit = 3): T[] {
  const currentTags = new Set(current.tags);

  return posts
    .filter(post => post.path !== current.path)
    .map(post => ({ post, shared: post.tags.filter(tag => currentTags.has(tag)).length }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map(({ post }) => post);
}

export function relatedPostsGridClass(count: number): string {
  if (count >= 3)
    return 'sm:grid-cols-3';

  return count === 2
    ? 'sm:grid-cols-2'
    : '';
}
