import React from 'react';
import { ArrowRight, Gift, Heart, Sparkles, Wand2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CustomGiftTeaser: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-[#F7F1E7] via-[#FBF8F1] to-[#F7F1E7] border-y border-[#D8C8A5]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#303A2B] text-white rounded-3xl p-6 sm:p-10 lg:p-14 overflow-hidden relative shadow-lg">
          {/* Subtle decorative background circles */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#788269]/20 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#DDA9AC]/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-[#D8C8A5]">
                <Wand2 className="w-3.5 h-3.5 text-[#D99B20]" />
                <span>BESPOKE SURPRISE SERVICE</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F7F1E7]">
                Have a specific vision in mind? <br />
                Let us build your custom gift.
              </h2>

              <p className="text-sm sm:text-base text-[#F7F1E7]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Choose your favorite flowers, imported chocolates, ribbon palette, money origami stems, and custom message. We craft every detail according to your exact budget in Sialkot.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  type="button"
                  onClick={() => navigateTo('custom-builder')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D8C8A5] hover:bg-[#D8C8A5]/90 text-[#303A2B] rounded-md text-sm font-semibold transition-all cursor-pointer shadow-xs"
                >
                  <Gift className="w-4 h-4 text-[#303A2B]" />
                  <span>Open Custom Gift Builder</span>
                  <ArrowRight className="w-4 h-4 text-[#303A2B]" />
                </button>
              </div>
            </div>

            {/* Right side highlights */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-left">
              <div className="p-4 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <Sparkles className="w-5 h-5 text-[#D99B20] mb-2" />
                <div className="text-xs font-bold text-white">Any Budget</div>
                <div className="text-[11px] text-[#F7F1E7]/70 mt-0.5">
                  Flexible options from PKR 3,000 to bespoke luxury
                </div>
              </div>

              <div className="p-4 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <Heart className="w-5 h-5 text-[#DDA9AC] mb-2" />
                <div className="text-xs font-bold text-white">Handmade Details</div>
                <div className="text-[11px] text-[#F7F1E7]/70 mt-0.5">
                  Hand-folded money stems, wax seals &amp; ribbons
                </div>
              </div>

              <div className="p-4 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <Gift className="w-5 h-5 text-[#D8C8A5] mb-2" />
                <div className="text-xs font-bold text-white">Free Card &amp; Wrap</div>
                <div className="text-[11px] text-[#F7F1E7]/70 mt-0.5">
                  Complimentary handwritten card in every gift
                </div>
              </div>

              <div className="p-4 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <Wand2 className="w-5 h-5 text-[#788269] mb-2" />
                <div className="text-xs font-bold text-white">Car Surprises</div>
                <div className="text-[11px] text-[#F7F1E7]/70 mt-0.5">
                  Full trunk decoration setups across Sialkot
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
