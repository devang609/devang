'use client';

import { useRef, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Viewport from '@/components/Viewport';
import type { Section } from '@/lib/types';

export default function PortfolioApp() {
  const cacheRef = useRef<Map<string, unknown>>(new Map());

  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [sectionData, setSectionData] = useState<unknown>(null);
  const [status, setStatus] = useState('SYSTEM ONLINE');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState<{ endpoint: string; message: string } | null>(null);

  async function navigate(section: Section) {
    if (isLoading) return;

    setHasError(false);
    setErrorInfo(null);

    if (section === 'home') {
      setCurrentSection('home');
      setStatus('SYSTEM ONLINE');
      setSectionData(null);
      return;
    }

    // CACHE HIT
    if (cacheRef.current.has(section)) {
      const cached = cacheRef.current.get(section);
      setStatus(`CACHE HIT: /api/${section}`);
      setSectionData(cached);
      setCurrentSection(section);
      return;
    }

    // CACHE MISS — fetch from API
    setStatus(`CACHE MISS: /api/${section} — fetching...`);
    setCurrentSection(section);
    setSectionData(null);
    setIsLoading(true);

    try {
      const res = await fetch(`/api/${section}`);
      if (!res.ok) throw new Error(`HTTP_${res.status}: ${res.statusText}`);
      const data = await res.json();

      if (data && data._error) {
        throw new Error(data.message || 'FILE_READ_ERROR');
      }

      cacheRef.current.set(section, data);

      const count = Array.isArray(data) ? data.length : Object.keys(data).length;
      setStatus(`LOADED: /api/${section} [${count} records]`);
      setSectionData(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'CONNECTION_REFUSED';
      setHasError(true);
      setErrorInfo({ endpoint: section, message });
      setStatus(`ERROR: /api/${section}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="swiss-layout">
      <div className="dot-texture" />
      <Sidebar
        currentSection={currentSection}
        status={status}
        onNavigate={navigate}
      />
      <main className="main-content" role="main" aria-live="polite">
        <Viewport
          currentSection={currentSection}
          data={sectionData}
          isLoading={isLoading}
          hasError={hasError}
          errorInfo={errorInfo}
        />
      </main>
    </div>
  );
}
