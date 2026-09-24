import React, { useState } from 'react';
import {
  X,
  User,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  ChefHat
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalRole,
    loginCustomer,
    loginAdmin,
    registerCustomer,
  } = useStore();

  const [activeRole, setActiveRole] = useState<'customer' | 'admin'>(authModalRole || 'customer');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeRole === 'admin') {
      loginAdmin(email || 'manager@burgerbaron.com', password || 'admin123');
    } else {
      if (authMode === 'login') {
        loginCustomer(email || 'customer@gmail.com', password || 'secret');
      } else {
        registerCustomer(name || 'New Customer', email, password, phone);
      }
    }
  };

  const handleDemoCustomer = () => {
    loginCustomer('alex.sterling@gmail.com', 'password123');
  };

  const handleDemoAdmin = () => {
    loginAdmin('headchef.sarah@theburgerbaron.com', 'adminPass2026');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-surface border border-surface-border rounded-3xl shadow-soft-lg overflow-hidden flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-surface-border flex items-center justify-between bg-alabaster">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-crimson flex items-center justify-center text-white shadow-crimson-glow">
              {activeRole === 'customer' ? <User className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-black text-charcoal font-heading">
                {activeRole === 'customer' ? 'Customer Account' : 'Restaurant Staff & Admin Portal'}
              </h3>
              <p className="text-xs text-charcoal-muted font-medium">
                {activeRole === 'customer' 
                  ? 'Track your orders, reorder favorites & collect loyalty points' 
                  : 'Kitchen order dispatch, catalog control & sales dashboard'}
              </p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-2 rounded-xl bg-surface border border-surface-border text-charcoal-muted hover:text-charcoal hover:bg-alabaster shadow-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector Tabs (Customer vs Restaurant Admin) */}
        <div className="p-4 bg-alabaster/60 border-b border-surface-border">
          <div className="grid grid-cols-2 gap-2 bg-surface p-1 rounded-2xl border border-surface-border">
            <button
              type="button"
              onClick={() => {
                setActiveRole('customer');
                setAuthMode('login');
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                activeRole === 'customer'
                  ? 'bg-crimson text-white shadow-crimson-glow'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Customer Portal</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveRole('admin');
                setAuthMode('login');
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                activeRole === 'admin'
                  ? 'bg-charcoal text-white shadow-md'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              <ChefHat className="w-4 h-4 text-mustard" />
              <span>Restaurant Admin</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 bg-surface">
          
          {/* Demo 1-Click Login Shortcut */}
          <div className="p-3.5 bg-alabaster rounded-2xl border border-surface-border space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-charcoal">
              <span className="flex items-center gap-1.5 text-crimson">
                <Sparkles className="w-4 h-4 text-mustard" /> 1-Click Instant Demo Login:
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoCustomer}
                className="p-2.5 bg-surface hover:bg-crimson hover:text-white border border-surface-border rounded-xl text-xs font-black text-charcoal transition-all text-center shadow-soft"
              >
                🍔 Alex (Customer)
              </button>
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="p-2.5 bg-surface hover:bg-charcoal hover:text-white border border-surface-border rounded-xl text-xs font-black text-charcoal transition-all text-center shadow-soft"
              >
                🛡️ Sarah (Restaurant Admin)
              </button>
            </div>
          </div>

          {/* Sub-tabs for Customer (Sign In vs Register) */}
          {activeRole === 'customer' && (
            <div className="flex border-b border-surface-border text-xs font-bold">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`pb-2.5 px-4 font-black transition-all border-b-2 ${
                  authMode === 'login'
                    ? 'border-crimson text-crimson'
                    : 'border-transparent text-charcoal-muted hover:text-charcoal'
                }`}
              >
                Sign In to Account
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`pb-2.5 px-4 font-black transition-all border-b-2 ${
                  authMode === 'register'
                    ? 'border-crimson text-crimson'
                    : 'border-transparent text-charcoal-muted hover:text-charcoal'
                }`}
              >
                Create New Account
              </button>
            </div>
          )}

          {/* Actual Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {activeRole === 'customer' && authMode === 'register' && (
              <div>
                <label className="text-xs font-bold text-charcoal block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-charcoal-subtle absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam Parker"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-alabaster text-charcoal text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-surface-border focus:border-crimson focus:bg-surface focus:outline-none font-bold"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-charcoal block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-charcoal-subtle absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder={activeRole === 'customer' ? 'youremail@example.com' : 'admin@burgerbaron.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-alabaster text-charcoal text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-surface-border focus:border-crimson focus:bg-surface focus:outline-none font-bold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-charcoal block mb-1">
                {activeRole === 'admin' ? 'Manager Secret Password / PIN' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-subtle absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-alabaster text-charcoal text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-surface-border focus:border-crimson focus:bg-surface focus:outline-none font-bold"
                />
              </div>
            </div>

            {activeRole === 'customer' && authMode === 'register' && (
              <div>
                <label className="text-xs font-bold text-charcoal block mb-1">Phone Number (For Delivery Updates)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-charcoal-subtle absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-alabaster text-charcoal text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-surface-border focus:border-crimson focus:bg-surface focus:outline-none font-bold"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-crimson hover:bg-crimson-hover text-white font-black text-sm tracking-wide shadow-crimson-glow transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>
                {activeRole === 'admin'
                  ? 'Enter Restaurant Management Portal'
                  : authMode === 'login'
                  ? 'Sign In to Baron Account'
                  : 'Join The Baron VIP Club'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
