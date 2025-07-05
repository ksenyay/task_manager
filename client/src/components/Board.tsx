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
        <div className={styles.card} draggable>
          <h3>title</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, doloribus enim esse ad illo expl.</p>
          <div className={styles.iconContainer}><img className={styles.icon} src="edit.png" alt="" /><img className={styles.icon} src="delete.png" alt="" /></div>
        </div>
        <button className={styles.addButton}>+</button>
      </div>

    </div>
  );
};

export default Board;