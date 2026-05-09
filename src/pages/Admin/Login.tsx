import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, Lock, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        login(token);
        navigate('/admin');
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9] p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2rem] shadow-xl overflow-hidden"
      >
        <div className="p-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter italic serif mb-2">DeshCity Admin</h1>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">Access Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Admin Email" 
                  className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-red-800 transition-all outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" 
                  className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-red-800 transition-all outline-none"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-800 text-xs font-bold text-center uppercase tracking-wider">{error}</p>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-red-800 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className="uppercase tracking-widest text-sm">Login to Admin</span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Secure Administrative Access Only
            </p>
          </div>
        </div>
        <div className="bg-red-800 py-4 text-center">
           <p className="text-white text-[10px] font-bold uppercase tracking-[0.5em]">DeshCity • Style Meets Tradition</p>
        </div>
      </motion.div>
    </div>
  );
}
