import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Terminal, Play, RotateCcw } from 'lucide-react';

interface TerminalPanelProps {
  className?: string;
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({ className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [step, setStep] = useState(0);
  const [customCommand, setCustomCommand] = useState('');
  const [extraLogs, setExtraLogs] = useState<string[]>([]);

  useEffect(() => {
    if (isInView && step === 0) {
      const timer1 = setTimeout(() => setStep(1), 600);
      const timer2 = setTimeout(() => setStep(2), 1400);
      const timer3 = setTimeout(() => setStep(3), 2200);
      const timer4 = setTimeout(() => setStep(4), 3000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [isInView, step]);

  const handleRunCommand = (cmd: string) => {
    const time = new Date().toLocaleTimeString();
    if (cmd.includes('serve')) {
      setExtraLogs((prev) => [
        ...prev,
        `$ ${cmd}`,
        `[${time}] Spinx HTTP server starting...`,
        `  ➜ Backend   http://localhost:8000  (RoadRunner v3.8)`,
        `  ➜ Frontend  http://localhost:5173  (Vite · Vue HMR)`,
        `✔ Kernel booted in 2.1ms [Memory: 4.2MB]`
      ]);
    } else if (cmd.includes('generate') || cmd.includes('module')) {
      setExtraLogs((prev) => [
        ...prev,
        `$ ${cmd}`,
        `[${time}] Creating module structure:`,
        `  + app/Modules/Billing/Infrastructure/Http/Controllers/`,
        `  + app/Modules/Billing/Application/Services/`,
        `  + app/Modules/Billing/Domain/Repositories/`,
        `✔ Module "Billing" registered in spinx.json`
      ]);
    } else if (cmd.includes('test')) {
      setExtraLogs((prev) => [
        ...prev,
        `$ ${cmd}`,
        `[${time}] Running Spinx Conformance Test Suite...`,
        `  PASS  Tests\\Feature\\RoadRunnerAdapterTest`,
        `  PASS  Tests\\Feature\\SwooleAdapterTest`,
        `  PASS  Tests\\Unit\\DependencyInjectionBoundaryTest`,
        `✔ 24 tests passed (102 assertions)`
      ]);
    } else {
      setExtraLogs((prev) => [
        ...prev,
        `$ ${cmd}`,
        `[${time}] Executed ${cmd} successfully.`
      ]);
    }
    setCustomCommand('');
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-[#111113] border border-white/10 rounded-lg overflow-hidden font-mono-code text-xs md:text-sm ${className}`}
    >
      <div className="bg-[#1b1b1b]/80 px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#E11D63]" />
          <span className="text-[#A1A1AA] text-xs font-semibold">spinx-cli v1.4.2</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setStep(0);
              setExtraLogs([]);
              setTimeout(() => setStep(1), 300);
            }}
            className="text-[#A1A1AA] hover:text-white transition-colors flex items-center gap-1 text-xs"
            title="Replay CLI"
          >
            <RotateCcw size={12} /> Replay
          </button>
        </div>
      </div>

      <div className="p-5 text-[#A1A1AA] space-y-2 bg-[#0A0A0B]/90 min-h-[180px]">
        {/* Step 1 */}
        {step >= 1 && (
          <div className="flex items-center gap-2">
            <span className="text-[#E11D63] font-bold">$</span>
            <span className="text-[#e2e2e2]">spinx new my-app</span>
          </div>
        )}

        {/* Step 2 */}
        {step >= 2 && (
          <div className="flex items-center gap-2">
            <span className="text-[#E11D63] font-bold">$</span>
            <span className="text-[#e2e2e2]">cd my-app</span>
          </div>
        )}

        {/* Step 3 */}
        {step >= 3 && (
          <div className="flex items-center gap-2">
            <span className="text-[#E11D63] font-bold">$</span>
            <span className="text-[#e2e2e2]">spinx serve</span>
          </div>
        )}

        {/* Step 4 Outputs */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="pt-2 space-y-1"
          >
            <div className="text-[#8cf9a6]">
              ➜ Backend &nbsp;&nbsp;<span className="underline">http://localhost:8000</span> &nbsp;<span className="text-[#52525B]">(RoadRunner)</span>
            </div>
            <div className="text-[#8cf9a6]">
              ➜ Frontend &nbsp;<span className="underline">http://localhost:5173</span> &nbsp;<span className="text-[#52525B]">(Vite · Vue HMR)</span>
              {extraLogs.length === 0 && <span className="inline-block w-2 h-4 bg-[#8cf9a6] ml-1.5 blink align-middle" />}
            </div>
          </motion.div>
        )}

        {/* Interactive Extra Logs */}
        {extraLogs.map((log, i) => (
          <div
            key={i}
            className={
              log.startsWith('$')
                ? 'text-[#e2e2e2] font-semibold pt-2'
                : log.includes('PASS') || log.includes('✔') || log.includes('➜')
                ? 'text-[#8cf9a6]'
                : 'text-[#A1A1AA] pl-3'
            }
          >
            {log}
          </div>
        ))}

        {/* User Input prompt */}
        {step >= 4 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (customCommand.trim()) {
                handleRunCommand(customCommand.trim());
              }
            }}
            className="flex items-center gap-2 pt-3 border-t border-white/5"
          >
            <span className="text-[#E11D63] font-bold">$</span>
            <input
              type="text"
              value={customCommand}
              onChange={(e) => setCustomCommand(e.target.value)}
              placeholder="Try 'spinx test', 'spinx serve', or 'spinx generate:module Billing'..."
              className="bg-transparent text-[#e2e2e2] placeholder-[#52525B] focus:outline-none flex-1 text-xs md:text-sm"
            />
            <button
              type="submit"
              className="text-[#E11D63] hover:text-white p-1 rounded transition-colors"
              title="Run command"
            >
              <Play size={13} />
            </button>
          </form>
        )}
      </div>

      {/* Preset Command Shortcuts */}
      <div className="px-4 py-2 bg-[#1b1b1b]/40 border-t border-white/5 flex flex-wrap gap-2 text-xs">
        <span className="text-[#52525B] text-[11px] self-center">Quick CLI:</span>
        <button
          onClick={() => handleRunCommand('spinx test')}
          className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#E11D63]/20 hover:text-[#ffb2bf] text-[#A1A1AA] transition-colors text-[11px]"
        >
          $ spinx test
        </button>
        <button
          onClick={() => handleRunCommand('spinx generate:module Billing')}
          className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#E11D63]/20 hover:text-[#ffb2bf] text-[#A1A1AA] transition-colors text-[11px]"
        >
          $ spinx generate:module Billing
        </button>
        <button
          onClick={() => handleRunCommand('spinx serve --driver=swoole')}
          className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#E11D63]/20 hover:text-[#ffb2bf] text-[#A1A1AA] transition-colors text-[11px]"
        >
          $ spinx serve --driver=swoole
        </button>
      </div>
    </motion.div>
  );
};
