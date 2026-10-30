import React, { useState } from 'react';
import { ArrowLeft, Check, CheckCircle2, CreditCard, MessageCircle, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_DATA, formatPKR, getWhatsAppUrl } from '../data/brand';

export const CheckoutView: React.FC = () => {
  const { cart, cartSubtotal, clearCart, navigateTo, setLastOrder } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Sialkot');
  const [area, setArea] = useState('Sialkot Cantt');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer'>('cod');
  const [error, setError] = useState<string | null>(null);

  // Delivery fee logic: Standard inside Sialkot PKR 300, free on orders over PKR 10,000
  const deliveryFee = cartSubtotal >= 10000 ? 0 : 300;
  const grandTotal = cartSubtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#303A2B]">Your cart is currently empty</h2>
        <p className="text-xs text-[#788269]">Please add items to your cart before proceeding to checkout.</p>
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

  const generateOrderSummaryText = (orderId: string) => {
    const itemsList = cart
      .map(
        (item, i) =>
          `  ${i + 1}. ${item.product.name} × ${item.quantity} = ${formatPKR(
            item.product.price * item.quantity
          )}${item.ribbonColor ? ` (Ribbon: ${item.ribbonColor})` : ''}${
            item.greetingCardMessage ? ` [Card: "${item.greetingCardMessage}"]` : ''
          }`
      )
      .join('\n');

    return `*NEW ORDER #${orderId} - Blooms by Anya*
---------------------------------------
*Customer:* ${customerName}
*Phone:* ${phone}
*City:* ${city} (${area})
*Address:* ${deliveryAddress}
*Delivery Date:* ${deliveryDate || 'Standard delivery'}
*Payment:* ${paymentMethod === 'cod' ? 'Cash on Delivery (Sialkot)' : 'Online Bank Transfer / JazzCash'}
---------------------------------------
*Items:*
${itemsList}
---------------------------------------
*Subtotal:* ${formatPKR(cartSubtotal)}
*Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : formatPKR(deliveryFee)}
*Grand Total:* ${formatPKR(grandTotal)}
${orderNotes ? `\n*Notes:* ${orderNotes}` : ''}`;
  };

  const validateForm = () => {
    if (!customerName.trim()) {
      setError('Please provide your name.');
      return false;
    }
    if (!phone.trim()) {
      setError('Please provide your phone or WhatsApp number.');
      return false;
    }
    if (!deliveryAddress.trim()) {
      setError('Please provide your complete delivery address.');
      return false;
    }
    setError(null);
    return true;
  };

  const handlePlaceOrder = (viaWhatsApp = false) => {
    if (!validateForm()) return;

    const orderId = `BBA-${Math.floor(100000 + Math.random() * 900000)}`;
    const summaryText = generateOrderSummaryText(orderId);

    const orderData = {
      orderId,
      date: new Date().toLocaleDateString('en-PK', { dateStyle: 'long' }),
      customerName,
      phone,
      city,
      area,
      deliveryAddress,
      deliveryDate,
      orderNotes,
      paymentMethod,
      items: [...cart],
      cartSubtotal,
      deliveryFee,
      grandTotal,
      summaryText,
    };

    setLastOrder(orderData);
    clearCart();

    if (viaWhatsApp) {
      const url = getWhatsAppUrl(summaryText);
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    navigateTo('order-success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Back button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-1.5 text-xs text-[#788269] hover:text-[#303A2B] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Checkout Details Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#D8C8A5]/50 shadow-xs space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#303A2B] tracking-tight">
              Order Checkout
            </h1>
            <p className="text-xs text-[#788269] mt-1">
              Please enter your delivery details for Sialkot and surrounding areas.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
              {error}
            </div>
          )}

          {/* Customer Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#788269]">
              1. Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#303A2B] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Khan"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#FBF8F1] border border-[#D8C8A5]/60 rounded-md focus:outline-none focus:ring-1 focus:ring-[#788269]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#303A2B] mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#FBF8F1] border border-[#D8C8A5]/60 rounded-md focus:outline-none focus:ring-1 focus:ring-[#788269]"
                />
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="space-y-3 pt-3 border-t border-[#F7F1E7]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#788269]">
              2. Delivery Address &amp; Schedule
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#303A2B] mb-1">City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#FBF8F1] border border-[#D8C8A5]/60 rounded-md focus:outline-none focus:ring-1 focus:ring-[#788269]"
                >
                  <option value="Sialkot">Sialkot (Primary Coverage)</option>
                  <option value="Daska">Daska (by arrangement)</option>
                  <option value="Sambrial">Sambrial (by arrangement)</option>
                  <option value="Pasrur">Pasrur (by arrangement)</option>
                  <option value="Other">Other City in Pakistan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#303A2B] mb-1">
                  Area / Neighborhood
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cantt, Model Town, Kashmir Road"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#FBF8F1] border border-[#D8C8A5]/60 rounded-md focus:outline-none focus:ring-1 focus:ring-[#788269]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#303A2B] mb-1">
                Complete Street Address &amp; Landmark *
              </label>
              <textarea
                rows={2}
                required
                placeholder="House / Flat #, Street name, Near Landmark..."
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-[#FBF8F1] border border-[#D8C8A5]/60 rounded-md focus:outline-none focus:ring-1 focus:ring-[#788269]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#303A2B] mb-1">
                Target Delivery Date
              </label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-[#FBF8F1] border border-[#D8C8A5]/60 rounded-md focus:outline-none focus:ring-1 focus:ring-[#788269]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#303A2B] mb-1">
                Order Notes / Special Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Call before delivery, surprise delivery don't spoil..."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-[#FBF8F1] border border-[#D8C8A5]/60 rounded-md focus:outline-none focus:ring-1 focus:ring-[#788269]"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3 pt-3 border-t border-[#F7F1E7]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#788269]">
              3. Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#303A2B] bg-[#F7F1E7]'
                    : 'border-[#D8C8A5]/50 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-0.5 accent-[#303A2B]"
                />
                <div className="text-xs">
                  <div className="font-semibold text-[#303A2B]">Cash on Delivery</div>
                  <div className="text-[11px] text-[#788269] mt-0.5">
                    Pay in cash upon doorstep delivery in Sialkot.
                  </div>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-[#303A2B] bg-[#F7F1E7]'
                    : 'border-[#D8C8A5]/50 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={() => setPaymentMethod('bank_transfer')}
                  className="mt-0.5 accent-[#303A2B]"
                />
                <div className="text-xs">
                  <div className="font-semibold text-[#303A2B]">Bank Transfer / JazzCash</div>
                  <div className="text-[11px] text-[#788269] mt-0.5">
                    Account details shared via WhatsApp for advance payment.
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-[#D8C8A5]/60 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#303A2B] pb-3 border-b border-[#F7F1E7]">
              Order Summary ({cart.length} item{cart.length > 1 ? 's' : ''})
            </h3>

            {/* Items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-3 text-xs">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-14 rounded-md object-cover bg-[#F7F1E7] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#303A2B] truncate">{item.product.name}</h4>
                    <div className="text-[11px] text-[#788269]">
                      Qty: {item.quantity} × {formatPKR(item.product.price)}
                    </div>
                    {item.ribbonColor && (
                      <div className="text-[10px] text-[#303A2B]/70 truncate">
                        Ribbon: {item.ribbonColor}
                      </div>
                    )}
                  </div>
                  <div className="font-bold text-[#303A2B] shrink-0">
                    {formatPKR(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-3 border-t border-[#F7F1E7] space-y-2 text-xs">
              <div className="flex justify-between text-[#303A2B]/80">
                <span>Subtotal</span>
                <span className="font-medium">{formatPKR(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-[#303A2B]/80">
                <span>Delivery (Sialkot)</span>
                <span className="font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  ) : (
                    formatPKR(deliveryFee)
                  )}
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-2 border-t border-[#F7F1E7] text-sm font-bold text-[#303A2B]">
                <span>Total Amount</span>
                <span className="text-lg">{formatPKR(grandTotal)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 space-y-2">
              {/* WhatsApp instant checkout option */}
              <button
                type="button"
                onClick={() => handlePlaceOrder(true)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#788269] hover:bg-[#788269]/90 text-white rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm &amp; Order on WhatsApp</span>
              </button>

              {/* Standard website place order */}
              <button
                type="button"
                onClick={() => handlePlaceOrder(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#303A2B] hover:bg-[#303A2B]/90 text-white rounded-md text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <Check className="w-4 h-4 text-[#D8C8A5]" />
                <span>Place Order on Website</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#788269] pt-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Configurable WhatsApp · Authentic Local Handcraft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
