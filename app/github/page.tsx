"use client";

import { useState, useEffect, useRef } from "react";
import {
  Github,
  Star,
  GitFork,
  Code2,
  Activity,
  ExternalLink,
  MessageSquare,
  X,
  Send,
} from "lucide-react";
import { profile } from "@/src/data/profile";
import CodingActivity from "@/components/CodingActivity";

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.05 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  CSS: "#563d7c",
  HTML: "#e34c26",
};

const PRESET_QS = [
  "What languages do you use most?",
  "How many projects do you have?",
  "What's your most recent project?",
  "Do you have live demos?",
];

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([
    {
      from: "bot",
      text: "Hi! I'm your GitHub activity assistant. Ask me anything about this developer's work!",
    },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const respond = (q: string) => {
    const lower = q.toLowerCase();
    let answer =
      "I'm not sure about that. Try asking about projects, languages, or recent activity!";
    if (lower.includes("language") || lower.includes("stack")) {
      answer = `The main languages used are JavaScript (${profile.projects.filter((p) => p.language === "JavaScript").length} projects), TypeScript (${profile.projects.filter((p) => p.language === "TypeScript").length} projects), and CSS/HTML for styling.`;
    } else if (lower.includes("project") && lower.includes("how many")) {
      answer = `There are ${profile.projects.length} featured projects in the portfolio, selected from 37 public repositories on GitHub.`;
    } else if (lower.includes("recent") || lower.includes("latest")) {
      answer = `The most recent featured project is "${profile.projects[0].title}" — ${profile.projects[0].description.split(".")[0]}.`;
    } else if (lower.includes("demo") || lower.includes("live")) {
      const withDemo = profile.projects.filter((p) => p.liveUrl).length;
      answer = `${withDemo} out of ${profile.projects.length} featured projects have live demos deployed on Vercel.`;
    } else if (lower.includes("experience")) {
      answer = `This developer has ${profile.stats[0].value} experience with ${profile.stats[1].value} projects completed.`;
    } else if (lower.includes("github")) {
      answer = `GitHub username is ${profile.githubUsername}. You can view all 37+ public repositories at github.com/${profile.githubUsername}.`;
    }
    return answer;
  };

  const send = (text?: string) => {
    const q = text || input.trim();
    if (!q) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text: q },
      { from: "bot", text: respond(q) },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div
          className="mb-3 w-80 rounded-2xl border border-sky-500/30 bg-card shadow-2xl shadow-sky-500/10 overflow-hidden flex flex-col"
          style={{ height: 380 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-sky-500 to-teal-500">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-white" />
              <span className="text-white font-semibold text-sm">
                GitHub Assistant
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                    m.from === "user"
                      ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Presets */}
          {messages.length <= 2 && (
            <div className="px-3 py-1 flex flex-wrap gap-1">
              {PRESET_QS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs px-2 py-0.5 rounded-full border border-sky-500/30 text-sky-500 hover:bg-sky-500/10 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-1 p-2 border-t border-border/50">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask something..."
              className="flex-1 text-xs bg-muted rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-sky-500/50"
            />
            <button
              onClick={() => send()}
              className="p-2 rounded-lg bg-gradient-to-r from-sky-500 to-teal-500 text-white hover:opacity-90 transition-opacity"
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-teal-500 text-white shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-105 transition-all flex items-center justify-center animate-pulse-glow"
      >
        <MessageSquare className="w-5 h-5" />
      </button>
    </div>
  );
}

export default function GitHubPage() {
  return (
    <div className="pt-16">
      <ChatWidget />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-sky-500/5 to-transparent border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-sm font-semibold text-sky-500 uppercase tracking-widest">
                Open Source
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-2">
                GitHub <span className="gradient-text">Activity</span>
              </h1>
              <p className="text-muted-foreground">
                @{profile.githubUsername} · 37+ public repositories
              </p>
            </div>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-sky-500 to-teal-500 text-white hover:opacity-90 transition-opacity shadow-md"
            >
              <Github className="w-4 h-4" /> View GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Github, label: "Public Repos", value: "37+" },
              { icon: Star, label: "Total Stars", value: "1" },
              { icon: Code2, label: "Languages", value: "4" },
              { icon: Activity, label: "Active Since", value: "2024" },
            ].map(({ icon: Icon, label, value }, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="rounded-2xl border border-border bg-card p-4 text-center hover:border-sky-500/30 transition-all">
                  <Icon className="w-5 h-5 text-sky-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold gradient-text">
                    {value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Language breakdown */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-8">
              Language <span className="gradient-text">Breakdown</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { lang: "HTML", count: 18, pct: 49 },
              { lang: "JavaScript", count: 10, pct: 27 },
              { lang: "CSS", count: 6, pct: 16 },
              { lang: "TypeScript", count: 3, pct: 8 },
            ].map((l, i) => (
              <FadeIn key={l.lang} delay={i * 100}>
                <div className="rounded-2xl border border-border bg-card p-5 hover:border-sky-500/30 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ background: langColors[l.lang] || "#888" }}
                    />
                    <span className="font-semibold text-sm">{l.lang}</span>
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-1">
                    {l.count}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    repositories
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 to-teal-500"
                      style={{ width: `${l.pct}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {l.pct}%
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured repos */}
      <section className="py-16 bg-muted/20 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-8">
              Featured <span className="gradient-text">Repositories</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.projects.map((p, i) => (
              <FadeIn key={p.title} delay={i * 60}>
                <div className="rounded-xl border border-border bg-card p-4 hover:border-sky-500/30 transition-all group">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-sky-500 shrink-0" />
                      <span className="font-semibold text-sm group-hover:text-sky-500 transition-colors">
                        {p.title}
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      {p.repoUrl && (
                        <a
                          href={p.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-sky-500 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-teal-500 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">
                    {p.description.split(".")[0]}.
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: langColors[p.language] || "#888" }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {p.language}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <CodingActivity />
        </div>
      </section>
    </div>
  );
}
