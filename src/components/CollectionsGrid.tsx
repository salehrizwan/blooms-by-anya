import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COLLECTIONS_META } from '../data/products';
import { CollectionId } from '../types';

export const CollectionsGrid: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="py-16 sm:py-20 bg-[#FBF8F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#788269] block mb-2">
            CURATED FOR EVERY OCCASION
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#303A2B] tracking-tight">
            Our Four Signature Collections
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#303A2B]/75">
            Thoughtfully organized into four gifting worlds—from hand-tied florals to bespoke custom hampers.
          </p>
        </div>

        {/* Four Cards Grid: 1 col on mobile, 2 cols on tablet, 4 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLECTIONS_META.map((col) => (
            <div
              key={col.id}
              onClick={() => navigateTo('shop', col.id as CollectionId)}
              className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#D8C8A5]/40 hover:border-[#788269] shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F7F1E7]">
                <img
                  src={col.image}
                  alt={col.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Subcategories list overlay */}
                <div className="absolute bottom-4 inset-x-4 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {col.name}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#303A2B] group-hover:text-white transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
                    {col.tagline}
                  </p>
                </div>
              </div>

              {/* Subcategories list below */}
              <div className="p-4 bg-white flex flex-col justify-between flex-1">
                <p className="text-xs text-[#303A2B]/70 leading-relaxed mb-3">
                  {col.description}
                </p>
                <div className="pt-2 border-t border-[#F7F1E7] flex flex-wrap gap-1.5 text-[11px] text-[#788269]">
                  {col.subcategories.slice(0, 3).map((sub, i) => (
                    <span key={sub.id}>
                      {sub.name}
                      {i < 2 ? ' · ' : ''}
                    </span>
                  ))}
                  {col.subcategories.length > 3 && (
                    <span className="text-[#D8C8A5] font-medium">+ more</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
