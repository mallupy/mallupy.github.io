import React from 'react';
import { Youtube, Coffee, Heart, ArrowUp, Code2, Sparkles } from 'lucide-react';
import { channelInfo } from '../data/channelData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-[#04080D] relative text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-sky-500 shadow-glow-yellow">
                <img
                  src={channelInfo.profileImg}
                  alt={channelInfo.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-white font-display">
                  Mallu<span className="text-yellow-400">.</span> PY
                </span>
                <p className="text-xs text-yellow-400 font-mono">
                  {channelInfo.handle} • YouTube Channel
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering Kerala's student and developer community with high-quality, practical Python programming tutorials and tech awareness in Malayalam.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="px-2 py-1 rounded bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 text-[11px] font-mono">
                {channelInfo.malayalamTag}
              </span>
              <span className="px-2 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[11px] font-mono">
                Zero to Hero Series
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Curriculum & Content
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#tutorials" className="hover:text-yellow-400 transition">
                  Python Zero to Hero (16 Days)
                </a>
              </li>
              <li>
                <a href="#shorts" className="hover:text-yellow-400 transition">
                  Programming Secrets & Hacks
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-yellow-400 transition">
                  Full 4-Phase Curriculum
                </a>
              </li>
              <li>
                <a href="#playground" className="hover:text-yellow-400 transition">
                  Interactive Python Cheatsheet
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Support */}
          <div className="md:col-span-4 space-y-3 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Creator Channels
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={channelInfo.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-red-400 transition"
              >
                <Youtube className="w-4 h-4 text-red-500 fill-current" />
                <span>YouTube: youtube.com/@mallupy05</span>
              </a>
              <a
                href={channelInfo.buyMeACoffeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-yellow-400 transition"
              >
                <Coffee className="w-4 h-4 text-yellow-400" />
                <span>Support: buymeacoffee.com/mallupy</span>
              </a>
            </div>

            <div className="pt-3">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Mallu. PY. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" />
            <span>for Kerala's Coding Community</span>
          </p>
        </div>

      </div>
    </footer>
  );
}

