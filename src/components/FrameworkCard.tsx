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
    <Card className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm p-8 transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_hsla(var(--neon-glow),0.3)]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl transition-all duration-500 group-hover:bg-primary/10" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">{phase}</span>
        </div>
        
        <h3 className="mb-3 text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
};
