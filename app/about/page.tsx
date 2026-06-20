'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MapPin, CheckCircle, Download, Mail, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import { profile } from '@/src/data/profile';
import { AnimatedCounter } from '@/components/sections/AnimatedCounter';
import CircularSkill  from '@/components/ui/CircularSkill';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-sky-500/5 to-transparent border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-sky-500 uppercase tracking-widest">
            About Me
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-4">
            The <span className="gradient-text">Developer</span> Behind the Code
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate about crafting digital experiences that are beautiful,
            functional, and accessible.
          </p>
        </div>
      </section>

      {/* Bio + Image */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn delay={0}>
              <div className="relative">
                <div className="aspect-square max-w-sm mx-auto lg:ml-0 rounded-2xl overflow-hidden neon-border shadow-2xl">
                  <img
                    src={profile.profilePicture}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 rounded-2xl border border-border bg-card p-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-sm font-semibold">
                      Available for Work
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="space-y-5">
                <h2 className="text-3xl font-bold">{profile.name}</h2>
                <p className="text-sky-500 font-semibold">{profile.tagline}</p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {profile.bio}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                    <a
                      href={`mailto:${profile.contactEmail}`}
                      className="text-muted-foreground hover:text-sky-500 transition-colors truncate"
                    >
                      {profile.contactEmail}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
                    <span className="text-muted-foreground">
                      {profile.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4 text-sky-500 shrink-0" />
                    <span className="text-muted-foreground">
                      Frontend Developer
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-teal-500 shrink-0" />
                    <span className="text-teal-600 dark:text-teal-400 font-medium">
                      Freelance Available
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={profile.resumeUrl}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-sky-500 to-teal-500 text-white hover:opacity-90 transition-opacity shadow-md"
                  >
                    <Download className="w-4 h-4" /> Download Resume
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold border border-border hover:border-sky-500/50 hover:bg-sky-500/5 transition-all"
                  >
                    Get In Touch <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/20 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {profile.stats.map((s, i) => (
              <AnimatedCounter
                key={i}
                value={s.value}
                label={s.label}
                delay={i * 150}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-sky-500 uppercase tracking-widest">
                Technical Arsenal
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                Skills & <span className="gradient-text">Proficiency</span>
              </h2>
            </div>
          </FadeIn>
          <FadeIn className="flex justify-center">
            <CircularSkill skills={profile.skills} />
          </FadeIn>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20 bg-muted/20 border-t border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-sky-500 uppercase tracking-widest">
                Work History
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                Professional <span className="gradient-text">Experience</span>
              </h2>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500 via-cyan-500 to-teal-500 opacity-30" />

            <div className="space-y-8">
              {profile.experience.map((exp, i) => (
                <FadeIn key={i} delay={i * 150}>
                  <div className="relative pl-12 md:pl-20">
                    {/* Dot */}
                    <div className="absolute left-2.5 md:left-6 w-4 h-4 rounded-full bg-gradient-to-br from-sky-500 to-teal-500 shadow-lg shadow-sky-500/40 mt-1" />

                    <div className="rounded-2xl border border-border bg-card p-6 hover:border-sky-500/30 transition-all">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{exp.role}</h3>
                          <p className="text-sky-500 font-medium">
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full shrink-0">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skills.map((s) => (
                          <span
                            key={s}
                            className="text-xs px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
