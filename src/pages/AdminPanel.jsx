import React, { useState, useEffect } from 'react';
import {
  Lock, KeyRound, LogOut, ArrowLeft, Plus, Edit2, Trash2, Save,
  RotateCcw, Download, Upload, ExternalLink, Check, AlertCircle,
  Video, Flame, Map, Code2, Database, Eye, EyeOff, Sparkles, Layers,
  Terminal, Search, Calendar, Clock, Rocket
} from 'lucide-react';
import { useData, isItemPublished, formatDateTime } from '../context/DataContext';
import { channelInfo } from '../data/channelData';

export default function AdminPanel() {
  const {
    longVideos,
    shorts,
    roadmap,
    snippets,
    addLongVideo,
    updateLongVideo,
    deleteLongVideo,
    addShort,
    updateShort,
    deleteShort,
    addRoadmapPhase,
    updateRoadmapPhase,
    deleteRoadmapPhase,
    addCodeSnippet,
    updateCodeSnippet,
    deleteCodeSnippet,
    publishNow,
    resetToDefaults,
    exportDataJSON,
    importDataJSON,
    databaseStatus,
    databaseError,
    refreshFromDatabase,
  } = useData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('mallupy_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Tab & Filters
  const [activeTab, setActiveTab] = useState('videos'); // 'videos' | 'shorts' | 'roadmap' | 'snippets' | 'database'
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'published' | 'scheduled'

  // Modal State for Adding/Editing
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit'
  const [modalType, setModalType] = useState(null); // 'video' | 'short' | 'roadmap' | 'snippet'
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [importStatus, setImportStatus] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSavingContent, setIsSavingContent] = useState(false);

  // Hash Generator Helper for .env
  const [showHashTool, setShowHashTool] = useState(false);
  const [toolInput, setToolInput] = useState('');
  const [toolOutputHash, setToolOutputHash] = useState('');
  const [copiedHash, setCopiedHash] = useState(false);

  // SHA-256 Browser Hasher
  const computeSHA256 = async (str) => {
    const buffer = new TextEncoder().encode(str);
    const hashBuf = await crypto.subtle.digest('SHA-256', buffer);
    const hashArr = Array.from(new Uint8Array(hashBuf));
    return hashArr.map(b => b.toString(16).padStart(2, '0')).join('').toLowerCase();
  };

  useEffect(() => {
    if (toolInput) {
      computeSHA256(toolInput).then(h => setToolOutputHash(h));
    } else {
      setToolOutputHash('');
    }
  }, [toolInput]);

  // Check login: convert entered password to SHA-256 and compare with .env hash
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      setAuthError('Please enter your admin password.');
      return;
    }

    setIsVerifying(true);
    setAuthError('');

    try {
      const enteredHash = await computeSHA256(passwordInput.trim());

      const envHash = (import.meta.env.VITE_ADMIN_PASSWORD_HASH).trim().toLowerCase();
      const targetHash = envHash;

      if (enteredHash === targetHash) {
        setIsAuthenticated(true);
        sessionStorage.setItem('mallupy_admin_auth', 'true');
        setAuthError('');
      } else {
        setAuthError('Incorrect password! The SHA-256 hash does not match VITE_ADMIN_PASSWORD_HASH in .env.');
      }
    } catch (err) {
      setAuthError(`Hashing error: ${err.message}`);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('mallupy_admin_auth');
    setPasswordInput('');
  };

  // Open Modal for Add
  const openAddModal = (type) => {
    setModalType(type);
    setModalMode('add');
    const defaultUpcomingDate = new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 16);

    if (type === 'video') {
      const nextDay = longVideos.length > 0 ? Math.max(...longVideos.map(v => v.day || 0)) + 1 : 1;
      setFormData({
        id: '',
        day: nextDay,
        title: '',
        description: '',
        duration: '20:00',
        category: 'Problem Solving',
        tags: 'Python, Malayalam',
        keyTakeaway: '',
        isScheduled: false,
        publishDate: defaultUpcomingDate,
        showAsUpcoming: true,
      });
    } else if (type === 'short') {
      setFormData({
        id: '',
        title: '',
        category: 'Programming Secrets',
        views: 0,
        isScheduled: false,
        publishDate: defaultUpcomingDate,
        showAsUpcoming: true,
      });
    } else if (type === 'roadmap') {
      const nextPhase = roadmap.length > 0 ? Math.max(...roadmap.map(r => r.phase || 0)) + 1 : 1;
      setFormData({
        phase: nextPhase,
        title: `Phase ${nextPhase}: Advanced Concepts`,
        subtitle: 'Mastering new programming frontiers',
        days: `Days ${nextPhase * 4 - 3} - ${nextPhase * 4}`,
        topics: 'Topic 1, Topic 2, Topic 3',
        color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
        isScheduled: false,
        publishDate: defaultUpcomingDate,
        showAsUpcoming: true,
      });
    } else if (type === 'snippet') {
      setFormData({
        id: `snippet-${Date.now().toString().slice(-4)}`,
        title: 'New Python Concept',
        category: 'Core Python',
        series: 'Code Hacks',
        code: '# Write Python code here\nprint("Hello from Mallu.PY!")',
        output: 'Hello from Mallu.PY!',
        isScheduled: false,
        publishDate: defaultUpcomingDate,
        showAsUpcoming: true,
      });
    }
  };

  // Open Modal for Edit
  const openEditModal = (type, item) => {
    setModalType(type);
    setModalMode('edit');
    setEditingItem(item);

    const isScheduled = !!item.publishDate && !isItemPublished(item);
    const publishDateVal = item.publishDate ? new Date(item.publishDate).toISOString().slice(0, 16) : '';

    if (type === 'video') {
      setFormData({
        ...item,
        tags: Array.isArray(item.tags) ? item.tags.join(', ') : (item.tags || ''),
        isScheduled,
        publishDate: publishDateVal,
        showAsUpcoming: item.showAsUpcoming !== false,
      });
    } else if (type === 'roadmap') {
      setFormData({
        ...item,
        topics: Array.isArray(item.topics) ? item.topics.join(', ') : (item.topics || ''),
        isScheduled,
        publishDate: publishDateVal,
        showAsUpcoming: item.showAsUpcoming !== false,
      });
    } else {
      setFormData({
        ...item,
        isScheduled,
        publishDate: publishDateVal,
        showAsUpcoming: item.showAsUpcoming !== false,
      });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setModalMode(null);
    setEditingItem(null);
    setFormData({});
  };

  // Submit Modal
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSavingContent(true);
    let saved = true;

    const publishDate = formData.isScheduled && formData.publishDate ? new Date(formData.publishDate).toISOString() : null;
    const showAsUpcoming = formData.showAsUpcoming !== false;

    if (modalType === 'video') {
      const vidId = formData.id.trim();
      const payload = {
        ...formData,
        id: vidId,
        day: Number(formData.day),
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : formData.tags,
        thumbnail: `https://i.ytimg.com/vi/${vidId}/maxresdefault.jpg`,
        fallbackThumbnail: `https://i.ytimg.com/vi/${vidId}/hqdefault.jpg`,
        publishDate,
        showAsUpcoming,
      };

      if (modalMode === 'add') {
        if (!vidId) { setIsSavingContent(false); return alert('Please enter a YouTube video ID'); }
        saved = await addLongVideo(payload);
      } else {
        saved = await updateLongVideo(editingItem.id, payload);
      }
    } else if (modalType === 'short') {
      const shortId = formData.id.trim();
      const payload = {
        ...formData,
        id: shortId,
        views: Number(formData.views) || 0,
        thumbnail: `https://i.ytimg.com/vi/${shortId}/hqdefault.jpg`,
        publishDate,
        showAsUpcoming,
      };

      if (modalMode === 'add') {
        if (!shortId) { setIsSavingContent(false); return alert('Please enter a YouTube short ID'); }
        saved = await addShort(payload);
      } else {
        saved = await updateShort(editingItem.id, payload);
      }
    } else if (modalType === 'roadmap') {
      const payload = {
        ...formData,
        phase: Number(formData.phase),
        topics: typeof formData.topics === 'string' ? formData.topics.split(',').map(t => t.trim()).filter(Boolean) : formData.topics,
        publishDate,
        showAsUpcoming,
      };

      if (modalMode === 'add') {
        saved = await addRoadmapPhase(payload);
      } else {
        saved = await updateRoadmapPhase(editingItem.phase, payload);
      }
    } else if (modalType === 'snippet') {
      const payload = {
        ...formData,
        publishDate,
        showAsUpcoming,
      };

      if (modalMode === 'add') {
        saved = await addCodeSnippet(payload);
      } else {
        saved = await updateCodeSnippet(editingItem.id, payload);
      }
    }

    setIsSavingContent(false);
    if (saved) closeModal();
  };

  // Handle JSON Import
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const res = importDataJSON(content);
        setImportStatus(res);
        setTimeout(() => setImportStatus(null), 4000);
      }
    };
    reader.readAsText(file);
  };

  // Filter helper based on statusFilter
  const matchesStatus = (item) => {
    if (statusFilter === 'all') return true;
    const isLive = isItemPublished(item);
    if (statusFilter === 'published') return isLive;
    if (statusFilter === 'scheduled') return !isLive;
    return true;
  };

  // --- Render Login Screen if unauthenticated ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060B11] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#0C1521] border border-slate-800 shadow-2xl relative text-left">

          <div className="flex items-center justify-between mb-6">
            <a
              href="/"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-yellow-400 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </a>
            <span className="text-xs font-mono text-yellow-400 font-bold bg-yellow-400/10 px-2.5 py-0.5 rounded border border-yellow-400/20">
              Admin Portal
            </span>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl p-1 bg-gradient-to-tr from-yellow-400 to-sky-500 mx-auto shadow-glow-yellow mb-3">
              <img
                src={channelInfo.profileImg}
                alt={channelInfo.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <h1 className="text-2xl font-bold text-white font-display">
              Mallu<span className="text-yellow-400">.</span> PY CMS
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Protected route (/ammu)
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => { setPasswordInput(e.target.value); setAuthError(''); }}
                  placeholder="Enter your admin password"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-yellow-400 transition"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 px-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 shadow-glow-yellow transition duration-200 active:scale-98 text-sm disabled:opacity-70"
            >
              {isVerifying ? 'Verifying SHA-256 Hash...' : 'Sign In to Admin Panel'}
            </button>
          </form>

        </div>
      </div>
    );
  }

  // Count scheduled items for quick stats
  const scheduledVideosCount = longVideos.filter(v => !isItemPublished(v)).length;
  const scheduledShortsCount = shorts.filter(s => !isItemPublished(s)).length;
  const scheduledRoadmapCount = roadmap.filter(r => !isItemPublished(r)).length;

  return (
    <div className="min-h-screen bg-[#060B11] text-slate-100 flex flex-col font-sans">

      {/* Top Admin Header */}
      <header className="sticky top-0 z-30 w-full bg-[#0A121D]/90 border-b border-slate-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl p-0.5 bg-gradient-to-tr from-yellow-400 to-sky-500">
              <img
                src={channelInfo.profileImg}
                alt="Mallu.PY"
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white font-display text-base sm:text-lg">
                  Mallu<span className="text-yellow-400">.</span> PY
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-yellow-400 text-slate-950">
                  CMS DASHBOARD
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono -mt-0.5 hidden xs:block">
                Route: /ammu • Scheduled publishing enabled
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-700 hover:border-yellow-400 text-slate-200 hover:text-yellow-400 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Public Website</span>
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main CMS Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full text-left">

        {databaseStatus === 'error' && (
          <div className="mb-5 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-sm text-red-200">
            <p className="font-semibold">Could not save or load content from Supabase.</p>
            <p className="mt-1 break-words">{databaseError}</p>
            <button type="button" onClick={refreshFromDatabase} className="mt-3 px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-400/30 hover:bg-red-500/25">Retry database sync</button>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none text-xs sm:text-sm">
            <button
              onClick={() => { setActiveTab('videos'); setSearchFilter(''); setStatusFilter('all'); }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium transition ${activeTab === 'videos'
                ? 'bg-yellow-400 text-slate-950 font-bold shadow-glow-yellow'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
            >
              <Video className="w-4 h-4" />
              <span>Long Videos ({longVideos.length})</span>
              {scheduledVideosCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-slate-950 font-bold">
                  {scheduledVideosCount} 🕒
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('shorts'); setSearchFilter(''); setStatusFilter('all'); }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium transition ${activeTab === 'shorts'
                ? 'bg-orange-500 text-white font-bold shadow-lg shadow-orange-500/20'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
            >
              <Flame className="w-4 h-4" />
              <span>Shorts ({shorts.length})</span>
              {scheduledShortsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/40 text-amber-300 font-bold">
                  {scheduledShortsCount} 🕒
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('roadmap'); setSearchFilter(''); setStatusFilter('all'); }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium transition ${activeTab === 'roadmap'
                ? 'bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/20'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
            >
              <Layers className="w-4 h-4" />
              <span>Curriculum Roadmap ({roadmap.length})</span>
              {scheduledRoadmapCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/40 text-amber-300 font-bold">
                  {scheduledRoadmapCount} 🕒
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('snippets'); setSearchFilter(''); setStatusFilter('all'); }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium transition ${activeTab === 'snippets'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Playground Snippets ({snippets.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('database'); setSearchFilter(''); }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium transition ${activeTab === 'database'
                ? 'bg-purple-500 text-white font-bold shadow-lg shadow-purple-500/20'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
            >
              <Database className="w-4 h-4" />
              <span>Database & Cloud</span>
            </button>
          </div>

          {/* Quick Add Button */}
          {activeTab !== 'database' && (
            <button
              onClick={() => {
                if (activeTab === 'videos') openAddModal('video');
                if (activeTab === 'shorts') openAddModal('short');
                if (activeTab === 'roadmap') openAddModal('roadmap');
                if (activeTab === 'snippets') openAddModal('snippet');
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 rounded-xl shadow-glow-yellow transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add / Schedule {activeTab === 'videos' ? 'Video' : activeTab === 'shorts' ? 'Short' : activeTab === 'roadmap' ? 'Phase' : 'Snippet'}</span>
            </button>
          )}
        </div>

        {/* Status Filter Bar for Content Tabs */}
        {activeTab !== 'database' && (
          <div className="flex items-center gap-2 mb-5 text-xs font-mono">
            <span className="text-slate-500">Filter Status:</span>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition ${statusFilter === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              All Items
            </button>
            <button
              onClick={() => setStatusFilter('published')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition ${statusFilter === 'published' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Live / Published</span>
            </button>
            <button
              onClick={() => setStatusFilter('scheduled')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition ${statusFilter === 'scheduled' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              <Clock className="w-3 h-3 text-yellow-400" />
              <span>Scheduled for Future</span>
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 1: LONG VIDEOS MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'videos' && (
          <div className="space-y-4">

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter videos by title, day or category..."
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-yellow-400 transition"
                />
              </div>

              <div className="text-xs text-slate-400 font-mono">
                Showing {longVideos.filter(matchesStatus).filter(v => (v.title + v.category + v.day).toLowerCase().includes(searchFilter.toLowerCase())).length} of {longVideos.length} masterclasses
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-[#0B131E] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#0F1926] text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Day</th>
                      <th className="py-3 px-4">Thumbnail</th>
                      <th className="py-3 px-4">Title & Details</th>
                      <th className="py-3 px-4">Status & Schedule</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {longVideos
                      .filter(matchesStatus)
                      .filter(v => (v.title + v.category + v.day).toLowerCase().includes(searchFilter.toLowerCase()))
                      .map((video) => {
                        const isLive = isItemPublished(video);

                        return (
                          <tr key={video.id} className="hover:bg-slate-900/40 transition">
                            <td className="py-3 px-4 font-mono font-bold text-yellow-400 whitespace-nowrap">
                              DAY {video.day < 10 ? `0${video.day}` : video.day}
                            </td>
                            <td className="py-3 px-4">
                              <div className="w-20 aspect-video rounded-lg overflow-hidden bg-slate-950 border border-slate-800 relative">
                                <img
                                  src={video.thumbnail || `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                                  alt={video.title}
                                  className="w-full h-full object-cover"
                                />
                                {!isLive && (
                                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-yellow-400" />
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 max-w-md">
                              <div className="font-semibold text-white line-clamp-1">{video.title}</div>
                              <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">{video.description}</div>
                              <div className="text-[11px] font-mono text-slate-500 mt-1">ID: {video.id}</div>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              {isLive ? (
                                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Live
                                </span>
                              ) : (
                                <div className="space-y-1">
                                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 inline-flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-yellow-400" />
                                    {formatDateTime(video.publishDate)}
                                  </span>
                                  <div>
                                    <button
                                      onClick={() => {
                                        if (window.confirm(`Publish "${video.title}" right now?`)) {
                                          publishNow('video', video.id);
                                        }
                                      }}
                                      className="text-[10px] text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 font-mono"
                                    >
                                      <Rocket className="w-2.5 h-2.5" /> Publish Now
                                    </button>
                                  </div>
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-yellow-300 border border-slate-700">
                                {video.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-mono text-slate-300 whitespace-nowrap">
                              {video.duration}
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={`https://www.youtube.com/watch?v=${video.id}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                                  title="Open on YouTube"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                                <button
                                  onClick={() => openEditModal('video', video)}
                                  className="p-1.5 text-sky-400 hover:text-sky-300 hover:bg-sky-500/10 rounded-lg transition"
                                  title="Edit Video / Schedule"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Delete "${video.title}"?`)) {
                                      deleteLongVideo(video.id);
                                    }
                                  }}
                                  className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
                                  title="Delete Video"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: SHORTS MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'shorts' && (
          <div className="space-y-4">

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter shorts by title or series..."
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-400 transition"
                />
              </div>

              <div className="text-xs text-slate-400 font-mono">
                Showing {shorts.filter(matchesStatus).filter(s => (s.title + s.category).toLowerCase().includes(searchFilter.toLowerCase())).length} of {shorts.length} shorts
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shorts
                .filter(matchesStatus)
                .filter(s => (s.title + s.category).toLowerCase().includes(searchFilter.toLowerCase()))
                .map((short) => {
                  const isLive = isItemPublished(short);

                  return (
                    <div key={short.id} className="p-3.5 rounded-xl bg-[#0B131E] border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-12 aspect-[9/16] rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800 relative">
                          <img
                            src={short.thumbnail || `https://i.ytimg.com/vi/${short.id}/hqdefault.jpg`}
                            alt={short.title}
                            className="w-full h-full object-cover"
                          />
                          {!isLive && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <Clock className="w-4 h-4 text-yellow-400" />
                            </div>
                          )}
                        </div>
                        <div className="overflow-hidden space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-orange-500/10 text-orange-400 border border-orange-500/20">
                              {short.category}
                            </span>
                            {!isLive ? (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                                🕒 {formatDateTime(short.publishDate)}
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400">
                                Live
                              </span>
                            )}
                          </div>

                          <h4 className="text-xs font-semibold text-white line-clamp-2">
                            {short.title}
                          </h4>

                          <div className="text-[11px] font-mono text-slate-500">
                            {short.views?.toLocaleString()} views • ID: {short.id}
                          </div>

                          {!isLive && (
                            <button
                              onClick={() => {
                                if (window.confirm(`Publish "${short.title}" right now?`)) {
                                  publishNow('short', short.id);
                                }
                              }}
                              className="text-[10px] text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 font-mono"
                            >
                              <Rocket className="w-2.5 h-2.5" /> Publish Now
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 shrink-0">
                        <button
                          onClick={() => openEditModal('short', short)}
                          className="p-1.5 text-sky-400 hover:bg-sky-500/10 rounded-lg transition"
                          title="Edit Short / Schedule"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete short "${short.title}"?`)) {
                              deleteShort(short.id);
                            }
                          }}
                          className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition"
                          title="Delete Short"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CURRICULUM ROADMAP MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roadmap.filter(matchesStatus).map((phase) => {
                const isLive = isItemPublished(phase);

                return (
                  <div key={phase.phase} className="p-6 rounded-2xl bg-[#0B131E] border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 text-xs font-mono font-bold rounded bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                            {phase.days}
                          </span>
                          {!isLive ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-yellow-400" />
                              Scheduled: {formatDateTime(phase.publishDate)}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Live Phase
                            </span>
                          )}
                        </div>

                        <span className="text-xs font-mono text-slate-500 font-bold">
                          PHASE 0{phase.phase}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-1">
                        {phase.title}
                      </h3>
                      <p className="text-xs text-slate-400 mb-4">
                        {phase.subtitle}
                      </p>

                      <div className="space-y-1.5 border-t border-slate-800 pt-3">
                        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                          Curriculum Topics:
                        </span>
                        {(phase.topics || []).map((t, idx) => (
                          <div key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      {!isLive && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Publish Phase ${phase.phase} immediately?`)) {
                              publishNow('roadmap', phase.phase);
                            }
                          }}
                          className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono font-semibold"
                        >
                          <Rocket className="w-3.5 h-3.5" /> Publish Now
                        </button>
                      )}

                      <div className="flex items-center gap-2 ml-auto">
                        <button
                          onClick={() => openEditModal('roadmap', phase)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 rounded-lg transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit Phase</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete Phase ${phase.phase}?`)) {
                              deleteRoadmapPhase(phase.phase);
                            }
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: PLAYGROUND SNIPPETS MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'snippets' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {snippets.filter(matchesStatus).map((snip) => {
                const isLive = isItemPublished(snip);

                return (
                  <div key={snip.id} className="p-6 rounded-2xl bg-[#080E17] border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-yellow-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            {snip.id}.py
                          </span>
                          {!isLive && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                              🕒 {formatDateTime(snip.publishDate)}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-slate-400">
                          {snip.series}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white mb-2">
                        {snip.title}
                      </h3>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-900 font-mono text-xs text-slate-300 max-h-40 overflow-y-auto mb-3">
                        <pre><code>{snip.code}</code></pre>
                      </div>

                      <div className="p-2.5 rounded-lg bg-black/60 border border-slate-900 font-mono text-[11px] text-emerald-400">
                        <span className="text-slate-500 block mb-1">Expected Output:</span>
                        <pre>{snip.output}</pre>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                      {!isLive && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Publish snippet "${snip.title}" immediately?`)) {
                              publishNow('snippet', snip.id);
                            }
                          }}
                          className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono font-semibold"
                        >
                          <Rocket className="w-3.5 h-3.5" /> Publish Now
                        </button>
                      )}

                      <div className="flex items-center gap-2 ml-auto">
                        <button
                          onClick={() => openEditModal('snippet', snip)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 rounded-lg transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit Snippet</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete snippet "${snip.title}"?`)) {
                              deleteCodeSnippet(snip.id);
                            }
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: DATABASE & BACKUP MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'database' && (
          <div className="space-y-8">

            {/* Supabase Integration Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0F1D2C] via-[#0E1925] to-[#0A121D] border border-yellow-400/30 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Supabase PostgreSQL Database Sync
                  </h3>
                  <p className="text-xs text-slate-400">
                    Host your channel data in Supabase cloud for multi-device sync with scheduling support
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono my-4">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-500 block">VITE_SUPABASE_URL</span>
                  <span className="text-slate-200 truncate block mt-0.5">
                    {import.meta.env.VITE_SUPABASE_URL || 'Not configured in .env (Optional)'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-500 block">VITE_SUPABASE_ANON_KEY</span>
                  <span className="text-slate-200 truncate block mt-0.5">
                    {import.meta.env.VITE_SUPABASE_ANON_KEY ? '••••••••••••••••' : 'Not configured in .env (Optional)'}
                  </span>
                </div>
              </div>

              <div className={`p-4 rounded-xl border text-xs ${databaseStatus === 'connected' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : databaseStatus === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-300' : databaseStatus === 'connecting' ? 'bg-sky-500/10 border-sky-500/30 text-sky-300' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">{databaseStatus === 'connected' ? 'Connected · data is syncing with Supabase' : databaseStatus === 'error' ? 'Database sync failed' : databaseStatus === 'connecting' ? 'Connecting to Supabase…' : 'Local storage mode · Supabase settings are missing'}</p>
                    {databaseError && <p className="mt-1 text-red-300 break-words">{databaseError}</p>}
                  </div>
                  {databaseStatus !== 'local' && <button type="button" onClick={refreshFromDatabase} className="shrink-0 px-3 py-2 rounded-lg bg-slate-950/70 border border-slate-700 text-slate-200 hover:border-yellow-400 transition">Sync now</button>}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-2">
                <p className="font-semibold text-yellow-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Ready-to-run queries with <code>publish_date</code> support available in: <code className="bg-slate-950 px-2 py-0.5 rounded text-white">init.sql</code>
                </p>
                <p>
                  To set up Supabase: create a free project at <strong>supabase.com</strong>, open the <strong>SQL Editor</strong>, paste the contents of <code className="text-yellow-300">init.sql</code>, and click <strong>Run</strong>. All tables and RLS security policies will be created automatically.
                </p>
              </div>
            </div>

            {/* Local Backup & Restore */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Export JSON */}
              <div className="p-6 rounded-2xl bg-[#0B131E] border border-slate-800 flex flex-col justify-between">
                <div>
                  <Download className="w-6 h-6 text-yellow-400 mb-3" />
                  <h4 className="text-base font-bold text-white mb-1">Export JSON Backup</h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Download the entire dataset (including scheduled videos & roadmap phases) as a timestamped JSON file.
                  </p>
                </div>
                <button
                  onClick={exportDataJSON}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-slate-950 bg-yellow-400 hover:bg-yellow-300 transition text-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup File</span>
                </button>
              </div>

              {/* Import JSON */}
              <div className="p-6 rounded-2xl bg-[#0B131E] border border-slate-800 flex flex-col justify-between">
                <div>
                  <Upload className="w-6 h-6 text-sky-400 mb-3" />
                  <h4 className="text-base font-bold text-white mb-1">Import JSON Backup</h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Upload a previously exported backup file to restore or migrate data onto any machine.
                  </p>
                </div>

                <div>
                  <label className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-slate-200 bg-slate-900 border border-slate-700 hover:border-sky-400 cursor-pointer transition text-xs">
                    <Upload className="w-4 h-4 text-sky-400" />
                    <span>Select JSON File</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {importStatus && (
                    <div className={`mt-2 p-2 rounded text-[11px] font-mono ${importStatus.success ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {importStatus.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Reset to Factory Defaults */}
              <div className="p-6 rounded-2xl bg-[#0B131E] border border-slate-800 flex flex-col justify-between">
                <div>
                  <RotateCcw className="w-6 h-6 text-red-400 mb-3" />
                  <h4 className="text-base font-bold text-white mb-1">Factory Reset</h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Clear custom additions and restore the bundled YouTube channel defaults in the active data store.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to restore default channel data? Any unsaved custom items will be reset.")) {
                      resetToDefaults();
                      alert("Reset to default channel data complete!");
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition text-xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restore Factory Defaults</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* ======================================================== */}
      {/* UNIVERSAL MODAL FOR ADD/EDIT (WITH SCHEDULING CONTROLS) */}
      {/* ======================================================== */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-[#0C1521] border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-left">

            <div className="flex items-center justify-between px-6 py-4 bg-[#101B2B] border-b border-slate-800">
              <h3 className="text-base font-bold text-white font-display">
                {modalMode === 'add' ? 'Add / Schedule' : 'Edit'} {modalType === 'video' ? 'Long Video' : modalType === 'short' ? 'Short' : modalType === 'roadmap' ? 'Roadmap Phase' : 'Code Snippet'}
              </h3>
              <button onClick={closeModal} className="p-1 text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">

              {/* Form for Long Video */}
              {modalType === 'video' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono">Day Number</label>
                      <input
                        type="number"
                        value={formData.day || 1}
                        onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono">YouTube Video ID</label>
                      <input
                        type="text"
                        value={formData.id || ''}
                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        placeholder="e.g. MtYHDzeJ3Kg"
                        disabled={modalMode === 'edit'}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-mono">Video Title</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Title of the masterclass"
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono">Category</label>
                      <input
                        type="text"
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="e.g. Data Structures"
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono">Duration</label>
                      <input
                        type="text"
                        value={formData.duration || ''}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="e.g. 24:15"
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-mono">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.tags || ''}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="Lists, Python, Malayalam"
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-mono">Key Takeaway Pill</label>
                    <input
                      type="text"
                      value={formData.keyTakeaway || ''}
                      onChange={(e) => setFormData({ ...formData, keyTakeaway: e.target.value })}
                      placeholder="e.g. Understand how indexing works"
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-mono">Description</label>
                    <textarea
                      rows={3}
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>
                </>
              )}

              {/* Form for Short */}
              {modalType === 'short' && (
                <>
                  <div>
                    <label className="block text-slate-400 mb-1 font-mono">YouTube Short ID</label>
                    <input
                      type="text"
                      value={formData.id || ''}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      placeholder="e.g. rW5WhVK8Yso"
                      disabled={modalMode === 'edit'}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-mono">Short Title</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Swap 2 Variables 3 Ways"
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono">Series / Category</label>
                      <select
                        value={formData.category || 'Programming Secrets'}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                      >
                        <option value="Programming Secrets">Programming Secrets</option>
                        <option value="Ningal Pattikkapedukayan">Ningal Pattikkapedukayan</option>
                        <option value="Code Hacks">Code Hacks</option>
                        <option value="Tech Tips">Tech Tips</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono">Views Count</label>
                      <input
                        type="number"
                        value={formData.views || 0}
                        onChange={(e) => setFormData({ ...formData, views: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Form for Roadmap */}
              {modalType === 'roadmap' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono">Phase Number</label>
                      <input
                        type="number"
                        value={formData.phase || 1}
                        onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
                        disabled={modalMode === 'edit'}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono">Days Span</label>
                      <input
                        type="text"
                        value={formData.days || ''}
                        onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                        placeholder="e.g. Days 1 - 4"
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-mono">Phase Title</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Foundations & Setup"
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-mono">Subtitle</label>
                    <input
                      type="text"
                      value={formData.subtitle || ''}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-mono">Topics (comma-separated)</label>
                    <textarea
                      rows={3}
                      value={formData.topics || ''}
                      onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                      placeholder="Topic 1, Topic 2, Topic 3"
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>
                </>
              )}

              {/* Form for Snippet */}
              {modalType === 'snippet' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono">Snippet ID</label>
                      <input
                        type="text"
                        value={formData.id || ''}
                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        disabled={modalMode === 'edit'}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono">Series Reference</label>
                      <input
                        type="text"
                        value={formData.series || ''}
                        onChange={(e) => setFormData({ ...formData, series: e.target.value })}
                        placeholder="e.g. Day 11"
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-mono">Snippet Title</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-mono">Python Code</label>
                    <textarea
                      rows={5}
                      value={formData.code || ''}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 font-mono text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-mono">Simulated Console Output</label>
                    <textarea
                      rows={3}
                      value={formData.output || ''}
                      onChange={(e) => setFormData({ ...formData, output: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-yellow-300 font-mono text-xs"
                      required
                    />
                  </div>
                </>
              )}

              {/* UNIVERSAL SCHEDULING SECTION */}
              <div className="p-3.5 rounded-2xl bg-[#080E17] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs font-semibold text-white font-mono">Future Publishing Schedule</span>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.isScheduled || false}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFormData({
                          ...formData,
                          isScheduled: checked,
                          publishDate: checked ? (formData.publishDate || new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 16)) : '',
                        });
                      }}
                      className="rounded border-slate-700 bg-slate-900 text-yellow-400 focus:ring-0"
                    />
                    <span>Schedule for future</span>
                  </label>
                </div>

                {formData.isScheduled && (
                  <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1 font-mono">Publish Date & Time (Local Time)</label>
                      <input
                        type="datetime-local"
                        value={formData.publishDate || ''}
                        onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-yellow-400"
                        required={formData.isScheduled}
                      />
                    </div>

                    <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-400">
                      <input
                        type="checkbox"
                        checked={formData.showAsUpcoming !== false}
                        onChange={(e) => setFormData({ ...formData, showAsUpcoming: e.target.checked })}
                        className="mt-0.5 rounded border-slate-700 bg-slate-900 text-yellow-400 focus:ring-0"
                      />
                      <span>Display as <strong>"Upcoming / Premiering Soon"</strong> on public website (uncheck to keep completely hidden until release date).</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 transition text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingContent}
                  className="px-5 py-2 rounded-xl text-slate-950 font-bold bg-yellow-400 hover:bg-yellow-300 shadow-glow-yellow transition text-xs"
                >
                  {isSavingContent ? 'Saving…' : formData.isScheduled ? 'Schedule for Future' : 'Save Changes'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
