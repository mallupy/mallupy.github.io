import React, { useState, useEffect, useMemo } from 'react';
import { Terminal, Play, Copy, Check, Sparkles, BookOpen, RotateCcw } from 'lucide-react';
import { useData, isItemVisibleOnPublic } from '../context/DataContext';

export default function InteractivePlayground() {
  const { snippets } = useData();
  const visibleSnippets = useMemo(() => snippets.filter(isItemVisibleOnPublic), [snippets]);

  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Sync index if snippets change
  useEffect(() => {
    if (visibleSnippets.length > 0) {
      if (activeSnippetIndex >= visibleSnippets.length) {
        setActiveSnippetIndex(0);
        setOutput(visibleSnippets[0].output);
      } else {
        setOutput(visibleSnippets[activeSnippetIndex].output);
      }
    } else {
      setOutput('');
    }
  }, [visibleSnippets, activeSnippetIndex]);

  if (!visibleSnippets || visibleSnippets.length === 0) {
    return null;
  }

  const activeSnippet = visibleSnippets[activeSnippetIndex] || visibleSnippets[0];

  const handleTabChange = (index) => {
    setActiveSnippetIndex(index);
    setOutput(snippets[index].output);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput("");
    setTimeout(() => {
      setIsRunning(false);
      setOutput(activeSnippet.output);
    }, 350);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-16 md:py-24 relative bg-[#070D14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive Code Snippets</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Python <span className="text-yellow-400">Playground</span> & Cheatsheet
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Experiment with essential Python concepts and algorithms taught across Mallu. PY episodes. Click run to execute!
          </p>
        </div>

        {/* Snippet Selector Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {visibleSnippets.map((s, idx) => (
            <button
              key={s.id || idx}
              onClick={() => handleTabChange(idx)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeSnippetIndex === idx
                  ? 'bg-yellow-400 text-slate-950 font-bold shadow-glow-yellow'
                  : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Playground Container */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-[#080E17] border border-slate-800/90 shadow-2xl overflow-hidden">
          
          {/* Top Bar */}
          <div className="px-5 py-3.5 bg-[#0D1622] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <span className="text-xs font-mono text-slate-300 font-medium">
                {activeSnippet.id}.py
              </span>
              {activeSnippet.series && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-yellow-400 border border-slate-700/60 hidden sm:inline-block">
                  {activeSnippet.series}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition"
                title="Copy code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
              </button>

              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 rounded-lg shadow transition active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? "Running..." : "Run Script"}</span>
              </button>
            </div>
          </div>

          {/* Code Window */}
          <div className="p-5 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto bg-[#070D14] border-b border-slate-800/80">
            <pre className="text-left leading-relaxed">
              <code>{activeSnippet.code}</code>
            </pre>
          </div>

          {/* Terminal Output */}
          <div className="p-4 sm:p-5 bg-[#05090F] font-mono text-xs text-left">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Console Output
              </span>
              <span className="text-emerald-400 font-mono">Python 3.12 (simulated)</span>
            </div>

            {isRunning ? (
              <div className="p-3 text-yellow-400 animate-pulse">
                [stdout] Executing {activeSnippet.id}.py...
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-black/60 border border-slate-900 text-emerald-400 whitespace-pre font-mono leading-relaxed overflow-x-auto">
                {output}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
