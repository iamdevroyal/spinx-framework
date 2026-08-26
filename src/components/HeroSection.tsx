import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Copy, Sparkles, Terminal } from 'lucide-react';

interface HeroSectionProps {
  onOpenPlayground: () => void;
  onOpenDocs: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPlayground,
  onOpenDocs,
}) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'routing' | 'auth' | 'validation' | 'cache' | 'orm'>('ai');
  const [copied, setCopied] = useState(false);

  const heroTabs = [
    { id: 'ai', name: 'AI Builder' },
    { id: 'routing', name: 'Routing & Facades' },
    { id: 'auth', name: 'Strict DDD Auth' },
    { id: 'validation', name: 'Validation (40+)' },
    { id: 'cache', name: 'Caching' },
    { id: 'orm', name: 'Active Record ORM' },
  ] as const;

  const codeSnippets: Record<typeof activeTab, { filename: string; code: string }> = {
    ai: {
      filename: 'terminal / php spinx ai:build',
      code: `// Autonomous Multi-Agent Framework Builder
use Spinx\\Ai\\Ai;

// Build a complete, production-ready module in strict DDD:
Ai::build('Create a Subscription Billing module with Stripe checkout, webhook verification, plan repository, and dashboard view');

// Output:
//  ✔ ArchitectAgent: Generated Domain Entity & Repository Contract
//  ✔ DatabaseAgent: Created 2026_08_08_000001_create_plans_table.php
//  ✔ RoutingAgent: Generated BillingController with Request::validate()
//  ✔ FrontendAgent: Crafted checkout.spinx.html with @island hydration
//  ✔ CodeAnalyzer: 100% DDD compliance verified with 0 leaks`,
    },
    routing: {
      filename: 'app/Modules/Projects/module.php',
      code: `use App\\Modules\\Projects\\Infrastructure\\Http\\Controllers\\ProjectController;
use Spinx\\Routing\\{Route, RouteBuilder};

return [
    'controllers' => static function ($r): void {
        $r->registerController('project', ProjectController::class);
    },
    'routes' => static function (RouteBuilder $routes): void {
        // Multi-Action Controller Routing with Session CSRF
        Route::get(['projects.index', '/projects'])
            ->middleware(['auth', 'csrf'])
            ->controller('project@index');

        Route::post(['projects.store', '/projects'])
            ->middleware(['auth', 'csrf'])
            ->controller('project@store');
    },
];`,
    },
    auth: {
      filename: 'app/Modules/Auth/Infrastructure/Http/Controllers/AuthController.php',
      code: `use App\\Modules\\Auth\\Application\\Services\\AuthService;
use Spinx\\Http\\Request;
use Spinx\\Http\\Response;

final class AuthController
{
    public function __construct(private readonly AuthService $authService) {}

    public function login(): Response
    {
        $data = Request::validate([
            'email'    => 'required|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        if ($this->authService->login($data['email'], $data['password'])) {
            return redirect('/dashboard');
        }

        return view('Auth::login', ['error' => 'Invalid credentials'], 401);
    }
}`,
    },
    validation: {
      filename: 'app/Modules/Projects/Infrastructure/Http/Controllers/ProjectController.php',
      code: `use Spinx\\Http\\Request;

// 40+ Built-In Validation Rules with Type Safety
$validated = Request::validate([
    'name'     => 'required|string|min:3|max:100',
    'slug'     => 'required|alpha_dash|unique:projects,slug',
    'email'    => 'required|email',
    'tier'     => 'required|in:starter,growth,enterprise',
    'budget'   => 'required|numeric|gt:0',
    'deadline' => 'nullable|date|after:today',
]); // Returns allowlisted payload or throws ValidationException`,
    },
    cache: {
      filename: 'app/Modules/Catalog/Application/Services/ProductService.php',
      code: `use Spinx\\Cache\\Cache;

// High-throughput caching with File, Array, and Redis stores:
$featured = Cache::remember('products:featured', 3600, function () {
    return Product::query()->where('is_featured', true)->get();
});

// Helper shorthand:
cache(['site:maintenance' => false], 300);
$isDown = cache('site:maintenance');`,
    },
    orm: {
      filename: 'app/Modules/Projects/Infrastructure/Persistence/Models/Project.php',
      code: `use Spinx\\Database\\Model;

final class Project extends Model
{
    protected static string $table = 'projects';
    protected array $fillable = ['name', 'slug', 'tier', 'budget'];

    // Pre-compiled DBAL column cache eliminates runtime schema queries
    public static function findActive(): array
    {
        return self::query()
            ->where('budget', '>=', 1000)
            ->with('team', 'deployments')
            ->latest()
            ->paginate(25);
    }
}`,
    },
  };

  const currentSnippet = codeSnippets[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderCodeLine = (line: string, index: number) => {
    if (line.trim().startsWith('#') || line.trim().startsWith('//')) {
      return <span key={index} className="text-[#62626B] italic">{line}</span>;
    }

    const parts = line.split(/(\b(?:from|import|async|def|return|class|public|function|private|new|Route|middleware|openapi|validate|where|with|paginate|orderBy)\b|"[^"]*"|'[^']*'|@[a-zA-Z0-9_\.]+|\$[a-zA-Z0-9_]+|->|::|[{}]|\[|\]|\(|\))/g);

    return (
      <span key={index}>
        {parts.map((part, pIdx) => {
          if (!part) return null;
          if (/^(from|import|async|def|return|class|public|function|private|new)$/.test(part)) {
            return <span key={pIdx} className="text-[#E11D63] font-semibold">{part}</span>;
          }
          if (/^@[a-zA-Z0-9_\.]+$/.test(part)) {
            return <span key={pIdx} className="text-[#3B82F6]">{part}</span>;
          }
          if (/^(\$[a-zA-Z0-9_]+)$/.test(part)) {
            return <span key={pIdx} className="text-[#ffb2bf]">{part}</span>;
          }
          if (/^("[^"]*"|'[^']*')$/.test(part)) {
            return <span key={pIdx} className="text-[#F59E0B]">{part}</span>;
          }
          if (/^(Route|middleware|openapi|validate|where|with|paginate|orderBy)$/.test(part)) {
            return <span key={pIdx} className="text-[#10B981]">{part}</span>;
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
    <section className="relative pt-32 sm:pt-36 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#0A0A0B]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E11D63]/12 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-7"
          >
            {/* Top Monospace Tag */}
            <div className="inline-flex items-center gap-1.5 font-mono-code text-xs tracking-widest text-[#E11D63] font-semibold">
              <span>&lt; Spinx Web Framework &gt;</span>
              <span className="text-[#E11D63] animate-pulse">_ |</span>
            </div>

            {/* Main Headline with Scribble Underline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight text-white leading-[1.08]">
              Built for speed.<br />
              <span className="relative inline-block text-white">
                Incapable of chaos.
                {/* Red Scribble SVG Underline */}
                <svg
                  className="absolute left-0 -bottom-2 w-full h-4 text-[#E11D63] overflow-visible"
                  viewBox="0 0 200 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 14C50 4 120 18 197 8M10 17C65 12 140 16 185 13"
                    stroke="#E11D63"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Description Subtext */}
            <p className="text-[#A1A1AA] text-base sm:text-lg max-w-xl leading-relaxed">
              The ORM, auth, background work and websockets ship as one framework and share one config model. Declare auth once — it gates the route and writes the OpenAPI spec.
            </p>

            {/* CTA Buttons & Handwritten "start here" annotation */}
            <div className="flex items-center gap-4 pt-2 relative">
              <button
                onClick={onOpenDocs}
                className="bg-white text-black hover:bg-gray-200 font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                <span>Read the docs</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenPlayground}
                className="text-[#e2e2e2] hover:text-white font-mono-code text-xs uppercase tracking-wider px-5 py-3 rounded-full hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <span>Interactive CLI</span>
                <Sparkles size={14} className="text-[#E11D63]" />
              </button>

              {/* Handwritten script annotation next to button */}
              <div className="hidden sm:flex items-center gap-1 font-handwriting text-xl text-[#ffb2bf] transform -rotate-6 ml-2 select-none">
                <svg className="w-8 h-6 text-[#E11D63] transform -scale-x-100 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span>start here</span>
              </div>
            </div>

            {/* Bottom Left Step Tag */}
            <div className="pt-6 font-mono-code text-xs text-[#A1A1AA] flex items-center gap-2">
              <span className="text-[#E11D63] font-bold">01</span>
              <span>|</span>
              <span className="uppercase tracking-widest text-[#e2e2e2]">FOUNDATION</span>
              <span className="text-[#E11D63]">✦</span>
            </div>
          </motion.div>

          {/* Right Column: Code Window with Tabs and Cursive Annotation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            {/* Top Annotation "all six are live" with arrow pointing to tabs */}
            <div className="absolute -top-9 right-8 sm:right-12 z-20 flex items-center gap-1 font-handwriting text-xl text-[#ffb2bf] select-none">
              <span>all six are live</span>
              <svg className="w-7 h-7 text-[#E11D63] transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* Code Block Container */}
            <div className="bg-[#0B0B0E] border border-white/15 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
              {/* Header Tabs Bar */}
              <div className="bg-[#111115] border-b border-white/10 px-3 sm:px-4 py-2.5 flex items-center justify-between overflow-x-auto scrollbar-none">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {heroTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1 rounded-md text-xs font-mono-code transition-all whitespace-nowrap ${activeTab === tab.id
                        ? 'bg-[#E11D63]/20 text-white font-semibold border border-[#E11D63]/50 shadow-[0_0_10px_rgba(225,29,99,0.3)]'
                        : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCopy}
                  className="text-[#A1A1AA] hover:text-white p-1 rounded transition-colors ml-2 flex items-center gap-1 text-xs font-mono-code shrink-0"
                  title="Copy snippet"
                >
                  {copied ? (
                    <Check size={14} className="text-[#10B981]" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>

              {/* Code Snippet Area */}
              <div className="p-4 sm:p-6 font-mono-code text-[13px] sm:text-sm leading-relaxed overflow-x-auto bg-[#070709] text-[#e2e2e2] min-h-[300px]">
                <div className="text-[11px] text-[#A1A1AA] mb-3 pb-2 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal size={13} className="text-[#E11D63]" />
                    <span>{currentSnippet.filename}</span>
                  </div>
                  <span className="text-[10px] text-[#A1A1AA] uppercase">Live Example</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.pre
                    key={activeTab}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="whitespace-pre"
                  >
                    {currentSnippet.code.split('\n').map((line, idx) => (
                      <div key={idx} className="flex hover:bg-white/[0.03] px-1 rounded -mx-1 transition-colors">
                        <span className="select-none text-[#42424A] w-7 pr-3 text-right text-xs shrink-0">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          {renderCodeLine(line, idx)}
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center mt-1">
                      <span className="select-none text-[#42424A] w-7 pr-3 text-right text-xs shrink-0">
                        {currentSnippet.code.split('\n').length + 1}
                      </span>
                      <span className="inline-block w-2 h-4 bg-[#E11D63] ml-1 blink" />
                    </div>
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
