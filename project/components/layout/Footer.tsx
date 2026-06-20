import Link from 'next/link';
import { Github, Twitter, Linkedin, Instagram, Code2, Heart } from 'lucide-react';
import { profile } from '@/src/data/profile';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">{profile.name}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {profile.tagline} based in {profile.city}. Available for freelance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Quick Links</h3>
            <div className="grid grid-cols-2 gap-1">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/portfolio', label: 'Portfolio' },
                { href: '/services', label: 'Services' },
                { href: '/github', label: 'GitHub' },
                { href: '/contact', label: 'Contact' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-sky-500 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Connect</h3>
            <div className="flex gap-3">
              {[
                { href: profile.socials.github, icon: Github, label: 'GitHub' },
                { href: profile.socials.twitter, icon: Twitter, label: 'Twitter' },
                { href: profile.socials.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: profile.socials.instagram, icon: Instagram, label: 'Instagram' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-sky-500 hover:border-sky-500/50 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <a href={`mailto:${profile.contactEmail}`} className="hover:text-sky-500 transition-colors">
                {profile.contactEmail}
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500 mx-1" /> using Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
