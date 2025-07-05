import React from 'react';
import styles from './Board.module.css'

interface BoardProps {
  column: string;
}

const Board: React.FC<BoardProps> = ({ column }) => {
  return (
    <div className={styles.board}>
    <div className={styles.header}>
      <h2>{column}</h2>
    </div>
      <div className={styles.cardContainer}>
        <div className={styles.card} draggable>sdasd</div>
        <button className={styles.addButton}>+</button>
      </div>

    </div>
  );
};

export default Board;