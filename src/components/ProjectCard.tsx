import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image: string;
  caseStudyLink?: string;
}

export const ProjectCard = ({ title, description, tags, link, image, caseStudyLink }: ProjectCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (caseStudyLink) {
      navigate(caseStudyLink);
    }
  };

  return (
    <Card 
      className="group relative overflow-hidden border-primary/20 bg-background transition-all duration-300 hover:border-primary hover:shadow-[0_0_25px_hsla(var(--neon-glow),0.3)] cursor-pointer"
      onClick={handleClick}
    >
      {/* Image Section */}
      <div className="relative aspect-video w-full overflow-hidden bg-card">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
      </div>
      
      {/* Content Section */}
      <div className="p-6">
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
        
        <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
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
