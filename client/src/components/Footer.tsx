import React, { useState } from 'react';
import {
  Flame,
  Crown,
  PhoneCall,
  Clock,
  MapPin,
  Mail,
  Send,
  ShieldCheck,
  Award,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { addToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    addToast(
      'Welcome to The Baron Circle!',
      'Check your email for your exclusive 20% off welcome voucher!',
      'success'
    );
    setNewsletterEmail('');
  };

  return (
    <footer className="w-full bg-brand-charcoal border-t border-brand-charcoal text-white pt-16 pb-12 relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-amber/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-red flex items-center justify-center shadow-red-glow relative">
                <Flame className="w-6 h-6 text-white" />
                <Crown className="w-3.5 h-3.5 text-brand-amber absolute top-1 right-1" />
              </div>
              <span className="text-xl font-black text-white font-heading tracking-tight">
                THE BURGER <span className="text-brand-red">BARON</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
              Purveyors of artisanal cast-iron smash burgers, hand-spun frozen custard shakes, and gourmet fries. Raised on quality, forged in fire.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#social-ig"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-red hover:text-white border border-white/15 flex items-center justify-center text-zinc-300 transition-all shadow-sm"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#social-fb"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-red hover:text-white border border-white/15 flex items-center justify-center text-zinc-300 transition-all shadow-sm"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="#social-x"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-red hover:text-white border border-white/15 flex items-center justify-center text-zinc-300 transition-all shadow-sm"
                title="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider font-heading flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-amber" />
              Menu Portals
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400 font-medium">
              <li>
                <a href="#menu" className="hover:text-brand-amber transition-colors flex items-center gap-1.5">
                  <span>→</span> Artisanal Prime Smash Burgers
                </a>
              </li>
              <li>
                <a href="#deals" className="hover:text-brand-amber transition-colors flex items-center gap-1.5">
                  <span>→</span> Sizzling Daily Value Combos
                </a>
              </li>
              <li>
                <a href="#customizer" className="hover:text-brand-amber transition-colors flex items-center gap-1.5">
                  <span>→</span> 2D Interactive Custom Burger Studio
                </a>
              </li>
              <li>
                <a href="#tracker" className="hover:text-brand-amber transition-colors flex items-center gap-1.5">
                  <span>→</span> Live GPS Order Radar
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-brand-amber transition-colors flex items-center gap-1.5">
                  <span>→</span> Certified Food Critic Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Store Hours & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider font-heading flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-amber" />
              Kitchen Hours
            </h4>
            <div className="text-xs sm:text-sm text-zinc-400 space-y-1.5 font-medium">
              <p className="flex justify-between border-b border-white/10 pb-1">
                <span>Mon – Thu:</span>
                <span className="font-bold text-white">11:00 AM – 11:00 PM</span>
              </p>
              <p className="flex justify-between border-b border-white/10 pb-1">
                <span>Fri – Sat:</span>
                <span className="font-bold text-brand-amber">11:00 AM – 2:00 AM (Late)</span>
              </p>
              <p className="flex justify-between pb-1">
                <span>Sunday:</span>
                <span className="font-bold text-white">11:30 AM – 10:30 PM</span>
              </p>
            </div>

            <div className="pt-2 text-xs space-y-1">
              <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>542 Mercer Street, SoHo, New York, NY</span>
              </div>
              <div className="pt-1">
                <a
                  href="tel:18002276632"
                  className="inline-flex items-center gap-2 text-brand-amber font-black text-xs hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Order Hotline: 1-800-BARON-EATS
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider font-heading flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-amber" />
              The Baron's Club
            </h4>
            <p className="text-xs text-zinc-400 font-medium">
              Subscribe to get secret drop notifications, private tasting invites, and an instant 20% off voucher.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your VIP email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-white/10 text-white placeholder-zinc-500 text-xs px-3.5 py-3 rounded-xl border border-white/20 focus:border-brand-red focus:outline-none shadow-inner font-medium"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand-red hover:bg-brand-redDark text-white font-black text-xs shadow-red-glow transition-all flex items-center justify-center gap-1.5"
              >
                <span>Join & Claim 20% Off</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Hygiene Badge */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-medium">
          <p>© 2026 THE BURGER BARON. All Rights Reserved. Crafted with Passion.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Certified Food Safety Grade A+
            </span>
            <span>•</span>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
