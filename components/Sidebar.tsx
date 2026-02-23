'use client';

import type { SidebarProps, Section } from '@/lib/types';

const NAV_ITEMS: { section: Section; path: string; label: string }[] = [
  { section: 'home',           path: '~/',      label: 'HOME' },
  { section: 'work',           path: '/work',   label: 'WORK' },
  { section: 'education',      path: '/edu',    label: 'EDUCATION' },
  { section: 'projects',       path: '/proj',   label: 'PROJECTS' },
  { section: 'skills',         path: '/skills', label: 'SKILLS' },
  { section: 'leadership',     path: '/lead',   label: 'LEADERSHIP' },
  { section: 'certifications', path: '/cert',   label: 'CERTS' },
];

export default function Sidebar({ currentSection, status, onNavigate }: SidebarProps) {
  return (
    <aside className="control-panel" role="navigation" aria-label="Main Navigation">
      <div className="panel-header">
        <div className="sys-label">// PORTFOLIO.SYS v2.0</div>
        <div className="sys-name">
          DEV<br />
          FOLIO
        </div>
        <div className="sys-version">KERNEL: BRUTALIST-SWISS EDITION</div>
      </div>

      <div className="status-bar">
        <div className="status-dot" />
        <span>{status}</span>
      </div>

      <nav className="nav-list" aria-label="API Endpoints">
        {NAV_ITEMS.map(({ section, path, label }) => (
          <button
            key={section}
            className={`brutal-btn${currentSection === section ? ' active' : ''}`}
            onClick={() => onNavigate(section)}
          >
            <span className="btn-path">{path}</span>
            {label}
          </button>
        ))}
      </nav>

      <div className="panel-footer">
        ENDPOINT: vercel.app<br />
        STACK: NEXT.JS / TYPESCRIPT<br />
        CLIENT: REACT / CSS3
      </div>
    </aside>
  );
}
