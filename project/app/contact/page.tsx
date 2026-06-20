'use client';

import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram, Send, MessageSquare, CheckCircle } from 'lucide-react';
import { profile } from '@/src/data/profile';

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
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

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const socials = [
    { href: profile.socials.github, icon: Github, label: 'GitHub', color: 'hover:text-sky-500' },
    { href: profile.socials.twitter, icon: Twitter, label: 'Twitter', color: 'hover:text-sky-400' },
    { href: profile.socials.linkedin, icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-500' },
    { href: profile.socials.instagram, icon: Instagram, label: 'Instagram', color: 'hover:text-pink-500' },
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-sky-500/5 to-transparent border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-sky-500 uppercase tracking-widest">Get In Touch</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-4">
            Let's Build Something{' '}
            <span className="gradient-text">Amazing</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have a project in mind? A question? Or just want to say hello? I'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Body */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Info */}
            <FadeIn delay={0}>
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Contact <span className="gradient-text">Info</span></h2>
                  <p className="text-muted-foreground text-sm">Ready to collaborate — reach out through any channel.</p>
                </div>

                {[
                  { icon: Mail, label: 'Email', value: profile.contactEmail, href: `mailto:${profile.contactEmail}` },
                  { icon: Phone, label: 'WhatsApp', value: profile.whatsapp, href: `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}` },
                  { icon: MapPin, label: 'Location', value: profile.city, href: undefined },
                ].map(({ icon: Icon, label, value, href }, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-sky-500/30 transition-all group">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500/10 to-teal-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-sky-500" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{label}</div>
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-sky-500 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <div className="text-sm font-medium">{value}</div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Availability */}
                <div className="p-4 rounded-xl border border-teal-500/30 bg-teal-500/5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">Available for Freelance</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Currently accepting new projects and collaborations.</p>
                </div>

                {/* Socials */}
                <div>
                  <p className="text-sm font-medium mb-3">Follow Me</p>
                  <div className="flex gap-2">
                    {socials.map(({ href, icon: Icon, label, color }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className={`w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground ${color} hover:border-sky-500/50 transition-all`}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={150}>
              <div className="lg:col-span-3">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-teal-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                      className="px-5 py-2.5 rounded-xl border border-border hover:border-sky-500/50 text-sm font-medium transition-all"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Your Name</label>
                        <input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="John Doe"
                          className={`w-full px-4 py-2.5 rounded-xl border bg-card text-sm outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${errors.name ? 'border-destructive' : 'border-border focus:border-sky-500/50'}`}
                        />
                        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Email Address</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@example.com"
                          className={`w-full px-4 py-2.5 rounded-xl border bg-card text-sm outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${errors.email ? 'border-destructive' : 'border-border focus:border-sky-500/50'}`}
                        />
                        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Subject</label>
                      <input
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="Project Inquiry"
                        className={`w-full px-4 py-2.5 rounded-xl border bg-card text-sm outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${errors.subject ? 'border-destructive' : 'border-border focus:border-sky-500/50'}`}
                      />
                      {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Message</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell me about your project..."
                        rows={6}
                        className={`w-full px-4 py-2.5 rounded-xl border bg-card text-sm outline-none focus:ring-2 focus:ring-sky-500/30 transition-all resize-none ${errors.message ? 'border-destructive' : 'border-border focus:border-sky-500/50'}`}
                      />
                      {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-sky-500 to-teal-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-sky-500/20 disabled:opacity-60"
                      >
                        {loading ? (
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        {loading ? 'Sending...' : 'Send Message'}
                      </button>
                      <a
                        href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-border hover:border-teal-500/50 hover:bg-teal-500/5 transition-all text-sm"
                      >
                        <MessageSquare className="w-4 h-4 text-teal-500" /> WhatsApp
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
