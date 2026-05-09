import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, Globe, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-bold tracking-tighter text-black">DESH CITY</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-red-800 font-semibold">{t('hero.subtitle').split(' ')[0]} {t('hero.subtitle').split(' ')[1]}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-red-800 transition-colors uppercase tracking-widest">{t('nav.home')}</Link>
            <Link to="/shop" className="text-sm font-medium hover:text-red-800 transition-colors uppercase tracking-widest">{t('nav.shop')}</Link>
            <Link to="/categories" className="text-sm font-medium hover:text-red-800 transition-colors uppercase tracking-widest">{t('nav.categories')}</Link>
            <Link to="/about" className="text-sm font-medium hover:text-red-800 transition-colors uppercase tracking-widest">{t('nav.about')}</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="flex items-center space-x-1 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border border-black hover:bg-black hover:text-white transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'BN' : 'EN'}</span>
            </button>
            <Link to="/wishlist" className="p-2 hover:bg-gray-50 rounded-full transition-colors hidden sm:block">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="p-2 hover:bg-gray-50 rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-800 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[70] shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-bold tracking-tighter">DESH CITY</span>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col space-y-6">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium tracking-wide uppercase">{t('nav.home')}</Link>
                <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium tracking-wide uppercase">{t('nav.shop')}</Link>
                <Link to="/categories" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium tracking-wide uppercase">{t('nav.categories')}</Link>
                <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium tracking-wide uppercase">{t('nav.about')}</Link>
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium tracking-wide uppercase text-red-800">{t('nav.admin')}</Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
