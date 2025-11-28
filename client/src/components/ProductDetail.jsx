import React, { useState, useEffect } from 'react';
import { fetchProductById } from '../services/api';
import { ShoppingCart, Heart, ArrowLeft, Star, Truck, RotateCcw } from 'lucide-react';

export default function ProductDetail({ productId, onBack, onAddToCart }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchProductById(productId)
      .then(data => {
        if (mounted && data) setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
    return () => (mounted = false);
  }, [productId]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600">Product not found</p>
        <button
          onClick={onBack}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({ ...product, quantity });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition"
      >
        <ArrowLeft size={20} />
        <span>Back to Products</span>
      </button>

      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
          {/* Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-6">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-96 object-contain"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x400?text=Product';
              }}
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            {/* Category & Title */}
            <div>
              <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded mb-4 capitalize font-semibold">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-lg mb-6">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-semibold">
                    ✓ {product.stock} in stock
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">Out of stock</span>
                )}
              </div>
            </div>

            {/* Price & Actions */}
            <div>
              {/* Price */}
              <div className="mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  ₹{product.price.toFixed(2)}
                </div>
                <p className="text-gray-600">Inclusive of all taxes</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold w-10 h-10 rounded-lg transition"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:border-blue-600"
                    min="1"
                    max={product.stock}
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold w-10 h-10 rounded-lg transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold px-6 py-3 rounded-lg transition"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex items-center justify-center gap-2 border-2 font-bold px-6 py-3 rounded-lg transition ${
                    isWishlisted
                      ? 'bg-red-50 border-red-600 text-red-600'
                      : 'border-gray-300 text-gray-700 hover:border-red-600'
                  }`}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                  <span>Wishlist</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="border-t bg-gray-50 p-6 md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery & Returns</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <Truck size={32} className="text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Free Delivery</h3>
                <p className="text-gray-600 text-sm">On orders over ₹499</p>
              </div>
            </div>
            <div className="flex gap-4">
              <RotateCcw size={32} className="text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Easy Returns</h3>
                <p className="text-gray-600 text-sm">30-day return policy</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Heart size={32} className="text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">100% Authentic</h3>
                <p className="text-gray-600 text-sm">All products verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
