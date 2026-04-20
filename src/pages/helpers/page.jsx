import { useState, useEffect, useMemo } from 'react';
import AppNavbar from '@/components/feature/AppNavbar';
import FiltersSidebar from './components/FiltersSidebar';
import HelperCard from './components/HelperCard';
import helperService from '@/api/helperService';

const DEFAULT_FILTERS = {
  category: 'All Categories',
  minRating: 0,
  priceMin: 0,
  priceMax: Infinity,
  availableOnly: false,
  verifiedOnly: false,
  sortBy: 'match',
};

export default function HelpersPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [view, setView] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [helpers, setHelpers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch helpers from API
  useEffect(() => {
    const fetchHelpers = async () => {
      setLoading(true);
      setError('');
      try {
        const params = {};
        if (search.trim()) params.search = search.trim();
        if (filters.category !== 'All Categories') params.category = filters.category;
        if (filters.minRating > 0) params.minRating = filters.minRating;
        if (filters.priceMin > 0) params.minPrice = filters.priceMin;
        if (filters.priceMax < Infinity) params.maxPrice = filters.priceMax;
        if (filters.availableOnly) params.availableOnly = true;
        if (filters.verifiedOnly) params.verifiedOnly = true;
        if (filters.sortBy !== 'match') params.sortBy = filters.sortBy;
        params.pageSize = 50;

        const data = await helperService.getHelpers(params);
        setHelpers(data?.items || data || []);
      } catch (err) {
        setError(err.message || 'Failed to load helpers');
        setHelpers([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchHelpers, 300);
    return () => clearTimeout(debounce);
  }, [search, filters]);

  // Client-side sort as fallback
  const filtered = useMemo(() => {
    let result = [...helpers];
    switch (filters.sortBy) {
      case 'rating':
        result.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      case 'reviews':
        result.sort((a, b) => (b.totalReviewsCount || 0) - (a.totalReviewsCount || 0));
        break;
      case 'price_asc':
        result.sort((a, b) => (a.hourlyRate || 0) - (b.hourlyRate || 0));
        break;
      case 'price_desc':
        result.sort((a, b) => (b.hourlyRate || 0) - (a.hourlyRate || 0));
        break;
      default:
        break;
    }
    return result;
  }, [helpers, filters.sortBy]);
  const activeFilterCount = [
    filters.category !== 'All Categories',
    filters.minRating > 0,
    filters.priceMin > 0 || filters.priceMax < Infinity,
    filters.availableOnly,
    filters.verifiedOnly,
  ].filter(Boolean).length;
  return (
    <div className="min-h-screen bg-[#fafafa]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <AppNavbar />
      <div className="bg-[#1a1a2e] py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            Browse Helpers
          </h1>
          <p className="text-white/60 text-sm mb-6">
            Find skilled professionals across 10+ categories. Verified, rated, and ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="flex-1 flex items-center bg-white rounded-lg px-4 gap-3">
              <div className="w-5 h-5 flex items-center justify-center text-gray-400 shrink-0">
                <i className="ri-search-line text-base"></i>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, skill, or category..."
                className="flex-1 py-3 text-sm text-gray-800 bg-transparent outline-none placeholder-gray-400"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer shrink-0"
                >
                  <i className="ri-close-line text-base"></i>
                </button>
              )}
            </div>
            <button className="px-6 py-3 bg-[#e94560] text-white text-sm font-bold rounded-lg hover:bg-[#c73652] transition-colors whitespace-nowrap cursor-pointer">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white border-b border-gray-100 px-6 py-3 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-2 flex-nowrap">
          {['All Categories', 'Web Development', 'UI/UX Design', 'Mobile Development', 'Content Writing', 'Digital Marketing', 'Video Editing', 'Translation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters({ ...filters, category: cat })}
              className={`text-xs px-4 py-1.5 rounded-full border whitespace-nowrap transition-all cursor-pointer font-medium ${
                filters.category === cat
                  ? 'bg-[#e94560] border-[#e94560] text-white'
                  : 'border-gray-200 text-gray-600 hover:border-[#e94560] hover:text-[#e94560]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block">
            <FiltersSidebar
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(DEFAULT_FILTERS)}
              resultCount={filtered.length}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-[#e94560] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-equalizer-2-line text-sm"></i>
                  </div>
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 flex items-center justify-center bg-[#e94560] text-white text-xs rounded-full font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <p className="text-sm text-gray-500">
                  <span className="font-bold text-[#1a1a2e]">{filtered.length}</span> helpers found
                  {search && <span className="ml-1">for "<span className="text-[#e94560]">{search}</span>"</span>}
                </p>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView('grid')}
                  className={`w-8 h-7 flex items-center justify-center rounded-md transition-all cursor-pointer ${view === 'grid' ? 'bg-white shadow-sm text-[#e94560]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <i className="ri-grid-fill text-sm"></i>
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`w-8 h-7 flex items-center justify-center rounded-md transition-all cursor-pointer ${view === 'list' ? 'bg-white shadow-sm text-[#e94560]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <i className="ri-list-check text-sm"></i>
                </button>
              </div>
            </div>
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.category !== 'All Categories' && (
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1 bg-[#e94560]/10 text-[#e94560] rounded-full font-medium">
                    {filters.category}
                    <button onClick={() => setFilters({ ...filters, category: 'All Categories' })} className="cursor-pointer">
                      <i className="ri-close-line text-xs"></i>
                    </button>
                  </span>
                )}
                {filters.minRating > 0 && (
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1 bg-[#e94560]/10 text-[#e94560] rounded-full font-medium">
                    {filters.minRating}+ stars
                    <button onClick={() => setFilters({ ...filters, minRating: 0 })} className="cursor-pointer">
                      <i className="ri-close-line text-xs"></i>
                    </button>
                  </span>
                )}
                {filters.availableOnly && (
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1 bg-[#e94560]/10 text-[#e94560] rounded-full font-medium">
                    Available Now
                    <button onClick={() => setFilters({ ...filters, availableOnly: false })} className="cursor-pointer">
                      <i className="ri-close-line text-xs"></i>
                    </button>
                  </span>
                )}
                {filters.verifiedOnly && (
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1 bg-[#e94560]/10 text-[#e94560] rounded-full font-medium">
                    Verified Only
                    <button onClick={() => setFilters({ ...filters, verifiedOnly: false })} className="cursor-pointer">
                      <i className="ri-close-line text-xs"></i>
                    </button>
                  </span>
                )}
              </div>
            )}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                  <i className="ri-search-line text-2xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">No helpers found</h3>
                <p className="text-gray-500 text-sm mb-4">Try adjusting your filters or search terms.</p>
                <button
                  onClick={() => { setFilters(DEFAULT_FILTERS); setSearch(''); }}
                  className="px-4 py-2 bg-[#e94560] text-white text-sm font-semibold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className={view === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'
                : 'flex flex-col gap-3'
              }>
                {filtered.map((helper) => (
                  <HelperCard key={helper.id} helper={helper} view={view} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileFilters(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="font-bold text-[#1a1a2e]">Filters</span>
              <button onClick={() => setShowMobileFilters(false)} className="w-8 h-8 flex items-center justify-center text-gray-500 cursor-pointer">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="p-4">
              <FiltersSidebar
                filters={filters}
                onChange={setFilters}
                onReset={() => { setFilters(DEFAULT_FILTERS); setShowMobileFilters(false); }}
                resultCount={filtered.length}
              />
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-3 bg-[#e94560] text-white text-sm font-bold rounded-lg cursor-pointer whitespace-nowrap"
              >
                Show {filtered.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}