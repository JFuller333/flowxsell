import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export const ProjectCard = ({ title, description, tags, link }: ProjectCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary hover:shadow-[0_0_25px_hsla(var(--neon-glow),0.3)]">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl transition-all duration-500 group-hover:bg-primary/10" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
        
        <p className="text-muted-foreground leading-relaxed mb-4">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};
