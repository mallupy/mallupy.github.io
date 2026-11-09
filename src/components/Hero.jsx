import React, { useState } from 'react';
import { Play, Sparkles, Youtube, CheckCircle2, Terminal, ArrowRight, Copy, Check, Code, Flame } from 'lucide-react';
import { channelInfo } from '../data/channelData';

export default function Hero({ onStartLearning, onExploreShorts, onWatchFeatured }) {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [outputVisible, setOutputVisible] = useState(true);

  const heroCode = `# Welcome to Mallu.PY!
channel = "Mallu. PY"
focus = ["Python Tutorials", "Tech Secrets", "Code Hacks"]
language = "Malayalam"

def start_journey(learner):
    print(f"നമസ്കാരം {learner}! Ready to code?")
    for item in focus:
        print(f" ✨ Mastering {item} in {language}")
    return "Zero -> Hero 🚀"

output = start_journey("Developer")`;

  const handleCopy = () => {
    navigator.clipboard.writeText(heroCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutputVisible(false);
    setTimeout(() => {
      setIsRunning(false);
      setOutputVisible(true);
    }, 400);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-yellow-500/10 via-sky-500/10 to-emerald-500/10 blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Creator Identity & Pitch */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-yellow-400/30 text-yellow-300 text-xs font-mono shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold">{channelInfo.tagline}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">{channelInfo.malayalamTag}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl p-1 bg-gradient-to-br from-yellow-400 via-amber-500 to-sky-500 shadow-glow-yellow transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={channelInfo.profileImg}
                      alt={channelInfo.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-slate-950 p-1 rounded-full border border-slate-700 shadow">
                    <Youtube className="w-4 h-4 text-red-500 fill-current" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-white">
                      Mallu<span className="text-yellow-400">.</span> PY
                    </h1>
                    <span className="inline-flex items-center text-sky-400" title="Verified Creator">
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 fill-sky-400/20" />
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-yellow-400/90 font-mono font-medium">
                    {channelInfo.handle} • YouTube Creator & Python Educator
                  </p>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 leading-tight pt-2">
                Master Python Programming & Tech Secrets in{" "}
                <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent underline decoration-yellow-400/30 underline-offset-8">
                  Malayalam
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              From absolute zero to writing real-world algorithms, pattern programs, and data structures. 
              Paired with eye-opening short-form tech facts, scam alerts, and developer hacks!
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={onStartLearning}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 shadow-glow-yellow transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base w-full sm:w-auto"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Zero2Hero Series</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreShorts}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 hover:text-white border border-slate-700/80 transition-all text-sm sm:text-base w-full sm:w-auto"
              >
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Watch Tech Shorts</span>
              </button>

              <a
                href={channelInfo.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-medium text-slate-300 hover:text-red-400 hover:bg-red-500/10 border border-slate-800 transition-all text-sm w-full sm:w-auto"
              >
                <Youtube className="w-4 h-4 text-red-500 fill-current" />
                <span>Visit Channel</span>
              </a>
            </div>

            {/* Quick Channel Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 w-full">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold font-mono text-yellow-400">16 Days</div>
                <div className="text-xs text-slate-400">Zero2Hero Bootcamp</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold font-mono text-sky-400">54+ Shorts</div>
                <div className="text-xs text-slate-400">Secrets & Hacks</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">100% Free</div>
                <div className="text-xs text-slate-400">Quality Malayalam Edu</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300">Hands-on</div>
                <div className="text-xs text-slate-400">Problem Solving</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Python Terminal Showcase */}
          <div className="lg:col-span-5 w-full">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              
              {/* Decorative terminal border glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 via-sky-500/20 to-emerald-500/20 rounded-2xl blur-lg opacity-75"></div>

              {/* Terminal Window */}
              <div className="relative rounded-2xl bg-[#090F17] border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
                
                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#0E1724] border-b border-slate-800/90">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                    <span className="ml-2 text-xs text-slate-400 font-sans font-medium flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-yellow-400" />
                      mallupy_intro.py
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
                      title="Copy code"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={handleRun}
                      disabled={isRunning}
                      className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-yellow-400 text-slate-950 hover:bg-yellow-300 active:scale-95 transition"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{isRunning ? "Running..." : "Run"}</span>
                    </button>
                  </div>
                </div>

                {/* Code Editor Body */}
                <div className="p-4 sm:p-5 text-slate-300 leading-relaxed overflow-x-auto">
                  <pre className="text-left">
                    <code>
                      <span className="text-slate-500"># Welcome to Mallu.PY!</span>{'\n'}
                      <span className="text-sky-400">channel</span> = <span className="text-emerald-300">"Mallu. PY"</span>{'\n'}
                      <span className="text-sky-400">focus</span> = [<span className="text-emerald-300">"Python Tutorials"</span>, <span className="text-emerald-300">"Tech Secrets"</span>]{'\n'}
                      <span className="text-sky-400">language</span> = <span className="text-emerald-300">"Malayalam"</span>{'\n\n'}
                      <span className="text-purple-400 font-semibold">def</span> <span className="text-yellow-300">start_journey</span>(learner):{'\n'}
                      {'    '}<span className="text-purple-400">print</span>(<span className="text-emerald-300">f"നമസ്കാരം {'{learner}'}! Ready to code?"</span>){'\n'}
                      {'    '}<span className="text-purple-400 font-semibold">for</span> item <span className="text-purple-400 font-semibold">in</span> focus:{'\n'}
                      {'        '}<span className="text-purple-400">print</span>(<span className="text-emerald-300">f" ✨ Mastering {'{item}'} in {'{language}'}"</span>){'\n'}
                      {'    '}<span className="text-purple-400 font-semibold">return</span> <span className="text-emerald-300">"Zero -&gt; Hero 🚀"</span>{'\n\n'}
                      <span className="text-sky-400">output</span> = <span className="text-yellow-300">start_journey</span>(<span className="text-emerald-300">"Developer"</span>)
                    </code>
                  </pre>
                </div>

                {/* Console Output Bar */}
                <div className="px-4 py-3 bg-[#060B12] border-t border-slate-800/90 text-left">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-mono">Output terminal (Python 3.12.0)</span>
                    <span className="text-emerald-400 flex items-center gap-1 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Success (0.02s)
                    </span>
                  </div>

                  {outputVisible && (
                    <div className="p-2.5 rounded bg-slate-950/80 border border-slate-900 text-slate-300 font-mono text-xs space-y-1">
                      <p className="text-yellow-300 font-semibold">നമസ്കാരം Developer! Ready to code?</p>
                      <p className="text-slate-300"> ✨ Mastering Python Tutorials in Malayalam</p>
                      <p className="text-slate-300"> ✨ Mastering Tech Secrets in Malayalam</p>
                      <p className="text-emerald-400 font-bold">&gt;&gt;&gt; Zero -&gt; Hero 🚀</p>
                    </div>
                  )}

                  {isRunning && (
                    <div className="py-2 text-yellow-400 text-xs animate-pulse">
                      Executing Python script...
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom Quick Feature Tag */}
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                  Includes interactive examples & interview questions
                </span>
                <span className="font-mono text-yellow-400/90">mallupy05</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

