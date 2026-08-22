import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import tripRoutes from './routes/trip.routes';
import authRoutes from './routes/auth.routes';
import copilotRoutes from './routes/copilot.routes';

const app = express();

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

const allowedOrigins = [
  clientUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5000',
  'http://127.0.0.1:5000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // permissive in local dev
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Router mounting
app.use('/api/auth', authRoutes);
app.use('/api/copilot', copilotRoutes);
app.use('/api/trips', tripRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT} and http://127.0.0.1:${PORT}`);
});

export default app;