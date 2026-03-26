'use client';

import Link from 'next/link';
import { Globe } from 'lucide-react';

const TOOL_LINKS = [
  { href: '/tools/country-comparator', label: 'Country Comparator' },
  { href: '/tools/passport-visa-calculator', label: 'Passport Calculator' },
  { href: '/tools/sanctions-tracker', label: 'Sanctions Tracker' },
  { href: '/tools/geopolitical-risk-calculator', label: 'Geopolitical Risk' },
  { href: '/tools/military-comparator', label: 'Military Comparator' },
  { href: '/tools/alliance-treaty-finder', label: 'Alliance Finder' },
];

const COMPANY_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/blog', label: 'Blog' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer
      className="border-t mt-24"
      style={{
        borderColor: 'var(--border-subtle)',
        backgroundColor: 'var(--bg-secondary)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5" style={{ color: 'var(--indigo-soft)' }} />
              <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                World Affairs
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
              Making geopolitical intelligence free and accessible for everyone — students,
              analysts, investors, and curious minds.
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>
              Data sourced from World Bank, UN, SIPRI, Heritage Foundation, and Transparency
              International.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Tools
            </h3>
            <ul className="space-y-2.5">
              {TOOL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-[color:var(--indigo-soft)]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Company
            </h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-[color:var(--indigo-soft)]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Stay Updated
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              Get weekly world affairs insights
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-3 py-2 rounded-lg text-sm border outline-none transition-colors focus:border-[color:var(--indigo-vivid)]"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-default)',
                  color: 'var(--text-primary)',
                }}
              />
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: 'var(--indigo-vivid)',
                  color: 'white',
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2025 World Affairs · worldaffairsblog.com
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Built with ❤️ for curious minds
          </p>
        </div>
      </div>
    </footer>
  );
}
