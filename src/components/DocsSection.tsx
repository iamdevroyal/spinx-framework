import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Search,
  ChevronDown,
  Terminal,
  Layers,
  Zap,
  Code,
  FileText,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Info,
  X,
  Share2,
  Check,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Hash,
  Menu,
  Table as TableIcon
} from 'lucide-react';
import { DOCS_DATA, DOC_CATEGORIES, DocArticle } from '../data/docsData';
import { CodePanel } from './CodePanel';
import { navigateTo } from '../lib/router';

interface DocsSectionProps {
  currentPath: string;
  onOpenSearch: () => void;
  onOpenPlayground: () => void;
}

export const DocsSection: React.FC<DocsSectionProps> = ({
  currentPath,
  onOpenSearch,
  onOpenPlayground,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [helpfulFeedback, setHelpfulFeedback] = useState<'yes' | 'no' | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Determine current active doc based on currentPath URL
  const activeArticle =
    DOCS_DATA.find((doc) => doc.path === currentPath || currentPath.startsWith(doc.path)) ||
    DOCS_DATA[0];

  // Find index for pagination
  const activeIndex = DOCS_DATA.findIndex((doc) => doc.id === activeArticle.id);
  const prevArticle = activeIndex > 0 ? DOCS_DATA[activeIndex - 1] : null;
  const nextArticle = activeIndex < DOCS_DATA.length - 1 ? DOCS_DATA[activeIndex + 1] : null;

  // Track active heading & scroll progress
  useEffect(() => {
    const handleScroll = () => {
      // Progress calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Heading scroll spy
      const headings = activeArticle.headings.map((h) => document.getElementById(h.id));
      const scrollPos = window.scrollY + 130;

      for (let i = headings.length - 1; i >= 0; i--) {
        const el = headings[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveHeadingId(activeArticle.headings[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeArticle]);

  const toggleCategory = (cat: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const handleDocClick = (path: string) => {
    navigateTo(path);
    setMobileSidebarOpen(false);
    setActiveHeadingId('');
    setHelpfulFeedback(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeadingClick = (headingId: string) => {
    setActiveHeadingId(headingId);
    const el = document.getElementById(headingId);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleCopyPageUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Filtered articles based on sidebar search input
  const filteredArticles = DOCS_DATA.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Getting Started':
        return <Terminal size={14} className="text-[#E11D63]" />;
      case 'Core Concepts':
        return <Layers size={14} className="text-[#E11D63]" />;
      case 'Backend & Services':
        return <Zap size={14} className="text-[#E11D63]" />;
      case 'Frontend & Islands':
      case 'Frontend & Inertia':
        return <Code size={14} className="text-[#E11D63]" />;
      case 'API & Reference':
        return <FileText size={14} className="text-[#E11D63]" />;
      case 'Guides & Examples':
        return <Sparkles size={14} className="text-[#E11D63]" />;
      default:
        return <BookOpen size={14} className="text-[#E11D63]" />;
    }
  };

  const renderCallout = (callout: { type: string; title: string; message: string }) => {
    let bg = 'bg-[#111115] border-white/10 text-[#e2e2e2]';
    let icon = <Info size={16} className="text-[#E11D63]" />;
    let titleColor = 'text-[#E11D63]';

    if (callout.type === 'warning') {
      bg = 'bg-amber-950/25 border-amber-500/40 text-amber-200';
      icon = <AlertTriangle size={16} className="text-amber-400" />;
      titleColor = 'text-amber-300';
    } else if (callout.type === 'performance') {
      bg = 'bg-emerald-950/25 border-emerald-500/40 text-emerald-200';
      icon = <Zap size={16} className="text-emerald-400" />;
      titleColor = 'text-emerald-300';
    } else if (callout.type === 'tip') {
      bg = 'bg-blue-950/25 border-blue-500/40 text-blue-200';
      icon = <Sparkles size={16} className="text-blue-400" />;
      titleColor = 'text-blue-300';
    }

    return (
      <div className={`p-4 rounded-xl border ${bg} my-6 space-y-1.5 shadow-lg`}>
        <div className="flex items-center gap-2 font-mono-code font-bold text-xs uppercase tracking-wider">
          {icon}
          <span className={titleColor}>{callout.title}</span>
        </div>
        <p className="text-xs md:text-sm leading-relaxed opacity-90 pl-6">
          {callout.message}
        </p>
      </div>
    );
  };

  // Helper component to render clean interactive table
  const renderTable = (headers: string[], rows: string[][]) => {
    return (
      <div className="my-6 overflow-hidden rounded-xl border border-white/15 shadow-2xl bg-[#0B0B0E]">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs md:text-sm border-collapse min-w-[550px]">
            <thead className="bg-[#141419] border-b border-white/10 font-mono-code text-xs uppercase tracking-wider text-[#ffb2bf]">
              <tr>
                {headers.map((header, idx) => (
                  <th key={idx} className="px-4 py-3.5 font-semibold border-r border-white/5 last:border-r-0">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-white/[0.04] transition-colors">
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`px-4 py-3.5 leading-relaxed border-r border-white/5 last:border-r-0 ${
                        cIdx === 0
                          ? 'font-bold text-white font-mono-code text-xs bg-white/[0.01]'
                          : cIdx === row.length - 1
                          ? 'text-[#e2e2e2] font-medium'
                          : 'text-[#A1A1AA]'
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Helper to parse content text and render any inline markdown pipes as tables
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    const tableLineIndices: number[] = [];

    lines.forEach((line, idx) => {
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        tableLineIndices.push(idx);
      }
    });

    if (tableLineIndices.length >= 2) {
      const parsedHeaders: string[] = [];
      const parsedRows: string[][] = [];

      lines.forEach((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
          if (trimmed.includes('---')) return; // Skip separator line
          const cells = trimmed
            .split('|')
            .map((c) => c.trim())
            .filter((c) => c.length > 0);

          if (parsedHeaders.length === 0) {
            parsedHeaders.push(...cells);
          } else {
            parsedRows.push(cells);
          }
        }
      });

      // Text lines without markdown table lines
      const nonTableText = lines
        .filter((line) => !(line.trim().startsWith('|') && line.trim().endsWith('|')))
        .join('\n')
        .trim();

      return (
        <div className="space-y-4">
          {nonTableText && (
            <div className="text-[#A1A1AA] text-sm md:text-base leading-relaxed whitespace-pre-line font-sans">
              {nonTableText}
            </div>
          )}
          {parsedHeaders.length > 0 && renderTable(parsedHeaders, parsedRows)}
        </div>
      );
    }

    return (
      <div className="text-[#A1A1AA] text-sm md:text-base leading-relaxed whitespace-pre-line font-sans">
        {content}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20 bg-[#0A0A0B]">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#E11D63] via-[#ffb2bf] to-[#E11D63] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Header Bar */}
        <div className="lg:hidden flex items-center justify-between p-3 mb-6 bg-[#111115] border border-white/10 rounded-xl">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="flex items-center gap-2 text-xs font-mono-code text-[#A1A1AA] hover:text-white"
          >
            <Menu size={18} className="text-[#E11D63]" />
            <span>Docs Navigation</span>
          </button>

          <span className="text-xs font-mono-code text-[#E11D63] font-semibold truncate max-w-[180px]">
            {activeArticle.title}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Navigation */}
          <aside
            className={`fixed inset-0 z-40 bg-[#0A0A0B]/95 backdrop-blur-xl p-6 overflow-y-auto lg:static lg:z-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none lg:col-span-3 transition-all duration-300 ${
              mobileSidebarOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <span className="font-mono-code font-bold text-sm text-white">Documentation</span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 text-[#A1A1AA] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="sticky top-24 space-y-6">
              {/* Quick Search Input */}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A1AA]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter documentation..."
                  className="w-full bg-[#111115] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-[#e2e2e2] placeholder-[#52525B] focus:outline-none focus:border-[#E11D63] font-mono-code transition-all"
                />
              </div>

              {/* Category Tree */}
              <div className="space-y-6">
                {DOC_CATEGORIES.map((category) => {
                  const categoryDocs = filteredArticles.filter((doc) => doc.category === category);
                  if (categoryDocs.length === 0) return null;

                  const isCollapsed = collapsedCategories[category];

                  return (
                    <div key={category} className="space-y-2">
                      <button
                        onClick={() => toggleCategory(category)}
                        className="w-full flex items-center justify-between font-mono-code text-xs uppercase tracking-wider text-[#A1A1AA] hover:text-white transition-colors text-left font-semibold py-1 border-b border-white/5"
                      >
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(category)}
                          <span>{category}</span>
                        </div>
                        <ChevronDown
                          size={12}
                          className={`transition-transform duration-200 ${isCollapsed ? '-rotate-90 text-[#A1A1AA]' : 'text-[#E11D63]'}`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {!isCollapsed && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-1 pl-2 border-l border-white/5"
                          >
                            {categoryDocs.map((doc) => {
                              const isActive = doc.id === activeArticle.id;
                              return (
                                <li key={doc.id}>
                                  <button
                                    onClick={() => handleDocClick(doc.path)}
                                    className={`w-full text-left py-1.5 px-2.5 rounded-lg text-xs font-mono-code transition-all flex items-center justify-between group ${
                                      isActive
                                        ? 'bg-[#E11D63]/15 text-white font-bold border border-[#E11D63]/30 shadow-[0_0_10px_rgba(225,29,99,0.2)]'
                                        : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                                    }`}
                                  >
                                    <span className="truncate">{doc.title}</span>
                                    {doc.badge && (
                                      <span className="text-[9px] bg-white/5 text-[#ffb2bf] px-1.5 py-0.2 rounded shrink-0">
                                        {doc.badge}
                                      </span>
                                    )}
                                  </button>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* CLI Interactive Builder Launcher */}
              <div className="p-3 rounded-xl bg-[#E11D63]/10 border border-[#E11D63]/20 space-y-2">
                <div className="flex items-center gap-1.5 font-mono-code text-xs text-[#ffb2bf] font-semibold">
                  <Sparkles size={13} />
                  <span>Interactive Playground</span>
                </div>
                <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                  Build custom <code className="text-[#ffb2bf]">spinx.json</code> manifests and test commands live.
                </p>
                <button
                  onClick={onOpenPlayground}
                  className="w-full py-1.5 rounded bg-[#E11D63] hover:bg-[#f4256f] text-white font-mono-code text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
                >
                  <span>Launch Playground</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </aside>

          {/* Main Article Content */}
          <main className="lg:col-span-6 space-y-8 min-w-0">
            {/* Header / Meta */}
            <div className="space-y-4 border-b border-white/10 pb-6">
              <div className="flex flex-wrap items-center gap-3 font-mono-code text-xs text-[#A1A1AA]">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E11D63]/15 border border-[#E11D63]/30 text-[#ffb2bf] uppercase tracking-wider font-semibold">
                  {activeArticle.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} className="text-[#E11D63]" />
                  <span>{activeArticle.readTime}</span>
                </span>
                <span>•</span>
                <span>{activeArticle.lastUpdated}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {activeArticle.title}
              </h1>

              <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed">
                {activeArticle.subtitle}
              </p>

              {/* Action bar: Share / Copy link */}
              <div className="flex items-center gap-3 pt-2 font-mono-code text-xs">
                <button
                  onClick={handleCopyPageUrl}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-[#A1A1AA] hover:text-white transition-all flex items-center gap-1.5"
                >
                  {copiedLink ? (
                    <>
                      <Check size={13} className="text-[#10B981]" />
                      <span className="text-[#10B981]">URL Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={13} />
                      <span>Share Article</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Render Article Sections */}
            <div className="space-y-12">
              {activeArticle.sections.map((section) => (
                <section key={section.headingId} id={section.headingId} className="space-y-4 scroll-mt-28">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2 group">
                    <span className="text-[#E11D63] text-lg opacity-60 group-hover:opacity-100 transition-opacity">#</span>
                    <span>{section.headingTitle}</span>
                  </h2>

                  {/* Render content text & formatted markdown tables */}
                  {renderFormattedContent(section.content)}

                  {/* Render explicit tableData if provided */}
                  {section.tableData && renderTable(section.tableData.headers, section.tableData.rows)}

                  {section.callout && renderCallout(section.callout)}

                  {section.codeSnippet && (
                    <div className="mt-4">
                      <CodePanel
                        title={section.codeSnippet.title}
                        code={section.codeSnippet.code}
                        language={section.codeSnippet.language}
                      />
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Helpful Feedback Widget */}
            <div className="p-6 rounded-2xl bg-[#111115] border border-white/10 space-y-4 my-10 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-sm">Was this documentation helpful?</h4>
                  <p className="text-xs text-[#A1A1AA]">Help us improve Spinx documentation and core guides.</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setHelpfulFeedback('yes')}
                    className={`px-4 py-2 rounded-lg text-xs font-mono-code transition-all flex items-center gap-2 ${
                      helpfulFeedback === 'yes'
                        ? 'bg-[#10B981]/20 border border-[#10B981] text-[#10B981] font-bold'
                        : 'bg-white/5 border border-white/10 hover:border-white/20 text-[#e2e2e2]'
                    }`}
                  >
                    <ThumbsUp size={13} />
                    <span>Yes</span>
                  </button>

                  <button
                    onClick={() => setHelpfulFeedback('no')}
                    className={`px-4 py-2 rounded-lg text-xs font-mono-code transition-all flex items-center gap-2 ${
                      helpfulFeedback === 'no'
                        ? 'bg-[#E11D63]/20 border border-[#E11D63] text-[#E11D63] font-bold'
                        : 'bg-white/5 border border-white/10 hover:border-white/20 text-[#e2e2e2]'
                    }`}
                  >
                    <ThumbsDown size={13} />
                    <span>No</span>
                  </button>
                </div>
              </div>

              {helpfulFeedback && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-[#ffb2bf] font-mono-code pt-2 border-t border-white/5"
                >
                  Thank you for your feedback! We continuously update our documentation.
                </motion.p>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10 font-mono-code text-xs">
              {prevArticle ? (
                <button
                  onClick={() => handleDocClick(prevArticle.path)}
                  className="p-4 rounded-xl bg-[#111115] border border-white/10 hover:border-[#E11D63]/50 transition-all text-left group space-y-1"
                >
                  <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider flex items-center gap-1">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Previous</span>
                  </div>
                  <div className="font-bold text-white group-hover:text-[#ffb2bf] transition-colors truncate">
                    {prevArticle.title}
                  </div>
                </button>
              ) : (
                <div />
              )}

              {nextArticle && (
                <button
                  onClick={() => handleDocClick(nextArticle.path)}
                  className="p-4 rounded-xl bg-[#111115] border border-white/10 hover:border-[#E11D63]/50 transition-all text-right group space-y-1 sm:col-start-2"
                >
                  <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider flex items-center justify-end gap-1">
                    <span>Next</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="font-bold text-white group-hover:text-[#ffb2bf] transition-colors truncate">
                    {nextArticle.title}
                  </div>
                </button>
              )}
            </div>
          </main>

          {/* Right Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6">
            <div className="p-4 rounded-xl bg-[#111115]/80 border border-white/10 space-y-3">
              <div className="font-mono-code text-xs uppercase tracking-wider text-white font-semibold flex items-center gap-2 pb-2 border-b border-white/5">
                <Hash size={13} className="text-[#E11D63]" />
                <span>On This Page</span>
              </div>

              <nav className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
                {activeArticle.headings.map((heading) => {
                  const isActive = activeHeadingId === heading.id;
                  return (
                    <button
                      key={heading.id}
                      onClick={() => handleHeadingClick(heading.id)}
                      className={`w-full text-left py-1 text-xs font-mono-code transition-all block truncate ${
                        heading.level === 3 ? 'pl-4 text-[11px]' : ''
                      } ${
                        isActive
                          ? 'text-[#E11D63] font-bold tracking-wide'
                          : 'text-[#A1A1AA] hover:text-white'
                      }`}
                    >
                      {heading.title}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
