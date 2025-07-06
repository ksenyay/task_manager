import React from 'react';
import styles from './Board.module.css'

interface BoardProps {
  column: string;
}

const tasks: { title: string; description: string; id: number }[] = [
  {
    title: 'title',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, doloribus enim esse ad illo expl.',
    id: 1
  },
  {
    title: 'title',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, doloribus enim esse ad illo expl.',
    id: 2
  }
];

const Board: React.FC<BoardProps> = ({ column }) => {
  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <h2>{column}</h2>
      </div>
      <div className={styles.cardScroll}>
        <div className={styles.cardContainer}>
          {tasks.map((item) => (
            <div className={styles.card} key={item.id} draggable>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className={styles.iconContainer}><img className={styles.icon} src="edit.png" alt="" /><img className={styles.icon} src="delete.png" alt="" /></div>
            </div>
          ))}
          <div>
          <button className={styles.addButton}>+</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Board;