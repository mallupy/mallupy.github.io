import React from 'react';
import { useData, isItemPublished, isItemVisibleOnPublic, formatDateTime } from '../context/DataContext';
import { Layers, ChevronRight, CheckCircle, Code2, ArrowUpRight, Clock } from 'lucide-react';

export default function RoadmapSection({ onSelectPhase }) {
  const { roadmap } = useData();
  const visiblePhases = roadmap.filter(isItemVisibleOnPublic);

  return (
    <section id="roadmap" className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Structured Learning Pathway</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Python Zero to Hero: <span className="text-yellow-400">Curriculum Roadmap</span>
          </h2>
          <p className="mt-3 text-base text-slate-400">
            A carefully sequenced curriculum designed so anyone in Kerala can start from zero and develop deep algorithmic intuition.
          </p>
        </div>

        {/* Roadmap Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visiblePhases.map((phase) => {
            const isLive = isItemPublished(phase);

            return (
              <div
                key={phase.phase}
                className={`relative rounded-2xl p-6 bg-gradient-to-b ${phase.color || 'from-blue-500/20 to-cyan-500/10 border-blue-500/30'} border backdrop-blur-sm flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 group ${!isLive ? 'border-amber-500/40' : ''}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <span className={`px-2.5 py-1 text-xs font-mono font-bold rounded-md border ${phase.badgeColor || 'bg-blue-500/10 text-blue-400 border-blue-500/30'}`}>
                      {phase.days}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-semibold">
                      PHASE 0{phase.phase}
                    </span>
                  </div>

                  {!isLive && (
                    <div className="mb-3 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Premieres {formatDateTime(phase.publishDate)}</span>
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-yellow-300 transition-colors">
                    {phase.title.replace(`Phase ${phase.phase}: `, '')}
                  </h3>
                  
                  <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                    {phase.subtitle}
                  </p>

                  {/* Topics List */}
                  <div className="space-y-2 border-t border-slate-800/80 pt-4">
                    {(phase.topics || []).map((topic, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-yellow-400/80 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Link */}
                <div className="mt-6 pt-4 border-t border-slate-800/60">
                  <button
                    onClick={() => {
                      if (isLive) {
                        onSelectPhase(phase.phase);
                      } else {
                        alert(`🔔 Phase ${phase.phase} is scheduled to premiere on ${formatDateTime(phase.publishDate)}! Check back then.`);
                      }
                    }}
                    className="w-full flex items-center justify-between text-xs font-semibold text-slate-200 hover:text-yellow-400 transition-colors py-1 group/btn"
                  >
                    <span>{isLive ? `Explore Phase ${phase.phase} Episodes` : `Premieres Soon`}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-yellow-400" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Summary Banner */}
        <div className="mt-10 rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-slate-900/90 via-[#0F1A26] to-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0">
              <Code2 className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                All Masterclasses are completely free on YouTube!
              </p>
              <p className="text-xs text-slate-400">
                Track your progress on this site, mark videos as watched, and practice with our code snippets.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectPhase(null)}
            className="shrink-0 px-4 py-2 text-xs font-semibold text-slate-950 bg-yellow-400 hover:bg-yellow-300 rounded-lg transition"
          >
            View All Episodes
          </button>
        </div>

      </div>
    </section>
  );
}
