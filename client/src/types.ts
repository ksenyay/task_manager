export type TaskStatus = 'todo' | 'inProgress' | 'done';

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
  _id: string;     
  id: string;      
  name: string;
  columns: string[];
}

export interface TaskCard {
  _id: string;  
  boardId: string;
  title: string;
  description: string;
  column: 'todo' | 'inProgress' | 'done';
}