export interface BlogSearchPost {
  path: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  readingTime?: number;
  content: string;
}

export interface BlogSearchSection {
  id: string;
  postPath: string;
  title: string;
  titles: string[];
  content: string;
  level: number;
}

export interface BlogSearchData {
  posts: BlogSearchPost[];
  sections: BlogSearchSection[];
}
