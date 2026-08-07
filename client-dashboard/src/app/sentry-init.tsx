'use client'

import { useEffect } from 'react'

export default function SentryInit() {
  useEffect(() => {
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN
    if (dsn) {
      // Use Sentry CDN loader
      const script = document.createElement('script')
      script.src = 'https://browser.sentry-cdn.com/8.52.0/bundle.min.js'
      script.crossOrigin = 'anonymous'
      script.onload = () => {
        // @ts-ignore
        window.Sentry?.init({
          dsn,
          tracesSampleRate: 0.1,
          replaysSessionSampleRate: 0,
          replaysOnErrorSampleRate: 1.0,
        })
      }
      document.head.appendChild(script)
    }
  }, [])

  return null
}
