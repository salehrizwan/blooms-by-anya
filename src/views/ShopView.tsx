import React, { useMemo, useState } from 'react';
import { Filter, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COLLECTIONS_META, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CollectionId } from '../types';

export const ShopView: React.FC = () => {
  const { selectedCollection, setSelectedCollection, searchQuery, setSearchQuery } = useApp();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  // Filter products based on collection, subcategory, search
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Collection filter
      if (selectedCollection !== 'all' && product.collection !== selectedCollection) {
        return false;
      }
      // Subcategory filter
      if (selectedSubcategory !== 'all' && product.subcategory !== selectedSubcategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesSub = product.subcategoryName.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesSub) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      // Default: featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [selectedCollection, selectedSubcategory, searchQuery, sortBy]);

  // Active subcategories based on current collection
  const activeSubcategories = useMemo(() => {
    if (selectedCollection === 'all') {
      return [];
    }
    const currentMeta = COLLECTIONS_META.find((c) => c.id === selectedCollection);
    return currentMeta ? currentMeta.subcategories : [];
  }, [selectedCollection]);

  const handleCollectionChange = (colId: CollectionId | 'all') => {
    setSelectedCollection(colId);
    setSelectedSubcategory('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#788269] block mb-2">
          HANDMADE IN SIALKOT
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#303A2B] tracking-tight">
          Shop Our Collections
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#303A2B]/75">
          Fresh floral bouquets, curated DIY hampers, chocolates, and bespoke surprise setups.
        </p>
      </div>

      {/* Main 4 Collections Segmented Buttons Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => handleCollectionChange('all')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all cursor-pointer ${
            selectedCollection === 'all'
              ? 'bg-[#303A2B] text-white shadow-xs'
              : 'bg-[#F7F1E7] text-[#303A2B] hover:bg-[#D8C8A5]/40 border border-[#D8C8A5]/50'
          }`}
        >
          All Collections ({PRODUCTS.length})
        </button>

        {COLLECTIONS_META.map((col) => {
          const isActive = selectedCollection === col.id;
          const count = PRODUCTS.filter((p) => p.collection === col.id).length;
          return (
            <button
              key={col.id}
              type="button"
              onClick={() => handleCollectionChange(col.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#303A2B] text-white shadow-xs'
                  : 'bg-[#F7F1E7] text-[#303A2B] hover:bg-[#D8C8A5]/40 border border-[#D8C8A5]/50'
              }`}
            >
              {col.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Subcategory Pills inside selected collection */}
      {activeSubcategories.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8 pb-3 border-b border-[#D8C8A5]/30">
          <button
            type="button"
            onClick={() => setSelectedSubcategory('all')}
            className={`px-3 py-1 text-xs rounded-md transition-colors cursor-pointer ${
              selectedSubcategory === 'all'
                ? 'bg-[#788269] text-white font-medium'
                : 'text-[#303A2B]/70 hover:text-[#303A2B] hover:bg-[#F7F1E7]'
            }`}
          >
            All Subcategories
          </button>
          {activeSubcategories.map((sub) => (
            <button
              key={sub.id}
              type="button"
              onClick={() => setSelectedSubcategory(sub.id)}
              className={`px-3 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                selectedSubcategory === sub.id
                  ? 'bg-[#788269] text-white font-medium'
                  : 'text-[#303A2B]/70 hover:text-[#303A2B] hover:bg-[#F7F1E7]'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

      {/* Search and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8 p-3 bg-white rounded-xl border border-[#D8C8A5]/40 shadow-2xs">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#788269] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search flowers, hampers, chocolates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 bg-[#FBF8F1] border border-[#D8C8A5]/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#788269]"
          />
        </div>

        {/* Sort and Count */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 text-xs text-[#303A2B]">
          <span className="text-[#788269]">
            Showing <strong className="text-[#303A2B]">{filteredProducts.length}</strong> creations
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-[#788269] hidden md:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-[#FBF8F1] border border-[#D8C8A5]/50 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#788269] cursor-pointer"
            >
              <option value="featured">Featured / Bestsellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Cards Grid: Exactly 4 per row on Desktop, 2 per row on Mobile */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#D8C8A5]/40 p-8 space-y-3">
          <p className="text-sm text-[#303A2B] font-semibold">No products found matching your filter.</p>
          <p className="text-xs text-[#788269]">Try clearing your search query or switching collections.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCollection('all');
              setSelectedSubcategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-[#303A2B] text-white text-xs font-semibold rounded-md hover:bg-[#303A2B]/90 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
