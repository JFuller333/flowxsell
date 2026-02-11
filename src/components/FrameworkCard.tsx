import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FrameworkCardProps {
  phase: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const FrameworkCard = ({ phase, title, description, icon: Icon }: FrameworkCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_hsla(var(--neon-glow),0.3)]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl transition-all duration-500 group-hover:bg-primary/10" />
      
      <div className="relative min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3 sm:mb-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 border border-primary/30 flex-shrink-0">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <span className="text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-widest">{phase}</span>
        </div>
        
        <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors break-words">
          {title}
        </h3>
        
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
};
