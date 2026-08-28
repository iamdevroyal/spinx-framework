export interface DocHeading {
  id: string;
  title: string;
  level: number;
}

export interface DocArticle {
  id: string;
  path: string;
  category: 'Getting Started' | 'AI Builder' | 'Core Concepts' | 'Backend & Services' | 'Async & Real-Time' | 'Security' | 'Frontend & Islands' | 'API & Reference' | 'Guides & Examples';
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
  'AI Builder',
  'Core Concepts',
  'Backend & Services',
  'Async & Real-Time',
  'Security',
  'Frontend & Islands',
  'API & Reference',
  'Guides & Examples',
] as const;

export const DOCS_DATA: DocArticle[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1a. Quickstart & Installation
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'quickstart',
    path: '/docs/quickstart',
    category: 'Getting Started',
    title: 'Quickstart & Installation',
    subtitle: 'Get up and running with Spinx in seconds using the official global installer or Composer.',
    description: 'Learn how to install the official spinxphp/installer global binary, scaffold a new application with Vue 3 or React 19, and launch the RoadRunner persistent execution server.',
    readTime: '4 min read',
    lastUpdated: 'v1.0.17 (Latest)',
    badge: 'Quickstart',
    headings: [
      { id: 'global-installer', title: 'Recommended: Global Installer', level: 2 },
      { id: 'cli-options', title: 'CLI Flags & Presets', level: 2 },
      { id: 'direct-composer', title: 'Alternative: Direct Composer Install', level: 2 },
      { id: 'local-commands', title: 'Local Development & Serving', level: 2 },
      { id: 'system-requirements', title: 'System Requirements', level: 2 },
    ],
    sections: [
      {
        headingId: 'global-installer',
        headingTitle: 'Recommended: Global Installer',
        content: `The fastest and cleanest way to create new Spinx applications is with the official global installer package. Install it once via Composer:

\`\`\`bash
composer global require spinxphp/installer
\`\`\`

Make sure your Composer global bin directory is in your PATH. Once installed, you can create a brand new application from anywhere:

\`\`\`bash
spinx new my-app
\`\`\`

Composer will automatically trigger Spinx's interactive setup wizard, configuring your application name, frontend framework, database driver (SQLite, MySQL, PostgreSQL), and runtime worker (RoadRunner or Swoole).`,
        codeSnippet: {
          title: 'Terminal — Global Installation',
          language: 'bash',
          code: `# 1. Install global installer
composer global require spinxphp/installer

# 2. Scaffold new application
spinx new my-app

# 3. Start development
cd my-app
php spinx serve`,
        },
        callout: {
          type: 'tip',
          title: 'Zero Boot Overhead',
          message: 'RoadRunner downloads automatically via vendor/bin/rr get during setup. When you run php spinx serve, the Go supervisor and Vite HMR dev server boot concurrently.',
        },
      },
      {
        headingId: 'cli-options',
        headingTitle: 'CLI Flags & Presets',
        content: `Customize your new application during scaffolding using CLI options:`,
        tableData: {
          headers: ['Command', 'Description'],
          rows: [
            ['spinx new my-app --frontend=vue', 'Scaffold with Vue 3 + Vite (default)'],
            ['spinx new my-app --frontend=react', 'Scaffold with React 19 + Vite'],
            ['spinx new my-app --frontend=none', 'API-only mode (no frontend assets)'],
            ['spinx new my-app --version=1.0.0', 'Install specific framework version'],
            ['spinx new my-app --frontend=vue -n', 'Non-interactive headless mode (CI/CD)'],
          ],
        },
      },
      {
        headingId: 'direct-composer',
        headingTitle: 'Alternative: Direct Composer Install',
        content: `If you prefer not to install global binaries, you can create a new project directly with Composer:

\`\`\`bash
composer create-project spinxphp/framework my-app
cd my-app
php spinx serve
\`\`\`

The exact same interactive setup wizard will execute via the framework's post-create-project hook.`,
      },
      {
        headingId: 'local-commands',
        headingTitle: 'Local Development & Serving',
        content: `Inside your project directory, all commands are managed by the local Spinx CLI:`,
        codeSnippet: {
          title: 'Core Development Commands',
          language: 'bash',
          code: `# Start RoadRunner + Vite HMR
php spinx serve

# Scaffold DDD module with all layers
php spinx make:module Orders --all

# Run database migrations
php spinx migrate

# Start priority queue worker daemon
php spinx queue:work

# Autonomous AI feature build
php spinx ai:build "Build a subscription billing module"`,
        },
      },
      {
        headingId: 'system-requirements',
        headingTitle: 'System Requirements',
        content: `Spinx is designed for modern, high-performance execution environments:`,
        tableData: {
          headers: ['Requirement', 'Minimum Version', 'Notes'],
          rows: [
            ['PHP', '>= 8.2', 'Uses typed properties, enums, and fibers'],
            ['Composer', '>= 2.0', 'Package management'],
            ['Extensions', 'mbstring, pdo, json', 'pdo_sqlite (default), pdo_mysql, pdo_pgsql'],
            ['Node.js', '>= 18.0', 'Required for Vite frontend asset pipeline'],
            ['RoadRunner', 'Latest', 'Auto-downloaded via vendor/bin/rr get'],
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 1b. Introduction
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'introduction',
    path: '/docs/introduction',
    category: 'Getting Started',
    title: 'Introduction to Spinx Framework',
    subtitle: 'The modern PHP engine for persistent workers, enforced DDD architecture, and reactive island hydration.',
    description: 'Spinx is a next-generation full-stack PHP framework engineered for extreme performance, clean domain-driven architecture, and autonomous AI-assisted development.',
    readTime: '5 min read',
    lastUpdated: 'v1.0.17 (Latest)',
    badge: 'Core Reference',
    headings: [
      { id: 'overview', title: 'Framework Overview', level: 2 },
      { id: 'core-pillars', title: 'Core Architecture Pillars', level: 2 },
      { id: 'scope-guarantees', title: 'Scope & Architecture Guarantees', level: 2 },
      { id: 'positioning-matrix', title: 'Comparison & Positioning Matrix', level: 2 },
    ],
    sections: [
      {
        headingId: 'overview',
        headingTitle: 'Framework Overview',
        content: `Spinx is a modern PHP framework for applications that demand near-Node.js performance, zero-friction cross-platform installation, and an enforced Domain-Driven Design (DDD) architecture from the first command run.

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
    "Auth": true,
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
        content: `Spinx is built on six technical pillars designed for long-term project maintainability and extreme throughput:

1. Speed: Persistent-process runtime (RoadRunner default, Swoole opt-in) with no per-request bootstrap cost.
2. AI-Native Autonomy: Inbuilt AI Builder powered by Anthropic Claude Sonnet 4.6 that understands Spinx core architecture, orchestrating multi-agent project scaffolding via CLI and Web UI.
3. Enforced DDD Architecture: Domain entities, repository interfaces, application services, and infrastructure are strictly isolated per module.
4. Multi-Action Controllers & Facades: Group related routes in clean multi-action controllers using Request, Response, JsonResponse, and View facades.
5. Session-Backed Security: Integrated stateful sessions, session-backed CSRF protection with token rotation, and auth guards.
6. Reactive Island Hydration: Server-rendered HTML templates with targeted client-side hydration islands (@island) for Vue 3 and React 19.`,
      },
      {
        headingId: 'scope-guarantees',
        headingTitle: 'Scope & Architecture Guarantees',
        content: `Spinx provides an integrated suite of framework subsystems designed for long-running runtimes:

• Persistent Runtime Isolation: Single-boot kernel with RequestScope container tracking to eliminate memory leaks across requests.
• DBAL-Based Active Record: Eloquent-shaped ergonomics with pre-compiled schema column caching, upsert support, and row locking.
• Caching Subsystem: File, Array, and Redis cache drivers with Cache facade and global cache() helper.
• Robust Validation: 40+ validation rules with Validate facade and Request::validate().
• In-Framework Scheduler & Queue: Database-backed jobs and cron expressions declared fluently in schedule.php.`,
      },
      {
        headingId: 'positioning-matrix',
        headingTitle: 'Comparison & Positioning Matrix',
        content: `How Spinx compares against established PHP framework alternatives:`,
        tableData: {
          headers: ['Feature', 'Spinx (v1.0.16)', 'Laravel (Octane / FPM)', 'Symfony'],
          rows: [
            ['Runtime Architecture', 'Persistent RoadRunner / Swoole default', 'PHP-FPM default (Octane add-on)', 'PHP-FPM default'],
            ['Architecture Enforcement', 'Strict DDD enforced by Kernel', 'Freeform MVC convention', 'Flexible bundles / directories'],
            ['AI Builder', 'Inbuilt Multi-Agent Claude Sonnet 4.6', 'None (Third-party plugins)', 'None'],
            ['Controller Paradigm', 'Multi-Action & Facades (Request, Response, View)', 'Controllers & FormRequests', 'Action Controllers'],
            ['Frontend Hydration', 'Zero-build HTML + Vue/React @island', 'Blade + Inertia / Livewire', 'Twig + Stimulus / UX'],
            ['CSRF & Sessions', 'Session-backed with cookie sync', 'Session-backed', 'Session-backed'],
            ['Column Cache', 'Pre-compiled DBAL schema (0ms queries)', 'Dynamic reflection queries', 'ORM Metadata cache'],
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Inbuilt AI Framework Builder
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-builder',
    path: '/docs/ai-builder',
    category: 'AI Builder',
    title: 'Inbuilt AI Framework Builder',
    subtitle: 'Autonomous multi-agent development powered by Anthropic Claude Sonnet 4.6 directly inside your local environment.',
    description: 'Spinx features an inbuilt AI Builder that maps directly to the framework core. Using specialized agents and persistent continuity memory, it scaffolds and refactors modules in strict DDD compliance.',
    readTime: '7 min read',
    lastUpdated: 'v1.0.16 (New Feature)',
    badge: 'AI Native',
    headings: [
      { id: 'ai-overview', title: 'How Spinx AI Builder Works', level: 2 },
      { id: 'agent-hierarchy', title: 'Specialized Multi-Agent Core', level: 2 },
      { id: 'continuity-tracker', title: 'Continuity Tracker & Context Memory', level: 2 },
      { id: 'cli-and-web-ui', title: 'CLI & Local Web UI Workflows', level: 2 },
      { id: 'configuration', title: 'Configuration & Claude API Key', level: 2 },
    ],
    sections: [
      {
        headingId: 'ai-overview',
        headingTitle: 'How Spinx AI Builder Works',
        content: `Unlike external AI coding chat tools that generate generic PHP or struggle with framework architecture conventions, Spinx AI Builder is built directly into the kernel. It possesses full structural knowledge of Spinx modules, DDD boundaries, DBAL migrations, routing DSL, facades, and runtime lifecycles.

Developers can issue prompts via CLI (spinx ai:chat) or the local Web Dashboard (/_spinx/ai) to build complete features end-to-end.`,
        codeSnippet: {
          title: 'Terminal AI One-Shot Build',
          language: 'bash',
          code: `# Build an entire production-grade billing module with Stripe webhooks:
php spinx ai:build "Create a Billing module with Customer entity, Subscription plan repository, Stripe webhook handler, and checkout views"`,
        },
      },
      {
        headingId: 'agent-hierarchy',
        headingTitle: 'Specialized Multi-Agent Core',
        content: `Spinx AI Builder uses an Orchestrator Agent that analyzes requirements and delegates to domain-specialized subagents:

• Orchestrator Agent: Supervises project plans, tool executions, and step-by-step verification.
• Architect Agent: Formulates DDD domain models, entity invariants, and repository contracts.
• Database Agent: Writes migrations (Blueprint), DBAL schema, ORM models, and seeders.
• Routing Agent: Generates multi-action controllers, Request::validate() rules, and responses.
• Frontend Agent: Crafts .spinx.html templates, reactive islands, and CSS styling.
• Security Agent: Wires session-backed CSRF, auth middleware, and rate limits.
• DevOps Agent: Optimizes RoadRunner/Swoole configs, caching stores, queues, and crons.`,
        callout: {
          type: 'tip',
          title: 'Strict DDD Enforced by AI',
          message: 'The AI Builder will never place business logic in controllers or database calls in domain entities. It is strictly programmed with Spinx architecture rules.',
        },
      },
      {
        headingId: 'continuity-tracker',
        headingTitle: 'Continuity Tracker & Context Memory',
        content: `Spinx maintains persistent project context in .spinx/ai/continuity.json. Every module, migration, implemented feature, and architectural decision is remembered across sessions:

• Project Memory: Tracks high-level goals and completed milestones.
• Schema State: Understands all active database tables and column types.
• Dependency Graph: Knows all registered module services and aliases.`,
        codeSnippet: {
          title: '.spinx/ai/continuity.json - Context Snapshot',
          language: 'json',
          code: `{
  "project": "E-Commerce Platform",
  "modules": ["Auth", "Catalog", "Cart", "Checkout"],
  "database": {
    "tables": ["users", "products", "orders", "order_items"]
  },
  "decisions": [
    "Used Argon2id for password hashing in AuthService",
    "Cart items stored in Redis cache store with 7-day TTL"
  ]
}`,
        },
      },
      {
        headingId: 'cli-and-web-ui',
        headingTitle: 'CLI & Local Web UI Workflows',
        content: `Spinx provides dual interactive interfaces for AI development:

1. CLI Interactive Chat:
   Run 'php spinx ai:chat' to open a conversational terminal interface with colored agent logs and interactive diff confirmations.

2. Local Web Builder UI:
   Navigate to 'http://localhost:8080/_spinx/ai' or run 'php spinx ai:ui' to open the glassmorphism AI development studio with real-time streaming, visual diff reviews, and one-click file generation.`,
      },
      {
        headingId: 'configuration',
        headingTitle: 'Configuration & Claude API Key',
        content: `Configure your Anthropic Claude API key in .env or config/ai.php:`,
        codeSnippet: {
          title: 'config/ai.php',
          language: 'php',
          code: `return [
    'default' => 'anthropic',
    'providers' => [
        'anthropic' => [
            'api_key' => env('ANTHROPIC_API_KEY'),
            'model'   => env('ANTHROPIC_MODEL', 'claude-sonnet-4-6'),
            'max_tokens' => 8192,
        ],
    ],
];`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Strict Domain-Driven Design (DDD)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'strict-ddd',
    path: '/docs/architecture',
    category: 'Core Concepts',
    title: 'Strict Domain-Driven Design (DDD)',
    subtitle: 'Enforced modular boundaries isolating Domain, Application, and Infrastructure layers.',
    description: 'Every Spinx module strictly segregates domain business logic, application orchestration, and infrastructure persistence.',
    readTime: '6 min read',
    lastUpdated: 'v1.0.16',
    badge: 'Core Pattern',
    headings: [
      { id: 'ddd-layers', title: 'The Three DDD Layers', level: 2 },
      { id: 'domain-layer', title: 'Domain: Entities & Repositories', level: 2 },
      { id: 'application-layer', title: 'Application: Services & Use Cases', level: 2 },
      { id: 'infrastructure-layer', title: 'Infrastructure: Controllers & Models', level: 2 },
      { id: 'module-registration', title: 'Module Wiring in module.php', level: 2 },
    ],
    sections: [
      {
        headingId: 'ddd-layers',
        headingTitle: 'The Three DDD Layers',
        content: `In Spinx, code is organized inside self-contained modules located under app/Modules/<Name>/. Each module adheres to strict DDD boundaries:

\`\`\`
app/Modules/Auth/
├── Domain/
│   ├── Entities/User.php               ← Pure Domain Entity (business invariants)
│   └── Repositories/UserRepositoryInterface.php ← Domain Repository Contract
├── Application/
│   └── Services/AuthService.php        ← Application Service (orchestrates logic)
├── Infrastructure/
│   ├── Http/
│   │   ├── Controllers/AuthController.php ← Thin Controller (validation & responses)
│   │   └── Views/login.spinx.html      ← View Templates
│   ├── Persistence/
│   │   ├── Migrations/                 ← Database Migrations
│   │   └── Models/User.php             ← DBAL Active Record Model
│   └── Repositories/UserRepository.php ← Implements UserRepositoryInterface
└── module.php                          ← Dependency Injection & Route bindings
\`\`\``,
      },
      {
        headingId: 'domain-layer',
        headingTitle: 'Domain: Entities & Repositories',
        content: `The Domain layer contains pure business objects and contracts with zero framework or database dependencies:`,
        codeSnippet: {
          title: 'app/Modules/Auth/Domain/Entities/User.php',
          language: 'php',
          code: `namespace App\\Modules\\Auth\\Domain\\Entities;

final class User
{
    public function __construct(
        public readonly ?int $id,
        public readonly string $name,
        public readonly string $email,
        public readonly ?string $createdAt = null,
    ) {}

    public function withName(string $name): self
    {
        return new self($this->id, trim($name), $this->email, $this->createdAt);
    }
}`,
        },
      },
      {
        headingId: 'application-layer',
        headingTitle: 'Application: Services & Use Cases',
        content: `The Application layer coordinates business operations, password hashing, and domain entities:`,
        codeSnippet: {
          title: 'app/Modules/Auth/Application/Services/AuthService.php',
          language: 'php',
          code: `namespace App\\Modules\\Auth\\Application\\Services;

use App\\Modules\\Auth\\Domain\\Entities\\User;
use App\\Modules\\Auth\\Domain\\Repositories\\UserRepositoryInterface;
use Spinx\\Auth\\Auth;
use Spinx\\Auth\\Hash;

final class AuthService
{
    public function __construct(
        private readonly UserRepositoryInterface $userRepository,
    ) {}

    public function register(string $name, string $email, string $password): User
    {
        if ($this->userRepository->findByEmail($email) !== null) {
            throw new \\InvalidArgumentException('An account with this email already exists.');
        }

        $hashedPassword = Hash::make($password);
        $user = $this->userRepository->create($name, $email, $hashedPassword);
        Auth::loginById((int) $user->id);

        return $user;
    }
}`,
        },
      },
      {
        headingId: 'infrastructure-layer',
        headingTitle: 'Infrastructure: Controllers & Models',
        content: `The Infrastructure layer handles HTTP requests, validation, and database queries:`,
        codeSnippet: {
          title: 'app/Modules/Auth/Infrastructure/Http/Controllers/AuthController.php',
          language: 'php',
          code: `namespace App\\Modules\\Auth\\Infrastructure\\Http\\Controllers;

use App\\Modules\\Auth\\Application\\Services\\AuthService;
use Spinx\\Http\\Request;
use Spinx\\Http\\Response;

final class AuthController
{
    public function __construct(
        private readonly AuthService $authService,
    ) {}

    public function login(): Response
    {
        $data = Request::validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if ($this->authService->login($data['email'], $data['password'])) {
            return redirect('/dashboard');
        }

        return view('Auth::login', ['error' => 'Invalid credentials.'], 401);
    }
}`,
        },
      },
      {
        headingId: 'module-registration',
        headingTitle: 'Module Wiring in module.php',
        content: `Each module exposes a module.php definition file binding interfaces to implementations and declaring routes:`,
        codeSnippet: {
          title: 'app/Modules/Auth/module.php',
          language: 'php',
          code: `return [
    'services' => static function (ContainerBuilder $c, string $moduleDir): void {
        $c->register(UserRepository::class)->setAutowired(true)->setPublic(true);
        $c->setAlias(UserRepositoryInterface::class, UserRepository::class)->setPublic(true);
        $c->register(AuthService::class)->setAutowired(true)->setPublic(true);
        $c->register(AuthController::class)->setAutowired(true)->setPublic(true);
    },
    'controllers' => static function (AliasRegistry $r): void {
        $r->registerController('auth', AuthController::class);
    },
    'routes' => static function (RouteBuilder $routes): void {
        Route::get(['auth.login', '/login'])->controller('auth@showLogin');
        Route::post(['auth.login.submit', '/login'])->controller('auth@login');
        Route::post(['auth.logout', '/logout'])->controller('auth@logout');
    },
];`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Multi-Action Routing & Facades
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'routing-controllers-facades',
    path: '/docs/routing-and-controllers',
    category: 'Backend & Services',
    title: 'Multi-Action Routing & Facades',
    subtitle: 'Group related actions in unified controllers with Request, Response, JsonResponse, and View facades.',
    description: 'Spinx supports multi-action controllers with zero Symfony boilerplate, offering intuitive facades for requests, responses, and template rendering.',
    readTime: '6 min read',
    lastUpdated: 'v1.0.16',
    badge: 'Developer Experience',
    headings: [
      { id: 'multi-action', title: 'Multi-Action Controller Syntax', level: 2 },
      { id: 'request-facade', title: 'Request Facade & Helpers', level: 2 },
      { id: 'response-facade', title: 'Response & JsonResponse Hierarchy', level: 2 },
      { id: 'view-facade', title: 'View Facade & view() Helper', level: 2 },
    ],
    sections: [
      {
        headingId: 'multi-action',
        headingTitle: 'Multi-Action Controller Syntax',
        content: `Instead of maintaining dozens of single-action invokable classes, Spinx lets you group related actions in a single controller using 'alias@method' or '[Controller::class, "method"]':`,
        codeSnippet: {
          title: 'Fluent Multi-Action Routing',
          language: 'php',
          code: `Route::get(['todos.index', '/todos'])->controller('todo@index');
Route::post(['todos.create', '/todos'])->controller('todo@store');
Route::post(['todos.toggle', '/todos/{id}/toggle'])->controller('todo@toggle');`,
        },
      },
      {
        headingId: 'request-facade',
        headingTitle: 'Request Facade & Helpers',
        content: `Access HTTP input, headers, client IP, and validate payloads statically:`,
        codeSnippet: {
          title: 'Spinx\\Http\\Request Usage',
          language: 'php',
          code: `use Spinx\\Http\\Request;

// Extract inputs
$email = Request::input('email', 'default@example.com');
$all = Request::all();
$only = Request::only(['name', 'email']);
$ip = Request::ip();
$isAjax = Request::ajax();

// Inline Validation (throws ValidationException on failure)
$validated = Request::validate([
    'title' => 'required|string|min:3|max:255',
    'status' => 'required|in:draft,published',
]);

// Helper function
$title = request('title');`,
        },
      },
      {
        headingId: 'response-facade',
        headingTitle: 'Response & JsonResponse Hierarchy',
        content: `Spinx\\Http\\Response extends Symfony's base response, serving as both the static factory and concrete return type:`,
        codeSnippet: {
          title: 'API & HTML Responses',
          language: 'php',
          code: `use Spinx\\Http\\Response;
use Spinx\\Http\\JsonResponse;

// JSON API Response
return Response::json(['users' => $users], 200);

// Shorthand Envelopes
return Response::jsonSuccess(['id' => 101]);
return Response::jsonError('Record not found', 404);

// Status Code Shorthands
return JsonResponse::validationError($errors); // 422
return JsonResponse::unauthorized();           // 401
return JsonResponse::forbidden();              // 403

// Redirects & HTML
return Response::redirect('/dashboard');
return redirect('/dashboard');
return Response::html('<h1>Hello World</h1>');`,
        },
      },
      {
        headingId: 'view-facade',
        headingTitle: 'View Facade & view() Helper',
        content: `Render templates returning full Response objects with one line:`,
        codeSnippet: {
          title: 'Rendering Views',
          language: 'php',
          code: `// Directly returns Spinx\\Http\\Response (status 200 default)
return view('Auth::login', [
    'title' => 'Sign In',
    'errors' => [],
]);

// Raw HTML string via View facade:
$html = \\Spinx\\Templating\\View::make('welcome', ['version' => '1.0.16']);`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Validation Subsystem
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'validation-subsystem',
    path: '/docs/validation',
    category: 'Backend & Services',
    title: 'Validation Subsystem',
    subtitle: 'Over 40 production-ready validation rules with Validate facade and Request::validate().',
    description: 'A comprehensive, zero-dependency validation engine supporting type, presence, format, size, date, and content rules.',
    readTime: '5 min read',
    lastUpdated: 'v1.0.16',
    badge: 'Subsystems',
    headings: [
      { id: 'validation-usage', title: 'Validation Usage', level: 2 },
      { id: 'available-rules', title: 'Available Rules (40+)', level: 2 },
      { id: 'safe-and-exceptions', title: 'Safe Data & ValidationException', level: 2 },
    ],
    sections: [
      {
        headingId: 'validation-usage',
        headingTitle: 'Validation Usage',
        content: `Validate user input with pipe-delimited rule strings:`,
        codeSnippet: {
          title: 'Validation Approaches',
          language: 'php',
          code: `use Spinx\\Http\\Request;
use Spinx\\Validation\\Validate;
use Spinx\\Validation\\Validator;

// 1. Via Request facade:
$data = Request::validate([
    'email'    => 'required|email|max:255',
    'password' => 'required|string|min:8|confirmed',
]);

// 2. Via Validate facade:
$data = Validate::check($input, [
    'sku'   => 'required|alpha_dash|size:8',
    'price' => 'required|numeric|gt:0',
]);

// 3. Conditional / safe check without throwing:
$validator = Validator::make($input, ['age' => 'required|integer|between:18,120']);
if ($validator->fails()) {
    $errors = $validator->errors();
} else {
    $data = $validator->safe();
}`,
        },
      },
      {
        headingId: 'available-rules',
        headingTitle: 'Available Rules (40+)',
        content: `Spinx includes built-in rules for every web and API scenario:`,
        tableData: {
          headers: ['Category', 'Rules'],
          rows: [
            ['Presence', 'required, nullable, accepted, declined, prohibited'],
            ['Types', 'string, integer/int, numeric, float/decimal, boolean/bool, array, json'],
            ['Format', 'email, url, ip, ipv4, ipv6, uuid, phone, alpha, alpha_num, alpha_dash, alpha_spaces, lowercase, uppercase'],
            ['Size & Range', 'min:N, max:N, size:N, between:min,max, gt:N, lt:N, gte:N, lte:N, digits:N, digits_between:min,max, min_words:N, max_words:N'],
            ['Dates', 'date, date_format:format, before:date, after:date'],
            ['Content', 'in:a,b,c, not_in:a,b,c, confirmed, same:field, different:field, starts_with:prefix, ends_with:suffix, contains:str, regex:pattern, not_regex:pattern'],
          ],
        },
      },
      {
        headingId: 'safe-and-exceptions',
        headingTitle: 'Safe Data & ValidationException',
        content: `When validation fails, ValidationException carries structured error messages matching Laravel's familiar shape:`,
        codeSnippet: {
          title: 'Handling Validation Exceptions',
          language: 'php',
          code: `try {
    $data = Request::validate(['email' => 'required|email']);
} catch (\\Spinx\\Validation\\ValidationException $e) {
    // $e->errors() returns: ['email' => ['The email field must be a valid email address.']]
    return view('Auth::register', ['errors' => $e->errors()], 422);
}`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Security & Session CSRF
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'security-session-csrf',
    path: '/docs/security',
    category: 'Backend & Services',
    title: 'Security & Session-Backed CSRF',
    subtitle: 'Stateful sessions, token rotation, automatic cookie sync, and authentication guards.',
    description: 'Spinx protects your persistent-process application with session-backed CSRF tokens, secure cookie synchronization, and auth middleware.',
    readTime: '5 min read',
    lastUpdated: 'v1.0.16',
    badge: 'Security',
    headings: [
      { id: 'session-csrf', title: 'Session-Backed CSRF', level: 2 },
      { id: 'csrf-middleware', title: 'CsrfMiddleware & @csrf Directive', level: 2 },
      { id: 'auth-guards', title: 'Auth & Guest Middleware Guards', level: 2 },
    ],
    sections: [
      {
        headingId: 'session-csrf',
        headingTitle: 'Session-Backed CSRF',
        content: `Spinx CSRF tokens are securely stored in the active SessionInterface session (_token). On state-changing requests (POST, PUT, PATCH, DELETE), CsrfMiddleware verifies submitted tokens against the session token.

For frontend SPA and JavaScript fetch/axios clients, CsrfMiddleware automatically synchronizes the active token to a readable XSRF-TOKEN cookie.`,
      },
      {
        headingId: 'csrf-middleware',
        headingTitle: 'CsrfMiddleware & @csrf Directive',
        content: `Include @csrf in any Spinx template form to output the hidden input field:`,
        codeSnippet: {
          title: 'Template Form with @csrf',
          language: 'html',
          code: `<form method="POST" action="/login">
    @csrf
    <input type="email" name="email" required />
    <input type="password" name="password" required />
    <button type="submit">Sign In</button>
</form>`,
        },
      },
      {
        headingId: 'auth-guards',
        headingTitle: 'Auth & Guest Middleware Guards',
        content: `Protect routes with session guards declared in module.php:`,
        codeSnippet: {
          title: 'Guarding Routes',
          language: 'php',
          code: `// Protected user dashboard (redirects guests to /login)
Route::get(['auth.dashboard', '/dashboard'])
    ->middleware(['auth', 'csrf'])
    ->controller('auth@dashboard');

// Guest only (redirects authenticated users to /dashboard)
Route::get(['auth.login', '/login'])
    ->middleware(['guest', 'csrf'])
    ->controller('auth@showLogin');`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. Caching Subsystem
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'caching-subsystem',
    path: '/docs/caching',
    category: 'Backend & Services',
    title: 'Caching Subsystem',
    subtitle: 'High-performance cache layer supporting File, Array, and Redis drivers.',
    description: 'Fast data caching with Cache facade, cache() helper function, atomic file writes, and CLI optimization commands.',
    readTime: '5 min read',
    lastUpdated: 'v1.0.16 (New Subsystem)',
    badge: 'Performance',
    headings: [
      { id: 'cache-overview', title: 'Cache Drivers & Configuration', level: 2 },
      { id: 'cache-facade', title: 'Cache Facade & cache() Helper', level: 2 },
      { id: 'cli-cache-commands', title: 'CLI Cache Management', level: 2 },
    ],
    sections: [
      {
        headingId: 'cache-overview',
        headingTitle: 'Cache Drivers & Configuration',
        content: `Spinx includes a dedicated caching subsystem configured via config/cache.php:

• File: Atomic file storage in storage/cache/data/ with expiration timestamps (Default).
• Array: In-memory store for unit testing.
• Redis: High-throughput distributed caching store for clusters.`,
        codeSnippet: {
          title: 'config/cache.php',
          language: 'php',
          code: `return [
    'default' => env('CACHE_DRIVER', 'file'),
    'stores' => [
        'file' => [
            'driver' => 'file',
            'path'   => storage_path('cache/data'),
        ],
        'redis' => [
            'driver' => 'redis',
            'host'   => env('REDIS_HOST', '127.0.0.1'),
            'port'   => (int) env('REDIS_PORT', 6379),
        ],
    ],
];`,
        },
      },
      {
        headingId: 'cache-facade',
        headingTitle: 'Cache Facade & cache() Helper',
        content: `Store, retrieve, and compute cache values with seamless ergonomics:`,
        codeSnippet: {
          title: 'Cache Operations',
          language: 'php',
          code: `use Spinx\\Cache\\Cache;

// Store for 1 hour (3600 seconds)
Cache::put('dashboard:stats', $stats, 3600);

// Retrieve with fallback default
$stats = Cache::get('dashboard:stats', []);

// Remember: fetch from cache or compute and store
$user = Cache::remember('user:1', 600, fn() => User::find(1));

// Remove or clear
Cache::forget('dashboard:stats');
Cache::flush();

// Helper function
cache(['featured_ids' => [1, 2, 3]], 300);
$ids = cache('featured_ids');`,
        },
      },
      {
        headingId: 'cli-cache-commands',
        headingTitle: 'CLI Cache Management',
        content: `Manage application and framework caches with CLI commands:

• spinx cache:clear: Clears application data cache (storage/cache/data/).
• spinx cache:forget <key>: Removes a specific key from cache.
• spinx view:clear: Clears compiled Blade template cache.
• spinx container:clear: Clears compiled DI container.
• spinx schema:clear: Clears compiled DBAL schema cache.
• spinx optimize:clear: Clears all caches simultaneously.
• spinx optimize: Pre-compiles DI container, DBAL schema columns, and warms production cache.`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. CLI Reference
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cli-reference',
    path: '/docs/cli-reference',
    category: 'API & Reference',
    title: 'Spinx CLI Reference',
    subtitle: 'Complete guide to all built-in commands for scaffolding, migrations, caching, AI, and previewers.',
    description: 'Full reference of all CLI commands available in the spinx binary.',
    readTime: '4 min read',
    lastUpdated: 'v1.0.16',
    badge: 'CLI Tooling',
    headings: [
      { id: 'dev-and-runtime', title: 'Development & Runtime', level: 2 },
      { id: 'ai-commands', title: 'AI Builder Commands', level: 2 },
      { id: 'cache-and-optimize', title: 'Cache & Optimization Commands', level: 2 },
      { id: 'generators-and-migrations', title: 'Generators & Database', level: 2 },
    ],
    sections: [
      {
        headingId: 'dev-and-runtime',
        headingTitle: 'Development & Runtime',
        content: `Core runtime commands:`,
        tableData: {
          headers: ['Command', 'Description'],
          rows: [
            ['spinx new <project>', 'Scaffold a brand new Spinx project with Vue or React.'],
            ['spinx serve', 'Boot persistent server (RoadRunner/Swoole) + Vite dev server.'],
            ['spinx driver:swap <driver>', 'Switch runtime driver between roadrunner and swoole.'],
            ['spinx preview --mobile', 'Open dev server in responsive mobile device preview.'],
            ['spinx preview --desktop', 'Open dev server in native desktop webview window.'],
            ['spinx logs [--lines=N]', 'View recent application logs with colored trace formatting.'],
            ['spinx log:clear', 'Clear all log files in storage/logs/.'],
          ],
        },
      },
      {
        headingId: 'ai-commands',
        headingTitle: 'AI Builder Commands',
        content: `Autonomous AI development commands:`,
        tableData: {
          headers: ['Command', 'Description'],
          rows: [
            ['spinx ai:chat', 'Launch conversational AI terminal interface with Claude Sonnet 4.6.'],
            ['spinx ai:build "<prompt>"', 'Autonomous one-shot module and feature generator.'],
            ['spinx ai:ui', 'Launch the local AI Builder Web Dashboard at http://localhost:8080/_spinx/ai.'],
          ],
        },
      },
      {
        headingId: 'cache-and-optimize',
        headingTitle: 'Cache & Optimization Commands',
        content: `Performance and cache maintenance commands:`,
        tableData: {
          headers: ['Command', 'Description'],
          rows: [
            ['spinx optimize', 'Pre-compile DI container, DBAL schema cache, and warm production cache.'],
            ['spinx optimize:clear', 'Clear all cached bootstrap files, schema, views, and application data.'],
            ['spinx cache:clear', 'Clear application data cache (storage/cache/data/).'],
            ['spinx cache:forget <key>', 'Remove a specific key from application data cache.'],
            ['spinx view:clear', 'Clear compiled Blade view templates (storage/cache/views/).'],
            ['spinx container:clear', 'Clear compiled DI container cache (storage/cache/container.php*).'],
            ['spinx schema:clear', 'Clear compiled DBAL schema cache (storage/cache/schema_columns.php).'],
          ],
        },
      },
      {
        headingId: 'generators-and-migrations',
        headingTitle: 'Generators & Database',
        content: `Scaffolding and database commands:`,
        tableData: {
          headers: ['Command', 'Description'],
          rows: [
            ['spinx make:module <Name> [--all]', 'Scaffold a DDD module directory with domain/app/infra.'],
            ['spinx make:controller <Mod> <Name>', 'Generate a multi-action controller in module.'],
            ['spinx make:entity <Mod> <Name>', 'Generate a pure Domain entity.'],
            ['spinx make:service <Mod> <Name>', 'Generate an Application service.'],
            ['spinx make:repository <Mod> <Name>', 'Generate a repository interface + implementation pair.'],
            ['spinx make:migration <Mod> <desc>', 'Generate a timestamp-prefixed migration file.'],
            ['spinx migrate [Name]', 'Run pending database migrations.'],
            ['spinx schema:compile', 'Introspect database schema and write storage/cache/schema_columns.php.'],
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // NEW: Asynchronous Queues & Worker Daemons
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'queues',
    path: '/docs/queues',
    category: 'Async & Real-Time',
    title: 'Asynchronous Queues & Worker Daemons',
    subtitle: 'Priority background job processing with HMAC cryptographic signing and RCE defense.',
    description: 'Process heavy workloads asynchronously with Spinx universal queue system — supporting Database, Redis, and Sync drivers with priority ordering, delayed dispatch, and retry backoffs.',
    readTime: '6 min read',
    lastUpdated: 'v1.0.17 (New Feature)',
    badge: 'New in v1.0.17',
    headings: [
      { id: 'queue-overview', title: 'Queue Overview', level: 2 },
      { id: 'defining-jobs', title: 'Defining Queueable Jobs', level: 2 },
      { id: 'dispatching', title: 'Dispatching Jobs', level: 2 },
      { id: 'queue-drivers', title: 'Queue Drivers & Configuration', level: 2 },
      { id: 'worker-daemons', title: 'Running Worker Daemons', level: 2 },
      { id: 'queue-security', title: 'Cryptographic Payload Signing', level: 2 },
    ],
    sections: [
      {
        headingId: 'queue-overview',
        headingTitle: 'Queue Overview',
        content: `Spinx includes a first-class asynchronous job queue built for persistent-process runtimes. Jobs are dispatched from HTTP request handlers and processed by separate long-running worker daemons — keeping your API responses fast and deferring expensive tasks like sending emails, generating PDFs, syncing external APIs, or processing payments to the background.\n\nThree drivers are available out of the box: Database (default — zero extra infrastructure), Redis (distributed atomic counters across worker pools), and Sync (immediate in-process execution for testing).`,
        callout: {
          type: 'performance',
          title: 'Non-Blocking HTTP Responses',
          message: 'Queue::push() returns immediately. The job serialization and database insert takes < 1ms, keeping your HTTP response times unaffected.',
        },
      },
      {
        headingId: 'defining-jobs',
        headingTitle: 'Defining Queueable Jobs',
        content: `Jobs live in app/Modules/<Name>/Application/Jobs/ and implement the Spinx\\Queue\\Job interface with a single handle() method. Only lightweight serializable primitives (IDs, strings, scalars) should be stored in the constructor — resolve full objects from the DI container inside handle().`,
        codeSnippet: {
          title: 'app/Modules/Billing/Application/Jobs/ProcessInvoiceJob.php',
          language: 'php',
          code: `<?php

declare(strict_types=1);

namespace App\\Modules\\Billing\\Application\\Jobs;

use Spinx\\Queue\\Job;

final class ProcessInvoiceJob implements Job
{
    public function __construct(
        public readonly int \$invoiceId,
    ) {}

    public function handle(): void
    {
        // Resolve dependencies from DI container inside handle()
        \$invoices = \\Spinx\\Kernel\\Kernel::getContainer()
            ->get(InvoiceRepositoryInterface::class);

        \$invoice = \$invoices->findById(\$this->invoiceId);
        \$invoice->markAsProcessed();
        \$invoices->save(\$invoice);
    }
}`,
        },
      },
      {
        headingId: 'dispatching',
        headingTitle: 'Dispatching Jobs',
        content: 'Dispatch jobs using the Queue:: facade from any controller, service, or event handler:',
        codeSnippet: {
          title: 'Dispatching with priority and delay',
          language: 'php',
          code: `use Spinx\\Queue\\Queue;

// Default queue
Queue::push(new ProcessInvoiceJob(\$invoiceId));

// Named queue with priority (higher = processed first)
Queue::onQueue('billing')->withPriority(10)->push(new ProcessInvoiceJob(\$invoiceId));

// Delayed execution (seconds)
Queue::later(60, new ProcessInvoiceJob(\$invoiceId));

// Priority + delay combined
Queue::onQueue('high')->withPriority(20)->later(300, new SendReportJob(\$reportId));`,
        },
      },
      {
        headingId: 'queue-drivers',
        headingTitle: 'Queue Drivers & Configuration',
        content: 'Configure your queue driver in config/queue.php and .env:',
        codeSnippet: {
          title: 'config/queue.php',
          language: 'php',
          code: `return [
    'default' => env('QUEUE_CONNECTION', 'database'),

    'connections' => [
        'sync'     => ['driver' => 'sync'],
        'database' => [
            'driver'      => 'database',
            'table'       => 'spinx_jobs',
            'queue'       => 'default',
            'retry_after' => 300,
        ],
        'redis' => [
            'driver'      => 'redis',
            'connection'  => 'queue',
            'queue'       => 'default',
            'retry_after' => 300,
        ],
    ],
];`,
        },
        tableData: {
          headers: ['Driver', 'Env Value', 'Best For'],
          rows: [
            ['Sync', 'QUEUE_CONNECTION=sync', 'Local development and testing'],
            ['Database', 'QUEUE_CONNECTION=database', 'Single-server apps, zero extra infra'],
            ['Redis', 'QUEUE_CONNECTION=redis', 'Multi-server, high throughput, atomic counters'],
          ],
        },
      },
      {
        headingId: 'worker-daemons',
        headingTitle: 'Running Worker Daemons',
        content: 'Start queue worker daemons using the Spinx CLI. Workers poll for due jobs, execute them, and loop until stopped:',
        codeSnippet: {
          title: 'Starting worker daemons',
          language: 'bash',
          code: `# Start default queue worker
php spinx queue:work

# Process multiple queues in priority order (high → billing → default)
php spinx queue:work --queue=high,billing,default

# Supervisord config for production
[program:spinx-worker]
command=php /var/www/spinx queue:work --queue=high,default
numprocs=4
autostart=true
autorestart=true`,
        },
      },
      {
        headingId: 'queue-security',
        headingTitle: 'Cryptographic Payload Signing',
        content: `Spinx protects against PHP Object Injection / Remote Code Execution (RCE) attacks by signing every serialized queue payload with HMAC-SHA256 using APP_KEY before it is stored. Workers verify the signature before calling unserialize(). Any tampered or forged payload is rejected and logged immediately — the deserialization call never executes.`,
        callout: {
          type: 'warning',
          title: 'Never Manually Deserialize Queue Payloads',
          message: 'Always use Queue::push() — bypassing it to insert raw serialized payloads directly into spinx_jobs breaks the HMAC verification chain and exposes your application to RCE.',
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // NEW: Real-Time Broadcasting
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'broadcasting',
    path: '/docs/broadcasting',
    category: 'Async & Real-Time',
    title: 'Real-Time Event Broadcasting (WebSockets)',
    subtitle: 'Stream server-side events to browsers instantly over WebSockets using the Pusher protocol.',
    description: 'Broadcast domain events to authenticated WebSocket subscribers in real time. Spinx is 100% compatible with Soketi, Pusher Cloud, and Laravel Reverb — no heavy SDKs required.',
    readTime: '5 min read',
    lastUpdated: 'v1.0.17 (New Feature)',
    badge: 'New in v1.0.17',
    headings: [
      { id: 'broadcasting-overview', title: 'Broadcasting Overview', level: 2 },
      { id: 'should-broadcast', title: 'ShouldBroadcast Interface', level: 2 },
      { id: 'channel-types', title: 'Channel Types', level: 2 },
      { id: 'channel-auth', title: 'Channel Authorization', level: 2 },
      { id: 'drivers', title: 'Broadcast Drivers', level: 2 },
      { id: 'frontend-client', title: 'Frontend Client Setup', level: 2 },
    ],
    sections: [
      {
        headingId: 'broadcasting-overview',
        headingTitle: 'Broadcasting Overview',
        content: `Spinx Broadcasting lets your server push events to browser clients the moment they happen — no polling required. The system uses the Pusher protocol, making it compatible with any Pusher-compatible WebSocket server.\n\nRecommended local stack: Soketi (available as a standalone binary or npm package — no Docker required). For cloud: Pusher.com or Laravel Reverb.`,
        tableData: {
          headers: ['Driver', 'BROADCAST_DRIVER', 'Best For'],
          rows: [
            ['Pusher/Soketi', 'pusher', 'Production and local dev with a WebSocket server'],
            ['Log', 'log', 'Development debugging without a WebSocket server'],
            ['Null', 'null', 'Testing environments where events should be silently dropped'],
          ],
        },
      },
      {
        headingId: 'should-broadcast',
        headingTitle: 'ShouldBroadcast Interface',
        content: 'Implement ShouldBroadcast on any domain event to make it broadcastable. Broadcast::event() dispatches it:',
        codeSnippet: {
          title: 'InvoicePaidEvent.php',
          language: 'php',
          code: `use Spinx\\Broadcasting\\{PrivateChannel, ShouldBroadcast};

final class InvoicePaidEvent implements ShouldBroadcast
{
    public function __construct(
        public readonly int \$invoiceId,
        public readonly float \$amount,
    ) {}

    public function broadcastOn(): PrivateChannel
    {
        return new PrivateChannel('invoices.' . \$this->invoiceId);
    }

    public function broadcastWith(): array
    {
        return ['id' => \$this->invoiceId, 'amount' => \$this->amount, 'status' => 'paid'];
    }
}

// Dispatch from a controller or service:
Broadcast::event(new InvoicePaidEvent(42, 199.99));`,
        },
      },
      {
        headingId: 'channel-types',
        headingTitle: 'Channel Types',
        content: 'Spinx supports three channel types matching the Pusher protocol:',
        tableData: {
          headers: ['Type', 'Class', 'Access', 'Use Case'],
          rows: [
            ['Public', 'Channel', 'Anyone', 'Global announcements, ticker feeds'],
            ['Private', 'PrivateChannel', 'Authenticated users via callback', 'User-specific events (invoices, notifications)'],
            ['Presence', 'PresenceChannel', 'Authenticated + user info returned', 'Live user lists, collaboration cursors'],
          ],
        },
      },
      {
        headingId: 'channel-auth',
        headingTitle: 'Channel Authorization',
        content: 'Register auth callbacks using pattern-matching channel names. The native auth endpoint POST /_spinx/broadcasting/auth handles Pusher auth requests automatically:',
        codeSnippet: {
          title: 'module.php — Channel Authorization',
          language: 'php',
          code: `use Spinx\\Broadcasting\\Broadcast;

Broadcast::channelAuth('invoices.{id}', function (?object \$user, int \$invoiceId): bool {
    return \$user !== null && \$user->id === \$invoiceId;
});

// Presence channel — return user info array
Broadcast::channelAuth('chat.room.{id}', function (?object \$user): array|false {
    return \$user ? ['user_id' => \$user->id, 'user_info' => ['name' => \$user->name]] : false;
});`,
        },
      },
      {
        headingId: 'drivers',
        headingTitle: 'Broadcast Drivers',
        content: 'Configure broadcasting in config/broadcasting.php and .env:',
        codeSnippet: {
          title: '.env — Soketi configuration',
          language: 'bash',
          code: `BROADCAST_DRIVER=pusher
PUSHER_APP_ID=spinx-local
PUSHER_APP_KEY=spinx-app-key
PUSHER_APP_SECRET=spinx-app-secret
PUSHER_HOST=127.0.0.1
PUSHER_PORT=6001
PUSHER_SCHEME=http`,
        },
        callout: {
          type: 'tip',
          title: 'Soketi — No Docker Required',
          message: 'Install Soketi globally: npm install -g @soketi/soketi — then run: soketi start. Works on Linux, macOS, and Windows without Docker.',
        },
      },
      {
        headingId: 'frontend-client',
        headingTitle: 'Frontend Client Setup',
        content: 'Connect from the Vue/React frontend using Laravel Echo + Pusher JS:',
        codeSnippet: {
          title: 'frontend/echo.ts',
          language: 'typescript',
          code: `import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

export const echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    wsHost: import.meta.env.VITE_PUSHER_HOST,
    wsPort: Number(import.meta.env.VITE_PUSHER_PORT),
    forceTLS: false,
    disableStats: true,
    authEndpoint: '/_spinx/broadcasting/auth',
});

// Listen on a private channel
echo.private('invoices.42').listen('InvoicePaidEvent', (e: any) => {
    console.log('Invoice paid:', e);
});`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // NEW: Multi-Disk Storage
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'storage',
    path: '/docs/storage',
    category: 'Backend & Services',
    title: 'Multi-Disk Filesystem & Cloud Storage',
    subtitle: 'Unified Storage:: facade across local disks and S3-compatible cloud providers.',
    description: 'Store, retrieve, and manage files across local disk and cloud providers (AWS S3, Cloudflare R2, MinIO, Wasabi) using a clean, unified API with built-in path traversal protection and signed temporary URLs.',
    readTime: '4 min read',
    lastUpdated: 'v1.0.17 (New Feature)',
    badge: 'New in v1.0.17',
    headings: [
      { id: 'storage-overview', title: 'Storage Overview', level: 2 },
      { id: 'storage-operations', title: 'File Operations', level: 2 },
      { id: 'signed-urls', title: 'Temporary Signed URLs', level: 2 },
      { id: 'storage-config', title: 'Disk Configuration', level: 2 },
      { id: 'storage-security', title: 'Path Traversal Defense', level: 2 },
    ],
    sections: [
      {
        headingId: 'storage-overview',
        headingTitle: 'Storage Overview',
        content: 'The Storage:: facade provides a unified API for reading and writing files regardless of the underlying storage driver. Switch from local development to S3-compatible cloud storage by changing a single environment variable — no code changes required.',
        tableData: {
          headers: ['Driver', 'FILESYSTEM_DISK', 'Providers'],
          rows: [
            ['local', 'local', 'Server filesystem (storage/app/)'],
            ['s3', 's3', 'AWS S3, Cloudflare R2, MinIO, DigitalOcean Spaces, Wasabi'],
          ],
        },
      },
      {
        headingId: 'storage-operations',
        headingTitle: 'File Operations',
        content: 'Common file operations available on every disk:',
        codeSnippet: {
          title: 'Storage operations',
          language: 'php',
          code: `use Spinx\\Filesystem\\Storage;

// Write
Storage::put('reports/2026-q3.pdf', \$pdfContent);
Storage::disk('s3')->put('exports/data.csv', \$csv);

// Read
\$content = Storage::get('reports/2026-q3.pdf');

// Check existence
if (Storage::exists('avatars/user_42.png')) { ... }

// Delete
Storage::delete('tmp/old.txt');

// List directory
\$files = Storage::disk('local')->files('reports/');`,
        },
      },
      {
        headingId: 'signed-urls',
        headingTitle: 'Temporary Signed URLs',
        content: 'Generate time-limited HMAC-signed download URLs for private files without exposing the file path or requiring authentication on the storage provider:',
        codeSnippet: {
          title: 'Generating signed URLs',
          language: 'php',
          code: `// Generate URL valid for 2 hours
\$url = Storage::disk('s3')->temporaryUrl(
    'contracts/nda_agreement.pdf',
    now()->addHours(2)
);

// Local disk signed URL (verified by Spinx middleware)
\$localUrl = Storage::disk('local')->temporaryUrl('reports/private.pdf', now()->addMinutes(30));`,
        },
      },
      {
        headingId: 'storage-config',
        headingTitle: 'Disk Configuration',
        content: 'Define disks in config/filesystem.php. Multiple disks can be defined simultaneously:',
        codeSnippet: {
          title: 'config/filesystem.php',
          language: 'php',
          code: `return [
    'default' => env('FILESYSTEM_DISK', 'local'),
    'disks' => [
        'local' => [
            'driver' => 'local',
            'root'   => storage_path('app'),
        ],
        's3' => [
            'driver'   => 's3',
            'key'      => env('AWS_ACCESS_KEY_ID'),
            'secret'   => env('AWS_SECRET_ACCESS_KEY'),
            'region'   => env('AWS_DEFAULT_REGION', 'us-east-1'),
            'bucket'   => env('AWS_BUCKET'),
            'endpoint' => env('AWS_ENDPOINT'), // Cloudflare R2 or MinIO URL
        ],
    ],
];`,
        },
      },
      {
        headingId: 'storage-security',
        headingTitle: 'Path Traversal Defense',
        content: 'The LocalFilesystemDriver automatically defends against directory traversal attacks. Paths are inspected segment-by-segment and any .. traversal sequences throw an InvalidArgumentException — your storage root can never be escaped.',
        callout: {
          type: 'note',
          title: 'Built-in Path Jail',
          message: 'Storage::get("../../.env") — this call throws InvalidArgumentException at the framework level, before any filesystem I/O occurs. Null-byte injection (\\0) and Windows backslash traversal (..\\\\..\\ ) are also handled.',
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // NEW: Vector Search
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'vector-search',
    path: '/docs/vector-search',
    category: 'Backend & Services',
    title: 'Semantic Vector Search',
    subtitle: 'AI-native semantic search using OpenAI/Ollama embeddings and PostgreSQL pgvector.',
    description: 'Generate text embeddings and run lightning-fast cosine similarity queries over your database using the Vector:: facade and native pgvector schema extensions.',
    readTime: '5 min read',
    lastUpdated: 'v1.0.17 (New Feature)',
    badge: 'AI Native',
    headings: [
      { id: 'vector-overview', title: 'Vector Search Overview', level: 2 },
      { id: 'embedding', title: 'Generating Embeddings', level: 2 },
      { id: 'vector-query', title: 'Similarity Search Queries', level: 2 },
      { id: 'vector-migrations', title: 'Database Migrations', level: 2 },
      { id: 'vector-config', title: 'Configuration', level: 2 },
    ],
    sections: [
      {
        headingId: 'vector-overview',
        headingTitle: 'Vector Search Overview',
        content: `Spinx integrates natively with pgvector (PostgreSQL extension) to enable semantic AI search inside your existing database. Use it to build knowledge bases, smart document search, AI recommendation engines, or RAG (Retrieval-Augmented Generation) pipelines.\n\nEmbeddings are generated via OpenAI (text-embedding-3-small, 1536 dimensions by default) or local Ollama models.`,
        callout: {
          type: 'note',
          title: 'PostgreSQL Required',
          message: 'Vector search requires PostgreSQL >= 14 with the pgvector extension. Run $schema->enableExtension(\'vector\') in a migration to install it automatically.',
        },
      },
      {
        headingId: 'embedding',
        headingTitle: 'Generating Embeddings',
        content: 'Generate a float-array embedding from any text string using the Vector:: facade:',
        codeSnippet: {
          title: 'Generating embeddings',
          language: 'php',
          code: `use Spinx\\Database\\Vector\\Vector;

// Generate 1536-dimensional OpenAI embedding
\$embedding = Vector::embed('Domain-Driven Design in persistent PHP workers');
// Returns: [-0.0124, 0.0841, -0.0039, ... 1536 floats]

// Store it in a migration-created vector column
\$db->insert('knowledge_base', [
    'title'     => 'DDD in PHP',
    'embedding' => Vector::formatVector(\$embedding), // '[−0.012,0.084,...]'
]);`,
        },
      },
      {
        headingId: 'vector-query',
        headingTitle: 'Similarity Search Queries',
        content: 'Search for the most semantically similar records using distance metrics:',
        codeSnippet: {
          title: 'Cosine similarity search',
          language: 'php',
          code: `\$results = Vector::search(
    table: 'knowledge_base',
    vectorColumn: 'embedding',
    queryVector: Vector::embed('How does Spinx handle memory isolation?'),
    filters: ['status' => 'published'],
    limit: 5,
    metric: 'cosine', // 'cosine' (<=>), 'l2' (<->), 'inner_product' (<#>)
);

foreach (\$results as \$doc) {
    echo \$doc['title'] . ' — distance: ' . \$doc['_distance'];
}`,
        },
        tableData: {
          headers: ['Metric', 'SQL Operator', 'Best For'],
          rows: [
            ['cosine', '<=>', 'Text similarity (most common for NLP)'],
            ['l2', '<->', 'Geometric distance in embedding space'],
            ['inner_product', '<#>', 'Dot product — normalized vectors'],
          ],
        },
      },
      {
        headingId: 'vector-migrations',
        headingTitle: 'Database Migrations',
        content: 'Use the built-in Blueprint extensions to create vector columns and enable pgvector:',
        codeSnippet: {
          title: 'Migration with vector column',
          language: 'php',
          code: `public function up(SchemaBuilder \$schema): void
{
    // Enable pgvector on PostgreSQL
    \$schema->enableExtension('vector');

    \$schema->create('knowledge_base', function (Blueprint \$table) {
        \$table->id();
        \$table->uuid('uuid');               // Native UUID column
        \$table->string('title');
        \$table->text('content');
        \$table->vector('embedding', 1536);  // pgvector column
        \$table->timestamps();
    });
}`,
        },
      },
      {
        headingId: 'vector-config',
        headingTitle: 'Configuration',
        content: 'Set your embedding provider and model in config/vector.php:',
        codeSnippet: {
          title: 'config/vector.php',
          language: 'php',
          code: `return [
    'default' => env('VECTOR_DRIVER', 'openai'),
    'drivers' => [
        'openai' => [
            'api_key'    => env('OPENAI_API_KEY'),
            'model'      => env('OPENAI_EMBEDDING_MODEL', 'text-embedding-3-small'),
            'dimensions' => 1536,
        ],
        'ollama' => [
            'base_url'   => env('OLLAMA_BASE_URL', 'http://localhost:11434/v1'),
            'model'      => env('OLLAMA_EMBEDDING_MODEL', 'nomic-embed-text'),
            'dimensions' => 768,
        ],
    ],
];`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // NEW: Security & Hardening
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'security-hardening',
    path: '/docs/security-hardening',
    category: 'Security',
    title: 'Production Security & Hardening',
    subtitle: 'Eight attack vectors addressed at the framework level — so your apps are safe by default.',
    description: 'Spinx defends against RCE via deserialization, path traversal, CORS origin reflection, CSRF state leak, SQL injection in order clauses, and shell injection — all enforced without any developer configuration.',
    readTime: '6 min read',
    lastUpdated: 'v1.0.17 (New Feature)',
    badge: 'Security',
    headings: [
      { id: 'sec-overview', title: 'Security Architecture', level: 2 },
      { id: 'queue-signing', title: 'Queue HMAC Signing (Anti-RCE)', level: 2 },
      { id: 'path-traversal', title: 'Path Traversal Defense', level: 2 },
      { id: 'cors-security', title: 'Secure CORS Origin Matching', level: 2 },
      { id: 'csrf-isolation', title: 'CSRF Token Coroutine Isolation', level: 2 },
      { id: 'webhook-verification', title: 'Webhook Signature Verification', level: 2 },
      { id: 'querybuilder-injection', title: 'SQL Injection Hardening', level: 2 },
    ],
    sections: [
      {
        headingId: 'sec-overview',
        headingTitle: 'Security Architecture',
        content: 'Spinx v1.0.17 completed a comprehensive security audit covering all major attack surfaces. The following vulnerabilities were identified and patched directly in the framework — meaning every application built on Spinx inherits these protections automatically without developer action.',
        tableData: {
          headers: ['Attack Vector', 'Subsystem', 'Defense'],
          rows: [
            ['PHP Object Injection / RCE', 'Queue Drivers', 'HMAC-SHA256 payload signing with APP_KEY'],
            ['Directory Traversal', 'LocalFilesystemDriver', 'Segment-by-segment .. detection and jailing'],
            ['CORS Origin Reflection', 'CorsMiddleware', 'Wildcard + credentials combination blocked'],
            ['CSRF State Leak (Persistent Workers)', 'Csrf.php + Kernel', 'Csrf::reset() in every request finally block'],
            ['SQL Injection (ORDER BY)', 'QueryBuilder', 'Direction normalized to strict ASC/DESC whitelist'],
            ['Shell Injection', 'SpinxCommandTool', 'escapeshellarg() on every tokenized argument'],
            ['Public AI Endpoint Exposure', 'Kernel.php', 'AI routes disabled in APP_ENV=production'],
            ['Distributed Rate Limit Drift', 'RateLimitMiddleware', 'Auto-resolves Redis atomic store in multi-worker'],
          ],
        },
      },
      {
        headingId: 'queue-signing',
        headingTitle: 'Queue HMAC Signing (Anti-RCE)',
        content: 'PHP\'s unserialize() is a known RCE vector. Spinx eliminates this risk by signing every queue payload with HMAC-SHA256 before storage and verifying the signature before deserialization:',
        codeSnippet: {
          title: 'Payload structure (internal)',
          language: 'json',
          code: `{
  "data": "<base64-encoded serialized job>",
  "hmac": "<sha256 hex digest using APP_KEY>"
}`,
        },
        callout: {
          type: 'warning',
          title: 'Keep APP_KEY Secret',
          message: 'The queue signing key is derived from APP_KEY. Rotate it if compromised. Generate a strong key: php -r \'echo base64_encode(random_bytes(32));\' >> .env',
        },
      },
      {
        headingId: 'path-traversal',
        headingTitle: 'Path Traversal Defense',
        content: 'The LocalFilesystemDriver jails every path to the configured disk root. Any path component equal to .. triggers an immediate exception before any filesystem call is made:',
        codeSnippet: {
          title: 'Blocked traversal attempts',
          language: 'php',
          code: `// All of these throw \\InvalidArgumentException automatically:
Storage::get('../../../.env');
Storage::get('..\\\\..\\\\secret.php');   // Windows backslash
Storage::get("dir/\\0/file.txt");        // Null-byte injection`,
        },
      },
      {
        headingId: 'cors-security',
        headingTitle: 'Secure CORS Origin Matching',
        content: 'Combining wildcard CORS (*) with allow_credentials: true is a critical misconfiguration that allows any website to make authenticated cross-origin requests. Spinx enforces the correct behavior:',
        codeSnippet: {
          title: 'config/cors.php — correct configuration',
          language: 'php',
          code: `return [
    // CORRECT: explicit allowlist with credentials
    'allowed_origins'  => ['https://app.mysite.com'],
    'allow_credentials'=> true,

    // WRONG — Spinx blocks this combination automatically:
    // 'allowed_origins'  => ['*'],
    // 'allow_credentials'=> true, ← wildcard + credentials → null origin returned
];`,
        },
      },
      {
        headingId: 'csrf-isolation',
        headingTitle: 'CSRF Token Coroutine Isolation',
        content: `In persistent workers (RoadRunner/Swoole), static PHP properties persist across requests. Without explicit reset, a CSRF token from Request A could be accidentally returned to Request B.\n\nSpinx solves this with two mechanisms:\n1. Csrf::reset() is called automatically in Kernel::handle()\'s finally block after every request.\n2. In Swoole coroutine mode, CSRF tokens are keyed by coroutine ID — each concurrent coroutine gets an isolated token.`,
        callout: {
          type: 'performance',
          title: 'Zero Performance Overhead',
          message: 'Csrf::reset() is a single array unset operation — negligible cost on the critical request path.',
        },
      },
      {
        headingId: 'webhook-verification',
        headingTitle: 'Webhook Signature Verification',
        content: 'Verify incoming webhooks from Stripe, GitHub, Slack, or any HMAC-signing provider using HmacWebhookVerifier:',
        codeSnippet: {
          title: 'Stripe webhook verification',
          language: 'php',
          code: `use Spinx\\Webhooks\\HmacWebhookVerifier;

\$verifier = new HmacWebhookVerifier(secret: env('STRIPE_WEBHOOK_SECRET'));

// Verify Stripe-style timestamped signature header
if (!\$verifier->verifyStripe(\$request, maxAgeSeconds: 300)) {
    return Response::json(['error' => 'Invalid signature'], 403);
}

// Exempt the route from CSRF in module.php:
RouteBuilder::post('/webhooks/stripe', StripeWebhookController::class)
    ->withoutCsrf();`,
        },
      },
      {
        headingId: 'querybuilder-injection',
        headingTitle: 'SQL Injection Hardening',
        content: 'QueryBuilder::orderBy() sanitizes the direction parameter to prevent SQL injection in dynamic sort order expressions. Any value that is not DESC is normalized to ASC:',
        codeSnippet: {
          title: 'Direction sanitization',
          language: 'php',
          code: `// These all produce safe ORDER BY created_at ASC:
\$query->orderBy('created_at', 'ASC; DROP TABLE users;');
\$query->orderBy('created_at', "DESC\\n; --");
\$query->orderBy('created_at', 'random_value');

// Only valid values produce DESC:
$query->orderBy('created_at', 'DESC'); // ORDER BY created_at DESC`,
        },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  // NEW: Directives & Templating Engine
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'templating-directives',
    path: '/docs/templating-directives',
    category: 'Frontend & Islands',
    title: 'Spinx Directives & Templating Engine',
    subtitle: 'Over 40+ built-in template directives for layout nesting, dynamic CSS, form bindings, auth guards, flash alerts, and reactive islands.',
    description: 'Master Spinx Directives to eliminate spaghetti PHP and ternary soup. Features clean page layouts with @layout and @slot, dynamic styling with @class and @style, form security with @csrf and @honeypot, safe array echos, and client-side island hydration.',
    readTime: '8 min read',
    lastUpdated: 'v1.0.21 (Latest Feature)',
    badge: 'Directives',
    headings: [
      { id: 'directives-overview', title: 'Directives Overview', level: 2 },
      { id: 'layouts-and-slots', title: 'Layouts, Slots & Stacks', level: 2 },
      { id: 'dynamic-styling', title: 'Dynamic Classes & CSS Styles', level: 2 },
      { id: 'forms-and-security', title: 'Forms, HTTP Spoofing & Honeypots', level: 2 },
      { id: 'smart-loops', title: 'Smart Loops & Empty Fallbacks', level: 2 },
      { id: 'auth-and-guards', title: 'Authentication & Role Guards', level: 2 },
      { id: 'alerts-and-errors', title: 'Validation Errors & Flash Messages', level: 2 },
      { id: 'seo-and-media', title: 'SEO, SVG Inlining & Formatting', level: 2 },
      { id: 'javascript-state', title: 'JavaScript State & Reactive Islands', level: 2 },
      { id: 'caching-and-debugging', title: 'Fragment Caching & Profiling', level: 2 },
      { id: 'directives-cheat-sheet', title: 'Directives Quick Reference Table', level: 2 },
    ],
    sections: [
      {
        headingId: 'directives-overview',
        headingTitle: 'Directives Overview',
        content: `Spinx Directives compile directly into high-performance plain PHP in storage/cache/views during the first request and remain warmed in RAM across RoadRunner/Swoole requests.

Unlike traditional server-only template engines, Spinx Directives integrate server-side control flow with client-side reactive islands (@island), automated script stack aggregation (@push/@stack), dynamic CSS class bindings (@class), and resilient multi-message error rendering without PHP array-to-string notices.`,
        callout: {
          type: 'tip',
          title: 'Zero Runtime Overhead',
          message: 'Templates are compiled once and saved to disk. When executed by RoadRunner persistent workers, compiled PHP views execute at native C-extension speeds.',
        },
      },
      {
        headingId: 'layouts-and-slots',
        headingTitle: 'Layouts, Slots & Stacks',
        content: `Build clean, nested page layouts with master wrappers, named slots, and head/footer script stacks:`,
        codeSnippet: {
          title: 'app.spinx.html (Master Layout) & dashboard.spinx.html (Child Page)',
          language: 'html',
          code: `<!-- views/Shared/app.spinx.html -->
<!DOCTYPE html>
<html>
<head>
    <title>{{ $title ?? 'Spinx App' }}</title>
    @vite
    @stack('styles')
</head>
<body class="bg-dark text-white">
    <aside>
        @renderSlot('sidebar', 'Default Navigation Menu')
    </aside>

    <main>
        {!! $slot !!}
    </main>

    @stack('scripts')
</body>
</html>

<!-- views/Dashboard/index.spinx.html -->
@layout('Shared::app', ['title' => 'My Dashboard'])

@slot('sidebar')
    <ul>
        <li><a href="/projects">My Projects</a></li>
        <li><a href="/settings">Settings</a></li>
    </ul>
@endslot

<div class="p-8">
    <h1>Welcome, {{ $user->name }}</h1>
    @island('ProjectList', ['userId' => $user->id])
</div>

@push('scripts')
    <script>console.log('Dashboard loaded');</script>
@endpush

@endlayout`,
        },
      },
      {
        headingId: 'dynamic-styling',
        headingTitle: 'Dynamic Classes & CSS Styles',
        content: `Eliminate messy string concatenations with conditional class and style builders:`,
        codeSnippet: {
          title: 'Dynamic Classes & Inline Styles',
          language: 'html',
          code: `<!-- Conditional Class Attribute -->
<button @class([
    'btn',
    'btn-primary' => $isPrimary,
    'btn-danger'  => $isDanger,
    'opacity-50 cursor-not-allowed' => $isDisabled,
])>
    Save Changes
</button>

<!-- Conditional Style Attribute -->
<div @style([
    'background-color: ' . $customColor => !empty($customColor),
    'display: none' => $isHidden,
    'font-weight: bold' => $isImportant,
])>
    Card content
</div>

<!-- Inline CSS Pushed to Head -->
@css
<style>
    .glass-panel { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); }
</style>
@endcss`,
        },
      },
      {
        headingId: 'forms-and-security',
        headingTitle: 'Forms, HTTP Spoofing & Honeypots',
        content: `Simplify form generation with CSRF protection, method spoofing, old input restoration, and boolean attribute flags:`,
        codeSnippet: {
          title: 'Complete Secure Form Example',
          language: 'html',
          code: `<form action="/projects/{{ $project->id }}" method="POST">
    @csrf
    @method('PUT')
    @honeypot

    <div class="form-group">
        <label>Project Name</label>
        <input type="text" name="name" value="{{ @old('name', $project->name) }}" @required(true) @autofocus($hasError)>
        @error('name')
            <p class="error-text">{{ $message }}</p>
        @enderror
    </div>

    <div class="form-group">
        <label>Format</label>
        <select name="format">
            <option value="novel" @selected($project->format === 'novel')>Novel</option>
            <option value="screenplay" @selected($project->format === 'screenplay')>Screenplay</option>
        </select>
    </div>

    <label>
        <input type="checkbox" name="is_public" value="1" @checked($project->isPublic)>
        Public project
    </label>

    <button type="submit" @disabled($isLocked)>Update Project</button>
</form>`,
        },
      },
      {
        headingId: 'smart-loops',
        headingTitle: 'Smart Loops & Empty Fallbacks',
        content: `Iterate collections with automatic empty-state fallbacks and meta loop context variables ($loop->first, $loop->last, $loop->iteration, $loop->even, $loop->odd):`,
        codeSnippet: {
          title: 'Smart Loop Iteration',
          language: 'html',
          code: `@loop($chapters as $chapter)
    <div @class(['chapter-row', 'bg-dark' => $loop->odd, 'bg-darker' => $loop->even])>
        <span>Chapter {{ $loop->iteration }}: {{ $chapter->title }}</span>
        <span>Last edited @timeAgo($chapter->updatedAt)</span>
    </div>
@empty
    <div class="empty-state">
        <p>No chapters created yet. Click "New Chapter" to start drafting.</p>
    </div>
@endloop`,
        },
      },
      {
        headingId: 'auth-and-guards',
        headingTitle: 'Authentication & Role Guards',
        content: `Render markup based on user authentication state, roles, and permissions:`,
        codeSnippet: {
          title: 'Auth & Authorization Directives',
          language: 'html',
          code: `@auth
    <div class="user-menu">
        @avatar($user, ['size' => 36])
        <span>{{ $user->name }}</span>
        <form action="/logout" method="POST">@csrf <button>Sign Out</button></form>
    </div>
@else
    <div class="auth-buttons">
        <a href="/login">Sign In</a>
        <a href="/register">Create Account</a>
    </div>
@endauth

@role('admin')
    <a href="/admin/system" class="admin-badge">Admin Console</a>
@endrole

@can('publish-chapter', $chapter)
    <button class="btn-publish">Publish Chapter</button>
@endcan`,
        },
      },
      {
        headingId: 'alerts-and-errors',
        headingTitle: 'Validation Errors & Flash Messages',
        content: `Easily display session notifications and form validation errors:`,
        codeSnippet: {
          title: 'Flash Alerts & Validation Error Blocks',
          language: 'html',
          code: `<!-- Single Flash Notification -->
@flash('success')
    <div class="alert alert-success">
        <span>✓</span> {{ $message }}
    </div>
@endflash

<!-- Iterate Any Flash Type (success, error, warning, info) -->
@flashAny
    <div class="alert alert-{{ $type }}">
        {{ $message }}
    </div>
@endflashAny

<!-- Global Validation Error Banner -->
@hasErrors
    <div class="alert alert-danger">
        <strong>Please fix the errors below:</strong>
        @foreach ($errors as $field => $msgs)
            @foreach ((array) $msgs as $err)
                <p>• {{ $err }}</p>
            @endforeach
        @endforeach
    </div>
@endhasErrors`,
        },
      },
      {
        headingId: 'seo-and-media',
        headingTitle: 'SEO, SVG Inlining & Formatting',
        content: `Manage OpenGraph metadata, JSON-LD Schema, inline SVGs, human-readable numbers, and relative dates:`,
        codeSnippet: {
          title: 'SEO, Media & Formatting Helpers',
          language: 'html',
          code: `<!-- Full SEO & OpenGraph Meta Tags -->
@seo([
    'title'       => 'The Last Light Before Dawn',
    'description' => 'A historical literary novel generated by autonomous AI agents.',
    'image'       => '/covers/novel.jpg',
    'canonical'   => 'https://writta.app/books/last-light',
])

<!-- Inlined Sanitized SVG with Tailwind/CSS classes -->
@svg('icons/quill.svg', ['class' => 'w-6 h-6 text-pink-500'])

<!-- User Avatar with Initials Fallback -->
@avatar($author, ['size' => 48, 'class' => 'shadow-lg'])

<!-- Human Formatting Directives -->
<p>Word Count: {{ number_format($words) }} (@plural($chaptersCount, 'chapter'))</p>
<p>Created: @date($createdAt, 'F j, Y') (@timeAgo($createdAt))</p>
<p>Manuscript Size: @fileSize($docBytes)</p>
<p>Subscription: @money(19.99, 'USD') / month</p>`,
        },
      },
      {
        headingId: 'javascript-state',
        headingTitle: 'JavaScript State & Reactive Islands',
        content: `Pass backend state seamlessly to client-side scripts and reactive Vue/React islands:`,
        codeSnippet: {
          title: 'JavaScript & Island Directives',
          language: 'html',
          code: `<!-- Inlined Safe JavaScript Object -->
<script>
    const userSession = @js($user);
</script>

<!-- Global Window State Variable -->
@window('WrittaState', [
    'apiUrl'     => '/api/v1',
    'projectId'  => $project->id,
    'authToken'  => $sessionToken,
])

<!-- Reactive Vue / React Client Island -->
@island('ManuscriptEditor', [
    'projectId' => $project->id,
    'chapters'  => $chapters,
])

<!-- Lazy-Hydrated Island (Mounted on Scroll via IntersectionObserver) -->
@islandLazy('AnalyticsChart', [
    'stats' => $dailyWordStats,
])

<!-- Real-time WebSocket Channel Hook -->
@broadcast('projects.' . $project->id, 'ChapterUpdated')`,
        },
      },
      {
        headingId: 'caching-and-debugging',
        headingTitle: 'Fragment Caching & Profiling',
        content: `Cache expensive subview HTML chunks and benchmark render performance in development:`,
        codeSnippet: {
          title: 'Fragment Caching & Profiling',
          language: 'html',
          code: `<!-- Fragment Caching (Cached in Redis/Filesystem for 1 hour) -->
@cache('sidebar-popular-novels', 3600)
    <div class="popular-novels-widget">
        @foreach ($popularNovels as $novel)
            <div class="novel-card">{{ $novel->title }}</div>
        @endforeach
    </div>
@endcache

<!-- Execution Time & Memory Benchmark (Appends HTML comment with ms & KB) -->
@benchmark('agent-pipeline-render')
    @include('Shared::agent-status-panel')
@endbenchmark

<!-- Dev Mode Debug Dumps -->
@dev
    <div class="debug-drawer">
        @dump($debugContext)
    </div>
@enddev`,
        },
      },
      {
        headingId: 'directives-cheat-sheet',
        headingTitle: 'Directives Quick Reference Table',
        content: `Quick reference table of all available Spinx Directives:`,
        tableData: {
          headers: ['Category', 'Directives', 'Primary Use Case'],
          rows: [
            ['Layouts', '@layout, @endlayout, @slot, @endslot, @renderSlot, @push, @prepend, @stack, @once', 'Master layouts, component slots, script/style stacks'],
            ['Forms', '@csrf, @method, @honeypot, @old, @checked, @selected, @disabled, @readonly, @required, @autofocus', 'Secure forms, method spoofing, anti-bot, attribute flags'],
            ['Styling', '@class, @style, @css, @endcss, @dark, @light', 'Dynamic conditional classes, inline styles, dark/light themes'],
            ['Control Flow', '@if, @elseif, @else, @endif, @unless, @when, @has, @missing', 'Server-side condition evaluation and guards'],
            ['Iteration', '@foreach, @endforeach, @loop, @empty, @endloop', 'Array/collection loops with $loop helper and empty fallback'],
            ['Auth & Access', '@auth, @endauth, @guest, @endguest, @role, @can', 'User session checks, role requirements, permission policies'],
            ['Alerts', '@error, @enderror, @hasErrors, @endhasErrors, @flash, @flashAny', 'Form validation errors and session flash toasts'],
            ['Formatting', '@date, @timeAgo, @money, @fileSize, @truncate, @plural', 'Human-friendly dates, currencies, byte sizes, plural words'],
            ['SEO & Media', '@seo, @title, @meta, @schema, @svg, @image, @avatar', 'OpenGraph, JSON-LD, inlined SVG vectors, responsive images'],
            ['JS & Islands', '@js, @script, @window, @island, @islandLazy, @broadcast, @vite', 'Vite assets, JS variables, reactive Vue/React islands'],
            ['Performance', '@cache, @endcache, @benchmark, @dump, @dd, @dev, @production', 'HTML fragment caching, benchmark profiling, debug inspection'],
          ],
        },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  // NEW: API Authentication (Personal Access Tokens & Stateless JWT)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'api-authentication',
    path: '/docs/api-authentication',
    category: 'Backend & Services',
    title: 'API Authentication (Tokens & JWT)',
    subtitle: 'Sanctum-style Personal Access Tokens, Stateless JWT, and Decoupled Headless Backend Architecture.',
    description: 'Learn how to secure REST APIs in Spinx using Personal Access Tokens (PAT) with granular scopes, ultra-fast stateless JWT tokens with zero-database lookups, or build pure decoupled headless API backends paired with Next.js, React, Vue, or Mobile frontends.',
    readTime: '7 min read',
    lastUpdated: 'v1.0.22 (Latest Feature)',
    badge: 'API & Auth',
    headings: [
      { id: 'api-overview', title: 'API Authentication Overview', level: 2 },
      { id: 'headless-mode', title: 'Headless / Decoupled API-Only Mode', level: 2 },
      { id: 'personal-access-tokens', title: 'Personal Access Tokens (PAT)', level: 2 },
      { id: 'stateless-jwt', title: 'Stateless JSON Web Tokens (JWT)', level: 2 },
      { id: 'middleware-and-abilities', title: 'Route Protection & Ability Scopes', level: 2 },
      { id: 'configuration', title: 'Configuration & Key Management', level: 2 },
    ],
    sections: [
      {
        headingId: 'api-overview',
        headingTitle: 'API Authentication Overview',
        content: `Spinx features a dual-driver API authentication engine built directly into the kernel:

1. **Personal Access Tokens (PAT)**: Sanctum-style stateful bearer tokens stored as SHA-256 hashes in the database. Supports named devices, expiration dates, last-used tracking, and granular ability scopes.
2. **Stateless JSON Web Tokens (JWT)**: RFC 7519 compliant HMAC-SHA256 tokens validated entirely in RAM with zero database lookups, providing blazing fast response times (>25,000 req/sec) on persistent RoadRunner workers.

Both drivers are seamlessly consumed through the unified \`auth:api\` middleware and the \`Auth::user()\` / \`Request::bearerToken()\` facades.`,
        callout: {
          type: 'performance',
          title: 'Zero Boot Overhead on API Calls',
          message: 'Because Spinx keeps workers in memory, API requests execute in sub-millisecond times with zero framework boot penalty per request.',
        },
      },
      {
        headingId: 'headless-mode',
        headingTitle: 'Headless / Decoupled API-Only Mode',
        content: `Spinx is engineered to function as a high-performance headless JSON backend paired with external frontends like Next.js, Vite React/Vue SPAs, Nuxt.js, React Native, Flutter, Swift, or Kotlin.

Scaffold an API-only application:

\`\`\`bash
spinx new my-backend --frontend=none
\`\`\`

In headless mode:
- Controllers return \`Response::json($data, $status)\` — never SSR views.
- \`CorsMiddleware\` handles cross-origin requests from \`http://localhost:3000\` or your production frontend domain.
- Frontend apps send the \`Authorization: Bearer <token>\` header with every request.`,
        codeSnippet: {
          title: 'app/Modules/Auth/Infrastructure/Http/Controllers/ApiAuthController.php',
          language: 'php',
          code: `namespace App\\Modules\\Auth\\Infrastructure\\Http\\Controllers;

use Spinx\\Http\\Request;
use Spinx\\Http\\Response;
use Spinx\\Auth\\Auth;

final class ApiAuthController
{
    public function login(): Response
    {
        $data = Request::validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($data)) {
            return Response::json(['error' => 'Invalid credentials'], 401);
        }

        $user     = Auth::user();
        $newToken = $user->createToken('Mobile App', ['projects:create', 'projects:read']);

        return Response::json([
            'status'       => 'success',
            'token_type'   => 'Bearer',
            'access_token' => $newToken->plainTextToken, // e.g. "spinx_pat_1|a7b9c4..."
            'user'         => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
            ],
        ], 200);
    }
}`,
        },
      },
      {
        headingId: 'personal-access-tokens',
        headingTitle: 'Personal Access Tokens (PAT)',
        content: `Add the \`HasApiTokens\` trait to your User entity or Active Record model to unlock token issuing and revocation:`,
        codeSnippet: {
          title: 'Using HasApiTokens Trait',
          language: 'php',
          code: `namespace App\\Modules\\Auth\\Infrastructure\\Persistence\\Models;

use Spinx\\Database\\Model;
use Spinx\\Auth\\Traits\\HasApiTokens;

final class User extends Model
{
    use HasApiTokens;

    protected static string $table = 'users';
}

// 1. Issue token
$token = $user->createToken('MacBook Pro', ['projects:create'], now()->addDays(30));
echo $token->plainTextToken; // Shown once!

// 2. Query user tokens
$tokens = $user->tokens();

// 3. Revoke single token (Sign out current device)
$user->revokeCurrentToken();

// 4. Revoke all tokens (Sign out everywhere)
$user->revokeTokens();`,
        },
      },
      {
        headingId: 'stateless-jwt',
        headingTitle: 'Stateless JSON Web Tokens (JWT)',
        content: `When high throughput or microservices architecture requires zero-database validation, configure \`API_AUTH_DRIVER=jwt\` in your \`.env\`:`,
        codeSnippet: {
          title: 'Stateless JWT Issuing and Rotation',
          language: 'php',
          code: `use Spinx\\Auth\\Jwt\\Jwt;

// 1. Generate short-lived access token (1 hour)
$accessToken = Jwt::encode($user, ttlSeconds: 3600, claims: [
    'role'      => 'author',
    'abilities' => ['projects:create', 'chapters:write'],
]);

// 2. Generate long-lived refresh token (30 days)
$refreshToken = Jwt::createRefreshToken($user, ttlSeconds: 2592000);

// 3. Validate & decode token in memory (zero DB queries)
$payload = Jwt::decode($accessToken);
$userId  = $payload['sub'];

// 4. Refresh token endpoint
$claims = Jwt::tryDecode($refreshToken);
if ($claims && ($claims['typ'] ?? '') === 'refresh') {
    $user         = User::find($claims['sub']);
    $newAccess    = Jwt::encode($user);
    $newRefresh   = Jwt::createRefreshToken($user);
}`,
        },
      },
      {
        headingId: 'middleware-and-abilities',
        headingTitle: 'Route Protection & Ability Scopes',
        content: `Protect API route groups in \`module.php\` and enforce granular token ability scopes:`,
        codeSnippet: {
          title: 'app/Modules/Projects/module.php — API Route Group',
          language: 'php',
          code: `use Spinx\\Routing\\RouteBuilder;

return [
    'routes' => static function (RouteBuilder $routes): void {
        // Protected API endpoints
        $routes->group(['prefix' => '/api/v1', 'middleware' => ['auth:api']], function (RouteBuilder $api): void {
            // Profile endpoint
            $api->get('/user', [ApiUserController::class, 'profile']);

            // Require specific token ability
            $api->post('/projects', [ApiProjectController::class, 'create'])
                ->middleware('ability:projects:create');

            // Multiple required abilities (AND logic)
            $api->put('/projects/{id}', [ApiProjectController::class, 'update'])
                ->middleware('ability:projects:write,projects:read');
        });
    },
];`,
        },
      },
      {
        headingId: 'configuration',
        headingTitle: 'Configuration & Key Management',
        content: `Configure API authentication settings in \`config/auth.php\`:`,
        codeSnippet: {
          title: 'config/auth.php — API Configuration',
          language: 'php',
          code: `return [
    'default' => [
        'guard' => env('AUTH_GUARD', 'web'), // 'web' or 'api'
    ],

    'api' => [
        'driver'       => env('API_AUTH_DRIVER', 'token'), // 'token' (PAT) | 'jwt'
        'token_prefix' => 'spinx_pat_',
        'expiration'   => null,                              // minutes (null = never expires)
        'jwt_secret'   => env('JWT_SECRET', env('APP_KEY')),
        'jwt_algo'     => 'HS256',                           // 'HS256' or 'HS512'
        'jwt_ttl'      => 3600,                              // access token lifetime in seconds
    ],

    'providers' => [
        'users' => [
            'model' => App\\Modules\\Auth\\Infrastructure\\Persistence\\Models\\User::class,
        ],
    ],
];`,
        },
      },
    ],
  },
];

