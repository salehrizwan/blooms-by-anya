import React, { useState } from 'react';
import { Check, Gift, Heart, MessageCircle, Sparkles, Wand2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_DATA, formatPKR, getWhatsAppUrl } from '../data/brand';
import { Product } from '../types';

export const CustomGiftBuilder: React.FC = () => {
  const { addToCart, showToast } = useApp();

  const occasions = [
    { id: 'birthday', label: 'Birthday Celebration' },
    { id: 'anniversary', label: 'Anniversary & Romantic' },
    { id: 'proposal', label: 'Proposal & Engagement' },
    { id: 'graduation', label: 'Graduation & Milestone' },
    { id: 'apology', label: 'Apology / Thinking of You' },
    { id: 'eid', label: 'Eid & Festive Gifting' },
    { id: 'just-because', label: 'Just Because / Appreciation' },
  ];

  const giftTypes = [
    { id: 'bouquet', label: 'Handcrafted Bouquet', hint: 'Roses, sunflowers, or mixed' },
    { id: 'hamper', label: 'Luxury Gift Hamper Box', hint: 'DIY curated crate' },
    { id: 'chocolates', label: 'Chocolate Box or Tower', hint: 'Ferrero & artisan truffles' },
    { id: 'balloon-dome', label: 'Balloon & Floral Dome', hint: 'Personalized crystal balloon' },
    { id: 'money-bouquet', label: 'Origami Money Bouquet', hint: 'Banknotes + florals' },
    { id: 'car-surprise', label: 'Car Trunk Surprise Setup', hint: 'On-site in Sialkot' },
  ];

  const colorPalettes = [
    { id: 'crimson-gold', name: 'Crimson & Champagne Gold', preview: '#8B0000, #D8C8A5' },
    { id: 'blush-ivory', name: 'Pastel Blush & Soft Ivory', preview: '#DDA9AC, #FBF8F1' },
    { id: 'sunflower-sage', name: 'Sunflower Sunshine & Sage', preview: '#D99B20, #788269' },
    { id: 'midnight-luxe', name: 'Midnight Black & Satin Gold', preview: '#1A1A1A, #D8C8A5' },
    { id: 'botanical-cream', name: 'Botanical Green & Cream', preview: '#303A2B, #F7F1E7' },
  ];

  const flowerChocPreferences = [
    { id: 'fresh-roses', label: 'Fresh Long-Stem Roses' },
    { id: 'sunflowers', label: 'Bright Golden Sunflowers' },
    { id: 'mixed-meadow', label: 'Pastel Lilies & Mixed Blooms' },
    { id: 'ferrero', label: 'Ferrero Rocher Hazelnut Pralines' },
    { id: 'gourmet-snacks', label: 'Imported Chocolates & Savory Snacks' },
    { id: 'origami-money', label: 'Folded Cash / Banknotes Stems' },
    { id: 'teddy-accent', label: 'Plush Cuddly Teddy Bear Accent' },
  ];

  const [occasion, setOccasion] = useState(occasions[0].label);
  const [giftType, setGiftType] = useState(giftTypes[0].label);
  const [colorPalette, setColorPalette] = useState(colorPalettes[0].name);
  const [selectedElements, setSelectedElements] = useState<string[]>([
    'Fresh Long-Stem Roses',
    'Ferrero Rocher Hazelnut Pralines',
  ]);
  const [budgetPkr, setBudgetPkr] = useState<number>(6500);
  const [recipientName, setRecipientName] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const toggleElement = (label: string) => {
    setSelectedElements((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const budgetPresets = [3500, 5000, 7500, 10000, 15000, 20000];

  const orderSummaryText = `*Custom Gift Request - Blooms by Anya*
• Occasion: ${occasion}
• Gift Type: ${giftType}
• Color Palette: ${colorPalette}
• Elements: ${selectedElements.join(', ') || 'Artisan Choice'}
• Budget: ${formatPKR(budgetPkr)}
• Recipient: ${recipientName.trim() || 'Not specified'}
• Delivery Date: ${deliveryDate.trim() || 'Flexible'}
${personalMessage.trim() ? `• Greeting Note: "${personalMessage.trim()}"\n` : ''}${additionalNotes.trim() ? `• Notes: ${additionalNotes.trim()}\n` : ''}Location: Sialkot, Pakistan`;

  const handleSendWhatsAppInquiry = () => {
    const url = getWhatsAppUrl(
      `Hello Blooms by Anya! I used your website Custom Gift Builder to design a custom gift:\n\n${orderSummaryText}\n\nCould you please let me know if this can be arranged?`
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddCustomToCart = () => {
    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      name: `Bespoke ${giftType} (${occasion})`,
      collection: 'custom',
      collectionName: 'Custom Creations',
      subcategory: 'custom-order',
      subcategoryName: 'Custom Builder Order',
      price: budgetPkr,
      description: `${colorPalette} · ${selectedElements.slice(0, 3).join(', ')}`,
      fullDescription: `Custom designed order: ${giftType} for ${occasion}. Color Palette: ${colorPalette}. Selected elements: ${selectedElements.join(', ')}.`,
      image: '/images/products/comfort-crate-hamper.jpeg',
      gallery: ['/images/products/comfort-crate-hamper.jpeg'],
      inStock: true,
      leadTime: '24-48 hours',
      includes: selectedElements,
      customizableNotes: additionalNotes,
    };

    addToCart(customProduct, 1, {
      greetingCardMessage: personalMessage,
      ribbonColor: colorPalette,
      customNote: `Custom Order: ${orderSummaryText}`,
    });
    showToast('Custom creation added to your cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F1E7] border border-[#D8C8A5]/60 rounded-full text-xs font-medium text-[#788269] mb-3">
          <Wand2 className="w-3.5 h-3.5 text-[#D99B20]" />
          <span>BESPOKE GIFT DESIGNER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#303A2B] tracking-tight">
          Custom Gift Builder
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#303A2B]/75 leading-relaxed">
          Tell us about the occasion, your preferred style, and budget. We will handcraft a one-of-a-kind surprise in Sialkot.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Form Steps */}
        <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#D8C8A5]/50 shadow-xs">
          
          {/* Step 1: Occasion */}
          <div>
            <label className="block text-sm font-semibold text-[#303A2B] mb-2">
              1. What is the Occasion?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {occasions.map((occ) => (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => setOccasion(occ.label)}
                  className={`p-2.5 text-xs rounded-lg border text-left transition-all cursor-pointer ${
                    occasion === occ.label
                      ? 'border-[#303A2B] bg-[#F7F1E7] font-semibold text-[#303A2B] shadow-2xs'
                      : 'border-[#D8C8A5]/50 text-[#303A2B]/70 hover:border-[#788269]'
                  }`}
                >
                  {occ.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Gift Type */}
          <div>
            <label className="block text-sm font-semibold text-[#303A2B] mb-2">
              2. Choose Gift Format
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {giftTypes.map((gt) => (
                <button
                  key={gt.id}
                  type="button"
                  onClick={() => setGiftType(gt.label)}
                  className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                    giftType === gt.label
                      ? 'border-[#303A2B] bg-[#F7F1E7] shadow-2xs'
                      : 'border-[#D8C8A5]/50 hover:border-[#788269]'
                  }`}
                >
                  <div className="text-xs font-semibold text-[#303A2B]">{gt.label}</div>
                  <div className="text-[11px] text-[#788269] mt-0.5">{gt.hint}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Color Palette */}
          <div>
            <label className="block text-sm font-semibold text-[#303A2B] mb-2">
              3. Color Theme &amp; Ribbon Palette
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {colorPalettes.map((cp) => (
                <button
                  key={cp.id}
                  type="button"
                  onClick={() => setColorPalette(cp.name)}
                  className={`flex items-center justify-between p-3 rounded-lg border text-xs text-left transition-all cursor-pointer ${
                    colorPalette === cp.name
                      ? 'border-[#303A2B] bg-[#F7F1E7] font-semibold text-[#303A2B]'
                      : 'border-[#D8C8A5]/50 text-[#303A2B]/80 hover:border-[#788269]'
                  }`}
                >
                  <span>{cp.name}</span>
                  <div className="flex gap-1">
                    {cp.preview.split(',').map((hex, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-black/10"
                        style={{ backgroundColor: hex.trim() }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Flower & Chocolate Preferences */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-[#303A2B]">
                4. Elements to Include
              </label>
              <span className="text-[11px] text-[#788269]">Select all you wish to feature</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {flowerChocPreferences.map((elem) => {
                const isSelected = selectedElements.includes(elem.label);
                return (
                  <button
                    key={elem.id}
                    type="button"
                    onClick={() => toggleElement(elem.label)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#788269] bg-[#F7F1E7] font-medium text-[#303A2B]'
                        : 'border-[#D8C8A5]/50 text-[#303A2B]/70 hover:border-[#788269]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#788269] border-[#788269] text-white'
                          : 'border-[#D8C8A5]'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <span>{elem.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 5: Budget Slider & Presets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-[#303A2B]">
                5. Estimated Budget (PKR)
              </label>
              <span className="text-base font-bold text-[#303A2B]">
                {formatPKR(budgetPkr)}
              </span>
            </div>

            <input
              type="range"
              min={3000}
              max={30000}
              step={500}
              value={budgetPkr}
              onChange={(e) => setBudgetPkr(Number(e.target.value))}
              className="w-full accent-[#788269] cursor-pointer"
            />

            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {budgetPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setBudgetPkr(preset)}
                  className={`px-2.5 py-1 text-xs rounded-md border transition-all cursor-pointer ${
                    budgetPkr === preset
                      ? 'border-[#303A2B] bg-[#303A2B] text-white font-medium'
                      : 'border-[#D8C8A5]/60 bg-[#FBF8F1] text-[#303A2B]/80 hover:bg-[#F7F1E7]'
                  }`}
                >
                  {formatPKR(preset)}
                </button>
              ))}
            </div>
          </div>

          {/* Step 6: Personal Note & Instructions */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#303A2B] mb-1">
                  Recipient Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Ayesha, Dr. Zain..."
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#FBF8F1] border border-[#D8C8A5]/60 rounded-md focus:outline-none focus:ring-1 focus:ring-[#788269]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#303A2B] mb-1">
                  Desired Delivery Date (Sialkot)
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#FBF8F1] border border-[#D8C8A5]/60 rounded-md focus:outline-none focus:ring-1 focus:ring-[#788269]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#303A2B] mb-1">
                Handwritten Card Message (Complimentary)
              </label>
              <textarea
                rows={2}
                placeholder="Write the heartfelt message to be written inside our complimentary card..."
                value={personalMessage}
                onChange={(e) => setPersonalMessage(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-[#FBF8F1] border border-[#D8C8A5]/60 rounded-md focus:outline-none focus:ring-1 focus:ring-[#788269]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#303A2B] mb-1">
                Special Requests or Specific Chocolates / Florals
              </label>
              <textarea
                rows={2}
                placeholder="e.g., Add Dairy Milk Silk, extra baby's breath, delivery in Cantt area..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-[#FBF8F1] border border-[#D8C8A5]/60 rounded-md focus:outline-none focus:ring-1 focus:ring-[#788269]"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Summary & Direct WhatsApp Inquiry */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="bg-[#303A2B] text-white p-6 rounded-2xl shadow-lg border border-[#303A2B]">
            <div className="flex items-center justify-between pb-4 border-b border-white/15">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D99B20]" />
                <h3 className="text-sm font-semibold tracking-wide uppercase text-[#D8C8A5]">
                  Custom Gift Summary
                </h3>
              </div>
              <span className="text-xs text-white/60">Blooms by Anya</span>
            </div>

            {/* Summary Details */}
            <div className="py-4 space-y-3 text-xs text-white/90">
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-white/60">Occasion:</span>
                <span className="font-semibold text-right">{occasion}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-white/60">Gift Format:</span>
                <span className="font-semibold text-right">{giftType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-white/60">Color Palette:</span>
                <span className="font-semibold text-right">{colorPalette}</span>
              </div>
              <div className="py-1 border-b border-white/10">
                <span className="text-white/60 block mb-1">Included Elements:</span>
                <span className="font-medium text-white/90 leading-relaxed block">
                  {selectedElements.length > 0 ? selectedElements.join(' · ') : 'Artisan Choice'}
                </span>
              </div>

              {recipientName && (
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/60">Recipient:</span>
                  <span className="font-semibold">{recipientName}</span>
                </div>
              )}

              {deliveryDate && (
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/60">Target Date:</span>
                  <span className="font-semibold">{deliveryDate}</span>
                </div>
              )}

              {personalMessage && (
                <div className="py-1 border-b border-white/10">
                  <span className="text-white/60 block mb-0.5">Greeting Note:</span>
                  <span className="italic text-white/85 text-[11px] block">
                    "{personalMessage}"
                  </span>
                </div>
              )}

              <div className="flex items-baseline justify-between pt-2">
                <span className="text-sm font-medium text-[#D8C8A5]">Estimated Budget:</span>
                <span className="text-xl font-bold text-white">
                  {formatPKR(budgetPkr)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleSendWhatsAppInquiry}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#788269] hover:bg-[#788269]/90 text-white rounded-md text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Inquiry via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleAddCustomToCart}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white rounded-md text-xs font-medium border border-white/20 transition-all cursor-pointer"
              >
                <Gift className="w-4 h-4 text-[#D8C8A5]" />
                <span>Add Custom Order to Website Cart</span>
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-center text-[11px] text-white/60">
              Handmade &amp; delivered with care in Sialkot, Pakistan.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
