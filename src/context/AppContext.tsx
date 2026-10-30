import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, CollectionId, PageView, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { BRAND_DATA, getWhatsAppUrl } from '../data/brand';

interface AppContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedCollection: CollectionId | 'all';
  setSelectedCollection: (c: CollectionId | 'all') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, options?: { greetingCardMessage?: string; ribbonColor?: string; customNote?: string }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistCount: number;
  
  // Product Detail Page & Modal
  activeModalProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  viewProductDetail: (product: Product) => void;

  // Active Reel Modal for embedded play
  activeReelModal: { id: string; url: string; title: string } | null;
  openReelModal: (reel: { id: string; url: string; title: string }) => void;
  closeReelModal: () => void;
  
  // Toast notifications
  toast: string | null;
  showToast: (message: string) => void;
  
  // Navigation helper
  navigateTo: (page: PageView, collection?: CollectionId | 'all') => void;
  
  // WhatsApp order helper
  sendWhatsAppOrder: (orderSummary: string) => void;

  // Last completed order
  lastOrder: any | null;
  setLastOrder: (order: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'blooms_by_anya_cart_v1';
const WISHLIST_STORAGE_KEY = 'blooms_by_anya_wishlist_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCollection, setSelectedCollection] = useState<CollectionId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart state with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Hydrate product references
        return parsed.map((item: any) => {
          const actualProduct = PRODUCTS.find((p) => p.id === item.product.id) || item.product;
          return { ...item, product: actualProduct };
        });
      }
    } catch (e) {
      console.warn('Failed reading cart from localStorage', e);
    }
    return [];
  });

  // Wishlist state with localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [activeReelModal, setActiveReelModal] = useState<{ id: string; url: string; title: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<any | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist', e);
    }
  }, [wishlist]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  const navigateTo = (page: PageView, collection: CollectionId | 'all' = 'all') => {
    setSelectedCollection(collection);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    options?: { greetingCardMessage?: string; ribbonColor?: string; customNote?: string }
  ) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prevCart];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          greetingCardMessage: options?.greetingCardMessage ?? next[existingIndex].greetingCardMessage,
          ribbonColor: options?.ribbonColor ?? next[existingIndex].ribbonColor,
          customNote: options?.customNote ?? next[existingIndex].customNote,
        };
        return next;
      } else {
        return [
          ...prevCart,
          {
            product,
            quantity,
            greetingCardMessage: options?.greetingCardMessage,
            ribbonColor: options?.ribbonColor,
            customNote: options?.customNote,
          },
        ];
      }
    });
    showToast(`Added "${product.name}" to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  const openProductModal = (product: Product) => {
    setActiveModalProduct(product);
  };

  const closeProductModal = () => {
    setActiveModalProduct(null);
  };

  const viewProductDetail = (product: Product) => {
    setActiveModalProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openReelModal = (reel: { id: string; url: string; title: string }) => {
    setActiveReelModal(reel);
  };

  const closeReelModal = () => {
    setActiveReelModal(null);
  };

  const sendWhatsAppOrder = (orderSummary: string) => {
    const text = `*New Order Request via Blooms by Anya Website*\n\n${orderSummary}\n\nPlease confirm availability and payment details. Thank you!`;
    const url = getWhatsAppUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedCollection,
        setSelectedCollection,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount,
        activeModalProduct,
        openProductModal,
        closeProductModal,
        viewProductDetail,
        activeReelModal,
        openReelModal,
        closeReelModal,
        toast,
        showToast,
        navigateTo,
        sendWhatsAppOrder,
        lastOrder,
        setLastOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
