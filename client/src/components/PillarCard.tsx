import { motion } from "framer-motion";
import type { Pillar } from "@shared/schema";

interface PillarCardProps {
  title: string;
  pillar: Pillar;
  index: number;
}

export function PillarCard({ title, pillar, index }: PillarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col items-center"
    >
      <div className="text-sm font-serif text-muted-foreground uppercase tracking-widest mb-3">
        {title}
      </div>
      
      <div className="w-full bg-white border border-accent/30 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Heavenly Stem (Top) */}
        <div className="flex flex-col items-center justify-center py-6 border-b border-accent/10 bg-gradient-to-b from-white to-stone-50/50">
          <span className="text-4xl md:text-5xl font-serif text-primary mb-1 font-bold">
            {pillar.gan}
          </span>
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            {pillar.ganKorean}
          </span>
        </div>
        
        {/* Earthly Branch (Bottom) */}
        <div className="flex flex-col items-center justify-center py-6 bg-stone-50/30">
          <span className="text-4xl md:text-5xl font-serif text-primary mb-1 font-bold">
            {pillar.zhi}
          </span>
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            {pillar.zhiKorean}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
