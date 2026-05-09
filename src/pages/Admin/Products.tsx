import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Plus, Search, Filter, Edit, Trash2, MoreVertical, X, Upload } from 'lucide-react';
import { Product } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate('/admin/login');
    
    if (isAuthenticated) {
      fetch('/api/products')
        .then(res => res.json())
        .then(data => setProducts(data));
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter italic serif">Manage Products</h1>
            <p className="text-gray-400 text-sm uppercase tracking-widest mt-2">{products.length} products total</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center space-x-3 hover:bg-red-800 transition-all transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span className="uppercase tracking-widest text-xs">Add Product</span>
          </button>
        </header>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input 
              placeholder="Search products..." 
              className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-6 py-3 text-sm focus:ring-2 focus:ring-red-800 transition-all outline-none"
            />
          </div>
          <div className="flex space-x-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-3 bg-gray-50 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-3 bg-gray-50 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all">
              <span>Category</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group relative">
              <div className="aspect-[3/4] overflow-hidden relative">
                <img 
                  src={p.image_url} 
                  alt={p.name_en} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-3 bg-white rounded-xl shadow-lg hover:bg-red-800 hover:text-white transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-3 bg-white rounded-xl shadow-lg hover:bg-red-800 hover:text-white transition-all text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {p.stock_status === 'out_of_stock' && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em] border border-white px-4 py-2">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-bold uppercase tracking-widest line-clamp-1">{p.name_en}</h3>
                  <MoreVertical className="w-4 h-4 text-gray-300" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">৳{p.sale_price || p.price}</span>
                  {p.sale_price && <span className="text-xs text-gray-400 line-through">৳{p.price}</span>}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">ID: {p.id.split('-')[0]}</span>
                   <div className="flex -space-x-1">
                      {p.variants.map((v, i) => (
                        <div key={i} className="w-4 h-4 rounded-full border border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold">{v.size?.charAt(0)}</div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-2xl font-bold tracking-tighter italic serif">Add New Product</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-10 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Form Fields would go here - basic layout for now */}
                <div className="space-y-6">
                   <div className="aspect-[3/4] bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                     <Upload className="w-12 h-12 mb-4 opacity-30" />
                     <p className="text-xs font-bold uppercase tracking-widest">Click to upload product image</p>
                     <p className="text-[10px] mt-2">Recommended size: 800x1000px</p>
                   </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Product Name (English)</label>
                    <input className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-red-800 transition-all outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Regular Price</label>
                      <input type="number" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-red-800 transition-all outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Sale Price</label>
                      <input type="number" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-red-800 transition-all outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Description</label>
                    <textarea rows={4} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-red-800 transition-all outline-none resize-none" />
                  </div>
                  <button className="w-full bg-black text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-red-800 transition-all">
                    Create Product
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
