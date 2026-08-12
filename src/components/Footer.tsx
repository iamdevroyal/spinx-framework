import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Mail } from 'lucide-react';

interface FooterProps {
  onOpenDocs: () => void;
  onOpenPlayground: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDocs, onOpenPlayground }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0A0A0B] text-[#A1A1AA] w-full pt-16 pb-12 border-t border-white/10 font-mono-code text-xs">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Docs Column */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#e2e2e2] text-sm uppercase tracking-wider">Docs</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={onOpenDocs} className="hover:text-[#E11D63] transition-colors text-left">
                  Documentation
                </button>
              </li>
              <li>
                <button onClick={onOpenDocs} className="hover:text-[#E11D63] transition-colors text-left">
                  Guides
                </button>
              </li>
              <li>
                <button onClick={onOpenDocs} className="hover:text-[#E11D63] transition-colors text-left">
                  Examples
                </button>
              </li>
              <li>
                <button onClick={onOpenDocs} className="hover:text-[#E11D63] transition-colors text-left">
                  API references
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#e2e2e2] text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#about" className="hover:text-[#E11D63] transition-colors">About</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E11D63] transition-colors">Contact</a>
              </li>
              <li>
                <a href="#careers" className="hover:text-[#E11D63] transition-colors">Careers</a>
              </li>
              <li>
                <a href="#team" className="hover:text-[#E11D63] transition-colors">Team</a>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#e2e2e2] text-sm uppercase tracking-wider">Community</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E11D63] transition-colors">
                  Contributing
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E11D63] transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E11D63] transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E11D63] transition-colors">
                  Twitter / X
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#e2e2e2] text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#license" className="hover:text-[#E11D63] transition-colors">
                  BSD 3-Clause License
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h4 className="font-bold text-[#e2e2e2] text-sm uppercase tracking-wider">
              Want to stay in touch?
            </h4>
            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-[#111113] border border-white/10 rounded px-3 py-2 text-xs text-[#e2e2e2] placeholder-[#52525B] focus:outline-none focus:border-[#E11D63] font-mono-code"
              />
              <button
                type="submit"
                className="btn-primary w-full py-2.5 rounded uppercase font-bold text-xs flex items-center justify-center gap-2"
              >
                {subscribed ? (
                  <>
                    <Check size={14} className="text-[#8cf9a6]" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#A1A1AA]">
          <div className="text-center md:text-left tracking-widest uppercase">
            RELEASED UNDER THE BSD 3-CLAUSE LICENSE | COPYRIGHT © 2024 SPINX
          </div>
          <div className="bg-[#111113] border border-white/10 rounded px-3 py-1 text-[#ffb2bf] select-all">
            spinx new spinx/spinx
          </div>
        </div>
      </div>
    </footer>
  );
};
