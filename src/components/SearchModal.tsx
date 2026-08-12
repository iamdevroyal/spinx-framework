import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, X, Terminal, BookOpen, Sparkles, Layers, Shield, ArrowRight } from 'lucide-react';
import { DOCS_DATA } from '../data/docsData';
import { navigateTo } from '../lib/router';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDocs: () => void;
  onOpenPlayground: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onOpenDocs,
  onOpenPlayground,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onOpenDocs();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onOpenDocs]);

  // Combine static tools with dynamic doc items from DOCS_DATA
  const staticItems = [
    {
      title: 'Interactive spinx.json Builder',
      category: 'Tool',
      subtitle: 'Config builder for RoadRunner & Swoole drivers',
      icon: <Sparkles size={14} className="text-[#E11D63]" />,
      action: onOpenPlayground,
    },
  ];

  const docItems = DOCS_DATA.map((doc) => ({
    title: doc.title,
    category: doc.category,
    subtitle: doc.subtitle,
    icon: <BookOpen size={14} className="text-[#E11D63]" />,
    action: () => navigateTo(doc.path),
  }));

  const allItems = [...staticItems, ...docItems];

  const filtered = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-[#0A0A0B] border border-white/10 rounded-xl w-full max-w-xl overflow-hidden shadow-2xl"
      >
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search size={18} className="text-[#E11D63]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, modules, architecture, or docs..."
            className="bg-transparent text-sm text-[#e2e2e2] placeholder-[#52525B] focus:outline-none w-full font-mono-code"
          />
          <button onClick={onClose} className="p-1 text-[#A1A1AA] hover:text-white">
            <X size={16} />
          </button>
        </div>

        <div className="p-2 space-y-1 max-h-96 overflow-y-auto custom-scrollbar">
          {filtered.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                item.action();
                onClose();
              }}
              className="w-full text-left p-3 rounded-lg font-mono-code text-xs flex items-center justify-between text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-3 truncate pr-2">
                <div className="p-1.5 rounded bg-white/5 border border-white/5 group-hover:border-[#E11D63]/30">
                  {item.icon}
                </div>
                <div className="truncate">
                  <div className="font-bold text-[#e2e2e2] group-hover:text-white group-hover:text-[#ffb2bf] transition-colors truncate">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-[#A1A1AA] truncate">{item.subtitle}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 uppercase">
                  {item.category}
                </span>
                <ArrowRight size={12} className="text-[#A1A1AA] group-hover:text-[#E11D63] transition-colors" />
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="p-6 text-center font-mono-code text-xs text-[#52525B]">
              No documentation articles or tools found for "{query}"
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

