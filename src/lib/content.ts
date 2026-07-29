import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

function readJson<T>(relativePath: string): T {
  const file = path.join(contentDir, relativePath);
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as T;
}

export function getSettings(): SiteSettings {
  return readJson<SiteSettings>('settings.json');
}

export function getServices(): Service[] {
  return readJson<{ services: Service[] }>('services.json').services;
}

function readProjectFile(filename: string): Project {
  const raw = fs.readFileSync(path.join(contentDir, 'projects', filename), 'utf-8');
  const { data, content } = matter(raw);
  return {
    ...(data as Omit<Project, 'slug' | 'body'>),
    slug: filename.replace(/\.md$/, ''),
    body: content.trim() || undefined,
  };
}

export function getProjects(): Project[] {
  const dir = path.join(contentDir, 'projects');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(readProjectFile)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getProjectBySlug(slug: string): Project | null {
  const file = path.join(contentDir, 'projects', `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return readProjectFile(`${slug}.md`);
}

export function getProjectSlugs(): string[] {
  return getProjects().map(p => p.slug);
}

export function getTestimonials(): Testimonial[] {
  const dir = path.join(contentDir, 'testimonials');
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

  return files
    .map(filename => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const { data } = matter(raw);
      return data as Testimonial;
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

/** Light Studio people roster (optional Person content type). */
export function getPeople(): Person[] {
  const dir = path.join(contentDir, 'people');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const { data } = matter(raw);
      return {
        ...(data as Omit<Person, 'slug'>),
        slug: filename.replace(/\.md$/, ''),
      };
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

/** Optional future Page documents — additive CMS path (Phase 3). */
export function getPageBySlug(slug: string): PageDocument | null {
  const file = path.join(contentDir, 'pages', `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    description: data.description ? String(data.description) : undefined,
    body: content,
  };
}

function readResourceFile(filename: string): Resource {
  const raw = fs.readFileSync(path.join(contentDir, 'resources', filename), 'utf-8');
  const { data, content } = matter(raw);
  return {
    ...(data as Omit<Resource, 'slug' | 'body'>),
    slug: filename.replace(/\.md$/, ''),
    body: content.trim() || undefined,
  };
}

/** Wave A resource library — ungated or lightly linked (ADR-0004). */
export function getResources(): Resource[] {
  const dir = path.join(contentDir, 'resources');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(readResourceFile)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export type SiteSettings = {
  siteTitle: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  email: string;
  whatsapp: string;
  location: string;
  github?: string;
  linkedin?: string;
  profilePhoto: string;
  heroImage?: string;
  /** Blueprint primary CTA — defaults in UI if omitted */
  primaryCtaLabel?: string;
  /** Blueprint secondary CTA — defaults in UI if omitted */
  secondaryCtaLabel?: string;
  /** Site-wide SEO fallback description (Phase 3) */
  defaultSeoDescription?: string;
  /** Default Open Graph image path */
  ogImage?: string;
  /** Canonical Verdant Holdings URL for footer / Verdant page */
  verdantUrl?: string;
  /** Homepage studio teaser label */
  homeStudioLabel?: string;
  /** Homepage studio teaser heading */
  homeStudioTitle?: string;
  /** Homepage closing CTA band */
  homeCtaHeading?: string;
  homeCtaBody?: string;
  aboutPara1: string;
  aboutPara2?: string;
  cvFile?: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  timeline: string;
  category: string;
  url: string;
  image: string;
  featured: boolean;
  order: number;
  /** @deprecated Prefer business fields; not shown in UI */
  tech?: string;
  client?: string;
  industry?: string;
  problem?: string;
  approach?: string;
  outcomes?: string;
  valueDelivered?: string;
  craftNotes?: string;
  /** Optional SEO override; falls back to description */
  seoDescription?: string;
  body?: string;
};

export type Testimonial = {
  name: string;
  role?: string;
  quote: string;
  photo?: string;
  order: number;
};

export type Person = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  /** Optional portrait — builds trust; keep composition light */
  photo?: string;
  order?: number;
};

export type Service = {
  title: string;
  tagline: string;
  icon: string;
  items: string[];
  fit?: string;
  nonFit?: string;
};

export type PageDocument = {
  slug: string;
  title: string;
  description?: string;
  body: string;
};

export type Resource = {
  slug: string;
  title: string;
  summary: string;
  type: string;
  url: string;
  order: number;
  /** Optional longer notes under the fold */
  body?: string;
};
