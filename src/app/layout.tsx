import type { Metadata } from 'next';
import './globals.css';
import { getSettings } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const s = getSettings();
  return {
    title: `${s.siteTitle} — Web Design & Development`,
    description: s.heroSubheadline,
    openGraph: {
      title: s.siteTitle,
      description: s.heroSubheadline,
      type: 'website',
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
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
        {/* Netlify Identity for CMS auth */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async />
      </head>
      <body>
        {children}
        {/* Netlify Identity redirect helper */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.netlifyIdentity) {
                window.netlifyIdentity.on("init", user => {
                  if (!user) {
                    window.netlifyIdentity.on("login", () => {
                      document.location.href = "/admin/";
                    });
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
