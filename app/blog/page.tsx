import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts } from '@/lib/ghost';
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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container px-4 md:px-6 py-12 md:py-20">
        <div className="space-y-4 mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Our Blog
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 hover:shadow-lg transition-shadow"
              >
                <div className="space-y-4">
                  {post.feature_image ? (
                    <Image
                      alt={post.title}
                      className="rounded-lg object-cover aspect-video"
                      height={360}
                      width={640}
                      src={post.feature_image}
                    />
                  ) : (
                    <div className="rounded-lg bg-gray-200 dark:bg-gray-700 aspect-video flex items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-500 text-sm">No image</span>
                    </div>
                  )}
                  <div className="space-y-2">
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag.slug}
                            className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="text-xl font-semibold group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
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
