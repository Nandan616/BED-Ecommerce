const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, index: true },
  category: { type: String, required: true, index: true },
  image: { type: String },
  stock: { type: Number, default: 100 },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
