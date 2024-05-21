import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Blog = () => {
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
              <div className="space-y-4">
                <Image
                  alt="Blog Post Image"
                  className="rounded-lg object-cover aspect-video"
                  height={360}
                  src="/placeholder.svg"
                  width={640}
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Unlocking the Power of Cloud Computing for Your Business</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Discover how cloud solutions can transform your business operations and drive innovation.
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link
                    className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gradient-to-r hover:from-purple-500 hover:to-lime-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gradient-to-r dark:hover:from-purple-600 dark:hover:to-lime-600 dark:focus-visible:ring-gray-300 py-3"
                    href="#"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
              <div className="space-y-4">
                <Image
                  alt="Blog Post Image"
                  className="rounded-lg object-cover aspect-video"
                  height={360}
                  src="/placeholder.svg"
                  width={640}
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Cybersecurity Trends to Watch in 2024</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Stay ahead of the curve with our insights on the latest cybersecurity threats and best practices.
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link
                    className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gradient-to-r hover:from-purple-500 hover:to-lime-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gradient-to-r dark:hover:from-purple-600 dark:hover:to-lime-600 dark:focus-visible:ring-gray-300 py-3"
                    href="#"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
              <div className="space-y-4">
                <Image
                  alt="Blog Post Image"
                  className="rounded-lg object-cover aspect-video"
                  height={360}
                  src="/placeholder.svg"
                  width={640}
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Leveraging Data Analytics to Drive Business Growth</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Discover how data-driven insights can transform your business operations and decision-making.
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link
                    className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gradient-to-r hover:from-purple-500 hover:to-lime-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gradient-to-r dark:hover:from-purple-600 dark:hover:to-lime-600 dark:focus-visible:ring-gray-300 py-3"
                    href="#"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          </div>
          
          </section>
  );
};

export default Blog;
