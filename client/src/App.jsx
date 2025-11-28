import React, { useEffect, useState } from 'react';
import { fetchProducts } from './services/api';
import ProductCard from './components/ProductCard';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';

export default function App() {
  const [productsData, setProductsData] = useState({ products: [], page: 1, totalPages: 1, total: 0, limit: 20 });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ page: 1, limit: 20, category: 'all', priceMin: undefined, priceMax: undefined, q: '', sort: 'newest' });
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch products
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchProducts(filters)
      .then(data => {
        if (!mounted || !data) return;
        setProductsData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
    return () => (mounted = false);
  }, [filters]);

  // Handle add to cart
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item._id === product._id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item._id === product._id
          ? { ...item, quantity: (item.quantity || 1) + (product.quantity || 1) }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: product.quantity || 1 }]);
    }
    setIsCartOpen(true);
  };

  // Handle remove from cart
  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item._id !== productId));
  };

  // Handle update quantity
  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item._id === productId ? { ...item, quantity } : item
      ));
    }
  };

  // Handle product search
  const handleSearch = (query) => {
    setFilters(f => ({ ...f, q: query, page: 1 }));
  };

  // If viewing product detail
  if (selectedProductId) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header cartCount={cartItems.length} onSearch={handleSearch} onCartClick={() => setIsCartOpen(true)} />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
          <ProductDetail
            productId={selectedProductId}
            onBack={() => setSelectedProductId(null)}
            onAddToCart={handleAddToCart}
          />
        </main>
        <Footer />
        {isCartOpen && (
          <Cart
            items={cartItems}
            onClose={() => setIsCartOpen(false)}
            onRemove={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header cartCount={cartItems.length} onSearch={handleSearch} onCartClick={() => setIsCartOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Welcome to EcomFlow
          </h1>
          <p className="text-gray-600 text-lg">
            Discover amazing products from various categories. Showing {productsData.total} items
          </p>
        </div>

        {/* Filters */}
        <Filters filters={filters} setFilters={setFilters} />

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600 font-semibold">Loading products...</p>
            </div>
          </div>
        ) : productsData.products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 font-semibold text-lg">No products found</p>
            <button
              onClick={() => setFilters({ page: 1, limit: 20, category: 'all', priceMin: undefined, priceMax: undefined, q: '', sort: 'newest' })}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {productsData.products.map(p => (
                <ProductCard
                  key={p._id}
                  p={p}
                  onAddToCart={handleAddToCart}
                  onViewDetails={setSelectedProductId}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              page={productsData.page}
              totalPages={productsData.totalPages}
              setPage={(p) => setFilters(f => ({ ...f, page: p }))}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Sidebar */}
      {isCartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}
    </div>
  );
}

