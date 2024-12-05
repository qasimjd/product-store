import express from 'express';
import cors from 'cors'; // Import cors
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json()); // Fix: Correctly use express.json()
const port = process.env.PORT;

const __dirname = path.resolve();

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
}));

// Connect to the database before starting the server
connectDB();

// Mount product routes 
app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/Frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
}
// Start the server
app.listen(port, () => {
  console.log(`Example app listening on https://localhost:${port}`);
});
