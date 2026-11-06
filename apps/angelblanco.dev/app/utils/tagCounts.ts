export interface TagCount {
  tag: string;
  count: number;
}

export function tagCounts(posts: { tags: string[] }[]): TagCount[] {
  const counts = new Map<string, number>();

  for (const tag of posts.flatMap(post => post.tags)) {
    counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }

  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
