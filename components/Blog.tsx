import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts } from '@/lib/ghost';
import Reveal from '@/components/Reveal';

export const revalidate = 3600;

const Blog = async () => {
  const posts = await getPosts(3);

  return (
    <section className="w-full py-8 md:py-16 lg:py-24 section-dark-alt grid-overlay" id="blog">
      <div className="container px-4 sm:px-6 md:px-6">
        <Reveal>
          <div className="space-y-3 mb-12">
            <span className="section-label">04 — Blog</span>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white">
              Stay Up-to-Date with Our Latest Insights
            </h2>
            <p className="max-w-[600px] text-gray-600 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Check out our blog for the latest news, trends, and best practices in the IT industry.
            </p>
          </div>
        </Reveal>

        {posts.length === 0 ? (
          <div className="text-center py-12 mt-8">
            <p className="text-gray-500 dark:text-gray-400">
              Blog posts coming soon. Stay tuned!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, idx) => (
              <Reveal key={post.slug} delay={idx as 0 | 1 | 2}>
                <div className="card-glass rounded-xl overflow-hidden h-full flex flex-col">
                  {post.feature_image ? (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        alt={post.title}
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={post.feature_image}
                      />
                    </div>
                  ) : (
                    <div className="rounded-t-lg bg-gray-200 dark:bg-gray-800/50 aspect-video flex items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-500 text-sm">No image</span>
                    </div>
                  )}
                  <div className="space-y-3 p-6 flex flex-col flex-1">
                    {post.tags && post.tags.length > 0 && (
                      <span className="inline-block w-fit rounded-full bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 px-3 py-1 text-xs font-medium text-purple-700 dark:text-purple-300">
                        {post.tags[0].name}
                      </span>
                    )}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white leading-snug">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-end pt-2">
                      <Link
                        className="inline-flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                        href={`/blog/${post.slug}`}
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {posts.length > 0 && (
          <Reveal>
            <div className="flex justify-center mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-white/[0.1] bg-gray-100 dark:bg-white/[0.04] px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/[0.08] hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-white/[0.2] transition-all duration-300"
              >
                View All Posts
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default Blog;
