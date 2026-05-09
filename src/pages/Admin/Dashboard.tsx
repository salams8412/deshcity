import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { TrendingUp, Users, ShoppingBag, DollarSign, Package, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/admin/login');
  }, [isAuthenticated, navigate]);

  const stats = [
    { label: 'Total Revenue', value: '৳45,200', icon: DollarSign, color: 'bg-green-500', trend: '+12%' },
    { label: 'Total Orders', value: '124', icon: ShoppingBag, color: 'bg-blue-500', trend: '+5%' },
    { label: 'New Customers', value: '48', icon: Users, color: 'bg-purple-500', trend: '+18%' },
    { label: 'Products', value: '32', icon: Package, color: 'bg-orange-500', trend: '0%' },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter italic serif">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm uppercase tracking-widest mt-2">Welcome back, Administrator</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <Clock className="w-5 h-5 text-red-800" />
            <span className="text-sm font-bold">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 ${stat.color} rounded-2xl text-white`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded bg-gray-50 ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-gray-400'}`}>
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold tracking-tighter">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders Overview */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold tracking-tight italic serif">Recent Orders</h2>
            <button onClick={() => navigate('/admin/orders')} className="text-xs font-bold uppercase tracking-widest text-red-800 hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Order ID</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Customer</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Total</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { id: 'ORD-A92B1', customer: 'Ahsan Rakib', status: 'pending', total: '৳2,500', date: '2 mins ago' },
                  { id: 'ORD-X3142', customer: 'Nabila Islam', status: 'confirmed', total: '৳1,200', date: '1 hour ago' },
                  { id: 'ORD-M9123', customer: 'Kamal Pasha', status: 'shipped', total: '৳4,500', date: '3 hours ago' },
                  { id: 'ORD-K8812', customer: 'Sumi Akter', status: 'delivered', total: '৳1,800', date: '5 hours ago' },
                ].map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6 text-sm font-bold tracking-tight">{order.id}</td>
                    <td className="px-8 py-6 text-sm text-gray-600">{order.customer}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'pending' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold">{order.total}</td>
                    <td className="px-8 py-6 text-xs text-gray-400 font-medium uppercase tracking-wider">{order.date}</td>
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
