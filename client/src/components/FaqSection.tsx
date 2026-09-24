import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="w-full py-16 bg-alabaster scroll-mt-20 border-t border-surface-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-crimson/10 border border-crimson/20 text-crimson text-xs font-black uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-mustard" />
            <span>Clear Curations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal font-heading">
            FREQUENTLY ASKED <span className="text-crimson">QUESTIONS</span>
          </h2>
          <p className="text-charcoal-muted text-sm mt-2 max-w-lg mx-auto font-medium">
            Everything you need to know about our beef sourcing, hot delivery guarantees, allergen accommodations, and catering.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-soft ${
                  isOpen ? 'border-crimson/40 bg-white' : 'border-surface-border hover:border-crimson/20'
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <span className="text-sm sm:text-base font-black text-charcoal leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-alabaster flex items-center justify-center text-crimson flex-shrink-0 transition-transform duration-300 border border-surface-border ${
                      isOpen ? 'rotate-180 bg-crimson text-white border-crimson' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoal-muted leading-relaxed border-t border-surface-border animate-fadeIn font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
