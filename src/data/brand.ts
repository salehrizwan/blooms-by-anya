export interface BrandInfo {
  name: string;
  tagline: string;
  description: string;
  instagram: {
    handle: string;
    url: string;
  };
  location: {
    city: string;
    country: string;
    display: string;
    deliveryCoverage: string[];
  };
  whatsapp: {
    number: string; // international format without + or spaces
    displayNumber: string;
    defaultGreeting: string;
  };
  logoUrl: string;
  colors: {
    warmIvory: string;
    softCream: string;
    sageGreen: string;
    botanicalGreen: string;
    blushPink: string;
    champagneGold: string;
    sunflowerGold: string;
  };
}

export const BRAND_DATA: BrandInfo = {
  name: 'Blooms by Anya',
  tagline: 'Handmade Bouquets & DIY Hampers',
  description: 'Handmade Bouquets & DIY Hampers. Thoughtful gifts, beautifully created in Sialkot, Pakistan.',
  instagram: {
    handle: '@blooms_by_anya',
    url: 'https://www.instagram.com/blooms_by_anya/',
  },
  location: {
    city: 'Sialkot',
    country: 'Pakistan',
    display: 'Sialkot, Punjab, Pakistan',
    deliveryCoverage: [
      'Sialkot Cantt',
      'Model Town',
      'Kashmir Road',
      'Paris Road',
      'Khadim Ali Road',
      'Daska & Sambrial (by arrangement)',
    ],
  },
  whatsapp: {
    // Configurable WhatsApp business phone number
    number: '923000000000',
    displayNumber: '+92 300 0000000',
    defaultGreeting: 'Hello Blooms by Anya! I would like to inquire about a custom order.',
  },
  logoUrl: '/images/logo.png',
  colors: {
    warmIvory: '#F7F1E7',
    softCream: '#FBF8F1',
    sageGreen: '#788269',
    botanicalGreen: '#303A2B',
    blushPink: '#DDA9AC',
    champagneGold: '#D8C8A5',
    sunflowerGold: '#D99B20',
  },
};

export function getWhatsAppUrl(text: string, customNumber?: string): string {
  const number = customNumber || BRAND_DATA.whatsapp.number;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`;
}
