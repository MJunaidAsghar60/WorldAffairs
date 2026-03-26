import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/seo/metadata';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/seo/jsonld';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';

const POSTS: Record<string, {
  title: string;
  date: string;
  tag: string;
  readTime: string;
  content: string;
}> = {
  'why-sanctions-dont-always-work': {
    title: "Why Sanctions Don't Always Work — And When They Do",
    date: '2025-01-15',
    tag: 'Explainer',
    readTime: '7 min read',
    content: `Economic sanctions are one of the most commonly used tools in modern diplomacy. When a country steps out of line — invading a neighbor, developing nuclear weapons, cracking down on its own citizens — the international community often reaches for sanctions before military action.

But do they actually work?

The honest answer is: sometimes. And the conditions that determine success or failure are more specific than most people realize.

**When Sanctions Work Best**

Sanctions tend to be most effective when they're targeted, multilateral, and combined with a clear off-ramp for the target country.

The Iran nuclear deal of 2015 is the clearest modern success story. A coordinated sanctions regime — including the US, EU, and UN — created genuine economic pain that brought Iran to the negotiating table. The key ingredients: near-universal participation by major trading partners, specific demands (limit uranium enrichment), and a credible promise of relief if those demands were met.

**When They Fail**

Cuba has been under a US trade embargo since 1960. The Castro government is gone, but the Communist Party remains firmly in power. North Korea has faced some of the harshest sanctions in history — and has developed more nuclear weapons than ever.

The pattern in failed sanctions regimes: the target country finds alternative trading partners, the ruling class insulates itself from economic pain, and the sanctions become a useful nationalist rallying point ("we're suffering because of foreign imperialism").

**The Russia Problem**

Russia's case is the most closely watched current example. Since 2022, the US and EU have imposed sweeping sanctions on Russian banking, energy, and exports. Russia's economy has contracted, its access to Western technology has been cut off, and hundreds of Western companies have left.

And yet, Russia's war effort continues. Why? China and India have dramatically increased their purchases of Russian oil. Russia's domestic arms production has ramped up. And the Kremlin has shown it's willing to accept significant economic pain to achieve its military objectives.

The lesson: sanctions can impose real costs, but they rarely change the calculations of authoritarian governments with high pain tolerance and alternative trading partners.`,
  },
  'brics-expansion-global-order': {
    title: 'The BRICS Expansion: What It Means for the Global Order',
    date: '2025-02-10',
    tag: 'Analysis',
    readTime: '9 min read',
    content: `When BRICS admitted five new members in January 2024, something quietly significant happened in the architecture of global power. Iran, Saudi Arabia, UAE, Egypt, and Ethiopia joined Brazil, Russia, India, China, and South Africa in a bloc that now represents roughly 45% of the world's population and 35% of global GDP.

The question isn't whether BRICS is now a more serious geopolitical force. It clearly is. The question is what kind of force it will become.

**What BRICS Actually Is**

BRICS is not NATO. There's no collective defense clause, no mutual security guarantee, no integrated command structure. Members have deep disagreements — India and China have fought border skirmishes and have competing interests across Asia.

What BRICS is: a forum for coordination among countries that share a broad interest in a more multipolar world — one where the US dollar's dominance in global finance is reduced, where Western countries can't easily impose their preferences through institutions like the IMF and World Bank, and where "non-Western" voices carry more weight.

**The Saudi-Iran Wildcard**

The most striking aspect of the 2024 expansion is that both Saudi Arabia and Iran joined. These two countries represent opposite ends of the Gulf's sectarian and geopolitical divide. They've fought proxy wars across the Middle East for decades.

Their simultaneous membership signals something important: both governments see BRICS primarily as an economic coordination tool and an alternative to Western financial systems, not as a political alliance requiring ideological alignment.

**The Dollar Question**

The most concrete policy goal shared by BRICS members is reducing dependence on the US dollar for international trade. Russia in particular has strong incentives here — dollar-denominated transactions are vulnerable to US sanctions.

Progress has been slow. The dollar remains dominant because it offers something alternatives don't: deep, liquid markets, rule of law, and global trust. Building a credible alternative takes decades, not years.

But the direction of travel is clear: more bilateral trade in non-dollar currencies, more BRICS members building alternatives to SWIFT, more pressure for reform of Bretton Woods institutions.`,
  },
  'passport-power-rankings-2025': {
    title: 'Which Passports Got Stronger in 2025 — And Which Got Weaker',
    date: '2025-03-01',
    tag: 'Data',
    readTime: '5 min read',
    content: `The Henley Passport Index, which tracks visa-free access for 199 passports, released its 2025 rankings — and there are some notable shifts worth paying attention to.

**The Perennial Leaders**

Japan held its top spot for the third consecutive year, with Japanese passport holders able to access 193 countries without a visa. Singapore and South Korea continue their ascent, with both now ranked in the top three.

The EU core — France, Germany, Spain, Italy, Netherlands — remains clustered in the top five, reflecting the Schengen Area's broad reciprocal visa agreements.

**The Biggest Winners**

Several countries made notable gains this year:

The UAE continued its remarkable run, now ranked 12th globally. A decade ago, UAE passport holders needed visas for most destinations. Aggressive diplomacy and treaty negotiations have transformed it into one of the most powerful passports in the developing world.

Several Southeast Asian nations also gained ground, reflecting growing economic ties and improving diplomatic relationships with Europe and North America.

**The Losers**

Countries under intensified sanctions or with deteriorating diplomatic relationships saw the steepest falls. Russian passport holders now have access to just 57 countries visa-free — down from over 100 before 2022. The practical impact on ordinary Russians, not just oligarchs, has been significant.

**What Actually Drives Passport Power**

Visa-free access is essentially a measure of how much other countries trust your government and your citizens. High-ranked passports come from stable democracies with strong rule of law, low corruption, and good diplomatic relationships.

The implication: if you want a stronger passport, your country generally needs to become more stable, more transparent, and more diplomatically active. There are no shortcuts — though investment migration programs (like the UAE's Golden Visa) can offer a workaround for individuals.`,
  },
};

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = POSTS[params.slug];
  if (!post) return { title: 'Blog | World Affairs' };

  return createMetadata({
    title: post.title,
    description: post.content.slice(0, 150).replace(/\*\*/g, '') + '...',
    path: `/blog/${params.slug}`,
    type: 'article',
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS[params.slug];
  if (!post) notFound();

  const jsonLd = articleJsonLd(post.title, post.content.slice(0, 150), post.date, `/blog/${params.slug}`);
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${params.slug}` },
  ]);

  const paragraphs = post.content.split('\n\n');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-24">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.tag }]}
            className="mb-6"
          />
          <div className="mb-6">
            <span
              className="inline-block px-2.5 py-1 rounded-md text-xs font-medium mb-3"
              style={{ backgroundColor: 'rgba(99, 102, 241, 0.12)', color: 'var(--indigo-soft)' }}
            >
              {post.tag}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="prose-custom space-y-5">
            {paragraphs.map((p, i) => {
              if (p.startsWith('**') && p.endsWith('**')) {
                return (
                  <h2 key={i} className="text-xl font-bold mt-8" style={{ color: 'var(--text-primary)' }}>
                    {p.replace(/\*\*/g, '')}
                  </h2>
                );
              }
              return (
                <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {p.replace(/\*\*/g, '')}
                </p>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <Link href="/blog" className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: 'var(--indigo-soft)' }}>
              ← Back to all articles
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
