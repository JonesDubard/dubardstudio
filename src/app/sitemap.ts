import type { MetadataRoute } from 'next';
import { getProjectSlugs } from '@/lib/content';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = [
    '/',
    '/work/',
    '/services/',
    '/approach/',
    '/studio/',
    '/verdant/',
    '/contact/',
    '/book/',
    '/resources/',
    '/fit/',
    '/privacy/',
    '/accessibility/',
  ];

  const cases = getProjectSlugs().map(slug => ({
    url: `${SITE_URL}/work/${slug}/`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes.map((path, i) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : 0.8,
    })),
    ...cases,
  ];
}
