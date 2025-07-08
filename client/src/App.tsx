import './styles/App.css';
import Column from './components/Column';
import Search from './components/Search';
import {  useState } from 'react';
import type { Task, Column as ColumnType } from './types';
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core';
import Card from './components/Card'; 
/*import type { RootState, AppDispatch } from './state/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards } from './state/boards/boardSlice';*/

const COLUMNS: ColumnType[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Research Project', description: 'Gather requirements and create initial documentation', status: 'todo' },
  { id: '2', title: 'Design System', description: 'Create component library and design tokens', status: 'todo' },
  { id: '3', title: 'API Integration', description: 'Implement REST API endpoints', status: 'inprogress' },
  { id: '4', title: 'Testing', description: 'Write unit tests for core functionality', status: 'done' },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeId, setActiveId] = useState<string | null>(null);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];

    setTasks(tasks =>
      tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }

  const activeTask = tasks.find(task => task.id === activeId) ?? null;

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="gridContainer">
        <div className="heading">
          <h1>Daily Tasks</h1>
        </div>
        <div className="search"><Search /></div>

        {COLUMNS.map(item => (
          <div className={item.id} key={item.id}>
            <Column
              column={item}
              tasks={tasks.filter(task => task.status === item.id)}
            />
          </div>
        ))}
      </div>

      <DragOverlay>
        {activeTask ? <Card task={activeTask} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
