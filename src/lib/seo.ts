import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/site';

type BuildMetadataInput = {
  title?: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  /** Absolute or site-relative image path from CMS */
  ogImage?: string;
};

/**
 * Shared metadata builder — CMS-driven description, stable canonical base.
 */
export function buildPageMetadata({
  title,
  description,
  path = '/',
  noIndex = false,
  ogImage,
}: BuildMetadataInput): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = new URL(path, `${SITE_URL}/`).toString();
  const images = ogImage
    ? [{ url: ogImage.startsWith('http') ? ogImage : new URL(ogImage, `${SITE_URL}/`).toString() }]
    : undefined;

  return {
    metadataBase: new URL(`${SITE_URL}/`),
    title: pageTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: title ? `${title} | ${SITE_NAME}` : SITE_NAME,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      ...(images ? { images } : {}),
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
