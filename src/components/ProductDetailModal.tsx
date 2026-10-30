import React, { useState } from 'react';
import { Check, Clock, Heart, MessageCircle, Package, Ruler, ShoppingBag, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_DATA, formatPKR, getWhatsAppUrl } from '../data/brand';

export const ProductDetailModal: React.FC = () => {
  const {
    activeModalProduct: product,
    closeProductModal,
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [greetingCardMessage, setGreetingCardMessage] = useState('');
  const [ribbonColor, setRibbonColor] = useState('Champagne Gold');
  const [customNote, setCustomNote] = useState('');

  if (!product) return null;

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const activeImage = images[activeImageIndex] || product.image;
  const wishlisted = isWishlisted(product.id);

  const ribbonOptions = [
    { name: 'Champagne Gold', color: '#D8C8A5' },
    { name: 'Blush Pink', color: '#DDA9AC' },
    { name: 'Sage Green', color: '#788269' },
    { name: 'Crimson Red', color: '#8B0000' },
    { name: 'Midnight Black', color: '#1A1A1A' },
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      greetingCardMessage: greetingCardMessage.trim() || undefined,
      ribbonColor,
      customNote: customNote.trim() || undefined,
    });
    closeProductModal();
  };

  const handleWhatsAppOrder = () => {
    const summary = `Product: ${product.name}
Collection: ${product.collectionName} (${product.subcategoryName})
Quantity: ${quantity}
Price: ${formatPKR(product.price * quantity)}
Ribbon Color: ${ribbonColor}
${greetingCardMessage ? `Greeting Card Note: "${greetingCardMessage}"\n` : ''}${customNote ? `Special Request: ${customNote}\n` : ''}Delivery: Sialkot, Pakistan`;

    const url = getWhatsAppUrl(
      `*Blooms by Anya - Product Order Inquiry*\n\n${summary}\n\nPlease confirm availability!`
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in"
      onClick={closeProductModal}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FFFFFF] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row border border-[#D8C8A5]/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeProductModal}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 text-[#303A2B] hover:text-[#303A2B] hover:bg-[#F7F1E7] transition-colors cursor-pointer shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Gallery */}
        <div className="md:w-1/2 bg-[#F7F1E7] flex flex-col justify-between p-4 sm:p-6">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white shadow-xs border border-[#D8C8A5]/30">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#788269] shadow-xs'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Customization */}
        <div className="md:w-1/2 p-5 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[88vh]">
          <div className="space-y-4">
            {/* Header: Category & Wishlist */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-[#788269] font-medium tracking-wide">
                <span>{product.collectionName}</span>
                <span className="mx-1 text-[#D8C8A5]">·</span>
                <span>{product.subcategoryName}</span>
              </div>
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="inline-flex items-center gap-1.5 text-xs text-[#303A2B] hover:text-[#DDA9AC] transition-colors cursor-pointer"
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlisted ? 'fill-[#DDA9AC] text-[#DDA9AC]' : 'text-[#303A2B]'
                  }`}
                />
                <span>{wishlisted ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>

            {/* Product Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#303A2B] tracking-tight leading-snug">
              {product.name}
            </h2>

            {/* Price Row */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#303A2B]">
                {formatPKR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#303A2B]/40 line-through">
                  {formatPKR(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Full Editorial Description */}
            <p className="text-xs sm:text-sm text-[#303A2B]/80 leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Specifications / Highlights */}
            <div className="space-y-2 py-3 border-y border-[#F7F1E7] text-xs text-[#303A2B]/90">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#788269] shrink-0" />
                <span>
                  <strong>Lead Time:</strong> {product.leadTime}
                </span>
              </div>
              {product.dimensions && (
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#788269] shrink-0" />
                  <span>
                    <strong>Dimensions:</strong> {product.dimensions}
                  </span>
                </div>
              )}
              <div className="flex items-start gap-2">
                <Package className="w-4 h-4 text-[#788269] shrink-0 mt-0.5" />
                <div>
                  <strong>Includes:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-[#303A2B]/75 pl-1">
                    {product.includes.map((inc, i) => (
                      <li key={i}>{inc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Ribbon Color Customization */}
            <div>
              <label className="block text-xs font-semibold text-[#303A2B] mb-2">
                Ribbon Wrap Tone: <span className="text-[#788269] font-normal">{ribbonColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {ribbonOptions.map((opt) => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setRibbonColor(opt.name)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md border transition-all cursor-pointer ${
                      ribbonColor === opt.name
                        ? 'border-[#303A2B] bg-[#F7F1E7] font-medium text-[#303A2B]'
                        : 'border-[#D8C8A5]/50 text-[#303A2B]/70 hover:border-[#788269]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: opt.color }}
                    />
                    <span>{opt.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Handwritten Greeting Note Input */}
            <div>
              <label className="block text-xs font-semibold text-[#303A2B] mb-1">
                Complimentary Greeting Card Message (Optional)
              </label>
              <input
                type="text"
                maxLength={180}
                placeholder="e.g., Happy 25th Birthday Fatima! Lots of love..."
                value={greetingCardMessage}
                onChange={(e) => setGreetingCardMessage(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-[#FBF8F1] border border-[#D8C8A5]/60 rounded-md focus:outline-none focus:ring-1 focus:ring-[#788269]"
              />
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="pt-5 mt-4 border-t border-[#F7F1E7] space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-[#D8C8A5]/60 rounded-md bg-[#FBF8F1]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-xs font-medium text-[#303A2B] hover:bg-[#F7F1E7] transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-2 text-xs font-semibold text-[#303A2B] min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-xs font-medium text-[#303A2B] hover:bg-[#F7F1E7] transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#303A2B] hover:bg-[#303A2B]/90 text-white rounded-md text-xs sm:text-sm font-medium transition-colors shadow-xs cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#D8C8A5]" />
                <span>Add to Cart ({formatPKR(product.price * quantity)})</span>
              </button>
            </div>

            {/* Direct WhatsApp Ordering */}
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#788269] hover:bg-[#788269]/90 text-white rounded-md text-xs font-medium transition-colors shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp (Instant Confirmation)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
