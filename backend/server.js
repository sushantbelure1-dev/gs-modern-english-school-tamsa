import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDB, getDbStatus } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import classRoutes from './routes/classRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import contentRoutes from './routes/contentRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded media statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Also serve public school photos and videos
app.use('/school-photos', express.static(path.join(__dirname, 'uploads', 'photos')));
app.use('/school-videos', express.static(path.join(__dirname, 'uploads', 'videos')));

// Ensure DB is initialized once (supports both local & Vercel serverless)
let dbInitPromise = null;
const ensureDbInitialized = () => {
  if (!dbInitPromise) {
    dbInitPromise = initDB();
  }
  return dbInitPromise;
};

app.use(async (req, res, next) => {
  await ensureDbInitialized();
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/content', contentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    school: 'G S Modern English School Tamsa',
    timestamp: new Date().toISOString(),
    db: getDbStatus()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('🏫 G S Modern English School Tamsa - Backend REST API is running.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server & initialize DB (local mode)
if (!process.env.VERCEL) {
  const startServer = async () => {
    await ensureDbInitialized();
    app.listen(PORT, () => {
      console.log(`🚀 G S Modern School Backend running at: http://localhost:${PORT}`);
      console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    });
  };

  startServer();
}

export default app;
