import React, { useState } from 'react';
import { Github, ExternalLink, Copy, Check, Star, FolderGit2, Terminal, ArrowUpRight, GitFork, FileCode2 } from 'lucide-react';
import { channelInfo } from '../data/channelData';

export default function GithubNotesCard() {
  const [copiedClone, setCopiedClone] = useState(false);

  const cloneCommand = `git clone https://github.com/mallupy/Zero-2-Hero.git`;

  const handleCopyClone = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  return (
    <section className="py-10 md:py-14 relative bg-[#060B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section-level card — mirrors BuyMeCoffeeBanner layout */}
        <div className="relative rounded-3xl p-6 sm:p-10 md:p-12 overflow-hidden bg-gradient-to-br from-[#0D1A28] via-[#0B1420] to-[#081018] border border-slate-800/80 shadow-2xl shadow-black/30">

          {/* Ambient glow — subtle, matching site feel */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/[0.07] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-400/[0.05] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* ──────── Repo info & clone ──────── */}
            <div className="lg:col-span-12 space-y-5 text-left">

              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300 text-xs font-mono shadow-sm">
                <Github className="w-3.5 h-3.5 text-white" />
                <span className="font-semibold">Course Notes Repository</span>
                <span className="text-slate-600">|</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  Open Source
                </span>
              </div>

              {/* Headline */}
              <div>
                <a
                  href={channelInfo.githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5"
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight group-hover:text-yellow-400 transition-colors">
                    Zero-2-Hero <span className="text-yellow-400">Notes</span>
                  </h2>
                  <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-yellow-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <p className="mt-2.5 text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
                  Study notes, flowcharts, practice problems, and Python solutions for every day of the
                  <strong className="text-slate-200"> Python Zero to Hero</strong> masterclass series — all on GitHub.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={channelInfo.githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 shadow-glow-yellow transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
                >
                  <Github className="w-4.5 h-4.5" />
                  <span>Browse on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`${channelInfo.githubRepoUrl}/stargazers`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-slate-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 transition text-sm"
                >
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>Star Repo</span>
                </a>
              </div>

              {/* Clone terminal box */}
              <div className="mt-1">
                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#060B12] border border-slate-800/90 font-mono text-xs text-slate-300">
                  <div className="flex items-center gap-2.5 truncate pr-3">
                    <Terminal className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span className="text-slate-500">$</span>
                    <span className="truncate text-slate-300">{cloneCommand}</span>
                  </div>
                  <button
                    onClick={handleCopyClone}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5 shrink-0 text-[11px] font-medium"
                    title="Copy git clone command"
                  >
                    {copiedClone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedClone ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Repo highlights row */}
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" />
                  Python
                </span>
                <span className="flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-slate-500" />
                  15 lesson folders
                </span>
                <span className="flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5 text-slate-500" />
                  Notes + Solutions
                </span>
                <span className="flex items-center gap-1.5">
                  <GitFork className="w-3.5 h-3.5 text-slate-500" />
                  Fork & Learn
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
