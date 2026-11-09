import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import RoadmapSection from '../components/RoadmapSection';
import BuyMeCoffeeBanner from '../components/BuyMeCoffeeBanner';
import LongVideosSection from '../components/LongVideosSection';
import ShortsSection from '../components/ShortsSection';
import GithubNotesCard from '../components/GithubNotesCard';
import InteractivePlayground from '../components/InteractivePlayground';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import VideoModal from '../components/VideoModal';
import SearchModal from '../components/SearchModal';
import { useData } from '../context/DataContext';

export default function PublicPortfolio() {
  const { longVideos } = useData();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isShortModal, setIsShortModal] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState(null);

  const handlePlayVideo = (video) => {
    setSelectedVideo(video);
    setIsShortModal(false);
  };

  const handlePlayShort = (short) => {
    setSelectedVideo(short);
    setIsShortModal(true);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  const handleStartLearning = () => {
    const el = document.getElementById('tutorials');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreShorts = () => {
    const el = document.getElementById('shorts');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPhase = (phaseNumber) => {
    setSelectedPhase(phaseNumber);
    const el = document.getElementById('tutorials');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearPhase = () => {
    setSelectedPhase(null);
  };

  return (
    <div className="min-h-screen bg-[#060B11] text-slate-100 flex flex-col font-sans selection:bg-yellow-400/20 selection:text-yellow-300">

      {/* Top Navbar */}
      <Navbar
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartLearning={handleStartLearning}
          onExploreShorts={handleExploreShorts}
          onWatchFeatured={() => longVideos.length > 0 && handlePlayVideo(longVideos[0])}
        />


        {/* Structured 4-Phase Roadmap */}
        <RoadmapSection
          onSelectPhase={handleSelectPhase}
        />


        {/* Buy Me A Coffee Support Banner (Positioned right after Curriculum Roadmap) */}
        <BuyMeCoffeeBanner />

        {/* Full 16-Day Python Masterclasses */}
        <LongVideosSection
          onPlayVideo={handlePlayVideo}
          selectedPhase={selectedPhase}
          onClearPhase={handleClearPhase}
        />


        {/* GitHub Zero‑2‑Hero Repository Notes */}
        <GithubNotesCard />


        {/* Tech Shorts & Secrets */}
        <ShortsSection
          onPlayShort={handlePlayShort}
        />


        {/* Interactive Python Playground */}
        <InteractivePlayground />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          isShort={isShortModal}
          onClose={handleCloseModal}
          onSelectVideo={setSelectedVideo}
        />

      )}

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectVideo={handlePlayVideo}
        onSelectShort={handlePlayShort}
      />

    </div>
  );
}

