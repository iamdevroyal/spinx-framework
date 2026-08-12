export interface DocHeading {
  id: string;
  title: string;
  level: number;
}

export interface DocArticle {
  id: string;
  path: string;
  category: 'Getting Started' | 'Core Concepts' | 'Backend & Services' | 'Frontend & Inertia' | 'API & Reference' | 'Guides & Examples';
  title: string;
  subtitle: string;
  description: string;
  readTime: string;
  lastUpdated: string;
  badge?: string;
  headings: DocHeading[];
  sections: {
    headingId: string;
    headingTitle: string;
    content: string;
    codeSnippet?: {
      title: string;
      language: string;
      code: string;
    };
    callout?: {
      type: 'note' | 'warning' | 'tip' | 'performance';
      title: string;
      message: string;
    };
    tableData?: {
      headers: string[];
      rows: string[][];
    };
  }[];
}

export const DOC_CATEGORIES = [
  'Getting Started',
  'Core Concepts',
  'Backend & Services',
  'Frontend & Inertia',
  'API & Reference',
  'Guides & Examples',
] as const;

export const DOCS_DATA: DocArticle[] = [
  {
    id: 'introduction',
    path: '/docs/introduction',
    category: 'Getting Started',
    title: 'Introduction to Spinx Framework',
    subtitle: 'The modern PHP & Node hybrid engine for high-concurrency coroutines and DDD architecture.',
    description: 'Spinx is a next-generation full-stack framework engineered for extreme performance, clean domain-driven architecture, and seamless single-page application hydration with Vue and React.',
    readTime: '5 min read',
    lastUpdated: 'Updated v1 (MVP)',
    badge: 'Core Reference',
    headings: [
      { id: 'overview', title: 'Framework Overview', level: 2 },
      { id: 'core-pillars', title: 'Core Architecture Pillars', level: 2 },
      { id: 'scope-non-goals', title: 'Scope & Non-Goals for v1', level: 2 },
      { id: 'positioning-matrix', title: 'Comparison & Positioning Matrix', level: 2 },
      { id: 'gotcha-mental-shift', title: 'What Could Go Wrong: Mental Shift', level: 2 },
    ],
    sections: [
      {
        headingId: 'overview',
        headingTitle: 'Framework Overview',
        content: `Spinx is a PHP framework for applications that don't need Laravel's full weight but demand near-Node.js performance, zero-friction cross-platform installation, and an enforced Domain-Driven Design (DDD) architecture from the first command run.

By bypassing traditional PHP-FPM per-request bootstrap overhead, Spinx hosts your application inside long-running coroutine execution workers. Route matching, container resolution, and configuration models remain warmed in RAM across requests, serving thousands of hits per second with microsecond latency.`,
        codeSnippet: {
          title: 'spinx.json - Unified Configuration Declaration',
          language: 'json',
          code: `{
  "driver": "roadrunner",
  "frontend": "vue",
  "modules": ["Billing", "Auth", "Catalog"],
  "database": {
    "connection": "pgsql"
  },
  "migrations": {
    "auto_run": true
  },
  "static_analysis": {
    "level": 8,
    "strict_types": true
  }
}`,
        },
        callout: {
          type: 'performance',
          title: 'Zero Boot Overhead',
          message: 'Because Spinx initializes kernel state once per process, route compilation, DI container reflection, and config parsing consume 0ms during the HTTP request cycle.',
        },
      },
      {
        headingId: 'core-pillars',
        headingTitle: 'Core Architecture Pillars',
        content: `Spinx is built on five core technical pillars designed for long-term project maintainability and extreme throughput:

1. Speed: Persistent-process runtime (RoadRunner default, Swoole opt-in) with no per-request bootstrap cost.
2. Portability: Runs on Windows, Linux, and macOS with a single install step — no compiled extensions required by default.
3. Enforced Architecture: DDD module layout is not an optional convention; it is structurally the only way the kernel registers code.
4. Frontend-Agnostic, Vue-First: Inertia-driven page rendering with Vue 3 by default and React 19 as a swappable adapter.
5. Native Reach: Built-in desktop/mobile previewer and a direct path to compile Spinx frontends into standalone native mobile shells.`,
      },
      {
        headingId: 'scope-non-goals',
        headingTitle: 'Scope & Non-Goals for v1',
        content: `To deliver a rock-solid, production-grade foundation, Spinx explicitly defines out-of-scope items for the v1 MVP release:

• Explicitly Out of Scope for v1:
  - Full Doctrine ORM support (Doctrine's UnitOfWork model is incompatible with Swoole coroutines).
  - On-device PHP runtime for offline mobile apps (deferred pending a standalone feasibility spike).
  - Traditional shared-hosting or PHP-FPM deployment as a primary target.
  - Non-Vue/React frontend adapters (Svelte/Angular deferred for post-v1).`,
      },
      {
        headingId: 'positioning-matrix',
        headingTitle: 'Comparison & Positioning Matrix',
        content: `How Spinx compares against established PHP framework alternatives:`,
        tableData: {
          headers: ['Framework', 'Good at', 'Spinx Difference'],
          rows: [
            ['Laravel', 'Batteries-included web apps, mature ecosystem, Eloquent ORM', 'Enforces DDD modules at kernel level; defaults to persistent worker runtime over PHP-FPM'],
            ['Symfony', 'Minimal-app style, routing, extension composition', 'Broader first-party product for validation, DI, auth, records, queues, scheduler, and testing out of the box'],
            ['Slim / Lumen', 'Lightweight micro-APIs, minimal footprint', 'Trades raw minimalism for enforced DDD architecture, persistent performance, and full frontend hydration'],
            ['CodeIgniter', 'Low-overhead web apps and legacy sites', 'Modern product architecture with coroutine/worker-safe state isolation from day one'],
          ],
        },
      },
      {
        headingId: 'gotcha-mental-shift',
        headingTitle: 'What Could Go Wrong: Mental Shift',
        content: `Teams sometimes reach for Spinx expecting a drop-in Laravel replacement. It isn't — the enforced module system means code that "just works" in a loosely structured Laravel app will be rejected by Spinx's autodiscovery until it is placed inside a proper module. Budget time for this mental shift, not just a migration script.`,
        callout: {
          type: 'warning',
          title: 'What Could Go Wrong',
          message: 'Autodiscovery requires code to live inside an active module under app/Modules/<ModuleName>. Placing loose controllers in app/Controllers will result in 404 routes during kernel boot.',
        },
      },
    ],
  },
  {
    id: 'quickstart',
    path: '/docs/quickstart',
    category: 'Getting Started',
    title: 'Installation & Quickstart',
    subtitle: 'Zero manual steps beyond spinx new to get your first Spinx app live.',
    description: 'Get up and running with Spinx on Windows, Linux, or macOS. Learn installer mechanics, system prerequisites, and how dev mode proxies Vite HMR.',
    readTime: '4 min read',
    lastUpdated: 'Updated v1',
    badge: 'Essential',
    headings: [
      { id: 'installation-steps', title: 'Standard Installation', level: 2 },
      { id: 'installer-automation', title: 'What the Installer Automates', level: 2 },
      { id: 'system-requirements', title: 'System Requirements', level: 2 },
      { id: 'running-dev-server', title: 'Running the Dev Server', level: 2 },
      { id: 'gotcha-windows-swoole', title: 'What Could Go Wrong: Windows & Swoole', level: 2 },
    ],
    sections: [
      {
        headingId: 'installation-steps',
        headingTitle: 'Standard Installation',
        content: `Spinx projects are created using the \`spinx new\` CLI command. The install path requires zero manual steps beyond a single terminal command:`,
        codeSnippet: {
          title: 'Terminal - Project Initialization',
          language: 'bash',
          code: `spinx new my-app
cd my-app
spinx serve`,
        },
      },
      {
        headingId: 'installer-automation',
        headingTitle: 'What the Installer Automates',
        content: `When you execute \`spinx new my-app\`, Spinx's scaffolding engine automatically:
1. Detects host OS and CPU architecture (Windows x64, macOS ARM64/x64, Linux x64).
2. Downloads the matching RoadRunner binary into the local bin directory — eliminating compiled PECL C extensions for default installs.
3. Scaffolds a complete \`spinx.json\` file pre-configured with RoadRunner driver and Vue 3 frontend adapter.
4. Generates an initial DDD module skeleton (\`app/Modules/Core\`).`,
      },
      {
        headingId: 'system-requirements',
        headingTitle: 'System Requirements',
        content: `• PHP 8.2 or newer (Spinx uses typed properties, readonly properties, and enums throughout its kernel).
• Node.js 18+ and npm/pnpm for the Vite asset pipeline.
• No compiled PHP C extensions required for the default RoadRunner runtime.
• Swoole / OpenSwoole PECL extension only if explicitly opting into the Swoole driver path (documented for Linux/Docker deployments).`,
        callout: {
          type: 'tip',
          title: 'PHP 8.2+ Modern Typing',
          message: 'Spinx leverages PHP 8.2 DNF types, readonly classes, and enum route parameters for strict contract enforcement.',
        },
      },
      {
        headingId: 'running-dev-server',
        headingTitle: 'Running the Dev Server',
        content: `Executing \`spinx serve\` boots both the backend persistent worker runtime (RoadRunner/Swoole) and the Vite frontend dev server concurrently. Both processes are unified behind a single local HTTP proxy port.

Frontend edits trigger Instant Hot Module Replacement (HMR). Backend controller or route edits trigger automatic worker pool reloading without dropping active browser connections.`,
      },
      {
        headingId: 'gotcha-windows-swoole',
        headingTitle: 'What Could Go Wrong: Windows & Swoole',
        content: `The Swoole driver is not supported natively on Windows operating systems. If your engineering team develops on Windows laptops and plans to deploy on Swoole in production, use the official Spinx Docker image for local development. This prevents debugging OS-specific behavior differences for the first time in production.`,
        callout: {
          type: 'warning',
          title: 'What Could Go Wrong',
          message: 'Running driver:swap swoole on native Windows without Docker will fail due to missing Unix socket support in Windows PECL.',
        },
      },
    ],
  },
  {
    id: 'architecture',
    path: '/docs/architecture',
    category: 'Core Concepts',
    title: 'Runtime Layer, Kernel & State Safety',
    subtitle: 'Understanding long-running persistent workers, request scoping, and zero-leak memory isolation.',
    description: 'Deep dive into the ServerAdapter contract, Kernel compilation, RequestScope container wrappers, and static analysis guard rules.',
    readTime: '7 min read',
    lastUpdated: 'Updated v1',
    badge: 'Deep Dive',
    headings: [
      { id: 'adapter-contract', title: 'The ServerAdapter Contract', level: 2 },
      { id: 'roadrunner-adapter', title: 'RoadRunnerAdapter (Default)', level: 2 },
      { id: 'swoole-adapter', title: 'SwooleAdapter (Opt-In Coroutines)', level: 2 },
      { id: 'kernel-lifecycle', title: 'Kernel Boot & Request Lifecycle', level: 2 },
      { id: 'state-safety-layer', title: 'State Safety Layer & RequestScope', level: 2 },
      { id: 'gotcha-state-leaks', title: 'What Could Go Wrong: Cross-Request Leaks', level: 2 },
    ],
    sections: [
      {
        headingId: 'adapter-contract',
        headingTitle: 'The ServerAdapter Contract',
        content: `All application code interacts with Symfony's \`HttpFoundation\` Request/Response objects exclusively. Every Spinx runtime driver implements the unified \`ServerAdapter\` interface, guaranteeing that swapping runtime engines never breaks application code.`,
        codeSnippet: {
          title: 'Spinx/Runtime/ServerAdapter.php',
          language: 'php',
          code: `namespace Spinx\\Runtime;

use Symfony\\Component\\HttpFoundation\\{Request, Response};

interface ServerAdapter
{
    public function boot(): void;
    public function handle(Request $request): Response;
    public function shutdown(): void;
}`,
        },
      },
      {
        headingId: 'roadrunner-adapter',
        headingTitle: 'RoadRunnerAdapter (Default)',
        content: `• Ships out-of-the-box with zero C extension compilation.
• Handles concurrency via a pool of persistent PHP worker processes managed by a Go supervisor binary.
• Runs natively on Windows, macOS, and Linux.
• Each worker process executes standard synchronous PHP code — existing Composer packages work seamlessly without coroutine rewrite risks.`,
      },
      {
        headingId: 'swoole-adapter',
        headingTitle: 'SwooleAdapter (Opt-In Coroutines)',
        content: `Activated via \`spinx.json\` (\`"driver": "swoole"\`). Provides true event-loop coroutine concurrency closest to Node.js. Requires the Swoole/OpenSwoole PECL C extension and is shipped alongside an official Linux Docker image.`,
        codeSnippet: {
          title: 'Terminal - Swapping Runtime Drivers',
          language: 'bash',
          code: `spinx driver:swap swoole`,
        },
      },
      {
        headingId: 'kernel-lifecycle',
        headingTitle: 'Kernel Boot & Request Lifecycle',
        content: `The Spinx kernel boots ONCE per worker process initialization, NOT per incoming request:

1. Compiles the Symfony Dependency Injection container and caches it to disk.
2. Loads and compiles module route definitions into a static array cache.
3. Registers module service providers and events.
4. Instantiates a Request-Scoped Child Container fresh for each HTTP request, holding request-specific state that is discarded immediately after response flush.`,
        codeSnippet: {
          title: 'bootstrap/app.php - Kernel Hooks',
          language: 'php',
          code: `$app = SpinxApp::boot();

$app->onRequest(function (Request $request) {
    // Executes at the start of every request before routing
});

$app->onShutdown(function () {
    // Executes when worker process is gracefully draining
});

$app->run();`,
        },
      },
      {
        headingId: 'state-safety-layer',
        headingTitle: 'State Safety Layer & RequestScope',
        content: `Reusing RAM across requests poses the risk of state leakage (e.g. User A seeing User B's session). Spinx solves this at the engine level:

1. Static Analysis Rule: A custom PHPStan/Psalm rule flags any static property or singleton holding mutable request data.
2. RequestScope Container Wrapper: Automatically resets request-scoped services at response completion.
3. Safe-by-Default Generators: All CLI generators (\`spinx make:service\`) create request-scoped bindings by default. Singletons require explicit opt-in (\`--singleton\`).`,
        codeSnippet: {
          title: 'app/Security/CurrentUser.php - Scoped Binding',
          language: 'php',
          code: `final class CurrentUser
{
    // Bound request-scoped: fresh instance per request, discarded after.
}

$app->bind(CurrentUser::class)->requestScoped();`,
        },
      },
      {
        headingId: 'gotcha-state-leaks',
        headingTitle: 'What Could Go Wrong: Cross-Request Leaks',
        content: `Anything resolved from the app-level container (instead of the request-scoped container) persists for the life of the worker process — potentially thousands of requests. Binding request-specific data (e.g., current user, request ID) at the app level instead of the request scope is the single most common source of cross-request leaks.`,
        callout: {
          type: 'warning',
          title: 'What Could Go Wrong',
          message: 'Never bind current User or Request parameters as Singleton dependencies. Always resolve them via requestScoped() or pass them explicitly to method signatures.',
        },
      },
    ],
  },
  {
    id: 'configuration',
    path: '/docs/configuration',
    category: 'Core Concepts',
    title: 'Unified Configuration (spinx.json)',
    subtitle: 'Single source of truth for runtime driver, frontend adapter, modules, and database.',
    description: 'Learn how spinx.json centralizes all framework layers, environment variables, driver swapping, and build settings.',
    readTime: '4 min read',
    lastUpdated: 'Updated v1',
    badge: 'Configuration',
    headings: [
      { id: 'json-schema', title: 'spinx.json Schema Reference', level: 2 },
      { id: 'driver-swapping', title: 'Driver Swapping Mechanics', level: 2 },
      { id: 'env-variables', title: 'Environment Variables (.env)', level: 2 },
      { id: 'gotcha-driver-conformance', title: 'What Could Go Wrong: Driver Conformance', level: 2 },
    ],
    sections: [
      {
        headingId: 'json-schema',
        headingTitle: 'spinx.json Schema Reference',
        content: `In Spinx, \`spinx.json\` is the single source of truth for the entire application stack. Modifying drivers or frontend frameworks is a simple config change, never a codebase refactor.`,
        codeSnippet: {
          title: 'spinx.json',
          language: 'json',
          code: `{
  "name": "spinx-application",
  "version": "1.0.0",
  "driver": "roadrunner",
  "frontend": "vue",
  "modules": [
    "Billing",
    "Auth",
    "Catalog"
  ],
  "database": {
    "connection": "pgsql",
    "pool": {
      "min": 5,
      "max": 50
    }
  },
  "migrations": {
    "auto_run": true
  },
  "static_analysis": {
    "level": 8,
    "strict_types": true
  }
}`,
        },
      },
      {
        headingId: 'driver-swapping',
        headingTitle: 'Driver Swapping Mechanics',
        content: `You can switch between RoadRunner and Swoole runtime drivers instantly with:`,
        codeSnippet: {
          title: 'Terminal - Swap Driver',
          language: 'bash',
          code: `spinx driver:swap swoole`,
        },
        callout: {
          type: 'note',
          title: 'Conformance Guarantee',
          message: 'Both adapters pass an identical conformance test suite ensuring identical Request/Response and middleware pipeline behavior.',
        },
      },
      {
        headingId: 'env-variables',
        headingTitle: 'Environment Variables (.env)',
        content: `Sensitive credentials and environment-specific parameters are loaded from \`.env\` at boot time. Because environment variables are immutable during long-running worker execution, changing \`.env\` values in production requires issuing a worker reload: \`spinx reload\`.`,
      },
      {
        headingId: 'gotcha-driver-conformance',
        headingTitle: 'What Could Go Wrong: Driver Conformance',
        content: `Swoole's coroutine model requires all blocking I/O calls in the request path to be coroutine-aware. A blocking third-party C extension or legacy PHP package under Swoole can freeze the entire worker thread. Verify third-party packages before switching to Swoole in production.`,
        callout: {
          type: 'warning',
          title: 'What Could Go Wrong',
          message: 'Third-party blocking HTTP clients (e.g. legacy cURL calls) will block Swoole worker threads. Use Spinx coroutine-safe HTTP client wrappers instead.',
        },
      },
    ],
  },
  {
    id: 'modules',
    path: '/docs/modules',
    category: 'Core Concepts',
    title: 'The Enforced Module System',
    subtitle: 'Kernel-enforced Domain-Driven Design (DDD) module architecture.',
    description: 'Explore Spinx module scaffolding, kernel boundary rules, module-level migrations, and cross-module contracts.',
    readTime: '6 min read',
    lastUpdated: 'Updated v1',
    badge: 'Architecture',
    headings: [
      { id: 'module-scaffold', title: 'Module Directory Structure', level: 2 },
      { id: 'kernel-enforced-rules', title: 'Kernel Enforced DDD Rules', level: 2 },
      { id: 'module-registry', title: 'Module Registry & Feature Toggling', level: 2 },
      { id: 'gotcha-layer-violations', title: 'What Could Go Wrong: Layer Violations', level: 2 },
    ],
    sections: [
      {
        headingId: 'module-scaffold',
        headingTitle: 'Module Directory Structure',
        content: `The module system is the architectural heart of Spinx. There is no bare \`app/Controllers\` fallback — autodiscovery only registers code inside valid DDD module structures. Create a module with:`,
        codeSnippet: {
          title: 'Terminal - Make Module',
          language: 'bash',
          code: `spinx make:module Billing`,
        },
      },
      {
        headingId: 'kernel-enforced-rules',
        headingTitle: 'Kernel Enforced DDD Rules',
        content: `When you create a module, Spinx scaffolds the following strict DDD layout:

\`\`\`
app/Modules/Billing/
├── Domain/
│   ├── Entities/
│   ├── ValueObjects/
│   ├── Events/
│   └── Repositories/        (interfaces only)
├── Application/
│   ├── Services/
│   └── Commands|Queries/
├── Infrastructure/
│   ├── Repositories/        (concrete implementations)
│   ├── Http/
│   │   ├── Controllers/
│   │   └── Middleware/
│   └── Persistence/
│       └── Migrations/
└── module.php                ← registers routes, DI bindings, migrations
\`\`\`

• Kernel Enforced Rules:
1. Controllers must live exclusively under \`Infrastructure/Http/Controllers\`.
2. The \`Domain\` layer must have ZERO dependencies on \`Infrastructure\` or \`Application\` layers.
3. Repository interfaces belong in \`Domain/Repositories\`; concrete classes live in \`Infrastructure/Repositories\`.
4. Modules own their schema migrations independently (\`spinx module:migrate Billing\`).`,
      },
      {
        headingId: 'module-registry',
        headingTitle: 'Module Registry & Feature Toggling',
        content: `The \`modules\` key in \`spinx.json\` controls which modules are compiled at boot. Disabling a module is as simple as removing it from the array, making feature-flagging or commercial module gating seamless.`,
        codeSnippet: {
          title: 'spinx.json - Active Modules',
          language: 'json',
          code: `{
  "modules": [
    "Billing",
    "Auth",
    "Catalog"
  ]
}`,
        },
      },
      {
        headingId: 'gotcha-layer-violations',
        headingTitle: 'What Could Go Wrong: Layer Violations',
        content: `A common early mistake is putting a repository interface under \`Infrastructure\` because "that's where the concrete class will live too." The static analysis rule will fail the build — interfaces belong in \`Domain/Repositories\`, only implementations belong in \`Infrastructure/Repositories\`.`,
        callout: {
          type: 'warning',
          title: 'What Could Go Wrong',
          message: 'Static analysis will reject builds if Domain code imports namespace App\\Modules\\*\\Infrastructure. Domain code must remain pure and free of infrastructure dependencies.',
        },
      },
    ],
  },
  {
    id: 'routing-gates',
    path: '/docs/routing-gates',
    category: 'Backend & Services',
    title: 'Routing, Requests, Auth & Security',
    subtitle: 'Declarative route gates, immutable HTTP objects, and OpenAPI generation.',
    description: 'Learn module route registration, middleware binding, DTO request validation, and built-in security features.',
    readTime: '6 min read',
    lastUpdated: 'Updated v1',
    badge: 'Security & HTTP',
    headings: [
      { id: 'route-declarations', title: 'Module Route Declarations', level: 2 },
      { id: 'request-response-handling', title: 'Request & Response Handling', level: 2 },
      { id: 'middleware-auth-gates', title: 'Declarative Auth Gates & Middleware', level: 2 },
      { id: 'dto-validation', title: 'Request DTO Validation', level: 2 },
      { id: 'gotcha-route-mutations', title: 'What Could Go Wrong: Dynamic Route Drift', level: 2 },
    ],
    sections: [
      {
        headingId: 'route-declarations',
        headingTitle: 'Module Route Declarations',
        content: `Routes are declared per module in \`module.php\` and bound directly to controllers in that module's \`Infrastructure/Http/Controllers\` directory:`,
        codeSnippet: {
          title: 'app/Modules/Billing/module.php',
          language: 'php',
          code: `use App\\Modules\\Billing\\Infrastructure\\Http\\Controllers\\InvoiceController;
use Spinx\\Routing\\Route;

Route::get('/invoices/{invoiceId}', [InvoiceController::class, 'show']);

Route::post('/invoices', [InvoiceController::class, 'store'])
    ->middleware('auth:session');`,
        },
      },
      {
        headingId: 'request-response-handling',
        headingTitle: 'Request & Response Handling',
        content: `All application code interacts with Symfony's \`HttpFoundation\` objects. Handlers receive \`Request\`, \`Response\` — with validated parameters and dependencies injected automatically:`,
        codeSnippet: {
          title: 'InvoiceController.php',
          language: 'php',
          code: `public function show(Request $request, string $invoiceId): Response
{
    return Response::json([
        'invoice_id' => $invoiceId,
        'status' => 'paid',
    ]);
}`,
        },
      },
      {
        headingId: 'middleware-auth-gates',
        headingTitle: 'Declarative Auth Gates & Middleware',
        content: `Auth gates are declared on the route and documented in the same place as the route definition. Session- and token-based guards are supported behind the same \`auth:*\` syntax, configured in \`spinx.json\` and resolved via the request-scoped container so user state never leaks.`,
        codeSnippet: {
          title: 'Route Auth Gate',
          language: 'php',
          code: `Route::post('/v1/billing/invoices', [InvoiceController::class, 'store'])
    ->middleware('auth:jwt')
    ->openapi(summary: "Create billing invoice");`,
        },
      },
      {
        headingId: 'dto-validation',
        headingTitle: 'Request DTO Validation',
        content: `Request DTOs validate incoming payload data at the controller boundary — a handler never runs against unvalidated input:`,
        codeSnippet: {
          title: 'CreateInvoiceRequest.php',
          language: 'php',
          code: `final class CreateInvoiceRequest
{
    public function __construct(
        public readonly string $customerId,
        public readonly int $amountCents,
    ) {}
}

// Controller Signature:
public function store(Request $request, CreateInvoiceRequest $data): Response
{
    // $data is guaranteed valid and typed by the time this executes
}`,
        },
      },
      {
        headingId: 'gotcha-route-mutations',
        headingTitle: 'What Could Go Wrong: Dynamic Route Drift',
        content: `Routes are compiled ONCE at kernel boot. Attempting to register dynamic routes inside a controller or request handler during execution will fail — route definitions are immutable after boot to prevent race conditions across long-lived workers.`,
        callout: {
          type: 'warning',
          title: 'What Could Go Wrong',
          message: 'Never attempt to call Route::get() inside a controller or middleware. Declare all route paths in module.php.',
        },
      },
    ],
  },
  {
    id: 'database-orm',
    path: '/docs/database-orm',
    category: 'Backend & Services',
    title: 'Data Layer (ORM) & Dependency Injection',
    subtitle: 'Symfony DBAL foundation with coroutine-safe connection pooling and DI resolution.',
    description: 'Learn how Spinx implements a fluent, coroutine-safe ORM on DBAL, along with request-scoped DI service binding.',
    readTime: '7 min read',
    lastUpdated: 'Updated v1',
    badge: 'Database & DI',
    headings: [
      { id: 'dbal-foundation', title: 'DBAL Foundation (Why Not Doctrine?)', level: 2 },
      { id: 'query-builder-relations', title: 'Query Builder & Relationships', level: 2 },
      { id: 'coroutine-pooling', title: 'Coroutine & Worker Connection Pooling', level: 2 },
      { id: 'di-service-bindings', title: 'Dependency Injection Bindings', level: 2 },
      { id: 'gotcha-orm-leak', title: 'What Could Go Wrong: Cached Record Instances', level: 2 },
    ],
    sections: [
      {
        headingId: 'dbal-foundation',
        headingTitle: 'DBAL Foundation (Why Not Doctrine?)',
        content: `Spinx's ORM is built on Symfony DBAL, explicitly NOT full Doctrine ORM. Doctrine's UnitOfWork / proxy model is not coroutine-safe, which conflicts with Swoole execution. Spinx provides an Eloquent-shaped API directly over DBAL's connection and schema abstraction.`,
      },
      {
        headingId: 'query-builder-relations',
        headingTitle: 'Query Builder & Relationships',
        content: `Spinx ORM provides expressive fluent queries and relation mapping (\`hasOne\`, \`hasMany\`, \`belongsTo\`, \`belongsToMany\`, polymorphic):`,
        codeSnippet: {
          title: 'Invoice Query Example',
          language: 'php',
          code: `Invoice::where('status', 'unpaid')
    ->whereIn('customer_id', $customerIds)
    ->with('customer')
    ->orderBy('created_at', 'desc')
    ->paginate(25);`,
        },
      },
      {
        headingId: 'coroutine-pooling',
        headingTitle: 'Coroutine & Worker Connection Pooling',
        content: `Connection pooling is handled per runtime adapter:
• RoadRunner: A connection is reused per worker process and reset between requests.
• Swoole: A coroutine-aware pool checks connections out and in per coroutine, preventing cross-coroutine socket sharing.`,
      },
      {
        headingId: 'di-service-bindings',
        headingTitle: 'Dependency Injection Bindings',
        content: `Services are registered in \`module.php\` and resolved via the request-scoped child container:`,
        codeSnippet: {
          title: 'app/Modules/Billing/module.php',
          language: 'php',
          code: `$app->bind(InvoiceRepository::class, EloquentInvoiceRepository::class);
$app->bind(InvoiceService::class)->requestScoped();`,
        },
      },
      {
        headingId: 'gotcha-orm-leak',
        headingTitle: 'What Could Go Wrong: Cached Record Instances',
        content: `Holding a \`Record\` instance (or its underlying DB connection) as a property on a singleton service is the fastest way to leak database state across requests. Always resolve models fresh within the request scope — never cache a model instance at the app level.`,
        callout: {
          type: 'warning',
          title: 'What Could Go Wrong',
          message: 'Never store active Record or Entity instances inside singleton class properties. Always query models within request-scoped handlers.',
        },
      },
    ],
  },
  {
    id: 'queues-scheduler',
    path: '/docs/queues-scheduler',
    category: 'Backend & Services',
    title: 'Background Work: Queues & Scheduler',
    subtitle: 'Offload heavy jobs and schedule recurring cron tasks without extra supervisor processes.',
    description: 'Master async queue workers, background job dispatching, cron task scheduling, and worker state isolation.',
    readTime: '5 min read',
    lastUpdated: 'Updated v1',
    badge: 'Async Workloads',
    headings: [
      { id: 'dispatching-jobs', title: 'Dispatching Async Queue Jobs', level: 2 },
      { id: 'task-scheduler', title: 'Cron Task Scheduler', level: 2 },
      { id: 'worker-isolation', title: 'Worker Process Isolation', level: 2 },
      { id: 'gotcha-queue-state', title: 'What Could Go Wrong: Queue State Assumption', level: 2 },
    ],
    sections: [
      {
        headingId: 'dispatching-jobs',
        headingTitle: 'Dispatching Async Queue Jobs',
        content: `Anything that doesn't need to block the HTTP response goes on a queue in one line:`,
        codeSnippet: {
          title: 'Dispatching Queue Job',
          language: 'php',
          code: `$app->queue()->push(new SendInvoiceEmail($invoiceId));`,
        },
      },
      {
        headingId: 'task-scheduler',
        headingTitle: 'Cron Task Scheduler',
        content: `Register recurring jobs against the application scheduler once — eliminating drift between codebase definitions and crontab entries on the server:`,
        codeSnippet: {
          title: 'bootstrap/scheduler.php',
          language: 'php',
          code: `$app->scheduler()
    ->job(ReconcileInvoices::class)
    ->daily();`,
        },
      },
      {
        headingId: 'worker-isolation',
        headingTitle: 'Worker Process Isolation',
        content: `Queued jobs execute on dedicated background worker processes isolated from HTTP request workers. Services resolved inside a job handler go through their own fresh request-scoped container.`,
      },
      {
        headingId: 'gotcha-queue-state',
        headingTitle: 'What Could Go Wrong: Queue State Assumption',
        content: `Queued jobs run on entirely separate worker processes from HTTP request workers. Any service resolved inside a job handler goes through its own fresh container — do not assume a job can read state left behind by the HTTP request that queued it. Pass everything explicitly through constructor arguments.`,
        callout: {
          type: 'warning',
          title: 'What Could Go Wrong',
          message: 'Never pass un-serialized Request or Session objects to queue constructors. Pass primitive IDs or serializable DTOs.',
        },
      },
    ],
  },
  {
    id: 'inertia-setup',
    path: '/docs/inertia-setup',
    category: 'Frontend & Inertia',
    title: 'Templating, Inertia & Native Reach',
    subtitle: 'Vue 3 & React SPA hydration, Vite HMR, and mobile/desktop shell compilation.',
    description: 'Learn how Inertia renders frontend views, configure Vite HMR, run native previewers, and understand mobile shell compilation.',
    readTime: '6 min read',
    lastUpdated: 'Updated v1',
    badge: 'Frontend & Mobile',
    headings: [
      { id: 'inertia-model', title: 'Inertia Page Rendering Model', level: 2 },
      { id: 'frontend-adapters', title: 'Vue 3 & React Swappable Adapters', level: 2 },
      { id: 'vite-hmr-build', title: 'Vite HMR & Production Build', level: 2 },
      { id: 'desktop-mobile-previewer', title: 'Desktop & Mobile Previewer', level: 2 },
      { id: 'mobile-compilation', title: 'Mobile Shell Compilation (Path A vs B)', level: 2 },
    ],
    sections: [
      {
        headingId: 'inertia-model',
        headingTitle: 'Inertia Page Rendering Model',
        content: `Spinx renders through Inertia — server-driven page rendering with shared props and zero API boilerplate duplication:`,
        codeSnippet: {
          title: 'InvoiceController.php - Inertia Render',
          language: 'php',
          code: `public function show(Request $request, string $invoiceId): Response
{
    return Inertia::render('Invoices/Show', [
        'invoice' => $this->invoices->find($invoiceId),
    ]);
}`,
        },
      },
      {
        headingId: 'frontend-adapters',
        headingTitle: 'Vue 3 & React Swappable Adapters',
        content: `Vue 3 ships as the default frontend adapter. React 19 is available via \`spinx new --frontend=react\`, using the exact same Inertia controller contract.`,
      },
      {
        headingId: 'vite-hmr-build',
        headingTitle: 'Vite HMR & Production Build',
        content: `During development (\`spinx serve\`), backend workers and Vite dev server run concurrently. In production (\`spinx build\`), Vite outputs static assets that are served directly by the PHP runtime adapter without a Node process in production.`,
      },
      {
        headingId: 'desktop-mobile-previewer',
        headingTitle: 'Desktop & Mobile Previewer',
        content: `Spinx orchestrates native platform tooling directly:`,
        codeSnippet: {
          title: 'Terminal - Launch Native Previewers',
          language: 'bash',
          code: `spinx preview --android   # Launches Android Emulator via ADB
spinx preview --ios       # Launches iOS Simulator via Xcode tooling
spinx preview --desktop   # Opens native WebView window via Go shell`,
        },
      },
      {
        headingId: 'mobile-compilation',
        headingTitle: 'Mobile Shell Compilation (Path A vs B)',
        content: `• Path A (Committed v1 Scope): Compiled Vue/React frontend assets wrapped in a Go-built native shell (WebView wrapper). Communicates with the Spinx backend over REST/WebSockets.
• Path B (Phase 2 Feasibility Spike): On-device PHP runtime (FrankenPHP cgo approach). Explicitly non-committed pending a standalone feasibility spike.`,
        callout: {
          type: 'note',
          title: 'Path A Native Mobile Strategy',
          message: 'Path A provides instant mobile app deployment to App Store / Play Store while keeping the backend centralized.',
        },
      },
    ],
  },
  {
    id: 'cli-reference',
    path: '/docs/cli-reference',
    category: 'API & Reference',
    title: 'CLI Reference & Commands',
    subtitle: 'Complete command-line interface specification for Spinx framework.',
    description: 'Comprehensive reference of all CLI commands for project creation, code generation, runtime management, and previewers.',
    readTime: '4 min read',
    lastUpdated: 'Updated v1',
    badge: 'Reference',
    headings: [
      { id: 'all-commands-table', title: 'Complete CLI Command Table', level: 2 },
      { id: 'generator-reference', title: 'Code Generators Reference', level: 2 },
    ],
    sections: [
      {
        headingId: 'all-commands-table',
        headingTitle: 'Complete CLI Command Table',
        content: `Below is the complete reference of all first-party Spinx CLI commands:`,
        tableData: {
          headers: ['Command', 'Purpose'],
          rows: [
            ['spinx new <project>', 'Scaffold new app with enforced module dir, frontend, runtime config'],
            ['spinx make:module <Name>', 'Generate full DDD module skeleton'],
            ['spinx make:controller <Module> <Name>', 'Generate controller, module-scoped only'],
            ['spinx make:entity, make:service, make:repository', 'Layer-scoped generator tools'],
            ['spinx serve', 'Boot backend runtime + Vite dev server with HMR'],
            ['spinx module:migrate <Name>', 'Run a single module\'s migrations independently'],
            ['spinx preview --android | --ios | --desktop', 'Launch native platform previewers'],
            ['spinx build', 'Production build (Vite bundle + backend container cache)'],
            ['spinx driver:swap <roadrunner|swoole>', 'Switch runtime driver in spinx.json'],
          ],
        },
      },
      {
        headingId: 'generator-reference',
        headingTitle: 'Code Generators Reference',
        content: `All code generator commands enforce module boundaries. Attempting to generate a controller without specifying a module target will prompt for module selection.`,
      },
    ],
  },
  {
    id: 'saas-quickstart',
    path: '/docs/guides/saas-quickstart',
    category: 'Guides & Examples',
    title: 'Multi-Tenant SaaS & Stripe Guide',
    subtitle: 'Building high-scale SaaS with tenant isolation and async Stripe webhooks.',
    description: 'Practical guide to multi-tenant request middleware, isolated tenant contexts, and async Stripe webhook processing.',
    readTime: '8 min read',
    lastUpdated: 'Updated v1',
    badge: 'Guide',
    headings: [
      { id: 'saas-architecture', title: 'Multi-Tenant Architecture Overview', level: 2 },
      { id: 'tenant-middleware', title: 'Tenant Isolation Middleware', level: 2 },
      { id: 'async-stripe-webhooks', title: 'Async Stripe Webhook Handler', level: 2 },
    ],
    sections: [
      {
        headingId: 'saas-architecture',
        headingTitle: 'Multi-Tenant Architecture Overview',
        content: `Spinx's request-scoped container makes multi-tenant SaaS architecture clean and memory-safe. Tenants are identified via subdomain or header, and their scoped database connection is bound for the duration of that request only.`,
      },
      {
        headingId: 'tenant-middleware',
        headingTitle: 'Tenant Isolation Middleware',
        content: `Register a tenant identification middleware on routes requiring multi-tenant scoping:`,
        codeSnippet: {
          title: 'IdentifyTenant.php',
          language: 'php',
          code: `final class IdentifyTenant
{
    public function handle(Request $request, Closure $next): Response
    {
        $tenantId = $request->headers->get('X-Tenant-ID');
        Container::requestScope()->bind(Tenant::class, fn() => Tenant::find($tenantId));
        return $next($request);
    }
}`,
        },
      },
      {
        headingId: 'async-stripe-webhooks',
        headingTitle: 'Async Stripe Webhook Handler',
        content: `Process incoming Stripe webhooks instantly by responding with HTTP 200 and pushing heavy billing reconciliation onto the background queue:`,
        codeSnippet: {
          title: 'StripeWebhookController.php',
          language: 'php',
          code: `public function handle(Request $request): Response
{
    $payload = $request->getContent();
    $app->queue()->push(new ProcessStripeEvent($payload));
    return Response::json(['received' => true]);
}`,
        },
      },
    ],
  },
  {
    id: 'microservice',
    path: '/docs/guides/microservice',
    category: 'Guides & Examples',
    title: 'High-Throughput Microservice & Gateway Guide',
    subtitle: 'Architecting ultra-fast API proxies and microservices with Spinx.',
    description: 'Learn how to build sub-millisecond API gateways, in-memory rate limiters, and microservices.',
    readTime: '6 min read',
    lastUpdated: 'Updated v1',
    badge: 'Guide',
    headings: [
      { id: 'gateway-overview', title: 'Microservice Gateway Architecture', level: 2 },
      { id: 'rate-limiting', title: 'In-Memory Rate Limiting', level: 2 },
    ],
    sections: [
      {
        headingId: 'gateway-overview',
        headingTitle: 'Microservice Gateway Architecture',
        content: `Due to persistent worker memory state, Spinx functions as a high-throughput API gateway or microservice router, matching routes and forwarding requests in under 0.2ms.`,
      },
      {
        headingId: 'rate-limiting',
        headingTitle: 'In-Memory Rate Limiting',
        content: `Leverage long-running worker RAM for ultra-fast token bucket rate limiting without external Redis roundtrips:`,
        codeSnippet: {
          title: 'RateLimiterMiddleware.php',
          language: 'php',
          code: `final class RateLimiter
{
    private static array $hits = [];

    public function handle(Request $request, Closure $next): Response
    {
        $ip = $request->getClientIp();
        self::$hits[$ip] = (self::$hits[$ip] ?? 0) + 1;
        if (self::$hits[$ip] > 1000) {
            return Response::json(['error' => 'Rate limit exceeded'], 429);
        }
        return $next($request);
    }
}`,
        },
      },
    ],
  },
  {
    id: 'testing-deployment',
    path: '/docs/testing-deployment',
    category: 'API & Reference',
    title: 'Testing, Leak Detection & Deployment',
    subtitle: 'Conformance test suite, dev leak detector, and graceful worker deployment mechanics.',
    description: 'Understand the automated conformance test matrix, memory leak detector, Docker builds, and zero-downtime worker reloads.',
    readTime: '6 min read',
    lastUpdated: 'Updated v1',
    badge: 'DevOps & QA',
    headings: [
      { id: 'conformance-testing', title: 'Runtime Conformance Test Suite', level: 2 },
      { id: 'dev-leak-detector', title: 'Dev-Mode Memory Leak Detector', level: 2 },
      { id: 'deployment-mechanics', title: 'Packaging & Production Deployment', level: 2 },
      { id: 'security-hardening', title: 'Security Hardening Checklist', level: 2 },
      { id: 'roadmap-risks', title: 'Roadmap & Open Risk Matrix', level: 2 },
    ],
    sections: [
      {
        headingId: 'conformance-testing',
        headingTitle: 'Runtime Conformance Test Suite',
        content: `Both runtime adapters (RoadRunner & Swoole) pass an identical automated conformance test suite. Tests verify exact Request/Response object contracts, header casing, middleware execution order, and exception handling across both drivers.`,
      },
      {
        headingId: 'dev-leak-detector',
        headingTitle: 'Dev-Mode Memory Leak Detector',
        content: `A dev-mode leak detector runs after every HTTP request in test/CI environments and fails loudly if:
1. The request-scoped container holds reachable references after response teardown.
2. A DB connection was checked out from the pool but never returned.
3. PHP output buffer depth differs from what it was pre-request.

This turns subtle state-poisoning bugs into immediate failing test cases.`,
        callout: {
          type: 'performance',
          title: 'Automated Leak Guard',
          message: 'CI test runs automatically fail if any request leaks references or unreturned DB handles across requests.',
        },
      },
      {
        headingId: 'deployment-mechanics',
        headingTitle: 'Packaging & Production Deployment',
        content: `• Shipped as a Composer package with automatic platform binary downloads.
• Official Docker container image published for Swoole deployments.
• Deployments require issuing a graceful worker reload (\`spinx reload\`) to drain active requests without dropping TCP connections.`,
        codeSnippet: {
          title: 'Terminal - Graceful Production Reload',
          language: 'bash',
          code: `spinx reload --drain-timeout=30`,
        },
      },
      {
        headingId: 'security-hardening',
        headingTitle: 'Security Hardening Checklist',
        content: `1. Auth gates declared directly on route signatures (§13).
2. Request-scoped state isolation (§5) preventing cross-user session leaks.
3. Static analysis rules (§5.1, §6.2) blocking singleton state mutation.
4. First-party CSRF and CORS middleware enabled by default.`,
      },
      {
        headingId: 'roadmap-risks',
        headingTitle: 'Roadmap & Open Risk Matrix',
        content: `Open Risk Assessment Matrix:`,
        tableData: {
          headers: ['Subsystem / Item', 'Risk Level', 'Mitigation Strategy / Notes'],
          rows: [
            ['Static analysis DDD enforcement', 'Medium', 'Custom PHPStan / Psalm rule suite shipped in core'],
            ['Coroutine-safe DB connection pooling', 'Medium', 'Adapter-specific pool implementations (checked in CI)'],
            ['Go-based mobile shell maturity', 'Medium-High', 'Isolated WebView wrapper fallback available'],
            ['On-device PHP runtime (Path B)', 'High', 'Deferred pending Phase 2 standalone feasibility spike'],
          ],
        },
      },
    ],
  },
];
