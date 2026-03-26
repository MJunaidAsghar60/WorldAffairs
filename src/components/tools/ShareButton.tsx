'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface ShareButtonProps {
  url: string;
  label?: string;
}

export default function ShareButton({ url, label = 'Share This' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all"
      style={{
        borderColor: copied ? 'var(--success)' : 'var(--border-default)',
        color: copied ? 'var(--success)' : 'var(--text-secondary)',
        backgroundColor: 'var(--bg-card)',
      }}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Link copied! Share it with anyone
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          {label}
        </>
      )}
    </button>
  );
}
