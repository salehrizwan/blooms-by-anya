import React, { useState } from 'react';
import { Heart, Menu, MessageCircle, ShoppingBag, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_DATA, formatPKR, getWhatsAppUrl } from '../data/brand';
import { PageView } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    wishlistCount,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageView; collection?: any }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'Custom Gifts', page: 'custom-builder' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageView, collection: any = 'all') => {
    navigateTo(page, collection);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF8F1]/95 backdrop-blur-md border-b border-[#D8C8A5]/30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#303A2B] hover:text-[#788269] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#788269]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <img
              src={BRAND_DATA.logoUrl}
              alt="Blooms by Anya Logo"
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-contain shadow-xs border border-[#D8C8A5]/40"
              loading="eager"
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-semibold tracking-tight text-[#303A2B] leading-tight">
                Blooms by Anya
              </span>
              <span className="text-[11px] sm:text-xs text-[#788269] font-normal tracking-wide">
                Handmade Bouquets &amp; Hampers · Sialkot
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-[#303A2B]">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.page, link.collection)}
                  className={`relative py-2 transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#303A2B] font-semibold'
                      : 'text-[#303A2B]/80 hover:text-[#303A2B]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#788269] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons: WhatsApp, Wishlist, Cart */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Quick WhatsApp Inquiry */}
            <a
              href={getWhatsAppUrl(BRAND_DATA.whatsapp.defaultGreeting)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#303A2B] bg-[#F7F1E7] hover:bg-[#D8C8A5]/30 border border-[#D8C8A5]/60 rounded-md transition-colors"
              title="Chat with us on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#788269]" />
              <span>WhatsApp</span>
            </a>

            {/* Wishlist */}
            <button
              type="button"
              onClick={() => handleNavClick('wishlist')}
              className="relative p-2 text-[#303A2B] hover:text-[#788269] transition-colors cursor-pointer"
              aria-label="View Wishlist"
              title="Saved items"
            >
              <Heart
                className={`w-5 h-5 ${
                  wishlistCount > 0 ? 'fill-[#DDA9AC] text-[#DDA9AC]' : 'text-[#303A2B]'
                }`}
              />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-semibold text-white bg-[#DDA9AC] rounded-full leading-none">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center gap-2 p-2 sm:px-3 sm:py-2 text-[#F7F1E7] bg-[#303A2B] hover:bg-[#303A2B]/90 rounded-md transition-colors cursor-pointer shadow-xs"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#D8C8A5]" />
              <span className="hidden sm:inline text-xs font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-[#303A2B] bg-[#D8C8A5] rounded-full leading-none">
                  {cartCount}
                </span>
              )}
              {cartSubtotal > 0 && (
                <span className="hidden md:inline text-xs font-normal text-[#D8C8A5]/90 border-l border-[#F7F1E7]/20 pl-2">
                  {formatPKR(cartSubtotal)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF8F1] border-b border-[#D8C8A5]/40 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link.page, link.collection)}
                className={`text-left px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                  currentPage === link.page
                    ? 'bg-[#F7F1E7] text-[#303A2B] font-semibold'
                    : 'text-[#303A2B]/80 hover:bg-[#F7F1E7]/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#D8C8A5]/30 flex flex-col gap-2">
            <a
              href={getWhatsAppUrl(BRAND_DATA.whatsapp.defaultGreeting)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#788269] text-white rounded-md text-sm font-medium hover:bg-[#788269]/90 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp ({BRAND_DATA.whatsapp.displayNumber})
            </a>
            <div className="text-center text-xs text-[#788269] pt-1">
              Handcrafted with care in Sialkot, Pakistan
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
