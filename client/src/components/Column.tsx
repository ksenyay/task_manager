import { useState } from 'react';
import styles from './Column.module.css';
import Card from './Card';
import AddTask from './forms/AddTask';

import { useDroppable } from '@dnd-kit/core';
import type { Column as ColumnType, Task } from '../types';

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export function Column({ column, tasks }: ColumnProps) {
  const [showDialog, setShowDialog] = useState(false);
  const handleOpen = () => setShowDialog(true);
  const handleClose = () => setShowDialog(false);

  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <h2>{column.title}</h2>
      </div>
      <div className={styles.cardScroll}>
        <div ref={setNodeRef} className={styles.cardContainer}>
          {tasks.map(task => (
            <Card key={task.id} task={task} />
          ))}
          <div>
            <button className={styles.addButton} onClick={handleOpen}>+</button>
          </div>
          {showDialog && <AddTask handleClose={handleClose} />}
        </div>
      </div>
    </div>
  );
}

export default Column;
