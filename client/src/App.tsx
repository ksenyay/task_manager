import './styles/App.css';
import Column from './components/Column';
import Search from './components/Search';
import {  useEffect, useState } from 'react';
import type { Column as ColumnType, TaskCard } from './types';
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core';
import Card from './components/Card'; 
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './state/store';
import { fetchBoardById, fetchBoards, setCurrentBoard } from './state/boardSlice';
import { changeTaskColumn, fetchTasksById } from './state/tasksSlice';

const COLUMNS: ColumnType[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

function App() {

  // Tasks
  const [activeId, setActiveId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const currentBoard = useSelector((state: RootState) => state.boards.currentBoard);

  const tasks = useSelector((state: RootState) => {
      const allTasks = state.tasks.tasks;
      const boardId = state.boards.currentBoard?.id
      return boardId ? allTasks.filter((task) => task.boardId === boardId) : []
  });


  // Boards
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
      dispatch(fetchTasksById(currentBoard.id)); 
    }
  }, [currentBoard, dispatch]);


  // Handling events
  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskCard['column'];

    const taskToUpdate = tasks.find(task => task._id === taskId);

    if (taskToUpdate && taskToUpdate.column !== newStatus) {
      dispatch({
        type: 'tasks/updateLocalColumn',
        payload: { id: taskId, column: newStatus },
      });

      dispatch(changeTaskColumn({ id: taskId, column: newStatus }));
    }
  }

  const activeTask = tasks.find(task => task._id === activeId) ?? null;


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
              tasks={tasks.filter(task => task.column === item.id)}
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
