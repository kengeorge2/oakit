import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts } from '@/lib/ghost';

export const revalidate = 3600;

const Blog = async () => {
  const posts = await getPosts(3);

  return (
    <section className="w-full py-8 md:py-16 lg:py-24 bg-gray-100 dark:bg-gray-800" id="blog">
      <div className="container px-4 md:px-6">
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700">Our Blog</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Stay Up-to-Date with Our Latest Insights
          </h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Check out our blog for the latest news, trends, and best practices in the IT industry.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 mt-8">
            <p className="text-gray-500 dark:text-gray-400">
              Blog posts coming soon. Stay tuned!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {posts.map((post) => (
              <div key={post.slug} className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
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
                      <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        {post.tags[0].name}
                      </span>
                    )}
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Link
                      className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gradient-to-r hover:from-purple-500 hover:to-lime-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gradient-to-r dark:hover:from-purple-600 dark:hover:to-lime-600 dark:focus-visible:ring-gray-300 py-3"
                      href={`/blog/${post.slug}`}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {posts.length > 0 && (
          <div className="flex justify-center mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-md border border-gray-900 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-gray-50 transition-colors dark:border-gray-50 dark:text-gray-50 dark:hover:bg-gray-50 dark:hover:text-gray-900"
            >
              View All Posts
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
