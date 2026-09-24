import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Banknote,
  Smartphone,
  Truck,
  Store,
  MapPin,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';

interface CheckoutModalProps {
  onOrderSuccess: (sectionId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onOrderSuccess }) => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    discountAmount,
    deliveryFee,
    taxAmount,
    cartFinalTotal,
    appliedCoupon,
    placeOrder,
  } = useStore();

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('Derrick Sterling');
  const [customerEmail, setCustomerEmail] = useState('derrick@sterling.com');
  const [customerPhone, setCustomerPhone] = useState('(555) 782-9921');

  // Address
  const [street, setStreet] = useState('454 Grand Avenue');
  const [apt, setApt] = useState('Penthouse 8');
  const [city, setCity] = useState('New York');
  const [postalCode, setPostalCode] = useState('10012');
  const [deliveryNotes, setDeliveryNotes] = useState('Please leave with doorman or buzz 8');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'applepay'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D32F2F', '#F57C00', '#FFA000', '#FFFFFF'],
        });
      } catch (err) {
        // Fallback
      }

      placeOrder({
        customerName,
        customerEmail,
        customerPhone,
        orderType,
        deliveryAddress:
          orderType === 'delivery'
            ? {
                street,
                apt,
                city,
                postalCode,
                notes: deliveryNotes,
              }
            : undefined,
        paymentMethod,
      });

      setIsSubmitting(false);
      onOrderSuccess('order-tracker');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white border border-surface-border rounded-3xl shadow-soft-lg overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-surface-border flex items-center justify-between bg-alabaster">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-crimson/10 border border-crimson/20 flex items-center justify-center text-crimson">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-charcoal font-heading">
                Express Checkout
              </h3>
              <p className="text-xs text-charcoal-muted font-medium">
                256-Bit SSL Encrypted & Food Safety Inspected
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl bg-white border border-surface-border text-charcoal-muted hover:text-charcoal hover:bg-alabaster shadow-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Form Body */}
        <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          
          {/* Order Type Toggle: Delivery vs Pickup */}
          <div>
            <label className="text-xs font-black text-charcoal uppercase tracking-wider block mb-2">
              1. Fulfillment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`p-4 rounded-2xl border flex items-center justify-center gap-3 transition-all ${
                  orderType === 'delivery'
                    ? 'bg-crimson/10 border-crimson text-charcoal shadow-soft'
                    : 'bg-alabaster border-surface-border text-charcoal-muted hover:border-crimson/30'
                }`}
              >
                <Truck className="w-5 h-5 text-crimson" />
                <div className="text-left">
                  <p className="text-sm font-black text-charcoal">Doorstep Delivery</p>
                  <p className="text-[11px] text-charcoal-muted">28-35 mins hot arrival</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`p-4 rounded-2xl border flex items-center justify-center gap-3 transition-all ${
                  orderType === 'pickup'
                    ? 'bg-crimson/10 border-crimson text-charcoal shadow-soft'
                    : 'bg-alabaster border-surface-border text-charcoal-muted hover:border-crimson/30'
                }`}
              >
                <Store className="w-5 h-5 text-mustard" />
                <div className="text-left">
                  <p className="text-sm font-black text-charcoal">Express Pickup</p>
                  <p className="text-[11px] text-charcoal-muted">Ready in 15 mins at Branch</p>
                </div>
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <label className="text-xs font-black text-charcoal uppercase tracking-wider block mb-2">
              2. Customer Contact
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-charcoal-muted font-bold block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-charcoal-subtle absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-alabaster text-charcoal text-xs pl-8 pr-3 py-2.5 rounded-xl border border-surface-border focus:border-crimson focus:bg-white focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-charcoal-muted font-bold block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-charcoal-subtle absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-alabaster text-charcoal text-xs pl-8 pr-3 py-2.5 rounded-xl border border-surface-border focus:border-crimson focus:bg-white focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-charcoal-muted font-bold block mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-charcoal-subtle absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-alabaster text-charcoal text-xs pl-8 pr-3 py-2.5 rounded-xl border border-surface-border focus:border-crimson focus:bg-white focus:outline-none font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address (if Delivery) */}
          {orderType === 'delivery' && (
            <div className="space-y-3">
              <label className="text-xs font-black text-charcoal uppercase tracking-wider block">
                3. Delivery Destination
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[11px] text-charcoal-muted font-bold block mb-1">Street Address</label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-charcoal-subtle absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full bg-alabaster text-charcoal text-xs pl-8 pr-3 py-2.5 rounded-xl border border-surface-border focus:border-crimson focus:bg-white focus:outline-none font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-charcoal-muted font-bold block mb-1">Apt / Suite / Floor</label>
                  <input
                    type="text"
                    value={apt}
                    onChange={(e) => setApt(e.target.value)}
                    className="w-full bg-alabaster text-charcoal text-xs px-3 py-2.5 rounded-xl border border-surface-border focus:border-crimson focus:bg-white focus:outline-none font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-charcoal-muted font-bold block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-alabaster text-charcoal text-xs px-3 py-2.5 rounded-xl border border-surface-border focus:border-crimson focus:bg-white focus:outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-charcoal-muted font-bold block mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-alabaster text-charcoal text-xs px-3 py-2.5 rounded-xl border border-surface-border focus:border-crimson focus:bg-white focus:outline-none font-bold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-charcoal-muted font-bold block mb-1">Courier Instructions</label>
                <input
                  type="text"
                  placeholder="Gate code, drop off instructions..."
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full bg-alabaster text-charcoal text-xs px-3 py-2 rounded-xl border border-surface-border focus:border-crimson focus:bg-white focus:outline-none font-medium"
                />
              </div>
            </div>
          )}

          {/* Payment Method Selection */}
          <div>
            <label className="text-xs font-black text-charcoal uppercase tracking-wider block mb-2">
              4. Payment Gateway
            </label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-crimson/10 border-crimson text-charcoal shadow-soft'
                    : 'bg-alabaster border-surface-border text-charcoal-muted hover:border-crimson/30'
                }`}
              >
                <CreditCard className="w-5 h-5 text-crimson" />
                <span className="text-xs font-black text-charcoal">Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('applepay')}
                className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'applepay'
                    ? 'bg-crimson/10 border-crimson text-charcoal shadow-soft'
                    : 'bg-alabaster border-surface-border text-charcoal-muted hover:border-crimson/30'
                }`}
              >
                <Smartphone className="w-5 h-5 text-mustard" />
                <span className="text-xs font-black text-charcoal">Apple / GPay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-crimson/10 border-crimson text-charcoal shadow-soft'
                    : 'bg-alabaster border-surface-border text-charcoal-muted hover:border-crimson/30'
                }`}
              >
                <Banknote className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-black text-charcoal">Cash / Delivery</span>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="p-4 bg-alabaster rounded-2xl border border-surface-border space-y-3">
                <div>
                  <label className="text-[10px] text-charcoal-muted font-bold block mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-white text-charcoal font-mono text-xs px-3 py-2 rounded-xl border border-surface-border focus:border-crimson focus:outline-none font-bold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-charcoal-muted font-bold block mb-1">Expires (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-white text-charcoal font-mono text-xs px-3 py-2 rounded-xl border border-surface-border focus:border-crimson focus:outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-charcoal-muted font-bold block mb-1">CVC Code</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-white text-charcoal font-mono text-xs px-3 py-2 rounded-xl border border-surface-border focus:border-crimson focus:outline-none font-bold"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Confirmation */}
          <div className="p-4 bg-alabaster rounded-2xl border border-surface-border space-y-2 font-semibold">
            <div className="flex items-center justify-between text-xs text-charcoal-muted">
              <span>{cart.length} unique items</span>
              <span className="text-charcoal font-bold">${cartSubtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex items-center justify-between text-xs text-crimson font-black">
                <span>Discount ({appliedCoupon?.code})</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-xs text-charcoal-muted">
              <span>Tax (8.5%)</span>
              <span className="text-charcoal font-bold">${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-charcoal-muted">
              <span>Fulfillment Fee</span>
              <span className="text-charcoal font-bold">
                {orderType === 'pickup' || deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex items-center justify-between text-base font-black text-charcoal pt-2 border-t border-surface-border">
              <span>Payable Total:</span>
              <span className="text-2xl text-crimson font-heading">
                ${(orderType === 'pickup' ? Math.max(0, cartFinalTotal - deliveryFee) : cartFinalTotal).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            disabled={isSubmitting || cart.length === 0}
            className="w-full py-4 rounded-2xl bg-crimson hover:bg-crimson-hover text-white font-black text-base tracking-wide shadow-crimson-glow active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Firing Up Kitchen Order...</span>
              </div>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Authorize & Place Baron Feast (${cartFinalTotal.toFixed(2)})</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
