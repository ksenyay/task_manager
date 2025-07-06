import React, { useState } from 'react';
import styles from './Board.module.css'
import Card from './Card'
import AddTask from './forms/AddTask'

interface BoardProps {
  column: string;
}

const Board: React.FC<BoardProps> = ({ column }) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleOpen = () => setShowDialog(true);
  const handleClose = () => setShowDialog(false);

  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <h2>{column}</h2>
      </div>
      <div className={styles.cardScroll}>
        <div className={styles.cardContainer}>
          <Card />
          <div>
            <button className={styles.addButton} onClick={handleOpen}>+</button>
          </div>

          {/* Task Dialog */}
          {showDialog && (
            <AddTask handleClose={handleClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;