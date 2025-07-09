import type { TaskCard } from '../types';

const BASE_URL = 'https://task-manager-kfnk.onrender.com/api/cards';

export async function createTask(task: {boardId: string, title: string, description: string, column: string}): Promise<TaskCard> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if(!res.ok) throw new Error('Failed to create task');
  return await res.json();
}

export async function getTasksByBoard(boardId: string): Promise<TaskCard[]> {
  const res = await fetch(`${BASE_URL}/board/${boardId}`);
  if(!res.ok) throw new Error('Failed to fetch tasks');
  return await res.json();
}

export async function deleteTask(taskId:string): Promise<TaskCard> {
  const res = await fetch(`${BASE_URL}/${taskId}`, {
    method: 'DELETE',
  });
  if(!res.ok) throw new Error('Failed to delete task');
  return await res.json();
}

export async function editTask(taskId: string, update: Partial<TaskCard>): Promise<TaskCard> {
  const res = await fetch(`${BASE_URL}/${taskId}`, {
    method:'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update),
  });
  if(!res.ok) throw new Error('Failed to edit task');
  return await res.json();
}

export async function changeColumn(id: string, column: string): Promise<TaskCard> {
  const res = await fetch(`${BASE_URL}/${id}/move`, {
    method:'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({column}),
  });
  if(!res.ok) throw new Error('Failed to edit task');
  return await res.json();
}