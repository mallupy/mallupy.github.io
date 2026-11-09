import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  longVideos as initialLongVideos,
  learningRoadmap as initialRoadmap,
  codeSnippets as initialSnippets,
  shortsList as initialShorts
} from '../data/channelData';

const DataContext = createContext();
const STORAGE_KEY = 'mallupy_cms_data_v1';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '');
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_KEY && !/your[-_ ]?supabase|your[-_ ]?project/i.test(`${SUPABASE_URL} ${SUPABASE_KEY}`));

const defaultData = () => ({
  longVideos: initialLongVideos,
  shorts: initialShorts,
  roadmap: initialRoadmap,
  snippets: initialSnippets,
});

const tableConfig = [
  { key: 'longVideos', table: 'long_videos', id: 'id', columns: ['id', 'day', 'title', 'description', 'duration', 'category', 'tags', 'thumbnail', 'fallbackThumbnail', 'keyTakeaway', 'publishDate', 'showAsUpcoming'], fields: { fallbackThumbnail: 'fallback_thumbnail', keyTakeaway: 'key_takeaway', publishDate: 'publish_date', showAsUpcoming: 'show_as_upcoming' } },
  { key: 'shorts', table: 'shorts', id: 'id', columns: ['id', 'title', 'views', 'category', 'thumbnail', 'publishDate', 'showAsUpcoming'], fields: { publishDate: 'publish_date', showAsUpcoming: 'show_as_upcoming' } },
  { key: 'roadmap', table: 'roadmap_phases', id: 'phase', columns: ['phase', 'title', 'subtitle', 'days', 'topics', 'color', 'badgeColor', 'publishDate', 'showAsUpcoming'], fields: { badgeColor: 'badge_color', publishDate: 'publish_date', showAsUpcoming: 'show_as_upcoming' } },
  { key: 'snippets', table: 'code_snippets', id: 'id', columns: ['id', 'title', 'category', 'series', 'code', 'output', 'publishDate', 'showAsUpcoming'], fields: { publishDate: 'publish_date', showAsUpcoming: 'show_as_upcoming' } },
];

function toDatabaseRow(row, config) {
  return Object.fromEntries(config.columns.map(key => [
    config.fields[key] || key,
    row[key] ?? null,
  ]));
}

function fromDatabaseRow(row, fields) {
  const reversed = Object.fromEntries(Object.entries(fields).map(([key, value]) => [value, key]));
  return Object.fromEntries(Object.entries(row).map(([key, value]) => [reversed[key] || key, value]));
}

async function supabaseRequest(table, query = '', options = {}) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase ${table}: ${detail || response.statusText}`);
  }
  if (response.status === 204) return null;
  const body = await response.text();
  return body.trim() ? JSON.parse(body) : null;
}

async function loadFromSupabase() {
  const rows = await Promise.all(tableConfig.map(async config => {
    const records = await supabaseRequest(config.table, '?select=*');
    return [config.key, records.map(row => fromDatabaseRow(row, config.fields))];
  }));
  return Object.fromEntries(rows);
}

async function saveToSupabase(data) {
  for (const config of tableConfig) {
    const rows = data[config.key].map(row => toDatabaseRow(row, config));
    const existing = await supabaseRequest(config.table, `?select=${config.id}`);
    if (rows.length) {
      await supabaseRequest(config.table, '?on_conflict=' + config.id, {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates' },
        body: JSON.stringify(rows),
      });
    }
    const keepIds = new Set(rows.map(row => row[config.id]));
    const staleIds = existing.map(row => row[config.id]).filter(id => !keepIds.has(id));
    for (const id of staleIds) {
      await supabaseRequest(config.table, `?${config.id}=eq.${encodeURIComponent(id)}`, { method: 'DELETE' });
    }
  }
}

async function saveChangesToSupabase(previous, next) {
  for (const config of tableConfig) {
    const before = previous[config.key];
    const after = next[config.key];
    if (JSON.stringify(before) === JSON.stringify(after)) continue;

    const rows = after.map(row => toDatabaseRow(row, config));
    if (rows.length) {
      await supabaseRequest(config.table, '?on_conflict=' + config.id, {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates' },
        body: JSON.stringify(rows),
      });
    }
    const remaining = new Set(after.map(row => row[config.id]));
    for (const row of before) {
      if (!remaining.has(row[config.id])) {
        await supabaseRequest(config.table, `?${config.id}=eq.${encodeURIComponent(row[config.id])}`, { method: 'DELETE' });
      }
    }
  }
}

function loadLocalData() {
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
  } catch (error) {
    console.error('Failed to load CMS data from localStorage:', error);
  }
  return defaultData();
}

export function isItemPublished(item) {
  if (!item || !item.publishDate) return true;
  return new Date(item.publishDate) <= new Date();
}

export function isItemVisibleOnPublic(item) {
  if (!item || !item.publishDate) return true;
  if (isItemPublished(item)) return true;
  return item.showAsUpcoming !== false;
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export function DataProvider({ children }) {
  const [data, setData] = useState(loadLocalData);
  const dataRef = useRef(data);
  const writeQueue = useRef(Promise.resolve());
  const [databaseStatus, setDatabaseStatus] = useState(hasSupabase ? 'connecting' : 'local');
  const [databaseError, setDatabaseError] = useState('');

  const applyData = (next) => {
    dataRef.current = next;
    setData(next);
    if (!hasSupabase) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }
      catch (error) { console.error('Failed to save CMS data locally:', error); }
    }
  };

  const refreshFromDatabase = async () => {
    if (!hasSupabase) return;
    try {
      const cloudData = await loadFromSupabase();
      const isEmpty = Object.values(cloudData).every(rows => rows.length === 0);
      // Bootstrap a newly created, empty database with the bundled channel content.
      if (isEmpty) {
        const defaults = defaultData();
        await saveToSupabase(defaults);
        applyData(defaults);
      } else {
        applyData(cloudData);
      }
      setDatabaseStatus('connected');
      setDatabaseError('');
    } catch (error) {
      console.error('Failed to load CMS data from Supabase:', error);
      setDatabaseStatus('error');
      setDatabaseError(error.message || 'Could not connect to Supabase.');
    }
  };

  useEffect(() => {
    if (hasSupabase) {
      refreshFromDatabase();
      const onFocus = () => refreshFromDatabase();
      const timer = window.setInterval(refreshFromDatabase, 30000);
      window.addEventListener('focus', onFocus);
      return () => {
        window.clearInterval(timer);
        window.removeEventListener('focus', onFocus);
      };
    }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(dataRef.current)); }
    catch (error) { console.error('Failed to save CMS data locally:', error); }
  }, []);

  const updateData = (transform) => {
    const operation = writeQueue.current.then(async () => {
      const previous = dataRef.current;
      const next = transform(previous);
      if (hasSupabase) {
        await saveChangesToSupabase(previous, next);
        setDatabaseStatus('connected');
        setDatabaseError('');
      }
      applyData(next);
      return true;
    }).catch(error => {
      if (hasSupabase) {
        console.error('Failed to save CMS data to Supabase:', error);
        setDatabaseStatus('error');
        setDatabaseError(error.message || 'Could not save to Supabase.');
      }
      return false;
    });
    writeQueue.current = operation;
    return operation;
  };

  const addLongVideo = (item) => updateData(prev => ({ ...prev, longVideos: [item, ...prev.longVideos] }));
  const updateLongVideo = (id, fields) => updateData(prev => ({ ...prev, longVideos: prev.longVideos.map(item => item.id === id ? { ...item, ...fields } : item) }));
  const deleteLongVideo = (id) => updateData(prev => ({ ...prev, longVideos: prev.longVideos.filter(item => item.id !== id) }));
  const addShort = (item) => updateData(prev => ({ ...prev, shorts: [item, ...prev.shorts] }));
  const updateShort = (id, fields) => updateData(prev => ({ ...prev, shorts: prev.shorts.map(item => item.id === id ? { ...item, ...fields } : item) }));
  const deleteShort = (id) => updateData(prev => ({ ...prev, shorts: prev.shorts.filter(item => item.id !== id) }));
  const addRoadmapPhase = (item) => updateData(prev => ({ ...prev, roadmap: [...prev.roadmap, item].sort((a, b) => a.phase - b.phase) }));
  const updateRoadmapPhase = (phase, fields) => updateData(prev => ({ ...prev, roadmap: prev.roadmap.map(item => item.phase === phase ? { ...item, ...fields } : item) }));
  const deleteRoadmapPhase = (phase) => updateData(prev => ({ ...prev, roadmap: prev.roadmap.filter(item => item.phase !== phase) }));
  const addCodeSnippet = (item) => updateData(prev => ({ ...prev, snippets: [...prev.snippets, item] }));
  const updateCodeSnippet = (id, fields) => updateData(prev => ({ ...prev, snippets: prev.snippets.map(item => item.id === id ? { ...item, ...fields } : item) }));
  const deleteCodeSnippet = (id) => updateData(prev => ({ ...prev, snippets: prev.snippets.filter(item => item.id !== id) }));

  const publishNow = (type, id) => {
    if (type === 'video') return updateLongVideo(id, { publishDate: null });
    if (type === 'short') return updateShort(id, { publishDate: null });
    if (type === 'roadmap') return updateRoadmapPhase(id, { publishDate: null });
    if (type === 'snippet') return updateCodeSnippet(id, { publishDate: null });
  };

  const resetToDefaults = () => updateData(() => defaultData());

  const exportDataJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataRef.current, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `mallupy_data_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importDataJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.longVideos && parsed.shorts && parsed.roadmap && parsed.snippets) {
        updateData(() => parsed).catch(error => setDatabaseError(error.message));
        return { success: true, message: 'Data imported successfully!' };
      }
      return { success: false, message: 'Invalid JSON format: missing required content sections.' };
    } catch (error) {
      return { success: false, message: `Parse error: ${error.message}` };
    }
  };

  return (
    <DataContext.Provider value={{
      ...data,
      databaseStatus,
      databaseError,
      refreshFromDatabase,
      addLongVideo, updateLongVideo, deleteLongVideo,
      addShort, updateShort, deleteShort,
      addRoadmapPhase, updateRoadmapPhase, deleteRoadmapPhase,
      addCodeSnippet, updateCodeSnippet, deleteCodeSnippet,
      publishNow, resetToDefaults, exportDataJSON, importDataJSON,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
}
