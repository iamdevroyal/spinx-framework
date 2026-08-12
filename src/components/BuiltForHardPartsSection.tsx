import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Server,
  Layers,
  KeyRound,
  Database,
  Clock,
  Layout,
  Smartphone,
  CheckCircle,
  ChevronDown
} from 'lucide-react';

interface BuiltForHardPartsSectionProps {
  onOpenDocs: () => void;
}

export const BuiltForHardPartsSection: React.FC<BuiltForHardPartsSectionProps> = ({
  onOpenDocs,
}) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const cards = [
    {
      icon: <Server size={20} className="text-[#E11D63]" />,
      title: 'Runtime driver',
      description: 'RoadRunner by default, Swoole opt-in — same request contract either way.',
      badge: 'RoadRunner / Swoole',
      details: 'Supports persistent worker pools without state leakage or global scope pollution.',
    },
    {
      icon: <Layers size={20} className="text-[#E11D63]" />,
      title: 'Application architecture',
      description: 'DDD modules enforced by the kernel, not left to a style guide.',
      badge: 'Kernel Enforced',
      details: 'Strict boundaries prevent cross-module dependencies without explicit DI interfaces.',
    },
    {
      icon: <KeyRound size={20} className="text-[#E11D63]" />,
      title: 'Authentication',
      description: 'Auth gates declared on the route, not assembled from middleware you have to remember to stack.',
      badge: 'Declarative',
      details: 'Self-documenting route definitions ensure zero unauthenticated endpoint leaks.',
    },
    {
      icon: <Database size={20} className="text-[#E11D63]" />,
      title: 'Data access',
      description: 'A DBAL-based ORM with Eloquent-shaped ergonomics and coroutine-safe pooling.',
      badge: 'Coroutine Safe',
      details: 'Connection pooling automatically recycles DB instances across worker coroutines.',
    },
    {
      icon: <Clock size={20} className="text-[#E11D63]" />,
      title: 'Background work',
      description: 'Queues and a scheduler that run outside the request cycle by default.',
      badge: 'Non-Blocking',
      details: 'Instantly offload heavy tasks to background workers without external supervisor setup.',
    },
    {
      icon: <Layout size={20} className="text-[#E11D63]" />,
      title: 'Frontend integration',
      description: 'Inertia-driven Vue by default, React available behind the same hydration contract.',
      badge: 'Vue / React',
      details: 'Server-driven SPA routing with zero client API layer duplication.',
    },
    {
      icon: <Smartphone size={20} className="text-[#E11D63]" />,
      title: 'Native reach',
      description: 'A built-in desktop/mobile previewer and a Go-based native shell compiler.',
      badge: 'Desktop & Mobile',
      details: 'Compile PHP + Vue directly into standalone desktop binaries via Go native shell.',
    },
    {
      icon: <CheckCircle size={20} className="text-[#E11D63]" />,
      title: 'Testing',
      description: 'A conformance suite that guarantees both runtime adapters behave identically.',
      badge: '100% Conformance',
      details: 'Automated compatibility matrix tests against Swoole, RoadRunner, and Workerman.',
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0E0E12]/50 border-y border-white/10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-14"
        >
          <span className="font-mono-code text-xs text-[#E11D63] font-semibold uppercase tracking-widest bg-[#E11D63]/10 px-3 py-1 rounded-full border border-[#E11D63]/20">
            Architecture First
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Built for the parts that are hard to add later.
          </h2>
        </motion.div>

        {/* 8 Cards Grid with Interactive Expand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cards.map((card, idx) => {
            const isSelected = selectedCard === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => setSelectedCard(isSelected ? null : idx)}
                className={`p-6 rounded-xl bg-[#0A0A0B] border transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#E11D63] shadow-[0_0_25px_rgba(225,29,99,0.3)] bg-[#111115]'
                    : 'border-white/10 hover:border-white/20 hover:bg-[#111115]/60'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#E11D63]/40 group-hover:bg-[#E11D63]/10 transition-colors">
                      {card.icon}
                    </div>
                    <span className="font-mono-code text-[10px] uppercase tracking-wider text-[#A1A1AA] bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-base md:text-lg text-white group-hover:text-[#ffb2bf] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-[#A1A1AA] text-xs md:text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono-code text-[11px] text-[#A1A1AA]">
                  <span>{isSelected ? 'Hide Detail' : 'View Detail'}</span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${isSelected ? 'rotate-180 text-[#E11D63]' : ''}`}
                  />
                </div>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 pt-3 border-t border-white/10 text-xs font-mono-code text-[#ffb2bf]"
                    >
                      {card.details}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
