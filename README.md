<p align="center">
  <a href="https://spinx.dev">
    <img src="public/logo.png" width="120" height="120" alt="Spinx Framework Logo" style="border-radius: 20px;">
  </a>
</p>

<h1 align="center">Spinx Framework</h1>

<p align="center">
  <strong>The Modern High-Performance PHP Framework for Persistent Workers, Enforced DDD Architecture, Universal Queues, Real-Time WebSockets, and Autonomous AI Generation.</strong>
</p>

<p align="center">
  <a href="https://github.com/iamdevroyal/spinxphp"><img src="https://img.shields.io/badge/release-v1.0.17-6366f1.svg?style=flat-square" alt="Version"></a>
  <a href="https://php.net"><img src="https://img.shields.io/badge/php-%3E%3D8.2-8b5cf6.svg?style=flat-square" alt="PHP Version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License"></a>
  <a href="https://github.com/iamdevroyal/spinxphp"><img src="https://img.shields.io/badge/tests-69%2F69%20passing-10b981.svg?style=flat-square" alt="Build Status"></a>
</p>

---

## ⚡ What is Spinx?

Spinx eliminates traditional PHP web server bottlenecks by hosting your application inside long-running persistent execution workers (**RoadRunner** out-of-the-box, **Swoole** opt-in). By eliminating per-request PHP-FPM bootstrap overhead, route matching, container reflection, and configuration objects stay warmed in RAM — delivering sub-millisecond response latencies and handling thousands of requests per second per node.

Spinx enforces strict **Domain-Driven Design (DDD) module boundaries**, includes an **autonomous 9-Agent AI Builder**, and natively supports **Priority Queues**, **Real-Time WebSockets**, **Multi-Disk Cloud Storage**, and **Semantic Vector Search (`pgvector`)**.

---

## 🔥 Key Subsystems & Features

- **🚀 Persistent-Process Runtime**: Zero per-request bootstrap overhead. RoadRunner Go-supervisor by default; Swoole coroutines opt-in.
- **🏛️ Enforced DDD Architecture**: Code lives strictly within `app/Modules/<Name>/{Domain, Application, Infrastructure}`.
- **⏳ Universal Priority Queues**: Multi-queue priority execution (`withPriority()`), delayed dispatching (`later()`), and HMAC cryptographic tampering defense.
- **📡 Real-Time WebSockets**: Native Pusher protocol driver (100% compatible with **Soketi**, **Pusher Cloud**, **Laravel Reverb**) and private channel auth routes.
- **📦 Multi-Disk Object Storage**: Seamless local and S3-compatible cloud storage (**AWS S3**, **Cloudflare R2**, **MinIO**, **Wasabi**) with temporary signed URLs.
- **🧠 Semantic Vector Search**: Integrated OpenAI and Ollama vector embeddings with PostgreSQL `pgvector` distance querying (`<=>`, `<->`, `<#>`).
- **🤖 Autonomous AI Builder**: 9-Agent autonomous engineering fleet (`Orchestrator`, `Architect`, `Async`, `StorageVector`, `Database`, `Routing`, `Frontend`, `Security`, `DevOps`) enforcing Spinx DDD invariants.
- **🔴 Centralized Redis Pooling**: Dedicated database connection pools for cache, sessions, and queues with distributed atomic rate limiting.
- **🛡️ Request-Scoped Memory Safety**: RequestScope container resets and coroutine isolation prevent memory leaks and state contamination.
- **🎨 Reactive Island Hydration**: Server-rendered HTML with selective client-side hydration islands (`@island`) for Vue 3 and React 19.

---

## 🚀 Quickstart & Installation

### Recommended — Global Installer

```bash
# 1. Install the global Spinx installer
composer global require spinxphp/installer

# 2. Create a new Spinx application (interactive wizard)
spinx new my-app

# 3. Enter project directory & start development
cd my-app
php spinx serve
```

**Frontend options:**
```bash
spinx new my-app --frontend=vue              # Vue 3 + Vite (default)
spinx new my-app --frontend=react            # React 19 + Vite
spinx new my-app --frontend=none             # API only (no frontend)
spinx new my-app --frontend=vue -n           # Non-interactive (CI/CD)
```

---

### Alternative — Direct Composer Install

```bash
composer create-project spinxphp/framework my-app
cd my-app
php spinx serve
```

---

## 💻 Technical Documentation

For in-depth architecture guides, API references, and interactive tutorials, visit the official documentation at [spinxphp.pages.dev/docs](https://spinxphp.pages.dev/docs) or view `framework/docs/`.
