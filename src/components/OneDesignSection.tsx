import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Copy, Terminal } from 'lucide-react';

interface OneDesignSectionProps {
  onOpenDocs: () => void;
  onOpenPlayground: () => void;
}

export const OneDesignSection: React.FC<OneDesignSectionProps> = ({
  onOpenDocs,
  onOpenPlayground,
}) => {
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const items = [
    {
      id: 'runtime',
      label: 'RUNTIME ADAPTERS',
      filename: 'bootstrap/app.php',
      code: `$app = SpinxApp::boot();

$app->module('Billing')
    ->routes()
    ->service(InvoiceService::class)
    ->repository(InvoiceRepository::class, EloquentInvoiceRepository::class);

$app->driver('roadrunner'); // or 'swoole', same contract either way

$app->run();`,
    },
    {
      id: 'module',
      label: 'MODULE SYSTEM',
      filename: 'app/Modules/Billing/module.php',
      code: `return [
    'name' => 'Billing',
    'namespace' => 'App\\\\Modules\\\\Billing',
    'providers' => [
        BillingServiceProvider::class,
    ],
    'exports' => [
        InvoiceService::class,
    ],
];`,
    },
    {
      id: 'auth',
      label: 'AUTHENTICATION',
      filename: 'config/auth.php',
      code: `$app->auth()->configure([
    'default_guard' => 'session',
    'guards' => [
        'session' => ['driver' => 'cookie_session'],
        'api' => ['driver' => 'jwt_bearer', 'ttl' => 3600],
    ],
    'routes_gated_by_default' => true,
]);`,
    },
    {
      id: 'data',
      label: 'DATA ACCESS',
      filename: 'config/database.php',
      code: `$orm = $app->database();

$orm->configurePool([
    'min_connections' => 5,
    'max_connections' => 50,
    'idle_timeout' => 30,
    'coroutine_safe' => true,
]);`,
    },
    {
      id: 'queues',
      label: 'QUEUES & SCHEDULER',
      filename: 'bootstrap/queue.php',
      code: `$app->queue()->registerWorkers([
    'default' => ['concurrency' => 10],
    'high-priority' => ['concurrency' => 25],
]);

$app->scheduler()->everyFiveMinutes(ProcessMetrics::class);`,
    },
    {
      id: 'inertia',
      label: 'INERTIA / VUE / REACT',
      filename: 'resources/js/app.ts',
      code: `$app->inertia()->setup([
    'frontend' => 'vue', // or 'react'
    'root_view' => 'app.blade.php',
    'ssr' => true,
]);`,
    },
    {
      id: 'previewer',
      label: 'NATIVE PREVIEWER',
      filename: 'spinx.json',
      code: `{
  "previewer": {
    "desktop": { "enabled": true, "width": 1280, "height": 800 },
    "mobile": { "enabled": true, "viewport": "iphone-15-pro" }
  }
}`,
    },
    {
      id: 'mobile',
      label: 'MOBILE COMPILATION',
      filename: 'bootstrap/native.php',
      code: `// Go-based native compiler target configuration
$app->native()->compile([
    'target' => 'ios', // or 'android', 'macos'
    'bundle_id' => 'com.spinx.app',
    'embedded_php' => true,
]);`,
    },
  ];

  const currentItem = items[activeTabIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentItem.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderCodeLine = (line: string, index: number) => {
    if (line.trim().startsWith('//') || line.trim().startsWith('/*')) {
      return <span key={index} className="text-[#52525B] italic">{line}</span>;
    }

    const parts = line.split(/(\b(?:return|namespace|class|public|function|private|new|boot|module|routes|service|repository|driver|run|configure|registerWorkers|everyFiveMinutes|setup|compile)\b|"[^"]*"|'[^']*'|\$[a-zA-Z0-9_]+|->|::|[{}]|\[|\])/g);

    return (
      <span key={index}>
        {parts.map((part, pIdx) => {
          if (!part) return null;
          if (/^(return|namespace|class|public|function|private|new)$/.test(part)) {
            return <span key={pIdx} className="text-[#E11D63] font-semibold">{part}</span>;
          }
          if (/^(\$[a-zA-Z0-9_]+)$/.test(part)) {
            return <span key={pIdx} className="text-[#ffb2bf]">{part}</span>;
          }
          if (/^(boot|module|routes|service|repository|driver|run|configure|registerWorkers|everyFiveMinutes|setup|compile)$/.test(part)) {
            return <span key={pIdx} className="text-[#10B981]">{part}</span>;
          }
          if (/^('[^']*'|"[^"]*")$/.test(part)) {
            return <span key={pIdx} className="text-[#ff92ad]">{part}</span>;
          }
          if (part === '->' || part === '::') {
            return <span key={pIdx} className="text-[#A1A1AA]">{part}</span>;
          }
          return <span key={pIdx} className="text-[#e2e2e2]">{part}</span>;
        })}
      </span>
    );
  };

  return (
    <section className="py-24 md:py-32 relative bg-[#0A0A0B]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline & Interactive Feature Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              One design.
            </h2>

            <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed">
              The runtime, the module system, the ORM, and the frontend pipeline share one config file and one boot sequence. Nothing here is a bolted-on package pretending to be first-party.
            </p>

            {/* List of 8 interactive bullet items matching Image 2 */}
            <div className="space-y-2 pt-2">
              {items.map((item, idx) => {
                const isActive = idx === activeTabIdx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTabIdx(idx)}
                    className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg font-mono-code text-xs md:text-sm uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'bg-[#E11D63]/10 text-white font-bold border border-[#E11D63]/30 shadow-[0_0_15px_rgba(225,29,99,0.15)]'
                        : 'text-[#A1A1AA] hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {/* Pink Bullet dot with active glow */}
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-[#E11D63] shadow-[0_0_12px_#E11D63] scale-125'
                          : 'bg-[#E11D63]/60'
                      }`}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Links at bottom left */}
            <div className="flex items-center gap-8 pt-4 font-mono-code text-xs uppercase tracking-widest">
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
          </motion.div>

          {/* Right Column: Code Panel matched to active tab */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 sticky top-28"
          >
            <div className="bg-[#0B0B0E] border border-white/15 rounded-xl overflow-hidden shadow-2xl">
              {/* Window Header with dots and copy button */}
              <div className="bg-[#141418] px-4 py-3 border-b border-white/10 flex items-center justify-between select-none">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#33333A]" />
                    <div className="w-3 h-3 rounded-full bg-[#33333A]" />
                    <div className="w-3 h-3 rounded-full bg-[#33333A]" />
                  </div>
                  <span className="font-mono-code text-xs text-[#A1A1AA] font-medium">
                    {currentItem.filename}
                  </span>
                </div>

                <button
                  onClick={handleCopy}
                  className="text-[#A1A1AA] hover:text-white px-2 py-1 rounded transition-colors flex items-center gap-1.5 text-xs font-mono-code bg-white/5 border border-white/10"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-[#10B981]" />
                      <span className="text-[#10B981]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Snippet */}
              <div className="p-6 font-mono-code text-[13px] md:text-sm leading-relaxed overflow-x-auto bg-[#070709] text-[#e2e2e2] min-h-[280px]">
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={currentItem.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="whitespace-pre"
                  >
                    {currentItem.code.split('\n').map((line, idx) => (
                      <div key={idx} className="flex hover:bg-white/[0.03] px-1 -mx-1 rounded transition-colors">
                        <span className="select-none text-[#42424A] w-8 pr-4 text-right inline-block text-xs shrink-0">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          {renderCodeLine(line, idx)}
                        </div>
                      </div>
                    ))}
                  </motion.pre>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
