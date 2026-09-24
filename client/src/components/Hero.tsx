import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  Clock,
  Percent
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenCustomizer: () => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    badge: '👑 SIGNATURE CHEF CREATION',
    title: "THE BARON'S",
    titleHighlight: 'GRAND WAGYU SMASH',
    description: 'Double 100% Australian Wagyu patties smashed paper-thin on 450°F cast iron, triple aged Wisconsin cheddar, shallot jam & house black truffle aioli.',
    price: '$15.99',
    originalPrice: '$19.99',
    promoCode: 'BARON25',
    promoDiscount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
    ctaText: 'Order Flagship Baron',
    accentColor: '#DC2626',
  },
  {
    id: 2,
    badge: '🔥 LIMITED TIME CRAVE COMBO',
    title: "MIDNIGHT HUNGER",
    titleHighlight: 'DUO FEAST BOX',
    description: '2x Double Baron Smash Burgers, Loaded Beer-Cheese Bacon Fries, 8x Jumbo Buffalo Wings, and 2x Cold Brew Craft Sodas.',
    price: '$32.99',
    originalPrice: '$44.99',
    promoCode: 'MIDNIGHT30',
    promoDiscount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1200&q=85',
    ctaText: 'Claim Combo Special',
    accentColor: '#D97706',
  },
  {
    id: 3,
    badge: '⚡ ULTRA CRISP SPECIALTY',
    title: 'NASHVILLE HOT',
    titleHighlight: 'CRUNCHY BIRD',
    description: '24-hour buttermilk-dredged chicken fried to thunderous crisp, brushed with fiery Cayenne chili butter, cool slaw, and artisan pickles.',
    price: '$14.49',
    originalPrice: '$17.49',
    promoCode: 'WELCOME10',
    promoDiscount: '$10 OFF',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=1200&q=85',
    ctaText: 'Taste The Heat',
    accentColor: '#DC2626',
  },
];

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenCustomizer }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart, products, addToast } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const handleOrderHeroItem = () => {
    const prod = products[currentSlide] || products[0];
    addToCart(prod, 1);
  };

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    addToast('Coupon Copied!', `Code ${code} copied to clipboard! Paste at checkout.`, 'info');
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-brand-bg py-10 lg:py-16">
      
      {/* Subtle warm backdrop glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] rounded-full blur-[140px] opacity-20 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: slide.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-border text-xs font-black text-brand-red tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
              <span>{slide.badge}</span>
            </div>

            {/* Big Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-charcoal font-heading leading-tight">
                {slide.title} <br />
                <span className="text-brand-red drop-shadow-sm">
                  {slide.titleHighlight}
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-brand-slate max-w-xl leading-relaxed font-medium">
              {slide.description}
            </p>

            {/* Pricing & Promo Box */}
            <div className="flex flex-wrap items-center gap-4 py-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-brand-charcoal font-heading">{slide.price}</span>
                <span className="text-base text-brand-slate line-through">{slide.originalPrice}</span>
              </div>
              <div 
                onClick={() => copyCode(slide.promoCode)}
                className="cursor-pointer group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-brand-amber/40 hover:border-brand-red transition-all shadow-sm"
                title="Click to copy coupon code"
              >
                <Percent className="w-4 h-4 text-brand-red" />
                <span className="text-xs text-brand-slate font-bold">Use code</span>
                <span className="font-mono font-black text-brand-red text-xs tracking-wider group-hover:scale-105 transition-transform">
                  {slide.promoCode}
                </span>
                <span className="text-[10px] bg-brand-red text-white font-black px-2 py-0.5 rounded-md">
                  {slide.promoDiscount}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={handleOrderHeroItem}
                className="px-8 py-4 rounded-2xl bg-brand-red text-white font-black text-base tracking-wide shadow-red-glow hover:bg-brand-redDark active:scale-98 transition-all flex items-center justify-center gap-2 group"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenCustomizer}
                className="px-7 py-4 rounded-2xl bg-white border border-brand-border hover:border-brand-red text-brand-charcoal font-bold text-base transition-all flex items-center justify-center gap-2 shadow-sm hover:bg-brand-bg"
              >
                <SlidersHorizontal className="w-5 h-5 text-brand-amber" />
                <span>Build Custom Burger</span>
              </button>
            </div>

            {/* Trust Micro-Metrics */}
            <div className="pt-6 border-t border-brand-border grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-brand-charcoal font-heading">100%</p>
                <p className="text-xs text-brand-slate font-bold">Prime Wagyu Beef</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-brand-amber font-heading">4.9 ★</p>
                <p className="text-xs text-brand-slate font-bold">Over 2,400+ Reviews</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-brand-red font-heading">28 Min</p>
                <p className="text-xs text-brand-slate font-bold">Average Hot Delivery</p>
              </div>
            </div>

          </div>

          {/* Right Image Display & Floating Cards */}
          <div className="lg:col-span-6 relative flex justify-center">
            
            {/* Main Featured Burger Image Container */}
            <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden border border-brand-border bg-white shadow-card-hover group">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Floating Chef Badge */}
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center gap-3 border border-brand-border shadow-sm animate-float">
                <div className="w-8 h-8 rounded-full bg-brand-redLight flex items-center justify-center">
                  <Flame className="w-4 h-4 text-brand-red" />
                </div>
                <div>
                  <p className="text-[10px] text-brand-slate uppercase tracking-wider font-bold">Grill Temperature</p>
                  <p className="text-xs font-black text-brand-charcoal">450°F Sizzling Iron</p>
                </div>
              </div>

              {/* Floating Fresh Delivery Badge */}
              <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center gap-3 border border-brand-border shadow-sm">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[10px] text-brand-slate uppercase tracking-wider font-bold">Speed Guarantee</p>
                  <p className="text-xs font-black text-emerald-700">Hot & Crispy at Door</p>
                </div>
              </div>
            </div>

            {/* Slider Navigation Dots and Arrows */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <button
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
                className="p-2 rounded-full bg-white text-brand-charcoal hover:text-brand-red border border-brand-border hover:border-brand-red shadow-sm transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? 'w-8 bg-brand-red' : 'w-2.5 bg-brand-border hover:bg-brand-slate'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                className="p-2 rounded-full bg-white text-brand-charcoal hover:text-brand-red border border-brand-border hover:border-brand-red shadow-sm transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
