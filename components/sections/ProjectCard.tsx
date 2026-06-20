import Link from 'next/link';
import { ExternalLink, Github, Tag } from 'lucide-react';
import { Project } from '@/src/data/profile';

const langColors: Record<string, string> = {
  TypeScript: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  JavaScript: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
  CSS: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
  HTML: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-2xl border border-border hover:border-sky-500/40 bg-card transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/5 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="h-3 bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 group-hover:opacity-100 opacity-60 transition-opacity" />

      <div className="p-6 flex flex-col flex-1">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-bold text-lg group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors leading-tight">
            {project.title}
          </h3>
          <div className="flex gap-1.5 shrink-0">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub repo"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Live demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2 py-0.5 rounded-md border font-medium ${langColors[tag] || 'bg-muted text-muted-foreground border-border'}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
