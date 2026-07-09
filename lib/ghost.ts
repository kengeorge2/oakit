import GhostContentAPI from '@tryghost/content-api';

const ghostUrl = process.env.NEXT_PUBLIC_GHOST_URL || 'https://blog.oakitsolutionsandsupplies.com';
const ghostKey = process.env.NEXT_PUBLIC_GHOST_CONTENT_KEY || '';

const api = new GhostContentAPI({
  url: ghostUrl,
  key: ghostKey,
  version: 'v5.0',
});

export interface GhostPost {
  slug: string;
  title: string;
  excerpt: string;
  html: string;
  feature_image: string | null;
  published_at: string;
  reading_time: number;
  tags: Array<{ name: string; slug: string }>;
  authors: Array<{ name: string; slug: string; profile_image: string | null }>;
}

export interface GhostPostDetail extends GhostPost {
  meta_title: string | null;
  meta_description: string | null;
}

export async function getPosts(limit = 10, page = 1): Promise<GhostPost[]> {
  try {
    const posts = await api.posts.browse({
      limit,
      page,
      include: ['tags', 'authors'],
      order: 'published_at desc',
    });
    return posts as unknown as GhostPost[];
  } catch (error) {
    console.error('Failed to fetch Ghost posts:', error);
    return [];
  }
}

export async function getPost(slug: string): Promise<GhostPostDetail | null> {
  try {
    const post = await api.posts.read(
      { slug },
      { include: ['tags', 'authors'], formats: ['html', 'plaintext'] }
    );
    return post as unknown as GhostPostDetail;
  } catch (error) {
    console.error('Failed to fetch Ghost post:', error);
    return null;
  }
}

export async function getTags(): Promise<Array<{ name: string; slug: string }>> {
  try {
    const tags = await api.tags.browse();
    return tags as unknown as Array<{ name: string; slug: string }>;
  } catch (error) {
    console.error('Failed to fetch Ghost tags:', error);
    return [];
  }
}
