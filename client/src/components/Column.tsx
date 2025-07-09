import { useState } from 'react';
import styles from './Column.module.css';
import Card from './Card';
import AddTask from './forms/AddTask';

import { useDroppable } from '@dnd-kit/core';
import type { Column as ColumnType, TaskCard } from '../types';
import { useSelector } from 'react-redux';
import type { RootState } from '../state/store';

type ColumnProps = {
  column: ColumnType;
  tasks: TaskCard[];
};

export function Column({ column, tasks }: ColumnProps) {
  const [showDialog, setShowDialog] = useState(false);
  const handleOpen = () => setShowDialog(true);
  const handleClose = () => setShowDialog(false);

  const { setNodeRef } = useDroppable({ id: column.id });

  const boardSelected = useSelector((state: RootState) => !!state.boards.currentBoard);

  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <h2>{column.title}</h2>
      </div>
      <div className={styles.cardScroll}>
        <div ref={setNodeRef} className={styles.cardContainer}>
          {tasks.map(task => (
            <Card key={task._id} task={task} />
          ))}
          <div>
            {boardSelected && (
              <button className={styles.addButton} onClick={handleOpen}>+</button>
            )}
          </div>
          {showDialog && <AddTask handleClose={handleClose} columnId={column.id} />}
        </div>
      </div>
    </div>
  );
}

export default Column;
