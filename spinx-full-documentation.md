# Spinx Framework — Complete Documentation

**Version:** v1 (MVP)
**Source:** SPINX_BUILD_SPEC.md, homepage content, and docs introduction content

This file is the full reference documentation for Spinx, organized by
subsystem. Each section follows the same shape: what it is, how it works,
a working example, and a "What Could Go Wrong" callout where relevant.

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Installation](#2-installation)
3. [Runtime Layer](#3-runtime-layer)
4. [The Kernel](#4-the-kernel)
5. [State Safety Layer](#5-state-safety-layer)
6. [The Module System](#6-the-module-system)
7. [Routing](#7-routing)
8. [Request & Response](#8-request--response)
9. [Middleware](#9-middleware)
10. [Validation](#10-validation)
11. [Dependency Injection](#11-dependency-injection)
12. [Data Layer — The ORM](#12-data-layer--the-orm)
13. [Authentication](#13-authentication)
14. [Templating & Frontend Integration](#14-templating--frontend-integration)
15. [Background Work — Queues & Scheduler](#15-background-work--queues--scheduler)
16. [CLI Reference](#16-cli-reference)
17. [Desktop & Mobile Previewer](#17-desktop--mobile-previewer)
18. [Mobile Compilation](#18-mobile-compilation)
19. [Testing](#19-testing)
20. [Packaging & Deployment](#20-packaging--deployment)
21. [Security](#21-security)
22. [Comparison & Positioning](#22-comparison--positioning)
23. [Roadmap & Known Risks](#23-roadmap--known-risks)

---

## 1. Introduction

Spinx is a PHP framework for applications that don't need Laravel's full
weight but demand near-Node.js performance, zero-friction cross-platform
installation, and an enforced Domain-Driven Design (DDD) architecture from
the first command run.

**Core pillars:**
- **Speed** — persistent-process runtime (RoadRunner default, Swoole
  opt-in), no per-request bootstrap cost.
- **Portability** — runs on Windows, Linux, and macOS with a single
  install step, no compiled extensions required by default.
- **Enforced architecture** — DDD module structure is not a convention,
  it is structurally the only way to add code to the framework.
- **Frontend-agnostic, Vue-first** — Inertia-driven rendering, Vue by
  default with HMR, React as a swappable adapter.
- **Native reach** — a built-in desktop/mobile previewer, and a path to
  compile Spinx frontends into native mobile shells.

**Explicitly out of scope for v1:** full Doctrine ORM, on-device PHP
runtime for offline mobile apps, shared-hosting/FPM support as a primary
deploy target.

> **What Could Go Wrong:** teams sometimes reach for Spinx expecting a
> drop-in Laravel replacement. It isn't — the enforced module system means
> code that "just works" in a loosely structured Laravel app will be
> rejected by Spinx's autodiscovery until it's placed inside a proper
> module. Budget time for this mental shift, not just a migration script.

---

## 2. Installation

Spinx projects are created using the `spinx new` CLI command. The install path is designed
to require zero manual steps beyond `spinx new my-app`.

```bash
spinx new my-app
cd my-app
spinx serve
```

What the installer does automatically:

- Detects host OS/architecture.
- Downloads the correct RoadRunner binary for that platform — no compiled
  extension needed for the default driver.
- Scaffolds `spinx.json` with sane defaults (RoadRunner driver, Vue
  frontend).

**Requirements:**
- PHP 8.2 or newer (Spinx uses typed properties, readonly properties, and
  enums throughout its own core).
- Node.js + npm/pnpm for the Vite/frontend pipeline.
- No compiled PHP extensions required for the default RoadRunner path.
- Swoole/OpenSwoole PECL extension only if opting into the Swoole driver
  (documented as a Docker/Linux deploy path).

> **What Could Go Wrong:** the Swoole driver is not supported natively on
> Windows. If your team develops on Windows and plans to deploy on Swoole,
> use the official Docker image for local development too, so you're not
> debugging platform-specific behavior differences for the first time in
> production.

---

## 3. Runtime Layer

### 3.1 The adapter contract

All application code interacts with Symfony's `HttpFoundation`
Request/Response objects only. Every runtime adapter implements the same
interface, so switching drivers never changes application-level behavior.

```
Spinx\Runtime\ServerAdapter
├── boot(): void
├── handle(Request): Response
└── shutdown(): void
```

### 3.2 RoadRunnerAdapter (default)

- Ships out of the box, zero manual install steps.
- Concurrency via a pool of persistent PHP worker processes managed by a
  Go supervisor binary.
- Works natively on Windows, Linux, macOS — no compiled PHP extension
  needed.
- Each worker runs normal, synchronous PHP — existing Composer packages
  work without modification.

### 3.3 SwooleAdapter (opt-in)

- Enabled via `spinx.json`:

```json
{ "driver": "swoole" }
```

- True coroutine-based concurrency, closest to Node's event loop.
- Requires the Swoole/OpenSwoole PECL extension — documented as a
  Docker/Linux deploy path.
- Official Docker image published alongside the framework for this path.

### 3.4 Switching drivers

```bash
spinx driver:swap swoole
```

Both adapters must pass an identical conformance test suite — same
Request/Response contract, same middleware pipeline behavior — so this
command is safe to run without a rewrite. Adapter selection is a config
value, never hardcoded into application code.

> **What Could Go Wrong:** Swoole's coroutine model only works if every
> blocking call in the request path is coroutine-aware. A normal blocking
> DB driver or HTTP client call under Swoole can freeze the entire worker
> process, not just one request. Spinx's own ORM and HTTP client are built
> coroutine-safe, but third-party Composer packages you add yourself may
> not be — verify before relying on them under the Swoole driver.

---

## 4. The Kernel

The kernel boots **once per process**, not per request:

- Compiles the Symfony DependencyInjection container (cached to disk).
- Loads and compiles route definitions (cached to array/PHP file).
- Registers module service providers.
- Provides a **request-scoped container**: a child container instantiated
  fresh per request, holding anything that must not leak state across
  coroutines (Swoole) or persist incorrectly across worker reuse
  (RoadRunner).

**Lifecycle hooks:** `onBoot`, `onRequest`, `onShutdown`, `onWorkerError`.

```php
$app = SpinxApp::boot();

$app->onRequest(function (Request $request) {
    // runs at the start of every request, before routing
});

$app->run();
```

> **What Could Go Wrong:** anything resolved from the app-level container
> (not the request-scoped child container) persists for the life of the
> worker process — potentially thousands of requests. Binding
> request-specific data (the current user, a request ID) at the app level
> instead of the request scope is the single most common source of
> cross-request state leaks.

---

## 5. State Safety Layer

Persistent-process runtimes reuse memory across requests, which is the
single biggest correctness risk in this architecture. Spinx addresses this
directly rather than leaving it to developer discipline alone.

### 5.1 Static analysis rule

A custom PHPStan/Psalm rule, shipped with the framework, flags any static
property or singleton-scoped service that holds mutable, request-derived
data. This runs in CI, not just locally.

### 5.2 `RequestScope` container wrapper

Automatically resets/reallocates request-scoped services at the start of
each request cycle.

```php
final class CurrentUser
{
    // Bound request-scoped — a fresh instance every request, discarded after.
}

$app->bind(CurrentUser::class)->requestScoped();
```

### 5.3 Safe-by-default generators

Every service generated via `spinx make:*` is scoped correctly by
default — request-scoped unless explicitly marked singleton. Getting this
wrong requires opting in, not opting out.

```bash
spinx make:service InvoicePricingService --singleton
```

> **What Could Go Wrong:** marking a service `--singleton` because it
> "feels expensive to construct" is the most common misuse of this flag.
> If the service touches request data anywhere — even indirectly through
> a dependency — it must stay request-scoped. Expensive construction is
> solved with caching inside a request-scoped service, not by making the
> service itself a singleton.

---

## 6. The Module System

This is the architectural core of Spinx. There is no bare
`app/Controllers` fallback — the kernel's autodiscovery only registers
services found inside the enforced module layout.

### 6.1 Scaffold

```bash
spinx make:module Billing
```

```
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
```

### 6.2 Rules enforced by the kernel

- Controllers may only exist under a module's
  `Infrastructure/Http/Controllers`.
- The Domain layer must have zero dependencies on Infrastructure or
  Application — enforced by the static analysis rule from §5.1.
- Repository interfaces live in Domain, implementations in Infrastructure
  — bound together in `module.php` via the DI container.
- Each module owns its own migrations, applied independently:

```bash
spinx module:migrate Billing
```

### 6.3 Module registry

`spinx.json` maintains a registry of active modules. Modules can be
toggled on/off without deletion — useful for feature-flagged or licensed
modules in commercial Spinx apps.

```json
{
  "modules": ["Billing", "Auth", "Catalog"]
}
```

> **What Could Go Wrong:** a common early mistake is putting a repository
> *interface* under `Infrastructure` because "that's where the concrete
> class will live too." The static analysis rule will fail the build —
> interfaces belong in `Domain/Repositories`, only implementations belong
> in `Infrastructure/Repositories`.

---

## 7. Routing

Routes are declared per module inside `module.php`, bound to controllers
under that module's `Infrastructure/Http/Controllers`.

```php
// app/Modules/Billing/module.php

Route::get('/invoices/{invoiceId}', [InvoiceController::class, 'show']);
Route::post('/invoices', [InvoiceController::class, 'store'])
    ->middleware('auth:session');
```

Route definitions are compiled once at boot into an array/PHP file cache
— they are never mutated after boot, eliminating a class of races between
concurrent workers.

---

## 8. Request & Response

All application code interacts with Symfony's `HttpFoundation` objects.
Handlers take `Request`, `Response` — everything after those two is
injected: validated parameters, dependencies, the request body.

```php
public function show(Request $request, string $invoiceId): Response
{
    return Response::json(['invoice_id' => $invoiceId]);
}
```

`Request` and `Response` objects are treated as immutable at the framework
boundary — middleware returns new instances rather than mutating shared
ones, which keeps request state impossible to leak across a worker's
lifetime by construction.

---

## 9. Middleware

Middleware — including auth gates — is declared directly on the route, not
assembled from separately maintained guard config.

```php
Route::get('/invoices/{invoiceId}', [InvoiceController::class, 'show'])
    ->middleware('auth:session');
```

Custom middleware lives under a module's
`Infrastructure/Http/Middleware/` and is registered in that module's
`module.php`.

```php
final class EnsureInvoiceOwner
{
    public function handle(Request $request, Closure $next): Response
    {
        // ...
        return $next($request);
    }
}
```

---

## 10. Validation

Request DTOs validate incoming data at the controller boundary — a
handler never runs against unvalidated input.

```php
final class CreateInvoiceRequest
{
    public function __construct(
        public readonly string $customerId,
        public readonly int $amountCents,
    ) {}
}
```

```php
public function store(Request $request, CreateInvoiceRequest $data): Response
{
    // $data is guaranteed valid by the time this line runs
}
```

---

## 11. Dependency Injection

Services are bound in a module's `module.php` and resolved per request
through a request-scoped child container (see §4, §5).

```php
// app/Modules/Billing/module.php

$app->bind(InvoiceRepository::class, EloquentInvoiceRepository::class);
$app->bind(InvoiceService::class)->requestScoped();
```

```php
final class InvoiceController
{
    public function __construct(
        private InvoiceService $invoices, // resolved automatically
    ) {}
}
```

---

## 12. Data Layer — The ORM

### 12.1 Foundation

Built on **Symfony DBAL**, explicitly **not** full Doctrine ORM —
Doctrine's UnitOfWork/proxy model is not coroutine-safe, which conflicts
directly with the Swoole driver. Spinx layers a custom fluent,
Eloquent-style API on top of DBAL's connection and schema abstraction.

### 12.2 Query builder

```php
Invoice::where('status', 'unpaid')
    ->whereIn('customer_id', $customerIds)
    ->with('customer')
    ->orderBy('created_at', 'desc')
    ->paginate(25);
```

Supported: `where`, `orWhere`, `whereIn`, `with` (eager loading),
`paginate`, `orderBy`, `groupBy`, `having`.

### 12.3 Relationships

```php
final class Invoice extends Record
{
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function lineItems(): HasMany
    {
        return $this->hasMany(LineItem::class);
    }
}
```

Supported: `hasOne`, `hasMany`, `belongsTo`, `belongsToMany`, and
polymorphic relations.

### 12.4 Migrations, seeders, factories

```bash
spinx make:migration create_invoices_table --module=Billing
spinx module:migrate Billing
```

Migrations, seeders, and factories are scoped per module (see §6.2) —
each module owns and runs its own schema history independently.

### 12.5 Model events and conventions

Model events/observers (`creating`, `created`, `updating`, etc.), soft
deletes, timestamps, and casts follow common Eloquent conventions.

### 12.6 Coroutine/worker safety

Connection pooling is implemented per runtime adapter:

- **RoadRunner:** a connection is reused per worker process and reset
  between requests.
- **Swoole:** a coroutine-aware connection pool checks connections out
  and back in per coroutine, avoiding cross-coroutine connection sharing.

> **What Could Go Wrong:** holding a `Record` instance (or its underlying
> connection) as a property on a singleton-scoped service is the fastest
> way to leak database state across requests. Always resolve models fresh
> within the request scope — never cache a model instance at the app
> level expecting it to represent "the current state" across requests.

---

## 13. Authentication

Auth gates are declared on the route and documented in the same place as
the route itself — no separate guard configuration to keep in sync with
what the route actually enforces.

```php
Route::post('/invoices', [InvoiceController::class, 'store'])
    ->middleware('auth:session');
```

Session- and token-based guards are both supported behind the same
`auth:*` middleware syntax, configured centrally in `spinx.json` and
resolved through the request-scoped container so authenticated user state
never persists past the request that resolved it.

---

## 14. Templating & Frontend Integration

### 14.1 Compilation model

Spinx renders through **Inertia**, not a template-engine-only view layer
— server-driven page rendering with shared props, no separate API layer
to keep in sync with the frontend it feeds.

```php
public function show(Request $request, string $invoiceId): Response
{
    return Inertia::render('Invoices/Show', [
        'invoice' => $this->invoices->find($invoiceId),
    ]);
}
```

### 14.2 Frontend adapters

- **Vue ships as the default** frontend, scaffolded automatically by
  `spinx new`.
- **React** is available via `spinx new --frontend=react`, using the same
  Inertia page-rendering contract with a different Vite plugin preset.
- Both integrate through a single Vite-based dev pipeline.

### 14.3 Hot Module Reload (HMR)

`spinx serve` boots the backend runtime (RoadRunner/Swoole) **and** the
Vite dev server concurrently, proxied through a single port. Frontend
changes hot-reload without a full page refresh; backend route/controller
changes trigger a worker reload (RoadRunner) or coroutine context refresh
(Swoole).

### 14.4 Production build

```bash
spinx build
```

Vite compiles and bundles frontend assets as static output. Static
assets are served directly by the PHP runtime adapter — no separate Node
process required in production.

---

## 15. Background Work — Queues & Scheduler

### 15.1 Queues

Anything that doesn't need to block the response goes on a queue, off the
worker, in one line.

```php
$app->queue()->push(new SendInvoiceEmail($invoiceId));
```

### 15.2 Scheduler

Set up once, register recurring jobs against the app, and the scheduler
manager runs it — no separate cron entry to drift out of sync with what
the code says.

```php
$app->scheduler()
    ->job(ReconcileInvoices::class)
    ->daily();
```

> **What Could Go Wrong:** queued jobs run on entirely separate worker
> processes from HTTP request workers. Any service resolved inside a job
> handler goes through its own fresh request-scoped container — do not
> assume a job can read state left behind by the HTTP request that
> queued it. Pass everything the job needs explicitly through the job's
> constructor.

---

## 16. CLI Reference

| Command | Purpose |
|---|---|
| `spinx new <project>` | Scaffold new app with enforced module dir, frontend, runtime config |
| `spinx make:module <Name>` | Generate full DDD module skeleton |
| `spinx make:controller <Module> <Name>` | Generate controller, module-scoped only |
| `spinx make:entity`, `make:service`, `make:repository` | Layer-scoped generators |
| `spinx serve` | Boot backend + Vite dev server with HMR |
| `spinx module:migrate <Name>` | Run a single module's migrations |
| `spinx preview --android \| --ios \| --desktop` | Launch native previewer |
| `spinx build` | Production build (frontend bundle + backend cache compile) |
| `spinx driver:swap <roadrunner\|swoole>` | Switch runtime driver |

---

## 17. Desktop & Mobile Previewer

Spinx does not reimplement emulators — it orchestrates existing native
tooling, the same pattern proven by Expo/React Native CLI.

```bash
spinx preview --android   # launches Android Emulator via ADB
spinx preview --ios       # launches iOS Simulator via Xcode tooling
spinx preview --desktop   # opens a native webview window via a Go-based shell
```

- `--android` requires the Android SDK installed on the host, points the
  emulator at the dev server with live reload.
- `--ios` requires macOS + Xcode — Apple's platform constraint, not
  Spinx's.
- `--desktop` opens a native webview window for quick desktop testing
  without a browser.

---

## 18. Mobile Compilation

### 18.1 Path A — Native shell wrapper (v1 scope, shippable)

Compiled Vue/React frontend assets wrapped in a **Go-built native shell**
(`gomobile` bindings or a WebView-wrapper approach — conceptually similar
to Capacitor/Tauri-mobile, but Go-based). The app communicates with the
Spinx backend over the network (REST/WebSocket). This is the committed v1
mobile story.

### 18.2 Path B — On-device PHP runtime (Phase 2, not committed for v1)

Would allow fully offline apps with PHP running on-device. The closest
existing building block is FrankenPHP (Go-based, embeds PHP via cgo) —
but cross-compiling cgo to iOS/Android is fragile, and Apple's App Store
review rules around embedded interpreters carry real approval risk.
**Requires a standalone feasibility spike before any commitment** — not
to be treated as a promised feature until that spike concludes
successfully.

---

## 19. Testing

Both runtime adapters must pass an identical conformance test suite — same
Request/Response contract, same middleware pipeline behavior — so tests
written against one driver hold true under the other.

A dev-mode leak detector (see the internal Worker Safety guide) runs
after every request in test/CI and fails loudly if:

- The request container still has reachable references after teardown.
- A DB connection was checked out but never returned.
- Output buffer depth differs from what it was pre-request.

This turns state-poisoning bugs into failing tests rather than production
incidents.

---

## 20. Packaging & Deployment

- Distributed as a Composer package.
- Post-install script detects host OS/architecture, downloads the correct
  RoadRunner binary automatically, and scaffolds `spinx.json` with sane
  defaults (RoadRunner driver, Vue frontend).
- Official Docker image published for the Swoole driver path.
- No manual extension compilation required for the default install path.
- Deploys require a graceful worker drain/restart (not a simple file
  swap) since workers are long-lived processes holding app state — see
  the Kernel section (§4) and the internal Worker Safety guide for the
  full mechanics.

---

## 21. Security

- Auth gates declared on the route (§13), not assembled from
  separately-maintained middleware stacks that can drift out of sync.
- Request-scoped state isolation (§5) prevents one user's authenticated
  session data from leaking into another request on a reused worker.
- Static analysis enforcement (§5.1, §6.2) catches unsafe singleton
  bindings and Domain/Infrastructure boundary violations before they ship.
- CSRF and CORS handling are provided as first-party middleware,
  configured centrally rather than assembled per project.

---

## 22. Comparison & Positioning

| Framework | Good at | Spinx difference |
|---|---|---|
| Laravel | Batteries-included web apps, mature ecosystem, Eloquent ORM | Spinx enforces DDD module structure at the kernel level and defaults to a persistent-process runtime instead of PHP-FPM |
| Symfony | Minimal-app style, routing, extension composition | Spinx provides a broader first-party product for validation, DI, auth, records, jobs, scheduling, and testing out of the box |
| Slim / Lumen | Lightweight APIs, minimal footprint | Spinx trades minimal footprint for enforced architecture, persistent-runtime performance, and first-party workloads |
| CodeIgniter | Low-overhead web apps and simple sites | Spinx builds a higher-end product architecture where DDD boundaries and coroutine/worker-safe state are considered from the start |

Spinx is a PHP framework for applications that don't need Laravel's full
weight but demand near-Node.js performance, zero-friction cross-platform
installation, and an enforced DDD architecture from the first command run
(see §1).

---

## 23. Roadmap & Known Risks

**Build order (MVP → V4):**

1. Kernel core — RoadRunner adapter, routing, DI container compilation
2. Enforced module system — `make:module`, autodiscovery restricted to
   DDD layout, module-scoped DI/routes/migrations
3. Request-scoped container / state safety layer
4. Templating & directive compiler + Vite/Vue HMR pipeline
5. Custom DBAL-based ORM — query builder, relationships, migrations
6. Full CLI generator set
7. Swoole adapter (opt-in driver, Docker image)
8. `spinx preview` orchestration (Android/iOS/desktop)
9. Go-based mobile shell compiler (Path A)
10. Docs + example apps (raw HTML, Vue, React reference implementations)
11. *(Phase 2, post-v1)* On-device PHP feasibility spike (Path B)

**Open risks:**

| Item | Risk | Notes |
|---|---|---|
| Static analysis DDD enforcement | Medium | Needs a custom PHPStan/Psalm rule set built from scratch |
| Coroutine-safe connection pooling under Swoole | Medium | Needs careful design to avoid cross-coroutine leaks |
| Go-based mobile shell maturity | Medium-High | Less battle-tested than Capacitor/Tauri; budget time for platform quirks |
| On-device PHP (Path B) | High | Explicitly deferred pending feasibility spike |
| Cross-OS RoadRunner binary distribution | Low | Well-trodden pattern (similar to how esbuild/swc ship binaries via npm) |

**Non-goals for v1:**

- Full Doctrine ORM support
- Shared hosting / traditional PHP-FPM as a primary deploy target
- Offline on-device PHP mobile apps
- Non-Vue/React frontend adapters (Svelte, Angular, etc. — future
  consideration, not v1)
