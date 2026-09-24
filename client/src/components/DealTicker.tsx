import React, { useState, useEffect } from 'react';
import {
  Timer,
  Flame,
  CheckCircle2,
  Gift
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const DealTicker: React.FC = () => {
  const { products, addToCart, applyCoupon } = useStore();

  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19,
  });

  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClaimOffer = () => {
    const comboProduct = products.find((p) => p.categoryId === 'value-combos') || products[0];
    addToCart(comboProduct, 1);
    applyCoupon('BARON25');
    setClaimed(true);
    setTimeout(() => setClaimed(false), 4000);
  };

  return (
    <section id="deals" className="w-full py-8 bg-brand-bg px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-brand-charcoal via-[#27201C] to-brand-charcoal rounded-3xl p-6 sm:p-8 text-white border border-white/10 shadow-card-hover relative overflow-hidden">
        
        {/* Subtle flame glow */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-brand-amber/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* Left Deal Title & Icon */}
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-16 h-16 rounded-2xl bg-brand-red flex items-center justify-center flex-shrink-0 shadow-red-glow">
              <Flame className="w-9 h-9 text-white animate-bounce" style={{ animationDuration: '2s' }} />
            </div>
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="text-xs font-black tracking-widest uppercase bg-brand-amber text-brand-charcoal px-3 py-0.5 rounded-full shadow-sm">
                  🔥 Sizzling Flash Deal of the Day
                </span>
                <span className="text-xs text-white/70 font-bold hidden sm:inline">• Only 14 Boxes Left</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5 font-heading">
                Baron's Double Crunch Wagyu Combo — <span className="text-brand-amber">25% OFF</span>
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-medium">
                Includes Double Wagyu Smash + Truffle Parmesan Fries + Salted Caramel Custard Shake!
              </p>
            </div>
          </div>

          {/* Center Countdown Timer - High Contrast White Cards */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15 shadow-inner">
            <Timer className="w-5 h-5 text-brand-amber" />
            <div className="flex items-center gap-2 font-mono text-center">
              <div>
                <div className="text-xl sm:text-2xl font-black text-brand-charcoal px-2.5 py-1 bg-white rounded-xl shadow-sm min-w-[42px]">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-white/70 uppercase font-black mt-1">Hours</div>
              </div>
              <span className="text-brand-amber text-xl font-black -mt-3">:</span>
              <div>
                <div className="text-xl sm:text-2xl font-black text-brand-charcoal px-2.5 py-1 bg-white rounded-xl shadow-sm min-w-[42px]">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-white/70 uppercase font-black mt-1">Mins</div>
              </div>
              <span className="text-brand-amber text-xl font-black -mt-3">:</span>
              <div>
                <div className="text-xl sm:text-2xl font-black text-brand-red px-2.5 py-1 bg-white rounded-xl shadow-sm min-w-[42px]">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-brand-amber uppercase font-black mt-1">Secs</div>
              </div>
            </div>
          </div>

          {/* Right Instant Claim Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleClaimOffer}
              disabled={claimed}
              className={`px-8 py-4 rounded-2xl font-black text-sm tracking-wide transition-all duration-300 flex items-center gap-2 shadow-red-glow ${
                claimed
                  ? 'bg-emerald-500 text-white scale-105'
                  : 'bg-brand-red hover:bg-brand-redDark text-white active:scale-95'
              }`}
            >
              {claimed ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  <span>Combo & 25% Off Claimed!</span>
                </>
              ) : (
                <>
                  <Gift className="w-5 h-5 text-brand-amber" />
                  <span>Claim Offer & Save 25%</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
