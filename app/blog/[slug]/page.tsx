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
    <main className="min-h-screen section-dark grid-overlay pt-20">
      <article className="container px-4 sm:px-6 md:px-6 py-12 md:py-20 max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 mb-8 transition-colors"
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
                  className="inline-block rounded-full bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 px-3 py-1 text-xs font-medium text-purple-700 dark:text-purple-300"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            {author && (
              <div className="flex items-center gap-2">
                {author.profile_image && (
                  <Image
                    alt={author.name}
                    className="rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                    height={36}
                    width={36}
                    src={author.profile_image}
                  />
                )}
                <span className="font-medium text-gray-700 dark:text-gray-300">{author.name}</span>
              </div>
            )}
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <time dateTime={post.published_at} className="text-gray-500 dark:text-gray-400">
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <span className="text-gray-500 dark:text-gray-400">{post.reading_time} min read</span>
          </div>
        </header>

        {/* Feature image */}
        {post.feature_image && (
          <div className="mb-10">
            <Image
              alt={post.title}
              className="rounded-xl object-cover w-full aspect-video ring-1 ring-gray-200 dark:ring-gray-800"
              height={500}
              width={900}
              src={post.feature_image}
              priority
            />
          </div>
        )}

        {/* Content — Ghost HTML rendered via Tailwind Typography */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-base
            prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
            prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-img:rounded-xl prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-gray-800
            prose-code:text-purple-600 dark:prose-code:text-purple-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-800
            prose-blockquote:border-purple-500 dark:prose-blockquote:border-purple-400 prose-blockquote:bg-purple-50 dark:prose-blockquote:bg-purple-500/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:not-italic
            prose-li:text-gray-700 dark:prose-li:text-gray-300
            prose-li:marker:text-purple-500 dark:prose-li:marker:text-purple-400
            prose-hr:border-gray-200 dark:prose-hr:border-gray-800"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.html) }}
        />

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/[0.06]">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Share this post</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://oakitsolutionsandsupplies.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/[0.06] border border-gray-200 dark:border-white/[0.08] px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/[0.1] hover:text-gray-900 dark:hover:text-white transition-all"
            >
              Twitter / X
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://oakitsolutionsandsupplies.com/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/[0.06] border border-gray-200 dark:border-white/[0.08] px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/[0.1] hover:text-gray-900 dark:hover:text-white transition-all"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
