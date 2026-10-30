import React from 'react';
import { CheckCircle2, MessageCircle, ShoppingBag, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_DATA, formatPKR, getWhatsAppUrl } from '../data/brand';

export const OrderSuccessView: React.FC = () => {
  const { lastOrder, navigateTo } = useApp();

  if (!lastOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#303A2B]">No recent order found</h2>
        <p className="text-xs text-[#788269]">Browse our collections to create a gift.</p>
        <button
          type="button"
          onClick={() => navigateTo('shop')}
          className="px-5 py-2.5 bg-[#303A2B] text-white text-xs font-semibold rounded-md hover:bg-[#303A2B]/90 transition-colors"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleOpenWhatsApp = () => {
    const url = getWhatsAppUrl(
      `Hello Blooms by Anya! Here is my confirmed order #${lastOrder.orderId}:\n\n${lastOrder.summaryText}\n\nPlease confirm delivery schedule. Thank you!`
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D8C8A5]/60 shadow-lg space-y-6 text-center sm:text-left">
        {/* Success Icon & Header */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b border-[#F7F1E7]">
          <div className="w-16 h-16 rounded-full bg-[#788269]/10 text-[#788269] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#788269] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D99B20]" />
              <span>Order Received Successfully</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#303A2B] tracking-tight">
              Thank You, {lastOrder.customerName}!
            </h1>
            <p className="text-xs sm:text-sm text-[#788269] mt-0.5">
              Order Reference: <strong className="text-[#303A2B]">{lastOrder.orderId}</strong> · {lastOrder.date}
            </p>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#303A2B]/85 py-2">
          <div className="p-4 bg-[#FBF8F1] rounded-xl border border-[#D8C8A5]/40 space-y-1">
            <div className="font-bold text-[#303A2B] text-xs">Delivery Information:</div>
            <div>{lastOrder.deliveryAddress}</div>
            <div className="text-[#788269]">{lastOrder.area}, {lastOrder.city}</div>
            <div className="text-[#788269]">Phone: {lastOrder.phone}</div>
            {lastOrder.deliveryDate && <div>Schedule: {lastOrder.deliveryDate}</div>}
          </div>

          <div className="p-4 bg-[#FBF8F1] rounded-xl border border-[#D8C8A5]/40 space-y-1">
            <div className="font-bold text-[#303A2B] text-xs">Payment &amp; Status:</div>
            <div>Method: {lastOrder.paymentMethod === 'cod' ? 'Cash on Delivery (Sialkot)' : 'Bank Transfer / JazzCash'}</div>
            <div>Total: <strong className="text-[#303A2B]">{formatPKR(lastOrder.grandTotal)}</strong></div>
            <div className="text-[#788269]">Status: Order Queued for Preparation</div>
          </div>
        </div>

        {/* Items Summary */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#788269]">
            Ordered Creations
          </h3>
          <div className="divide-y divide-[#F7F1E7] border-y border-[#F7F1E7]">
            {lastOrder.items.map((item: any, i: number) => (
              <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#303A2B]">
                    {item.product.name} × {item.quantity}
                  </span>
                  {item.ribbonColor && (
                    <span className="text-[11px] text-[#788269]">({item.ribbonColor})</span>
                  )}
                </div>
                <span className="font-bold text-[#303A2B]">
                  {formatPKR(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps & WhatsApp Forward */}
        <div className="p-4 bg-[#F7F1E7] rounded-xl border border-[#D8C8A5]/60 text-xs space-y-2">
          <div className="font-semibold text-[#303A2B]">What Happens Next?</div>
          <p className="text-[#303A2B]/80 leading-relaxed">
            Our floristry studio in Sialkot will prepare your handmade arrangement. For faster confirmation, updates on flower availability, or custom card wording, connect directly with our WhatsApp desk:
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#788269] hover:bg-[#788269]/90 text-white rounded-md font-semibold transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp with Order Reference</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="px-5 py-2.5 bg-[#303A2B] hover:bg-[#303A2B]/90 text-white rounded-md font-semibold transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
