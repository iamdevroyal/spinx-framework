export interface DocHeading {
  id: string;
  title: string;
  level: number;
}

export interface DocArticle {
  id: string;
  path: string;
  category: 'Getting Started' | 'AI Builder' | 'Core Concepts' | 'Backend & Services' | 'Frontend & Islands' | 'API & Reference' | 'Guides & Examples';
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
  'Frontend & Islands',
  'API & Reference',
  'Guides & Examples',
] as const;

export const DOCS_DATA: DocArticle[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Introduction
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'introduction',
    path: '/docs/introduction',
    category: 'Getting Started',
    title: 'Introduction to Spinx Framework',
    subtitle: 'The modern PHP engine for persistent workers, enforced DDD architecture, and reactive island hydration.',
    description: 'Spinx is a next-generation full-stack PHP framework engineered for extreme performance, clean domain-driven architecture, and autonomous AI-assisted development.',
    readTime: '5 min read',
    lastUpdated: 'v1.0.16 (Latest)',
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
];
