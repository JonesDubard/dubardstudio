import type { Metadata } from 'next';
import './globals.css';
import { getSettings } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';
import { fontBody, fontDisplay, fontMono } from '@/lib/fonts';
import NetlifyIdentity from '@/components/layout/NetlifyIdentity';

export async function generateMetadata(): Promise<Metadata> {
  const s = getSettings();
  return buildPageMetadata({
    description: s.defaultSeoDescription || s.heroSubheadline,
    ogImage: s.ogImage || s.heroImage,
  });
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var saved = localStorage.getItem('dubard-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = saved || (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
        <NetlifyIdentity />
      </body>
    </html>
  );
}
