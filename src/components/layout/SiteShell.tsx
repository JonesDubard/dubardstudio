import SkipLink from '@/components/layout/SkipLink';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/feedback/BackToTop';
import { getSettings } from '@/lib/content';

type SiteShellProps = {
  tagline: string;
  email: string;
  /** Optional override; defaults to CMS settings.verdantUrl */
  verdantUrl?: string;
  children: React.ReactNode;
};

/**
 * Shared chrome for marketing pages — skip link, header, main landmark, footer.
 */
export default function SiteShell({ tagline, email, verdantUrl, children }: SiteShellProps) {
  const settings = getSettings();
  const holdingUrl = verdantUrl ?? settings.verdantUrl;

  return (
    <>
      <SkipLink />
      <Header tagline={tagline} whatsapp={settings.whatsapp} />
      <main id="main-content">{children}</main>
      <Footer email={email} verdantUrl={holdingUrl} />
      <BackToTop />
    </>
  );
}
