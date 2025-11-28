import React, { useState } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';

export default function ProductCard({ p, onAddToCart, onViewDetails }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart(p);
    }
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    if (onViewDetails) {
      onViewDetails(p._id);
    }
  };

  return (
    <div 
      onClick={handleViewDetails}
      className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col cursor-pointer group"
    >
      {/* Image Container */}
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=Product';
          }}
        />
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-red-50 transition"
        >
          <Heart
            size={20}
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>
        {/* Stock Badge */}
        {p.stock > 0 && p.stock <= 10 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            Only {p.stock} left
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category */}
        <span className="inline-block w-fit bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mb-2 capitalize">
          {p.category}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition">
          {p.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-1">
          {p.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(p.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({p.reviews})</span>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div className="flex-1">
            <div className="text-xl font-bold text-gray-900">₹{p.price.toFixed(2)}</div>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition flex items-center justify-center"
            title="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

