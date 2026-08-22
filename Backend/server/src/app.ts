import express from 'express';
import cors from 'cors';
import tripRoutes from './routes/trip.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Thin router mounting
app.use('/api/trips', tripRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;