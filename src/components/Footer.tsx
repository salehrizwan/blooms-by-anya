import React from 'react';
import { Heart, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_DATA, getWhatsAppUrl } from '../data/brand';
import { CollectionId } from '../types';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-[#303A2B] text-[#F7F1E7] border-t border-[#303A2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={BRAND_DATA.logoUrl}
                alt="Blooms by Anya Logo"
                className="w-12 h-12 rounded-full object-contain border border-[#D8C8A5]/40"
              />
              <div>
                <span className="text-xl font-bold tracking-tight text-[#F7F1E7] block leading-tight">
                  Blooms by Anya
                </span>
                <span className="text-xs text-[#D8C8A5] font-normal">
                  Handmade Bouquets &amp; DIY Hampers
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F7F1E7]/75 max-w-sm leading-relaxed">
              Thoughtful gifts, beautifully created. We craft hand-tied flower bouquets, custom hampers, and celebration surprises for every milestone in Sialkot, Pakistan.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#D8C8A5]">
              <MapPin className="w-4 h-4 text-[#D8C8A5] shrink-0" />
              <span>Sialkot, Punjab, Pakistan</span>
            </div>
          </div>

          {/* Four Collections */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D8C8A5]">
              Our Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#F7F1E7]/80">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', 'bouquets' as CollectionId)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fresh &amp; Money Bouquets
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', 'hampers' as CollectionId)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  DIY &amp; Celebration Hampers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', 'chocolates' as CollectionId)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Luxury Chocolate Gifts
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('shop', 'custom' as CollectionId)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Custom Creations &amp; Car Setups
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links & Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D8C8A5]">
              Contact &amp; Orders
            </h4>
            <div className="space-y-2 text-xs text-[#F7F1E7]/80">
              <a
                href={getWhatsAppUrl(BRAND_DATA.whatsapp.defaultGreeting)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#D8C8A5] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#788269]" />
                <span>WhatsApp: {BRAND_DATA.whatsapp.displayNumber}</span>
              </a>

              <a
                href={BRAND_DATA.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#D8C8A5] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#DDA9AC]" />
                <span>Instagram: {BRAND_DATA.instagram.handle}</span>
              </a>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigateTo('custom-builder')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D8C8A5] text-[#303A2B] rounded text-xs font-semibold hover:bg-white transition-colors cursor-pointer"
                >
                  <span>Build Custom Gift</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F1E7]/60">
          <div>
            &copy; {new Date().getFullYear()} Blooms by Anya. All rights reserved. Sialkot, Pakistan.
          </div>
          <div className="flex items-center gap-1">
            <span>Handmade with</span>
            <Heart className="w-3.5 h-3.5 fill-[#DDA9AC] text-[#DDA9AC]" />
            <span>in Sialkot</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
