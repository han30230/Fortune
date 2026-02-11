import { useState } from "react";
import { useAnalyzeSaju } from "@/hooks/use-saju";
import { SajuForm } from "@/components/SajuForm";
import { PillarCard } from "@/components/PillarCard";
import { Interpretation } from "@/components/Interpretation";
import { type AnalyzeSajuResponse } from "@shared/schema";
import { Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { mutate, isPending } = useAnalyzeSaju();
  const [result, setResult] = useState<AnalyzeSajuResponse | null>(null);

  const handleSubmit = (data: any) => {
    mutate(data, {
      onSuccess: (data) => {
        setResult(data);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-accent/30 selection:text-primary-foreground">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-sm font-medium mb-4 border border-accent/20">
            <Sparkles className="w-4 h-4" />
            <span>Traditional Wisdom x Modern AI</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary tracking-tight">
            Destiny Reader
          </h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            Unlock the secrets of your fate through the ancient wisdom of Saju (Four Pillars), 
            interpreted with modern clarity.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!result ? (
            <div key="form">
              <SajuForm onSubmit={handleSubmit} isPending={isPending} />
            </div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Reset Button */}
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="gap-2 border-primary/20 hover:bg-primary/5 text-primary"
                >
                  <RefreshCw className="w-4 h-4" />
                  Analyze Another Destiny
                </Button>
              </div>

              {/* Four Pillars Display */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
                <PillarCard 
                  title="Hour Pillar (시주)" 
                  pillar={result.pillars.hour} 
                  index={0} 
                />
                <PillarCard 
                  title="Day Pillar (일주)" 
                  pillar={result.pillars.day} 
                  index={1} 
                />
                <PillarCard 
                  title="Month Pillar (월주)" 
                  pillar={result.pillars.month} 
                  index={2} 
                />
                <PillarCard 
                  title="Year Pillar (년주)" 
                  pillar={result.pillars.year} 
                  index={3} 
                />
              </div>

              {/* Interpretation Text */}
              <Interpretation text={result.interpretation} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      
      {/* Footer */}
      <footer className="relative py-8 text-center text-sm text-muted-foreground border-t border-border/50 bg-white/50 backdrop-blur-sm mt-12">
        <p>© 2024 Saju Destiny Reader. Embracing ancient Korean wisdom.</p>
      </footer>
    </div>
  );
}
