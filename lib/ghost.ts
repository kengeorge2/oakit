import GhostContentAPI from '@tryghost/content-api';

const ghostUrl = (process.env.NEXT_PUBLIC_GHOST_URL || 'https://blog.oakitsolutionsandsupplies.com').trim();
const ghostKey = (process.env.NEXT_PUBLIC_GHOST_CONTENT_KEY || '').trim();

let api: InstanceType<typeof GhostContentAPI> | null = null;

function getApi(): InstanceType<typeof GhostContentAPI> | null {
  if (api) return api;
  if (!ghostKey || ghostKey.length !== 26 || !/^[0-9a-f]{26}$/i.test(ghostKey)) {
    console.warn('Ghost Content API key is missing or invalid (must be 26 hex chars). Blog features disabled.');
    return null;
  }
  api = new GhostContentAPI({ url: ghostUrl, key: ghostKey, version: 'v5.0' });
  return api;
}

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
    const client = getApi();
    if (!client) return [];
    const posts = await client.posts.browse({
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
    const client = getApi();
    if (!client) return null;
    const post = await client.posts.read(
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
    const client = getApi();
    if (!client) return [];
    const tags = await client.tags.browse();
    return tags as unknown as Array<{ name: string; slug: string }>;
  } catch (error) {
    console.error('Failed to fetch Ghost tags:', error);
    return [];
  }
}
