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
      filename: 'public/index.php',
      code: `use Spinx\\Kernel\\Kernel;
use Symfony\\Component\\HttpFoundation\\Request;

// Boot kernel once per worker process
$kernel = new Kernel($projectRoot);
$kernel->boot();

// Single-digit microsecond request dispatch
$response = $kernel->handle($request);`,
    },
    {
      id: 'module',
      label: 'MODULE SYSTEM',
      filename: 'app/Modules/Billing/module.php',
      code: `use App\\Modules\\Billing\\Infrastructure\\Http\\Controllers\\InvoiceController;
use Spinx\\Auth\\Middleware\\AuthMiddleware;
use Spinx\\Routing\\{AliasRegistry, Route, RouteBuilder};

return [
    'controllers' => static fn(AliasRegistry $r) => $r->registerController('invoice_show', InvoiceController::class),
    'middlewares' => static fn(AliasRegistry $r) => $r->registerMiddleware('auth', AuthMiddleware::class),
    'routes' => static function (RouteBuilder $routes): void {
        Route::get(['invoices.show', '/invoices/{id}'])
            ->middleware(['auth'])
            ->controller('invoice_show');
    },
];`,
    },
    {
      id: 'auth',
      label: 'AUTHENTICATION',
      filename: 'config/auth.php',
      code: `// config/auth.php
return [
    'model' => \\App\\Modules\\Users\\Infrastructure\\Persistence\\Models\\User::class,
    'password_field' => 'password',
    'redirect_to' => '/login',
];

// In Controllers:
if (Auth::attempt(['email' => $email, 'password' => $password])) {
    $currentUser = Auth::user();
}`,
    },
    {
      id: 'data',
      label: 'DATA ACCESS',
      filename: 'app/Modules/Billing/Application/GetInvoices.php',
      code: `// Coroutine-safe active record with pre-compiled schema cache
$invoices = Invoice::query()
    ->selectWithout('secret_signature')
    ->where('status', 'paid')
    ->when($hasFilter)->then(fn($q) => $q->where('total', '>', 500))
    ->with('customer', 'lineItems')
    ->get();`,
    },
    {
      id: 'queues',
      label: 'QUEUES & SCHEDULER',
      filename: 'schedule.php',
      code: `use Spinx\\Schedule\\Scheduler;
use Spinx\\Queue\\QueueManager;

return static function (Scheduler $scheduler, $container): void {
    $scheduler->call(function () use ($container) {
        $container->get(QueueManager::class)->dispatch(new PruneOrdersJob());
    }, 'daily cleanup')->daily('03:00');
};`,
    },
    {
      id: 'islands',
      label: 'TEMPLATES & ISLANDS',
      filename: 'Infrastructure/Http/Views/invoice.spinx.html',
      code: `<div class="invoice-container">
    <h1>Invoice #{{ $invoice->id }}</h1>
    
    <!-- Targeted client-side reactive island (Vue 3 / React 19) -->
    @island('PaymentWidget', ['invoiceId' => $invoice->id, 'amount' => $invoice->amount])
</div>`,
    },
    {
      id: 'previewer',
      label: 'NATIVE PREVIEWER',
      filename: 'Terminal Command',
      code: `# Launch interactive browser-based mobile preview container:
php spinx preview --mobile

# Preview on connected Android device or emulator:
php spinx preview --android

# Launch native desktop webview window:
php spinx preview --desktop`,
    },
    {
      id: 'mobile',
      label: 'MOBILE SHELLS',
      filename: 'Terminal Command',
      code: `# Scaffold native Android shell project (Kotlin + WebView):
php spinx build:mobile --android

# Scaffold native iOS shell project (Swift + WKWebView):
php spinx build:mobile --ios`,
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
