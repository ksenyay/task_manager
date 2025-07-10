import { useState } from "react";
import EditTask from "./forms/EditTask";
import styles from "./Card.module.css";

import type { TaskCard } from "../types";
import { useDraggable } from "@dnd-kit/core";
import { deleteCard } from "../state/tasksSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../state/store";

type TaskCardProps = {
  task: TaskCard;
  isOverlay?: boolean;
};

function Card({ task, isOverlay = false }: TaskCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const handleOpenEdit = () => setShowEditDialog(true);
  const handleCloseEdit = () => setShowEditDialog(false);

  const dispatch = useDispatch<AppDispatch>();

  function handleOpenDelete(e: React.MouseEvent) {
    e.stopPropagation();
    const userConfirmed = confirm("Are you sure you want to delete this task?");
    if (userConfirmed) {
      dispatch(deleteCard(task._id));
    }
  }

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task._id,
  });

  return (
    <>
      <div
        ref={setNodeRef}
        {...(!isOverlay ? listeners : {})}
        {...(!isOverlay ? attributes : {})}
        className={`${styles.card} ${isDragging ? styles.dragging : ""} ${isOverlay && isDragging ? styles.dragOverlay : ""}`}
      >
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <div className={styles.iconContainer}>
          <img
            className={styles.icon}
            onClick={handleOpenEdit}
            onPointerDown={(e) => e.stopPropagation()}
            src="edit.png"
            alt="edit icon"
          />
          <img
            className={styles.icon}
            src="delete.png"
            alt="delete icon"
            onClick={handleOpenDelete}
            onPointerDown={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {showEditDialog && (
        <EditTask
          handleCloseEdit={handleCloseEdit}
          taskData={{
            _id: task._id,
            title: task.title,
            description: task.description,
          }}
        />
      )}
    </>
  );
}

export default Card;
