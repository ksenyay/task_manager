import { useState } from 'react';
import EditTask from './forms/EditTask';
import styles from './Card.module.css';

import type { Task } from '../types';
import { useDraggable } from '@dnd-kit/core';

type TaskCardProps = {
  task: Task;
  isOverlay?: boolean; 
};

function Card({ task, isOverlay = false }: TaskCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const handleOpenEdit = () => setShowEditDialog(true);
  const handleCloseEdit = () => setShowEditDialog(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useDraggable({ id: task.id });

  return (
    <>
        <div
          ref={setNodeRef}
          {...(!isOverlay ? listeners : {})}
          {...(!isOverlay ? attributes : {})}
          className={`${styles.card} ${isDragging ? styles.dragging : ''} ${isOverlay && isDragging ? styles.dragOverlay : ''}`}
        >
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <div className={styles.iconContainer}>
          <img
            className={styles.icon}
            onClick={handleOpenEdit}
            onPointerDown={e => e.stopPropagation()}
            src="edit.png"
            alt="edit icon"
          />
          <img className={styles.icon} src="delete.png" alt="delete icon" />
        </div>
      </div>

      {showEditDialog && <EditTask handleCloseEdit={handleCloseEdit} />}
    </>
  );
}

export default Card;