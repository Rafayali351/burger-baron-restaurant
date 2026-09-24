import React, { useState } from 'react';
import {
  X,
  User,
  ShoppingBag,
  Clock,
  MapPin,
  LogOut,
  Sparkles,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Award
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CustomerProfileModal: React.FC = () => {
  const {
    currentUser,
    isProfileModalOpen,
    closeProfileModal,
    logout,
    orders,
    reorder,
    setCurrentOrder,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses'>('orders');

  if (!isProfileModalOpen || !currentUser) return null;

  // Filter orders for current user or all demo orders
  const myOrders = orders;

  const handleTrackLive = (order: typeof orders[0]) => {
    setCurrentOrder(order);
    closeProfileModal();
    const el = document.getElementById('order-tracker');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-surface border border-surface-border rounded-3xl shadow-soft-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header Card */}
        <div className="p-6 bg-alabaster border-b border-surface-border flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-crimson text-white flex items-center justify-center font-black text-xl shadow-crimson-glow">
              {currentUser.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-charcoal font-heading">{currentUser.name}</h3>
                <span className="text-[10px] bg-mustard/20 text-mustard font-black px-2.5 py-0.5 rounded-full border border-mustard/30 uppercase">
                  {currentUser.tier || 'Baron Gold VIP'}
                </span>
              </div>
              <p className="text-xs text-charcoal-muted font-medium mt-0.5">{currentUser.email}</p>
              
              {/* Rewards Points */}
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-crimson mt-2 bg-surface px-3 py-1 rounded-xl border border-surface-border shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-mustard" />
                <span>{currentUser.loyaltyPoints || 340} Baron Points</span>
                <span className="text-charcoal-muted text-[10px] font-bold">($15 Reward Available)</span>
              </div>
            </div>
          </div>

          <button
            onClick={closeProfileModal}
            className="p-2 rounded-xl bg-surface border border-surface-border text-charcoal-muted hover:text-charcoal shadow-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-surface border-b border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-2 px-4 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'orders'
                  ? 'bg-crimson text-white shadow-crimson-glow'
                  : 'bg-alabaster text-charcoal-muted hover:text-charcoal'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>My Orders ({myOrders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`py-2 px-4 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'addresses'
                  ? 'bg-crimson text-white shadow-crimson-glow'
                  : 'bg-alabaster text-charcoal-muted hover:text-charcoal'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>
          </div>

          <button
            onClick={logout}
            className="text-xs font-bold text-charcoal-subtle hover:text-crimson flex items-center gap-1 p-2 rounded-xl hover:bg-alabaster transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-alabaster/40 space-y-4">
          
          {/* TAB 1: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {myOrders.length === 0 ? (
                <div className="text-center py-12 bg-surface rounded-2xl border border-surface-border">
                  <ShoppingBag className="w-12 h-12 text-mustard/40 mx-auto mb-2" />
                  <p className="text-sm font-bold text-charcoal">No past orders yet</p>
                  <p className="text-xs text-charcoal-muted mt-1">Order your first smash burger from our menu!</p>
                </div>
              ) : (
                myOrders.map((order) => {
                  const isActive = order.status !== 'Delivered';
                  return (
                    <div
                      key={order.id}
                      className="bg-surface rounded-2xl p-5 border border-surface-border shadow-soft space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-surface-border pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-sm text-charcoal">
                              {order.orderNumber}
                            </span>
                            <span
                              className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                                order.status === 'Delivered'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : 'bg-crimson/15 text-crimson border border-crimson/30 animate-pulse'
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-charcoal-muted mt-0.5">{order.createdAt}</p>
                        </div>

                        <div className="text-right">
                          <span className="text-base font-black text-crimson font-heading">
                            ${order.finalTotal.toFixed(2)}
                          </span>
                          <p className="text-[10px] text-charcoal-subtle">{order.items.length} items</p>
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div className="space-y-1 text-xs text-charcoal-muted font-medium">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{it.quantity}x {it.product.name}</span>
                            <span className="font-mono">${(it.calculatedPrice * it.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Actions: Track Live or Re-Order */}
                      <div className="pt-2 border-t border-surface-border flex items-center justify-end gap-2">
                        {isActive && (
                          <button
                            onClick={() => handleTrackLive(order)}
                            className="px-4 py-2 bg-crimson text-white rounded-xl text-xs font-black shadow-crimson-glow hover:bg-crimson-hover transition-all flex items-center gap-1.5"
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>Track Live Status →</span>
                          </button>
                        )}

                        <button
                          onClick={() => reorder(order.id)}
                          className="px-4 py-2 bg-alabaster hover:bg-surface-border text-charcoal rounded-xl text-xs font-bold border border-surface-border transition-all flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-mustard" />
                          <span>Re-Order Again</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB 2: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-3">
              <div className="bg-surface p-4 rounded-2xl border border-surface-border shadow-soft flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-crimson/10 flex items-center justify-center text-crimson mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-charcoal flex items-center gap-2">
                      Home (Default)
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Active</span>
                    </h5>
                    <p className="text-xs text-charcoal-muted mt-0.5">454 Grand Avenue, Apt 8B, Metropolis 90210</p>
                    <p className="text-[11px] text-charcoal-subtle mt-0.5">Note: "Leave with doorman or buzz 8"</p>
                  </div>
                </div>
              </div>

              <div className="bg-surface p-4 rounded-2xl border border-surface-border shadow-soft flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-mustard/15 flex items-center justify-center text-mustard mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-charcoal">Office HQ</h5>
                    <p className="text-xs text-charcoal-muted mt-0.5">100 Silicon Boulevard, Floor 14, Tech District</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
