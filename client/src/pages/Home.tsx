import { useState } from "react";
import { useAnalyzeSaju } from "@/hooks/use-saju";
import { SajuForm } from "@/components/SajuForm";
import { PillarCard } from "@/components/PillarCard";
import { Interpretation } from "@/components/Interpretation";
import { type AnalyzeSajuResponse } from "@shared/schema";
import { Sparkles, RefreshCw, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { mutate, isPending, isError, error, reset } = useAnalyzeSaju();
  const [result, setResult] = useState<AnalyzeSajuResponse | null>(null);

  const handleSubmit = (data: any) => {
    reset();
    mutate(data, {
      onSuccess: (data) => {
        setResult(data);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    });
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-stone-50/80 selection:bg-accent/30 selection:text-primary-foreground">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      {/* 헤더: 명리, 새 운세, 기록 보관함, 시작하기 */}
      <header className="relative border-b border-border/50 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-serif font-bold text-xl text-primary">
            <Sparkles className="w-5 h-5 text-accent" />
            명리 (Myeongri)
          </div>
          <nav className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              새로운 운세
            </button>
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              기록 보관함
            </button>
            <Button size="sm" className="gap-1.5 bg-primary hover:bg-primary/90">
              <Sparkles className="w-4 h-4" />
              시작하기
            </Button>
          </nav>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <AnimatePresence mode="wait">
          {!result ? (
            /* 좌우 레이아웃: 왼쪽 프로모션, 오른쪽 폼 */
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]"
            >
              <div className="space-y-6 order-2 lg:order-1">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary leading-tight">
                  당신의 운명을 발견하세요
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  수천 년 동양 철학과 최신 AI 기술을 결합하여, 오늘의 운세부터 평생 사주까지
                  인생에 대한 깊은 통찰을 제공합니다.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-primary/20 border-2 border-white flex items-center justify-center"
                      >
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    ))}
                  </div>
                  <span>10,000+ 명의 사용자가 이미 운세를 확인했습니다</span>
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-4">
                {isError && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 text-sm">
                    {error?.message || "운세 조회 중 오류가 발생했습니다."}
                  </div>
                )}
                <SajuForm onSubmit={handleSubmit} isPending={isPending} />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="gap-2 border-primary/20 hover:bg-primary/5 text-primary"
                >
                  <RefreshCw className="w-4 h-4" />
                  새로운 운세 보기
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
      
      <footer className="relative py-8 text-center text-sm text-muted-foreground border-t border-border/50 bg-white/50 backdrop-blur-sm mt-12">
        <p>© 명리 (Myeongri). 동양의 지혜로 당신의 운명을 열어갑니다.</p>
      </footer>
    </div>
  );
}
