import React from 'react';
import { MessageCircle, ShoppingBag, Trash2, X, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_DATA, formatPKR, getWhatsAppUrl } from '../data/brand';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartCount,
    navigateTo,
  } = useApp();

  if (!isCartOpen) return null;

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const itemsSummary = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (Qty: ${item.quantity}) - ${formatPKR(
            item.product.price * item.quantity
          )}${item.ribbonColor ? `\n   Ribbon: ${item.ribbonColor}` : ''}${
            item.greetingCardMessage ? `\n   Card: "${item.greetingCardMessage}"` : ''
          }`
      )
      .join('\n');

    const message = `*Order Inquiry via Blooms by Anya Website Cart*\n\nItems:\n${itemsSummary}\n\n*Total: ${formatPKR(
      cartSubtotal
    )}*\n\nDelivery Destination: Sialkot, Pakistan\nPlease let me know how to proceed with payment and delivery!`;

    const url = getWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#D8C8A5]/40">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#F7F1E7] flex items-center justify-between bg-[#FBF8F1]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#303A2B]" />
              <h2 className="text-base font-bold text-[#303A2B]">
                Your Shopping Cart ({cartCount})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-[#303A2B]/60 hover:text-[#303A2B] hover:bg-[#F7F1E7] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-[#F7F1E7]">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F7F1E7] flex items-center justify-center text-[#788269]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#303A2B]">Your cart is empty</h3>
                  <p className="text-xs text-[#788269] mt-1 max-w-xs">
                    Explore our handmade bouquets and personalized hampers.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-4 py-2 bg-[#303A2B] text-white text-xs font-semibold rounded-md hover:bg-[#303A2B]/90 transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-3.5 first:pt-0 last:pb-0">
                  {/* Item Image */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#F7F1E7] shrink-0 border border-[#D8C8A5]/30">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-[#303A2B] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#303A2B]/40 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#788269] mt-0.5">
                        {item.product.collectionName}
                      </div>

                      {item.ribbonColor && (
                        <div className="text-[10px] text-[#303A2B]/70 mt-1">
                          Ribbon: <span className="font-medium">{item.ribbonColor}</span>
                        </div>
                      )}

                      {item.greetingCardMessage && (
                        <div className="text-[10px] text-[#303A2B]/70 italic mt-0.5 truncate">
                          Card: "{item.greetingCardMessage}"
                        </div>
                      )}
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#D8C8A5]/60 rounded-md bg-[#FBF8F1]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-xs font-medium text-[#303A2B] hover:bg-[#F7F1E7] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#303A2B] min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-xs font-medium text-[#303A2B] hover:bg-[#F7F1E7] cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-[#303A2B]">
                        {formatPKR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action Buttons */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-[#FBF8F1] border-t border-[#D8C8A5]/40 space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#303A2B]/80 font-medium">Subtotal</span>
                <span className="text-base font-bold text-[#303A2B]">
                  {formatPKR(cartSubtotal)}
                </span>
              </div>
              <p className="text-[11px] text-[#788269]">
                Delivery fees calculated during checkout (standard delivery across Sialkot).
              </p>

              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleProceedCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#303A2B] hover:bg-[#303A2B]/90 text-white rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#D8C8A5]" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#788269] hover:bg-[#788269]/90 text-white rounded-md text-xs font-medium transition-colors cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp ({BRAND_DATA.whatsapp.displayNumber})</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
