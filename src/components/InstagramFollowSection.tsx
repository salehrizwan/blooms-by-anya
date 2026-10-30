import React from 'react';
import { ExternalLink, Heart, Instagram } from 'lucide-react';
import { BRAND_DATA } from '../data/brand';

export const InstagramFollowSection: React.FC = () => {
  const instagramGrid = [
    { src: '/images/products/3.jpeg', caption: 'Golden Radiance Sunflower Bouquet' },
    { src: '/images/products/4.jpeg', caption: 'Crimson Velvet Rose Bouquet' },
    { src: '/images/products/5.jpeg', caption: 'Money Bouquet, Chocolate Drawer & Teddy' },
    { src: '/images/products/6.jpeg', caption: 'Wicker Celebration Hamper & Blooms' },
    { src: '/images/products/7.jpeg', caption: 'Birthday Balloon Arch & Cake Tray' },
    { src: '/images/products/8.jpeg', caption: 'Royal Banknote Origami Bouquet' },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FBF8F1] border-t border-[#D8C8A5]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#788269] mb-2">
            <Instagram className="w-3.5 h-3.5 text-[#DDA9AC]" />
            <span>JOIN OUR FLOWER COMMUNITY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#303A2B] tracking-tight">
            Follow Us on Instagram
          </h2>
          <p className="mt-2 text-sm text-[#303A2B]/75">
            Daily studio behind-the-scenes, workshop announcements, and customer reveals in Sialkot.
          </p>
          <div className="mt-3">
            <a
              href={BRAND_DATA.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#303A2B] hover:bg-[#303A2B]/90 text-white rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer"
            >
              <Instagram className="w-4 h-4 text-[#DDA9AC]" />
              <span>Follow @blooms_by_anya</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/70" />
            </a>
          </div>
        </div>

        {/* 6 Grid Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramGrid.map((item, idx) => (
            <a
              key={idx}
              href={BRAND_DATA.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden bg-[#F7F1E7] border border-[#D8C8A5]/40 block shadow-2xs"
            >
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-2 text-white">
                <Instagram className="w-5 h-5 text-[#DDA9AC] mb-1" />
                <span className="text-[10px] font-medium line-clamp-2 leading-tight">
                  {item.caption}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
