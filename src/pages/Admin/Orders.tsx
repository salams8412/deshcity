import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Search, Filter, Eye, CheckCircle, Truck, XCircle, Clock, Download } from 'lucide-react';
import { Order } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    fetch('/api/orders', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setOrders(data));
  }, [token]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
      });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } as Order : o));
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-red-100 text-red-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter italic serif">Customer Orders</h1>
            <p className="text-gray-400 text-sm uppercase tracking-widest mt-2">{orders.length} orders total</p>
          </div>
          <button className="bg-white border border-gray-100 px-8 py-4 rounded-full font-bold flex items-center space-x-3 hover:bg-black hover:text-white transition-all shadow-sm">
            <Download className="w-5 h-5" />
            <span className="uppercase tracking-widest text-xs">Export Report</span>
          </button>
        </header>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input placeholder="Search order ID or customer..." className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-6 py-3 text-sm outline-none focus:ring-2 focus:ring-red-800 transition-all" />
             </div>
             <div className="flex space-x-2">
                {['pending', 'confirmed', 'shipped', 'delivered'].map(s => (
                  <button key={s} className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-gray-50 hover:bg-gray-100 transition-all">{s}</button>
                ))}
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Order</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Customer</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Items</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Total</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold tracking-tight">{order.id}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">{new Date(order.created_at).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{order.full_name}</span>
                        <span className="text-xs text-gray-500">{order.mobile_number}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex -space-x-3">
                        {order.items.slice(0, 3).map((item, i) => (
                          <div key={i} className="w-10 h-10 rounded-xl border-2 border-white bg-gray-100 overflow-hidden relative">
                             <img src={`https://picsum.photos/seed/${item.product_id}/50/50`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                             {i === 2 && order.items.length > 3 && (
                               <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-[8px] text-white font-bold">+{order.items.length - 3}</div>
                             )}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold">৳{order.total_amount}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                         <button className="p-2 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-black">
                           <Eye className="w-4 h-4" />
                         </button>
                         <div className="h-4 w-[1px] bg-gray-100 mx-2" />
                         {order.status === 'pending' && (
                           <button 
                             onClick={() => updateStatus(order.id, 'confirmed')}
                             className="p-2 hover:bg-blue-50 rounded-lg transition-all text-blue-400 hover:text-blue-600"
                           >
                             <CheckCircle className="w-4 h-4" />
                           </button>
                         )}
                         {order.status === 'confirmed' && (
                           <button 
                             onClick={() => updateStatus(order.id, 'shipped')}
                             className="p-2 hover:bg-purple-50 rounded-lg transition-all text-purple-400 hover:text-purple-600"
                           >
                             <Truck className="w-4 h-4" />
                           </button>
                         )}
                         {order.status === 'shipped' && (
                           <button 
                             onClick={() => updateStatus(order.id, 'delivered')}
                             className="p-2 hover:bg-green-50 rounded-lg transition-all text-green-400 hover:text-green-600"
                           >
                             <CheckCircle className="w-4 h-4" />
                           </button>
                         )}
                         {order.status !== 'delivered' && order.status !== 'cancelled' && (
                           <button 
                             onClick={() => updateStatus(order.id, 'cancelled')}
                             className="p-2 hover:bg-red-50 rounded-lg transition-all text-red-400 hover:text-red-600"
                           >
                             <XCircle className="w-4 h-4" />
                           </button>
                         )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
