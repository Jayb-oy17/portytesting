'use client';

import { useState, useEffect, useRef } from 'react';
import { Filter } from 'lucide-react';
import { profile } from '@/src/data/profile';
import ProjectCard from '@/components/sections/ProjectCard';

const allTags = Array.from(new Set(profile.projects.flatMap((p) => p.tags)));

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function PortfolioPage() {
  const [activeTag, setActiveTag] = useState('All');

  const filtered = activeTag === 'All'
    ? profile.projects
    : profile.projects.filter((p) => p.tags.includes(activeTag));

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-sky-500/5 to-transparent border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-sky-500 uppercase tracking-widest">My Work</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-4">
            <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A curated collection of real-world projects — built with precision, purpose, and passion.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-b border-border/50 sticky top-16 z-40 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            <button
              onClick={() => setActiveTag('All')}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTag === 'All'
                  ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-md'
                  : 'border border-border hover:border-sky-500/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              All ({profile.projects.length})
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTag === tag
                    ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-md'
                    : 'border border-border hover:border-sky-500/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <FadeIn key={project.title} delay={i * 80}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No projects match the selected filter.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
