import React, { useState } from 'react';
import { CheckCircle2, Instagram, MapPin, MessageCircle, Send, Sparkles } from 'lucide-react';
import { BRAND_DATA, getWhatsAppUrl } from '../data/brand';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!phone.trim()) {
      setError('Please provide your phone or WhatsApp number.');
      return;
    }
    if (!message.trim()) {
      setError('Please provide a short message or inquiry.');
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  const handleSendViaWhatsApp = () => {
    const text = `*New Inquiry via Blooms by Anya Website Contact Form*\n• Name: ${name || 'Customer'}\n• Phone: ${phone || 'Not provided'}\n• Subject: ${subject || 'General Inquiry'}\n• Message: ${message || 'Hello, I would like to inquire about an order.'}`;
    const url = getWhatsAppUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#788269] block mb-2">
          GET IN TOUCH
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#303A2B] tracking-tight">
          We’d Love to Hear From You
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#303A2B]/75">
          Have a question about bouquet sizes, custom hamper styling, or same-day delivery in Sialkot? Reach out via WhatsApp or our contact form.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Official Channels & Delivery Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* WhatsApp Direct Card */}
          <div className="p-6 bg-white rounded-2xl border border-[#D8C8A5]/50 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#788269]/10 flex items-center justify-center text-[#788269]">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#303A2B]">WhatsApp Inquiries</h3>
                <p className="text-xs text-[#788269]">Instant replies &amp; order confirmations</p>
              </div>
            </div>

            <p className="text-xs text-[#303A2B]/80 leading-relaxed">
              For real-time coordination, photo references, and custom bouquet requests, WhatsApp is our quickest channel.
            </p>

            <a
              href={getWhatsAppUrl(BRAND_DATA.whatsapp.defaultGreeting)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#788269] hover:bg-[#788269]/90 text-white rounded-md text-xs font-semibold transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp ({BRAND_DATA.whatsapp.displayNumber})</span>
            </a>
          </div>

          {/* Instagram Profile Card */}
          <div className="p-6 bg-white rounded-2xl border border-[#D8C8A5]/50 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#DDA9AC]/20 flex items-center justify-center text-[#DDA9AC]">
                <Instagram className="w-5 h-5 text-[#303A2B]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#303A2B]">Instagram</h3>
                <p className="text-xs text-[#788269]">{BRAND_DATA.instagram.handle}</p>
              </div>
            </div>

            <p className="text-xs text-[#303A2B]/80 leading-relaxed">
              Explore our latest reels, behind-the-scenes wrapping videos, and client reviews on our official profile.
            </p>

            <a
              href={BRAND_DATA.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#F7F1E7] hover:bg-[#D8C8A5]/40 text-[#303A2B] border border-[#D8C8A5]/60 rounded-md text-xs font-semibold transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#DDA9AC]" />
              <span>Visit Instagram Profile</span>
            </a>
          </div>

          {/* Sialkot Location & Delivery Zones */}
          <div className="p-6 bg-[#303A2B] text-white rounded-2xl shadow-md space-y-3">
            <div className="flex items-center gap-2 text-[#D8C8A5]">
              <MapPin className="w-4 h-4" />
              <h3 className="text-xs font-semibold uppercase tracking-wider">
                Location &amp; Delivery Areas
              </h3>
            </div>
            <p className="text-sm font-bold text-[#F7F1E7]">
              {BRAND_DATA.location.display}
            </p>
            <p className="text-xs text-[#F7F1E7]/80 leading-relaxed">
              We offer doorstep delivery and scheduled surprise setups across:
            </p>
            <div className="grid grid-cols-2 gap-1.5 pt-1 text-xs text-[#F7F1E7]/90">
              {BRAND_DATA.location.deliveryCoverage.map((area, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D8C8A5]" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#D8C8A5]/50 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#D99B20]" />
            <h2 className="text-lg font-bold text-[#303A2B]">Send Us a Message</h2>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-[#788269]/10 text-[#788269] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[#303A2B]">
                Thank you for your message, {name}!
              </h3>
              <p className="text-xs text-[#303A2B]/75 max-w-md mx-auto leading-relaxed">
                We have received your inquiry. For immediate confirmation, you can also connect directly with us on WhatsApp.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2">
                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="px-4 py-2.5 bg-[#788269] text-white text-xs font-semibold rounded-md hover:bg-[#788269]/90 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Forward Message to WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-4 py-2.5 bg-[#F7F1E7] text-[#303A2B] text-xs font-semibold rounded-md hover:bg-[#D8C8A5]/40 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#303A2B] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fatima Ali"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

              <div>
                <label className="block text-xs font-semibold text-[#303A2B] mb-1">
                  Subject or Occasion
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rose bouquet inquiry, car trunk surprise booking"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#FBF8F1] border border-[#D8C8A5]/60 rounded-md focus:outline-none focus:ring-1 focus:ring-[#788269]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#303A2B] mb-1">
                  Message / Order Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Please specify any preferred flowers, colors, budget, or event dates..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#FBF8F1] border border-[#D8C8A5]/60 rounded-md focus:outline-none focus:ring-1 focus:ring-[#788269]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#303A2B] hover:bg-[#303A2B]/90 text-white rounded-md text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4 text-[#D8C8A5]" />
                  <span>Submit Message</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-[#788269] hover:bg-[#788269]/90 text-white rounded-md text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Quick WhatsApp Inquiry</span>
                </button>
              </div>

              <p className="text-[11px] text-[#788269] text-center pt-2">
                We respect your privacy and will only use your details for order fulfillment.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
