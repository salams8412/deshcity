import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle, Truck, CreditCard, ChevronRight, Package, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    mobile_number: '',
    full_address: '',
    area_city: '',
    order_note: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items,
          total_amount: total
        }),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        clearCart();
        setTimeout(() => navigate('/'), 5000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSuccess) {
    return (
      <div className="py-32 container mx-auto px-4 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-50 inline-flex p-10 rounded-full mb-8 text-green-600"
        >
          <CheckCircle className="w-20 h-20" />
        </motion.div>
        <h1 className="text-5xl font-bold italic serif mb-4 text-green-700">Thank You!</h1>
        <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Your order has been placed.</h2>
        <p className="text-gray-500 mb-12 max-w-md mx-auto">
          We've received your order and our team will call you shortly to confirm.
          <br /><span className="font-bold text-black">{t('checkout.cod')}</span>
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black/90 transition-all"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="py-20 bg-[#F9F9F9]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Form */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm">
            <h1 className="text-4xl font-bold tracking-tighter italic serif mb-10">{t('checkout.title')}</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 ml-2">Full Name</label>
                  <input 
                    required 
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-red-800 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 ml-2">Mobile Number</label>
                  <input 
                    required 
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleInputChange}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-red-800 transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 ml-2">Area / City</label>
                    <input 
                      required 
                      name="area_city"
                      value={formData.area_city}
                      onChange={handleInputChange}
                      placeholder="Dhaka"
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-red-800 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 ml-2">ZIP (Optional)</label>
                    <input 
                      placeholder="1212"
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-red-800 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 ml-2">Full Address</label>
                  <textarea 
                    required 
                    name="full_address"
                    value={formData.full_address}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="House, Street, Road, etc."
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-red-800 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 ml-2">Order Note (Optional)</label>
                  <textarea 
                    name="order_note"
                    value={formData.order_note}
                    onChange={handleInputChange}
                    placeholder="Any specific instructions..."
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-red-800 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="pt-6">
                <div className="bg-red-50 p-6 rounded-2xl flex items-start space-x-4 mb-8">
                  <div className="p-2 bg-red-100 text-red-800 rounded-lg">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider">{t('checkout.cod')}</h4>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Pay only when you have the product in hand.</p>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-5 rounded-full font-bold flex items-center justify-center space-x-3 hover:bg-red-800 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Package className="w-5 h-5" />
                      <span className="uppercase tracking-widest text-sm">{t('checkout.place_order')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:pl-8">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm sticky top-32">
              <h2 className="text-2xl font-bold tracking-tighter italic serif mb-8">Your Items</h2>
              <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto no-scrollbar">
                {items.map((item) => (
                  <div key={item.product_id} className="flex items-center space-x-4">
                    <div className="w-16 h-20 bg-gray-50 rounded-xl overflow-hidden relative flex-shrink-0">
                      <img 
                        src={`https://picsum.photos/seed/${item.product_id}/100/150`} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute -top-2 -right-2 bg-black text-white text-[8px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold uppercase tracking-widest line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">{item.variant?.size}</p>
                    </div>
                    <span className="font-bold text-xs">৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-10 border-t border-gray-100">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                  <span>Subtotal</span>
                  <span>৳{total}</span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                  <span>Shipping</span>
                  <span className="text-red-800">৳100</span>
                </div>
                <div className="flex justify-between text-xl font-bold tracking-tighter pt-4">
                  <span className="italic serif">Total</span>
                  <span>৳{total + 100}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
