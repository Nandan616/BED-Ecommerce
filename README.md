# EcomFlow - Full Stack E-Commerce Application (Phase 1)

A complete full-stack e-commerce application built with React, Node.js, Express, and MongoDB. Features product browsing, filtering, pagination, shopping cart, and product details.

## 🎯 Features

### Frontend (React + Vite + Tailwind CSS)
- ✨ Modern, responsive UI design
- 🛍️ Product listing with 20 products per page
- 🔍 Advanced filtering by category, price range, and search
- 📄 Pagination with easy navigation
- 🛒 Shopping cart with add/remove/update functionality
- 📱 Product detail page with full information
- ⭐ Product ratings and reviews display
- 💾 Persistent cart using localStorage
- 📱 Fully mobile responsive

### Backend (Node.js + Express + MongoDB)
- 🚀 RESTful API endpoints
- 📊 MongoDB with Mongoose ODM
- 🔄 Filter and sort products by category, price, rating
- 📄 Pagination support (20 items per page)
- 🌾 180+ products pre-seeded in database
- 📦 Product model with rating and stock info

## 🏗️ Project Structure

```
fullstack_ecom_phase1/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/       # React Components
│   │   │   ├── Header.jsx    # Navigation header
│   │   │   ├── Footer.jsx    # Footer with links
│   │   │   ├── ProductCard.jsx  # Product card component
│   │   │   ├── ProductDetail.jsx # Product detail page
│   │   │   ├── Filters.jsx   # Filter sidebar
│   │   │   ├── Pagination.jsx # Pagination controls
│   │   │   └── Cart.jsx      # Shopping cart sidebar
│   │   ├── services/
│   │   │   └── api.js        # API calls
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                    # Node.js Backend
│   ├── models/
│   │   └── Product.js        # Mongoose Product model
│   ├── routes/
│   │   └── products.js       # Product API routes
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── seed/
│   │   └── seedProducts.js  # Database seeding script
│   ├── index.js             # Express server
│   ├── package.json
│   └── .env
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
# Add your MongoDB URI: MONGO_URI=mongodb://localhost:27017/ecom_phase1

# Seed the database with 180+ products
npm run seed

# Start development server
npm run dev

# Or start production server
npm start
```

The server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

The client runs on `http://localhost:5173`

## 📚 API Endpoints

### Get Products
```
GET /api/products?page=1&limit=20&category=electronics&priceMin=100&priceMax=1000&sort=newest
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `category` - Filter by category (e.g., electronics, fashion, books, home, beauty, toys)
- `priceMin` - Minimum price filter
- `priceMax` - Maximum price filter
- `q` - Search query
- `sort` - Sort option (newest, price-low, price-high, rating)

**Response:**
```json
{
  "page": 1,
  "limit": 20,
  "totalPages": 9,
  "total": 180,
  "products": [...]
}
```

### Get Categories
```
GET /api/products/categories/list
```

**Response:**
```json
{
  "categories": ["beauty", "books", "electronics", "fashion", "home", "toys"]
}
```

### Get Single Product
```
GET /api/products/:id
```

## 💻 Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server
- `npm run dev` - Start with nodemon
- `npm start` - Start server
- `npm run seed` - Seed database with sample products

## 🎨 Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Lucide React (Icons)
- Axios

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv

## 📋 Product Categories

- **Electronics**: Headphones, cables, watches, storage, etc.
- **Fashion**: T-shirts, jeans, jackets, shoes, etc.
- **Books**: Programming, self-help, fiction books
- **Home**: Furniture, kitchen items, bed sets
- **Beauty**: Skincare, makeup, wellness products
- **Toys**: Games, drones, sports equipment

## 🛒 Shopping Cart Features

- Add/remove products
- Update quantities
- Persistent storage (localStorage)
- Real-time cart count in header
- Cart sidebar with summary
- Free shipping over ₹499

## 🔄 Filtering & Sorting

- **Filter by Category**: All, Electronics, Fashion, Books, Home, Beauty, Toys
- **Price Range**: Set min and max price
- **Search**: Search by product name
- **Sort Options**: Newest, Price Low-High, Price High-Low, Top Rated

## 📱 Responsive Design

- Mobile-first approach
- Mobile menu for filters
- Responsive grid layout
- Touch-friendly buttons and controls
- Tablet and desktop optimized

## 🎯 Phase 1 Scope

✅ Product listing with pagination (20 per page)
✅ Category filtering
✅ Price range filtering
✅ Search functionality
✅ Shopping cart
✅ Product details page
✅ Responsive design
✅ 180+ pre-seeded products
✅ Professional UI/UX

## 🔮 Future Phases

- User authentication & profiles
- Checkout & payment integration
- Order history
- Product reviews & ratings
- Wishlist functionality
- Email notifications
- Admin dashboard
- Product recommendations

## 📝 Environment Variables

### Server (.env)
```
MONGO_URI=mongodb://localhost:27017/ecom_phase1
PORT=5000
```

### Client (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

This project is part of a learning initiative. Feel free to fork and enhance!

## 📄 License

MIT License - feel free to use this project for learning purposes.

## 👤 Author

Built with ❤️ for learning full-stack development.

---

**Happy Coding! 🚀**

