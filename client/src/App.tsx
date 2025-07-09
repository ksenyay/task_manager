import './styles/App.css';
import Column from './components/Column';
import Search from './components/Search';
import {  useEffect, useState } from 'react';
import type { Task, Column as ColumnType } from './types';
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core';
import Card from './components/Card'; 
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './state/store';
import { fetchBoardById, fetchBoards, setCurrentBoard } from './state/boardSlice';

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
  const dispatch = useDispatch<AppDispatch>();
  const currentBoard = useSelector((state: RootState) => state.boards.currentBoard);

  useEffect(() => {
    const savedId = localStorage.getItem('defaultBoardId');

    if (savedId) {
      dispatch(fetchBoardById(savedId));
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(fetchBoards()).then((res: any) => {
        const allBoards = res.payload;
        if (allBoards?.length > 0) {
          const defaultBoard = allBoards[0];
          dispatch(setCurrentBoard(defaultBoard));
        }
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (currentBoard) {
      localStorage.setItem('defaultBoardId', currentBoard.id);
    }
  }, [currentBoard]);

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
          <h1>{currentBoard?.name || 'Please load a board'}</h1>
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
