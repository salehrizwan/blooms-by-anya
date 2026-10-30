import React, { useState } from 'react';
import { ArrowLeft, Check, Clock, Heart, MessageCircle, Package, Ruler, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_DATA, formatPKR, getWhatsAppUrl } from '../data/brand';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailView: React.FC = () => {
  const {
    activeModalProduct: product,
    addToCart,
    toggleWishlist,
    isWishlisted,
    navigateTo,
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [greetingCardMessage, setGreetingCardMessage] = useState('');
  const [ribbonColor, setRibbonColor] = useState('Champagne Gold');
  const [customNote, setCustomNote] = useState('');

  // Fallback to first product if none selected
  const currentProduct = product || PRODUCTS[0];
  const wishlisted = isWishlisted(currentProduct.id);

  const ribbonOptions = [
    { name: 'Champagne Gold', color: '#D8C8A5' },
    { name: 'Blush Pink', color: '#DDA9AC' },
    { name: 'Sage Green', color: '#788269' },
    { name: 'Crimson Red', color: '#8B0000' },
    { name: 'Midnight Black', color: '#1A1A1A' },
  ];

  const handleAddToCart = () => {
    addToCart(currentProduct, quantity, {
      greetingCardMessage: greetingCardMessage.trim() || undefined,
      ribbonColor,
      customNote: customNote.trim() || undefined,
    });
  };

  const handleWhatsAppOrder = () => {
    const summary = `Product: ${currentProduct.name}
Collection: ${currentProduct.collectionName} (${currentProduct.subcategoryName})
Quantity: ${quantity}
Price: ${formatPKR(currentProduct.price * quantity)}
Ribbon Color: ${ribbonColor}
${greetingCardMessage ? `Greeting Card Note: "${greetingCardMessage}"\n` : ''}${customNote ? `Special Request: ${customNote}\n` : ''}Delivery: Sialkot, Pakistan`;

    const url = getWhatsAppUrl(
      `*Blooms by Anya - Product Order Inquiry*\n\n${summary}\n\nPlease confirm availability and delivery schedule!`
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Related products from same collection
  const relatedProducts = PRODUCTS.filter(
    (p) => p.collection === currentProduct.collection && p.id !== currentProduct.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 animate-fade-in">
      {/* Navigation Breadcrumb & Back button */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D8C8A5]/30">
        <button
          type="button"
          onClick={() => navigateTo('shop', currentProduct.collection)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#303A2B] hover:text-[#788269] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#788269]" />
          <span>Back to {currentProduct.collectionName}</span>
        </button>

        <div className="text-xs text-[#788269] hidden sm:flex items-center gap-1.5">
          <span className="hover:text-[#303A2B] cursor-pointer" onClick={() => navigateTo('home')}>Home</span>
          <span>/</span>
          <span className="hover:text-[#303A2B] cursor-pointer" onClick={() => navigateTo('shop', currentProduct.collection)}>
            {currentProduct.collectionName}
          </span>
          <span>/</span>
          <span className="text-[#303A2B] font-medium truncate max-w-xs">{currentProduct.name}</span>
        </div>
      </div>

      {/* Main Product Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
        
        {/* Left Column: Dedicated Single Product Photography (Exactly 1 picture as requested) */}
        <div className="lg:col-span-6 sticky top-28">
          <div className="bg-white rounded-3xl p-3 sm:p-4 border border-[#D8C8A5]/50 shadow-md">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#F7F1E7]">
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                loading="eager"
                className="w-full h-full object-cover object-center"
              />

              {/* Wishlist toggle */}
              <button
                type="button"
                onClick={() => toggleWishlist(currentProduct.id)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 text-[#303A2B] hover:text-[#DDA9AC] shadow-md transition-all cursor-pointer"
                aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlisted ? 'fill-[#DDA9AC] text-[#DDA9AC]' : 'text-[#303A2B]'
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="mt-3 text-center text-xs text-[#788269]">
            Authentic photo of creation by Blooms by Anya in Sialkot
          </div>
        </div>

        {/* Right Column: Full Specifications & Customization */}
        <div className="lg:col-span-6 space-y-6">
          {/* Collection kicker */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#788269]">
              {currentProduct.collectionName}
            </span>
            <span className="text-xs text-[#D8C8A5]">·</span>
            <span className="text-xs text-[#788269] font-medium">
              {currentProduct.subcategoryName}
            </span>
          </div>

          {/* Product Name */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#303A2B] tracking-tight leading-snug">
            {currentProduct.name}
          </h1>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-[#D8C8A5]/30">
            <span className="text-2xl sm:text-3xl font-bold text-[#303A2B]">
              {formatPKR(currentProduct.price)}
            </span>
            {currentProduct.originalPrice && (
              <span className="text-base text-[#303A2B]/40 line-through">
                {formatPKR(currentProduct.originalPrice)}
              </span>
            )}
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md font-medium ml-2">
              In Stock · Fresh to order
            </span>
          </div>

          {/* Full Description */}
          <div className="space-y-3 text-sm text-[#303A2B]/85 leading-relaxed">
            <p>{currentProduct.fullDescription}</p>
            {currentProduct.customizableNotes && (
              <p className="text-xs text-[#788269] bg-[#F7F1E7] p-3 rounded-lg border border-[#D8C8A5]/40">
                Note: {currentProduct.customizableNotes}
              </p>
            )}
          </div>

          {/* Specifications Box */}
          <div className="p-4 bg-[#FBF8F1] rounded-2xl border border-[#D8C8A5]/40 space-y-2.5 text-xs text-[#303A2B]/90">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#788269] shrink-0" />
              <span>
                <strong>Preparation &amp; Delivery:</strong> {currentProduct.leadTime}
              </span>
            </div>
            {currentProduct.dimensions && (
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#788269] shrink-0" />
                <span>
                  <strong>Dimensions:</strong> {currentProduct.dimensions}
                </span>
              </div>
            )}
            <div className="flex items-start gap-2 pt-1 border-t border-[#D8C8A5]/20">
              <Package className="w-4 h-4 text-[#788269] shrink-0 mt-0.5" />
              <div>
                <strong>Includes in arrangement:</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-[#303A2B]/75 pl-1">
                  {currentProduct.includes.map((inc, i) => (
                    <li key={i}>{inc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Customization: Ribbon Wrap Tone */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#303A2B]">
              Ribbon Color Preference: <span className="text-[#788269] font-normal">{ribbonColor}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {ribbonOptions.map((opt) => (
                <button
                  key={opt.name}
                  type="button"
                  onClick={() => setRibbonColor(opt.name)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${
                    ribbonColor === opt.name
                      ? 'border-[#303A2B] bg-[#F7F1E7] font-semibold text-[#303A2B] shadow-2xs'
                      : 'border-[#D8C8A5]/60 text-[#303A2B]/70 hover:border-[#788269]'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: opt.color }}
                  />
                  <span>{opt.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Complimentary Greeting Card Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#303A2B]">
              Complimentary Handwritten Greeting Card Note (Optional)
            </label>
            <input
              type="text"
              maxLength={180}
              placeholder="e.g. Wishing you a very Happy Birthday! Love always..."
              value={greetingCardMessage}
              onChange={(e) => setGreetingCardMessage(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-[#FBF8F1] border border-[#D8C8A5]/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#788269]"
            />
          </div>

          {/* Order Actions */}
          <div className="pt-4 border-t border-[#D8C8A5]/30 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-[#D8C8A5]/70 rounded-lg bg-[#FBF8F1]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2.5 text-sm font-semibold text-[#303A2B] hover:bg-[#F7F1E7] cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 text-sm font-bold text-[#303A2B] min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2.5 text-sm font-semibold text-[#303A2B] hover:bg-[#F7F1E7] cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 bg-[#303A2B] hover:bg-[#303A2B]/90 text-white rounded-lg text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-98"
              >
                <ShoppingBag className="w-4 h-4 text-[#D8C8A5]" />
                <span>Add to Cart ({formatPKR(currentProduct.price * quantity)})</span>
              </button>
            </div>

            {/* Direct WhatsApp Ordering */}
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#788269] hover:bg-[#788269]/90 text-white rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp ({BRAND_DATA.whatsapp.displayNumber})</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-[#788269] pt-2">
            <ShieldCheck className="w-4 h-4 text-[#788269]" />
            <span>Handmade with care and doorstep delivery across Sialkot, Pakistan</span>
          </div>
        </div>

      </div>

      {/* Related Products from same collection */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#D8C8A5]/40">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#303A2B] tracking-tight">
              More from {currentProduct.collectionName}
            </h2>
            <button
              type="button"
              onClick={() => navigateTo('shop', currentProduct.collection)}
              className="text-xs font-semibold text-[#788269] hover:text-[#303A2B] transition-colors cursor-pointer"
            >
              View Collection
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
