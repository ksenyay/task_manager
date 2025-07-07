import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import boardRoutes from './routes/boardRoutes';
import cardRoutes from './routes/cardRoutes';

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;
const MONGODB_URI: string = process.env.MONGODB_URI || '';

console.log('MONGODB_URI =', MONGODB_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/boards', boardRoutes);
app.use('/api/cards', cardRoutes);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('Database error:', err));