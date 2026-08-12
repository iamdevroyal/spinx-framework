import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Check, Copy } from 'lucide-react';

interface CodePanelProps {
  title: string;
  code: string;
  language?: string;
  className?: string;
  showWindowControls?: boolean;
}

export const CodePanel: React.FC<CodePanelProps> = ({
  title,
  code,
  className = '',
  showWindowControls = true,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [copied, setCopied] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<number>(0);

  const lines = code.trim().split('\n');

  useEffect(() => {
    if (isInView) {
      let currentLine = 0;
      const interval = setInterval(() => {
        currentLine++;
        setDisplayedLines(currentLine);
        if (currentLine >= lines.length) {
          clearInterval(interval);
        }
      }, 35);
      return () => clearInterval(interval);
    }
  }, [isInView, lines.length]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper for basic syntax token rendering
  const renderHighlightedLine = (line: string, index: number) => {
    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
      return <span key={index} className="text-[#52525B] italic">{line}</span>;
    }

    // Process token colors for PHP/JSON/JS
    const parts = line.split(/(\b(?:namespace|use|class|public|function|private|return|new|class|use|implements|extends|static|protected|interface|abstract|switch|case|if|else|module|routes|service|repository|driver|run|queue|scheduler|daily|job|push|show|render|auth|middleware|show|find)\b|'[^']*'|"[^"]*"|\$[a-zA-Z0-9_]+|->|::|[{}]|\[|\])/g);

    return (
      <span key={index}>
        {parts.map((part, pIdx) => {
          if (!part) return null;
          if (/^(namespace|use|class|public|function|private|return|new|implements|extends|static|protected|interface|abstract|if|else)$/.test(part)) {
            return <span key={pIdx} className="text-[#E11D63] font-semibold">{part}</span>;
          }
          if (/^(\$[a-zA-Z0-9_]+)$/.test(part)) {
            return <span key={pIdx} className="text-[#ffb2bf]">{part}</span>;
          }
          if (/^(module|routes|service|repository|driver|run|queue|scheduler|daily|job|push|show|render|auth|middleware|find)$/.test(part)) {
            return <span key={pIdx} className="text-[#70dc8d]">{part}</span>;
          }
          if (/^('[^']*'|"[^"]*")$/.test(part)) {
            return <span key={pIdx} className="text-[#ff92ad]">{part}</span>;
          }
          if (part === '->' || part === '::') {
            return <span key={pIdx} className="text-[#aa888d]">{part}</span>;
          }
          return <span key={pIdx} className="text-[#e2e2e2]">{part}</span>;
        })}
      </span>
    );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-[#111113] border border-white/10 rounded-lg overflow-hidden group shadow-2xl ${className}`}
    >
      {/* Code Header */}
      <div className="bg-[#2a2a2a]/40 px-4 py-2.5 border-b border-white/10 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          {showWindowControls && (
            <div className="flex gap-1.5 mr-2">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-red-500/80 transition-colors" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-amber-500/80 transition-colors" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-emerald-500/80 transition-colors" />
            </div>
          )}
          <span className="font-mono-code text-xs text-[#A1A1AA] tracking-wide">{title}</span>
        </div>

        <button
          onClick={handleCopy}
          className="text-[#A1A1AA] hover:text-white p-1 rounded transition-colors flex items-center gap-1.5 text-xs font-mono-code"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={13} className="text-[#70dc8d]" />
              <span className="text-[#70dc8d]">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-5 font-mono-code text-[13px] md:text-sm leading-relaxed overflow-x-auto bg-[#0A0A0B]/80 text-[#e2e2e2]">
        <pre className="whitespace-pre">
          {lines.slice(0, isInView ? displayedLines : lines.length).map((line, idx) => (
            <div key={idx} className="flex hover:bg-white/[0.02] px-1 -mx-1 rounded transition-colors">
              <span className="select-none text-[#52525B] w-8 pr-4 text-right inline-block text-xs">
                {idx + 1}
              </span>
              <div className="flex-1">
                {renderHighlightedLine(line, idx)}
              </div>
            </div>
          ))}
          {isInView && displayedLines < lines.length && (
            <span className="inline-block w-2 h-4 bg-[#E11D63] ml-1 blink" />
          )}
        </pre>
      </div>
    </motion.div>
  );
};
