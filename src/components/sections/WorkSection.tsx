import Image from 'next/image';
import Link from 'next/link';
import ProjectCard from '@/components/work/ProjectCard';
import type { Project } from '@/lib/content';

type WorkSectionProps = {
  projects: Project[];
  variant?: 'page' | 'teaser';
};

export default function WorkSection({ projects, variant = 'page' }: WorkSectionProps) {
  const isTeaser = variant === 'teaser';
  const headingId = isTeaser ? 'home-work-heading' : 'workHeading';

  if (isTeaser) {
    return (
      <section id="home-work" className="section home-proof" aria-labelledby={headingId}>
        <div className="container">
          <span className="section-label">Outcomes</span>
          <h2 id={headingId} className="section-title">
            Selected work
          </h2>
          <p className="section-desc">
            Business problems solved, and the value delivered. Quality over wallpaper.
          </p>

          <ul className="proof-list">
            {projects.map(project => {
              const meta = [project.industry, project.client].filter(Boolean).join(' · ');
              return (
                <li key={project.slug}>
                  <Link href={`/work/${project.slug}/`} className="proof-item">
                    <div className="proof-media">
                      <Image
                        src={project.image}
                        alt=""
                        width={480}
                        height={300}
                        sizes="(max-width: 700px) 100vw, 280px"
                      />
                    </div>
                    <div className="proof-body">
                      {meta && <span className="proof-meta">{meta}</span>}
                      <h3 className="proof-title">{project.title}</h3>
                      <p className="proof-desc">{project.description}</p>
                      {project.valueDelivered && (
                        <p className="proof-value">{project.valueDelivered}</p>
                      )}
                      <span className="proof-link">View case</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="section-more">
            <Link href="/work/" className="btn btn-outline">
              View all work
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="projects" aria-labelledby={headingId}>
      <div className="container">
        <span className="section-label">Work</span>
        <h2 id={headingId} className="section-title">
          Selected work
        </h2>
        <p className="section-desc">
          Curated engagements that show business challenge, solution, and outcomes.
        </p>

        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
