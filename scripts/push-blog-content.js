const GhostAdminAPI = require('@tryghost/admin-api');
const fs = require('fs');
const path = require('path');

const api = new GhostAdminAPI({
  url: 'https://blog.oakitsolutionsandsupplies.com',
  key: '6a4f99b75133f10001a49f50:9d238259ccf9f5919db80f9f8c3f9a0f7aca0566ce14525c082f42337ae48aec',
  version: 'v5.0',
});

const posts = [
  {
    title: 'How Cloud-Based Accounting is Revolutionizing SME Financial Management',
    slug: 'cloud-based-accounting-revolutionizing-sme-financial-management',
    file: 'post-1-cloud-accounting.html',
    meta_title: 'How Cloud-Based Accounting is Revolutionizing SME Financial Management',
    meta_description: 'Learn how cloud accounting tools help SMEs automate bookkeeping, stay tax compliant, and gain real-time financial visibility.',
    tags: ['Accounting', 'Cloud', 'SME'],
  },
  {
    title: 'Top 5 Technology Challenges Facing Small Businesses in Uganda',
    slug: 'top-5-technology-challenges-small-businesses-uganda',
    file: 'post-2-tech-challenges-uganda.html',
    meta_title: 'Top 5 Technology Challenges Facing Small Businesses in Uganda',
    meta_description: 'From unreliable internet to cybersecurity threats, discover the biggest tech challenges Ugandan small businesses face and how to overcome them.',
    tags: ['Small Business', 'Uganda', 'Technology'],
  },
  {
    title: 'Why Every Retail Business Needs a Modern POS System in 2026',
    slug: 'why-every-retail-business-needs-modern-pos-2026',
    file: 'post-3-pos-system-2026.html',
    meta_title: 'Why Every Retail Business Needs a Modern POS System in 2026',
    meta_description: 'Discover how modern POS systems transform retail operations with real-time inventory, analytics, and seamless payment processing.',
    tags: ['Technology', 'Retail', 'POS Systems'],
  },
];

async function main() {
  console.log('Creating blog posts with full content...\n');

  for (const post of posts) {
    const filePath = path.join(__dirname, '..', 'blog-content', post.file);
    const html = fs.readFileSync(filePath, 'utf-8');

    console.log(`Creating "${post.title}" (${html.length} chars)...`);

    // key fix: source goes in SECOND arg (options), not in post body
    const created = await api.posts.add(
      {
        title: post.title,
        slug: post.slug,
        html: html,
        status: 'published',
        tags: post.tags.map((name) => ({ name })),
        meta_title: post.meta_title,
        meta_description: post.meta_description,
      },
      { source: 'html' }
    );

    // Verify content was stored
    const verify = await api.posts.read({ id: created.id }, { formats: ['html'] });
    console.log(`  Created — slug: ${created.slug}, html stored: ${verify.html?.length || 0} chars`);
  }

  console.log('\nDone! All posts created with content.');
}

main().catch((err) => {
  console.error('Error:', err.message || err);
  process.exit(1);
});
