import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/content';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const meta = [project.industry, project.client].filter(Boolean).join(' · ');

  return (
    <article className="project-card">
      <Link href={`/work/${project.slug}/`} className="project-card-link">
        <div className="project-image-wrap">
          <Image
            src={project.image}
            alt=""
            width={480}
            height={300}
          />
          {project.industry && <span className="project-badge">{project.industry}</span>}
        </div>
        <div className="project-body">
          {meta && <span className="project-timeline">{meta}</span>}
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>
          <span className="project-link">View case →</span>
        </div>
      </Link>
    </article>
  );
}
