'use client';

import { Download } from 'lucide-react';
import Reveal from '@/components/Reveal';

const GITHUB_RELEASES_URL = 'https://github.com/kengeorge2/oakit/releases/latest';

export default function DesktopDownload() {
  return (
    <section className="w-full py-20 section-dark" id="download">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <Reveal>
          <h2 className="text-3xl font-bold">Download ClassicPOS Desktop</h2>
          <p className="mt-2 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Run ClassicPOS natively on your computer. Available for Windows and Linux.
          </p>
        </Reveal>
        <Reveal>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`${GITHUB_RELEASES_URL}/download/classicpos-windows.exe`}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
            >
              <Download className="h-5 w-5" />
              Windows (.exe)
            </a>
            <a
              href={`${GITHUB_RELEASES_URL}/download/classicpos-linux.deb`}
              className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-600/10 dark:text-blue-400 dark:border-blue-400"
            >
              <Download className="h-5 w-5" />
              Linux (.deb)
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
