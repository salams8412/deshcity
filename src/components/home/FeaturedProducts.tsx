import React from 'react';
import ProductCard from '../common/ProductCard';
import { Product } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    name_en: 'Premium Cotton Bed Sheet Set',
    name_bn: 'প্রিমিয়াম সুতি বিছানার চাদর সেট',
    description_en: 'Luxury cotton bedsheet with elegant patterns.',
    description_bn: 'মার্জিত প্যাটার্ন সহ বিলাসবহুল সুতির বিছানার চাদর।',
    price: 2500,
    sale_price: 1800,
    category_id: '1',
    stock_status: 'in_stock',
    image_url: 'https://picsum.photos/seed/bed1/600/800',
    gallery: [],
    variants: [],
    is_featured: true,
    is_best_seller: true,
    is_flash_sale: false
  },
  {
    id: '2',
    name_en: 'Elegant Living Room Curtains',
    name_bn: 'মার্জিত লিভিং রুমের পর্দা',
    description_en: 'Premium curtains for a modern home look.',
    description_bn: 'আধুনিক বাড়ির চেহারার জন্য প্রিমিয়াম পর্দা।',
    price: 3200,
    category_id: '2',
    stock_status: 'in_stock',
    image_url: 'https://picsum.photos/seed/curtain1/600/800',
    gallery: [],
    variants: [],
    is_featured: true,
    is_best_seller: false,
    is_flash_sale: false
  },
  {
    id: '3',
    name_en: 'Traditional Handcrafted Decor',
    name_bn: 'ঐতিহ্যবাহী হাতে তৈরি ডেকোর',
    description_en: 'Beautiful handcrafted items for your home.',
    description_bn: 'আপনার বাড়ির জন্য সুন্দর হাতে তৈরি আইটেম।',
    price: 1200,
    sale_price: 950,
    category_id: '3',
    stock_status: 'in_stock',
    image_url: 'https://picsum.photos/seed/decor1/600/800',
    gallery: [],
    variants: [],
    is_featured: true,
    is_best_seller: true,
    is_flash_sale: true
  },
  {
    id: '4',
    name_en: 'Premium Cotton Dining Table Cover',
    name_bn: 'প্রিমিয়াম সুতি ডাইনিং টেবিল কভার',
    description_en: 'Durable and stylish dining cover.',
    description_bn: 'টেকসই এবং আড়ম্বরপূর্ণ ডাইনিং কভার।',
    price: 1500,
    category_id: '4',
    stock_status: 'in_stock',
    image_url: 'https://picsum.photos/seed/dining1/600/800',
    gallery: [],
    variants: [],
    is_featured: true,
    is_best_seller: false,
    is_flash_sale: false
  },
];

export default function FeaturedProducts() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#F9F9F9]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-red-800 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">New Arrivals</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter italic serif">{t('home.featured')}</h2>
          </div>
          <Link to="/shop" className="hidden md:flex items-center space-x-2 text-xs font-bold uppercase tracking-widest hover:text-red-800 transition-colors">
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {DUMMY_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link to="/shop" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest">
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
