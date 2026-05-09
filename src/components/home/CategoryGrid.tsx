import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { Category } from '../../types';
import { Link } from 'react-router-dom';

const DUMMY_CATEGORIES: Category[] = [
  { id: '1', name_en: 'Curtains', name_bn: 'পর্দা', slug: 'curtains', image: 'https://picsum.photos/seed/curtain/800/800' },
  { id: '2', name_en: 'Bedsheets', name_bn: 'বেডশিট', slug: 'bedsheets', image: 'https://picsum.photos/seed/bedsheet/800/800' },
  { id: '3', name_en: 'Home Decor', name_bn: 'হোম ডেকোর', slug: 'home-decor', image: 'https://picsum.photos/seed/decor/800/800' },
  { id: '4', name_en: 'Dining Covers', name_bn: 'ডাইনিং কভার', slug: 'dining', image: 'https://picsum.photos/seed/dining/800/800' },
];

export default function CategoryGrid() {
  const { t, language } = useLanguage();

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tighter mb-4 italic serif">{t('home.categories')}</h2>
          <div className="w-12 h-1 bg-red-800 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DUMMY_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[450px] overflow-hidden rounded-2xl cursor-pointer"
            >
              <img 
                src={cat.image} 
                alt={cat.name_en} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <span className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  Collection
                </span>
                <h3 className="text-white text-2xl font-bold mb-4 tracking-tight">
                  {language === 'en' ? cat.name_en : cat.name_bn}
                </h3>
                <Link 
                  to={`/category/${cat.slug}`}
                  className="bg-white text-black text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full w-fit transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
