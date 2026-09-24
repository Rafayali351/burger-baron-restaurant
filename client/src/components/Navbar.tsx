import React, { useState } from 'react';
import {
  Flame,
  ShoppingBag,
  Search,
  User,
  SlidersHorizontal,
  ChevronDown,
  Clock,
  Sparkles,
  ShieldCheck,
  Menu as MenuIcon,
  X,
  Crown,
  LogIn
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const {
    currentUser,
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    isAdminOpen,
    setIsAdminOpen,
    openAuthModal,
    openProfileModal,
    logout,
    currentOrder,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  const handleAdminDeskClick = () => {
    if (currentUser?.role === 'Admin') {
      setIsAdminOpen(true);
    } else {
      openAuthModal('admin');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-brand-border shadow-sm transition-all duration-300">
      {/* Top micro bar for announcements */}
      <div className="bg-brand-red text-white text-xs font-bold py-1.5 px-4 text-center tracking-wider flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-amber animate-spin" style={{ animationDuration: '6s' }} />
          GRAND OPENING SPECIAL: USE CODE <span className="bg-white text-brand-red px-2 py-0.5 rounded shadow-sm font-black">BARON25</span> FOR 25% OFF
        </span>
        <span className="hidden md:inline text-white/50">|</span>
        <span className="hidden md:flex items-center gap-1 text-white/95 font-semibold">
          <Clock className="w-3.5 h-3.5 text-brand-amber" /> Average Delivery: 28 Mins Fresh & Sizzling
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-red flex items-center justify-center shadow-red-glow group-hover:scale-105 transition-transform duration-300 relative">
              <Flame className="w-7 h-7 text-white animate-pulse" />
              <Crown className="w-3.5 h-3.5 text-brand-amber absolute top-1 right-1" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-brand-charcoal font-heading">
                  THE BURGER <span className="text-brand-red">BARON</span>
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-brand-amberDark font-black uppercase -mt-0.5 hidden sm:block">
                Gourmet Smash & Craft Joint
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNavClick('menu')}
              className="px-3.5 py-2 text-sm font-bold text-brand-charcoal hover:text-brand-red transition-colors rounded-xl hover:bg-brand-bg"
            >
              Menu
            </button>
            <button
              onClick={() => handleNavClick('deals')}
              className="px-3.5 py-2 text-sm font-bold text-brand-charcoal hover:text-brand-red transition-colors rounded-xl hover:bg-brand-bg flex items-center gap-1.5"
            >
              <Flame className="w-4 h-4 text-brand-red" />
              Hot Deals
            </button>
            <button
              onClick={() => handleNavClick('customizer-promo')}
              className="px-3.5 py-2 text-sm font-bold text-brand-red hover:text-white transition-all rounded-xl bg-brand-redLight hover:bg-brand-red flex items-center gap-1.5 border border-brand-red/20"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Custom Burger Builder
            </button>
            <button
              onClick={() => handleNavClick('order-tracker')}
              className="px-3.5 py-2 text-sm font-bold text-brand-charcoal hover:text-brand-red transition-colors rounded-xl hover:bg-brand-bg relative"
            >
              Track Order
              {currentOrder && (
                <span className="absolute top-1.5 right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="px-3.5 py-2 text-sm font-bold text-brand-charcoal hover:text-brand-red transition-colors rounded-xl hover:bg-brand-bg"
            >
              Reviews
            </button>
            <button
              onClick={() => handleNavClick('faqs')}
              className="px-3.5 py-2 text-sm font-bold text-brand-charcoal hover:text-brand-red transition-colors rounded-xl hover:bg-brand-bg"
            >
              FAQ
            </button>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 text-brand-slate absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search Wagyu, Truffle, Fries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-bg text-brand-charcoal placeholder-brand-slate text-xs sm:text-sm pl-9 pr-4 py-2.5 rounded-full border border-brand-border focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/15 focus:outline-none transition-all font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs text-brand-slate hover:text-brand-charcoal"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Action Icons: Customer Account / Sign In, Admin Desk, Cart Badge */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Restaurant Admin Desk Switch */}
            <button
              onClick={handleAdminDeskClick}
              title="Restaurant Kitchen & Manager Control Panel"
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                isAdminOpen
                  ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-md'
                  : 'bg-white text-brand-charcoal border-brand-border hover:border-brand-charcoal hover:bg-brand-bg shadow-sm'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-brand-amber" />
              <span className="hidden xl:inline">Restaurant Desk</span>
            </button>

            {/* Customer Auth Button OR Customer Profile Dropdown */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-white border border-brand-border hover:border-brand-red text-brand-charcoal transition-all shadow-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-red text-white flex items-center justify-center font-black text-xs shadow-sm">
                    {currentUser.name[0]}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-black text-brand-charcoal leading-none truncate max-w-[90px]">
                      {currentUser.name.split(' ')[0]}
                    </p>
                    <span className="text-[10px] text-brand-red font-bold">
                      {currentUser.role === 'Admin' ? 'Admin' : 'My Orders'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-brand-slate hidden sm:block" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-brand-border rounded-2xl shadow-card-hover p-2.5 z-50 animate-slideUp">
                    <div className="px-3 py-2.5 border-b border-brand-border bg-brand-bg rounded-xl mb-1.5">
                      <p className="text-xs text-brand-slate font-medium">Logged in as</p>
                      <p className="text-sm font-black text-brand-charcoal truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-brand-slate truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] bg-brand-amberLight text-brand-amberDark font-black px-2 py-0.5 rounded-full border border-brand-amber/30">
                        {currentUser.tier || 'Baron VIP Patron'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          openProfileModal();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-brand-charcoal hover:text-brand-red hover:bg-brand-bg rounded-lg flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-brand-red" />
                        <span>My Account & Past Orders</span>
                      </button>

                      <button
                        onClick={() => {
                          handleNavClick('order-tracker');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-brand-charcoal hover:text-brand-red hover:bg-brand-bg rounded-lg flex items-center gap-2"
                      >
                        <Clock className="w-4 h-4 text-brand-amber" />
                        <span>Live Kitchen Tracker</span>
                      </button>

                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-brand-slate hover:text-brand-red hover:bg-brand-bg rounded-lg border-t border-brand-border mt-1"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('customer')}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-brand-border text-brand-charcoal hover:text-brand-red hover:border-brand-red font-black text-xs transition-all shadow-sm"
              >
                <LogIn className="w-4 h-4 text-brand-red" />
                <span className="hidden sm:inline">Sign In / Register</span>
              </button>
            )}

            {/* Cart Trigger Badge - Vibrant Crimson Flame */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-red text-white font-black shadow-red-glow hover:bg-brand-redDark active:scale-95 transition-all duration-200"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-amber text-brand-charcoal text-[11px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-extrabold tracking-wide">
                ${cartSubtotal.toFixed(2)}
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white text-brand-charcoal border border-brand-border shadow-sm"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-5 pt-3 border-t border-brand-border space-y-2 animate-slideUp">
            <div className="px-2 mb-3">
              <input
                type="text"
                placeholder="Search Wagyu, Truffle, Fries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-bg text-brand-charcoal placeholder-brand-slate text-sm px-4 py-2.5 rounded-xl border border-brand-border focus:border-brand-red focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm font-bold">
              <button
                onClick={() => handleNavClick('menu')}
                className="p-3 bg-white text-brand-charcoal rounded-xl text-left hover:text-brand-red shadow-sm"
              >
                🍔 Full Menu
              </button>
              <button
                onClick={() => handleNavClick('deals')}
                className="p-3 bg-white text-brand-red rounded-xl text-left shadow-sm"
              >
                🔥 Today's Deals
              </button>
              <button
                onClick={() => handleNavClick('customizer-promo')}
                className="p-3 bg-brand-redLight text-brand-red rounded-xl text-left border border-brand-red/20 shadow-sm"
              >
                🛠️ Burger Builder
              </button>
              <button
                onClick={() => handleNavClick('order-tracker')}
                className="p-3 bg-white text-brand-charcoal rounded-xl text-left shadow-sm"
              >
                📍 Track Order
              </button>
              {currentUser ? (
                <button
                  onClick={() => {
                    openProfileModal();
                    setMobileMenuOpen(false);
                  }}
                  className="p-3 bg-white text-brand-red font-black rounded-xl text-left shadow-sm"
                >
                  👤 My Orders & Profile
                </button>
              ) : (
                <button
                  onClick={() => {
                    openAuthModal('customer');
                    setMobileMenuOpen(false);
                  }}
                  className="p-3 bg-brand-red text-white font-black rounded-xl text-left shadow-sm"
                >
                  🔑 Sign In / Register
                </button>
              )}
              <button
                onClick={() => {
                  handleAdminDeskClick();
                  setMobileMenuOpen(false);
                }}
                className="p-3 bg-brand-charcoal text-white rounded-xl text-left shadow-sm"
              >
                🛡️ Restaurant Desk
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
