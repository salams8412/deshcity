import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  Image as ImageIcon,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
    { icon: ImageIcon, label: 'Banners', path: '/admin/banners' },
    { icon: MessageSquare, label: 'Reviews', path: '/admin/reviews' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-black text-white flex flex-col min-h-screen">
      <div className="p-8">
        <span className="text-xl font-bold tracking-tighter">DESHCITY ADMIN</span>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              location.pathname === item.path 
                ? 'bg-red-800 text-white' 
                : 'text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-950/30 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-widest">Logout</span>
        </button>
      </div>
    </aside>
  );
}
