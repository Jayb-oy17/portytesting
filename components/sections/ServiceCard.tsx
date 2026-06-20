import { Smartphone, Monitor, Palette, Code2, Search, Zap, LucideIcon } from 'lucide-react';
import { Service } from '@/src/data/profile';

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Monitor,
  Palette,
  Code2,
  Search,
  Zap,
};

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon] || Code2;
  return (
    <div className="group rounded-2xl border border-border hover:border-sky-500/40 bg-card p-6 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/5 hover:-translate-y-1">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/10 to-teal-500/10 border border-sky-500/20 flex items-center justify-center mb-4 group-hover:from-sky-500/20 group-hover:to-teal-500/20 transition-all">
        <Icon className="w-5 h-5 text-sky-500" />
      </div>
      <h3 className="font-bold text-base mb-2 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
        {service.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
    </div>
  );
}
