import React, { useState, useEffect } from 'react';
import { Search, X, Play, BookOpen, Flame, ExternalLink, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function SearchModal({ isOpen, onClose, onSelectVideo, onSelectShort }) {
  const { longVideos, shorts } = useData();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all | long | shorts

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingLongVideos = longVideos.filter(v => {
    if (!q) return true;
    return v.title.toLowerCase().includes(q) ||
           (v.description || '').toLowerCase().includes(q) ||
           `day ${v.day}`.includes(q) ||
           (v.tags || []).some(t => t.toLowerCase().includes(q));
  });

  const matchingShorts = shorts.filter(s => {
    if (!q) return true;
    return s.title.toLowerCase().includes(q) ||
           (s.category || '').toLowerCase().includes(q);
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl rounded-2xl bg-[#0B121C] border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#0F1926]">
          <Search className="w-5 h-5 text-yellow-400 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all tutorials, Git hacks, loops, patterns, scams..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white mr-2">
              ✕
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono bg-slate-800 border border-slate-700 rounded text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800/80 bg-[#080E17] text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-md transition ${filterType === 'all' ? 'bg-yellow-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            All Results ({matchingLongVideos.length + matchingShorts.length})
          </button>
          <button
            onClick={() => setFilterType('long')}
            className={`px-3 py-1 rounded-md transition ${filterType === 'long' ? 'bg-yellow-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Zero to Hero ({matchingLongVideos.length})
          </button>
          <button
            onClick={() => setFilterType('shorts')}
            className={`px-3 py-1 rounded-md transition ${filterType === 'shorts' ? 'bg-yellow-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Shorts & Secrets ({matchingShorts.length})
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-4">
          
          {/* Long Videos Section */}
          {(filterType === 'all' || filterType === 'long') && matchingLongVideos.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-yellow-400 font-mono mb-2 px-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Python Masterclasses ({matchingLongVideos.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchingLongVideos.slice(0, 6).map((v) => (
                  <div
                    key={v.id}
                    onClick={() => { onSelectVideo(v); onClose(); }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/70 border border-transparent hover:border-slate-700 transition cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span className="shrink-0 px-2 py-0.5 text-xs font-mono font-bold bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 rounded">
                        DAY {v.day < 10 ? `0${v.day}` : v.day}
                      </span>
                      <div className="truncate">
                        <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-yellow-300 transition truncate">
                          {v.title}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          {v.category} • {v.duration}
                        </p>
                      </div>
                    </div>
                    <Play className="w-4 h-4 text-slate-500 group-hover:text-yellow-400 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shorts Section */}
          {(filterType === 'all' || filterType === 'shorts') && matchingShorts.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-400 font-mono mb-2 px-2">
                <Flame className="w-3.5 h-3.5" />
                <span>Tech Shorts & Secrets ({matchingShorts.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchingShorts.slice(0, 8).map((s) => (
                  <div
                    key={s.id}
                    onClick={() => { onSelectShort(s); onClose(); }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/70 border border-transparent hover:border-slate-700 transition cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        {s.category}
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-orange-300 transition truncate">
                        {s.title}
                      </p>
                    </div>
                    <Play className="w-4 h-4 text-slate-500 group-hover:text-orange-400 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {matchingLongVideos.length === 0 && matchingShorts.length === 0 && (
            <div className="text-center py-10 text-slate-500 text-xs sm:text-sm">
              No results found for "{query}". Try a different term like "loops", "git", or "day 4".
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
