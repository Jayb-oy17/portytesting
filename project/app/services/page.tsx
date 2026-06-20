'use client';

import { useEffect, useRef, useState } from 'react';
import { profile } from '@/src/data/profile';
import ServiceCard from '@/components/sections/ServiceCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-sky-500/5 to-transparent border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-sky-500 uppercase tracking-widest">What I Do</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-4">
            My <span className="gradient-text">Services</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            End-to-end frontend solutions — from pixel-perfect design to production-ready code.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.services.map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <ServiceCard service={s} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-muted/20 border-y border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-sky-500 uppercase tracking-widest">How I Work</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                My <span className="gradient-text">Process</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discover', desc: 'Deep-dive into your goals, audience, and requirements to establish a clear vision.' },
              { step: '02', title: 'Design', desc: 'Wireframes and high-fidelity mockups that align aesthetics with functionality.' },
              { step: '03', title: 'Develop', desc: 'Clean, performant code using modern frameworks and best practices.' },
              { step: '04', title: 'Deliver', desc: 'Thorough testing, launch, and ongoing support to ensure success.' },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="text-center p-6 rounded-2xl border border-border bg-card hover:border-sky-500/30 transition-all">
                  <div className="text-4xl font-bold gradient-text mb-3">{p.step}</div>
                  <h3 className="font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your <span className="gradient-text">Project?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's collaborate to build something remarkable. Get in touch and let's discuss your vision.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-sky-500 to-teal-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-sky-500/20"
            >
              Start a Project <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
