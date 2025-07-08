import mongoose, { Schema, Document } from 'mongoose';

interface CardDocument extends Document {
  id: string;
  boardId: string;
  title: string;
  description: string;
  column: 'To Do' | 'In Progress' | 'Done';
  position: number;
}

const cardSchema = new Schema<CardDocument>({
  id: { 
    type: String, 
    required: true, 
    unique: true 
    },
  boardId: { 
    type: String, 
    required: true 
    },
  title: { 
    type: String, 
    required: true 
    },
  description: { 
    type: String, 
    default: '' 
    },
  column: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  },
  position: { 
    type: Number, 
    required: true,
    default: 0
  },
});

const Card = mongoose.model<CardDocument>('Cards', cardSchema);
export default Card;