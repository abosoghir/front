const categories = [
  'Development & IT',
  'Design & Creative',
  'Marketing & Sales',
  'Writing & Translation',
  'Admin Support',
  'Finance & Accounting',
];

const ratingOptions = [
  { label: 'Any rating', value: 0 },
  { label: '4.5 & up', value: 4.5 },
  { label: '4.0 & up', value: 4.0 },
  { label: '3.0 & up', value: 3.0 },
];

const priceRanges = [
  { label: 'Any price', min: 0, max: Infinity },
  { label: 'Under $20/hr', min: 0, max: 20 },
  { label: '$20 - $50/hr', min: 20, max: 50 },
  { label: '$50 & above', min: 50, max: Infinity },
];

export default function FiltersSidebar({ filters, onChange, onReset, resultCount }) {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-equalizer-2-line text-[#1a1a2e] text-base"></i>
            </div>
            <span className="text-sm font-bold text-[#1a1a2e]">Filters</span>
          </div>
          <button
            onClick={onReset}
            className="text-xs text-[#e94560] font-medium hover:underline cursor-pointer whitespace-nowrap"
          >
            Reset all
          </button>
        </div>
        <div className="p-5 space-y-6">
          <p className="text-xs text-gray-400">
            <span className="font-bold text-[#1a1a2e]">{resultCount}</span> helpers found
          </p>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Sort By</p>
            <div className="space-y-1.5">
              {[
                { label: 'Best Match', value: 'match' },
                { label: 'Highest Rated', value: 'rating' },
                { label: 'Most Reviews', value: 'reviews' },
                { label: 'Lowest Price', value: 'price_asc' },
                { label: 'Highest Price', value: 'price_desc' },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="sortBy"
                    value={opt.value}
                    checked={filters.sortBy === opt.value}
                    onChange={() => onChange({ ...filters, sortBy: opt.value })}
                    className="accent-[#e94560] cursor-pointer"
                  />
                  <span className={`text-sm transition-colors ${filters.sortBy === opt.value ? 'text-[#e94560] font-medium' : 'text-gray-600 group-hover:text-[#1a1a2e]'}`}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Category</p>
            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={filters.category === cat}
                    onChange={() => onChange({ ...filters, category: cat })}
                    className="accent-[#e94560] cursor-pointer"
                  />
                  <span className={`text-sm transition-colors ${filters.category === cat ? 'text-[#e94560] font-medium' : 'text-gray-600 group-hover:text-[#1a1a2e]'}`}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Minimum Rating</p>
            <div className="space-y-1.5">
              {ratingOptions.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="rating"
                    value={opt.value}
                    checked={filters.minRating === opt.value}
                    onChange={() => onChange({ ...filters, minRating: opt.value })}
                    className="accent-[#e94560] cursor-pointer"
                  />
                  <span className={`text-sm flex items-center gap-1 transition-colors ${filters.minRating === opt.value ? 'text-[#e94560] font-medium' : 'text-gray-600 group-hover:text-[#1a1a2e]'}`}>
                    {opt.value > 0 && (
                      <div className="w-3.5 h-3.5 flex items-center justify-center">
                        <i className="ri-star-fill text-yellow-400 text-xs"></i>
                      </div>
                    )}
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Hourly Rate</p>
            <div className="space-y-1.5">
              {priceRanges.map((range) => (
                <label key={range.label} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="price"
                    checked={filters.priceMin === range.min && filters.priceMax === range.max}
                    onChange={() => onChange({ ...filters, priceMin: range.min, priceMax: range.max })}
                    className="accent-[#e94560] cursor-pointer"
                  />
                  <span className={`text-sm transition-colors ${filters.priceMin === range.min && filters.priceMax === range.max ? 'text-[#e94560] font-medium' : 'text-gray-600 group-hover:text-[#1a1a2e]'}`}>
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3 pt-1 border-t border-gray-100">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700 font-medium">Available Now</span>
              <div
                onClick={() => onChange({ ...filters, availableOnly: !filters.availableOnly })}
                className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${filters.availableOnly ? 'bg-[#e94560]' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${filters.availableOnly ? 'left-5' : 'left-0.5'}`}></div>
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700 font-medium">Verified Only</span>
              <div
                onClick={() => onChange({ ...filters, verifiedOnly: !filters.verifiedOnly })}
                className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${filters.verifiedOnly ? 'bg-[#e94560]' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${filters.verifiedOnly ? 'left-5' : 'left-0.5'}`}></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}