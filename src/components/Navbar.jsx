import React, { useState } from 'react';
import { Youtube, Coffee, Code2, Play, Flame, Search, Menu, X, Sparkles, BookOpen } from 'lucide-react';
import { channelInfo } from '../data/channelData';

export default function Navbar({ onSearchClick, activeSection, scrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Python Zero2Hero", href: "#tutorials", icon: BookOpen },
    { name: "Tech Shorts", href: "#shorts", icon: Flame },
    { name: "Curriculum", href: "#roadmap", icon: Play },
    { name: "Playground", href: "#playground", icon: Code2 },
    { name: "About & Support", href: "#support", icon: Coffee },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#060B11]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Branding */}
          <a 
            href="#" 
            className="flex items-center gap-3 group"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="relative">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-amber-500 to-sky-500 shadow-glow-yellow transition-transform duration-300 group-hover:scale-105">
                <img 
                  src={channelInfo.profileImg} 
                  alt={channelInfo.name} 
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100'; }}
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#060B11]"></span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-display group-hover:text-yellow-400 transition-colors">
                  Mallu<span className="text-yellow-400">.</span>PY
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 rounded">
                  Malayalam
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono -mt-0.5 hidden xs:inline">
                {channelInfo.handle}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-yellow-400" />
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onSearchClick}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-slate-400 bg-slate-900/90 hover:bg-slate-800 hover:text-slate-200 border border-slate-800 rounded-lg transition-all"
              title="Search tutorials & shorts"
            >
              <Search className="w-3.5 h-3.5 text-yellow-400" />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-400">⌘K</kbd>
            </button>

            {/* Buy Me a Coffee */}
            <a
              href={channelInfo.buyMeACoffeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-all shadow-sm"
            >
              <Coffee className="w-3.5 h-3.5 text-yellow-400" />
              <span>Support</span>
            </a>

            {/* Subscribe YouTube Button */}
            <a
              href={channelInfo.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg shadow-md shadow-red-600/20 hover:shadow-red-600/40 transition-all"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>Subscribe</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0B121C]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800/80 rounded-lg transition-colors text-left"
              >
                <Icon className="w-4 h-4 text-yellow-400" />
                {link.name}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800/60 flex flex-col gap-2">
            <a
              href={channelInfo.buyMeACoffeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm font-medium text-amber-200 bg-amber-500/10 border border-amber-500/30 rounded-lg"
            >
              <Coffee className="w-4 h-4 text-yellow-400" />
              <span>Buy Me a Coffee (buymeacoffee.com/mallupy)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

