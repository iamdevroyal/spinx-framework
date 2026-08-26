import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Sparkles, Terminal, ArrowRight, Check, ShieldCheck, Database, Layers, Route, Layout, Cpu } from 'lucide-react';

interface AiBuilderSectionProps {
  onOpenDocs: () => void;
  onOpenPlayground: () => void;
}

export const AiBuilderSection: React.FC<AiBuilderSectionProps> = ({
  onOpenDocs,
  onOpenPlayground,
}) => {
  const [activeAgent, setActiveAgent] = useState<number>(0);

  const agents = [
    {
      name: 'Orchestrator',
      icon: <Bot className="w-5 h-5 text-[#E11D63]" />,
      role: 'Supervisor & Reasoning Engine',
      desc: 'Performs bidirectional inspection of frontend templates and sibling modules, clarifies ambiguities, and coordinates execution plans.',
      command: 'Ai::reason(...) & Ai::build(...)',
    },
    {
      name: 'Architect',
      icon: <Layers className="w-5 h-5 text-[#8B5CF6]" />,
      role: 'Pure Domain Architecture',
      desc: 'Crafts pure Domain Entities with business mutations and Repository Interfaces — zero DBAL or HTTP leaks.',
      command: 'Domain/Entities & Repositories/*Interface',
    },
    {
      name: 'Database',
      icon: <Database className="w-5 h-5 text-[#3B82F6]" />,
      role: 'Schema & DBAL Models',
      desc: 'Generates timestamped migrations with Blueprint and Active Record models with pre-compiled schema column caches.',
      command: 'spinx migrate & spinx schema:compile',
    },
    {
      name: 'Routing',
      icon: <Route className="w-5 h-5 text-[#10B981]" />,
      role: 'Multi-Action Controllers',
      desc: 'Wires multi-action controllers with Request::validate(), session CSRF, and Response::jsonSuccess envelopes.',
      command: 'module.php & Controllers/*Controller',
    },
    {
      name: 'Frontend',
      icon: <Layout className="w-5 h-5 text-[#F59E0B]" />,
      role: 'Views & Reactive Islands',
      desc: 'Designs responsive .spinx.html view templates with @csrf forms and dynamic @island hydration for Vue 3 / React 19.',
      command: 'Infrastructure/Views & @island',
    },
    {
      name: 'Security',
      icon: <ShieldCheck className="w-5 h-5 text-[#EC4899]" />,
      role: 'Guards, CSRF & Auth',
      desc: 'Enforces session fixation defenses, Argon2id hashing, and auth/guest middleware aliases.',
      command: 'AuthMiddleware & CsrfMiddleware',
    },
    {
      name: 'DevOps',
      icon: <Cpu className="w-5 h-5 text-[#06B6D4]" />,
      role: 'Workers & High-Throughput Caching',
      desc: 'Configures worker pool scaling, cache stores (File/Array/Redis), and background job queues.',
      command: 'Spinx\\Cache & Spinx\\Queue',
    },
  ];

  const terminalSteps = [
    {
      title: 'Step 1: Reasoning & Cross-Inspection',
      badge: 'ReasoningEngine',
      code: `[1/2 Reasoning & Blueprint] Inspecting project context...
  ✔ Inspected frontend: views/checkout.spinx.html (Detected amount, currency, email fields)
  ✔ Inspected sibling module: app/Modules/Auth (Reusing User entity & AuthMiddleware)
  ✔ Formulated zero-stub DDD blueprint with 0 syntax or boundary violations`,
    },
    {
      title: 'Step 2: Autonomous Multi-Agent Build',
      badge: 'Autonomous Execution',
      code: `[2/2 Multi-Agent Build] Executing specialized agents...
  ⚡ [architect] Created app/Modules/Billing/Domain/Entities/Subscription.php
  ⚡ [architect] Created app/Modules/Billing/Domain/Repositories/SubscriptionRepositoryInterface.php
  ⚡ [database]  Generated Persistence/Migrations/2026_08_08_000001_create_subscriptions_table.php
  ⚡ [routing]   Created Infrastructure/Http/Controllers/BillingController.php with Request::validate()
  ⚡ [frontend]  Crafted Infrastructure/Views/checkout.spinx.html with @csrf & @island
  ⚡ [security]  Wired auth & csrf middleware aliases in module.php
  ✔ CodeAnalyzer: 100% DDD compliance verified with 0 leaks`,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#09090C] border-y border-white/10 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[#E11D63]/8 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 font-mono-code text-xs font-semibold text-[#E11D63] bg-[#E11D63]/10 border border-[#E11D63]/20 px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles size={13} />
            <span>AI Framework Builder</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Build complete apps with an AI that knows the core.
          </h2>

          <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed">
            Unlike generic AI tools that guess folder structures or create fake stubs, the Spinx AI Builder reasons about your existing frontend views, sibling modules, and DDD invariants before generating production-grade code.
          </p>
        </div>

        {/* 2-Column Grid: Agent Tabs on Left, Live Terminal on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Agent Selector */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#A1A1AA] mb-4">
              Specialized Core Agents
            </h3>

            {agents.map((agent, idx) => {
              const isActive = activeAgent === idx;
              return (
                <button
                  key={agent.name}
                  onClick={() => setActiveAgent(idx)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 border ${
                    isActive
                      ? 'bg-[#111116] border-[#E11D63]/50 shadow-[0_0_20px_rgba(225,29,99,0.15)]'
                      : 'bg-[#0A0A0D] border-white/5 hover:border-white/15 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-white/5">{agent.icon}</div>
                      <span className="font-bold text-sm sm:text-base text-white">{agent.name} Agent</span>
                    </div>
                    <span className="font-mono-code text-[11px] text-[#A1A1AA] bg-white/5 px-2 py-0.5 rounded">
                      {agent.role}
                    </span>
                  </div>

                  <p className="text-xs text-[#A1A1AA] leading-relaxed pl-9">
                    {agent.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Interactive Terminal */}
          <div className="lg:col-span-7 sticky top-28 space-y-6">
            <div className="bg-[#0B0B0E] border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
              {/* Terminal Title Bar */}
              <div className="bg-[#141418] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#E11D63]/80" />
                    <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
                    <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
                  </div>
                  <span className="font-mono-code text-xs text-[#A1A1AA] flex items-center gap-1.5 ml-2">
                    <Terminal size={13} className="text-[#E11D63]" />
                    <span>spinx ai:build "Create Subscription Billing"</span>
                  </span>
                </div>

                <span className="font-mono-code text-[10px] text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">
                  SANDBOXED
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-5 sm:p-6 bg-[#060608] font-mono-code text-xs sm:text-[13px] leading-relaxed space-y-5 text-[#E4E4E7]">
                {terminalSteps.map((step, sIdx) => (
                  <div key={sIdx} className="space-y-2 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between text-[11px] text-[#ffb2bf]">
                      <span className="font-semibold">{step.title}</span>
                      <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-[#A1A1AA]">{step.badge}</span>
                    </div>
                    <pre className="text-[#D4D4D8] overflow-x-auto whitespace-pre leading-relaxed">
                      {step.code}
                    </pre>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#A1A1AA]">
                <Check size={14} className="text-[#10B981]" />
                <span>100% strict DDD compliance guaranteed</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={onOpenDocs}
                  className="text-xs font-mono-code text-[#E11D63] hover:text-white transition-colors flex items-center gap-1 font-semibold uppercase tracking-wider"
                >
                  <span>Read AI Docs</span>
                  <ArrowRight size={13} />
                </button>

                <button
                  onClick={onOpenPlayground}
                  className="bg-white text-black hover:bg-gray-200 text-xs font-semibold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5"
                >
                  <span>Interactive Terminal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
