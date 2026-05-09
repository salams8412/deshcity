import React from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="py-32 container mx-auto px-4 text-center">
        <div className="bg-gray-50 inline-flex p-8 rounded-full mb-8">
          <ShoppingBag className="w-16 h-16 text-gray-300" />
        </div>
        <h1 className="text-4xl font-bold italic serif mb-4">{t('cart.empty')}</h1>
        <p className="text-gray-500 mb-8 uppercase tracking-widest text-xs">Discover our premium collections today.</p>
        <Link 
          to="/shop" 
          className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-red-800 transition-all inline-block"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold tracking-tighter italic serif mb-16">{t('cart.title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-10">
            {items.map((item) => (
              <motion.div 
                key={item.product_id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-8 pb-10 border-b border-gray-100"
              >
                <div className="w-24 h-32 md:w-32 md:h-44 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={`https://picsum.photos/seed/${item.product_id}/300/400`} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm md:text-lg font-bold uppercase tracking-widest">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.product_id)}
                      className="text-gray-300 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  {item.variant && (
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-4">
                      {item.variant.size && `Size: ${item.variant.size}`}
                      {item.variant.color && ` • Color: ${item.variant.color}`}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center border border-gray-100 rounded-full px-4 py-2">
                      <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)} className="p-1 hover:text-red-800">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center font-bold text-xs">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)} className="p-1 hover:text-red-800">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-bold text-lg">৳{item.price * item.quantity}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#F9F9F9] p-8 md:p-10 rounded-3xl sticky top-32">
              <h2 className="text-2xl font-bold tracking-tighter italic serif mb-8">Order Summary</h2>
              <div className="space-y-6 mb-8 pb-8 border-b border-gray-200">
                <div className="flex justify-between text-sm uppercase tracking-widest">
                  <span className="text-gray-400 font-bold">Subtotal</span>
                  <span className="font-bold">৳{total}</span>
                </div>
                <div className="flex justify-between text-sm uppercase tracking-widest">
                  <span className="text-gray-400 font-bold">Shipping</span>
                  <span className="font-bold text-red-800 italic">calculated at checkout</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold tracking-tighter mb-10">
                <span className="italic serif">Total</span>
                <span>৳{total}</span>
              </div>
              <Link 
                to="/checkout"
                className="w-full bg-black text-white py-5 rounded-full font-bold flex items-center justify-center space-x-3 hover:bg-red-800 transition-all transform hover:scale-[1.02]"
              >
                <span className="uppercase tracking-widest text-sm">{t('cart.checkout')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-[10px] text-center text-gray-400 mt-6 font-bold uppercase tracking-[0.2em]">
                Secure Checkout Powered by DeshCity
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
