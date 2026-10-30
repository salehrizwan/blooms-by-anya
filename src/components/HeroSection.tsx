import React from 'react';
import { ArrowRight, Gift, HeartHandshake, Sparkles, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_DATA } from '../data/brand';

export const HeroSection: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F1E7] to-[#FBF8F1] pt-10 pb-16 sm:pt-14 sm:pb-24 border-b border-[#D8C8A5]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FBF8F1] border border-[#D8C8A5]/60 rounded-full text-xs font-medium text-[#788269] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D99B20]" />
              <span>Handmade in Sialkot, Pakistan</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#303A2B] tracking-tight leading-[1.15]">
              Thoughtful gifts, <br className="hidden sm:inline" />
              <span className="text-[#788269]">beautifully created.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#303A2B]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              From hand-tied fresh rose bouquets and viral origami money creations to custom birthday hampers and celebration decor. Every gift is handcrafted with intention.
            </p>

            {/* Shopping Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigateTo('shop', 'all')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#303A2B] hover:bg-[#303A2B]/90 text-white rounded-md text-sm font-semibold transition-all shadow-xs cursor-pointer group"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4 text-[#D8C8A5] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => navigateTo('custom-builder')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FBF8F1] hover:bg-[#F7F1E7] border border-[#D8C8A5] text-[#303A2B] rounded-md text-sm font-semibold transition-all shadow-xs cursor-pointer"
              >
                <Gift className="w-4 h-4 text-[#788269]" />
                <span>Custom Gift Builder</span>
              </button>
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#D8C8A5]/30 text-left">
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-[#788269] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#303A2B]">Sialkot Delivery</div>
                  <div className="text-[11px] text-[#788269]">Same-day available</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <HeartHandshake className="w-4 h-4 text-[#788269] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#303A2B]">100% Handmade</div>
                  <div className="text-[11px] text-[#788269]">Artisan crafted</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Gift className="w-4 h-4 text-[#788269] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#303A2B]">Personalized</div>
                  <div className="text-[11px] text-[#788269]">Free card &amp; ribbon</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Product Showcase Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-[#F7F1E7]">
                <img
                  src="/images/products/3.jpeg"
                  alt="Golden Radiance Sunflower Bouquet"
                  loading="eager"
                  className="w-full h-full object-cover object-center"
                />

                {/* Floating Official Brand Seal */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs p-2 rounded-full shadow-md border border-[#D8C8A5]/50 flex items-center justify-center">
                  <img
                    src={BRAND_DATA.logoUrl}
                    alt="Blooms by Anya Seal"
                    className="w-14 h-14 rounded-full object-contain"
                  />
                </div>

                {/* Floating Price & Quality Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl shadow-lg border border-[#D8C8A5]/40 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#788269] font-medium block">
                      Signature Bouquet
                    </span>
                    <span className="text-sm font-bold text-[#303A2B]">
                      Golden Radiance Sunflowers
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('shop', 'bouquets')}
                    className="text-xs font-semibold text-[#303A2B] bg-[#F7F1E7] hover:bg-[#D8C8A5]/40 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
                  >
                    View All
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
