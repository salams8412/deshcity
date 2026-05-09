import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold tracking-tighter">DESH CITY</Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {t('footer.about')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 hover:bg-red-800 rounded-full transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-red-800 rounded-full transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-red-800 rounded-full transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">{t('nav.shop')}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Policies</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/return" className="hover:text-white transition-colors">Return Policy</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Contact Us</h4>
            <div className="flex items-start space-x-3 text-sm text-gray-400">
              <MapPin className="w-4 h-4 mt-0.5" />
              <span>Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <Phone className="w-4 h-4" />
              <span>+880 1234-567890</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <Mail className="w-4 h-4" />
              <span>info@deshcity.com</span>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-12 mb-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-4 italic serif">Join the tradition.</h3>
            <p className="text-gray-400 text-sm mb-6">Stay updated with our latest products and exclusive offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 bg-white/5 border border-white/10 px-6 py-3 rounded-l focus:outline-none focus:border-red-800 transition-colors"
                id="newsletter_email"
              />
              <button className="bg-red-800 hover:bg-red-700 px-8 py-3 rounded-r font-bold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} DESH CITY. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
