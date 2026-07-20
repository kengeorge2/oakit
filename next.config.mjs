/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.ghost.org',
      },
      {
        protocol: 'https',
        hostname: 'blog.oakitsolutionsandsupplies.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/aboutUs', destination: '/about-us', permanent: true },
      { source: '/Backendstack', destination: '/backend-stack', permanent: true },
      { source: '/Frontendstack', destination: '/frontend-stack', permanent: true },
      { source: '/Fullstacklearnmore', destination: '/fullstack-learn-more', permanent: true },
    ];
  },
};

export default nextConfig;
