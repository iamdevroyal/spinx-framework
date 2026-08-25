import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, BookOpen, Search, Code, Check, ArrowRight, Layers, Shield, Terminal, Zap } from 'lucide-react';
import { CodePanel } from './CodePanel';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  const [activeTopic, setActiveTopic] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const topics = [
    { id: 'getting-started', title: 'Getting Started', category: 'Basics', icon: <Terminal size={14} /> },
    { id: 'module-architecture', title: 'Module Architecture', category: 'Core', icon: <Layers size={14} /> },
    { id: 'routing-auth', title: 'Routing & Authentication', category: 'Http', icon: <Shield size={14} /> },
    { id: 'queues-scheduler', title: 'Queues & Scheduler', category: 'Workers', icon: <Zap size={14} /> },
    { id: 'islands-frontend', title: 'Templates & Island Hydration', category: 'Frontend', icon: <Code size={14} /> },
  ];

  const docsContent: Record<string, { title: string; desc: string; code: string; notes: string }> = {
    'getting-started': {
      title: 'Getting Started with Spinx Framework',
      desc: 'Create a new Spinx application with Composer or the Spinx global CLI executable. Spinx automatically wires RoadRunner or Swoole runtime drivers based on your spinx.json declaration.',
      code: `$ spinx new my-app
$ cd my-app
$ spinx serve

# Output:
# ➜ Backend   http://localhost:8080  (RoadRunner)
# ➜ Frontend  http://localhost:5173  (Vite · Vue HMR)`,
      notes: 'No separate web server (Nginx/Apache) or PHP-FPM configuration is needed for development or production.',
    },
    'module-architecture': {
      title: 'Enforced Module Architecture',
      desc: 'Spinx strictly organizes code into DDD Domain Modules. The kernel forbids placing controllers or entities outside module domain boundaries.',
      code: `// spinx.json module registration
{
  "modules": {
    "Billing": true,
    "Catalog": true
  }
}

// Controller definition inside module:
namespace App\\Modules\\Billing\\Infrastructure\\Http\\Controllers;

final class InvoiceController {
    public function __construct(
        private InvoiceRepositoryInterface $invoices
    ) {}
}`,
      notes: 'Dependencies between modules must pass through declared Service Contracts to maintain boundary isolation.',
    },
    'routing-auth': {
      title: 'Fluent Routing & Built-In Auth',
      desc: 'Declare routes with the fluent DSL in module.php. The Auth subsystem provides Auth::attempt(), session fixation defense, and "auth"/"guest" middleware aliases.',
      code: `use App\\Modules\\Billing\\Infrastructure\\Http\\Controllers\\InvoiceController;
use Spinx\\Auth\\Middleware\\AuthMiddleware;
use Spinx\\Routing\\{AliasRegistry, Route, RouteBuilder};

return [
    'controllers' => static fn (AliasRegistry $r) => $r->registerController('invoice_show', InvoiceController::class),
    'middlewares' => static fn (AliasRegistry $r) => $r->registerMiddleware('auth', AuthMiddleware::class),
    'routes' => static function (RouteBuilder $routes): void {
        Route::get(['invoices.show', '/invoices/{id}'])
            ->middleware(['auth'])
            ->controller('invoice_show');
    },
];`,
      notes: 'Session and Auth state are scoped per-request and never leak across worker cycles.',
    },
    'queues-scheduler': {
      title: 'Database Queues & Task Scheduler',
      desc: 'Spinx queues and schedulers execute outside the request cycle cleanly.',
      code: `// Offloading async work:
$queueManager->dispatch(new SendInvoiceEmailJob($invoiceId));

// Registering scheduled jobs in schedule.php:
return static function (Scheduler $scheduler, $container): void {
    $scheduler->call(function () use ($container) {
        $container->get(ReconcileService::class)->reconcile();
    }, 'daily reconciliation')->daily('02:00');
};`,
      notes: 'A single OS cron entry invoking `spinx schedule:run` executes all due tasks.',
    },
    'islands-frontend': {
      title: 'Server Templates & Island Hydration',
      desc: 'Render lightning-fast server HTML with @island directives for reactive Vue 3 or React 19 client components.',
      code: `<div class="invoice-view">
    <h1>Invoice #{{ $invoice->id }}</h1>

    <!-- Targeted client hydration island (Vue/React) -->
    @island('InvoiceViewer', ['invoiceId' => $invoice->id])
</div>`,
      notes: 'Components are automatically bundled and hydrated via Vite with instant hot module replacement.',
    },
  };

  const filteredTopics = topics.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeDoc = docsContent[activeTopic] || docsContent['getting-started'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-[#0A0A0B] border border-white/10 rounded-xl w-full max-w-5xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#111113] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen size={18} className="text-[#E11D63]" />
            <h2 className="font-bold text-[#e2e2e2] text-base">
              Spinx Official Documentation & API Reference
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#A1A1AA] hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-[#111113]/50 border-b border-white/10 flex items-center gap-3">
          <Search size={16} className="text-[#E11D63]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation (e.g. Modules, Auth, RoadRunner, Inertia)..."
            className="bg-transparent text-sm text-[#e2e2e2] placeholder-[#52525B] focus:outline-none w-full font-mono-code"
          />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="md:col-span-4 border-r border-white/10 p-4 space-y-2 overflow-y-auto bg-[#0A0A0B]">
            {filteredTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className={`w-full text-left p-3 rounded-lg font-mono-code text-xs flex items-center justify-between transition-all ${
                  activeTopic === topic.id
                    ? 'bg-[#E11D63] text-white font-semibold shadow-[0_0_12px_rgba(225,29,99,0.4)]'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  {topic.icon}
                  <span>{topic.title}</span>
                </div>
                <span className="text-[10px] opacity-70 uppercase tracking-widest">
                  {topic.category}
                </span>
              </button>
            ))}
          </div>

          {/* Main Doc Article */}
          <div className="md:col-span-8 p-6 overflow-y-auto space-y-6 bg-[#0A0A0B]/80">
            <div>
              <span className="font-mono-code text-xs text-[#E11D63] uppercase tracking-widest font-semibold block mb-1">
                Documentation Guide
              </span>
              <h3 className="text-2xl font-bold text-[#e2e2e2]">{activeDoc.title}</h3>
            </div>

            <p className="text-[#A1A1AA] text-sm leading-relaxed">{activeDoc.desc}</p>

            <CodePanel title="Example / Usage" code={activeDoc.code} language="php" />

            <div className="p-4 rounded bg-[#111113] border border-white/10 text-xs font-mono-code text-[#ffb2bf] space-y-1">
              <div className="text-[#E11D63] font-bold">ℹ Note:</div>
              <div>{activeDoc.notes}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
