import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/api';
import { ChevronDown, RotateCcw } from 'lucide-react';

export default function Filters({ filters, setFilters }) {
  const [categories, setCategories] = useState(['all']);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchCategories().then(list => {
      if (mounted && list) setCategories(['all', ...list]);
    }).catch(() => { });
    return () => (mounted = false);
  }, []);

  const handleReset = () => {
    setFilters({
      page: 1,
      limit: 20,
      category: 'all',
      priceMin: undefined,
      priceMax: undefined,
      q: '',
      sort: 'newest'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      {/* Filter Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition md:hidden"
      >
        <h3 className="font-bold text-gray-800">Filters</h3>
        <ChevronDown size={20} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {/* Filter Content */}
      <div className={`${expanded ? 'block' : 'hidden'} md:block p-4 border-t md:border-t-0`}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={e => setFilters(f => ({ ...f, category: e.target.value, page: 1 }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white text-gray-700"
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Min Price Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Min Price</label>
            <input
              type="number"
              placeholder="0"
              value={filters.priceMin ?? ''}
              onChange={e => setFilters(f => ({ ...f, priceMin: e.target.value ? Number(e.target.value) : undefined, page: 1 }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              min="0"
            />
          </div>

          {/* Max Price Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price</label>
            <input
              type="number"
              placeholder="10000"
              value={filters.priceMax ?? ''}
              onChange={e => setFilters(f => ({ ...f, priceMax: e.target.value ? Number(e.target.value) : undefined, page: 1 }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              min="0"
            />
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
            <select
              value={filters.sort || 'newest'}
              onChange={e => setFilters(f => ({ ...f, sort: e.target.value, page: 1 }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white text-gray-700"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-lg transition"
            >
              <RotateCcw size={18} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
          <input
            type="text"
            placeholder="Search products..."
            value={filters.q ?? ''}
            onChange={e => setFilters(f => ({ ...f, q: e.target.value, page: 1 }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>
    </div>
  );
}

