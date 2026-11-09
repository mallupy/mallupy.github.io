import React, { useState } from 'react';
import { Coffee, Heart, Sparkles, ShieldCheck, Share2, ExternalLink } from 'lucide-react';
import { channelInfo } from '../data/channelData';

export default function BuyMeCoffeeBanner() {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Mallu. PY - Python Tutorials in Malayalam",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section id="support" className="py-8 sm:py-12 relative bg-[#060B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Support Banner Card */}
        <div className="relative rounded-3xl p-6 sm:p-10 md:p-12 overflow-hidden bg-gradient-to-br from-[#0F1E2E] via-[#0E1925] to-[#0A131C] border border-yellow-400/25 shadow-2xl shadow-yellow-500/5">
          
          {/* Background ambient radial glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono shadow-sm">
                <Coffee className="w-3.5 h-3.5 text-yellow-400" />
                <span className="font-semibold">Support Malayalam Tech Education</span>
                <span className="text-amber-500">|</span>
                <span className="text-amber-200/80">buymeacoffee.com/mallupy</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight">
                Fuel <span className="text-yellow-400">Mallu. PY</span> on Buy Me a Coffee
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Creating comprehensive, beginner-friendly Malayalam Python masterclasses and editing deep-dive tech shorts takes hundreds of hours of research and production. 
                If these lessons helped you learn programming, crack an interview, or build a project, your support keeps everything 100% free for Kerala's learners!
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={channelInfo.buyMeACoffeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 shadow-glow-yellow transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
                >
                  <Coffee className="w-5 h-5 fill-current" />
                  <span>Buy Me a Coffee</span>
                  <ExternalLink className="w-4 h-4 ml-0.5 text-slate-900" />
                </a>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-3.5 rounded-xl font-medium text-slate-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 transition text-sm"
                >
                  <Share2 className="w-4 h-4 text-yellow-400" />
                  <span>{copiedLink ? "Link Copied!" : "Share Website"}</span>
                </button>
              </div>
            </div>

            {/* Right Card: Impact & Perks */}
            <div className="lg:col-span-4 bg-[#081018]/90 border border-slate-800/90 p-6 rounded-2xl space-y-3.5 text-left backdrop-blur-sm">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-yellow-400">
                  How Your Coffee Helps
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-300 border border-yellow-400/20">
                  Community First
                </span>
              </div>
              
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">100% Free Forever:</strong> Zero paywalls, always accessible to every Malayalam student.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <Sparkles className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Better Hardware & Mic:</strong> Funding studio audio and crisp coding screencasts.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <Heart className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Shoutouts & Recognition:</strong> Top contributors featured in YouTube video credits.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

