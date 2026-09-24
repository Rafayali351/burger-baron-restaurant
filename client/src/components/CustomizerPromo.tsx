import React from 'react';
import { SlidersHorizontal, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CustomizerPromo: React.FC = () => {
  const { openCustomizer, products } = useStore();

  return (
    <section id="customizer-promo" className="w-full py-16 bg-brand-bg scroll-mt-20 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-brand-border shadow-card-hover">
          
          {/* Subtle warm glow accents */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-amber/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-redLight border border-brand-red/20 text-brand-red text-xs font-black uppercase tracking-wider">
                <SlidersHorizontal className="w-3.5 h-3.5 text-brand-amberDark" />
                <span>2D Interactive Kitchen Station</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-charcoal font-heading">
                CRAFT YOUR OWN <span className="text-brand-red">SIGNATURE BARON</span>
              </h2>

              <p className="text-sm sm:text-base text-brand-slate max-w-2xl leading-relaxed font-medium">
                Stack up to 3 Wagyu beef or crispy zinger patties, swap brioche for gluten-free seeded rolls, melt Wisconsin cheddar with Swiss Gruyère, and drizzle house black truffle aioli with live dynamic price calculation.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-brand-slate font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-red" /> 5 Bun Selections
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-slate font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-amber" /> Wagyu, Angus & Plant-Based
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-slate font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-red" /> 7 Gourmet Cheeses & Toppings
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-slate font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-amber" /> Real-Time 2D Visualizer
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => openCustomizer(products[0])}
                className="px-8 py-5 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white font-black text-base shadow-red-glow active:scale-95 transition-all flex items-center gap-3 group"
              >
                <span>Launch Burger Builder</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
