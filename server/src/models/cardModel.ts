import mongoose, { Schema, Document } from 'mongoose';

interface CardDocument extends Document {
  boardId: string;
  title: string;
  description: string;
  column: 'todo' | 'inProgress' | 'done';
}

const cardSchema = new Schema<CardDocument>({
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
    enum: ['todo', 'inProgress', 'done'],
    default: 'todo',
  },
});

const Card = mongoose.model<CardDocument>('Card', cardSchema);
export default Card;