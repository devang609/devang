'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';
import type {
  ViewportProps,
  WorkEntry,
  EducationEntry,
  Project,
  SkillsData,
  LeadershipEntry,
  CertificationEntry,
} from '@/lib/types';

// ─── Loading View ─────────────────────────────────────────────────────────────
function LoadingView({ section }: { section: string }) {
  const [fill, setFill] = useState(0);

  useEffect(() => {
    setFill(0);
    const id = setInterval(() => {
      setFill((prev) => {
        const next = Math.min(prev + 2, 19);
        if (next >= 19) clearInterval(id);
        return next;
      });
    }, 80);
    return () => clearInterval(id);
  }, [section]);

  const remaining = Math.max(0, 19 - fill);
  const filled = '█'.repeat(fill) + '░'.repeat(remaining);
  const pct = Math.round((fill / 19) * 100);

  return (
    <div className="loader-state">
      <div className="loader-label">
        <span>GET /api/{section}</span>
        <span className="cursor-blink" />
      </div>
      <div className="ascii-bar">
        [ {filled} ] {pct}%
      </div>
    </div>
  );
}

// ─── Error View ───────────────────────────────────────────────────────────────
function ErrorView({ endpoint, message }: { endpoint: string; message: string }) {
  return (
    <div className="error-state">
      <div className="error-card">
        <div className="error-header">!! FETCH_FAILURE</div>
        <div className="error-body">
          <div className="error-code">
            ENDPOINT: /api/{endpoint}
            <br />
            ERROR: {message}
            <br />
            TIME: {new Date().toISOString()}
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>
            This error is intentionally unsoftened. Raw truth in place of polite failure.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Home View ────────────────────────────────────────────────────────────────
function HomeView() {
  return (
    <div className="home-splash">
      <div>
        <div className="splash-name">
          <span className="invert-block">FULL</span>
          <br />
          STACK
          <br />
          ENGINEER.
        </div>
        <div className="splash-tagline">
          Java · Spring Boot · Cloud · Systems Design · Open Source
        </div>
      </div>
      <div className="splash-grid">
        <div className="splash-stat">
          <span className="stat-num">1+</span>
          <div className="stat-label">Years Experience</div>
        </div>
        <div className="splash-stat">
          <span className="stat-num">3</span>
          <div className="stat-label">Projects Built</div>
        </div>
        <div className="splash-stat">
          <span className="stat-num">4</span>
          <div className="stat-label">Certifications</div>
        </div>
      </div>
      <div className="splash-cta">
        SELECT ENDPOINT FROM CONTROL PANEL TO QUERY RESUME DATA →
      </div>
    </div>
  );
}

// ─── Work View ────────────────────────────────────────────────────────────────
function WorkView({ data }: { data: WorkEntry[] }) {
  return (
    <>
      <div className="section-header">
        <h1 className="section-title">WORK HISTORY</h1>
        <span className="section-endpoint">GET /api/work</span>
      </div>
      <div className="view-area">
        {data.map((job, i) => (
          <article
            key={i}
            className="log-entry"
            data-index={`[${String(i + 1).padStart(2, '0')}]`}
          >
            <header className="entry-header">
              <h2 className="company-name">{job.company}</h2>
              <div className="meta-row">
                <span>{job.role}</span>
                {job.location && (
                  <>
                    <span className="meta-divider"> | </span>
                    <span>{job.location}</span>
                  </>
                )}
                <span className="meta-divider"> | </span>
                <time>
                  {formatDate(job.startDate)} →{' '}
                  {job.endDate ? (
                    formatDate(job.endDate)
                  ) : (
                    <span
                      style={{
                        background: 'var(--paper)',
                        color: 'var(--void)',
                        padding: '0.1em 0.4em',
                        fontSize: '0.85em',
                        border: '1px solid var(--paper)',
                      }}
                    >
                      PRESENT
                    </span>
                  )}
                </time>
              </div>
            </header>
            <div className="entry-body">
              {Array.isArray(job.responsibilities) ? (
                <ul className="responsibilities-list">
                  {job.responsibilities.map((r, j) => (
                    <li key={j}>{r}</li>
                  ))}
                </ul>
              ) : (
                <p className="entry-description">{job.responsibilities}</p>
              )}
              {job.stack && job.stack.length > 0 && (
                <div className="tech-stack">
                  {job.stack.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

// ─── Education View ───────────────────────────────────────────────────────────
function EducationView({ data }: { data: EducationEntry[] }) {
  return (
    <>
      <div className="section-header">
        <h1 className="section-title">EDUCATION</h1>
        <span className="section-endpoint">GET /api/education</span>
      </div>
      <div className="view-area">
        <div className="table-wrap">
          <table className="brutal-table" aria-label="Education history">
            <thead>
              <tr>
                <th>Institution</th>
                <th>Degree</th>
                <th>Field</th>
                <th>Duration</th>
                <th>GPA</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => (
                <tr key={i}>
                  <td>
                    <strong>{e.institution}</strong>
                  </td>
                  <td>{e.degree}</td>
                  <td>{e.field}</td>
                  <td>
                    {e.startDate} – {e.endDate}
                  </td>
                  <td>{e.gpa || '—'}</td>
                  <td style={{ fontSize: '0.75rem', opacity: 0.7 }}>{e.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ─── Projects View ────────────────────────────────────────────────────────────
function ProjectsView({ data }: { data: Project[] }) {
  return (
    <>
      <div className="section-header">
        <h1 className="section-title">PROJECTS</h1>
        <span className="section-endpoint">GET /api/projects</span>
      </div>
      <div className="view-area" style={{ padding: 0 }}>
        <div className="projects-grid">
          {data.map((p, i) => (
            <div key={i} className="project-card">
              <div className="project-img-wrap">
                <div className="project-img-placeholder">{p.title.charAt(0)}</div>
              </div>
              <div className="project-body">
                <h2 className="project-title">{p.title}</h2>
                <p className="project-desc">{p.description}</p>
                <div className="tech-stack" style={{ marginBottom: '0.75rem' }}>
                  {(p.stack || []).map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="project-footer">
                  <span className="cert-tag">{p.status}</span>
                  <a
                    className="project-link"
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    VIEW REPO →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Skills View ──────────────────────────────────────────────────────────────
function SkillsView({ data }: { data: SkillsData }) {
  return (
    <>
      <div className="section-header">
        <h1 className="section-title">SKILLS</h1>
        <span className="section-endpoint">GET /api/skills</span>
      </div>
      <div className="view-area">
        {Object.entries(data).map(([cat, skills]) => (
          <div key={cat} className="skill-category">
            <h2 className="skill-category-name">{cat}</h2>
            <div className="skill-bricks">
              {skills.map((s) => (
                <span key={s} className="skill-brick" tabIndex={0}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Leadership View ──────────────────────────────────────────────────────────
function LeadershipView({ data }: { data: LeadershipEntry[] }) {
  return (
    <>
      <div className="section-header">
        <h1 className="section-title">LEADERSHIP</h1>
        <span className="section-endpoint">GET /api/leadership</span>
      </div>
      <div className="view-area">
        <div className="table-wrap">
          <table className="brutal-table" aria-label="Leadership experience">
            <thead>
              <tr>
                <th>Role</th>
                <th>Organization</th>
                <th>Duration</th>
                <th>Impact</th>
              </tr>
            </thead>
            <tbody>
              {data.map((l, i) => (
                <tr key={i}>
                  <td>
                    <strong>{l.role}</strong>
                  </td>
                  <td>{l.organization}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{l.duration}</td>
                  <td style={{ fontSize: '0.8rem' }}>{l.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ─── Certifications View ──────────────────────────────────────────────────────
function CertificationsView({ data }: { data: CertificationEntry[] }) {
  return (
    <>
      <div className="section-header">
        <h1 className="section-title">CERTIFICATIONS</h1>
        <span className="section-endpoint">GET /api/certifications</span>
      </div>
      <div className="view-area">
        <div className="table-wrap">
          <table className="brutal-table" aria-label="Certifications">
            <thead>
              <tr>
                <th>Certification</th>
                <th>Issuer</th>
                <th>Issued</th>
                <th>Expires</th>
                <th>Credential ID</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c, i) => (
                <tr key={i}>
                  <td>
                    <strong>{c.name}</strong>
                  </td>
                  <td>{c.issuer}</td>
                  <td>{c.issued}</td>
                  <td>{c.expires}</td>
                  <td
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      opacity: 0.6,
                    }}
                  >
                    {c.id || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ─── Exported Viewport ────────────────────────────────────────────────────────
export default function Viewport({
  currentSection,
  data,
  isLoading,
  hasError,
  errorInfo,
}: ViewportProps) {
  if (currentSection === 'home') return <HomeView />;
  if (isLoading) return <LoadingView section={currentSection} />;
  if (hasError && errorInfo) return <ErrorView {...errorInfo} />;
  if (!data) return null;

  switch (currentSection) {
    case 'work':
      return <WorkView data={data as WorkEntry[]} />;
    case 'education':
      return <EducationView data={data as EducationEntry[]} />;
    case 'projects':
      return <ProjectsView data={data as Project[]} />;
    case 'skills':
      return <SkillsView data={data as SkillsData} />;
    case 'leadership':
      return <LeadershipView data={data as LeadershipEntry[]} />;
    case 'certifications':
      return <CertificationsView data={data as CertificationEntry[]} />;
    default:
      return null;
  }
}
