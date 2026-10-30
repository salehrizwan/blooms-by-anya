export type CollectionId = 'bouquets' | 'hampers' | 'chocolates' | 'custom';

export interface Product {
  id: string;
  name: string;
  collection: CollectionId;
  collectionName: string;
  subcategory: string;
  subcategoryName: string;
  price: number; // PKR
  originalPrice?: number;
  description: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  featured?: boolean;
  bestseller?: boolean;
  inStock: boolean;
  leadTime: string;
  dimensions?: string;
  includes: string[];
  customizableNotes?: string;
}

export interface ReelItem {
  id: string;
  index: number;
  url: string;
  title: string;
  caption: string;
  thumbnail: string;
  duration?: string;
  tag: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  greetingCardMessage?: string;
  ribbonColor?: string;
  customNote?: string;
}

export interface CustomGiftForm {
  occasion: string;
  giftType: string;
  colorPalette: string;
  flowerOrChocolate: string;
  budgetPkr: number;
  recipientName: string;
  deliveryDate: string;
  personalMessage: string;
  additionalNotes: string;
}

export interface CheckoutForm {
  customerName: string;
  phone: string;
  city: string;
  area: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  orderNotes: string;
  paymentMethod: 'cod' | 'bank_transfer';
}

export type PageView =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'about'
  | 'custom-builder'
  | 'contact'
  | 'cart'
  | 'checkout'
  | 'wishlist'
  | 'order-success';
