import React from 'react';

interface IllustrationProps {
  className?: string;
}

/* ─── Cloud Accounting ─── */
export function CloudAccountingIllustration({ className = '' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 240" fill="none" role="img" aria-label="Cloud accounting illustration" className={className}>
      <defs>
        <linearGradient id="cloud-grad" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="cloud-stroke" x1="80" y1="60" x2="200" y2="120">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" rx="12" fill="url(#cloud-grad)" />
      {/* Grid */}
      <line x1="0" y1="60" x2="400" y2="60" stroke="#a855f7" strokeOpacity="0.06" />
      <line x1="0" y1="120" x2="400" y2="120" stroke="#a855f7" strokeOpacity="0.06" />
      <line x1="0" y1="180" x2="400" y2="180" stroke="#a855f7" strokeOpacity="0.06" />
      {/* Cloud */}
      <path d="M120 100 C120 78 138 60 160 60 C170 60 178 64 184 70 C190 62 202 56 216 56 C238 56 256 74 256 96 C256 98 256 100 256 102 L270 102 C278 102 284 108 284 116 C284 124 278 130 270 130 L110 130 C100 130 92 122 92 112 C92 104 98 96 106 96 L120 96 Z" fill="none" stroke="url(#cloud-stroke)" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Arrow down from cloud */}
      <line x1="180" y1="130" x2="180" y2="155" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 3" />
      <polygon points="175,155 180,165 185,155" fill="#3b82f6" />
      {/* Document */}
      <rect x="145" y="168" width="70" height="50" rx="4" fill="none" stroke="#a855f7" strokeWidth="2" />
      <line x1="155" y1="182" x2="205" y2="182" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="155" y1="192" x2="195" y2="192" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="155" y1="202" x2="200" y2="202" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Dollar sign */}
      <text x="176" y="196" fontSize="18" fontWeight="bold" fill="#22c55e" fontFamily="monospace">$</text>
      {/* Chart bars */}
      <rect x="300" y="160" width="16" height="60" rx="3" fill="#3b82f6" fillOpacity="0.3" />
      <rect x="322" y="140" width="16" height="80" rx="3" fill="#a855f7" fillOpacity="0.3" />
      <rect x="344" y="120" width="16" height="100" rx="3" fill="#22c55e" fillOpacity="0.3" />
      <rect x="366" y="100" width="16" height="120" rx="3" fill="#f59e0b" fillOpacity="0.3" />
      {/* Trend line */}
      <polyline points="308,155 330,135 352,115 374,95" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
      <circle cx="308" cy="155" r="3" fill="#a855f7" />
      <circle cx="330" cy="135" r="3" fill="#a855f7" />
      <circle cx="352" cy="115" r="3" fill="#a855f7" />
      <circle cx="374" cy="95" r="3" fill="#a855f7" />
      {/* Label */}
      <text x="20" y="230" fontSize="10" fill="#a855f7" fillOpacity="0.6" fontFamily="monospace" letterSpacing="0.15em">CLOUD ACCOUNTING</text>
    </svg>
  );
}

/* ─── Tech Challenges ─── */
export function TechChallengesIllustration({ className = '' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 240" fill="none" role="img" aria-label="Technology challenges illustration" className={className}>
      <defs>
        <linearGradient id="tc-grad" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="tc-stroke" x1="0" y1="0" x2="400" y2="240">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" rx="12" fill="url(#tc-grad)" />
      {/* Grid */}
      <line x1="0" y1="60" x2="400" y2="60" stroke="#f59e0b" strokeOpacity="0.06" />
      <line x1="0" y1="120" x2="400" y2="120" stroke="#f59e0b" strokeOpacity="0.06" />
      <line x1="0" y1="180" x2="400" y2="180" stroke="#f59e0b" strokeOpacity="0.06" />
      {/* Warning triangle */}
      <polygon points="200,30 240,100 160,100" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />
      <text x="193" y="88" fontSize="28" fontWeight="bold" fill="#f59e0b" fontFamily="monospace">!</text>
      {/* Gear 1 */}
      <circle cx="80" cy="140" r="30" fill="none" stroke="#6b7280" strokeWidth="2" />
      <circle cx="80" cy="140" r="12" fill="none" stroke="#6b7280" strokeWidth="1.5" />
      <line x1="80" y1="108" x2="80" y2="118" stroke="#6b7280" strokeWidth="2" />
      <line x1="80" y1="162" x2="80" y2="172" stroke="#6b7280" strokeWidth="2" />
      <line x1="48" y1="140" x2="58" y2="140" stroke="#6b7280" strokeWidth="2" />
      <line x1="102" y1="140" x2="112" y2="140" stroke="#6b7280" strokeWidth="2" />
      {/* Gear 2 */}
      <circle cx="130" cy="170" r="22" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
      <circle cx="130" cy="170" r="8" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
      {/* Broken chain */}
      <line x1="280" y1="130" x2="310" y2="130" stroke="#ef4444" strokeWidth="2" />
      <line x1="330" y1="130" x2="360" y2="130" stroke="#ef4444" strokeWidth="2" />
      <circle cx="320" cy="130" r="6" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* Shield with crack */}
      <path d="M320 160 L320 180 C320 200 340 210 340 210 C340 210 360 200 360 180 L360 160 L340 150 Z" fill="none" stroke="#ef4444" strokeWidth="2" />
      <line x1="335" y1="170" x2="345" y2="190" stroke="#ef4444" strokeWidth="1.5" />
      {/* Server */}
      <rect x="260" y="50" width="80" height="60" rx="4" fill="none" stroke="#6b7280" strokeWidth="2" />
      <line x1="270" y1="65" x2="330" y2="65" stroke="#6b7280" strokeWidth="1" />
      <line x1="270" y1="80" x2="330" y2="80" stroke="#6b7280" strokeWidth="1" />
      <line x1="270" y1="95" x2="330" y2="95" stroke="#6b7280" strokeWidth="1" />
      <circle cx="325" cy="65" r="2" fill="#22c55e" />
      <circle cx="325" cy="80" r="2" fill="#f59e0b" />
      <circle cx="325" cy="95" r="2" fill="#ef4444" />
      <text x="20" y="230" fontSize="10" fill="#f59e0b" fillOpacity="0.6" fontFamily="monospace" letterSpacing="0.15em">TECH CHALLENGES</text>
    </svg>
  );
}

/* ─── POS System ─── */
export function PosSystemIllustration({ className = '' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 240" fill="none" role="img" aria-label="POS system illustration" className={className}>
      <defs>
        <linearGradient id="pos-grad" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="pos-stroke" x1="100" y1="40" x2="200" y2="200">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" rx="12" fill="url(#pos-grad)" />
      {/* Grid */}
      <line x1="0" y1="60" x2="400" y2="60" stroke="#22c55e" strokeOpacity="0.06" />
      <line x1="0" y1="120" x2="400" y2="120" stroke="#22c55e" strokeOpacity="0.06" />
      <line x1="0" y1="180" x2="400" y2="180" stroke="#22c55e" strokeOpacity="0.06" />
      {/* Terminal screen */}
      <rect x="100" y="30" width="120" height="80" rx="6" fill="none" stroke="url(#pos-stroke)" strokeWidth="2.5" />
      <rect x="108" y="38" width="104" height="56" rx="3" fill="#22c55e" fillOpacity="0.06" />
      {/* Screen content */}
      <rect x="116" y="48" width="40" height="8" rx="2" fill="#22c55e" fillOpacity="0.3" />
      <rect x="116" y="62" width="88" height="4" rx="1" fill="#3b82f6" fillOpacity="0.2" />
      <rect x="116" y="72" width="70" height="4" rx="1" fill="#3b82f6" fillOpacity="0.2" />
      <rect x="116" y="82" width="55" height="4" rx="1" fill="#3b82f6" fillOpacity="0.2" />
      {/* Terminal base */}
      <rect x="130" y="110" width="60" height="8" rx="2" fill="none" stroke="#22c55e" strokeWidth="1.5" />
      <rect x="120" y="118" width="80" height="20" rx="3" fill="none" stroke="#22c55e" strokeWidth="2" />
      {/* Receipt */}
      <rect x="145" y="138" width="30" height="70" rx="2" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="150" y1="150" x2="170" y2="150" stroke="#9ca3af" strokeWidth="1" />
      <line x1="150" y1="158" x2="168" y2="158" stroke="#9ca3af" strokeWidth="1" />
      <line x1="150" y1="166" x2="172" y2="166" stroke="#9ca3af" strokeWidth="1" />
      <line x1="150" y1="174" x2="165" y2="174" stroke="#9ca3af" strokeWidth="1" />
      <text x="151" y="192" fontSize="8" fill="#22c55e" fontFamily="monospace">$42.50</text>
      {/* Barcode */}
      <g transform="translate(280, 50)">
        <rect x="0" y="0" width="3" height="40" fill="#1f2937" />
        <rect x="5" y="0" width="1.5" height="40" fill="#1f2937" />
        <rect x="8" y="0" width="4" height="40" fill="#1f2937" />
        <rect x="14" y="0" width="1.5" height="40" fill="#1f2937" />
        <rect x="17" y="0" width="2.5" height="40" fill="#1f2937" />
        <rect x="21" y="0" width="1" height="40" fill="#1f2937" />
        <rect x="24" y="0" width="3.5" height="40" fill="#1f2937" />
        <rect x="29" y="0" width="1.5" height="40" fill="#1f2937" />
        <rect x="32" y="0" width="2" height="40" fill="#1f2937" />
        <rect x="36" y="0" width="1" height="40" fill="#1f2937" />
        <rect x="39" y="0" width="3" height="40" fill="#1f2937" />
        <rect x="44" y="0" width="1.5" height="40" fill="#1f2937" />
      </g>
      {/* Shopping cart */}
      <path d="M300 130 L310 130 L325 180 L370 180" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
      <circle cx="330" cy="190" r="6" fill="none" stroke="#3b82f6" strokeWidth="2" />
      <circle cx="360" cy="190" r="6" fill="none" stroke="#3b82f6" strokeWidth="2" />
      <line x1="305" y1="140" x2="370" y2="140" stroke="#3b82f6" strokeWidth="2" />
      <text x="20" y="230" fontSize="10" fill="#22c55e" fillOpacity="0.6" fontFamily="monospace" letterSpacing="0.15em">POS SYSTEM</text>
    </svg>
  );
}

/* ─── ClassicPOS Guide ─── */
export function ClassicPosGuideIllustration({ className = '' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 240" fill="none" role="img" aria-label="ClassicPOS selling guide illustration" className={className}>
      <defs>
        <linearGradient id="cpg-grad" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="cpg-stroke" x1="50" y1="40" x2="350" y2="200">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" rx="12" fill="url(#cpg-grad)" />
      {/* Grid */}
      <line x1="0" y1="60" x2="400" y2="60" stroke="#8b5cf6" strokeOpacity="0.06" />
      <line x1="0" y1="120" x2="400" y2="120" stroke="#8b5cf6" strokeOpacity="0.06" />
      <line x1="0" y1="180" x2="400" y2="180" stroke="#8b5cf6" strokeOpacity="0.06" />
      {/* Main terminal */}
      <rect x="60" y="40" width="100" height="70" rx="6" fill="none" stroke="url(#cpg-stroke)" strokeWidth="2.5" />
      <rect x="68" y="48" width="84" height="46" rx="3" fill="#8b5cf6" fillOpacity="0.06" />
      {/* Screen content */}
      <rect x="76" y="56" width="50" height="6" rx="2" fill="#8b5cf6" fillOpacity="0.3" />
      <rect x="76" y="68" width="68" height="4" rx="1" fill="#06b6d4" fillOpacity="0.2" />
      <rect x="76" y="78" width="45" height="4" rx="1" fill="#06b6d4" fillOpacity="0.2" />
      <circle cx="140" cy="88" r="4" fill="#22c55e" fillOpacity="0.5" />
      {/* Terminal stand */}
      <rect x="90" y="110" width="40" height="6" rx="2" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
      <rect x="85" y="116" width="50" height="14" rx="3" fill="none" stroke="#8b5cf6" strokeWidth="2" />
      {/* Analytics chart */}
      <rect x="220" y="40" width="140" height="90" rx="6" fill="none" stroke="#06b6d4" strokeWidth="2" />
      <polyline points="235,110 260,85 280,95 305,65 330,75 345,55" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
      <circle cx="235" cy="110" r="3" fill="#06b6d4" />
      <circle cx="260" cy="85" r="3" fill="#06b6d4" />
      <circle cx="280" cy="95" r="3" fill="#06b6d4" />
      <circle cx="305" cy="65" r="3" fill="#06b6d4" />
      <circle cx="330" cy="75" r="3" fill="#06b6d4" />
      <circle cx="345" cy="55" r="3" fill="#8b5cf6" />
      <text x="230" y="125" fontSize="8" fill="#06b6d4" fillOpacity="0.5" fontFamily="monospace">SALES ANALYTICS</text>
      {/* Speed lines */}
      <line x1="30" y1="160" x2="100" y2="160" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="175" x2="80" y2="175" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="30" y1="190" x2="120" y2="190" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
      {/* Arrow */}
      <polygon points="130,175 110,165 110,185" fill="#22c55e" fillOpacity="0.4" />
      {/* Tags */}
      <rect x="160" y="160" width="60" height="24" rx="12" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="172" y="176" fontSize="9" fill="#8b5cf6" fontFamily="monospace">FASTER</text>
      <rect x="240" y="160" width="60" height="24" rx="12" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
      <text x="250" y="176" fontSize="9" fill="#06b6d4" fontFamily="monospace">SMARTER</text>
      <rect x="320" y="160" width="60" height="24" rx="12" fill="none" stroke="#22c55e" strokeWidth="1.5" />
      <text x="333" y="176" fontSize="9" fill="#22c55e" fontFamily="monospace">BETTER</text>
      <text x="20" y="230" fontSize="10" fill="#8b5cf6" fillOpacity="0.6" fontFamily="monospace" letterSpacing="0.15em">CLASSICPOS GUIDE</text>
    </svg>
  );
}

/* ─── Fallback illustration for unknown posts ─── */
export function DefaultBlogIllustration({ className = '' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 240" fill="none" role="img" aria-label="Blog illustration" className={className}>
      <defs>
        <linearGradient id="def-grad" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" rx="12" fill="url(#def-grad)" />
      <line x1="0" y1="60" x2="400" y2="60" stroke="#6366f1" strokeOpacity="0.06" />
      <line x1="0" y1="120" x2="400" y2="120" stroke="#6366f1" strokeOpacity="0.06" />
      <line x1="0" y1="180" x2="400" y2="180" stroke="#6366f1" strokeOpacity="0.06" />
      {/* Document */}
      <rect x="140" y="40" width="80" height="100" rx="4" fill="none" stroke="#6366f1" strokeWidth="2" />
      <line x1="155" y1="60" x2="205" y2="60" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="155" y1="75" x2="195" y2="75" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="155" y1="90" x2="200" y2="90" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="155" y1="105" x2="185" y2="105" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="155" y1="120" x2="198" y2="120" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.4" />
      {/* Pen */}
      <line x1="250" y1="60" x2="290" y2="120" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
      <polygon points="250,60 244,50 256,54" fill="#a855f7" />
      {/* Lightbulb */}
      <circle cx="80" cy="80" r="20" fill="none" stroke="#f59e0b" strokeWidth="2" />
      <line x1="75" y1="100" x2="85" y2="100" stroke="#f59e0b" strokeWidth="1.5" />
      <line x1="77" y1="106" x2="83" y2="106" stroke="#f59e0b" strokeWidth="1.5" />
      <line x1="80" y1="60" x2="80" y2="50" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="60" y1="80" x2="52" y2="80" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="100" y1="80" x2="108" y2="80" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.4" />
      <text x="20" y="230" fontSize="10" fill="#6366f1" fillOpacity="0.6" fontFamily="monospace" letterSpacing="0.15em">OAK IT BLOG</text>
    </svg>
  );
}

/* ─── Map post slug to illustration ─── */
export function getBlogIllustration(slug: string) {
  const illustrations: Record<string, React.ComponentType<IllustrationProps>> = {
    'how-cloud-based-accounting-is-revolutionizing-sme-financial-management': CloudAccountingIllustration,
    'top-5-technology-challenges-facing-small-businesses-in-uganda': TechChallengesIllustration,
    'why-every-retail-business-needs-a-modern-pos-system-in-2026': PosSystemIllustration,
    'how-to-sell-smarter-with-classicpos-the-complete-guide': ClassicPosGuideIllustration,
  };
  return illustrations[slug] || DefaultBlogIllustration;
}
