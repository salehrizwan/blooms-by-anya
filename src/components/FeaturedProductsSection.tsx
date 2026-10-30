import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

export const FeaturedProductsSection: React.FC = () => {
  const { navigateTo } = useApp();

  // Pick exactly 8 featured products (2 rows of 4 on desktop, 4 rows of 2 on mobile)
  const featuredProducts = PRODUCTS.filter((p) => p.featured || p.bestseller).slice(0, 8);

  return (
    <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#D8C8A5]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#788269] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D99B20]" />
              <span>HANDMADE PERFECTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#303A2B] tracking-tight">
              Featured Creations
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#303A2B]/75 max-w-xl">
              Our most-loved bouquets and handcrafted hampers, made fresh to order in Sialkot.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('shop', 'all')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#303A2B] hover:text-[#788269] transition-colors cursor-pointer self-start sm:self-auto group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 text-[#788269] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Cards Grid: Exactly 4 per row on Desktop, 2 per row on Mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
