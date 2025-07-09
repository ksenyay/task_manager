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
  column: 'To Do' | 'In Progress' | 'Done';
}