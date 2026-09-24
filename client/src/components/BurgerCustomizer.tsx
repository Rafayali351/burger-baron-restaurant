import React, { useState, useMemo } from 'react';
import {
  X,
  Check,
  ShoppingBag,
  SlidersHorizontal,
  ChefHat
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CUSTOMIZATION_OPTIONS } from '../data/mockData';
import type { Product, CustomizationSelection } from '../types';

export const BurgerCustomizer: React.FC = () => {
  const {
    isCustomizerOpen,
    closeCustomizer,
    customizingProduct,
    products,
    addToCart,
  } = useStore();

  const product = customizingProduct || products[0];

  const [activeTab, setActiveTab] = useState<'buns' | 'proteins' | 'cheeses' | 'toppings' | 'sauces'>('proteins');

  const [bun, setBun] = useState<string>('bun-brioche');
  const [protein, setProtein] = useState<string>('protein-wagyu');
  const [pattyCount, setPattyCount] = useState<number>(2);
  const [selectedCheeses, setSelectedCheeses] = useState<string[]>(['cheese-wisconsin']);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['top-shallotjam', 'top-bacon']);
  const [selectedSauces, setSelectedSauces] = useState<string[]>(['sauce-truffle']);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const totalPrice = useMemo(() => {
    let price = product.basePrice;

    if (pattyCount > 1) {
      price += (pattyCount - 1) * 3.50;
    }

    const chosenBun = CUSTOMIZATION_OPTIONS.buns.find((b) => b.id === bun);
    if (chosenBun) price += chosenBun.extraPrice;

    const chosenProtein = CUSTOMIZATION_OPTIONS.proteins.find((p) => p.id === protein);
    if (chosenProtein) price += chosenProtein.extraPrice;

    selectedCheeses.forEach((cId) => {
      const cheeseObj = CUSTOMIZATION_OPTIONS.cheeses.find((c) => c.id === cId);
      if (cheeseObj) price += cheeseObj.extraPrice;
    });

    selectedToppings.forEach((tId) => {
      const topObj = CUSTOMIZATION_OPTIONS.toppings.find((t) => t.id === tId);
      if (topObj) price += topObj.extraPrice;
    });

    if (selectedSauces.length > 1) {
      price += (selectedSauces.length - 1) * 0.75;
    }

    return Number(price.toFixed(2));
  }, [product, bun, protein, pattyCount, selectedCheeses, selectedToppings, selectedSauces]);

  if (!isCustomizerOpen) return null;

  const handleToggleCheese = (id: string) => {
    setSelectedCheeses((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleTopping = (id: string) => {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSauce = (id: string) => {
    setSelectedSauces((prev) =>
      prev.includes(id)
        ? prev.length > 1 ? prev.filter((item) => item !== id) : prev
        : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    const customConfig: CustomizationSelection = {
      bun,
      protein,
      pattyCount,
      cheeses: selectedCheeses,
      toppings: selectedToppings,
      sauces: selectedSauces,
      specialInstructions: specialInstructions.trim() || undefined,
    };

    addToCart(product, 1, customConfig);
    closeCustomizer();
  };

  const currentBunObj = CUSTOMIZATION_OPTIONS.buns.find((b) => b.id === bun);
  const currentProteinObj = CUSTOMIZATION_OPTIONS.proteins.find((p) => p.id === protein);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white border border-brand-border rounded-3xl shadow-card-hover overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-brand-border flex items-center justify-between bg-brand-bg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-red flex items-center justify-center text-white shadow-red-glow">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-brand-charcoal font-heading">
                  Custom Burger Master Builder
                </h3>
                <span className="hidden sm:inline text-[10px] bg-brand-amberLight text-brand-amberDark font-black px-2.5 py-0.5 rounded-full uppercase border border-brand-amber/30">
                  2D Live Stack
                </span>
              </div>
              <p className="text-xs text-brand-slate font-medium">
                Customizing: <span className="text-brand-red font-bold">{product.name}</span>
              </p>
            </div>
          </div>

          <button
            onClick={closeCustomizer}
            className="p-2 rounded-xl bg-white border border-brand-border text-brand-slate hover:text-brand-charcoal hover:bg-brand-bg shadow-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Left 2D Visualizer, Right Step Customizer Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* LEFT: 2D Visual Burger Layer Graphic */}
          <div className="lg:col-span-5 bg-brand-bg p-6 flex flex-col items-center justify-between border-b lg:border-b-0 lg:border-r border-brand-border">
            <div className="w-full flex items-center justify-between text-xs text-brand-slate font-bold mb-2">
              <span className="flex items-center gap-1">
                <ChefHat className="w-4 h-4 text-brand-red" /> Visual Assembly
              </span>
              <span className="text-brand-red font-black">{pattyCount}x Smashed Layers</span>
            </div>

            {/* Visual 2D Burger Assembly Stack */}
            <div className="w-full max-w-[280px] my-auto py-6 flex flex-col items-center justify-center space-y-1.5 select-none">
              
              {/* TOP BUN */}
              <div className="relative w-52 h-14 bg-gradient-to-b from-[#E59866] to-[#D35400] rounded-t-[50px] border-b-4 border-[#BA4A00] flex items-center justify-center shadow-md transform transition-all duration-300">
                <div className="absolute top-2 w-1.5 h-0.5 bg-[#FFF2D7] rounded-full rotate-12 left-10 opacity-90" />
                <div className="absolute top-3 w-1.5 h-0.5 bg-[#FFF2D7] rounded-full -rotate-45 left-24 opacity-90" />
                <div className="absolute top-2.5 w-1.5 h-0.5 bg-[#FFF2D7] rounded-full rotate-45 right-12 opacity-90" />
                <div className="absolute top-5 w-1.5 h-0.5 bg-[#FFF2D7] rounded-full -rotate-12 right-20 opacity-90" />
                <span className="text-[10px] font-black text-white uppercase tracking-wider drop-shadow">
                  {currentBunObj?.name.split(' ')[0]} Bun Top
                </span>
              </div>

              {/* SAUCE LAYER */}
              {selectedSauces.length > 0 && (
                <div className="w-48 h-3.5 bg-gradient-to-r from-[#FAD7A0] via-[#E67E22] to-[#FAD7A0] rounded-full opacity-90 shadow-sm flex items-center justify-center">
                  <span className="text-[8px] font-black text-brand-charcoal uppercase tracking-widest">
                    {selectedSauces.length}x Sauces Infused
                  </span>
                </div>
              )}

              {/* TOPPINGS LAYERS */}
              {selectedToppings.includes('top-arugula') && (
                <div className="w-48 h-3 bg-emerald-600 rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
                  Wild Arugula Leaves
                </div>
              )}

              {selectedToppings.includes('top-bacon') && (
                <div className="w-48 h-4 bg-gradient-to-r from-[#78281F] via-[#922B21] to-[#641E16] rounded-md border-y border-[#B03A2E] flex items-center justify-center text-[8px] font-black text-amber-200 uppercase tracking-wider">
                  Crispy Smoked Bacon Strips
                </div>
              )}

              {selectedToppings.includes('top-shallotjam') && (
                <div className="w-46 h-3 bg-[#512E5F] rounded-full flex items-center justify-center text-[8px] font-bold text-purple-200">
                  Caramelized Shallot Jam
                </div>
              )}

              {selectedToppings.includes('top-onionrings') && (
                <div className="w-48 h-4 bg-amber-600 rounded-lg flex items-center justify-center text-[8px] font-black text-amber-950">
                  Beer Battered Onion Rings
                </div>
              )}

              {/* PATTY 1 + CHEESE */}
              {selectedCheeses.length > 0 && (
                <div className="w-50 h-3.5 bg-[#F4D03F] rounded-md shadow-sm flex items-center justify-center text-[8px] font-bold text-brand-charcoal -mb-1 z-10">
                  Melted {CUSTOMIZATION_OPTIONS.cheeses.find(c => c.id === selectedCheeses[0])?.name.split(' ')[0]}
                </div>
              )}

              {/* FIRST PATTY */}
              <div className="w-52 h-8 bg-gradient-to-r from-[#4A235A]/40 via-[#3E2723] to-[#2E180E] rounded-xl border-y-2 border-[#1E1009] flex items-center justify-center text-[9px] font-black text-amber-200 tracking-wider shadow-inner">
                {currentProteinObj?.name.split(' ')[0]} Smashed Patty #1
              </div>

              {/* SECOND PATTY */}
              {pattyCount >= 2 && (
                <>
                  {selectedCheeses.length > 1 && (
                    <div className="w-50 h-3 bg-[#F39C12] rounded-md flex items-center justify-center text-[8px] font-bold text-brand-charcoal -mb-1 z-10">
                      Melted {CUSTOMIZATION_OPTIONS.cheeses.find(c => c.id === selectedCheeses[1])?.name.split(' ')[0]}
                    </div>
                  )}
                  <div className="w-52 h-8 bg-gradient-to-r from-[#4A235A]/40 via-[#3E2723] to-[#2E180E] rounded-xl border-y-2 border-[#1E1009] flex items-center justify-center text-[9px] font-black text-amber-200 tracking-wider shadow-inner">
                    {currentProteinObj?.name.split(' ')[0]} Smashed Patty #2
                  </div>
                </>
              )}

              {/* THIRD PATTY */}
              {pattyCount >= 3 && (
                <div className="w-52 h-8 bg-gradient-to-r from-[#4A235A]/40 via-[#3E2723] to-[#2E180E] rounded-xl border-y-2 border-[#1E1009] flex items-center justify-center text-[9px] font-black text-amber-200 tracking-wider shadow-inner">
                  {currentProteinObj?.name.split(' ')[0]} Smashed Patty #3 (Monster Stack)
                </div>
              )}

              {/* BOTTOM BUN */}
              <div className="w-50 h-9 bg-gradient-to-t from-[#B9770E] to-[#E59866] rounded-b-[30px] border-t-2 border-[#935116] flex items-center justify-center shadow-md">
                <span className="text-[10px] font-black text-white uppercase tracking-wider">
                  Toasted Bun Base
                </span>
              </div>

            </div>

            {/* Real-time Summary Card */}
            <div className="w-full bg-white rounded-2xl p-4 border border-brand-border shadow-sm mt-4">
              <div className="flex items-center justify-between text-xs text-brand-slate font-bold">
                <span>Calculated Build Price:</span>
                <span className="text-xl font-black text-brand-red font-heading">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-brand-slate mt-1 font-medium">
                Includes {pattyCount}x patty, {selectedCheeses.length} cheeses, {selectedToppings.length} toppings, {selectedSauces.length} sauces.
              </p>
            </div>

          </div>

          {/* RIGHT: Step-by-Step Customization Panel */}
          <div className="lg:col-span-7 p-6 space-y-6 flex flex-col justify-between bg-white">
            
            {/* Step Selection Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-brand-border">
              <button
                onClick={() => setActiveTab('proteins')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                  activeTab === 'proteins'
                    ? 'bg-brand-red text-white shadow-red-glow'
                    : 'bg-brand-bg text-brand-slate hover:text-brand-charcoal'
                }`}
              >
                1. Patties & Protein
              </button>
              <button
                onClick={() => setActiveTab('buns')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                  activeTab === 'buns'
                    ? 'bg-brand-red text-white shadow-red-glow'
                    : 'bg-brand-bg text-brand-slate hover:text-brand-charcoal'
                }`}
              >
                2. Bun Style
              </button>
              <button
                onClick={() => setActiveTab('cheeses')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                  activeTab === 'cheeses'
                    ? 'bg-brand-red text-white shadow-red-glow'
                    : 'bg-brand-bg text-brand-slate hover:text-brand-charcoal'
                }`}
              >
                3. Artisanal Cheese ({selectedCheeses.length})
              </button>
              <button
                onClick={() => setActiveTab('toppings')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                  activeTab === 'toppings'
                    ? 'bg-brand-red text-white shadow-red-glow'
                    : 'bg-brand-bg text-brand-slate hover:text-brand-charcoal'
                }`}
              >
                4. Toppings ({selectedToppings.length})
              </button>
              <button
                onClick={() => setActiveTab('sauces')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                  activeTab === 'sauces'
                    ? 'bg-brand-red text-white shadow-red-glow'
                    : 'bg-brand-bg text-brand-slate hover:text-brand-charcoal'
                }`}
              >
                5. Glazes & Sauces ({selectedSauces.length})
              </button>
            </div>

            {/* Tab 1: Proteins & Patty Quantity */}
            {activeTab === 'proteins' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h4 className="text-sm font-black text-brand-charcoal mb-2">Patty Stack Quantity</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((qty) => (
                      <button
                        key={qty}
                        onClick={() => setPattyCount(qty)}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          pattyCount === qty
                            ? 'bg-brand-redLight border-brand-red text-brand-red shadow-sm'
                            : 'bg-brand-bg border-brand-border text-brand-slate hover:border-brand-red/30'
                        }`}
                      >
                        <p className="text-base font-black text-brand-charcoal">
                          {qty === 1 ? 'Single Patty' : qty === 2 ? 'Double Smash' : 'Triple Monster'}
                        </p>
                        <p className="text-xs text-brand-red font-bold mt-0.5">
                          {qty === 1 ? 'Included' : `+$${((qty - 1) * 3.50).toFixed(2)}`}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-black text-brand-charcoal mb-2">Select Meat / Protein Type</h4>
                  <div className="space-y-2">
                    {CUSTOMIZATION_OPTIONS.proteins.map((p) => (
                      <label
                        key={p.id}
                        onClick={() => setProtein(p.id)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          protein === p.id
                            ? 'bg-brand-redLight border-brand-red text-brand-charcoal shadow-sm'
                            : 'bg-brand-bg border-brand-border text-brand-charcoal hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="protein"
                            checked={protein === p.id}
                            onChange={() => setProtein(p.id)}
                            className="accent-brand-red w-4 h-4"
                          />
                          <span className="text-sm font-bold text-brand-charcoal">{p.name}</span>
                        </div>
                        <span className="text-xs font-bold text-brand-red">
                          {p.extraPrice > 0 ? `+$${p.extraPrice.toFixed(2)}` : 'Included'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Buns */}
            {activeTab === 'buns' && (
              <div className="space-y-3 animate-fadeIn">
                <h4 className="text-sm font-black text-brand-charcoal mb-1">Choose Freshly Baked Bun</h4>
                <div className="space-y-2">
                  {CUSTOMIZATION_OPTIONS.buns.map((b) => (
                    <label
                      key={b.id}
                      onClick={() => setBun(b.id)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        bun === b.id
                          ? 'bg-brand-redLight border-brand-red text-brand-charcoal shadow-sm'
                          : 'bg-brand-bg border-brand-border text-brand-charcoal hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="bun"
                          checked={bun === b.id}
                          onChange={() => setBun(b.id)}
                          className="accent-brand-red w-4 h-4"
                        />
                        <span className="text-sm font-bold text-brand-charcoal">{b.name}</span>
                      </div>
                      <span className="text-xs font-bold text-brand-red">
                        {b.extraPrice > 0 ? `+$${b.extraPrice.toFixed(2)}` : 'Included'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Cheeses */}
            {activeTab === 'cheeses' && (
              <div className="space-y-3 animate-fadeIn">
                <h4 className="text-sm font-black text-brand-charcoal mb-1">Select Melted Cheeses (Multi-select)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CUSTOMIZATION_OPTIONS.cheeses.map((c) => {
                    const isChecked = selectedCheeses.includes(c.id);
                    return (
                      <div
                        key={c.id}
                        onClick={() => handleToggleCheese(c.id)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-brand-redLight border-brand-red text-brand-charcoal shadow-sm'
                            : 'bg-brand-bg border-brand-border text-brand-charcoal hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-brand-red border-brand-red text-white' : 'border-brand-slate'}`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-bold text-brand-charcoal">{c.name}</span>
                        </div>
                        <span className="text-[11px] font-black text-brand-red">
                          +${c.extraPrice.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 4: Toppings */}
            {activeTab === 'toppings' && (
              <div className="space-y-3 animate-fadeIn">
                <h4 className="text-sm font-black text-brand-charcoal mb-1">Gourmet Toppings & Crunch (Multi-select)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CUSTOMIZATION_OPTIONS.toppings.map((t) => {
                    const isChecked = selectedToppings.includes(t.id);
                    return (
                      <div
                        key={t.id}
                        onClick={() => handleToggleTopping(t.id)}
                        className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-brand-redLight border-brand-red text-brand-charcoal shadow-sm'
                            : 'bg-brand-bg border-brand-border text-brand-charcoal hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-brand-red border-brand-red text-white' : 'border-brand-slate'}`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-bold text-brand-charcoal">{t.name}</span>
                        </div>
                        <span className="text-[11px] font-black text-brand-red">
                          +${t.extraPrice.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 5: Sauces */}
            {activeTab === 'sauces' && (
              <div className="space-y-3 animate-fadeIn">
                <h4 className="text-sm font-black text-brand-charcoal mb-1">House Glazes & Dips (First free)</h4>
                <div className="space-y-2">
                  {CUSTOMIZATION_OPTIONS.sauces.map((s) => {
                    const isChecked = selectedSauces.includes(s.id);
                    return (
                      <div
                        key={s.id}
                        onClick={() => handleToggleSauce(s.id)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-brand-redLight border-brand-red text-brand-charcoal shadow-sm'
                            : 'bg-brand-bg border-brand-border text-brand-charcoal hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-brand-red border-brand-red text-white' : 'border-brand-slate'}`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-brand-charcoal">{s.name}</span>
                        </div>
                        <span className="text-xs font-black text-brand-red">
                          {isChecked && selectedSauces[0] === s.id ? 'Included' : `+$${s.extraPrice.toFixed(2)}`}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <label className="text-xs font-black text-brand-charcoal block mb-1">
                    Special Kitchen Requests
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Extra crispy patty edges, light sauce, cut in half"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full bg-brand-bg text-brand-charcoal placeholder-brand-slate text-xs px-3.5 py-2.5 rounded-xl border border-brand-border focus:border-brand-red focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Bottom Footer Action Bar */}
            <div className="pt-4 border-t border-brand-border flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-brand-slate uppercase block font-bold">Total Price</span>
                <span className="text-2xl font-black text-brand-charcoal font-heading">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={closeCustomizer}
                  className="px-4 py-3 rounded-xl bg-brand-bg hover:bg-brand-border text-brand-charcoal text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-3 rounded-xl bg-brand-red hover:bg-brand-redDark text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-red-glow active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span>Add Custom Masterpiece</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
