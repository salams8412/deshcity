import React, { useState } from 'react';
import ProductCard from '../components/common/ProductCard';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import SEO from '../components/common/SEO';

const DUMMY_PRODUCTS: Product[] = [
  { id: '1', name_en: 'Premium Cotton Bed Sheet Set', name_bn: 'প্রিমিয়াম সুতি বিছানার চাদর সেট', description_en: '', description_bn: '', price: 2500, sale_price: 1800, category_id: '1', stock_status: 'in_stock', image_url: 'https://picsum.photos/seed/bed1/600/800', gallery: [], variants: [], is_featured: true, is_best_seller: true, is_flash_sale: false },
  { id: '2', name_en: 'Elegant Living Room Curtains', name_bn: 'মার্জিত লিভিং রুমের পর্দা', description_en: '', description_bn: '', price: 3200, category_id: '2', stock_status: 'in_stock', image_url: 'https://picsum.photos/seed/curtain1/600/800', gallery: [], variants: [], is_featured: true, is_best_seller: false, is_flash_sale: false },
  { id: '3', name_en: 'Traditional Handcrafted Decor', name_bn: 'ঐতিহ্যবাহী হাতে তৈরি ডেকোর', description_en: '', description_bn: '', price: 1200, sale_price: 950, category_id: '3', stock_status: 'in_stock', image_url: 'https://picsum.photos/seed/decor1/600/800', gallery: [], variants: [], is_featured: true, is_best_seller: true, is_flash_sale: true },
  { id: '4', name_en: 'Premium Cotton Dining Table Cover', name_bn: 'প্রিমিয়াম সুতি ডাইনিং টেবিল কভার', description_en: '', description_bn: '', price: 1500, category_id: '4', stock_status: 'in_stock', image_url: 'https://picsum.photos/seed/dining1/600/800', gallery: [], variants: [], is_featured: true, is_best_seller: false, is_flash_sale: false },
  { id: '5', name_en: 'Luxury Velvet Sofa Cover', name_bn: 'বিলাসবহুল ভেলভেট সোফা কভার', description_en: '', description_bn: '', price: 4500, sale_price: 3800, category_id: '3', stock_status: 'in_stock', image_url: 'https://picsum.photos/seed/sofa1/600/800', gallery: [], variants: [], is_featured: false, is_best_seller: true, is_flash_sale: false },
  { id: '6', name_en: 'Handmade Clay Pottery Set', name_bn: 'হাতে তৈরি মাটির পাত্রের সেট', description_en: '', description_bn: '', price: 1800, category_id: '3', stock_status: 'in_stock', image_url: 'https://picsum.photos/seed/clay1/600/800', gallery: [], variants: [], is_featured: false, is_best_seller: false, is_flash_sale: true },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { t } = useLanguage();

  const categories = ['All', 'Curtains', 'Bedsheets', 'Home Decor', 'Dining Covers'];

  return (
    <div className="py-20 min-h-screen bg-white">
      <SEO title="Shop" description="Explore our premium collection of curtains, bedsheets, and home decor." />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter italic serif mb-4">Our Collections</h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm">Finest lifestyle products for your home</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 py-4 border-y border-gray-100">
          <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar w-full md:w-auto pb-4 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
                  activeCategory === cat ? 'text-red-800' : 'text-gray-400 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <button className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest">
              <span>Sort By</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {DUMMY_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination placeholder */}
        <div className="mt-20 flex justify-center space-x-2">
          {[1, 2, 3].map((n) => (
            <button 
              key={n}
              className={`w-10 h-10 flex items-center justify-center text-xs font-bold border transition-all ${
                n === 1 ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-black'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
