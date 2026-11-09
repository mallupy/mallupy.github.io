import React, { useState, useMemo } from 'react';
import { Play, Check, ExternalLink, Search, Clock, Sparkles, Filter, CheckCircle2, RotateCcw, BookOpen, Calendar, Bell } from 'lucide-react';
import { useData, isItemPublished, isItemVisibleOnPublic, formatDateTime } from '../context/DataContext';

export default function LongVideosSection({ onPlayVideo, selectedPhase, onClearPhase }) {
  const { longVideos } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Stored watched videos in localStorage
  const [watchedList, setWatchedList] = useState(() => {
    try {
      const saved = localStorage.getItem('mallupy_watched_videos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleWatched = (id) => {
    setWatchedList((prev) => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('mallupy_watched_videos', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset your watched progress?")) {
      setWatchedList([]);
      localStorage.removeItem('mallupy_watched_videos');
    }
  };

  // Categories list
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(longVideos.filter(isItemVisibleOnPublic).map(v => v.category).filter(Boolean))];
    return cats;
  }, [longVideos]);

  // Filtered videos
  const filteredVideos = useMemo(() => {
    return longVideos.filter(video => {
      // Visibility filter: hide future scheduled items if showAsUpcoming is false
      if (!isItemVisibleOnPublic(video)) {
        return false;
      }

      // Phase filter
      if (selectedPhase) {
        if (selectedPhase === 1 && (video.day < 1 || video.day > 4)) return false;
        if (selectedPhase === 2 && (video.day < 5 || video.day > 7)) return false;
        if (selectedPhase === 3 && (video.day < 8 || video.day > 11)) return false;
        if (selectedPhase === 4 && (video.day < 12 || video.day > 16)) return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && video.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = video.title.toLowerCase().includes(q);
        const matchesDesc = (video.description || '').toLowerCase().includes(q);
        const matchesTag = (video.tags || []).some(t => t.toLowerCase().includes(q));
        const matchesDay = `day ${video.day}`.includes(q) || `part ${video.day}`.includes(q);
        return matchesTitle || matchesDesc || matchesTag || matchesDay;
      }

      return true;
    });
  }, [longVideos, selectedPhase, selectedCategory, searchQuery]);

  const watchedCount = watchedList.length;
  const progressPercent = longVideos.length > 0 ? Math.round((watchedCount / longVideos.length) * 100) : 0;

  return (
    <section id="tutorials" className="py-16 md:py-24 relative bg-[#070D14]">
      {/* Background radial accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-mono mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full Long-Form Series</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Python Zero to Hero <span className="text-yellow-400">Masterclasses</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
              16 in-depth Malayalam lessons taking you from complete beginner to problem-solving developer.
            </p>
          </div>

          {/* Progress Tracker Card */}
          <div className="w-full md:w-72 p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-sm shrink-0">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Your Learning Progress
              </span>
              <span className="font-mono text-yellow-400 font-bold">
                {watchedCount} / {longVideos.length} ({progressPercent}%)
              </span>
            </div>

            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>{progressPercent === 100 ? "🎉 Completed!" : `${Math.max(0, longVideos.length - watchedCount)} videos remaining`}</span>
              {watchedCount > 0 && (
                <button
                  onClick={resetProgress}
                  className="hover:text-red-400 flex items-center gap-1 transition"
                  title="Reset Progress"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Phase Filter Indicator if active */}
        {selectedPhase && (
          <div className="mb-6 p-3 rounded-lg bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-between text-xs sm:text-sm text-yellow-300">
            <div className="flex items-center gap-2">
              <span className="font-bold">Filtering by Phase {selectedPhase}</span>
              <span className="text-slate-400 hidden sm:inline">• Showing relevant days</span>
            </div>
            <button
              onClick={onClearPhase}
              className="px-2.5 py-1 text-xs bg-yellow-400 text-slate-950 font-semibold rounded hover:bg-yellow-300 transition"
            >
              Clear Phase Filter (Show All)
            </button>
          </div>
        )}

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-yellow-400 text-slate-950 shadow-glow-yellow font-semibold'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, day, or syntax..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-900/80 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-yellow-400/60 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Videos Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => {
              const isWatched = watchedList.includes(video.id);
              const isLive = isItemPublished(video);

              const handleActionClick = () => {
                if (isLive) {
                  onPlayVideo(video);
                } else {
                  alert(`🔔 Scheduled Premiere: "${video.title}" is scheduled to drop on ${formatDateTime(video.publishDate)}! Make sure to subscribe on YouTube @mallupy05 to get notified.`);
                }
              };

              return (
                <div
                  key={video.id}
                  className={`group relative rounded-2xl overflow-hidden bg-[#0C1521] border transition-all duration-300 flex flex-col justify-between ${
                    !isLive 
                      ? 'border-amber-500/30 bg-[#0E1520]'
                      : isWatched
                        ? 'border-emerald-500/40 bg-[#0A131B]'
                        : 'border-slate-800/90 hover:border-yellow-400/40 hover:shadow-card-dark'
                  }`}
                >
                  {/* Top Thumbnail Section */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img
                      src={video.thumbnail || `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = video.fallbackThumbnail || `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C1521] via-transparent to-black/40" />

                    {/* Day Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-1 text-xs font-mono font-bold bg-slate-950/90 text-yellow-400 border border-yellow-400/30 rounded-md backdrop-blur-md">
                        DAY {video.day < 10 ? `0${video.day}` : video.day}
                      </span>
                      {isLive && isWatched && (
                        <span className="px-2 py-1 text-[11px] font-semibold bg-emerald-500/90 text-slate-950 rounded-md flex items-center gap-1 shadow">
                          <Check className="w-3 h-3 stroke-[3]" /> Watched
                        </span>
                      )}
                      {!isLive && (
                        <span className="px-2.5 py-1 text-[11px] font-semibold bg-amber-500 text-slate-950 rounded-md flex items-center gap-1 shadow font-mono">
                          <Clock className="w-3 h-3" /> Upcoming
                        </span>
                      )}
                    </div>

                    {/* Duration / Schedule Badge */}
                    <div className="absolute top-3 right-3 px-2 py-0.5 text-xs font-mono text-slate-200 bg-slate-950/80 border border-slate-800 rounded backdrop-blur-md flex items-center gap-1">
                      {isLive ? (
                        <>
                          <Clock className="w-3 h-3 text-yellow-400" />
                          <span>{video.duration}</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-3 h-3 text-amber-400" />
                          <span className="text-amber-300">{formatDateTime(video.publishDate)}</span>
                        </>
                      )}
                    </div>

                    {/* Hover Play / Upcoming Button Trigger */}
                    <button
                      onClick={handleActionClick}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]"
                      aria-label={isLive ? "Play video" : "View premiere details"}
                    >
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300 ${isLive ? 'bg-yellow-400 text-slate-950 shadow-yellow-400/40' : 'bg-amber-400 text-slate-950 shadow-amber-400/40'}`}>
                        {isLive ? (
                          <Play className="w-6 h-6 fill-current ml-1" />
                        ) : (
                          <Bell className="w-6 h-6 fill-current" />
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category tag */}
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span className="text-yellow-400/90 font-mono font-medium">
                          {video.category}
                        </span>
                        <div className="flex items-center gap-1">
                          {(video.tags || []).slice(0, 2).map((t, idx) => (
                            <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={handleActionClick}
                        className="text-base font-bold text-slate-100 group-hover:text-yellow-300 transition-colors line-clamp-2 cursor-pointer mb-2"
                      >
                        {video.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                        {video.description}
                      </p>

                      {/* Key Takeaway Pill */}
                      {video.keyTakeaway && (
                        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-300 flex items-start gap-2 mb-4">
                          <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                          <span className="italic">{video.keyTakeaway}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Footer */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      {/* Play / Upcoming Button */}
                      <button
                        onClick={handleActionClick}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                          isLive
                            ? 'bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400 hover:text-slate-950 border-yellow-400/20'
                            : 'bg-amber-500/15 text-amber-300 hover:bg-amber-400 hover:text-slate-950 border-amber-500/30'
                        }`}
                      >
                        {isLive ? (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Watch Now</span>
                          </>
                        ) : (
                          <>
                            <Bell className="w-3.5 h-3.5" />
                            <span>Premieres Soon</span>
                          </>
                        )}
                      </button>

                      {/* Direct YouTube link */}
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition"
                        title="Open on YouTube"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      {/* Watched Toggle (only if live) */}
                      {isLive && (
                        <button
                          onClick={() => toggleWatched(video.id)}
                          className={`p-2 rounded-lg transition ${
                            isWatched 
                              ? 'text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20' 
                              : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                          }`}
                          title={isWatched ? "Mark as unwatched" : "Mark as watched"}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-300">No matching masterclasses found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try searching with different keywords like "loop", "day 1", or clear the filter.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); onClearPhase(); }}
              className="mt-4 px-4 py-2 text-xs font-medium text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded-lg hover:bg-yellow-400/20 transition"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
