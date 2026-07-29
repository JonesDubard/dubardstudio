'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/content';

type WorkIndexProps = {
  projects: Project[];
};

/**
 * Work index — curated cases with light industry filter (no tag clouds / tech stacks).
 */
export default function WorkIndex({ projects }: WorkIndexProps) {
  const industries = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => {
      if (p.industry) set.add(p.industry);
    });
    return ['All', ...Array.from(set).sort()];
  }, [projects]);

  const [active, setActive] = useState('All');

  const visible = useMemo(() => {
    if (active === 'All') return projects;
    return projects.filter(p => p.industry === active);
  }, [projects, active]);

  const showFilters = industries.length > 2;

  return (
    <div className="work-index">
      {showFilters && (
        <div className="work-filters" role="group" aria-label="Filter by industry">
          {industries.map(industry => {
            const selected = active === industry;
            return (
              <button
                key={industry}
                type="button"
                className={`work-filter${selected ? ' is-active' : ''}`}
                aria-pressed={selected}
                onClick={() => setActive(industry)}
              >
                {industry}
              </button>
            );
          })}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="work-empty">No cases in this industry yet. View all work or start a conversation.</p>
      ) : (
        <ul className="work-list">
          {visible.map(project => {
            const meta = [project.industry, project.client].filter(Boolean).join(' · ');
            return (
              <li key={project.slug}>
                <article>
                  <Link href={`/work/${project.slug}/`} className="work-item">
                    <div className="work-item-media">
                      <Image
                        src={project.image}
                        alt=""
                        width={640}
                        height={400}
                        sizes="(max-width: 800px) 100vw, 320px"
                      />
                    </div>
                    <div className="work-item-body">
                      {meta && <span className="work-item-meta">{meta}</span>}
                      <h2 className="work-item-title">{project.title}</h2>
                      <p className="work-item-desc">{project.description}</p>
                      {project.problem && (
                        <p className="work-item-challenge">
                          <span className="work-item-label">Business challenge</span>
                          {project.problem}
                        </p>
                      )}
                      {project.valueDelivered && (
                        <p className="work-item-value">
                          <span className="work-item-label">Value delivered</span>
                          {project.valueDelivered}
                        </p>
                      )}
                      <span className="work-item-link">View case study</span>
                    </div>
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
