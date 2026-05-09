import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.categories': 'Categories',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'hero.title': 'Style Meets Tradition',
    'hero.subtitle': 'Quality lifestyle products for your modern home.',
    'hero.cta': 'Shop Now',
    'home.featured': 'Featured Products',
    'home.bestsellers': 'Best Sellers',
    'home.flashsale': 'Flash Sale',
    'home.categories': 'Shop by Category',
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty.',
    'cart.checkout': 'Proceed to Checkout',
    'checkout.title': 'Checkout',
    'checkout.cod': 'Pay after receiving the product',
    'checkout.place_order': 'Place Order',
    'footer.about': 'DeshCity is your premium destination for Bangladeshi lifestyle and home decor.',
    'footer.rights': 'All rights reserved.',
  },
  bn: {
    'nav.home': 'হোম',
    'nav.shop': 'শপ',
    'nav.categories': 'ক্যাটাগরি',
    'nav.about': 'আমাদের সম্পর্কে',
    'nav.contact': 'যোগাযোগ',
    'nav.admin': 'এডমিন',
    'hero.title': 'স্টাইল ও ঐতিহ্যের মেলবন্ধন',
    'hero.subtitle': 'আপনার আধুনিক বাড়ির জন্য মানসম্মত লাইফস্টাইল পণ্য।',
    'hero.cta': 'এখনই কিনুন',
    'home.featured': 'নির্বাচিত পণ্য',
    'home.bestsellers': 'সেরা বিক্রিত',
    'home.flashsale': 'ফ্ল্যাশ সেল',
    'home.categories': 'ক্যাটাগরি অনুযায়ী কিনুন',
    'cart.title': 'শপিং কার্ট',
    'cart.empty': 'আপনার কার্ট খালি।',
    'cart.checkout': 'চেকআউট করুন',
    'checkout.title': 'চেকআউট',
    'checkout.cod': 'পণ্য বুঝে পেয়ে মূল্য পরিশোধ করুন',
    'checkout.place_order': 'অর্ডার করুন',
    'footer.about': 'দেশসিটি বাংলাদেশী লাইফস্টাইল এবং হোম ডেকোরের আপনার প্রিমিয়াম গন্তব্য।',
    'footer.rights': 'সর্বস্বত্ব সংরক্ষিত।',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
