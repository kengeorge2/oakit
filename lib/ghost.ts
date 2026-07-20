import GhostContentAPI from '@tryghost/content-api';

const ghostUrl = (process.env.GHOST_URL || 'https://blog.oakitsolutionsandsupplies.com').trim();
const ghostKey = (process.env.GHOST_CONTENT_KEY || '').trim();

let api: InstanceType<typeof GhostContentAPI> | null = null;

function getApi(): InstanceType<typeof GhostContentAPI> | null {
  if (api) return api;
  if (!ghostKey || ghostKey.length !== 26 || !/^[0-9a-f]{26}$/i.test(ghostKey)) {
    console.warn('Ghost Content API key is missing or invalid. Blog features disabled.');
    return null;
  }
  api = new GhostContentAPI({ url: ghostUrl, key: ghostKey, version: 'v5.0' });
  return api;
}

// --- In-memory cache with stale-while-revalidate ---

interface CacheEntry<T> {
  data: T;
  fetchedAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL = 60 * 60 * 1000;       // 1 hour — serve fresh
const STALE_TTL = 24 * 60 * 60 * 1000;  // 24 hours — serve stale if Ghost is down

async function cachedFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  const now = Date.now();

  // Fresh cache — return immediately
  if (entry && now - entry.fetchedAt < CACHE_TTL) {
    return entry.data;
  }

  // Try fetching fresh data
  try {
    const data = await fetcher();
    cache.set(key, { data, fetchedAt: now });
    return data;
  } catch (error) {
    // Fetch failed — serve stale if available
    if (entry && now - entry.fetchedAt < STALE_TTL) {
      console.warn(`[Ghost] Fetch failed for "${key}", serving stale cache (${Math.round((now - entry.fetchedAt) / 60000)}min old)`);
      return entry.data;
    }
    // No stale data either — return empty fallback
    console.error(`[Ghost] Fetch failed for "${key}" and no stale cache available:`, error);
    throw error;
  }
}

// --- Exported types ---

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

// --- Exported functions ---

export async function getPosts(limit = 10, page = 1): Promise<GhostPost[]> {
  return cachedFetch(`posts:${limit}:${page}`, async () => {
    const client = getApi();
    if (!client) return [];
    const posts = await client.posts.browse({
      limit,
      page,
      include: ['tags', 'authors'],
      order: 'published_at desc',
    });
    return posts as unknown as GhostPost[];
  }).catch(() => []);
}

export async function getPost(slug: string): Promise<GhostPostDetail | null> {
  return cachedFetch(`post:${slug}`, async () => {
    const client = getApi();
    if (!client) return null;
    const post = await client.posts.read(
      { slug },
      { include: ['tags', 'authors'], formats: ['html', 'plaintext'] }
    );
    return post as unknown as GhostPostDetail;
  }).catch(() => null);
}

export async function getTags(): Promise<Array<{ name: string; slug: string }>> {
  return cachedFetch('tags', async () => {
    const client = getApi();
    if (!client) return [];
    const tags = await client.tags.browse();
    return tags as unknown as Array<{ name: string; slug: string }>;
  }).catch(() => []);
}
