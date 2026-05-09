import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden bg-[#FBE8D3]">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://picsum.photos/seed/deshcity-hero/1920/1080?brightness=0.8" 
          alt="DeshCity Lifestyle" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30 md:bg-transparent md:bg-gradient-to-r md:from-black/60 md:to-transparent" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs md:text-sm font-bold uppercase tracking-[0.5em] mb-4 text-red-100"
          >
            Premium Bangladeshi Brand
          </motion.p>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight mb-8"
          >
            {t('hero.title').split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? 'italic text-red-500 block md:inline' : ''}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-lg leading-relaxed font-light"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link 
              to="/shop" 
              className="group bg-white text-black px-8 py-4 rounded-full font-bold flex items-center justify-center space-x-2 hover:bg-red-800 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              <span>{t('hero.cta')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link 
              to="/categories" 
              className="px-8 py-4 rounded-full font-bold border border-white/50 text-white hover:bg-white/10 transition-colors text-center"
            >
              Explore Collections
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute right-12 bottom-12 hidden lg:flex flex-col items-center space-y-4">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 rotate-90 origin-right whitespace-nowrap">EST. 2024</span>
        <div className="w-[1px] h-20 bg-white/30" />
      </div>
    </section>
  );
}
