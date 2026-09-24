import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Percent,
  Check,
  Truck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartSubtotal,
    deliveryFee,
    taxAmount,
    discountAmount,
    cartFinalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    setIsCheckoutOpen,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ message: string; success: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
    setTimeout(() => setCouponFeedback(null), 4000);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-charcoal/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="flex-1" onClick={() => setIsCartOpen(false)} />

      {/* Slide-out Drawer Panel */}
      <div className="w-full max-w-md bg-white border-l border-surface-border h-full flex flex-col justify-between shadow-soft-lg relative z-10 animate-slideLeft">
        
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-surface-border flex items-center justify-between bg-alabaster">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-crimson/10 flex items-center justify-center text-crimson">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-charcoal font-heading">Your Feast Order</h3>
              <p className="text-xs text-charcoal-muted font-bold">
                {cartCount} {cartCount === 1 ? 'item' : 'items'} in your bag
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] text-charcoal-muted hover:text-crimson font-bold p-1 transition-colors"
                title="Clear all items"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl bg-white border border-surface-border text-charcoal-muted hover:text-charcoal hover:bg-alabaster shadow-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Delivery Goal Bar */}
        <div className="px-6 py-2.5 bg-alabaster/70 border-b border-surface-border">
          {cartSubtotal >= 35 ? (
            <div className="flex items-center gap-2 text-xs font-black text-emerald-700">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>You've unlocked FREE VIP Express Delivery!</span>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-charcoal-muted font-bold">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-crimson" /> Add ${(35 - cartSubtotal).toFixed(2)} for FREE Delivery
                </span>
                <span className="font-black text-crimson">{Math.round((cartSubtotal / 35) * 100)}%</span>
              </div>
              <div className="w-full bg-surface-border h-2 rounded-full overflow-hidden">
                <div
                  className="bg-crimson h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (cartSubtotal / 35) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3.5 bg-alabaster/30">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-charcoal-muted py-12">
              <ShoppingBag className="w-16 h-16 text-mustard/30 mb-4 animate-bounce" style={{ animationDuration: '3s' }} />
              <p className="text-lg font-black text-charcoal mb-1">Your cart is feeling empty</p>
              <p className="text-xs text-charcoal-muted max-w-xs mb-6">
                Explore our gourmet smash burgers and artisan shakes to build your ultimate feast.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-crimson text-white font-black text-xs shadow-crimson-glow hover:bg-crimson-hover transition-all"
              >
                Browse The Baron's Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-white rounded-2xl p-3.5 flex gap-3 border border-surface-border shadow-soft hover:shadow-soft-md transition-all"
              >
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-alabaster"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-charcoal truncate">
                        {item.product.name}
                      </h4>
                      {item.customization && (
                        <p className="text-[10px] text-crimson font-bold">
                          Custom: {item.customization.pattyCount}x Patty • {item.customization.bun.replace('bun-', '')}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-charcoal-subtle hover:text-crimson p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs sm:text-sm font-black text-crimson font-heading">
                      ${(item.calculatedPrice * item.quantity).toFixed(2)}
                    </span>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 bg-alabaster px-2.5 py-1 rounded-lg border border-surface-border">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="text-charcoal-muted hover:text-charcoal"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-black text-charcoal w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="text-charcoal-muted hover:text-charcoal"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Bottom: Coupon Input & Price Breakdown */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-surface-border space-y-4 shadow-lg">
            
            {/* Promo Code Input Form */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-crimson/10 border border-crimson/30 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-crimson" />
                    <span className="font-mono font-black text-crimson">{appliedCoupon.code}</span>
                    <span className="text-charcoal font-semibold">applied!</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-crimson hover:text-crimson-hover text-xs font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Percent className="w-3.5 h-3.5 text-charcoal-subtle absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. BARON25)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-alabaster text-charcoal placeholder-charcoal-subtle text-xs pl-8 pr-3 py-2.5 rounded-xl border border-surface-border focus:border-crimson focus:bg-white focus:outline-none uppercase font-mono font-bold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-charcoal hover:bg-crimson text-white font-bold text-xs rounded-xl transition-all"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponFeedback && (
                <p className={`text-[11px] mt-1.5 font-bold ${couponFeedback.success ? 'text-emerald-700' : 'text-crimson'}`}>
                  {couponFeedback.message}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-charcoal-muted border-t border-surface-border pt-3 font-semibold">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-charcoal font-bold">${cartSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-crimson font-black">
                  <span>Coupon Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Tax (8.5%)</span>
                <span className="text-charcoal font-bold">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className={deliveryFee === 0 ? 'text-emerald-700 font-black' : 'text-charcoal font-bold'}>
                  {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-charcoal pt-2 border-t border-surface-border">
                <span>Total Amount</span>
                <span className="text-crimson text-xl font-heading">${cartFinalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-4 rounded-2xl bg-crimson hover:bg-crimson-hover text-white font-black text-sm tracking-wide shadow-crimson-glow active:scale-98 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
