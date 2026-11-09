import React, { useState, useMemo } from 'react';
import { Flame, Play, Eye, Sparkles, ExternalLink, Search, ShieldAlert, KeyRound, Wrench, Clock, Bell } from 'lucide-react';
import { useData, isItemPublished, isItemVisibleOnPublic, formatDateTime } from '../context/DataContext';

export default function ShortsSection({ onPlayShort }) {
  const { shorts } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

  const categories = useMemo(() => {
    const visible = shorts.filter(isItemVisibleOnPublic);
    return [
      { name: 'All', icon: Sparkles, count: visible.length },
      { name: 'Programming Secrets', icon: KeyRound, count: visible.filter(s => s.category === 'Programming Secrets').length },
      { name: 'Ningal Pattikkapedukayan', icon: ShieldAlert, count: visible.filter(s => s.category === 'Ningal Pattikkapedukayan').length },
      { name: 'Code Hacks', icon: Wrench, count: visible.filter(s => s.category === 'Code Hacks').length },
    ];
  }, [shorts]);

  const filteredShorts = useMemo(() => {
    return shorts.filter(short => {
      if (!isItemVisibleOnPublic(short)) return false;
      if (activeCategory !== 'All' && short.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return short.title.toLowerCase().includes(q);
      }
      return true;
    });
  }, [shorts, activeCategory, searchQuery]);

  const displayedShorts = filteredShorts.slice(0, visibleCount);

  return (
    <section id="shorts" className="py-16 md:py-24 relative bg-[#060B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Byte-Sized Learning & Hacks</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Tech Secrets & <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Shorts</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
              Quick 60-second Malayalam breakdowns of programming truths, cybersecurity traps, Git tricks, and digital revelations.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shorts (e.g. Git, AI, Scam)..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-900/80 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-400/60 transition"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => { setActiveCategory(cat.name); setVisibleCount(12); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-lg shadow-orange-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Shorts Grid (Vertical 9:16 aspect cards) */}
        {filteredShorts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {displayedShorts.map((short) => {
                const isLive = isItemPublished(short);

                const handleClick = () => {
                  if (isLive) {
                    onPlayShort(short);
                  } else {
                    alert(`🔔 Upcoming Short: "${short.title}" is scheduled to drop on ${formatDateTime(short.publishDate)}! Check back then or follow on YouTube.`);
                  }
                };

                return (
                  <div
                    key={short.id}
                    className={`group relative rounded-2xl overflow-hidden bg-slate-900 border transition-all duration-300 flex flex-col cursor-pointer ${
                      !isLive
                        ? 'border-amber-500/40 hover:border-amber-400'
                        : 'border-slate-800/90 hover:border-orange-400/50 hover:shadow-xl hover:shadow-orange-500/10'
                    }`}
                    onClick={handleClick}
                  >
                    {/* Thumbnail with 9:16 aspect ratio */}
                    <div className="relative aspect-[9/16] w-full overflow-hidden bg-slate-950">
                      <img
                        src={short.thumbnail || `https://i.ytimg.com/vi/${short.id}/hqdefault.jpg`}
                        alt={short.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `https://i.ytimg.com/vi/${short.id}/hqdefault.jpg`;
                        }}
                      />

                      {/* Gradient shade */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30 group-hover:from-black/95 transition-all" />

                      {/* Series Pill Badge */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 flex-wrap">
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-black/60 text-orange-400 border border-orange-500/30 backdrop-blur-md line-clamp-1">
                          {short.category}
                        </span>
                        {!isLive && (
                          <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-amber-500 text-slate-950 shadow flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" /> Upcoming
                          </span>
                        )}
                      </div>

                      {/* Center Play / Bell Button on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform ${isLive ? 'bg-orange-500 text-white shadow-orange-500/50' : 'bg-amber-400 text-slate-950 shadow-amber-400/50'}`}>
                          {isLive ? (
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          ) : (
                            <Bell className="w-5 h-5 fill-current" />
                          )}
                        </div>
                      </div>

                      {/* Views & Title at bottom */}
                      <div className="absolute bottom-0 inset-x-0 p-3 text-left">
                        {isLive && short.views !== undefined && short.views !== null && (
                          <div className="flex items-center gap-1 text-[11px] font-mono text-orange-300 font-semibold mb-1">
                            <Eye className="w-3 h-3" />
                            <span>{Number(short.views).toLocaleString()} views</span>
                          </div>
                        )}
                        {!isLive && (
                          <div className="text-[10px] font-mono text-amber-300 mb-1 flex items-center gap-1">
                            <span>Premieres {formatDateTime(short.publishDate)}</span>
                          </div>
                        )}
                        <h4 className="text-xs font-semibold text-white line-clamp-2 leading-snug group-hover:text-orange-200 transition-colors">
                          {short.title}
                        </h4>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredShorts.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount(prev => prev + 12)}
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-700 hover:border-orange-400/50 hover:bg-slate-800 transition"
                >
                  Load More Shorts ({filteredShorts.length - visibleCount} more)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400">No shorts match your filter.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-3 text-xs text-orange-400 underline"
            >
              Reset Shorts Filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
