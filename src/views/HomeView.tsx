import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FeaturedProductsSection } from '../components/FeaturedProductsSection';
import { CollectionsGrid } from '../components/CollectionsGrid';
import { CustomGiftTeaser } from '../components/CustomGiftTeaser';
import { TheBloomsEdit } from '../components/TheBloomsEdit';
import { BrandIntroSection } from '../components/BrandIntroSection';
import { InstagramFollowSection } from '../components/InstagramFollowSection';

export const HomeView: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* 4. Beautiful Hero Section */}
      <HeroSection />

      {/* 5. Featured Products (Strict 4 desktop, 2 mobile) */}
      <FeaturedProductsSection />

      {/* 6. Four Main Shopping Collections */}
      <CollectionsGrid />

      {/* 7. Custom Gifting Section */}
      <CustomGiftTeaser />

      {/* 8. The Blooms Edit Instagram Reels Showcase with Real Thumbnails */}
      <TheBloomsEdit />

      {/* 9. Short Brand Introduction */}
      <BrandIntroSection />

      {/* 10. Instagram Follow Section */}
      <InstagramFollowSection />
    </div>
  );
};
