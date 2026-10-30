import React from 'react';
import { Instagram, MapPin, Sparkles } from 'lucide-react';
import { BRAND_DATA } from '../data/brand';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#303A2B] text-[#F7F1E7] text-xs font-normal py-2 px-4 border-b border-[#303A2B]/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
        <div className="flex items-center justify-center gap-2">
          <span className="flex items-center gap-1.5 text-[#D8C8A5] font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#D99B20]" />
            Thoughtful gifts, beautifully created
          </span>
          <span className="hidden md:inline text-[#D8C8A5]/40">·</span>
          <span className="hidden md:flex items-center gap-1 text-[#F7F1E7]/80">
            <MapPin className="w-3 h-3 text-[#D8C8A5]" />
            Handmade in Sialkot, Pakistan
          </span>
        </div>

        <div className="flex items-center gap-4 text-[#F7F1E7]/90 text-[11px] sm:text-xs">
          <span className="text-[#D8C8A5]">Same-day &amp; scheduled delivery across Sialkot</span>
          <span className="text-[#D8C8A5]/40">·</span>
          <a
            href={BRAND_DATA.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-[#D8C8A5] transition-colors"
          >
            <Instagram className="w-3.5 h-3.5 text-[#DDA9AC]" />
            <span className="underline decoration-[#DDA9AC]/60 underline-offset-2">@blooms_by_anya</span>
          </a>
        </div>
      </div>
    </div>
  );
};
