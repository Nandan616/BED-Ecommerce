require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/db');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecom_phase1';

const productData = [
  // Electronics
  { title: 'Wireless Headphones', category: 'electronics', price: 79.99, description: 'Premium sound quality with noise cancellation' },
  { title: 'USB-C Cable', category: 'electronics', price: 12.99, description: 'High-speed data transfer cable' },
  { title: 'Smart Watch', category: 'electronics', price: 199.99, description: 'Track your fitness and stay connected' },
  { title: 'Portable SSD', category: 'electronics', price: 149.99, description: '1TB portable solid state drive' },
  { title: 'Phone Stand', category: 'electronics', price: 15.99, description: 'Adjustable phone stand for any device' },
  { title: '4K Webcam', category: 'electronics', price: 89.99, description: 'Crystal clear video for meetings' },
  { title: 'Wireless Mouse', category: 'electronics', price: 34.99, description: 'Silent clicking with precision' },
  { title: 'USB Hub', category: 'electronics', price: 25.99, description: '7-port USB 3.0 hub' },
  { title: 'Phone Case', category: 'electronics', price: 19.99, description: 'Protective case with style' },
  { title: 'Screen Protector', category: 'electronics', price: 9.99, description: 'Tempered glass screen protector' },
  { title: 'Laptop Stand', category: 'electronics', price: 44.99, description: 'Ergonomic aluminum laptop stand' },
  { title: 'External Hard Drive', category: 'electronics', price: 99.99, description: '2TB external storage' },
  { title: 'Mechanical Keyboard', category: 'electronics', price: 129.99, description: 'RGB mechanical gaming keyboard' },
  { title: 'Monitor Arm', category: 'electronics', price: 59.99, description: 'Adjustable monitor mount' },
  { title: 'Power Bank', category: 'electronics', price: 39.99, description: '20000mAh fast charging power bank' },

  // Fashion
  { title: 'Cotton T-Shirt', category: 'fashion', price: 29.99, description: '100% organic cotton comfortable fit' },
  { title: 'Denim Jeans', category: 'fashion', price: 69.99, description: 'Classic blue denim jeans' },
  { title: 'Winter Jacket', category: 'fashion', price: 149.99, description: 'Warm waterproof winter jacket' },
  { title: 'Summer Dress', category: 'fashion', price: 54.99, description: 'Light and breezy summer dress' },
  { title: 'Sneakers', category: 'fashion', price: 89.99, description: 'Comfortable athletic sneakers' },
  { title: 'Formal Shoes', category: 'fashion', price: 129.99, description: 'Elegant leather formal shoes' },
  { title: 'Sports Leggings', category: 'fashion', price: 44.99, description: 'High-waisted yoga leggings' },
  { title: 'Hoodie', category: 'fashion', price: 59.99, description: 'Cozy pullover hoodie' },
  { title: 'Silk Scarf', category: 'fashion', price: 34.99, description: 'Premium silk neck scarf' },
  { title: 'Baseball Cap', category: 'fashion', price: 24.99, description: 'Classic cotton baseball cap' },
  { title: 'Sunglasses', category: 'fashion', price: 99.99, description: 'UV protection sunglasses' },
  { title: 'Wool Sweater', category: 'fashion', price: 79.99, description: 'Warm wool knit sweater' },
  { title: 'Athletic Shorts', category: 'fashion', price: 39.99, description: 'Quick-dry athletic shorts' },
  { title: 'Leather Belt', category: 'fashion', price: 44.99, description: 'Genuine leather belt' },
  { title: 'Cargo Pants', category: 'fashion', price: 69.99, description: 'Durable cargo work pants' },

  // Books
  { title: 'Clean Code', category: 'books', price: 39.99, description: 'A Handbook of Agile Software Craftsmanship' },
  { title: 'Atomic Habits', category: 'books', price: 25.99, description: 'Build better habits in 2023' },
  { title: 'The Pragmatic Programmer', category: 'books', price: 49.99, description: 'Your Journey to Mastery' },
  { title: 'Design Patterns', category: 'books', price: 54.99, description: 'Elements of Reusable Object-Oriented Software' },
  { title: 'Sapiens', category: 'books', price: 28.99, description: 'A Brief History of Humankind' },
  { title: 'Thinking Fast and Slow', category: 'books', price: 32.99, description: 'Nobel Prize-winning insight' },
  { title: 'The Art of Computer Programming', category: 'books', price: 199.99, description: 'Fundamental Algorithms' },
  { title: 'Educated', category: 'books', price: 26.99, description: 'A Memoir by Tara Westover' },
  { title: 'Cryptonomicon', category: 'books', price: 34.99, description: 'A cryptography thriller' },
  { title: 'The Selfish Gene', category: 'books', price: 22.99, description: 'A gene-centered view of life' },
  { title: 'Introduction to Algorithms', category: 'books', price: 129.99, description: 'CLRS Algorithm book' },
  { title: 'You Don\'t Know JS', category: 'books', price: 29.99, description: 'JavaScript deep dive' },
  { title: 'The Mythical Man-Month', category: 'books', price: 35.99, description: 'Essays on Software Engineering' },
  { title: 'Refactoring', category: 'books', price: 44.99, description: 'Improving the Design of Existing Code' },
  { title: 'Eloquent JavaScript', category: 'books', price: 39.99, description: 'A Modern Introduction to Programming' },

  // Home
  { title: 'Coffee Maker', category: 'home', price: 79.99, description: 'Programmable drip coffee maker' },
  { title: 'Desk Lamp', category: 'home', price: 44.99, description: 'LED desk lamp with USB charging' },
  { title: 'Bed Sheets', category: 'home', price: 49.99, description: '1000 thread count cotton sheets' },
  { title: 'Pillow Set', category: 'home', price: 59.99, description: 'Set of 2 memory foam pillows' },
  { title: 'Kitchen Knife Set', category: 'home', price: 89.99, description: '8-piece stainless steel knife set' },
  { title: 'Cutting Board', category: 'home', price: 24.99, description: 'Bamboo cutting board' },
  { title: 'Towel Set', category: 'home', price: 34.99, description: 'Set of 4 Egyptian cotton towels' },
  { title: 'Bath Rug', category: 'home', price: 29.99, description: 'Non-slip bathroom mat' },
  { title: 'Picture Frame', category: 'home', price: 19.99, description: '8x10 wooden frame' },
  { title: 'Wall Clock', category: 'home', price: 34.99, description: 'Modern minimalist wall clock' },
  { title: 'Throw Blanket', category: 'home', price: 44.99, description: 'Cozy fleece throw blanket' },
  { title: 'Door Mat', category: 'home', price: 22.99, description: 'Welcome rubber door mat' },
  { title: 'Storage Organizer', category: 'home', price: 39.99, description: '3-tier storage shelves' },
  { title: 'Lamp Shade', category: 'home', price: 29.99, description: 'White linen lamp shade' },
  { title: 'Dining Table', category: 'home', price: 399.99, description: 'Wooden 6-seater dining table' },

  // Beauty
  { title: 'Face Moisturizer', category: 'beauty', price: 34.99, description: 'Hydrating daily moisturizer' },
  { title: 'Sunscreen SPF 50', category: 'beauty', price: 24.99, description: 'Broad spectrum UV protection' },
  { title: 'Face Wash', category: 'beauty', price: 19.99, description: 'Gentle cleanser for all skin types' },
  { title: 'Night Cream', category: 'beauty', price: 44.99, description: 'Anti-aging night cream' },
  { title: 'Serum', category: 'beauty', price: 54.99, description: 'Vitamin C brightening serum' },
  { title: 'Face Mask', category: 'beauty', price: 29.99, description: 'Deep cleansing clay mask' },
  { title: 'Lip Balm', category: 'beauty', price: 12.99, description: 'Moisturizing lip balm' },
  { title: 'Concealer', category: 'beauty', price: 22.99, description: 'Full coverage concealer' },
  { title: 'Foundation', category: 'beauty', price: 39.99, description: 'Liquid foundation with SPF' },
  { title: 'Mascara', category: 'beauty', price: 19.99, description: 'Waterproof lengthening mascara' },
  { title: 'Lipstick', category: 'beauty', price: 16.99, description: 'Long-wear lipstick' },
  { title: 'Eye Shadow Palette', category: 'beauty', price: 34.99, description: '12-color eye shadow palette' },
  { title: 'Eyebrow Pencil', category: 'beauty', price: 12.99, description: 'Precise brow pencil' },
  { title: 'Body Lotion', category: 'beauty', price: 24.99, description: 'Moisturizing body lotion' },
  { title: 'Hair Mask', category: 'beauty', price: 29.99, description: 'Deep conditioning hair mask' },

  // Toys
  { title: 'LEGO Set', category: 'toys', price: 79.99, description: '1000-piece LEGO building set' },
  { title: 'Action Figure', category: 'toys', price: 24.99, description: 'Collectible superhero figure' },
  { title: 'Board Game', category: 'toys', price: 34.99, description: 'Strategy board game for families' },
  { title: 'Puzzle', category: 'toys', price: 19.99, description: '500-piece jigsaw puzzle' },
  { title: 'Remote Control Car', category: 'toys', price: 49.99, description: 'Fast 2.4GHz RC car' },
  { title: 'Drone', category: 'toys', price: 199.99, description: '4K camera drone with 30min flight' },
  { title: 'Skateboard', category: 'toys', price: 69.99, description: 'Professional skateboard deck' },
  { title: 'Roller Skates', category: 'toys', price: 89.99, description: 'Adjustable roller skates' },
  { title: 'Bicycle Helmet', category: 'toys', price: 54.99, description: 'Safety certified helmet' },
  { title: 'Scooter', category: 'toys', price: 99.99, description: 'Electric kick scooter' },
  { title: 'Toy Robot', category: 'toys', price: 39.99, description: 'Interactive smart robot' },
  { title: 'Card Game', category: 'toys', price: 14.99, description: 'Trading card game starter deck' },
  { title: 'Model Airplane', category: 'toys', price: 44.99, description: 'Detailed scale model airplane' },
  { title: 'Building Blocks', category: 'toys', price: 29.99, description: 'Magnetic building blocks' },
  { title: 'Outdoor Tent', category: 'toys', price: 149.99, description: 'Kids play tent' }
];

(async () => {
  try {
    await connectDB(MONGO_URI);
    console.log('Seeding products...');
    await Product.deleteMany({});

    // Duplicate products to reach 90+
    const allProducts = [];
    productData.forEach(product => {
      for (let i = 0; i < 2; i++) {
        allProducts.push({
          ...product,
          title: `${product.title} ${i > 0 ? '- Variant ' + (i + 1) : ''}`,
          price: product.price + (Math.random() * 20 - 10),
          rating: Math.round((Math.random() * 2 + 3.5) * 10) / 10,
          reviews: Math.floor(Math.random() * 500),
          stock: Math.floor(Math.random() * 200 + 10),
          image: `https://picsum.photos/seed/${product.title.replace(/\s+/g, '')}/400/400`
        });
      }
    });

    await Product.insertMany(allProducts);
    console.log('✓ Inserted', allProducts.length, 'products');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding products:', err);
    process.exit(1);
  }
})();
