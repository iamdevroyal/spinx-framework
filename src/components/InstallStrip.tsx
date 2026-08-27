import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Copy, Check, Terminal } from 'lucide-react';

interface InstallStripProps {
  onOpenPlayground: () => void;
  onOpenDocs: () => void;
}

export const InstallStrip: React.FC<InstallStripProps> = ({
  onOpenPlayground,
  onOpenDocs,
}) => {
  const [activeTab, setActiveTab] = useState<'cli' | 'composer' | 'docker'>('cli');
  const [copied, setCopied] = useState(false);

  const installCommands = {
    cli: `composer global require spinxphp/installer\nspinx new my-app --frontend=vue\ncd my-app\nphp spinx serve`,
    composer: `composer create-project spinxphp/framework my-app\ncd my-app\nphp spinx serve`,
    docker: `docker run -d -p 8080:8080 spinxphp/runtime:latest\ncurl http://localhost:8080/health`,
  };

  const commandText = installCommands[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 md:py-28 bg-[#0A0A0B]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0E0E12] border border-white/15 rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
        >
          {/* Left Text & CTA Buttons */}
          <div className="space-y-6 max-w-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Build the product.<br />
              <span className="text-[#E11D63]">Spinx handles the foundation.</span>
            </h2>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={onOpenPlayground}
                className="bg-white text-black hover:bg-gray-200 font-semibold font-mono-code text-xs uppercase tracking-wider px-6 py-3.5 rounded-full flex items-center gap-2 transition-all duration-200 shadow-md group"
              >
                <span>Get started</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenDocs}
                className="btn-secondary font-mono-code text-xs uppercase tracking-wider px-6 py-3.5 rounded-full font-semibold"
              >
                Read the documentation
              </button>
            </div>
          </div>

          {/* Code & Terminal Snippet block with tabs */}
          <div className="w-full lg:w-auto">
            <div className="bg-[#070709] border border-white/15 rounded-xl p-5 font-mono-code text-xs md:text-sm min-w-[320px] sm:min-w-[400px] relative shadow-2xl">
              {/* Tabs for Composer / CLI / Docker */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[#A1A1AA]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('cli')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono-code transition-colors ${
                      activeTab === 'cli' ? 'bg-[#E11D63]/20 text-white font-bold border border-[#E11D63]/40' : 'hover:text-white'
                    }`}
                  >
                    Global Installer
                  </button>
                  <button
                    onClick={() => setActiveTab('composer')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono-code transition-colors ${
                      activeTab === 'composer' ? 'bg-[#E11D63]/20 text-white font-bold border border-[#E11D63]/40' : 'hover:text-white'
                    }`}
                  >
                    Composer
                  </button>
                  <button
                    onClick={() => setActiveTab('docker')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono-code transition-colors ${
                      activeTab === 'docker' ? 'bg-[#E11D63]/20 text-white font-bold border border-[#E11D63]/40' : 'hover:text-white'
                    }`}
                  >
                    Docker
                  </button>
                </div>

                <button
                  onClick={handleCopy}
                  className="hover:text-white transition-colors flex items-center gap-1 text-xs"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-[#10B981]" />
                      <span className="text-[#10B981]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Shell output */}
              <div className="space-y-2 text-[#e2e2e2]">
                {commandText.split('\n').map((line, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="text-[#E11D63] font-bold mr-2 select-none">$</span>
                    <span className="text-[#e2e2e2]">{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
