import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import PublicPortfolio from './pages/PublicPortfolio';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Portfolio Website */}
          <Route path="/" element={<PublicPortfolio />} />

          {/* Secret / Protected Admin Panel Route */}
          <Route path="/ammu" element={<AdminPanel />} />

          {/* Catch-all redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}
