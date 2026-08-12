'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='absolute top-1/2 left-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center'>
      <span className='from-foreground bg-linear-to-b to-transparent bg-clip-text text-[10rem] leading-none font-extrabold text-transparent'>
        404
      </span>
      <h2 className='my-2 text-2xl font-bold'>Something&apos;s missing</h2>
      <p>Sorry, the page you are looking for doesn&apos;t exist or has been moved.</p>
      <div className='mt-8 flex justify-center gap-2'>
        <button
          onClick={() => router.back()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Go back
        </button>
        <button
          onClick={() => router.push('/dashboard')}
          className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-800"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
