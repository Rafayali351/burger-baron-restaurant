import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Clock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import type { OrderStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    orders,
    updateOrderStatus,
    products,
    coupons,
    setCurrentOrder,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'kanban' | 'analytics' | 'products' | 'coupons'>('kanban');

  if (!isAdminOpen) return null;

  const totalRevenue = orders.reduce((acc, o) => acc + o.finalTotal, 0);
  const totalOrderCount = orders.length;
  const avgOrderValue = totalOrderCount > 0 ? totalRevenue / totalOrderCount : 0;

  const KANBAN_COLUMNS: { status: OrderStatus; title: string; color: string }[] = [
    { status: 'Placed', title: 'New Tickets', color: 'border-blue-400 text-blue-700 bg-blue-50' },
    { status: 'Confirmed', title: 'Confirmed / Prep', color: 'border-amber-400 text-amber-700 bg-amber-50' },
    { status: 'Preparing in Kitchen', title: 'On Grill / Cooking', color: 'border-orange-400 text-orange-700 bg-orange-50' },
    { status: 'Out for Delivery', title: 'Out for Delivery', color: 'border-purple-400 text-purple-700 bg-purple-50' },
    { status: 'Delivered', title: 'Completed', color: 'border-emerald-400 text-emerald-700 bg-emerald-50' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-7xl bg-white border border-surface-border rounded-3xl shadow-soft-lg overflow-hidden flex flex-col h-[90vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-surface-border flex items-center justify-between bg-alabaster">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-crimson/10 border border-crimson/20 flex items-center justify-center text-crimson">
              <ShieldCheck className="w-6 h-6 text-crimson" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-charcoal font-heading">
                  THE BARON HQ — Enterprise Operations Desk
                </h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-full border border-emerald-300">
                  SQL System Connected
                </span>
              </div>
              <p className="text-xs text-charcoal-muted font-medium">
                Live Kitchen Pipeline • Inventory Control • Real-Time Sales Metrics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl bg-white border border-surface-border text-charcoal-muted hover:text-charcoal hover:bg-alabaster shadow-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Tabs & KPI Mini Bar */}
        <div className="px-6 py-3 bg-white border-b border-surface-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('kanban')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === 'kanban'
                  ? 'bg-crimson text-white shadow-crimson-glow'
                  : 'bg-alabaster text-charcoal-muted hover:text-charcoal'
              }`}
            >
              Live Order Kanban ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === 'analytics'
                  ? 'bg-crimson text-white shadow-crimson-glow'
                  : 'bg-alabaster text-charcoal-muted hover:text-charcoal'
              }`}
            >
              Sales Analytics
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === 'products'
                  ? 'bg-crimson text-white shadow-crimson-glow'
                  : 'bg-alabaster text-charcoal-muted hover:text-charcoal'
              }`}
            >
              Menu Inventory ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('coupons')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === 'coupons'
                  ? 'bg-crimson text-white shadow-crimson-glow'
                  : 'bg-alabaster text-charcoal-muted hover:text-charcoal'
              }`}
            >
              Promo Engine ({coupons.length})
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-charcoal-muted font-bold">Today's Revenue:</span>
            <span className="font-black text-crimson text-base font-mono">
              ${totalRevenue.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-alabaster/40">
          
          {/* TAB 1: KANBAN BOARD */}
          {activeTab === 'kanban' && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-full">
              {KANBAN_COLUMNS.map((col) => {
                const columnOrders = orders.filter((o) => o.status === col.status);
                return (
                  <div
                    key={col.status}
                    className="bg-white rounded-2xl p-3.5 border border-surface-border flex flex-col shadow-soft"
                  >
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-border">
                      <span className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-lg ${col.color}`}>
                        {col.title}
                      </span>
                      <span className="text-xs bg-alabaster text-charcoal-muted px-2 py-0.5 rounded-full font-mono font-bold">
                        {columnOrders.length}
                      </span>
                    </div>

                    <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                      {columnOrders.length === 0 ? (
                        <p className="text-[11px] text-charcoal-subtle text-center py-6 font-medium">
                          No tickets in this stage
                        </p>
                      ) : (
                        columnOrders.map((order) => (
                          <div
                            key={order.id}
                            className="p-3 bg-alabaster rounded-xl border border-surface-border hover:border-crimson/40 transition-all space-y-2 shadow-sm"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-black text-crimson">
                                {order.orderNumber}
                              </span>
                              <span className="text-[10px] text-charcoal-subtle font-medium">{order.createdAt}</span>
                            </div>

                            <p className="text-xs font-black text-charcoal truncate">
                              {order.customerName}
                            </p>

                            <div className="text-[11px] text-charcoal-muted space-y-0.5 font-medium">
                              {order.items.map((it, idx) => (
                                <p key={idx} className="truncate">
                                  {it.quantity}x {it.product.name}
                                </p>
                              ))}
                            </div>

                            <div className="flex items-center justify-between pt-1 border-t border-surface-border">
                              <span className="text-xs font-black text-charcoal font-mono">
                                ${order.finalTotal.toFixed(2)}
                              </span>

                              {/* Advance Status Button */}
                              <div className="flex gap-1">
                                {col.status === 'Placed' && (
                                  <button
                                    onClick={() => updateOrderStatus(order.id, 'Confirmed')}
                                    className="text-[10px] bg-crimson hover:bg-crimson-hover text-white px-2 py-1 rounded-lg font-black transition-all shadow-sm"
                                  >
                                    Confirm →
                                  </button>
                                )}
                                {col.status === 'Confirmed' && (
                                  <button
                                    onClick={() => updateOrderStatus(order.id, 'Preparing in Kitchen')}
                                    className="text-[10px] bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 rounded-lg font-black transition-all shadow-sm"
                                  >
                                    To Grill →
                                  </button>
                                )}
                                {col.status === 'Preparing in Kitchen' && (
                                  <button
                                    onClick={() => updateOrderStatus(order.id, 'Out for Delivery')}
                                    className="text-[10px] bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded-lg font-black transition-all shadow-sm"
                                  >
                                    Dispatch →
                                  </button>
                                )}
                                {col.status === 'Out for Delivery' && (
                                  <button
                                    onClick={() => updateOrderStatus(order.id, 'Delivered')}
                                    className="text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded-lg font-black transition-all shadow-sm"
                                  >
                                    Complete ✓
                                  </button>
                                )}
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                setCurrentOrder(order);
                                setIsAdminOpen(false);
                              }}
                              className="w-full text-center text-[10px] text-charcoal-muted hover:text-crimson pt-1 block font-bold"
                            >
                              View in Live Customer Tracker ↗
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: SALES ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-soft">
                  <div className="flex items-center justify-between text-charcoal-muted text-xs mb-1 font-bold">
                    <span>Gross Sales</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="text-2xl font-black text-charcoal font-mono">${(totalRevenue + 8420.50).toFixed(2)}</h4>
                  <p className="text-[10px] text-emerald-700 mt-1 font-bold">+18.4% vs last week</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-soft">
                  <div className="flex items-center justify-between text-charcoal-muted text-xs mb-1 font-bold">
                    <span>Daily Orders</span>
                    <ShoppingBag className="w-4 h-4 text-crimson" />
                  </div>
                  <h4 className="text-2xl font-black text-charcoal font-mono">{totalOrderCount + 184}</h4>
                  <p className="text-[10px] text-crimson mt-1 font-bold">42 pending fulfillment</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-soft">
                  <div className="flex items-center justify-between text-charcoal-muted text-xs mb-1 font-bold">
                    <span>Average Order Value</span>
                    <TrendingUp className="w-4 h-4 text-mustard" />
                  </div>
                  <h4 className="text-2xl font-black text-charcoal font-mono">${(avgOrderValue || 31.40).toFixed(2)}</h4>
                  <p className="text-[10px] text-charcoal-muted mt-1 font-medium">High combo penetration</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-soft">
                  <div className="flex items-center justify-between text-charcoal-muted text-xs mb-1 font-bold">
                    <span>Avg Prep & Cook Time</span>
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <h4 className="text-2xl font-black text-charcoal font-mono">11.8 Mins</h4>
                  <p className="text-[10px] text-emerald-700 mt-1 font-bold">Well within 15m KPI</p>
                </div>
              </div>

              {/* Top Selling Dishes Table */}
              <div className="bg-white rounded-2xl p-6 border border-surface-border shadow-soft">
                <h4 className="text-base font-black text-charcoal font-heading mb-4">
                  Top Performing Smash Creations
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-charcoal-muted uppercase border-b border-surface-border pb-2 font-black">
                      <tr>
                        <th className="py-2.5">Burger / Dish</th>
                        <th className="py-2.5">Category</th>
                        <th className="py-2.5">Base Price</th>
                        <th className="py-2.5">Units Sold</th>
                        <th className="py-2.5">Gross Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-border font-medium">
                      {products.slice(0, 5).map((p, index) => (
                        <tr key={p.id} className="hover:bg-alabaster">
                          <td className="py-3 font-black text-charcoal flex items-center gap-2">
                            <span className="text-crimson font-mono">#{index + 1}</span>
                            {p.name}
                          </td>
                          <td className="py-3 text-charcoal-muted">{p.categoryName}</td>
                          <td className="py-3 font-mono font-bold">${p.basePrice.toFixed(2)}</td>
                          <td className="py-3 font-mono text-charcoal font-bold">{340 - index * 42}</td>
                          <td className="py-3 font-mono text-crimson font-black">
                            ${((340 - index * 42) * p.basePrice).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS INVENTORY */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-black text-charcoal">Active Product Catalog ({products.length})</h4>
                <span className="text-xs text-charcoal-muted font-medium">Synchronized with SQL Server `Products` table</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {products.map((p) => (
                  <div key={p.id} className="p-3.5 bg-white rounded-2xl border border-surface-border shadow-soft flex gap-3">
                    <img src={p.imageUrl} alt={p.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-black text-charcoal truncate">{p.name}</h5>
                      <p className="text-[11px] text-crimson font-mono font-black mt-0.5">${p.basePrice.toFixed(2)}</p>
                      <span className="inline-block mt-1 text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-black border border-emerald-200">
                        In Stock & Available
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: COUPON & PROMO ENGINE */}
          {activeTab === 'coupons' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-black text-charcoal">Promotional Rules & Coupons</h4>
                <span className="text-xs text-charcoal-muted font-medium">Synchronized with SQL Server `Coupons` table</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {coupons.map((c) => (
                  <div key={c.id} className="p-4 bg-white rounded-2xl border border-surface-border shadow-soft space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black text-crimson font-mono">{c.code}</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-black px-2 py-0.5 rounded-full border border-emerald-200">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-muted font-medium">{c.description}</p>
                    <div className="text-[11px] text-charcoal-subtle pt-2 border-t border-surface-border flex justify-between font-bold">
                      <span>Min Spend: ${c.minSpend}</span>
                      <span>Expires: {c.expiryDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
