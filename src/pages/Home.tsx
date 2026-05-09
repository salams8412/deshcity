import React from 'react';
import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/common/SEO';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="overflow-hidden">
      <SEO title="Home" description="Premium Bangladeshi eCommerce platform for Home Decor and Lifestyle products." />
      <Hero />
      
      <CategoryGrid />

      {/* Trust Badges */}
      <section className="py-12 border-y border-gray-100 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <TrustBadge title="Free Shipping" subtitle="On orders over ৳5000" />
            <TrustBadge title="Cash on Delivery" subtitle="Pay after receiving" />
            <TrustBadge title="7 Days Return" subtitle="Hassle-free exchange" />
            <TrustBadge title="100% Genuine" subtitle="Quality guaranteed" />
          </div>
        </div>
      </section>

      <FeaturedProducts />

      {/* Banner Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="relative h-[400px] rounded-3xl overflow-hidden group">
          <img 
            src="https://picsum.photos/seed/desh-banner/1200/400" 
            alt="Lifestyle Banner" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 italic serif">New Year, New Style.</h2>
            <p className="text-lg md:text-xl font-light mb-8 max-w-xl opacity-90">Refresh your home with our latest cotton collection and handcrafted decor.</p>
            <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-red-800 hover:text-white transition-all transform hover:scale-105">
              Explore Collection
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#FBE8D3]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tighter italic serif">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial 
              name="Farhana Akter" 
              text="The quality of the bedsheets is amazing! The colors are exactly as shown in the picture. Highly recommended."
            />
            <Testimonial 
              name="Tanvir Rahman" 
              text="Fastest delivery I've ever experienced in Dhaka. The curtains added such a premium look to my living room."
            />
            <Testimonial 
              name="Sumaiya Khan" 
              text="Bought some home decor as a gift. The packaging was beautiful and the quality was top-notch."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function TrustBadge({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <h4 className="text-xs font-bold uppercase tracking-widest mb-1">{title}</h4>
      <p className="text-[10px] text-gray-500 uppercase tracking-wider">{subtitle}</p>
    </div>
  );
}

function Testimonial({ name, text }: { name: string; text: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-10 rounded-2xl shadow-sm border border-orange-100"
    >
      <div className="flex md:flex justify-center mb-6">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
        ))}
      </div>
      <p className="text-gray-600 italic text-center mb-6 leading-relaxed">"{text}"</p>
      <h5 className="text-sm font-bold uppercase tracking-widest text-center">{name}</h5>
    </motion.div>
  );
}
