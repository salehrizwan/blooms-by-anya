import React from 'react';
import { Gift, Heart, Instagram, MapPin, Sparkles, Wand2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_DATA } from '../data/brand';

export const AboutView: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Editorial Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#788269]">
          <Heart className="w-3.5 h-3.5 text-[#DDA9AC]" />
          <span>OUR STORY &amp; ETHOS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#303A2B] tracking-tight">
          Handmade Bouquets &amp; DIY Hampers
        </h1>
        <p className="text-base sm:text-lg text-[#303A2B]/80 leading-relaxed font-normal">
          Thoughtful gifts, beautifully created in Sialkot, Pakistan.
        </p>
      </div>

      {/* Main Story & Visual Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
        <div className="lg:col-span-6 relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7F1E7] border border-[#D8C8A5]/50 shadow-md">
            <img
              src="/images/products/6.jpeg"
              alt="Handmade bouquets and DIY hampers Blooms by Anya"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl shadow-lg border border-[#D8C8A5]/40 flex items-center gap-3">
            <img
              src={BRAND_DATA.logoUrl}
              alt="Logo"
              className="w-12 h-12 rounded-full object-contain"
            />
            <div>
              <div className="text-xs font-bold text-[#303A2B]">Blooms by Anya</div>
              <div className="text-[11px] text-[#788269]">Crafted in Sialkot, Pakistan</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-[#303A2B]/85 leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-bold text-[#303A2B] tracking-tight">
            Crafting Emotion into Every Detail
          </h2>

          <p>
            At <strong>Blooms by Anya</strong>, we believe every special moment deserves more than an off-the-shelf purchase. A handmade gift carries intention, warmth, and a personal touch that leaves a lasting memory.
          </p>

          <p>
            Operating from Sialkot, Punjab, our studio specializes in bespoke floral artistry, custom celebration hampers, and creative gift styling. From velvety red rose bouquets and vibrant sunflowers to intricate origami money arrangements and illuminated helium balloon domes, every piece is made to order with patient craftsmanship.
          </p>

          <p>
            We focus on balance, color harmony, and tactile beauty—combining high-grade Korean wrapping papers, soft satin ribbons, wax seals, and complimentary handwritten greeting cards.
          </p>

          <div className="pt-2">
            <a
              href={BRAND_DATA.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#303A2B] hover:text-[#788269] transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#DDA9AC]" />
              <span>Explore our studio world on Instagram ({BRAND_DATA.instagram.handle})</span>
            </a>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 bg-white rounded-2xl border border-[#D8C8A5]/40 shadow-2xs space-y-2.5">
          <div className="w-10 h-10 rounded-lg bg-[#F7F1E7] flex items-center justify-center text-[#788269]">
            <Heart className="w-5 h-5 text-[#DDA9AC]" />
          </div>
          <h3 className="text-sm font-bold text-[#303A2B]">Handmade with Love</h3>
          <p className="text-xs text-[#303A2B]/75 leading-relaxed">
            No mass production lines. Each flower stem is trimmed and positioned by hand, and every chocolate box is arranged with meticulous styling.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#D8C8A5]/40 shadow-2xs space-y-2.5">
          <div className="w-10 h-10 rounded-lg bg-[#F7F1E7] flex items-center justify-center text-[#788269]">
            <Wand2 className="w-5 h-5 text-[#D99B20]" />
          </div>
          <h3 className="text-sm font-bold text-[#303A2B]">Bespoke Customization</h3>
          <p className="text-xs text-[#303A2B]/75 leading-relaxed">
            Tailor colors, ribbon tones, chocolate brands, and cash origami denominations to match the recipient’s unique personality.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#D8C8A5]/40 shadow-2xs space-y-2.5">
          <div className="w-10 h-10 rounded-lg bg-[#F7F1E7] flex items-center justify-center text-[#788269]">
            <MapPin className="w-5 h-5 text-[#788269]" />
          </div>
          <h3 className="text-sm font-bold text-[#303A2B]">Local Sialkot Care</h3>
          <p className="text-xs text-[#303A2B]/75 leading-relaxed">
            Reliable doorstep delivery and car surprise trunk setups throughout Sialkot Cantt, Model Town, Kashmir Road, and surrounding areas.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#303A2B] text-white p-8 sm:p-12 rounded-3xl text-center space-y-4">
        <h3 className="text-2xl font-bold tracking-tight text-[#F7F1E7]">
          Ready to create something beautiful?
        </h3>
        <p className="text-xs sm:text-sm text-[#F7F1E7]/80 max-w-lg mx-auto">
          Explore our four curated collections or design your own bespoke gift with our builder.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="px-5 py-2.5 bg-[#D8C8A5] text-[#303A2B] font-semibold text-xs rounded-md hover:bg-white transition-colors cursor-pointer"
          >
            Explore Shop
          </button>
          <button
            type="button"
            onClick={() => navigateTo('custom-builder')}
            className="px-5 py-2.5 bg-white/10 text-white font-semibold text-xs rounded-md border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
          >
            Custom Gift Builder
          </button>
        </div>
      </div>
    </div>
  );
};
