require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productsRoute = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecom_phase1';

connectDB(MONGO_URI);

app.use('/api/products', productsRoute);

app.get('/', (req, res) => res.send('Ecom Phase1 API'));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
