import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewTab } from '../types';
import {
  Search,
  Menu,
  X,
  ArrowRight,
  BookOpen,
  ChevronDown,
  Sparkles,
  BookMarked,
  Terminal,
  Info
} from 'lucide-react';
import { navigateTo } from '../lib/router';

interface NavbarProps {
  currentTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  onOpenSearch: () => void;
  onOpenPlayground: () => void;
  onOpenDocs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenSearch,
  onOpenPlayground,
  onOpenDocs,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [frameworkOpen, setFrameworkOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const resourcesTimer = useRef<NodeJS.Timeout | null>(null);
  const frameworkTimer = useRef<NodeJS.Timeout | null>(null);
  const aboutTimer = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setResourcesOpen(false);
        setFrameworkOpen(false);
        setAboutOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setResourcesOpen(false);
        setFrameworkOpen(false);
        setAboutOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (tab: ViewTab, path?: string) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
    setResourcesOpen(false);
    setFrameworkOpen(false);
    setAboutOpen(false);

    if (path) {
      navigateTo(path);
      return;
    }

    if (tab === 'playground') {
      onOpenPlayground();
    } else if (tab === 'docs') {
      navigateTo('/docs/introduction');
    } else if (tab === 'framework') {
      navigateTo('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const frameworkItems = [
    { title: 'Core Architecture', desc: 'Kernel boot, module isolation & request context', path: '/docs/architecture' },
    { title: 'RoadRunner & Swoole', desc: 'High-throughput async persistent worker runtimes', path: '/docs/architecture' },
    { title: 'Island Hydration', desc: 'Vue & React selective client island hydration', path: '/docs/inertia-setup' },
  ];

  const resourcesDropdownItems = [
    {
      title: 'Documentation',
      subtitle: 'Core architecture, installation & DDD guides',
      icon: <BookOpen size={16} className="text-[#E11D63]" />,
      path: '/docs/introduction',
    },
    {
      title: 'Guides',
      subtitle: 'Building multi-tenant SaaS & Stripe webhooks',
      icon: <BookMarked size={16} className="text-[#E11D63]" />,
      path: '/docs/guides/saas-quickstart',
    },
    {
      title: 'Examples',
      subtitle: 'High-throughput microservices & proxies',
      icon: <Sparkles size={16} className="text-[#E11D63]" />,
      path: '/docs/guides/microservice',
    },
    {
      title: 'API References',
      subtitle: 'CLI commands, spinx.json schema & parameters',
      icon: <Terminal size={16} className="text-[#E11D63]" />,
      path: '/docs/cli-reference',
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 pointer-events-none">
      <div className="max-w-[1000px] mx-auto pointer-events-auto">
        {/* Floating Capsule Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`mx-auto rounded-full transition-all duration-300 flex items-center justify-between px-4 sm:px-6 py-2 border ${
            scrolled
              ? 'bg-[#0E0E12]/95 border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl'
              : 'bg-[#111115]/90 border-white/10 shadow-xl backdrop-blur-md'
          }`}
          ref={dropdownRef}
        >
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('framework', '/')}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <img
              src="/logo.png"
              alt="Spinx Logo"
              className="w-7 h-7 rounded-full object-cover shadow-[0_0_12px_rgba(225,29,99,0.6)] group-hover:scale-105 transition-transform"
            />
            <span className="font-bold text-base md:text-lg tracking-tight text-white group-hover:text-[#ffb2bf] transition-colors">
              Spinx
            </span>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6">
            {/* Framework Menu */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (frameworkTimer.current) clearTimeout(frameworkTimer.current);
                setFrameworkOpen(true);
              }}
              onMouseLeave={() => {
                frameworkTimer.current = setTimeout(() => setFrameworkOpen(false), 150);
              }}
            >
              <button
                onClick={() => handleNavClick('framework', '/')}
                className={`font-sans text-xs md:text-sm font-medium transition-colors flex items-center gap-1 py-1.5 ${
                  currentTab === 'framework' ? 'text-white font-semibold' : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                <span>Framework</span>
                <ChevronDown size={13} className={`transition-transform ${frameworkOpen ? 'rotate-180 text-[#E11D63]' : ''}`} />
              </button>

              <AnimatePresence>
                {frameworkOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-72 rounded-xl bg-[#111115] border border-white/10 shadow-2xl p-3 z-50 backdrop-blur-xl"
                  >
                    <div className="space-y-1">
                      {frameworkItems.map((item) => (
                        <button
                          key={item.title}
                          onClick={() => handleNavClick('docs', item.path)}
                          className="w-full text-left p-2 rounded-lg hover:bg-white/5 transition-all group"
                        >
                          <div className="text-xs font-semibold text-white group-hover:text-[#ffb2bf]">{item.title}</div>
                          <div className="text-[11px] text-[#A1A1AA] mt-0.5">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (resourcesTimer.current) clearTimeout(resourcesTimer.current);
                setResourcesOpen(true);
              }}
              onMouseLeave={() => {
                resourcesTimer.current = setTimeout(() => setResourcesOpen(false), 150);
              }}
            >
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className={`font-sans text-xs md:text-sm font-medium transition-colors flex items-center gap-1 py-1.5 ${
                  currentTab === 'resources' || currentTab === 'docs'
                    ? 'text-white font-semibold'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                <span>Resources</span>
                <ChevronDown size={13} className={`transition-transform ${resourcesOpen ? 'rotate-180 text-[#E11D63]' : ''}`} />
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full -left-12 mt-2 w-80 rounded-xl bg-[#111115] border border-white/10 shadow-2xl p-2 z-50 backdrop-blur-xl"
                  >
                    <div className="px-3 py-1.5 border-b border-white/5 mb-1 font-mono-code text-[10px] uppercase tracking-wider text-[#A1A1AA]">
                      Documentation & Tools
                    </div>
                    <div className="space-y-1">
                      {resourcesDropdownItems.map((item) => (
                        <button
                          key={item.title}
                          onClick={() => handleNavClick('docs', item.path)}
                          className="w-full text-left p-2.5 rounded-lg hover:bg-white/5 transition-all group flex items-start gap-3"
                        >
                          <div className="p-1.5 rounded bg-white/5 border border-white/5 group-hover:border-[#E11D63]/40 group-hover:bg-[#E11D63]/10 transition-colors mt-0.5">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-[#e2e2e2] group-hover:text-[#ffb2bf]">{item.title}</div>
                            <div className="text-[11px] text-[#A1A1AA] leading-tight mt-0.5">{item.subtitle}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About Menu */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (aboutTimer.current) clearTimeout(aboutTimer.current);
                setAboutOpen(true);
              }}
              onMouseLeave={() => {
                aboutTimer.current = setTimeout(() => setAboutOpen(false), 150);
              }}
            >
              <button
                onClick={() => handleNavClick('docs', '/docs/introduction')}
                className="font-sans text-xs md:text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors flex items-center gap-1 py-1.5"
              >
                <span>About</span>
                <ChevronDown size={13} className={`transition-transform ${aboutOpen ? 'rotate-180 text-[#E11D63]' : ''}`} />
              </button>

              <AnimatePresence>
                {aboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-64 rounded-xl bg-[#111115] border border-white/10 shadow-2xl p-3 z-50 backdrop-blur-xl"
                  >
                    <div className="text-xs font-semibold text-white mb-1 flex items-center gap-1.5">
                      <Info size={14} className="text-[#E11D63]" />
                      <span>About Spinx</span>
                    </div>
                    <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                      A modern PHP application framework engineered for async persistent runtimes, domain-driven module boundaries, and zero-drift frontend integration.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSearch}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-[#A1A1AA] hover:text-white text-xs transition-all"
              title="Search documentation (Cmd+K)"
            >
              <Search size={13} className="text-[#E11D63]" />
              <span className="font-mono-code text-[11px]">Search</span>
              <kbd className="px-1 py-0.2 text-[9px] bg-black/40 border border-white/10 rounded font-mono-code text-[#A1A1AA]">
                ⌘K
              </kbd>
            </button>

            {/* Main "Get started" rounded button as seen in Hero image header */}
            <button
              onClick={onOpenPlayground}
              className="bg-white text-black hover:bg-gray-200 font-semibold px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-1.5 group"
            >
              <span>Get started</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#A1A1AA] hover:text-white rounded-full bg-white/5 border border-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="mt-2 md:hidden bg-[#111115] border border-white/10 rounded-2xl p-5 space-y-4 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex flex-col gap-3 font-mono-code text-xs">
                <button
                  onClick={() => handleNavClick('framework', '/')}
                  className="text-left py-2 border-b border-white/5 text-white font-semibold flex items-center justify-between"
                >
                  <span>Framework</span>
                  <ArrowRight size={12} className="text-[#E11D63]" />
                </button>

                <button
                  onClick={() => handleNavClick('playground')}
                  className="text-left py-2 border-b border-white/5 text-[#e2e2e2] flex items-center justify-between"
                >
                  <span>Playground</span>
                  <span className="text-[10px] bg-[#E11D63]/20 text-[#ffb2bf] px-2 py-0.5 rounded-full">
                    Interactive
                  </span>
                </button>

                <button
                  onClick={() => handleNavClick('docs', '/docs/introduction')}
                  className="text-left py-2 border-b border-white/5 text-[#e2e2e2] flex items-center justify-between"
                >
                  <span>Documentation</span>
                  <BookOpen size={12} className="text-[#E11D63]" />
                </button>
              </div>

              <div className="pt-1 flex flex-col gap-2">
                <button
                  onClick={onOpenSearch}
                  className="w-full py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono-code text-[#A1A1AA] flex items-center justify-center gap-2"
                >
                  <Search size={14} className="text-[#E11D63]" />
                  <span>Search Documentation</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
