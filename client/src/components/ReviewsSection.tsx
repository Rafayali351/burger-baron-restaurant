import React, { useState } from 'react';
import {
  Star,
  CheckCircle,
  Plus,
  ThumbsUp,
  Award
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview, products } = useStore();

  const [formOpen, setFormOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [orderedItem, setOrderedItem] = useState(products[0]?.name || "The Baron's Grand Wagyu Smash");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;

    addReview({
      userName: userName.trim(),
      orderedItem,
      rating,
      comment: comment.trim(),
      verifiedBuyer: true,
    });

    setUserName('');
    setComment('');
    setFormOpen(false);
  };

  return (
    <section id="reviews" className="w-full py-16 bg-alabaster scroll-mt-20 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-crimson/10 border border-crimson/20 text-crimson text-xs font-black uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5 text-mustard" />
              <span>Patron Accolades</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal font-heading">
              GUEST <span className="text-crimson">PRAISES</span>
            </h2>
            <p className="text-charcoal-muted text-sm sm:text-base mt-2 max-w-xl font-medium">
              Real opinions from burger enthusiasts, food critics, and late-night cravers.
            </p>
          </div>

          {/* Overall Rating Score Card & Write Review Button */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-surface-border shadow-soft">
              <div className="text-3xl font-black text-charcoal font-heading">4.9</div>
              <div>
                <div className="flex items-center gap-1 text-mustard">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-mustard" />
                  ))}
                </div>
                <p className="text-[11px] text-charcoal-muted font-bold mt-0.5">Based on 2,420+ verified orders</p>
              </div>
            </div>

            <button
              onClick={() => setFormOpen(!formOpen)}
              className="px-6 py-3.5 rounded-2xl bg-crimson hover:bg-crimson-hover text-white font-black text-xs sm:text-sm transition-all flex items-center gap-2 shadow-crimson-glow active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Review Form Drawer */}
        {formOpen && (
          <div className="mb-10 p-6 bg-white rounded-3xl border border-surface-border shadow-soft-md animate-slideUp">
            <h3 className="text-lg font-black text-charcoal font-heading mb-4">
              Share Your Baron Dining Experience
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-charcoal font-bold block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam Parker"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-alabaster text-charcoal text-xs px-3.5 py-2.5 rounded-xl border border-surface-border focus:border-crimson focus:bg-white focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs text-charcoal font-bold block mb-1">Burger / Dish Enjoyed</label>
                  <select
                    value={orderedItem}
                    onChange={(e) => setOrderedItem(e.target.value)}
                    className="w-full bg-alabaster text-charcoal text-xs px-3.5 py-2.5 rounded-xl border border-surface-border focus:border-crimson focus:bg-white focus:outline-none cursor-pointer font-bold"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-charcoal font-bold block mb-1">Your Rating</label>
                  <div className="flex items-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="text-mustard hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'fill-mustard text-mustard' : 'text-surface-border'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-black text-mustard ml-1">{rating}.0 / 5</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs text-charcoal font-bold block mb-1">Review Commentary</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell others about the bun toast, patty crust, crispiness of the fries..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-alabaster text-charcoal text-xs p-3 rounded-xl border border-surface-border focus:border-crimson focus:bg-white focus:outline-none font-medium"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-alabaster text-charcoal text-xs font-bold hover:bg-surface-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-crimson hover:bg-crimson-hover text-white font-black text-xs shadow-crimson-glow"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews Grid - Crisp Pure White Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-5 border border-surface-border shadow-soft flex flex-col justify-between hover:shadow-soft-md transition-all hover:-translate-y-1"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    {rev.userAvatar ? (
                      <img
                        src={rev.userAvatar}
                        alt={rev.userName}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-crimson/10 flex items-center justify-center text-crimson font-black text-xs">
                        {rev.userName[0]}
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-black text-charcoal leading-none">{rev.userName}</h4>
                      <span className="text-[10px] text-charcoal-muted">{rev.date}</span>
                    </div>
                  </div>

                  {rev.verifiedBuyer && (
                    <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 font-black px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified
                    </span>
                  )}
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-mustard text-mustard' : 'text-surface-border'
                      }`}
                    />
                  ))}
                </div>

                {/* Dish tag */}
                <p className="text-[11px] font-black text-crimson mb-2">
                  Ordered: {rev.orderedItem}
                </p>

                {/* Comment */}
                <p className="text-xs text-charcoal-muted leading-relaxed italic font-medium">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-surface-border flex items-center justify-between text-[10px] text-charcoal-subtle font-bold">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3 text-mustard" /> Helpful Review
                </span>
                <span>The Baron Patron</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
