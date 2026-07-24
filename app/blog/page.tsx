import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts } from '@/lib/ghost';
import { getBlogIllustration } from '@/components/BlogIllustrations';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | OAK IT Solutions',
  description: 'Latest news, trends, and best practices in IT from OAK IT Solutions.',
  openGraph: {
    title: 'Blog | OAK IT Solutions',
    description: 'Latest news, trends, and best practices in IT from OAK IT Solutions.',
    images: [
      {
        url: 'https://oakitsolutionsandsupplies.com/images/Logo.png',
        width: 600,
        height: 300,
        alt: 'OAK IT Solutions Blog',
      },
    ],
  },
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getPosts(12);

  return (
    <main className="min-h-screen section-dark grid-overlay pt-20">
      <div className="container px-4 sm:px-6 md:px-6 py-12 md:py-20">
        <div className="space-y-3 mb-12">
          <span className="section-label">Blog</span>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white">
            Our Blog
          </h1>
          <p className="max-w-[600px] text-gray-600 dark:text-gray-400 md:text-xl/relaxed">
            Stay up-to-date with the latest news, trends, and best practices in the IT industry.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No blog posts published yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card-glass group rounded-xl overflow-hidden"
              >
                {post.feature_image ? (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      alt={post.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={post.feature_image}
                    />
                  </div>
                ) : (
                  <div className="aspect-video overflow-hidden">
                    {(() => {
                      const Illustration = getBlogIllustration(post.slug);
                      return <Illustration className="w-full h-full" />;
                    })()}
                  </div>
                )}
                <div className="space-y-3 p-6">
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag.slug}
                          className="inline-block rounded-full bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 px-3 py-1 text-xs font-medium text-purple-700 dark:text-purple-300"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-2">
                    <span>{new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>{post.reading_time} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
