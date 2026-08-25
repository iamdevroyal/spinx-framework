import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, FolderKanban, Cpu, ShieldCheck, Copy, Check } from 'lucide-react';

interface FeatureThreeStripProps {
  onOpenDocs: () => void;
  onOpenPlayground: () => void;
}

export const FeatureThreeStrip: React.FC<FeatureThreeStripProps> = ({
  onOpenDocs,
  onOpenPlayground,
}) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const features = [
    {
      icon: <FolderKanban className="text-[#E11D63] w-6 h-6" />,
      emoji: '🗂️',
      title: 'Modules, not folders of convention',
      description:
        'Controllers, entities, and repositories only exist where the kernel expects them. There is no `app/Controllers` fallback to drift into.',
      detailCode: `// Modular Architecture structure:
app/
├── Modules/
│   ├── Billing/
│   │   ├── Domain/
│   │   ├── Application/
│   │   └── Infrastructure/
│   └── Catalog/`,
    },
    {
      icon: <Cpu className="text-[#E11D63] w-6 h-6" />,
      emoji: '⚙️',
      title: 'DI resolved at the boundary',
      description:
        'Services are wired in `module.php` and resolved per request through a scoped container — no service locator reaching across modules.',
      detailCode: `// Scoped Module DI Registration in module.php:
'services' => static function (ContainerBuilder $c, string $dir): void {
    $c->register(InvoiceService::class)
        ->setAutowired(true)
        ->setPublic(true);
};`,
    },
    {
      icon: <ShieldCheck className="text-[#E11D63] w-6 h-6" />,
      emoji: '🛡️',
      title: 'State safety from the first request',
      description:
        'A request-scoped container and a shipped static-analysis rule catch static/singleton leaks before they reach a persistent worker in production.',
      detailCode: `// Static Analysis Guard against leaks:
vendor/bin/phpstan analyse
✔ [NoMutableStaticStateRule] 0 leaks across worker pool`,
    },
  ];

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <section className="py-20 md:py-28 border-y border-white/10 bg-[#0E0E11]/80 backdrop-blur-sm relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#E11D63]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative space-y-4 p-6 sm:p-7 rounded-xl bg-[#0A0A0B]/80 border border-white/10 hover:border-[#E11D63]/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(225,29,99,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:bg-[#E11D63]/10 group-hover:border-[#E11D63]/30 transition-colors">
                    {feature.icon}
                  </div>
                  <span className="font-mono-code text-xs font-bold text-[#E11D63] bg-[#E11D63]/10 px-2 py-0.5 rounded border border-[#E11D63]/20">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-[#e2e2e2] group-hover:text-white transition-colors">
                  {feature.title}
                </h3>

                <p className="text-[#A1A1AA] text-sm leading-relaxed mt-2">
                  {feature.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 relative">
                <div className="flex items-center justify-between text-[10px] font-mono-code text-[#A1A1AA] mb-1.5">
                  <span>SNIPPET</span>
                  <button
                    onClick={() => handleCopy(feature.detailCode, idx)}
                    className="hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {copiedIdx === idx ? (
                      <Check size={11} className="text-[#10B981]" />
                    ) : (
                      <Copy size={11} />
                    )}
                  </button>
                </div>
                <pre className="text-[11px] font-mono-code p-3 rounded-lg bg-[#070709] border border-white/5 text-[#ffb2bf] overflow-x-auto whitespace-pre">
                  {feature.detailCode}
                </pre>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action links beneath 3 strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-8 mt-12 font-mono-code text-xs uppercase tracking-widest justify-center sm:justify-start"
        >
          <button
            onClick={onOpenDocs}
            className="text-[#E11D63] hover:text-white transition-colors flex items-center gap-2 group font-semibold"
          >
            <span>Read the docs</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenPlayground}
            className="text-[#E11D63] hover:text-white transition-colors flex items-center gap-2 group font-semibold"
          >
            <span>Start here</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
