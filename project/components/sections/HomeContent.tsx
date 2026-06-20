'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { ArrowRight, Download, Github, MapPin, CheckCircle } from 'lucide-react';
import { profile } from '@/src/data/profile';
import TypedText from '@/components/sections/TypedText';
import { AnimatedCounter } from '@/components/sections/AnimatedCounter';
import { SkillBar } from '@/components/sections/SkillBar';
import ProjectCard from '@/components/sections/ProjectCard';
import ServiceCard from '@/components/sections/ServiceCard';

const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
});

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === 'dark' : true;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{ background: isDark
              ? 'radial-gradient(ellipse at 60% 40%, rgba(14,165,233,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 70%, rgba(20,184,166,0.08) 0%, transparent 50%), hsl(var(--background))'
              : 'radial-gradient(ellipse at 60% 40%, rgba(14,165,233,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 70%, rgba(20,184,166,0.06) 0%, transparent 50%), hsl(var(--background))'
            }}
          />
        </div>

        {/* 3D Canvas */}
        <div className="absolute inset-0 -z-5">
          {mounted && <HeroCanvas isDark={isDark} />}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
          <div className="max-w-3xl">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/5 text-teal-600 dark:text-teal-400 text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              Available for Freelance
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4 tracking-tight">
              Hi, I'm{' '}
              <span className="gradient-text">{profile.name.split(' ')[0]}</span>
            </h1>

            <div className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6 h-10">
              <TypedText strings={profile.role} className="gradient-text" />
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              {profile.bio}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-sky-500 to-teal-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-sky-500/20"
              >
                View My Work <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-border hover:border-sky-500/50 hover:bg-sky-500/5 transition-all"
              >
                Hire Me
              </Link>
              <a
                href={profile.resumeUrl}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-border hover:border-sky-500/50 hover:bg-sky-500/5 transition-all"
              >
                <Download className="w-4 h-4" /> Resume
              </a>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-border/50">
              {profile.stats.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <div className="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-current animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border/50 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {profile.stats.map((s, i) => (
              <AnimatedCounter key={i} value={s.value} label={s.label} delay={i * 150} />
            ))}
          </div>
        </div>
      </section>

      {/* About Mini */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-4">
              <span className="text-sm font-semibold text-sky-500 uppercase tracking-widest">Who Am I</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              About <span className="gradient-text">Me</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn delay={100}>
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden neon-border shadow-2xl">
                  <img
                    src={profile.profilePicture}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 opacity-20 blur-xl" />
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full border-2 border-sky-500/30 animate-rotate-slow" />
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed text-lg">{profile.bio}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-sky-500" />
                    <span className="text-muted-foreground">{profile.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    <span className="text-teal-600 dark:text-teal-400 font-medium">Freelance Available</span>
                  </div>
                </div>
                <div className="space-y-3 pt-4">
                  {profile.skills.slice(0, 5).map((s, i) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 100} />
                  ))}
                </div>
                <div className="pt-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-sky-500 hover:text-sky-400 font-medium transition-colors"
                  >
                    More About Me <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services Mini */}
      <section className="py-24 bg-muted/20 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-4">
              <span className="text-sm font-semibold text-sky-500 uppercase tracking-widest">What I Offer</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              My <span className="gradient-text">Services</span>
            </h2>
            <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto">
              Comprehensive frontend solutions designed to elevate your digital presence.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.services.slice(0, 3).map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <ServiceCard service={s} />
              </FadeIn>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-sky-500/50 hover:bg-sky-500/5 transition-all font-medium"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Mini */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-4">
              <span className="text-sm font-semibold text-sky-500 uppercase tracking-widest">My Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto">
              Real-world projects built with precision, passion, and purpose.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.slice(0, 2).map((p, i) => (
              <FadeIn key={i} delay={i * 150}>
                <ProjectCard project={p} />
              </FadeIn>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-sky-500/50 hover:bg-sky-500/5 transition-all font-medium"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-gradient-to-br from-sky-500/10 via-cyan-500/5 to-teal-500/10 border-t border-border/50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Let's Build Something{' '}
              <span className="gradient-text">Amazing Together</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Have a project in mind? I'd love to hear about it. Let's turn your vision into a reality.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-sky-500 to-teal-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-sky-500/20"
              >
                Start a Project <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold border border-border hover:border-sky-500/50 hover:bg-sky-500/5 transition-all"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
