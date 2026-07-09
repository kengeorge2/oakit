import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Page not found</p>
        <p className="text-gray-500 dark:text-gray-500">The page you are looking for does not exist or has been moved.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-gray-900 dark:bg-gray-50 px-6 py-3 text-sm font-medium text-gray-50 dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
