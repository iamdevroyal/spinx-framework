import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sliders, Check, Copy, Code2 } from 'lucide-react';

interface OneConfigSectionProps {
  onOpenDocs: () => void;
  onOpenPlayground: () => void;
}

export const OneConfigSection: React.FC<OneConfigSectionProps> = ({
  onOpenDocs,
  onOpenPlayground,
}) => {
  const [driver, setDriver] = useState<'roadrunner' | 'swoole' | 'workerman'>('roadrunner');
  const [frontend, setFrontend] = useState<'vue' | 'react' | 'svelte'>('vue');
  const [database, setDatabase] = useState<'pgsql' | 'mysql' | 'sqlite'>('pgsql');
  const [activeTile, setActiveTile] = useState<string>('Runtime driver');
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedRoutes, setCopiedRoutes] = useState(false);

  const spinxJsonCode = `{
  "appName": "Spinx App",
  "driver": "${driver}",
  "frontend": "${frontend}",
  "modules": {
    "Billing": true,
    "Catalog": true
  }
}`;

  const routesCode = `// app/Modules/Billing/module.php
Route::get(['invoices.show', '/invoices/{id}'])
    ->middleware(['auth'])
    ->controller('invoice_controller');

// View template renders server HTML with targeted ${frontend.toUpperCase()} island:
// @island('DashboardOverview', ['driver' => '${driver}'])`;

  const tiles = [
    { title: 'Runtime driver', val: driver, opt: ['roadrunner', 'swoole'] },
    { title: 'Module registry', val: 'Billing, Catalog', opt: [] },
    { title: 'Frontend adapter', val: frontend, opt: ['vue', 'react'] },
    { title: 'Database', val: database, opt: ['pgsql', 'mysql', 'sqlite'] },
    { title: 'Schedule runner', val: 'spinx schedule:run', opt: [] },
    { title: 'Static analysis', val: 'NoMutableStaticStateRule', opt: [] },
  ];

  const handleCopy = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 md:py-32 bg-[#0E0E12] border-y border-white/10 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-[#E11D63]/8 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-14 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E11D63]/15 border border-[#E11D63]/30 text-[#ffb2bf] text-xs font-mono-code uppercase tracking-wider">
            <Sliders size={13} />
            <span>Single Source of Truth</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            One config file.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffb2bf] to-[#E11D63]">
              Every layer reads it.
            </span>
          </h2>

          <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed">
            <code className="text-[#ffb2bf] font-mono-code bg-black/60 px-2 py-0.5 rounded border border-white/10">spinx.json</code> is the single source of truth for the runtime driver, the frontend adapter, the module registry, and the database connection. Switching RoadRunner for Swoole, or Vue for React, is a config change — never a rewrite.
          </p>
        </motion.div>

        {/* Interactive 6 Tiles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
          {tiles.map((tile, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => setActiveTile(tile.title)}
              className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                activeTile === tile.title
                  ? 'bg-[#14141A] border-[#E11D63] shadow-[0_0_20px_rgba(225,29,99,0.25)]'
                  : 'bg-[#0A0A0B] border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <p className="font-mono-code text-[11px] text-[#A1A1AA] uppercase tracking-wider mb-2">
                  {tile.title}
                </p>
                <div className="font-mono-code text-xs font-semibold text-white flex items-center justify-center gap-1">
                  <span>{tile.val}</span>
                </div>
              </div>

              {/* Quick option toggle buttons */}
              {tile.opt.length > 0 && (
                <div className="flex justify-center gap-1 mt-3 pt-2 border-t border-white/5">
                  {tile.opt.map((o) => (
                    <button
                      key={o}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (tile.title === 'Runtime driver') setDriver(o as any);
                        if (tile.title === 'Frontend adapter') setFrontend(o as any);
                        if (tile.title === 'Database') setDatabase(o as any);
                      }}
                      className={`px-1.5 py-0.5 text-[10px] rounded font-mono-code transition-all ${
                        tile.val === o
                          ? 'bg-[#E11D63] text-white font-bold shadow-[0_0_8px_rgba(225,29,99,0.6)]'
                          : 'bg-white/5 text-[#A1A1AA] hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Side by Side Interactive Code Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* spinx.json Panel */}
          <div className="bg-[#070709] border border-white/15 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-[#111115] px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 size={15} className="text-[#E11D63]" />
                <span className="font-mono-code text-xs text-[#e2e2e2] font-semibold">spinx.json</span>
              </div>
              <button
                onClick={() => handleCopy(spinxJsonCode, setCopiedJson)}
                className="text-[#A1A1AA] hover:text-white text-xs font-mono-code flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/10"
              >
                {copiedJson ? <Check size={13} className="text-[#10B981]" /> : <Copy size={13} />}
                <span>{copiedJson ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-5 font-mono-code text-xs md:text-sm leading-relaxed text-[#e2e2e2] min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={`${driver}-${frontend}-${database}`}
                  initial={{ opacity: 0.7, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="whitespace-pre text-[#ffb2bf]"
                >
                  {spinxJsonCode}
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>

          {/* routes.php Panel */}
          <div className="bg-[#070709] border border-white/15 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-[#111115] px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 size={15} className="text-[#10B981]" />
                <span className="font-mono-code text-xs text-[#e2e2e2] font-semibold">routes/web.php</span>
              </div>
              <button
                onClick={() => handleCopy(routesCode, setCopiedRoutes)}
                className="text-[#A1A1AA] hover:text-white text-xs font-mono-code flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/10"
              >
                {copiedRoutes ? <Check size={13} className="text-[#10B981]" /> : <Copy size={13} />}
                <span>{copiedRoutes ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-5 font-mono-code text-xs md:text-sm leading-relaxed text-[#e2e2e2] min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={frontend}
                  initial={{ opacity: 0.7, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="whitespace-pre text-[#e2e2e2]"
                >
                  {routesCode}
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex justify-center gap-8 mt-12 font-mono-code text-xs uppercase tracking-widest">
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
        </div>
      </div>
    </section>
  );
};
