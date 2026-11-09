import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  longVideos as initialLongVideos, 
  learningRoadmap as initialRoadmap, 
  codeSnippets as initialSnippets, 
  shortsList as initialShorts 
} from '../data/channelData';

const DataContext = createContext();

const STORAGE_KEY = 'mallupy_cms_data_v1';

// Helper to determine if an item is live based on its publishDate
export function isItemPublished(item) {
  if (!item || !item.publishDate) return true;
  return new Date(item.publishDate) <= new Date();
}

// Helper to determine if an item should be shown on the public site (published OR marked as upcoming)
export function isItemVisibleOnPublic(item) {
  if (!item || !item.publishDate) return true;
  if (isItemPublished(item)) return true;
  return item.showAsUpcoming !== false;
}

// Format friendly date time e.g. "Nov 15, 2026, 6:00 PM"
export function formatDateTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

export function DataProvider({ children }) {
  // Load data from localStorage or use defaults
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          longVideos: parsed.longVideos || initialLongVideos,
          shorts: parsed.shorts || initialShorts,
          roadmap: parsed.roadmap || initialRoadmap,
          snippets: parsed.snippets || initialSnippets,
        };
      }
    } catch (e) {
      console.error("Failed to load CMS data from localStorage:", e);
    }
    return {
      longVideos: initialLongVideos,
      shorts: initialShorts,
      roadmap: initialRoadmap,
      snippets: initialSnippets,
    };
  });

  // Sync state to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save CMS data to localStorage:", e);
    }
  }, [data]);

  // --- CRUD: Long Videos ---
  const addLongVideo = (newVideo) => {
    setData(prev => ({
      ...prev,
      longVideos: [newVideo, ...prev.longVideos]
    }));
  };

  const updateLongVideo = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      longVideos: prev.longVideos.map(v => v.id === id ? { ...v, ...updatedFields } : v)
    }));
  };

  const deleteLongVideo = (id) => {
    setData(prev => ({
      ...prev,
      longVideos: prev.longVideos.filter(v => v.id !== id)
    }));
  };

  // --- CRUD: Shorts ---
  const addShort = (newShort) => {
    setData(prev => ({
      ...prev,
      shorts: [newShort, ...prev.shorts]
    }));
  };

  const updateShort = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      shorts: prev.shorts.map(s => s.id === id ? { ...s, ...updatedFields } : s)
    }));
  };

  const deleteShort = (id) => {
    setData(prev => ({
      ...prev,
      shorts: prev.shorts.filter(s => s.id !== id)
    }));
  };

  // --- CRUD: Roadmap ---
  const addRoadmapPhase = (newPhase) => {
    setData(prev => ({
      ...prev,
      roadmap: [...prev.roadmap, newPhase].sort((a, b) => a.phase - b.phase)
    }));
  };

  const updateRoadmapPhase = (phaseNumber, updatedFields) => {
    setData(prev => ({
      ...prev,
      roadmap: prev.roadmap.map(r => r.phase === phaseNumber ? { ...r, ...updatedFields } : r)
    }));
  };

  const deleteRoadmapPhase = (phaseNumber) => {
    setData(prev => ({
      ...prev,
      roadmap: prev.roadmap.filter(r => r.phase !== phaseNumber)
    }));
  };

  // --- CRUD: Playground Code Snippets ---
  const addCodeSnippet = (newSnippet) => {
    setData(prev => ({
      ...prev,
      snippets: [...prev.snippets, newSnippet]
    }));
  };

  const updateCodeSnippet = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      snippets: prev.snippets.map(s => s.id === id ? { ...s, ...updatedFields } : s)
    }));
  };

  const deleteCodeSnippet = (id) => {
    setData(prev => ({
      ...prev,
      snippets: prev.snippets.filter(s => s.id !== id)
    }));
  };

  // --- Publish Immediately (Removes scheduled publishDate) ---
  const publishNow = (type, idOrPhase) => {
    if (type === 'video') {
      updateLongVideo(idOrPhase, { publishDate: null });
    } else if (type === 'short') {
      updateShort(idOrPhase, { publishDate: null });
    } else if (type === 'roadmap') {
      updateRoadmapPhase(idOrPhase, { publishDate: null });
    } else if (type === 'snippet') {
      updateCodeSnippet(idOrPhase, { publishDate: null });
    }
  };

  // --- Reset to default factory channel data ---
  const resetToDefaults = () => {
    const defaults = {
      longVideos: initialLongVideos,
      shorts: initialShorts,
      roadmap: initialRoadmap,
      snippets: initialSnippets,
    };
    setData(defaults);
    localStorage.removeItem(STORAGE_KEY);
  };

  // --- Export JSON ---
  const exportDataJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mallupy_data_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // --- Import JSON ---
  const importDataJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.longVideos && parsed.shorts && parsed.roadmap && parsed.snippets) {
        setData(parsed);
        return { success: true, message: "Data imported successfully!" };
      } else {
        return { success: false, message: "Invalid JSON format: missing required content sections." };
      }
    } catch (err) {
      return { success: false, message: `Parse error: ${err.message}` };
    }
  };

  return (
    <DataContext.Provider value={{
      longVideos: data.longVideos,
      shorts: data.shorts,
      roadmap: data.roadmap,
      snippets: data.snippets,
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
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

