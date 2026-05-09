import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Shield, Truck, RotateCcw, Plus, Minus, Star, Facebook, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import ProductCard from '../components/common/ProductCard';

const DUMMY_PRODUCTS = [
  { id: '1', name_en: 'Premium Cotton Bed Sheet Set', name_bn: 'প্রিমিয়াম সুতি বিছানার চাদর সেট', description_en: 'Upgrade your bedroom with our Premium Cotton Bed Sheet Set. Made from 100% pure organic cotton, this set offers unparalleled softness and breathability, ensuring a perfect night\'s sleep. The elegant traditional patterns are hand-screen printed by local artisans, making each piece unique.', description_bn: 'আমাদের প্রিমিয়াম সুতির বিছানার চাদর সেটের সাথে আপনার বেডরুম আপগ্রেড করুন। ১০০% খাঁটি অর্গানিক তুলা থেকে তৈরি, এই সেটটি অতুলনীয় কোমলতা এবং শ্বাস-প্রশ্বাসের ক্ষমতা প্রদান করে, একটি নিখুঁত রাতের ঘুম নিশ্চিত করে। মার্জিত ঐতিহ্যবাহী প্যাটার্নগুলি স্থানীয় কারিগরদের দ্বারা হাত দিয়ে প্রিন্ট করা হয়েছে, যা প্রতিটি ডিজাইনকে অনন্য করে তুলেছে।', price: 2500, sale_price: 1800, category_id: '1', stock_status: 'in_stock', image_url: 'https://picsum.photos/seed/bed1/800/1000', gallery: ['https://picsum.photos/seed/bed1/800/1000', 'https://picsum.photos/seed/bed2/800/1000', 'https://picsum.photos/seed/bed3/800/1000'], variants: [{size: 'King'}, {size: 'Queen'}, {size: 'Double'}], is_featured: true, is_best_seller: true, is_flash_sale: false },
];

export default function ProductDetails() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  // In a real app, fetch by ID
  const product = DUMMY_PRODUCTS[0];

  if (!product) return <div>Product not found</div>;

  const images = [product.image_url, ...product.gallery];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-12">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-black">{language === 'en' ? product.name_en : product.name_bn}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50"
            >
              <img 
                src={images[activeImage]} 
                alt={product.name_en} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === i ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 italic serif">
              {language === 'en' ? product.name_en : product.name_bn}
            </h1>
            
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-400 border-l pl-4 uppercase tracking-widest">
                24 Customer Reviews
              </span>
            </div>

            <div className="flex items-center space-x-4 mb-8">
              {product.sale_price ? (
                <>
                  <span className="text-3xl font-bold text-red-800">৳{product.sale_price}</span>
                  <span className="text-xl text-gray-400 line-through">৳{product.price}</span>
                  <span className="bg-red-800 text-white text-[10px] font-bold px-2 py-1 rounded tracking-[0.2em]">SAVE 28%</span>
                </>
              ) : (
                <span className="text-3xl font-bold">৳{product.price}</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-10 border-b pb-10">
              {language === 'en' ? product.description_en : product.description_bn}
            </p>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="mb-10">
                <span className="block text-xs font-bold uppercase tracking-widest mb-4">Select Size</span>
                <div className="flex gap-4">
                  {product.variants.map((v, i) => (
                    <button 
                      key={i}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-6 py-2 border-2 text-xs font-bold uppercase tracking-widest transition-all ${
                        selectedVariant === v ? 'border-black bg-black text-white' : 'border-gray-100 hover:border-black'
                      }`}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and CTA */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
              <div className="flex items-center border-2 border-gray-100 rounded-full px-6 py-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:text-red-800">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:text-red-800">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={() => addToCart(product, quantity, selectedVariant)}
                className="flex-1 bg-black text-white px-10 py-4 rounded-full font-bold flex items-center justify-center space-x-3 hover:bg-red-800 transition-all transform hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="uppercase tracking-widest text-sm">Add to Cart</span>
              </button>
              <button className="p-4 rounded-full border-2 border-gray-100 hover:border-black transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Trust Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-50 text-red-800 rounded-xl">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">Fast Delivery</h4>
                  <p className="text-[10px] text-gray-500 uppercase">Within 24-48 Hours</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-beige-100 text-brown-800 rounded-xl" style={{ backgroundColor: '#FBE8D3' }}>
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">Pay on Delivery</h4>
                  <p className="text-[10px] text-gray-500 uppercase">100% Order Safety</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
