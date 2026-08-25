# Spinx Framework — Complete Documentation

**Version:** v1.0.0 (Production Ready)  
**Source:** Official Spinx Architecture & Implementation Specification  

This file is the full reference documentation for Spinx, organized by subsystem. Each section follows the same shape: what it is, how it works, working examples, and callouts on gotchas and best practices.

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Installation & Setup](#2-installation--setup)
3. [Runtime Layer (RoadRunner & Swoole)](#3-runtime-layer)
4. [The Kernel Lifecycle](#4-the-kernel-lifecycle)
5. [State Safety & Request Scoping](#5-state-safety--request-scoping)
6. [The Enforced Module System](#6-the-enforced-module-system)
7. [Fluent Routing DSL & Alias System](#7-fluent-routing-dsl--alias-system)
8. [Request & Response Handling](#8-request--response-handling)
9. [Middleware Pipelines](#9-middleware-pipelines)
10. [Data Validation Subsystem](#10-data-validation-subsystem)
11. [Authentication & Session Subsystem](#11-authentication--session-subsystem)
12. [Data Layer — DBAL Active Record ORM & Schema Cache](#12-data-layer--dbal-active-record-orm--schema-cache)
13. [OpenAPI 3.1 Spec Generator](#13-openapi-31-spec-generator)
14. [Background Work — Queues & Task Scheduler](#14-background-work--queues--task-scheduler)
15. [Templating & Reactive Island Hydration](#15-templating--reactive-island-hydration)
16. [Interactive Mobile Preview & Native Shells](#16-interactive-mobile-preview--native-shells)
17. [CLI Command Reference](#17-cli-command-reference)
18. [Static Analysis & Code Quality](#18-static-analysis--code-quality)

---

## 1. Introduction

Spinx is a modern PHP framework for applications that demand extreme persistent-worker performance, cross-platform ease of use, and an architecturally enforced Domain-Driven Design (DDD) layout.

### Core Pillars
- **Speed**: Persistent-process runtime (RoadRunner Go-supervisor by default, Swoole coroutines opt-in) with zero per-request bootstrap overhead.
- **Portability**: Runs on Windows, Linux, and macOS with a single install step — no compiled C extensions required by default.
- **Enforced Architecture**: DDD module layout is structurally the only way the kernel registers code.
- **Island Hydration**: Server-rendered HTML templates with targeted client-side hydration islands (`@island`) for Vue 3 and React 19.
- **Native Reach**: Built-in interactive mobile preview tool (`spinx preview --mobile`) and native shell generators for Android and iOS.

---

## 2. Installation & Setup

Create a new Spinx application with a single CLI command:

```bash
# 1. Create a project
spinx new my-app

# 2. Enter directory
cd my-app

# 3. Boot runtime + Vite HMR dev server
spinx serve
```

### What the Installer Automates
1. Downloads the matching RoadRunner binary for your host OS/CPU architecture.
2. Scaffolds `spinx.json` with your selected runtime and frontend adapter.
3. Generates reference DDD modules (`app/Modules/Health` and `Todo`).
4. Configures database connection pools and container caching.

---

## 3. Runtime Layer

Spinx applications run in long-lived PHP worker processes behind a unified `ServerAdapter` interface.

```php
namespace Spinx\Runtime;

use Symfony\Component\HttpFoundation\{Request, Response};

interface ServerAdapter
{
    public function boot(): void;
    public function handle(Request $request): Response;
    public function shutdown(): void;
}
```

- **RoadRunner (Default)**: High-performance Go process supervisor that manages PHP worker processes sequentially over standard pipes or sockets.
- **Swoole (Opt-in)**: C-extension coroutine engine that multiplexes concurrent requests within a single process. Switch anytime via `spinx driver:swap swoole`.

---

## 4. The Kernel Lifecycle

`Spinx\Kernel\Kernel` compiles the application once at boot time:

```php
use Spinx\Kernel\Kernel;
use Symfony\Component\HttpFoundation\Request;

$kernel = new Kernel($projectRoot);
$kernel->boot();

// In worker loop:
$response = $kernel->handle($request);
```

### Kernel Boot Sequence:
1. `loadEnvironment()`: Parses `.env` via `vlucas/phpdotenv`.
2. `Config::boot()`: Loads all files in `config/` into an immutable memory store.
3. `ContainerFactory::build()`: Compiles the Symfony DI container, running `RequestScopePass`.
4. `Model::setConnectionManager()` & `DB::setConnectionManager()`: Wires database access.
5. `SchemaCache::boot()`: Loads pre-compiled column mappings from `storage/cache/schema_columns.php`.
6. `Auth::boot()`: Wires the configured `UserProviderInterface` and `SessionInterface`.
7. `ModuleLoader::loadRoutes()`: Compiles all module routes into a single Symfony `RouteCollection`.

---

## 5. State Safety & Request Scoping

Persistent runtimes reuse process memory across requests. To prevent data leakage:

### RequestScope Container Wrapper
Services registered by modules are automatically tagged `spinx.module_service` and managed by `RequestScope`. At the start of every request, `RequestScope::reset()` discards any instance state from previous requests.

### Static Analysis Rule
The `Spinx\PHPStan\NoMutableStaticStateRule` rule flags mutable static properties at build time:

```bash
vendor/bin/phpstan analyse
✔ [NoMutableStaticStateRule] 0 state leaks detected across worker pool
```

---

## 6. The Enforced Module System

Code must live inside an active DDD module under `app/Modules/<Name>/`.

```bash
spinx make:module Billing
```

### Module Layout
```
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
```

### Module Definition (`module.php`)
```php
use App\Modules\Billing\Infrastructure\Http\Controllers\InvoiceController;
use Spinx\Auth\Middleware\AuthMiddleware;
use Spinx\Routing\{AliasRegistry, Route, RouteBuilder};
use Symfony\Component\DependencyInjection\ContainerBuilder;

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
];
```

---

## 7. Fluent Routing DSL & Alias System

Spinx uses an expressive, fluent routing DSL:

```php
use Spinx\Routing\Route;

// Basic route:
Route::get(['orders.index', '/orders'])
    ->middleware(['auth'])
    ->controller('order_list');

// Nested route groups with prefix:
Route::group('/api/v1', function (RouteBuilder $group): void {
    Route::get(['users.list', '/users'])->controller('user_list');
    Route::post(['users.create', '/users'])->controller('user_create');
    Route::get(['users.show', '/users/{id}'])->controller('user_show');
});
```

### Alias System
Controllers and middlewares registered via aliases in `module.php` are automatically wired into the Symfony DI container with autowiring enabled.

---

## 8. Request & Response Handling

Controllers receive the Symfony `Request` object and return a Symfony `Response` or `JsonResponse`:

```php
namespace App\Modules\Billing\Infrastructure\Http\Controllers;

use Symfony\Component\HttpFoundation\{Request, Response, JsonResponse};

final class InvoiceController
{
    public function __invoke(Request $request, string $id): JsonResponse
    {
        return new JsonResponse(['id' => $id, 'status' => 'paid']);
    }
}
```

---

## 9. Middleware Pipelines

Middlewares wrap request handling cleanly:

```php
namespace App\Modules\Billing\Infrastructure\Http\Middleware;

use Symfony\Component\HttpFoundation\{Request, Response};

final class CustomMiddleware
{
    public function process(Request $request, \Closure $next): Response
    {
        // Before handler
        $response = $next($request);
        // After handler
        return $response;
    }
}
```

---

## 10. Data Validation Subsystem

`Spinx\Validation\Validator` provides pipe-delimited rule validation with UTF-8 `mb_strlen` awareness and allowlist data return.

```php
use Spinx\Validation\Validator;

$validated = Validator::make($request->request->all(), [
    'name'     => 'required|string|max:100',
    'email'    => 'required|email',
    'password' => 'required|min:8|confirmed',
    'role'     => 'required|in:admin,member,guest',
    'bio'      => 'nullable|string|max:500',
])->validate(); // Returns strictly validated attributes or throws ValidationException
```

### Available Rules:
- `required`: Must exist and not be empty.
- `nullable`: Skips validation if field is missing or empty.
- `string`, `integer`, `numeric`, `array`, `email`.
- `min:n`, `max:n`: UTF-8 character length for strings; numeric magnitude for numbers.
- `in:a,b,c`: Value must match one of the allowed options.
- `confirmed`: Value must match `{field}_confirmation`.

---

## 11. Authentication & Session Subsystem

### Session Management
Spinx provides stateless-safe session drivers that never touch `$_SESSION`:
- `FileSession`: Stored as JSON files in `storage/sessions/`.
- `DatabaseSession`: Stored in the `spinx_sessions` table.

### The Auth Façade
```php
use Spinx\Auth\Auth;

// Attempt login (regenerates session ID to prevent fixation attacks):
if (Auth::attempt(['email' => $email, 'password' => $password])) {
    $user = Auth::user();
}

if (Auth::check()) {
    $userId = Auth::id();
}

Auth::logout();
```

### Password Hashing
```php
use Spinx\Auth\Hash;

$hash = Hash::make('secret_password', cost: 12);
$valid = Hash::check('secret_password', $hash);
```

### Route Middlewares
- `auth`: Rejects unauthenticated requests (redirects to `/login` or returns 401 JSON).
- `guest`: Redirects authenticated users away from login/registration pages.

---

## 12. Data Layer — DBAL Active Record ORM & Schema Cache

Spinx ORM provides an active-record API built directly on Doctrine DBAL 4.

### Schema Cache (`spinx schema:compile`)
Compile your database schema into an immutable column map:

```bash
spinx schema:compile
# Generates storage/cache/schema_columns.php
```

### Column Selection
```php
// Omit sensitive columns without runtime DB queries:
$users = User::query()
    ->selectWithout('password', 'remember_token')
    ->get();

// Select specific columns:
$orders = Order::query()
    ->selectWith('id', 'total', 'status')
    ->get();
```

### Conditional Queries (`when / then / else`)
```php
$orders = Order::query()
    ->where('status', 'active')
    ->when($isAdmin)
        ->then(fn($q) => $q->where('internal_flag', true))
        ->else(fn($q) => $q->where('is_public', true))
    ->get();
```

### Atomic Operations
```php
// Platform-aware atomic upsert (PostgreSQL/SQLite ON CONFLICT, MySQL ON DUPLICATE KEY):
User::upsert(
    values: ['id' => 1, 'email' => 'user@example.com', 'login_count' => 1],
    uniqueColumns: ['id'],
    updateColumns: ['login_count']
);

// Transaction with row locking (SELECT FOR UPDATE):
Order::atomic($orderId, function (Order $order): void {
    $order->update(['status' => 'completed']);
});
```

### The DB Façade
```php
use Spinx\Database\DB;

DB::transaction(function ($conn): void {
    DB::statement('UPDATE accounts SET balance = balance - 100 WHERE id = :id', ['id' => 1]);
    DB::statement('UPDATE accounts SET balance = balance + 100 WHERE id = :id', ['id' => 2]);
});

$rows = DB::select('SELECT * FROM users WHERE active = :a', ['a' => 1]);
```

---

## 13. OpenAPI 3.1 Spec Generator

Generate complete OpenAPI 3.1 specification files using route reflection and PHP 8 attributes:

```bash
spinx openapi:generate --output=public/openapi.json
```

### Controller Annotations
```php
use Spinx\OpenApi\Attributes\{ApiSummary, ApiParam, ApiResponse, ApiTag};

#[ApiTag('Billing')]
#[ApiSummary('Retrieve invoice by ID')]
#[ApiParam(name: 'id', in: 'path', type: 'integer', description: 'Invoice ID')]
#[ApiResponse(status: 200, description: 'Invoice retrieved successfully')]
#[ApiResponse(status: 404, description: 'Invoice not found')]
final class InvoiceShowController { ... }
```

---

## 14. Background Work — Queues & Task Scheduler

### Database-Backed Job Queue
```php
use Spinx\Queue\QueueManager;

$queueManager->dispatch(new ProcessPaymentJob($paymentId));
```

Run queue worker:
```bash
spinx queue:work
```

### Task Scheduler (`schedule.php`)
Configure scheduled tasks fluently at the project root:

```php
use Spinx\Schedule\Scheduler;

return function (Scheduler $scheduler, $container): void {
    $scheduler->call(function () use ($container) {
        $container->get(PruneService::class)->run();
    }, 'daily prune')->daily('03:00');

    $scheduler->call(fn() => syncInventory(), 'inventory sync')->everyMinutes(15);
    $scheduler->call(fn() => weeklyReport(), 'weekly report')->weekly(1, '08:00');
};
```

Run due tasks via one OS cron entry:
```bash
spinx schedule:run
```

---

## 15. Templating & Reactive Island Hydration

Spinx compiles templates into native PHP with familiar directives:
- `{{ $variable }}`: Escaped output.
- `{!! $rawHtml !!}`: Raw output.
- `@if($condition) ... @endif`
- `@foreach($items as $item) ... @endforeach`
- `@csrf`: Hidden CSRF input token.

### Reactive Islands (`@island`)
Hydrate Vue 3 or React 19 client components directly in server HTML:

```html
<div class="card">
    <h1>Project Overview</h1>
    
    <!-- Reactive client island hydrated via Vite -->
    @island('MetricsChart', ['projectId' => $project->id])
</div>
```

---

## 16. Interactive Mobile Preview & Native Shells

### Browser-Based Mobile Previewer
Test responsive views in a simulated mobile device container:

```bash
spinx preview --mobile
```

### Native Mobile Shells
Scaffold production-ready native WebView shells:
```bash
# Android shell (Kotlin + WebView):
spinx build:mobile --android

# iOS shell (Swift + WKWebView):
spinx build:mobile --ios
```

---

## 17. CLI Command Reference

| Command | Purpose |
|---|---|
| `spinx new <project>` | Scaffold a brand new Spinx project |
| `spinx serve` | Boot backend server (RoadRunner/Swoole) + Vite dev server |
| `spinx driver:swap <driver>` | Switch runtime driver (`roadrunner` or `swoole`) |
| `spinx make:module <Name>` | Scaffold a full DDD module skeleton |
| `spinx make:controller <Mod> <Name>` | Generate controller in module Infrastructure layer |
| `spinx make:entity <Mod> <Name>` | Generate Domain entity |
| `spinx make:service <Mod> <Name>` | Generate Application service |
| `spinx make:repository <Mod> <Name>` | Generate repository interface & implementation |
| `spinx make:model <Mod> <Name>` | Generate ORM model in Infrastructure layer |
| `spinx make:middleware <Mod> <Name>` | Generate middleware class |
| `spinx make:migration <Mod> <desc>` | Generate timestamped database migration |
| `spinx make:mail <Mod> <Name>` | Generate Mailable + view + queueable Job |
| `spinx migrate [Name]` | Run pending database migrations |
| `spinx module:migrate <Name>` | Run migrations for one module |
| `spinx queue:work` | Poll and process database-backed job queue |
| `spinx schedule:run` | Run all tasks in `schedule.php` due right now |
| `spinx schema:compile` | Compile schema into `storage/cache/schema_columns.php` |
| `spinx openapi:generate` | Generate OpenAPI 3.1 specification schema |
| `spinx preview --mobile` | Open browser-based interactive mobile device container |
| `spinx preview --android` | Open dev server on connected Android device/emulator |
| `spinx preview --ios` | Open dev server on iOS Simulator (macOS + Xcode) |
| `spinx preview --desktop` | Open dev server in native desktop webview window |
| `spinx build:mobile --android` | Scaffold native Android shell in `mobile/android/` |
| `spinx build:mobile --ios` | Scaffold native iOS shell in `mobile/ios/` |
| `spinx build` | Production build: compiled assets + primed backend cache |

---

## 18. Static Analysis & Code Quality

Spinx ships with strict PHPStan level 8 configuration and custom rules to guarantee architecture boundaries and zero memory leaks.

```bash
vendor/bin/phpstan analyse
```
