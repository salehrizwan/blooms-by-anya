import React, { useState } from 'react';
import { ArrowUpRight, Eye, Heart, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPKR } from '../data/brand';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, viewProductDetail } = useApp();
  const [imageLoaded, setImageLoaded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl p-2.5 sm:p-3 border border-[#D8C8A5]/50 hover:border-[#788269] hover:shadow-md transition-all duration-300">
      {/* 1. Standalone Product Image Frame */}
      <div
        onClick={() => viewProductDetail(product)}
        className="relative aspect-[4/5] w-full bg-[#FBF8F1] rounded-xl overflow-hidden border border-[#D8C8A5]/30 cursor-pointer"
      >
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#F7F1E7] animate-pulse" />
        )}

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-104 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Wishlist Button - accessible top-right */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-white/95 text-[#303A2B] hover:text-[#DDA9AC] hover:scale-110 shadow-xs transition-all cursor-pointer"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? 'fill-[#DDA9AC] text-[#DDA9AC]' : 'text-[#303A2B]'
            }`}
          />
        </button>

        {/* Hover overlay hint */}
        <div className="absolute inset-x-2 bottom-2 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-medium text-[#303A2B] bg-white/95 backdrop-blur-xs rounded-md shadow-xs">
            <Eye className="w-3.5 h-3.5 text-[#788269]" />
            <span>View Full Details</span>
          </div>
        </div>
      </div>

      {/* 2. Distinct Space Between Image and Details */}
      <div className="mt-3.5 px-1 flex flex-col flex-1 justify-between">
        <div className="space-y-1">
          {/* Collection and Subcategory Kicker (No pills, clean typography) */}
          <div className="text-[11px] text-[#788269] font-medium tracking-wide">
            <span>{product.collectionName}</span>
            <span className="mx-1 text-[#D8C8A5]">·</span>
            <span>{product.subcategoryName}</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => viewProductDetail(product)}
            className="text-xs sm:text-sm font-semibold text-[#303A2B] line-clamp-1 hover:text-[#788269] transition-colors cursor-pointer pt-0.5"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-[11px] sm:text-xs text-[#303A2B]/70 line-clamp-2 leading-relaxed pt-0.5">
            {product.description}
          </p>
        </div>

        {/* Price and Actions Section */}
        <div className="pt-3 mt-3 border-t border-[#F7F1E7]">
          {/* PKR Price */}
          <div className="flex items-baseline justify-between mb-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-bold text-[#303A2B]">
                {formatPKR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-[#303A2B]/40 line-through">
                  {formatPKR(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#788269] hidden xs:inline">
              Sialkot Delivery
            </span>
          </div>

          {/* Action Buttons: Add to Cart and View Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-2.5 text-xs font-semibold text-white bg-[#303A2B] hover:bg-[#303A2B]/90 rounded-lg transition-colors cursor-pointer shadow-xs active:scale-98"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#D8C8A5]" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={() => viewProductDetail(product)}
              className="w-full py-2 px-2.5 text-xs font-medium text-[#303A2B] bg-[#F7F1E7] hover:bg-[#D8C8A5]/40 rounded-lg transition-colors cursor-pointer text-center"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
