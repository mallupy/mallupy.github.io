import React, { useState } from 'react';
import { Coffee, Youtube, Heart, ChevronDown, ChevronUp, Sparkles, MessageSquare, ShieldCheck, Share2 } from 'lucide-react';
import { channelInfo, faqs } from '../data/channelData';

export default function SupportCommunity() {
  const [openFaq, setOpenFaq] = useState(0);
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
    <section id="support" className="py-16 md:py-24 relative bg-[#060B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Support Banner Card */}
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-[#0F1D2C] via-[#0D1824] to-[#0A131C] border border-yellow-400/20 shadow-2xl mb-16">
          {/* Background glow circle */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                <Coffee className="w-3.5 h-3.5 text-yellow-400" />
                <span>Fuel Free Malayalam Tech Education</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                Support <span className="text-yellow-400">Mallu. PY</span> on Buy Me a Coffee
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Creating high-quality Malayalam programming masterclasses, editing code walk-throughs, 
                and scripting deep-dive tech shorts takes hundreds of hours. If these tutorials helped you ace an interview, 
                clear your university exams, or build your first Python project, consider buying a coffee!
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={channelInfo.buyMeACoffeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 shadow-glow-yellow transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
                >
                  <Coffee className="w-5 h-5 fill-current" />
                  <span>Buy Me a Coffee (Support the Channel)</span>
                </a>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-3.5 rounded-xl font-medium text-slate-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 transition text-sm"
                >
                  <Share2 className="w-4 h-4 text-yellow-400" />
                  <span>{copiedLink ? "Link Copied!" : "Share Portfolio"}</span>
                </button>
              </div>
            </div>

            {/* Right Card Perks */}
            <div className="lg:col-span-4 bg-[#09111A]/90 border border-slate-800 p-6 rounded-2xl space-y-3.5 text-left">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-yellow-400">
                Community Perks
              </h3>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>100% of tutorials stay permanently free & ad-unrestricted for learners.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <Sparkles className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>Funding dedicated hardware & audio gear for crisper recording.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <Heart className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Supporters recognized in upcoming YouTube video descriptions.</span>
              </div>
            </div>

          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto text-left">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Everything you need to know about learning Python with Mallu. PY
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-slate-900/80 border border-slate-800/80 overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-slate-200 hover:text-yellow-400 transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-yellow-400 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

