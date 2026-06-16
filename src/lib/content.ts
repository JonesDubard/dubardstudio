import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

// ── Settings ──────────────────────────────────────────────
export function getSettings() {
  const file = path.join(contentDir, 'settings.json');
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

// ── Services ──────────────────────────────────────────────
export function getServices() {
  const file = path.join(contentDir, 'services.json');
  return JSON.parse(fs.readFileSync(file, 'utf-8')).services;
}

// ── Projects ──────────────────────────────────────────────
export function getProjects() {
  const dir = path.join(contentDir, 'projects');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

  return files
    .map(filename => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const { data } = matter(raw);
      return { ...data, slug: filename.replace('.md', '') } as Project;
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

// ── Testimonials ──────────────────────────────────────────
export function getTestimonials() {
  const dir = path.join(contentDir, 'testimonials');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

  return files
    .map(filename => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const { data } = matter(raw);
      return data as Testimonial;
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

// ── Types ─────────────────────────────────────────────────
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
  tech?: string;
};

export type Testimonial = {
  name: string;
  role?: string;
  quote: string;
  photo?: string;
  order: number;
};

export type Service = {
  title: string;
  tagline: string;
  icon: string;
  items: string[];
};
