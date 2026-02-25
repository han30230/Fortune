import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

interface InterpretationProps {
  text: string;
}

export function Interpretation({ text }: InterpretationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-12 w-full max-w-4xl mx-auto"
    >
      <div className="relative p-8 md:p-12 bg-white rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100">
        {/* Decorative corner elements */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-accent/30 rounded-tl-xl" />
        <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-accent/30 rounded-tr-xl" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-accent/30 rounded-bl-xl" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-accent/30 rounded-br-xl" />

        <h3 className="text-2xl font-serif font-bold text-center text-primary mb-8">
          해설
        </h3>

        <div className="prose prose-stone prose-headings:font-serif prose-headings:text-primary prose-p:text-stone-600 prose-p:leading-relaxed prose-strong:text-accent-foreground max-w-none">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground italic">
            This reading is generated based on traditional Saju logic interpreted by AI. 
            Fate is in your hands; use this wisdom as a guide, not a rule.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
