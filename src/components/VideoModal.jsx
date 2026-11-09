import React, { useEffect } from 'react';
import { X, ExternalLink, Play, ChevronLeft, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function VideoModal({ video, isShort = false, onClose, onSelectVideo }) {
  const { longVideos } = useData();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  // For long videos, support next/prev navigation
  const currentIndex = !isShort ? longVideos.findIndex(v => v.id === video.id) : -1;
  const prevVideo = currentIndex > 0 ? longVideos[currentIndex - 1] : null;
  const nextVideo = currentIndex !== -1 && currentIndex < longVideos.length - 1 ? longVideos[currentIndex + 1] : null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`relative w-full rounded-2xl bg-[#0B121C] border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col ${
          isShort ? 'max-w-md max-h-[92vh]' : 'max-w-4xl max-h-[92vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0F1926] border-b border-slate-800">
          <div className="flex items-center gap-2 truncate pr-2">
            {!isShort && (
              <span className="px-2 py-0.5 text-xs font-mono font-bold bg-yellow-400 text-slate-950 rounded">
                DAY {video.day < 10 ? `0${video.day}` : video.day}
              </span>
            )}
            <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
              {video.title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={isShort ? `https://www.youtube.com/shorts/${video.id}` : `https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition"
              title="Open directly on YouTube"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Frame */}
        <div className={`relative w-full bg-black ${isShort ? 'aspect-[9/16] max-h-[65vh] mx-auto' : 'aspect-video'}`}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Video Details & Next/Prev Controls */}
        <div className="p-4 sm:p-5 overflow-y-auto max-h-52 bg-[#0B121C] text-left">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
              {video.title}
            </h3>
            {video.duration && (
              <span className="shrink-0 text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-yellow-400" />
                {video.duration}
              </span>
            )}
          </div>

          {video.description && (
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {video.description}
            </p>
          )}

          {video.keyTakeaway && (
            <div className="p-2.5 rounded-lg bg-yellow-400/5 border border-yellow-400/20 text-xs text-yellow-300">
              <span className="font-semibold text-yellow-400">Key Takeaway: </span>
              {video.keyTakeaway}
            </div>
          )}

          {/* Navigation for Long Videos */}
          {!isShort && (
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              {prevVideo ? (
                <button
                  onClick={() => onSelectVideo(prevVideo)}
                  className="flex items-center gap-1 text-xs text-slate-300 hover:text-yellow-400 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Day {prevVideo.day}: Prev Lesson</span>
                </button>
              ) : <div />}

              {nextVideo ? (
                <button
                  onClick={() => onSelectVideo(nextVideo)}
                  className="flex items-center gap-1 text-xs font-semibold text-yellow-400 hover:text-yellow-300 transition"
                >
                  <span>Day {nextVideo.day}: Next Lesson</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : <div />}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
