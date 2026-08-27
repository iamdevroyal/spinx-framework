# Spinx Framework — Complete Documentation Reference

**Version:** v1.0.17  
**PHP Requirement:** >= 8.2  
**License:** MIT

---

## Table of Contents

1. [Framework Overview](#1-framework-overview)
2. [Installation & Quickstart](#2-installation--quickstart)
3. [Core Architecture — Enforced DDD Modules](#3-core-architecture--enforced-ddd-modules)
4. [Routing & Controllers](#4-routing--controllers)
5. [Database — Active Record ORM & Migrations](#5-database--active-record-orm--migrations)
6. [Asynchronous Queues & Worker Daemons](#6-asynchronous-queues--worker-daemons)
7. [Real-Time Event Broadcasting (WebSockets)](#7-real-time-event-broadcasting-websockets)
8. [Multi-Disk Filesystem & Cloud Storage](#8-multi-disk-filesystem--cloud-storage)
9. [Semantic Vector Search](#9-semantic-vector-search)
10. [Application LLM Bridge](#10-application-llm-bridge)
11. [Redis Connection Pooling & Distributed State](#11-redis-connection-pooling--distributed-state)
12. [Production Security & Hardening](#12-production-security--hardening)
13. [Authentication & Sessions](#13-authentication--sessions)
14. [Caching](#14-caching)
15. [Validation](#15-validation)
16. [Templating & Reactive Islands](#16-templating--reactive-islands)
17. [Autonomous Spinx AI Builder & 9-Agent Fleet](#17-autonomous-spinx-ai-builder--9-agent-fleet)
18. [CLI Reference](#18-cli-reference)
19. [Runtime Drivers — RoadRunner & Swoole](#19-runtime-drivers--roadrunner--swoole)
20. [OpenAPI 3.1 Generator](#20-openapi-31-generator)

---

## 1. Framework Overview

Spinx is a modern PHP framework engineered for:
- **Persistent-process execution** — RoadRunner (Go supervisor) by default, Swoole coroutines opt-in. No per-request bootstrap overhead.
- **Kernel-enforced Domain-Driven Design (DDD)** — Code is autodiscovered strictly within `app/Modules/<Name>/`. Loose files outside module boundaries are ignored at boot.
- **Zero cross-request memory leaks** — `RequestScope` container resets, `Csrf::reset()`, and coroutine-isolated state protect persistent workers from bleed.
- **Full production subsystem suite** — Queues, WebSockets, Cloud Storage, Vector Search, LLM, and Redis Pooling built-in.
- **Autonomous AI-powered development** — 9-Agent fleet guided by `SPINX_AI_ARCHITECTURE.md` invariants.

---

## 2. Installation & Quickstart

### Recommended: Spinx Global Installer

Install the official global installer:

```bash
composer global require spinxphp/installer
```

Create a new application from anywhere:

```bash
spinx new my-app
```

An interactive setup wizard guides you through:
1. **Frontend Selection** (Vue 3 + Vite, React 19 + Vite, or None)
2. **Database Driver** (SQLite zero-config, MySQL, or PostgreSQL)
3. **Runtime Driver** (RoadRunner persistent workers or Swoole coroutines)
4. **App URL configuration**
5. **RoadRunner binary auto-download** (`vendor/bin/rr get`)
6. **Initial database migrations** (`php spinx migrate`)

Start your development server:

```bash
cd my-app
php spinx serve
# → http://localhost:8080  (Application)
# → http://localhost:5173  (Vite HMR)
```

**CLI Flags:**

```bash
spinx new my-app --frontend=vue              # Vue 3 + Vite (default)
spinx new my-app --frontend=react            # React 19 + Vite
spinx new my-app --frontend=none             # API-only (no frontend)
spinx new my-app --version=1.0.0             # Specific framework release
spinx new my-app --frontend=vue -n           # Non-interactive (CI/CD)
```

---

### Alternative: Direct Composer Project Creation

```bash
composer create-project spinxphp/framework my-app
cd my-app
php spinx serve
```

### System Requirements

| Requirement | Minimum |
|---|---|
| PHP | >= 8.2 |
| Composer | >= 2.0 |
| Node.js | >= 18.0 |
| Extensions | mbstring, pdo, json |
| PostgreSQL | >= 14 (optional, for pgvector) |

---

## 3. Core Architecture — Enforced DDD Modules

```
app/Modules/<ModuleName>/
├── Domain/
│   ├── Entities/             -- Pure PHP: NO framework/HTTP/DBAL imports
│   ├── ValueObjects/         -- Immutable value types
│   ├── Events/               -- Domain events
│   └── Repositories/         -- Interface contracts only
├── Application/
│   ├── Services/             -- Use-case orchestration
│   └── Jobs/                 -- Queue jobs (Spinx\Queue\Job)
├── Infrastructure/
│   ├── Http/Controllers/     -- Thin HTTP controllers
│   ├── Http/Middleware/      -- Request middlewares
│   ├── Repositories/         -- Concrete DBAL implementations
│   └── Persistence/
│       ├── Models/           -- Active Record (Spinx\Database\Model)
│       └── Migrations/       -- Timestamped schema migrations
└── module.php                -- Routes, DI wiring, channel auth
```

### Scaffold a module:
```bash
php spinx make:module Billing --all
```

---

## 4. Routing & Controllers

Routes are declared in `app/Modules/<Name>/module.php`:

```php
use Spinx\Routing\{AliasRegistry, Route, RouteBuilder};
use Symfony\Component\DependencyInjection\ContainerBuilder;

return static function (AliasRegistry $aliases, ContainerBuilder $container): void {
    $aliases->controller('invoice.controller', InvoiceController::class);
    $aliases->middleware('auth', AuthMiddleware::class);

    Route::group('/api/invoices', static function () {
        RouteBuilder::get('/', 'invoice.controller@index')->middleware('auth');
        RouteBuilder::post('/', 'invoice.controller@store')->middleware('auth');
        RouteBuilder::get('/{id}', 'invoice.controller@show')->middleware('auth');
        RouteBuilder::post('/webhooks/stripe', StripeWebhookController::class)->withoutCsrf();
    });
};
```

---

## 5. Database — Active Record ORM & Migrations

```php
// Model
use Spinx\Database\Model;
class Invoice extends Model {
    protected static string $table = 'invoices';
}

// QueryBuilder
Invoice::query()->where('status', 'pending')->orderBy('created_at', 'DESC')->get();

// Migration
$schema->create('invoices', function (Blueprint $table) {
    $table->id();
    $table->uuid('uuid');
    $table->decimal('amount', 10, 2);
    $table->string('status')->default('pending');
    $table->vector('embedding', 1536);  // pgvector support
    $table->timestamps();
});
```

---

## 6. Asynchronous Queues & Worker Daemons

```php
use Spinx\Queue\Queue;

// Dispatch
Queue::push(new ProcessInvoiceJob($invoiceId));
Queue::onQueue('billing')->withPriority(10)->push(new ProcessInvoiceJob($invoiceId));
Queue::later(60, new SendEmailJob($userId));

// Job class
final class ProcessInvoiceJob implements Job {
    public function __construct(public readonly int $invoiceId) {}
    public function handle(): void { /* ... */ }
}

// Run worker
// php spinx queue:work --queue=high,billing,default
```

**Security:** All payloads are HMAC-SHA256 signed with `APP_KEY`. Tampered payloads are rejected before `unserialize()`.

**Drivers:** `database` (default), `redis`, `sync`

---

## 7. Real-Time Event Broadcasting (WebSockets)

```php
use Spinx\Broadcasting\{Broadcast, PrivateChannel, ShouldBroadcast};

// Direct broadcast
Broadcast::private('invoices.42')->event('Paid', ['amount' => 199.99]);

// Event class
final class InvoicePaidEvent implements ShouldBroadcast {
    public function broadcastOn(): PrivateChannel {
        return new PrivateChannel('invoices.' . $this->invoiceId);
    }
    public function broadcastWith(): array {
        return ['id' => $this->invoiceId, 'status' => 'paid'];
    }
}
Broadcast::event(new InvoicePaidEvent(42, 199.99));

// Channel auth (in module.php)
Broadcast::channelAuth('invoices.{id}', function (?object $user, int $id): bool {
    return $user?->id === $id;
});
```

**Drivers:** `pusher` (Soketi/Pusher/Reverb compatible), `log`, `null`  
**Auth endpoint:** `POST /_spinx/broadcasting/auth` (built-in)  
**Soketi setup:** `npm install -g @soketi/soketi && soketi start`

---

## 8. Multi-Disk Filesystem & Cloud Storage

```php
use Spinx\Filesystem\Storage;

// Local
Storage::put('reports/q3.pdf', $content);
$data = Storage::get('reports/q3.pdf');

// S3 / Cloudflare R2 / MinIO
Storage::disk('s3')->put('exports/data.csv', $csv);
$url = Storage::disk('s3')->temporaryUrl('contracts/nda.pdf', now()->addHours(2));
```

**Drivers:** `local`, `s3` (AWS SigV4 — supports AWS S3, Cloudflare R2, MinIO, Wasabi)  
**Security:** Null-byte stripping, `..` traversal detection, path jailing built-in.

---

## 9. Semantic Vector Search

```php
use Spinx\Database\Vector\Vector;

$embedding = Vector::embed('Spinx persistent worker architecture');

$results = Vector::search(
    table: 'knowledge_base',
    vectorColumn: 'embedding',
    queryVector: $embedding,
    filters: ['status' => 'published'],
    limit: 5,
    metric: 'cosine' // cosine (<=>), l2 (<->), inner_product (<#>)
);

// Migration schema
$schema->enableExtension('vector');
$table->vector('embedding', 1536);
$table->uuid('uuid');
```

**Providers:** `openai` (text-embedding-3-small), `ollama` (nomic-embed-text)  
**Database:** PostgreSQL >= 14 with pgvector

---

## 10. Application LLM Bridge

```php
use Spinx\Llm\{Llm, LlmRequest, ChatMessage};

// Simple chat
$reply = Llm::chat('Explain DDD in two sentences.');

// Structured generation
$response = Llm::provider('anthropic')->generate(
    (new LlmRequest())
        ->setSystemPrompt('Output valid JSON only.')
        ->addUserMessage('Generate a user profile for Alice.')
);
$data = $response->json();
```

**Providers:** `anthropic` (Claude Sonnet/Haiku), `openai` (GPT-4o, o1)

---

## 11. Redis Connection Pooling & Distributed State

```php
use Spinx\Redis\Redis;

Redis::set('key', 'value');
Redis::connection('cache')->setex('homepage', 3600, $data);
Redis::connection('session')->get($sessionId);
Redis::connection('queue')->lpush('jobs', $payload);
```

**Database separation:** `default:0`, `cache:1`, `session:2`, `queue:3`  
**RedisSession:** `SESSION_DRIVER=redis` for stateless horizontal scaling  
**RedisRateLimitStore:** Auto-resolved by `RateLimitMiddleware` when Redis is available

---

## 12. Production Security & Hardening

| Attack | Defense |
|---|---|
| PHP Object Injection / RCE | HMAC-SHA256 queue payload signing with APP_KEY |
| Directory Traversal | `..` segment detection, null-byte strip, path jailing |
| CORS Origin Reflection | Wildcard + credentials combination blocked |
| CSRF State Leak (persistent workers) | `Csrf::reset()` in every request `finally` block |
| SQL Injection (ORDER BY) | Direction normalized to strict `ASC`/`DESC` whitelist |
| Shell Injection (AI CLI tools) | `escapeshellarg()` on every argument |
| Public AI Endpoint Exposure | Routes disabled in `APP_ENV=production` |
| Multi-Worker Rate Limit Drift | Auto-resolves `RedisRateLimitStore` |

```php
// Webhook verification
$verifier = new HmacWebhookVerifier(secret: env('STRIPE_WEBHOOK_SECRET'));
$verifier->verifyStripe($request, maxAgeSeconds: 300);

// Route CSRF exemption
RouteBuilder::post('/webhooks/stripe', StripeWebhookController::class)->withoutCsrf();
```

---

## 13. Authentication & Sessions

```php
use Spinx\Auth\Auth;

Auth::attempt(['email' => $email, 'password' => $password]);
Auth::check();   // bool
Auth::user();    // user entity
Auth::id();      // int|null
Auth::logout();

// Session drivers: file (default), database, redis
// SESSION_DRIVER=redis  — scales horizontally across worker pools
```

---

## 14. Caching

```php
use Spinx\Cache\Cache;

Cache::put('key', $value, ttl: 3600);
$value = Cache::get('key', default: fn() => computeExpensiveValue());
Cache::forget('key');
Cache::flush();

// Drivers: file, array, redis (CACHE_DRIVER=redis)
```

---

## 15. Validation

```php
use Spinx\Validation\Validate;

$data = Validate::make($request->all(), [
    'email'    => ['required', 'email'],
    'name'     => ['required', 'string', 'min:2', 'max:100'],
    'age'      => ['required', 'integer', 'min:18'],
    'role'     => ['required', 'in:admin,user,viewer'],
]);

// 40+ built-in rules: required, string, integer, email, url, min, max,
// in, not_in, regex, date, uuid, json, same, confirmed, nullable, ...
```

---

## 16. Templating & Reactive Islands

```html
{{!-- resources/views/layout.spinx.html --}}
<!DOCTYPE html>
<html>
<head>@vite(['resources/css/app.css', 'resources/js/app.js'])</head>
<body>
    @csrf
    @yield('content')
    @island('UserDashboard', { userId: {{ $user->id }} })
</body>
</html>

{{!-- Extends layout --}}
@extends('layout')
@section('content')
    <h1>{{ $title }}</h1>
    @foreach($items as $item)
        <p>{{ $item->name }}</p>
    @endforeach
@endsection
```

---

## 17. Autonomous Spinx AI Builder & 9-Agent Fleet

```
OrchestratorAgent
├── ArchitectAgent      — DDD structure, entities, value objects
├── DatabaseAgent       — Migrations, models, vector columns
├── RoutingAgent        — module.php routes, controllers
├── FrontendAgent       — .spinx.html templates, Vue/React islands
├── SecurityAgent       — Auth, CSRF, CORS, webhook verification
├── DevOpsAgent         — RoadRunner config, Dockerfile, workers
├── AsyncAgent          — Queues, jobs, broadcasting, channels
└── StorageVectorAgent  — Storage disks, signed URLs, vector search
```

```bash
php spinx ai:chat "How do I implement a subscription billing module?"
php spinx ai:build "Build a CMS with posts, categories, and tags"
php spinx ai:dashboard   # Dev UI at http://localhost:8080/_spinx/ai
```

**Guardrails:** `AiGuard::detectArchitecturalViolations()` blocks non-Spinx patterns (Eloquent, `routes/web.php`, `$_SESSION`, etc.) and redirects to correct Spinx conventions. Every session is pre-loaded with `SPINX_AI_ARCHITECTURE.md`.

---

## 18. CLI Reference

```bash
php spinx new <name> [--frontend=vue|react]   # Scaffold project
php spinx serve                                # Start runtime + Vite HMR
php spinx driver:swap <roadrunner|swoole>      # Switch execution driver

# Code generation
php spinx make:module <Name> [--all]          # DDD module scaffold
php spinx make:entity <Module> <Name>
php spinx make:model <Module> <Name>
php spinx make:controller <Module> <Name>
php spinx make:migration <Module> <desc>

# Database
php spinx migrate
php spinx schema:compile
php spinx schema:clear

# Queue workers
php spinx queue:work [--queue=high,default]

# AI Builder
php spinx ai:chat
php spinx ai:build "<prompt>"
php spinx ai:dashboard

# Maintenance
php spinx optimize
php spinx cache:clear
php spinx view:clear
php spinx log:clear
```

---

## 19. Runtime Drivers — RoadRunner & Swoole

### RoadRunner (Default)
```yaml
# .rr.yaml
http:
  address: "0.0.0.0:8080"
  pool:
    num_workers: 8
    max_jobs: 1000
```

```bash
vendor/bin/rr get        # Download binary
php spinx serve          # Auto-starts RoadRunner
```

### Swoole (Opt-in)
```json
// spinx.json
{ "driver": "swoole" }
```
```bash
php spinx driver:swap swoole
php spinx serve
```

**Memory Safety:** `RequestScope::reset()`, `Csrf::reset()`, and `Request::setCurrentRequest(null)` are called in the `finally` block of every `Kernel::handle()` invocation — guaranteeing zero cross-request state bleed.

---

## 20. OpenAPI 3.1 Generator

```bash
php spinx openapi:generate
# → Generates public/openapi.json from route attributes
```

```php
use Spinx\OpenApi\Attributes\{OpenApiGet, OpenApiResponse};

#[OpenApiGet('/api/invoices/{id}', summary: 'Get invoice by ID')]
#[OpenApiResponse(200, description: 'Invoice retrieved', schema: InvoiceResource::class)]
public function show(Request $request): JsonResponse { /* ... */ }
```
