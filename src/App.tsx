import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { WishlistView } from './views/WishlistView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { ProductDetailView } from './views/ProductDetailView';
import { CustomGiftBuilder } from './components/CustomGiftBuilder';

const MainAppContent: React.FC = () => {
  const { currentPage, toast } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F1] text-[#303A2B] antialiased">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Navigation Header */}
      <Navbar />

      {/* 3. Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && <HomeView />}
        {currentPage === 'shop' && <ShopView />}
        {currentPage === 'product-detail' && <ProductDetailView />}
        {currentPage === 'about' && <AboutView />}
        {currentPage === 'custom-builder' && <CustomGiftBuilder />}
        {currentPage === 'contact' && <ContactView />}
        {currentPage === 'wishlist' && <WishlistView />}
        {currentPage === 'checkout' && <CheckoutView />}
        {currentPage === 'order-success' && <OrderSuccessView />}
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Global Slide-out Shopping Cart */}
      <CartDrawer />

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#303A2B] text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-xl border border-white/10 flex items-center gap-2 animate-bounce-subtle">
          <span className="w-2 h-2 rounded-full bg-[#DDA9AC]" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
