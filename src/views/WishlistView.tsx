import React from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const WishlistView: React.FC = () => {
  const { wishlist, toggleWishlist, navigateTo } = useApp();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#788269] mb-2">
          <Heart className="w-3.5 h-3.5 fill-[#DDA9AC] text-[#DDA9AC]" />
          <span>SAVED FAVORITES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#303A2B] tracking-tight">
          Your Wishlist
        </h1>
        <p className="mt-2 text-sm text-[#303A2B]/75">
          Keep track of your dream bouquets and hampers, or save gifts for upcoming celebrations.
        </p>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#D8C8A5]/40 p-8 max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F7F1E7] text-[#DDA9AC] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#303A2B]">No saved items yet</h3>
            <p className="text-xs text-[#788269] mt-1">
              Click the heart icon on any bouquet or hamper to save it to your wishlist.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="px-5 py-2.5 bg-[#303A2B] hover:bg-[#303A2B]/90 text-white rounded-md text-xs font-semibold transition-colors cursor-pointer"
          >
            Explore Collections
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-[#788269] pb-3 border-b border-[#D8C8A5]/40">
            <span>
              You have <strong className="text-[#303A2B]">{wishlistedProducts.length}</strong> saved creations
            </span>
            <button
              type="button"
              onClick={() => {
                wishlistedProducts.forEach((p) => toggleWishlist(p.id));
              }}
              className="text-red-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Wishlist</span>
            </button>
          </div>

          {/* Product Cards Grid: Exactly 4 per row on Desktop, 2 per row on Mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
