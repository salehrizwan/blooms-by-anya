import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Instagram, Play, X, Settings2 } from 'lucide-react';
import { OFFICIAL_REELS } from '../data/reels';
import { BRAND_DATA } from '../data/brand';
import { ReelItem } from '../types';

export const TheBloomsEdit: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);
  const [reelsList, setReelsList] = useState<ReelItem[]>(() => {
    try {
      const stored = localStorage.getItem('blooms_reels_custom_v1');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      // ignore
    }
    return OFFICIAL_REELS;
  });

  const [isEditingThumbnails, setIsEditingThumbnails] = useState(false);

  // Check scroll capability
  const updateScrollButtons = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    updateScrollButtons();
    const current = sliderRef.current;
    if (current) {
      current.addEventListener('scroll', updateScrollButtons, { passive: true });
      window.addEventListener('resize', updateScrollButtons);
    }
    return () => {
      if (current) current.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const { clientWidth } = sliderRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleUpdateReelThumbnail = (index: number, newThumbnail: string) => {
    const updated = [...reelsList];
    updated[index] = { ...updated[index], thumbnail: newThumbnail };
    setReelsList(updated);
    try {
      localStorage.setItem('blooms_reels_custom_v1', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  const resetReels = () => {
    setReelsList(OFFICIAL_REELS);
    localStorage.removeItem('blooms_reels_custom_v1');
    setIsEditingThumbnails(false);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F7F1E7]/70 border-y border-[#D8C8A5]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#788269]">
                THE BLOOMS EDIT
              </span>
              <span className="text-xs text-[#D8C8A5]">·</span>
              <a
                href={BRAND_DATA.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#303A2B] hover:text-[#788269] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#DDA9AC]" />
                <span className="underline underline-offset-2">@blooms_by_anya</span>
              </a>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#303A2B] tracking-tight">
              A Little Look Into Our World
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#303A2B]/75 leading-relaxed">
              From handmade bouquets to thoughtful surprises, explore the little details behind every beautiful creation.
            </p>
          </div>

          {/* Slider Navigation Controls & Optional Thumbnail Customizer toggle */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              type="button"
              onClick={() => setIsEditingThumbnails(!isEditingThumbnails)}
              className="p-2 rounded-md bg-white border border-[#D8C8A5]/60 text-[#788269] hover:bg-[#FBF8F1] transition-colors text-xs font-medium inline-flex items-center gap-1 cursor-pointer"
              title="Reel Thumbnail Manager (editable field for each Reel cover)"
            >
              <Settings2 className="w-4 h-4" />
              <span className="hidden sm:inline">Reel Covers</span>
            </button>

            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                canScrollLeft
                  ? 'bg-white border-[#D8C8A5] text-[#303A2B] hover:bg-[#FBF8F1] shadow-xs'
                  : 'bg-white/40 border-transparent text-[#303A2B]/30 cursor-not-allowed'
              }`}
              aria-label="Previous reels"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                canScrollRight
                  ? 'bg-white border-[#D8C8A5] text-[#303A2B] hover:bg-[#FBF8F1] shadow-xs'
                  : 'bg-white/40 border-transparent text-[#303A2B]/30 cursor-not-allowed'
              }`}
              aria-label="Next reels"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Thumbnail Manager Panel (if toggled) */}
        {isEditingThumbnails && (
          <div className="mb-8 p-4 sm:p-6 bg-white rounded-xl border border-[#D8C8A5] shadow-xs animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-[#303A2B]">
                  Reel Cover Thumbnail Mapping
                </h3>
                <p className="text-xs text-[#788269]">
                  Each Reel is strictly mapped to its own exact Instagram URL. You can customize the local thumbnail path or image URL for each Reel below.
                </p>
              </div>
              <button
                type="button"
                onClick={resetReels}
                className="text-xs text-[#8B0000] hover:underline"
              >
                Reset to Official Defaults
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {reelsList.map((reel, idx) => (
                <div key={reel.id} className="p-3 bg-[#FBF8F1] rounded-lg text-xs space-y-1">
                  <div className="font-semibold text-[#303A2B] truncate">
                    #{reel.index}: {reel.title}
                  </div>
                  <div className="text-[11px] text-[#788269] truncate">{reel.url}</div>
                  <input
                    type="text"
                    value={reel.thumbnail}
                    onChange={(e) => handleUpdateReelThumbnail(idx, e.target.value)}
                    className="w-full text-xs p-1.5 bg-white border border-[#D8C8A5]/60 rounded-md"
                    placeholder="Thumbnail path e.g. /images/reels/..."
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Horizontal Slider: Desktop ~4 cards, Mobile ~1.5 - 2 cards */}
        <div
          ref={sliderRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reelsList.map((reel) => (
            <div
              key={reel.id}
              className="group shrink-0 w-[200px] sm:w-[240px] md:w-[260px] lg:w-[275px] snap-start flex flex-col cursor-pointer"
              onClick={() => setActiveReel(reel)}
            >
              {/* 9:16 Vertical Reel Card */}
              <div className="relative aspect-[9/16] w-full bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 border border-[#D8C8A5]/50 group-hover:border-[#788269]">
                {/* Reel Cover Image */}
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
                />

                {/* Subtle gradient vignette for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                {/* Top Badge: Instagram Icon & Reel Index */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white/90">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-xs text-[11px] font-medium border border-white/10">
                    <Instagram className="w-3.5 h-3.5 text-[#DDA9AC]" />
                    <span>Reel {reel.index}</span>
                  </div>
                  {reel.duration && (
                    <span className="text-[10px] text-white/70 bg-black/40 px-1.5 py-0.5 rounded-sm">
                      {reel.duration}
                    </span>
                  )}
                </div>

                {/* Center: Play Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/85 text-[#303A2B] flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-white transition-all duration-300">
                    <Play className="w-5 h-5 ml-0.5 fill-[#303A2B]" />
                  </div>
                </div>

                {/* Bottom Overlay: Title & Tag on card */}
                <div className="absolute bottom-3 inset-x-3 text-white">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[#D8C8A5] block">
                    {reel.tag}
                  </span>
                  <p className="text-xs font-semibold text-white/95 line-clamp-2 leading-snug mt-0.5">
                    {reel.title}
                  </p>
                </div>
              </div>

              {/* Short title and Watch link below card */}
              <div className="pt-2 px-1 flex items-center justify-between text-xs">
                <span className="text-[#303A2B] font-medium truncate" title={reel.title}>
                  {reel.title}
                </span>
                <span className="text-[11px] text-[#788269] hover:underline shrink-0 ml-1">
                  Watch
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#788269] sm:hidden">
          <span>Swipe horizontally to explore all 7 Reels</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Immersive 9:16 Reel Video Player */}
      {activeReel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={() => setActiveReel(null)}
        >
          <div
            className="relative w-full max-w-[380px] bg-[#121212] rounded-3xl shadow-2xl overflow-hidden my-auto border border-white/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Dual Options: Watch Here vs Open Instagram */}
            <div className="flex items-center justify-between p-3.5 bg-black/60 border-b border-white/10 text-white">
              <div className="flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-[#DDA9AC]" />
                <span className="text-xs font-semibold tracking-wide">
                  Reel {activeReel.index}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveReel(null)}
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player: Authentic Vertical 9:16 Format without awkward white boxes */}
            <div className="relative w-full aspect-[9/16] bg-black overflow-hidden flex items-center justify-center">
              <iframe
                src={`https://www.instagram.com/reel/${activeReel.id}/embed`}
                title={activeReel.title}
                className="w-full h-full border-none"
                allowTransparency={true}
                allow="encrypted-media"
                loading="lazy"
              />
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-4 bg-[#181818] space-y-3">
              <div>
                <h4 className="text-xs font-bold text-white line-clamp-1">{activeReel.title}</h4>
                <p className="text-[11px] text-white/70 line-clamp-2 mt-0.5 leading-snug">
                  {activeReel.caption}
                </p>
              </div>

              {/* Exact Requested Button: "Open This Exact Reel on Instagram" */}
              <a
                href={activeReel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#303A2B] hover:bg-[#788269] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-md border border-white/15"
              >
                <Instagram className="w-4 h-4 text-[#DDA9AC]" />
                <span>Open This Exact Reel on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/70" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
