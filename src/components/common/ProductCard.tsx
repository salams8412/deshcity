import React from 'react';
import { ShoppingCart, Eye, Heart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language } = useLanguage();
  const { addToCart } = useCart();

  const discount = product.sale_price 
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="group relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
        <img 
          src={product.image_url} 
          alt={product.name_en} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {discount > 0 && (
            <span className="bg-red-800 text-white text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase">
              -{discount}%
            </span>
          )}
          {product.is_featured && (
            <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase">
              Featured
            </span>
          )}
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <Link 
            to={`/product/${product.id}`}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 delay-[50ms]"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 delay-[100ms]">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Info Container */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-[10px] text-gray-400 uppercase tracking-widest ml-1">(12)</span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-bold uppercase tracking-widest hover:text-red-800 transition-colors line-clamp-1 h-5">
            {language === 'en' ? product.name_en : product.name_bn}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-center space-x-3">
          {product.sale_price ? (
            <>
              <span className="text-lg font-bold text-red-800">৳{product.sale_price}</span>
              <span className="text-sm text-gray-400 line-through">৳{product.price}</span>
            </>
          ) : (
            <span className="text-lg font-bold">৳{product.price}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
