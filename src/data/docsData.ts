export interface DocHeading {
  id: string;
  title: string;
  level: number;
}

export interface DocArticle {
  id: string;
  path: string;
  category: 'Getting Started' | 'Core Concepts' | 'Backend & Services' | 'Frontend & Islands' | 'API & Reference' | 'Guides & Examples';
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
  'Frontend & Islands',
  'API & Reference',
  'Guides & Examples',
] as const;

export const DOCS_DATA: DocArticle[] = [
  {
    id: 'introduction',
    path: '/docs/introduction',
    category: 'Getting Started',
    title: 'Introduction to Spinx Framework',
    subtitle: 'The modern PHP engine for high-concurrency coroutines, enforced DDD architecture, and reactive island hydration.',
    description: 'Spinx is a next-generation full-stack PHP framework engineered for extreme performance, clean domain-driven architecture, and seamless island hydration with Vue and React.',
    readTime: '5 min read',
    lastUpdated: 'v1.0.0 (Production Ready)',
    badge: 'Core Reference',
    headings: [
      { id: 'overview', title: 'Framework Overview', level: 2 },
      { id: 'core-pillars', title: 'Core Architecture Pillars', level: 2 },
      { id: 'scope-non-goals', title: 'Scope & Architecture Guarantees', level: 2 },
      { id: 'positioning-matrix', title: 'Comparison & Positioning Matrix', level: 2 },
      { id: 'gotcha-mental-shift', title: 'What Could Go Wrong: Mental Shift', level: 2 },
    ],
    sections: [
      {
        headingId: 'overview',
        headingTitle: 'Framework Overview',
        content: `Spinx is a PHP framework for applications that demand near-Node.js performance, zero-friction cross-platform installation, and an enforced Domain-Driven Design (DDD) architecture from the first command run.

By eliminating traditional PHP-FPM per-request bootstrap overhead, Spinx hosts your application inside long-running execution workers (RoadRunner out of the box, Swoole coroutines opt-in). Route matching, container resolution, and database connections remain warmed in RAM across requests, serving thousands of requests per second with microsecond latency.`,
        codeSnippet: {
          title: 'spinx.json - Single Source of Truth',
          language: 'json',
          code: `{
  "appName": "Spinx App",
  "driver": "roadrunner",
  "frontend": "vue",
  "modules": {
    "Health": true,
    "Todo": true,
    "Billing": true
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
2. Portability: Runs on Windows, Linux, and macOS with a single install step — no compiled C extensions required by default.
3. Enforced Architecture: DDD module layout is not an optional convention; it is structurally the only way the kernel registers code.
4. Island Hydration: Server-rendered HTML templates with targeted client-side hydration islands (@island) for Vue 3 and React 19.
5. Native Reach: Built-in desktop and mobile previewers (spinx preview --mobile) and scaffolders for native Android and iOS shells.`,
      },
      {
        headingId: 'scope-non-goals',
        headingTitle: 'Scope & Architecture Guarantees',
        content: `Spinx provides an integrated suite of framework subsystems designed for long-running runtimes:

• Persistent Runtime Isolation: Single-boot kernel with RequestScope container tracking to eliminate memory leaks across requests.
• DBAL-Based Active Record: Eloquent-shaped ergonomics with pre-compiled schema column caching, upsert support, and row locking.
• Built-In Auth & Session: Stateful session management (File/Database) safe for persistent workers, with session-fixation protection.
• In-Framework Scheduler: Cron expressions declared fluently in schedule.php, driven by a single OS cron entry.
• Automatic OpenAPI: Reflection-based OpenAPI 3.1 schema generation from routes and PHP 8 attributes.`,
      },
      {
        headingId: 'positioning-matrix',
        headingTitle: 'Comparison & Positioning Matrix',
        content: `How Spinx compares against established PHP framework alternatives:`,
        tableData: {
          headers: ['Framework', 'Good at', 'Spinx Difference'],
          rows: [
            ['Laravel', 'Batteries-included web apps, mature ecosystem, Eloquent ORM', 'Enforces DDD modules at kernel level; defaults to persistent worker runtime over PHP-FPM with zero-drift state safety'],
            ['Symfony', 'Enterprise components, HTTP kernel, DI flexibility', 'Full opinionated full-stack framework with out-of-the-box auth, records, queues, scheduler, and Vite islands'],
            ['Slim / Lumen', 'Lightweight micro-APIs, minimal footprint', 'Full-featured architecture with DDD boundaries, persistent performance, and interactive mobile preview tools'],
          ],
        },
      },
      {
        headingId: 'gotcha-mental-shift',
        headingTitle: 'What Could Go Wrong: Mental Shift',
        content: `The enforced module system means code that "just works" in a loosely structured app will not be discovered by Spinx until placed inside a valid module under app/Modules/<Name>/module.php. Budget time for this architectural discipline.`,
        callout: {
          type: 'warning',
          title: 'What Could Go Wrong',
          message: 'Autodiscovery requires code to live inside an active module. Placing loose controllers in app/Controllers will result in 404 routes during kernel boot.',
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
        content: `Spinx projects are created using the \`spinx new\` CLI command:`,
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
2. Downloads the matching RoadRunner binary into the project directory — eliminating compiled PECL C extensions for default installs.
3. Scaffolds a complete \`spinx.json\` pre-configured with RoadRunner and Vue 3 frontend adapter.
4. Generates an initial reference module skeleton (\`app/Modules/Health\`).`,
      },
      {
        headingId: 'system-requirements',
        headingTitle: 'System Requirements',
        content: `• PHP 8.2 or newer (Spinx uses typed properties, readonly properties, and enums throughout its kernel).
• ext-mbstring extension for UTF-8 string validation.
• Node.js 18+ and npm/pnpm for the Vite frontend pipeline.
• No compiled PHP C extensions required for the default RoadRunner runtime.`,
        callout: {
          type: 'tip',
          title: 'PHP 8.2+ Modern Typing',
          message: 'Spinx leverages PHP 8.2 DNF types, readonly classes, and enum route parameters for strict contract enforcement.',
        },
      },
      {
        headingId: 'running-dev-server',
        headingTitle: 'Running the Dev Server',
        content: `Executing \`spinx serve\` boots both the backend persistent worker runtime (RoadRunner/Swoole) and the Vite frontend dev server concurrently.

Frontend edits trigger Instant Hot Module Replacement (HMR). Backend controller or route edits trigger automatic worker pool reloading.`,
      },
      {
        headingId: 'gotcha-windows-swoole',
        headingTitle: 'What Could Go Wrong: Windows & Swoole',
        content: `The Swoole driver is not supported natively on Windows. For local Windows development, use the default RoadRunner driver or the official Spinx Docker container if targeting Swoole in production.`,
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
    ],
    sections: [
      {
        headingId: 'adapter-contract',
        headingTitle: 'The ServerAdapter Contract',
        content: `All application code interacts with Symfony's \`HttpFoundation\` Request and Response objects. Every Spinx runtime driver implements the unified \`ServerAdapter\` interface, guaranteeing that swapping runtime engines never breaks application code.`,
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
        content: `RoadRunner uses a high-performance Go process supervisor that dispatches incoming HTTP requests over Unix sockets or named pipes to worker PHP processes. Each worker handles one request at a time sequentially.`,
      },
      {
        headingId: 'swoole-adapter',
        headingTitle: 'SwooleAdapter (Opt-In Coroutines)',
        content: `Swoole runs as a C extension within PHP, multiplexing concurrent requests within a single process via coroutines. Spinx provides coroutine-safe connection pooling to prevent socket corruption.`,
      },
      {
        headingId: 'kernel-lifecycle',
        headingTitle: 'Kernel Boot & Request Lifecycle',
        content: `Kernel::boot() runs once at worker process startup:
1. Loads environment variables (.env).
2. Boots configuration store (\`Spinx\\Support\\Config\`).
3. Compiles the Symfony DI container and warms cache to disk.
4. Initializes DBAL connection managers and boots the pre-compiled SchemaCache.
5. Boots Auth and Session subsystems.
6. Compiles all module routes into a single Symfony RouteCollection.`,
      },
      {
        headingId: 'state-safety-layer',
        headingTitle: 'State Safety Layer & RequestScope',
        content: `To ensure zero state leakage between requests in persistent workers:
• RequestScope automatically resets tagged module services between requests.
• The PHPStan \`NoMutableStaticStateRule\` flags mutable static properties at build time.`,
        codeSnippet: {
          title: 'PHPStan Leak Check',
          language: 'bash',
          code: `vendor/bin/phpstan analyse
✔ [NoMutableStaticStateRule] 0 state leaks across persistent worker pool`,
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
      { id: 'module-definition', title: 'The module.php Definition File', level: 2 },
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
│   └── Jobs/
├── Infrastructure/
│   ├── Repositories/        (concrete implementations)
│   ├── Http/
│   │   ├── Controllers/
│   │   └── Middleware/
│   └── Persistence/
│       ├── Models/
│       └── Migrations/
└── module.php                ← registers aliases, routes, services
\`\`\`

• Kernel Enforced Rules:
1. Controllers must live exclusively under \`Infrastructure/Http/Controllers\`.
2. The \`Domain\` layer must have ZERO dependencies on \`Infrastructure\` or \`Application\` layers.
3. Repository interfaces belong in \`Domain/Repositories\`; concrete classes live in \`Infrastructure/Repositories\`.`,
      },
      {
        headingId: 'module-definition',
        headingTitle: 'The module.php Definition File',
        content: `Every module defines its controllers, middlewares, routes, and services in \`module.php\`:`,
        codeSnippet: {
          title: 'app/Modules/Billing/module.php',
          language: 'php',
          code: `use App\\Modules\\Billing\\Infrastructure\\Http\\Controllers\\InvoiceController;
use Spinx\\Auth\\Middleware\\AuthMiddleware;
use Spinx\\Routing\\{AliasRegistry, Route, RouteBuilder};
use Symfony\\Component\\DependencyInjection\\ContainerBuilder;

return [
    'controllers' => static function (AliasRegistry $r): void {
        $r->registerController('invoice_show', InvoiceController::class);
    },
    'middlewares' => static function (AliasRegistry $r): void {
        $r->registerMiddleware('auth', AuthMiddleware::class);
    },
    'routes' => static function (RouteBuilder $routes): void {
        Route::get(['invoices.show', '/invoices/{id}'])
            ->middleware(['auth'])
            ->controller('invoice_show');
    },
    'services' => static function (ContainerBuilder $c, string $dir): void {
        $c->register(InvoiceRepositoryInterface::class, InvoiceRepository::class)
            ->setAutowired(true)
            ->setPublic(true);
    },
];`,
        },
      },
      {
        headingId: 'gotcha-layer-violations',
        headingTitle: 'What Could Go Wrong: Layer Violations',
        content: `Repository interfaces belong in \`Domain/Repositories\`, while implementations belong in \`Infrastructure/Repositories\`. The static analysis rule will reject builds that violate layer boundaries.`,
        callout: {
          type: 'warning',
          title: 'What Could Go Wrong',
          message: 'Static analysis will reject builds if Domain code imports namespace App\\Modules\\*\\Infrastructure. Domain code must remain pure and free of infrastructure dependencies.',
        },
      },
    ],
  },
  {
    id: 'routing',
    path: '/docs/routing',
    category: 'Core Concepts',
    title: 'Fluent Routing DSL & Middlewares',
    subtitle: 'Expressive route definitions, string alias resolution, and middleware pipelines.',
    description: 'Learn how to use Spinx\'s fluent Route DSL, register controller and middleware aliases, and create nested route groups.',
    readTime: '6 min read',
    lastUpdated: 'Updated v1',
    badge: 'Routing',
    headings: [
      { id: 'fluent-dsl', title: 'Fluent Route DSL', level: 2 },
      { id: 'route-groups', title: 'Nested Route Groups & Prefixes', level: 2 },
      { id: 'alias-system', title: 'Controller & Middleware Alias System', level: 2 },
      { id: 'middleware-pipeline', title: 'Middleware Execution Pipeline', level: 2 },
    ],
    sections: [
      {
        headingId: 'fluent-dsl',
        headingTitle: 'Fluent Route DSL',
        content: `Spinx features an expressive, fluent routing DSL that compiles down to Symfony's high-speed RouteCollection at boot time:`,
        codeSnippet: {
          title: 'Fluent Route Definition',
          language: 'php',
          code: `use Spinx\\Routing\\Route;

Route::get(['orders.index', '/orders'])
    ->middleware(['auth'])
    ->controller('order_list');

Route::post(['orders.create', '/orders'])
    ->middleware(['auth', 'csrf'])
    ->controller('order_create');`,
        },
      },
      {
        headingId: 'route-groups',
        headingTitle: 'Nested Route Groups & Prefixes',
        content: `Group routes under a shared URL prefix using \`Route::group()\`:`,
        codeSnippet: {
          title: 'Route Grouping Example',
          language: 'php',
          code: `Route::group('/api/v1', function (RouteBuilder $group): void {
    Route::get(['users.list', '/users'])->controller('user_list');
    Route::get(['users.show', '/users/{id}'])->controller('user_show');
});`,
        },
      },
      {
        headingId: 'alias-system',
        headingTitle: 'Controller & Middleware Alias System',
        content: `String aliases decouple route declarations from fully qualified class names. Aliases registered in \`controllers\` and \`middlewares\` closures are automatically registered in the Symfony DI container:`,
        codeSnippet: {
          title: 'Alias Registration in module.php',
          language: 'php',
          code: `'controllers' => static function (AliasRegistry $r): void {
    $r->registerController('order_list', OrderListController::class);
},
'middlewares' => static function (AliasRegistry $r): void {
    $r->registerMiddleware('auth', AuthMiddleware::class);
    $r->registerMiddleware('rate_limit', RateLimitMiddleware::class);
},`,
        },
      },
      {
        headingId: 'middleware-pipeline',
        headingTitle: 'Middleware Execution Pipeline',
        content: `Middlewares implement a simple process() signature wrapping the request:`,
        codeSnippet: {
          title: 'Middleware Example',
          language: 'php',
          code: `final class CustomMiddleware
{
    public function process(Request $request, \\Closure $next): Response
    {
        // Pre-handler logic
        $response = $next($request);
        // Post-handler logic
        return $response;
    }
}`,
        },
      },
    ],
  },
  {
    id: 'database-orm',
    path: '/docs/database-orm',
    category: 'Backend & Services',
    title: 'Database, Active Record ORM & Schema Cache',
    subtitle: 'Symfony DBAL foundation with coroutine-safe pooling, schema caching, and atomic operations.',
    description: 'Learn how Spinx implements a fluent active-record ORM on DBAL with pre-compiled schema caching, upserts, and row locking.',
    readTime: '7 min read',
    lastUpdated: 'Updated v1',
    badge: 'Database & ORM',
    headings: [
      { id: 'dbal-foundation', title: 'DBAL 4 Foundation & Connection Pooling', level: 2 },
      { id: 'schema-cache', title: 'Pre-Compiled Schema Cache (spinx schema:compile)', level: 2 },
      { id: 'column-selection', title: 'Column Selection (selectWith & selectWithout)', level: 2 },
      { id: 'conditional-queries', title: 'Conditional Queries (when/then/else)', level: 2 },
      { id: 'atomic-upsert', title: 'Atomic Upserts & SELECT FOR UPDATE', level: 2 },
      { id: 'db-facade', title: 'The DB Static Façade & Transactions', level: 2 },
    ],
    sections: [
      {
        headingId: 'dbal-foundation',
        headingTitle: 'DBAL 4 Foundation & Connection Pooling',
        content: `Spinx ORM is built on Doctrine DBAL 4. Connection pooling is managed automatically per runtime driver — persistent single connections for RoadRunner, and coroutine-aware checkout/release pools for Swoole.`,
      },
      {
        headingId: 'schema-cache',
        headingTitle: 'Pre-Compiled Schema Cache (spinx schema:compile)',
        content: `Running \`spinx schema:compile\` inspects table schemas via DBAL 4 and writes an immutable column mapping file into \`storage/cache/schema_columns.php\`. The Kernel loads this file into OpCache at boot — zero runtime DB schema queries!`,
        codeSnippet: {
          title: 'Terminal - Compile Schema Cache',
          language: 'bash',
          code: `spinx schema:compile
# Output: [Spinx] Schema compiled → storage/cache/schema_columns.php`,
        },
      },
      {
        headingId: 'column-selection',
        headingTitle: 'Column Selection (selectWith & selectWithout)',
        content: `Select specific columns or omit sensitive columns using pre-compiled schema introspection:`,
        codeSnippet: {
          title: 'Column Filtering Example',
          language: 'php',
          code: `// Select all columns except sensitive credentials:
$users = User::query()
    ->selectWithout('password', 'remember_token')
    ->get();

// Select strictly required fields:
$titles = User::query()
    ->selectWith('id', 'name', 'email')
    ->get();`,
        },
      },
      {
        headingId: 'conditional-queries',
        headingTitle: 'Conditional Queries (when/then/else)',
        content: `Construct queries conditionally using fluent \`when()\`, \`then()\`, and \`else()\` / \`otherwise()\` clauses:`,
        codeSnippet: {
          title: 'Conditional Query Example',
          language: 'php',
          code: `$orders = Order::query()
    ->where('status', 'active')
    ->when($isAdmin)
        ->then(fn($q) => $q->where('include_internal', true))
        ->else(fn($q) => $q->where('is_public', true))
    ->get();`,
        },
      },
      {
        headingId: 'atomic-upsert',
        headingTitle: 'Atomic Upserts & SELECT FOR UPDATE',
        content: `Execute platform-aware atomic upserts and transaction row-locking:`,
        codeSnippet: {
          title: 'Upsert & Atomic Locking Example',
          language: 'php',
          code: `// Platform-aware atomic upsert (PostgreSQL/SQLite ON CONFLICT, MySQL ON DUPLICATE KEY):
User::upsert(
    values: ['id' => 1, 'email' => 'user@example.com', 'login_count' => 5],
    uniqueColumns: ['id'],
    updateColumns: ['login_count']
);

// Row lock inside transaction (SELECT FOR UPDATE):
Order::atomic($orderId, function (Order $order): void {
    $order->update(['status' => 'processing']);
});`,
        },
      },
      {
        headingId: 'db-facade',
        headingTitle: 'The DB Static Façade & Transactions',
        content: `For raw SQL queries, transactions, and reporting:`,
        codeSnippet: {
          title: 'DB Façade Example',
          language: 'php',
          code: `use Spinx\\Database\\DB;

DB::transaction(function ($conn): void {
    DB::statement('UPDATE accounts SET balance = balance - 100 WHERE id = :id', ['id' => 1]);
    DB::statement('UPDATE accounts SET balance = balance + 100 WHERE id = :id', ['id' => 2]);
});

$rows = DB::select('SELECT id, name FROM users WHERE active = :a', ['a' => 1]);`,
        },
      },
    ],
  },
  {
    id: 'auth',
    path: '/docs/auth',
    category: 'Backend & Services',
    title: 'Authentication & Session Subsystem',
    subtitle: 'Stateless-safe session management, user providers, and route guard middlewares.',
    description: 'Explore Spinx\'s built-in Auth façade, File and Database session drivers, password hashing, and middleware aliases.',
    readTime: '6 min read',
    lastUpdated: 'Updated v1',
    badge: 'Auth & Security',
    headings: [
      { id: 'session-architecture', title: 'Persistent-Worker Session Architecture', level: 2 },
      { id: 'auth-facade', title: 'The Auth Façade & UserProvider', level: 2 },
      { id: 'password-hashing', title: 'Bcrypt Password Hashing (Hash::make)', level: 2 },
      { id: 'auth-middlewares', title: 'Route Middlewares (auth & guest)', level: 2 },
    ],
    sections: [
      {
        headingId: 'session-architecture',
        headingTitle: 'Persistent-Worker Session Architecture',
        content: `Traditional $_SESSION global variables are dangerous in persistent runtimes (RoadRunner/Swoole) because they leak across requests.

Spinx provides an isolated \`SessionInterface\` hydrated at request start from cookie tokens and persisted at response end. Drivers include \`FileSession\` (JSON files in \`storage/sessions\`) and \`DatabaseSession\` (\`spinx_sessions\` table).`,
      },
      {
        headingId: 'auth-facade',
        headingTitle: 'The Auth Façade & UserProvider',
        content: `Authenticate users cleanly via the static \`Auth\` façade:`,
        codeSnippet: {
          title: 'Auth Controller Example',
          language: 'php',
          code: `use Spinx\\Auth\\Auth;

// Attempt login (regenerates session ID to prevent fixation attacks):
if (Auth::attempt(['email' => $email, 'password' => $password])) {
    $user = Auth::user();
    return new JsonResponse(['user_id' => Auth::id()]);
}

// Check state:
if (Auth::check()) {
    // Authenticated
}

Auth::logout();`,
        },
      },
      {
        headingId: 'password-hashing',
        headingTitle: 'Bcrypt Password Hashing (Hash::make)',
        content: `Predictable 60-character bcrypt hashing:`,
        codeSnippet: {
          title: 'Hash Helper Example',
          language: 'php',
          code: `use Spinx\\Auth\\Hash;

$hash = Hash::make('secret_password', cost: 12);
$isValid = Hash::check('secret_password', $hash);`,
        },
      },
      {
        headingId: 'auth-middlewares',
        headingTitle: 'Route Middlewares (auth & guest)',
        content: `Protect routes with the built-in middleware aliases:`,
        codeSnippet: {
          title: 'Route Auth Middleware',
          language: 'php',
          code: `// Protected route:
Route::get(['dashboard', '/dashboard'])
    ->middleware(['auth'])
    ->controller('dashboard_controller');

// Guest-only route (redirects authenticated users away):
Route::get(['login', '/login'])
    ->middleware(['guest'])
    ->controller('login_controller');`,
        },
      },
    ],
  },
  {
    id: 'validation',
    path: '/docs/validation',
    category: 'Backend & Services',
    title: 'Data Validation Subsystem',
    subtitle: 'Pipe-delimited rule validation with UTF-8 length awareness and allowlist output.',
    description: 'Master Spinx validation rules, custom error messages, nullable handling, and ValidationException formatting.',
    readTime: '5 min read',
    lastUpdated: 'Updated v1',
    badge: 'Validation',
    headings: [
      { id: 'validator-usage', title: 'Basic Validation Usage', level: 2 },
      { id: 'available-rules', title: 'Available Validation Rules', level: 2 },
      { id: 'allowlist-output', title: 'Allowlist Data Return', level: 2 },
      { id: 'custom-messages', title: 'Custom Error Messages & Exception Handling', level: 2 },
    ],
    sections: [
      {
        headingId: 'validator-usage',
        headingTitle: 'Basic Validation Usage',
        content: `Validate incoming input arrays with pipe-delimited rule strings:`,
        codeSnippet: {
          title: 'Validation in Controller',
          language: 'php',
          code: `use Spinx\\Validation\\Validator;

$validated = Validator::make($request->request->all(), [
    'name' => 'required|string|max:100',
    'email' => 'required|email',
    'password' => 'required|min:8|confirmed',
    'tier' => 'required|in:free,pro,enterprise',
    'bio' => 'nullable|string|max:500',
])->validate();`,
        },
      },
      {
        headingId: 'available-rules',
        headingTitle: 'Available Validation Rules',
        content: `Supported validation rules:`,
        tableData: {
          headers: ['Rule', 'Description'],
          rows: [
            ['required', 'Field must exist in the input array and cannot be empty string or null'],
            ['nullable', 'If field is missing or empty, all subsequent validation rules on it are skipped'],
            ['string', 'Value must be a string'],
            ['integer', 'Value must be an integer or integer string'],
            ['numeric', 'Value must be a numeric value (int or float)'],
            ['array', 'Value must be an array'],
            ['email', 'Value must pass filter_var EMAIL validation'],
            ['min:n', 'Strings must have >= n characters (via mb_strlen); numbers must be >= n'],
            ['max:n', 'Strings must have <= n characters (via mb_strlen); numbers must be <= n'],
            ['in:a,b,c', 'Value must match one of the comma-separated options'],
            ['confirmed', 'Value must match {field}_confirmation in the input array'],
          ],
        },
      },
      {
        headingId: 'allowlist-output',
        headingTitle: 'Allowlist Data Return',
        content: `Calling \`validate()\` returns an array containing ONLY the fields declared in your rules map, discarding any undeclared or unexpected payload fields automatically.`,
      },
      {
        headingId: 'custom-messages',
        headingTitle: 'Custom Error Messages & Exception Handling',
        content: `Customize error messages per field and rule:`,
        codeSnippet: {
          title: 'Custom Error Messages',
          language: 'php',
          code: `$validator = Validator::make($data, $rules, [
    'email.required' => 'We need an email address to create your account.',
    'email.email' => 'Please provide a valid corporate email.',
]);

if ($validator->fails()) {
    $errors = $validator->errors(); // ['email' => ['We need an email...']]
}`,
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
      { id: 'dispatching-jobs', title: 'Dispatching Database-Backed Jobs', level: 2 },
      { id: 'task-scheduler', title: 'Task Scheduler & schedule.php', level: 2 },
      { id: 'running-scheduler', title: 'Running the Scheduler (spinx schedule:run)', level: 2 },
      { id: 'worker-isolation', title: 'Worker Process Isolation', level: 2 },
    ],
    sections: [
      {
        headingId: 'dispatching-jobs',
        headingTitle: 'Dispatching Database-Backed Jobs',
        content: `Offload heavy processing to background queue workers:`,
        codeSnippet: {
          title: 'Dispatching Queue Job',
          language: 'php',
          code: `use Spinx\\Queue\\QueueManager;

$queueManager->dispatch(new SendInvoiceEmailJob($invoiceId));`,
        },
      },
      {
        headingId: 'task-scheduler',
        headingTitle: 'Task Scheduler & schedule.php',
        content: `Define scheduled tasks in \`schedule.php\` at the project root using a fluent API:`,
        codeSnippet: {
          title: 'schedule.php Definition',
          language: 'php',
          code: `use Spinx\\Schedule\\Scheduler;

return function (Scheduler $scheduler, $container): void {
    // Run daily at 03:00 AM:
    $scheduler->call(function () use ($container) {
        $container->get(CleanupService::class)->run();
    }, 'daily cleanup')->daily('03:00');

    // Run every 15 minutes:
    $scheduler->call(fn() => checkMetrics(), 'check metrics')->everyMinutes(15);

    // Run every Monday at 08:30:
    $scheduler->call(fn() => sendReports(), 'weekly report')->weekly(1, '08:30');
};`,
        },
      },
      {
        headingId: 'running-scheduler',
        headingTitle: 'Running the Scheduler (spinx schedule:run)',
        content: `A single OS cron entry invoking \`spinx schedule:run\` executes every due task:`,
        codeSnippet: {
          title: 'Crontab Configuration',
          language: 'bash',
          code: `* * * * * cd /path/to/app && php spinx schedule:run >> /dev/null 2>&1`,
        },
      },
      {
        headingId: 'worker-isolation',
        headingTitle: 'Worker Process Isolation',
        content: `Queued jobs execute on dedicated background worker processes (\`spinx queue:work\`) isolated from HTTP request workers. Services resolved inside a job handler go through their own fresh request-scoped container.`,
      },
    ],
  },
  {
    id: 'openapi',
    path: '/docs/openapi',
    category: 'API & Reference',
    title: 'OpenAPI 3.1 Specification Generator',
    subtitle: 'Automatic OpenAPI schema generation from routes and PHP 8 attributes.',
    description: 'Learn how to annotate Spinx controllers with PHP 8 attributes and generate OpenAPI 3.1 JSON schemas automatically.',
    readTime: '4 min read',
    lastUpdated: 'Updated v1',
    badge: 'API & OpenAPI',
    headings: [
      { id: 'openapi-generation', title: 'Generating OpenAPI Schemas (spinx openapi:generate)', level: 2 },
      { id: 'php8-attributes', title: 'PHP 8 OpenAPI Attributes', level: 2 },
      { id: 'controller-example', title: 'Annotated Controller Example', level: 2 },
    ],
    sections: [
      {
        headingId: 'openapi-generation',
        headingTitle: 'Generating OpenAPI Schemas (spinx openapi:generate)',
        content: `Spinx reflects registered routes and controller metadata to build an OpenAPI 3.1 schema:`,
        codeSnippet: {
          title: 'Terminal - Generate OpenAPI Spec',
          language: 'bash',
          code: `spinx openapi:generate --output=public/openapi.json
# Output: [Spinx] OpenAPI specification generated → public/openapi.json`,
        },
      },
      {
        headingId: 'php8-attributes',
        headingTitle: 'PHP 8 OpenAPI Attributes',
        content: `Annotate your controllers with Spinx OpenAPI attributes:
• \`#[ApiSummary('Summary text', 'Optional description')]\`
• \`#[ApiParam(name: 'id', in: 'path', type: 'string', required: true)]\`
• \`#[ApiResponse(status: 200, description: 'Success response')]\`
• \`#[ApiTag('Billing')]\``,
      },
      {
        headingId: 'controller-example',
        headingTitle: 'Annotated Controller Example',
        content: `Controller with OpenAPI attributes:`,
        codeSnippet: {
          title: 'InvoiceShowController.php',
          language: 'php',
          code: `namespace App\\Modules\\Billing\\Infrastructure\\Http\\Controllers;

use Spinx\\OpenApi\\Attributes\\{ApiSummary, ApiParam, ApiResponse, ApiTag};
use Symfony\\Component\\HttpFoundation\\{Request, JsonResponse};

#[ApiTag('Invoices')]
#[ApiSummary('Fetch invoice details by ID')]
#[ApiParam(name: 'id', in: 'path', type: 'integer', description: 'Invoice ID')]
#[ApiResponse(status: 200, description: 'Invoice data returned')]
#[ApiResponse(status: 404, description: 'Invoice not found')]
final class InvoiceShowController
{
    public function __invoke(Request $request, int $id): JsonResponse
    {
        return new JsonResponse(['id' => $id, 'status' => 'paid']);
    }
}`,
        },
      },
    ],
  },
  {
    id: 'templating-islands',
    path: '/docs/templating-islands',
    category: 'Frontend & Islands',
    title: 'Templates & Reactive Island Hydration',
    subtitle: 'Ultra-fast server HTML rendering with selective client-side Vue & React island hydration.',
    description: 'Learn Spinx HTML template directives, client-side island hydration (@island), Vite asset compilation, and mobile device preview tools.',
    readTime: '6 min read',
    lastUpdated: 'Updated v1',
    badge: 'Frontend & Islands',
    headings: [
      { id: 'template-directives', title: 'Spinx Template Directives', level: 2 },
      { id: 'island-hydration', title: 'Client Island Hydration (@island)', level: 2 },
      { id: 'vite-integration', title: 'Vite Asset Pipeline & HMR', level: 2 },
      { id: 'mobile-preview', title: 'Mobile Device Preview Tool (spinx preview --mobile)', level: 2 },
    ],
    sections: [
      {
        headingId: 'template-directives',
        headingTitle: 'Spinx Template Directives',
        content: `Spinx templates compile to high-speed native PHP with familiar directives:
• \`{{ $variable }}\` (HTML-escaped output)
• \`{!! $rawHtml !!}\` (Unescaped output)
• \`@if($condition) ... @endif\`
• \`@foreach($items as $item) ... @endforeach\`
• \`@csrf\` (Hidden CSRF input field)`,
      },
      {
        headingId: 'island-hydration',
        headingTitle: 'Client Island Hydration (@island)',
        content: `Embed reactive Vue 3 or React 19 client components directly in server HTML templates:`,
        codeSnippet: {
          title: 'View Template with Island',
          language: 'html',
          code: `<div class="dashboard-card">
    <h2>Realtime Metrics</h2>
    <p>Server-rendered at {{ date('H:i') }}</p>

    <!-- Client-side reactive island hydrated via Vite -->
    @island('MetricsChart', ['projectId' => $project->id, 'initialData' => $metrics])
</div>`,
        },
      },
      {
        headingId: 'vite-integration',
        headingTitle: 'Vite Asset Pipeline & HMR',
        content: `During development (\`spinx serve\`), Vite provides sub-50ms Hot Module Replacement. In production (\`spinx build\`), Vite compiles static bundles with hashed filenames for immutable caching.`,
      },
      {
        headingId: 'mobile-preview',
        headingTitle: 'Mobile Device Preview Tool (spinx preview --mobile)',
        content: `Launch the interactive browser-based device container to test your responsive views on simulated iPhone and Android viewports:`,
        codeSnippet: {
          title: 'Terminal - Launch Mobile Preview',
          language: 'bash',
          code: `spinx preview --mobile
# Opens interactive device preview container with iPhone 15 Pro, Pixel 7, and Galaxy presets`,
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
    readTime: '5 min read',
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
            ['spinx new <project> [--frontend=vue|react]', 'Scaffold a brand new Spinx project'],
            ['spinx serve', 'Boot backend persistent worker + Vite dev server with HMR'],
            ['spinx driver:swap <roadrunner|swoole>', 'Switch runtime driver in spinx.json'],
            ['spinx make:module <Name>', 'Generate full DDD module skeleton'],
            ['spinx make:controller <Module> <Name>', 'Generate controller in module Infrastructure layer'],
            ['spinx make:entity <Module> <Name>', 'Generate Domain entity'],
            ['spinx make:service <Module> <Name>', 'Generate Application service'],
            ['spinx make:repository <Module> <Name>', 'Generate repository interface & implementation pair'],
            ['spinx make:model <Module> <Name>', 'Generate ORM model in Infrastructure layer'],
            ['spinx make:middleware <Module> <Name>', 'Generate middleware class'],
            ['spinx make:migration <Module> <desc>', 'Generate timestamped database migration'],
            ['spinx make:mail <Module> <Name>', 'Generate Mailable + view + queueable Job'],
            ['spinx migrate [Name]', 'Run pending database migrations'],
            ['spinx queue:work', 'Poll and process database-backed job queue'],
            ['spinx schedule:run', 'Run all due tasks declared in schedule.php'],
            ['spinx schema:compile', 'Introspect database schema and write storage/cache/schema_columns.php'],
            ['spinx openapi:generate', 'Generate OpenAPI 3.1 specification from routes and attributes'],
            ['spinx preview --mobile', 'Open dev server in interactive browser-based mobile preview container'],
            ['spinx preview --android', 'Open dev server on connected Android device/emulator'],
            ['spinx preview --ios', 'Open dev server on iOS Simulator (macOS + Xcode)'],
            ['spinx preview --desktop', 'Open dev server in native desktop webview window'],
            ['spinx build:mobile --android', 'Scaffold native Android shell (Kotlin + WebView) in mobile/android/'],
            ['spinx build:mobile --ios', 'Scaffold native iOS shell (Swift + WKWebView) in mobile/ios/'],
            ['spinx build', 'Production build: compiled frontend assets + primed backend cache'],
          ],
        },
      },
      {
        headingId: 'generator-reference',
        headingTitle: 'Code Generators Reference',
        content: `All code generator commands enforce module boundaries. Generated files are placed strictly within their designated DDD layer inside the target module.`,
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
          title: 'TenantMiddleware.php',
          language: 'php',
          code: `final class TenantMiddleware
{
    public function process(Request $request, \\Closure $next): Response
    {
        $tenantId = $request->headers->get('X-Tenant-ID');
        $request->attributes->set('tenant_id', $tenantId);

        return $next($request);
    }
}`,
        },
      },
      {
        headingId: 'async-stripe-webhooks',
        headingTitle: 'Async Stripe Webhook Handler',
        content: `Offload heavy Stripe webhook events immediately to background workers:`,
        codeSnippet: {
          title: 'StripeWebhookController.php',
          language: 'php',
          code: `public function __invoke(Request $request): JsonResponse
{
    $event = json_decode($request->getContent(), true);

    $this->queueManager->dispatch(new ProcessStripeWebhookJob($event));

    return new JsonResponse(['status' => 'queued'], 200);
}`,
        },
      },
    ],
  },
];
