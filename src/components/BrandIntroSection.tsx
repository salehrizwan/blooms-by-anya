import React from 'react';
import { Award, Heart, Sparkles } from 'lucide-react';
import { BRAND_DATA } from '../data/brand';

export const BrandIntroSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Image Collage / Workshop Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-[#F7F1E7] border border-[#D8C8A5]/40 shadow-sm">
                <img
                  src="/images/products/6.jpeg"
                  alt="Blooms by Anya handcrafted hampers and bouquets"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Inset Badge */}
              <div className="absolute -bottom-5 -right-3 sm:bottom-4 sm:right-4 bg-[#303A2B] text-white p-4 rounded-xl shadow-lg border border-white/20 max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#D99B20]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#D8C8A5]">
                    Sialkot Boutique
                  </span>
                </div>
                <p className="text-xs text-[#F7F1E7]/85 leading-snug">
                  Every bouquet hand-tied, every ribbon pressed with care.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#788269]">
              <Heart className="w-3.5 h-3.5 text-[#DDA9AC]" />
              <span>ABOUT BLOOMS BY ANYA</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#303A2B] tracking-tight">
              Handmade Bouquets &amp; DIY Hampers. <br />
              <span className="text-[#788269]">Thoughtful gifts, beautifully created.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#303A2B]/80 leading-relaxed font-normal">
              Based in Sialkot, Pakistan, <strong>Blooms by Anya</strong> began with a simple belief: the best gifts are the ones created with genuine thought and artistic care. Whether it’s a delicate rose posy for a quiet morning, an elaborate multi-tiered celebration hamper, or a viral folded money bouquet for a wedding milestone, every order is crafted by hand.
            </p>

            <p className="text-xs sm:text-sm text-[#303A2B]/75 leading-relaxed">
              We handpick our blooms daily, curate premium chocolates and treats, and finish each creation with satin ribbons, custom wax seals, and heartfelt personalized notes.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3 text-left">
              <div className="p-3.5 bg-[#FBF8F1] rounded-xl border border-[#D8C8A5]/40">
                <div className="text-xs font-bold text-[#303A2B]">Artisan Craftsmanship</div>
                <div className="text-[11px] text-[#788269] mt-0.5">
                  No mass production; every stem and ribbon is hand-placed.
                </div>
              </div>

              <div className="p-3.5 bg-[#FBF8F1] rounded-xl border border-[#D8C8A5]/40">
                <div className="text-xs font-bold text-[#303A2B]">Personalized in Sialkot</div>
                <div className="text-[11px] text-[#788269] mt-0.5">
                  Hand-written message cards and custom color themes included.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
