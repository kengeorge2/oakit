import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/lib/ghost';
import DOMPurify from 'isomorphic-dompurify';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | OAK IT Solutions Blog`,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.published_at,
      images: post.feature_image ? [{ url: post.feature_image }] : [{ url: 'https://oakitsolutionsandsupplies.com/images/Logo.png', width: 600, height: 300, alt: 'OAK IT Solutions' }],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts(50);
  return posts.map((post) => ({ slug: post.slug }));
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const author = post.authors?.[0];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <article className="container px-4 md:px-6 py-12 md:py-20 max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800 mb-8"
        >
          ← Back to Blog
        </Link>

        {/* Header */}
        <header className="space-y-4 mb-8">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.slug}
                  className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            {author && (
              <div className="flex items-center gap-2">
                {author.profile_image && (
                  <Image
                    alt={author.name}
                    className="rounded-full"
                    height={32}
                    width={32}
                    src={author.profile_image}
                  />
                )}
                <span>{author.name}</span>
              </div>
            )}
            <span>·</span>
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>·</span>
            <span>{post.reading_time} min read</span>
          </div>
        </header>

        {/* Feature image */}
        {post.feature_image && (
          <div className="mb-8">
            <Image
              alt={post.title}
              className="rounded-lg object-cover w-full aspect-video"
              height={500}
              width={900}
              src={post.feature_image}
              priority
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-p:text-gray-600 dark:prose-p:text-gray-300
            prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-lg
            prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-blockquote:border-purple-500 prose-blockquote:text-gray-500"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.html) }}
        />

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Share this post</p>
          <div className="flex gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://oakitsolutionsandsupplies.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Twitter / X
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://oakitsolutionsandsupplies.com/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
