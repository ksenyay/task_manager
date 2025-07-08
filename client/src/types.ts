export type TaskStatus = 'todo' | 'inprogress' | 'done';

export type Task = {
  id: string;
  status: TaskStatus;
  title: string;
  description: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
};

export interface Board {
  _id: string;     // MongoDB ID
  id: string;      // Your custom public ID
  name: string;
  columns: string[];
}