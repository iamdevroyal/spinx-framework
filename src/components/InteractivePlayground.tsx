import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Folder, FileCode, Copy, Check, Download, Play, Sliders } from 'lucide-react';
import { ConfigState } from '../types';
import { CodePanel } from './CodePanel';

interface InteractivePlaygroundProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({
  isOpen,
  onClose,
}) => {
  const [config, setConfig] = useState<ConfigState>({
    driver: 'roadrunner',
    frontend: 'vue',
    modules: ['Billing', 'Auth', 'Catalog'],
    database: 'pgsql',
  });

  const [activeTab, setActiveTab] = useState<'config' | 'bootstrap' | 'structure'>('config');
  const [copied, setCopied] = useState(false);
  const [newModuleName, setNewModuleName] = useState('');

  const toggleModule = (moduleName: string) => {
    setConfig((prev) => ({
      ...prev,
      modules: prev.modules.includes(moduleName)
        ? prev.modules.filter((m) => m !== moduleName)
        : [...prev.modules, moduleName],
    }));
  };

  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (newModuleName.trim() && !config.modules.includes(newModuleName.trim())) {
      setConfig((prev) => ({
        ...prev,
        modules: [...prev.modules, newModuleName.trim()],
      }));
      setNewModuleName('');
    }
  };

  const spinxJsonCode = JSON.stringify(
    {
      appName: 'Spinx App',
      driver: config.driver,
      frontend: config.frontend,
      modules: Object.fromEntries(config.modules.map(m => [m, true])),
    },
    null,
    2
  );

  const bootstrapAppCode = `<?php

declare(strict_types=1);

use Spinx\\Kernel\\Kernel;
use Symfony\\Component\\HttpFoundation\\Request;

// 1. Single kernel boot per worker process
$kernel = new Kernel(__DIR__);
$kernel->boot();

// 2. Discover & dispatch DDD modules (${config.modules.join(', ')})
// Driver: ${config.driver.toUpperCase()} | Frontend: ${config.frontend.toUpperCase()}
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();`;

  const handleCopy = () => {
    navigator.clipboard.writeText(spinxJsonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#0A0A0B] border border-white/10 rounded-xl w-full max-w-5xl overflow-hidden shadow-2xl my-8"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#111113] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#E11D63] flex items-center justify-center font-mono-code font-bold text-white text-xs">
              S
            </div>
            <div>
              <h2 className="font-bold text-[#e2e2e2] text-base flex items-center gap-2">
                Spinx Live Interactive Configurator
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#E11D63]/20 text-[#ffb2bf] font-mono-code border border-[#E11D63]/30">
                  spinx.json
                </span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#A1A1AA] hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Driver Selector */}
            <div className="space-y-2">
              <label className="font-mono-code text-xs uppercase text-[#A1A1AA] tracking-wider block">
                Runtime Driver
              </label>
              <div className="grid grid-cols-3 gap-2 font-mono-code text-xs">
                {(['roadrunner', 'swoole', 'workerman'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setConfig({ ...config, driver: d })}
                    className={`py-2 px-2 rounded border capitalize transition-all ${
                      config.driver === d
                        ? 'bg-[#E11D63] text-white border-[#E11D63] font-bold shadow-[0_0_10px_rgba(225,29,99,0.4)]'
                        : 'bg-[#111113] text-[#A1A1AA] border-white/10 hover:border-white/20'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Frontend Adapter */}
            <div className="space-y-2">
              <label className="font-mono-code text-xs uppercase text-[#A1A1AA] tracking-wider block">
                Frontend Pipeline
              </label>
              <div className="grid grid-cols-3 gap-2 font-mono-code text-xs">
                {(['vue', 'react', 'svelte'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setConfig({ ...config, frontend: f })}
                    className={`py-2 px-2 rounded border uppercase transition-all ${
                      config.frontend === f
                        ? 'bg-[#E11D63] text-white border-[#E11D63] font-bold shadow-[0_0_10px_rgba(225,29,99,0.4)]'
                        : 'bg-[#111113] text-[#A1A1AA] border-white/10 hover:border-white/20'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Database Connection */}
            <div className="space-y-2">
              <label className="font-mono-code text-xs uppercase text-[#A1A1AA] tracking-wider block">
                Database Engine
              </label>
              <div className="grid grid-cols-3 gap-2 font-mono-code text-xs">
                {(['pgsql', 'mysql', 'sqlite'] as const).map((db) => (
                  <button
                    key={db}
                    onClick={() => setConfig({ ...config, database: db })}
                    className={`py-2 px-2 rounded border uppercase transition-all ${
                      config.database === db
                        ? 'bg-[#E11D63] text-white border-[#E11D63] font-bold shadow-[0_0_10px_rgba(225,29,99,0.4)]'
                        : 'bg-[#111113] text-[#A1A1AA] border-white/10 hover:border-white/20'
                    }`}
                  >
                    {db}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Modules Toggle */}
            <div className="space-y-3">
              <label className="font-mono-code text-xs uppercase text-[#A1A1AA] tracking-wider block">
                Domain Modules
              </label>
              <div className="flex flex-wrap gap-2">
                {['Billing', 'Auth', 'Catalog', 'Notifications', 'Analytics'].map((m) => {
                  const active = config.modules.includes(m);
                  return (
                    <button
                      key={m}
                      onClick={() => toggleModule(m)}
                      className={`px-3 py-1.5 rounded-full font-mono-code text-xs border transition-all ${
                        active
                          ? 'bg-[#E11D63]/20 border-[#E11D63] text-[#ffb2bf] font-semibold'
                          : 'bg-[#111113] border-white/10 text-[#A1A1AA] hover:text-white'
                      }`}
                    >
                      {active ? '✓ ' : '+ '} {m}
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Module Form */}
              <form onSubmit={handleAddModule} className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={newModuleName}
                  onChange={(e) => setNewModuleName(e.target.value)}
                  placeholder="New module (e.g. Orders)"
                  className="bg-[#111113] border border-white/10 rounded px-3 py-1.5 text-xs text-[#e2e2e2] placeholder-[#52525B] focus:outline-none focus:border-[#E11D63] flex-1 font-mono-code"
                />
                <button
                  type="submit"
                  className="btn-primary px-3 py-1.5 rounded text-xs font-mono-code font-bold uppercase"
                >
                  Add
                </button>
              </form>
            </div>
          </div>

          {/* Right Live Preview Column */}
          <div className="lg:col-span-7 space-y-4">
            {/* Preview Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 font-mono-code text-xs">
              <button
                onClick={() => setActiveTab('config')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeTab === 'config'
                    ? 'bg-[#E11D63] text-white font-semibold'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                spinx.json
              </button>
              <button
                onClick={() => setActiveTab('bootstrap')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeTab === 'bootstrap'
                    ? 'bg-[#E11D63] text-white font-semibold'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                bootstrap/app.php
              </button>
              <button
                onClick={() => setActiveTab('structure')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeTab === 'structure'
                    ? 'bg-[#E11D63] text-white font-semibold'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                Project Structure
              </button>
            </div>

            {/* Code Output */}
            {activeTab === 'config' && (
              <CodePanel title="spinx.json" code={spinxJsonCode} language="json" />
            )}

            {activeTab === 'bootstrap' && (
              <CodePanel title="bootstrap/app.php" code={bootstrapAppCode} language="php" />
            )}

            {activeTab === 'structure' && (
              <div className="bg-[#111113] border border-white/10 rounded-lg p-5 font-mono-code text-xs text-[#e2e2e2] space-y-2 overflow-x-auto min-h-[300px]">
                <div className="text-[#A1A1AA] flex items-center gap-2">
                  <Folder size={14} className="text-[#E11D63]" /> my-spinx-app/
                </div>
                <div className="pl-4 space-y-1 text-[#A1A1AA]">
                  <div>├── spinx.json <span className="text-[#70dc8d]">(Configured: {config.driver} + {config.frontend})</span></div>
                  <div>├── bootstrap/</div>
                  <div className="pl-4">└── app.php</div>
                  <div>├── app/</div>
                  <div className="pl-4">
                    └── Modules/
                    {config.modules.map((m) => (
                      <div key={m} className="pl-4 text-[#ffb2bf]">
                        ├── {m}/
                        <div className="pl-4 text-[#52525B]">
                          ├── Application/ ({m}Service.php)
                          <br />
                          ├── Domain/ (Repositories)
                          <br />
                          └── Infrastructure/ (Http/Controllers)
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>├── resources/</div>
                  <div className="pl-4">
                    └── js/ <span className="text-[#70dc8d]">({config.frontend.toUpperCase()} SPA Pages)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleCopy}
                className="btn-secondary px-4 py-2 rounded text-xs font-mono-code uppercase flex items-center gap-2"
              >
                {copied ? <Check size={14} className="text-[#70dc8d]" /> : <Copy size={14} />}
                <span>{copied ? 'Copied Config' : 'Copy spinx.json'}</span>
              </button>

              <button
                onClick={() => {
                  const blob = new Blob([spinxJsonCode], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'spinx.json';
                  a.click();
                }}
                className="btn-primary px-4 py-2 rounded text-xs font-mono-code uppercase flex items-center gap-2 font-bold"
              >
                <Download size={14} />
                <span>Export spinx.json</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
