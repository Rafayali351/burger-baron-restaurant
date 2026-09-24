import React, { useMemo } from 'react';
import {
  Flame,
  Star,
  Plus,
  SlidersHorizontal,
  Sparkles,
  ArrowUpDown,
  Utensils
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/mockData';
import type { CategoryType, Product } from '../types';

export const MenuGrid: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    sortBy,
    setSortBy,
    addToCart,
    openCustomizer,
  } = useStore();

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory =
          selectedCategory === 'all' || item.categoryId === selectedCategory;
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
        if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isChefsPick ? 1 : 0) - (a.isChefsPick ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="menu" className="w-full py-16 bg-brand-bg scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-redLight border border-brand-red/20 text-brand-red text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-amberDark" />
              <span>Artisanal Kitchen Craft</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-charcoal font-heading tracking-tight">
              THE BARON'S <span className="text-brand-red">REPERTOIRE</span>
            </h2>
            <p className="text-brand-slate text-sm sm:text-base mt-2 max-w-xl font-medium">
              100% Prime Wagyu beef smashed on 450°F seasoned cast-iron, artisanal potato & brioche buns baked twice daily, and signature craft sides.
            </p>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-brand-slate flex items-center gap-1.5 font-bold">
              <ArrowUpDown className="w-3.5 h-3.5 text-brand-red" /> Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white text-brand-charcoal text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border border-brand-border shadow-sm focus:border-brand-red focus:outline-none cursor-pointer"
            >
              <option value="featured">Chef's Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated (★ 5.0)</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 flex-shrink-0 border ${
                  isSelected
                    ? 'bg-brand-red text-white border-brand-red shadow-red-glow'
                    : 'bg-white text-brand-charcoal border-brand-border hover:border-brand-red/40 hover:text-brand-red shadow-sm'
                }`}
              >
                <span>{category.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-brand-bg text-brand-slate'
                  }`}
                >
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-brand-border shadow-sm">
            <Utensils className="w-12 h-12 text-brand-amber/40 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-brand-charcoal mb-2">No burgers found</h3>
            <p className="text-sm text-brand-slate max-w-md mx-auto">
              We couldn't find any menu items matching "{searchQuery}". Try searching for Wagyu, Bacon, or Fries.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onQuickAdd={() => addToCart(item, 1)}
                onCustomize={() => openCustomizer(item)}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  onQuickAdd: () => void;
  onCustomize: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickAdd, onCustomize }) => {
  return (
    <div className="group food-card overflow-hidden flex flex-col justify-between">
      
      {/* Product Image & Badges */}
      <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-brand-bg">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
          {product.isChefsPick && (
            <span className="px-3 py-1 rounded-full bg-brand-red text-white text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-brand-amber" /> Chef's Pick
            </span>
          )}
          {product.isSpicy && (
            <span className="px-3 py-1 rounded-full bg-orange-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-200" /> Spicy
            </span>
          )}
          {product.isNew && (
            <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
              New
            </span>
          )}
        </div>

        {/* Rating and calories tag */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          {product.calories && (
            <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
              {product.calories} kcal
            </span>
          )}
          <span className="px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md text-brand-amberDark text-xs font-black flex items-center gap-1 border border-brand-border shadow-sm">
            <Star className="w-3.5 h-3.5 fill-brand-amber text-brand-amber" />
            <span className="text-brand-charcoal">{product.rating.toFixed(1)}</span>
            <span className="text-brand-slate text-[10px]">({product.reviewCount})</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-brand-amberDark">
            {product.categoryName}
          </span>
          <h3 className="text-lg sm:text-xl font-black text-brand-charcoal group-hover:text-brand-red transition-colors font-heading leading-snug mt-1">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-brand-slate line-clamp-2 mt-2 leading-relaxed font-medium">
            {product.description}
          </p>
        </div>

        {/* Bottom Price & Action Buttons */}
        <div className="pt-4 border-t border-brand-border flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-brand-slate uppercase block font-bold">Price</span>
            <span className="text-2xl font-black text-brand-charcoal tracking-tight font-heading">
              ${product.basePrice.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {(product.categoryId === 'smash-burgers' || product.categoryId === 'crispy-chicken') && (
              <button
                onClick={onCustomize}
                title="Customize Bun, Patties, Cheese & Sauces"
                className="p-2.5 rounded-xl bg-brand-bg border border-brand-border hover:border-brand-red hover:bg-white text-brand-charcoal transition-all shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4 text-brand-red" />
              </button>
            )}

            <button
              onClick={onQuickAdd}
              className="px-5 py-2.5 rounded-xl bg-brand-red hover:bg-brand-redDark active:scale-95 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-red-glow transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
