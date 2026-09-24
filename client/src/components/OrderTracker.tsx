import React from 'react';
import {
  Clock,
  CheckCircle2,
  ChefHat,
  Truck,
  Home,
  PhoneCall,
  Star,
  MapPin,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import type { OrderStatus } from '../types';

const STATUS_STEPS: { status: OrderStatus; label: string; desc: string; icon: React.ElementType }[] = [
  { status: 'Placed', label: 'Order Placed', desc: 'Ticket received by Baron dispatch', icon: CheckCircle2 },
  { status: 'Confirmed', label: 'Confirmed', desc: 'Ingredients gathered & verified', icon: ShieldCheck },
  { status: 'Preparing in Kitchen', label: 'On Sizzling Iron', desc: 'Smashed on 450°F grill & assembled', icon: ChefHat },
  { status: 'Out for Delivery', label: 'Out for Delivery', desc: 'In heated courier box en route', icon: Truck },
  { status: 'Delivered', label: 'Delivered', desc: 'Enjoy your artisan feast!', icon: Home },
];

export const OrderTracker: React.FC = () => {
  const { currentOrder, updateOrderStatus } = useStore();

  if (!currentOrder) {
    return (
      <section id="order-tracker" className="w-full py-16 bg-alabaster text-center">
        <div className="max-w-md mx-auto px-4 bg-white p-8 rounded-3xl border border-surface-border shadow-soft">
          <Clock className="w-12 h-12 text-mustard mx-auto mb-3" />
          <h3 className="text-xl font-black text-charcoal mb-2 font-heading">No Active Order Right Now</h3>
          <p className="text-sm text-charcoal-muted">
            Place an order from our menu to track your burger live from our kitchen to your doorstep!
          </p>
        </div>
      </section>
    );
  }

  const currentStepIndex = STATUS_STEPS.findIndex((s) => s.status === currentOrder.status);

  const handleAdvanceStep = () => {
    if (currentStepIndex < STATUS_STEPS.length - 1) {
      const nextStatus = STATUS_STEPS[currentStepIndex + 1].status;
      updateOrderStatus(currentOrder.id, nextStatus);
    }
  };

  const handleResetStep = () => {
    updateOrderStatus(currentOrder.id, 'Placed');
  };

  return (
    <section id="order-tracker" className="w-full py-16 bg-alabaster scroll-mt-20 border-t border-surface-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>Live Kitchen & Delivery Feed</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-charcoal font-heading">
              ORDER TRACKER: <span className="text-crimson">{currentOrder.orderNumber}</span>
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted font-bold mt-1">
              Estimated Arrival: <span className="text-crimson font-black">{currentOrder.estimatedDeliveryTime}</span> • Placed {currentOrder.createdAt}
            </p>
          </div>

          {/* Interactive Simulation Controls for Testing */}
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-surface-border shadow-soft">
            <span className="text-[11px] text-charcoal-muted uppercase font-black hidden sm:inline">Simulate:</span>
            <button
              onClick={handleAdvanceStep}
              disabled={currentStepIndex === STATUS_STEPS.length - 1}
              className="px-3.5 py-1.5 bg-crimson hover:bg-crimson-hover text-white text-xs font-black rounded-xl transition-all disabled:opacity-30 disabled:pointer-events-none shadow-sm"
            >
              Next Stage →
            </button>
            <button
              onClick={handleResetStep}
              className="p-1.5 text-charcoal-muted hover:text-charcoal"
              title="Reset Order to Placed"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5-Stage Animated Tracking Pipeline - Crisp Pure White Surface */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 mb-8 border border-surface-border shadow-soft-md">
          <div className="relative">
            
            {/* Progress Background Line */}
            <div className="hidden md:block absolute top-7 left-10 right-10 h-2 bg-surface-border rounded-full z-0">
              <div
                className="h-full bg-gradient-to-r from-crimson via-mustard to-emerald-600 rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%`,
                }}
              />
            </div>

            {/* Steps Container */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-2 relative z-10">
              {STATUS_STEPS.map((step, idx) => {
                const IconComponent = step.icon;
                const isPassed = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={step.status} className="flex md:flex-col items-center md:text-center gap-4 md:gap-3">
                    
                    {/* Circle Icon Badge */}
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                        isCurrent
                          ? 'bg-crimson text-white shadow-crimson-glow scale-110 ring-4 ring-crimson/20'
                          : isPassed
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-alabaster text-charcoal-subtle border border-surface-border'
                      }`}
                    >
                      <IconComponent className="w-6 h-6 stroke-[2.5]" />
                    </div>

                    {/* Step Label & Desc */}
                    <div>
                      <h4
                        className={`text-sm font-black transition-colors ${
                          isCurrent ? 'text-crimson' : isPassed ? 'text-charcoal' : 'text-charcoal-subtle'
                        }`}
                      >
                        {step.label}
                      </h4>
                      <p className="text-[11px] text-charcoal-muted max-w-[150px] md:mx-auto mt-0.5 leading-snug font-medium">
                        {step.desc}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Detailed Order Breakdown & Courier Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Driver and Destination Details */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-surface-border shadow-soft space-y-5">
            <h3 className="text-base font-black text-charcoal font-heading flex items-center gap-2">
              <Truck className="w-5 h-5 text-crimson" />
              Assigned Baron Courier Specialist
            </h3>

            {currentOrder.driver && (
              <div className="flex items-center justify-between p-4 bg-alabaster rounded-2xl border border-surface-border">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-crimson/10 border border-crimson/20 flex items-center justify-center font-black text-crimson text-base">
                    TH
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-charcoal">{currentOrder.driver.name}</h4>
                    <p className="text-xs text-charcoal-muted font-medium">{currentOrder.driver.vehicle}</p>
                    <span className="inline-flex items-center gap-1 text-[11px] text-mustard font-bold mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-mustard text-mustard" />
                      {currentOrder.driver.rating} ★ Top Rated Courier
                    </span>
                  </div>
                </div>

                <a
                  href={`tel:${currentOrder.driver.phone}`}
                  className="p-3.5 rounded-xl bg-crimson text-white font-bold hover:bg-crimson-hover transition-all shadow-crimson-glow"
                  title="Call Courier"
                >
                  <PhoneCall className="w-5 h-5" />
                </a>
              </div>
            )}

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5 text-charcoal">
                <MapPin className="w-4 h-4 text-crimson flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-black text-charcoal block">Fulfillment Destination:</span>
                  {currentOrder.deliveryAddress ? (
                    <p className="text-charcoal-muted font-medium">
                      {currentOrder.deliveryAddress.street}, {currentOrder.deliveryAddress.apt}, {currentOrder.deliveryAddress.city} {currentOrder.deliveryAddress.postalCode}
                      {currentOrder.deliveryAddress.notes && (
                        <span className="block text-[11px] text-crimson font-bold mt-0.5">
                          Note: "{currentOrder.deliveryAddress.notes}"
                        </span>
                      )}
                    </p>
                  ) : (
                    <p className="text-charcoal-muted font-medium">Baron Flagship Branch Pickup: 108 Gourmet Blvd</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Items in Order */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-surface-border shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-charcoal font-heading">
                Dishes in this Ticket
              </h3>
              <span className="text-xs font-mono text-crimson font-black text-base">
                Total: ${currentOrder.finalTotal.toFixed(2)}
              </span>
            </div>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {currentOrder.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-alabaster rounded-xl text-xs border border-surface-border">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-black text-crimson">{item.quantity}x</span>
                    <span className="text-charcoal font-bold truncate">{item.product.name}</span>
                  </div>
                  <span className="text-charcoal font-mono font-bold">
                    ${(item.calculatedPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-surface-border flex justify-between text-xs text-charcoal-muted font-medium">
              <span>Payment: {currentOrder.paymentMethod.toUpperCase()}</span>
              <span>Need help? Call 1-800-BARON-EATS</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
