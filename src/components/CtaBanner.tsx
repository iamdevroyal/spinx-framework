import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CtaBannerProps {
  onOpenPlayground: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenPlayground }) => {
  return (
    <section className="w-full py-28 md:py-36 bg-[#0A0A0B] border-y border-white/10 relative overflow-hidden magenta-glow">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E11D63]/15 border border-[#E11D63]/30 text-[#ffb2bf] text-xs font-mono-code uppercase tracking-widest">
            <Sparkles size={13} />
            <span>Built for scale</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            Structure and speed,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffb2bf] to-[#E11D63]">
              in the same install.
            </span>
          </h2>

          <p className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            No Doctrine to fight for coroutine safety. No separate Node process in production. No architecture left to drift.
          </p>

          <div className="pt-6">
            <button
              onClick={onOpenPlayground}
              className="bg-white text-black hover:bg-gray-200 font-mono-code text-xs md:text-sm uppercase tracking-widest px-10 py-5 rounded-full font-bold inline-flex items-center gap-3 group shadow-[0_0_35px_rgba(225,29,99,0.5)] transition-all duration-200 hover:scale-105"
            >
              <span>Start building</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
