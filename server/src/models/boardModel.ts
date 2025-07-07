import mongoose, { Schema, Document } from 'mongoose';

interface BoardDocument extends Document {
  id: string;
  name: string;
  columns: string[];
}

const boardSchema = new Schema<BoardDocument>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  columns: {
    type: [String],
    default: ['To Do', 'In Progress', 'Done'],
  },
});

const BoardModel = mongoose.model<BoardDocument>('Boards', boardSchema);
export default BoardModel;
